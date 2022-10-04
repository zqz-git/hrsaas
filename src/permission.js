// n. 同意，许可；许可证，书面许可, 权限
import store from './store'

if (!store.getters.userId) {
  // 若userid不存在,调用vuex获取资料的action
  store.dispatch('user/getUserInfo')
}
