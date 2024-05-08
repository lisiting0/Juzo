
const columns = [
  {
    fieldType: 'enum',
    enumType: 'JuzoAnnouncementStatusType',
    enumNamespace: 'AdminService',
    label: '公告状态',
    prop: 'status'
  },
  {
    fieldType: 'text',
    label: '公告标题',
    prop: 'title'
  },
  {
    fieldType: 'text',
    label: '生效开始时间',
    prop: 'validDateBegin'
  },
  {
    fieldType: 'text',
    label: '生效结束时间',
    prop: 'validDateEnd'
  },
  {
    fieldType: 'date',
    label: '创建时间',
    prop: 'creationTime'
  },
  {
    fieldType: 'text',
    label: '创建人',
    prop: 'publishUserName'
  },
  {
    fieldType: 'text',
    label: '取消人',
    prop: 'cancelUserName'
  }
]

export default {
  columns
}
