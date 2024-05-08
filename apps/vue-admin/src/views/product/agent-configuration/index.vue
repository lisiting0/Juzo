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
          <el-form-item label="分销商" prop="agentId">
            <el-select
              v-model="listQuery.agentId"
              filterable
              clearable
              placeholder="分销商"
            >
              <el-option
                v-for="item in agentListOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" :loading="loading" @click="handleFilter()">查询</el-button>
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
      :table-key="'AgentConfiguration'"
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
import { ticketAgentList } from '@/api/distribution/agent'
import { productAgentList, updateProductAgent } from '@/api/product/domestic-product-agent'
import ConfigurationDialog from './configuration-dialog'

export default {
  name: 'AgentConfiguration',
  components: {
    Datatable,
    ConfigurationDialog
  },
  data() {
    return {
      loading: false,
      agentListOptions: [],
      columns: [],
      list: [],
      listQuery: {}
    }
  },
  created() {
    // this.getCookie()
    this.$nextTick(() => {
      this.getTicketAgentList()
      this.getList()
    })
  },
  mounted() {
    this.columns = Columns.columns
  },
  destroyed() {
    sessionStorage.removeItem('AgentConfigurationCache')
  },
  methods: {
    getTicketAgentList() {
      ticketAgentList({ page: 1, limit: 1000 }).then(response => {
        if (response.items) {
          this.agentListOptions = response.items
        }
      })
    },
    getList() {
      this.loading = true
      console.log(this.listQuery)
      productAgentList(this.listQuery).then((response) => {
        this.loading = false
        if (response.items) {
          this.list = response.items
        }
        // this.setCookie()
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    handleFilter() {
      this.getList()
    },
    setCookie() {
      const cache = {}
      cache.listQuery = this.listQuery
      sessionStorage.setItem('AgentConfigurationCache', JSON.stringify(cache))
    },
    getCookie() {
    const cacheStr = sessionStorage.getItem('AgentConfigurationCache')
      if (!cacheStr) {
        return
      }
      const cache = JSON.parse(cacheStr)
      this.listQuery = cache.listQuery
    },
    onConfiguration(row) {
      this.$refs['configuration-dialog'].handle(row)
    },
    onDelete(row) {
      this.$confirm(`确定要${row.enabled ? '取消关联' : '关联'}${row.productName} 产品配置吗？`, '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        updateProductAgent({
            agentId: row.agentId,
            agentName: row.agentName,
            references: [
              {
                productTypeId: row.productTypeId,
                enabled: !row.enabled
              }
            ]
        }).then(() => {
          this.$message({
            type: 'success',
            message: `${row.enabled ? '取消关联' : '关联'}${row.productName}产品配置成功！！`
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
