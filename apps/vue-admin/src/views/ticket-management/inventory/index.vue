<template>
  <div class="app-container">
    <el-form ref="searchFormRef" :model="listQuery" :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="入库日期" prop="dateRange">
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
          <el-form-item label="审核状态" prop="ticketStockAuditStatus">
            <el-select v-model="listQuery.ticketStockAuditStatus" clearable>
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
          <el-form-item label="号段" prop="starterNumber">
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

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">
        {{ $t('table.add') }}
      </el-button>
    </el-row>

    <datatable
      :loading="loading"
      mode="edit"
      :table-key="'inventory'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-detail="onHandle"
      @on-delete="onNullify"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <inventoryCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import TicketTypeEnum from '@/enum/ticketType'
import ApplicationStatusEnum from '@/enum/applicationStatus'
import InventoryCreateUpdate from './create-update'
import { audit, fetchList } from '@/api/ticket-manage/stock'

export default {
  name: 'Inventory',
  components: {
    Datatable,
    Pagination,
    InventoryCreateUpdate
  },
  data() {
    return {
      loading: false,
      ticketTypeOptions: [],
      statusOptions: [],
      columns: [],
      list: [{
        status: 1
      }, {
        status: 2
      }],
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
  },
  mounted() {
    this.ticketTypeOptions = Object.keys(TicketTypeEnum.TicketType).map(key => ({
      value: TicketTypeEnum.TicketType[key],
      label: key
    }))
    this.statusOptions = Object.keys(ApplicationStatusEnum.ApplicationStatus).map(key => ({
      value: ApplicationStatusEnum.ApplicationStatus[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      if (this.listQuery.dateRange) {
        this.listQuery.createTimeStart = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.createTimeEnd = this.listQuery.dateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.createTimeStart = null
        this.listQuery.createTimeEnd = null
      }
     // console.log('---------this.listQuery', this.listQuery)
      fetchList(this.listQuery).then((response) => {
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
      this.listQuery.endNumber = ''
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    onAdd() {
      this.$refs['dialog'].add()
    },
    onEdit(row) {
      this.$refs['dialog'].edit(row)
    },
    onHandle(row) {
      this.$confirm('确定要审核通过该票证记录么？', '票证审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        audit(row.id).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '票证审核通过!'
            })
          }
          this.getList(this.listQuery)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '票证审核取消'
          })
        })
      })
    },
    onNullify(row) {
      this.$confirm('确定要作废该票证记录么？', '票证作废', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '票证作废成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '票证作废取消'
        })
      })
    }
  }
}
</script>

<style></style>
