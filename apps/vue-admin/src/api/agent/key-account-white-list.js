// 代理
import request from '@/utils/request'
import { transformListQuery } from '@/utils/abp'

// 列表
export function keyAccountWhiteListList(query) {
  return request({
    api: 'order',
    url: '/manager/keyaccountwhitelist/queryPage',
    method: 'post',
    data: transformListQuery(query)
  })
}

// 新增
export function keyAccountWhiteListSave(data) {
  return request({
    api: 'order',
    url: '/manager/keyaccountwhitelist/save',
    method: 'post',
    data: data
  })
}

// 编辑
export function keyAccountWhiteListUpdate(data) {
    return request({
      api: 'order',
      url: '/manager/keyaccountwhitelist/update',
      method: 'put',
      data: data
    })
  }

// 删除
export function keyAccountWhiteListDelete(id) {
  return request({
    api: 'order',
    url: `/manager/keyaccountwhitelist/delete/${id}`,
    method: 'delete'
  })
}

// 导入Excel
export function importExcel(data) {
    return request({
      api: 'order',
      url: '/manager/keyaccountwhitelist/importExcel',
      method: 'post',
      data: data
    })
  }

  // 导出excel
  export function exportExcel(query) {
    return request({
      api: 'order',
      url: '/manager/keyaccountwhitelist/exportExcel',
      method: 'post',
      responseType: 'blob',
      data: transformListQuery(query)
    })
  }
