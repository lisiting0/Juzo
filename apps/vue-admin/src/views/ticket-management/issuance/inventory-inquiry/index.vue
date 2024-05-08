<template>
  <div class="app-container" style="padding-top: 0">
    <el-form ref="searchFormRef" :model="listQuery" :inline="true" class="demo-form-inline form-inline-label-115">
      <el-row>
        <el-col :span="4">
          <el-form-item label="票证类型">
            <el-select v-model="listQuery.type" clearable>
              <el-option v-for="option in ticketTypeOptions" :key="option.value" :value="option.value" :label="option.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="领用分销商">
            <el-select v-model="listQuery.agentId" filterable clearable placeholder="请选择">
              <el-option v-for="item in agentList" :key="item.id" :label="item.name" :value="item.organizationId">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="号段">
            <div class="div-flex">
              <el-input v-model="listQuery.starterNumber" clearable placeholder="起始" />
              -
              <el-input v-model="listQuery.endNumber" clearable placeholder="终止" />
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

    <datatable :loading="loading" :mode="null" :table-key="'InventoryInquiry'" :table-data="list" :table-head="columns" />
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
import TicketTypeEnum from '@/enum/ticketType'
import { queryAgentInventory } from '@/api/ticket-manage/ticket-insurance'
import { ticketAgentList } from '@/api/identity/organization'

export default {
  name: 'InventoryInquiry',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      agentList: [{
        id: '00000000-0000-0000-0000-000000000000',
        agentName: '测试分销商1'
      }],
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
    this.getTicketAgentList()
  },
  mounted() {
    this.ticketTypeOptions = Object.keys(TicketTypeEnum.TicketType).map(key => ({
      value: TicketTypeEnum.TicketType[key],
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
      queryAgentInventory(this.listQuery).then((response) => {
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
    }
  }
}
</script>

<style></style>
