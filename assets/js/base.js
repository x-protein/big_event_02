$(function () {
    let baseURL = "http://api-breakingnews-web.itheima.net";

    $.ajaxPrefilter(function (params) {
        // console.log(params);
        params.url = baseURL + params.url;
        if (params.url.indexOf("/my/") !== -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
            }

            params.complete = function (res) {
                // console.log(res.responseJSON);
                let obj = res.responseJSON;
                if (obj.status == 1 && obj.message == '身份认证失败！') {
                    localStorage.getItem('token')
                    location.href = '/login.html'
                }
            }
        }
    })
})