<template>
  <el-dialog
    width="80%"
    top="5vh"
    :visible.sync="dialogFormVisible"
    :title="'关联订单'"
    :before-close="handleClose"
  >
    <div style="height: 600px">
      <el-table :data="associateOrderList" style="width: 100%" height="100%">
        <el-table-column prop="orderBusinessType" label="订单类型">
          <template slot-scope="scope">
            {{
              $t(
                `AdminService["Enum:OrderBusinessType:${scope.row.orderBusinessType}"]`
              )
            }}
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号" />
        <el-table-column prop="agentName" label="客户名称" />
        <el-table-column prop="agentOrganizationName" label="客户组织名称" />
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { queryMatchIssue } from '@/api/flight-change-notification/flight-change-notification'

export default {
  name: 'AssociateOrderDialog',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      associateOrderList: [],
      flightChangeNotificationId: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    getAssociateOrderList() {
      queryMatchIssue(this.flightChangeNotificationId)
        .then((response) => {
          this.loading = false
          if (response.status === '200') {
            this.associateOrderList = response.data
          }
        })
        .catch((error) => {
          this.loading = false
          throw error
        })
    },

    handleOpen(row) {
      this.dialogFormVisible = true
      this.flightChangeNotificationId = row.id
      this.getAssociateOrderList()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>

<style></style>
