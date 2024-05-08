
const columns = [
  {
    fieldType: 'boolean',
    booleanOptions: 'true禁用|false启用',
    label: '账号状态',
    prop: 'disabled'
  },
  {
    fieldType: 'boolean',
    booleanOptions: 'true开启|false关闭',
    label: '子账户开通权限',
    prop: 'canCreateAccount'
  },
  {
    fieldType: 'enum',
    enumType: 'JuzoPartnerType',
    enumNamespace: 'AdminService',
    label: '账号类型',
    prop: 'partnerType'
  },
  {
    fieldType: 'text',
    label: '登录账号',
    prop: 'loginName'
  },
  {
    fieldType: 'text',
    label: '分销名称',
    prop: 'name'
  },
  {
    fieldType: 'text',
    label: '所属部门',
    prop: 'departmentOrganizationName'
  },
  {
    fieldType: 'text',
    width: 190,
    label: '统一社会代码（证件号码）',
    prop: 'identityNumber'
  },
  {
    fieldType: 'text',
    label: '联系人',
    prop: 'contact'
  },
  {
    fieldType: 'text',
    label: '手机号码',
    prop: 'phone'
  },
  {
    fieldType: 'text',
    width: 200,
    label: '邮箱',
    prop: 'email'
  },
  {
    fieldType: 'date',
    width: 150,
    label: '创建时间',
    prop: 'creationTime'
  }
]

export default {
  columns
}
