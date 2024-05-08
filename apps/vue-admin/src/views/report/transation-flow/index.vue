<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="发生时间" prop="dateRange">
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
        <el-col :span="4">
          <el-form-item label="付款方式" prop="paymentMethod">
            <el-select
              v-model="listQuery.payChannel"
              clearable
              placeholder="付款方式"
            >
              <el-option
                v-for="env in paymentMethodOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="分销商" prop="distributor">
            <el-input v-model="listQuery.agentOrganizationName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="handleFilter()">
              查询
            </el-button>
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="primary"
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
import PaymentMethodEnum from '@/enum/paymentMethod'
import { tradeFetchList } from '@/api/report/report'

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
      dateTypeOptions: [{
        value: 1,
        label: '创建时间'
      }, {
        value: 2,
        label: '起飞时间'
      }, {
        value: 3,
        label: '出票时间'
      }],
      paymentMethodOptions: [],
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
    this.paymentMethodOptions = Object.keys(PaymentMethodEnum.PaymentMethod).map(key => ({
      value: PaymentMethodEnum.PaymentMethod[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      // 日期处理
      if (this.listQuery.dateRange) {
        this.listQuery.startTime = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.endTime = this.listQuery.dateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.startTime = null
        this.listQuery.endTime = null
      }
      tradeFetchList(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
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
