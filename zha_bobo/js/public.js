/**
 * Created by chenaifeio on 2017/9/15 0015.
 */
var UIAlertController = {
    page_addbtn: function (page) {
        $("#" + page + " .add_" + page).on("click", function () {
            $("#pop_up").remove();
            //插入弹框
            $("body").append(up_box(page, "add"));
            //弹框显示动画
            mengcengcolse.pop_up_box_show();
            //点击弹框非内容部分关闭弹框
            $("#pop_up").on("click", mengcengcolse.pop_up_box);
            //弹框关闭按钮
            $("#img-circle").on("click", mengcengcolse.pop_up_btn);
            //保存按钮
            $("#add_emmet").on("click", mengcengcolse.pop_uo_add);
            UIAlertController.pageclick(page);
        })
    },
    pageclick: function (page) {
        if (page != "username") {
            var upimgs = "", imgsrc = "";
            if (page == "classify") {
                upimgs = document.getElementById("classify_img");
                imgsrc = $(".upimg");
            }
            else if (page == "course") {
                $("#course_classify").on("click", function () {
                    $("#selectbox").slideDown();
                    $("#selectbox li").removeClass("sdasda");
                    for (var z = 0; z < $("#selectbox li").length; z++) {
                        if ($("#course_classify").html() == $("#selectbox li").eq(z).html()) {
                            $("#selectbox li").eq(z).addClass("sdasda")
                        }
                    }
                    $("#selectbox li").on("click", function () {
                        $("#course_classify").html($(this).html());
                        $("#cgname").val($(this).attr("id"));
                        $("#selectbox").slideUp();
                    })
                });
                upimgs = document.getElementById("course_img");
                imgsrc = $(".kcupimg");
            }
            else if (page == "carousel") {
                upimgs = document.getElementById("carousel_img");
                imgsrc = $(".lbupimg");
            }

            mengcengcolse.pop_upimg(upimgs, imgsrc);
        }
        else {
            $(".form-group input").on("focus", function () {
                var index = $(".form-group input").index($(this));
                $(".form-group .subtitles").eq($(".subtitles").length - 1).html("");
                if (index == 1) {
                    if ($("#user-name").val() == "") {
                        $(".form-group .subtitles").eq($(".subtitles").length - 1).html("用户名不能为空");
                        return;
                    }
                }
                else if (index == 2) {
                    if ($("#user-name").val() == "") {
                        $(".form-group .subtitles").eq($(".subtitles").length - 1).html("用户名不能为空");
                        return;
                    } else if ($("#password").val() == "") {
                        $(".form-group .subtitles").eq($(".subtitles").length - 1).html("密码不能为空");
                        return;
                    } else if (!sds.test($("#password").val())) {
                        $(".form-group .subtitles").eq($(".subtitles").length - 1).html("密码格式不正确");
                        return;
                    }
                }
            })
        }
    }
};
/**
 * 弹窗
 * pageid string 页面id
 * operation_type 操作类型 add 添加操作 com 编辑操作
 * */
