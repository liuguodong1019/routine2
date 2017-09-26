<?php

class Picture_model extends CB_model
{
	function __construct(){
		parent::__construct();
		$this->load->model('course_model');
	}

	//轮播图列表
	public function pic_list ($res)
	{
		$data = $this->db->select('*')->from('picture')->get()->result_array();
		if (empty($data)) {
			return self::state(404,'暂无数据');
		}
		return self::state(200,'SUCCESS',$data);
	}

	//创建轮播图
	public function insert ($res)
	{
		unset($res['public_token']);
		unset($res['oper_type']);
		$rew = $this->course_model->upload($img_file = 'picture');
		$res['path'] =  'http://192.168.140.75/routine/public/admin/images/picture/'.$rew['file_name'];
		if ($this->db->insert('picture',$res)) {
			$new_id = $this->db->insert_id();
			$resource = $this->course_model->sel_data($table = 'picture',$new_id);
			return self::state(200,'轮播图添加成功',$resource);
		}
		return self::state(500,'添加失败');
	}

	//轮播图更新
	public function put ($res)
	{
		unset($res['public_token']);
		unset($res['oper_type']);
		$rew = $this->course_model->upload($img_file = 'picture');
		$res['path'] =  'http://192.168.140.75/routine/public/admin/images/picture/'.$rew['file_name'];
		if ($this->db->where('id',$res['id'])->update('picture',$res)) {
			return self::state(200,'轮播图更新成功');
		}
		return self::state(500,'更新失败');
	}

	//删除轮播图
	public function del ($res)
	{
		if ($this->db->delete('picture', array('id' => $res['id']))) {
			return self::state(200,'删除成功');
		}
		return self::state(500,'删除失败');
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