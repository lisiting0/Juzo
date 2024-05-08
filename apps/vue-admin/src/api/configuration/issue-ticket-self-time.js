// 代理
import request from '@/utils/request'

// 查询自营出票时间配置
export function query() {
  return request({
    url: '/api/order/manager/ticket/auto/self/query',
    method: 'get'
  })
}

// 修改自营出票时间配置
export function update(data) {
  return request({
    url: '/api/order/manager/ticket/auto/self/update',
    method: 'put',
    data: data
  })
}
