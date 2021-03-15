$(function () {
    /* 效验表单 */
    let form = layui.form;
    form.verify({
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
        }

        //我们既支持上述pwd函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , nickname: function (value) {
            // console.log(value);
            // console.log(value.trim().length );

            if (value.trim().length < 3 || value.trim().length > 16) {
                return '用户昵称 3 ~ 16 位';
            }

        }
    });


    /* 用户名称 */
    initUserInfo();
    let layer = layui.layer;
    // console.log(layer);
    function initUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            type: "GET",
            success: (res) => {
                console.log(res);
                console.log(res.data.username);
             
                console.log(res.message);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data);
            }
        });
    };

    /* 重置 */
    $('#btnReset').on('click', function (e) {
        // console.log(1);
        e.preventDefault();
        initUserInfo();
        
    });

    /* 提交修改 */
    $('.layui-form').on('submit', function (e) {
        // console.log(1);
        e.preventDefault();
        $.ajax({
            url: "/my/userinfo",
            type: "POST",
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                // console.log(window);
                // console.log(window.parent);
                if (res.status !== 0) {
                    return layer.msg('用户修改信息失败');
                };
                layer.msg('恭喜你，用户信息修改成功');
                window.parent.getUserInof();
               
                
            }
        });
    })
})