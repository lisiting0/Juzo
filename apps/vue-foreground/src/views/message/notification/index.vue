<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item prop="dateRange" label="发送时间">
            <el-date-picker
              v-model="listQuery.dateRange"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="orderNo" label="订单号">
            <el-input v-model.trim="listQuery.orderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="type" label="消息类型">
            <el-select v-model="listQuery.type" clearable>
              <el-option
                v-for="option in typeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="method" label="通知方法">
            <el-input v-model.trim="listQuery.method" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="target" label="通知目标">
            <el-input v-model.trim="listQuery.target" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="title" label="通知标题">
            <el-input v-model.trim="listQuery.title" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="content" label="通知内容">
            <el-input v-model.trim="listQuery.content" clearable />
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

    <datatable
      :loading="loading"
      :mode="null"
      :table-key="'Notification'"
      :table-data="list"
      :table-head="columns"
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
import { ticketAgentOrderNotificationList } from '@/api/message/ticket-agent-order-notification'
import { utcStartDate, utcEndDate } from '@/utils/tool'

export default {
  name: 'Notification',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      ticketAgentOptions: [],
      typeOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery,
        ticketAgentId: this.$store.state.app.user.id
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.typeOptions = Object.keys(TicketAgentNotificationTypeEnum.TicketAgentNotificationType).map(key => ({
      value: TicketAgentNotificationTypeEnum.TicketAgentNotificationType[key],
      label: this.$t(`AdminService["Enum:TicketAgentNotificationType:${TicketAgentNotificationTypeEnum.TicketAgentNotificationType[key]}"]`)
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      if (this.listQuery.dateRange !== undefined && this.listQuery.dateRange !== null && this.listQuery.dateRange[0] !== undefined) {
        this.listQuery.sendTimeUtcBegin = utcStartDate(this.listQuery.dateRange[0])
        this.listQuery.sendTimeUtcEnd = utcEndDate(this.listQuery.dateRange[1])
      } else {
        this.listQuery.sendTimeUtcBegin = ''
        this.listQuery.sendTimeUtcEnd = ''
      }
      ticketAgentOrderNotificationList(this.listQuery).then((response) => {
        if (response) {
          this.list = response.items
          this.total = response.totalCount
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
