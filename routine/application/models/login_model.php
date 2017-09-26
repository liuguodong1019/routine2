<?php
/**
* 登录验证
*/
class Login_model extends CB_model
{
	function __construct(){
		parent::__construct();
	}

	//登录验证
	public function check ($res)
	{
		if (empty($res['username']) || empty($res['password'])) {
			return self::state(400,'该操作不能为空');
		}
		$this->db->select('id,password')->from('user')
		->where('username',$res['username']));
		$query = $this->db->get();
		if ($query->num_rows()>0) {
			$pass = $query->row_array()['password'];
			$pas = password_hash($res['password'],PASSWORD_DEFAULT);
			if (password_verify($pass,$pas)) {
				return json_encode(['code' => 200,'msg' => 'SUCCESS']);
			}
			return json_encode(['code' => 400,'msg' => 'password error']);
		}else {
			return json_encode(['code' => 400,'msg' => 'username error']);
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