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
          <el-form-item label="订单状态" prop="qualityCheckStatus">
            <el-select v-model="listQuery.qualityCheckStatus" clearable>
              <el-option
                v-for="option in qualityCheckStatusTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="业务类型" prop="orderBusinessType">
            <el-select v-model="listQuery.orderBusinessType" clearable>
              <el-option
                v-for="option in orderBusinessTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="质检订单号" prop="qualityCheckOrderNo">
            <el-input v-model="listQuery.qualityCheckOrderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="关联业务订单号" prop="originOrderNo">
            <el-input v-model="listQuery.originOrderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="客户名称" prop="agentName">
            <el-input
              v-model="listQuery.agentName"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="客户账号" prop="agentAccount">
            <el-input v-model="listQuery.agentAccount" clearable />
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

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onCreate()">手工创单</el-button>
    </el-row>

    <datatable
      mode="edit"
      :loading="loading"
      :table-key="'quality-orders-management'"
      :table-data="list"
      :table-head="columns"
      :current-user="this.$store.getters.abpConfig.currentUser.id"
      @on-edit="onEdit"
      @on-detail="onDetail"
      @on-delete="onCancel"
      @on-copy="onAudit"
      @on-lock="onHandle"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <qualityOrdersDetail ref="detailDialog" @handleFilter="handleFilter" />
    <qualityOrdersCreateUpdate ref="createUpdateDialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import baseListQuery from '@/utils/abp'
import QualityCheckStatusTypeEnum from '@/enum/QualityCheckStatusType'
import OrderBusinessTypeEnum from '@/enum/OrderBusinessType'
import Columns from './columns'
import { fetchList, qualityOrderCancel, qualityOrderHandle } from '@/api/agent/quality-orders'
import QualityOrdersCreateUpdate from './create-update.vue'
import QualityOrdersDetail from './detail.vue'

export default {
  name: 'Refund',
  components: {
    Datatable,
    Pagination,
    QualityOrdersCreateUpdate,
    QualityOrdersDetail
  },
  data() {
    return {
      loading: false,
      qualityCheckStatusTypeOptions: [],
      orderBusinessTypeOptions: [],
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
    this.qualityCheckStatusTypeOptions = Object.keys(QualityCheckStatusTypeEnum.QualityCheckStatusType).map(key => ({
      value: QualityCheckStatusTypeEnum.QualityCheckStatusType[key],
      label: this.$t(`Juzo["Enum:QualityCheckStatusType:${QualityCheckStatusTypeEnum.QualityCheckStatusType[key]}"]`)
    }))
    this.orderBusinessTypeOptions = Object.keys(OrderBusinessTypeEnum.OrderBusinessType).map(key => ({
      value: OrderBusinessTypeEnum.OrderBusinessType[key],
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
    onEdit(row) {
      this.$refs['createUpdateDialog'].edit(row)
    },
    onCreate() {
      this.$refs['createUpdateDialog'].add()
    },
    onDetail(row) {
      this.$refs['detailDialog'].handle(row, 'detail')
    },
    onCancel(row) {
      this.$confirm('确定要取消订单吗？', '取消订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        qualityOrderCancel(row.qualityCheckOrderNo).then((response) => {
          if (response.status === '200') {
            this.handleFilter(true)
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
    onAudit(row) {
      this.$refs['detailDialog'].handle(row, 'audit')
    },
    onHandle(row) {
      this.$confirm('确定要处理该订单吗？', '处理订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        qualityOrderHandle({ qualityCheckOrderNo: row.qualityCheckOrderNo }).then((response) => {
          if (response.status === '200') {
            this.handleFilter(true)
            this.$message({
              type: 'success',
              message: '处理成功'
            })
          }
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消'
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
