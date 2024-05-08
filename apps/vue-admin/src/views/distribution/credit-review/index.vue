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
          <el-form-item label="分销商名称" prop="agentOrganizationName">
            <el-input
              v-model="listQuery.agentOrganizationName"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="申请类型" prop="auditType">
            <el-select
              v-model="listQuery.auditType"
              clearable
            >
              <el-option
                v-for="option in creditAuditTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="审核状态" prop="auditStatus">
            <el-select v-model="listQuery.auditStatus" clearable>
              <el-option
                v-for="option in creditAuditStatusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
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
      :table-key="'creditReview'"
      :table-data="list"
      :table-head="columns"
      @on-copy="onHandle"
      @on-detail="onDetail"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <creditReviewDetail ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import CreditAuditTypeEnum from '@/enum/creditAuditType'
import CreditAuditStatusEnum from '@/enum/creditAuditStatus'
import CreditReviewDetail from './detail'
import { fetchList } from '@/api/agent/credit-review'

export default {
  name: 'CreditReview',
  components: {
    Datatable,
    Pagination,
    CreditReviewDetail
  },
  data() {
    return {
      loading: false,
      creditAuditTypeOptions: [],
      creditAuditStatusOptions: [],
      columns: [],
      list: [{
        status: 1
      }, {
        status: 2
      }],
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
    this.creditAuditTypeOptions = Object.keys(CreditAuditTypeEnum.CreditAuditType).map(key => ({
      value: CreditAuditTypeEnum.CreditAuditType[key],
      label: key
    }))
    this.creditAuditStatusOptions = Object.keys(CreditAuditStatusEnum.CreditAuditStatus).map(key => ({
      value: CreditAuditStatusEnum.CreditAuditStatus[key],
      label: key
    }))
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
    onHandle(row) {
      this.$refs['dialog'].handle(row)
    },
    onDetail(row) {
      this.$refs['dialog'].detail(row)
    }
  }
}
</script>

<style></style>
