


// delegate事件委托，可以给现在和未来的标签添加事件
$('section').delegate('img','click',function(){
    console.log('img被点击了')
    //找到对应的input，模拟点击操作
    $(this).next().click()
})

// $('img').click(function(){

// })

//选择完图片，点击打开，触发input的change事件
$('form').delegate('input','change',function(){
    console.log(this)
    var file = this.files[0]
    console.log($(this).prev())
    //修改对应img标签的src属性
    $(this).prev().attr('src',URL.createObjectURL(file))
})

// 添加占位图片
$(':button').click(function(){
    $('section').append('<img src="add.png"><input type="file" name="photo" accept="image/*">')
})

$('form').submit(function(ev){
    ev.preventDefault()
    var data = new FormData(this)
    console.log(data)
    $.ajax({
        url:'/upload',
        type:'post',
        data:data,
        contentType:false,//不使用默认的数据类型
        processData:false,//不使用默认的数据处理方式
        success:function(){
            console.log('请求成功')
        },
        error:function(){
            console.log('请求失败')
        }
    })
})
