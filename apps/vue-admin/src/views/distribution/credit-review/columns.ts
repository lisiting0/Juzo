const columns = [
  {
    fieldType: 'text',
    label: '分销商名称',
    prop: 'agentOrganizationName'
  },
  {
    fieldType: 'enum',
    enumType: 'AuditType',
    enumNamespace: 'AdminService',
    label: '申请类型',
    prop: 'auditType'
  },
  {
    fieldType: 'text',
    label: '数额',
    prop: 'auditAmount'
  },
  {
    fieldType: 'enum',
    enumType: 'AuditStatus',
    enumNamespace: 'AdminService',
    label: '审核状态',
    prop: 'auditStatus'
  },
  {
    fieldType: 'text',
    label: '申请时间',
    prop: 'createTime'
  },
  {
    fieldType: 'text',
    label: '审核人',
    prop: 'auditUserName'
  },
  {
    fieldType: 'text',
    label: '审核时间',
    prop: 'auditTime'
  }]

export default {
  columns
}
