const columns = [
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
    label: '剩余数量',
    prop: 'surplusNum'
  },
  {
    fieldType: 'enum',
    enumType: 'ApplicationStatus',
    enumNamespace: 'AdminService',
    label: '状态',
    prop: 'status'
  },
  {
    fieldType: 'text',
    label: 'OFFICE号',
    prop: 'office'
  },
  {
    fieldType: 'text',
    label: '所在公司',
    prop: 'createOrganizationName'
  },
  {
    fieldType: 'date',
    label: '操作日期',
    prop: 'createTime'
  }
]

export default {
  columns
}
