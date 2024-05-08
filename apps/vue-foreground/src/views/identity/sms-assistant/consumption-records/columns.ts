const columns = [
  {
    fieldType: 'enum',
    enumType: 'SmsSendingStatusType',
    enumNamespace: 'AdminService',
    label: '是否发送成功',
    prop: 'status'
  },
  {
    fieldType: 'enum',
    enumType: 'SmsProviderType',
    enumNamespace: 'AdminService',
    label: '短信提供商',
    prop: 'provider'
  },
  {
    fieldType: 'enum',
    enumType: 'SmsPurposeType',
    enumNamespace: 'AdminService',
    label: '短信发送目的',
    prop: 'purpose'
  },
  {
    fieldType: 'text',
    label: '关联外部实体Id',
    prop: 'entityId'
  },
  {
    fieldType: 'text',
    label: '通知的Id',
    prop: 'providerSendId'
  },
  {
    fieldType: 'text',
    label: '交易流水号',
    prop: 'tradeNo'
  },
  {
    fieldType: 'text',
    label: '短信目标',
    prop: 'phone'
  },
  {
    fieldType: 'text',
    label: '短信内容',
    prop: 'content'
  },
  {
    fieldType: 'text',
    label: '发送结果消息',
    prop: 'message'
  },
  {
    fieldType: 'date',
    label: '发送时间',
    prop: 'sendTimeUtc'
  },
  {
    fieldType: 'date',
    label: '完成时间',
    prop: 'completionTimeUtc'
  }
]
export default {
  columns
}
