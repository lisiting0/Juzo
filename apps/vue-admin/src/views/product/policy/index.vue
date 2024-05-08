<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item label="政策类型" prop="tripType">
            <el-select
              v-model="listQuery.tripType"
              clearable
            >
              <el-option
                v-for="option in tripTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="政策名称" prop="name">
            <el-input v-model="listQuery.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="政策代码" prop="policyCode">
            <el-input v-model="listQuery.policyCode" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航司" prop="airline">
            <el-select v-model="listQuery.airline" filterable clearable placeholder="航司">
              <el-option v-for="item in airlines" :key="item.id" :label="item.carrierCode+'('+item.carrierName+')'" :value="item.carrierCode">
                <span style="float: left">{{ item.carrierCode }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.carrierName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="起飞城市" prop="departureAirports">
            <el-input v-model="listQuery.departureAirports" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="到达城市">
            <el-input v-model="listQuery.arrivalAirports" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="包含舱位">
            <el-input v-model="listQuery.includeCabins" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="状态">
            <el-select v-model="listQuery.enabled" clearable>
              <el-option
                v-for="option in enDisableOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button
              type="primary"
              @click="handleFilter()"
            >查询
            </el-button>
            <el-button
              type="info"
              @click="resetForm"
            >重置
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">新增</el-button>
      <el-upload
        class="upload-btn"
        action=""
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
    </el-row>

    <datatable
      mode="editDelete"
      :table-key="'Policy'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-copy="onCopy"
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
import Enum from '@/enum/enum'
import Columns from './columns'
import TripTypeEnum from '@/enum/TripType'
import baseListQuery, { downloadExcel } from '@/utils/abp'
import { airlineList } from '@/api/basic/airline'
import { policyList, deletePolicy, exportPolicyExcel, importPolicyExcel, copyPolicy } from '@/api/product/policy'

export default {
  name: 'Policy',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      airlines: [],
      enDisableOptions: [
        {
          value: true,
          label: '启用'
        }, {
          value: false,
          label: '禁用'
        }
      ],
      columns: [],
      list: null,
      total: 0,
      listQuery: {
        ...baseListQuery
      },
      query: { current: -1, size: -1 },
      tripTypeOptions: []
    }
  },
  created() {
    this.getAirlines()
    this.getList()
  },
  mounted() {
    this.natInternationalOptions = Enum.natInternationalOptions
    this.hasOptions = Enum.hasOptions
    this.booleanOptions = Enum.booleanOptions
    this.columns = Columns.columns
    this.tripTypeOptions = Object.keys(TripTypeEnum.TripType).map((key) => ({
      value: TripTypeEnum.TripType[key],
      label: this.$t(`AdminService["Enum:TripType:${TripTypeEnum.TripType[key]}"]`)
    }))
  },
  methods: {
    getAirlines() {
      this.loading = true
      airlineList(this.query).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.airlines = response.data.records
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    getList() {
      this.loading = true
      policyList(this.listQuery).then((response) => {
        this.list = response.items
        this.total = response.totalCount
        this.loading = false
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
      this.$router.push(`/product/policy-create-update`)
    },
    onEdit(row) {
      this.$router.push(`/product/policy-create-update?id=${row.id}`)
    },
    onDelete(row) {
      this.$confirm(`确定要删除政策 ${row.policyCode}吗？`, '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        deletePolicy(row.id).then(() => {
          this.loading = false
          this.$message({
            type: 'success',
            message: `删除政策${row.policyCode}成功！！`
          })
          this.handleFilter(true)
        }).catch((error) => {
          this.loading = false
          throw error
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    onCopy(row) {
      this.$confirm(`确定要复制该条政策 ${row.policyCode}吗？`, '确定复制', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        copyPolicy(row.id).then(() => {
          this.loading = false
          this.$message({
            type: 'success',
            message: `复制政策${row.policyCode}成功！！`
          })
          this.handleFilter(true)
        }).catch((error) => {
          this.loading = false
          throw error
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消复制'
        })
      })
    },

    onImport(e) {
      this.loading = true
      const formData = new FormData()
      formData.append('file', e.file)
      importPolicyExcel(formData).then(response => {
        this.loading = false
        if (response.isSuccessful) {
          this.$message({
            type: 'success',
            message: `上传成功成功！！`
          })
          this.handleFilter(true)
        } else {
          this.$message({
            message: response.message,
            type: 'error'
          })
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    onExport() {
      this.loading = true
      exportPolicyExcel(this.listQuery).then(response => {
        if (response) {
          this.loading = false
          downloadExcel(response, '政策')
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    }
  }
}
</script>

<style></style>
