
const columns = [
  {
    fieldType: 'text',
    label: '订单类型',
    prop: 'businessMessage'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '所属分销商',
    prop: 'agentOrganizationName'
  },
  {
    fieldType: 'enum',
    enumType: 'ChangeOrderStatus',
    enumNamespace: 'AdminService',
    label: '订单状态',
    prop: 'orderStatus'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '创建时间',
    prop: 'createTime'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '出票时间',
    prop: 'successTime'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '出票订单号',
    prop: 'ticketIssueOrderNo'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '改签订单号',
    prop: 'ticketChangeOrderNo'
  },
  {
    fieldType: 'text',
    width: 130,
    label: '原票号',
    prop: 'carrierTicketNo'
  },
  {
    fieldType: 'text',
    width: 130,
    label: '新票号',
    prop: 'newCarrierTicketNo'
  },
  {
    fieldType: 'text',
    width: 85,
    label: 'pnr',
    prop: 'pnr'
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
    width: 180,
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
    label: '原航司',
    prop: 'carrierNo'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '原航程',
    prop: 'orderFlight'
  },
  {
    fieldType: 'text',
    label: '原航班号',
    prop: 'flightNumber'
  },
  {
    fieldType: 'text',
    label: '原舱位',
    prop: 'cabinCode'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '原起飞时间',
    prop: 'departureTime'
  },
  {
    fieldType: 'text',
    label: '新航司',
    prop: 'newCarrierNo'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '新航程',
    prop: 'newOrderFlight'
  },
  {
    fieldType: 'text',
    label: '新航班号',
    prop: 'newFlightNumber'
  },
  {
    fieldType: 'text',
    width: 80,
    label: '新舱位',
    prop: 'newCabinCode'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '新起飞时间',
    prop: 'newDepartureTime'
  },
  {
    fieldType: 'text',
    label: '票面价',
    prop: 'originTicketPrice'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '改签手续费',
    prop: 'feesAmount'
  },
  {
    fieldType: 'text',
    label: '升舱费',
    prop: 'priceDifference'
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
    label: '支付方式',
    prop: 'payChannel'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '支付时间',
    prop: 'finishedTime'
  },
  {
    fieldType: 'text',
    width: 200,
    label: '支付流水号',
    prop: 'paymentNo'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '备注',
    prop: 'remark'
  }
]
export default {
  columns
}
