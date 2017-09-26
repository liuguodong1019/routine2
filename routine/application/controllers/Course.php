<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin:*');
class Course extends CB_Controller
{
	public function __construct(){
		parent::__construct();
		$this->load->model('course_model');
	}

	//课程列表
	public function course()
	{
		$res = $this->input->post();
		$rew = $this->course_model->verify($res);
		switch ($res['oper_type']) {
			case 'GET': //获取课程列表
				if ($rew == 1) {
					$resource = $this->course_model->ad_cou($res);
					echo $resource;exit;
				}
				echo $rew;exit;
				break;
			case 'POST': //创建课程
				if ($rew == 1) {
					$resout = $this->course_model->insert($res);
					echo $resout;exit;
				}
				echo $rew;exit;
				break;
			case 'PUT': //更新课程
				if ($rew == 1) {
					$resout = $this->course_model->put($res);
					echo $resout;exit;
				}
				echo $rew;exit;
				break;
			case 'DEL': //删除课程
				if ($rew == 1) {
					$resout = $this->course_model->del($res);
					echo $resout;exit;
				}
				echo $rew;exit;
				break;
		}
	}
}