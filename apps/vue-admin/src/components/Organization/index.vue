<template>
  <div>{{ organization.name }}</div>
</template>
<script>
import { ticketAgentList } from '@/api/distribution/agent'
export default {
  name: 'Organization',
  components: {},
  props: {
    organizationId: {
      type: String,
      default: () => '' // 设置默认值
    }
  },
  data() {
    return {
      organization: {}
    }
  },
  created() {
    this.getAgents()
  },
  mounted() {
  },
  methods: {
    getAgents() {
      if (sessionStorage.getItem(this.getCacheKey(this.organizationId))) {
        this.organization.name = sessionStorage.getItem(this.getCacheKey(this.organizationId))
        return
      }
      ticketAgentList({
        organizationId: this.organizationId,
        page: 1,
        limit: 10,
        sort: ''
      }).then((response) => {
        if (response) {
          this.organization = response.items[0]
        }
        sessionStorage.setItem(this.getCacheKey(this.organizationId), this.organization.name)
      })
    },
    getCacheKey(id) {
      return `organization-${id}`
    }
  }
}
</script>
<style lang="scss" scoped></style>
