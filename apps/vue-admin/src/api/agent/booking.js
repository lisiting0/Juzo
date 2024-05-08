import request from '@/utils/request'

// 航班下舱位行李额
export function flightCabinLuggageWeightSearch(data) {
  return request({
    api: 'foundation',
    url: '/share/luggage-weight/query',
    method: 'post',
    data: data
  })
}

// 航班下舱位客规
export function flightGuestRuleSearch(data) {
  return request({
    api: 'foundation',
    url: '/share/guest-rule/query-by-cabin',
    method: 'post',
    data: data
  })
}
