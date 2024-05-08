import request from '@/utils/request'

export function rtPnr(office, pnr) {
    return request({
        api: 'ibeplus',
        url: `/ibeplus/extract-pnr/${office}`,
        method: 'post',
        data: pnr
    })
  }

export function parsePnr(pnr) {
    return request({
        api: 'ibeplus',
        url: '/raw/parse-rt',
        method: 'post',
        data: pnr
    })
}
