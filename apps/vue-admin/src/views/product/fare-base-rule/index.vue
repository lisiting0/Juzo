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
          <el-form-item prop="name" label="运价基础名称">
            <el-input v-model="listQuery.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航司" prop="airline">
            <el-select
              v-model="listQuery.airline"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in carries"
                :key="item.id"
                :label="item.carrierName +'(' + item.carrierCode +')'"
                :value="item.carrierCode"
              >
                <span style="float: left">{{ item.carrierName }}</span>
                <span style="float: right;color: #8692a6;font-size: 13px;">{{ item.carrierCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="departureAirport" label="出发机场">
            <el-input v-model="listQuery.departureAirport" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="arrivalAirport" label="到达机场">
            <el-input v-model="listQuery.arrivalAirport" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="handleFilter()">查询</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">新增</el-button>
    </div>

    <datatable
      :loading="loading"
      mode="editDelete"
      :table-key="'FareBaseRule'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-delete="onDelete"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <fareBaseRuleCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import { airlineList } from '@/api/basic/airline'
import { fareBaseRuleList, deleteFareBaseRule } from '@/api/product/fare-base-rule'
import FareBaseRuleCreateUpdate from './create-update'

export default {
  name: 'Product',
  components: {
    Datatable,
    Pagination,
    FareBaseRuleCreateUpdate
  },
  data() {
    return {
      loading: false,
      carries: [],
      columns: [],
      list: [],
      total: 0,
      query: {
        current: -1,
        size: -1
      },
      listQuery: {
        departureDateRange: [],
        salesDateRange: [],
        ...baseListQuery
      }
    }
  },
  created() {
    this.getAllAirLine()
    this.getList()
  },
  mounted() {
    this.columns = Columns.columns
  },
  methods: {
    getAllAirLine() {
      this.loading = true
      airlineList(this.query).then((response) => {
        if (response.status === '200') {
          this.loading = false
          this.carries = response.data.records
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    getList() {
      this.loading = true
      if (this.listQuery.departureDateRange !== undefined && this.listQuery.departureDateRange !== null) {
        this.listQuery.departureDateBegin = this.listQuery.departureDateRange[0]
        this.listQuery.departureDateEnd = this.listQuery.departureDateRange[1]
      } else {
        this.listQuery.departureDateBegin = null
        this.listQuery.departureDateEnd = null
      }
      if (this.listQuery.salesDateRange !== undefined && this.listQuery.salesDateRange !== null) {
        this.listQuery.saleDateBegin = this.listQuery.salesDateRange[0]
        this.listQuery.saleDateEnd = this.listQuery.salesDateRange[1]
      } else {
        this.listQuery.saleDateBegin = null
        this.listQuery.saleDateEnd = null
      }
      fareBaseRuleList(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.items
          this.total = response.totalCount
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
    onAdd() {
      this.$refs['dialog'].handleCreate()
    },
    onEdit(row) {
      this.$refs['dialog'].handleUpdate(row)
    },
    onDelete(row) {
      this.$confirm(`确定要删除基础运价 ${row.name}吗？`, '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteFareBaseRule(row.id).then(() => {
          this.$message({
            type: 'success',
            message: `删除基础运价${row.name}成功！！`
          })
          this.handleFilter(true)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  }
}
</script>

<style></style>