function up_box(pageid, operation_type) {
    var str = '<div id="pop_up" class="pop_up">' +
        '<div class="pop_up_box" style="top: 15%;">' +
        '<span class="pull-right" style="position:relative;top: -43px;right: -36px;cursor: pointer">' +
        '<img src="images/colse.png" alt="关闭" id="img-circle" class="img-circle">' +
        '</span>' +
        '<div class="dropdown-header">' + htmldata[pageid][operation_type].title + '</div>' +
        '<div class="form_box">';
    // 用户
    if (pageid == "username") {
        if (operation_type == "add") {
            str += '<div class="form-group">' +
                '<label for="user-name" class="input-text">用户名</label>' +
                '<input type="text" id="user-name" class="form-control" placeholder="请添加用户名">' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="password" class="input-text">密码</label>' +
                '<input type="password" id="password" class="form-control" placeholder="请设置6-20位数字、英文组合密码">' +
                '</div>' +
                '<div class="form-group" style="height: 56px">' +
                '<label for="password2" class="input-text">确认密码</label>' +
                '<input type="password" id="password2" class="form-control" placeholder="确认密码">' +
                '<p class="subtitles"></p>' +
                '</div>';
        }
        else if (operation_type == "com") {
            str += '<div class="form-group">' +
                '<label for="user-name" class="input-text">用户名</label>' +
                '<input type="text" id="user-name" class="form-control" value="' + compiledata.用户名 + '">' +
                '</div>' +
                '<div class="form-group">' +
                '<label for="" class="input-text">修改密码</label>' +
                '<label for="n" class="rdo"><input type="radio" value="否"  name="yes" id="n" class="ds" checked="checked">否</label>' +
                '<label for="y" class="rdo"><input type="radio" value="是"  name="yes" id="y">是</label>' +
                '</div>' +
                '<input type="hidden" value="否" id="rdo"> <div id="upw" style="display: none;">' +
                '<div class="form-group">' +
                '<label for="password" class="input-text">密码</label>' +
                '<input type="password" id="password" class="form-control" placeholder="输入您的新密码">' +
                '</div>' +
                '<div class="form-group" style="height: 56px">' +
                '<label for="password2" class="input-text">确认密码</label>' +
                '<input type="password" id="password2" class="form-control" placeholder="确认密码">' +
                '<p class="subtitles"></p>' +
                '</div>' +
                '</div>';
        }
    }
    // 分类
    else if (pageid == "classify") {
        var namse = "", numbersd = "", upicon = "images/upimg.png";
        if (operation_type == "com") {
            namse = compiledata.分类名称;
            numbersd = compiledata.分类序号;
            upicon = compiledata.分类图标;
        }
        str += '<form id="classifymain"><div class="form-group"><div class="form-group">' +
            '<label for="classify_name" class="input-text">分类名称</label>' +
            '<input type="text" id="classify_name" class="form-control" value="' + namse + '" placeholder="例如：文学">' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="classify_number" class="input-text">分类编号</label>' +
            '<input type="number" id="classify_number" class="form-control" value="' + numbersd + '"  placeholder="01">' +
            '</div>' +
            '<div class="form-group">' +
            '<label class="input-text">分类图标</label>' +
            '<img src="' + upicon + '" alt="上传图片" class="upimg pop_upimg">' +
            '<p class="title_text">你可以上传JPG、PNG的图标文件，推荐大小（44*44）</p>' +
            '<span class="upbtn" style="margin-left: 80px;">选择文件<input type="file" id="classify_img"></span>' +
            '<span class="upbtn upbtntwo">上传图标</span>' +
            '</div></form>';
    }
    // 课程
    else if (pageid == "course") {
        var name = "",
            teacher = "",
            school = "",
            major = "",
            cgclassid = Insertdata.category[0].id,
            cgclassify = Insertdata.category[0].cg_name,
            courseicon = "images/kcupimg.png ";
        if (operation_type == "com") {
            name = Insertdata.course[compiledata["index"]].course_name;
            teacher = Insertdata.course[compiledata["index"]].teacher;
            school = Insertdata.course[compiledata["index"]].tea_school;
            major = Insertdata.course[compiledata["index"]].tea_major;
            cgclassid = Insertdata.course[compiledata["index"]].id;
            cgclassify = Insertdata.course[compiledata["index"]].cg_name;
            courseicon = Insertdata.course[compiledata["index"]].headpic;
        }
        str += '<form id="coursemain"><div class="form-group coursef">' +
            '<input type="hidden" id="cgname" value="' + cgclassid + '"><label for="course_classify" class="input-text">课程分类</label>' +
            '<button type="button" id="course_classify" class="form-control">' + cgclassify + '</button>' +
            '<ul class="selectbox" id="selectbox">';
        for (var key in Insertdata.category) {
            str += '<li id="' + Insertdata.category[key].id + '">' + Insertdata.category[key].cg_name + '</li>';
        }
        str += '</ul></div>' +
            '<div class="form-group coursef">' +
            '<label for="course_name" class="input-text">课程名称</label>' +
            '<input type="text" id="course_name" class="form-control" value="' + name + '" placeholder="">' +
            '</div>' +
            '<div class="form-group coursef">' +
            '<label for="course_teacher" class="input-text">课程教师</label>' +
            '<input type="text" id="course_teacher" class="form-control" value="' + teacher + '" placeholder="">' +
            '</div>' +
            '<div class="form-group coursef">' +
            '<label for="course-school" class="input-text">教师学校</label>' +
            '<input type="text" id="course_school" class="form-control" value="' + school + '" placeholder="">' +
            '</div>' +
            '<div class="form-group coursef">' +
            '<label for="teacher-major" class="input-text">教师专业</label>' +
            '<input type="text" id="teacher_major" class="form-control" value="' + major + '" placeholder="">' +
            '</div>' +
            '<div class="form-group coursef">' +
            '<label for="course_url" class="input-text">课程链接</label>' +
            '<input type="text" id="course-url" class="form-control" placeholder="例如：https://www.baidu.com">' +
            '</div>' +
            '<div class="form-group coursef" style="margin-bottom: 59px">' +
            '<label class="input-text courseL">上传头像</label>' +
            '<img src="' + courseicon + '" alt="上传图片" class="kcupimg">' +
            '<p class="title_text">你可以上传JPG、PNG的图标文件，文件大小不能超过2M，推荐大小（110*110）</p>' +
            '<span class="upbtn" style="margin-left: 80px;">选择文件<input type="file" id="course_img"></span>' +
            '<span class="upbtn upbtntwo">上传图标</span>' +
            '</div></form>';
    }
    // 轮播
    else if (pageid == "carousel") {
        var carouselicon = "images/lbupimg.png";
        if (operation_type == "com") {
            carouselicon = compiledata.缩略图;
        }
        str += '<form id="carouselmain"><div class="form-group coursef" style="margin-bottom: 72px;margin-top: 52px">' +
            '<label class="input-text courseL">上传图片</label>' +
            '<img src="' + carouselicon + '" alt="上传图片" class="lbupimg">' +
            '<p class="title_text">你可以上传JPG、PNG的图标文件，文件大小不能超过4M，推荐大小（250*136）</p>' +
            '<span class="upbtn" style="margin-left: 80px;">选择文件<input type="file" id="carousel_img"></span>' +
            '<span class="upbtn upbtntwo">上传文件</span>' +
            '</div></form>';
    }
    str += '<div class="pull-right"><span id="add_emmet" class="btn btn-primary">' + htmldata[pageid][operation_type].button + '</span></div></div></div></div>';
    return str;
}
/**
 * 列表
 * page 字符串
 * 参数可选项有：
 * 用户 user 分类 classify 课程 course 轮播 carousel
 * */
