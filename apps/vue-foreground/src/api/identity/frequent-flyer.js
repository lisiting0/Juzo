// 代理
import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function frequentFlyerList(query) {
  return request({
    api: 'order',
    url: '/agent/frequentflyer/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 新增
export function frequentFlyerSave(data) {
  return request({
    api: 'order',
    url: '/agent/frequentflyer/save',
    method: 'post',
    data: data
  })
}

// 编辑
export function frequentFlyerUpdate(data) {
    return request({
      api: 'order',
      url: '/agent/frequentflyer/update',
      method: 'put',
      data: data
    })
  }

// 删除
export function frequentFlyerDelete(id) {
  return request({
    api: 'order',
    url: `/agent/frequentflyer/delete/${id}`,
    method: 'delete'
  })
}

// 导入Excel
export function importExcel(data) {
    return request({
      api: 'order',
      url: '/agent/frequentflyer/importExcel',
      method: 'post',
      data: data
    })
  }

  // 导出excel
  export function exportExcel(query) {
    return request({
      api: 'order',
      url: '/agent/frequentflyer/exportExcel',
      method: 'post',
      responseType: 'blob',
      data: transformListQuery(query)
    })
  }
