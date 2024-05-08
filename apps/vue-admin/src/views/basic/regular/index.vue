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
          <el-form-item label="航司" prop="carrierCode">
            <el-select
              v-model="listQuery.carrierCode"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in carries"
                :key="item.id"
                :label="
                  item.carrierName +
                    '(' +
                    item.carrierCode +
                    ')'
                "
                :value="item.carrierCode"
              >
                <span style="float: left">{{
                  item.carrierName
                }}</span>
                <span
                  style="
                                        float: right;
                                        color: #8492a6;
                                        font-size: 13px;
                                    "
                >{{ item.carrierCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="客规类型" prop="guestRuleType">
            <el-select v-model="listQuery.guestRuleType" clearable>
              <el-option
                v-for="env in ruleTypeOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="舱位等级" prop="cabinLevelEnum">
            <el-select v-model="listQuery.cabinLevelEnum" clearable>
              <el-option
                v-for="env in cabinLevelOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="舱位" prop="cabinCode">
            <el-input v-model="listQuery.cabinCode" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="销售日期" prop="salesDateRange">
            <el-date-picker
              v-model="listQuery.salesDateRange"
              format="yyyy年-MM月-dd日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="销售日期起"
              end-placeholder="销售日期止"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="起飞日期" prop="takeoffDateRange">
            <el-date-picker
              v-model="listQuery.takeoffDateRange"
              format="yyyy年-MM月-dd日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="起飞日期起"
              end-placeholder="起飞日期止"
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

    <el-row style="padding-left: 20px">
      <el-button
        type="primary"
        size="small"
        @click="onAdd()"
      >新增</el-button>
      <el-upload
        class="upload-btn"
        action="/api/upload"
        :show-file-list="false"
        :http-request="onImport"
      >
        <el-button type="success" plain size="small">导入</el-button>
      </el-upload>
      <el-button
        type="primary"
        plain
        size="small"
        @click="onExport()"
      >导出</el-button>
      <el-button
        type="primary"
        plain
        size="small"
        @click="downloadExcelTemplate()"
      >模板下载</el-button>
    </el-row>

    <datatable
      mode="editDelete"
      :loading="loading"
      :table-key="'regular'"
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

    <regularCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import RegularCreateUpdate from './create-update.vue'
import baseListQuery, { downloadExcel } from '@/utils/abp'
import { fetchList as regularList, importExcel, exportExcel, deleteGuestRule } from '@/api/basic/regular'
import { airlineList } from '@/api/basic/airline'
import Enum from '@/enum/enum'
import CabinClassTypeEnum from '@/enum/CabinClassType'
import Columns from './columns'
import { Message } from 'element-ui'

export default {
  name: 'Regular',
  components: {
    Datatable,
    Pagination,
    RegularCreateUpdate
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      cabinLevelOptions: [],
      ruleTypeOptions: [],
      columns: [],
      query: { current: -1, size: -1 },
      carries: [],
      list: null,
      total: 0,
      listQuery: {
        takeoffStartTime: '',
        takeoffEndTime: '',
        salesStartTime: '',
        salesEndTime: '',
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList()
    this.getAirlineList()
  },
  mounted() {
    this.cabinLevelOptions = Object.keys(CabinClassTypeEnum.CabinClassType).map(key => ({
      value: CabinClassTypeEnum.CabinClassType[key],
      label: key
    }))
    this.ruleTypeOptions = Enum.ruleTypeOptions
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      if (this.listQuery.takeoffDateRange) {
        this.listQuery.takeoffStartTime = this.listQuery.takeoffDateRange[0] + ''
        this.listQuery.takeoffEndTime = this.listQuery.takeoffDateRange[1] + ''
      } else {
        this.listQuery.takeoffStartTime = null
        this.listQuery.takeoffEndTime = null
      }
      if (this.listQuery.salesDateRange) {
        this.listQuery.salesStartTime = this.listQuery.salesDateRange[0] + ''
        this.listQuery.salesEndTime = this.listQuery.salesDateRange[1] + ''
      } else {
        this.listQuery.salesStartTime = null
        this.listQuery.salesEndTime = null
      }
      regularList(this.listQuery).then((response) => {
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
    getAirlineList() {
      airlineList(this.query).then((response) => {
        if (response.status === '200') {
          this.carries = response.data.records
        }
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
      this.$confirm(`确定要删除该舱位么？`, `删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        deleteGuestRule(row.id).then((response) => {
          this.loading = false
          this.handleFilter()
          this.$message({
            type: 'success',
            message: `删除成功!`
          })
        }).catch((error) => {
          this.loading = false
          throw error
        })
      }).catch(() => {
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
      }).catch((error) => {
        this.fullscreenLoading = false
        throw error
      })
    },
    onExport() {
      this.fullscreenLoading = true
      this.listQuery.page = -1
      this.listQuery.limit = -1
      exportExcel(this.listQuery).then(response => {
        if (response) {
          this.fullscreenLoading = false
          downloadExcel(response, '客规列表')
          this.listQuery.page = 1
          this.listQuery.limit = 10
        }
      })
    },
    downloadExcelTemplate() {
      this.fullscreenLoading = true
      this.listQuery.page = -1
      this.listQuery.limit = -1
      exportExcel(this.listQuery).then(response => {
        if (response) {
          this.fullscreenLoading = false
          downloadExcel(response, '客规列表模板')
          this.listQuery.page = 1
          this.listQuery.limit = 10
        }
      })
    }
  }
}
</script>

<style></style>
