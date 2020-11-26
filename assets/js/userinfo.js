$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 4) {
                return '昵称长度必须在 1 ~ 4个字符之间！'
            }
        }
    })
    initUserInfo()
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                console.log(res)
                // 调用layui里面 form.val() 方法为表单赋值
                layui.form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为 也可以直接把按钮的type改成普通按钮 button
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(), //获取表单内容
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')
                // window.parent window.top调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})
