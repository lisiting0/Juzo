const columns = [
  {
    fieldType: 'enum',
    enumType: 'QualityCheckStatusType',
    enumNamespace: 'Juzo',
    width: 130,
    label: '订单状态',
    prop: 'qualityCheckStatus',
    class: 'el-link el-link--danger'
  },
  {
    fieldType: 'group',
    width: 155,
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
        label: '结算时间',
        prop: 'successTime'
      }
    ]
  },
  {
    fieldType: 'text',
    width: 180,
    label: '质检订单号',
    prop: 'qualityCheckOrderNo'
  },
  {
    fieldType: 'group',
    width: 140,
    label: '客户名称',
    prop: 'agentName',
    columns: [
      {
        fieldType: 'text',
        label: '客户名称',
        prop: 'agentName'
      },
      {
        fieldType: 'text',
        label: '客户账号',
        prop: 'agentAccount'
      }
    ]
  },
  {
    fieldType: 'enum',
    enumType: 'OrderBusinessType',
    enumNamespace: 'AdminService',
    width: 90,
    label: '业务类型',
    prop: 'orderBusinessType'
  },
  {
    fieldType: 'text',
    width: 80,
    label: '金额',
    prop: 'amount'
  },
  {
    fieldType: 'enum',
    enumType: 'QualityCheckType',
    enumNamespace: 'Juzo',
    width: 90,
    label: '结算类型',
    prop: 'qualityCheckType'
  },
  {
    fieldType: 'text',
    width: 160,
    label: '关联业务订单号',
    prop: 'originOrderNo'
  },
  {
    fieldType: 'enum',
    enumType: 'QualityOrderOrigin',
    enumNamespace: 'Juzo',
    width: 90,
    label: '订单来源',
    prop: 'qualityOrderOrigin'
  },
  {
    fieldType: 'text',
    label: '创建人',
    prop: 'createUserName'
  },
  {
    fieldType: 'text',
    label: '审核员',
    prop: 'auditUserName'
  }
]

export default {
  columns
}
