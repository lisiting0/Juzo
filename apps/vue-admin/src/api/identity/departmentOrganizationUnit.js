import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/api/abp/departments',
    method: 'get'
  })
}

export function createDepartment(data) {
  return request({
    url: '/api/abp/departments',
    method: 'post',
    data: data
  })
}

export function updateDepartment(id, data) {
  return request({
    url: `/api/abp/departments/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteDepartment(id) {
  return request({
    url: `/api/abp/departments/${id}`,
    method: 'delete'
  })
}
