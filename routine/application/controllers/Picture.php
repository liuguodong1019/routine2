<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin:*');
class Picture extends CB_Controller
{
	public function __construct(){
		parent::__construct();
		$this->load->model('picture_model');
		$this->load->model('course_model');
	}

	public function picture ()
	{
		$res = $this->input->post(); 
		$rew = $this->course_model->verify($res);
		switch ($res['oper_type']) {
			case 'GET': //获取轮播图列表
				if ($rew == 1) {
					$resource = $this->picture_model->pic_list($res);
					// $data = $this->course_model->state(200,'SUCCESS',$resource);
					echo $resource;exit;
				}
				echo $rew;exit;
				break;
			case 'POST': //创建轮播图
				if ($rew == 1) {
					$resout = $this->picture_model->insert($res);
					echo $resout;exit;
				}
				echo $rew;exit;
				break;
			case 'PUT': //更新轮播图
				if ($rew == 1) {
					$resout = $this->picture_model->put($res);
					echo $resout;exit;
				}
				echo $rew;exit;
				break;
			case 'DEL': //删除轮播图
				if ($rew == 1) {
					$resout = $this->picture_model->del($res);
					echo $resout;exit;
				}
				echo $rew;exit;
				break;
		}
	}
}
