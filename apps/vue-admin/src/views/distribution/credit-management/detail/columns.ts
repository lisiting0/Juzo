const columns = [
{
  fieldType: 'text',
  label: '审批完成时间',
  prop: 'createTime'
},
// {
//   fieldType: 'text',
//   label: '操作人',
//   prop: 'agentName'
// },
{
  fieldType: 'enum',
  enumType: 'FinanceBalanceType',
  enumNamespace: 'AdminService',
  label: '账户类型',
  prop: 'balanceType'
},
{
  fieldType: 'enum',
  enumType: 'FlowType',
  enumNamespace: 'AdminService',
  label: '交易类型',
  prop: 'flowType'
},
{
  fieldType: 'text',
  label: '交易金额',
  prop: 'flowAmount'
},
{
  fieldType: 'text',
  label: '备注',
  prop: 'remark'
}]

export default {
  columns
}
