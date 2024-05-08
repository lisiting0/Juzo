import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'order',
    url: '/manager/change/order/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 申请改签
export function changeOrderManualCreate(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/manual/create',
    method: 'post',
    data: data
  })
}

// 获取订单下的客规
export function changeOrderGuestRule(orderNo) {
  return request({
    api: 'order',
    url: '/manager/change/order/guest-rule/queryAll/' + orderNo,
    method: 'get'
  })
}

// 订单详情页面
export function changeOrderDetail(ticketchangeOrderNo, status) {
  if (status) {
    return request({
      api: 'order',
      url: `/manager/change/order/detail/${ticketchangeOrderNo}/${status}`,
      method: 'get'
    })
  } else {
    return request({
      api: 'order',
      url: `/manager/change/order/detail/${ticketchangeOrderNo}`,
      method: 'get'
    })
  }
}

// 确认出票完成
export function changeOrderSuccess(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/success',
    method: 'put',
    data: data
  })
}

// 拒绝出票
export function changeOrderRefusal(orderNo) {
  return request({
    api: 'order',
    url: '/manager/change/order/refusal/' + orderNo,
    method: 'put'
  })
}

// 修改服务器
export function updateServiceFeesAmount(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/update-service-fees',
    data: data,
    method: 'post'
  })
}

// 修改加价
export function updateMarkupAmount(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/update-markup-amount',
    data: data,
    method: 'post'
  })
}

// 修改手续费
export function updateChangeFees(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/update-fees',
    method: 'put',
    data: data
  })
}

// 修改升舱费
export function updatePriceDifference(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/updatePriceDifference',
    method: 'put',
    data: data
  })
}

// 改签审核
export function changeOrderAudit(orderNo) {
  return request({
    api: 'order',
    url: '/manager/change/order/audit/' + orderNo,
    method: 'put'
  })
}

// 取消订单
export function changeOrderCancel(orderNo) {
  return request({
    api: 'order',
    url: '/manager/change/order/cancel/' + orderNo,
    method: 'put'
  })
}

// 上传附件
export function uploadAppendix(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/upload-appendix',
    method: 'post',
    data: data
  })
}

// 查询order服务中-改签的手续费展示
export function changePreFeesAmountQuery(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/query-pre-change',
    method: 'post',
    data: data
  })
}

// 查询预定服务中,新改签的航班数据
export function newChangeFlightSearch(data) {
  return request({
    url: '/api/booking/service/change/flight-list',
    method: 'get',
    params: data
  })
}

// 查询预定服务中,选择新改签航班时 查询下面所有的舱位信息
export function newChangeCabinListSearch(data) {
  return request({
    url: '/api/booking/service/change/cabin-class-price',
    method: 'post',
    data: data
  })
}

// 查询预定服务中,选择舱位后,查询真实价格
export function chooseCabinPriceQuery(data) {
  return request({
    url: '/api/booking/service/change/cabin-all-type',
    method: 'post',
    data: data
  })
}

// 预定服务中,进行提交改签
export function applyCreateChangeOrder(data) {
  return request({
    url: '/api/booking/service/change/order',
    method: 'post',
    data: data
  })
}

// 改签成功发送通知
export function changeSuccessNotify(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/success-notify',
    method: 'post',
    data: data
  })
}

// 锁定退票订单
export function lockChangeOrder(changeOrderId) {
  return request({
    api: 'order',
    url: '/manager/change/order/lockChangeOrder/' + changeOrderId,
    method: 'get'
  })
}

// 解锁退票订单
export function unLockChangeOrder(changeOrderId) {
  return request({
    api: 'order',
    url: '/manager/change/order/unLockChangeOrder/' + changeOrderId,
    method: 'get'
  })
}

// 更新乘客信息
export function updatePassengerTicket(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/update-passenger-ticket',
    method: 'post',
    data: data
  })
}

// 获取自营改签采购订单列表
export function getChangeTicketSelfPurchaseOrderList(orderNo) {
  return request({
    api: 'order',
    url: `/manager/change/order/query/purchase/${orderNo}`,
    method: 'get'
  })
}

// 创建自营改签采购订单
export function createChangePurchaseOrder(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/create-purchase',
    method: 'post',
    data: data
  })
}

// 更新自营出票采购订单
export function updateChangePurchaseOrder(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/update-purchase',
    method: 'put',
    data: data
  })
}

// 更新自营改签采购出票完成
export function deleteChangePurchaseOrder(id) {
  return request({
    api: 'order',
    url: `/manager/change/order/delete-purchase/${id}`,
    method: 'put'
  })
}

// 更新自营出票采购出票完成
export function completeChangePurchaseOrder(orderNo, changeSuccessRefundType) {
  return request({
    api: 'order',
    url: `/manager/change/order/success-purchase/${orderNo}/${changeSuccessRefundType}`,
    method: 'put'
  })
}

// 改签票号回填/供应商确认出票完成
export function completeChangeOrder(orderNo, successRefundType) {
  return request({
    api: 'order',
    url: `/manager/change/order/success/${orderNo}/${successRefundType}`,
    method: 'put'
  })
}

// 更新自营采购订单乘客信息列表（采购单修改关联乘客）
export function updatePurchaseOrderPassenger(data) {
  return request({
    api: 'order',
    url: '/manager/change/order/update-purchase-passenger',
    method: 'put',
    data: data
  })
}

// 多程的查询价格
export function twoNewChangeFlightSearch(data) {
  return request({
    url: '/api/booking/service/change/two-wayflight-list',
    method: 'post',
    data: data
  })
}

// 多程的实时价格 | 验价
export function twoFlightVerifyPrice(data) {
  return request({
    url: '/api/booking/service/change/two-way-verify-price',
    method: 'post',
    data: data
  })
}

// 多程提交
export function applyTwoCreateChangeOrder(data) {
  return request({
    url: '/api/booking/service/change/two/order',
    method: 'post',
    data: data
  })
}
