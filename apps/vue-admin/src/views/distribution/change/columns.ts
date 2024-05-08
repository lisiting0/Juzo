const columns = [
{
  fieldType: 'text',
  width: 140,
  label: '分销商',
  prop: 'agentOrganizationName'
},
{
  fieldType: 'enum',
  enumType: 'ChangeOrderStatus',
  enumNamespace: 'AdminService',
  label: '订单状态',
  prop: 'orderStatus',
  class: 'el-link el-link--danger'
},
{
  fieldType: 'group',
  width: 158,
  label: '申请时间',
  prop: 'createTime',
  columns: [
    {
      fieldType: 'text',
      label: '申请时间',
      prop: 'createTime'
    },
    {
      fieldType: 'text',
      label: '改签完成时间',
      prop: 'successTime',
      class: 'font-red'
    }
  ]
},
{
  fieldType: 'enum',
  enumType: 'ChangeOrderType',
  enumNamespace: 'AdminService',
  label: '改签类型',
  prop: 'changeTicketReason'
},
{
  fieldType: 'group',
  width: 180,
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
      label: '改期订单号',
      prop: 'changeOrderNo',
      class: 'font-red'
    }
  ]
},
{
  fieldType: 'text',
  width: 130,
  label: '乘机人',
  prop: 'passengerNameStr'
  },
  {
    fieldType: 'group',
    width: 195,
    label: '原航班',
    prop: 'originFlightList',
    columns: [
      {
        fieldType: 'text',
        label: '原航班',
        prop: 'originFlightList'
      },
      {
        fieldType: 'text',
        label: '新航班',
        prop: 'changeFlightList',
        class: 'font-red'
      }
    ]
  },
  {
    fieldType: 'group',
    width: 140,
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
        prop: 'flightListStr'
      }
    ]
  },
  {
    fieldType: 'group',
    width: 140,
    label: '原票号',
    prop: 'originCarrierTicketNoStr',
    columns: [
      {
        fieldType: 'text',
        label: '原票号',
        prop: 'originCarrierTicketNoStr'
      },
      {
        fieldType: 'text',
        label: '新票号',
        prop: 'changeCarrierTicketNoStr',
        class: 'font-red'
      }
    ]
  },
  {
    fieldType: 'text',
    label: '升舱费',
    prop: 'priceDifference'
  },
  {
    fieldType: 'text',
    label: '改签费',
    prop: 'feesAmount'
  },
  {
    fieldType: 'text',
    width: 110,
    label: '分销商实付款',
    prop: 'paymentAmount'
  },
  {
    fieldType: 'text',
    label: '出票员',
    prop: 'ticketPersonName'
  }
]

export default {
  columns
}
