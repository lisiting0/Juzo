import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 发放列表
export function queryPage(query) {
  return request({
    api: 'order',
    url: '/manager/agent/use/ticket/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 分销商库存列表
export function queryAgentInventory(query) {
  return request({
    api: 'order',
    url: '/manager/agent/use/ticket/inventory',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 发放列表
export function queryGrantPage(query) {
  return request({
    api: 'order',
    url: '/manager/agent/use/ticket/query-grant-page',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 发放
export function ticketGrant(data) {
  return request({
    api: 'order',
    url: '/manager/agent/use/ticket/grant',
    method: 'post',
    data: data
  })
}

// 查询可用数量
export function queryAvailableNumber(data) {
  return request({
    api: 'order',
    url: '/manager/agent/use/ticket/query-available-number',
    method: 'post',
    data: data
  })
}
