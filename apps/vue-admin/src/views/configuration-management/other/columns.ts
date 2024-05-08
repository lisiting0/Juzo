
const columns = [
  {
    fieldType: 'text',
    width: 60,
    label: '航司',
    prop: 'airline'
  },
  {
    fieldType: 'text',
    width: 200,
    label: '账号',
    prop: 'userName'
  },
  {
    fieldType: 'text',
    width: 200,
    label: '密码',
    prop: 'password'
  },
  {
    fieldType: 'text',
    label: 'office号',
    prop: 'officeNo'
  },
  // {
  //   fieldType: 'text',
  //   label: '月最大流量',
  //   prop: 'disabled'
  // },
  // {
  //   fieldType: 'text',
  //   label: '已用流量',
  //   prop: 'disabled'
  // },
  {
    fieldType: 'boolean',
    booleanOptions: 'true已上线|false未上线',
    label: '状态',
    prop: 'enabled'
  },
  {
    fieldType: 'date',
    width: 180,
    label: '创建时间',
    prop: 'creationTime'
  },
  {
    fieldType: 'date',
    width: 180,
    label: '更新时间',
    prop: 'lastModificationTime'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '操作',
    prop: 'action',
    fixed: 'right'
  }
]

export default {
  columns
}
