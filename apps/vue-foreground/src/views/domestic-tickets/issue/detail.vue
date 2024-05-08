
<template>
  <div v-loading="loading" class="app-container">
    <div class="custom-card">
      <div class="card-title">订单信息</div>
      <div class="card-box padding-2">
        <el-row>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">订单号</label>
              <div class="card-item-content">
                {{ detail.ticketIssueOrderNo }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">订单状态</label>
              <div class="card-item-content">
                <span class="status-text">
                  {{ $t(`AdminService["Enum:IssueOrderStatus:${detail.orderStatus}"]`) }}
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">订单总金额</label>
              <div v-if="detail.paymentAmount != null" class="card-item-content">
                {{ detail.paymentAmount }}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-item" style="float: right;margin-right: 20px">
              <el-button v-if="detail.orderStatus == 0" size="medium" type="success" @click="payment">
                去支付
              </el-button>
              <el-button v-if="detail.orderStatus == 3" size="small" type="primary" @click="issueNotify">
                通知出票
              </el-button>
              <el-button v-if="detail.orderStatus == 3" size="small" type="primary" @click="refund">
                申请退票
              </el-button>
              <el-button v-if="detail.orderStatus == 3" size="small" type="primary" @click="change">
                申请改签
              </el-button>
              <el-button v-if="detail.orderStatus == 3" size="small" type="primary" @click="printItinerary">
                打印行程单
              </el-button>
              <el-button v-if="detail.orderStatus == 3" size="small" type="primary" @click="openVoidedList">
                作废行程单
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">预定时间</label>
              <div class="card-item-content">
                {{ detail.createTime }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">出票时间</label>
              <div class="card-item-content">
                {{ detail.successTime }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">订单来源</label>
              <div class="card-item-content">
                {{ $t(`AdminService["Enum:IssueOrderOriginType:${detail.orderOriginType}"]`) }}
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
              <label class="card-item-title">航程类型</label>
              <div class="card-item-content">
                {{ $t(`AdminService["Enum:TripType:${detail.orderFlightType}"]`) }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">产品类型</label>
              <div class="card-item-content">
                {{ detail.productType }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">报销凭证</label>
              <div class="card-item-content">
                {{ $t(`AdminService["Enum:ReimbursementType:${detail.reimbursementType}"]`) }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">航程信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.orderFlightBOList" border style="width: 100%">
          <el-table-column align="center" prop="segmentNumber" label="航程数">
            <template slot-scope="scope">
              第{{ scope.row.segmentNumber + 1 }}程
            </template>
          </el-table-column>
          <el-table-column align="center" prop="segmentType" label="去程返程">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:SegmentType:${scope.row.segmentType}"]`) }}
            </template>
          </el-table-column>
          <el-table-column label="起飞-到达" prop="depatureAirport" align="center" width="400">
            <template slot-scope="scope">
              <div>起飞：{{ scope.row.departureAirportName }}({{ scope.row.departureAirportCode }})--{{ scope.row.departureTime }}</div>
              <div>到达：{{ scope.row.arrivalAirportName }}({{ scope.row.arrivalAirportCode }})--{{ scope.row.arrivalTime }}</div>
              <div v-if="scope.row.stopNum > 0">
                经停: <span v-for="flightItem in scope.row.stopContent" :key="flightItem">{{ flightItem.stopAirport }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="航司" prop="carrierNumber" />
          <el-table-column align="center" label="航班号" prop="flightNumber" />
          <el-table-column align="center" label="舱位" prop="cabinCode" />
          <el-table-column align="center" label="舱位等级">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:CabinClassType:${scope.row.cabinLevel}"]`) }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="aircraftCode" label="机型" />
          <el-table-column align="center" prop="departureTerminal" label="出发航站楼" />
          <el-table-column align="center" prop="arrivalTerminal" label="到达航站楼" />
          <el-table-column align="center" prop="luggageWeight" label="行李额" />
          <el-table-column align="center" prop="handLuggageWeight" label="手提行李额" />
        </el-table>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">乘客信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.orderPassengerBOList" border style="width: 100%">
          <el-table-column width="135" label="退票状态" prop="refundStatusContent">
            <template slot-scope="scope">
              {{ scope.row.refundStatusContent !== '' ? scope.row.refundStatusContent:'无' }}
            </template>
          </el-table-column>
          <el-table-column label="乘客类型" prop="passengerType">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
            </template>
          </el-table-column>
          <el-table-column width="100" label="姓名">
            <template slot-scope="scope">{{ scope.row.lastName }}{{ scope.row.firstName }}</template>
          </el-table-column>
          <el-table-column width="100" label="证件类型" prop="cardType">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:IdentityCardType:${scope.row.cardType}"]`) }}
              <el-popover v-if="scope.row.cardType !== 0" placement="top-start" width="200" trigger="hover">
                <p>国籍:{{ scope.row.nationality }}</p>
                <p>签发地:{{ scope.row.cardIssuePlace }}</p>
                <p>证件有效期:{{ scope.row.cardExpired }}</p>
                <el-link slot="reference" type="success">详情</el-link>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column width="120" label="证件号" prop="cardNum" />
          <el-table-column width="100" prop="birthday" label="出生日期" />
          <el-table-column width="120" prop="phone" label="手机号" />
          <el-table-column width="80" prop="gender" label="性别">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:GenderType:${scope.row.gender}"]`) }}
            </template>
          </el-table-column>
          <el-table-column prop="serviceFeesAmount" label="服务费" />
          <el-table-column prop="originTicketPrice" label="票面价" />
          <el-table-column prop="soldTicketPrice" label="销售价" />
          <el-table-column prop="airportTax" label="基建/燃油">
            <template slot-scope="scope">
              <div>{{ scope.row.flightTax }}</div>
              <div>{{ scope.row.fuelTax }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="carrierTicketNo" label="票号" />
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
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status ? '停止销售' : '正常销售' }}
            </template>
          </el-table-column>
          <el-table-column prop="insuranceCoverage" label="保额" />
          <el-table-column prop="insuranceSalePrice" label="销售价格" />
          <el-table-column prop="number" label="购买份数" />
        </el-table>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">联系人信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.orderContactBO" border style="width: 100%" class="mt-15">
          <el-table-column label="联系人" prop="contactName" />
          <el-table-column label="手机号" prop="contactPhone" />
          <el-table-column label="邮箱" prop="contactEmail" />
        </el-table>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">支付信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.paymentResp" border style="width: 100%">
          <el-table-column label="业务类型" prop="businessType">国内机票</el-table-column>
          <el-table-column label="支付手续费" prop="feesAmount" />
          <el-table-column label="实付金额" prop="paymentAmount" />
          <el-table-column label="支付方式">
            <template v-if="scope.row.payChannel != null" slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:PayChannelType:${scope.row.payChannel}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column label="支付时间" prop="finishedTime" />
          <el-table-column prop="tradeStatus" label="支付状态">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:TradeStatus:${scope.row.tradeStatus}"]`) }}
            </template>
          </el-table-column>
          <el-table-column prop="tradeNo" label="支付流水号" />
        </el-table>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">机票退改规定</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.orderGuestRuleBOList" border style="width: 100%">
          <el-table-column
            label="客票类型"
            prop="passengerType"
          >
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
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
            <el-input v-model="detail.remark" type="textarea" :rows="4" :readonly="true" clearable />
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="visible"
      width="32%"
    >
      <span>请选择你需要报废的行程单票号</span>
      <template>
        <el-table
          :data="ticketUseProveStatusList"
          style="width: 100%"
        >
          <el-table-column
            prop="carrierTicketNo"
            label="票号"
            width="180"
          />
          <el-table-column
            prop="ticketProveNumber"
            label="行程单号"
            width="180"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.ticketProveNumber === undefined || scope.row.ticketProveNumber === null">
                没有绑定行程单
              </span>
              <span v-if="scope.row.ticketProveNumber !== undefined">
                {{ scope.row.ticketProveNumber }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="edit"
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button v-if="scope.row.ticketProveNumber !== undefined && scope.row.ticketProveNumber !== null" size="small" type="primary" @click="voidedItinerary(scope.row.carrierTicketNo)">
                作废行程单
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>

    <submitRefund ref="dialog" />
    <submitChange ref="changeDialog" />
    <businessLog :is="'businessLog'" v-if="detail && detail.id" :id="detail.id" :model-name="'分销管理'" :data-type="0" />
    <notificationPreview ref="notificationDialog" />
  </div>
</template>
<script>
  import RouterBack from '@/components/RouterBack/index.vue'
  import BusinessLog from '@/components/BussinessLog/index.vue'
  import { issueOrderDetail, voidedTicketProve, issueTicketQueryInfoNo } from '@/api/domestic-tickets/issue-order'
  import { fetchList } from '@/api/message/notification-configuration'
  import submitRefund from '../refund/submit-refund.vue'
  import submitChange from '../change/submit-change.vue'
  import notificationPreview from './notification-preview.vue'

  export default {
    name: 'IssueDetail',
    components: {
      RouterBack,
      BusinessLog,
      submitRefund,
      submitChange,
      notificationPreview
    },
    data() {
      return {
        loading: false,
        detail: {},
        ticketCallbackList: [],
        rules: {
        },
        visible: false,
        ticketUseProveStatusList: [],
        notificationConfig: null
      }
    },
    created() {
      this.getIssueOrderDetail()
      this.getNotificationConfig()
    },
    mounted() {
    },
    methods: {
      getIssueOrderDetail() {
        this.loading = true
        issueOrderDetail(this.$route.query.ticketIssueOrderNo).then((response) => {
          this.detail = response.data
          this.loading = false
        })
      },
      getNotificationConfig() {
        this.loading = true
        fetchList({
          type: 0,
          enabled: true,
          organizationId: this.$store.state.app.user.organizationId,
          page: 1,
          limit: 1000
        }).then((response) => {
          this.loading = false
          if (response) {
            this.notificationConfig = response.items[0]
          }
        }).catch(() => {
          this.loading = false
        })
      },
      issueNotify() {
        if (!this.notificationConfig) {
          this.$message.error('暂无消息通知配置，请到消息中心->消息通知配进行配置')
          return
        }
        this.$refs['notificationDialog'].detail(this.detail)
        // this.$confirm('确定需要对该订单进行出票通知操作么？', '出票通知', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   center: true
        // }).then(() => {
        //   issueSuccessNotify(this.detail.ticketIssueOrderNo).then((response) => {
        //     if (response.status === '200') {
        //       this.$message({
        //         type: 'success',
        //         message: '通知成功!'
        //       })
        //     }
        //   }).catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '通知失败'
        //     })
        //   })
        // })
      },
      change() {
        // 申请改签,打开changeDialog
        this.$refs['changeDialog'].detail(this.detail.ticketIssueOrderNo, 0)
      },
      refund() {
        this.$refs['dialog'].detail(this.detail.ticketIssueOrderNo, 0)
      },
      printItinerary() {
        // 跳转到打印行程单页面
        this.$router.push(`/ticket/itinerary-printing?orderNo=${this.detail.ticketIssueOrderNo}&type=0`)
      },
      voidedItinerary(data) {
        this.$confirm('确定要进行作废行程单处理吗？', '作废行程单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          voidedTicketProve(data).then((response) => {
            if (response.status === '200') {
              this.$message.success('报废成功!')
              this.openVoidedList()
            }
          })
        })
      },
      openVoidedList() {
        this.visible = true
        // 查询一下订单所有的票号是否有效的行程单
        issueTicketQueryInfoNo(this.detail.ticketIssueOrderNo).then((response) => {
          if (response.status === '200') {
            // 数据展示
            this.ticketUseProveStatusList = response.data
          }
        })
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
        this.$router.push(`/domestic-tickets/ticket-payment?orderNo=${this.detail.ticketIssueOrderNo}&type=0`)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .custom-box {
    padding: 20px 0 0;
    border: 1px dashed lightblue;
    margin: 10px 0;
  }</style>
