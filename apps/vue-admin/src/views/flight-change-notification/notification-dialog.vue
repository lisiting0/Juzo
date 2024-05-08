<template>
  <el-dialog
    width="80%"
    top="5vh"
    :visible.sync="dialogFormVisible"
    :title="'详情列表'"
    :before-close="handleClose"
    scrollable
  >
    <div class="custom-card">
      <div class="card-title">发布航变通知列表</div>

      <div class="card-box" style="padding: 15px 10px">
        <div>
          <el-form
            ref="checkboxFormRef"
            :model="query"
            :inline="true"
            class="demo-form-inline"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="订单号">
                  <el-input v-model="query.orderNo" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="乘机人">
                  <el-input v-model="query.passengerName" clearable />
                </el-form-item>
              </el-col>
              <el-form-item class="btns">
                <el-button type="primary" @click="getNotificationOrderList()">
                  查询
                </el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <div style="height: 600px">
          <el-table
            ref="multipleTable"
            :data="notificationOrderList"
            tooltip-effect="dark"
            style="width: 100%"
            height="100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" selection-align="center" />
            <el-table-column label="订单号" prop="orderNo" />
            <el-table-column label="乘客姓名" prop="passengerName" />
            <el-table-column label="航程">
              <template slot-scope="scope">
                {{ scope.row.departureAirport }}-
                {{ scope.row.arrivalAirport }}
              </template>
            </el-table-column>
            <el-table-column label="航班号" prop="flightNumber" />
          </el-table>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="saveData()"> 确定发布 </el-button>
    </div>
  </el-dialog>
</template>

<script>
// import InsuranceTypeEnum from '@/enum/insuranceType'
import {
  queryMappingPassenger,
  confirmSend
} from '@/api/flight-change-notification/flight-change-notification'

export default {
  name: 'NotificationDialog',
  components: {
    // Datatable
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      selectioned: [],
      multipleSelection: [],
      notificationOrderList: [],
      passengerIdList: [],
      flightChangeNotificationId: '',
      query: { id: '' }
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.getNotificationOrderList()
  },
  mounted() {},
  methods: {
    handleOpen(row) {
      this.dialogFormVisible = true
      this.flightChangeNotificationId = row.id
      this.query.id = row.id
      this.getNotificationOrderList()
    },
    getNotificationOrderList() {
      this.loading = true
      queryMappingPassenger(this.query)
        .then((response) => {
          this.loading = false
          if (response.status === '200') {
            if (response.data) {
              this.notificationOrderList = response.data
            }
          }
        })
        .catch((error) => {
          this.loading = false
          throw error
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    createData() {
      this.passengerIdList = []
      // console.log('********************* this.multipleSelection', this.multipleSelection)
      this.multipleSelection.forEach((element) => {
        this.passengerIdList.push(element.passengerId)
      })
      confirmSend({
        passengerIdList: this.passengerIdList,
        id: this.flightChangeNotificationId
      }).then((response) => {
        if (response.status === '200') {
          // this.$emit('handleFilter', true)
          this.dialogFormVisible = false
          this.$notify({
            title: this.$i18n.t("AdminService['Success']"),
            message: this.$i18n.t("AdminService['SuccessMessage']"),
            type: 'success',
            duration: 2000
          })
        }
      })
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

<style lang="scss"></style>
