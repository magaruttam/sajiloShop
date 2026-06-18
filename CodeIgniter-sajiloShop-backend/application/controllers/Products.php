<?php
defined("BASEPATH") OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

/**
 * Products Controller
 *
 * Handles REST API requests related to products including image uploads via ImageKit.
 * Images are stored in the product_images table.
 */
class Products extends RestController {

    public function __construct() {
        parent::__construct();
        $this->load->model('product_model');
        $this->load->model('product_image_model');
        $this->load->library('form_validation');
        $this->load->library('imagekit_lib');
    }

    /**
     * GET /products
     */
    public function products_get() {
        $products = $this->product_model->get_products();

        foreach ($products as &$product) {
            $product->images = $this->product_image_model->get_images_by_product($product->id);
        }

        $this->response(['allProducts' => $products], RestController::HTTP_OK);
    }

    /**
     * GET /products/product/{id}
     */
    public function product_get($id = null) {
        if (!$id) {
            $this->response(['status' => false, 'message' => 'Product ID required'], RestController::HTTP_BAD_REQUEST);
            return;
        }

        $product = $this->product_model->get_product($id);

        if (!$product) {
            $this->response(['status' => false, 'message' => 'Product not found'], RestController::HTTP_NOT_FOUND);
            return;
        }

        $product->images = $this->product_image_model->get_images_by_product($product->id);
        $this->response($product, RestController::HTTP_OK);
    }

    /**
     * POST /products/create
     *
     * Accepts multipart/form-data with:
     *  - vendorId, name, category, price, stockQty, description
     *  - images[] (multiple files)
     *
     * Images are uploaded to ImageKit, then URLs stored in product_images table.
     */
    public function create_post() {
        $validationData = [
            'vendorId' => $this->post('vendorId'),
            'name'     => $this->post('name'),
            'category' => $this->post('category'),
            'price'    => $this->post('price'),
            'stockQty' => $this->post('stockQty')
        ];

        $this->form_validation->set_data($validationData);

        if ($this->form_validation->run('create_product') === FALSE) {
            $errors = $this->form_validation->error_array();
            $firstError = reset($errors);

            $this->response([
                'status'  => false,
                'message' => $firstError
            ], RestController::HTTP_BAD_REQUEST);
            return;
        }

        // Handle image uploads to ImageKit
        $uploadedImages = $this->_handle_image_uploads();

        if (isset($uploadedImages['error'])) {
            $this->response([
                'status'  => false,
                'message' => 'Image upload failed: ' . $uploadedImages['error']
            ], 500);
            return;
        }

        $description = $this->post('description');

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

        $productId = $this->product_model->add_product($data);

        if (is_numeric($productId)) {
            // Insert image URLs into product_images table
            if (!empty($uploadedImages)) {
                $this->product_image_model->add_images($productId, $uploadedImages);
            }

            // Fetch the saved images to return
            $savedImages = $this->product_image_model->get_images_by_product($productId);

            $this->response([
                'status'    => true,
                'message'   => 'Product created successfully',
                'productId' => (int) $productId,
                'images'    => $savedImages
            ], RestController::HTTP_CREATED);
        } else {
            // If product insert fails, clean up uploaded images from ImageKit
            $this->_cleanup_images($uploadedImages);

            $errorMessage = is_string($productId) ? $productId : 'Failed to insert product';
            $this->response([
                'status'  => false,
                'message' => 'Database error: ' . $errorMessage
            ], 500);
        }
    }

    /**
     * POST /products/upload_images
     *
     * Upload additional images to an existing product.
     * Accepts: productId, images[]
     */
    public function upload_images_post() {
        $productId = $this->post('productId');

        if (!$productId) {
            $this->response(['status' => false, 'message' => 'Product ID required'], RestController::HTTP_BAD_REQUEST);
            return;
        }

        $product = $this->product_model->get_product($productId);
        if (!$product) {
            $this->response(['status' => false, 'message' => 'Product not found'], RestController::HTTP_NOT_FOUND);
            return;
        }

        $newImages = $this->_handle_image_uploads('/products/' . $productId);

        if (isset($newImages['error'])) {
            $this->response([
                'status'  => false,
                'message' => 'Image upload failed: ' . $newImages['error']
            ], 500);
            return;
        }

        // Insert new images into product_images table
        if (!empty($newImages)) {
            $this->product_image_model->add_images($productId, $newImages);
        }

        $allImages = $this->product_image_model->get_images_by_product($productId);

        $this->response([
            'status'  => true,
            'message' => 'Images uploaded successfully',
            'images'  => $allImages
        ], RestController::HTTP_OK);
    }

