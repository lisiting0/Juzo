// 消息
import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function ticketAgentOrderNotificationList(query) {
  return request({
    url: '/api/notification/ticket-agent-order-notification',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 详情
export function ticketAgentOrderNotificationDetail(id) {
  return request({
    url: `/api/notification/ticket-agent-order-notification/${id}`,
    method: 'get'
  })
}

export function getSMSByOrderNo(OrderNo) {
  return request({
    url: `/api/notification/ticket-agent-order-notification?OrderNo=${OrderNo}`,
    method: 'get'
  })
}
