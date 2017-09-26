<?php

/**
* 
*/
class Course_model extends CB_model
{
	function __construct(){
		parent::__construct();
	}

	//首页数据
	public function index ($data)
	{
		
		$arr = $this->res($data);
		
		return self::state(200,'SUCCESS',$arr);
			
	}

	//专业分类
	public function res ($data = null)
	{
		$this->db->select('id as cid,cg_name,cg_lcon')->from('category');
		$cate = $this->db->get()->result_array();
		$pic = $this->picture();
		$cou = $this->course($data);
		$array['pic'] = $pic;
		$array['category'] = $cate;
		$array['course'] = $cou;
		return $array;
	}

	//轮播图
	public function picture ()
	{
		$this->db->select('id,path')->from('picture');
		$pic = $this->db->get()->result_array();
		return $pic;
	}

	//首页十条课程数据
	public function course ($data = NULL)
	{
		$this->db->select('*')->from('course');
		$this->db->limit(10);
		$course = $this->db->get()->result_array();
		return $course;
	}

	//验证令牌
	public function verify ($data)
	{
		if (empty($data['public_token'])) {
			return self::state(401,'令牌错误');
		}
		$tok = $this->check();
		$public_token = $data['public_token'];
		if (password_verify($public_token,$tok)) {
			 return true;
		}else {
			 return self::state(401,'令牌错误');
		}	
	}

	//模糊查询课程+ 根据分类id查找所属课程
	public function course_all ($name = '')
	{
		$array = array('a.course_name' => $name,'a.tea_major' => $name,'b.cg_name' => $name);
		$this->db->select('a.id,a.category_id,a.course_name,a.teacher,a.tea_school,a.tea_major,a.headpic,a.read_num,a.url,b.cg_name')->from('course a')
			->join('category b','b.id = a.category_id');
		if ($name == '全部') {
			$course = $this->db->get()->result_array();
		}else {
			if (!empty($name) && is_numeric($name)) {
				$course = $this->db->where('a.category_id',$name)->get()->result_array();
			}else {
				$this->db->or_like($array);
				$course = $this->db->get()->result_array();
			}
		}
		if (empty($course)) {
			return self::state(404,'您搜索的内容不存在');
		}
		return self::state(200,'SUCCESS',$course);
	}

	//添加课程
	public function insert ($res)
	{
		
		unset($res['time']);
		unset($res['public_token']);
		unset($res['oper_type']);
		return $this->equal($res);
	}

	//课程更新
	public function put ($res)
	{
		unset($res['public_token']);
		unset($res['oper_type']);
	
		return $this->up($res);
		
	}

	//更新分类信息是否已存在(更新+删除原有图片)
	public function up ($res)
	{
		$query = $this->iset($res);
		if ($query->num_rows()>0) {
			return self::state(403,'名称已存在');
		}else {
			$data = $query->row_array();
			$rew = $this->course_model->upload($img_file = 'course');

			if (!empty($res['img'])) {
				if ($res['img'] == 2 ) {
				unset($res['img']);
				}else {
					$res['headpic'] =  'http://192.168.140.75/routine/public/admin/images/course/'.$rew['file_name'];
				}
			}
			
			if ($this->db->where('id',$res['id'])->update('course',$res)) {
				return self::state(200,'SUCCESS');
			}else {
				return self::state(500,'FAIL');
			}
		}
	}

	//删除课程
	public function del ($res)
	{
		if ($this->db->delete('course', array('id' => $res['id']))) {
			return self::state(200,'SUCCESS');
		}
		return self::state(500,'FAIL');
	}

	//后台课程列表
	public function ad_cou ($res)
	{
		$this->load->model('category_model');
		$num = $this->count($table = 'course');
		// $array = array('a.course_name' => $name,'a.tea_major' => $name,'b.cg_name' => $name);
		$this->db->select('a.id,a.category_id,a.course_name,a.teacher,a.tea_school,a.tea_major,a.headpic,a.read_num,b.cg_name')->from('course a')
			->join('category b','b.id = a.category_id','left');
		// if (!empty($res['search'])) {
		// 	$this->db->or_like($array);
		// }
		$pageSize = 10;
		$page = !empty($res['page']) ? $res['page']:1;
		$offset = ($page-1) * $pageSize;

		$this->db->limit($pageSize,$offset);
		$course = $this->db->get()->result_array();
		$category = $this->category_model->reouce();
		$array = (['code' => 200,'msg' => 'SUCCESS','data' => $course,'category' => $category,'page_num' => $num]);
		return json_encode($array);
	}

	//上传文件
	public function upload ($img_file)
	{
		$config['upload_path']      = './public/admin/images/'.$img_file;
        $config['allowed_types']    = 'gif|jpg|png';
        // $config['max_size']     = 2000;
        // $config['max_width']        = 1024;
        // $config['max_height']       = 768;
        $config['encrypt_name'] = true;
        $this->load->library('upload', $config);
        if (!$this->upload->do_upload('img'))
        {
            $error = array('error' => $this->upload->display_errors());

 			return $error;
        }else
        {
            $data = $this->upload->data();
            return $data;
        }
        
	}

	
	//计算产生token
	public function token ()
	{
	    $count = 0;
	    $return = array();
	    while ($count < 20) {
	        $return[] = mt_rand(1, 610000);
	        $return = array_flip(array_flip($return));
	        $count = count($return);
	    }
	    shuffle($return);
	    $rew = array();
	    $rew = implode('',$return);
	    $tok = password_hash($rew,PASSWORD_DEFAULT);
	    $this->cut($tok);
	    return $rew;
	}

	//更新token串
	public function cut ($token)
	{
		$data['token'] = $token;
		return $this->db->where('id',1)->update('token',$data);
	}

	//获取token
	public function check ()
	{
		$res = $this->db->select('token')->from('token')->where('id',1)->get()->row_array();
		return $res['token'];
	}

	//总条数
	public function count ($table)
	{
		$num = $this->db->select('id')->from($table)->count_all_results();
		return $num;
	}

	//查询课程名称是否已存在
	public function equal ($res)
	{
		$this->db->select('id')->from('course')->where('course_name',$res['course_name']);
		$query = $this->db->get();
		if ($query->num_rows()>0) {
			return self::state(200,'课程名称已存在');
		}else {
			
			$rew = $this->upload($img_file = 'course');
				$res['headpic'] =  'http://192.168.140.75/routine/public/admin/images/course/'.$rew['file_name'];

			if ($this->db->insert('course',$res)) {
				$new_id = $this->db->insert_id();
				$resource = $this->sel_data($table = 'course',$new_id);
				return self::state(200,'课程添加成功',$resource);
			}else {
				return self::state(500,'添加失败[服务器内部错误]');
			}
			
		}
	}


	//根据分类名称和序号查询
	public function iset ($res)
	{
		$this->db->select('id')->from('course')
		->where('id !=',$res['id'])->where('course_name',$res['course_name']);
		$query = $this->db->get();
		return $query;
	}

	//根据id查询
	public function sel_data ($table,$id)
	{
		return $this->db->select('*')->from($table)->where('id',$id)->get()->result_array();
	}

	//转json数据
	public static function state($code,$mess,$data = NULL){
	    return json_encode([
	        'code'=>$code,
	        'msg'=>$mess,
	        'data'=>$data
	    ]);
	}

	
	//去除空格+转义函数
	public function remove_spaces ($data)
	{
		$res = array();
		foreach ($data as $key => $value) {
			$res[] = htmlspecialchars(trim($value));
		}
		return $res;
	}
}