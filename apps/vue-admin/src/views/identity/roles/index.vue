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
          <el-form-item prop="filter" label="角色">
            <el-input
              v-model.trim="listQuery.filter"
              clearable
              placeholder="角色"
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
      <el-button type="primary" size="small" @click="onAdd()">
        {{ $t('table.add') }}
      </el-button>
    </el-row>

    <!-- 暂无接口 @on-detail="onSettingAccount" -->
    <datatable
      :loading="loading"
      mode="edit"
      :table-key="'Roles'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-copy="onSetting"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <rolesCreateUpdate ref="dialog" @handleFilter="handleFilter" />
    <permission-dialog ref="permissionDialog" provider-name="R" :provider-key="providerKey" @handleFilter="handleFilter" />
    <delAccount ref="delAccountDialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import RolesCreateUpdate from './create-update'
import PermissionDialog from '../components/permission-dialog'
import DelAccount from './setting-account/del-account'
import { getRoles, deleteRole } from '@/api/identity/role'

export default {
  name: 'Roles',
  components: {
    Datatable,
    Pagination,
    RolesCreateUpdate,
    PermissionDialog,
    DelAccount
  },
  data() {
    return {
      loading: false,
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery
      },
      providerKey: ''
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  mounted() {
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      getRoles(this.listQuery).then((response) => {
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
      this.$refs['dialog'].add()
    },
    onEdit(row) {
      this.$refs['dialog'].edit(row)
    },
    onDelete(row) {
      this.$confirm(`确定要删除该角色 ${row.name} 么？`, '删除角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        deleteRole(row.id).then((response) => {
          this.loading = false
            this.handleFilter()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
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
    onSetting(row) {
      this.providerKey = row.name
      this.$refs['permissionDialog'].handleUpdatePermission(row)
    }
    // onSettingAccount(row) {
    //   this.$refs['delAccountDialog'].handle(row)
    // }
  }
}
</script>

<style></style>
