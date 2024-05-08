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
  >
    <!-- 单程 -->
    <table v-if="tripType === 0" v-loading="loadingFlag" class="booking-table" cellspacing="0" border="0" style="width: 100%;">
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

      <tbody style="width: 100%; height: 800px;overflow-y: scroll;">
        <template v-for="(item, index) in tableData">
          <tr :key="index" style="margin-bottom: 10px;">
            <td>
              <div class="flight-airline">
                <airlineName :airline-code="item.airline" />
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
              <div class="flight-orange-text">
                是否为共享航班: {{ item.isShared === true ? '是' : '否' }}
                <div v-if="item.isShared === true">
                  <div>实际承运航司:{{ item.operatingAirline }}</div>
                  实际承运航班:{{ item.operatingAirline }}{{ item.operatingFlightNo }}
                </div>
              </div>
            </td>
            <td />
            <td>
              <el-button
                :loading="loadingFlag"
                :disabled="loadingFlag"
                size="small"
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
                    <div v-if="cabinWeight.luggageWeight"><span style="color: red;font-size: large">携带行李额:</span>{{ cabinWeight.luggageWeight }}kg</div>
                    <div v-if="cabinWeight.handLuggageWeight"><span style="color: red;font-size: large">手提行李额:</span>{{ cabinWeight.handLuggageWeight }}kg</div>
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
                  <div>{{ $t(`AdminService["Enum:CabinClassType:${detailItem.cabinLevel}"]`) }}&nbsp;(<span class="flight-orange-text">{{ detailItem.cabin }}舱</span>)</div>
                  <div class="flight-normal-text">基建：{{ detailItem.airportTax }}</div>
                  <div class="flight-normal-text">燃油：{{ detailItem.fuelTax }}</div>
                </td>
                <td>
                  <div class="flight-price"><span class="flight-price-orange"><span class="rmb-text">￥</span>{{ detailItem.ticketPrice }}</span>
                  </div>
                  <div class="flight-normal-text">￥{{ detailItem.ticketPrice + detailItem.airportTax + detailItem.fuelTax }}（含税）</div>
                </td>
                <td>
                  <el-button
                    :loading="chooseLoading"
                    :disabled="chooseLoading"
                    size="mini"
                    type="warning"
                    @click="flightBooking(detailItem)"
                  >确认改签
                  </el-button>
                  <span class="flight-remaining ml-10">余{{ detailItem.status >= 9? 'A' : detailItem.status }}</span>
                </td>
              </tr>
            </el-collapse-transition>
          </template>
        </template>
      </tbody>
    </table>

    <!-- 多程 -->
    <div v-if="twoTripType === 0 || twoTripType === 1">
      <div class="two-trip to-trip" :class="{'isActive':twoTripType === 0}" @click="twoTripChange(0)">
        <div class="trip-btn to-way">去程</div>
        <div class="trip-text">{{ selectedTwoFlight.flights1.departureAirport | cityNameFilter }}({{ selectedTwoFlight.flights1.departureAirport }}) ✈ {{ selectedTwoFlight.flights1.arrivalAirport | cityNameFilter }}({{ selectedTwoFlight.flights1.arrivalAirport }})</div>
      </div>
      <!-- <div class="two-trip return-trip" :class="{'isActive': twoTripType === 1}" @click="twoTripChange(1)">
        <div class="trip-btn return-way">返程</div>
        <div v-if="tripType === 1" class="trip-text">{{ backoriginFlightInfo.secondDepartureCity | cityNameFilter }}({{ backoriginFlightInfo.secondDepartureCity }}) ✈ {{ backoriginFlightInfo.secondArrivalCity | cityNameFilter }}({{ backoriginFlightInfo.secondArrivalCity }})</div>
        <div v-if="tripType === 2" class="trip-text">{{ backoriginFlightInfo.secondDepartureCity | cityNameFilter }}({{ backoriginFlightInfo.secondDepartureCity }}) ✈ {{ backoriginFlightInfo.secondArrivalCity | cityNameFilter }}({{ backoriginFlightInfo.secondArrivalCity }})</div>
      </div> -->
    </div>
    <div v-if="tripType === 1">
      <!--  去程 -->
      <table
        v-if="twoTripType === null || twoTripType === 0"
        v-loading="loadingFlag"
        class="booking-table"
        cellspacing="0"
        border="0"
        style="width: 100%"
      >
        <thead>
          <tr>
            <td />
            <td style="width: 200px">起飞时间</td>
            <td style="width: 230px" />
            <td style="width: 200px">到达时间</td>
            <td>产品规定</td>
            <td>舱位</td>
            <td>票面价</td>
            <td>销售价</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="twoFlight.flights1 && twoFlight.flights1.length > 0">
            <template v-for="(item, index) in twoFlight.flights1">
              <tr :key="index">
                <td>
                  <div class="flight-airline">
                    <airlineName :airline-code="item.airline" />
                    <span class="flight-flightNo ml-20">{{ item.airline }}{{ item.flightNo }}</span>
                  </div>
                  <div class="flight-normal">
                    {{ item.aircraftModel }}
                    <span
                      v-if="item.meal"
                      class="flight-normal-text ml-10"
                    >
                      {{ $t(`Juzo["Enum:MealType:${item.meal}"]`) }}
                    </span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="'实际乘坐' + item.operatingAirline + '' + item.operatingFlightNo"
                      placement="bottom-end"
                    >
                      <el-link
                        type="success"
                        :underline="false"
                      >
                        <span
                          v-if="item.isShared"
                          class="flight-normal-text ml-10"
                        >共享
                        </span>
                      </el-link>
                    </el-tooltip>
                  </div>
                </td>
                <td>
                  <div class="flight-time">
                    {{ item.departureTime | substringHourMinutes }}
                  </div>
                  <div class="flight-normal-text">
                    {{ item.departureAirport | airportNameFilter }}{{ item.departureTerminal }}
                  </div>
                </td>
                <td>
                  <div
                    align="center"
                    class="flight-normal-text"
                  >
                    {{ item.flightDuration | hourMinSecondReplace }}
                  </div>
                  <div>
                    <i
                      class="iconfont icon-straight"
                      style="color: #909399"
                    />
                  </div>
                  <div v-if="item.stop > 0" align="center">
                    <el-link
                      type="warning"
                      :underline="false"
                    >经停:
                      {{ item.stopDetail[0].stopAirport | airportNameFilter }}({{ item.stopDetail[0].stopAirport }})
                    </el-link>
                  </div>
                </td>
                <td>
                  <div class="flight-time">
                    {{ item.arrivalTime | substringHourMinutes }}
                  </div>
                  <div class="flight-normal-text">
                    {{ item.arrivalAirport | airportNameFilter }}{{ item.arrivalTerminal }}
                  </div>
                </td>
                <td>
                  <div class="flight-normal-text">
                    基建：{{ item.cabinClassPrices[0].airportTax }}
                  </div>
                  <div class="flight-normal-text">
                    燃油：{{ item.cabinClassPrices[0].fuelTax }}
                  </div>
                </td>
                <td>
                  <div class="flight-cabin-level">
                    {{ $t(`AdminService["Enum:CabinClassType:${item.cabinClassPrices[0].cabinLevel}"]`) }}
                  </div>
                </td>
                <td>
                  <div>
                    <span class="flight-price-red">
                      <span class="rmb-text">￥</span>
                      {{ item.cabinClassPrices[0].ticketPrice }}
                    </span>
                    <span class="flight-normal-text">起</span>
                  </div>
                  <div class="flight-normal-text">
                    ￥{{
                      total(
                        item.cabinClassPrices[0].ticketPrice,
                        item.cabinClassPrices[0].fuelTax,
                        item.cabinClassPrices[0].airportTax
                      )
                    }}（含税）
                  </div>
                </td>
                <td>
                  <div>
                    <span class="flight-price-black">
                      <span class="rmb-text">￥</span>
                      {{ item.cabinClassPrices[0].settlementPrice }}
                    </span>
                    <span class="flight-normal-text">起</span>
                  </div>
                  <div class="flight-normal-text">
                    ￥{{
                      total(
                        item.cabinClassPrices[0].settlementPrice,
                        item.cabinClassPrices[0].fuelTax,
                        item.cabinClassPrices[0].airportTax
                      )
                    }}（含税）
                  </div>
                </td>
                <td>
                  <el-button
                    :loading="btnLoading"
                    :disabled="btnLoading"
                    type="primary"
                    plain
                    @click="selectedFlight1(item)"
                  >选为去程
                  </el-button>
                  <span class="flight-remaining ml-10">余
                    {{ $t(`Juzo["Enum:CabinStatusType:${item.cabinClassPrices[0].status}"]`) }}
                  </span>
                </td>
              </tr>
            </template>
          </template>
          <tr v-else>
            <td colspan="9" class="text-center">暂无符合的航班</td>
          </tr>
        </tbody>
      </table>

      <!-- 返程 -->
      <table
        v-if="twoTripType === 1"
        v-loading="loadingFlag"
        class="booking-table"
        cellspacing="0"
        border="0"
        style="width: 100%"
      >
        <thead>
          <tr>
            <td />
            <td style="width: 200px">起飞时间</td>
            <td style="width: 230px" />
            <td style="width: 200px">到达时间</td>
            <td>产品规定</td>
            <td>舱位</td>
            <td>票面价</td>
            <td>销售价</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="twoFlight.flights2.length > 0">
            <template v-for="(item, index) in twoFlight.flights2">
              <tr :key="index">
                <td>
                  <div class="flight-airline">
                    <airlineName :airline-code="item.airline" />
                    <span class="flight-flightNo ml-20">{{ item.airline }}{{ item.flightNo }}</span>
                  </div>
                  <div class="flight-normal">
                    {{ item.aircraftModel }}
                    <span
                      v-if="item.meal"
                      class="flight-normal-text ml-10"
                    >
                      {{ $t(`Juzo["Enum:MealType:${item.meal}"]`) }}
                    </span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="'实际乘坐' + item.operatingAirline + '' + item.operatingFlightNo"
                      placement="bottom-end"
                    >
                      <el-link
                        type="success"
                        :underline="false"
                      >
                        <span
                          v-if="item.isShared"
                          class="flight-normal-text ml-10"
                        >共享
                        </span>
                      </el-link>
                    </el-tooltip>
                  </div>
                </td>
                <td>
                  <div class="flight-time">
                    {{ item.departureTime | substringHourMinutes }}
                  </div>
                  <div class="flight-normal-text">
                    {{ item.departureAirport | airportNameFilter }}{{ item.departureTerminal }}
                  </div>
                </td>
                <td>
                  <div
                    align="center"
                    class="flight-normal-text"
                  >
                    {{ item.flightDuration | hourMinSecondReplace }}
                  </div>
                  <div>
                    <i
                      class="iconfont icon-straight"
                      style="color: #909399"
                    />
                  </div>
                  <div v-if="item.stop > 0" align="center">
                    <el-link
                      type="warning"
                      :underline="false"
                    >经停:
                      {{ item.stopDetail[0].stopAirport | airportNameFilter }}({{ item.stopDetail[0].stopAirport }})
                    </el-link>
                  </div>
                </td>
                <td>
                  <div class="flight-time">
                    {{ item.arrivalTime | substringHourMinutes }}
                  </div>
                  <div class="flight-normal-text">
                    {{ item.arrivalAirport | airportNameFilter }}{{ item.arrivalTerminal }}
                  </div>
                </td>
                <td>
                  <div class="flight-normal-text">
                    基建：{{ item.cabinClassPrices[0].airportTax }}
                  </div>
                  <div class="flight-normal-text">
                    燃油：{{ item.cabinClassPrices[0].fuelTax }}
                  </div>
                </td>
                <td>
                  <div class="flight-cabin-level">
                    {{ $t(`AdminService["Enum:CabinClassType:${item.cabinClassPrices[0].cabinLevel}"]`) }}
                  </div>
                </td>
                <td>
                  <div>
                    <span class="flight-price-red">
                      <span class="rmb-text">￥</span>
                      {{ item.cabinClassPrices[0].ticketPrice }}
                    </span>
                    <span class="flight-normal-text">起</span>
                  </div>
                  <div class="flight-normal-text">
                    ￥{{
                      total(
                        item.cabinClassPrices[0].ticketPrice,
                        item.cabinClassPrices[0].fuelTax,
                        item.cabinClassPrices[0].airportTax
                      )
                    }}（含税）
                  </div>
                </td>
                <td>
                  <div>
                    <span class="flight-price-black">
                      <span class="rmb-text">￥</span>
                      {{ item.cabinClassPrices[0].settlementPrice }}
                    </span>
                    <span class="flight-normal-text">起</span>
                  </div>
                  <div class="flight-normal-text">
                    ￥{{
                      total(
                        item.cabinClassPrices[0].settlementPrice,
                        item.cabinClassPrices[0].fuelTax,
                        item.cabinClassPrices[0].airportTax
                      )
                    }}（含税）
                  </div>
                </td>
                <td>
                  <el-button
                    :loading="btnLoading"
                    :disabled="btnLoading"
                    type="primary"
                    plain
                    @click="twoCabinPriceList(item, index)"
                  >选择
                  </el-button>
                  <el-button
                    v-if="isExpandedBtn === 1"
                    type="info"
                    plain
                    :disabled="btnLoading"
                    @click="isExpanded = ''; isExpandedBtn = ''"
                  >收起
                  </el-button>
                  <span class="flight-remaining ml-10">余
                    {{ $t(`Juzo["Enum:CabinStatusType:${item.cabinClassPrices[0].status}"]`) }}
                  </span>
                </td>
              </tr>

              <!-- 展开内容 -->
              <template v-if="isExpandedBtn === 1">
                <template v-for="(detailItem, detailIndex) in twoexpandedDetails">
                  <el-collapse-transition :key="index + '-' + detailIndex">
                    <tr v-show="isExpanded === index" class="detail-bg">
                      <td colspan="2">
                        <el-link
                          :type="detailItem.productName ? detailItem.productName.includes('标准') ? 'success' : detailItem.productName.includes('特价') ? 'warning' : 'danger' : 'success'"
                          :underline="false"
                        >
                          {{ detailItem.productName }}
                        </el-link>
                      </td>
                      <td colspan="2">
                        <el-tag type="warning">{{ $t(`AdminService["Enum:ReimbursementType:${detailItem.reimbursementType}"]`) }}</el-tag>
                      </td>
                      <td />
                      <td>
                        <div>
                          <el-link
                            type="primary"
                            :underline="false"
                          >
                            去程:{{ $t(`AdminService["Enum:CabinClassType:${detailItem.cabinLevel}"]`) }} {{ detailItem.cabin }}舱
                          </el-link>
                        </div>
                        <div>
                          <el-link
                            type="primary"
                            :underline="false"
                          >
                            返程:{{ $t(`AdminService["Enum:CabinClassType:${detailItem.cabinLevel2}"]`) }} {{ detailItem.cabin2 }}舱
                          </el-link>
                        </div>
                      </td>
                      <td>
                        <div class="flight-price">
                          <span class="flight-price-orange"><span class="rmb-text">￥</span>{{ detailItem.ticketPrice }}</span>
                        </div>
                        <div class="flight-normal-text">
                          ￥{{
                            total(
                              detailItem.ticketPrice,
                              detailItem.airportTax,
                              detailItem.fuelTax
                            )
                          }}（含税）
                        </div>
                      </td>
                      <td>
                        <div class="flight-price">
                          <span class="flight-price-orange"><span class="rmb-text">￥</span>{{ detailItem.settlementPrice }}</span>
                        </div>
                        <div class="flight-normal-text">
                          ￥{{
                            total(
                              detailItem.settlementPrice,
                              detailItem.airportTax,
                              detailItem.fuelTax
                            )
                          }}（含税）
                        </div>
                      </td>
                      <td>
                        <el-button
                          :loading="btnLoading"
                          :disabled="btnLoading"
                          type="warning"
                          @click="twoChangeConfirm(detailItem)"
                        >改签</el-button>
                        <span class="flight-remaining ml-10">余{{ $t(`Juzo["Enum:CabinStatusType:${detailItem.status}"]`) }}</span>
                      </td>
                    </tr>
                  </el-collapse-transition>
                </template>
              </template>

            </template>
          </template>
          <tr v-else>
            <td colspan="9" class="text-center">暂无符合的航班</td>
          </tr>
        </tbody>
      </table>
    </div>

  </el-dialog>
