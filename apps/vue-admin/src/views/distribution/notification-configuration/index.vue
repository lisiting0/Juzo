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
          <el-form-item label="分销商" prop="ticketAgentId">
            <el-select v-model="listQuery.ticketAgentId" clearable>
              <el-option
                v-for="option in ticketAgentOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="消息类型" prop="type">
            <el-select v-model="listQuery.type" clearable>
              <el-option
                v-for="option in messageTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="状态" prop="enabled">
            <el-select v-model="listQuery.enabled" clearable>
              <el-option
                v-for="option in messageStatusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
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
      :table-key="'NotificationConfiguration'"
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
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import TicketAgentNotificationTypeEnum from '@/enum/TicketAgentNotificationType'
import baseListQuery from '@/utils/abp'
import { fetchList, deleteNotificationConfiguration } from '@/api/distribution/notification-configuration'
import { ticketAgentList } from '@/api/distribution/agent'

export default {
  name: 'NotificationConfiguration',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      messageStatusOptions: [
        {
          value: true,
          label: '开启'
        }, {
          value: false,
          label: '关闭'
        }
      ],
      messageTypeOptions: [],
      ticketAgentOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery
      }
    }
  },
  created() {
    this.getAgents()
    this.getList()
  },
  mounted() {
    this.messageTypeOptions = Object.keys(TicketAgentNotificationTypeEnum.TicketAgentNotificationType).map(key => ({
      value: TicketAgentNotificationTypeEnum.TicketAgentNotificationType[key],
      label: this.$t(`AdminService["Enum:TicketAgentNotificationType:${TicketAgentNotificationTypeEnum.TicketAgentNotificationType[key]}"]`)
    }))
    this.columns = Columns.columns
  },
  methods: {
    getAgents() {
      this.loading = true
      ticketAgentList({
        page: 1,
        limit: 1000,
        sort: ''
      }).then((response) => {
        this.loading = false
        if (response) {
          this.ticketAgentOptions = response.items.map(e => ({ value: e.id, label: e.name }))
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    getList() {
      this.loading = true
      fetchList(this.listQuery).then((response) => {
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
      this.$router.push(`/distribution/notification-configuration-create-update`)
    },
    onEdit(row) {
      this.$router.push(`/distribution/notification-configuration-create-update?id=${row.id}`)
    },
    onDelete(row) {
      this.$confirm(`确定要删除该通知配置么？`, `删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        deleteNotificationConfiguration(row.id).then(() => {
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
    }
  }
}
</script>

<style></style>
