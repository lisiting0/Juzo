const columns = [{
  fieldType: 'enum',
  enumType: 'JuzoRegistrationApprovalStatusType',
  enumNamespace: 'AdminService',
  label: '审核状态',
  prop: 'status'
},
{
  fieldType: 'enum',
  enumType: 'JuzoPartnerType',
  enumNamespace: 'AdminService',
  label: '账号类型',
  prop: 'partnerType'
},
{
  fieldType: 'enum',
  enumType: 'JuzoPartnerOrganizationType',
  enumNamespace: 'AdminService',
  label: '申请类型',
  prop: 'organizationType'
},
{
  fieldType: 'text',
  label: '公司名称（姓名）',
  prop: 'name'
},
{
  fieldType: 'text',
  label: '账号',
  prop: 'loginName'
},
{
  fieldType: 'text',
  label: '手机号',
  prop: 'phone'
},
{
  fieldType: 'text',
  label: '联系人',
  prop: 'contact'
},
{
  fieldType: 'text',
  label: '电子邮箱',
  prop: 'email'
},
{
  fieldType: 'text',
  label: '联系QQ',
  prop: 'qq'
}]

export default {
  columns
}
