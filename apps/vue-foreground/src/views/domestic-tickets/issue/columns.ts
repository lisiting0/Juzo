
const columns = [
  {
    fieldType: 'enum',
    width: 110,
    enumType: 'IssueOrderStatus',
    enumNamespace: 'AdminService',
    label: '订单状态',
    prop: 'orderStatus',
    class: 'el-link el-link--danger'
  },
  {
    fieldType: 'datetime',
    width: 135,
    label: '创建时间',
    prop: 'createTime'
  },
  {
    fieldType: 'text',
    width: 130,
    label: '出票完成时间',
    prop: 'successTime'
  },
  {
    fieldType: 'enum',
    width: 70,
    enumType: 'TripType',
    enumNamespace: 'AdminService',
    label: '航程类型',
    prop: 'orderFlightType'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '订单号',
    prop: 'ticketIssueOrderNo',
    class: 'link-type'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '姓名',
    prop: 'passengerNameStr'
  },
  {
    fieldType: 'group',
    width: 140,
    label: 'PNR',
    prop: 'pnr',
    columns: [
      {
        fieldType: 'other',
        label: 'PNR',
        prop: 'pnr'
      },
      {
        fieldType: 'text',
        label: '航程',
        prop: 'flightJoinStr'
      }
    ]
  },
  {
    fieldType: 'text',
    width: 50,
    label: '舱位',
    prop: 'cabinListStr'
  },
  {
    fieldType: 'text',
    width: 190,
    label: '起飞时间 | 航班号',
    prop: 'departureJoinStr'
  },
  {
    fieldType: 'text',
    width: 70,
    label: '票面价',
    prop: 'orderOriginAmount'
  },
  {
    fieldType: 'text',
    width: 70,
    label: '销售价',
    prop: 'orderSaleAmount'
  },
  {
    fieldType: 'group',
    label: '机建',
    prop: 'airportTax',
    columns: [
      {
        fieldType: 'text',
        label: '机建',
        prop: 'flightTaxesAmount'
      },
      {
        fieldType: 'text',
        label: '燃油',
        prop: 'fuelTaxesAmount'
      }
    ]
  },
  {
    fieldType: 'text',
    width: 70,
    label: '实付金额',
    prop: 'paymentAmount',
    class: 'el-link el-link--danger'
  }
]
export default {
  columns
}
