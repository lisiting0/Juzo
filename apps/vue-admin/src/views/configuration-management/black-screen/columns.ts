
const columns = [
  {
    fieldType: 'text',
    width: 60,
    label: '航司',
    prop: 'airline'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '账号',
    prop: 'userName'
  }, {
    fieldType: 'text',
    width: 160,
    label: '密码',
    prop: 'password'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '服务器地址',
    prop: 'server'
  },
  {
    fieldType: 'text',
    label: '端口',
    prop: 'port'
  },
  {
    fieldType: 'enum',
    enumType: 'PriceSourceAccountType',
    enumNamespace: 'Juzo',
    width: 100,
    label: '类型',
    prop: 'type'
  },
  {
    fieldType: 'text',
    width: 180,
    label: 'SI账号密码',
    prop: 'signIn'
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
    booleanOptions: 'true原始配置|false非原始配置',
    width: 100,
    label: '原始配置',
    prop: 'isRaw'
  },
  {
    fieldType: 'boolean',
    booleanOptions: 'true已上线|false未上线',
    label: '状态',
    prop: 'enableSsl'
  },
  {
    fieldType: 'text',
    label: '分组名称',
    prop: 'groupName'
  },
  {
    fieldType: 'text',
    label: 'PID',
    prop: 'pid'
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
