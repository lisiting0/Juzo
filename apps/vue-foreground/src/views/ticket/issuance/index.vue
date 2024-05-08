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
          <el-form-item label="发放日始">
            <el-date-picker
              v-model="listQuery.createTimeStart"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="发放日止">
            <el-date-picker
              v-model="listQuery.createTimeEnd"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <datatable
      :loading="loading"
      :mode="null"
      :table-key="'Issuance'"
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
import { agentTicketList } from '@/api/ticket/agent-ticketprove'

export default {
  name: 'Issuance',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      columns: [],
      list: [{
        staus: 0
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
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      agentTicketList(this.listQuery).then((response) => {
        if (response.status === '200') {
          this.list = response.data.records
          this.total = response.data.total
        }
        this.loading = false
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

<style lang="scss" scoped></style>
