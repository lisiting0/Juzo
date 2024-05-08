// 通知配置
import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function announcementList(query) {
  return request({
    url: '/api/notification/announcement',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

// 新增
export function createAnnouncement(data) {
  return request({
    url: '/api/notification/announcement',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteAnnouncement(id) {
  return request({
    url: `/api/notification/announcement/${id}`,
    method: 'delete'
  })
}

// 详情
export function announcementDetail(id) {
  return request({
    url: `/api/notification/announcement/${id}`,
    method: 'get'
  })
}

// 编辑
export function updateAnnouncement(data) {
  return request({
    url: `/api/notification/announcement/${data.id}`,
    method: 'put',
    data: data
  })
}

// 修改状态
export function updateAnnouncementStatus(id, data) {
  return request({
    url: `/api/notification/announcement/${id}/status`,
    method: 'post',
    params: data
  })
}
