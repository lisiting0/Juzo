import request from '@/utils/request'
import { transformAbpListQuery } from '@/utils/abp'

// 列表
export function productList(query) {
  return request({
    url: '/api/product/domestic-product',
    method: 'GET',
    params: transformAbpListQuery(query)
  })
}

// 修改
export function updateProduct(data) {
  return request({
    url: `/api/product/domestic-product/${data.id}`,
    method: 'PUT',
    data: data
  })
}

// 新增
export function createProduct(data) {
  return request({
    url: '/api/product/domestic-product',
    method: 'POST',
    data: data
  })
}

// 删除
export function deleteProduct(id) {
  return request({
    url: `/api/product/domestic-product/${id}`,
    method: 'delete'
  })
}
