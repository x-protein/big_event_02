$(function () {
    /* 效验表单 */
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        newPwd: function (value) {
            // console.log(1, value.trim().length);
            if (value === $('[name="oldPwd"]').val()) {
                return '原密码与新密码不能一致';
            }
        },
        rePwd: function (value) {
            if (value.trim() !== $('[name="newPwd"]').val()) {
                return '新密码与确认新密码必须一致';
            }
        }
    });


    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/my/updatepwd",
            type: "POST",
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message);

                }

                if (res.status === 0) {
                    return layui.layer.msg(res.message);
                    $('form')[0].reset();
                }
            }
        });
    })


})