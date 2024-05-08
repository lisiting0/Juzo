<template>
  <div class="app-container">
    <el-form ref="searchFormRef" :model="listQuery" :inline="true" class="demo-form-inline form-inline-label-115">
      <el-row>
        <el-col :span="8">
          <el-form-item label="日期条件" prop="dateRange">
            <div class="div-flex">
              <el-date-picker
                v-model="listQuery.dateRange"
                format="yyyy年-MM月-dd日"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单状态" prop="orderStatus">
            <el-select v-model="listQuery.orderStatus" clearable>
              <el-option
                v-for="option in changeStatusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="改签类型" prop="changeTicketReason">
            <el-select v-model="listQuery.changeTicketReason" clearable>
              <el-option
                v-for="option in changeTypeOptions"
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
          <el-form-item label="改签订单号" prop="changeOrderNo">
            <el-input v-model="listQuery.changeOrderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="分销商" prop="agentOrganizationName">
            <el-input v-model="listQuery.agentOrganizationName" clearable />
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
          <el-form-item label="原票号" prop="originCarrierTicketNo">
            <el-input v-model="listQuery.originCarrierTicketNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="新票号" prop="changeCarrierTicketNo">
            <el-input v-model="listQuery.changeCarrierTicketNo" clearable />
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
      :table-key="'change'"
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
import ChangeOrderStatusEnum from '@/enum/changeStatus'
import ChangeTypeEnum from '@/enum/changeType'
import Columns from './columns'
import { changeOrderCancel, fetchList, lockChangeOrder, unLockChangeOrder } from '@/api/agent/change-order'
import baseListQuery from '@/utils/abp'

export default {
  name: 'Change',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      changeStatusOptions: [],
      changeTypeOptions: [],
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
    this.changeStatusOptions = Object.keys(ChangeOrderStatusEnum.ChangeStatus).map(key => ({
      value: ChangeOrderStatusEnum.ChangeStatus[key],
      label: key
    }))
    this.changeTypeOptions = Object.keys(ChangeTypeEnum.ChangeType).map(key => ({
      value: ChangeTypeEnum.ChangeType[key],
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
      this.$refs.searchFormRef.resetFields()
    },
    onEdit(arg) {
      lockChangeOrder(arg.id).then((response) => {
        if (response.status === '200') {
          this.$router.push(`/distribution/change-detail?id=${arg.changeOrderNo}&status=1`)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '锁定改签订单失败!'
        })
      })
    },
    onDetail(arg) {
      this.$router.push(`/distribution/change-detail?id=${arg.changeOrderNo}&status=0`)
    },
    onCancel(row) {
      this.$confirm('确定要取消改签订单吗？', '取消改签订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 调用取消接口
        changeOrderCancel(row.changeOrderNo).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '取消成功'
            })
            // 查询一下数据
            this.getList()
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
      this.$confirm('确定需要对该改签订单进行解除锁定操作么？', '解除锁定改签订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        unLockChangeOrder(row.id).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '解除锁定改签订单成功!'
            })
          }
          this.getList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '解除锁定改签订单失败!'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
