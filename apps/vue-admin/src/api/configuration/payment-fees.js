// 代理
import request from '@/utils/request'

// 查询
export function queryPaymentFeesList() {
  return request({
    url: '/api/payment/manager/channel/fees/all',
    method: 'get'
  })
}

// 修改手续费
export function updatePaymentFees(data) {
  return request({
    url: '/api/payment/manager/channel/fees/update',
    method: 'post',
    data: data
  })
}
