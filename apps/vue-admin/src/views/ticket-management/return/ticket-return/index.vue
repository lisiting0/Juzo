<template>
  <div class="app-container" style="padding-top: 0">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item label="票证类型">
            <el-select
              v-model="listQuery.ticketProveType"
              clearable
            >
              <el-option
                v-for="option in ticketTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="起始号码">
            <el-input v-model="listQuery.starterNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="终止号码">
            <el-input v-model="listQuery.endNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="OFFICE号">
            <el-select v-model="listQuery.office" clearable>
              <el-option
                v-for="option in officeOptions"
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
      :mode="'select'"
      :table-key="'TicketReturn'"
      :table-data="list"
      :table-head="columns"
      batch-operation-text="票证退回"
      batch-operation-tip="选定页面上边 复选框，选取发放单号段。可以选择多个号段一起退回。"
      @on-confirm="onTicketReturn"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <return ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import TicketTypeEnum from '@/enum/ticketType'
import Return from './return'
import OfficeTypeEnum from '@/enum/officeType'
import { queryCanRefundPage } from '@/api/ticket-manage/ticket-return'

export default {
  name: 'TicketReturn',
  components: {
    Datatable,
    Pagination,
    Return
  },
  data() {
    return {
      loading: false,
      ticketTypeOptions: [],
      officeOptions: [],
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
    this.ticketTypeOptions = Object.keys(TicketTypeEnum.TicketType).map(key => ({
      value: TicketTypeEnum.TicketType[key],
      label: key
    }))
    this.officeOptions = Object.keys(OfficeTypeEnum.officeType).map(key => ({
      value: OfficeTypeEnum.officeType[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      queryCanRefundPage(this.listQuery).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    resetForm() {
      this.listQuery = { ...baseListQuery }
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    onTicketReturn(rows) {
      if (!rows || rows.length === 0) {
        this.$message({
          message: '请选取退回号段',
          type: 'warning'
        })
        return
      } else {
        this.$refs['dialog'].handle()
        this.$refs['dialog'].initReturnTickets(rows)
      }
    }
  }
}
</script>

<style></style>
