// 人口函数
$(function () {
    /* 需求1：注册，登录之间的跳转 */
    /* 1.显示隐藏注册与登录 */
    $('.login-box').show();
    $('.reg-box').hide();
    /* 2.点击去注册账号 隐藏登录页面 显示注册页面 */
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    /* 3.点击登录 隐藏注册页面 显示登录页面 */
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 查看 layui 的属性 
    console.log('查看 layui 的属性', layui);

    // 声明 form 变量
    let form = layui.form;
    console.log(form);

    /* 表单验证 */
    form.verify({
        // 1.验证用户面是否有特殊符号
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },
        // 2.验证密码的字段 6 - 12
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd:function (value,item) {
            console.log($('.reg_box input[name="password"]').val());
            if(value != $('.reg_box input[name="password"]').val()){
                return '密码不一致';
            }
            
        }

    });


    let layer = layui.layer;
    // console.log(layer);
    // // 注册页面
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "http://api-breakingnews-web.itheima.net/api/reguser",
            type: "POST",
            data: {

            },
            success: (res) => {
                console.log(res);

            }
        });
    })


    // 登录页面

});