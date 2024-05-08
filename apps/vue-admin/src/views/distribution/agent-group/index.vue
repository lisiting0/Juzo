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
          <el-form-item label="名称" prop="filter">
            <el-input
              v-model.trim="listQuery.filter"
              clearable
              placeholder="名称"
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

    <datatable
      :loading="loading"
      mode="editDelete"
      table-key="TicketAgentGroup"
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

    <agentGroupCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import AgentGroupCreateUpdate from './create-update'
import { ticketAgentGroupList, deleteTicketAgentGroup } from '@/api/distribution/agent-group'

export default {
  name: 'TicketAgentGroup',
  components: {
    Datatable,
    Pagination,
    AgentGroupCreateUpdate
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
      ticketAgentGroupList(this.listQuery).then((response) => {
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
      this.$confirm(`确定需要删除该等级${row.name}么？`, '删除等级', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        row.isActive = !row.isActive
        deleteTicketAgentGroup(row.id).then(response => {
          if (response) {
            this.handleFilter(true)
            this.$message({
              type: 'success',
              message: '删除等级成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除等级'
        })
      })
    }
  }
}
</script>

<style></style>
