// 完成退出功能 
$('#logout').on('click',function(){
    if(window.confirm('您真的要退出吗')){
        $.ajax({
            type:'post',
            url:'/logout',
            success:function(res) {
                location.href = 'login.html'
            },
            error:function() {
                alert("退出失败");
            }
        })
    }
})