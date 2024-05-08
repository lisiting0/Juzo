
const columns = [
  {
    fieldType: 'text',
    width: 190,
    label: '交易流水号',
    prop: 'paymentNo'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '订单号',
    prop: 'orderNo'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '分销商',
    prop: 'agentOrganizationName'
  },
  {
    fieldType: 'text',
    width: 136,
    label: '预存款账户_期初余额',
    prop: 'oldAmount'
  },
  {
    fieldType: 'text',
    width: 136,
    label: '预存款账户_本次预存',
    prop: 'amount'
  },
  {
    fieldType: 'text',
    width: 136,
    label: '预存款账户_期末余额',
    prop: 'newAmount'
  },
  {
    fieldType: 'enum',
    enumType: 'PayChannelType',
    enumNamespace: 'AdminService',
    width: 180,
    label: '付款方式',
    prop: 'payChannel'
  },
  {
    fieldType: 'enum',
    enumType: 'OrderBusinessType',
    enumNamespace: 'AdminService',
    label: '订单类型',
    prop: 'orderBusinessType'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '发生时间',
    prop: 'createTime'
  },
  {
    fieldType: 'text',
    label: '联系人',
    prop: 'contactName'
  },
  {
    fieldType: 'text',
    label: '联系电话',
    prop: 'contactPhone'
  },
  {
    fieldType: 'text',
    label: '操作员',
    prop: 'updateUserName'
  },
  {
    fieldType: 'other',
    width: 120,
    label: '备注',
    prop: 'remark'
  }
]
export default {
  columns
}
