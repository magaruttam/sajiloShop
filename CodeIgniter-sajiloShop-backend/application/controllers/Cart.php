<?php 
defined('BASEPATH') OR exit('No direct script acccess allowed');

use chriskacerguis\RestServer\RestController;

class Cart extends RestController{
  public function  __construct(){
    parent::__construct();
    $this->load->model('cart_model');
    $this->load->model('User_model');
    $this->load->model('Product_model');
  }

  public function addToCard_post()
{
    $user_id = $this->post('userId');
    $vendor_id = $this->post('vendorId');
    $product_id = $this->post('productId');
    $quantity = $this->post('quantity');

    $vendor = $this->User_model->get_vendor($vendor_id);
    if (!$vendor) {
      $this->response(['status' => false, 'message' => 'Vendor not found'], 404);
      return;
    }

    $product = $this->Product_model->get_product($product_id);
    if (!$product) {
      $this->response(['status' => false, 'message' => 'Product not found'], 404);
      return;
    }

    $data = $this->cart_model->get_data($vendor_id,$product_id);
}

}