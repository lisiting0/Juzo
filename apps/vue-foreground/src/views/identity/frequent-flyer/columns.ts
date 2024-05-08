const columns = [
  {
    fieldType: 'text',
    label: '乘机人',
    prop: 'lastName'
  },
  {
    fieldType: 'enum',
    enumType: 'PassengerType',
    enumNamespace: 'AdminService',
    label: '旅客类型',
    prop: 'frequentFlyerType'
  },
  {
    fieldType: 'enum',
    enumType: 'GenderType',
    enumNamespace: 'AdminService',
    label: '性别',
    prop: 'gender'
  },
  {
    fieldType: 'enum',
    enumType: 'IdentityCardType',
    enumNamespace: 'AdminService',
    label: '证件类型',
    prop: 'cardType'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '证件号',
    prop: 'cardNum'
  },
  {
    fieldType: 'dateYMD',
    label: '出生日期',
    prop: 'birthday'
  },
  {
    fieldType: 'text',
    width: 110,
    label: '手机号',
    prop: 'phone'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '邮箱',
    prop: 'email'
  },
  {
    fieldType: 'text',
    label: '国籍',
    prop: 'nationality'
  },
  {
    fieldType: 'text',
    label: '证件签发地',
    prop: 'cardIssuePlace'
  },
  {
    fieldType: 'dateYMD',
    label: '证件有效期',
    prop: 'cardExpired'
  },
  {
    fieldType: 'text',
    label: '是否GP',
    prop: 'isGp'
  },
  {
    fieldType: 'text',
    label: 'GP所属银行信息',
    prop: 'gpBankValue'
  }
]
export default {
  columns
}
