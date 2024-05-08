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
          <el-form-item label="下单时间" prop="dateRange">
            <el-date-picker
              v-model="listQuery.dateRange"
              type="daterange"
              format="yyyy年-MM月-dd日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="保险公司" prop="insuranceCompany">
            <el-input v-model="listQuery.insuranceCompany" clearable />
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
          <el-form-item label="票号" prop="carrierTicketNo">
            <el-input v-model="listQuery.carrierTicketNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="投保乘机人" prop="passengerName">
            <el-input v-model="listQuery.passengerName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单状态" prop="insuranceStatus">
            <el-select v-model="listQuery.insuranceStatus" clearable>
              <el-option
                v-for="env in policyStatusOptions"
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
        {{ $t('table.add') }}
      </el-button>
    </el-row>

    <datatable
      :loading="loading"
      mode="edit"
      :table-key="'InsuranceOrder'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <insuranceOrderCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import InsuranceTypeEnum from '@/enum/insuranceType'
import InsuranceOrderCreateUpdate from './create-update.vue'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import { fetchList } from '@/api/insurance/insurance-order'
import PolicyStatusEnum from '@/enum/policyStatus'

export default {
  name: 'InsuranceOrder',
  components: {
    Datatable,
    Pagination,
    InsuranceOrderCreateUpdate
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      insuranceTypeOptions: [],
      policyStatusOptions: [],
      columns: [],
      list: [{
        status: 1
      }],
      total: 0,
      listQuery: {
        timeStart: '',
        timeEnd: '',
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
    this.policyStatusOptions = Object.keys(PolicyStatusEnum.PolicyStatus).map(key => ({
      value: PolicyStatusEnum.PolicyStatus[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      if (this.listQuery.dateRange) {
        this.listQuery.timeStart = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.timeEnd = this.listQuery.dateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.timeStart = null
        this.listQuery.timeEnd = null
      }
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
    }
  }
}
</script>

<style></style>
