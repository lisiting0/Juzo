const columns = [
  {
    fieldType: 'enum',
    width: 150,
    enumType: 'RefundOrderStatusType',
    enumNamespace: 'AdminService',
    label: '订单状态',
    prop: 'orderStatus',
    class: 'el-link el-link--danger'
  },
  {
    fieldType: 'text',
    width: 135,
    label: '申请时间',
    prop: 'createTime'
  },
  {
    fieldType: 'text',
    width: 135,
    label: '退款完成时间',
    prop: 'successTime'
  },
  {
    fieldType: 'enum',
    enumType: 'RefundType',
    enumNamespace: 'AdminService',
    label: '退票类型',
    prop: 'isVolunteer'
  },
  {
    fieldType: 'group',
    width: 150,
    label: '出票订单号',
    prop: 'issueOrderNo',
    columns: [
      {
        fieldType: 'text',
        label: '出票订单号',
        prop: 'issueOrderNo'
      },
      {
        fieldType: 'text',
        label: '退票订单号',
        prop: 'refundOrderNo',
        class: 'font-red'
      }
    ]
  },
  {
    fieldType: 'text',
    width: 180,
    label: '票号',
    prop: 'carrierTicketNo'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '乘机人',
    prop: 'passengerName'
  },
  {
    fieldType: 'group',
    width: 190,
    label: 'PNR',
    prop: 'pnr',
    columns: [
      {
        fieldType: 'text',
        label: 'PNR',
        prop: 'pnr'
      },
      {
        fieldType: 'text',
        label: '航程',
        prop: 'flightStr'
      }
    ]
  },
  {
    fieldType: 'text',
    width: 245,
    label: '起飞时间 | 航班号',
    prop: 'departureFlightStr'
  },
  {
    fieldType: 'text',
    precision: 0,
    label: '票面价',
    prop: 'originAmount',
    class: 'el-link el-link--danger'
  },
  {
    fieldType: 'group',
    label: '机建',
    prop: 'airportTax',
    columns: [
      {
        fieldType: 'text',
        precision: 0,
        label: '机建',
        prop: 'flightTax'
      },
      {
        fieldType: 'text',
        precision: 0,
        label: '燃油',
        prop: 'fuelTax'
      }
    ]
  },
  {
    fieldType: 'text',
    label: '保险金额',
    prop: 'insuranceAmount'
  },
  {
    fieldType: 'text',
    precision: 0,
    label: '实付金额',
    prop: 'paymentAmount'
  },
  {
    fieldType: 'text',
    width: 100,
    label: '退票手续费',
    prop: 'feesAmount'
  },
  {
    fieldType: 'text',
    label: '应退金额',
    prop: 'refundableAmount'
  },
  {
    fieldType: 'text',
    label: '实退金额',
    prop: 'refundAmount'
  }
]

export default {
  columns
}
