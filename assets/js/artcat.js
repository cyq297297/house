$(function () {
    initArtCateList()

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null;
    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function () {
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return lalyui.layer.msg('新增分类失败！')
                }
                initArtCateList()
                layui.layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layui.layer.close(indexAdd)
            }
        })
    })

    // 给删除按钮绑定事件委托事件 并添加自定义属性
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // var id=this.dataset.id   新语法
        // 提示用户是否要删除
        layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除分类失败！')
                    }
                    layui.layer.msg('删除分类成功！')
                    layui.layer.close(index)
                    // 重新渲染列表
                    initArtCateList()
                }
            })
        })
    })

    // 点击编辑按钮展示修改文章分类的弹出层 通过事件委托的方式 并将数据自动添加到表单中
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        // 获取id
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // 获取文章分类数据成功 自动填到表单元素中去
                layui.form.val('form-edit', res.data)
            }
        })
    })



    // 通过事件委托 为修改按钮绑定事件 点击按钮将数据提交 并修改内容 重新渲染列表

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            // 传数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新分类数据失败！')
                }
                layui.layer.msg('更新分类数据成功！')
                layui.layer.close(indexEdit)
                // 更新数据 把修改后的内容渲染到列表中
                initArtCateList()
            }
        })
    })



    // 入口函数
})


