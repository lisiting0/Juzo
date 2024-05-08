const columns = [
  {
    fieldType: 'text',
    label: '账号',
    prop: 'userName'
  },
  {
    fieldType: 'other',
    label: '名称',
    prop: 'surnamename'
  },
  {
    fieldType: 'other',
    label: '角色',
    prop: 'roles'
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
    label: '最后修改时间',
    prop: 'lastModificationTime'
  }
]
export default {
  columns
}
