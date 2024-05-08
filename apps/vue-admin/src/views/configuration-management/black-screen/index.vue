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
          <el-form-item prop="isRaw" label="原始配置">
            <el-select v-model="listQuery.isRaw" clearable>
              <el-option
                v-for="option in isRawOptions"
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
          <el-form-item prop="signIn" label="SI账号密码">
            <el-input v-model.trim="listQuery.signIn" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="groupName" label="分组名称">
            <el-input
              v-model.trim="listQuery.groupName"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="pid" label="Pid号">
            <el-input v-model.trim="listQuery.pid" clearable />
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
import ConfigurationCreateUpdate from './create-update'
import baseListQuery from '@/utils/abp'
import { priceSourceAccountList, enablePriceSourceAccount, priceSourceAccountDelete } from '@/api/configuration/price-source-account'

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
      isRawOptions: [
        {
          value: true,
          label: '原始配置'
        }, {
          value: false,
          label: '非原始配置'
        }
      ],
      enabledOptions: [
        {
          value: true,
          label: '已上线'
        }, {
          value: false,
          label: '未上线'
        }
      ],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery,
        type: 0
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      priceSourceAccountList(this.listQuery).then((response) => {
        if (response) {
          this.list = response.items
          this.total = response.totalCount
        }
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
          enablePriceSourceAccount(ele.id, true).then((response) => {
            if (eleIndex === rows.length - 1) {
              if (response) {
                this.$message({
                  message: '批量上线成功',
                  type: 'success'
                })
                this.handleFilter()
              }
            }
          }).catch((error) => {
            this.loading = false
            throw error
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
          enablePriceSourceAccount(ele.id, false).then((response) => {
            if (eleIndex === rows.length - 1) {
              if (response) {
                this.$message({
                  message: '批量下线成功',
                  type: 'success'
                })
                this.handleFilter()
              }
            }
          }).catch((error) => {
            this.loading = false
            throw error
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
