<?php

class Category_model extends CB_model
{
	function __construct(){
		parent::__construct();
	}

	//分类列表+分页+搜素
	public function cate_list ($res)
	{
		$num = $this->course_model->count($table = 'category');
		$this->load->model('course_model');
		$page = !empty($res['page']) ? $res['page']:1;
		$pageSize = 10;
		$offset = ($page-1) * $pageSize;
		$this->db->select('id,cg_name,sort_num,cg_lcon')->from('category');
		
		if (!empty($res['search'])) {
			$this->db->or_like('cg_name',$res['search']);
		}

		$this->db->limit($pageSize,$offset)->order_by('sort_num','asc');
		$query = $this->db->get();
		$data = $query->result_array();
		$array = (['code' => 200,'msg' => 'SUCCESS','data' => $data,'page_num' => $num]);
		if (empty($data)) {
			return self::state(404,'暂无数据');
		}
		return json_encode($array);
	}

	//创建分类
	public function insert ($res)
	{
		unset($res['time']);
		unset($res['public_token']);
		unset($res['oper_type']);
		return $this->equal($res);
		
	}

	//分类更新
	public function put ($res) {
		
		unset($res['public_token']);
		unset($res['oper_type']);
		return $this->up($res);
	}

	//删除分类
	public function del ($res)
	{
		if ($this->db->delete('category', array('id' => $res['id']))) {
			return self::state(200,'SUCCESS');
		}
		return self::state(500,'FAIL');
	}

	//查询分类名称是否已存在(插入)
	public function equal ($res)
	{
		$query = $this->ise($res);
		if ($query->num_rows()>0) {
			return self::state(403,'分类名称或者序号已存在');
		}else {
			$rew = $this->course_model->upload($img_file = 'category');
			$res['cg_lcon'] =  'http://192.168.140.75/routine/public/admin/images/category/'.$rew['file_name'];
			if ($this->db->insert('category',$res)) {
				$new_id = $this->db->insert_id();
				$resource = $this->course_model->sel_data($table = 'category',$new_id);
				return self::state(200,'SUCCESS',$resource);
			}else {
				return self::state(500,'FAIl');
			}
		}
	}

	//更新分类信息是否已存在(更新+删除原有图片)
	public function up ($res)
	{   
		// print_r($res);die;
		$query = $this->iset($res);
		if ($query->num_rows()>0) {
			return self::state(403,'分类名称或者序号已存在');
		}else {
			$data = $query->row_array();
			$rew = $this->course_model->upload($img_file = 'category');

			if (!empty($res['img'])) {
				if ($res['img'] == 2 ) {
				unset($res['img']);
				}else {
					$res['cg_lcon'] =  'http://192.168.140.75/routine/public/admin/images/category/'.$rew['file_name'];
				}
			}
			
			if ($this->db->where('id',$res['id'])->update('category',$res)) {
				if ($data['sort_num'] !== $res['sort_num']) {
					$this->db->set('sort_num', 'sort_num+1');
					if ($this->db->where('id',$res['id'])->where('sort_num <',$res['sort_num'])->update('category')) {
						// $this->dele($data['cg_lcon']);
						return self::state(200,'SUCCESS');
					}
					return self::state(500,'FAIL');
				}
				// $this->dele($data['cg_lcon']);
				return self::state(200,'SUCCESS');
			}else {
				return self::state(500,'FAIL');
			}
		}
	}

	//分类数据
	public function reouce ()
	{
		return $this->db->select('id,cg_name')->from('category')->get()->result_array();
	}

	//根据ID,分类名称和序号查询
	public function iset ($res = '')
	{
		$this->db->select('id,sort_num,cg_lcon')->from('category')
		->where('id !=',$res['id'])->where('cg_name',$res['cg_name'])
		->where('sort_num',$res['sort_num']);
		$query = $this->db->get();
		return $query;
	}

	//根据分类名称和序号查询
	public function ise ($res = '')
	{
		$this->db->select('id,sort_num,cg_lcon')->from('category')
		->where('cg_name',$res['cg_name'])
		->or_where('sort_num',$res['sort_num']);
		$query = $this->db->get();
		return $query;
	}
	// //删除原有图片
	// public function dele ($cg_lcon)
	// {
	// 	if (unlink($cg_lcon)) {
	// 		return true;
	// 	}
	// 	return false;
	// }

	//转json数据
	public static function state($code,$mess,$data = NULL){
        return json_encode([
            'code'=>$code,
            'msg'=>$mess,
            'data'=>$data
        ]);
    }
}