import request from '@/utils/request'

export function createTicketSupplier(data) {
  return request({
    url: '/api/abp/partner/ticket-supplier/register',
    method: 'post',
    data: data
  })
}

export function getTicketSupplierByUserId(id) {
  return request({
    url: `/api/abp/partner/ticket-supplier/by-user/${id}`,
    method: 'get'
  })
}

// https://api.dev.yxho.com/api/abp/partner/ticket-supplier/register