function all_list(page, username) {
    var str = "";
    $.each(username[page], function (index, obj) {
        //用户列表页
        if (page == "username") {
            str += '<li id="' + obj.id + '">' +
                '<div class="pull-left">' +
                '<img class="checkbox" src="images/correct1.png" alt="多选框">' +
                '<span class="text-justify">' + obj.username + '</span>' +
                '</div>';
        }
        //分类列表页
        else if (page == "classify") {
            str += '<li id="' + obj.id + '">' +
                '<div class="pull-left">' +
                '<img class="checkbox" src="images/correct1.png" alt="多选框">' +
                '<span class="text-justify">' + obj.sort_num + '</span>' +
                '</div>' +
                '<div class="pull-left"><span class="text-justify">' + obj.cg_name + '</span></div>' +
                '<div class="pull-left"><img src="' + obj.cg_lcon + '" alt="上传图片" class="upimg"></div>';
        }
        //课程列表页
        else if (page == "course") {
            var data = new Date();
            str += '<li id="' + obj.id + '">' +
                '<div class="pull-left">' +
                '<img class="checkbox" src="images/correct1.png" alt="多选框">' +
                '<span class="text-justify">' + obj.course_name + '</span>' +
                '</div><div class="pull-left"><span class="text-justify">' + obj.cg_name + '</span></div>' +
                '<div class="pull-left"><span class="text-justify">' + obj.teacher + '</span></div>' +
                '<div class="pull-left">' +
                '<span class="text-justify">' + obj.category_id + '</span>' +
                '<span class="text-justify">' + formatDate(data) + '</span>' +
                '</div>';
        }
        //轮播列表页
        else if (page == "carousel") {
            if (obj.id < 9) {
                obj.id = "0" + obj.id;
            }
            str += '<li id="' + obj.id + '"><div class="pull-left"><img class="checkbox" src="images/correct1.png" alt="多选框"><span class="text-justify">' + obj.id + '</span></div><div class="pull-left"><img src="' + obj.path + '" alt="预览图" class="yulantu"></div>';
        }
        str += '<div class="pull-right"><div style="line-height: 76px">' +
            '<span class="center-block">编辑</span>' +
            '<span class="colse_userlist">删除</span>' +
            '</div></div></li>';
    });
    return str;
}
/**
 * 单个多选框点击 编辑点击 单个删除点击 全选点击  全选旁边删除点击
 * 参数
 * page 列表父级 id strong
 *
 * */
