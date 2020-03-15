// 定义一个数组  
let userArr = [];

// 发送请求
$.ajax({
    url:'/users',
    type:'get',
    success:function(res) {
        userArr = res;
        render();
    }
})

// 封装一个render方法 用于渲染页面的 
function render() {
    let html = template('userTpl',{data:userArr});
    $('tbody').html(html);
}
// 完成上传图像的功能  我们这个代码只是将图片上传到服务器了  我们还需要将图片地址写入到数据库 
// 完成用户添加的时候才写入 
// ajax来实现用户添加功能  
$('#avatar').on('change',function(){
    let formData = new FormData();
    // console.log(this.files[0])
    formData.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 只要是通过jquery中的ajax来实现文件上传的功能 就需要设置下面两个属性
        processData: false,
        contentType: false,
        success:function(res) {
            // console.log(res);
            $('#previewImg').attr("src",res[0].avatar);
            // 还需要将图片的地址保存到这个表单中的某一个表单控件属性中 
            $('#hidden').val(res[0].avatar)
        }
    })
});