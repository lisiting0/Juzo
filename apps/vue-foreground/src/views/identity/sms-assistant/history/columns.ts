const columns = [
  {
    fieldType: 'text',
    label: '订单编号',
    prop: 'balanceFlowNo'
  },
  {
    fieldType: 'text',
    label: '充值日期',
    prop: 'createTime'
  },
  {
    fieldType: 'text',
    label: '充值金额',
    prop: 'flowAmount'
  },
  {
    fieldType: 'text',
    label: '短信数量',
    prop: 'messageNum'
  },
  {
    fieldType: 'text',
    label: '操作人',
    prop: 'createUserName'
  },
  {
    fieldType: 'enum',
    enumType: 'PayChannelType',
    enumNamespace: 'AdminService',
    label: '支付方式',
    prop: 'payChannel'
  },
  {
    fieldType: 'text',
    label: '充值结果',
    prop: 'flowStatusMessage'
  }
]
export default {
  columns
}
