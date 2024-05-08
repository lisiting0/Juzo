import request from '@/utils/request'

// 列表
export function financeDetail() {
  return request({
    api: 'finance',
    url: '/agent/balance/detail',
    method: 'post'
  })
}
