<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :rules="formRules"
      :inline="true"
      class="demo-form-inline"
    >
      <div class="custom-card">
        <div class="card-title">机票预定</div>
        <div class="card-box" style="padding: 15px 10px">
          <el-row>
            <el-col :span="7">
              <el-form-item prop="tripType" label="航程类型">
                <el-radio-group v-model="listQuery.tripType" @change="tripTypeChange()">
                  <el-radio
                    v-for="option in tripTypeOptions"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{ option.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="airline" label="航司">
                <el-select
                  v-model="listQuery.airline"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="option in airlines"
                    :key="option.carrierCode"
                    :value="option.carrierCode"
                    :label="option.carrierName + '(' + option.carrierCode + ')'"
                  >
                    <span style="float: left">{{ option.carrierName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px;">{{ option.carrierCode }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="margin-left: 60px">
              <el-form-item prop="directOnly" label="">
                <el-checkbox v-model="listQuery.directOnly">是否直飞</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button
                size="medium"
                type="primary"
                @click="getList()"
              >
                查询
              </el-button>
            </el-col>
          </el-row>
          <!-- <el-row>
                        <el-col :span="5">
                            <el-form-item
                              prop="departureCity"
                              label="出发城市"
                              style="margin-bottom: 0"
                            >
                                <el-select
                                  v-model="listQuery.departureCity"
                                  filterable
                                  placeholder="出发城市"
                                  class="text-upper"
                                >
                                    <el-option
                                      v-for="option in citys"
                                      :key="option.cityCode"
                                      :value="option.cityCode"
                                      :label="option.cityNameCn + '(' + option.cityCode + ')'"
                                    >
                                        <span style="float: left">{{ option.cityNameCn }}</span>
                                        <span
                                            style="
                                                float: right;
                                                color: #8492a6;
                                                font-size: 13px;
                                            "
                                            >{{ option.cityCode }}</span
                                        >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <div style="line-height: 28px; text-align: center">
                                <i class="el-icon-refresh" />
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item
                                prop="arrivalCity"
                                label="到达城市"
                                style="margin-bottom: 0"
                            >
                                <el-select
                                    v-model="listQuery.arrivalCity"
                                    filterable
                                    placeholder="到达城市"
                                    class="text-upper"
                                >
                                    <el-option
                                        v-for="option in citys"
                                        :key="option.cityCode"
                                        :value="option.cityCode"
                                        :label="option.cityNameCn + '(' + option.cityCode + ')'"
                                    >
                                        <span style="float: left">{{ option.cityNameCn }}</span>
                                        <span
                                            style="
                                                float: right;
                                                color: #8492a6;
                                                font-size: 13px;
                                            "
                                            >{{ option.cityCode }}</span
                                        >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" style="margin-left: 50px">
                            <el-form-item
                                prop="departureDate"
                                label="出发日期"
                                style="margin-bottom: 0"
                            >
                                <el-date-picker
                                    v-model="listQuery.departureDate"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="出发日期"
                                    @change="getDays"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row> -->
          <el-row>
            <el-col v-if="listQuery.tripType === 2" :span="1" style="margin-right: 20px">
              <div class="radio-text">1</div>
            </el-col>
            <el-col :span="8">
              <div class="div-flex">
                <div class="flex-left">
                  <div class="title">出发城市</div>
                  <div>
                    <el-form-item
                      prop="departureCity"
                      label=""
                      style="margin-bottom: 0"
                    >
                      <el-select
                        v-model="listQuery.departureCity"
                        filterable
                        placeholder="出发城市"
                        class="text-upper"
                      >
                        <!--  cityAirportList
                          <el-option
                          v-for="option in citys"
                          :key="option.cityCode"
                          :value="option.cityCode"
                          :label="option.cityNameCn + '(' + option.cityCode + ')'"
                        >
                          <span style="float: left">{{ option.cityNameCn }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px;">{{ option.cityCode }}</span>
                        </el-option> -->
                        <el-option
                          v-for="option in cityAirportList"
                          :key="option.code+'-'+option.type"
                          :value="option.code+'-'+option.type"
                          :label="option.name + '(' + option.code + ')'"
                        >
                          <span style="float: left" v-if="option.type===1"><el-tag type='success' effect="dark"> 城市 </el-tag>&nbsp&nbsp{{ option.name }}</span>
                          <span style="float: left" v-if="option.type===2"><el-tag type='' effect="dark">机场</el-tag>&nbsp&nbsp{{ option.name }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px;">{{ option.code }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div @click="changeDepartDestinCity">
                  <i class="el-icon-refresh" />
                </div>
                <div class="flex-right">
                  <div class="title">到达城市</div>
                  <div>
                    <el-form-item
                      prop="arrivalCity"
                      label=""
                      style="margin-bottom: 0"
                    >
                      <el-select
                        v-model="listQuery.arrivalCity"
                        filterable
                        placeholder="到达城市"
                        class="text-upper"
                      >
                        <!-- <el-option
                          v-for="option in citys"
                          :key="option.cityCode"
                          :value="option.cityCode"
                          :label="option.cityNameCn + '(' + option.cityCode + ')'"
                        >
                          <span style="float: left">{{ option.cityNameCn }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px;">{{ option.cityCode }}</span>
                        </el-option> -->
                        <el-option
                          v-for="option in cityAirportList"
                          :key="option.code+'-'+option.type"
                          :value="option.code+'-'+option.type"
                          :label="option.name + '(' + option.code + ')'"
                        >
                          <span style="float: left" v-if="option.type===1"><el-tag type='success' effect="dark"> 城市 </el-tag>&nbsp&nbsp{{ option.name }}</span>
                          <span style="float: left" v-if="option.type===2"><el-tag type='' effect="dark">机场</el-tag>&nbsp&nbsp{{ option.name }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px;">{{ option.code }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="4" style="margin-left: 20px">
              <div class="div-flex">
                <div class="flex-left">
                  <div class="title">出发日期</div>
                  <div>
                    <el-form-item
                      prop="departureDate"
                      label=""
                      style="margin-bottom: 0"
                    >
                      <el-date-picker
                        v-model="listQuery.departureDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="出发日期"
                        @change="getDays"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col v-if="listQuery.tripType === 1" :span="4" style="margin-left: 20px">
              <div class="div-flex">
                <div class="flex-left">
                  <div class="title">返回日期</div>
                  <div>
                    <el-form-item
                      prop="secondDepartureDate"
                      label=""
                      style="margin-bottom: 0"
                      :rules="{
                        required: listQuery.tripType === 1 ? true : false,
                        message: '请选择返回日期',
                      }"
                    >
                      <el-date-picker
                        v-model="listQuery.secondDepartureDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="返回日期"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="listQuery.tripType === 2">
            <el-col :span="1" style="margin-right: 20px">
              <div class="radio-text">2</div>
            </el-col>
            <el-col :span="8">
              <div class="div-flex">
                <div class="flex-left">
                  <div class="title">出发城市</div>
                  <div>
                    <el-form-item
                      prop="secondDepartureCity"
                      label=""
                      style="margin-bottom: 0"
                      :rules="{
                        required: listQuery.tripType === 2 ? true : false,
                        message: '请选择出发城市',
                      }"
                    >
                      <el-select
                        v-model="listQuery.secondDepartureCity"
                        filterable
                        placeholder="出发城市"
                        class="text-upper"
                      >
                        <el-option
                          v-for="option in cityAirportList"
                          :key="option.code+'-'+option.type"
                          :value="option.code+'-'+option.type"
                          :label="option.name + '(' + option.code + ')'"
                        >
                          <span style="float: left" v-if="option.type===1"><el-tag type='success' effect="dark"> 城市 </el-tag>&nbsp&nbsp{{ option.name }}</span>
                          <span style="float: left" v-if="option.type===2"><el-tag type='' effect="dark">机场</el-tag>&nbsp&nbsp{{ option.name }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px;">{{ option.code }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div @click="changeDepartDestinCity">
                  <i class="el-icon-refresh" />
                </div>
                <div class="flex-right">
                  <div class="title">到达城市</div>
                  <div>
                    <el-form-item
                      prop="secondArrivalCity"
                      label=""
                      style="margin-bottom: 0"
                      :rules="{
                        required: listQuery.tripType === 2 ? true : false,
                        message: '请选择到达城市',
                      }"
                    >
                      <el-select
                        v-model="listQuery.secondArrivalCity"
                        filterable
                        placeholder="到达城市"
                        class="text-upper"
                      >
                        <el-option
                          v-for="option in cityAirportList"
                          :key="option.code+'-'+option.type"
                          :value="option.code+'-'+option.type"
                          :label="option.name + '(' + option.code + ')'"
                        >
                          <span style="float: left" v-if="option.type===1"><el-tag type='success' effect="dark"> 城市 </el-tag>&nbsp&nbsp{{ option.name }}</span>
                          <span style="float: left" v-if="option.type===2"><el-tag type='' effect="dark">机场</el-tag>&nbsp&nbsp{{ option.name }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px;">{{ option.code }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="4" style="margin-left: 20px">
              <div class="div-flex">
                <div class="flex-left">
                  <div class="title">出发日期</div>
                  <div>
                    <el-form-item
                      prop="secondDepartureDate"
                      label=""
                      style="margin-bottom: 0"
                      :rules="{
                        required: listQuery.tripType === 2 ? true : false,
                        message: '请选择出发日期',
                      }"
                    >
                      <el-date-picker
                        v-model="listQuery.secondDepartureDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="出发日期"
                        @change="getDays"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="filter">
        <div class="flex">
          <div class="filter-title">起飞时间筛选：</div>
          <el-select
            v-model="listQuery.time"
            placeholder="起飞时段"
            style="width: 250px"
            clearable
          >
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="
                item.departureTimeBegin +
                  '-' +
                  item.departureTimeEnd
              "
            />
          </el-select>
          <div class="filter-title">舱等筛选：</div>
          <el-select
            v-model="listQuery.cabinLevel"
            placeholder="舱等"
            style="width: 250px"
            clearable
          >
            <el-option
              v-for="item in cabinLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="filter-title">排序：</div>
          <!-- v-if="listQuery.tripType !== 2" -->
          <el-select
            v-model="listQuery.getFlightListSortType"
            placeholder="排序"
            style="width: 250px"
            clearable
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="days mt-10">
        <el-tabs
          v-model="selectedDay"
          type="card"
          @tab-click="handleClickDay"
        >
          <el-tab-pane
            v-for="option in days"
            :key="option.date"
            :label="option.date + ' ' + option.week"
            :name="option.date"
            :disabled="lessThanCurrentDay(option.date)"
          />
        </el-tabs>
      </div>
      <div v-if="twoTripType === 0 || twoTripType === 1">
        <div class="two-trip to-trip" :class="{'isActive':twoTripType === 0}" @click="twoTripChange(0)">
          <div class="trip-btn to-way"> <span v-if="listQuery.tripType == 1">去程</span> <span v-if="listQuery.tripType == 2">第一程</span></div>
          <div class="trip-text">{{ listQuery.departureCity | cityNameFilter }}({{ listQuery.departureCity }}) ✈ {{ listQuery.arrivalCity | cityNameFilter }}({{ listQuery.arrivalCity }})</div>
        </div>
        <div class="two-trip return-trip" :class="{'isActive': twoTripType === 1}" @click="twoTripChange(1)">
          <div class="trip-btn return-way"> <span v-if="listQuery.tripType == 1">返程</span> <span v-if="listQuery.tripType == 2">第二程</span></div>
          <div v-if="listQuery.tripType === 1" class="trip-text">{{ listQuery.arrivalCity | cityNameFilter }}({{ listQuery.arrivalCity }}) ✈ {{ listQuery.departureCity | cityNameFilter }}({{ listQuery.departureCity }})</div>
          <div v-if="listQuery.tripType === 2" class="trip-text">{{ listQuery.secondDepartureCity | cityNameFilter }}({{ listQuery.secondDepartureCity }}) ✈ {{ listQuery.secondArrivalCity | cityNameFilter }}({{ listQuery.secondArrivalCity }})</div>
        </div>
        <div v-if="twoTripType === 1" class="selected-trip"><span v-if="listQuery.tripType == 1">已选去程</span> <span v-if="listQuery.tripType == 2">已选第一程</span>：{{ listQuery.departureCity | cityNameFilter }}→{{ listQuery.arrivalCity | cityNameFilter }} {{ selectedTwoFlight.flights1.departureDate | substringMonthDate }} {{ selectedTwoFlight.flights1.airline }}{{ selectedTwoFlight.flights1.flightNo }} {{ selectedTwoFlight.flights1.departureTime | substringHourMinutes }}-{{ selectedTwoFlight.flights1.arrivalTime | substringHourMinutes }}
          <el-button @click="getList()">
            编辑
          </el-button>
        </div>
      </div>
      <!-- 多程 -->
      <div v-if="listQuery.tripType !== 0">
        <!-- 去程 -->
        <table
          v-if="twoTripType === '' || twoTripType === 0"
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
              <td>舱等</td>
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
                      <!--                      基建：{{ item.cabinClassPrices[0].airportTax }}-->
                    </div>
                    <div class="flight-normal-text">
                      <!--                      燃油：{{ item.cabinClassPrices[0].fuelTax }}-->
                    </div>
                  </td>
                  <td>
                    <div class="flight-cabin-level">
                      <!--                      {{ $t(`AdminService["Enum:CabinClassType:${item.cabinClassPrices[0].cabinLevel}"]`) }} ({{ item.cabinClassPrices[0].cabin }})-->
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
                      }}（含税）<br>
                      <span v-if="listQuery.tripType === 1" class="flight-normal-text">往返总价</span>
                      <span v-if="listQuery.tripType === 2" class="flight-normal-text">两程总价</span>
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
                      <br>
                      <span v-if="listQuery.tripType === 1" class="flight-normal-text">往返总价</span>
                      <span v-if="listQuery.tripType === 2" class="flight-normal-text">两程总价</span>
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
                    <!-- <span class="flight-remaining ml-10">余{{ $t(`Juzo["Enum:CabinStatusType:${item.cabinClassPrices[0].status}"]`) }}</span> -->
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
              <td>舱等</td>
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
                      <!--                      基建：{{ item.cabinClassPrices[0].airportTax }}-->
                    </div>
                    <div class="flight-normal-text">
                      <!--                      燃油：{{ item.cabinClassPrices[0].fuelTax }}-->
                    </div>
                  </td>
                  <td>
                    <div class="flight-cabin-level">
                      <!--                      {{ $t(`AdminService["Enum:CabinClassType:${item.cabinClassPrices[0].cabinLevel}"]`) }}-->
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
                      <br>
                      <span v-if="listQuery.tripType === 1" class="flight-normal-text">往返总价</span>
                      <span v-if="listQuery.tripType === 2" class="flight-normal-text">两程总价</span>
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
                      <br>
                      <span v-if="listQuery.tripType === 1" class="flight-normal-text">往返总价</span>
                      <span v-if="listQuery.tripType === 2" class="flight-normal-text">两程总价</span>
                    </div>
                  </td>
                  <td>
                    <el-button
                      :loading="btnLoading"
                      :disabled="btnLoading"
                      type="primary"
                      plain
                      @click="twoCabinPriceList(item,index)"
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
                            :type="detailItem && detailItem.productName ? detailItem.productName.includes('标准') ? 'success' : detailItem.productName.includes('特价') ? 'warning' : 'danger' : 'success'"
                            :underline="false"
                          >
                            {{ detailItem ? detailItem.productName : '' }}
                          </el-link>
                        </td>
                        <td colspan="2">
                          <el-tag type="warning">{{ $t(`AdminService["Enum:ReimbursementType:${detailItem ? detailItem.reimbursementType : null}"]`) }}</el-tag>
                        </td>
                        <td />
                        <td>
                          <div>
                            <el-link
                              type="primary"
                              :underline="false"
                            >
                              <span v-if="listQuery.tripType === 1">去程:</span> <span v-if="listQuery.tripType === 2">第一程:</span>
                              {{ $t(`AdminService["Enum:CabinClassType:${detailItem.cabinLevel}"]`) }} {{ detailItem.cabin }}舱
                            </el-link>
                          </div>
                          <div>
                            <el-link
                              type="primary"
                              :underline="false"
                            >
                              <span v-if="listQuery.tripType === 1">返程:</span> <span v-if="listQuery.tripType === 2">第二程:</span>
                              {{ $t(`AdminService["Enum:CabinClassType:${detailItem.cabinLevel2}"]`) }} {{ detailItem.cabin2 }}舱
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
                            <br>
                            <span v-if="listQuery.tripType === 1" class="flight-normal-text">往返总价</span>
                            <span v-if="listQuery.tripType === 2" class="flight-normal-text">两程总价</span>
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
                            <br>
                            <span v-if="listQuery.tripType === 1" class="flight-normal-text">往返总价</span>
                            <span v-if="listQuery.tripType === 2" class="flight-normal-text">两程总价</span>
                          </div>
                        </td>
                        <td>
                          <el-button
                            :loading="btnLoading"
                            :disabled="btnLoading"
                            type="warning"
                            @click="booking(detailItem)"
                          >预定</el-button>
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

      <!-- 单程.. -->
      <div v-else>
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
              <td>舱等</td>
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
                  <td
                    :rowspan="item.cabinClassPrices.length"
                    :colspan="1"
                  >
                    <div class="flight-time">
                      {{ item.departureTime | substringHourMinutes }}
                    </div>
                    <div class="flight-normal-text">
                      {{ item.departureAirport | airportNameFilter }}{{ item.departureTerminal }}
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
                  <td
                    :rowspan="item.cabinClassPrices.length"
                    :colspan="1"
                  >
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
                      @click="toggleDetails(index, 0, item, item.cabinClassPrices[0].cabinLevel)"
                    >选择
                    </el-button>
                    <el-button
                      v-if="isExpandedBtn === index + '-0'"
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
                <template v-if="item.cabinClassPrices">
                  <template v-for="(cabinLevelItem, cabinLevelIndex) in item.cabinClassPrices">
                    <tr v-if="cabinLevelIndex > 0" :key="index + '-' + cabinLevelIndex">
                      <td>
                        <div class="flight-normal-text">
                          基建：{{ cabinLevelItem.airportTax }}
                        </div>
                        <div class="flight-normal-text">
                          燃油：{{ cabinLevelItem.fuelTax }}
                        </div>
                      </td>
                      <td>
                        <div class="flight-cabin-level">
                          {{ $t(`AdminService["Enum:CabinClassType:${cabinLevelItem.cabinLevel}"]`) }}
                        </div>
                      </td>
                      <td>
                        <div>
                          <span class="flight-price-red">
                            <span class="rmb-text">￥</span>
                            {{ cabinLevelItem.ticketPrice }}
                          </span>
                          <span class="flight-normal-text">起</span>
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
                      <td>
                        <div>
                          <span class="flight-price-black">
                            <span class="rmb-text">￥</span>
                            {{ cabinLevelItem.settlementPrice }}
                          </span>
                          <span class="flight-normal-text">起</span>
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
                      <td>
                        <el-button
                          :loading="btnLoading"
                          :disabled="btnLoading"
                          type="primary"
                          plain
                          @click="toggleDetails(index, cabinLevelIndex, item, cabinLevelItem.cabinLevel)"
                        >选择
                        </el-button>
                        <el-button
                          v-if="isExpandedBtn === (index + '-' + cabinLevelIndex)"
                          type="info"
                          plain
                          :disabled="btnLoading"
                          @click="isExpanded = ''; isExpandedBtn = ''"
                        >收起
                        </el-button>
                        <span class="flight-remaining ml-10">余{{ $t(`Juzo["Enum:CabinStatusType:${cabinLevelItem.status}"]`) }}</span>
                      </td>
                    </tr>
                    <!-- 展示对应的舱等信息 -->
                    <template v-if="cabinLevelIndex === item.cabinClassPrices.length - 1">
                      <template v-for="(detailItem, detailIndex) in expandedDetails">
                        <el-collapse-transition :key="index + '-' + cabinLevelIndex + '-' + detailIndex">
                          <tr v-show="isExpanded === index" class="detail-bg">
                            <td colspan="2">
                              <el-link
                                :type="detailItem.productName.includes('标准') ? 'success' : detailItem.productName.includes('特价') ? 'warning' : 'danger'"
                                :underline="false"
                              >
                                {{ detailItem.productName }}
                              </el-link>
                            </td>
                            <td colspan="2">
                              <el-tag type="warning">{{ $t(`AdminService["Enum:ReimbursementType:${detailItem.reimbursementType}"]`) }}</el-tag>
                            </td>
                            <td>
                              <el-popover
                                placement="right"
                                width="200"
                                :open-delay="500"
                                trigger="hover"
                              >
                                <div class="yellow-text">
                                  <div>产品说明：{{ detailItem.description }}</div>
                                  <!-- <div>报销凭证：{{ detailItem.description }}</div> -->
                                  <div>最晚出票时限：{{ detailItem.issueTimeLimitStr }}</div>
                                  <div>自愿改期：{{ detailItem.voluntaryRefundTimeLimitStr }}</div>
                                  <div>自愿退票：{{ detailItem.involuntaryRefundTimeLimitStr }}</div>
                                  <div>非自愿退票：{{ detailItem.voluntaryChangeTimeLimitStr }}</div>
                                </div>
                                <el-link
                                  slot="reference"
                                  type="primary"
                                  :underline="false"
                                >标准产品
                                </el-link>
                              </el-popover>
                              <el-popover
                                placement="right-start"
                                title="行李额"
                                width="500"
                                trigger="hover"
                                :open-delay="500"
                                @show="showLuggageWeight(detailItem)"
                              >
                                <!-- <div v-if="cabinWeight.luggageWeight">
                                  <span class="red-text">携带行李额：</span>{{ cabinWeight.luggageWeight }}kg
                                </div>
                                <div v-if="cabinWeight.handLuggageWeight">
                                  <span class="red-text">手提行李额：</span>{{ cabinWeight.handLuggageWeight }}kg
                                </div> -->
                                <div v-if="cabinWeight.baggageRemark">
                                  {{ cabinWeight.baggageRemark }}
                                </div>
                                <div slot="reference">
                                  <el-link
                                    type="primary"
                                  >行李额
                                  </el-link>
                                </div>
                              </el-popover>
                              <el-popover
                                placement="right"
                                title="退改签规定"
                                width="500"
                                trigger="hover"
                                :open-delay="500"
                                @show="showGuestRule(detailItem)"
                              >
                                <table v-if="refundChangeRule.audltChangeRule.length > 0" class="rule-table">
                                  <tr>
                                    <td :rowspan="2">
                                      成人改期费
                                    </td>
                                    <template v-for="(adultChange, adultChangeIndex) in refundChangeRule.audltChangeRule">
                                      <td :key="'adultChangeRule' + adultChangeIndex">
                                        <span v-if="adultChange.beforeMaxDistanceHours > 0">{{ adultChange.beforeMaxDistanceHours }}</span> -
                                        <span v-if="adultChange.beforeMinDistanceHours >= 0">{{ adultChange.beforeMinDistanceHours }}</span>
                                      </td>
                                    </template>
                                  </tr>
                                  <tr>
                                    <td
                                      v-for="(adultChangeVal, adultValIndex) in refundChangeRule.audltChangeRule"
                                      :key="'adultChangeVal' + adultValIndex"
                                    >
                                      <span class="red-text">{{ adultChangeVal.feesRate }}</span>%
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      成人退订费
                                    </td>
                                    <td
                                      v-for="(adultRefundVal, adultRefundValIndex) in refundChangeRule.audltRefundRule"
                                      :key="'adultRefundVal' + adultRefundValIndex"
                                    >
                                      <span class="red-text">{{ adultRefundVal.feesRate }}</span>%
                                    </td>
                                  </tr>
                                </table>

                                <table
                                  v-if="refundChangeRule.childChangeRule.length > 0"
                                  class="rule-table"
                                >
                                  <tr>
                                    <td :rowspan="2">
                                      儿童改期费
                                    </td>
                                    <template v-for="(childChange, childChangeIndex) in refundChangeRule.childChangeRule">
                                      <td :key="'childChangeRule' + childChangeIndex">
                                        <span v-if="childChange.beforeMaxDistanceHours >0">{{ childChange.beforeMaxDistanceHours }}</span>-
                                        <span v-if="childChange.beforeMinDistanceHours >=0">{{ childChange.beforeMinDistanceHours }}</span>
                                      </td>
                                    </template>
                                  </tr>
                                  <tr>
                                    <td
                                      v-for="(childChangeVal, childChangeValIndex) in refundChangeRule.childChangeRule"
                                      :key="'childChangeVal' + childChangeValIndex"
                                    >
                                      <span class="red-text">{{ childChangeVal.feesRate }}</span>%
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      儿童退订费
                                    </td>
                                    <td
                                      v-for="(childRefundVal, childRefundValIndex) in refundChangeRule.childRefundRule"
                                      :key="'childRefundVal' + childRefundValIndex"
                                    >
                                      <span class="red-text">{{ childRefundVal.feesRate }}</span>
                                    </td>
                                  </tr>
                                </table>
                                <div slot="reference">
                                  <el-link type="primary">退改签规定</el-link>
                                </div>
                              </el-popover>
                            </td>
                            <td>
                              <div>
                                <el-link
                                  type="primary"
                                  :underline="false"
                                >
                                  {{ $t(`AdminService["Enum:CabinClassType:${detailItem.cabinLevel}"]`) }}
                                </el-link>
                              </div>
                              <div>
                                {{ detailItem.cabin }}舱
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
                                @click="booking(detailItem)"
                              >预定</el-button>
                              <span class="flight-remaining ml-10">余{{ $t(`Juzo["Enum:CabinStatusType:${item.cabinClassPrices[0].status}"]`) }}</span>
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
              <td colspan="9" class="text-center">暂无符合的航班</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-form>
  </div>
</template>

<script>
import TripTypeEnum from '@/enum/TripType'
import CabinClassTypeEnum from '@/enum/CabinClassType'
import { fetchList as getAirlinestNoPage } from '@/api/basic/airline'
import { cityList as getCitysNoPage } from '@/api/city/city'
import {
    flightList,
    twoFlightList,
    cabinClassPrice,
    verifyPrice,
    twoWayVerifyPrice,
  twoWayCabinPriceList,
    getCityAirportList
} from '@/api/domestic-tickets/booking'
import AirlineName from '@/components/BaseName/AirlineName'
import {
    flightGuestRuleSearch,
    flightCabinLuggageWeightSearch
} from '@/api/domestic-tickets/booking'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
    name: 'Issue',
    components: {
      AirlineName
    },
    data() {
      return {
        loading: false,
        btnLoading: false,
        tripTypeOptions: [],
        airlines: [],
        citys: [],
        timeOptions: [
            {
              value: 1,
              departureTimeBegin: '00:00',
              departureTimeEnd: '12:00',
              label: '上午00:00 - 12:00'
            },
            {
              value: 2,
              departureTimeBegin: '12:00',
              departureTimeEnd: '14:00',
              label: '中午12:00 - 14:00'
            },
            {
              value: 3,
              departureTimeBegin: '14:00',
              departureTimeEnd: '18:00',
              label: '下午14:00 - 18:00'
            },
            {
              value: 4,
              departureTimeBegin: '18:00',
              departureTimeEnd: '23:59',
              label: '晚上18:00 - 24:00'
            }
        ],
        cabinLevelOptions: [],
        sortOptions: [
          {
            value: 0,
            label: '价格从低到高'
          },
          {
            value: 1,
            label: '起飞时间从早到晚'
          },
          {
            value: 2,
            label: '到达时间从早到晚'
          }
        ],
        selectedDay: moment(new Date()).format('YYYY-MM-DD'),
        days: [],
        list: [],
        listQuery: {
          tripType: 0,
          directOnly: true,
          departureCity: 'CAN-1',
          arrivalCity: 'TNA-1',
          departureAirport: '',
          arrivalAirport: '',
          departureDate: moment(new Date()).format('YYYY-MM-DD'),
          secondDepartureCity: '',
          secondArrivalCity: '',
          secondDepartureDate: null,
          getFlightListSortType: 1
        },
        // 去程信息
        twoFlight: {
          flights1: [],
          flights2: []
        },
        selectedTwoFlight: {
          flights1: {
            flightId: '',
            airline: ''
          }
        },
        listQueryNoPage: {
          size: -1,
          current: -1
        },
        formRules: {
          departureCity: [
            {
              required: true,
              message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
              trigger: 'blur'
            }
          ],
          arrivalCity: [
            {
              required: true,
              message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
              trigger: 'blur'
            }
          ],
          departureDate: [
            {
              required: true,
              message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
              trigger: 'change'
            }
          ]
        },
        isExpanded: '',
        isExpandedBtn: '',
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
        adultRefundChangeRules: [],
        twoTripType: '',
        twoexpandedDetails: [],
        cityAirportList: []
      }
    },
    computed: {},
    created() {
      this.getAirlines()
      this.getCitys()
      this.getCityAirportList()
      this.getDays(this.listQuery.departureDate)
      this.listQuery.getFlightListSortType = 0

      if (this.$route.query.flightTripType) { 
        this.listQuery.tripType=this.$route.query.flightTripType
      }
      
      if (this.$route.query.oneDepartureDate) { 
        this.listQuery.departureDate = this.$route.query.oneDepartureDate
      }
      if (this.$route.query.oneDepartureAirport) { 
        this.listQuery.departureCity=this.$route.query.oneDepartureAirport
      }
      if (this.$route.query.oneArriveAirport) { 
        this.listQuery.arrivalCity=this.$route.query.oneArriveAirport
      }

      if (this.$route.query.twoDepartureDate) { 
        this.listQuery.secondDepartureDate=this.$route.query.twoDepartureDate
      }

      if (this.$route.query.twoDepartureAirport) { 
        this.listQuery.secondDepartureCity=this.$route.query.twoDepartureAirport
      }

      if (this.$route.query.twoArriveAirport) { 
        this.listQuery.secondArrivalCity=this.$route.query.twoArriveAirport
      }

      if (this.$route.query.airline) { 
        this.listQuery.airline=this.$route.query.airline
      }
      


      
      this.$nextTick(() => {

        this.getList()
      })
    },
    mounted() {
      this.tripTypeOptions = Object.keys(TripTypeEnum.TripType).map((key) => ({
        value: TripTypeEnum.TripType[key],
        label: this.$t(`AdminService["Enum:TripType:${TripTypeEnum.TripType[key]}"]`)
      }))
      this.cabinLevelOptions = Object.keys(CabinClassTypeEnum.CabinClassType).map((key) => ({
        value: CabinClassTypeEnum.CabinClassType[key],
        label: key
      }))
    },
  methods: {
    getCityAirportList() {
        getCityAirportList()
          .then((response) => {
            this.cityAirportList = response.data
          })
          .catch(() => {
          })
      },
      getAirlines() {
        this.loading = true
        getAirlinestNoPage(this.listQueryNoPage)
          .then((response) => {
            this.loading = false
            this.airlines = response.data.records
          })
          .catch(() => {
            this.loading = false
          })
      },
      getCitys() {
        this.loading = true
        getCitysNoPage(this.listQueryNoPage)
          .then((response) => {
            this.loading = false
            this.citys = response.data
          })
          .catch(() => {
            this.loading = false
          })
      },
      reset() {
        this.btnLoading = false
        this.list = []
        this.flightId = ''
        this.airline = ''
        this.departureTime = ''
        this.isExpanded = false
        this.expandedDetails = []
        // 去程信息
        this.twoTripType = ''
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
      },
      getList() {
        this.reset()

        this.$refs.searchFormRef.validate((valid) => {
          if (valid) {
              if (this.listQuery.time) {
                const timeSplit = this.listQuery.time.split('-')
                this.listQuery.departureTimeBegin = timeSplit[0]
                this.listQuery.departureTimeEnd = timeSplit[1]
              }
              // if (this.listQuery.getFlightListSortType === '') {
              //   delete this.listQuery.getFlightListSortType
              // }
              this.loading = true
              var departureCityVar =''
              var arrivalCityVar = ''
              var departureAirportVar = this.$route.query.oneDepartureAirport?this.$route.query.oneDepartureAirport:''
              var arrivalAirportVar = this.$route.query.oneArriveAirport?this.$route.query.oneArriveAirport:''
             
              // 判断起飞、到达选择的是城市还是机场
              if (this.listQuery.departureCity.split('-')[1] === '1') { 
                departureCityVar = this.listQuery.departureCity.split('-')[0]
              }
              if (this.listQuery.departureCity.split('-')[1] === '2') { 
                departureAirportVar =  this.listQuery.departureCity.split('-')[0]
              }
              if (this.listQuery.arrivalCity.split('-')[1] === '1') { 
                arrivalCityVar = this.listQuery.arrivalCity.split('-')[0]
              }
              if (this.listQuery.arrivalCity.split('-')[1] === '2') { 
                arrivalAirportVar = this.listQuery.arrivalCity.split('-')[0]
            }
          
            if (this.listQuery.tripType === 0) {

              //console.log('****this.listQuery', this.listQuery)
              
              flightList({
                airline:this.listQuery.airline,
                tripType:0,
                departureCity:departureCityVar,
                arrivalCity:arrivalCityVar,
                departureAirport:departureAirportVar,
                arrivalAirport:arrivalAirportVar,
                departureDate:this.listQuery.departureDate,
                directOnly:this.listQuery.directOnly,
                cabinLevel:this.listQuery.cabinLevel,
                departureTimeBegin:this.listQuery.departureTimeBegin,
                departureTimeEnd:this.listQuery.departureTimeEnd,
                getFlightListSortType:this.listQuery.getFlightListSortType
              }).then((response) => {
                    this.loading = false
                    if (response) {
                      this.list = response
                    }
                  })
                  .catch(() => {
                    this.loading = false
                  })
            } else {
              this.loading = true
              var secondDepartureCityVar =''
              var secondArrivalCityVar = ''
              var secondDepartureAirportVar = ''
              var secondArrivalAirportVar = ''
              // 往返
                if (this.listQuery.tripType === 1) {
                  // this.listQuery.secondDepartureCity = this.listQuery.arrivalCity
                  // this.listQuery.secondArrivalCity = this.listQuery.departureCity
                  secondDepartureCityVar = departureCityVar
                  secondDepartureAirportVar = departureAirportVar
                  secondArrivalCityVar = arrivalCityVar
                  secondArrivalAirportVar = arrivalAirportVar
                }
               // 多程
              if (this.listQuery.tripType === 2) {
                if (this.listQuery.secondDepartureCity.split('-')[1] === '1') { 
                  secondDepartureCityVar = this.listQuery.secondDepartureCity.split('-')[0]
                }
                if (this.listQuery.secondDepartureCity.split('-')[1] === '2') { 
                  secondDepartureAirportVar =  this.listQuery.secondDepartureCity.split('-')[0]
                }
               if (this.listQuery.secondArrivalCity.split('-')[1] === '1') { 
                  secondArrivalCityVar = this.listQuery.secondArrivalCity.split('-')[0]
                }
                if (this.listQuery.secondArrivalCity.split('-')[1] === '2') { 
                  secondArrivalAirportVar = this.listQuery.secondArrivalCity.split('-')[0]
                }
              }
             console.log('this.listQuery',this.listQuery)
              twoFlightList({
                  airline:this.listQuery.airline,
                  tripType:this.listQuery.tripType,
                  departureCity:departureCityVar,
                  arrivalCity:arrivalCityVar,
                  departureAirport:departureAirportVar,
                  arrivalAirport:arrivalAirportVar,
                  departureDate:this.listQuery.departureDate,
                  directOnly:this.listQuery.directOnly,
                  secondDepartureCity:secondDepartureCityVar,
                  secondArrivalCity:secondArrivalCityVar,
                  secondDepartureAirport:secondDepartureAirportVar,
                  secondArrivalAirport:secondArrivalAirportVar,
                  secondDepartureDate:this.listQuery.secondDepartureDate,
                  getFlightListSortType:this.listQuery.getFlightListSortType,
                  cabinLevel:this.listQuery.cabinLevel,
                  departureTimeBegin:this.listQuery.departureTimeBegin,
                  departureTimeEnd:this.listQuery.departureTimeEnd
                 }) .then((res) => {
                    this.loading = false
                    if (res) {
                      this.twoFlight = res
                      if (this.twoFlight.flights1 && this.twoFlight.flights1.length > 0) {
                        this.twoFlight.flights1.forEach((f1) => {
                          f1.cabinClassPrices = res.cabinClassPrices.filter(x => x.flightId1 === f1.flightId).sort((a, b) => a.ticketPrice - b.ticketPrice)
                        })
                      }
                    }
                  })
                  .catch(() => {
                    this.loading = false
                  })
}
          } else {
            this.$message.error('请完善必填项')
          }
        })
      },
      tripTypeChange() {
        this.listQuery.secondDepartureCity = ''
        this.listQuery.secondArrivalCity = ''
        this.listQuery.secondDepartureDate = null
        this.tripType = this.listQuery.tripType
      },
      changeDepartDestinCity() {
        const tempDestinCity = this.listQuery.departureCity
        this.listQuery.departureCity = this.listQuery.arrivalCity
        this.listQuery.arrivalCity = tempDestinCity
      },
      getDays(date) {
        if (!date) {
          return
        }
        const dayArr = []
        // 这里直接使用date会修改日期面板中的时间，可使用moment(dateString) 变相解决
        for (let index = 3; index > 0; index--) {
          const btd = moment(date).subtract(index, 'days').format('YYYY-MM-DD')
          dayArr.push({
            date: btd,
            week: this.getWeek(btd)
          })
        }

        for (let index = 0; index < 4; index++) {
          // 未来
          const atd = moment(date).add(index, 'days').format('YYYY-MM-DD')
          dayArr.push({
            date: atd,
            week: this.getWeek(atd)
          })
        }
        this.selectedDay = moment(date).format('YYYY-MM-DD')
        this.days = dayArr
      },
      getWeek(date) {
        const week = moment(date).day()
        switch (week) {
          case 1:
            return '星期一'
          case 2:
            return '星期二'
          case 3:
            return '星期三'
          case 4:
            return '星期四'
          case 5:
            return '星期五'
          case 6:
            return '星期六'
          default:
            return '星期日'
        }
      },
      lessThanCurrentDay(date) {
        const targetDate = new Date(date)
        // 获取当前日期
        const currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)
        // 比较两个日期的年、月、日部分
        if (targetDate.getTime() < currentDate.getTime()) {
          // console.log('目标日期早于当前日期')
          return true
        } else if (targetDate.getTime() > currentDate.getTime()) {
          // console.log('目标日期晚于当前日期')
          return false
        } else {
          // console.log('目标日期等于当前日期')
          return true
        }
      },
      handleClickDay() {
        this.getDays(this.selectedDay)
        this.listQuery.departureDate = moment(this.selectedDay).format('YYYY-MM-DD')
        this.getList()
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex < 5) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
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
        twoWayCabinPriceList(
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
      toggleDetails(index, btnIndex, item, cabinLevel) {
        this.btnLoading = true
        this.isExpandedBtn = `${index}-${btnIndex}`
        this.isExpanded = index
        this.flightId = item.flightId
        this.airline = item.airline
        this.departureTime = item.departureTime
        cabinClassPrice({ flightId: this.flightId, cabinLevel: cabinLevel })
          .then((response) => {
            if (response) {
              this.expandedDetails = response
            }
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      },
      // 选择去程
      selectedFlight1(item) {
        this.btnLoading = true
        this.twoTripType = 1
        this.selectedTwoFlight.flights1 = item
        // 查找和去程对应的返程
        this.twoFlight.flights2 = this.twoFlight.flights2.filter(f2 => f2.flightId1.includes(item.flightId))
        if (this.twoFlight.flights2.length > 0) {
          this.twoFlight.flights2.forEach((f2) => {
            const list = this.twoFlight.cabinClassPrices.filter(x => x.flightId2 === f2.flightId && x.flightId1 === item.flightId)
            f2.cabinClassPrices = list
          })
        }
        this.btnLoading = false
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
            departureTime: this.listQuery.departureDate + ' ' + this.departureTime
          }).then((response) => {
              if (response) {
                this.refundChangeRule.audltRefundRule = response.data
                  .filter((x) => x.guestRuleType === 0 && x.passengerType === 0)
                  .sort((a, b) => b.beforeMaxDistanceHours - a.beforeMaxDistanceHours)
                this.refundChangeRule.audltChangeRule = response.data
                  .filter((x) => x.guestRuleType === 1 && x.passengerType === 0)
                  .sort((a, b) => b.beforeMaxDistanceHours - a.beforeMaxDistanceHours)
                this.refundChangeRule.childRefundRule = response.data
                  .filter((x) => x.guestRuleType === 0 && x.passengerType === 1)
                  .sort((a, b) => b.beforeMaxDistanceHours - a.beforeMaxDistanceHours)
                this.refundChangeRule.childChangeRule = response.data
                  .filter((x) => x.guestRuleType === 1 && x.passengerType === 1)
                  .sort((a, b) => b.beforeMaxDistanceHours - a.beforeMaxDistanceHours)
              }
          })
      },
      // twoTripChange
      twoTripChange(type) {
        this.twoTripType = type
      },
      booking(cabinPrice) {
        this.btnLoading = true
        if (this.listQuery.tripType === 0) {
          verifyPrice({
            flightId: this.flightId,
            cabinPrice: cabinPrice
          })
            .then((response) => {
              this.btnLoading = false
              if (response) {
                  response.tripType = 0
                  sessionStorage.setItem('verifyPrice', JSON.stringify(response))
                  // 关闭当前路由
                  this.$store.dispatch('tagsView/delView', this.$route)
                  this.$router.replace({ path: '/domestic-tickets/ticket-passenger' })
              }
            })
            .catch(() => {
              this.btnLoading = false
            })
        } else {
          twoWayVerifyPrice(cabinPrice).then((res) => {
            this.btnLoading = false
            if (res.key) {
                res.tripType = this.listQuery.tripType
                sessionStorage.setItem('verifyPrice', JSON.stringify(res))
                const verifyPriceCookie = sessionStorage.getItem('verifyPrice')
                console.log(verifyPriceCookie)
                // 关闭当前路由
                this.$store.dispatch('tagsView/delView', this.$route)
                this.$router.replace({ path: '/domestic-tickets/ticket-passenger' })
            }
          })
          .catch(() => {
            this.btnLoading = false
          })
        }
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
      padding: 10px 20px;
      align-items: center;

      .title {
          font-size: 12px;
          text-align: left;
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
          font-weight: blod;
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

  .radio-text {
    width: 40px;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
    border: 1px solid #d9ecff;
    border-radius: 20px;
    text-align: center;
    margin: 24px 40px;
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
