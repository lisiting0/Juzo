<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form ref="searchFormRef" :model="listQuery" :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="4">
          <el-form-item label="分销商" prop="agentOrganizationName">
            <el-select v-model="listQuery.agentOrganizationName" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in agentList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="保险公司" prop="companyName">
            <el-input v-model="listQuery.companyName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="保险名称" prop="insuranceName">
            <el-input v-model="listQuery.insuranceName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="保险类型" prop="insuranceType">
            <el-select v-model="listQuery.insuranceType" clearable placeholder="保险类型">
              <el-option v-for="env in insuranceTypeOptions" :key="env.value" :value="env.value" :label="env.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item class="btns">
          <el-button type="primary" @click="handleFilter()">
            查询
          </el-button>
          <el-button type="info" @click="resetForm"> 重置 </el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row style="padding-left: 20px">
      <el-button type="primary" plain size="small" @click="onDistribution()">
        保险分配
      </el-button>
    </el-row>

    <datatable
      :loading="loading"
      mode="editDelete"
      :table-key="'DistributorInsuranceConfiguration'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-delete="onDel"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <insuranceDistributionDialog ref="dialog" @handleFilter="handleFilter" />
    <updateDialog ref="updateDialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import InsuranceTypeEnum from '@/enum/insuranceType'
import InsuranceDistributionDialog from './insurance-distribution-dialog'
import UpdateDialog from './update-dialog'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import { deleteInsuranceDistribute, fetchList } from '@/api/basic/distributor-insurance.js'
import { ticketAgentList } from '@/api/identity/organization'

export default {
  name: 'DistributorInsuranceConfiguration',
  components: {
    Datatable,
    Pagination,
    InsuranceDistributionDialog,
    UpdateDialog
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      insuranceTypeOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery
      },
      agentList: []
    }
  },
  created() {
    this.getList()
    this.getTicketAgentList()
  },
  mounted() {
    this.insuranceTypeOptions = Object.keys(InsuranceTypeEnum.InsuranceType).map(key => ({
      value: InsuranceTypeEnum.InsuranceType[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    getTicketAgentList() {
      ticketAgentList().then(response => {
        if (response) {
          this.agentList = response.items
        }
      })
    },
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
    onDistribution() {
      this.$refs['dialog'].handle()
    },
    onEdit(row) {
      this.$refs['updateDialog'].handleUpdate(row)
    },
    onDel(row) {
      this.$confirm('确定需要删除该保险配置吗？', '删除保险配置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteInsuranceDistribute(row.id).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '删除保险配置成功!'
            })
            this.getList(this.listQuery)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除保险配置'
        })
      })
    }
  }
}
</script>

<style></style>
