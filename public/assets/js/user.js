
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

// 完成用户添加功能 
$('#btnAdd').on('click',function(){
    // 收集用户输入的数据  将表单里面的数据进行一次性获取到
    let data = $("form").serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:data,
        success:function(res) {
            userArr.push(res);
            render();
            // 将表单数据清空 
            $('input[type="email"]').val('');
            $('input[name="nickName"]').val('');
            $('input[name="password"]').val('');
            $('#status0').prop('checked',false);
            $('#status1').prop('checked',false);
            $('#admin').prop('checked',false);
            $('#normal').prop('checked',false);
            $('#hidden').val('');
            $('#previewImg').attr('src','../assets/img/default.png')
        },
        error:function(err) {
            console.log(err)
        }
    })
});

// 给编辑按钮注册点击事件 事件委托 
$('tbody').on('click','.edit',function(){
    $('h2').html('编辑用户');
    // 获取当前被点击的这个元素的父级元素 tr 
    let tr = $(this).parents('tr');
    
    $('#previewImg').attr("src",tr.find('img').attr('src'));
    $('#hidden').val(tr.find('img').attr('src'));
    $('input[name="email"]').val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text());
    
    if(tr.children().eq(4).text() == '激活') {
        $('#status1').prop('checked',true);
    }else {
        $('#status0').prop('checked',true);
    }


    if(tr.children().eq(5).text() == '超级管理员') {
        $('#admin').prop('checked',true);
    }else {
        $('#normal').prop('checked',true);
    }

    // 将添加按钮隐藏 同时 将遍历按钮显示出来 
    $('#btnAdd').hide();
    $('#btnEdit').show();

})
