<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="发放查询" name="first">
        <issuanceInquiries />
      </el-tab-pane>
      <el-tab-pane label="各分销商库存查询" name="second">
        <inventoryInquiry />
      </el-tab-pane>
      <el-tab-pane label="票证发放" name="third">
        <ticketIssuance />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import IssuanceInquiries from './issuance-inquiries/index'
import InventoryInquiry from './inventory-inquiry/index'
import TicketIssuance from './ticket-issuance/index'
export default {
  name: 'Issuance',
  components: {
    IssuanceInquiries,
    InventoryInquiry,
    TicketIssuance
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
