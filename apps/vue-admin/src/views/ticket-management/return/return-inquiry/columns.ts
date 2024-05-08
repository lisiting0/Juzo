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
    label: '起始号码',
    prop: 'starterNumber'
  },
  {
    fieldType: 'text',
    label: '终止号码',
    prop: 'endNumber'
  },
  {
    fieldType: 'text',
    label: 'OFFICE',
    prop: 'office'
  },
  {
    fieldType: 'text',
    label: '数量',
    prop: 'stockNum'
  },
  {
    fieldType: 'text',
    label: '发起退回分销商',
    prop: 'agentName'
  },
  {
    fieldType: 'text',
    label: '操作员',
    prop: 'createUserName'
  },
  {
    fieldType: 'datetime',
    label: '退回日期',
    prop: 'createTime'
  },
  {
    fieldType: 'text',
    label: '备注',
    prop: 'remark'
  }
]

export default {
  columns
}
