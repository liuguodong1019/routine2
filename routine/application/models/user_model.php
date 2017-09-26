<?php
class User_model extends CB_model
{
	function __construct(){
		parent::__construct();
		$this->load->model('course_model');
	}

	//用户列表+分页+搜索
	public function user_list ($res)
	{
		// $this->load->model('course_model');
		$num = $this->course_model->count($table = 'user');
		$page = !empty($res['page']) ? $res['page']:1;
		$pageSize = 10;
		$offset = ($page-1) * $pageSize;
		
		$this->db->select('*')->from('user');
		if (!empty($res['search'])) {
			$this->db->or_like('username',$res['search']);
		}
		$this->db->limit($pageSize,$offset);
		$query = $this->db->get();
		$data = $query->result_array();
		$array = (['code' => 200,'msg' => 'SUCCESS','data' => $data,'page_num' => $num]);
		if (empty($res)) {
			return self::state(200,'No data');
		}
		return json_encode($array);
	}

	//创建用户
	public function create ($res)
	{
		unset($res['time']);
		unset($res['public_token']);
		unset($res['oper_type']);
		return $this->equal($res);
	}

	//更新用户
	public function put ($res)
	{
		unset($res['public_token']);
		unset($res['oper_type']);

		if ($res['radio'] == '否') {
			unset($res['radio']);
			unset($res['password']);
		}else {
			unset($res['radio']);
			$res['password'] = password_hash($res['password'],PASSWORD_DEFAULT);
		}
		
		if ($this->db->where('id',$res['id'])->update('user',$res)) {
			return self::state(200,'SUCCESS');
		}
		return self::state(500,'FAIL');
	}

	//删除用户
	public function del ($res) {

		if ($this->db->delete('user', array('id' => $res['id']))) {
			return self::state(200,'SUCCESS');
		}
		return self::state(500,'FAIL');
	}


	//查询用户名是否已存在
	public function equal ($res)
	{
		$this->db->select('id')->from('user')->where('username',$res['username']);
		$query = $this->db->get();
		if ($query->num_rows()>0) {
			return self::state(200,'用户名已存在');
		}else {
			$res['password'] = password_hash($res['password'],PASSWORD_DEFAULT);
			if ($this->db->insert('user',$res)) {
				$new_id = $this->db->insert_id();
				$resource = $this->course_model->sel_data($table = 'user',$new_id);
				return self::state(200,'SUCCESS',$resource);
			}else{
				return self::state(500,'FAIL');
			}
		}
	}

	//转json数据
	public static function state($code,$mess,$data = NULL){
        return json_encode([
            'code'=>$code,
            'msg'=>$mess,
            'data'=>$data
        ]);
    }
}