<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="发送时间">
            <el-date-picker
              v-model="listQuery.dateRange"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="短信提供商">
            <el-select
              v-model="listQuery.provider"
              clearable
              placeholder="短信提供商"
            >
              <el-option
                v-for="env in providerOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="短信发送目的">
            <el-select
              v-model="listQuery.purpose"
              clearable
              placeholder="短信发送目的"
            >
              <el-option
                v-for="env in purposeOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否发送成功">
            <el-select
              v-model="listQuery.status"
              clearable
              placeholder="短信发送目的"
            >
              <el-option
                v-for="env in statusOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="关联外部实体Id">
            <el-input v-model="listQuery.entityId" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运营商通知Id">
            <el-input v-model="listQuery.providerSendId" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="流水号">
            <el-input v-model="listQuery.tradeNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="短信目标">
            <el-input v-model="listQuery.phone" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="短信内容">
            <el-input v-model="listQuery.content" clearable />
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
      :table-key="'ConsumptionRecords'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-detail="onAssignment"
      @on-delete="onEnDisable"
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
import SmsPurposeTypeEnum from '@/enum/SmsPurposeType'
import SmsProviderTypeEnum from '@/enum/SmsProviderType'
import SmsSendingStatusTypeEnum from '@/enum/SmsSendingStatusType'
import { smsSending } from '@/api/identity/sms-sending'

export default {
  name: 'ConsumptionRecords',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      providerOptions: [],
      purposeOptions: [],
      statusOptions: [],
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
    this.enDisableOptions = Enum.enDisableOptions
    this.providerOptions = Object.keys(SmsProviderTypeEnum.SmsProviderType).map(key => ({
      value: SmsProviderTypeEnum.SmsProviderType[key],
      label: this.$t(`AdminService["Enum:SmsProviderType:${SmsProviderTypeEnum.SmsProviderType[key]}"]`)
    }))
    this.purposeOptions = Object.keys(SmsPurposeTypeEnum.SmsPurposeType).map(key => ({
      value: SmsPurposeTypeEnum.SmsPurposeType[key],
      label: this.$t(`AdminService["Enum:SmsPurposeType:${SmsPurposeTypeEnum.SmsPurposeType[key]}"]`)
    }))
    this.statusOptions = Object.keys(SmsSendingStatusTypeEnum.SmsSendingStatusType).map(key => ({
      value: SmsSendingStatusTypeEnum.SmsSendingStatusType[key],
      label: this.$t(`AdminService["Enum:SmsSendingStatusType:${SmsSendingStatusTypeEnum.SmsSendingStatusType[key]}"]`)
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      smsSending(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.items
          this.total = response.totalCount
        }
      }).catch(() => {
        this.loading = false
      })
    },
    onAdd() {
      this.$refs['createUpdateDialog'].handle()
    },
    onEdit(row) {
      this.$refs['modifyPasswordDialog'].handle(row)
    },
    onAssignment(row) {
      this.$refs['privilegeAssignmentDialog'].handleUpdatePermission(row)
    },
    onEnDisable(row) {
      this.$confirm('确定需要禁用/启用该账号么？', '禁用/启用账号？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '禁用/启用成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消禁用/启用'
        })
      })
    },
    onExport() {
      // this.fullscreenLoading = true
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
