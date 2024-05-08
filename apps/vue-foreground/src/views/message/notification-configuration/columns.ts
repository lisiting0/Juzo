
const columns = [
  {
    fieldType: 'boolean',
    booleanOptions: 'true开启|false关闭',
    label: '状态',
    prop: 'enabled'
  },
  {
    fieldType: 'enum',
    enumType: 'TicketAgentNotificationType',
    enumNamespace: 'AdminService',
    label: '消息类型',
    prop: 'type'
  },
  {
    fieldType: 'other',
    label: '消息来源',
    prop: 'sources'
  },
  {
    fieldType: 'text',
    label: '发送方式',
    prop: 'sendMethods'
  },
  {
    fieldType: 'text',
    label: '开始发送时间',
    prop: 'sendTimeBegin'
  },
  {
    fieldType: 'text',
    label: '结束发送时间',
    prop: 'sendTimeEnd'
  },
  {
    fieldType: 'text',
    label: '操作',
    prop: 'action'
  }
]

export default {
  columns
}
