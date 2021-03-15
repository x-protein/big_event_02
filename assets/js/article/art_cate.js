$(function () {
    $.ajax({
        url: "/my/article/cates",
        type: "GET",
        success: (res) => {
            console.log(res);
            let htmlStr = template('t1', { data: res.data })
            $('tbody').html(htmlStr)
        }
    });

  
})