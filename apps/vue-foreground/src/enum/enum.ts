const booleanOptions = [
  {
    value: 1,
    label: '是'
  },
  {
    value: 0,
    label: '否'
  }
]

const issueStatusOptions = [
  // 0-待支付 1-待出票 2-出票中 3-已出票 4-已取消 5-出票拒绝
  {
    value: 0,
    label: '待支付'
  },
  {
    value: 1,
    label: '待出票'
  }, {
    value: 2,
    label: '出票中'
  }, {
    value: 3,
    label: '已出票'
  }, {
    value: 4,
    label: '已取消'
  }, {
    value: 5,
    label: '出票拒绝'
  }, {
    value: 6,
    label: '支付超时关闭'
  }
]

const tripTypeOptions = [
  {
    value: 0,
    label: '单程'
  },
  {
    value: 1,
    label: '往返'
  }, {
    value: 2,
    label: '联程'
  }
]

const enDisableOptions = [
  {
    value: 1,
    label: '启用'
  },
  {
    value: 0,
    label: '禁用'
  }
]

const boolEnDisableOptions = [
  {
    value: true,
    label: '启用'
  },
  {
    value: false,
    label: '禁用'
  }
]

export default {
  booleanOptions,
  issueStatusOptions,
  tripTypeOptions,
  enDisableOptions,
  boolEnDisableOptions
}
