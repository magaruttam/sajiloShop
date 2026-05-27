<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;

class Jwt extends CI_
{
    public function __construct()
    {
        $this->config->load('jwt');
    }
}