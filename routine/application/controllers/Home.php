<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
class Home extends CB_Controller
{
	public function __construct(){
		parent::__construct();
		$this->load->model('course_model');
	}
	
	public function index ()
	{
		$post = $this->input->post(); 
		$this->load->model('course_model');
		$res = $this->course_model->index($post);
	
		echo $res;exit;
	}

	//全部课程数据加搜索
	public function course_all ()
	{
		$name = $this->input->post('name'); 
		// $id = $this->input->post('cid');
		$resource = $this->course_model->course_all($name);
		echo $resource;exit;
	}

	//批量删除
	public function batch_del ()
	{	
		$res = $this->input->post();
		$id = $res['id'];
		if ($this->db->where_in('id',$id)->delete($res['table'])) {
			echo json_encode(['code' => 200,'msg'  => 'SUCCESS','data' => '']);exit;
		}
		echo json_encode(['code' => 500,'msg'  => 'FAIL','data' => '']);exit;
	}
}