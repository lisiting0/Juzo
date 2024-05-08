
const natInternationalOptions = [
  {
    value: 0,
    label: '国内'
  },
  {
    value: 1,
    label: '国际'
  }
]

const hasOptions = [
  {
    value: 1,
    label: '有'
  },
  {
    value: 0,
    label: '没有'
  }
]

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

const cabinTypeOptions = [
  {
    value: null,
    label: '不限'
  },
  {
    value: 1,
    label: '明珠舱'
  }
]

const passengerTypeOptions = [
  {
    value: null,
    label: '不限'
  },
  {
    value: 0,
    label: '成人'
  },
  {
    value: 1,
    label: '儿童'
  },
  {
    value: 2,
    label: '婴儿'
  }
]

const ruleTypeOptions = [
  {
    value: null,
    label: '不限'
  },
  {
    value: 0,
    label: '退票'
  },
  {
    value: 1,
    label: '改签'
  },
  {
    value: 2,
    label: '签转'
  },
  {
    value: 3,
    label: '其他'
  }
]

const originTypeOptions = [
  {
    value: 0,
    label: '航司'
  },
  {
    value: 1,
    label: '自定义'
  },
  {
    value: 2,
    label: '其他'
  }
]

const finishTimeOptions = [{
  value: 0,
  label: '距离起飞时间前2小时'
}]

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
    value: false,
    label: '启用'
  },
  {
    value: true,
    label: '禁用'
  }
]

export default {
  natInternationalOptions,
  hasOptions,
  booleanOptions,
  cabinTypeOptions,
  passengerTypeOptions,
  ruleTypeOptions,
  finishTimeOptions,
  issueStatusOptions,
  tripTypeOptions,
  enDisableOptions,
  originTypeOptions
}
