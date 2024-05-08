
const columns = [
  {
    fieldType: 'enum',
    label: '出票渠道',
    enumType: 'TicketChannelType',
    enumNamespace: 'AdminService',
    prop: 'ticketChannel'
  },
  {
    fieldType: 'enum',
    label: '支付渠道',
    enumType: 'PurchasePayPlatformType',
    enumNamespace: 'AdminService',
    prop: 'purchasePayPlatform'
  },
  {
    fieldType: 'text',
    label: 'Office',
    prop: 'officeNo'
  },
  {
    fieldType: 'text',
    label: '打印机号',
    prop: 'printerNo'
  },
  {
    fieldType: 'text',
    label: '支付账号',
    prop: 'account'
  },
  {
    fieldType: 'text',
    label: '支付密码',
    prop: 'password'
  },
  {
    fieldType: 'text',
    label: '创建时间',
    prop: 'createTime'
  }
]
export default {
  columns
}
