import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'order',
    url: '/manager/refund/order/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 获取订单下的客规
export function refundOrderGuestRule(orderNo) {
  return request({
    api: 'order',
    url: '/manager/refund/order/guest-rule/queryAll/' + orderNo,
    method: 'get'
  })
}
// 订单详情页面
export function refundOrderDetail(ticketrefundOrderNo, status) {
  if (status) {
    return request({
      api: 'order',
      url: `/manager/refund/order/detail/${ticketrefundOrderNo}/${status}`,
      method: 'get'
    })
  } else {
    return request({
      api: 'order',
      url: `/manager/refund/order/detail/${ticketrefundOrderNo}`,
      method: 'get'
    })
  }
}

// 确认退票
export function confirmRefundTicket(orderNo) {
  return request({
    api: 'order',
    url: `/manager/refund/order/confirm-refund-ticket/${orderNo}`,
    method: 'put'
  })
}

// 确认退款
export function confirmRefundAmount(orderNo) {
  return request({
    api: 'order',
    url: `/manager/refund/order/confirm-refund-amount/${orderNo}`,
    method: 'put'
  })
}

// 确认完成
export function refundOrderSuccess(orderNo, data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/success/' + orderNo,
    method: 'put',
    data: data
  })
}

// 拒绝
export function refundOrderRefusal(orderNo) {
  return request({
    api: 'order',
    url: '/manager/refund/order/refusal/' + orderNo,
    method: 'put'
  })
}

// 改签审核
export function refundOrderAudit(orderNo) {
  return request({
    api: 'order',
    url: '/manager/refund/order/audit/' + orderNo,
    method: 'put'
  })
}

// 取消订单
export function refundOrderCancel(orderNo) {
  return request({
    api: 'order',
    url: '/manager/refund/order/cancel/' + orderNo,
    method: 'put'
  })
}

// 上传附件
export function uploadAppendix(data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/upload-appendix',
    method: 'post',
    data: data
  })
}

// 提交退票
export function refundOrderCreate(data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/create',
    method: 'post',
    data: data
  })
}

// 提交退票
export function refundPreAmountQuery(data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/query-pre-refund',
    method: 'post',
    data: data
  })
}

// 修改退票单的手续费
export function updateRefundFees(data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/update-fees',
    method: 'put',
    data: data
  })
}

// 退票成功发送通知
export function refundSuccessNotify(data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/success-notify',
    method: 'post',
    data: data
  })
}

// 锁定退票订单
export function lockRefundOrder(refundOrderId) {
  return request({
    api: 'order',
    url: '/manager/refund/order/lockRefundOrder/' + refundOrderId,
    method: 'get'
  })
}

// 解锁退票订单
export function unLockRefundOrder(refundOrderId) {
  return request({
    api: 'order',
    url: '/manager/refund/order/unLockRefundOrder/' + refundOrderId,
    method: 'get'
  })
}

// 获取自营采购列表
export function getRefundTicketSelfPurchaseOrderList(orderNo) {
  return request({
    api: 'order',
    url: `/manager/refund/order/query/purchase/${orderNo}`,
    method: 'get'
  })
}

// 更新自营出票采购订单
export function createRefundPurchaseOrder(data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/create-purchase',
    method: 'post',
    data: data
  })
}

// 更新自营出票采购订单
export function updateRefundPurchaseOrder(data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/update-purchase',
    method: 'put',
    data: data
  })
}

// 删除自营出票采购订单
export function deleteRefundPurchaseOrder(id) {
  return request({
    api: 'order',
    url: `/manager/refund/order/delete-purchase/${id}`,
    method: 'put'
  })
}

// 更新乘客信息
export function updateRefundPurchaseOrderPassenger(data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/update-purchase-passenger',
    method: 'put',
    data: data
  })
}

// // 更新自营出票采购出票完成
export function completeRefundPurchaseOrder(orderNo) {
  return request({
    api: 'order',
    url: `/manager/refund/order/success-purchase/${orderNo}`,
    method: 'put'
  })
}

// 自营采购单退款完成
export function refundSuccessPurchase(orderNo) {
  return request({
    api: 'order',
    url: `/manager/refund/order/refund-success-purchase/${orderNo}`,
    method: 'put'
  })
}

// // 改签票号回填/供应商确认出票完成
// export function completeChangeOrder(orderNo, successRefundType) {
//   return request({
//     api: 'order',
//     url: `/manager/change/order/success/${orderNo}/${successRefundType}`,
//     method: 'put'
//   })
// }

// 更新订单
export function updatePassengerTicket(data) {
  return request({
    api: 'order',
    url: '/manager/refund/order/update-passenger-ticket',
    method: 'post',
    data: data
  })
}
