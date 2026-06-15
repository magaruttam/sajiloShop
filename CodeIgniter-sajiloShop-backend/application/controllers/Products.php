<?php
defined("BASEPATH") OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

/**
 * Products Controller
 *
 * Handles REST API requests related to products.
 * Extends RestController from chriskacerguis/codeigniter-restserver.
 */
class Products extends RestController {

    /**
     * Class constructor
     *
     * Loads the required Product model and libraries.
     */
    public function __construct() {
        parent::__construct();
        // Load the product model
        $this->load->model('product_model');
        // Load the Form Validation library
        $this->load->library('form_validation');
    }

    /**
     * GET /products
     *
     * Retrieves all products from the database.
     */
    public function products_get() {
        $result = $this->product_model->get_products();
        $this->response($result, RestController::HTTP_OK);        
    }

    /**
     * POST /products/create
     *
     * Creates a new product.
     * Maps frontend Form Data to database columns, validates input using form_validation library, and inserts into DB.
     */
    public function create_post() {
        // Prepare validation data array from POST request
        $validationData = [
            'vendorId' => $this->post('vendorId'),
            'name'     => $this->post('name'),
            'category' => $this->post('category'), // maps to categoryId
            'price'    => $this->post('price'),
            'stockQty' => $this->post('stockQty')  // maps to stock
        ];

        // Pass validation data to CodeIgniter's Form Validation library
        $this->form_validation->set_data($validationData);

        // Run validation group 'create_product' defined in application/config/form_validation.php
        if ($this->form_validation->run('create_product') === FALSE) {
            // Retrieve validation error messages array
            $errors = $this->form_validation->error_array();
            // Get the first error message to construct the required response format
            $firstError = reset($errors);

            $this->response([
                'status'  => false,
                'message' => $firstError
            ], RestController::HTTP_BAD_REQUEST);
            return;
        }

        // Retrieve other optional fields
        $description = $this->post('description');

        // Prepare data array for insertion.
        // Status defaults to 'pending' as per requirement.
        // createdAt and updatedAt use current datetime.
        $data = [
            'vendorId'    => $validationData['vendorId'],
            'categoryId'  => $validationData['category'],
            'name'        => trim($validationData['name']),
            'price'       => $validationData['price'],
            'stock'       => $validationData['stockQty'],
            'status'      => 'pending',
            'description' => $description !== null ? trim($description) : '',
            'createdAt'   => date('Y-m-d H:i:s'),
            'updatedAt'   => date('Y-m-d H:i:s')
        ];

        // Call the model to insert the product using parameterized raw SQL query
        $result = $this->product_model->add_product($data);

        if (is_numeric($result)) {
            // Success response (201 Created)
            $this->response([
                'status'    => true,
                'message'   => 'Product created successfully',
                'productId' => (int) $result
            ], RestController::HTTP_CREATED);
        } else {
            // Database error response (500 Internal Server Error)
            $errorMessage = is_string($result) ? $result : 'Failed to insert product';
            $this->response([
                'status'  => false,
                'message' => 'Database error: ' . $errorMessage
            ], RestController::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}