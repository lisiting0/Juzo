// 分销商产品配置
import request from '@/utils/request'

// 列表
export function productAgentList(query) {
  return request({
    url: '/api/product/domestic-product-agent/agent-product-reference',
    method: 'get',
    params: query
  })
}

// 修改
export function updateProductAgent(data) {
  return request({
    url: `/api/product/domestic-product-agent/agent-product-reference`,
    method: 'post',
    data: data
  })
}
