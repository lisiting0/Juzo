import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

export function smsSending(query) {
  return request({
    url: '/api/notification/sms-sending',
    method: 'get',
    params: transformAbpListQuery(query)
  })
}

export function smsSendingById(id) {
  return request({
    url: `/api/notification/sms-sending/${id}`,
    method: 'get'
  })
}
