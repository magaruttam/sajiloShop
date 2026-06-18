<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cors {
    public function handle()
    {
        $allowed_origins = [
            'http://localhost:4200',
            'http://localhost:3000',
            'http://localhost:8080',
            'http://127.0.0.1:4200',
            'http://127.0.0.1:3000',
        ];
        
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        
        if (in_array($origin, $allowed_origins)) {
            header("Access-Control-Allow-Origin: " . $origin);
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH");
            header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
            header("Access-Control-Allow-Credentials: true");
        }
        
        // Handle preflight request
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            header("Access-Control-Max-Age: 86400");
            http_response_code(200);
            exit();
        }
    }
}
