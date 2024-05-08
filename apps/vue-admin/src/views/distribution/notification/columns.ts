
const columns = [
  {
    fieldType: 'other',
    label: '分销商',
    prop: 'ticketAgentId'
  },
  {
    fieldType: 'text',
    label: '订单号',
    prop: 'orderNo'
  },
  {
    fieldType: 'enum',
    enumType: 'TicketAgentNotificationType',
    enumNamespace: 'AdminService',
    label: '消息类型',
    prop: 'type'
  },
  {
    fieldType: 'text',
    label: '通知方法',
    prop: 'method'
  },
  {
    fieldType: 'text',
    label: '通知目标',
    prop: 'target'
  },
  {
    fieldType: 'text',
    label: '通知内容',
    prop: 'content'
  },
  {
    fieldType: 'boolean',
    booleanOptions: 'true成功|false失败',
    label: '通知结果',
    prop: 'success'
  },
  {
    fieldType: 'text',
    label: '失败原因',
    prop: 'failureReason'
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
  // {
  //   fieldType: 'text',
  //   label: '操作',
  //   prop: 'action'
  // }
]

export default {
  columns
}
