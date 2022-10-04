// 注册自定义指令

// 自定义图片超时指令对象
export const imagerror = {
  inserted(dom, options) {
    // dom是当前指令作用的对象
    // options指令中的变量的解释，具有value属性
    // 当图片由地址，但没有加载成功时，会报错，会触发图片的一个事件onerror
    dom.onerror = () => {
      // 图片加载失败
      dom.src = options.value
    }
  }
}