var checkboxarr = {};
var c_arr = [];
function checkbox_listclick(page) {
    // 列表点击
    $("#"+ page +"_list li").on("click", function (event) {
        var ev = event || window.event;
        var index = $("#"+ page +"_list li").index($(this));
        // 判断 点击元素
        if ($(ev.target).attr("class") == $("#"+ page +"_list li").find(".checkbox").eq(index).attr("class")) {
            //选中
            if ($("#"+ page +"_list li").find(".checkbox").eq(index).attr("src") == "images/correct1.png") {
                c_arr.push($("#"+ page +"_list li").eq(index).attr("id"));
                $("#"+ page +"_list li").find(".checkbox").eq(index).attr("src", "images/correct.png");
            }
            //未选择
            else {
                c_arr = checkboxarr[page +"_list"];
                for (var i = 0; i < c_arr.length; i++) {
                    if (c_arr[i] == $("#"+ page +"_list li").eq(index).attr("id")) {
                        c_arr.splice(i, 1);
                    }
                }
                $("#"+ page +"_list li").find(".checkbox").eq(index).attr("src", "images/correct1.png");
            }

            checkboxarr[page +"_list"] = c_arr;
            //判断是否全选
            if ($(checkboxarr[page +"_list"]).length == $("#"+ page +"_list li").length) {
                $("#" + page + " .btn-box .checkbox").attr("src", "images/correct.png");
            }
            else {
                $("#" + page + " .btn-box .checkbox").attr("src", "images/correct1.png");
            }
        }
        // 编辑
        else if ($(ev.target).attr("class") == "center-block") {
            var header_pl = $("#" + page_id).prevAll(".dropdown-header").find(".pull-left .text-justify");
            compiledata = {};
            //获取当前li元素里面的内容
            for (var j = 0; j < header_pl.length; j++) {
                compiledata[header_pl.eq(j).html()] = $("#"+ page +"_list li").eq(index).find(".text-justify").eq(j).html();
            }
            compiledata["index"] = index;
            switch (page) {
                case "username":
                    $("body").append(up_box(page, "com"));
                    UIAlertController.pageclick(page);
                    break;
                case "classify":
                    compiledata.分类图标 = $("#"+ page +"_list li").eq(index).find(".upimg").attr("src");
                    $("body").append(up_box(page, "com"));
                    UIAlertController.pageclick(page);
                    break;
                case "course":
                    $("body").append(up_box(page, "com"));
                    UIAlertController.pageclick(page);
                    break;
                case "carousel":
                    compiledata.缩略图 = $("#"+ page +"_list li").eq(index).find(".yulantu").attr("src");
                    $("body").append(up_box(page, "com"));
                    UIAlertController.pageclick(page);
                    break;
            }
            //弹框显示动画
            mengcengcolse.pop_up_box_show();
            //点击弹框非内容部分关闭弹框
            $("#pop_up").on("click", mengcengcolse.pop_up_box);
            //弹框关闭按钮
            $("#img-circle").on("click", mengcengcolse.pop_up_btn);
            //保存按钮
            $("#add_emmet").on("click", mengcengcolse.pop_uo_add);
            $("#pop_up input[type='radio']").on("click", function () {
                $("#rdo").val($(this).val());
                $("#upw").hide();
                if ($(this).val() == "是") {
                    $("#upw").show();
                }
            })
        }
        // 单条删除
        else if ($(ev.target).attr("class") == "colse_userlist") {
            var list_id = $("#"+ page +"_list li").eq(index).attr("id");
            var url = "";
            if (page == "username") {
                url = www + "routine/user/user";
            } else if (page == "classify") {
                url = www + "routine/category/category";
            } else if (page == "course") {
                url = www + "routine/course/course";
            } else if (page == "carousel") {
                url = www + "routine/picture/picture";
            }
            var r = confirm("确认删除此条数据？");
            if (r) {
                $.ajax({
                    url: url,
                    type: "POST",
                    data: {
                        oper_type: "DEL",
                        id: list_id,
                        public_token: public_token
                    },
                    success: function (data) {
                        var Ndata = JSON.parse(data);
                        if (Ndata.code == 200) {
                            $("#"+ page +"_list li").eq(index).remove()
                        }
                    },
                    erro: function (data) {
                        console.log(data);
                    }
                })
            } else {
                console.log("取消")
            }
        }
    });
}
function checkbox_all(page) {
    //全选按钮
    $("#" + page + " .btn-box .checkbox").on("click", function () {
        if ($("#"+ page +"_list li").length > 0) {
            c_arr = [];
            if ($("#" + page + " .btn-box .checkbox").attr("src") == "images/correct1.png") {
                for (var j = 0; j < $("#"+ page +"_list li").length; j++) {
                    $("#"+ page +"_list li").find(".checkbox").eq(j).attr("src", "images/correct.png");
                    c_arr.push($("#"+ page +"_list li").eq(j).attr("id"));
                }
                $("#" + page + " .btn-box .checkbox").attr("src", "images/correct.png");
            } else if ($("#" + page + " .btn-box .checkbox").attr("src") == "images/correct.png") {
                for (var h = 0; h < $("#"+ page +"_list li").length; h++) {
                    $("#"+ page +"_list li").find(".checkbox").eq(h).attr("src", "images/correct1.png");
                }
                c_arr = [];
                $("#" + page + " .btn-box .checkbox").attr("src", "images/correct1.png");
            }
            checkboxarr[page+"_list"] = c_arr;
        } else {
            alert("暂无可删除数据！");
        }
    });

    //分类旁边的删除按钮
    $("#" + page + " .btn-box button.del").on("click", function () {
        if (checkboxarr[page+"_list"]) {
            c_arr = checkboxarr[page+"_list"];
            if (c_arr.length == $("#"+ page +"_list li").length) {
                if ($("#" + page + " .btn-box .checkbox").attr("src") == "images/correct1.png") {
                    $("#" + page + " .btn-box .checkbox").attr("src", "images/correct.png");
                } else {
                    $("#" + page + " .btn-box .checkbox").attr("src", "images/correct1.png");
                }
            }
            c_arr = c_arr.sort(function (a, b) {
                return b - a;
            });
            var table_name = "";if (page == "username") {table_name = "user";} else if (page == "classify") {table_name = "category";} else if (page == "course") {table_name = "course";} else if (page == "carousel") {table_name = "picture";}
            $.ajax({
                url: "http://192.168.140.75/routine/home/batch_del",
                type: "POST",
                data: {
                    id:checkboxarr[page+"_list"],
                    table:table_name
                },
                success: function (data) {
                    var ndata = JSON.parse(data);
                    if (ndata.code == 200) {
                        for (var i = 0; i < c_arr.length; i++) {
                            $("#" + page + " #" + c_arr[i]).remove();
                        }

                        c_arr = [];
                        checkboxarr[page+"_list"] = c_arr;
                    }
                },
                erro: function (data) {
                    coomsole.log(data)
                }
            });

        } else {
            console.log("无可删数据")
        }
    });
}

