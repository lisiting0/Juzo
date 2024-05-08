import request from '@/utils/request'

// 业务日志
export function queryLog(ModuleName, DataType, ExternalId) {
    return request({
      api: 'businesslog',
      url: `/api/business_log/business-log-info?ModuleName=${ModuleName}&DataType=${DataType}&ExternalId=${ExternalId}`,
      method: 'get'
    })
}
