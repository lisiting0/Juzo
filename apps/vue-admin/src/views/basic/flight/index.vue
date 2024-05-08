<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item label="航司">
            <el-input
              v-model="listQuery.flightCarrierNumber"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航班号">
            <el-input v-model="listQuery.flightNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="出发时刻">
            <el-input v-model="listQuery.departureTime" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="到达时刻">
            <el-input
              v-model="listQuery.destinationTime"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="出发城市">
            <el-input v-model="listQuery.departureCity" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="到达城市">
            <el-input
              v-model="listQuery.destinationCity"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="经停城市">
            <el-input v-model="listQuery.stopoverCity" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否共享">
            <el-select v-model="listQuery.isShared" clearable>
              <el-option
                v-for="env in booleanOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
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

    <el-row style="padding-left: 20px">
      <el-button
        type="primary"
        size="small"
        @click="onAdd()"
      >新增</el-button>
      <el-upload
        class="upload-btn"
        action="https://jsonplaceholder.typicode.com/posts/"
      >
        <el-button type="success" size="small">导入</el-button>
      </el-upload>
      <el-button
        type="primary"
        size="small"
        @click="onExport()"
      >导出</el-button>
      <el-button
        type="info"
        size="small"
        @click="onExport()"
      >模板下载</el-button>
    </el-row>

    <datatable
      mode="edit"
      :loading="loading"
      :table-key="'flight'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <flightCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import FlightCreateUpdate from './create-update.vue'
import Enum from '@/enum/enum'
import Columns from './columns'
import baseListQuery, { downloadExcel } from '@/utils/abp'
import { fetchList, importExcel, exportExcel } from '@/api/basic/flight'
import { Message } from 'element-ui'

export default {
  name: 'Airport',
  components: {
    Datatable,
    Pagination,
    FlightCreateUpdate
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      natInternationalOptions: [],
      hasOptions: [],
      booleanOptions: [],
      columns: [],
      list: null,
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
    this.natInternationalOptions = Enum.natInternationalOptions
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      fetchList(this.listQuery).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch((error) => {
        this.loading = false
        throw error
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
    onImport(e) {
      this.fullscreenLoading = true
      const formData = new FormData()
      formData.append('file', e.file)
      importExcel(formData).then(response => {
        if (response) {
          this.fullscreenLoading = false
          Message({
            message: '上传成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.handleFilter(true)
        }
      })
    },
    onExport() {
      this.fullscreenLoading = true
      this.listQuery.page = -1
      this.listQuery.limit = -1
      exportExcel(this.listQuery).then(response => {
        if (response) {
          this.fullscreenLoading = false
          downloadExcel(response, '机场列表')
          this.listQuery.current = 1
          this.listQuery.size = 10
        }
      })
    }
  }
}
</script>

<style></style>
