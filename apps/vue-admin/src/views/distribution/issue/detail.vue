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
                  {{
                    $t(
                      `AdminService["Enum:IssueOrderStatus:${detail.orderStatus}"]`
                    )
                  }}
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">实付金额</label>
              <div class="card-item-content">
                {{ detail.paymentAmount }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">订单乘客来源</label>
              <div class="card-item-content">
                {{
                  $t(
                    `AdminService["Enum:OrderPassengerOriginType:${detail.passengerOriginType}"]`
                  )
                }}
              </div>
            </div>
          </el-col>
          <el-col v-if="status === 1" :span="8">
            <div class="card-item" style="float: right; margin-right: 10px">
              <el-button
                v-if="detail.orderStatus in [0, 1, 2]"
                size="small"
                type="danger"
                @click="reject"
              >
                拒绝出票
              </el-button>
              <el-button
                v-if="detail.orderStatus == 3"
                size="small"
                type="primary"
                @click="issueNotify"
              >
                发送通知
              </el-button>
              <el-button
                v-if="detail.orderStatus == 3"
                size="small"
                type="primary"
                @click="refund"
              >
                申请退票
              </el-button>
              <el-button
                v-if="detail.orderStatus == 3"
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
                {{
                  $t(
                    `AdminService["Enum:IssueOrderOriginType:${detail.orderOriginType}"]`
                  )
                }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">客户</label>
              <div class="card-item-content">
                {{ detail.agentOrganizationName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">部门</label>
              <div class="card-item-content">
                {{ detail.agentDepartmentName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">供应商</label>
              <div class="card-item-content">九州自营</div>
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
              <label class="card-item-title">航程类型</label>
              <div class="card-item-content">
                {{
                  $t(`AdminService["Enum:TripType:${detail.orderFlightType}"]`)
                }}
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
                {{
                  $t(
                    `AdminService["Enum:ReimbursementType:${detail.reimbursementType}"]`
                  )
                }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">政策代码</label>
              <div class="card-item-content">
                <el-link v-if="detail.policyPersistent" :underline="false" type="primary" @click="policyDialog()">{{ JSON.parse(detail.policyPersistent).name }}</el-link>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">出票员</label>
              <div class="card-item-content">
                {{ detail.ticketPersonName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">创建人</label>
              <div class="card-item-content">{{ detail.createUserName }}</div>
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
          <el-table-column align="center" prop="segmentType" label="航程类型">
            <template slot-scope="scope">
              <span
                v-if="
                  !(
                    Object.is(scope.row.segmentType, undefined) ||
                    Object.is(scope.row.segmentType, null)
                  )
                "
              >
                {{
                  $t(
                    `AdminService["Enum:SegmentType:${scope.row.segmentType}"]`
                  )
                }}</span>
              <span v-else />
            </template>
          </el-table-column>
          <el-table-column
            label="起飞-到达"
            prop="depatureAirport"
            align="center"
            width="400"
          >
            <template slot-scope="scope">
              <div>
                起飞：{{ scope.row.departureAirportName }}({{
                  scope.row.departureAirportCode
                }})--{{ scope.row.departureTime }}
              </div>
              <div>
                到达：{{ scope.row.arrivalAirportName }}({{
                  scope.row.arrivalAirportCode
                }})--{{ scope.row.arrivalTime }}
              </div>
              <div v-if="scope.row.stopNum > 0">
                经停:
                <span
                  v-for="flightItem in scope.row.stopContent"
                  :key="flightItem"
                >{{ flightItem.stopAirport }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="航司" prop="carrierNumber" />
          <el-table-column align="center" label="航班号" prop="flightNumber" />
          <el-table-column align="center" label="舱位" prop="cabinCode" />
          <el-table-column align="center" label="儿童舱位" prop="childCabinCode" />
          <el-table-column align="center" label="婴儿舱位" prop="babyCabinCode" />
          <el-table-column align="center" label="舱位等级">
            <template slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:CabinClassType:${scope.row.cabinLevel}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="aircraftCode" label="机型" />
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
          <el-table-column align="center" prop="luggageWeight" label="行李额" />
          <el-table-column
            align="center"
            prop="handLuggageWeight"
            label="手提行李额"
          />
        </el-table>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">乘客信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table
          :data="detail.orderPassengerBOList"
          border
          :summary-method="getSummaries"
          show-summary
          style="width: 100%"
          class="origin-ticket-table"
        >
          <el-table-column width="80" label="操作" fixed="left">
            <template slot-scope="scope">
              <el-button
                v-show="!scope.row.showEdit && isWaitingForPayment"
                type="primary"
                size="mini"
                @click="orderEdit(scope.row)"
              >编辑
              </el-button>
              <el-button
                v-show="scope.row.showEdit"
                type="danger"
                size="mini"
                @click="orderEditCancel(scope.row)"
              >取消
              </el-button>
              <el-button
                v-show="scope.row.showEdit"
                type="primary"
                size="mini"
                @click="orderEditSave(scope.row)"
              >
                <span>保存</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="80"
            label="退票状态"
            prop="refundStatusContent"
          >
            <template slot-scope="scope">
              {{ scope.row.refundStatusContent !== '' ? scope.row.refundStatusContent : '无' }}
            </template>
          </el-table-column>
          <el-table-column label="乘客类型" prop="passengerType">
            <template slot-scope="scope">
              <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                $t( `AdminService["Enum:PassengerType:${scope.row.passengerType}"]` ) }}</span>
              <el-select
                v-show="scope.row.showEdit && isWaitingForPayment"
                v-model="scope.row.passengerType"
              >
                <el-option
                  v-for="option in passengerTypeOptions"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column width="100" label="姓名">
            <template slot-scope="scope">
              <span
                v-show="!scope.row.showEdit || !isWaitingForPayment"
              >
                {{ scope.row.lastName }}{{ scope.row.firstName }}
              </span>
              <el-input
                v-show="scope.row.showEdit && isWaitingForPayment"
                v-model="scope.row.lastName"
                size="normal"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column width="120" label="证件类型" prop="cardType">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:IdentityCardType:${scope.row.cardType}"]`) }}
              <el-popover v-if="scope.row.nationality" placement="top-start" width="200" trigger="hover">
                <div>国籍:{{ scope.row.nationality }}</div>
                <div>签发地:{{ scope.row.cardIssuePlace }}</div>
                <div>证件有效期:{{ scope.row.cardExpired }}</div>
                <el-link
                  slot="reference"
                  :underline="false"
                  type="success"
                >详情
                </el-link>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column width="120" label="证件号" prop="cardNum">
            <template slot-scope="scope">
              <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                scope.row.cardNum
              }}</span>
              <el-input
                v-show="scope.row.showEdit && isWaitingForPayment"
                v-model="scope.row.cardNum"
                size="normal"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column width="100" prop="birthday" label="出生日期">
            <template slot-scope="scope">
              <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                scope.row.birthday
              }}</span>
              <el-date-picker
                v-show="scope.row.showEdit && isWaitingForPayment"
                v-model="scope.row.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 150px; margin-bottom: 10px"
                placeholder="出生日期"
                format="yyyy-MM-dd"
              />
            </template>
          </el-table-column>
          <el-table-column width="120" prop="phone" label="手机号">
            <template slot-scope="scope">
              <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                scope.row.phone
              }}</span>
              <el-input
                v-show="scope.row.showEdit && isWaitingForPayment"
                v-model="scope.row.phone"
                size="normal"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column width="50" prop="gender" label="性别">
            <template slot-scope="scope">
              <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                $t(`AdminService["Enum:GenderType:${scope.row.gender}"]`)
              }}</span>
              <el-select
                v-show="scope.row.showEdit && isWaitingForPayment"
                v-model="scope.row.gender"
                clearable
              >
                <el-option
                  v-for="option in genderTypeOptions"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </el-select>
            </template>
          </el-table-column>
          <!-- 客户价格信息 -->
          <el-table-column align="center" label="客户价格信息" style="">
            <el-table-column width="80" prop="originTicketPrice" label="票面价">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.originTicketPrice
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.originTicketPrice"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column width="80" prop="soldTicketPrice" label="销售价">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.soldTicketPrice
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.soldTicketPrice"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column width="80" prop="keepAmount" label="政策留钱">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.keepAmount
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.keepAmount"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column width="80" prop="rebate" label="政策返点">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.rebate
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.rebate"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="flightTax|fuelTax"
              label="机建/燃油"
            >
              <template slot-scope="scope">
                <span
                  v-show="!scope.row.showEdit || !isWaitingForPayment"
                >{{ scope.row.flightTax }}<br>{{ scope.row.fuelTax }}
                </span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.flightTax"
                  size="normal"
                  clearable
                />
                <br>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.fuelTax"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column width="80" prop="insuranceNum" label="保险份数">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.insuranceNum
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.insuranceNum"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column width="80" prop="insuranceAmount" label="保险金额">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">
                  {{ scope.row.insuranceAmount }}
                </span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.insuranceAmount"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="90"
              prop="serviceFeesAmount"
              label="销售服务费"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">
                  {{ scope.row.serviceFeesAmount }}
                </span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.serviceFeesAmount"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column width="80" prop="markupAmount" label="加价/让利">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">
                  {{ scope.row.markupAmount }}
                </span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.markupAmount"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="soldTicketPrice|flightTax|fuelTax|insuranceAmount|serviceFeesAmount|markupAmount"
              label="应收金额"
            >
              <template slot-scope="scope">
                {{
                  Number(scope.row.soldTicketPrice) +
                    Number(scope.row.flightTax) +
                    Number(scope.row.fuelTax) +
                    Number(scope.row.insuranceAmount) +
                    Number(scope.row.serviceFeesAmount) +
                    Number(scope.row.markupAmount)
                }}
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="soldTicketPrice|flightTax|fuelTax|serviceFeesAmount|markupAmount"
              label="机票总价(不含保险)"
            >
              <template slot-scope="scope">
                {{
                  Number(scope.row.soldTicketPrice) +
                    Number(scope.row.flightTax) +
                    Number(scope.row.fuelTax) +
                    Number(scope.row.serviceFeesAmount) +
                    Number(scope.row.markupAmount)
                }}
              </template>
            </el-table-column>
          </el-table-column>
          <!-- 机票供应价格信息 -->
          <el-table-column
            v-if="!detail.isSelfOperated"
            label="机票供应价格信息"
          >
            <el-table-column
              width="80"
              prop="supplierOriginTicketPrice"
              label="供应票面价"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">
                  {{ scope.row.supplierOriginTicketPrice }}
                </span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierOriginTicketPrice"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="supplierOriginSoldPrice"
              label="供应销售价"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">
                  {{ scope.row.supplierOriginSoldPrice }}
                </span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierOriginSoldPrice"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column width="80" prop="supplierKeepAmount" label="留钱">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.supplierKeepAmount
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierKeepAmount"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column width="80" prop="supplierRebate" label="返点">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.supplierRebate
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierRebate"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="supplierFlightFuelTaxes"
              label="机建/燃油"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">
                  {{ scope.row.supplierFlightTaxes }}<br>{{
                    scope.row.supplierFuelTaxes
                  }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierFlightTaxes"
                  size="normal"
                  clearable
                />
                <br>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierFuelTaxes"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="supplierPlatformService"
              label="平台服务费"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.supplierPlatformService
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierPlatformService"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="supplierSupplierService"
              label="供应商服务费"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.supplierSupplierService
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierSupplierService"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="supplierMarkupAmount"
              label="加价/让利"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.supplierMarkupAmount
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierMarkupAmount"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="supplierSettlementAmount"
              label="票款总价"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">
                  {{ scope.row.supplierSettlementAmount }}
                </span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierSettlementAmount"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="supplierTicketAmount"
              label="应付票款"
            >
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.supplierTicketAmount
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.supplierTicketAmount"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
          </el-table-column>
          <!-- 保险信息 -->
          <el-table-column v-if="!detail.isSelfOperated" label="保险信息">
            <el-table-column width="80" prop="insuranceNum" label="投保份数">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.insuranceNum
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.insuranceNum"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
            <el-table-column width="80" prop="insuranceAmount" label="保险金额">
              <template slot-scope="scope">
                <span v-show="!scope.row.showEdit || !isWaitingForPayment">{{
                  scope.row.insuranceAmount
                }}</span>
                <el-input
                  v-show="scope.row.showEdit && isWaitingForPayment"
                  v-model="scope.row.insuranceAmount"
                  size="normal"
                  clearable
                />
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="!detail.isSelfOperated"
            width="80"
            prop="phone"
            label="结算小计(机票+保险)"
          >
            <template slot-scope="scope">
              {{
                scope.row.insuranceAmount + scope.row.supplierSettlementAmount
              }}
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            prop="carrierTicketNo"
            label="票号"
            fixed="right"
          >
            <template slot-scope="scope">
              {{ scope.row.carrierTicketNo }}
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            prop="phone"
            label="出票渠道"
            fixed="right"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  !(
                    Object.is(scope.row.ticketChannel, undefined) ||
                    Object.is(scope.row.ticketChannel, null)
                  )
                "
              >
                {{
                  $t(
                    `AdminService["Enum:TicketChannelType:${scope.row.ticketChannel}"]`
                  )
                }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="custom-card">
        <div class="card-title">联系人信息</div>
        <el-table
          :data="detail.orderContactBO"
          border
          style="width: 100%"
          class="mt-15"
        >
          <el-table-column label="联系人" prop="contactName" />
          <el-table-column label="手机号" prop="contactPhone" />
          <el-table-column label="邮箱" prop="contactEmail" />
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
              {{
                $t(
                  `AdminService["Enum:InsuranceType:${scope.row.insuranceType}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.status ? '停止销售' : '正常销售' }}
            </template>
          </el-table-column>
          <el-table-column prop="insuranceCoverage" label="保额(万元)" />
          <el-table-column prop="insuranceSalePrice" label="销售价格" />
          <el-table-column prop="number" label="购买份数" />
        </el-table>
      </div>
    </div>
    <div v-if="detail.isSelfOperated" class="custom-card-red">
      <div class="card-title">
        自营机票采购单信息
        <div style="float: right">
          <el-button
            v-if="
              detail.orderPassengerBOList.length !==
                selfIssueTicketPurchaseOrderList.length
            "
            class="el-button-red"
            plain
            size="mini"
            :loading="btnLoading"
            @click="createPurchaseOrder()"
          >创建采购单
          </el-button>
          <el-button
            v-if="detail.orderStatus in [0, 1, 2]"
            class="el-button-red"
            plain
            size="mini"
            :loading="btnLoading"
            @click="completeSelfPurchaseOrder()"
          >出票完成
          </el-button>
        </div>
      </div>
      <div class="card-box" style="padding: 10px">
        <el-table
          :data="selfIssueTicketPurchaseOrderList"
          :header-row-class-name="'gray-row'"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="{ row }">
              <el-table
                border
                :data="row.purchaseTicketList"
                :header-row-class-name="'gray-row'"
                style="width: 100%"
              >
                <el-table-column align="center" prop="" label="乘机人">
                  <template slot-scope="scope">
                    <span>{{
                      scope.row.passengerBO.lastName +
                        scope.row.passengerBO.firstName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column :width="180" align="center" prop="" label="票号">
                  <template slot-scope="scope">
                    <div
                      v-for="(segItem, segIndex) in scope.row
                        .segmentPurchaseInfoList"
                      :key="'carrierTicketNo' + segIndex"
                    >
                      {{ segItem.carrierTicketNo }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  :width="150"
                  align="center"
                  prop="cabinCode"
                  label="舱位/运价基础"
                >
                  <template slot-scope="scope">
                    <div
                      v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList"
                      :key="'cabinCode' + segIndex"
                    >
                      <span>第{{ segIndex + 1 }}程：{{ segItem.cabinCode }}</span>
                      <span v-if="segItem.fareBaseCode">/{{ segItem.fareBaseCode }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="purchaseTicketPrice"
                  label="票面价"
                />
                <el-table-column align="center" prop="" label="代理费">
                  <template slot-scope="scope">
                    <div
                      v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList"
                      :key="'purchaseAgencyFees' + segIndex"
                    >
                      {{ segItem.purchaseAgencyFees }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="优惠券">
                  <template slot-scope="scope">
                    <div
                      v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList"
                      :key="'couponAmount' + segIndex"
                    >
                      {{ segItem.couponAmount }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="flightTax" label="机建" />
                <el-table-column align="center" prop="fuelTax" label="燃油" />
                <el-table-column align="center" prop="rebate" label="后返" />
                <el-table-column
                  align="center"
                  prop="additionalAmount"
                  label="额外成本"
                />
                <el-table-column
                  align="center"
                  prop="paymentAmount"
                  label="支付金额"
                />
              </el-table>
              <div
                v-if="row.purchaseOrderStatus !== 2"
                style="margin-top: 5px; text-align: center"
              >
                <el-button
                  type="primary"
                  size="mini"
                  @click="autoCompleteSelfPurchaseOrder(row)"
                >自动出票</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            prop="issuePurchaseOrderNo"
            label="采购出票订单号"
          />
          <el-table-column
            width="100"
            prop="purchaseOrderStatus"
            label="订单状态"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  !(
                    Object.is(scope.row.purchaseOrderStatus, undefined) ||
                    Object.is(scope.row.purchaseOrderStatus, null)
                  )
                "
              >
                {{
                  $t(
                    `AdminService["Enum:PurchaseOrderStatusType:${scope.row.purchaseOrderStatus}"]`
                  )
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column width="90" prop="orderFlightType" label="航程类型">
            <template slot-scope="scope">
              <span
                v-if="
                  !(
                    Object.is(scope.row.orderFlightType, undefined) ||
                    Object.is(scope.row.orderFlightType, null)
                  )
                "
              >
                {{
                  $t(
                    `AdminService["Enum:TripType:${scope.row.orderFlightType}"]`
                  )
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            prop="departureAirportCode"
            label="起飞到达"
          >
            <template slot-scope="scope">
              <div
                v-for="orderFlight in scope.row.orderFlightList"
                :key="orderFlight.id"
              >
                <el-tooltip effect="light" placement="top-start">
                  <div slot="content">
                    第{{ orderFlight.segmentNumber + 1 }}程:
                    {{ orderFlight.departureAirportName }}({{
                      orderFlight.departureAirportCode
                    }}) - {{ orderFlight.arrivalAirportName }}({{
                      orderFlight.arrivalAirportCode
                    }})<br>
                  </div>
                  <div>
                    {{ orderFlight.departureAirportCode }} -
                    {{ orderFlight.arrivalAirportCode }}
                  </div>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="100" prop="ticketChannel" label="出票渠道">
            <template slot-scope="scope">
              <div
                v-if="
                  !(
                    Object.is(scope.row.ticketChannel, undefined) ||
                    Object.is(scope.row.ticketChannel, null)
                  )
                "
              >
                {{
                  $t(
                    `AdminService["Enum:TicketChannelType:${scope.row.ticketChannel}"]`
                  )
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            prop="adultBigPnr"
            label="大编码"
            :render-header="
              (h, obj) => customLabelRenderHeader(h, obj, '小编码')
            "
          >
            <template slot-scope="scope">
              <div>{{ scope.row.adultBigPnr }}</div>
              <div>{{ scope.row.adultSmallPnr }}</div>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            prop="adultBigPnr"
            label="儿童大编码"
            :render-header="
              (h, obj) => customLabelRenderHeader(h, obj, '儿童小编码')
            "
          >
            <template slot-scope="scope">
              <div>{{ scope.row.childBigPnr }}</div>
              <div>{{ scope.row.childSmallPnr }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="officeNo" label="下单账号" />
          <el-table-column prop="purchasePayPlatform" label="支付平台">
            <template slot-scope="scope">
              <div v-if="scope.row.purchasePayPlatform !== null">
                {{
                  $t(
                    `AdminService["Enum:PurchasePayPlatformType:${scope.row.purchasePayPlatform}"]`
                  )
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="purchasePayAccount" label="支付账号" />
          <el-table-column
            width="130"
            prop="purchasePayFlowNo"
            label="支付流水号"
          />
          <el-table-column prop="purchasePayStatus" label="支付状态">
            <template slot-scope="scope">
              <div
                v-if="
                  !(
                    Object.is(scope.row.purchasePayStatus, undefined) ||
                    Object.is(scope.row.purchasePayStatus, null)
                  )
                "
              >
                {{
                  $t(
                    `AdminService["Enum:PurchasePayStatusType:${scope.row.purchasePayStatus}"]`
                  )
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="purchasePayAmount" label="订单支付总价" />
          <el-table-column
            v-if="detail.orderStatus in [0, 1, 2, 3]"
            width="170"
            prop=""
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                plain
                size="mini"
                :loading="btnLoading"
                @click="updatePurchaseOrder(scope.row)"
              >
                编辑
                <!-- <span v-if="detail.orderStatus in [0,1,2]">编辑</span>
                <span v-else>票号重填</span> -->
              </el-button>
              <el-button
                v-if="detail.orderStatus in [0, 1, 2]"
                type="danger"
                plain
                size="mini"
                :loading="btnLoading"
                @click="deletePurchaseOrder(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 自营保险 -->
    <div v-if="purchaseInsuranceList.length > 0" class="custom-card-red">
      <div class="card-title">自营保险采购单信息</div>
      <div class="card-box" style="padding: 10px">
        <div class="custom-box">
          <el-table
            :data="purchaseInsuranceList"
            :header-row-class-name="'gray-row'"
            style="width: 100%"
          >
            <el-table-column align="center" label="是否自动投保">
              <template slot-scope="scope">
                <span v-if="scope.row.insuranceDockingType">自动投保</span>
                <span v-else>手动投保</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="orderInsuranceNo"
              label="采购保险单号"
            />
            <el-table-column
              align="center"
              width="160"
              prop="purchaseInsuranceStatus"
              label="订单状态"
            >
              <template slot-scope="scope">
                {{
                  $t(
                    `AdminService["Enum:PurchaseInsuranceStatus:${scope.row.purchaseInsuranceStatus}"]`
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              prop="insuranceType"
              label="保险类型"
            >
              <template slot-scope="{ row }">
                {{
                  $t(`AdminService["Enum:InsuranceType:${row.insuranceType}"]`)
                }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="insuranceCompany"
              label="保险公司"
            />
            <el-table-column
              align="center"
              width="90"
              prop="effectiveDate"
              label="生效日期"
            >
              <template slot-scope="{ row }">
                <div v-if="row.effectiveDate">
                  {{ row.effectiveDate | dateYMD }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="purchasePayFlowNo" label="支付流水号" />
            <el-table-column prop="officeNo" label="乘机人">
              <template slot-scope="{ row }">
                <span>{{
                  row.passengerBO.lastName + row.passengerBO.firstName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="carrierTicketNo" label="航段">
              <template slot-scope="{ row }">
                {{ row.flightBO.departureAirportCode }}-{{
                  row.flightBO.arrivalAirportCode
                }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              prop="purchasePrice"
              label="采购单价"
            />
            <el-table-column
              align="center"
              width="80"
              prop="purchaseNumber"
              label="采购份数"
            />
            <el-table-column
              align="center"
              width="80"
              prop="purchasePrice|purchaseNumber"
              label="支付总价"
            >
              <template slot-scope="{ row }">
                <div>
                  {{
                    (
                      Number(row.purchasePrice) * Number(row.purchaseNumber)
                    ).toFixed(2)
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="100"
              prop="purchaseRefundAmount"
              label="退保金额"
            >
              <template slot-scope="scope">
                {{ Number(scope.row.purchaseRefundAmount).toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column align="center" width="180" prop="" label="操作">
              <template slot-scope="{ row }">
                <el-button
                  v-if="row.insuranceDockingType === 0"
                  type="primary"
                  plain
                  size="mini"
                  @click="updatePurchaseInsuranceOrder(row)"
                >编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-collapse accordion class="custom-collapse">
      <el-collapse-item>
        <template slot="title">
          <div class="card-title">支付信息</div>
        </template>
        <div class="card-box" style="padding: 15px 10px">
          <el-table :data="detail.paymentResp" border style="width: 100%">
            <el-table-column label="业务类型" prop="businessType">国内机票</el-table-column>
            <el-table-column label="支付手续费" prop="feesAmount" />
            <el-table-column label="实付金额" prop="paymentAmount" />
            <el-table-column label="支付方式">
              <template v-if="scope.row.payChannel" slot-scope="scope">
                {{ $t(`AdminService["Enum:PayChannelType:${scope.row.payChannel}"]`) }}
              </template>
            </el-table-column>
            <el-table-column prop="finishedTime" label="支付时间" />
            <el-table-column prop="tradeStatus" label="支付状态">
              <template v-if="scope.row.tradeStatus" slot-scope="scope">
                {{ $t(`AdminService["Enum:TradeStatus:${scope.row.tradeStatus}"]`) }}
              </template>
            </el-table-column>
            <el-table-column prop="tradeNo" label="支付流水号" />
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-collapse accordion class="custom-collapse">
      <el-collapse-item>
        <template slot="title">
          <div class="card-title">机票退改规定</div>
        </template>
        <div class="card-box" style="padding: 15px 10px">
          <el-table
            :data="detail.orderGuestRuleBOList"
            border
            style="width: 100%"
          >
            <el-table-column label="客票类型" prop="passengerType" width="100">
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
              </template>
            </el-table-column>
            <el-table-column label="舱位" prop="cabinCode" width="50" />
            <el-table-column label="行程" prop="orderFlightBO">
              <template slot-scope="scope">
                {{ scope.row.orderFlightBO.departureCityNameCn }} - {{ scope.row.orderFlightBO.arrivalCityNameCn }}
              </template>
            </el-table-column>
            <el-table-column label="自愿退票规定" prop="refundPriceRuleList">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row.refundPriceRuleList"
                  :key="index"
                >
                  航班预计离站时间前{{ item.beforeMinDistanceHours }}小时（含）前,费率: {{ item.feesRate * 100 }}%
                </div>
              </template>
            </el-table-column>
            <el-table-column label="自愿改期规定" prop="changePriceRuleList">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row.changePriceRuleList"
                  :key="index"
                >
                  航班预计离站时间前{{ item.beforeMinDistanceHours }}小时（含）前,费率: {{ item.feesRate * 100 }}%
                </div>
              </template>
            </el-table-column>
            <el-table-column label="退改说明" prop="refundChangeContent" />
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="custom-card">
      <div class="card-title">订单备注</div>
      <div class="card-box">
        <el-row>
          <el-col :span="8" style="padding: 0 15px 15px">
            <el-input
              v-model="detail.remark"
              type="textarea"
              :rows="4"
              clearable
            />
          </el-col>
          <el-col :span="8">
            <el-button
              type="primary"
              size="mini"
              @click="updateIssueOrderRemark()"
            >更新备注</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <div v-if="!dialogDetail" align="center" class="mt-15">
      <routerBack />
    </div>
    <businessLog
      :is="'businessLog'"
      v-if="detail && detail.id"
      :id="detail.id"
      :model-name="'分销管理'"
      :data-type="0"
    />
    <SubmitRefund ref="dialog" />
    <submitChange ref="changeDialog" />
    <IssueSendMessage ref="sendMessageDialog" />
    <AutoIssueTicketPurchaseOrder ref="autoIssueTicketPurchaseOrderDialog" />
    <CreateEditPurchaseOrder
      ref="createEditPurchaseOrderDialog"
      @handleFilter="handleFilter"
    />
    <CreateUpdatePurchaseInsurance
      ref="createUpdatePurInsuranceDialog"
      @handleFilter="handleFilter"
    />
    <EditAgentOrder ref="editAgentOrderDialog" @handleFilter="handleFilter" />
    <PolicyDetail ref="policyDetailDialog" />
  </div>
</template>
<script>
import PassengerTypeEnum from '@/enum/PassengerType'
import IdentityCardTypeEnum from '@/enum/identityCardType'
import GenderTypeEnum from '@/enum/genderType'
import PurchaseOrderStatusTypeEnum from '@/enum/PurchaseOrderStatusType'
import TicketChannelTypeEnum from '@/enum/TicketChannelType'
import TripTypeEnum from '@/enum/TripType'
import PurchasePayPlatformTypeEnum from '@/enum/PurchasePayPlatformType'
import PurchasePayStatusTypeEnum from '@/enum/PurchasePayStatusType'
import RouterBack from '@/components/RouterBack/index.vue'
import BusinessLog from '@/components/BussinessLog/index.vue'
import {
  issueOrderDetail,
  issueOrderRefusal,
  issueOrderSuccess,
  updateServiceFeesAmount,
  updateMarkupAmount,
  updatePassengerTicket,
  getIssueTicketSelfPurchaseOrderList,
  updateIssueTicketSelfPurchaseOrder,
  completeIssueTicketSelfPurchaseOrder,
  deleteIssueTicketSelfPurchaseOrder,
  updateIssueOrderRemark
} from '@/api/agent/issue-order'
import SubmitRefund from '../refund/submit-refund.vue'
import submitChange from '../change/submit-change.vue'
import IssueSendMessage from './components/send-message.vue'
import AutoIssueTicketPurchaseOrder from './components/auto-issue-ticket-purchase-order.vue'
import CreateEditPurchaseOrder from './components/create-edit-purchase-order.vue'
import CreateUpdatePurchaseInsurance from './components/create-update-purchase-insurance.vue'
import { getPurchaseOrderInsurance } from '@/api/agent/order-insurance'
import EditAgentOrder from './components/edit-agent-order.vue'
import PolicyDetail from './components/policy-detail.vue'

export default {
  name: 'IssueDetail',
  components: {
    RouterBack,
    BusinessLog,
    SubmitRefund,
    submitChange,
    IssueSendMessage,
    AutoIssueTicketPurchaseOrder,
    CreateEditPurchaseOrder,
    CreateUpdatePurchaseInsurance,
    EditAgentOrder,
    PolicyDetail
  },
  data() {
    return {
      dialogDetail: false,
      loading: false,
      isSupplyer: false,
      purchaseOrderList: [0],
      status: '',
      detail: {},
      isWaitingForPayment: false,
      ticketCallbackList: [],
      serviceFeesAmount: null,
      markupAmount: null,
      serviceFeesAmountLoading: false,
      passengerTypeOptions: [],
      genderTypeOptions: [],
      purchaseOrderStatusTypeOptions: [],
      ticketChannelTypeOptions: [],
      tripTypeOptions: [],
      purchasePayPlatformTypeOptions: [],
      btnLoading: false,
      selfIssueTicketPurchaseOrderList: [],
      purchaseInsuranceList: [],
      paymentColl: ['1'],
      coll: ['1']
    }
  },
  created() {
    this.$nextTick(() => {
      this.status = parseInt(this.$route.query.status)
      const ticketIssueOrderNo = this.$route.query.ticketIssueOrderNo
      if (ticketIssueOrderNo) {
        this.getIssueOrderDetail(ticketIssueOrderNo)
      }
    })
    // this.getPurchaseOrderInsuranceList()
  },
  mounted() {
    this.passengerTypeOptions = Object.keys(
      PassengerTypeEnum.PassengerType
    ).map((key) => ({
      value: PassengerTypeEnum.PassengerType[key],
      label: this.$t(`AdminService["Enum:PassengerType:${PassengerTypeEnum.PassengerType[key]}"]`)
    }))
    this.identityCardTypeOptions = Object.keys(
      IdentityCardTypeEnum.IdentityCardType
    ).map((key) => ({
      value: IdentityCardTypeEnum.IdentityCardType[key],
      label: this.$t(`AdminService["Enum:IdentityCardType:${IdentityCardTypeEnum.IdentityCardType[key]}"]`)
    }))
    this.genderTypeOptions = Object.keys(GenderTypeEnum.GenderType).map(
      (key) => ({
        value: GenderTypeEnum.GenderType[key],
        label: this.$t(`AdminService["Enum:GenderType:${GenderTypeEnum.GenderType[key]}"]`)
      })
    )
    this.purchaseOrderStatusTypeOptions = Object.keys(
      PurchaseOrderStatusTypeEnum.PurchaseOrderStatusType
    ).map((key) => ({
      value: PurchaseOrderStatusTypeEnum.PurchaseOrderStatusType[key],
      label: this.$t(`AdminService["Enum:PurchaseOrderStatusType:${PurchaseOrderStatusTypeEnum.PurchaseOrderStatusType[key]}"]`)
    }))
    this.tripTypeOptions = Object.keys(TripTypeEnum.TripType).map((key) => ({
      value: TripTypeEnum.TripType[key],
      label: this.$t(`AdminService["Enum:TripType:${TripTypeEnum.TripType[key]}"]`)
    }))
    this.ticketChannelTypeOptions = Object.keys(
      TicketChannelTypeEnum.TicketChannelType
    ).map((key) => ({
      value: TicketChannelTypeEnum.TicketChannelType[key],
      label: this.$t(`AdminService["Enum:TicketChannelType:${TicketChannelTypeEnum.TicketChannelType[key]}"]`)
    }))
    this.purchasePayPlatformTypeOptions = Object.keys(
      PurchasePayPlatformTypeEnum.PurchasePayPlatformType
    ).map((key) => ({
      value: PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key],
      label: this.$t(`AdminService["Enum:PurchasePayPlatformType:${PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key]}"]`)
    }))
    this.purchasePayStatusTypeOptions = Object.keys(
      PurchasePayStatusTypeEnum.PurchasePayStatusType
    ).map((key) => ({
      value: PurchasePayStatusTypeEnum.PurchasePayStatusType[key],
      label: this.$t(`AdminService["Enum:PurchasePayStatusType:${PurchasePayStatusTypeEnum.PurchasePayStatusType[key]}"]`)
    }))
  },
  methods: {
    policyDialog() {
      this.$refs['policyDetailDialog'].handle(this.detail.policyPersistent)
    },
    handleOpen(detail) {
      this.dialogDetail = true
      this.status = detail.status
      this.getIssueOrderDetail(detail.ticketIssueOrderNo)
    },
    getIssueOrderDetail(ticketIssueOrderNo) {
      this.loading = true
      issueOrderDetail(ticketIssueOrderNo, this.status).then((response) => {
          this.loading = false
          this.detail = response.data
          this.detail.orderPassengerBOList =
            this.detail.orderPassengerBOList.map((item) => {
              return {
                ...item,
                showEdit: false, // 是否可编辑，默认加载完数据不是可编辑状态，获取焦点后才可编辑
                disabled: true // 操作列有个保存编辑的按钮，为了行编辑请求接口的时候有个加载状态
              }
            })
          console.log(' ---- this.detail', this.detail)
          this.getSelfPurchaseOrderList()
          this.getPurchaseOrderInsuranceList()
          if (this.detail.orderStatus === 0) {
            this.isWaitingForPayment = true
          } else {
            this.isWaitingForPayment = false
          }
        }
      )
    },
    // 修改服务费
    serviceFeesAmountConfirm(data) {
      if (this.serviceFeesAmount === null) {
        this.$message({
          type: 'success',
          message: '请填写服务费金额'
        })
        return
      }
      this.serviceFeesAmountLoading = true
      updateServiceFeesAmount({
        orderNo: this.detail.ticketIssueOrderNo,
        passengerId: data.passengerId,
        serviceFeesAmount: this.serviceFeesAmount
      }).then((response) => {
        if (response.status === '200') {
          this.$message({
            type: 'success',
            message: '已完成'
          })
          this.serviceFeesAmountLoading = false
          // 在查询一次页面
          issueOrderDetail(this.detail.ticketIssueOrderNo).then((response) => {
            if (response.status === '200') {
              this.serviceFeesAmount = null
              // 赋值
              this.detail = response.data
            }
          })
        }
      })
    },
    // 修改加价/让利
    markupAmountConfirm(data) {
      if (this.markupAmount === null) {
        this.$message({
          type: 'success',
          message: '请填写加价/让利金额'
        })
        return
      }
      this.serviceFeesAmountLoading = true
      updateMarkupAmount({
        orderNo: this.detail.ticketIssueOrderNo,
        passengerId: data.passengerId,
        markupAmount: this.markupAmount
      }).then((response) => {
        if (response.status === '200') {
          this.$message({
            type: 'success',
            message: '已完成'
          })
          this.serviceFeesAmountLoading = false
          // 在查询一次页面
          issueOrderDetail(this.detail.ticketIssueOrderNo).then((response) => {
            if (response.status === '200') {
              this.markupAmount = null
              // 赋值
              this.detail = response.data
            }
          })
        }
      })
    },
    reject() {
      this.$confirm('确定需要拒绝该出票订单么？', '拒绝出票', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        issueOrderRefusal(this.detail.ticketIssueOrderNo)
          .then((response) => {
            if (response.status === '200') {
              this.$message({
                type: 'success',
                message: '拒绝出票成功!'
              })
              this.getIssueOrderDetail()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '拒绝出票失败'
            })
          })
      })
    },
    issueNotify() {
      this.$refs['sendMessageDialog'].handleOpen(this.detail)
    },
    change() {
      // 申请改签,打开changeDialog
      this.$refs['changeDialog'].detail(this.detail.ticketIssueOrderNo, 0)
    },
    refund() {
      this.$confirm('确定需要对该订单进行退票操作么？', '申请退票', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$refs['dialog'].detail(this.detail.ticketIssueOrderNo, 0)
        })
        .catch(() => {})
    },
    confirmIssue() {
      this.$confirm(
        '确定需要对该订单进行确认出票完成操作么？',
        '确认出票完成',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        issueOrderSuccess(
          this.detail.ticketIssueOrderNo,
          this.detail.ticketSuccessBOList
        )
          .then((response) => {
            if (response.status === '200') {
              this.$message({
                type: 'success',
                message: '确认出票完成成功!'
              })
              this.getIssueOrderDetail()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '确认出票完成失败'
            })
          })
      })
    },
    orderEdit(row) {
      this.$refs['editAgentOrderDialog'].handleUpdate(
        row,
        this.detail.ticketIssueOrderNo
      )
    },
    orderEditCancel(row) {
      row.showEdit = false
      this.getIssueOrderDetail()
    },
    orderEditSave(row) {
      if (this.detail.orderStatus !== 3) {
        this.$confirm(
          '确定需要对该乘客的订票信息进行修改么？',
          '乘客订票信息修改',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }
        ).then(() => {
          updatePassengerTicket({
            orderNo: this.detail.ticketIssueOrderNo,
            passengerId: row.passengerId,
            passengerType: row.passengerType,
            firstName: row.firstName,
            lastName: row.lastName,
            gender: row.gender,
            cardType: row.cardType,
            cardNum: row.cardNum,
            birthday: row.birthday,
            phone: row.phone,
            originTicketPrice: row.originTicketPrice,
            soldTicketPrice: row.soldTicketPrice,
            flightTax: row.flightTax,
            fuelTax: row.fuelTax,
            keepAmount: row.keepAmount,
            rebate: row.rebate,
            markupAmount: row.markupAmount,
            serviceFeesAmount: row.serviceFeesAmount,
            supplierOriginTicketPrice: row.supplierOriginTicketPrice,
            supplierOriginSoldPrice: row.supplierOriginSoldPrice,
            supplierFlightTaxes: row.supplierFlightTaxes,
            supplierFuelTaxes: row.supplierFuelTaxes,
            supplierKeepAmount: row.supplierKeepAmount,
            supplierRebate: row.supplierRebate,
            supplierPlatformService: row.supplierPlatformService,
            supplierSupplierService: row.supplierSupplierService,
            supplierMarkupAmount: row.supplierMarkupAmount
          })
            .then((response) => {
              if (response.status === '200') {
                this.$message({
                  type: 'success',
                  message: '乘客订票信息修改成功!'
                })
                this.getIssueOrderDetail()
              }
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '乘客订票信息修改失败'
              })
            })
        })
      } else {
        this.$confirm('确定需要重新回填票号么？', '票号重新回填', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          issueOrderSuccess(
            this.detail.ticketIssueOrderNo,
            this.detail.ticketSuccessBOList
          )
            .then((response) => {
              if (response.status === '200') {
                this.$message({
                  type: 'success',
                  message: '重新回填票号成功!'
                })
                this.getIssueOrderDetail()
              }
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '重新回填票号失败'
              })
            })
        })
      }
    },
    purchaseOrderEdit(row) {
      row.showEdit = true
    },
    purchaseOrderEditCancel(row) {
      row.showEdit = false
    },
    purchaseOrderEditSave(row) {
      this.$confirm(
        '确定需要对该乘客的订票信息进行修改么？',
        '乘客订票信息修改',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        updatePassengerTicket({
          orderNo: this.detail.ticketIssueOrderNo,
          passengerId: row.passengerId,
          passengerType: row.passengerType,
          firstName: row.firstName,
          lastName: row.lastName,
          gender: row.gender,
          cardType: row.cardType,
          cardNum: row.cardNum,
          birthday: row.birthday,
          phone: row.phone,
          originTicketPrice: row.originTicketPrice,
          soldTicketPrice: row.soldTicketPrice,
          flightTax: row.flightTax,
          fuelTax: row.fuelTax,
          keepAmount: row.keepAmount,
          rebate: row.rebate,
          markupAmount: row.markupAmount,
          serviceFeesAmount: row.serviceFeesAmount,
          supplierOriginTicketPrice: row.supplierOriginTicketPrice,
          supplierOriginSoldPrice: row.supplierOriginSoldPrice,
          supplierFlightTaxes: row.supplierFlightTaxes,
          supplierFuelTaxes: row.supplierFuelTaxes,
          supplierKeepAmount: row.supplierKeepAmount,
          supplierRebate: row.supplierRebate,
          supplierPlatformService: row.supplierPlatformService,
          supplierSupplierService: row.supplierSupplierService,
          supplierMarkupAmount: row.supplierMarkupAmount
        })
          .then((response) => {
            if (response.status === '200') {
              this.$message({
                type: 'success',
                message: '乘客订票信息修改成功!'
              })
              this.getIssueOrderDetail()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '乘客订票信息修改失败'
            })
          })
      })
    },
    createPurchaseOrder() {
      this.$refs['createEditPurchaseOrderDialog'].handleCreate(
        this.detail,
        this.selfIssueTicketPurchaseOrderList
      )
    },
    updatePurchaseOrder(row) {
      this.$refs['createEditPurchaseOrderDialog'].handleUpdate(
        row,
        this.detail.orderStatus
      )
    },
    deletePurchaseOrder(row) {
      this.btnLoading = true
      this.$confirm('确定需要删除该自营采购订单么？', '删除自营采购订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.btnLoading = false
          deleteIssueTicketSelfPurchaseOrder(row.id)
            .then((response) => {
              if (response.status === '200') {
                this.getIssueOrderDetail()
                this.$message({
                  type: 'success',
                  message: '删除自营采购订单成功!'
                })
              }
            })
            .catch(() => {
              this.btnLoading = false
              this.$message({
                type: 'info',
                message: '删除自营采购订单失败'
              })
            })
        })
        .catch(() => {
          this.btnLoading = false
        })
    },

    customHeaderStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 1) {
          // background: #f26393; color: #fff
          return 'background:	#fff; color: #ee0d58; font-weight:bold; font-size: 14px; letter-spacing: 6px;'
        } else if (columnIndex === 2) {
          // return 'background: #72b4f1; color: #fff'
          return 'background:	#fff; color: #0382f9; font-weight:bold; font-size: 14px; letter-spacing: 6px;'
        } else {
          return 'background:	#fff;'
        }
      }
    },
    customLabelRenderHeader(h, { column, $index }, secondLabel) {
      return h('div', [h('div', column.label), h('div', secondLabel)])
    },
    getSummaries(param) {
      const { columns, data } = param
      const sumColumnProperty = [
        // 'originTicketPrice',
        // 'soldTicketPrice',
        // 'keepAmount',
        // 'flightTax|fuelTax',
        // 'insuranceNum',
        // 'insuranceAmount',
        // 'serviceFeesAmount',
        // 'markupAmount',
        'soldTicketPrice|flightTax|fuelTax|insuranceAmount|serviceFeesAmount|markupAmount',
        'soldTicketPrice|flightTax|fuelTax|serviceFeesAmount|markupAmount'
      ]
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (sumColumnProperty.includes(column.property)) {
          const values = data.map((item) => {
            var result = 0
            var columProperty = column.property.split('|')
            for (var i = 0; i < columProperty.length; i++) {
              // console.log('-------',)
              result += Number(item[columProperty[i]])
            }
            return result
          })
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ''
          } else {
            sums[index] = 'N/A'
          }
        }
      })

      return sums
    },
    // 自营采购相关接口调用
    // 自营采购订单列表获取
    getSelfPurchaseOrderList() {
      getIssueTicketSelfPurchaseOrderList(this.detail.ticketIssueOrderNo)
        .then((response) => {
          this.selfIssueTicketPurchaseOrderList = []
          if (response.status === '200') {
            this.selfIssueTicketPurchaseOrderList = response.data
            let count = 0
            response.data.forEach((item) => {
              count += item.purchaseTicketList.length
            })
            this.selfOrderPassengers = count
          }
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    // 更新自营采购订单
    updateSelfPurchaseOrder(row) {
      this.$confirm(
        '确定需要更新并保存该自营采购订单么？',
        '更新自营采购订单',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        console.log(row)
        // this.updateSelfIssueTicketPurchaseOrderParm = row[0]
        console.log('***********row', row)
        updateIssueTicketSelfPurchaseOrder(row)
          .then((response) => {
            if (response.status === '200') {
              this.$message({
                type: 'success',
                message: '更新自营采购订单成功!'
              })
              // this.getIssueOrderDetail()
              this.getSelfPurchaseOrderList()
              row.showEdit = false
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '更新自营采购订单失败'
            })
          })
      })
    },
    // 完成自动出票订单
    completeSelfPurchaseOrder() {
      this.$confirm('确定需要完成该订单的出票么？', '完成出票', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        completeIssueTicketSelfPurchaseOrder(this.detail.ticketIssueOrderNo)
          .then((response) => {
            if (response.status === '200') {
              this.$message({
                type: 'success',
                message: '完成出票成功!'
              })
              this.getIssueOrderDetail()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '完成出票失败'
            })
          })
      })
    },
    autoCompleteSelfPurchaseOrder(item) {
      this.$refs['autoIssueTicketPurchaseOrderDialog'].handlerOpen(item)
    },
    // 自动计算费用
    sumSelfPurchaseOrderPaymentAmount(item, row) {
      var sum = 0
      row.segmentPurchaseInfoList.forEach((element) => {
        sum =
          Number(sum) +
          Number(element.couponAmount) +
          Number(element.purchaseAgencyFees)
      })
      row.paymentAmount =
        Number(row.purchaseTicketPrice) +
        Number(row.flightTax) +
        Number(row.fuelTax) -
        sum
      var sumTotalAmount = 0
      item[0].purchaseTicketList.forEach((element) => {
        sumTotalAmount = Number(sumTotalAmount) + Number(element.paymentAmount)
      })
      item[0].purchasePayAmount = sumTotalAmount
    },
    sumTotalSelfPOPaymentAmount(item) {
      // console.log('this is item:',item)
      var sumTotalAmount = 0
      item[0].purchaseTicketList.forEach((element) => {
        sumTotalAmount = Number(sumTotalAmount) + Number(element.paymentAmount)
      })
      item[0].purchasePayAmount = sumTotalAmount
    },
    updateIssueOrderRemark() {
      this.$confirm(
        '确定需要更新出票订单备注信息么？',
        '更新出票订单备注信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      ).then(() => {
        updateIssueOrderRemark({
          id: this.detail.id,
          remark: this.detail.remark
        })
          .then((response) => {
            if (response.status === '200') {
              this.$message({
                type: 'success',
                message: '更新出票订单备注信息成功!'
              })
              this.getIssueOrderDetail()
              this.getSelfPurchaseOrderList()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '更新出票订单备注信息失败'
            })
          })
      })
    },
    handleFilter(first = true) {
      if (first) {
        this.getIssueOrderDetail()
        // this.getPurchaseOrderInsurance()
      }
    },
    // 获取自营保险
    getPurchaseOrderInsuranceList() {
      // console.log('-----------this.detail.ticketIssueOrderNo', this.detail.ticketIssueOrderNo)
      getPurchaseOrderInsurance(this.detail.ticketIssueOrderNo, 0)
        .then((response) => {
          this.purchaseInsuranceList = []
          if (response.status === '200') {
            this.purchaseInsuranceList = response.data.map((item) => {
              return {
                ...item,
                isEdit: false
              }
            })
          }
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    // 创建自营保险单
    createPurchaseInsuranceOrder() {
      const passengers = this.detail.originOrderPassengerBOList.map((p) => {
        return {
          passengerId: p.passengerId,
          label: p.lastName + p.firstName
        }
      })
      const flights = this.detail.originOrderFlightBOList.map((p) => {
        return {
          id: p.id,
          label: p.departureAirportCode + '-' + p.arrivalAirportCode
        }
      })
      this.$refs['createUpdatePurInsuranceDialog'].handleCreate(
        passengers,
        flights
      )
    },
    // 更新自营保险单
    updatePurchaseInsuranceOrder(row) {
      this.$refs['createUpdatePurInsuranceDialog'].handleUpdate(row)
    }
  }
}
</script>
<style>
.el-collapse-item__wrap {
  border-bottom: none !important;
  -webkit-transition: 0s height, 0s padding-top, 0s padding-bottom;
  transition: 0s height, 0s padding-top, 0s padding-bottom;
}
.el-collapse-item__content {
  padding-bottom: 0 !important;
}
</style>
<style lang="scss" scoped>
.custom-box {
  padding: 5px 5px;
  border: 1px dashed lightcoral;
  margin: 10px 0;
}

.custom-table .el-table th {
  background-color: #eeece4e1;
  /* 这里设置表头的背景颜色 */
}

.origin-ticket-table .el-table__footer-wrapper tbody tr td {
  &:nth-child(1),
  &:nth-child(18),
  &:nth-child(19),
  &:nth-child(28),
  &:nth-child(29) {
    color: #f56c6b !important;
    .cell {
      color: #f56c6b !important;
    }
  }
}

.custom-card-red .el-table__expanded-cell[class*='cell'] {
  padding: 15px 35px;
}

.change-refund-method-title {
  font-weight: bold;
  font-size: 14px;
  color: #000;
  line-height: 28px;
}

.el-button-red {
  background-color: #f24c60;
  color: #fff;
  border-color: #f24c60;
}

.el-button-red:hover,
.el-button-red:focus {
  color: #f24c60;
  border-color: #f24c60;
  background-color: #ffeded;
}
.el-button-red.is-plain {
  background-color: #fff;
  color: #f24c60;
  border-color: #fff;
}

.el-button-red.is-plain:hover,
.el-button-red.is-plain:focus {
  background-color: #ffeded;
  color: #f24c60;
  border-color: #fff;
}
</style>
