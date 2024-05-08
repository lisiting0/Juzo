<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="日期条件" prop="timeQueryType">
            <div class="div-flex">
              <el-select v-model="listQuery.timeQueryType" clearable>
                <el-option
                  v-for="option in dateTypeOptions"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </el-select>
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
          <el-form-item label="分销商" prop="agentOrganizationName">
            <el-input v-model="listQuery.agentOrganizationName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单状态" prop="orderStatus">
            <el-select v-model="listQuery.orderStatus" filterable clearable>
              <el-option
                v-for="option in orderStatusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航程类型" prop="orderFlightType">
            <el-select v-model="listQuery.orderFlightType" filterable clearable>
              <el-option
                v-for="option in orderFlightTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航司" prop="carrierNumber">
            <el-select v-model="listQuery.carrierNumber" filterable clearable>
              <el-option
                v-for="option in carrierListOptions"
                :key="option.carrierCode"
                :value="option.carrierCode"
                :label="option.carrierName + '(' + option.carrierCode + ')'"
              >
                <span style="float: left">{{ option.carrierName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  option.carrierCode
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航班号" prop="flightNumber">
            <el-input v-model="listQuery.flightNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="起飞城市" prop="departureCityName">
            <el-select
              v-model="listQuery.departureCityName"
              filterable
              clearable
            >
              <el-option
                v-for="option in cityListOptions"
                :key="option.cityCode"
                :value="option.cityCode"
                :label="option.cityNameCn + '(' + option.cityCode + ')'"
              >
                <span style="float: left">{{ option.cityNameCn }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  option.cityCode
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="到达城市" prop="arrivalCityName">
            <el-select v-model="listQuery.arrivalCityName" filterable clearable>
              <el-option
                v-for="option in cityListOptions"
                :key="option.cityCode"
                :value="option.cityCode"
                :label="option.cityNameCn + '(' + option.cityCode + ')'"
              >
                <span style="float: left">{{ option.cityNameCn }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  option.cityCode
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单号" prop="orderNo">
            <el-input v-model="listQuery.orderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="乘机人" prop="passengerName">
            <el-input v-model="listQuery.passengerName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="票号" prop="carrierTicketNo">
            <el-input v-model="listQuery.carrierTicketNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="pnr" prop="pnr">
            <el-input v-model="listQuery.pnr" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="handleFilter()"> 查询 </el-button>
            <el-button type="info" @click="resetForm"> 重置 </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onCreate()">手工创单</el-button>
      <el-button type="primary" size="small" @click="onCreateTicketIssue()">创建已出票订单</el-button>
    </el-row>

    <datatable
      mode="edit"
      :loading="loading"
      :table-key="'issue'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-detail="onDetail"
      @on-delete="onCancel"
      @on-unlock="onUnLock"
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
import Enum from '@/enum/enum'
import Columns from './columns'
import { fetchList } from '@/api/agent/issue-order'
import baseListQuery from '@/utils/abp'
import {
  issueOrderCancel,
  lockIssueOrder,
  unLockIssueOrder
} from '@/api/agent/issue-order'
import { fetchList as getCarrierListNoPage } from '@/api/basic/airline'
import { cityList as getcityListNoPage } from '@/api/city/city'

export default {
  name: 'Issue',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      dateTypeOptions: [
        {
          value: 0,
          label: '创建时间'
        },
        {
          value: 1,
          label: '起飞时间'
        },
        {
          value: 2,
          label: '出票时间'
        }
      ],
      dateType: 2,
      orderStatusOptions: [],
      orderFlightTypeOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        timeStarter: '',
        timeEnd: '',
        ...baseListQuery
      },
      listQueryNoPage: {
        size: -1,
        current: -1
      },
      cityListOptions: [],
      carrierListOptions: []
    }
  },
  created() {
    this.getList()
    this.getCarrierList()
    this.getcityList()
  },
  mounted() {
    this.orderStatusOptions = Enum.issueStatusOptions
    this.orderFlightTypeOptions = Enum.tripTypeOptions
    this.columns = Columns.columns
  },
  methods: {
    getCarrierList() {
      getCarrierListNoPage(this.listQueryNoPage).then((response) => {
        this.carrierListOptions = response.data.records
      })
    },
    getcityList() {
      getcityListNoPage(this.listQueryNoPage).then((response) => {
        this.cityListOptions = response.data
      })
    },
    getList() {
      this.loading = true
      if (this.listQuery.dateRange) {
        this.listQuery.timeStarter = this.listQuery.dateRange[0] + ' 00:00:00'
        this.listQuery.timeEnd = this.listQuery.dateRange[1] + ' 23:59:59'
      } else {
        this.listQuery.timeStarter = null
        this.listQuery.timeEnd = null
      }
      fetchList(this.listQuery)
        .then((response) => {
          if (response.status === '200') {
            this.list = response.data.records
            this.total = response.data.total
          }
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          throw error
        })
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
      this.listQuery.timeQueryType = '' // 清空字段的值
    },
    onCreate() {
      this.$router.push(`/distribution/issue-create`)
    },
    onCreateTicketIssue() {
      this.$router.push(`/distribution/issue-create-ticket-issued`)
    },
    onEdit(arg) {
      // 锁定
      lockIssueOrder(arg.id)
        .then((response) => {
          if (response.status === '200') {
            this.$router.push(
              `/distribution/issue-detail?ticketIssueOrderNo=${arg.ticketIssueOrderNo}&status=1`
            )
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '锁定出票订单失败!'
          })
        })
    },
    onDetail(arg) {
      this.$router.push(
        `/distribution/issue-detail?ticketIssueOrderNo=${arg.ticketIssueOrderNo}&status=0`
      )
    },
    onCancel(row) {
      this.$confirm('确定需要对该出票订单进行取消操作么？', '取消出票订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        issueOrderCancel(row.ticketIssueOrderNo)
          .then((response) => {
            debugger
            console.log(response)
            if (response.status === '200') {
              this.$message({
                type: 'success',
                message: '取消订单成功!'
              })
            }
            this.handleFilter(true)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消订单失败!'
            })
          })
      })
    },
    onUnLock(row) {
      this.$confirm(
        '确定需要对该订单进行解除锁定操作么？',
        '解除锁定出票订单',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        unLockIssueOrder(row.id)
          .then((response) => {
            if (response.status === '200') {
              this.$message({
                type: 'success',
                message: '解除锁定出票订单成功!'
              })
            }
            this.handleFilter(true)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '解除锁定出票订单失败!'
            })
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.div-flex {
  display: flex;

  .el-select {
    width: 160px;
  }
}
</style>
