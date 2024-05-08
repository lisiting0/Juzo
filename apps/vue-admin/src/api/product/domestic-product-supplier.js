// 供应下产品配置
import request from '@/utils/request'

// 列表
export function productSupplierList(query) {
  return request({
    url: '/api/product/domestic-product-supplier',
    method: 'get',
    params: query
  })
}

// 详情
export function productSupplierDetail(id) {
  return request({
    url: `/api/product/domestic-product-supplier/${id}`,
    method: 'get'
  })
}

// 新增
export function createProductSupplier(data) {
  return request({
    url: '/api/product/domestic-product-supplier',
    method: 'post',
    data: data
  })
}

// 删除
export function deleteProductSupplier(id) {
  return request({
    url: `/api/product/domestic-product-supplier/${id}`,
    method: 'delete'
  })
}

// 编辑
export function updateProductSupplier(data) {
  return request({
    url: `/api/product/domestic-product-supplier/${data.id}`,
    method: 'put',
    data: data
  })
}
