const columns = [
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
    fieldType: 'other',
    label: '未读/已读',
    prop: 'isRead'
  }
]

export default {
  columns
}
