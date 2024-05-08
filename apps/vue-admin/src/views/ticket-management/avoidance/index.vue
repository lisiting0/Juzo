<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="报废查询" name="first">
        <avoidanceInquiry />
      </el-tab-pane>
      <el-tab-pane label="票证报废" name="second">
        <ticketAvoidance />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AvoidanceInquiry from './avoidance-inquiry/index'
import TicketAvoidance from './ticket-avoidance/index'
export default {
name: 'Avoidance',
components: {
  AvoidanceInquiry,
  TicketAvoidance
},
data() {
  return {
    activeName: 'first'
  }
},
created() {
},
mounted() {
},
methods: {
}
}
</script>

<style></style>
