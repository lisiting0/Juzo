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
          <el-form-item label="日期条件" prop="dateType">
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
          <el-form-item label="订单状态" prop="status">
            <el-select
              v-model="listQuery.orderStatus"
              clearable
            >
              <el-option
                v-for="env in issueStatusOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="分销商" prop="distributionAccount">
            <el-input v-model="listQuery.agentOrganizationName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="出票订单号" prop="issueOrderNo">
            <el-input v-model="listQuery.orderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航司" prop="airline">
            <el-input v-model="listQuery.carrierNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="乘机人" prop="passengerName">
            <el-input v-model="listQuery.passengerName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="票号" prop="ticketNo">
            <el-input v-model="listQuery.carrierTicketNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="handleFilter()">
              查询
            </el-button>
            <!--            <el-button-->
            <!--              v-loading.fullscreen.lock="fullscreenLoading"-->
            <!--              type="primary"-->
            <!--              @click="onExport()"-->
            <!--            >-->
            <!--              <i class="el-icon-document" />-->
            <!--              导出-->
            <!--            </el-button>-->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <datatable
      :loading="loading"
      :mode="null"
      :table-key="'issue-report'"
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
import Enum from '@/enum/enum'
import { issueFetchList } from '@/api/report/report'

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
      issueStatusOptions: [],
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
    this.issueStatusOptions = Enum.issueStatusOptions
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
      issueFetchList(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
      this.listQuery.dateRange = ''
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
      //     downloadExcel(response, '出票报表')
      //   }
      // })
      downloadExcel('', '出票报表')
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
