const columns = [
  {
    fieldType: 'text',
    label: '账号',
    prop: 'userName'
  },
  {
    fieldType: 'other',
    label: '账号类型',
    prop: 'accountType'
  },
  {
    fieldType: 'text',
    label: '手机号码',
    prop: 'phoneNumber'
  },
  {
    fieldType: 'text',
    label: '邮箱',
    prop: 'email'
  },
  {
    fieldType: 'boolean',
    booleanOptions: 'false禁用|true启用',
    label: '状态',
    prop: 'isActive'
  },
  {
    fieldType: 'date',
    label: '最近一次修改密码时间',
    prop: 'lastPasswordChangeTime'
  },
  {
    fieldType: 'text',
    width: 250,
    label: '操作',
    prop: 'action'
  }
]
export default {
  columns
}
