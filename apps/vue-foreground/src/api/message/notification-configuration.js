// 通知配置
import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    url: '/api/notification/ticket-agent-notification-configuration',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 详情
export function notificationConfigurationDetail(id) {
  return request({
    url: `/api/notification/ticket-agent-notification-configuration/${id}`,
    method: 'get'
  })
}

// 修改状态
export function updateNotificationConfiguration(data) {
  return request({
    url: `/api/notification/ticket-agent-notification-configuration/${data.id}`,
    method: 'put',
    data: data
  })
}
