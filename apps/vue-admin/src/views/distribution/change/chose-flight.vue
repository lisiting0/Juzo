<template>
  <el-dialog
    width="90%"
    top="3vh"
    class="choose-flight-dialog"
    :visible.sync="choseFlightVisible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    :before-close="resetDataInfo"
    @click.native.stop
  >
    <table v-loading="loadingFlag" class="booking-table" cellspacing="0" border="0" style="width: 100%;">
      <thead style="width: 100%">
        <tr>
          <td>航司</td>
          <td>起飞时间</td>
          <td>飞行时间</td>
          <td>到达时间</td>
          <td>产品规定</td>
          <td>票面价</td>
          <td>操作</td>
        </tr>
      </thead>

      <tbody style="width: 100%;">
        <template v-for="(item, index) in tableData">
          <tr :key="index" style="margin-bottom: 10px;">
            <td>
              <div class="flight-airline">
                <!-- {{ item.airline }} -->
                <span class="flight-flightNo ml-20">{{ item.airline }}{{ item.flightNo }}</span>
              </div>
              <div class="flight-normal">
                {{ item.aircraftModel }}
              </div>
            </td>
            <td>
              <div class="flight-time">
                {{ item.departureDate }}<span class="flight-flightNo"> {{ item.departureTime | substringHourMinutes }}</span>
              </div>
              <div class="flight-normal-text">{{ item.departureAirport | airportNameFilter }}({{ item.departureAirport }}){{ item.departureAirportName }}<span class="ml-5">{{ item.departureTerminal }}</span></div>
            </td>
            <td>
              <div align="center" class="flight-normal-text">
                {{ item.flightDuration | hourMinSecondReplace }}
              </div>
              <div>
                <i class="iconfont icon-straight" style="color: #909399" />
              </div>
              <div align="center">
                <el-link v-if="item.stopDetail != null && item.stopDetail.length !== 0" type="warning" :underline="false">经停:
                  <span v-for="(stopInfo, stopInfoIndex) in item.stopDetail" :key="'stopDetail' + stopInfoIndex">
                    {{ stopInfo.stopAirport }}
                  </span>
                </el-link>
              </div>
            </td>
            <td>
              <div class="flight-time">
                {{ dateAddDay(item.departureDate, item.arrivalAddDays) }}<span class="flight-flightNo"> {{ item.arrivalTime | substringHourMinutes }}</span>
              </div>
              <div class="flight-normal-text">{{ item.arrivalAirport | airportNameFilter }}({{ item.arrivalAirport }}){{ item.arrivalAirportName }}<span class="ml-5">{{ item.arrivalTerminal }}</span></div>
            </td>
            <td>
              <div class="flight-normal-text">
                是否为共享航班: {{ item.isShared === true ? '是' : '否' }}
                <div v-if="item.isShared === true">
                  实际承运航司:{{ item.operatingAirline }}
                  实际承运航班:{{ item.operatingAirline }}{{ item.operatingFlightNo }}
                </div>
              </div>
            </td>
            <td />
            <td>
              <el-button
                type="primary"
                plain
                @click="subFlightQuery(index, item)"
              >选择</el-button>
            </td>
          </tr>
          <tr :key="'table' + (index + 1)" />
          <!-- 展示对应的舱等信息 -->
          <template v-for="(detailItem, detailIndex) in expandedDetails">
            <el-collapse-transition :key="index + '-' + detailIndex">
              <tr v-show="isExpanded === index" :key="detailIndex" class="detail-bg">
                <td />
                <td>
                  <el-popover
                    placement="right-end"
                    title="行李额"
                    width="500"
                    trigger="hover"
                    :open-delay="500"
                    @show="showLuggageWeight(detailItem)"
                  >
                    <div v-if="cabinWeight.luggageWeight !== null" style="white-space: pre-wrap;margin-bottom: 15px"><span style="color: red;font-size: large">携带行李额:</span> <br>{{ cabinWeight.luggageWeight }}kg</div>
                    <div v-if="cabinWeight.handLuggageWeight !== null" style="white-space: pre-wrap;margin-bottom: 15px"><span style="color: red;font-size: large">手提行李额:</span> <br>{{ cabinWeight.handLuggageWeight }}kg</div>
                    <el-link slot="reference" type="primary">行李额(KG)</el-link>
                  </el-popover>
                </td>
                <td colspan="2">
                  <el-popover
                    placement="right-end"
                    title="退改签规定"
                    width="500"
                    trigger="hover"
                    :open-delay="500"
                    @show="showGuestRule(detailItem)"
                  >
                    <div v-if="auditChangeShowContent !== ''" style="white-space: pre-wrap;margin-bottom: 15px"><span style="color: red;font-size: large">成人改签:</span> <br>{{ auditChangeShowContent }}</div>
                    <div v-if="auditRefundShowContent !== ''" style="white-space: pre-wrap;margin-bottom: 15px"><span style="color: red;font-size: large">成人退票:</span> <br>{{ auditRefundShowContent }}</div>
                    <div v-if="childChangeShowContent !== ''" style="white-space: pre-wrap;margin-bottom: 15px"><span style="color: red;font-size: large">儿童改签:</span> <br>{{ childChangeShowContent }}</div>
                    <div v-if="childRefundShowContent !== ''" style="white-space: pre-wrap;margin-bottom: 15px"><span style="color: red;font-size: large">儿童退票:</span> <br>{{ childRefundShowContent }}</div>
                    <el-link slot="reference" type="primary">退改签规定</el-link>
                  </el-popover>
                </td>
                <td>
                  <div>
                    <el-link type="primary" :underline="false">{{ detailItem.name }}</el-link>
                  </div>
                  <div>
                    舱等:{{ $t(`AdminService["Enum:CabinClassType:${detailItem.cabinLevel}"]`) }}  ({{ detailItem.cabin }}舱)</div>
                  <div class="flight-normal-text">
                    基建：{{ detailItem.airportTax }}
                  </div>
                  <div class="flight-normal-text">燃油：{{ detailItem.fuelTax }}</div>
                </td>
                <td>
                  <div class="flight-price"><span class="flight-price-orange"><span class="rmb-text">￥</span>{{ detailItem.ticketPrice }}</span>
                  </div>
                  <div class="flight-normal-text">￥{{ detailItem.ticketPrice + detailItem.airportTax + detailItem.fuelTax }}（含税）</div>
                </td>
                <td>
                  <el-button
                    type="warning"
                    @click="flightBooking(detailItem)"
                  >确定改签
                  </el-button>
                  <span class="flight-remaining ml-10">余{{ detailItem.status >= 9? 'A' : detailItem.status }}</span>
                </td>
              </tr>
            </el-collapse-transition>
          </template>
        </template>
      </tbody>
    </table>
  </el-dialog>
