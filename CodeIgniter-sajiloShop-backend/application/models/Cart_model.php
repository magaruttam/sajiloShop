<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cart_model extends CI_Model{
    protected $table = 'example_table';

    public function __construct(){
        parent::__construct();
    }

    public function get_data($vendorId,$productId){
            $query = '
              select 
              vendors.shopName,
              products.name,
              products.price,
            ';
    }

}