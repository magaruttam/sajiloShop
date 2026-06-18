<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use ImageKit\ImageKit;

/**
 * Imagekit_lib - CodeIgniter 3 wrapper for ImageKit SDK
 *
 * Provides upload, delete, and URL generation for ImageKit.io.
 * Reads credentials from application/config/imagekit.php.
 */
class Imagekit_lib {

    private $imageKit;
    private $CI;

    public function __construct() {
        $this->CI =& get_instance();
        $this->CI->load->config('imagekit');

        $publicKey   = $this->CI->config->item('imagekit_public_key');
        $privateKey  = $this->CI->config->item('imagekit_private_key');
        $urlEndpoint = $this->CI->config->item('imagekit_url_endpoint');

        if (empty($publicKey) || empty($privateKey) || empty($urlEndpoint)) {
            log_message('error', 'ImageKit: Missing credentials in application/config/imagekit.php');
            return;
        }

        $this->imageKit = new ImageKit($publicKey, $privateKey, $urlEndpoint);
    }

    /**
     * Get the ImageKit instance for direct SDK access
     *
     * @return ImageKit|null
     */
    public function get_instance() {
        return $this->imageKit;
    }

    /**
     * Upload a file (base64 or binary) to ImageKit
     *
     * @param string $fileData    Base64 encoded file or file contents
     * @param string $fileName    Original filename
     * @param string $folder      Folder path in ImageKit (e.g., '/products/')
     * @param array  $options     Additional options (tags, transformations, etc.)
     * @return array|object       Upload result with 'url', 'fileId', 'name', etc.
     */
    public function upload($fileData, $fileName, $folder = '/', $options = []) {
        if (!$this->imageKit) {
            return ['error' => 'ImageKit not configured'];
        }

        $uploadParams = array_merge([
            'file'              => $fileData,
            'fileName'          => $fileName,
            'folder'            => $folder,
            'useUniqueFileName' => true,
        ], $options);

        try {
            $result = $this->imageKit->uploadFile($uploadParams);

            // Log the full response for debugging
            log_message('debug', 'ImageKit upload response: ' . print_r($result, true));

            if (isset($result->err)) {
                return ['error' => $result->err];
            }

            if (!isset($result->result) || $result->result === null) {
                return ['error' => 'ImageKit returned empty result. Response: ' . json_encode($result)];
            }

            return [
                'success' => true,
                'url'     => $result->result->url ?? '',
                'fileId'  => $result->result->fileId ?? '',
                'name'    => $result->result->name ?? '',
                'filePath'=> $result->result->filePath ?? '',
            ];
        } catch (\Exception $e) {
            log_message('error', 'ImageKit Upload Error: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Upload multiple files to ImageKit
     *
     * @param array  $files      Array of ['data' => base64, 'name' => filename]
     * @param string $folder     Folder path in ImageKit
     * @return array             Array of upload results
     */
    public function upload_multiple($files, $folder = '/') {
        $results = [];

        foreach ($files as $file) {
            $fileData = $file['data'] ?? '';
            $fileName = $file['name'] ?? 'file_' . time();

            $results[] = $this->upload($fileData, $fileName, $folder);
        }

        return $results;
    }

    /**
     * Delete a file from ImageKit by file ID
     *
     * @param string $fileId  The ImageKit file ID
     * @return array          Success or error
     */
    public function delete($fileId) {
        if (!$this->imageKit) {
            return ['error' => 'ImageKit not configured'];
        }

        if (empty($fileId)) {
            return ['error' => 'File ID is required'];
        }

        try {
            $result = $this->imageKit->deleteFile($fileId);

            if (isset($result->err)) {
                return ['error' => $result->err];
            }

            return ['success' => true];
        } catch (\Exception $e) {
            log_message('error', 'ImageKit Delete Error: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Delete multiple files from ImageKit
     *
     * @param array $fileIds  Array of file IDs to delete
     * @return array          Results for each deletion
     */
    public function delete_multiple($fileIds) {
        $results = [];

        foreach ($fileIds as $fileId) {
            $results[] = $this->delete($fileId);
        }

        return $results;
    }

    /**
     * Generate a transformed URL for an ImageKit image
     *
     * @param string $url           Original ImageKit URL
     * @param array  $transformations  Array of transformation params
     * @return string               Transformed URL
     */
    public function get_url($url, $transformations = []) {
        if (!$this->imageKit) {
            return $url;
        }

        $params = array_merge(['src' => $url], $transformations);
        return $this->imageKit->url($params);
    }
}
