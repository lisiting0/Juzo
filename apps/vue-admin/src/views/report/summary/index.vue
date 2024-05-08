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
        <el-col :span="4">
          <el-form-item label="分销商" prop="distributor">
            <el-input v-model="listQuery.distributor" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="分销账号" prop="distributionAccount">
            <el-input
              v-model="listQuery.distributionAccount"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="月" prop="month">
            <el-date-picker
              v-model="listQuery.month"
              type="month"
              placeholder="选择月"
            />
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
// import { fetchList, exportExcel } from '@/api/basic/airline'

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
      // this.loading = true
      // fetchList(this.listQuery).then((response) => {
      //   this.loading = false
      //   if (response) {
      //     this.list = response.data.records
      //     this.total = response.data.total
      //   }
      // })
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
