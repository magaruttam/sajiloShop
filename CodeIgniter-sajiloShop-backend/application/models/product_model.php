<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Product_model Class
 *
 * Handles database operations for the products table.
 */
class Product_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    /**
     * Inserts a new product into the database.
     *
     * @param array $data Assoc array containing product details.
     * @return int|bool The inserted record ID on success, or FALSE on failure.
     */
    public function add_product($data) {
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

        $orig_db_debug = $this->db->db_debug;
        $this->db->db_debug = FALSE;

        try {
            $query = $this->db->query($sql, $binds);

            if ($query) {
                $this->db->db_debug = $orig_db_debug;
                return (int) $this->db->insert_id();
            } else {
                $error = $this->db->error();
                $this->db->db_debug = $orig_db_debug;
                return isset($error['message']) && !empty($error['message']) ? $error['message'] : 'Database query failed';
            }
        } catch (Exception $e) {
            $this->db->db_debug = $orig_db_debug;
            return $e->getMessage();
        } catch (Throwable $t) {
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

    /**
     * Get a single product by ID.
     *
     * @param int $productId
     * @return object|null
     */
    public function get_product($productId) {
        $query = "SELECT * FROM products WHERE id = ?";
        $result = $this->db->query($query, [(int)$productId]);
        return $result->row();
    }

    /**
     * Delete a product by ID.
     *
     * @param int $productId
     * @return bool
     */
    public function delete_product($productId) {
        $sql = "DELETE FROM products WHERE id = ?";
        return $this->db->query($sql, [(int)$productId]);
    }
}
