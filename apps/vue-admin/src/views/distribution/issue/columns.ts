
const columns = [
  {
    fieldType: 'group',
    width: '140',
    label: '分销商',
    prop: 'agentOrganizationName',
    columns: [
      {
        fieldType: 'text',
        label: '分销商',
        prop: 'agentOrganizationName'
      },
      {
        fieldType: 'text',
        label: '操作员',
        prop: 'createUserName'
      }
    ]
  },
  {
    fieldType: 'enum',
    enumType: 'IssueOrderStatus',
    enumNamespace: 'AdminService',
    label: '订单状态',
    prop: 'orderStatus',
    class: 'el-link el-link--danger'
  },
  {
    fieldType: 'group',
    width: 145,
    label: '创建时间',
    prop: 'createTime',
    columns: [
      {
        fieldType: 'text',
        label: '创建时间',
        prop: 'createTime'
      },
      {
        fieldType: 'text',
        label: '出票完成时间',
        prop: 'successTime'
      }
    ]
  },
  {
    fieldType: 'text',
    width: 160,
    label: '订单号',
    prop: 'ticketIssueOrderNo',
    class: 'link-type'
  },
  {
    fieldType: 'text',
    width: 150,
    label: '姓名',
    prop: 'passengerNameStr'
  },
  {
    fieldType: 'group',
    width: 80,
    label: '舱位',
    prop: 'cabinListStr',
    columns: [
      {
        fieldType: 'enum',
        enumType: 'TripType',
        enumNamespace: 'AdminService',
        label: '航程类型',
        prop: 'orderFlightType'
      },
      {
        fieldType: 'text',
        label: '舱位',
        prop: 'cabinListStr'
      }
    ]
  },
  {
    fieldType: 'group',
    width: 150,
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
    width: 195,
    label: '起飞时间 | 航班号',
    prop: 'departureJoinStr'
  },
  {
    fieldType: 'number',
    label: '销售价',
    prop: 'soldTotalAmount'
  },
  {
    fieldType: 'group',
    width: 80,
    label: '机建',
    prop: 'flightTaxesAmount',
    columns: [
      {
        fieldType: 'number',
        label: '机建',
        prop: 'flightTaxesAmount'
      },
      {
        fieldType: 'number',
        label: '燃油',
        prop: 'fuelTaxesAmount'
      }
    ]
  },
  {
    fieldType: 'text',
    width: 90,
    label: '分销实付款',
    prop: 'paymentAmount',
    class: 'el-link el-link--danger'
  },
  {
    fieldType: 'group',
    label: '政策代码',
    prop: 'policyCode',
    columns: [
      {
        fieldType: 'other',
        label: '政策代码',
        prop: 'policyCode'
      },
      {
        fieldType: 'text',
        label: '产品类型',
        prop: 'productType'
      }
    ]
  },
  {
    fieldType: 'enum',
    enumType: 'IssueOrderOriginType',
    enumNamespace: 'AdminService',
    label: '订单来源',
    prop: 'orderOriginType'
  }
]
export default {
  columns
}
