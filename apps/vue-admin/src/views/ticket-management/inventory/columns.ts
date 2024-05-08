const columns = [
  {
    fieldType: 'enum',
    enumType: 'ApplicationStatus',
    enumNamespace: 'AdminService',
    label: '状态',
    prop: 'ticketStockAuditStatus'
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
    label: '数量',
    prop: 'stockNum'
  },
  {
    fieldType: 'text',
    label: 'OFFICE',
    prop: 'office'
  },
  {
    fieldType: 'text',
    label: '备注',
    prop: 'remark'
  },
  {
    fieldType: 'text',
    label: '操作员',
    prop: 'operator'
  },
  {
    fieldType: 'text',
    label: '入库日期',
    prop: 'createTime'
  }]

export default {
  columns
}
