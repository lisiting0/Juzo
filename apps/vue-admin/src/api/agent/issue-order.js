import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'order',
    url: '/manager/issue/order/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 出票订单手动创单
export function issueOrderManualCreate(data) {
  return request({
    api: 'order',
    url: '/manager/issue/order/manual/create',
    method: 'post',
    data: data
  })
}

// 获取订单下的客规
export function issueOrderGuestRule(orderNo) {
  return request({
    api: 'order',
    url: '/manager/issue/order/guest-rule/queryAll/' + orderNo,
    method: 'get'
  })
}
// 通过PNR/票号/订单号 提取票号
export function issueOrderGetTicket(infoNo) {
  return request({
    api: 'order',
    url: '/manager/issue/order/get-ticket-all/' + infoNo,
    method: 'get'
  })
}
// 通过航司票号获取相关的打印信息
export function issueOrderGetTicketPrintInfo(carrierTicketNo) {
  return request({
    api: 'order',
    url: '/manager/issue/order/get-info-ticket',
    method: 'post',
    data: carrierTicketNo
  })
}

// 订单详情页面
export function issueOrderDetail(ticketIssueOrderNo, status) {
  if (status) {
    return request({
      api: 'order',
      url: `/manager/issue/order/detail/${ticketIssueOrderNo}/${status}`,
      method: 'get'
    })
  } else {
    return request({
      api: 'order',
      url: `/manager/issue/order/detail/${ticketIssueOrderNo}`,
      method: 'get'
    })
  }
}

// 修改服务器
export function updateServiceFeesAmount(data) {
  return request({
    api: 'order',
    url: '/manager/issue/order/update-service-fees',
    data: data,
    method: 'post'
  })
}

// 修改加价/让利
export function updateMarkupAmount(data) {
  return request({
    api: 'order',
    url: '/manager/issue/order/update-markup-amount',
    data: data,
    method: 'post'
  })
}

// 票号回填
export function issueOrderSuccess(orderNo, data) {
  return request({
    api: 'order',
    url: '/manager/issue/order/success/' + orderNo,
    method: 'put',
    data: data
  })
}

// 拒绝出票
export function issueOrderRefusal(orderNo) {
  return request({
    api: 'order',
    url: '/manager/issue/order/refusal/' + orderNo,
    method: 'put'
  })
}

// 行程单绑定
export function issueOrderProveBind(orderNo, startNumber) {
  return request({
    api: 'order',
    url: '/manager/issue/order/prove/bind/' + orderNo + '/' + startNumber,
    method: 'put'
  })
}

// 取消订单
export function issueOrderCancel(orderNo) {
  return request({
    api: 'order',
    url: '/manager/issue/order/cancel/' + orderNo,
    method: 'put'
  })
}

// 出票通知
export function issueSuccessNotify(data) {
  return request({
    api: 'order',
    url: '/manager/issue/order/success-notify',
    method: 'post',
    data: data
  })
}

// 导入乘客
export function importPassenger() {
  return process.env.VUE_APP_ORDER_API + '/manager/issue/order/importPassenger'
}

// // 订单详情页面
// export function issueOrderDetail(ticketIssueOrderNo) {
//     return request({
//       api: 'order',
//       url: '/agent/issue/order/detail/' + ticketIssueOrderNo,
//       method: 'get'
//     })
//   }

// 锁定出票订单
export function lockIssueOrder(issueOrderId) {
  return request({
    api: 'order',
    url: '/manager/issue/order/lockIssueOrder/' + issueOrderId,
    method: 'get'
  })
}

// 解锁出票订单
export function unLockIssueOrder(issueOrderId) {
  return request({
    api: 'order',
    url: '/manager/issue/order/unLockIssueOrder/' + issueOrderId,
    method: 'get'
  })
}

// 更新订单
export function updatePassengerTicket(data) {
  return request({
    api: 'order',
    url: '/manager/issue/order/update-passenger-ticket',
    method: 'post',
    data: data
  })
}

// 获取自营出票采购订单列表
export function getIssueTicketSelfPurchaseOrderList(issueTicketOrderNo) {
  return request({
    api: 'order',
    url: `/manager/issue/order/query/purchase/${issueTicketOrderNo}`,
    method: 'get'
  })
}

// 更新自营出票采购订单列表
export function updateIssueTicketSelfPurchaseOrder(data) {
  return request({
    api: 'order',
    url: '/manager/issue/order/update-purchase',
    method: 'put',
    data: data
  })
}

// 更新自营出票采购出票完成
export function completeIssueTicketSelfPurchaseOrder(issueTicketOrderNo) {
  return request({
    api: 'order',
    url: `/manager/issue/order/success-purchase/${issueTicketOrderNo}`,
    method: 'put'
  })
}

// 更新自营采购订单乘客信息列表
export function updateIssueTicketSelfPurchaseOrderPassenger(data) {
  return request({
    api: 'order',
    url: '/manager/issue/order/update-purchase-passenger',
    method: 'put',
    data: data
  })
}

// 创建自营出票采购订单
export function createIssueTicketSelfPurchaseOrder(data) {
  return request({
    api: 'order',
    url: '/manager/issue/order/create-purchase',
    method: 'post',
    data: data
  })
}

// 更新自营出票采购出票完成
export function deleteIssueTicketSelfPurchaseOrder(id) {
  return request({
    api: 'order',
    url: `/manager/issue/order/delete-purchase/${id}`,
    method: 'put'
  })
}

// 更新自营出票采购出票完成
export function updateIssueOrderRemark(data) {
    return request({
        api: 'order',
        url: '/manager/issue/order/updateRemark',
        method: 'put',
        data: data
    })
}

// 自营自动出票
export function getAutoQueryList(id, queryType) {
  return request({
      api: 'order',
      url: `/manager/issue/order/auto-query-list/${id}/${queryType}`,
      method: 'get'
  })
}

// 自营自动出票
export function autoConfirmIssueTicket(data) {
  return request({
      api: 'order',
      url: '/manager/issue/order/auto-confirm',
      method: 'post',
      data: data
  })
}

