<template>
  <div class="check">
    <div v-for="day in days" :key="day.id" class="check-inline">
      <input
        :id="day.name"
        v-model="checkboxValue"
        type="checkbox"
        :value="day.value"
        @change="checkboxChange"
      >
      <label :for="day.name">{{ day.label }}</label>
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
      checkboxValue: [],
      days: [
        { id: 1, name: 'monday', label: '周一', value: 1 },
        { id: 2, name: 'Tuesday', label: '周二', value: 2 },
        { id: 3, name: 'Wednesday', label: '周三', value: 4 },
        { id: 4, name: 'Thursday', label: '周四', value: 8 },
        { id: 5, name: 'Friday', label: '周五', value: 16 },
        { id: 6, name: 'Saturday', label: '周六', value: 32 },
        { id: 7, name: 'Sunday', label: '周日', value: 64 }
      ]
    }
  },
  computed: {},
  watch: {
    value(newVal) {
      this.checkboxValue = newVal
    }
  },
  created() {
    this.checkboxValue = this.value
  },
  mounted() {
  },
  methods: {
    checkboxChange() {
      this.$emit('input', this.checkboxValue)
    }
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
