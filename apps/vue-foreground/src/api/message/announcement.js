// 通知公告
import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function announcementList(query) {
  return request({
    url: '/api/notification/announcement/agent',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 详情
export function announcementDetail(id) {
  return request({
    url: `/api/notification/announcement/${id}`,
    method: 'get'
  })
}

// 修改公告状态
export function announcementStatus(id, params) {
  return request({
    url: `/api/notification/announcement/${id}/status`,
    method: 'get',
    params: params
  })
}

