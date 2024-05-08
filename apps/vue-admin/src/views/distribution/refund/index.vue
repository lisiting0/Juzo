<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请时间" prop="dateRange">
            <el-date-picker
              v-model="listQuery.dateRange"
              format="yyyy年-MM月-dd日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单状态" prop="orderStatus">
            <el-select v-model="listQuery.orderStatus" clearable>
              <el-option
                v-for="option in refundStatusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="退票类型" prop="refundTicketReason">
            <el-select v-model="listQuery.isVolunteer" clearable>
              <el-option
                v-for="option in refundTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="出票订单号" prop="issueOrderNo">
            <el-input v-model="listQuery.issueOrderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="退票订单号" prop="refundOrderNo">
            <el-input v-model="listQuery.refundOrderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="分销商" prop="agentOrganizationName">
            <el-input
              v-model="listQuery.agentOrganizationName"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="PNR" prop="pnr">
            <el-input v-model="listQuery.pnr" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="乘机人" prop="passengerName">
            <el-input v-model="listQuery.passengerName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="票号" prop="carrierTicketNo">
            <el-input
              v-model="listQuery.carrierTicketNo"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="handleFilter()">
              查询
            </el-button>
            <el-button type="info" @click="resetForm">
              重置
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <datatable
      mode="edit"
      :loading="loading"
      :table-key="'refund'"
      :table-data="list"
      :table-head="columns"
      :current-user="this.$store.getters.abpConfig.currentUser.id"
      @on-edit="onEdit"
      @on-detail="onDetail"
      @on-delete="onCancel"
      @on-unlock="onUnLock"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import baseListQuery from '@/utils/abp'
import RefundStatusEnum from '@/enum/refundStatus'
import RefundTypeEnum from '@/enum/refundType'
import Columns from './columns'
import { fetchList, refundOrderCancel, lockRefundOrder, unLockRefundOrder } from '@/api/agent/refund-order'

export default {
  name: 'Refund',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      refundStatusOptions: [],
      refundTypeOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        timeStarter: '',
        timeEnd: '',
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.refundStatusOptions = Object.keys(RefundStatusEnum.RefundStatus).map(key => ({
      value: RefundStatusEnum.RefundStatus[key],
      label: key
    }))
    this.refundTypeOptions = Object.keys(RefundTypeEnum.RefundType).map(key => ({
      value: RefundTypeEnum.RefundType[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      if (this.listQuery.dateRange) {
        this.listQuery.timeStarter = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.timeEnd = this.listQuery.dateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.timeStarter = null
        this.listQuery.timeEnd = null
      }
      fetchList(this.listQuery).then((response) => {
        if (response) {
          this.list = response.data.records
          this.total = response.data.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.listQuery = { ...baseListQuery }
    },
    onEdit(arg) {
      // 锁定
      lockRefundOrder(arg.id).then((response) => {
        if (response.status === '200') {
          this.$router.push(`/distribution/refund-detail?id=${arg.refundOrderNo}&status=1`)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '锁定退票订单失败!'
        })
      })
    },
    onDetail(arg) {
      this.$router.push(`/distribution/refund-detail?id=${arg.refundOrderNo}&status=0`)
    },
    onCancel(row) {
      this.$confirm('确定要取消退票吗？', '取消订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 调用取消接口
        refundOrderCancel(row.refundOrderNo).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '取消成功'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    onUnLock(row) {
      this.$confirm('确定需要对该退票订单进行解除锁定操作么？', '解除锁定退票订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        unLockRefundOrder(row.id).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '解除锁定退票订单成功!'
            })
          }
          this.getList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '解除锁定退票订单失败!'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
