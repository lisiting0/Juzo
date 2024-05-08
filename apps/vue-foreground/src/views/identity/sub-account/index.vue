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
                    <el-form-item label="状态" prop="isActive">
                        <el-select
                            v-model="listQuery.isActive"
                            clearable
                            placeholder="状态"
                        >
                            <el-option
                                v-for="env in enDisableOptions"
                                :key="env.value"
                                :value="env.value"
                                :label="env.label"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="账号" prop="userName">
                        <el-input v-model="listQuery.userName" clearable />
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

        <div class="btn-group">
            <el-button type="primary" size="small" @click="onAdd()">
                {{ $t('table.add') }}子账号
            </el-button>
        </div>

        <datatable
            :loading="loading"
            :mode="null"
            :table-key="'SubAccount'"
            :table-data="list"
            :table-head="columns"
            @on-edit="onEdit"
            @on-detail="onAssignment"
            @on-delete="onEnDisable"
        />
        <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
        />
        <modifyPassword ref="modifyPasswordDialog" />
        <permissionDialog ref="privilegeAssignmentDialog" provider-name="U" :provider-key="providerKey" />
        <createUpdate ref="createUpdateDialog" @handleFilter="handleFilter" />
    </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import Enum from '@/enum/enum'
import ModifyPassword from './modify-password.vue'
import PermissionDialog from './permission-dialog.vue'
import CreateUpdate from './create-update.vue'
import { subAccountList, updateSubAccount } from '@/api/identity/agent'

export default {
  name: 'SubAccount',
  components: {
    Datatable,
    Pagination,
    ModifyPassword,
    PermissionDialog,
    CreateUpdate
  },
  data() {
    return {
      loading: false,
      fullscreenLoading: false,
      userId: '',
      enDisableOptions: [],
      columns: [],
      list: [{
        staus: 0
      }],
      total: 0,
      listQuery: {
        ...baseListQuery
      },
      providerKey: ''
    }
  },
  created() {
    setTimeout(() => {
      this.getList()
    }, 500)
  },
  mounted() {
    this.enDisableOptions = Enum.boolEnDisableOptions
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      const user = this.$store.state.app.user
      if (user) {
        this.loading = true
        subAccountList(user.id, this.listQuery).then((response) => {
          if (response) {
            this.list = response
            this.total = response.length
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    onAdd() {
      this.$refs['createUpdateDialog'].handleCreate()
    },
    onEdit(row) {
      this.$refs['modifyPasswordDialog'].handle(row)
    },
    onAssignment(row) {
      this.providerKey = row.id
      this.$refs['privilegeAssignmentDialog'].handleUpdatePermission(row)
    },
    onEnDisable(row) {
      this.$confirm(`确定要${!row.isActive ? '启用' : '禁用'}该账号 ${row.userName} 么？`, `${!row.isActive ? '启用' : '禁用'}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        const dataJson = {
          userId: row.id,
          isActive: !row.isActive
        }
        const user = this.$store.state.app.user
        updateSubAccount(user.id, dataJson).then(() => {
          this.loading = false
          this.handleFilter()
          this.$message({
            type: 'success',
            message: `${!row.isActive ? '启用' : '禁用'}成功!`
          })
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.loading = false
        this.$message({
          type: 'info',
          message: `取消${!row.isActive ? '启用' : '禁用'}!`
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
