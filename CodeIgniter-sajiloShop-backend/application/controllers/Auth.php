<?php
defined("BASEPATH") OR exit("No direct script access allowed");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("user_model");
        $this->load->library('jwt');
    }

    public function login()
    {

    }
}