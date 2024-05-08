<template>
  <div class="app-container">
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
                <el-link :underline="false" type="primary" @click="issueDetail">{{ detail.originIssueOrderNo }}</el-link>
              </div>
            </div>
          </el-col>
          <el-col v-if="detail.originChangeOrderNo" :span="4">
            <div class="card-item">
              <label class="card-item-title">原改签订单号</label>
              <div class="card-item-content">
                <el-link :underline="false" type="primary" @click="changeDetail">{{ detail.originChangeOrderNo }}</el-link>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="card-item">
              <label class="card-item-title">订单状态</label>
              <div class="card-item-content">
                <span class="status-text">
                  {{
                    $t(
                      `AdminService["Enum:RefundOrderStatusType:${detail.orderStatus}"]`
                    )
                  }}
                </span>
              </div>
            </div>
          </el-col>
          <!-- v-if="detail.orderStatus in [0,1,2,4]" -->
          <el-col
            v-if="status === 1"
            :span="detail.originChangeOrderNo ? 6 : 10"
          >
            <div
              class="card-item"
              style="float: right; margin-right: 10px"
            >
              <div>
                <el-button
                  v-if="detail.orderStatus == 4"
                  size="small"
                  type="primary"
                  @click="refundNotify"
                >
                  发送通知
                </el-button>
                <el-button
                  v-if="detail.orderStatus == 0"
                  size="small"
                  type="primary"
                  @click="audit"
                >
                  审核确认
                </el-button>
                <el-button
                  v-if="detail.orderStatus in [0, 1, 2]"
                  size="small"
                  type="danger"
                  @click="reject"
                >
                  拒绝退票
                </el-button>
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
              <label class="card-item-title">客户名称</label>
              <div class="card-item-content">
                {{ detail.agentOrganizationName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">供应商</label>
              <div class="card-item-content">
                {{ detail.supplierName }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="card-item">
              <label class="card-item-title">退票理由</label>
              <div
                v-if="detail.isVolunteer === 0"
                class="card-item-content"
              >
                客人自愿退票，按客规收取手续费
              </div>
              <div
                v-if="detail.isVolunteer === 1"
                class="card-item-content"
              >
                {{ detail.refundTicketReason }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">创建人</label>
              <div class="card-item-content">
                {{ detail.createUserName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">确认退票员</label>
              <div class="card-item-content">
                {{ detail.ticketPersonName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">确认退款员</label>
              <div class="card-item-content">
                {{ detail.ticketPersonName }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="card-item">
              <label class="card-item-title">备注</label>
              <div class="card-item-content">
                {{ detail.refundTicketRemark }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="custom-card">
      <div class="card-title" align="center" style="letter-spacing: 6px">
        乘客价格信息
      </div>
      <div class="card-box" style="padding: 10px">
        <el-table
          :header-cell-style="customHeaderStyle"
          :data="detail.refundTicketBOList"
          show-summary
          :summary-method="getSummaries"
          class="refund-ticket-table"
          style="width: 100%"
        >
          <el-table-column label="">
            <el-table-column width="80" label="操作" fixed="left">
              <template slot-scope="scope">
                <el-button
                  v-if="detail.orderStatus in [0, 1, 2]"
                  type="primary"
                  size="mini"
                  @click="orderEdit(scope.row)"
                >编辑
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="60"
              label="类型"
              prop="orderBusinessType"
            >
              <template slot-scope="{ row }">
                <span :class="{ 'red-text': row.orderBusinessType !== 0 }">{{ $t(`AdminService["Enum:OrderBusinessType:${row.orderBusinessType}"]`) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="140"
              label="原始出票单号"
              prop="originOrderNo"
            />
            <el-table-column
              align="center"
              width="140"
              label="票号"
              prop="carrierTicketNo"
            />
            <el-table-column
              align="center"
              width="160"
              prop="passengerName"
              label="姓名"
            >
              <template slot-scope="scope">
                {{ scope.row.lastName }}{{ scope.row.firstName }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="135"
              prop="cardType"
              label="起飞时间"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '航程')
              "
            >
              <template slot-scope="scope">
                <div
                  v-for="(flight, flightIndex) in scope.row
                    .orderFlightBOList"
                  :key="'departureTime' + flightIndex"
                >
                  <div>{{ flight.departureTime }}</div>
                  {{ flight.departureAirportCode }} - {{ flight.arrivalAirportCode }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              prop="carrierNumber"
              label="航班号"
            >
              <template slot-scope="scope">
                <div v-for="(flight, flightIndex) in scope.row.orderFlightBOList" :key="'carrierNumber' + flightIndex">
                  {{ flight.carrierNumber }}{{ flight.flightNumber }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="60"
              align="center"
              prop="cabinCode"
              label="舱位"
            >
              <template slot-scope="scope">
                <div v-for="(flight, flightIndex) in scope.row.orderFlightBOList" :key="'cabinCode' + flightIndex">
                  {{ flight.cabinCode }}
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="客户价格信息"
            style="background-color: red; color: #fff"
          >
            <el-table-column
              align="center"
              prop="originTicketPrice"
              label="票面价"
            >
              <template slot-scope="scope">
                {{ Number(scope.row.originTicketPrice).toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="soldTicketPrice"
              label="销售价"
            >
              <template slot-scope="scope">
                {{ Number(scope.row.soldTicketPrice).toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="60"
              prop="flightTax|fuelTax"
              label="机建"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '燃油')
              "
            >
              <template slot-scope="scope">
                <div>{{ scope.row.flightTax }}</div>
                {{ scope.row.fuelTax }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="60"
              prop="insuranceNum"
              label="保险"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '份数')
              "
            />
            <el-table-column
              align="center"
              width="60"
              prop="insuranceAmount"
              label="保险"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '金额')
              "
            />
            <el-table-column
              align="center"
              width="60"
              prop="changePriceDifference"
              label="改期"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '升舱费')
              "
            />

            <el-table-column
              align="center"
              width="70"
              prop="refundServiceAmount"
              label="退票"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '服务费')
              "
            />
            <el-table-column
              align="center"
              width="60"
              prop="refundMarkupAmount"
              label="加价"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '让利')
              "
            />
            <!-- <el-table-column
              align="center"
              width="80"
              prop="paymentAmount"
              label="出票"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '实收金额')"
            /> -->

            <el-table-column
              align="center"
              width="80"
              prop="feesRate"
              label="退票费率"
            >
              <template slot-scope="scope">
                {{ Number(scope.row.feesRate) }}%
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="110"
              prop="feesAmount"
              label="退票"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '手续费')
              "
            >
              <template slot-scope="scope">
                <span class="red-text">{{
                  Number(scope.row.feesAmount)
                }}</span>
                <!-- <span
                  v-if="
                    detail.orderStatus === 0 ||
                      detail.orderStatus === 1 ||
                      detail.orderStatus === 2
                  "
                >
                   <el-popover
                    placement="top"
                    title="修改手续费"
                    width="200"
                    trigger="click"
                    @show="refundFeesAmount = null"
                  >
                    <el-input
                      v-model="refundFeesAmount"
                      type="text"
                    />
                    <div align="center">
                      <el-button
                        size="mini"
                        type="success"
                        plain
                        style="margin-top: 10px"
                        :loading="refundFeesLoading"
                        @click="
                          changeRefundFeesConfirm(
                            scope.row,
                            'refundFeesAmount'
                          )
                        "
                      >确认修改手续费</el-button>
                    </div>
                    <el-button
                      slot="reference"
                      type="success"
                      icon="el-icon-edit"
                      circle
                    />
                  </el-popover>
                </span> -->
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="110"
              prop="refundAmount"
              label="应退金额"
            >
              <template slot-scope="scope">
                <span class="red-text">{{
                  Number(scope.row.refundAmount)
                }}</span>
                <!-- <span
                  v-if="
                    detail.orderStatus === 0 ||
                      detail.orderStatus === 1 ||
                      detail.orderStatus === 2
                  "
                >
                  <el-popover
                    placement="top"
                    title="修改手续费"
                    width="200"
                    trigger="click"
                    @show="refundAmount = null"
                  >
                    <el-input
                      v-model="refundAmount"
                      type="text"
                    />
                    <div align="center">
                      <el-button
                        size="mini"
                        type="success"
                        plain
                        style="margin-top: 10px"
                        :loading="refundFeesLoading"
                        @click="
                          changeRefundFeesConfirm(
                            scope.row,
                            'refundAmount'
                          )
                        "
                      >确认修改应退金额</el-button>
                    </div>
                    <el-button
                      slot="reference"
                      type="success"
                      icon="el-icon-edit"
                      circle
                    />
                  </el-popover>
                </span> -->
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            v-if="detail.isSelfOperated === 0"
            label="机票供应价格信息"
            align="center"
          >
            <el-table-column
              align="center"
              width="70"
              prop="supplierOriginTicketPrice"
              label="供应"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '票面价')
              "
            />
            <el-table-column
              align="center"
              width="70"
              prop="supplierOriginSoldPrice"
              label="供应"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '销售价')
              "
            />
            <el-table-column
              align="center"
              width="60"
              prop="supplierFlightTaxes|supplierFuelTaxes"
              label="机建"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '燃油')
              "
            >
              <template slot-scope="scope">
                <div>{{ scope.row.supplierFlightTaxes }}</div>
                {{ scope.row.supplierFuelTaxes }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="70"
              prop="supplierPlatformService"
              label="平台"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '服务费')
              "
            />
            <el-table-column
              align="center"
              width="70"
              prop="supplierSupplierService"
              label="供应商"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '服务费')
              "
            />
            <el-table-column
              align="center"
              width="60"
              prop="supplierMarkupAmount"
              label="加价"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '让利')
              "
            />
            <el-table-column
              align="center"
              width="70"
              prop="supplierTicketAmount"
              label="出票"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '票款总价')
              "
            />
            <el-table-column
              align="center"
              width="80"
              prop="supplierSettlementAmount"
              label="出票"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '结算总价')
              "
            >
              <template slot-scope="scope">
                <span class="red-text">{{
                  Number(scope.row.supplierSettlementAmount)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              prop="supplierRefundFeesAmount"
              label="退票"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(h, obj, '手续费')
              "
            >
              <template slot-scope="scope">
                <span class="red-text">{{
                  Number(scope.row.supplierRefundFeesAmount)
                }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <!-- v-if="detail.isSelfOperated === 0" -->
        <div align="center" class="mt-10">
          <el-button
            v-if="detail.orderStatus === 1"
            type="primary"
            plain
            size="small"
            :loading="successLoading"
            @click="refundTicket"
          >
            确认退票
          </el-button>
          <el-button
            v-if="detail.orderStatus === 3"
            type="success"
            plain
            size="small"
            :loading="successLoading"
            @click="refund"
          >
            确认完成
          </el-button>
        </div>
      </div>
    </div>

    <div class="custom-card">
      <div class="card-title">联系人信息</div>
      <div class="card-box" style="padding: 10px">
        <el-table
          :data="detail.orderContactBO"
          border
          style="width: 100%"
        >
          <el-table-column label="联系人" prop="contactName" />
          <el-table-column label="手机号" prop="contactPhone" />
          <el-table-column label="邮箱" prop="contactEmail" />
        </el-table>
      </div>
    </div>

    <div v-if="detail.isSelfOperated === 1" class="custom-card-red">
      <div class="card-title">
        自营机票采购单信息
        <div style="float: right">
          <el-button
            v-if="
              detail.refundTicketBOList.length !==
                selfOrderPassengers
            "
            class="el-button-red"
            plain
            size="mini"
            :loading="btnLoading"
            @click="createPurchaseOrder()"
          >创建采购单
          </el-button>
        </div>
      </div>
      <div class="card-box" style="padding: 10px">
        <div class="custom-box">
          <el-table
            :data="selfRefundTicketPurchaseOrderList"
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
                  <el-table-column
                    align="center"
                    prop=""
                    label="订单类型"
                  >
                    <template slot-scope="scope">
                      <span
                        :class="{
                          'red-text':
                            scope.row
                              .orderBusinessType !==
                            0,
                        }"
                      >{{
                        $t(
                          `AdminService["Enum:OrderBusinessType:${scope.row.orderBusinessType}"]`
                        )
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop=""
                    label="乘机人"
                  >
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.passengerBO.lastName +
                          scope.row.passengerBO.firstName
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="cabinCode"
                    label="票号"
                  >
                    <template slot-scope="scope">
                      <div
                        v-for="(
                          segItem, segIndex
                        ) in scope.row
                          .segmentPurchaseInfoList"
                        :key="
                          'carrierTicketNo' + segIndex
                        "
                      >
                        {{ segItem.carrierTicketNo }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="cabinCode"
                    label="舱位"
                  >
                    <template slot-scope="scope">
                      <div
                        v-for="(
                          segItem, segIndex
                        ) in scope.row
                          .segmentPurchaseInfoList"
                        :key="'cabinCode' + segIndex"
                      >
                        第{{ segIndex + 1 }}程：{{
                          segItem.cabinCode
                        }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="purchaseTicketPrice"
                    label="票面价"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.purchaseTicketPrice).toFixed(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="purchaseSoldPrice"
                    label="结算价"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.purchaseSoldPrice).toFixed(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="flightTax"
                    label="基建"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.flightTax).toFixed(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="fuelTax"
                    label="燃油"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.fuelTax).toFixed(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="rebate"
                    label="后返"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.fuelTax).toFixed(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="additionalAmount"
                    label="额外成本"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.additionalAmount).toFixed(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="purchasePaymentAmount"
                    label="出票实付金额"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.purchasePaymentAmount).toFixed(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="rebate"
                    label="改签费"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.rebate).toFixed(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="additionalAmount"
                    label="退票手续费"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.additionalAmount).toFixed(2) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="purchaseRefundAmount"
                    label="实退金额"
                  >
                    <template slot-scope="scope">
                      {{ Number(scope.row.purchaseRefundAmount).toFixed(2) }}
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              width="180"
              prop="issuePurchaseOrderNo"
              label="采购出票订单号"
              :render-header="
                (h, obj) =>
                  customLabelRenderHeader(
                    h,
                    obj,
                    '采购退票订单号'
                  )
              "
            >
              <template slot-scope="scope">
                <div>{{ scope.row.originPurchaseOrderNo }}</div>
                <div>{{ scope.row.refundPurchaseOrderNo }}</div>
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="isVolunteer"
              label="退票类型"
            >
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:RefundType:${scope.row.isVolunteer}"]`) }}
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="purchaseRefundStatus"
              label="订单状态"
            >
              <template v-if="scope.row.purchaseRefundStatus" slot-scope="scope">
                {{ $t(`AdminService["Enum:PurchaseRefundStatus:${scope.row.purchaseRefundStatus}"]`) }}
              </template>
            </el-table-column>
            <el-table-column
              width="90"
              prop="orderFlightType"
              label="航程类型"
            >
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:TripType:${scope.row.orderFlightType}"]`) }}
              </template>
            </el-table-column>
            <el-table-column
              width="90"
              prop="departureAirportCode"
              label="起飞到达"
            >
              <template slot-scope="scope">
                <div v-for="orderFlight in scope.row.orderFlightList" :key="'airport' + orderFlight.id">
                  <el-tooltip effect="light" placement="top-start">
                    <div slot="content">
                      第{{ orderFlight.segmentNumber + 1 }}程: {{ orderFlight.departureAirportName }}({{ orderFlight.departureAirportCode }}) -
                      {{ orderFlight.arrivalAirportName }}({{ orderFlight.arrivalAirportCode }})<br>
                    </div>
                    <div>
                      {{ orderFlight.departureAirportCode }} - {{ orderFlight.arrivalAirportCode }}
                    </div>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              prop="ticketChannel"
              label="出票渠道"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.ticketChannel != null">
                  {{ $t(`AdminService["Enum:TicketChannelType:${scope.row.ticketChannel}"]`) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="70"
              prop="adultBigPnr"
              label="大编码"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '小编码')"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.adultBigPnr }}</div>
                <div>{{ scope.row.adultSmallPnr }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="purchaseOrderAccount"
              label="下单账号"
            />
            <el-table-column
              prop="purchasePayPlatform"
              label="支付平台"
            >
              <template slot-scope="scope">
                <div
                  v-if="
                    scope.row.purchasePayPlatform !== null
                  "
                >
                  {{
                    $t(
                      `AdminService["Enum:PurchasePayPlatformType:${scope.row.purchasePayPlatform}"]`
                    )
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="purchasePayAccount"
              label="支付账号"
            />
            <el-table-column
              width="130"
              prop="purchasePayFlowNo"
              label="支付流水号"
            />
            <el-table-column
              prop="purchasePayStatus"
              label="支付状态"
            >
              <template slot-scope="scope">
                <div
                  v-if="scope.row.purchasePayStatus !== null"
                >
                  {{
                    $t(
                      `AdminService["Enum:PurchasePayStatusType:${scope.row.purchasePayStatus}"]`
                    )
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="purchaseRefundAmount"
              label="实退总金额"
            />
            <el-table-column width="170" prop="" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  plain
                  size="mini"
                  :loading="btnLoading"
                  @click="updatePurchaseOrder(scope.row)"
                >编辑</el-button>
                <el-button
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
        <div align="center" class="mt-10">
          <el-button
            v-if="
              selfRefundTicketPurchaseOrderList[0] && selfRefundTicketPurchaseOrderList[0].purchaseRefundStatus &&
                selfRefundTicketPurchaseOrderList[0].purchaseRefundStatus === 0
            "
            size="small"
            class="el-button-red"
            @click="completeSelfPurchaseOrder()"
          >退票完成</el-button>
          <el-button
            v-if="
              selfRefundTicketPurchaseOrderList[0] && selfRefundTicketPurchaseOrderList[0].purchaseRefundStatus &&
                selfRefundTicketPurchaseOrderList[0].purchaseRefundStatus === 2
            "
            size="small"
            type="success"
            plain
            @click="refundSuccessPurchaseOrder()"
          >退款完成</el-button>
        </div>
      </div>
    </div>

    <div v-if="purchaseInsuranceList.length > 0" class="custom-card-red">
      <div class="card-title">自营保险采购单退保信息</div>
      <div class="card-box" style="padding: 10px">
        <div class="custom-box">
          <el-table
            :data="purchaseInsuranceList"
            :header-row-class-name="'gray-row'"
            style="width: 100%"
          >
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
                {{ $t(`AdminService["Enum:PurchaseInsuranceStatus:${scope.row.purchaseInsuranceStatus}"]`) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              prop="insuranceType"
              label="保险类型"
            >
              <template slot-scope="{ row }">
                {{ $t(`AdminService["Enum:InsuranceType:${row.insuranceType}"]`) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="insuranceCompany"
              label="保险公司"
            />
            <el-table-column
              align="center"
              width="80"
              prop="effectiveDate"
              label="生效日期"
            >
              <template slot-scope="{ row }">
                <div v-if="row.effectiveDate">
                  {{ row.effectiveDate | dateYMD }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="purchasePayFlowNo"
              label="支付流水号"
            />
            <el-table-column prop="officeNo" label="乘机人">
              <template slot-scope="{ row }">
                <span>{{ row.passengerBO.lastName + row.passengerBO.firstName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="carrierTicketNo" label="航段" />
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
                  {{ (Number(row.purchasePrice) * Number(row.purchaseNumber)).toFixed(2) }}
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
            <el-table-column
              align="center"
              width="180"
              prop=""
              label="操作"
            >
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

    <div>
      <div class="custom-card">
        <div class="card-title">
          退票证明
          <el-button
            v-if="status === 1"
            type="primary"
            size="small"
            @click="upload"
          >
            {{ $t('table.upload') }}
          </el-button>
        </div>
        <div class="card-box" style="padding: 15px 10px">
          <el-table
            :data="detail.appendixList"
            border
            style="width: 100%"
          >
            <el-table-column label="上传时间" prop="createTime" />
            <el-table-column
              label="退票类型"
              prop="refundIsVolunteer"
            >
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:RefundType:${scope.row.refundIsVolunteer}"]`) }}
              </template>
            </el-table-column>
            <el-table-column
              label="退票原因"
              prop="refundTicketReason"
            >
              <template
                v-if="scope.row.refundTicketReason != null"
                slot-scope="scope"
              >
                {{ $t(`AdminService["Enum:RefundReasonType:${scope.row.refundTicketReason}"]`) }}
              </template>
            </el-table-column>
            <el-table-column label="历史附件信息" prop="appendix">
              <template slot-scope="scope">
                <div
                  v-if="scope.row.appendix != null && scope.row.appendix != undefined"
                  class="demo-image__preview"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.appendix"
                    :preview-src-list="srcList"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" />
          </el-table>
        </div>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">退款信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table
          :data="detail.refundRespList"
          border
          style="width: 100%"
        >
          <el-table-column
            label="业务类型"
            prop="businessType"
          >国内退票</el-table-column>
          <el-table-column
            label="实退金额"
            prop="refundAmount"
            class="el-link el-link--danger"
          />
          <el-table-column label="退款路径" prop="refundRoute">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:PayChannelType:${scope.row.payChannel}"]`) }}
            </template>
          </el-table-column>
          <el-table-column label="退款时间" prop="refundTime" />
          <el-table-column prop="refundStatus" label="退款状态">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:RefundStatus:${scope.row.refundStatus}"]`) }}
            </template>
          </el-table-column>
          <el-table-column prop="refundNo" label="退款流水号" />
        </el-table>
      </div>
    </div>

    <el-collapse class="custom-collapse">
      <el-collapse-item>
        <template
          slot="title"
        ><div class="card-title">机票退改规定</div></template>
        <div class="card-box" style="padding: 15px 10px">
          <el-table
            :data="detail.orderGuestRuleBOList"
            border
            style="width: 100%"
          >
            <el-table-column label="客票类型" prop="passengerType">
              <template slot-scope="scope">
                {{
                  $t(
                    `AdminService["Enum:PassengerType:${scope.row.passengerType}"]`
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column label="行程" prop="orderFlightBO">
              <template slot-scope="scope">
                {{
                  scope.row.orderFlightBO.departureCityNameCn
                }}({{
                  scope.row.orderFlightBO
                    .departureAirportCode
                }}) -
                {{
                  scope.row.orderFlightBO.arrivalCityNameCn
                }}({{
                  scope.row.orderFlightBO.arrivalAirportCode
                }})
              </template>
            </el-table-column>
            <el-table-column
              label="自愿退票规定"
              prop="refundPriceRuleList"
            >
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row
                    .refundPriceRuleList"
                  :key="index"
                >
                  航班预计离站时间前{{
                    item.beforeMinDistanceHours
                  }}小时（含）前,费率:
                  {{ item.feesRate * 100 }}%
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="自愿改期规定"
              prop="changePriceRuleList"
            >
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row
                    .changePriceRuleList"
                  :key="index"
                >
                  航班预计离站时间前{{
                    item.beforeMinDistanceHours
                  }}小时（含）前,费率:
                  {{ item.feesRate * 100 }}%
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="退改说明"
              prop="refundChangeContent"
            />
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
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
    <businessLog
      :is="'businessLog'"
      v-if="detail && detail.id"
      :id="detail.id"
      :model-name="'分销管理'"
      :data-type="2"
    />

    <AppendixUpload ref="dialog" @handleFilter="handleFilter" />
    <RefundSendMessage ref="sendMessageDialog" />
    <CreateUpdatePurchaseOrder
      ref="createUpdatePurchaseOrderDialog"
      @handleFilter="handleFilter"
    />
    <CreateUpdatePurchaseInsurance
      ref="createUpdatePurInsuranceDialog"
      @handleFilter="handleFilter"
    />
    <EditAgentOrder
      ref="editAgentOrderDialog"
      @handleFilter="handleFilter"
    />
    <el-dialog
      width="90%"
      top="3vh"
      :visible.sync="issueDetailVisible"
      append-to-body
    >
      <IssueDetail v-if="detail.originIssueOrderNo" ref="issueDetailDialog" />
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="info" @click="issueDetailVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="90%"
      top="3vh"
      :visible.sync="changeDetailVisible"
      append-to-body
    >
      <ChangeDetail v-if="detail.originIssueOrderNo" ref="changeDetailDialog" />
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="info" @click="changeDetailVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import RouterBack from '@/components/RouterBack/index.vue'
import BusinessLog from '@/components/BussinessLog/index.vue'
import RefundSendMessage from './send-message.vue'
import CreateUpdatePurchaseOrder from './components/create-update-purchase-order.vue'
import CreateUpdatePurchaseInsurance from './components/create-update-purchase-insurance.vue'
import {
    refundOrderAudit,
    refundOrderDetail,
    refundOrderRefusal,
    confirmRefundTicket,
    confirmRefundAmount,
    updateRefundFees,
    getRefundTicketSelfPurchaseOrderList,
    deleteRefundPurchaseOrder,
    completeRefundPurchaseOrder,
    refundSuccessPurchase
} from '@/api/agent/refund-order'
import AppendixUpload from './appendix-upload'
import { getPurchaseOrderInsurance } from '@/api/agent/order-insurance'
import EditAgentOrder from './edit-agent-order.vue'
import IssueDetail from '../issue/detail.vue'
import ChangeDetail from '../change/detail.vue'

export default {
    name: 'RefundDetail',
    components: {
        RouterBack,
        BusinessLog,
        RefundSendMessage,
        CreateUpdatePurchaseOrder,
        CreateUpdatePurchaseInsurance,
        AppendixUpload,
        EditAgentOrder,
        IssueDetail,
        ChangeDetail
    },
    data() {
        return {
            activities: [],
            activity: {
                content: '',
                timestamp: ''
            },
            // 修改手续费
            refundFeesAmount: null,
            refundAmount: null,
            refundFeesLoading: false,
            status: 0,
            detail: {},
            selfRefundTicketPurchaseOrderList: [],
            selfOrderPassengers: 0,
            purchaseInsuranceList: [],
            refundConfirm: {},
            srcList: [],
            successLoading: false,
            btnLoading: false,
            issueDetailVisible: false,
            changeDetailVisible: false
        }
    },
    created() {
        this.getDetail()
    },
    mounted() {},
    methods: {
        getDetail() {
            const orderNo = this.$route.query.id
            this.status = parseInt(this.$route.query.status)
            refundOrderDetail(orderNo, this.status).then((response) => {
                if (response.status === '200') {
                    // 赋值
                    this.detail = response.data
                    // 图片预览地址
                    this.srcList = response.data.appendixList.map(function(
                        item
                    ) {
                        return item.appendix
                    })
                    this.getSelfPurchaseOrderList(orderNo)
                    this.getPurchaseOrderInsuranceList(orderNo)
                }
            })
        },
        // 自营采购订单列表获取
        getSelfPurchaseOrderList(orderNo) {
            getRefundTicketSelfPurchaseOrderList(orderNo)
                .then((response) => {
                    this.selfRefundTicketPurchaseOrderList = []
                    if (response.status === '200') {
                        this.selfRefundTicketPurchaseOrderList = response.data
                        this.selfOrderPassengers =
                            this.selfRefundTicketPurchaseOrderList.length
                    }
                    let count = 0
                    response.data.forEach((item) => {
                        count += item.purchaseTicketList.length
                    })
                    this.selfOrderPassengers = count
                })
                .catch((err) => {
                    this.$message.error(err)
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
            // 列表数据
            const { columns, data } = param
            const sumColumnProperty = [
                // 'originTicketPrice',
                // 'soldTicketPrice',
                // 'flightTax|fuelTax',
                // 'insuranceNum',
                // 'insuranceAmount',
                // 'serviceFeesAmount',
                // 'markupAmount',
                // 'paymentAmount',
                'feesAmount',
                'refundAmount',
                'supplierOriginTicketPrice',
                'supplierOriginSoldPrice',
                'supplierFlightTaxes|supplierFuelTaxes',
                'supplierPlatformService',
                'supplierSupplierService',
                'supplierMarkupAmount',
                'supplierTicketAmount',
                'supplierSettlementAmount',
                'supplierRefundFeesAmount'
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
            // 得到返回值
            return sums
        },
        audit() {
            this.$confirm('确定要进行退票审核通过吗？', '退票审核', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
                .then(() => {
                    refundOrderAudit(this.detail.ticketRefundOrderNo).then(
                        (response) => {
                            if (response.status === '200') {
                                this.$message({
                                    type: 'success',
                                    message: '审核成功'
                                })
                                // 在查询一次页面
                                this.getDetail()
                            }
                        }
                    )
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消'
                    })
                })
        },
        reject() {
            this.$confirm('确定要进行拒绝吗？', '拒绝', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
                .then(() => {
                    refundOrderRefusal(this.detail.ticketRefundOrderNo).then(
                        (response) => {
                            if (response.status === '200') {
                                this.$message({
                                    type: 'success',
                                    message: '已拒绝'
                                })
                                this.getDetail()
                            }
                        }
                    )
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消'
                    })
                })
        },
        refundTicket() {
            this.$confirm('确定要进行退票处理吗？', '确认退票', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
                .then(() => {
                    this.successLoading = true
                    confirmRefundTicket(this.detail.ticketRefundOrderNo).then(
                        (response) => {
                            if (response.status === '200') {
                                this.$message({
                                    type: 'success',
                                    message: '已完成'
                                })
                                this.successLoading = false
                                this.getDetail()
                            }
                        }
                    )
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消'
                    })
                })
        },
        refund() {
            this.$confirm(
                '确定要进行退款处理吗 (请确认已经退票完成!)？',
                '确认退款金额',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }
            )
                .then(() => {
                    this.successLoading = true
                    confirmRefundAmount(this.detail.ticketRefundOrderNo).then(
                        (response) => {
                            if (response.status === '200') {
                                this.$message({
                                    type: 'success',
                                    message: '已完成'
                                })
                                this.successLoading = false
                                this.getDetail()
                            }
                        }
                    )
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消'
                    })
                })
        },
        // 修改手续费
        changeRefundFeesConfirm(data, filed) {
            if (
                filed === 'refundFeesAmount' &&
                this.refundFeesAmount === null
            ) {
                this.$message({
                    type: 'error',
                    message: '请填写金额'
                })
                return
            }
            if (filed === 'refundAmount' && this.refundAmount === null) {
                this.$message({
                    type: 'error',
                    message: '请填写金额'
                })
                return
            }
            this.refundFeesLoading = true
            updateRefundFees({
                orderNo: this.detail.ticketRefundOrderNo,
                passengerId: data.passengerId,
                orderFlightId: data.orderFlightBO.id,
                feesAmount: this.refundFeesAmount,
                refundAmount: this.refundAmount
            }).then((response) => {
                if (response.status === '200') {
                    this.$message({
                        type: 'success',
                        message: '已完成'
                    })
                    this.refundFeesLoading = false
                    this.getDetail()
                }
            })
        },
        upload(row) {
            // 提交信息
            this.$refs['dialog'].detail(this.detail.ticketRefundOrderNo)
        },
        handleFilter() {
            this.getDetail()
        },
        refundNotify() {
            this.$refs['sendMessageDialog'].handleOpen(this.detail)
        },
        createPurchaseOrder() {
            this.$refs['createUpdatePurchaseOrderDialog'].handleCreate(
                this.detail,
                this.selfRefundTicketPurchaseOrderList
            )
        },
        // 更新采购单
        updatePurchaseOrder(row) {
            this.$refs['createUpdatePurchaseOrderDialog'].handleUpdate(row)
        },
        // 删除自营采购单
        deletePurchaseOrder(row) {
            this.btnLoading = true
            this.$confirm(
                '确定需要删除该自营采购订单么？',
                '删除自营采购订单',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }
            )
                .then(() => {
                    this.btnLoading = false
                    deleteRefundPurchaseOrder(row.id)
                        .then((response) => {
                            if (response.status === '200') {
                                this.getDetail()
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
        // 退票完成
        completeSelfPurchaseOrder() {
            this.btnLoading = true
            this.$confirm('确定退票完成？', '退票完成', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.btnLoading = false
                completeRefundPurchaseOrder(this.detail.ticketRefundOrderNo)
                    .then((response) => {
                        if (response.status === '200') {
                            this.getDetail()
                            this.$message({
                                type: 'success',
                                message: '订单退票成功!'
                            })
                        }
                    })
                    .catch(() => {
                        this.btnLoading = false
                        this.$message({
                            type: 'info',
                            message: '退票完成操作取消'
                        })
                    })
            })
        },
        // 退款完成
        refundSuccessPurchaseOrder() {
            this.btnLoading = true
            this.$confirm('确定要执行退款完成操作？', '退款完成', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.btnLoading = false
                refundSuccessPurchase(this.detail.ticketRefundOrderNo)
                    .then((response) => {
                        if (response.status === '200') {
                            this.getDetail()
                            this.$message({
                                type: 'success',
                                message: '退款完成成功!'
                            })
                        }
                    })
                    .catch(() => {
                        this.btnLoading = false
                        this.$message({
                            type: 'info',
                            message: '退款完成操作取消'
                        })
                    })
            })
        },
        // 获取自营保险
        getPurchaseOrderInsuranceList(orderNo) {
            getPurchaseOrderInsurance(orderNo, 2)
                .then((response) => {
                    this.purchaseInsuranceList = []
                    if (response.status === '200') {
                        this.purchaseInsuranceList = response.data
                    }
                })
                .catch((err) => {
                    this.$message.error(err)
                })
        },
        // 更新自营保险单
        updatePurchaseInsuranceOrder(row) {
            this.$refs['createUpdatePurInsuranceDialog'].handleUpdate(row)
        },
        orderEdit(row) {
            // row.showEdit = true
            this.$refs['editAgentOrderDialog'].handleUpdate(
                row,
                this.detail.ticketRefundOrderNo
            )
        },
        issueDetail() {
          this.issueDetailVisible = true
          this.$nextTick(() => {
            this.$refs['issueDetailDialog'].handleOpen({ ticketIssueOrderNo: this.detail.originIssueOrderNo, status: 0 })
          })
        },
        changeDetail() {
          // const { href } = this.$router.resolve({
          //   path: '/distribution/change-detail',
          //   query: {
          //     id: orderNo,
          //     status: 0
          //   }
          // })
          // window.open(href, '_blank')
          this.changeDetailVisible = true
          this.$nextTick(() => {
            this.$refs['changeDetailDialog'].handleOpen({ changeOrderNo: this.detail.originChangeOrderNo, status: 0 })
          })
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
<style lang="scss">
.refund-ticket-table .el-table__footer-wrapper tbody tr td {
    &:nth-child(1),
    &:nth-child(18),
    &:nth-child(19),
    &:nth-child(26),
    &:nth-child(27) {
        color: #f56c6b !important;
    }
}

.new-ticket-table .el-table__footer-wrapper tbody tr td {
    &:nth-child(1),
    &:nth-child(11),
    &:nth-child(12) {
        color: #f56c6b !important;
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
</style>
