<template>
  <el-button size="small" @click="routerBack()">返回</el-button>
</template>

<script>
export default {
  name: 'RouterBack',
  props: {},
  data() {
    return {

    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    routerBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
</style>
