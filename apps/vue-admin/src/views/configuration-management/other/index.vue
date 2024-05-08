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
          <el-form-item prop="type" label="配置类型">
            <el-select v-model="listQuery.type">
              <el-option
                v-for="option in typeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="enabled" label="状态">
            <el-select v-model="listQuery.enabled" clearable>
              <el-option
                v-for="option in enabledOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="airline" label="航司">
            <el-input v-model.trim="listQuery.airline" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="userName" label="账号">
            <el-input v-model.trim="listQuery.userName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="officeNo" label="Office号">
            <el-input v-model.trim="listQuery.officeNo" clearable />
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
            <el-button type="primary" plain @click="onAdd()">
              新增
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <datatable
      :loading="loading"
      :mode="'select'"
      :table-key="'BlackScreenConfiguration'"
      :table-data="list"
      :table-head="columns"
      batch-operation-text="上线"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-confirm="onConfirm"
      @on-cancel="onCancel"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <configurationCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import { priceSourceAccountList, updatePriceSourceAccount, priceSourceAccountDelete } from '@/api/configuration/price-source-account'
import ConfigurationCreateUpdate from './create-update'
import PriceSourceAccountTypeEnum from '@/enum/PriceSourceAccountType'

export default {
  name: 'BlackScreenConfiguration',
  components: {
    Datatable,
    Pagination,
    ConfigurationCreateUpdate
  },
  data() {
    return {
      loading: false,
      enabledOptions: [
        {
          value: true,
          label: '已上线'
        }, {
          value: false,
          label: '未上线'
        }
      ],
      typeOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery,
        type: 1
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.typeOptions = Object.keys(PriceSourceAccountTypeEnum.PriceSourceAccountType).map(key => ({
      value: PriceSourceAccountTypeEnum.PriceSourceAccountType[key],
      label: this.$t(`Juzo["Enum:PriceSourceAccountType:${PriceSourceAccountTypeEnum.PriceSourceAccountType[key]}"]`)
    })).filter(x => x.value !== 0)
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      if (!this.listQuery.type) {
        this.listQuery.type = 0
      }
      priceSourceAccountList(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.items
          this.total = response.totalCount
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
      this.$confirm(`确定要删除该配置 ${row.userName} 么？`, `删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        priceSourceAccountDelete(row.id).then((response) => {
          this.loading = false
          this.handleFilter()
          this.$message({
            type: 'success',
            message: `删除成功!`
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `取消删除!`
        })
      })
    },
    onConfirm(rows) {
      if (rows && rows.length === 0) {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      this.$confirm(`确定要上线${rows.length}条配置么？`, `删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        rows.forEach((ele, eleIndex) => {
          ele.enabled = true
          updatePriceSourceAccount(ele).then((response) => {
            if (eleIndex === rows.length - 1) {
              if (response) {
                this.$message({
                  message: '批量上线成功',
                  type: 'success'
                })
                this.handleFilter()
              }
            }
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `取消删除!`
        })
      })
    },
    onCancel(rows) {
      if (rows && rows.length === 0) {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
        return
      }
      this.$confirm(`确定要下线${rows.length}条配置么？`, `删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        rows.forEach((ele, eleIndex) => {
          ele.enabled = false
          updatePriceSourceAccount(ele).then((response) => {
            if (eleIndex === rows.length - 1) {
              if (response) {
                this.$message({
                  message: '批量下线成功',
                  type: 'success'
                })
                this.handleFilter()
              }
            }
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `取消删除!`
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
