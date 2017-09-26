<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta HTTP-EQUIV="pragma" CONTENT="no-cache">
    <meta HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
    <meta HTTP-EQUIV="expires" CONTENT="0">
    <title>康邦微信小程序后台管理系统</title>
    <!--样式重置-->
    <link rel="stylesheet" href="https://necolas.github.io/normalize.css/latest/normalize.css">
    <!-- Bootstrap -->
    <link href="lib/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/pop_up.css" rel="stylesheet">
    <link href="css/classify.css" rel="stylesheet">
    <link href="css/course.css" rel="stylesheet">
    <link href="css/carousel.css" rel="stylesheet">


    <!--[if lt IE 9]>
    <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="navbar dhs">
    <div class="container">
        <div class="row">
            <div class="navbar-brand col-lg-3">后台管理</div>
            <div class="classify-nav col-lg-9pull-right">
                <ul class="nav navbar-nav pull-left">
                    <li class="active"><a href="javascript:void(0);">用户</a></li>
                    <li><a href="javascript:void(0);">分类</a></li>
                    <li><a href="javascript:void(0);">课程</a></li>
                    <li><a href="javascript:void(0);">轮播图</a></li>
                </ul>
                <ul class="nav navbar-nav pull-right ">
                    <li><a href="javascript:void(0);">
                            <img src="images/home.png" alt="头像" class="img-home img-rounded">
                            <span class="user-name" id="idusername">用户5</span>
                        </a></li>
                    <li><a href="javascript:void(0);">
                            <span class="glysphicon-home" title="首页"></span>
                        </a></li>
                    <li><a href="javascript:void(0);">
                            <span class="glypsshicon-off" title="退出登录"></span>
                        </a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<!--用户  username-->
<div class="container module" id="username">
    <div class="row">
        <div class="left_box">
            <div class="row">
                <div class="dropdown-header col-lg-12">
                    <div class="btn-box">
                        <button type="button" class="btn btn-primary pull-right add_username">添加用户</button>
                    </div>
                    <div>
                        <div>
                            <span class="h5">用户管理</span>
                        </div>
                        <div class="dropdown-header list-inline">
                            <div class="pull-left">
                                <img class="checkbox" src="images/correct1.png" alt="未选中">
                                <span class="text-justify">用户名</span>
                            </div>
                            <div class="pull-right">
                                <span class="text-justify">操作</span>
                            </div>
                        </div>
                        <ul class="list-inline" id="username_list"></ul>
                        <ul class="list-inline btn-box">
                            <li>
                                <div id="check_allbtn">
                                    <img class="checkbox" src="images/correct1.png" alt="全选框">
                                    <span class="text-justify">全选</span>
                                    <button type="button" class="btn btn-primary del">删除</button>
                                </div>
                            </li>
                        </ul>
                        <div class="text-center paging">
                            <nav aria-label="Page navigation">
                                <ul class="pagination"></ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--分类  classify-->
<div class="container module" id="classify" style="display: none;">
    <div class="row">
        <div class="left_box">
            <div class="row">
                <div class="dropdown-header col-lg-12">
                    <div class="btn-box">
                        <button type="button" class="btn btn-primary pull-right add_classify">添加分类</button>
                    </div>
                    <div>
                        <div>
                            <span class="h5">管理分类</span>
                        </div>
                        <div class="list-inline dropdown-header">
                            <div class="pull-left">
                                <img class="checkbox" src="images/correct1.png" alt="多选框">
                                <span class="text-justify">分类序号</span>
                            </div>
                            <div class="pull-left">
                                <span class="text-justify">分类名称</span>
                            </div>
                            <div class="pull-left">
                                <span class="text-justify">分类图标</span>
                            </div>
                            <div class="pull-right">
                                <span class="text-justify">操作</span>
                            </div>
                        </div>
                        <ul class="list-inline" id="classify_list"></ul>
                        <ul class="list-inline btn-box">
                            <li>
                                <div id="classify_check_allbtn">
                                    <img class="checkbox" src="images/correct1.png" alt="全选框">
                                    <span class="text-justify">全选</span>
                                    <button type="button" class="btn btn-primary del">删除</button>
                                </div>
                            </li>
                        </ul>
                        <div class="text-center paging">
                            <nav aria-label="Page navigation">
                                <ul class="pagination"></ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--课程  course-->
<div class="container module" id="course" style="display: none;">
    <div class="row">
        <div class="left_box">
            <div class="row">
                <div class="dropdown-header col-lg-12">
                    <div class="btn-box">
                        <button type="button" class="btn btn-primary pull-right add_course">添加课程</button>
                    </div>
                    <div>
                        <div>
                            <span class="h5">管理课程</span>
                        </div>
                        <div class="dropdown-header list-inline">
                            <div class="pull-left">
                                <img class="checkbox" src="images/correct1.png" alt="多选框">
                                <span class="text-justify">课程名称</span>
                            </div>
                            <div class="pull-left">
                                <span class="text-justify">分类</span>
                            </div>
                            <div class="pull-left">
                                <span class="text-justify">所属教师</span>
                            </div>
                            <div class="pull-left">
                                <span class="text-justify">创建者</span>
                            </div>
                            <div class="pull-right">
                                <span class="text-justify">操作</span>
                            </div>
                        </div>

                        <ul class="list-inline" id="course_list"></ul>

                        <ul class="list-inline btn-box">
                            <li>
                                <div id="course_check_allbtn">
                                    <img class="checkbox" src="images/correct1.png" alt="全选框">
                                    <span class="text-justify">全选</span>
                                    <button type="button" class="btn btn-primary del">删除</button>
                                </div>
                            </li>
                        </ul>
                        <div class="text-center paging">
                            <nav aria-label="Page navigation">
                                <ul class="pagination"></ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--轮播图  carousel-->
<div class="container module" id="carousel" style="display: none;">
    <div class="row">
        <div class="left_box">
            <div class="row">
                <div class="dropdown-header col-lg-12">
                    <div class="btn-box">
                        <button type="button" class="btn btn-primary pull-right add_carousel">添加图片</button>
                    </div>
                    <div>
                        <div>
                            <span class="h5">管理课程</span>
                        </div>
                        <div class="dropdown-header list-inline">
                            <div class="pull-left">
                                <img class="checkbox" src="images/correct1.png" alt="多选框">
                                <span class="text-justify">分类序号</span>
                            </div>
                            <div class="pull-left">
                                <span class="text-justify">缩略图</span>
                            </div>
                            <div class="pull-right">
                                <span class="text-justify">操作</span>
                            </div>
                        </div>

                        <ul class="list-inline" id="carousel_list"></ul>

                        <ul class="list-inline btn-box">
                            <li>
                                <div id="carousel_check_allbtn">
                                    <img class="checkbox" src="images/correct1.png" alt="全选框">
                                    <span class="text-justify">全选</span>
                                    <button type="button" class="btn btn-primary del">删除</button>
                                </div>
                            </li>
                        </ul>
                        <div class="text-center paging">
                            <nav aria-label="Page navigation">
                                <ul class="pagination"></ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


</body>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="lib/bootstrap.min.js"></script>
<script type="text/javascript" src="js/user.js"></script>
<script type="text/javascript" src="js/classify.js"></script>
<script type="text/javascript" src="js/course.js"></script>
<script type="text/javascript" src="js/carousel.js"></script>
<script type="text/javascript" src="js/public.js"></script>
<script type="text/javascript" src="js/getdata.js"></script>
</html>