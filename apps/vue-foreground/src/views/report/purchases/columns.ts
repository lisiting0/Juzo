
const columns = [
  {
    fieldType: 'text',
    label: '订单类型',
    prop: 'businessMessage'
  },
  {
    fieldType: 'enum',
    enumType: 'IssueOrderStatus',
    enumNamespace: 'AdminService',
    label: '订单状态',
    prop: 'orderStatus'
  },
  {
    fieldType: 'text',
    width: 130,
    label: '创建时间',
    prop: 'createTime'
  },
  {
    fieldType: 'text',
    width: 130,
    label: '出票时间',
    prop: 'successTime'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '订单号',
    prop: 'ticketIssueOrderNo'
  },
  {
    fieldType: 'enum',
    enumType: 'TripType',
    enumNamespace: 'AdminService',
    label: '航程类型',
    prop: 'orderFlightType'
  },
  {
    fieldType: 'text',
    width: 130,
    label: 'pnr',
    prop: 'pnr'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '票号',
    prop: 'carrierTicketNo'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '乘机人',
    prop: 'passengerName'
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
    enumType: 'PassengerType',
    enumNamespace: 'AdminService',
    label: '乘客类型',
    prop: 'passengerType'
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
    width: 150,
    label: '证件号',
    prop: 'cardNum'
  },
  {
    fieldType: 'text',
    label: '航司',
    prop: 'carrierNo'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '航程',
    prop: 'orderFlight'
  },
  {
    fieldType: 'text',
    label: '航班号',
    prop: 'flightNumber'
  },
  {
    fieldType: 'text',
    label: '共享航班号',
    prop: 'actualCarrierFlight'
  },
  {
    fieldType: 'text',
    label: '行李额',
    prop: 'luggageWeight'
  },
  {
    fieldType: 'text',
    label: '舱位',
    prop: 'cabinCode'
  },
  {
    fieldType: 'text',
    width: 130,
    label: '起飞时间',
    prop: 'departureTime'
  },
  {
    fieldType: 'text',
    label: '票面价',
    prop: 'originTicketPrice'
  },
  {
    fieldType: 'text',
    label: '销售价',
    prop: 'soldTicketPrice'
  },
  {
    fieldType: 'text',
    label: '机建',
    prop: 'flightTax'
  },
  {
    fieldType: 'text',
    label: '燃油',
    prop: 'fuelTax'
  },
  {
    fieldType: 'text',
    label: '保险',
    prop: 'insuranceAmount'
  },
  {
    fieldType: 'text',
    label: '实付金额',
    prop: 'paymentAmount'
  },
  {
    fieldType: 'enum',
    enumType: 'PayChannelType',
    enumNamespace: 'AdminService',
    width: 130,
    label: '支付方式',
    prop: 'payChannel'
  },
  {
    fieldType: 'text',
    width: 130,
    label: '支付时间',
    prop: 'finishedTime'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '支付流水号',
    prop: 'paymentNo'
  },
  {
    fieldType: 'text',
    label: '产品类型',
    prop: 'productType'
  },
  {
    fieldType: 'other',
    label: '备注',
    prop: 'remark'
  }
]
export default {
  columns
}
