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
        <el-col :span="6">
          <el-form-item label="交易时间">
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
          <el-form-item label="账户类型">
            <el-select
              v-model="listQuery.balanceType"
              clearable
              placeholder="账户类型"
            >
              <el-option
                v-for="env in accountTypeOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="交易类型">
            <el-select
              v-model="listQuery.flowType"
              clearable
              placeholder="交易类型"
            >
              <el-option
                v-for="env in transactionTypeOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单编号">
            <el-input v-model="listQuery.balanceFlowNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="getList()">
              查询
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <datatable
      :loading="loading"
      :mode="null"
      :table-key="'BalanceReport'"
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
import PaymentMethodEnum from '@/enum/PaymentMethod'
import TransactionTypeEnum from '@/enum/TransactionType'
import { balanceFetchList } from '@/api/report/agent-report'

export default {
  name: 'BalanceReport',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      accountTypeOptions: [],
      transactionTypeOptions: [],
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
    this.accountTypeOptions = Object.keys(PaymentMethodEnum.PaymentMethod).map(key => ({
      value: PaymentMethodEnum.PaymentMethod[key],
      label: key
    }))
    this.transactionTypeOptions = Object.keys(TransactionTypeEnum.TransactionType).map(key => ({
      value: TransactionTypeEnum.TransactionType[key],
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
      balanceFetchList(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.data.records
          this.total = response.data.total
        }
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
