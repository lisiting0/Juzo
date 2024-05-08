import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function fetchList(query) {
  return request({
    api: 'order',
    url: '/agent/quality/check/queryByPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 手动创单
export function qualityOrderCreate(data) {
  return request({
    api: 'order',
    url: '/agent/quality/check/create',
    method: 'post',
    data: data
  })
}

// 编辑
export function qualityOrderUpdate(data) {
  return request({
    api: 'order',
    url: `/agent/quality/check/update`,
    method: 'post',
    data: data
  })
}

// 取消
export function qualityOrderCancel(qualityCheckOrderNo) {
  return request({
    api: 'order',
    url: `/manager/quality/check/cancel/${qualityCheckOrderNo}`,
    method: 'post'
  })
}

// 支付接口
export function qualityOrderHandle(data) {
  return request({
    api: 'order',
    url: `/agent/quality/check/toHandler`,
    method: 'post',
    data: data
  })
}
