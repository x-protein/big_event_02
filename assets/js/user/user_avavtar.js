$(function () {

    // 获取裁剪区域 dom 元素
    let $image = $('#image');


    // 配置选项
    const options = {
        // 从横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }


    // 创建裁剪区域
    $image.cropper(options);


    /* 上传头像 */
    // 选择 图片 文件
    $('#btnChooseImage').on('click', function () {
        // console.log(1);
        $('#file').click();
    });

    // 点击上传按钮后修改裁剪图片，通过 change （图片被修改）
    $('#file').on('change', function (e) {
        console.log(e.target.files[0]);
        let file = e.target.files[0];
        if (file == undefined) {
            return layer.msg('请选择照片')
        }

        let newImgURL = URL.createObjectURL(file);
        console.log(newImgURL);
        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    $('#btnUpload').on('click', function () {
        //   console.log(1);  
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');

            $.ajax({
               url: "/my/update/avatar",
               type: "POST",
               data: { avatar:dataURL },
               success: (res) => {
                   console.log(res);
                       if(res.status === 0){
                           layer.msg('更新头像成功');
                           window.parent.getUserInof();
                       }else{
                        layer.msg(res.messge);
                       }
               }
            });
    })
})