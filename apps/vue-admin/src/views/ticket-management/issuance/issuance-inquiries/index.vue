<template>
  <div class="app-container" style="padding-top: 0">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="发放日始" prop="dateRange">
            <el-date-picker
              v-model="listQuery.dateRange"
              format="yyyy年-MM月-dd日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="入库日期起"
              end-placeholder="入库日期止"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="发放到分销商" prop="agentId">
            <el-select
              v-model="listQuery.agentId"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in agentList"
                :key="item.id"
                :label="item.name"
                :value="item.organizationId"
              >
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="号段" prop="starterNumber">
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
      :mode="null"
      :table-key="'IssuanceInquiries'"
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
import { queryPage } from '@/api/ticket-manage/ticket-insurance'
import { ticketAgentList } from '@/api/identity/organization'

export default {
  name: 'IssuanceInquiries',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      agentList: [{
        id: '00000000-0000-0000-0000-000000000000',
        agentName: '测试分销商1'
      },
      {
        id: 'fd0cea43-c120-455a-a193-aafe147dc0b0',
        agentName: '测试分销商2'
      }],
      loading: false,
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        createTimeStart: '',
        createTimeEnd: '',
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList(this.listQuery)
    this.getTicketAgentList()
  },
  mounted() {
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
      if (this.listQuery.dateRange) {
        this.listQuery.createTimeStart = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.createTimeEnd = this.listQuery.dateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.createTimeStart = null
        this.listQuery.createTimeEnd = null
      }
      queryPage(this.listQuery).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
      this.listQuery.endNumber = ''
    }
  }
}
</script>

<style></style>
