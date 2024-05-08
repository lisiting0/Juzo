import request from '@/utils/request'

// 列表
export function cityList(data) {
  return request({
    api: 'foundation',
    url: '/manager/city/queryList',
    method: 'post',
    data: data
  })
}
