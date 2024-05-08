const columns = [
  {
    fieldType: 'enum',
    enumType: 'TicketType',
    enumNamespace: 'AdminService',
    label: '票证类型',
    prop: 'ticketProveType'
  },
  {
    fieldType: 'text',
    label: '行程单号',
    prop: 'ticketProveNumber'
  },
  {
    fieldType: 'text',
    label: 'OFFICE号',
    prop: 'office'
  },
  {
    fieldType: 'text',
    label: '票号',
    prop: 'carrierTicketNo'
  },
  {
    fieldType: 'text',
    label: '发放到公司',
    prop: 'agentName'
  },
  {
    fieldType: 'text',
    label: '发放日期',
    prop: 'createTime'
  },
  {
    fieldType: 'enum',
    enumType: 'AvoidanceStatus',
    enumNamespace: 'AdminService',
    label: '状态',
    prop: 'voidedTicketProveStatus'
  },
  {
    fieldType: 'text',
    label: '经办公司',
    prop: 'subsidiary'
  },
  {
    fieldType: 'text',
    label: '经办人 ',
    prop: 'recycledUserName'
  },
  {
    fieldType: 'text',
    label: '经办时间',
    prop: 'recycledTime'
  },
  {
    fieldType: 'text',
    label: '作废人 ',
    prop: 'voidedUserName'
  },
  {
    fieldType: 'text',
    label: '作废时间',
    prop: 'voidedTime'
  }
]

export default {
  columns
}
