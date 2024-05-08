<template>
  <span>{{ policy.name }}</span>
</template>

<script>
import { policyDetail } from '@/api/product/policy'
export default {
  name: 'PolicyName',
  components: {},
  props: {
    policyId: {
      type: String,
      default: () => '' // 设置默认值
    }
  },
  data() {
    return {
      policy: {}
    }
  },
  created() {
    this.getPolicyDetail()
  },
  mounted() {
  },
  methods: {
    getPolicyDetail() {
      if (sessionStorage.getItem(this.getCacheKey(this.policyId))) {
        this.policy.name = sessionStorage.getItem(this.getCacheKey(this.policyId))
        return
      }
      policyDetail(this.policyId).then((response) => {
        if (response) {
          this.policy = response
        }
        sessionStorage.setItem(this.getCacheKey(this.policyId), this.policy.name)
      })
    },
    getCacheKey(policyId) {
      return `policy-${policyId}`
    }
  }
}
</script>
<style lang="scss" scoped></style>
