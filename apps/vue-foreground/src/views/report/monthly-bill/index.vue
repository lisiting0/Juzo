<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item label="结算月份">
            <el-date-picker
              v-model="listQuery.month"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="选择月"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="listQuery.dateRange"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="完结状态时间">
            <el-date-picker
              v-model="listQuery.finishDateRange"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="账单状态">
            <el-select
              v-model="listQuery.billingStatus"
              clearable
              placeholder="账单状态"
            >
              <el-option
                v-for="env in billingStatusOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="getList()">
              查询
            </el-button>
            <el-button
              :loading="fullscreenLoading"
              type="primary"
              plain
              @click="onExport()"
            >
              <i class="el-icon-document" />
              导出
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <datatable
      :loading="loading"
      :mode="null"
      :table-key="'transaction-flow-report'"
      :table-data="list"
      :table-head="columns"
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
import Columns from './columns'
import baseListQuery, { downloadExcel } from '@/utils/abp'
import BillingStatusEnum from '@/enum/BillingStatus'
import { monthFetchList } from '@/api/report/agent-report'

export default {
  name: 'IssueReport',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      billingStatusOptions: [],
      columns: [],
      list: null,
      total: 0,
      listQuery: {
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  mounted() {
    this.billingStatusOptions = Object.keys(BillingStatusEnum.BillingStatus).map(key => ({
      value: BillingStatusEnum.BillingStatus[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      if (this.listQuery.dateRange) {
        this.listQuery.startTime = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.endTime = this.listQuery.dateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.startTime = null
        this.listQuery.endTime = null
      }
      monthFetchList(this.listQuery).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    onExport() {
      this.fullscreenLoading = true
      this.listQuery.page = -1
      this.listQuery.limit = -1
      // exportExcel(this.listQuery).then(response => {
      //   if (response) {
      //     this.fullscreenLoading = false
      //     downloadExcel(response, '交易流水报表')
      //   }
      // })
      downloadExcel('', '交易流水报表')
    }
  }
}
</script>

<style lang="scss" scoped></style>
