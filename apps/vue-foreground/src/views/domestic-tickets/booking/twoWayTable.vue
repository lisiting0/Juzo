
<template>
  <div>
    <!-- 往返|多程 的table -->
    <table
      v-loading="loading"
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
        <template v-if="list.length > 0">
          <template v-for="(item, index) in list">
            <tr :key="index">
              <td
                :rowspan="item.cabinClassPrices.length"
                :colspan="1"
              >
                <div class="flight-airline">
                  <airlineName
                    :airline-code="item.airline"
                  />
                  <span
                    class="flight-flightNo ml-20"
                  >{{ item.airline
                  }}{{ item.flightNo }}</span>
                </div>
                <div class="flight-normal">
                  {{ item.aircraftModel }}
                  <span
                    v-if="item.meal"
                    class="flight-normal-text ml-10"
                  >{{
                    $t(
                      `Juzo["Enum:MealType:${item.meal}"]`
                    )
                  }}</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="
                      '实际乘坐' +
                        item.operatingAirline +
                        '' +
                        item.operatingFlightNo
                    "
                    placement="bottom-end"
                  >
                    <el-link
                      type="success"
                      :underline="false"
                    ><span
                      v-if="item.IsShared"
                      class="flight-normal-text ml-10"
                    >共享</span></el-link>
                  </el-tooltip>
                </div>
              </td>
              <td
                :rowspan="item.cabinClassPrices.length"
                :colspan="1"
              >
                <div class="flight-time">
                  {{
                    item.departureTime
                      | substringHourMinutes
                  }}
                </div>
                <div class="flight-normal-text">
                  {{
                    item.departureAirport
                      | airportNameFilter
                  }}{{ item.departureTerminal }}
                </div>
              </td>
              <td
                :rowspan="item.cabinClassPrices.length"
                :colspan="1"
              >
                <div
                  align="center"
                  class="flight-normal-text"
                >
                  {{
                    item.flightDuration
                      | hourMinSecondReplace
                  }}
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
                    {{
                      item.stopDetail[0].stopAirport
                        | airportNameFilter
                    }}({{
                      item.stopDetail[0].stopAirport
                    }})</el-link>
                </div>
              </td>
              <td
                :rowspan="item.cabinClassPrices.length"
                :colspan="1"
              >
                <div class="flight-time">
                  {{
                    item.arrivalTime
                      | substringHourMinutes
                  }}
                </div>
                <div class="flight-normal-text">
                  {{
                    item.arrivalAirport
                      | airportNameFilter
                  }}{{ item.arrivalTerminal }}
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="flight-normal-text">
                  基建：{{
                    item.cabinClassPrices[0].airportTax
                  }}
                </div>
                <div class="flight-normal-text">
                  燃油：{{
                    item.cabinClassPrices[0].fuelTax
                  }}
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div class="flight-cabin-level">
                  {{
                    $t(
                      `AdminService["Enum:CabinClassType:${item.cabinClassPrices[0].cabinLevel}"]`
                    )
                  }}
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div>
                  <span
                    class="flight-price-red"
                  ><span class="rmb-text">￥</span>{{
                    item.cabinClassPrices[0]
                      .ticketPrice
                  }}</span>
                  <span
                    class="flight-normal-text"
                  >起</span>
                </div>
                <div class="flight-normal-text">
                  ￥{{
                    total(
                      item.cabinClassPrices[0]
                        .ticketPrice,
                      item.cabinClassPrices[0]
                        .fuelTax,
                      item.cabinClassPrices[0]
                        .airportTax
                    )
                  }}（含税）
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <div>
                  <span
                    class="flight-price-black"
                  ><span class="rmb-text">￥</span>{{
                    item.cabinClassPrices[0]
                      .settlementPrice
                  }}</span>
                  <span
                    class="flight-normal-text"
                  >起</span>
                </div>
                <div class="flight-normal-text">
                  ￥{{
                    total(
                      item.cabinClassPrices[0]
                        .settlementPrice,
                      item.cabinClassPrices[0]
                        .fuelTax,
                      item.cabinClassPrices[0]
                        .airportTax
                    )
                  }}（含税）
                </div>
              </td>
              <td rowspan="1" colspan="1">
                <el-button
                  :loading="loading"
                  :disabled="loading"
                  type="primary"
                  plain
                  @click="
                    toggleDetails(
                      index,
                      item,
                      item.cabinClassPrices[0]
                        .cabinLevel
                    )
                  "
                >选择
                </el-button>
                <el-button
                  v-if="isExpanded === index"
                  type="info"
                  plain
                  :disabled="loading"
                  @click="isExpanded = ''"
                >收起
                </el-button>
                <span
                  class="flight-remaining ml-10"
                >余
                  {{
                    $t(
                      `Juzo["Enum:CabinStatusType:${item.cabinClassPrices[0].status}"]`
                    )
                  }}</span>
              </td>
            </tr>
            <template v-if="item.cabinClassPrices">
              <template
                v-for="(
                  cabinLevelItem, cabinLevelIndex
                ) in item.cabinClassPrices"
              >
                <tr
                  v-if="cabinLevelIndex > 0"
                  :key="index + '-' + cabinLevelIndex"
                >
                  <td rowspan="1" colspan="1">
                    <div class="flight-normal-text">
                      基建：{{
                        cabinLevelItem.airportTax
                      }}
                    </div>
                    <div class="flight-normal-text">
                      燃油：{{
                        cabinLevelItem.fuelTax
                      }}
                    </div>
                  </td>
                  <td rowspan="1" colspan="1">
                    <div class="flight-cabin-level">
                      {{
                        $t(
                          `AdminService["Enum:CabinClassType:${cabinLevelItem.cabinLevel}"]`
                        )
                      }}
                    </div>
                  </td>
                  <td rowspan="1" colspan="1">
                    <div>
                      <span
                        class="flight-price-red"
                      ><span
                        class="rmb-text"
                      >￥</span>{{
                        cabinLevelItem.ticketPrice
                      }}</span>
                      <span
                        class="flight-normal-text"
                      >起</span>
                    </div>
                    <div class="flight-normal-text">
                      ￥{{
                        total(
                          cabinLevelItem.ticketPrice,
                          cabinLevelItem.fuelTax,
                          cabinLevelItem.airportTax
                        )
                      }}（含税）
                    </div>
                  </td>
                  <td rowspan="1" colspan="1">
                    <div>
                      <span
                        class="flight-price-black"
                      ><span
                        class="rmb-text"
                      >￥</span>{{
                        cabinLevelItem.settlementPrice
                      }}</span>
                      <span
                        class="flight-normal-text"
                      >起</span>
                    </div>
                    <div class="flight-normal-text">
                      {{
                        total(
                          cabinLevelItem.settlementPrice,
                          cabinLevelItem.fuelTax,
                          cabinLevelItem.airportTax
                        )
                      }}（含税）
                    </div>
                  </td>
                  <td rowspan="1" colspan="1">
                    <el-button
                      :loading="loading"
                      :disabled="loading"
                      type="primary"
                      plain
                      @click="
                        toggleDetails(
                          index,
                          item,
                          cabinLevelItem.cabinLevel
                        )
                      "
                    >选择
                    </el-button>
                    <el-button
                      v-if="isExpanded === index"
                      type="info"
                      plain
                      :disabled="loading"
                      @click="isExpanded = ''"
                    >收起</el-button>

                    <span
                      class="flight-remaining ml-10"
                    >余{{
                      $t(
                        `Juzo["Enum:CabinStatusType:${cabinLevelItem.status}"]`
                      )
                    }}</span>
                  </td>
                </tr>
                <!-- 展示对应的舱等信息 -->
                <template
                  v-if="
                    cabinLevelIndex ===
                      item.cabinClassPrices.length - 1
                  "
                >
                  <template
                    v-for="(
                      detailItem, detailIndex
                    ) in expandedDetails"
                  >
                    <el-collapse-transition
                      :key="
                        index +
                          '-' +
                          cabinLevelIndex +
                          '-' +
                          detailIndex
                      "
                    >
                      <tr
                        v-show="
                          isExpanded === index
                        "
                        class="detail-bg"
                      >
                        <td colspan="2">
                          <el-link
                            :type="
                              detailItem.productName.includes(
                                '标准'
                              )
                                ? 'success'
                                : detailItem.productName.includes(
                                  '特价'
                                )
                                  ? 'warning'
                                  : 'danger'
                            "
                            :underline="false"
                          >{{
                            detailItem.productName
                          }}</el-link>
                        </td>
                        <td colspan="2">
                          <el-tag
                            type="warning"
                          >{{
                            $t(
                              `AdminService["Enum:ReimbursementType:${detailItem.reimbursementType}"]`
                            )
                          }}</el-tag>
                        </td>
                        <td>
                          <el-popover
                            placement="right"
                            width="200"
                            :open-delay="500"
                            trigger="hover"
                          >
                            <div
                              class="yellow-text"
                            >
                              <div>
                                产品说明：{{
                                  detailItem.description
                                }}
                              </div>
                              <!-- <div>报销凭证：{{ detailItem.description }}</div> -->
                              <div>
                                最晚出票时限：{{
                                  detailItem.issueTimeLimitStr
                                }}
                              </div>
                              <div>
                                自愿改期：{{
                                  detailItem.voluntaryRefundTimeLimitStr
                                }}
                              </div>
                              <div>
                                自愿退票：{{
                                  detailItem.involuntaryRefundTimeLimitStr
                                }}
                              </div>
                              <div>
                                非自愿退票：{{
                                  detailItem.voluntaryChangeTimeLimitStr
                                }}
                              </div>
                            </div>
                            <el-link
                              slot="reference"
                              type="primary"
                              :underline="
                                false
                              "
                            >标准产品</el-link>
                          </el-popover>
                          <el-popover
                            placement="right-start"
                            title="行李额"
                            width="500"
                            trigger="hover"
                            :open-delay="500"
                            @show="
                              showLuggageWeight(
                                detailItem
                              )
                            "
                          >
                            <div
                              v-if="
                                cabinWeight.luggageWeight
                              "
                            >
                              <span
                                class="red-text"
                              >携带行李额：</span>{{
                                cabinWeight.luggageWeight
                              }}kg
                            </div>
                            <div
                              v-if="
                                cabinWeight.handLuggageWeight
                              "
                            >
                              <span
                                class="red-text"
                              >手提行李额：</span>{{
                                cabinWeight.handLuggageWeight
                              }}kg
                            </div>
                            <div
                              v-if="
                                cabinWeight.baggageRemark
                              "
                            >
                              {{
                                cabinWeight.baggageRemark
                              }}kg
                            </div>
                            <div
                              slot="reference"
                            >
                              <el-link
                                type="primary"
                              >行李额(KG)</el-link>
                            </div>
                          </el-popover>
                          <el-popover
                            placement="right"
                            title="退改签规定"
                            width="500"
                            trigger="hover"
                            :open-delay="500"
                            @show="
                              showGuestRule(
                                detailItem
                              )
                            "
                          >
                            <table
                              v-if="
                                refundChangeRule
                                  .audltChangeRule
                                  .length >
                                  0
                              "
                              class="rule-table"
                            >
                              <tr>
                                <td
                                  :rowspan="
                                    2
                                  "
                                >
                                  成人改期费
                                </td>
                                <template
                                  v-for="(
                                    adultChange,
                                    adultChangeIndex
                                  ) in refundChangeRule.audltChangeRule"
                                >
                                  <td
                                    :key="
                                      'adultChangeRule' +
                                        adultChangeIndex
                                    "
                                  >
                                    <span
                                      v-if="
                                        adultChange.beforeMaxDistanceHours >
                                          0
                                      "
                                    >{{
                                      adultChange.beforeMaxDistanceHours
                                    }}</span>-
                                    <span
                                      v-if="
                                        adultChange.beforeMinDistanceHours >=
                                          0
                                      "
                                    >{{
                                      adultChange.beforeMinDistanceHours
                                    }}</span>
                                  </td>
                                </template>
                              </tr>
                              <tr>
                                <td
                                  v-for="(
                                    adultChangeVal,
                                    adultValIndex
                                  ) in refundChangeRule.audltChangeRule"
                                  :key="
                                    'adultChangeVal' +
                                      adultValIndex
                                  "
                                >
                                  <span
                                    class="red-text"
                                  >{{
                                    adultChangeVal.feesRate
                                  }}</span>
                                  %
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  成人退订费
                                </td>
                                <td
                                  v-for="(
                                    adultRefundVal,
                                    adultRefundValIndex
                                  ) in refundChangeRule.audltRefundRule"
                                  :key="
                                    'adultRefundVal' +
                                      adultRefundValIndex
                                  "
                                >
                                  <span
                                    class="red-text"
                                  >{{
                                    adultRefundVal.feesRate
                                  }}</span>
                                  %
                                </td>
                              </tr>
                            </table>

                            <table
                              v-if="
                                refundChangeRule
                                  .childChangeRule
                                  .length >
                                  0
                              "
                              class="rule-table"
                            >
                              <tr>
                                <td
                                  :rowspan="
                                    2
                                  "
                                >
                                  儿童改期费
                                </td>
                                <template
                                  v-for="(
                                    childChange,
                                    childChangeIndex
                                  ) in refundChangeRule.childChangeRule"
                                >
                                  <td
                                    :key="
                                      'childChangeRule' +
                                        childChangeIndex
                                    "
                                  >
                                    <span
                                      v-if="
                                        childChange.beforeMaxDistanceHours >
                                          0
                                      "
                                    >{{
                                      childChange.beforeMaxDistanceHours
                                    }}</span>-
                                    <span
                                      v-if="
                                        childChange.beforeMinDistanceHours >=
                                          0
                                      "
                                    >{{
                                      childChange.beforeMinDistanceHours
                                    }}</span>
                                  </td>
                                </template>
                              </tr>
                              <tr>
                                <td
                                  v-for="(
                                    childChangeVal,
                                    childChangeValIndex
                                  ) in refundChangeRule.childChangeRule"
                                  :key="
                                    'childChangeVal' +
                                      childChangeValIndex
                                  "
                                >
                                  <span
                                    class="red-text"
                                  >{{
                                    childChangeVal.feesRate
                                  }}</span>
                                  %
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  儿童退订费
                                </td>
                                <td
                                  v-for="(
                                    childRefundVal,
                                    childRefundValIndex
                                  ) in refundChangeRule.childRefundRule"
                                  :key="
                                    'childRefundVal' +
                                      childRefundValIndex
                                  "
                                >
                                  <span
                                    class="red-text"
                                  >{{
                                    childRefundVal.feesRate
                                  }}</span>
                                  %
                                </td>
                              </tr>
                            </table>
                            <div
                              slot="reference"
                            >
                              <el-link
                                type="primary"
                              >退改签规定</el-link>
                            </div>
                          </el-popover>
                        </td>
                        <td>
                          <div>
                            <el-link
                              type="primary"
                              :underline="
                                false
                              "
                            >{{
                              $t(
                                `AdminService["Enum:CabinClassType:${detailItem.cabinLevel}"]`
                              )
                            }}</el-link>
                          </div>
                          <div>
                            {{
                              detailItem.cabin
                            }}舱
                          </div>
                        </td>
                        <!--/ <template v-if="detailItem.discount<1">{{ detailItem.discount / 10 }}折</template>-->
                        <td>
                          <div
                            class="flight-price"
                          >
                            <span
                              class="flight-price-orange"
                            ><span
                              class="rmb-text"
                            >￥</span>{{
                              detailItem.ticketPrice
                            }}</span>
                          </div>
                          <div
                            class="flight-normal-text"
                          >
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
                          <div
                            class="flight-price"
                          >
                            <span
                              class="flight-price-orange"
                            ><span
                              class="rmb-text"
                            >￥</span>{{
                              detailItem.settlementPrice
                            }}</span>
                          </div>
                          <div
                            class="flight-normal-text"
                          >
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
                            :loading="loading"
                            :disabled="loading"
                            type="warning"
                            @click="
                              booking(
                                detailItem
                              )
                            "
                          >预定</el-button>
                          <span
                            class="flight-remaining ml-10"
                          >余
                            {{
                              $t(
                                `Juzo["Enum:CabinStatusType:${item.cabinClassPrices[0].status}"]`
                              )
                            }}</span>
                        </td>
                      </tr>
                    </el-collapse-transition>
                  </template>
                </template>
              </template>
            </template>
          </template>
        </template>
        <tr v-else>
          <td colspan="9" class="text-center">暂无</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {
    twoFlightList,
    cabinClassPrice,
    verifyPrice
  } from '@/api/domestic-tickets/booking'
  import AirlineName from '@/components/BaseName/AirlineName'
  import {
    flightGuestRuleSearch,
    flightCabinLuggageWeightSearch
  } from '@/api/domestic-tickets/booking'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')
  import Cookies from 'js-cookie'

  export default {
    name: 'OneWayTable',
    components: {
      AirlineName
    },
    data() {
      return {
        loading: false,
        list: [],
        listQuery: {
        },
        isExpanded: false,
        expandedDetails: [],
        flightId: '',
        airline: '',
        departureTime: '',
        cabinWeight: {},
        refundChangeRule: {
          audltChangeRule: [],
          audltRefundRule: [],
          childChangeRule: [],
          childRefundRule: []
        },
        adultRefundChangeRules: []
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      reset() {
        this.list = []
        this.flightId = ''
        this.airline = ''
        this.departureTime = ''
        this.isExpanded = false
        this.expandedDetails = []
      },
      // 查询航班
      getList(quetyData) {
        console.log(quetyData)
        this.listQuery = quetyData
        // 重置
        this.reset()
        this.loading = true
        // 查询价格列表
        twoFlightList(quetyData)
          .then((response) => {
            if (response) {
              this.list = response
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      },
      total(price, airportTax, feeTax) {
        return parseFloat(price + airportTax + feeTax)
      },
      toggleDetails(index, item, cabinLevel) {
        this.loading = true
        this.isExpanded = index
        this.flightId = item.flightId
        this.airline = item.airline
        this.departureTime = item.departureTime
        cabinClassPrice({ flightId: this.flightId, cabinLevel: cabinLevel })
          .then((response) => {
            if (response) {
              this.expandedDetails = response
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      },
      // 查询foudnation服务中-航司-舱位-对应的行李额
      showLuggageWeight(data) {
        this.cabinWeight = {}
        flightCabinLuggageWeightSearch({
          carrierCode: this.airline,
          cabinCode: data.cabin
        }).then((response) => {
          if (response.status === '200') {
            this.cabinWeight = {
              luggageWeight: response.data.luggageWeight,
              handLuggageWeight: response.data.handLuggageWeight,
              baggageRemark: response.data.baggageRemark
            }
          } else {
            this.$message.error('查询对应的行李额失败...')
          }
        })
      },
      // 查询foundation服务中- 航司-舱位 对应的  退改签客规信息
      showGuestRule(data) {
        flightGuestRuleSearch({
          carrierCode: this.airline,
          cabinCode: data.cabin,
          departureTime:
            this.listQuery.departureDate + ' ' + this.departureTime
        }).then((response) => {
          if (response) {
            this.refundChangeRule.audltRefundRule = response.data
              .filter(
                (x) =>
                  x.guestRuleType === 0 && x.passengerType === 0
              )
              .sort(
                (a, b) =>
                  b.beforeMaxDistanceHours -
                  a.beforeMaxDistanceHours
              )
            this.refundChangeRule.audltChangeRule = response.data
              .filter(
                (x) =>
                  x.guestRuleType === 1 && x.passengerType === 0
              )
              .sort(
                (a, b) =>
                  b.beforeMaxDistanceHours -
                  a.beforeMaxDistanceHours
              )
            this.refundChangeRule.childRefundRule = response.data
              .filter(
                (x) =>
                  x.guestRuleType === 0 && x.passengerType === 1
              )
              .sort(
                (a, b) =>
                  b.beforeMaxDistanceHours -
                  a.beforeMaxDistanceHours
              )
            this.refundChangeRule.childChangeRule = response.data
              .filter(
                (x) =>
                  x.guestRuleType === 1 && x.passengerType === 1
              )
              .sort(
                (a, b) =>
                  b.beforeMaxDistanceHours -
                  a.beforeMaxDistanceHours
              )
          }
        })
      },
      booking(cabinPrice) {
        this.loading = true
        verifyPrice({
          flightId: this.flightId,
          cabinPrice: cabinPrice
        })
          .then((response) => {
            this.loading = false
            if (response) {
              Cookies.set('verifyPrice', JSON.stringify(response))
              // 关闭当前路由
              this.$store.dispatch('tagsView/delView', this.$route)
              this.$router.replace({
                path: '/domestic-tickets/ticket-passenger'
              })
            }
          })
          .catch((error) => {
            this.loading = false
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="scss">
  .days {
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border-color: #fff;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item {
      border-color: #fff;
    }

    .el-tabs__nav {
      float: none !important;

      .el-tabs__item {
        width: 14.28%;
        text-align: center;
        color: #fff;
        background-color: #f3ac6d;

        &.is-disabled {
          background-color: #ddd;
        }
      }
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item:hover,
    .el-tabs--card > .el-tabs__header .el-tabs__item:focus,
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      border-bottom-color: #ffffff;
      background-color: #f28829;
      font-weight: bold;
      font-size: 15px;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-disabled:hover,
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-disabled:focus,
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-disabled {
      background-color: #ddd;
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
      font-size: 28px;
      font-weight: 700;
      font-style: normal;
      color: rgb(0, 0, 0);
      line-height: 40px;
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
    }
  }

  .booking-table {
    thead tr td {
      background-color: #f5f7fa;
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
        border-bottom: 1px dashed #e6e6e6;
      }

      &.detail-bg {
        background-color: #eff6ff;
        td {
          color: #000;
          border-bottom: 1px solid #e6e9ed;
        }
      }
    }
  }

  .rule-table {
    tr:first-child td {
      background-color: #f5f7fa;
    }
    tr td {
      background-color: #f5f7fa;
      width: 200px;
      text-align: center;
      padding: 4px 0;
    }
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .text-center {
    text-align: center;
    padding: 20px;
    color: #d3dce6;
    cursor: pointer;
  }
</style>
