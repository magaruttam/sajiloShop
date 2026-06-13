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
        $data = [
            'name' => $this->post('name'),
            'email' => $this->post('email'),
            'password' => $this->post('password'),
            'role' => $this->post('role')
        ];

        if (empty($data['email']) || empty($data['password'])) {
            $this->response([
                'status' => false,
                'message' => 'Email and password are required'
            ], RestController::HTTP_BAD_REQUEST);
        }

        // Validate email format
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
        $insert_id = $this->user_model->insert_user($data);

        $this->response([
            'status' => true,
            'message' => 'User registered successfully',
            'data' => [
                'id' => $insert_id,
                'email' => $data['email'],
                'role' => $data['role']
            ]
        ], RestController::HTTP_CREATED);
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

                $this->response([
                    'status' => true,
                    'message' => 'Login Successful',
                    'token' => $token,
                    'user' => [
                        'email' => $user->email,
                        'role' => $user->role
                    ]
                ], RestController::HTTP_OK);
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