<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cart_model extends CI_Model{
    protected $table = 'example_table';

    public function __construct(){
        parent::__construct();
    }

    public function addCartItem($cartItem){
            $query = '
              insert into cart_items (userId,productId,quantity,priceSnapshot,vendorId)
              values (?,?,?,?,?)
            ';
            $this->db->query($query,[$cartItem['userId'],$cartItem['productId'],$cartItem['quantity'],$cartItem['priceSnapshot'],$cartItem['vendorId']]);
    }
}