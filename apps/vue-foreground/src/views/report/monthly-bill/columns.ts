
const columns = [
  {
    fieldType: 'text',
    label: '结算月份',
    prop: 'settlementMonth'
  },
  {
    fieldType: 'text',
    label: '账单状态',
    prop: 'billingStatus'
  },
  {
    fieldType: 'text',
    label: '账单金额',
    prop: 'billingAmount'
  },
  {
    fieldType: 'number',
    label: '待付款金额',
    prop: 'amount'
  },
  {
    fieldType: 'date',
    label: '创建时间',
    prop: 'creationTime'
  },
  {
    fieldType: 'date',
    label: '完结状态时间',
    width: '150px',
    prop: 'currentDeposit'
  }
]
export default {
  columns
}
