<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-135"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="office号" prop="officeNo">
            <el-input v-model="listQuery.officeNo" placeholder="请输入office号" size="normal" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="打票机号" prop="printerNo">
            <el-input v-model="listQuery.printerNo" placeholder="请输入打票机号" size="normal" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出票渠道" prop="ticketChannel">
            <el-select
              v-model="listQuery.ticketChannel"
              placeholder="出票渠道"
              clearable
            >
              <el-option
                v-for="option in ticketChannelTypeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支付渠道" prop="purchasePayPlatform">
            <el-select
              v-model="listQuery.purchasePayPlatform"
              placeholder="支付平台"
              clearable
            >
              <el-option
                v-for="option in purchasePayPlatformTypeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
      :table-key="'issueTicketSelfConfiguration'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-copy="onAirlineMapping"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <IssueTicketSelfConfigurationCreateUpdate ref="dialog" @handleFilter="handleFilter" />

    <TicketAirlineMapping ref="airlineMapping" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import IssueTicketSelfConfigurationCreateUpdate from './create-update.vue'
import TicketAirlineMapping from './ticket-airline-mapping.vue'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import { queryPage, toDel } from '@/api/configuration/issue-ticket-self'

import TicketChannelTypeEnum from '@/enum/TicketChannelType'
import PurchasePayPlatformTypeEnum from '@/enum/PurchasePayPlatformType'

export default {
  name: 'IssueTicketSelfConfiguration',
  components: {
    Datatable,
    Pagination,
    IssueTicketSelfConfigurationCreateUpdate,
    TicketAirlineMapping
  },
  data() {
    return {
      fullscreenLoading: false,
      bspPaymentTypeOption: [],
      loading: false,
      columns: [],
      list: null,
      total: 0,
      listQuery: {
        ...baseListQuery
      },

      ticketChannelTypeOptions: [],
      purchasePayPlatformTypeOptions: []
    }
  },
  created() {
    this.ticketChannelTypeOptions = Object.keys(TicketChannelTypeEnum.TicketChannelType).map(key => ({
      value: TicketChannelTypeEnum.TicketChannelType[key],
      label: this.$t(`AdminService["Enum:TicketChannelType:${TicketChannelTypeEnum.TicketChannelType[key]}"]`)
    }))
    this.purchasePayPlatformTypeOptions = Object.keys(PurchasePayPlatformTypeEnum.PurchasePayPlatformType).map(key => ({
      value: PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key],
      label: this.$t(`AdminService["Enum:PurchasePayPlatformType:${PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key]}"]`)
    }))

    this.getList()
  },
  mounted() {
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      queryPage(this.listQuery).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.list = response.data.records
          this.total = response.data.total
        }
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
    onAirlineMapping(row) {
      console.log('关联航司返点')
      this.$refs['airlineMapping'].handleShow(row.id)
    },
    onDelete(row) {
      // 删除
      toDel(row.id).then((response) => {
        this.$message.success('删除成功.')
      })
      this.getList()
    }
  }
}
</script>

<style></style>
