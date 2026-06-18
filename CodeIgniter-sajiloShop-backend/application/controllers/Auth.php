<?php
defined("BASEPATH") OR exit("No direct script access allowed");

use chriskacerguis\RestServer\RestController;

class Auth extends RestController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("user_model");
        $this->load->library('form_validation');
        $this->load->library('jwt');
        $this->load->database(); 
    }

    /**
     * GET /auth/users
     * Returns list of all registered users
     */
    public function users_get()
    {
        $users = $this->user_model->get_all_users();

        if ($users) {
            // Remove password hashes from user records before returning
            foreach ($users as &$user) {
                unset($user['password']);
            }
            $this->response([
                'status' => true,
                'data' => $users
            ], RestController::HTTP_OK);
        } else {
            $this->response([
                'status' => false,
                'message' => 'No users found'
            ], RestController::HTTP_NOT_FOUND);
        }
    }

    /**
     * POST /auth/register
     * Registers a new user
     */
    public function register_post()
    {
        $role = $this->post('role') ? $this->post('role') : 'user';
        $shopName = $this->post('shopName');

        $data = [
            'name' => $this->post('name'),
            'email' => $this->post('email'),
            'password' => $this->post('password'),
            'role' => $role
        ];

        if (empty($data['email']) || empty($data['password'])) {
            $this->response([
                'status' => false,
                'message' => 'Email and password are required'
            ], RestController::HTTP_BAD_REQUEST);
        }

        if ($role === 'vendor' && empty($shopName)) {
            $this->response([
                'status' => false,
                'message' => 'Shop name is required for vendor registration'
            ], RestController::HTTP_BAD_REQUEST);
        }

        // Validate email format, password, role
        $this->form_validation->set_data($data);
        if (!$this->form_validation->run('register')) {
            $this->response([
                'status' => false,
                'errors' => $this->form_validation->error_array()
            ], RestController::HTTP_BAD_REQUEST);
        }

        // Check if user already exists
        $existing_user = $this->user_model->get_user($data['email']);
        if ($existing_user) {
            $this->response([
                'status' => false,
                'message' => 'User already exists'
            ], RestController::HTTP_BAD_REQUEST);
        }

        $hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);
        $data['password'] = $hashed_password;

        // Start database transaction
        $this->db->trans_start();

        // 1. Insert user
        $userId = $this->user_model->insert_user($data);

        // 2. Insert vendor profile if role is vendor
        $vendorId = null;
        if ($role === 'vendor') {
            $vendorData = [
                'userId' => $userId,
                'status' => 'approved',
                'commission_rate' => 10.00,
                'balance' => 0.00,
                'shopName' => $shopName
            ];
            $vendorId = $this->user_model->insert_vendor($vendorData);
        }

        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE) {
            $this->response([
                'status' => false,
                'message' => 'Registration failed'
            ], RestController::HTTP_INTERNAL_SERVER_ERROR);
        }

        // Generate JWT token
        $token_data = [
            'id' => $userId,
            'email' => $data['email'],
            'role' => $role
        ];
        $token = $this->jwt->generate_token($token_data);

        $responseData = [ 
            'status' => true,
            'message' => ($role === 'vendor') ? 'Vendor registered successfully' : 'User registered successfully',
            'token' => $token,
            'user' => [
                'id' => $userId,
                'email' => $data['email'],
                'role' => $role
            ]
        ];

        if ($role === 'vendor') {
            $responseData['vendor'] = [
                'id' => $vendorId,
                'shopName' => $shopName,
                'status' => 'approved',
                'commission_rate' => '10'
            ];
        }

        $this->response($responseData, RestController::HTTP_CREATED);
    }

    /**
     * POST /auth/login
     * Authenticates user and returns JWT
     */
    public function login_post()
    {
        $email = $this->post('email');
        $password = $this->post('password');

        if (empty($email) || empty($password)) {
            $this->response([
                'status' => false,
                'message' => 'Email and password are required'
            ], RestController::HTTP_BAD_REQUEST);
        }

        $user = $this->user_model->get_user($email);

        if ($user) {
            if (password_verify($password, $user->password)) {
                // Generate JWT token
                $token_data = [
                    'id' => isset($user->id) ? $user->id : null,
                    'email' => $user->email,
                    'role' => $user->role
                ];
                $token = $this->jwt->generate_token($token_data);

                $response = [
                    'status' => true,
                    'message' => 'Login Successful',
                    'token' => $token,
                    'user' => [
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role
                    ]
                ];

                // Include vendor data if user is a vendor
                if ($user->role === 'vendor') {
                    $vendor = $this->user_model->get_vendor_by_user_id($user->id);
                    if ($vendor) {
                        $response['vendor'] = [
                            'id' => (int) $vendor->id,
                            'userId' => (int) $vendor->userId,
                            'status' => $vendor->status,
                            'shopName' => $vendor->shopName,
                            'balance' => $vendor->balance,
                            'commission_rate' => $vendor->commission_rate,
                            'createdAt' => $vendor->createdAt,
                            'updatedAt' => $vendor->updatedAt
                        ];
                    }
                }

                $this->response($response, RestController::HTTP_OK);
            } else {
                $this->response([
                    'status' => false,
                    'message' => 'Invalid Password'
                ], RestController::HTTP_UNAUTHORIZED);
            }
        } else {
            $this->response([
                'status' => false,
                'message' => 'User not found'
            ], RestController::HTTP_NOT_FOUND);
        }
    }

    /**
     * POST /auth/vendor_login
     * Authenticates vendor and returns JWT
     */
    public function vendor_login_post()
    {
        $email = $this->post('email');
        $password = $this->post('password');

        if (empty($email) || empty($password)) {
            $this->response([
                'status' => false,
                'message' => 'Email and password are required'
            ], RestController::HTTP_BAD_REQUEST);
        }

        $user = $this->user_model->get_user($email);

        if ($user && $user->role === 'vendor') {
            if (password_verify($password, $user->password)) {
                // Generate JWT token
                $token_data = [
                    'id' => isset($user->id) ? $user->id : null,
                    'email' => $user->email,
                    'role' => $user->role
                ];
                $token = $this->jwt->generate_token($token_data);

                $vendor = $this->user_model->get_vendor_by_user_id($user->id);

                $response = [
                    'status' => true,
                    'message' => 'Vendor Login Successful',
                    'token' => $token,
                    'user' => [
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role
                    ]
                ];

                if ($vendor) {
                    $response['vendor'] = [
                        'id' => (int) $vendor->id,
                        'userId' => (int) $vendor->userId,
                        'status' => $vendor->status,
                        'shopName' => $vendor->shopName,
                        'balance' => $vendor->balance,
                        'commission_rate' => $vendor->commission_rate,
                        'createdAt' => $vendor->createdAt,
                        'updatedAt' => $vendor->updatedAt
                    ];
                }

                $this->response($response, RestController::HTTP_OK);
            } else {
                $this->response([
                    'status' => false,
                    'message' => 'Invalid Password'
                ], RestController::HTTP_UNAUTHORIZED);
            }
        } else {
            $this->response([
                'status' => false,
                'message' => 'Vendor not found'
            ], RestController::HTTP_NOT_FOUND);
        }
    }



    /**
     * PUT /auth/user
     * Dummy placeholder endpoint to demonstrate PUT requests
     */
    public function user_put()
    {
        $email = $this->put('email');
        $role = $this->put('role');

        $this->response([
            'status' => true,
            'message' => 'User details updated (mock endpoint)',
            'data' => [
                'email' => $email,
                'role' => $role
            ]
        ], RestController::HTTP_OK);
    }

    /**
     * DELETE /auth/user
     * Dummy placeholder endpoint to demonstrate DELETE requests
     */
    public function user_delete()
    {
        $id = $this->delete('id');

        $this->response([
            'status' => true,
            'message' => 'User deleted successfully (mock endpoint)',
            'data' => [
                'id' => $id
            ]
        ], RestController::HTTP_OK);
    }
}