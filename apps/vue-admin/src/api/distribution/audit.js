import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    url: '/api/abp/partner/registration',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 详情
export function detail(id) {
  return request({
    url: `/api/abp/partner/registration/${id}`,
    method: 'get'
  })
}

// 申请
export function apply(data) {
  return request({
    url: '/api/abp/partner/registration/apply',
    method: 'post',
    data: data
  })
}

// 审核
export function approve(id, input) {
  return request({
    url: `/api/abp/partner/registration/approve`,
    method: 'post',
    params: { id },
    data: input // 使用 data 属性来发送请求体数据
  })
}
