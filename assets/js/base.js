$(function () {
    let baseURL = "http://api-breakingnews-web.itheima.net";

    $.ajaxPrefilter(function (params) {
        console.log(params);
        params.url = baseURL + params.url;

    })
})