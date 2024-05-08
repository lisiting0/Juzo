
<template>
  <div v-loading="loading" class="app-container">
    <div class="custom-card">
      <div class="card-title">订单信息</div>
      <div class="card-box padding-2">
        <el-row>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">退票订单号</label>
              <div class="card-item-content">
                <span class="el-link el-link--primary">{{
                  detail.ticketRefundOrderNo
                }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">原出票订单号</label>
              <div class="card-item-content">
                {{ detail.originIssueOrderNo }}
              </div>
            </div>
          </el-col>
          <el-col v-if="detail.originChangeOrderNo" :span="4">
            <div class="card-item">
              <label class="card-item-title">原改签订单号</label>
              <div class="card-item-content">
                {{ detail.originChangeOrderNo }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="card-item">
              <label class="card-item-title">订单状态</label>
              <div class="card-item-content">
                <span class="status-text">
                  {{ $t(`AdminService["Enum:RefundOrderStatusType:${detail.orderStatus}"]`) }}
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">分销商</label>
              <div class="card-item-content">
                {{ detail.agentOrganizationName }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">申请时间</label>
              <div class="card-item-content">
                {{ detail.createTime }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">成人PNR</label>
              <div class="card-item-content">
                {{ detail.adultPnr }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">儿童PNR</label>
              <div class="card-item-content">
                {{ detail.childPnr }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="card-item">
              <label class="card-item-title">退票理由</label>
              <div v-if="detail.isVolunteer === 0" class="card-item-content">
                客人自愿退票，按客规收取手续费
              </div>
              <div v-if="detail.isVolunteer === 1 && detail.refundTicketReason == null" class="card-item-content">
                非自愿退票
              </div>
              <div v-if="detail.isVolunteer === 1 && detail.refundTicketReason != null" class="card-item-content">
                {{ $t(`AdminService["Enum:RefundReasonType:${detail.refundTicketReason}"]`) }}
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="6">
            <div class="card-item">
              <label class="card-item-title">备注</label>
              <div class="card-item-content">
                {{ detail.refundTicketRemark }}
              </div>
            </div>
          </el-col> -->
        </el-row>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">机票信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table
          :data="detail.refundTicketBOList"
          border
          show-summary
          :summary-method="getSummaries"
          :row-class-name="'warning-row'"
          style="width: 100%"
        >
          <el-table-column
            :width="180"
            label="票号"
            prop="carrierTicketNo"
            align="center"
          />
          <el-table-column
            align="center"
            label="乘机人"
            prop="passengerName"
          >
            <template slot-scope="scope">
              {{ scope.row.lastName }}{{ scope.row.firstName }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="乘机人类型"
            prop="passengerType"
          >
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="起飞时间"
            prop="departureTime"
            :width="180"
            :render-header="(h, obj) => renderHeader(h, obj, '航段')"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.orderFlightBO.departureTime }}</div>
              <div>{{ scope.row.orderFlightBO.departureAirportCode }} - {{ scope.row.orderFlightBO.arrivalAirportCode }}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="航班号"
            prop="flightNo"
            :render-header="(h, obj) => renderHeader(h, obj, '舱位')"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.orderFlightBO.flightNumber }}</div>
              <div>{{ scope.row.orderFlightBO.cabinCode }}</div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="originTicketPrice"
            label="票面价"
          />
          <el-table-column
            align="center"
            prop="soldTicketPrice"
            label="销售价"
          />
          <el-table-column
            align="center"
            prop="flightTax"
            label="机建"
          />
          <el-table-column
            align="center"
            prop="fuelTax"
            label="燃油"
          />
          <el-table-column
            align="center"
            prop="serviceFeesAmount"
            label="服务费"
          >
            <template slot-scope="scope">
              {{ scope.row.serviceFeesAmount ? scope.row.serviceFeesAmount : scope.row.changeServiceFeesAmount }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="changePriceDifference"
            label="改签升舱费"
          />
          <el-table-column
            align="center"
            prop="changeFeesAmount"
            label="改签手续费"
          />
          <el-table-column
            align="center"
            prop="paymentAmount"
            label="实付金额"
          />
          <el-table-column
            align="center"
            prop="feesAmount"
            label="退票手续费"
          />
          <el-table-column
            align="center"
            prop="feesRate"
            label="退票费率"
          >
            <template slot-scope="scope">
              {{ scope.row.feesRate }}%
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="refundAmount"
            label="应退金额"
          />
        </el-table>
        <el-table
          :data="detail.orderContactBO"
          border
          :row-class-name="'warning-row'"
          style="width: 100%; margin-top: 15px"
        >
          <el-table-column
            label="联系人"
            prop="contactName"
            align="center"
            width="200"
          />
          <el-table-column
            align="center"
            label="手机号"
            prop="contactPhone"
          />
          <el-table-column
            align="center"
            label="邮箱"
            prop="contactEmail"
          />
        </el-table>
      </div>
    </div>

    <div class="custom-card">
      <div class="card-title">保险信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.orderInsuranceList" border style="width: 100%">
          <el-table-column prop="passengerName" label="乘机人" />
          <el-table-column prop="insuranceCompany" label="保险公司" />
          <el-table-column prop="insuranceName" label="保险名称" />
          <el-table-column prop="insuranceType" label="保险类型">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:InsuranceType:${scope.row.insuranceType}"]`) }}
            </template>
          </el-table-column>
          <el-table-column prop="insuranceCoverage" label="保额" />
          <el-table-column prop="insuranceSalePrice" label="销售价格" />
          <el-table-column prop="number" label="购买份数" />
          <el-table-column prop="number" label="退款保险金额">
            <template slot-scope="scope">
              {{ scope.row.insuranceSalePrice * scope.row.number }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div>
      <div class="custom-card">
        <div class="card-title">退票证明
        </div>
        <div class="card-box" style="padding: 15px 10px">
          <el-table
            :data="detail.appendixList"
            border
            style="width: 100%"
          >
            <el-table-column
              label="上传时间"
              prop="createTime"
            />
            <el-table-column label="退票类型" prop="refundIsVolunteer">
              <template slot-scope="scope">
                {{
                  $t(
                    `AdminService["Enum:RefundType:${scope.row.refundIsVolunteer}"]`
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column label="退票原因" prop="refundTicketReason">
              <template v-if="scope.row.refundTicketReason != null" slot-scope="scope">
                {{
                  $t(
                    `AdminService["Enum:RefundReasonType:${scope.row.refundTicketReason}"]`
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column label="历史附件信息" prop="appendix">
              <template slot-scope="scope">
                <div v-if="scope.row.appendix != null && scope.row.appendix != undefined" class="demo-image__preview">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.appendix"
                    :preview-src-list="srcList"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              prop="remark"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  title="备注"
                  width="500"
                  trigger="hover"
                  :content="scope.row.remark"
                >
                  <el-link slot="reference" :underline="false">{{ scope.row.remark | substringText }}</el-link>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">退款信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.refundRespList" border style="width: 100%">
          <el-table-column
            label="业务类型"
            prop="businessType"
          >国内退票</el-table-column>
          <el-table-column
            label="实退金额"
            prop="refundAmount"
            class="el-link el-link--danger"
          />
          <el-table-column
            label="退款路径"
            prop="refundRoute"
          >
            <template slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:PayChannelType:${scope.row.payChannel}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="退款时间"
            prop="refundTime"
          />
          <el-table-column
            prop="refundStatus"
            label="退款状态"
          >
            <template slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:RefundStatus:${scope.row.refundStatus}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="refundNo"
            label="退款流水号"
          />
        </el-table>
      </div>
    </div>

    <div class="custom-card">
      <div class="card-title">机票退改签规定</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.orderGuestRuleBOList" border style="width: 100%">
          <el-table-column
            label="客票类型"
            prop="passengerType"
          >
            <template slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:PassengerType:${scope.row.passengerType}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="行程"
            prop="orderFlightBO"
          >
            <template slot-scope="scope">
              {{ scope.row.orderFlightBO.departureCityNameCn }} - {{ scope.row.orderFlightBO.arrivalCityNameCn }}
            </template>
          </el-table-column>
          <el-table-column
            label="自愿退票规定"
            prop="refundPriceRuleList"
          >
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.refundPriceRuleList" :key="index">
                航班预计离站时间前{{ item.beforeMinDistanceHours }}小时（含）前,费率: {{ item.feesRate * 100 }}%
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="自愿改期规定"
            prop="changePriceRuleList"
          >
            <template slot-scope="scope">
              <div v-for="(item, index) in scope.row.changePriceRuleList" :key="index">
                航班预计离站时间前{{ item.beforeMinDistanceHours }}小时（含）前,费率: {{ item.feesRate * 100 }}%
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="退改说明"
            prop="refundChangeContent"
          />
        </el-table>
      </div>
    </div>
    <div align="center" class="mt-15">
      <routerBack />
    </div>
    <div class="custom-card">
      <div class="card-title">订单备注</div>
      <div class="card-box">
        <el-row>
          <el-col :span="8" style="padding: 0 15px 15px">
            <el-input
              v-model="detail.refundTicketRemark"
              type="textarea"
              :rows="4"
              :readonly="true"
              clearable
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <businessLog :id="detail.id" :model-name="'分销管理'" :data-type="2" /> -->
    <businessLog :is="'businessLog'" v-if="detail && detail.id" :id="detail.id" :model-name="'分销管理'" :data-type="2" />
  </div>
</template>
<script>
  import RouterBack from '@/components/RouterBack/index.vue'
  import BusinessLog from '@/components/BussinessLog/index.vue'
  import { refundOrderDetail } from '@/api/domestic-tickets/refund-order'

  export default {
    name: 'RefundDetail',
    components: {
      RouterBack,
      BusinessLog
    },
    data() {
      return {
        loading: false,
        detail: {},
        refundConfirm: {},
        srcList: []
      }
    },
    created() {
      const orderNo = this.$route.query.id
      this.loading = true
      refundOrderDetail(orderNo).then((response) => {
        if (response.status === '200') {
          // 赋值
          this.detail = response.data
          // 图片预览地址
          this.srcList = response.data.appendixList.map(function(item) { return item.appendix })
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    mounted() {
    },
    methods: {
      renderHeader(h, { column, $index }, secondLabel) {
        return h('div', [
          h('div', column.label),
          h('div', secondLabel)
        ])
      },
      getSummaries(param) {
        // 列表数据
        const { columns, data } = param
        // 定义新的数组接收
        const sums = []
        columns.forEach((column, index) => {
          // 定义第一列的底部是' 总计'
          if (index === 0) {
            sums[0] = '总计'
            return
          }
          // 循环列表数据得到我们的各个行与列的数据
          const values = data.map(item => Number(item[column.property]))
          // 通过prop找到你需要计算的列。
          if (column.property === 'soldTicketPrice' ||
            column.property === 'originTicketPrice' ||
            column.property === 'fuelTax' ||
            column.property === 'flightTax' ||
            column.property === 'insuranceAmount' ||
            column.property === 'refundRate' ||
            column.property === 'feesRate' ||
            column.property === 'feesAmount' ||
            column.property === 'changeFeesAmount' ||
            column.property === 'paymentAmount' ||
            column.property === 'refundAmount') {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index]
            // 定义一个值接收得到的总计的数值
            // this.contaddsum = sums[index].toFixed(3)
          } else {
            sums[index] = '-'
          }
        })
        // 得到返回值
        return sums
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