/**
 * 弹窗的事件
 * */
var formData = new FormData($("#classifymain")[0]);
var courseformData = new FormData($("#coursemain")[0]);
var carouselformData = new FormData($("#carouselmain")[0]);
var mengcengcolse = {
    pop_up_box_show: function () {
        $("#pop_up").animate({
            opacity: 1
        }, 250);
        $(".pop_up_box").animate({
            top: "15%"
        }, 450);
    },
    pop_up_box: function (event) {
        var ev = event || window.event;
        if ($(ev.target).attr("id") == "pop_up") {
            $(".pop_up_box").animate({
                top: "-50%"
            }, 250);
            $("#pop_up").animate({
                opacity: 0
            }, 600, function () {
                $("#pop_up").remove();
            })
        }
    },
    pop_up_btn: function (event) {
        var ev = event || window.event;
        $(".pop_up_box").animate({
            top: "-50%"
        }, 250);
        $("#pop_up").animate({
            opacity: 0
        }, 600, function () {
            $("#pop_up").remove();
        })
    },
    pop_uo_add: function (page) {
        //添加
        if ($("#pop_up .dropdown-header").html() == htmldata.username.add.title) {
            if ($("#user-name").val() == "") {
                $(".form-group .subtitles").html("用户名不能为空");
            }
            else if ($("#password").val() == "") {
                $(".form-group .subtitles").html("密码不能为空");
            }
            else if (!sds.test($("#password").val())) {
                $(".form-group .subtitles").html("密码格式不正确");
            }
            else if ($("#password2").val() == "") {
                $(".form-group .subtitles").html("确认密码不能为空");
            }
            else if ($("#password").val() != $("#password2").val()) {
                $(".form-group .subtitles").html("两次密码不一致");
            }
            else {
                $.ajax({
                    url: "http://192.168.140.75/routine/user/user",
                    type: "post",
                    dataType: "json",
                    data: {
                        username: $("#user-name").val(),
                        password: $("#password").val(),
                        oper_type: "POST",
                        public_token: public_token,
                    },
                    success: function (data) {
                        newInsertdata.username = {};
                        if (data.code == 200) {
                            newInsertdata.username = data.data;
                            $("#username_list").append(all_list("username", newInsertdata));
                            $("#pop_up").remove();
                            checkbox_listclick("username", "username_list");
                            if($("#username_list li").length > 9){
                                paging("username",$("#username_list li").length)
                            }
                        }
                    },
                    erro: function (data) {
                        coomsole.log(data)
                    }
                })
            }
        }
        else if ($("#pop_up .dropdown-header").html() == htmldata.classify.add.title) {
            if ($("#classify_name").val() == "") {
                alert("分类名称不能为空");
            } else if ($("#classify_number").val() == "") {
                alert("分类编号不能为空");
            } else {
                formData.append("cg_name", $("#classify_name").val());
                formData.append("sort_num", $("#classify_number").val());
                formData.append("img", Insertdata.img);
                formData.append("oper_type", "POST");
                formData.append("public_token", public_token);
                $.ajax({
                    url: "http://192.168.140.75/routine/category/category",
                    type: "POST",
                    data: formData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        var ndata = JSON.parse(data);
                        newInsertdata.classify = [];
                        if (ndata.code == 200) {
                            newInsertdata.classify = ndata.data;
                            $("#classify_list").append(all_list("classify", newInsertdata));
                            $("#pop_up").remove();
                            checkbox_listclick("classify", "classify_list");
                            if($("#classify_list li").length > 9){
                                paging("classify",$("#classify_list li").length)
                            }
                        }
                    },
                    erro: function (data) {
                        coomsole.log(data)
                    }
                })
            }
        }
        else if ($("#pop_up .dropdown-header").html() == htmldata.course.add.title) {
            if ($("#course_name").val() == "") {
                alert("课程名称不能为空");
            }
            else if ($("#course_teacher").val() == "") {
                alert("课程教师不能为空");
            }
            else if ($("#teacher_major").val() == "") {
                alert("教师专业不能为空");
            }
            else {
                courseformData.append("category_id", $("#cgname").val());
                courseformData.append("course_name", $("#course_name").val());
                courseformData.append("teacher", $("#course_teacher").val());
                courseformData.append("tea_school", $("#course_school").val());
                courseformData.append("tea_major", $("#teacher_major").val());
                courseformData.append("url", $("#course-url").val());
                courseformData.append("img", Insertdata.img);
                courseformData.append("oper_type", "POST");
                courseformData.append("public_token", public_token);
                $.ajax({
                    url: "http://192.168.140.75/routine/course/course",
                    type: "POST",
                    data: courseformData,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        var ndata = JSON.parse(data);
                        newInsertdata.course = [];
                        if (ndata.code == 200) {
                            newInsertdata.course = ndata.data;
                            newInsertdata.course["0"].cg_name = $("#course_classify").html();
                            $("#course_list").append(all_list("course", newInsertdata));
                            $("#pop_up").remove();
                            checkbox_listclick("course", "course_list");
                            if($("#course_list li").length > 9){
                                paging("course",$("#course_list li").length)
                            }
                        }
                    },
                    erro: function (data) {
                        coomsole.log(data)
                    }
                })
            }
        }
        else if ($("#pop_up .dropdown-header").html() == htmldata.carousel.add.title) {
            carouselformData.append("img", Insertdata.img);
            carouselformData.append("oper_type", "POST");
            carouselformData.append("public_token", public_token);
            $.ajax({
                url: "http://192.168.140.75/routine/picture/picture",
                type: "POST",
                data: carouselformData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    var ndata = JSON.parse(data);
                    newInsertdata.course = [];
                    if (ndata.status == 200) {
                        newInsertdata.carousel = ndata.data;
                        $("#carousel_list").append(all_list("carousel", newInsertdata));
                        $("#pop_up").remove();
                        checkbox_listclick("carousel", "carousel_list");
                        if($("#carousel_list li").length > 9){
                            paging("carousel",$("#carousel_list li").length)
                        }
                    }
                },
                erro: function (data) {
                    coomsole.log(data)
                }
            });
        }
        //修改
        else if ($("#pop_up .dropdown-header").html() == htmldata.username.com.title) {
            $.ajax({
                url: "http://192.168.140.75/routine/user/user",
                type: "POST",
                dataType: "json",
                data: {
                    id: $("#username_list li").eq(compiledata["index"]).attr("id"),
                    username: $("#user-name").val(),
                    password: $("#password").val(),
                    radio: $("#rdo").val(),
                    oper_type: "PUT",
                    public_token: public_token
                },
                success: function (data) {
                    if (data.code == 200) {
                        for (var i = 0; i < $("#username_list li").eq(compiledata.index).find(".text-justify").length; i++) {
                            switch (i) {
                                case 0:
                                    $("#username_list li").eq(compiledata.index).find(".text-justify").eq(i).html($("#user-name").val());
                                    break;
                            }
                        }
                        $("#pop_up").remove();
                    }
                },
                erro: function (data) {
                    coomsole.log(data);
                }
            })
        }
        else if ($("#pop_up .dropdown-header").html() == htmldata.classify.com.title) {
            if (Insertdata.img == undefined) {
                Insertdata.img = 2;
            }
            formData.append("id", $("#classify li").eq(compiledata["index"]).attr("id"));
            formData.append("cg_name", $("#classify_name").val());
            formData.append("sort_num", $("#classify_number").val());
            formData.append("img", Insertdata.img);
            formData.append("oper_type", "PUT");
            formData.append("public_token", public_token);
            $.ajax({
                url: "http://192.168.140.75/routine/category/category",
                type: "POST",
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    var ndata = JSON.parse(data);
                    if (ndata.code == 200) {
                        for (var i = 0; i < $("#classify_list li").eq(compiledata.index).find(".text-justify").length + 1; i++) {
                            switch (i) {
                                case 0:
                                    $("#classify_list li").eq(compiledata.index).find(".text-justify").eq(i).html($("#classify_number").val());
                                    break;
                                case 1:
                                    $("#classify_list li").eq(compiledata.index).find(".text-justify").eq(i).html($("#classify_name").val());
                                    break;
                                case 2:
                                    $("#classify_list li").eq(compiledata.index).find(".upimg").attr("src", $("#pop_up .upimg").attr("src"));
                                    break;
                            }
                        }
                        $("#pop_up").remove();
                    }
                },
                erro: function (data) {
                    coomsole.log(data);
                }
            })
        }
        else if ($("#pop_up .dropdown-header").html() == htmldata.course.com.title) {
            var a = $("#course_name").val(), s = '', d = $("#course_teacher").val();
            if (Insertdata.img == undefined) {
                Insertdata.img = 2;
            }
            if ($("#cgname").val()) {
                courseformData.append("category_id", $("#cgname").val());
            } else {
                for (var i = 0; i < Insertdata.category.length; i++) {
                    if (Insertdata.category[i].cg_name == $("#course_classify").html()) {
                        s = $("#course_classify").html();
                        courseformData.append("category_id", Insertdata.category[i].id);
                    }
                }
            }
            courseformData.append("course_name", $("#course_name").val());
            courseformData.append("teacher", $("#course_teacher").val());
            courseformData.append("tea_school", $("#course_school").val());
            courseformData.append("tea_major", $("#teacher_major").val());
            courseformData.append("headpic", $("#course-url").val());
            courseformData.append("img", Insertdata.img);
            courseformData.append("id", $("#course_list li").eq(compiledata["index"]).attr("id"));
            courseformData.append("oper_type", "PUT");
            courseformData.append("public_token", public_token);
            $.ajax({
                url: "http://192.168.140.75/routine/course/course",
                type: "POST",
                data: courseformData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    var ndata = JSON.parse(data);
                    if (ndata.code == 200) {
                        for (var i = 0; i < $("#course_list li").eq(compiledata.index).find(".text-justify").length; i++) {
                            switch (i) {
                                case 0:
                                    Insertdata.course[compiledata["index"]].course_name = a;
                                    $("#course_list li").eq(compiledata.index).find(".text-justify").eq(i).html(a);
                                    break;
                                case 1:
                                    Insertdata.course[compiledata["index"]].cg_name = s;
                                    $("#course_list li").eq(compiledata.index).find(".text-justify").eq(i).html(s);
                                    break;
                                case 2:
                                    Insertdata.course[compiledata["index"]].teacher = d;
                                    $("#course_list li").eq(compiledata.index).find(".text-justify").eq(i).html(d);
                                    break;
                            }
                        }
                        $("#pop_up").remove();
                    }
                },
                erro: function (data) {
                    coomsole.log(data);
                }
            })

        }
        else if ($("#pop_up .dropdown-header").html() == htmldata.carousel.com.title) {
            carouselformData.append("id", compiledata.分类序号);
            carouselformData.append("img", Insertdata.img);
            carouselformData.append("oper_type", "PUT");
            carouselformData.append("public_token", public_token);
            $.ajax({
                url: "http://192.168.140.75/routine/picture/picture",
                type: "POST",
                data: carouselformData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    var ndata = JSON.parse(data);
                    if (ndata.code == 200) {
                        $("#carousel_list li").eq(compiledata.index).find("img").attr("src", $("#pop_up .lbupimg").attr("src"));
                        $("#pop_up").remove();
                    }
                },
                erro: function (data) {
                    coomsole.log(data)
                }
            });


        }
    },
    pop_upimg: function (up_img, imgsrc) {
        up_img.onchange = function () {
            var imgUrl = window.URL.createObjectURL(up_img.files.item(0));
            Insertdata.img = up_img.files[0];
            imgsrc.eq(imgsrc.length - 1).attr("src", imgUrl);
        }
    }
};

