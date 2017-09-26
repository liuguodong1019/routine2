/**
 * Created by chenaifeio on 2017/9/22.
 */
// 密码正则条件
var sds = /^[0-9A-Za-z]{6,20}$/;
var public_token = "";
var www = "http://192.168.140.75/";
var page = 1;
var compiledata = {};
var Insertdata = {
    username: {},
    classify: {},
    course: {},
    carousel: {},
    category: []
};
var newInsertdata = {
    username: {},
    classify: {},
    course: {},
    carousel: {}
};
var htmldata = {
    username: {
        add: {
            title: "添加用户",
            button: "添加"
        },
        com: {
            title: "编辑用户信息",
            button: "保存"
        }
    },
    classify: {
        add: {
            title: "添加分类",
            button: "保存"
        },
        com: {
            title: "编辑分类",
            button: "保存"
        }
    },
    course: {
        add: {
            title: "创建课程",
            button: "创建"
        },
        com: {
            title: "编辑课程",
            button: "保存"
        }
    },
    carousel: {
        add: {
            title: "添加轮播图",
            button: "保存"
        },
        com: {
            title: "编辑轮播图",
            button: "保存"
        }
    }
};
$.ajax({
    url: www + "routine/user/get_token",
    type: "POST",
    async: true,
    data: {
        oper_type: "GET"
    },
    success: function (data) {
        public_token = data;
        $.ajax({
            url: www + "routine/user/user",
            type: "POST",
            async: true,
            data: {
                oper_type: "GET",
                public_token: data
            },
            success: function (data) {
                page = 1;
                $(".pagination").html("")
                var Ndata = JSON.parse(data);
                if (Ndata.code == 200) {
                    Insertdata.username = Ndata.data;
                    $("#username_list").append(all_list("username", Insertdata));
                    var sts = '<li class="active"><a href="#">1</a></li>';
                    for (var i = 1; i < Ndata.page_num; i++) {
                        if (i % 10 ==0) {
                            page++;
                            sts += '<li><a href="#">'+ page + '</a></li>';
                        }
                    }
                    sts += '<li><a href="#"aria-label="Next"style="font-size: 20px;font-weight: 100;line-height: 20px"><span aria-hidden="true">&raquo;</span></a></li><li><a href="#">尾页</a></li>';
                    $("#username .pagination").append(sts);
                    user();
                } else if (Ndata.code == 401) {
                    alert("链接超时，令牌过期，请刷新")
                }
            },
            erro: function (data) {
                console.log(data);
            }
        })
    },
    erro: function (data) {
        console.log(data);
    }
});

/**
 * 导航事件
 * */
$(".dhs .row .classify-nav li").on("click", function () {
    var index = $(".dhs .row .classify-nav li").index($(this));
    if (index >= 4) {
        return false;
    }
    $(".dhs .row .classify-nav li").removeClass("active").eq(index).attr("class", "active");
    $(".module").hide();
    $(".module").eq(index).show();
    $(".pagination").html("")
    page = 1;
    if (index == 0) {
        $("#username_list").html("");
        $.ajax({
            url: www + "routine/user/user",
            type: "POST",
            async: true,
            data: {
                oper_type: "GET",
                public_token: public_token
            },
            success: function (data) {
                var Ndata = JSON.parse(data);
                if (Ndata.msg == "SUCCESS") {
                    Insertdata.username = Ndata.data;
                    $("#username_list").append(all_list("username", Insertdata));
                    var sts = '<li class="active"><a href="#">1</a></li>';
                    for (var i = 1; i < Ndata.page_num; i++) {
                        if (i % 10 ==0) {
                            page++;
                            sts += '<li><a href="#">'+ page + '</a></li>';
                        }
                    }
                    sts += '<li><a href="#"aria-label="Next"style="font-size: 20px;font-weight: 100;line-height: 20px"><span aria-hidden="true">&raquo;</span></a></li><li><a href="#">尾页</a></li>';
                    $("#username .pagination").append(sts);
                    user();
                }
            },
            erro: function (data) {
                console.log(data);
            }
        })
    }
    else if (index == 1) {
        $("#classify_list").html("");
        $.ajax({
            url: www + "routine/category/category",
            type: "POST",
            async: true,
            data: {
                oper_type: "GET",
                public_token: public_token
            },
            success: function (data) {
                var Ndata = JSON.parse(data);
                if (Ndata.code == 200) {
                    Insertdata.classify = Ndata.data;
                    $("#classify_list").append(all_list("classify", Insertdata));
                    var sts = '<li class="active"><a href="#">1</a></li>';
                    for (var i = 1; i < Ndata.page_num; i++) {
                        if (i % 10 ==0) {
                            page++;
                            sts += '<li><a href="#">'+ page + '</a></li>';
                        }
                    }
                    sts += '<li><a href="#"aria-label="Next"style="font-size: 20px;font-weight: 100;line-height: 20px"><span aria-hidden="true">&raquo;</span></a></li><li><a href="#">尾页</a></li>';
                    $("#classify .pagination").append(sts);
                    classify();
                }
            },
            erro: function (data) {
                console.log(data);
            }
        })
    }
    else if (index == 2) {
        $("#course_list").html("");
        $.ajax({
            url: www + "routine/course/course",
            type: "POST",
            async: true,
            data: {
                oper_type: "GET",
                public_token: public_token
            },
            success: function (data) {
                var Ndata = JSON.parse(data);
                if (Ndata.code == 200) {
                    Insertdata.course = Ndata.data;
                    Insertdata.category = Ndata.category;
                    $("#course_list").append(all_list("course", Insertdata));
                    var sts = '<li class="active"><a href="#">1</a></li>';
                    for (var i = 1; i < Ndata.page_num; i++) {
                        if (i % 10 ==0) {
                            page++;
                            sts += '<li><a href="#">'+ page + '</a></li>';
                        }
                    }
                    sts += '<li><a href="#"aria-label="Next"style="font-size: 20px;font-weight: 100;line-height: 20px"><span aria-hidden="true">&raquo;</span></a></li><li><a href="#">尾页</a></li>';
                    $("#course .pagination").append(sts);
                    course();
                } else {
                    alert(Ndata.msg);
                }
            },
            erro: function (data) {
                console.log(data);
            }
        })
    }
    else if (index == 3) {
        $("#carousel_list").html("");
        $.ajax({
            url: www + "routine/picture/picture",
            type: "POST",
            async: true,
            data: {
                oper_type: "GET",
                public_token: public_token
            },
            success: function (data) {
                var Ndata = JSON.parse(data);
                if (Ndata.code == 200) {
                    Insertdata.carousel = Ndata.data;
                    $("#carousel_list").append(all_list("carousel", Insertdata));
                    var sts = '<li class="active"><a href="#">1</a></li>';
                    for (var i = 1; i < Ndata.page_num; i++) {
                        if (i % 10 ==0) {
                            page++;
                            sts += '<li><a href="#">'+ page + '</a></li>';
                        }
                    }
                    sts += '<li><a href="#"aria-label="Next"style="font-size: 20px;font-weight: 100;line-height: 20px"><span aria-hidden="true">&raquo;</span></a></li><li><a href="#">尾页</a></li>';
                    $("#carousel .pagination").append(sts);
                    carousel();
                }
            },
            erro: function (data) {
                console.log(data);
            }
        })
    }
});