import request from '@/utils/request'

// 获取订单下所有的保险订单
export function queryOrderInsurance(orderNo, data) {
  return request({
    api: 'order',
    url: `/manager/order/insurance/query-order/${orderNo}`,
    method: 'post',
    data: data
  })
}

// 获取订单下所有的保险订单
export function queryOrderInsuranceByOrderNo(orderNo) {
  return request({
    api: 'order',
    url: `/manager/order/insurance/query-order/${orderNo}`,
    method: 'post'
  })
}

// 获取订单下所有的保险订单
export function getOriginOrderInsurance(orderNo, orderBusinessType) {
  return request({
    api: 'order',
    url: `/manager/order/insurance/query-origin-purchase/${orderNo}/${orderBusinessType}`,
    method: 'get'
  })
}

// 编辑原保险订单
export function updateOrderInsurance(data) {
  return request({
    api: 'order',
    url: `/manager/order/insurance/update-purchase`,
    method: 'put',
    data: data
  })
}

// 获取订单下自营采购的保险订单
export function getPurchaseOrderInsurance(orderNo, orderBusinessType) {
  return request({
    api: 'order',
    url: `/manager/order/insurance/query-order-purchase/${orderNo}/${orderBusinessType}`,
    method: 'get'
  })
}
