<template>
  <div class="app-container">
    <el-form
      ref="formRef"
      :model="detail"
      :rules="formRules"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row :gutter="20">
        <el-col :span="19">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="box-card-title">乘机人</span>
            </div>
            <div class="box-card-content">
              <template
                v-for="(passenger, passengerIndex) in detail.passengers"
              >
                <table
                  :key="passengerIndex"
                  cellspacing="0"
                  border="0"
                  class="passenger-table"
                >
                  <template
                    v-if="
                      !passenger.identityType || passenger.identityType == 0
                    "
                  >
                    <tr>
                      <td>乘客类型</td>
                      <td>姓名</td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].identityType`"
                          :rules="listRules.identityType"
                          class="mb-0"
                        >
                          <el-select
                            v-model="passenger.identityType"
                            clearable
                            placeholder="证件类型"
                          >
                            <el-option
                              v-for="option in identityCardTypeOptions"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label"
                            />
                          </el-select>
                        </el-form-item>
                      </td>
                      <td>出生日期</td>
                      <td
                        rowspan="4"
                        colspan="1"
                        style="
                            background-color: #fff
                            color: #1890ff
                          "
                      >
                        <div
                          v-if="detail.passengers.length != 1"
                          @click="deletePassenger(passengerIndex)"
                        >
                          <i class="el-icon-delete" style="font-size: 20px" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].type`"
                          class="mb-0"
                        >
                          <el-select
                            v-model="passenger.type"
                            clearable
                            placeholder="乘机人类型"
                            @change="passengerTypeChange"
                          >
                            <el-option
                              v-for="option in passengerTypeOptions"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label"
                            />
                          </el-select>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].lastName`"
                          :rules="listRules.name"
                          class="mb-0"
                        >
                          <el-input
                            v-model.trim="passenger.lastName"
                            clearable
                            placeholder="乘机人"
                            @input="nameChange($event, passengerIndex, 'lastName')"
                          />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].identityNo`"
                          :rules="listRules.identityNo"
                          class="mb-0"
                        >
                          <el-input
                            v-model.trim="passenger.identityNo"
                            clearable
                            placeholder="证件号码"
                            @change="identityNoChange($event, passengerIndex)"

                          />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].birthDate`"
                          :rules="listRules.birthDate"
                          class="mb-0"
                        >
                          <el-date-picker
                            v-model="passenger.birthDate"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            @change="birthDateChange($event, passengerIndex)"
                          />
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td>性别</td>
                      <td>手机</td>
                      <td>
                        发卡银行
                        <el-checkbox v-model="passenger.isGP" class="ml-10">GP</el-checkbox>
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].genderType`"
                          class="mb-0"
                        >
                          <el-radio-group v-model="passenger.genderType">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].phone`"
                          :rules="listRules.phone"
                          class="mb-0"
                        >
                          <el-input
                            v-model="passenger.phone"
                            clearable
                            placeholder="手机号码"
                          />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].bankNo`"
                          class="mb-0"
                        >
                          <el-input
                            v-model="passenger.bankNo"
                            clearable
                            placeholder="发卡银行"
                          />
                        </el-form-item>
                      </td>
                      <td />
                    </tr>
                  </template>
                  <template v-if="passenger.identityType != 0">
                    <tr>
                      <td>乘客类型</td>
                      <td>姓（拼音）</td>
                      <td>名（拼音）</td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].identityType`"
                          class="mb-0"
                        >
                          <el-select
                            v-model="passenger.identityType"
                            clearable
                            placeholder="证件类型"
                          >
                            <el-option
                              v-for="option in identityCardTypeOptions"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label"
                            />
                          </el-select>
                        </el-form-item>
                      </td>
                      <td>出生日期</td>
                      <td
                        rowspan="4"
                        colspan="1"
                        style="
                          background-color: #fff;
                          color: #1890ff
                        "
                      >
                        <div
                          v-if="detail.passengers.length != 1"
                          @click="deletePassenger(passengerIndex)"
                        >
                          <i class="el-icon-delete" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].type`"
                          class="mb-0"
                        >
                          <el-select
                            v-model="passenger.type"
                            clearable
                            placeholder="乘机人类型"
                            @change="passengerTypeChange"
                          >
                            <el-option
                              v-for="option in passengerTypeOptions"
                              :key="option.value"
                              :value="option.value"
                              :label="option.label"
                            />
                          </el-select>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].lastName`"
                          :rules="listRules.lastName"
                          class="mb-0"
                        >
                          <el-input
                            v-model="passenger.lastName"
                            clearable
                            placeholder="例:ZHOU"
                            @input="
                              nameChange($event, passengerIndex, 'lastName')
                            "
                          />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].firstName`"
                          :rules="listRules.firstName"
                          class="mb-0"
                        >
                          <el-input
                            v-model="passenger.firstName"
                            clearable
                            placeholder="例:KAI"
                            @input="
                              nameChange($event, passengerIndex, 'firstName')
                            "
                          />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].identityNo`"
                          :rules="listRules.otherIdentityNo"
                          class="mb-0"
                        >
                          <el-input
                            v-model="passenger.identityNo"
                            clearable
                            placeholder="证件号码"
                          />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].birthDate`"
                          class="mb-0"
                        >
                          <el-date-picker
                            v-model="passenger.birthDate"
                            :rules="listRules.birthDate"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            @change="birthDateChange($event, passengerIndex)"
                          />
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td>性别</td>
                      <td>国籍<br>证件签发地</td>
                      <td>证件有效期</td>
                      <td>手机号</td>
                      <td>
                        发卡银行
                        <el-checkbox v-model="passenger.isGP" class="ml-10">GP</el-checkbox>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].genderType`"
                          class="mb-0"
                        >
                          <el-radio-group v-model="passenger.genderType">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].nationCode`"
                          :rules="listRules.nationCode"
                          style="margin-bottom: 5px"
                        >
                          <el-input
                            v-model="passenger.nationCode"
                            clearable
                            placeholder="国籍"
                          />
                        </el-form-item>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].countryCode`"
                          :rules="listRules.countryCode"
                          class="mb-0"
                        >
                          <el-input
                            v-model="passenger.countryCode"
                            clearable
                            placeholder="证件签发地"
                          />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].certificateValidityDate`"
                          :rules="listRules.certificateValidityDate"
                          class="mb-0"
                        >
                          <el-date-picker
                            v-model="passenger.certificateValidityDate"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="证件有效期"
                          />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].phone`"
                          :rules="listRules.phone"
                          class="mb-0"
                        >
                          <el-input
                            v-model="passenger.phone"
                            clearable
                            placeholder="手机号码"
                          />
                        </el-form-item>
                      </td>
                      <td>
                        <el-form-item
                          label=""
                          :prop="`passengers[${passengerIndex}].bankNo`"
                          class="mb-0"
                        >
                          <el-input
                            v-model="passenger.bankNo"
                            clearable
                            placeholder="发卡银行"
                          />
                        </el-form-item>
                      </td>
                    </tr>
                  </template>
                </table>

                <el-table
                  :key="'table' + passengerIndex"
                  :ref="`multipleTable${passengerIndex}`"
                  border
                  tooltip-effect="dark"
                  :data="passenger.orderInsuranceList"
                  style="width: 100%"
                  :header-cell-class-name="cellClassName"
                  :cell-class-name="cellClassName"
                  class="mt-10"
                  @selection-change="
                    handleSelectionChange($event, passengerIndex)
                  "
                >
                  <el-table-column fixed type="selection" width="55" />
                  <el-table-column prop="insuranceName" label="保险名称" />
                  <el-table-column prop="insuranceCoverage" label="保额">
                    <template slot-scope="scope">￥{{ scope.row.insuranceCoverage }} W</template>
                  </el-table-column>
                  <el-table-column prop="salesPrice" label="销售价格">
                    <template slot-scope="scope">￥{{ scope.row.salesPrice }}</template>
                  </el-table-column>
                  <el-table-column prop="num" label="购买份数">
                    <template slot-scope="scope">
                      <el-form-item label="" prop="num" class="mb-0">
                        <el-input-number
                          v-model="scope.row.num"
                          controls-position="right"
                          :min="1"
                          :max="50"
                          @change="insuranceNumChange"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="insuranceContent" label="说明">
                    <template slot-scope="scope">
                      <el-popover
                        placement="top-start"
                        title="内容"
                        width="200"
                        trigger="hover"
                        :content="scope.row.insuranceContent"
                      >
                        <el-link slot="reference" type="primary">投保须知</el-link>
                      </el-popover>
                    </template>
                  </el-table-column>
                </el-table>
                <div
                  v-if="detail.passengers.length > 0"
                  :key="'bottom' + passengerIndex"
                  class="mt-10 mb-10"
                  style="border-bottom: 1px dashed rgba(55, 144, 244, 0.27843137254902);"
                />
              </template>
              <div align="center" class="mt-10">
                <el-button type="primary" @click="handleFrePassenger"><i class="el-icon-circle-plus-outline" />添加常旅客</el-button>
                <el-button type="success" @click="addPassenger"><i class="el-icon-circle-plus-outline" />新增乘机人</el-button>
              </div>
            </div>
          </el-card>

          <el-card class="box-card mt-10">
            <div slot="header" class="clearfix">
              <span class="box-card-title">联系人</span>
            </div>
            <div class="box-card-content">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="contactName" label="姓名">
                    <el-input v-model="detail.contactName" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="contactPhone" label="手机">
                    <el-input v-model="detail.contactPhone" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="contactEmail" label="邮箱">
                    <el-input v-model="detail.contactEmail" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card class="box-card orange-bg-box">
            <template v-for="(flight, flightIndex) in detail.flights">
              <div
                :key="'flights' + flightIndex"
                class="flight-info"
                :class="{'second-flight-info': flight.tripType !== 0}"
              >
                <div v-if="detail.tripType === 1 && flightIndex === 0" class="second-flight">
                  ----------------<span class="ml-30 mr-30">去程</span>-----------------
                </div>
                <div v-if="detail.tripType === 1 && flightIndex === 1" class="second-flight">
                  ----------------<span class="ml-30 mr-30">返程</span>-----------------
                </div>
                <div v-if="detail.tripType === 2 && flightIndex === 0" class="second-flight">
                  --------------<span class="ml-30 mr-30">第一程</span>----------------
                </div>
                <div v-if="detail.tripType === 2 && flightIndex === 1" class="second-flight">
                  --------------<span class="ml-30 mr-30">第二程</span>----------------
                </div>
                <div class="weekday">
                  <span>{{ flight.departureDate }}</span>
                  <span>{{ flight.departureDate | showDay }}</span>
                </div>
                <div class="city">
                  <span>{{ flight.departureAirport }}({{
                    flight.departureAirport | cityNameFilter
                  }})</span>
                  <span>——</span>
                  <span>{{ flight.arrivalAirport }}({{
                    flight.arrivalAirport | cityNameFilter
                  }})</span>
                </div>
                <div class="flightNo">
                  <svg
                    version="1.1"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="42px"
                    height="20px"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-10"
                  >
                    <g transform="matrix(1 0 0 1 -1312 -338 )">
                      <path
                        d="M 40.6171875 12  L 14.53125 12  C 12.8125 12.8787878787879  10.71875 13.1818181818182  8.25 13.1818181818182  L 5.25 13.1818181818182  L 5.25 12.2727272727273  L 3.75 12.2727272727273  C 3.546875 12.2727272727273  3.37109375 12.1614583333333  3.22265625 11.9389204545455  C 3.07421875 11.7163825757576  3 11.4488636363636  3 11.1363636363636  C 3 10.9090909090909  3.0546875 10.6770833333333  3.1640625 10.4403409090909  C 2.2578125 10.4214015151515  1.50390625 10.3716856060606  0.90234375 10.2911931818182  C 0.30078125 10.2107007575758  0 10.1136363636364  0 10  C 0 9.88636363636363  0.30078125 9.78929924242424  0.90234375 9.70880681818182  C 1.50390625 9.62831439393939  2.2578125 9.57859848484848  3.1640625 9.55965909090909  C 3.0546875 9.32291666666666  3 9.09090909090909  3 8.86363636363637  C 3 8.55113636363637  3.07421875 8.28361742424242  3.22265625 8.06107954545455  C 3.37109375 7.83854166666667  3.546875 7.72727272727273  3.75 7.72727272727273  L 5.25 7.72727272727273  L 5.25 6.81818181818182  L 8.25 6.81818181818182  C 10.71875 6.81818181818182  12.8125 7.12121212121212  14.53125 8  L 40.6171875 8  C 41.2734375 7.79356060606061  42.10546875 7.87878787878788  43.11328125 7.98295454545455  C 44.12109375 8.08712121212121  44.75 8.15340909090909  45 8.18181818181818  C 46.390625 8.32386363636363  47.5625 8.515625  48.515625 8.75710227272727  C 49.46875 8.99857954545455  50.12109375 9.22348484848485  50.47265625 9.43181818181818  C 50.82421875 9.64015151515151  51 9.82954545454545  51 10  C 51 10.1704545454545  50.82421875 10.3598484848485  50.47265625 10.5681818181818  C 50.12109375 10.7765151515152  49.46875 11.0014204545455  48.515625 11.2428977272727  C 47.5625 11.484375  46.390625 11.6761363636364  45 11.8181818181818  C 44.75 11.8465909090909  44.12109375 11.9128787878788  43.11328125 12.0170454545455  C 42.10546875 12.1212121212121  41.2734375 12.2064393939394  40.6171875 12  Z M 42.65625 8.26704545454545  L 40.7578125 8.69318181818182  C 41.5859375 9.03409090909091  42 9.46969696969697  42 10  C 42 10.530303030303  41.5859375 10.9659090909091  40.7578125 11.3068181818182  L 42.65625 11.7329545454545  C 43.71875 11.2784090909091  44.25 10.7007575757576  44.25 10  C 44.25 9.29924242424242  43.71875 8.72159090909091  42.65625 8.26704545454545  Z M 8.25 13.4090909090909  C 10.703125 13.4090909090909  12.8359375 13.1060606060606  14.6484375 12.5  L 38.4375 12.5  C 35.046875 12.8598484848485  31.484375 13.2386363636364  27.75 13.6363636363636  C 26.859375 13.6363636363636  25.9765625 13.75  25.1015625 13.9772727272727  C 24.2265625 14.2045454545455  23.578125 14.4318181818182  23.15625 14.6590909090909  L 22.5 15  L 15.75 19.0909090909091  C 15.34375 19.3371212121212  14.79296875 19.5501893939394  14.09765625 19.7301136363636  C 13.40234375 19.9100378787879  12.703125 20  12 20  L 9.75 20  L 7.5703125 13.4090909090909  L 8.25 13.4090909090909  Z M 14.6484375 7.5  C 12.8359375 6.89393939393939  10.703125 6.59090909090909  8.25 6.59090909090909  L 7.5703125 6.59090909090909  L 9.75 0  L 12 0  C 12.71875 0  13.421875 0.0899621212121193  14.109375 0.269886363636365  C 14.796875 0.449810606060603  15.34375 0.662878787878787  15.75 0.909090909090908  L 22.5 5  C 22.5625 5.03787878787879  22.6484375 5.0875946969697  22.7578125 5.14914772727273  C 22.8671875 5.21070075757576  23.10546875 5.31960227272727  23.47265625 5.47585227272727  C 23.83984375 5.63210227272727  24.21875 5.76941287878788  24.609375 5.88778409090909  C 25 6.0061553030303  25.48046875 6.11505681818182  26.05078125 6.21448863636363  C 26.62109375 6.31392045454545  27.1875 6.36363636363637  27.75 6.36363636363637  L 38.4375 7.5  L 14.6484375 7.5  Z "
                        fill-rule="nonzero"
                        fill="#326cad"
                        stroke="none"
                        transform="matrix(1 0 0 1 1312 338 )"
                      />
                    </g>
                  </svg>
                  <airlineName :airline-code="flight.airline" />
                  <span>{{ flight.airline }}{{ flight.flightNo }}</span>
                  <span class="pl-5">{{ prices[0].cabin }}舱</span>
                </div>
                <div class="flex">
                  <div class="left-flex">
                    <div class="time">
                      {{ flight.departureTime | substringHourMinutes }}
                    </div>
                    <div class="desc">
                      {{ flight.departureAirport | airportNameFilter
                      }}{{ flight.departureTerminal }}
                    </div>
                  </div>
                  <div class="center">
                    <div class="hour">
                      {{ flight.flightDuration | hourMinSecondReplace }}
                    </div>
                    <div>
                      <i
                        class="iconfont icon-straight-middle"
                        style="color: #909399; font-size: 10px !important"
                      />
                    </div>
                  </div>
                  <div class="right-flex">
                    <div class="time">
                      {{ flight.arrivalTime | substringHourMinutes }}
                    </div>
                    <div class="desc">
                      {{ flight.arrivalAirport | airportNameFilter
                      }}{{ flight.arrivalTerminal }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <div class="ticket-info">
              <template v-for="(priceItem, priceIndex) in prices">
                <div :key="'prices' + priceIndex" class="type-panel">
                  <p>
                    {{ $t(`AdminService["Enum:PassengerType:${priceItem.passengerType}"]`) }}
                  </p>
                  <div>
                    <span>销售价</span>
                    <span>￥<em class="font-weight-normal">{{
                      priceItem.settlementPrice
                    }}</em>
                      ✖{{ priceItem.passengerType === 0 ? adultCount : priceItem.passengerType === 1 ? childCount : infantCount }}</span>
                  </div>
                  <div class="ticket-price">
                    （ 票面价 ￥{{ priceItem.ticketPrice }}）
                  </div>
                  <div>
                    <span>基建</span>
                    <span>￥<em class="font-weight-normal">{{ priceItem.airportTax }}</em>
                      ✖{{ priceItem.passengerType === 0 ? adultCount : priceItem.passengerType === 1 ? childCount : infantCount }}</span>
                  </div>
                  <div>
                    <span>燃油</span>
                    <span>￥<em class="font-weight-normal">{{
                      priceItem.fuelTax
                    }}</em>
                      ✖{{ priceItem.passengerType === 0 ? adultCount : priceItem.passengerType === 1 ? childCount : infantCount }}</span>
                  </div>
                </div>
              </template>
            </div>
            <div class="ticket-total">￥{{ detail.totalAmount }}</div>
          </el-card>
          <el-card class="box-card blue-bg-box mt-15">
            <div class="ticket-info" style="border-bottom: none">
              <div class="type-panel">
                <p>购买保险</p>
                <template v-for="(insuranceItem, insuranceIndex) in insurancePriceNums">
                  <div :key="'checkedInsurance' + insuranceIndex">
                    <span>{{ insuranceItem.insuranceName }}</span>
                    <span>￥<em class="font-weight-normal">{{ insuranceItem.salesPrice }}</em>
                      ✖{{ insuranceItem.num }}份
                      <span v-if="detail.flights.length > 1">✖{{ detail.flights.length }}程</span>
                    </span>

                  </div>
                </template>
              </div>
            </div>
            <div class="ticket-total" style="padding-top: 0">
              ￥ {{ totalInsurance }}
            </div>
          </el-card>
          <div style="text-align: center;margin-top: 20px;">
            <el-button type="primary" @click="back()">返回</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="total-panel">
        支付金额<em>￥</em><span>{{ detail.totalAmount + totalInsurance }}</span>
      </div>
      <div class="agree-panel">
        <el-form-item prop="agree" label="">
          <el-checkbox v-model="detail.agree">已阅读并同意</el-checkbox>
        </el-form-item>
        <el-button type="text" @click="dialogVisible = true">购票须知</el-button>
      </div>
      <div align="center">
        <el-button
          :loading="loading"
          :disabled="loading"
          size="medium"
          type="warning"
          style="width: 100%; background-color: #f59a23; border-color: #f59a23;"
          @click="next()"
        >
          下一步
        </el-button>
      </div>
    </el-form>
    <el-dialog title="购票须知" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <passengerDialog ref="passengerDialog" @AddFrePassenger="AddFrePassenger" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PassengerTypeEnum from '@/enum/PassengerType'
import IdentityCardTypeEnum from '@/enum/IdentityCardType'
import AirlineName from '@/components/BaseName/AirlineName'
import { insuranceList } from '@/api/basic/insurance'
import { order, belongWhiteList } from '@/api/domestic-tickets/booking'
import { domesticPolicDetail } from '@/api/basic/policy'
import rules from '@/utils/rules'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import PassengerDialog from './dialog/passenger'

export default {
  name: 'TicketPassenger',
  components: {
    AirlineName,
    PassengerDialog
  },
  data() {
    return {
      keyAccountWhiteList: [],
      policy: null,
      loading: false,
      listQueryNoPage: {
        size: -1,
        current: -1
      },
      passengerTypeOptions: [],
      identityCardTypeOptions: [],
      checkedInsurance: [],
      insurancePriceNums: [],
      detail: {
        key: '',
        tripType: 0,
        policyId: '',
        productId: '',
        totalAmount: 0,
        totalFuelTax: 0,
        totalAirportTax: 0,
        flights: [],
        passengers: [
          {
            name: '',
            lastName: '',
            firstName: '',
            identityType: 0,
            genderType: 1,
            orderInsuranceList: [],
            orderInsurances: []
          }
        ]
      },
      prices: [],
      dialogVisible: false,
      adultCount: 0,
      childCount: 0,
      infantCount: 0,
      totalInsurance: 0,
      formRules: {
        contactName: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        contactPhone: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validatePhone
          }
        ]
      },
      listRules: {
        type: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        identityCardType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        identityNo: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(
                  new Error(this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"))
                )
              }
              const regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
              if (!regId.test(value)) {
                callback(new Error('请输入正确的二代身份证号码'))
              } else {
                callback()
              }
            }
          }
        ],
        otherIdentityNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        birthDate: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        certificateValidityDate: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        lastName: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        firstName: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        countryCode: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validatePhone
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'email',
      'avatar',
      'roles',
      'userName',
      'phoneNumber',
      'introduction'
    ])
  },
  created() {
    this.reset()

    // 设置分销商的信息默认为联系人信息
    this.$set(this.detail, 'contactName', this.userName)
    this.$set(this.detail, 'contactEmail', this.email)
    this.$set(this.detail, 'contactPhone', this.phoneNumber)

    const verifyPriceCookie = sessionStorage.getItem('verifyPrice')
    if (verifyPriceCookie === undefined) {
      // 关闭当前路由
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.replace({ path: '/domestic-tickets/ticket-booking' })
      return
    }
    const verifyPrice = JSON.parse(verifyPriceCookie)
    if (!verifyPrice.flight1) {
      this.detail.flights.push(verifyPrice)
    }
    if (verifyPrice.flight1) {
      this.detail.flights.push(verifyPrice.flight1)
    }
    if (verifyPrice.flight2) {
      this.detail.flights.push(verifyPrice.flight2)
    }
    this.detail.tripType = verifyPrice.tripType
    this.detail.key = verifyPrice.key
    this.prices = verifyPrice.cabinPrices.filter((x) => x.passengerType === 0)
    this.detail.policyId = this.prices[0].policyId
    this.detail.productId = this.prices[0].productId
    this.getPolic(this.detail.policyId)
    this.calculateTotalPrice()
  },
  mounted() {
    this.passengerTypeOptions = Object.keys(
      PassengerTypeEnum.PassengerType
    ).map((key) => ({
      value: PassengerTypeEnum.PassengerType[key],
      label: this.$t(
        `AdminService["Enum:PassengerType:${PassengerTypeEnum.PassengerType[key]}"]`
      )
    }))
    this.identityCardTypeOptions = Object.keys(
      IdentityCardTypeEnum.IdentityCardType
    ).map((key) => ({
      value: IdentityCardTypeEnum.IdentityCardType[key],
      label: this.$t(
        `AdminService["Enum:IdentityCardType:${IdentityCardTypeEnum.IdentityCardType[key]}"]`
      )
    }))
  },
  destroyed() {
    sessionStorage.removeItem('verifyPrice')
  },
  methods: {
    getPolic(varPolicId) {
      domesticPolicDetail(varPolicId).then((response) => {
        if (response) {
          this.policy = response
        }
      })
    },
    reset() {
      this.detail = {
        key: '',
        tripType: 0,
        policyId: '',
        productId: '',
        totalAmount: 0,
        totalFuelTax: 0,
        totalAirportTax: 0,
        flights: [],
        passengers: [
          {
            name: '',
            lastyName: '',
            firstName: '',
            type: 0,
            identityType: 0,
            genderType: 1,
            orderInsurances: []
          }
        ]
      }
    },
    calculateTotalPrice() {
      this.calculatePrices()
      // 查看对应乘机人类型数量
      this.adultCount = this.detail.passengers.filter(
        (x) => x.type === 0
      ).length
      this.childCount = this.detail.passengers.filter(
        (x) => x.type === 1
      ).length
      this.infantCount = this.detail.passengers.filter(
        (x) => x.type === 2
      ).length
      // console.log(`成人数量：${this.adultCount}，儿童数量：${this.childCount}，婴儿数量：${this.infantCount}`)
      // 查看验价价格对应乘机人类型的结算价+基建+燃油
      const adult = this.prices.filter((x) => x.passengerType === 0)
      const child = this.prices.filter((x) => x.passengerType === 1)
      const infant = this.prices.filter((x) => x.passengerType === 2)
      const adultTotalAmount = adult.reduce(
        (sum, e) =>
          sum +
          Number(e.settlementPrice || 0) +
          Number(e.airportTax || 0) +
          Number(e.fuelTax || 0),
        0
      )
      const childTotalAmount = child.reduce(
        (sum, e) =>
          sum +
          Number(e.settlementPrice || 0) +
          Number(e.airportTax || 0) +
          Number(e.fuelTax || 0),
        0
      )
      const infantTotalAmount = infant.reduce(
        (sum, e) =>
          sum +
          Number(e.settlementPrice || 0) +
          Number(e.airportTax || 0) +
          Number(e.fuelTax || 0),
        0
      )
      this.detail.totalAmount =
        adultTotalAmount * this.adultCount +
        childTotalAmount * this.childCount +
        infantTotalAmount * this.infantCount
      // console.log(`成人总价：${adultTotalAmount}，儿童总价：${childTotalAmount}，婴儿总价：${infantTotalAmount}`)
      // console.log(`总价：${this.detail.totalAmount}`)
      const adultTotalAirportTax =
        adult.reduce((sum, e) => sum + Number(e.airportTax || 0), 0) *
        this.adultCount
      const childTotalAirportTax =
        child.reduce((sum, e) => sum + Number(e.airportTax || 0), 0) *
        this.childCount
      const infantTotalAirportTax =
        infant.reduce((sum, e) => sum + Number(e.airportTax || 0), 0) *
        this.infantCount
      const infantTotalFuelTax =
        infant.reduce((sum, e) => sum + Number(e.fuelTax || 0), 0) *
        this.infantCount
      const adultTotalFuelTax =
        adult.reduce((sum, e) => sum + Number(e.fuelTax || 0), 0) *
        this.adultCount
      const childTotalFuelTax =
        child.reduce((sum, e) => sum + Number(e.fuelTax || 0), 0) *
        this.childCount
      this.$set(this.detail, 'totalAmount', this.detail.totalAmount)
      this.$set(
        this.detail,
        'totalFuelTax',
        adultTotalFuelTax + childTotalFuelTax + infantTotalFuelTax
      )
      this.$set(
        this.detail,
        'totalAirportTax',
        adultTotalAirportTax + childTotalAirportTax + infantTotalAirportTax
      )
    },
    addPassenger() {
      if (this.detail.passengers.length < 9) {
        this.detail.passengers.push({
          firstName: '',
          lastName: '',
          identityType: 0,
          genderType: 1,
          type: 0,
          orderInsuranceList: [],
          orderInsurances: []
        })
        this.calculateTotalPrice()
      } else {
        this.$message.error('最多只能添加9个乘客')
      }
    },
    deletePassenger(index) {
      this.detail.passengers.splice(index, 1)
      this.calculateTotalPrice()
    },
    handleFrePassenger() {
      this.$refs['passengerDialog'].handle()
    },
    AddFrePassenger(rows) {
      if (!this.detail.passengers[0].identityNo) {
        this.detail.passengers = []
        this.rePassengers(rows)
      } else {
        this.rePassengers(rows)
      }
    },
    rePassengers(rows) {
      rows.forEach((element, index) => {
        this.detail.passengers.push({
          type: element.frequentFlyerType,
          identityType: element.cardType,
          identityNo: element.cardNum,
          birthDate: moment(element.birthday).format('YYYY-MM-DD'),
          certificateValidityDate: element.cardExpired
            ? moment(element.cardExpired).format('YYYY-MM-DD')
            : null,
          firstName: element.firstName,
          lastName: element.lastName,
          countryCode: element.cardIssuePlace,
          nationCode: element.nationality,
          genderType: element.gender,
          phone: element.phone,
          isGP: element.isGp !== 0,
          bankNo: element.gpBankValue,
          orderInsuranceList: [],
          orderInsurances: []
        })
        this.getInsurance(moment(element.birthday).format('YYYY-MM-DD'), index)
      })
      const uniquePassengers = this.detail.passengers.reduce(
        (acc, passenger) => {
          const existingPassenger = acc.find(
            (p) => p.identityNo === passenger.identityNo
          )
          if (!existingPassenger) {
            acc.push(passenger)
          }
          return acc
        },
        []
      )
      this.detail.passengers = uniquePassengers
      this.calculateTotalPrice()
    },
    passengerTypeChange() {
      // 计算成人/儿童/婴儿价格和总价
      this.calculateTotalPrice()
    },
    calculatePrices() {
      // 乘机人根据乘客类型去重
      const uniquePassengers = Array.from(
        new Set(this.detail.passengers.map((item) => item.type))
      ).map((type) => ({ type }))
      const verifyPriceCookie = sessionStorage.getItem('verifyPrice')
      const verifyPrice = JSON.parse(verifyPriceCookie)
      // 根据乘机人类型筛选所有验价后对应乘机人类型的价格
      this.prices = verifyPrice.cabinPrices.filter((item) =>
        uniquePassengers.some((obj) => obj.type === item.passengerType)
      )
    },
    nameChange(val, index, filed) {
      this.$set(this.detail.passengers[index], filed, val)
      if (this.policy.pataCommand && this.detail.passengers[index].cardNum) {
        this.validateWhiteList({ name: val, cardNum: this.detail.passengers[index].cardNum })
      }
    },
    identityNoChange(val, index) {
      // 身份证年/月/日
      const year = val.substr(6, 4)
      const month = val.substr(10, 2)
      const date = val.substr(12, 2)
      const ymd = year + '-' + month + '-' + date
      this.resetGetInsurance(ymd, index)
      this.resetGenger(val, index)
      //this.detail.passengers[index].genderType = this.getGenderFromCardNo(val)

      if (this.policy.pataCommand && this.detail.passengers[index].lastName) {
        this.validateWhiteList({ name: this.detail.passengers[index].lastName, cardNum: val })
      }

    },
    birthDateChange(val, index) {
      this.resetGetInsurance(val, index)
    },
    resetGenger(val, index) {
      this.$set(this.detail.passengers[index], 'genderType', this.getGenderFromCardNo(val))
    },
    resetGetInsurance(val, index) {
      this.$set(this.detail.passengers[index], 'birthDate', val)
      this.getInsurance(val, index)
    },
    getInsurance(birthday, index) {
      insuranceList({
        birthday: birthday
      }).then((response) => {
        if (response.data) {
          const orderInsurances = response.data
          const newOrderInsurances = orderInsurances.map((item) => ({
            ...item,
            num: 1
          }))
          this.$set(
            this.detail.passengers[index],
            'orderInsuranceList',
            newOrderInsurances
          )
        }
      })
    },
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 || columnIndex === 2) {
        return 'cellOrange'
      }
      return null
    },
    handleSelectionChange(val, passengerIndex) {
      this.detail.passengers[passengerIndex].orderInsurances = val
      const passengers = this.detail.passengers
      this.checkedInsurance = passengers.reduce(
        (orderInsurances, passenger) => {
          if (passenger.orderInsurances.length > 0) {
            orderInsurances.push(...passenger.orderInsurances)
          }
          return orderInsurances
        },
        []
      )
      // 重新计算总的保险费
      this.calculateInsuranceNum()
    },
    calculateInsuranceNum() {
      const passengers = this.detail.passengers
      this.totalInsurance = this.checkedInsurance.reduce(
        (sum, e) => sum + Number(e.num || 0) * Number(e.salesPrice || 0) * Number(this.detail.flights.length || 1),
        0
      )
      const insuranceMap = new Map()
      passengers.forEach((passenger) => {
        passenger.orderInsurances.forEach((insurance) => {
          const id = insurance.id
          const num = insurance.num
          if (insuranceMap.has(id)) {
            const existingInsurance = insuranceMap.get(id)
            existingInsurance.num += num
          } else {
            insuranceMap.set(id, { ...insurance })
          }
        })
      })
      this.insurancePriceNums = Array.from(insuranceMap.values())
    },
    next() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // console.log('-----next detail', this.detail)
          if (this.policy.pataCommand) {
            this.detail.passengers.forEach(element => {
              belongWhiteList({
                name: element.lastName + element.firstName,
                cardNum: element.cardNum,
                keyAccountNo: this.policy.pataCommand
              }).then((response) => {
                if (response.status === '200') {
                  if (response.data.length < 1) {
                    this.$message.error(element.lastName + element.firstName + '  该客户不能享受该大客户政策')
                    this.loading = false
                    return
                  } else if (!this.detail.agree) {
                    this.$message({
                      message: '请勾选已阅读同意',
                      type: 'warning'
                    })
                    return
                  }
                  this.loading = true
                  const detail = this.detail
                  detail.passengers.forEach((item) => {
                    if (item.firstName || item.firstName === null) {
                      item.firstName = ' '
                    }
                  })
                  order(detail).then((response) => {
                    if (response.orderNo) {
                      // 关闭当前路由
                      this.$store.dispatch('tagsView/delView', this.$route)
                      this.$router.replace(`/domestic-tickets/issue-detail?ticketIssueOrderNo=${response.orderNo}`)
                    }
                    this.loading = false
                  })
                }
              })
            })
          } else {
            if (!this.detail.agree) {
              this.$message({
                message: '请勾选已阅读同意',
                type: 'warning'
              })
              return
            }
            this.loading = true
            const detail = this.detail
            detail.passengers.forEach((item) => {
              if (item.firstName || item.firstName === null) {
                item.firstName = ' '
              }
            })
            order(detail).then((response) => {
              if (response.orderNo) {
                // 关闭当前路由
                this.$store.dispatch('tagsView/delView', this.$route)
                this.$router.replace(`/domestic-tickets/issue-detail?ticketIssueOrderNo=${response.orderNo}`)
              }
              this.loading = false
            })
          }
        } else {
          this.$message({
            message: '请填写完整必填项',
            type: 'warning'
          })
          return
        }
      })
    },
    // 修改选择保险的值
    insuranceNumChange(value) {
      // 重新计算总的保险费
      this.calculateInsuranceNum()
    },
    validateWhiteList(para) {
      belongWhiteList({
        name: para.name,
        cardNum: para.cardNum,
        keyAccountNo: this.policy.pataCommand
      }).then((response) => {
        if (response.status === '200') {
          if (response.data.length < 1) {
            this.$message.error(para.name + ' 该客户不能享受该大客户政策')
            this.loading = false
            return
          }
        }
      })
    },
    //根据身份证判断男女
    getGenderFromCardNo(cardNo) {
      if (cardNo.length === 18) {
        if (Number(cardNo[16]) % 2 === 0) {
          return 1
        } else {
          return 0
        }
      } else {
        return 0
      }
    },
    back() { 
      console.log('back button is called')
      //this.$router.back();
      //this.$router.push({path: '/domestic-tickets/ticket-booking', query: {selected: "2"}});
      console.log("------- this.detail:",this.detail)
      this.$router.push(
        {
          path: '/domestic-tickets/ticket-booking',
          query: {
          flightTripType:this.detail.tripType,
          oneDepartureDate: this.detail.flights[0].departureDate,
          oneDepartureAirport: this.detail.flights[0].departureAirport,
          oneArriveAirport:  this.detail.flights[0].arrivalAirport,
          airline:  this.detail.flights[0].airline,
          twoDepartureDate: this.detail.flights.length===2?this.detail.flights[1].departureDate:"",
          twoDepartureAirport: this.detail.flights.length===2?this.detail.flights[1].departureAirport:"",
          twoArriveAirport:  this.detail.flights.length===2?this.detail.flights[1].arrivalAirport:""
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  &-title {
    font-weight: bold;
  }

  .passenger-table {
    width: 100%;
    tr:nth-child(odd) {
      background-color: rgba(55, 144, 244, 0.27843137254902);
      text-align: center;
      color: #000;
      font-size: 14px;
      font-weight: 600;
    }
    tr:nth-child(even) {
      td {
        &:first-child {
          border-left: 1px solid rgba(55, 144, 244, 0.27843137254902);
        }
        &:last-child {
          border-right: 1px solid rgba(55, 144, 244, 0.27843137254902);
        }
        border-bottom: 1px solid rgba(55, 144, 244, 0.27843137254902);
      }
    }
    tr {
      td {
        padding: 6px;
      }
    }
  }

  .mb-0 {
    margin-bottom: 0;
  }
}
.total-panel {
  padding: 20px 60px;
  text-align: right;
  font-weight: bold;
  color: #000;
  font-size: 18px;
  margin-top: 15px;
  margin-right: 10px;
  background-color: #f7f7f7;

  em {
    font-size: 18px;
    color: #d9001b;
    font-style: normal;
  }

  span {
    color: #d9001b;
    font-weight: 700;
    font-size: 24px;
  }
}

.agree-panel {
  text-align: center;
  padding: 20px;
}

.box-card {
  &.orange-bg-box {
    background-color: rgba(255, 217, 197, 0.392156862745098);
  }

  &.blue-bg-box {
    background-color: rgba(96, 150, 213, 0.203921568627451);
  }

  .flight-info {
    padding: 10px 0 10px;
    text-align: center;
    border-bottom: 1px solid #f59a23;

    &:first-child {
      padding-top: 0;
      &.second-flight-info {
        border-bottom: none;
      }
    }

    .second-flight {
      color: #f59a23;
      margin-bottom: 8px;
    }

    .weekday,
    .city {
      font-size: 16px;
      color: #326cad;
      font-weight: 700;
      padding: 0 0 10px 0;

      span {
        padding: 0 10px;
      }
    }

    .city {
      padding: 0 5px 10px;
    }

    .flightNo {
      font-size: 14px;
      color: #aaaaaa;
      padding-bottom: 10px;

      span {
        font-weight: 700;

        &:first-child {
          padding: 0 10px 0 0;
        }
      }
    }

    .flex {
      .center {
        width: 100px;
        text-align: center;
      }

      .time {
        color: #000000;
        font-weight: 600;
        margin-bottom: 5px;
      }

      .desc {
        color: #7f7f7f;
        font-size: 14px;
      }

      .hour {
        font-size: 12px;
        color: #7f7f7f;
      }
    }
  }

  .ticket-info {
    padding: 0 10px 10px;
    border-bottom: 1px solid #f59a23;

    .type-panel {
      p {
        font-weight: bold;
        font-size: 16px;
        line-height: 20px;
      }

      div {
        font-size: 14px;
        margin-bottom: 8px;

        &.ticket-price {
          color: #db8a18;
          text-align: right;
        }

        span {
          &:last-child {
            float: right;
          }
        }
      }
    }
  }

  .ticket-total {
    font-size: 20px;
    font-weight: bold;
    color: #f59a23;
    text-align: right;
    padding: 20px 0 0;
  }

  .font-weight-normal {
    font-style: normal;
    font-weight: 600;
  }
}
</style>
