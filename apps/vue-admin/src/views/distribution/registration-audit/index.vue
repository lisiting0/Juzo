<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-125"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item prop="status" label="审核状态">
            <el-select
              v-model="listQuery.status"
              clearable
              placeholder="审核状态"
            >
              <el-option
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="partnerType" label="账号类型">
            <el-select
              v-model="listQuery.partnerType"
              clearable
              placeholder="账号类型"
            >
              <el-option
                v-for="option in partnerTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="loginName" label="账号">
            <el-input v-model.trim="listQuery.loginName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="phone" label="手机号码">
            <el-input v-model.trim="listQuery.phone" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="name" label="公司名称（姓名）">
            <el-input v-model.trim="listQuery.name" clearable />
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
      :table-key="'RegistrationAudit'"
      :table-data="list"
      :table-head="columns"
      @on-detail="onDetail"
      @on-copy="onHandle"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <registrationAuditDetail ref="dialog" @handleFilter="handleFilter" />
    <registrationAuditCreateUpdate ref="createUpdateDialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import JuzoRegistrationApprovalStatusTypeEnum from '@/enum/JuzoRegistrationApprovalStatusType'
import JuzoPartnerTypeEnum from '@/enum/JuzoPartnerType'
import RegistrationAuditCreateUpdate from './create-update'
import RegistrationAuditDetail from './detail'
import { fetchList } from '@/api/distribution/audit'

export default {
  name: 'RegistrationAudit',
  components: {
    Datatable,
    Pagination,
    RegistrationAuditCreateUpdate,
    RegistrationAuditDetail
  },
  data() {
    return {
      loading: false,
      statusOptions: [],
      partnerTypeOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.statusOptions = Object.keys(JuzoRegistrationApprovalStatusTypeEnum.JuzoRegistrationApprovalStatusType).map(key => ({
      value: JuzoRegistrationApprovalStatusTypeEnum.JuzoRegistrationApprovalStatusType[key],
      label: this.$t(`AdminService["Enum:JuzoRegistrationApprovalStatusType:${JuzoRegistrationApprovalStatusTypeEnum.JuzoRegistrationApprovalStatusType[key]}"]`)
    }))
    this.partnerTypeOptions = Object.keys(JuzoPartnerTypeEnum.JuzoPartnerType).map(key => ({
      value: JuzoPartnerTypeEnum.JuzoPartnerType[key],
      label: this.$t(`AdminService["Enum:JuzoPartnerType:${JuzoPartnerTypeEnum.JuzoPartnerType[key]}"]`)
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      fetchList(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.items
          this.total = response.totalCount
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
      this.$refs['createUpdateDialog'].add()
    },
    onDetail(row) {
      this.$refs['dialog'].handle(row, 'detail')
    },
    onHandle(row) {
      this.$refs['dialog'].handle(row, 'handle')
    }
  }
}
</script>

<style></style>
