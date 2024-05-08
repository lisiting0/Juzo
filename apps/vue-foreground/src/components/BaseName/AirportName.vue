<template>
    <span>{{ airport.airportName }}</span>
</template>

<script>
import { airportList } from '@/api/basic/airport'
export default {
  name: 'AirportName',
  components: {},
  props: {
    airportCode: {
      type: String,
      default: () => '' // 设置默认值
    }
  },
  data() {
    return {
      airport: {}
    }
  },
  created() {
    this.getAirports()
  },
  mounted() {
  },
  methods: {
    getAirports() {
      if (sessionStorage.getItem(this.getCacheKey(this.airportCode))) {
        this.airport.airportName = sessionStorage.getItem(this.getCacheKey(this.airportCode))
        return
      }
      airportList({
        airportCode: this.airportCode,
        current: -1,
        size: -1,
      }).then((response) => {
        if (response) {
          this.airport = response.data.records[0]
        }
        sessionStorage.setItem(this.getCacheKey(this.airportCode), this.airport.airportName)
      })
    },
    getCacheKey(code) {
      return `airport-${code}`
    }
  }
}
</script>
<style lang="scss" scoped></style>