    /**
     * POST /products/delete_image
     *
     * Remove a single image from a product and delete from ImageKit.
     * Accepts: imageId (the product_images.id)
     */
    public function delete_image_post() {
        $imageId = $this->post('imageId');

        if (!$imageId) {
            $this->response(['status' => false, 'message' => 'Image ID required'], RestController::HTTP_BAD_REQUEST);
            return;
        }

        $image = $this->product_image_model->get_image($imageId);
        if (!$image) {
            $this->response(['status' => false, 'message' => 'Image not found'], RestController::HTTP_NOT_FOUND);
            return;
        }

        // Delete the image record from database
        $this->product_image_model->delete_image($imageId);

        $this->response([
            'status'  => true,
            'message' => 'Image deleted successfully'
        ], RestController::HTTP_OK);
    }

    /**
     * DELETE /products/delete/{id}
     *
     * Delete a product and all its images from ImageKit.
     */
    public function delete_delete($id = null) {
        if (!$id) {
            $this->response(['status' => false, 'message' => 'Product ID required'], RestController::HTTP_BAD_REQUEST);
            return;
        }

        $product = $this->product_model->get_product($id);
        if (!$product) {
            $this->response(['status' => false, 'message' => 'Product not found'], RestController::HTTP_NOT_FOUND);
            return;
        }

        // Delete the product from database
        $deleted = $this->product_model->delete_product($id);

        if ($deleted) {
            // Delete all image records from product_images table
            $this->product_image_model->delete_images_by_product($id);

            $this->response(['status' => true, 'message' => 'Product deleted successfully'], RestController::HTTP_OK);
        } else {
            $this->response(['status' => false, 'message' => 'Failed to delete product'], 500);
        }
    }

    // -------------------------------------------------------------------------
    // Private Helpers
    // -------------------------------------------------------------------------

    /**
     * Handle multiple image file uploads to ImageKit.
     *
     * @param string $folder  ImageKit folder path
     * @return array          Array of ['url', 'fileId', 'name'] or ['error' => 'message']
     */
    private function _handle_image_uploads($folder = '/products/') {
        if (!isset($_FILES['images']) || empty($_FILES['images']['name'])) {
            return [];
        }

        // Normalize single file to array format
        if (is_string($_FILES['images']['name'])) {
            $_FILES['images'] = [
                'name'     => [$_FILES['images']['name']],
                'type'     => [$_FILES['images']['type']],
                'tmp_name' => [$_FILES['images']['tmp_name']],
                'error'    => [$_FILES['images']['error']],
                'size'     => [$_FILES['images']['size']],
            ];
        }

        $fileNames = $_FILES['images']['name'];
        $fileTmpNames = $_FILES['images']['tmp_name'];
        $fileErrors = $_FILES['images']['error'];
        $fileSizes = $_FILES['images']['size'];

        $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        $maxSize = 5 * 1024 * 1024; // 5MB per file

        $uploaded = [];

        for ($i = 0; $i < count($fileNames); $i++) {
            if ($fileErrors[$i] !== UPLOAD_ERR_OK) {
                return ['error' => "Upload error for {$fileNames[$i]}: code {$fileErrors[$i]}"];
            }

            if ($fileSizes[$i] > $maxSize) {
                return ['error' => "File {$fileNames[$i]} exceeds 5MB limit"];
            }

            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $fileTmpNames[$i]);
            finfo_close($finfo);

            if (!in_array($mimeType, $allowedTypes)) {
                return ['error' => "File {$fileNames[$i]} type {$mimeType} not allowed"];
            }

            $fileContents = file_get_contents($fileTmpNames[$i]);
            $base64Data = 'data:' . $mimeType . ';base64,' . base64_encode($fileContents);

            $result = $this->imagekit_lib->upload($base64Data, $fileNames[$i], $folder);

            if (isset($result['error'])) {
                return ['error' => $result['error']];
            }

            $uploaded[] = [
                'url'    => $result['url'],
                'fileId' => $result['fileId'],
                'name'   => $result['name'],
            ];
        }

        return $uploaded;
    }

    /**
     * Clean up images from ImageKit if product creation fails.
     */
    private function _cleanup_images($images) {
        foreach ($images as $image) {
            if (isset($image['fileId'])) {
                $this->imagekit_lib->delete($image['fileId']);
            }
        }
    }
}
