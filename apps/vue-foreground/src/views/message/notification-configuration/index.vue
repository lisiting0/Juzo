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

    <datatable
      :loading="loading"
      :mode="'select'"
      :table-key="'MessageNotification'"
      :table-data="list"
      :table-head="columns"
      @on-detail="onDetail"
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
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import TicketAgentNotificationTypeEnum from '@/enum/TicketAgentNotificationType'
import baseListQuery from '@/utils/abp'
import { fetchList, updateNotificationConfiguration } from '@/api/message/notification-configuration'

export default {
  name: 'MessageNotification',
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
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery
      }
    }
  },
  created() {
    setTimeout(() => {
      this.getList()
    }, 800)
  },
  mounted() {
    this.messageTypeOptions = Object.keys(TicketAgentNotificationTypeEnum.TicketAgentNotificationType).map(key => ({
      value: TicketAgentNotificationTypeEnum.TicketAgentNotificationType[key],
      label: this.$t(`AdminService["Enum:TicketAgentNotificationType:${TicketAgentNotificationTypeEnum.TicketAgentNotificationType[key]}"]`)
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      this.listQuery.organizationId = this.$store.state.app.user.organizationId
      fetchList(this.listQuery).then((response) => {
        if (response) {
          this.list = response.items
          this.total = response.totalCount
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    onDetail(row) {
      this.$router.push(`/message/notification-configuration-edit?id=${row.id}`)
    },
    onConfirm(rows) {
      if (rows && rows.length === 0) {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
      this.loading = true
      rows.forEach((ele, eleIndex) => {
        const json = {
          ...ele,
          enabled: true,
          organizationId: this.$store.state.app.user.organizationId
        }
        updateNotificationConfiguration(json).then((response) => {
          if (eleIndex === rows.length - 1) {
            this.loading = false
            if (response) {
              this.$message({
                message: '批量开启成功',
                type: 'success'
              })
              this.getList()
            }
          }
        }).catch(() => {
          this.loading = false
        })
      })
    },
    onCancel(rows) {
      if (rows && rows.length === 0) {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
      this.loading = true
      rows.forEach((ele, eleIndex) => {
        const json = {
          ...ele,
          enabled: false,
          organizationId: this.$store.state.app.user.organizationId
        }
        updateNotificationConfiguration(json).then((response) => {
          if (eleIndex === rows.length - 1) {
            this.loading = false
            if (response) {
              this.$message({
                message: '批量关闭成功',
                type: 'success'
              })
              this.getList()
            }
          }
        }).catch(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
