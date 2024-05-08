import request from '@/utils/request'

export function importIdentificationCard(data) {
  return request({
    api: 'group',
    url: `/ocr/identification-card`,
    method: 'post',
    data: data
  })
}

export function importExcel(data) {
  return request({
    api: 'group',
    url: `/ocr/identification-card-import`,
    method: 'post',
    data: data
  })
}
