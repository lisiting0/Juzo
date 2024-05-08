<template>
  <el-dialog
    width="60%"
    :visible.sync="dialogFormVisible"
    :title="'账号设置'"
  >
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="账号">
            <el-input
              v-model="listQuery.account"
              clearable
              placeholder="账号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号名称">
            <el-input
              v-model="listQuery.accountName"
              clearable
              placeholder="账号名称"
            />
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

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">
        {{ $t('table.add') }}
      </el-button>
    </el-row>

    <datatable
      :loading="loading"
      :mode="'edit'"
      :table-key="'del-account'"
      :table-data="list"
      :table-head="columns"
      @on-delete="onDel"
    />

    <addAccount ref="addAccountDialog" @handleFilter="handleFilter" />
  </el-dialog>
</template>

<script>
import Datatable from '@/components/DataTable'
import baseListQuery from '@/utils/abp'
import Columns from './columns'
import AddAccount from './add-account'
// import { save, update } from '@/api/basic/airline'

export default {
  name: 'SettingAccount',
  components: {
    Datatable,
    AddAccount
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.columns = Columns.columns
  },
  methods: {
    resetFlied() {
      this.list = [{
        name: 'FX01'
      }]
    },
    handle() {
      this.resetFlied()
      this.dialogFormVisible = true
    },
    getList() {
      // this.loading = true
      // fetchList(this.listQuery).then((response) => {
      //   this.loading = false
      //   if (response) {
      //     this.list = response.data.records
      //     this.total = response.data.total
      //   }
      // })
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    onAdd() {
      this.$refs['addAccountDialog'].add()
    },
    onDel(row) {

    }
  }
}
</script>

<style lang="scss">
</style>