/**
 * 分页
 * */
function paging(page,number) {
    var sts = '<li class="active"><a href="#">1</a></li>';
    for (var i = 1; i < number; i++) {
        if (i % 10 ==0) {
            page++;
            sts += '<li><a href="#">'+ page + '</a></li>';
        }
    }
    sts += '<li><a href="#"aria-label="Next"style="font-size: 20px;font-weight: 100;line-height: 20px"><span aria-hidden="true">&raquo;</span></a></li><li><a href="#">尾页</a></li>';
    $("#"+page+" .pagination").html("");
    $("#"+page+" .pagination").append(sts);
}
var uspage = 1;
$("#username .pagination").on("click","li",function (event) {
    var maxpage = $("#username .pagination li").length -3;
    $("#username .pagination li").removeClass("active");
    if($("#username .pagination li").eq($(this).index()).text() == "尾页"){
        uspage = maxpage+1;
        $("#username .pagination li").eq(maxpage).addClass("active");
    }else if($("#username .pagination li").eq($(this).index()).text() =="»"){
        ++uspage;
        if(uspage >= maxpage+1){
            uspage = maxpage+1;
        }
        $("#username .pagination li").eq(uspage-1).addClass("active");
    }else {
        uspage = $("#username .pagination li").eq($(this).index()).text();
        $("#username .pagination li").eq(uspage-1).addClass("active");
    }
    $.ajax({
        url: www + "routine/user/user",
        type: "POST",
        async: true,
        data: {
            page:uspage,
            oper_type: "GET",
            public_token: public_token
        },
        success: function (data) {
            $("#username_list").html("");
            var Ndata = JSON.parse(data);
            if (Ndata.msg == "SUCCESS") {
                Insertdata.username = Ndata.data;
                $("#username_list").append(all_list("username", Insertdata));
                user();
            }
        },
        erro: function (data) {
            console.log(data);
        }
    })
});
var cfpage = 1;
$("#classify .pagination").on("click","li",function (event) {
    var maxpage = $("#classify .pagination li").length -3;
    $("#classify .pagination li").removeClass("active");
    if($("#classify .pagination li").eq($(this).index()).text() == "尾页"){
        cfpage = maxpage+1;
        $("#classify .pagination li").eq(maxpage).addClass("active");
    }else if($("#classify .pagination li").eq($(this).index()).text() =="»"){
        ++cfpage;
        if(cfpage >= maxpage+1){
            cfpage = maxpage+1;
        }
        $("#classify .pagination li").eq(cfpage-1).addClass("active");
    }else {
        cfpage = $("#classify .pagination li").eq($(this).index()).text();
        $("#classify .pagination li").eq(cfpage-1).addClass("active");
    }
    $.ajax({
        url: www + "routine/category/category",
        type: "POST",
        async: true,
        data: {
            page:cfpage,
            oper_type: "GET",
            public_token: public_token
        },
        success: function (data) {
            $("#classify_list").html("");
            var Ndata = JSON.parse(data);
            if (Ndata.code == 200) {
                Insertdata.classify = Ndata.data;
                $("#classify_list").append(all_list("classify", Insertdata));
                classify();
            }
        },
        erro: function (data) {
            console.log(data);
        }
    })
});

