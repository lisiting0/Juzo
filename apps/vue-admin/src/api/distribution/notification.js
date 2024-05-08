// 消息
import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function notificationList(query) {
  return request({
    url: '/api/notification-service/notification',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 详情
export function notificationDetail(id) {
  return request({
    url: `/api/notification-service/notification/${id}`,
    method: 'get'
  })
}

export function getSMSByOrderNo(orderNo) {
  return request({
    url: `/api/notification/ticket-agent-order-notification/${orderNo}`,
    method: 'get'
  })
}
