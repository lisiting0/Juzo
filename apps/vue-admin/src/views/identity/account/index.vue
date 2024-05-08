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
          <el-form-item label="筛选条件" prop="filter">
            <el-input
              v-model.trim="listQuery.filter"
              clearable
              placeholder="筛选条件"
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
      <el-button type="primary" size="small" @click="onAddProvider()">
        {{ $t('table.add') }}供应商
      </el-button>
    </el-row>

    <datatable
      :loading="loading"
      mode="edit"
      table-key="Account"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-delete="onEnDisabled"
      @on-detail="onReset"
      @on-copy="onSetting"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <accountCreateUpdate ref="dialog" @handleFilter="handleFilter" />
    <supplierCreateUpdate ref="supplierDialog" @handleFilter="handleFilter" />
    <permission-dialog
      ref="permissionDialog"
      provider-name="U"
      :provider-key="providerKey"
    />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import TicketTypeEnum from '@/enum/ticketType'
import ApplicationStatusEnum from '@/enum/applicationStatus'
import AccountCreateUpdate from './create-update.vue'
import PermissionDialog from '../components/permission-dialog.vue'
import SupplierCreateUpdate from './supplier-create-update.vue'
import { getJuzoUsers, updateUser } from '@/api/identity/user'

export default {
  name: 'Account',
  components: {
    Datatable,
    Pagination,
    AccountCreateUpdate,
    PermissionDialog,
    SupplierCreateUpdate
  },
  data() {
    return {
      loading: false,
      ticketTypeOptions: [],
      statusOptions: [],
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
    this.ticketTypeOptions = Object.keys(TicketTypeEnum.TicketType).map(key => ({
      value: TicketTypeEnum.TicketType[key],
      label: key
    }))
    this.statusOptions = Object.keys(ApplicationStatusEnum.ApplicationStatus).map(key => ({
      value: ApplicationStatusEnum.ApplicationStatus[key],
      label: key
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      getJuzoUsers(this.listQuery).then((response) => {
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
    onAddProvider() {
      this.$refs['supplierDialog'].add()
    },
    onAdd() {
      this.$refs['dialog'].add()
    },
    onEdit(row) {
      this.$refs['dialog'].edit(row)
    },
    onEnDisabled(row) {
      this.$confirm('确定需要禁用/启用该用户么？', '禁用/启用用户？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        row.isActive = !row.isActive
        updateUser(row).then(response => {
          if (response) {
            this.$message({
              type: 'success',
              message: '禁用/启用成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消禁用/启用'
        })
      })
    },
    onReset(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '确定需要重置该账号的密码么？重置后密码为：'),
          h('span', { style: 'color: red;font-size: 16px;font-weight: bold;' }, 'yx1q2w3E*')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            row.password = 'yx1q2w3E*'
            updateUser(row).then(response => {
              if (response) {
                setTimeout(() => {
                  done()
                  setTimeout(() => {
                    instance.confirmButtonLoading = false
                  }, 300)
                }, 3000)
              }
            })
          } else {
            done()
          }
        }
      }).then(action => {
        if (action === 'confirm') {
          this.$message({
            type: 'success',
            message: '密码重置成功'
          })
        }
      })
    },
    onSetting(row) {
      this.providerKey = row.id
      this.$refs['permissionDialog'].handleUpdatePermission(row)
    }
  }
}
</script>

<style></style>
