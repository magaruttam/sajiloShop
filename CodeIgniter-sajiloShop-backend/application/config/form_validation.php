<?php

$config = array(

    'register' => array(
        array(
            'field' => 'role',
            'label' => 'Role',
            'rules' => 'required|in_list[admin,user,vendor]'
        ),
        array(
            'field' => 'email',
            'label' => 'Email',
            'rules' => 'required|valid_email'
        ),
        array(
            'field' => 'password',
            'label' => 'Password',
            'rules' => 'required|min_length[6]'
        )
    ),

    'login' => array(
        array(
            'field' => 'email',
            'label' => 'Email',
            'rules' => 'required|valid_email'
        ),
        array(
            'field' => 'password',
            'label' => 'Password',
            'rules' => 'required'
        )
    ),

    'create_product' => array(
        array(
            'field' => 'vendorId',
            'label' => 'Vendor ID',
            'rules' => 'required',
            'errors' => array(
                'required' => 'Vendor ID is required'
            )
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => 'required',
            'errors' => array(
                'required' => 'Name is required'
            )
        ),
        array(
            'field' => 'category',
            'label' => 'Category',
            'rules' => 'required',
            'errors' => array(
                'required' => 'Category is required'
            )
        ),
        array(
            'field' => 'price',
            'label' => 'Price',
            'rules' => 'required',
            'errors' => array(
                'required' => 'Price is required'
            )
        ),
        array(
            'field' => 'stockQty',
            'label' => 'Stock quantity',
            'rules' => 'required',
            'errors' => array(
                'required' => 'Stock quantity is required'
            )
        )
    )
);