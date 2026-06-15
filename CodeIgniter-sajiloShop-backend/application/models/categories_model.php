<?php
defined("BASEPATH") OR exit('No direct script access allowed');

class Categories_model extends CI_Model{
     public function __construct(){
           parent::__construct();
     }

     public function categories(){
        $query ="
        select * from categories
        ";  
        $result = $this->db->query($query);
        return $result->result_array();
     }

}