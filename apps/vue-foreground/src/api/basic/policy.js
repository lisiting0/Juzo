import request from '@/utils/request'

// 列表
export function domesticPolicDetail(id) {
  return request({
    url: `/api/product/domestic-policy/${id}`,
    method: 'get'
  })
}