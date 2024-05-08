import request from '@/utils/request'

// 列表
export function bankList() {
  return request({
    api: 'foundation',
    url: '/manager/bank/queryList',
    method: 'get'
  })
}