</template>

<script>
  import { newChangeFlightSearch, newChangeCabinListSearch, chooseCabinPriceQuery } from '@/api/agent/change-order'
  import { flightGuestRuleSearch, flightCabinLuggageWeightSearch } from '@/api/agent/booking'

  export default {
    name: 'ChoseFlight',
    data() {
      return {
        // 展示交互数据
        loadingFlag: true,
        choseFlightVisible: false,
        changeFlightDataKey: null,
        tableData: [],
        isExpanded: false,
        // 是否拥有儿童改签
        includeChild: false,
        // 行李额展示信息
        cabinWeight: {},
        // 客规展示信息
        auditRefundShowContent: '',
        auditChangeShowContent: '',
        childRefundShowContent: '',
        childChangeShowContent: '',
        // 元订单的额policyCode
        policyCode: null,
        policyJson: null,
        reimbursementType: null,
        // 进行弹窗的传递的包含原航班的数据
        originFlightInfo: {},
        // 选择日期
        choseChangeDate: null,
        // 选择的航班下的所有舱信息
        expandedDetails: [],
        // 选择的航班信息
        choseFlightInfo: {}
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
      dateAddDay(ymd, addDay) {
        // 定义日期对象
        var date = new Date(ymd)
        // 增加一天
        date.setDate(date.getDate() + addDay)
        return date.toISOString().substring(0, 10)
      },
      // 打开选择改签航班页面
      handler(date, value, key, policyCode, includeChild, reimbursementType, policyJson, airline) {
        // 请求改签新航班数据
        this.choseFlightVisible = true
        this.changeFlightDataKey = key
        this.choseChangeDate = date
        this.policyCode = policyCode
        this.policyJson = policyJson
        this.reimbursementType = reimbursementType
        // 原航班数据 value
        this.originFlightInfo = value
        this.includeChild = includeChild
        // 查询新航班数据 , policyCode政策id 获取一下 , 使用原航程信息进行请求
        this.loadingFlag = true
        // 接口请求参数
        const requestData = {
          Airline: airline,
          Cabin: value.originCabinCode.trim(),
          DepartureCity: value.originDepartureCityCode,
          ArrivalCity: value.originArrivalCityCode,
          DepartureDate: date
        }
        if (policyCode !== null) {
          requestData.PolicyId = policyCode
          requestData.Policy = policyJson
        }
        newChangeFlightSearch(requestData).then((response) => {
          if (response) {
            // 查询接口返回的新的航程数据-mock 增加新航程数据
            this.tableData = response
          }
          this.loadingFlag = false
        })
      },
      subFlightQuery(index, item) {
        if (this.isExpanded === index) {
          console.log('相同点击拦截.........')
          this.isExpanded = false
          this.expandedDetails = []
          this.choseFlightInfo = {}
          return
        }
        this.loadingFlag = true
        // 接口请求参数
        const requestData = {
          flightId: item.flightId,
          cabin: this.originFlightInfo.originCabinCode.trim(),
          reimbursementType: this.reimbursementType
        }
        if (this.policyCode !== null) {
          requestData.policyId = this.policyCode
          requestData.policy = this.policyJson
        }
        // 查询航班下所有的舱位
        newChangeCabinListSearch(requestData).then((response) => {
          if (response) {
            // 展示
            this.expandedDetails = response
          }
          this.loadingFlag = false
        }).catch((error) => {
          this.loadiloadingFlagng = false
          throw error
        })
        this.isExpanded = index
        this.choseFlightInfo = item
      },
      // 选择航程后 回调上级页面
      flightBooking(data) {
        this.loadingFlag = true
        const chooseCabinData = { ...data }
        // 调用查询舱位下真实价格的信息
        chooseCabinPriceQuery({
          flightId: this.choseFlightInfo.flightId,
          cabinPrice: chooseCabinData,
          includeChild: this.includeChild
        }).then((response) => {
          if (response) {
            // 成人的金额
            const auditCabinPrice = response.cabinPrices.filter((value) => value.passengerType === 0)
            chooseCabinData.auditTicketPrice = auditCabinPrice[0].ticketPrice
            chooseCabinData.auditAirportTax = auditCabinPrice[0].airportTax
            chooseCabinData.auditFuelTax = auditCabinPrice[0].fuelTax
            // 儿童的金额
            const childCabinPrice = response.cabinPrices.filter((value) => value.passengerType === 1)
            chooseCabinData.childTicketPrice = childCabinPrice.length === 0 ? 0 : childCabinPrice[0].ticketPrice
            chooseCabinData.childAirportTax = childCabinPrice.length === 0 ? 0 : childCabinPrice[0].airportTax
            chooseCabinData.childFuelTax = childCabinPrice.length === 0 ? 0 : childCabinPrice[0].fuelTax
            // 婴儿的金额
            const babyCabinPrice = response.cabinPrices.filter((value) => value.passengerType === 2)
            chooseCabinData.babyTicketPrice = babyCabinPrice.length === 0 ? 0 : babyCabinPrice[0].ticketPrice

            // 关闭此弹窗, 回调submitChange方法
            response.departureTime = this.choseChangeDate + ' ' + response.departureTime
            response.arrivalTime = this.choseChangeDate + ' ' + response.arrivalTime
            // 选择航班上,拼接上原航班的相关信息
            response.originCarrierCode = this.originFlightInfo.originCarrierCode
            response.originOrderFlightId = this.originFlightInfo.originOrderFlightId
            response.originDepartureCityCode = this.originFlightInfo.originDepartureCityCode
            response.originArrivalCityCode = this.originFlightInfo.originArrivalCityCode
            response.originDepartureAirportCode = this.originFlightInfo.originDepartureAirportCode
            response.originArrivalAirportCode = this.originFlightInfo.originArrivalAirportCode
            response.originCabinCode = this.originFlightInfo.originCabinCode
            // 调用上级方法
            this.$emit('handleFilter', response, chooseCabinData, this.changeFlightDataKey)
            this.resetDataInfo()
          } else {
            this.$message.error('选择出现异常,请重试')
          }
          this.loadingFlag = false
        }).catch((error) => {
          this.loadingFlag = false
          throw error
        })
      },
      resetDataInfo() {
        this.choseFlightVisible = false
        this.changeFlightDataKey = null
        this.isExpanded = false
        this.expandedDetails = []
        this.tableData = []
        this.choseChangeDate = null
        this.choseFlightInfo = null
        this.originFlightInfo = {}
      },
      // 查询foudnation服务中-航司-舱位-对应的行李额
      showLuggageWeight(data) {
        this.cabinWeight = {}
        flightCabinLuggageWeightSearch({
          carrierCode: this.choseFlightInfo.airline,
          cabinCode: data.cabin
        }).then((response) => {
          if (response.status === '200') {
            this.cabinWeight = {
              luggageWeight: response.data.luggageWeight,
              handLuggageWeight: response.data.handLuggageWeight
            }
          } else {
            this.$message.error('查询对应的行李额失败...')
          }
        }).catch((error) => {
          throw error
        })
      },
      // 查询foundation服务中- 航司-舱位 对应的  退改签客规信息
      showGuestRule(data) {
        this.auditChangeShowContent = ''
        this.auditRefundShowContent = ''
        this.childChangeShowContent = ''
        this.childRefundShowContent = ''
        flightGuestRuleSearch({
          carrierCode: this.choseFlightInfo.airline,
          cabinCode: data.cabin,
          departureTime: this.choseFlightInfo.departureDate + ' ' + this.choseFlightInfo.departureTime
        }).then((response) => {
          if (response) {
            // 进行信息的组装展示
            for (let i = 0; i < response.data.length; i++) {
              // 退票规则
              if (response.data[i].guestRuleType === 0) {
                if (response.data[i].passengerType === 0) {
                  // 成人
                  this.auditRefundShowContent = this.auditRefundShowContent + '最大起飞时间' + response.data[i].beforeMaxDistanceHours + ',到最小起飞时间' + response.data[i].beforeMinDistanceHours + ',手续费为' + response.data[i].feesRate + '% \n'
                }
                if (response.data[i].passengerType === 1) {
                  // 儿童
                  this.childRefundShowContent = this.childRefundShowContent + '最大起飞时间' + response.data[i].beforeMaxDistanceHours + ',到最小起飞时间' + response.data[i].beforeMinDistanceHours + ',手续费为' + response.data[i].feesRate + '% \n'
                }
              }
              // 改签规则
              if (response.data[i].guestRuleType === 1) {
                if (response.data[i].passengerType === 0) {
                  // 成人
                  this.auditChangeShowContent = this.auditChangeShowContent + '最大起飞时间' + response.data[i].beforeMaxDistanceHours + ',到最小起飞时间' + response.data[i].beforeMinDistanceHours + ',手续费为' + response.data[i].feesRate + '% \n'
                }
                if (response.data[i].passengerType === 1) {
                  // 儿童
                  this.childChangeShowContent = this.childChangeShowContent + '最大起飞时间' + response.data[i].beforeMaxDistanceHours + ',到最小起飞时间' + response.data[i].beforeMinDistanceHours + ',手续费为' + response.data[i].feesRate + '% \n'
                }
              }
            }
          }
        }).catch((error) => {
          throw error
        })
      }
    }
  }
</script>
<style lang="scss">
  .choose-flight-dialog {
    .el-dialog__body {
      height: 850px;
      overflow-y: scroll;
    }
  }
</style>

<style lang="scss" scoped>

  .div-flex {
    border: 1px solid #d9ecff;
    padding: 20px;
    align-items: center;

    .title {
      font-size: 12px;
      text-align: center;
      margin-bottom: 5px;
    }
  }

  .filter {
    .filter-title {
      font-size: 12px;
      margin: 0 10px;
    }
  }

  .flight {
    &-airline {
      font-weight: 700;
      font-size: 15px;
    }
    &-flightNo {
      color: #1890ff;
      font-weight: bold;
    }
    &-normal {
      font-size: 14px;
      color: rgb(127, 127, 127);
      font-weight: 700;
    }

    &-time {
      font-size: 18px;
      font-weight: 600;
      font-style: normal;
      color: rgb(0, 0, 0);
      line-height: 30px;
    }

    &-price-red,
    &-price-black,
    &-price-orange {
      font-size: 28px;
      font-weight: 400;
      color: #d30820;
      line-height: 40px;
      .rmb-text {
        font-size: 14px;
      }
    }

    &-price-black {
      color: #000;
    }

    &-price-orange{
      color: #ffba00;
    }

    &-remaining {
      color: #d30820;
      font-weight: 500;
    }

    .flight-normal-text {
      font-weight: normal;
      font-size: 20px;
    }
  }

  .booking-table {

    thead tr td {
      background-color: #F5F7FA;
    }

    thead tr td,
    tr td {
      font-size: 14px;
      color: #909399;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-all;
      font-size: 12px;
      font-weight: bold;
      line-height: 23px;
      padding: 6px 0;
      text-align: center;
    }

    tbody tr {
      td {
        color: #606266;
        font-weight: normal;
        border-bottom: 1px dashed #F5F7FA;
      }

      &.detail-bg{
        background-color: #eff6ff;
        td{
          color: #000;
          border-bottom: 1px solid #e6e9ed;
        }
      }
    }
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }

</style>
