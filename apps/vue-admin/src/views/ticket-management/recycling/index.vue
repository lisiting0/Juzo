<template>
  <div class="app-container">
    <el-form ref="searchFormRef" :model="listQuery" :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="4">
          <el-form-item label="票证类型" prop="ticketProveType">
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
          <el-form-item label="状态" prop="voidedTicketProveStatusType">
            <el-select v-model="listQuery.voidedTicketProveStatusType" clearable>
              <el-option
                v-for="option in voidedTicketProveStatusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="行程单号" prop="ticketProveNumber">
            <el-input v-model="listQuery.ticketProveNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="作废日期" prop="voidedDateRange">
            <el-date-picker
              v-model="listQuery.voidedDateRange"
              format="yyyy年-MM月-dd日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="作废日期起"
              end-placeholder="作废日期止"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="回收日期" prop="recycleDateRange">
            <el-date-picker
              v-model="listQuery.recycleDateRange"
              format="yyyy年-MM月-dd日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="回收日期起"
              end-placeholder="回收日期止"
            />
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
      mode="select"
      :table-key="'Recycling'"
      :table-data="list"
      :table-head="columns"
      batch-operation-text="回收"
      @on-confirm="onRecycling"
      @on-cancel="onCancel"
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
import TicketTypeEnum from '@/enum/ticketType'
import VoidedTicketProveStatusEnum from '@/enum/voidedTicketProveStatus'
import { queryCanRecycled, ticketApplyRecycled } from '@/api/ticket-manage/ticket-recycling'

export default {
  name: 'Recycling',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      ticketTypeOptions: [],
      voidedTicketProveStatusOptions: [],
      columns: [],
      list: [{
        status: 1
      }, {
        status: 2
      }],
      total: 0,
      listQuery: {
        voidedTimeStart: '',
        voidedTimeEnd: '',
        recycledTimeStart: '',
        recycledTimeEnd: '',
        ...baseListQuery
      },
      recyclingParam: { idList: [] }
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
    this.voidedTicketProveStatusOptions = Object.keys(VoidedTicketProveStatusEnum.VoidedTicketProveStatus).map(key => ({
      value: VoidedTicketProveStatusEnum.VoidedTicketProveStatus[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      if (this.listQuery.voidedDateRange) {
        this.listQuery.voidedTimeStart = this.listQuery.voidedDateRange[0] + ' 00:00:00'
        this.listQuery.voidedTimeEnd = this.listQuery.voidedDateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.voidedTimeStart = null
        this.listQuery.voidedTimeEnd = null
      }

      if (this.listQuery.recycleDateRange) {
        this.listQuery.recycledTimeStart = this.listQuery.recycleDateRange[0] + ' 00:00:00'
        this.listQuery.recycledTimeEnd = this.listQuery.recycleDateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.recycledTimeStart = null
        this.listQuery.recycledTimeEnd = null
      }
      queryCanRecycled(this.listQuery).then((response) => {
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
      this.$refs.searchFormRef.resetFields()
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    onRecycling(rows) {
      // console.log('------------this.rows:', rows)
      this.$confirm('确定要回收该作废的票证么？', '作废票证回收', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.idList = []
        for (var i = 0; i < rows.length; i++) {
          this.recyclingParam.idList.push(rows[i].id)
        }
        // console.log('***************this.idList:', this.idList)
        ticketApplyRecycled(this.recyclingParam).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '作废票证回收通过!'
            })
            this.getList()
          }
        })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '作废票证回收取消'
          })
        })
    },
    onCancel(rows) {
      this.$confirm('确定要取消回收该作废的票证么？', '取消作废票证回收', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '取消作废票证回收成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消作废票证回收取消'
        })
      })
    }
  }
}
</script>

<style></style>
