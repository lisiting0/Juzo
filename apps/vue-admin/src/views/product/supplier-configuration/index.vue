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
          <el-form-item label="供应商" prop="supplierId">
            <el-select
              v-model="listQuery.supplierId"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in supplierListOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" :loading="loading" @click="getList()">查询</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onConfiguration()">产品配置</el-button>
    </div>

    <datatable
      mode="editDelete"
      :table-key="'SupplierConfiguration'"
      :table-data="list"
      :table-head="columns"
      @on-delete="onDelete"
    />

    <configurationDialog
      ref="configuration-dialog"
      @handleFilter="handleFilter"
    />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Columns from './columns'
import { ticketSupplierList } from '@/api/distribution/supplier'
import { productSupplierList, updateProductSupplier } from '@/api/product/domestic-product-supplier'
import ConfigurationDialog from './configuration-dialog'

export default {
  name: 'SupplierConfiguration',
  components: {
    Datatable,
    ConfigurationDialog
  },
  data() {
    return {
      loading: false,
      supplierListOptions: [],
      columns: [],
      list: [],
      listQuery: {}
    }
  },
  created() {
    this.getSupplierList()
    this.getList()
  },
  mounted() {
    this.columns = Columns.columns
  },
  methods: {
    getSupplierList() {
      ticketSupplierList({ page: 1, limit: 1000 }).then(response => {
        if (response) {
          this.supplierListOptions = response.items
        }
      })
    },
    getList() {
      this.loading = true
      productSupplierList(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.items
        }
      }).catch(() => {
        this.loading = false
      })
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery = {}
      this.getList()
    },
    onConfiguration(row) {
      this.$refs['configuration-dialog'].handle(row)
    },
    onDelete(row) {
      this.$confirm(`确定要${row.enabled ? '取消关联' : '关联'}${row.productName}产品配置吗？`, '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: !row.enabled
      }).then(() => {
        updateProductSupplier(row.id).then(() => {
          this.$message({
            type: 'success',
            message: `${row.enabled ? '取消关联' : '关联'}${row.productName}产品配置成功！！`
          })
          this.handleFilter(true)
        }).catch(() => {
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
