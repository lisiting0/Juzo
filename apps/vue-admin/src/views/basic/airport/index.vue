<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item label="城市名称" prop="cityName">
            <el-input v-model="listQuery.cityName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="机场" prop="airportCode">
            <el-select
              v-model="listQuery.airportCode"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in airports"
                :key="item.id"
                :label="item.airportName + '(' + item.airportCode + ')'"
                :value="item.airportCode"
              >
                <span style="float: left">{{ item.airportName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.airportCode
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="国内国际" prop="cityType">
            <el-select v-model="listQuery.cityType" clearable>
              <el-option
                v-for="env in natInternationalOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
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

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">新增</el-button>
      <el-upload
        class="upload-btn"
        action="/api/upload"
        :show-file-list="false"
        :http-request="onImport"
      >
        <el-button type="success" plain size="small">导入</el-button>
      </el-upload>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        type="primary"
        size="small"
        plain
        @click="onExport()"
      >导出</el-button>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        type="primary"
        plain
        size="small"
        @click="downloadExcelTemplate()"
      >模板下载</el-button>
    </el-row>

    <datatable
      :loading="loading"
      mode="editDelete"
      :table-key="'airport'"
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

    <airportCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import AirportCreateUpdate from './create-update.vue'
import Enum from '@/enum/enum'
import Columns from './columns'
import baseListQuery, { downloadExcel } from '@/utils/abp'
import {
  fetchList,
  importExcel,
  exportExcel,
  airportList,
  deleteAirport
} from '@/api/basic/airport'
import { Message } from 'element-ui'

export default {
  name: 'Airport',
  components: {
    Datatable,
    Pagination,
    AirportCreateUpdate
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      natInternationalOptions: [],
      hasOptions: [],
      booleanOptions: [],
      columns: [],
      airports: [],
      list: null,
      total: 0,
      noPageQuery: {
        current: -1,
        size: -1
      },
      listQuery: {
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList()
    this.getAllAirport()
  },
  mounted() {
    this.natInternationalOptions = Enum.natInternationalOptions
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      fetchList(this.listQuery)
        .then((response) => {
          this.loading = false
          if (response.status === '200') {
            this.list = response.data.records
            this.total = response.data.total
          }
        })
        .catch((error) => {
          this.loading = false
          throw error
        })
    },
    getAllAirport() {
      this.loading = true
      airportList(this.noPageQuery)
        .then((response) => {
          this.loading = false
          if (response.status === '200') {
            this.airports = response.data.records
          }
        })
        .catch((error) => {
          this.loading = false
          throw error
        })
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList(this.getInputList)
    },
    onAdd() {
      this.$refs['dialog'].handleCreate()
    },
    onEdit(row) {
      this.$refs['dialog'].handleUpdate(row)
    },
    onDelete(row) {
      this.$confirm(`确定要删除该机场么？`, `删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.loading = true
          deleteAirport(row.id)
            .then((response) => {
              this.loading = false
              this.handleFilter()
              this.$message({
                type: 'success',
                message: `删除成功!`
              })
            })
            .catch((error) => {
              this.loading = false
              throw error
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: `取消删除!`
          })
        })
    },
    onImport(e) {
      this.fullscreenLoading = true
      const formData = new FormData()
      formData.append('file', e.file)
      importExcel(formData)
        .then((response) => {
          if (response) {
            this.fullscreenLoading = false
            Message({
              message: '上传成功',
              type: 'success',
              duration: 5 * 1000
            })
            this.handleFilter(true)
            this.getAllAirport()
          }
        })
        .catch((error) => {
          this.loading = false
          throw error
        })
    },
    onExport() {
      this.fullscreenLoading = true
      this.listQuery.page = -1
      this.listQuery.limit = -1
      exportExcel(this.listQuery).then((response) => {
        if (response) {
          this.fullscreenLoading = false
          downloadExcel(response, '机场列表')
          this.listQuery.page = 1
          this.listQuery.limit = 10
        }
      })
    },
    downloadExcelTemplate() {
      this.fullscreenLoading = true
      this.listQuery.page = 1
      this.listQuery.limit = 1
      exportExcel(this.listQuery).then((response) => {
        if (response) {
          this.fullscreenLoading = false
          downloadExcel(response, '机场列表模板')
          this.listQuery.page = 1
          this.listQuery.limit = 10
        }
      })
    }
  }
}
</script>

<style></style>
