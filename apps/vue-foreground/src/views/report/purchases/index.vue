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
        <el-col :span="8">
          <el-form-item label="日期条件">
            <div class="div-flex">
              <el-select v-model="listQuery.dateType" clearable>
                <el-option
                  v-for="option in dateTypeOptions"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </el-select>
              <el-date-picker
                v-model="listQuery.dateRange"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单类型">
            <el-select
              v-model="listQuery.orderBusinessType"
            >
              <el-option
                v-for="env in orderTypeOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单号">
            <el-input v-model="listQuery.orderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航司">
            <el-input v-model="listQuery.carrierNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="乘机人">
            <el-input v-model="listQuery.passengerName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="票号">
            <el-input v-model="listQuery.carrierTicketNo" clearable />
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
      :table-key="'PurchaseReport'"
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
import ChangeColumns from './change-columns'
import RefundColumns from './refund-columns'
import baseListQuery, { downloadExcel } from '@/utils/abp'
import IssueStatusEnum from '@/enum/IssueStatus'
import TripTypeEnum from '@/enum/TripType'
import { purchasesFetchList } from '@/api/report/agent-report'

export default {
  name: 'PurchaseReport',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      orderTypeOptions: [
        {
          label: '出票',
          value: '0'
        },
        {
          label: '改签',
          value: '1'
        },
        {
          label: '退票',
          value: '2'
        }
      ],
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
      issueStatusOptions: [],
      tripTypeOptions: [],
      columns: [],
      list: null,
      total: 0,
      listQuery: {
        ...baseListQuery,
        orderBusinessType: '0'
      }
    }
  },
  created() {
    this.getList(this.listQuery)
    // 判断columns的类型变换 ,初始为issue出票订单
    this.columns = Columns.columns
  },
  mounted() {
    this.issueStatusOptions = Object.keys(IssueStatusEnum.IssueStatus).map(key => ({
      value: IssueStatusEnum.IssueStatus[key],
      label: key
    }))
    this.tripTypeOptions = Object.keys(TripTypeEnum.TripType).map(key => ({
      value: TripTypeEnum.TripType[key],
      label: key
    }))
  },
  methods: {
    getList() {
      this.loading = true
      if (this.listQuery.dateRange) {
        this.listQuery.startTime = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.endTime = this.listQuery.dateRange[1] + ' 23:59:59'
        // console.log('----------this.listQuery:', this.listQuery)
      } else {
        this.listQuery.startTime = null
        this.listQuery.endTime = null
      }
      purchasesFetchList(this.listQuery).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.list = response.data.records
          this.total = response.data.total
          // 判断一下搜索订单类型
          switch (this.listQuery.orderBusinessType) {
            case '0': this.columns = Columns.columns
              break
            case '1': this.columns = ChangeColumns.columns
              break
            case '2': this.columns = RefundColumns.columns
              break
            default: this.columns = Columns.columns
          }
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
      //     downloadExcel(response, '出票报表')
      //   }
      // })
      downloadExcel('', '采购明细报表')
    }
  }
}
</script>

<style lang="scss" scoped>
.div-flex {
    display: flex;
    .el-select {
        width: 160px;
    }
}
</style>
