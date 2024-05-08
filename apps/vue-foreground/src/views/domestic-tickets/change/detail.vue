
<template>
  <div class="app-container">
    <div class="custom-card">
      <div class="card-title">订单信息</div>
      <div class="card-box padding-2">
        <el-row>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">改签订单号</label>
              <div class="card-item-content">
                {{ detail.changeOrderNo }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">原出票订单号</label>
              <div class="card-item-content">
                {{ detail.issueOrderNo }}
              </div>
            </div>
          </el-col>
          <el-col v-if="detail.originChangeOrderNo !== null && detail.originChangeOrderNo !== undefined" :span="4">
            <div class="card-item">
              <label class="card-item-title">原改签订单号</label>
              <div class="card-item-content">
                {{ detail.originChangeOrderNo }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">订单状态</label>
              <div class="card-item-content">
                <span class="status-text">
                  {{ $t(`AdminService["Enum:ChangeOrderStatus:${detail.orderStatus}"]`)
                  }}
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-item" style="float: right; margin-right: 10px;">
              <el-button v-if="detail.orderStatus == 1" size="medium" type="success" @click="payment">
                去支付
              </el-button>
              <el-button
                v-if="detail.orderStatus == 4"
                size="small"
                type="primary"
                @click="refund"
              >
                申请退票
              </el-button>
              <el-button
                v-if="detail.orderStatus == 4"
                size="small"
                type="primary"
                @click="change"
              >
                申请改签
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">订单总金额</label>
              <div v-if="detail.paymentAmount != null" class="card-item-content">
                {{ detail.paymentAmount }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">分销商</label>
              <div v-if="detail.agentOrganizationName != null" class="card-item-content">
                {{ detail.agentOrganizationName }}
              </div>
            </div>
          </el-col>
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
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">改签类型</label>
              <div class="card-item-content">
                {{ $t(`AdminService["Enum:ChangeOrderType:${detail.changeTicketReason}"]`) }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">原客票信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table
          :data="detail.originOrderFlightBOList"
          border
          :row-class-name="'warning-row'"
          style="width: 100%"
        >
          <el-table-column
            label="航段序号"
            prop="segmentSerialNo"
            align="center"
          >
            <template slot-scope="scope">
              第{{ scope.row.segmentNumber +1 }}程
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :width="180"
            label="出发地"
            prop="departureCity"
          >
            <template slot-scope="scope">
              {{ scope.row.departureAirportName }}({{ scope.row.departureAirportCode }})
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :width="180"
            label="到达地"
            prop="destinationCity"
          >
            <template slot-scope="scope">
              {{ scope.row.arrivalAirportName }}({{ scope.row.arrivalAirportCode }})
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :width="80"
            label="航司"
            prop="carrierName"
          >
            <template slot-scope="scope">
              {{ scope.row.carrierName }}({{ scope.row.carrierNumber }})
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="flightNumber"
            label="航班号"
          />
          <el-table-column
            align="center"
            :width="180"
            prop="departureTime"
            label="起飞时间"
          />
          <el-table-column
            align="center"
            :width="180"
            prop="arrivalTime"
            label="到达时间"
          />
          <el-table-column
            align="center"
            prop="departureTerminal"
            label="出发航站楼"
          />
          <el-table-column
            align="center"
            prop="arrivalTerminal"
            label="到达航站楼"
          />
          <el-table-column
            align="center"
            prop="cabinCode"
            label="舱位"
          />
          <el-table-column
            align="center"
            prop="luggageWeight"
            label="舱位行李额"
          />
          <el-table-column
            align="center"
            prop="handLuggageWeight"
            label="手提行李额"
          />
        </el-table>
        <el-table
          :data="detail.originOrderPassengerBOList"
          border
          :row-class-name="'warning-row'"
          style="width: 100%"
        >
          <el-table-column
            label="乘机人"
            prop="firstName"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              {{ scope.row.lastName }}{{ scope.row.firstName }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="乘客类型"
            prop="departureCity"
          >
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="证件类型"
            prop="cardType"
          >
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:IdentityCardType:${scope.row.cardType}"]`) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="证件"
            prop="cardNum"
          />
          <el-table-column
            align="center"
            prop="originTicketPrice"
            label="票面价"
          >
            <template slot-scope="scope">
              {{ scope.row.changeTicketPrice !== undefined ? scope.row.changeTicketPrice : scope.row.originTicketPrice }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="soldTicketPrice"
            label="销售价"
          >
            <template slot-scope="scope">
              {{ scope.row.soldTicketPrice === undefined ? scope.row.changeSoldTicketPrice : scope.row.soldTicketPrice }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="priceDifference"
            label="改签升舱费"
          />
          <el-table-column
            align="center"
            prop="airportTax"
            label="机建/燃油"
          >
            <template slot-scope="scope">
              {{ scope.row.flightTax === undefined ? scope.row.changeFlightTax : scope.row.flightTax }} | {{ scope.row.fuelTax === undefined ? scope.row.changeFuelTax : scope.row.fuelTax }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="carrierTicketNo"
            label="原票号"
          />
        </el-table>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">新客票信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table
          :data="detail.changeOrderFlightBOList"
          border
          :row-class-name="'success-row'"
          style="width: 100%"
        >
          <el-table-column
            label="航段序号"
            prop="segmentSerialNo"
            align="center"
          >
            <template slot-scope="scope">
              第{{ scope.row.segmentNumber +1 }}程
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :width="180"
            label="出发地"
            prop="departureCity"
          >
            <template slot-scope="scope">
              {{ scope.row.departureAirportName }}({{ scope.row.departureAirportCode }})
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :width="180"
            label="到达地"
            prop="destinationCity"
          >
            <template slot-scope="scope">
              {{ scope.row.arrivalAirportName }}({{ scope.row.arrivalAirportCode }})
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="航司"
            prop="carrierName"
          />
          <el-table-column
            align="center"
            prop="flightNumber"
            label="航班号"
          >
            <template slot-scope="scope">
              {{ scope.row.carrierNumber }}{{
                scope.row.flightNumber
              }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :width="180"
            prop="departureTime"
            label="起飞时间"
          />
          <el-table-column
            align="center"
            :width="180"
            prop="arrivalTime"
            label="到达时间"
          />
          <el-table-column
            align="center"
            prop="departureTerminal"
            label="出发航站楼"
          />
          <el-table-column
            align="center"
            prop="arrivalTerminal"
            label="到达航站楼"
          />
          <el-table-column
            align="center"
            prop="cabinCode"
            label="舱位"
          />
          <el-table-column
            align="center"
            prop="luggageWeight"
            label="舱位行李额"
          />
          <el-table-column
            align="center"
            prop="handLuggageWeight"
            label="手提行李额"
          />
        </el-table>
        <el-table
          :data="detail.changeOrderPassengerBOList"
          border
          :row-class-name="'success-row'"
          style="width: 100%"
        >
          <el-table-column
            label="乘机人"
            prop="passengerName"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              {{ scope.row.lastName }}{{ scope.row.firstName }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="乘客类型"
            prop="departureCity"
          >
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="证件类型"
            prop="cardType"
          >
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:IdentityCardType:${scope.row.cardType}"]`) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            :width="180"
            label="证件号"
            prop="cardNum"
          />
          <el-table-column
            align="center"
            prop="changeTicketPrice"
            label="票面价"
          />
          <el-table-column
            align="center"
            prop="changeSoldTicketPrice"
            label="销售价"
          />
          <el-table-column
            align="center"
            prop="airportTax"
            label="机建/燃油"
          >
            <template slot-scope="scope">
              {{ scope.row.changeFlightTax }} | {{ scope.row.changeFuelTax }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="airportTax"
            label="机建/燃油 差价"
          >
            <template slot-scope="scope">
              {{ scope.row.flightTaxDifference }} | {{ scope.row.fuelTaxDifference }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="serviceFeesAmount"
            label="服务费"
            class="el-link el-link--danger"
          />
          <el-table-column
            align="center"
            prop="priceDifference"
            label="升舱费"
            class="el-link el-link--danger"
          />
          <el-table-column
            align="center"
            prop="feesAmount"
            label="改签费"
            class="el-link el-link--danger"
          />
          <el-table-column
            align="center"
            prop="carrierTicketNo"
            label="新票号"
          />
        </el-table>
      </div>
    </div>

    <div class="custom-card">
      <div class="card-title">改签证明
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
          <el-table-column label="改签类型" prop="changeType">
            <template slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:ChangeOrderType:${scope.row.changeTicketReason}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column label="历史附件信息" prop="appendix">
            <template slot-scope="scope">
              <div v-if="scope.row.appendix != null" class="demo-image__preview">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.appendix"
                  :preview-src-list="srcList"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="备注信息"
            prop="remark"
          />
        </el-table>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">支付信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.paymentResp" border style="width: 100%">
          <el-table-column
            label="业务类型"
            prop="businessType"
          >
            <template>
              国内出票
            </template>
          </el-table-column>
          <el-table-column label="支付手续费" prop="feesAmount" />
          <el-table-column
            label="实付金额"
            prop="paymentAmount"
            class="el-link detail"
          />
          <el-table-column label="支付方式" prop="payChannel">
            <template v-if="scope.row.payChannel != null" slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:PayChannelType:${scope.row.payChannel}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="支付时间"
            prop="finishedTime"
          />
          <el-table-column
            prop="tradeStatus"
            label="支付状态"
          >
            <template v-if="scope.row.tradeStatus != null" slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:TradeStatus:${scope.row.tradeStatus}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="tradeNo"
            label="支付流水号"
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
            :width="360"
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
            :width="360"
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
            :width="360"
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
              v-model="detail.changeRemark"
              type="textarea"
              :rows="4"
              :readonly="true"
              clearable
            />
          </el-col>
        </el-row>
      </div>
    </div>

    <submitRefund ref="dialog" />
    <submitChange ref="changeDialog" />
    <businessLog :is="'businessLog'" v-if="detail && detail.id" :id="detail.id" :model-name="'分销管理'" :data-type="1" />
  </div>
</template>
<script>
  import RouterBack from '@/components/RouterBack/index.vue'
  import BusinessLog from '@/components/BussinessLog/index.vue'
  import { changeOrderDetail } from '@/api/domestic-tickets/change-order'
  import submitRefund from '../refund/submit-refund.vue'
  import submitChange from '../change/submit-change.vue'

  export default {
    name: 'ChangeDetail',
    components: {
      RouterBack,
      BusinessLog,
      submitRefund,
      submitChange
    },
    data() {
      return {
        loading: false,
        detail: {
        },
        srcList: []
      }
    },
    created() {
      const changeOrderNo = this.$route.query.id
      this.loading = true
      changeOrderDetail(changeOrderNo).then((response) => {
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
      refund() {
        // 判断是否可以进行提交退票
        if (this.detail.changeSuccessRefundType !== undefined && this.detail.changeSuccessRefundType !== 0) {
          this.$message.error('改签单退款类型为航司退还银行卡,不能提交退票!')
          return
        }
        this.$refs['dialog'].detail(this.detail.changeOrderNo, 1)
      },
      change() {
        // 申请改签,打开changeDialog
        this.$refs['changeDialog'].detail(this.detail.changeOrderNo, 1)
      },
      payment() {
        // 进行支付操作
        if (this.detail.paymentNo == null) {
          this.$message({
            type: 'error',
            message: '创建支付信息失败,请联系管理员重试!'
          })
        }
        // 调用支付页面 0-出票 1-改签
        this.$router.push(`/domestic-tickets/ticket-payment?orderNo=${this.detail.changeOrderNo}&type=1`)
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
