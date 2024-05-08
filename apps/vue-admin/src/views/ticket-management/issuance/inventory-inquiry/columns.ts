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
    label: '领用分销商',
    prop: 'agentName'
  },
  {
    fieldType: 'number',
    label: '库存数量',
    prop: 'stockNum'
  },
  {
    fieldType: 'number',
    label: '未使用',
    prop: 'notUsedNum'
  },
  {
    fieldType: 'number',
    label: '未创建已作废未回收',
    prop: 'notUsedAndVoidedNum'
  },
  {
    fieldType: 'number',
    label: '已创建已作废未回收',
    prop: 'usedAndVoidedNum'
  }
]

export default {
  columns
}
