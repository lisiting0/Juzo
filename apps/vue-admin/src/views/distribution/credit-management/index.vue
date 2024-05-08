<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item
            label="分销商名称"
            prop="agentOrganizationName"
          >
            <el-input
              v-model="listQuery.agentOrganizationName"
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
      :loading="loading"
      mode="edit"
      :table-key="'creditManagement'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onRecharge"
      @on-copy="onIncreaseCredit"
      @on-detail="onDetail"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <recharge ref="rechargeDialog" @handleFilter="handleFilter" />
    <credit ref="increaseCreditDialog" @handleFilter="handleFilter" />
    <creditDetail ref="detailDialog" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import Recharge from './detail/recharge'
import Credit from './detail/credit'
import CreditDetail from './detail/detail'
import { fetchList } from '@/api/agent/credit-management'

export default {
  name: 'CreditManagement',
  components: {
    Datatable,
    Pagination,
    Recharge,
    Credit,
    CreditDetail
  },
  data() {
    return {
      loading: false,
      columns: [],
      list: [],
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
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      fetchList(this.listQuery).then((response) => {
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
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    onDetail(row) {
      this.$refs['detailDialog'].handle(row)
    },
    onRecharge(row) {
      this.$refs['rechargeDialog'].handle(row)
      this.$refs['rechargeDialog'].initDto(row)
    },
    onIncreaseCredit(row) {
      this.$refs['increaseCreditDialog'].handle(row)
    }
  }
}
</script>

<style></style>
