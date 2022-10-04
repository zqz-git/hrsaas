const getters = { // 定义计算属性，属性值是函数，第一个参数是state，必须有返回值，此getter是全局getter，不是局部
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // state.模块名.模块数据
  name: state => state.user.userInfo.username, // 建立用户名映射
  userId: state => state.user.userInfo.userId, // 建立用户id映射
  staffPhoto: state => state.user.userInfo.staffPhoto // 建立用户头像映射
}
export default getters
