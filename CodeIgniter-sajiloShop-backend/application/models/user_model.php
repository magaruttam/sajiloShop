<?php
defined("BASEPATH") OR exit("No direct script access allowed");

class User_model extends CI_Model{
  public function __construct(){
    parent::__construct();
  }   

  public function get_user($email){
    $query = 'select * from users where email = ?';
       
    $result = $this->db->query($query, [$email]);
    return $result->row();
  }

  public function insert_user($data){
         $query = 'insert into users (name,email,password,role)
         values(?,?,?,?)';

         $this->db->query($query,[$data['name'],$data['email'],$data['password'],$data['role']]);
         return $this->db->insert_id();
  }

  public function get_all_users(){
    $query = 'select * from users';
    $result = $this->db->query($query);
    
    $error = $this->db->error();

if ($error['code'] != 0) {
    log_message('error', $error['message']);
}
    
    return $result->result_array();
  }
}