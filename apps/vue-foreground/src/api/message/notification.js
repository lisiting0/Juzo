// 消息
import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function notificationInfoList(query) {
  return request({
    url: '/api/notification-service/notification-info',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 详情
export function notificationInfoDetail(id) {
  return request({
    url: `/api/notification-service/notification-info/${id}`,
    method: 'get'
  })
}

// 修改状态
export function updateNotificationInfo(data) {
  return request({
    url: `/api/notification-service/notification-info/${data.id}`,
    method: 'put',
    data: data
  })
}
