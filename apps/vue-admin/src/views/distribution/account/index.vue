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
          <el-form-item prop="partnerType" label="账号类型">
            <el-select v-model="listQuery.partnerType" clearable>
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
          <el-form-item
            prop="canCreateAccount"
            label="子账户开通权限"
          >
            <el-select
              v-model="listQuery.canCreateAccount"
              clearable
            >
              <el-option
                v-for="option in canCreateAccountOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="disabled" label="账号状态">
            <el-select v-model="listQuery.disabled" clearable>
              <el-option
                v-for="option in disabledOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="name" label="分销名称">
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

    <!-- <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">
        账户开户
      </el-button>
    </el-row> -->

    <datatable
      :loading="loading"
      mode="edit"
      table-key="DistributionAccount"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-copy="onEnDisable"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <accountCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import AccountCreateUpdate from './create-update.vue'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import Enum from '@/enum/enum'
import JuzoPartnerTypeEnum from '@/enum/JuzoPartnerType'
import { ticketAgentList, updateTicketAgent, ticketAgentDelete } from '@/api/distribution/agent'

export default {
  name: 'DistributionAccount',
  components: {
    Datatable,
    Pagination,
    AccountCreateUpdate
  },
  data() {
    return {
      loading: false,
      partnerTypeOptions: [],
      canCreateAccountOptions: [
        {
          value: true,
          label: '开启'
        },
        {
          value: false,
          label: '关闭'
        }
      ],
      disabledOptions: [],
      columns: [],
      list: null,
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
    this.partnerTypeOptions = Object.keys(JuzoPartnerTypeEnum.JuzoPartnerType).map(key => ({
      value: JuzoPartnerTypeEnum.JuzoPartnerType[key],
      label: this.$t(`AdminService["Enum:JuzoPartnerType:${JuzoPartnerTypeEnum.JuzoPartnerType[key]}"]`)
    }))
    this.disabledOptions = Enum.enDisableOptions
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      ticketAgentList(this.listQuery).then((response) => {
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
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    onAdd() {
      this.$refs['dialog'].handleCreate()
    },
    onEdit(row) {
      this.$refs['dialog'].handleUpdate(row)
    },
    onDelete(row) {
      this.$confirm(`确定要删除该账号 ${row.name} 么？`, `删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        ticketAgentDelete(row.id).then((response) => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `取消删除!`
        })
      })
    },
    onEnDisable(row) {
      this.$confirm(`确定要${row.disabled ? '启用' : '禁用'}该账号 ${row.name} 么？`, `${row.disabled ? '启用' : '禁用'}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        row.disabled = !row.disabled
        updateTicketAgent(row).then((response) => {
          this.loading = false
          this.handleFilter()
          this.$message({
            type: 'success',
            message: `${!row.disabled ? '启用' : '禁用'}成功!`
          })
        }).catch((error) => {
          this.loading = false
          throw error
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `取消${!row.disabled ? '启用' : '禁用'}!`
        })
      })
    }
  }
}
</script>

<style></style>
