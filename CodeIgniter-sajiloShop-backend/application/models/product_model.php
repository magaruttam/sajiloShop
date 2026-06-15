<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Product_model Class
 *
 * Handles database operations for products using raw SQL queries.
 */
class Product_model extends CI_Model {

    /**
     * Class constructor
     */
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    /**
     * Inserts a new product into the database using a raw SQL query with parameter bindings.
     *
     * @param array $data Assoc array containing product details.
     * @return int|bool The inserted record ID on success, or FALSE on failure.
     */
    public function add_product($data) {
        // Raw SQL query for inserting product details
        $sql = "INSERT INTO products (
                    vendorId, 
                    categoryId, 
                    name, 
                    price, 
                    stock, 
                    status, 
                    description, 
                    createdAt, 
                    updatedAt
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        // Parameter binding array for security against SQL injection
        $binds = [
            isset($data['vendorId']) ? (int)$data['vendorId'] : null,
            isset($data['categoryId']) ? (int)$data['categoryId'] : null,
            $data['name'],
            $data['price'],
            isset($data['stock']) ? (int)$data['stock'] : 0,
            $data['status'],
            $data['description'],
            $data['createdAt'],
            $data['updatedAt']
        ];

        // Store original db_debug value and temporarily disable it
        $orig_db_debug = $this->db->db_debug;
        $this->db->db_debug = FALSE;

        try {
            // Execute raw query with bindings
            $query = $this->db->query($sql, $binds);

            if ($query) {
                // Restore original db_debug and return the auto-increment ID
                $this->db->db_debug = $orig_db_debug;
                return (int) $this->db->insert_id();
            } else {
                // Get the database error details
                $error = $this->db->error();
                $this->db->db_debug = $orig_db_debug;
                return isset($error['message']) && !empty($error['message']) ? $error['message'] : 'Database query failed';
            }
        } catch (Exception $e) {
            // Restore db_debug and return exception message
            $this->db->db_debug = $orig_db_debug;
            return $e->getMessage();
        } catch (Throwable $t) {
            // Restore db_debug and return throwable message (PHP 7+)
            $this->db->db_debug = $orig_db_debug;
            return $t->getMessage();
        }
    }

    /**
     * Retrieves all products from the database.
     *
     * @return array List of products.
     */
    public function get_products() {
        $query = "SELECT * FROM products";
        $result = $this->db->query($query);
        return $result->result();
    }
}