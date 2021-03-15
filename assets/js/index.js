$(function () {
    getUserInof();

    $('#btnLogout').on('click', function () {
        layer.confirm('是否确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

function getUserInof() {
    $.ajax({
        url: "/my/userinfo",
        type: "GET",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        data: {},
        success: (res) => {
            // console.log(res);
            // console.log(layui.layer.msg(res.message));
            // console.log(res.data);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data);
        }
    });
};

function renderAvatar(user) {
    // console.log(user);
    let name = user.nickname || user.username;
    // console.log(name);
    $('#welcome').html(name)
    // $('#welcome1').html(name)

    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatat').hide();
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        let text = name[0].toUpperCase();
        $('.text-avatat').show().html(text);
    }
}