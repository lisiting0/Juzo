const columns = [
  {
    fieldType: 'text',
    label: '起始号码',
    prop: 'starterNumber'
  },
  {
    fieldType: 'text',
    label: '终止号码',
    prop: 'endNumber'
  },
  {
    fieldType: 'text',
    label: '退回数量',
    prop: 'stockNum'
  },
  {
    fieldType: 'text',
    label: 'OFFICE号',
    prop: 'office'
  },
  {
    fieldType: 'text',
    label: '发放公司',
    prop: 'issuingCompany'
  },
  {
    fieldType: 'text',
    label: '所在公司',
    prop: 'agentName'
  },
  {
    fieldType: 'datetime',
    label: '发放日期',
    prop: 'createTime'
  }
]

export default {
  columns
}
