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
          <el-form-item prop="name" label="产品名称">
            <el-input v-model="listQuery.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="airlines" label="适用航司">
            <el-input v-model="listQuery.airlines" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="cabinClass" label="适用舱等">
            <el-select
              v-model="listQuery.cabinClass"
              placeholder="适用舱等"
              clearable=""
            >
              <el-option
                v-for="option in cabinClassTypeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
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

    <div style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">新增</el-button>
    </div>

    <datatable
      :loading="loading"
      mode="editDelete"
      :table-key="'Product'"
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

    <productCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import CabinClassTypeEnum from '@/enum/CabinClassFlagType'
import baseListQuery from '@/utils/abp'
import { productList, deleteProduct } from '@/api/product/product'
import ProductCreateUpdate from './create-update.vue'

export default {
  name: 'Product',
  components: {
    Datatable,
    Pagination,
    ProductCreateUpdate
  },
  data() {
    return {
      loading: false,
      cabinClassTypeOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.cabinClassTypeOptions = Object.keys(CabinClassTypeEnum.CabinClassFlagType).map(key => ({
      value: CabinClassTypeEnum.CabinClassFlagType[key],
      label: this.$t(`Juzo["Enum:CabinClassFlagType:${CabinClassTypeEnum.CabinClassFlagType[key]}"]`)
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      productList(this.listQuery).then((response) => {
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
      this.$confirm(`确定要删除产品 ${row.name}吗？`, '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteProduct(row.id).then(() => {
          this.$message({
            type: 'success',
            message: `删除产品${row.name}成功！！`
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
