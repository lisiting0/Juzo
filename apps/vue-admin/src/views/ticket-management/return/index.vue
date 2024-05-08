<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="退回查询" name="first">
        <returnInquiry />
      </el-tab-pane>
      <el-tab-pane label="票证退回" name="second">
        <ticketReturn />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ReturnInquiry from './return-inquiry/index'
import TicketReturn from './ticket-return/index'
export default {
name: 'Return',
components: {
  ReturnInquiry,
  TicketReturn
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
