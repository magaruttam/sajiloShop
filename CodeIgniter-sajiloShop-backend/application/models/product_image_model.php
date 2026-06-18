<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Product_image_model Class
 *
 * Handles database operations for the product_images table.
 */
class Product_image_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    /**
     * Insert a new product image.
     *
     * @param array $data  ['productId' => int, 'url' => string]
     * @return int|bool    Insert ID on success, FALSE on failure
     */
    public function add_image($data) {
        $sql = "INSERT INTO product_images (productId, url, createdAt, updatedAt) VALUES (?, ?, ?, ?)";

        $binds = [
            (int) $data['productId'],
            $data['url'],
            date('Y-m-d H:i:s'),
            date('Y-m-d H:i:s'),
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
                return false;
            }
        } catch (Exception $e) {
            $this->db->db_debug = $orig_db_debug;
            return false;
        }
    }

    /**
     * Insert multiple product images.
     *
     * @param int   $productId
     * @param array $images    Array of ['url' => string]
     * @return array           Array of inserted IDs
     */
    public function add_images($productId, $images) {
        $insertedIds = [];
        foreach ($images as $image) {
            $id = $this->add_image(['productId' => $productId, 'url' => $image['url']]);
            if ($id) {
                $insertedIds[] = $id;
            }
        }
        return $insertedIds;
    }

    /**
     * Get all images for a product.
     *
     * @param int $productId
     * @return array
     */
    public function get_images_by_product($productId) {
        $sql = "SELECT * FROM product_images WHERE productId = ?";
        $result = $this->db->query($sql, [(int) $productId]);
        return $result->result();
    }

    /**
     * Delete a product image by ID.
     *
     * @param int $imageId
     * @return bool
     */
    public function delete_image($imageId) {
        $sql = "DELETE FROM product_images WHERE id = ?";
        return $this->db->query($sql, [(int) $imageId]);
    }

    /**
     * Delete all images for a product.
     *
     * @param int $productId
     * @return bool
     */
    public function delete_images_by_product($productId) {
        $sql = "DELETE FROM product_images WHERE productId = ?";
        return $this->db->query($sql, [(int) $productId]);
    }

    /**
     * Get a single image by ID.
     *
     * @param int $imageId
     * @return object|null
     */
    public function get_image($imageId) {
        $sql = "SELECT * FROM product_images WHERE id = ?";
        $result = $this->db->query($sql, [(int) $imageId]);
        return $result->row();
    }
}