var cupage = 1;
$("#course .pagination").on("click","li",function (event) {
    var maxpage = $("#course .pagination li").length -3;
    $("#course .pagination li").removeClass("active");
    if($("#course .pagination li").eq($(this).index()).text() == "尾页"){
        cupage = maxpage+1;
        $("#course .pagination li").eq(maxpage).addClass("active");
    }else if($("#course .pagination li").eq($(this).index()).text() =="»"){
        ++cupage;
        if(cupage >= maxpage+1){
            cupage = maxpage+1;
        }
        $("#course .pagination li").eq(cupage-1).addClass("active");
    }else {
        cupage = $("#course .pagination li").eq($(this).index()).text();
        $("#course .pagination li").eq(cupage-1).addClass("active");
    }
    $.ajax({
        url: www + "routine/course/course",
        type: "POST",
        async: true,
        data: {
            page: cupage,
            oper_type: "GET",
            public_token: public_token
        },
        success: function (data) {
            var Ndata = JSON.parse(data);
            if (Ndata.code == 200) {
                $("#course_list").html("");
                Insertdata.course = Ndata.data;
                Insertdata.category = Ndata.category;
                $("#course_list").append(all_list("course", Insertdata));
                course();
            } else {
                alert(Ndata.msg);
            }
        },
        erro: function (data) {
            console.log(data);
        }
    })




    // var sd = $("#course .pagination li");
    // $("#course .pagination li").removeClass("active")
    // var page = Number();
    // console.log(page);
    // if($(ev.target).text() == "»"){
    //      page +=1;
    // }
    // $(ev.target).text();

    //

});

