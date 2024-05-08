<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="日期条件" prop="dateRange">
            <div class="div-flex">
              <el-date-picker
                v-model="listQuery.dateRange"
                format="yyyy年-MM月-dd日"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航变类型" prop="flightChangeType">
            <el-select
              v-model="listQuery.flightChangeType"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in flightChangeCategoryTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="通知状态" prop="status">
            <el-select v-model="listQuery.status" clearable>
              <el-option
                v-for="env in flightChangeOrderStatusTypeOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="原航班号" prop="originFlightNumber">
            <el-input
              v-model="listQuery.originFlightNumber"
              placeholder="请输入原航班号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="原起飞机场" prop="originDepartureAirport">
            <el-select
              v-model="listQuery.originDepartureAirport"
              filterable
              clearable
            >
              <el-option
                v-for="item in airports"
                :key="item.id"
                :label="item.airportName + '(' + item.airportCode + ')'"
                :value="item.airportCode"
              >
                <span style="float: left">{{ item.airportName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.airportCode
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="原达到机场" prop="originArrivalAirport">
            <el-select
              v-model="listQuery.originArrivalAirport"
              filterable
              clearable
            >
              <el-option
                v-for="item in airports"
                :key="item.id"
                :label="item.airportName + '(' + item.airportCode + ')'"
                :value="item.airportCode"
              >
                <span style="float: left">{{ item.airportName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.airportCode
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="handleFilter()">查询</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">新增</el-button>
    </el-row>

    <datatable
      mode="editDelete"
      :loading="loading"
      :table-key="'flightChangeNotification'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-detail="onDetail"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <FlightChangeNotificationCreateUpdate
      ref="dialog"
      @handleFilter="handleFilter"
    />
    <AssociateOrderDiolag
      ref="associateOrderDialog"
      @handleFilter="handleFilter"
    />
    <NotificationDialog ref="notificationDialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import FlightChangeNotificationCreateUpdate from './create-update.vue'
import AssociateOrderDiolag from './associate-order.vue'
import NotificationDialog from './notification-dialog.vue'
import FlightChangeCategoryTypeEnum from '@/enum/FlightChangeCategoryType'
import FlightChangeOrderStatusTypeEnum from '@/enum/FlightChangeOrderStatusType'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import { fetchList } from '@/api/flight-change-notification/flight-change-notification'
// import { Message, Notification } from 'element-ui'
import { airportList } from '@/api/basic/airport'

export default {
  name: 'FlightChangeNotification',
  components: {
    Datatable,
    Pagination,
    FlightChangeNotificationCreateUpdate,
    AssociateOrderDiolag,
    NotificationDialog
  },
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      flightChangeCategoryTypeOptions: [],
      flightChangeOrderStatusTypeOptions: [],
      columns: [],
      airports: [],
      list: [
        {
          originFlightInfo: '',
          newFlightInfo: ''
        }
      ],
      total: 0,
      noPageQuery: {
        current: -1,
        size: -1
      },
      listQuery: {
        startTime: '',
        endTime: '',
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList()
    this.getAllAirport()
  },
  mounted() {
    this.columns = Columns.columns
    this.flightChangeCategoryTypeOptions = Object.keys(
      FlightChangeCategoryTypeEnum.FlightChangeCategoryType
    ).map((key) => ({
      value: FlightChangeCategoryTypeEnum.FlightChangeCategoryType[key],
      label: this.$t(`AdminService["Enum:FlightChangeCategoryType:${FlightChangeCategoryTypeEnum.FlightChangeCategoryType[key]}"]`) }))
    this.flightChangeOrderStatusTypeOptions = Object.keys(
      FlightChangeOrderStatusTypeEnum.FlightChangeOrderStatusType
    ).map((key) => ({
      value: FlightChangeOrderStatusTypeEnum.FlightChangeOrderStatusType[key],
      label: this.$t(`AdminService["Enum:FlightChangeOrderStatusType:${FlightChangeOrderStatusTypeEnum.FlightChangeOrderStatusType[key]}"]`)
    }))
  },
  methods: {
    getList() {
      if (this.listQuery.dateRange) {
        this.listQuery.startTime = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.endTime = this.listQuery.dateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.startTime = null
        this.listQuery.endTime = null
      }
      this.loading = true
      fetchList(this.listQuery)
        .then((response) => {
          this.loading = false
          if (response.status === '200') {
            this.list = response.data.records
            this.total = response.data.total
            this.list.forEach((element) => {
              if (!element.newFlightNumber) {
                element.newFlightNumber = '--'
              }
              if (!element.newDepartureTime) {
                element.newDepartureTime = '--'
              }
              if (!element.newArrivalTime) {
                element.newArrivalTime = '--'
              }
              if (element.originDepartureAirport) {
                element.originFlightInfo =
                  element.originDepartureAirport +
                  '-' +
                  element.originArrivalAirport
              } else {
                element.originFlightInfo = '--'
              }
              if (element.newDepartureAirport) {
                element.newFlightInfo =
                  element.newDepartureAirport + '-' + element.newArrivalAirport
              } else {
                element.newFlightInfo = '--'
              }
            })
          }
        })
        .catch((error) => {
          this.loading = false
          throw error
        })
    },
    getAllAirport() {
      this.loading = true
      airportList(this.noPageQuery)
        .then((response) => {
          this.loading = false
          if (response.status === '200') {
            this.airports = response.data.records
          }
        })
        .catch((error) => {
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
      this.$refs['notificationDialog'].handleOpen(row)
    },
    onDetail(row) {
      this.$refs['associateOrderDialog'].handleOpen(row)
    }
  }
}
</script>

<style></style>
