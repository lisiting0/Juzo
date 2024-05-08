
const columns = [
  {
    fieldType: 'boolean',
    booleanOptions: 'true启用|false禁用',
    label: '状态',
    prop: 'enabled'
  },
  {
    fieldType: 'enum',
    enumType: 'TripType',
    enumNamespace: 'AdminService',
    label: '政策类型',
    prop: 'tripType'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '政策名称',
    prop: 'name'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '政策代码',
    prop: 'policyCode'
  },
  {
    fieldType: 'text',
    width: 160,
    label: '政策描述',
    prop: 'description'
  },
  {
    fieldType: 'text',
    width: 140,
    label: '所属产品名称',
    prop: 'productName'
  },
  {
    fieldType: 'dateYMD',
    width: 120,
    label: '有效开始日期',
    prop: 'validDateBegin'
  },
  {
    fieldType: 'dateYMD',
    width: 120,
    label: '有效结束日期',
    prop: 'validDateEnd'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '有效开始时间',
    prop: 'validTimeBegin'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '有效结束时间',
    prop: 'validTimeEnd'
  },
  {
    fieldType: 'boolean',
    label: '生成PNR',
    prop: 'generatePnr'
  },
  {
    fieldType: 'text',
    width: 120,
    label: '使用Office号',
    prop: 'useOfficeNo'
  },
  {
    fieldType: 'boolean',
    width: 120,
    label: 'PATA验价',
    prop: 'pata'
  },
  {
    fieldType: 'text',
    width: 120,
    label: 'PATA特殊命令',
    prop: 'pataCommand'
  },
  {
    fieldType: 'text',
    width: 140,
    label: '禁售最小座位阈值',
    prop: 'minSeatLeftWhenDisabled'
  },
  {
    fieldType: 'enum',
    enumType: 'ReimbursementType',
    enumNamespace: 'AdminService',
    label: '报销类型',
    prop: 'reimbursementType'
  },
  {
    fieldType: 'text',
    label: '航司代码',
    prop: 'airline'
  },
  {
    fieldType: 'enum',
    enumType: 'TicketPriceSourceType',
    enumNamespace: 'AdminService',
    width: 110,
    label: '运价来源类型',
    prop: 'priceSourceType'
  },
  {
    fieldType: 'number',
    label: '票面价返点',
    prop: 'commissionPoint'
  },
  {
    fieldType: 'number',
    label: '票面价返钱',
    prop: 'commissionMoney'
  },
  {
    fieldType: 'number',
    width: 100,
    label: '票价浮点数',
    prop: 'ticketPriceFloatingPoint'
  },
  {
    fieldType: 'number',
    label: '票价金额',
    prop: 'ticketPriceFloatingMoney'
  },
  {
    fieldType: 'number',
    label: '票价上限',
    prop: 'ticketPriceUpperLimit'
  },
  {
    fieldType: 'number',
    label: '票价下限',
    prop: 'ticketPriceLowerLimit'
  },
  {
    fieldType: 'number',
    label: '票价',
    prop: 'ticketPrice'
  },
  {
    fieldType: 'number',
    width: 160,
    label: '航司代理费返钱',
    prop: 'agentCommissionMoney'
  },
  {
    fieldType: 'number',
    width: 160,
    label: '航司代理费返点',
    prop: 'agentCommissionPoint'
  },
  {
    fieldType: 'boolean',
    width: 160,
    label: '是否匹配运价基础',
    prop: 'matchFareBaseCode'
  },
  {
    fieldType: 'text',
    width: 160,
    label: '加享产品后返金额',
    prop: 'serviceCommissionMoney'
  },
  {
    fieldType: 'text',
    width: 160,
    label: '匹配票价基础关键字',
    prop: 'fareBaseCodeKeyword'
  },
  {
    fieldType: 'text',
    width: 180,
    label: '请输入票价基础服务说明',
    prop: 'fareBaseServiceDescription'
  }
]
export default {
  columns
}