</template>

<script>
  import AirlineName from '@/components/BaseName/AirlineName'
  import { newChangeFlightSearch, newChangeCabinListSearch, chooseCabinPriceQuery, twoNewChangeFlightSearch, changeTwoCabinPriceList, twoFlightVerifyPrice } from '@/api/domestic-tickets/change-order'
  import { flightGuestRuleSearch, flightCabinLuggageWeightSearch } from '@/api/domestic-tickets/booking'

  export default {
    name: 'ChoseFlight',
    components: {
      AirlineName
    },
    data() {
      return {
        choseFlightVisible: false,
        loadingFlag: true,
        chooseLoading: false,
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
        choseFlightInfo: {},

        // 多程
        tripType: 0,
        twochangeFlightDataKey: null,
        twochoseChangeDate: null,
        backoriginFlightInfo: {},

        twoFlight: {
          flights1: [],
          flights2: []
        },
        twoTripType: null,
        btnLoading: false,
        selectedTwoFlight: {
          flights1: {
            flightId: '',
            airline: ''
          }
        },

        isExpandedBtn: '',
        originOrderNo: '',
        twoexpandedDetails: []
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
      twoHandler(toDate,
                 backDate,
                 toValue,
                 backValue,
                 tokey,
                 backkey,
                 policyCode,
                 includeChild,
                 reimbursementType,
                 policyJson,
                 toAirline,
                 backAirline,
                 orderNo,
                 productJson) {
        // 请求改签新航班数据
        this.originOrderNo = orderNo
        this.choseFlightVisible = true
        this.changeFlightDataKey = tokey
        this.choseChangeDate = toDate
        this.twochangeFlightDataKey = backkey
        this.twochoseChangeDate = backDate

        this.policyCode = policyCode
        this.policyJson = policyJson
        this.reimbursementType = reimbursementType
        // 原航班数据 value
        this.originFlightInfo = toValue
        this.backoriginFlightInfo = backValue

        this.includeChild = includeChild
        // 查询新航班数据 , policyCode政策id 获取一下 , 使用原航程信息进行请求
        this.loadingFlag = true
        // 多程请求参数
        const requestData = {
          airline: toAirline,
          oneCabin: toValue.originCabinCode.trim(),
          departureCity: toValue.originDepartureCityCode,
          arrivalCity: toValue.originArrivalCityCode,
          departureDate: toDate,

          twoCabin: backValue.originCabinCode.trim(),
          secondDepartureCity: backValue.originDepartureCityCode,
          secondArrivalCity: backValue.originArrivalCityCode,
          secondDepartureDate: backDate
        }
        if (policyCode !== null) {
          requestData.policyId = policyCode
          requestData.policy = policyJson
        }
        // 冗余一下, 传参的内容
        const productObject = JSON.parse(productJson)
        delete productObject.cabinClass
        delete productObject.passengerType
        requestData.product = JSON.stringify(productObject)
        requestData.orderNo = orderNo

        this.tripType = 1
        twoNewChangeFlightSearch(requestData).then((response) => {
          if (response) {
            // 多程处理
            this.twoFlight = response
            if (this.twoFlight.flights1.length > 0) {
              this.twoFlight.flights1.forEach((f1) => {
                f1.cabinClassPrices = response.cabinClassPrices.filter(x => x.flightId1 === f1.flightId)
              })
            }
          }
          this.loadingFlag = false
        })
      },
      // 选择去程
      selectedFlight1(item) {
        this.twoTripType = 1
        this.btnLoading = true
        this.selectedTwoFlight.flights1 = item
        // 查找和去程对应的返程
        this.twoFlight.flights2 = this.twoFlight.flights2.filter(f2 => f2.flightId1.includes(item.flightId))
        if (this.twoFlight.flights2.length > 0) {
          this.twoFlight.flights2.forEach((f2) => {
            f2.cabinClassPrices = this.twoFlight.cabinClassPrices.filter(x => x.flightId2 === f2.flightId)
          })
        }
        this.btnLoading = false
      },
      total(price, airportTax, feeTax) {
        return parseFloat(price + airportTax + feeTax)
      },
      // 多程查询详细的cabin价格列表
      twoCabinPriceList(item, index) {
        const twoCabinPrice = item.cabinClassPrices[0]
        this.isExpandedBtn = 1
        this.isExpanded = index
        this.btnLoading = true

        this.twoexpandedDetails = [twoCabinPrice]
        // 查询多程cabin价格列表
        changeTwoCabinPriceList(
          {
            flightId1: twoCabinPrice.flightId1,
            flightId2: twoCabinPrice.flightId2,
            policyId: twoCabinPrice.policyId,
            productId: twoCabinPrice.productId,
            twoMinPrice: twoCabinPrice.ticketPrice
          })
          .then((response) => {
            if (response) {
              // 结果
              this.twoexpandedDetails = this.twoexpandedDetails.concat(response)
            }
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      },
      twoChangeConfirm(cabinPrice) {
        this.btnLoading = true
        // 请求一下实时价格，里面会包括. 儿童和婴儿的价格
        twoFlightVerifyPrice(cabinPrice).then((response) => {
          // 选择的价格
          // 处理去程
          const cabinPriceInfo = {}
          // 成人的金额
          const auditCabinPrice = response.cabinPrices.filter((value) => value.passengerType === 0)
          cabinPriceInfo.auditTicketPrice = auditCabinPrice[0].flightCabinDetailPriceList[0].ticketPrice
          cabinPriceInfo.auditAirportTax = auditCabinPrice[0].airportTax / 2
          cabinPriceInfo.auditFuelTax = auditCabinPrice[0].fuelTax / 2
          // 儿童的金额
          const childCabinPrice = response.cabinPrices.filter((value) => value.passengerType === 1)
          cabinPriceInfo.childTicketPrice = childCabinPrice.length === 0 ? 0 : childCabinPrice[0].flightCabinDetailPriceList[0].ticketPrice
          cabinPriceInfo.childAirportTax = childCabinPrice.length === 0 ? 0 : childCabinPrice[0].airportTax / 2
          cabinPriceInfo.childFuelTax = childCabinPrice.length === 0 ? 0 : childCabinPrice[0].fuelTax / 2
          // 婴儿的金额
          const babyCabinPrice = response.cabinPrices.filter((value) => value.passengerType === 2)
          cabinPriceInfo.babyTicketPrice = babyCabinPrice.length === 0 ? 0 : babyCabinPrice[0].flightCabinDetailPriceList[0].ticketPrice

          const toFlightData = { ...response.flight1 }
          toFlightData.departureTime = this.choseChangeDate + ' ' + toFlightData.departureTime
          toFlightData.arrivalTime = this.choseChangeDate + ' ' + toFlightData.arrivalTime
          // 选择航班上,拼接上原航班的相关信息
          toFlightData.originCarrierCode = this.originFlightInfo.originCarrierCode
          toFlightData.originOrderFlightId = this.originFlightInfo.originOrderFlightId
          toFlightData.originDepartureCityCode = this.originFlightInfo.originDepartureCityCode
          toFlightData.originArrivalCityCode = this.originFlightInfo.originArrivalCityCode
          toFlightData.originDepartureAirportCode = this.originFlightInfo.originDepartureAirportCode
          toFlightData.originArrivalAirportCode = this.originFlightInfo.originArrivalAirportCode
          toFlightData.originCabinCode = this.originFlightInfo.originCabinCode

          cabinPriceInfo.status = auditCabinPrice[0].status
          cabinPriceInfo.cabin = auditCabinPrice[0].cabin
          cabinPriceInfo.cabinLevel = auditCabinPrice[0].cabinLevel
          cabinPriceInfo.childCabin = childCabinPrice[0].cabin
          cabinPriceInfo.babyCabin = babyCabinPrice[0].cabin
          // 调用上级方法 ， 多程的需要调用个两次
          this.$emit('handleFilter', toFlightData, cabinPriceInfo, this.changeFlightDataKey)

          // 处理返程
          cabinPriceInfo.auditTicketPrice = auditCabinPrice[0].flightCabinDetailPriceList[1].ticketPrice
          cabinPriceInfo.childTicketPrice = childCabinPrice.length === 0 ? 0 : childCabinPrice[0].flightCabinDetailPriceList[1].ticketPrice
          cabinPriceInfo.babyTicketPrice = babyCabinPrice.length === 0 ? 0 : babyCabinPrice[0].flightCabinDetailPriceList[1].ticketPrice

          const backFlightData = { ...response.flight2 }
          backFlightData.departureTime = this.twochoseChangeDate + ' ' + backFlightData.departureTime
          backFlightData.arrivalTime = this.twochoseChangeDate + ' ' + backFlightData.arrivalTime
          // 选择航班上,拼接上原航班的相关信息
          backFlightData.originCarrierCode = this.backoriginFlightInfo.originCarrierCode
          backFlightData.originOrderFlightId = this.backoriginFlightInfo.originOrderFlightId
          backFlightData.originDepartureCityCode = this.backoriginFlightInfo.originDepartureCityCode
          backFlightData.originArrivalCityCode = this.backoriginFlightInfo.originArrivalCityCode
          backFlightData.originDepartureAirportCode = this.backoriginFlightInfo.originDepartureAirportCode
          backFlightData.originArrivalAirportCode = this.backoriginFlightInfo.originArrivalAirportCode
          backFlightData.originCabinCode = this.backoriginFlightInfo.originCabinCode

          cabinPriceInfo.status = auditCabinPrice[0].status2
          cabinPriceInfo.cabin = auditCabinPrice[0].cabin2
          cabinPriceInfo.cabinLevel = auditCabinPrice[0].cabinLevel2
          cabinPriceInfo.childCabin = childCabinPrice[0].cabin2
          cabinPriceInfo.babyCabin = babyCabinPrice[0].cabin2
          // 调用上级
          this.$emit('handleTwoFilter', backFlightData, cabinPriceInfo, this.twochangeFlightDataKey, response.cabinPrices)

          // 关闭此弹窗, 回调submitChange方法
          this.resetDataInfo()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      },
      twoTripChange(type) {
        this.twoTripType = type
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
        })
        this.isExpanded = index
        this.choseFlightInfo = item
      },
      // 选择航程后 回调上级页面
      flightBooking(data) {
        this.chooseLoading = true
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
          this.chooseLoading = false
        })
      },
      resetDataInfo() {
        this.choseFlightVisible = false
        this.changeFlightDataKey = null
        this.twochangeFlightDataKey = null
        this.isExpanded = false
        this.expandedDetails = []
        this.tableData = []
        this.twoFlight = {
          flights1: [],
          flights2: []
        }
        this.selectedTwoFlight = {
          flights1: {
            flightId: '',
              airline: ''
          }
        }
        this.choseChangeDate = null
        this.twochoseChangeDate = null
        this.choseFlightInfo = null
        this.originFlightInfo = {}
        this.backoriginFlightInfo = {}
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

    &-price-orange {
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
  .two-trip {
    display: inline-block;
    margin-right: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f2f2f2;
    cursor: pointer;
    &.to-trip.isActive {
      font-size: 14px;
      background: linear-gradient(to right, rgba(128, 255, 255, 0.403921568627451) 0%, rgba(128, 255, 255, 0.903921568627451) 100%);
      border-color: rgba(215, 215, 215, 1);
    }
    &.return-trip.isActive {
      font-size: 14px;
      font-weight: bold;
      background: linear-gradient(to right, rgba(118, 221, 117, 0.43921568627451) 0%, rgba(118, 221, 117, 0.9) 100%);
      border-color: rgba(215, 215, 215, 1);
    }
    .trip-btn {
      display: inline-block;
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      height: 30px;
      line-height: 30px;
      padding: 0 30px;
      text-align: center;
      border-radius: 10px;
      &.to-way {
        background-color: #53d5ef;
      }
      &.return-way {
        background-color: #7de07b;
      }
    }
    .trip-text {
      display: inline-block;
      color: #000;
      font-size: 12px;
      padding: 0 30px;
    }
  }

  .selected-trip {
    float: right;
    color: #326CAD;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    // background: linear-gradient(to right, blue, pink);
    background: linear-gradient(to right, #FFF, #53d5ef);
    border-radius: 2px;
    padding: 0 10px;
  }

</style>
