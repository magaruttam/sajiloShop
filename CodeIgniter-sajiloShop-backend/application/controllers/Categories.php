<?php
defined("BASEPATH") OR exit("No direct script acccess allowed");

use chriskacerguis\RestServer\RestController;

class Categories extends RestController{
     public function __construct(){
        parent::__construct();
        $this->load->model('categories_model');
     }

     function categories_get(){
            
            $categories = $this->categories_model->categories();
            $this->response($categories,200);
     }
}