<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/**
* 分类功能模块
*/
header('Access-Control-Allow-Origin:*');
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
class Category extends CB_Controller
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model('user_model');
		$this->load->model('course_model');
		$this->load->model('category_model');
	}

	public function category ()
	{
		// $this->db->select('id,sort_num,cg_lcon')->from('category')
		// ->where('id !=','21')->where('cg_name','请问qwe')->where('sort_num','75');
		// $query = $this->db->get();
		// echo '<pre>';
		// print_r($query->result_array());die;
		$res = $this->input->post(); 
		
		// print_r($_FILES);die;
		$rew = $this->course_model->verify($res);
		switch ($res['oper_type']) {
			case 'GET': //获取分类列表
				if ($rew == 1) {
					$resource = $this->category_model->cate_list($res);
					echo $resource;exit;
				}
				echo $rew;exit;
				break;
			case 'POST': //创建分类
				if ($rew == 1) {
					$resout = $this->category_model->insert($res);
					echo $resout;exit;
				}
				echo $rew;exit;
				break;
			case 'PUT': //更新分类
				if ($rew == 1) {
					$resout = $this->category_model->put($res);
					echo $resout;exit;
				}
				echo $rew;exit;
				break;
			case 'DEL': //删除分类
				if ($rew == 1) {
					$resout = $this->category_model->del($res);
					echo $resout;exit;
				}
				echo $rew;exit;
				break;
		}
	}
}