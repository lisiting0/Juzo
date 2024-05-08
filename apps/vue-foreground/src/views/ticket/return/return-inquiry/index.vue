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
            <el-select v-model="listQuery.ticketProveType" clearable>
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
          <el-form-item label="退回日始">
            <el-date-picker
              v-model="listQuery.createTimeStart"
              type="date"
              placeholder="退回日始"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="退回日止">
            <el-date-picker
              v-model="listQuery.createTimeEnd"
              type="date"
              placeholder="退回日止"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="号段">
            <div class="div-flex">
              <el-input
                v-model="listQuery.starterNumber"
                clearable
                placeholder="起始"
              />
              -
              <el-input
                v-model="listQuery.endNumber"
                clearable
                placeholder="终止"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="getList()">
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
      v-loading="loading"
      :mode="null"
      :table-key="'ReturnInquiry'"
      :table-data="list"
      :table-head="columns"
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
import baseListQuery from '@/utils/abp'
import TicketTypeEnum from '@/enum/TicketType'
import { agentRefundTicketList } from '@/api/ticket/agent-ticketprove'

export default {
  name: 'ReturnInquiry',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      ticketTypeOptions: [],
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
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      agentRefundTicketList(this.listQuery).then((response) => {
      this.loading = false
        if (response) {
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    }
  }
}
</script>

<style></style>
