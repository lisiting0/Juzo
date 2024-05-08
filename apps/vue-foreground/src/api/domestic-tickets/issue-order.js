import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'order',
    url: '/agent/issue/order/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 获取订单下的客规
export function issueOrderGuestRule(orderNo) {
  return request({
    api: 'order',
    url: '/agent/issue/order/guest-rule/queryAll/' + orderNo,
    method: 'get'
  })
}

// 订单详情页面
export function issueOrderDetail(ticketIssueOrderNo) {
  return request({
    api: 'order',
    url: '/agent/issue/order/detail/' + ticketIssueOrderNo,
    method: 'get'
  })
}

// 行程单绑定
export function issueOrderProveBind(startNumber, data) {
  return request({
    api: 'order',
    url: '/agent/issue/order/prove/bind/' + startNumber,
    method: 'put',
    data: data
  })
}

// 通过PNR/票号/订单号 提取票号
export function issueTicketQueryInfoNo(infoNo) {
  return request({
    api: 'order',
    url: '/agent/issue/order/get-ticket-all/' + infoNo,
    method: 'get'
  })
}

// 通过航司票号获取相关的打印信息
export function issueOrderGetTicketPrintInfo(carrierTicketNo) {
  return request({
    api: 'order',
    url: '/agent/issue/order/get-info-ticket',
    method: 'post',
    data: carrierTicketNo
  })
}

// 作废行程单
export function voidedTicketProve(data) {
  return request({
    api: 'order',
    url: '/agent/use/voided/process/' + data,
    method: 'post'
  })
}

// 出票通知
export function issueSuccessNotify(orderNo) {
  return request({
    api: 'order',
    url: '/agent/issue/order/success-notify/' + orderNo,
    method: 'post'
  })
}