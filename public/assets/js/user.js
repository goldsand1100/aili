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