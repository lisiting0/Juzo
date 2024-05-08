<template>
  <div class="check">
    <div class="check-inline">
      <input
        id="all"
        v-model="checkAll"
        type="checkbox"
        :value="0"
        @change="checkAllSelection"
      >
      <label for="all">全选</label>
    </div>
    <div class="check-inline">
      <input
        id="monday"
        v-model="checkboxValue"
        type="checkbox"
        :value="1"
        @change="checkboxChange"
      >
      <label for="monday">周一</label>
    </div>

    <div class="check-inline">
      <input
        id="Tuesday"
        v-model="checkboxValue"
        type="checkbox"
        :value="2"
        @change="checkboxChange"
      >
      <label for="Tuesday">周二</label>
    </div>

    <div class="check-inline">
      <input
        id="Wednesday"
        v-model="checkboxValue"
        type="checkbox"
        :value="4"
        @change="checkboxChange"
      >
      <label for="Wednesday">周三</label>
    </div>

    <div class="check-inline">
      <input
        id="Thursday"
        v-model="checkboxValue"
        type="checkbox"
        :value="8"
        @change="checkboxChange"
      >
      <label for="Thursday">周四</label>
    </div>

    <div class="check-inline">
      <input
        id="Friday"
        v-model="checkboxValue"
        type="checkbox"
        :value="16"
        @change="checkboxChange"
      >
      <label for="Friday">周五</label>
    </div>

    <div class="check-inline">
      <input
        id="Saturday"
        v-model="checkboxValue"
        type="checkbox"
        :value="32"
        @change="checkboxChange"
      >
      <label for="Saturday">周六</label>
    </div>

    <div class="check-inline">
      <input
        id="Sunday"
        v-model="checkboxValue"
        type="checkbox"
        :value="64"
        @change="checkboxChange"
      >
      <label for="Sunday">周日</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Weeks',
  props: {
    value: {
      type: [Array, Number], // 根据你的实际需求来定义数据类型
      default: function() {
        return [] // 返回默认值的函数形式
      }
    }
  },
  data() {
    return {
      checkAll: false,
      checkAllValue: [1, 2, 4, 8, 16, 32, 64],
      checkboxValue: this.value // 在组件内部创建一个副本
    }
  },
  watch: {
    // weeks(value) {
    // 值为checkbox值的和，需要用到分解
    // this.convertToWeekArray(value)
    // }
  },
  created() {
  },
  mounted() {
    this.checkboxValue = this.value
    if (this.checkboxValue.length === this.checkAllValue.length) {
      this.checkAll = true
    } else {
      this.checkAll = false
    }
  },
  methods: {
    checkAllSelection() {
      if (this.checkAll) {
        // this.weeks = 127; // 全选
        this.checkboxValue = this.checkAllValue
      } else {
        // this.weeks = 0; // 取消全选
        this.checkboxValue = []
      }
      // 发送事件通知父组件值的变化
      this.$emit('input', this.checkboxValue)
    },
    checkboxChange() {
      if (this.checkboxValue.length === this.checkAllValue.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.checkboxValue = this.checkboxValue.sort((a, b) => a - b)
      this.$emit('input', this.checkboxValue)
    }
    // convertToWeekArray(value) {
    //   let weekArray = []
    //   let binaryString = value.toString(2); // 将数字转换为二进制字符串
    //   for (let i = 0; i < binaryString.length; i++) {
    //     if (binaryString[i] === '1') {
    //       weekArray.push(Math.pow(2, binaryString.length - 1 - i)) // 将对应位置的值添加到数组中
    //     }
    //   }
    //   this.value = weekArray // 将转换得到的数组赋值给 value
    // }
  }
}
</script>
<style lang="scss" scoped>
.check-inline {
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 0;
    vertical-align: middle;
    input {
        margin-right: 5px;
    }
}
</style>
