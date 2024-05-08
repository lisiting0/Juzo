<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请时间" prop="dateRange">
            <el-date-picker
              v-model="listQuery.dateRange"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单状态" prop="orderStatus">
            <el-select v-model="listQuery.orderStatus" clearable>
              <el-option
                v-for="option in refundStatusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="退票类型" prop="isVolunteer">
            <el-select v-model="listQuery.isVolunteer" clearable>
              <el-option
                v-for="option in refundTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="出票订单号" prop="issueOrderNo">
            <el-input v-model="listQuery.issueOrderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="退票订单号" prop="refundOrderNo">
            <el-input v-model="listQuery.refundOrderNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="PNR" prop="pnr">
            <el-input v-model="listQuery.pnr" clearable />
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
      mode="detail"
      :table-key="'Refund'"
      :table-data="list"
      :table-head="columns"
      @on-detail="onDetail"
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
  import baseListQuery from '@/utils/abp'
  import RefundStatusEnum from '@/enum/RefundStatus'
  import RefundTypeEnum from '@/enum/RefundType'
  import Columns from './columns'
  import { fetchList } from '@/api/domestic-tickets/refund-order'

  export default {
    name: 'Refund',
    components: {
      Datatable,
      Pagination
    },
    data() {
      return {
        loading: false,
        refundStatusOptions: [],
        refundTypeOptions: [],
        columns: [],
        list: [
        ],
        total: 0,
        listQuery: {
          ...baseListQuery
        }
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      this.refundStatusOptions = Object.keys(RefundStatusEnum.RefundStatus).map(key => ({
        value: RefundStatusEnum.RefundStatus[key],
        label: key
      }))
      this.refundTypeOptions = Object.keys(RefundTypeEnum.RefundType).map(key => ({
        value: RefundTypeEnum.RefundType[key],
        label: key
      }))
      this.columns = Columns.columns
    },
    methods: {
      getList() {
        this.loading = true
        // 日期处理
        if (this.listQuery.dateRange) {
          this.listQuery.startTime = this.listQuery.dateRange[0] + ' 00:00:00'
          this.listQuery.endTime = this.listQuery.dateRange[1] + ' 23:59:59'
        } else {
          this.listQuery.startTime = null
          this.listQuery.endTime = null
        }
        fetchList(this.listQuery).then((response) => {
          this.list = response.data.records
          this.total = response.data.total
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      resetForm() {
        this.$refs.searchFormRef.resetFields()
      },
      onDetail(arg) {
        this.$router.push(`/domestic-tickets/refund-detail?id=${arg.refundOrderNo}`)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
