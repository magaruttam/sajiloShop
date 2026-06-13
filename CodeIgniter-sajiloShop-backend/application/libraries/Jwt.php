<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;

class Jwt
{
    public function __construct()
    {
         $this->CI =& get_instance();
        $this->CI->config->load('jwt');
    }

    public function generate_token($data){
            $key = $this->CI->config->item('jwt_key');
            $algorithm = $this->CI->config->item('jwt_algorithm');
            $expireTime = $this->CI->config->item('jwt_expire_time');

            $payload = [
                'iat' => time(),
                'exp' => time() + $expireTime,
                'data' => $data
            ];
            
            return FirebaseJWT::encode($payload, $key, $algorithm);
    }
}