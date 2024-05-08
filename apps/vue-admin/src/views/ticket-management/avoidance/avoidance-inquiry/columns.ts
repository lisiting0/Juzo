const columns = [
  {
    fieldType: 'enum',
    enumType: 'AvoidanceStatus',
    enumNamespace: 'AdminService',
    label: '状态',
    prop: 'voidedTicketProveStatus'
  },
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
    label: '操作员',
    prop: 'createUserName'
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
