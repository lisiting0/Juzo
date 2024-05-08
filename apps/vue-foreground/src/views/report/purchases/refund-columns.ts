
const columns = [
  {
    fieldType: 'text',
    label: '订单类型',
    prop: 'businessMessage'
  },
  {
    fieldType: 'enum',
    enumType: 'RefundOrderStatusType',
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
    width: 150,
    label: '出票订单号',
    prop: 'ticketIssueOrderNo'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '退票订单号',
    prop: 'ticketRefundOrderNo'
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
    width: 150,
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
    label: '改签手续费',
    prop: 'changeFeesAmount'
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
    fieldType: 'text',
    label: '退票手续费',
    prop: 'feesAmount'
  },
  {
    fieldType: 'text',
    label: '实退金额',
    prop: 'refundAmount'
  },
  {
    fieldType: 'text',
    label: '退款时间',
    prop: 'refundFinishTime'
  },
  {
    fieldType: 'text',
    label: '退款流水号',
    prop: 'refundNo'
  },
  {
    fieldType: 'enum',
    enumType: 'RefundReasonType',
    enumNamespace: 'AdminService',
    label: '退票类型',
    prop: 'refundTicketReason'
  },
  {
    fieldType: 'text',
    label: '备注',
    prop: 'remark'
  }
]
export default {
  columns
}
