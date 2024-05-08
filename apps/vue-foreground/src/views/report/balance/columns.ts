const columns = [
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
    label: '本期金额',
    prop: 'flowAmount'
  },
  {
    fieldType: 'text',
    label: '期初余额',
    prop: 'oldAmount'
  },
  {
    fieldType: 'text',
    label: '期末余额',
    prop: 'newAmount'
  },
  {
    fieldType: 'text',
    label: '状态',
    prop: 'statusMessage'
  },
  {
    fieldType: 'text',
    label: '交易时间',
    prop: 'createTime'
  },
  {
    fieldType: 'text',
    label: '交易流水号',
    prop: 'balanceFlowNo'
  }
]
export default {
  columns
}
