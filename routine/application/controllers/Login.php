<?php
defined('BASEPATH') OR exit('No direct script access allowed');

header('Access-Control-Allow-Origin:*');
class Login extends CB_Controller
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model('user_model');
	}

	//登录验证
	public function check ()
	{
		$res = $this->input->post();
		$resource = $this->login_model->check($res);
		echo $resource;exit;
	}
}