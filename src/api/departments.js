import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
// 删除部门
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
// 增加部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
// 根据id获取部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
// 更新部门
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
