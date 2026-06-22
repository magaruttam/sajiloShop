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

  public function addToCart_post()
{
    $userId = $this->post('userId');
    $vendorId = $this->post('vendorId');
    $productId = $this->post('productId');
    $quantity = $this->post('quantity');
    $price = $this->post('price');

    $vendor = $this->User_model->get_vendor($vendorId);
    if (!$vendor) {
      $this->response(['status' => false, 'message' => 'Vendor not found'], 404);
      return;
    }

    $product = $this->Product_model->get_product($productId);
    if (!$product) {
      $this->response(['status' => false, 'message' => 'Product not found'], 404);
      return;
    }
     $cartItem = [
      'userId' => $userId,
      'vendorId' => $vendorId,
      'productId' => $productId,
      'quantity' => $quantity,
      'priceSnapshot' => $price
     ];
    
    $this->cart_model->addCartItem($cartItem);
}

}