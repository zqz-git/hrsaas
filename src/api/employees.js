// 员工数据请求
import request from '@/utils/request'
// 获取简单的员工信息 名字和id
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