var clpage = 1;
$("#carousel .pagination").on("click","li",function (event) {
    var maxpage = $("#carousel .pagination li").length -3;
    $("#carousel .pagination li").removeClass("active");
    if($("#carousel .pagination li").eq($(this).index()).text() == "尾页"){
        clpage = maxpage+1;
        $("#carousel .pagination li").eq(maxpage).addClass("active");
    }else if($("#carousel .pagination li").eq($(this).index()).text() =="»"){
        ++clpage;
        if(clpage >= maxpage+1){
            clpage = maxpage+1;
        }
        $("#carousel .pagination li").eq(clpage-1).addClass("active");
    }else {
        clpage = $("#carousel .pagination li").eq($(this).index()).text();
        $("#carousel .pagination li").eq(clpage-1).addClass("active");
    }
    $.ajax({
        url: www + "routine/picture/picture",
        type: "POST",
        async: true,
        data: {
            oper_type: "GET",
            public_token: public_token
        },
        success: function (data) {
            $("#carousel_list").html("");
            var Ndata = JSON.parse(data);
            if (Ndata.code == 200) {
                Insertdata.carousel = Ndata.data;
                $("#carousel_list").append(all_list("carousel", Insertdata));
                carousel();
            }
        },
        erro: function (data) {
            console.log(data);
        }
    })
});




//时间戳转  日期
function formatDate(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (minute <= 9) {
        minute = "0" + minute;
    }
    return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
}