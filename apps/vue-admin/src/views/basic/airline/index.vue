<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-135"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="航司简称" prop="carrierCode">
            <el-select
              v-model="listQuery.carrierCode"
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
                <span style="float: right;color: #8492a6;font-size: 13px;">{{ item.carrierCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="公司编号(票号前缀)"
            prop="carrierPrefixNumber"
          >
            <el-input v-model="listQuery.carrierPrefixNumber" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="国际航司" prop="carrierCountryType">
            <el-select
              v-model="listQuery.carrierCountryType"
              clearable
            >
              <el-option
                v-for="env in natInternationalOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="有国内航班" prop="haveDomesticAirport">
            <el-select
              v-model="listQuery.haveDomesticAirport"
              clearable
            >
              <el-option
                v-for="env in hasOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="有国际航班" prop="haveForeignAirport">
            <el-select
              v-model="listQuery.haveForeignAirport"
              clearable
            >
              <el-option
                v-for="env in hasOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否有效" prop="carrierStatus">
            <el-select v-model="listQuery.carrierStatus" clearable>
              <el-option
                v-for="env in booleanOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="btns">
            <el-button
              type="primary"
              @click="handleFilter()"
            >
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
        新增
      </el-button>
      <el-upload
        class="upload-btn"
        action="/api/upload"
        :show-file-list="false"
        :http-request="onImport"
      >
        <el-button
          :loading="fullscreenLoading"
          type="success"
          plain
          size="small"
        >导入
        </el-button>
      </el-upload>
      <el-button
        :loading="fullscreenLoading"
        type="primary"
        plain
        size="small"
        @click="onExport()"
      >
        导出
      </el-button>
      <el-button
        :loading="fullscreenLoading"
        type="info"
        plain
        size="small"
        @click="downloadExcelTemplate()"
      >
        模板下载
      </el-button>
    </el-row>

    <datatable
      :loading="loading"
      mode="editDelete"
      :table-key="'airline'"
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

    <airlineCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import AirlineCreateUpdate from './create-update.vue'
import Enum from '@/enum/enum'
import Columns from './columns'
import baseListQuery, { downloadExcel } from '@/utils/abp'
import { fetchList, airlineList, importExcel, exportExcel, deleteAirline } from '@/api/basic/airline'
import { Message } from 'element-ui'

export default {
  name: 'Airline',
  components: {
    Datatable,
    Pagination,
    AirlineCreateUpdate
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      natInternationalOptions: [],
      hasOptions: [],
      booleanOptions: [],
      columns: [],
      carries: [],
      list: null,
      total: 0,
      query: {
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
    this.getAllAirLine()
  },
  mounted() {
    this.natInternationalOptions = Enum.natInternationalOptions
    this.hasOptions = Enum.hasOptions
    this.booleanOptions = Enum.booleanOptions
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      fetchList(this.listQuery).then((response) => {
        if (response.status === '200') {
          this.loading = false
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
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
      this.$confirm(`确定要删除该机场么？`, `删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        deleteAirline(row.id).then(() => {
          this.loading = false
          this.handleFilter()
          this.$message({
            type: 'success',
            message: `删除成功!`
          })
        })
      }).catch(() => {
        this.loading = false
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
          downloadExcel(response, '航司列表')
          this.fullscreenLoading = false
          this.listQuery.page = 1
          this.listQuery.limit = 10
        }
      }).catch(() => {
        this.fullscreenLoading = false
      })
    },
    downloadExcelTemplate() {
      this.fullscreenLoading = true
      this.listQuery.page = 1
      this.listQuery.limit = 1
      exportExcel(this.listQuery).then(response => {
        if (response) {
          downloadExcel(response, '航司列表模板')
          this.fullscreenLoading = false
          this.listQuery.page = 1
          this.listQuery.limit = 10
        }
      }).catch(() => {
        this.fullscreenLoading = false
      })
    }
  }
}
</script>

<style></style>
