<template>
  <div class="app-container">
    <div style="margin-bottom: 10px; font-style: normal">
      配置支付渠道手续费
    </div>
    <template>
      <el-table
        v-loading="loading"
        :data="list"
        border
        style="width: 100%"
      >
        <el-table-column prop="payChannel" label="支付渠道">
          <template
            v-if="scope.row.payChannel != null"
            slot-scope="scope"
          >
            {{
              $t(
                `AdminService["Enum:PayChannelType:${scope.row.payChannel}"]`
              )
            }}
          </template>
        </el-table-column>
        <el-table-column prop="channelFeesServiceType" label="业务类型">
          <template slot-scope="scope">
            {{
              $t(
                `AdminService["Enum:PayBusinessOrderType:${scope.row.channelFeesServiceType}"]`
              )
            }}
          </template>
        </el-table-column>
        <el-table-column prop="feesRate" label="手续费比率(百分比%)">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.feesRate"
              :precision="2"
              :step="0.1"
              :max="100"
              :min="0"
            />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              v-loading="updateLoading"
              type="primary"
              @click="updateFees(scope.row)"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { queryPaymentFeesList, updatePaymentFees } from '@/api/configuration/payment-fees'

export default {
  name: 'PaymentConfiguration',
  components: {
  },
  data() {
    return {
      loading: false,
      updateLoading: false,
      list: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList() {
      this.loading = true
      queryPaymentFeesList().then((response) => {
        this.loading = false
        if (response) {
          this.list = response.data
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    updateFees(row) {
      this.updateLoading = true
      updatePaymentFees(row).then((response) => {
        if (response) {
          this.updateLoading = false
          this.getList()
        }
      }).catch((error) => {
        this.updateLoading = false
        throw error
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
