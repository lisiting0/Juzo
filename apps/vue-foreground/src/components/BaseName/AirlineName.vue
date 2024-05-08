<template>
  <span>{{ airline.carrierName }}</span>
</template>

<script>
import { fetchList } from '@/api/basic/airline'
export default {
  name: 'AirlineName',
  components: {},
  props: {
    airlineCode: {
      type: String,
      default: () => '' // 设置默认值
    }
  },
  data() {
    return {
      airline: {}
    }
  },
  created() {
    this.getAirlines()
  },
  mounted() {
  },
  methods: {
    getAirlines() {
      if (sessionStorage.getItem(this.getCacheKey(this.airlineCode))) {
        this.airline.carrierName = sessionStorage.getItem(this.getCacheKey(this.airlineCode))
        return
      }
      fetchList({
        carrierCode: this.airlineCode,
        current: -1,
        size: -1,
        sort: ''
      }).then((response) => {
        if (response) {
          this.airline = response.data.records[0]
        }
        sessionStorage.setItem(this.getCacheKey(this.airlineCode), this.airline.carrierName)
      })
    },
    getCacheKey(code) {
      return `airline-${code}`
    }
  }
}
</script>
<style lang="scss" scoped></style>
