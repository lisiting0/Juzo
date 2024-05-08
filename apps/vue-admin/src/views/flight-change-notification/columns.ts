const columns = [
  {
    fieldType: 'enum',
    enumType: 'FlightChangeOrderStatusType',
    enumNamespace: 'AdminService',
    label: '通知状态',
    prop: 'status'
  },
  {
    fieldType: 'enum',
    enumType: 'FlightChangeCategoryType',
    enumNamespace: 'AdminService',
    label: '航变类型',
    prop: 'status'
  },
  {
    fieldType: 'group',
    label: '原航班',
    prop: 'originFlightNumber',
    columns: [
      {
        fieldType: 'text',
        label: '原航班',
        prop: 'originFlightNumber'
      },
      {
        fieldType: 'text',
        label: '新航班',
        prop: 'newFlightNumber',
        class: 'font-red'
      }
    ]
  },
  {
    fieldType: 'group',
    label: '原航程',
    prop: 'originFlightInfo',
    columns: [
      {
        fieldType: 'text',
        label: '原航程',
        prop: 'originFlightInfo'
      },
      {
        fieldType: 'text',
        label: '新航程',
        prop: 'newFlightInfo',
        class: 'font-red'
      }
    ]
  },
  {
    fieldType: 'group',
    label: '原起飞时间',
    prop: 'originDepartureTime',
    columns: [
      {
        fieldType: 'text',
        label: '原起飞时间',
        prop: 'originDepartureTime'
      },
      {
        fieldType: 'text',
        label: '新起飞时间',
        prop: 'newDepartureTime',
        class: 'font-red'
      }
    ]
  },
  {
    fieldType: 'group',
    label: '原到达时间',
    prop: 'originArrivalTime',
    columns: [
      {
        fieldType: 'text',
        label: '原到达时间',
        prop: 'originArrivalTime'
      },
      {
        fieldType: 'text',
        label: '新到达时间',
        prop: 'newArrivalTime',
        class: 'font-red'
      }
    ]
  },
  {
    fieldType: 'text',
    label: '备注',
    prop: 'remark'
  },
  {
    fieldType: 'text',
    label: '创建时间',
    prop: 'crateTime'
  }
]
export default {
  columns
}
