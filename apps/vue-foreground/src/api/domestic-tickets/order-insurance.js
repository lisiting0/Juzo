import request from '@/utils/request'

// 获取订单下所有的保险订单
export function queryOrderInsurance(orderNo, data) {
  return request({
    api: 'order',
    url: '/agent/order/insurance/query-order/' + orderNo,
    method: 'post',
    data: data
  })
}
