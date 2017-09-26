<?php
defined('BASEPATH') OR exit('No direct script access allowed');\
header('Access-Control-Allow-Origin:*');
class User extends CB_Controller
{
	public function __construct ()
	{
		parent::__construct();
		$this->load->model('user_model');
		$this->load->model('course_model');
	}

	
	//后台用户操作
	public function user ()
	{
		$res = $this->input->post();
		$rew = $this->course_model->verify($res);
	
		switch ($res['oper_type']) {
			case 'GET': //获取用户列表
				if ($rew == 1) {
					$resource = $this->user_model->user_list($res);
					echo $resource;exit;
				}
				echo $rew;exit;
				break;
			case 'POST': //创建用户
				if ($rew == 1) {
					$resource = $this->user_model->create($res);
					echo $resource;exit;
				}
				echo $rew;exit;
				break;
			case 'PUT': //更新用户信息
				if ($rew == 1) {
					$resource = $this->user_model->put($res);
					echo $resource;exit;
				}
				echo $rew;exit;
				break;
			case 'DEL': //删除用户
				if ($rew == 1) {
					$resource = $this->user_model->del($res);
					echo $resource;exit;
				}
				echo $rew;exit;
				break;
		}
	}

	//获取token
	public function get_token ()
	{
		echo $this->course_model->token();exit;
	}
}
