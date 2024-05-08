<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form ref="searchFormRef" :model="listQuery" :inline="true" class="demo-form-inline form-inline-label-115">
      <el-row>
        <el-col :span="4">
          <el-form-item label="保险公司" prop="companyName">
            <el-input
              v-model="listQuery.companyName"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="保险名称" prop="insuranceName">
            <el-input v-model="listQuery.insuranceName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="保险类型" prop="insuranceType">
            <el-select v-model="listQuery.insuranceType" clearable>
              <el-option
                v-for="env in insuranceTypeOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="状态" prop="status">
            <el-select v-model="listQuery.status" clearable>
              <el-option
                v-for="env in insuranceStatusOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
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

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">
        新增
      </el-button>
    </el-row>

    <datatable
      :loading="loading"
      mode="editDelete"
      :table-key="'InsuranceConfiguration'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-detail="onStop"
      @on-delete="onDelete"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <insuranceConfigurationCreateUpdate
      ref="dialog"
      @handleFilter="handleFilter"
    />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import InsuranceTypeEnum from '@/enum/insuranceType'
import InsuranceStatusEnum from '@/enum/insuranceStatus'
import InsuranceConfigurationCreateUpdate from './create-update.vue'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import { fetchList, updateStatus, deleteInsurance } from '@/api/basic/insurance'

export default {
  name: 'InsuranceConfiguration',
  components: {
    Datatable,
    Pagination,
    InsuranceConfigurationCreateUpdate
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      insuranceTypeOptions: [],
      insuranceStatusOptions: [],
      columns: [],
      list: [{
        status: 1
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
    this.insuranceTypeOptions = Object.keys(InsuranceTypeEnum.InsuranceType).map(key => ({
      value: InsuranceTypeEnum.InsuranceType[key],
      label: key
    }))
    this.insuranceStatusOptions = Object.keys(InsuranceStatusEnum.InsuranceStatus).map(key => ({
      value: InsuranceStatusEnum.InsuranceStatus[key],
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
    onAdd() {
      this.$refs['dialog'].handleCreate()
    },
    onEdit(row) {
      this.$refs['dialog'].handleUpdate(row)
    },
    onStop(row) {
      this.$confirm('确定需要停售该保险吗？', '停售保险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        row.status = 0
        updateStatus(row).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '停售保险成功!'
            })
          }
          this.getList(this.listQuery)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '停售保险失败'
          })
        })
      })
    },
    onDelete(row) {
      this.$confirm('确定需要删除该保险吗？', '删除保险', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        deleteInsurance(row.id).then((response) => {
          this.loading = false
          this.handleFilter()
          this.$message({
            type: 'success',
            message: `删除成功!`
          })
        }).catch((error) => {
          this.loading = false
          throw error
        })
      })
    }
  }
}
</script>

<style></style>
