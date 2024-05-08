<template>
  <el-dialog width="60%" top="5vh" :visible.sync="dialogFormVisible" :title="'详情列表'">
    <el-form ref="searchFormRef" style="margin-top: 1%;" :model="listQuery" :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="审批时间">
            <el-date-picker
              v-model="listQuery.createTimeRange"
              format="yyyy年-MM月-dd日"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账户类型">
            <el-select v-model="listQuery.balanceType" clearable placeholder="账户类型">
              <el-option
                v-for="option in balanceTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交易类型">
            <el-select v-model="listQuery.flowType" clearable placeholder="交易类型">
              <el-option
                v-for="option in flowTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="getList()">
              查询
            </el-button>
            <el-button type="info" @click="resetForm">
              重置
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <datatable :loading="loading" :mode="null" :table-key="'credit-detail'" :table-data="list" :table-head="columns" />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </el-dialog>
</template>

<script>
  import Datatable from '@/components/DataTable'
  import Pagination from '@/components/Pagination'
  import baseListQuery from '@/utils/abp'
  import Columns from './columns'
  import FlowTypeEnum from '@/enum/FlowType'
  import BalanceTypeEnum from '@/enum/BalanceType'
  import { queryBalanceFlow } from '@/api/agent/credit-management'

  export default {
  name: 'CreditDetail',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      flowTypeOptions: [],
      balanceTypeOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.flowTypeOptions = Object.keys(FlowTypeEnum.FlowType).map(key => ({
      value: FlowTypeEnum.FlowType[key],
      label: key
    }))
    this.balanceTypeOptions = Object.keys(BalanceTypeEnum.BalanceType).map(key => ({
      value: BalanceTypeEnum.BalanceType[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    handle(row) {
      this.dialogFormVisible = true
      this.listQuery.agentOrganizationId = row.agentOrganizationId
      this.getList()
    },
    getList() {
      this.loading = true
      if (this.listQuery.createTimeRange) {
        this.listQuery.timeStarter = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.timeEnd = this.listQuery.dateRange[1] + ' 23:59:59'
      }
      queryBalanceFlow(this.listQuery).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    }
  }
}
</script>

<style lang="scss"></style>
