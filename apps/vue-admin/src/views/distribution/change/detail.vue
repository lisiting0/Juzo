<template>
  <div class="app-container">
    <div class="custom-card">
      <div class="card-title">订单信息</div>
      <div class="card-box padding-2">
        <el-row>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">改签订单号：</label>
              <div class="card-item-content">
                {{ detail.changeOrderNo }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">原出票订单号：</label>
              <div class="card-item-content">
                <el-link :underline="false" type="primary" @click="issueDetail">{{ detail.issueOrderNo }}</el-link>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">订单状态：</label>
              <div class="card-item-content">
                <span class="status-text">
                  {{ $t(`AdminService["Enum:ChangeOrderStatus:${detail.orderStatus}"]`) }}
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">采购订单状态：</label>
              <div class="card-item-content">
                <span class="status-text">
                  {{ $t(`AdminService["Enum:ChangeOrderStatus:${detail.orderStatus}"]`) }}
                </span>
              </div>
            </div>
          </el-col>
          <el-col v-if="status === 1" :span="8">
            <div class="card-item" style="float: right; margin-right: 10px;">
              <el-button v-if="detail.orderStatus == 4" size="small" type="primary" @click="changeNotify">
                发送通知
              </el-button>
              <el-button
                v-if="detail.orderStatus == 0"
                size="small"
                type="primary"
                @click="audit"
              >
                改签确认
              </el-button>
              <el-button
                v-if="detail.orderStatus in [0,1,2,3]"
                size="small"
                type="danger"
                @click="reject"
              >
                拒绝改签
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
              <label class="card-item-title">申请时间：</label>
              <div class="card-item-content">
                {{ detail.createTime }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">改签完成时间：</label>
              <div class="card-item-content">
                {{ detail.successTime }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">成人PNR:</label>
              <div class="card-item-content">
                <span class="font-red">原:{{ detail.issueAdultBigPnr }}|{{ detail.issueAdultSmallPnr }}</span><br><span>现:{{ detail.adultBigPnr }}|{{ detail.adultSmallPnr }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">儿童PNR：</label>
              <div class="card-item-content">
                <span class="font-red">原:{{ detail.issueChildBigPnr }}|{{ detail.issueChildSmallPnr }}</span><br><span>现:{{ detail.childBigPnr }}|{{ detail.childSmallPnr }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">部门：</label>
              <div class="card-item-content">
                {{ detail.agentDepartmentName }}
              </div>
            </div>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">客户名称：</label>
              <div class="card-item-content">
                {{ detail.agentOrganizationName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">改签类型：</label>
              <div class="card-item-content">
                {{ $t(`AdminService["Enum:ChangeOrderType:${detail.changeTicketReason}"]`) }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">供应商：</label>
              <div class="card-item-content">
                九州自营店铺
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">创建人：</label>
              <div class="card-item-content">
                <span v-if="detail.changeSuccessRefundType">
                  {{ detail.ticketPersonName }}
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="card-item">
              <label class="card-item-title">改签员：</label>
              <div class="card-item-content">
                {{ detail.ticketPersonName }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title" align="center" style="letter-spacing: 6px;">原客票信息</div>
      <div class="card-box" style="padding: 10px">
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
            label="出发地"
            prop="departureCity"
          >
            <template slot-scope="scope">
              {{ scope.row.departureAirportName }}({{ scope.row.departureAirportCode }})
            </template>
          </el-table-column>
          <el-table-column
            align="center"
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
          />
          <el-table-column
            width="135"
            align="center"
            prop="departureTime"
            label="起飞时间"
          />
          <el-table-column
            width="135"
            align="center"
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
          :header-cell-style="customHeaderStyle"
          :data="detail.originOrderPassengerBOList"
          show-summary
          :summary-method="getSummaries"
          class="origin-ticket-table"
          style="width: 100%"
        >
          <el-table-column
            label=""
          >
            <el-table-column
              align="center"
              width="80"
              label="乘客类型"
              prop="passengerType"
            >
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="200"
              label="姓名"
              prop="firstName"
            >
              <template slot-scope="scope">
                {{ scope.row.lastName }}{{ scope.row.firstName }}
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
              width="130"
              label="证件号"
              prop="cardNum"
            />
            <el-table-column
              width="90"
              prop="birthday"
              label="出生日期"
            />
            <el-table-column
              width="100"
              prop="phone"
              label="手机号"
            />
            <el-table-column
              width="50"
              prop="gender"
              label="性别"
            >
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:GenderType:${scope.row.gender}"]`) }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="客户价格信息"
            style="background-color: red; color: #fff;"
          >
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
              width="60"
              prop="keepAmount"
              label="政策"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '留钱')"
            />
            <el-table-column
              align="center"
              width="60"
              prop="rebate"
              label="政策"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '返点')"
            />
            <el-table-column
              align="center"
              width="60"
              prop="flightTax|fuelTax"
              label="机建"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '燃油')"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.flightTax === undefined ? scope.row.changeFlightTax : scope.row.flightTax }}</div>
                {{ scope.row.fuelTax === undefined ? scope.row.changeFuelTax : scope.row.fuelTax }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="60"
              prop="insuranceNum"
              label="保险"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '份数')"
            />
            <el-table-column
              align="center"
              width="60"
              prop="insuranceAmount"
              label="保险"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '金额')"
            />
            <el-table-column
              align="center"
              width="70"
              prop="serviceFeesAmount"
              label="销售"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '服务费')"
            />
            <el-table-column
              align="center"
              width="60"
              prop="markupAmount"
              label="加价"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '让利')"
            />
            <el-table-column
              align="center"
              width="60"
              prop="soldTicketPrice|flightTax|fuelTax|serviceFeesAmount|markupAmount"
              label="应收"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '金额')"
            >
              <template slot-scope="scope">
                {{ Number(scope.row.soldTicketPrice) + Number(scope.row.flightTax) + Number(scope.row.fuelTax) +
                  Number(scope.row.serviceFeesAmount) + Number(scope.row.markupAmount) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              prop="soldTicketPrice|flightTax|fuelTax|serviceFeesAmount|markupAmount"
              label="机票总价"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '(不含保险)')"
            >
              <template slot-scope="scope">
                <span class="red-text">
                  {{ Number(scope.row.soldTicketPrice) + Number(scope.row.flightTax) + Number(scope.row.fuelTax) +
                    Number(scope.row.serviceFeesAmount) + Number(scope.row.markupAmount) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              prop="soldTicketPrice|flightTax|fuelTax|serviceFeesAmount|markupAmount|insuranceAmount"
              label="应收总价"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '(含保险)')"
            >
              <template slot-scope="scope">
                <span class="red-text">
                  {{ Number(scope.row.soldTicketPrice) + Number(scope.row.flightTax) + Number(scope.row.fuelTax) +
                    Number(scope.row.serviceFeesAmount) + Number(scope.row.markupAmount) + Number(scope.row.insuranceAmount) }}
                </span>
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
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '票面价')"
            />
            <el-table-column
              align="center"
              width="70"
              prop="supplierOriginSoldPrice"
              label="供应"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '销售价')"
            />
            <el-table-column
              align="center"
              width="60"
              prop="supplierKeepAmount"
              label="留钱"
            />
            <el-table-column
              align="center"
              width="60"
              prop="supplierRebate"
              label="返点"
            />
            <el-table-column
              align="center"
              width="70"
              prop="supplierPlatformService"
              label="平台"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '服务费')"
            />
            <el-table-column
              align="center"
              width="70"
              prop="supplierSupplierService"
              label="供应商"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '服务费')"
            />
            <el-table-column
              align="center"
              width="60"
              prop="supplierMarkupAmount"
              label="加价"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '让利')"
            />
            <el-table-column
              align="center"
              width="70"
              prop="supplierTicketAmount"
              label="应付"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '票款')"
            />
            <el-table-column
              align="center"
              width="80"
              prop="supplierMarkupAmount"
              label="票款总价"
            >
              <template slot-scope="scope">
                <span class="red-text">{{ Number(scope.row.supplierMarkupAmount) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="80"
              prop="supplierSettlementAmount"
              label="结算总价"
            >
              <template slot-scope="scope">
                <span class="red-text">{{ Number(scope.row.supplierSettlementAmount) }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="280"
            label=""
          >
            <el-table-column
              fixed="right"
              width="180"
              align="center"
              label="原票号"
              prop="carrierTicketNo"
            />
            <el-table-column
              fixed="right"
              width="100"
              align="center"
              label="出票渠道"
              prop="ticketChannel"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.ticketChannel">{{ $t(`AdminService["Enum:TicketChannelType:${scope.row.ticketChannel}"]`) }}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="custom-card">
      <div class="card-title">联系人信息</div>
      <div class="card-box" style="padding: 10px">
        <el-table :data="detail.orderContactBO" border style="width: 100%">
          <el-table-column label="联系人" prop="contactName" />
          <el-table-column label="手机号" prop="contactPhone" />
          <el-table-column label="邮箱" prop="contactEmail" />
        </el-table>
      </div>
    </div>

    <div class="custom-card">
      <div class="card-title" align="center" style="background-color: #3988e5; color: #fff; letter-spacing: 6px;">新客票信息</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table
          :data="detail.changeOrderFlightBOList"
          border
          :row-class-name="'success-row'"
          style="width: 98%"
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
            label="出发地"
            prop="departureCity"
          >
            <template slot-scope="scope">
              {{ scope.row.departureAirportName }}({{ scope.row.departureAirportCode }})
            </template>
          </el-table-column>
          <el-table-column
            align="center"
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
              {{ scope.row.carrierNumber }}{{ scope.row.flightNumber }}
            </template>
          </el-table-column>
          <el-table-column
            width="135"
            align="center"
            prop="departureTime"
            label="起飞时间"
          />
          <el-table-column
            width="135"
            align="center"
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
          :header-cell-style="customHeaderStyle"
          :data="detail.changeOrderPassengerBOList"
          show-summary
          :summary-method="getSummariesByNewTicketTable"
          class="new-ticket-table"
          style="width: 100%"
        >

          <el-table-column width="80" label="操作" fixed="left">
            <template slot-scope="scope">
              <el-button
                v-show="detail.orderStatus in [0,1]"
                type="primary"
                size="mini"
                @click="orderEdit(scope.row)"
              >编辑
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            label=""
          >
            <el-table-column
              align="center"
              width="80"
              label="乘客类型"
              prop="passengerType"
            >
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
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
              label="证件类型"
              prop="cardType"
            >
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:IdentityCardType:${scope.row.cardType}"]`) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="证件号"
              prop="cardNum"
              width="110"
            />
          </el-table-column>
          <el-table-column
            align="center"
            label="客户价格信息"
            style="background-color: red; color: #fff;"
          >
            <el-table-column
              align="center"
              width="70"
              prop="changeTicketPrice"
              label="票面价"
            />
            <el-table-column
              align="center"
              width="70"
              prop="changeSoldTicketPrice"
              label="销售价"
            />
            <el-table-column
              align="center"
              prop="changeFlightTax|changeFuelTax"
              label="机建"
              width="60"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '燃油')"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.changeFlightTax }}</div>
                {{ scope.row.changeFuelTax }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="priceDifference"
              label="升舱费"
              width="70"
            />
            <el-table-column
              align="center"
              prop="feesAmount"
              label="改签费"
              width="70"
            />
            <el-table-column
              align="center"
              prop="serviceFeesAmount"
              label="服务费"
              width="70"
            />
            <el-table-column
              align="center"
              prop="markupAmount"
              label="加价/让利"
              width="80"
            />
            <el-table-column
              align="center"
              prop="changeSoldTicketPrice|changeFlightTax|changeFuelTax|feesAmount|serviceFeesAmount"
              label="应收金额"
              width="80"
            >
              <template slot-scope="scope">
                <span class="red-text">{{ Number(scope.row.changeSoldTicketPrice) + Number(scope.row.changeFlightTax) + Number(scope.row.changeFuelTax) + Number(scope.row.feesAmount) + Number(scope.row.serviceFeesAmount) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="changeSoldTicketPrice|changeFlightTax|changeFuelTax|feesAmount|serviceFeesAmount"
              label="应收总价"
              width="80"
            >
              <template slot-scope="scope">
                <span class="red-text">{{ Number(scope.row.changeSoldTicketPrice) + Number(scope.row.changeFlightTax) + Number(scope.row.changeFuelTax) + Number(scope.row.feesAmount) + Number(scope.row.serviceFeesAmount) }}</span>
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
              prop="supplierPriceDifference"
              label="供应"
              width="70"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '升舱费')"
            />
            <el-table-column
              align="center"
              prop="supplierFeesAmount"
              label="供应"
              width="70"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '改签费')"
            />
            <el-table-column
              align="center"
              prop="supplierSupplierService"
              label="供应"
              width="70"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '服务费')"
            />
            <el-table-column
              align="center"
              prop="supplierPriceDifference|supplierFeesAmount|supplierSupplierService"
              label="应付金额"
              width="80"
            >
              <template slot-scope="scope">
                {{ Number(scope.row.supplierPriceDifference) + Number(scope.row.supplierFeesAmount) + Number(scope.row.supplierSupplierService) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="supplierPriceDifference|supplierSupplierService|supplierFeesAmount"
              label="结算总价"
              width="80"
            >
              <template slot-scope="scope">
                {{ Number(scope.row.supplierPriceDifference) + Number(scope.row.supplierFeesAmount) + Number(scope.row.supplierSupplierService) }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="180"
            label=""
          >
            <el-table-column
              fixed="right"
              width="180"
              align="center"
              label="新票号"
              prop="carrierTicketNo"
            />
          </el-table-column>
        </el-table>
        <div v-if="detail.changeSuccessRefundType" align="right" style="font-size: 14px; color: #3988e5; font-weight: bold; margin-top: 10px;">改签后退款方式：{{ $t(`AdminService["Enum:ChangeSuccessRefundType:${detail.changeSuccessRefundType}"]`) }}</div>
      </div>
    </div>

    <div v-if="detail.isSelfOperated === 1" class="custom-card-red">
      <div class="card-title">自营机票采购单改签信息
        <div style="float:right;">
          <el-button
            v-if="detail.originOrderPassengerBOList.length !== selfOrderPassengers"
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
            :data="selfChangeTicketPurchaseOrderList"
            :header-row-class-name="'gray-row'"
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="{row}">
                <el-table
                  border
                  :data="row.purchaseTicketList"
                  :header-row-class-name="'gray-row'"
                  style="width: 100%"
                >
                  <el-table-column
                    align="center"
                    prop=""
                    label="乘机人"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.passengerBO.lastName + scope.row.passengerBO.firstName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="passengerType"
                    label="乘客类型"
                  >
                    <template slot-scope="scope">
                      {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerBO.passengerType}"]`) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="originCabinCode"
                    label="原舱位"
                  >
                    <template slot-scope="scope">
                      <div v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList" :key="'originCabinCode'+ segIndex">
                        第{{ segIndex+1 }}程：{{ segItem.originCabinCode }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="changeCabinCode"
                    label="新舱位"
                  >
                    <template slot-scope="scope">
                      <div v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList" :key="'changeCabinCode'+ segIndex">
                        第{{ segIndex+1 }}程：{{ segItem.changeCabinCode }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="priceDifference"
                    label="升舱费"
                  />
                  <el-table-column
                    align="center"
                    prop="feesAmount"
                    label="改签费"
                  />
                  <el-table-column
                    prop="serviceAmount"
                    label="服务费"
                  />
                  <el-table-column
                    align="center"
                    prop="originCarrierTicketNo"
                    label="原票号"
                  >
                    <template slot-scope="scope">
                      <div v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList" :key="'originCarrierTicketNo'+ segIndex">
                        {{ segItem.originCarrierTicketNo }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="changeCarrierTicketNo"
                    label="新票号"
                  >
                    <template slot-scope="scope">
                      <div v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList" :key="'changeCarrierTicketNo'+ segIndex">
                        {{ segItem.changeCarrierTicketNo }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="paymentAmount"
                    label="支付总价"
                  />
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              width="180"
              prop="issuePurchaseOrderNo"
              label="采购出票订单号"
              :render-header="(h, obj) => customLabelRenderHeader(h, obj, '采购改签订单号')"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.issuePurchaseOrderNo }}</div>
                <div>{{ scope.row.changePurchaseOrderNo }}</div>
              </template>
            </el-table-column>
            <el-table-column
              width="80"
              prop="purchaseOrderStatus"
              label="订单状态"
            >
              <template v-if="scope.row.purchaseOrderStatus !== null" slot-scope="scope">
                {{ $t(`AdminService["Enum:PurchaseOrderStatusType:${scope.row.purchaseOrderStatus}"]`) }}
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
                <div v-for=" (orderFlight) in scope.row.orderFlightList" :key="orderFlight.id">
                  <el-tooltip effect="light" placement="top-start">
                    <div slot="content">
                      第{{ orderFlight.segmentNumber + 1 }}程: {{ orderFlight.departureAirportName }}({{ orderFlight.departureAirportCode }}) - {{ orderFlight.arrivalAirportName }}({{ orderFlight.arrivalAirportCode }})<br>
                    </div>
                    <div>{{ orderFlight.departureAirportCode }} - {{ orderFlight.arrivalAirportCode }}</div>
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
                <div v-if="scope.row.ticketChannel !== null">{{ $t(`AdminService["Enum:TicketChannelType:${scope.row.ticketChannel}"]`) }}</div>
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
              prop="officeNo"
              label="下单账号"
            />
            <el-table-column
              prop="purchasePayPlatform"
              label="支付平台"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.purchasePayPlatform !== null">{{ $t(`AdminService["Enum:PurchasePayPlatformType:${scope.row.purchasePayPlatform}"]`) }}</div>
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
              <template slot-scope="{row}">
                <div v-if="row.purchasePayStatus !== null">{{ $t(`AdminService["Enum:PurchasePayStatusType:${row.purchasePayStatus}"]`) }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="purchasePayAmount"
              label="支付总金额"
            />
            <el-table-column
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
      </div>
    </div>
    <div align="center">
      <div style="width: 33%;display: flex;">
        <span class="change-refund-method-title">改签后退款方式：</span>
        <el-select
          v-model="detail.changeSuccessRefundType"
          filterable
          clearable
          placeholder="请选择改签后退款方式"
          style="width: 200px;margin: 0 10px;"
        >
          <el-option
            v-for="item in changeSuccessRefundTypeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button size="small" class="el-button-red" @click="completeChangeOrder()">改签完成</el-button>
      </div>
    </div>

    <div v-if="insuranceFormData.originInsuranceList.length > 0" class="custom-card-red">
      <div class="card-title">自营保险采购单退保信息</div>
      <div class="card-box" style="padding: 10px">
        <div class="custom-box">
          <el-form
            ref="originInsuranceFormRef"
            :model="insuranceFormData"
            :rules="originInsuranceFormRules"
          >
            <el-table
              :data="insuranceFormData.originInsuranceList"
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
                  <div v-if="!scope.row.isEdit">{{ $t(`AdminService["Enum:PurchaseInsuranceStatus:${scope.row.purchaseInsuranceStatus}"]`) }}</div>
                  <el-form-item
                    v-else
                    :prop="`originInsuranceList[${scope.$index}].purchaseInsuranceStatus`"
                    style="margin-bottom: 0;"
                  >
                    <el-select
                      v-model="scope.row.purchaseInsuranceStatus"
                      placeholder="订单状态"
                    >
                      <el-option
                        v-for="option in statusOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="80"
                prop="insuranceType"
                label="保险类型"
              >
                <template slot-scope="{row}">
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
                width="90"
                prop="effectiveDate"
                label="生效日期"
              >
                <template slot-scope="{row}">
                  <div v-if="row.effectiveDate">{{ row.effectiveDate | dateYMD }}</div>
                </template>
              </el-table-column>
              <el-table-column
                prop="purchasePayFlowNo"
                label="支付流水号"
              />
              <el-table-column
                prop="officeNo"
                label="乘机人"
              >
                <template slot-scope="{row}">
                  <span>{{ row.passengerBO.lastName + row.passengerBO.firstName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="carrierTicketNo"
                label="航段"
              />
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
                <template slot-scope="{row}">
                  <div>{{ (Number(row.purchasePrice) * Number(row.purchaseNumber)).toFixed(2) }}</div>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                width="100"
                prop="purchaseRefundAmount"
                label="退保金额"
              >
                <template slot-scope="scope">
                  <div v-if="!scope.row.isEdit">{{ Number(scope.row.purchaseRefundAmount).toFixed(2) }}</div>
                  <div v-else>
                    <el-form-item
                      :prop="`originInsuranceList[${scope.$index}].purchaseRefundAmount`"
                      :rules="originInsuranceFormRules.purchaseRefundAmount"
                      style="margin-bottom: 0"
                    >
                      <el-input
                        v-model.number="scope.row.purchaseRefundAmount"
                        :min="1"
                        clearable
                        placeholder="退保金额"
                        class="w-80"
                      />
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="detail.insuranceDockingType === 0"
                align="center"
                width="180"
                prop=""
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button
                    v-show="!scope.row.isEdit"
                    type="primary"
                    plain
                    size="mini"
                    @click="scope.row.isEdit = true"
                  >编辑
                  </el-button>
                  <el-button
                    v-show="scope.row.isEdit"
                    type="warning"
                    plain
                    size="mini"
                    @click="scope.row.isEdit = false"
                  >取消
                  </el-button>
                  <el-button
                    v-show="scope.row.isEdit"
                    type="success"
                    plain
                    size="mini"
                    :loading="btnLoading"
                    @click="savePurchaseInsurance(scope.row)"
                  >保存
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </div>
    </div>

    <div v-if="purchaseInsuranceList.length > 0" class="custom-card-red">
      <div class="card-title">自营保险采购单信息</div>
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
              <template slot-scope="{row}">
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
              <template slot-scope="{row}">
                <div v-if="row.effectiveDate">{{ row.effectiveDate | dateYMD }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="purchasePayFlowNo"
              label="支付流水号"
            />
            <el-table-column
              prop="officeNo"
              label="乘机人"
            >
              <template slot-scope="{row}">
                <span>{{ row.passengerBO.lastName + row.passengerBO.firstName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="carrierTicketNo"
              label="航段"
            />
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
              <template slot-scope="{row}">
                <div>{{ (Number(row.purchasePrice) * Number(row.purchaseNumber)).toFixed(2) }}</div>
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
              <template slot-scope="{row}">
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

    <!-- 添加一个判断条件， 可以改签的状态才出现 -->
    <!-- <div v-if="detail.orderStatus in [0,1,2,3]" class="custom-card">
      <div class="card-title success-bg">票号回填</div>
      <div class="card-box" style="padding: 15px 10px">
        <el-table :data="detail.ticketSuccessBOList" border style="width: 100%">
          <el-table-column
            label="乘机人"
            prop="firstName"
          >
            <template slot-scope="scope">
              {{ scope.row.lastName }}{{ scope.row.firstName }}
            </template>
          </el-table-column>
          <el-table-column
            label="证件号"
            prop="cardNum"
          />
          <el-table-column
            label="原票号"
            prop="oldCarrierTicketNo"
          />
          <el-table-column prop="clearable" label="票号">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.carrierTicketNo"
                clearable
                placeholder="票号"
              />
            </template>
          </el-table-column>
        </el-table>
        <div align="center" class="mt-15">
          <div class="card-item" style="justify-content: center">
            <div class="card-item-content">
              <div class="div-flex">
                <label class="card-item-title" style="line-height: 30px;">退款方式</label>
                <el-select v-model="detail.changeSuccessRefundType" filterable clearable placeholder="请选择改签后退款方式">
                  <el-option v-for="item in changeSuccessRefundTypeOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-button
                  type="success"
                  size="small"
                  class="ml-10"
                  @click="changeSuccess"
                >
                  确认改签完成
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  -->

    <div class="custom-card">
      <div class="card-title">改签证明
        <el-button
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
          <el-table-column
            label="上传时间"
            prop="createTime"
          />
          <el-table-column label="改签类型" prop="changeType">
            <template slot-scope="scope">
              {{ $t(`AdminService["Enum:ChangeOrderType:${scope.row.changeTicketReason}"]`) }}
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
            label="备注信息"
            prop="remark"
          >
            <template slot-scope="{row}">
              <el-popover
                placement="right-end"
                title="备注"
                width="300"
                trigger="hover"
                :content="row.remark"
              >
                <el-link slot="reference" :underline="false">{{ row.remark | maxLength }}</el-link>
              </el-popover>
            </template>
          </el-table-column>
          <!--          <el-table-column prop="uuid" label="">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button-->
          <!--                type="primary"-->
          <!--                size="mini"-->
          <!--                @click="upload(scope.row)"-->
          <!--              >-->
          <!--                {{ $t('table.upload') }}-->
          <!--              </el-button>-->
          <!--              <el-button-->
          <!--                type="danger"-->
          <!--                size="mini"-->
          <!--                @click="save(scope.row)"-->
          <!--              >-->
          <!--                {{ $t('table.save') }}-->
          <!--              </el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
      </div>
    </div>
    <el-collapse class="custom-collapse">
      <el-collapse-item>
        <template slot="title"><div class="card-title">支付信息</div></template>
        <div class="card-box" style="padding: 15px 10px">
          <el-table :data="detail.paymentRespList" border style="width: 100%">
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
      </el-collapse-item>
    </el-collapse>
    <el-collapse class="custom-collapse">
      <el-collapse-item>
        <template slot="title"><div class="card-title">机票退改规定</div></template>
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
      </el-collapse-item>
    </el-collapse>
    <div v-if="!dialogDetail" align="center" class="mt-15">
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
    <businessLog :is="'businessLog'" v-if="detail && detail.id" :id="detail.id" :model-name="'分销管理'" :data-type="1" />

    <AppendixUpload ref="dialog" @handleFilter="handleFilter" />
    <SubmitRefund ref="refundDialog" />

    <submitChange ref="changeDialog" />
    <ChangeSendMessage ref="sendMessageDialog" />

    <CreateUpdatePurchaseOrder ref="createEditPurchaseOrderDialog" @handleFilter="handleFilter" />
    <CreateUpdatePurchaseInsurance ref="createUpdatePurInsuranceDialog" @handleFilter="handleFilter" />
    <EditAgentOrder ref="editAgentOrderDialog" @handleFilter="handleFilter" />
    <el-dialog
      width="90%"
      top="3vh"
      :visible.sync="issueDetailVisible"
      append-to-body
    >
      <IssueDetail v-if="detail.issueOrderNo" ref="issueDetailDialog" />
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="info" @click="issueDetailVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import RouterBack from '@/components/RouterBack/index'
  import BusinessLog from '@/components/BussinessLog/index'
  import AppendixUpload from './appendix-upload'
  import SubmitRefund from '../refund/submit-refund'
  import ChangeSendMessage from './send-message'
  import submitChange from '../change/submit-change'
  import CreateUpdatePurchaseOrder from './components/create-update-purchase-order'
  import CreateUpdatePurchaseInsurance from './components/create-update-purchase-insurance'
  import ChangeSuccessRefundTypeEnum from '@/enum/ChangeSuccessRefundType'
import PurchaseInsuranceStatusEnum from '@/enum/PurchaseInsuranceStatus'
  import {
    changeOrderAudit,
    changeOrderDetail,
    changeOrderRefusal,
    changeOrderSuccess,
    updateChangeFees,
    updatePriceDifference,
    updateServiceFeesAmount,
    updateMarkupAmount,
    getChangeTicketSelfPurchaseOrderList,
    deleteChangePurchaseOrder,
    completeChangePurchaseOrder
  } from '@/api/agent/change-order'
  import { getOriginOrderInsurance, getPurchaseOrderInsurance, updateOrderInsurance } from '@/api/agent/order-insurance'
import rules from '@/utils/rules'
import EditAgentOrder from './edit-agent-order.vue'
import IssueDetail from '../issue/detail.vue'

  export default {
  name: 'ChangeDetail',
  components: {
    RouterBack,
    BusinessLog,
    AppendixUpload,
    SubmitRefund,
    submitChange,
    ChangeSendMessage,
    CreateUpdatePurchaseOrder,
    CreateUpdatePurchaseInsurance,
    EditAgentOrder,
    IssueDetail
  },
  data() {
    return {
      issueDetailVisible: false,
      dialogDetail: false,
      activities: [],
      activity: {
        content: '',
        timestamp: ''
      },
      changeSuccessRefundTypeOption: '',
      status: '',
      changeOrderNo: '',
      detail: {
      },
      selfChangeTicketPurchaseOrderList: [],
      selfOrderPassengers: 0,
      statusOptions: [], // 保险订单状态
      insuranceFormData: {
        originInsuranceList: []
      },
      originInsuranceFormRules: {
        purchaseRefundAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateNumber
          }
        ]
      },
      purchaseInsuranceList: [],
      srcList: [],
      changeFeesAmount: null,
      changeFeesLoading: false,
      changePriceDifference: null,
      changePriceDifferenceLoading: false,
      serviceFeesAmount: null,
      markupAmount: null,
      serviceFeesAmountLoading: false,
      btnLoading: false
    }
  },
  created() {
    this.statusOptions = Object.keys(PurchaseInsuranceStatusEnum.PurchaseInsuranceStatus).map(key => ({
      value: PurchaseInsuranceStatusEnum.PurchaseInsuranceStatus[key],
      label: this.$t(`AdminService["Enum:PurchaseInsuranceStatus:${PurchaseInsuranceStatusEnum.PurchaseInsuranceStatus[key]}"]`)
    }))
    this.status = parseInt(this.$route.query.status)
    let orderNo = this.$route.query.id
    if (!orderNo) {
      orderNo = this.detail.changeOrderNo
    }
    if (orderNo) {
      this.changeOrderNo = orderNo
      this.getDetail()
    }
  },
  mounted() {
    this.changeSuccessRefundTypeOption = Object.keys(ChangeSuccessRefundTypeEnum.ChangeSuccessRefundType).map(key => ({
      value: ChangeSuccessRefundTypeEnum.ChangeSuccessRefundType[key],
      label: key
    }))
  },
  methods: {
    handleOpen(detail) {
      this.dialogDetail = true
      this.status = detail.status
      this.changeOrderNo = detail.changeOrderNo
      this.getDetail()
    },
    getDetail() {
      this.loading = true
      if (!this.changeOrderNo) {
        this.changeOrderNo = this.$route.query.id
        if (!this.changeOrderNo) {
          this.changeOrderNo = this.detail.changeOrderNo
        }
      }
      changeOrderDetail(this.changeOrderNo, this.status).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.getSelfPurchaseOrderList(this.changeOrderNo)
          this.getOriginOrderInsuranceList(this.changeOrderNo)
          this.getPurchaseOrderInsuranceList(this.changeOrderNo)
          // 赋值
          this.detail = response.data
          // 图片预览地址
          this.srcList = response.data.appendixList.map(function(item) { return item.appendix })
          console.log(this.detail)
        }
      }).catch(() => {

      })
    },
    handleFilter(first = true) {
      if (first) {
        this.getDetail()
      }
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
      return h('div', [
        h('div', column.label),
        h('div', secondLabel)
      ])
    },
    getSummaries(param) {
      const { columns, data } = param
      const sumColumnProperty = [
        'soldTicketPrice|flightTax|fuelTax|serviceFeesAmount|markupAmount',
        'soldTicketPrice|flightTax|fuelTax|serviceFeesAmount|markupAmount|insuranceAmount',
        'supplierTicketAmount',
        'supplierSettlementAmount'
      ]
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (sumColumnProperty.includes(column.property)) {
          const values = data.map(item => {
            var result = 0
            var columProperty = column.property.split('|')
            for (var i = 0; i < columProperty.length; i++) {
              result += Number(item[columProperty[i]])
            }
            return result
          })
          if (!values.every(value => isNaN(value))) {
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
    getSummariesByNewTicketTable(param) {
      const { columns, data } = param
      const sumColumnProperty = [
          'changeSoldTicketPrice|changeFlightTax|changeFuelTax|feesAmount|serviceFeesAmount',
          'changeSoldTicketPrice|changeFlightTax|changeFuelTax|feesAmount|serviceFeesAmount',
          'supplierPriceDifference|supplierFeesAmount|supplierSupplierService',
          'supplierPriceDifference|supplierSupplierService|supplierFeesAmount'
        ]
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (sumColumnProperty.includes(column.property)) {
          const values = data.map(item => {
            var result = 0
            var columProperty = column.property.split('|')
            for (var i = 0; i < columProperty.length; i++) {
              result += Number(item[columProperty[i]])
            }
            return result
          })
          if (!values.every(value => isNaN(value))) {
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
    // 自营采购订单列表获取
    getSelfPurchaseOrderList(changeOrderNo) {
      getChangeTicketSelfPurchaseOrderList(changeOrderNo).then((response) => {
        this.selfChangeTicketPurchaseOrderList = []
        if (response.status === '200') {
          this.selfChangeTicketPurchaseOrderList = response.data
          let count = 0
          response.data.forEach(item => {
            count += item.purchaseTicketList.length
          })
          this.selfOrderPassengers = count
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 获取原保险
    getOriginOrderInsuranceList(changeOrderNo) {
      getOriginOrderInsurance(changeOrderNo, 1).then((response) => {
        this.insuranceFormData.originInsuranceList = []
        if (response.status === '200') {
          this.insuranceFormData.originInsuranceList = response.data.map((item) => {
          return {
            ...item,
            isEdit: false
          }
        })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 获取自营保险
    getPurchaseOrderInsuranceList(changeOrderNo) {
      getPurchaseOrderInsurance(changeOrderNo, 1).then((response) => {
        this.purchaseInsuranceList = []
        if (response.status === '200') {
          this.purchaseInsuranceList = response.data
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    audit() {
      this.$confirm('确定要进行改签审核通过吗？', '改签审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const changeOrderNo = this.detail.changeOrderNo
        changeOrderAudit(changeOrderNo).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '审核成功'
            })
            // 在查询一次页面
            changeOrderDetail(changeOrderNo).then((response) => {
              if (response.status === '200') {
                // 赋值
                this.detail = response.data
                // 图片预览地址
                this.srcList = response.data.appendixList.map(function(item) { return item.appendix })
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    reject() {
      this.$confirm('确定要进行拒绝吗？', '拒绝改签', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const changeOrderNo = this.detail.changeOrderNo
        changeOrderRefusal(changeOrderNo).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '已拒绝'
            })
            // 在查询一次页面
            changeOrderDetail(changeOrderNo).then((response) => {
              if (response.status === '200') {
                // 赋值
                this.detail = response.data
                // 图片预览地址
                this.srcList = response.data.appendixList.map(function(item) { return item.appendix })
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 修改手续费
    changeFeesConfirm(data) {
      if (this.changeFeesAmount === null) {
        this.$message({
          type: 'success',
          message: '请填写改签手续费'
        })
        return
      }
      this.changeFeesLoading = true
      updateChangeFees({
        orderNo: this.detail.changeOrderNo,
        passengerId: data.passengerId,
        orderFlightId: this.detail.changeOrderFlightBOList[0].id,
        feesAmount: this.changeFeesAmount
      }).then((response) => {
        if (response.status === '200') {
          this.$message({
            type: 'success',
            message: '已完成'
          })
          this.changeFeesLoading = false
          // 在查询一次页面
          changeOrderDetail(this.detail.changeOrderNo).then((response) => {
            if (response.status === '200') {
              this.changeFeesAmount = null
              // 赋值
              this.detail = response.data
              // 图片预览地址
              this.srcList = response.data.appendixList.map(function(item) { return item.appendix })
            }
          })
        }
      })
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
        orderNo: this.detail.changeOrderNo,
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
          changeOrderDetail(this.detail.changeOrderNo).then((response) => {
            if (response.status === '200') {
              this.serviceFeesAmount = null
              // 赋值
              this.detail = response.data
              // 图片预览地址
              this.srcList = response.data.appendixList.map(function(item) { return item.appendix })
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
        orderNo: this.detail.changeOrderNo,
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
          changeOrderDetail(this.detail.changeOrderNo).then((response) => {
            if (response.status === '200') {
              this.markupAmount = null
              // 赋值
              this.detail = response.data
              // 图片预览地址
              this.srcList = response.data.appendixList.map(function(item) { return item.appendix })
            }
          })
        }
      })
    },
    // 修改升舱费
    changePriceDifferenceConfirm(data) {
      if (this.changePriceDifference === null) {
        this.$message({
          type: 'success',
          message: '请填写升舱费金额'
        })
        return
      }
      this.changePriceDifferenceLoading = true
      updatePriceDifference({
        orderNo: this.detail.changeOrderNo,
        passengerId: data.passengerId,
        orderFlightId: this.detail.changeOrderFlightBOList[0].id,
        priceDifference: this.changePriceDifference
      }).then((response) => {
        if (response.status === '200') {
          this.$message({
            type: 'success',
            message: '已完成'
          })
          this.changePriceDifferenceLoading = false
          // 在查询一次页面
          changeOrderDetail(this.detail.changeOrderNo).then((response) => {
            if (response.status === '200') {
              this.changePriceDifference = null
              // 赋值
              this.detail = response.data
              // 图片预览地址
              this.srcList = response.data.appendixList.map(function(item) { return item.appendix })
            }
          })
        }
      })
    },
    refund() {
      // 判断是否可以进行提交退票
      if (this.detail.changeSuccessRefundType !== undefined && this.detail.changeSuccessRefundType !== 0) {
        this.$message.error('改签单退款类型为航司退还银行卡,不能提交退票!')
        return
      }
      this.$confirm('确定需要对该订单进行退票操作么？', '申请退票', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
          this.$refs['refundDialog'].detail(this.detail.changeOrderNo, 1)
        }).catch(() => { })
    },
    change() {
      // 申请改签,打开changeDialog
      this.$refs['changeDialog'].detail(this.detail.changeOrderNo, 1)
    },
    upload() {
      // 提交信息
      this.$refs['dialog'].detail(this.detail.changeOrderNo)
    },
    createPurchaseOrder() {
      this.$refs['createEditPurchaseOrderDialog'].handleCreate(this.detail, this.selfChangeTicketPurchaseOrderList)
    },
    // 更新采购单
    updatePurchaseOrder(row) {
      this.$refs['createEditPurchaseOrderDialog'].handleUpdate(row)
    },
    // 删除自营采购单
    deletePurchaseOrder(row) {
      this.btnLoading = true
      this.$confirm('确定需要删除该自营采购订单么？', '删除自营采购订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.btnLoading = false
        deleteChangePurchaseOrder(row.id).then((response) => {
          if (response.status === '200') {
            this.getDetail()
            this.$message({
              type: 'success',
              message: '删除自营采购订单成功!'
            })
          }
        }).catch(() => {
          this.btnLoading = false
          this.$message({
            type: 'info',
            message: '删除自营采购订单失败'
          })
        })
      }).catch(() => {
        this.btnLoading = false
      })
    },
    // 更新原始保险单
    savePurchaseInsurance(row) {
      this.$refs['originInsuranceFormRef'].validate(valid => {
        if (valid) {
          this.btnLoading = true
          updateOrderInsurance(row).then(response => {
            this.btnLoading = false
            if (response.status === '200') {
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
          }).catch((error) => {
            this.btnLoading = false
            throw error
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    // 创建自营保险单
    createPurchaseInsuranceOrder() {
      const passengers = this.detail.originOrderPassengerBOList.map(p => {
        return {
          passengerId: p.passengerId,
          label: p.lastName + p.firstName
        }
      })
      const flights = this.detail.originOrderFlightBOList.map(p => {
        return {
          id: p.id,
          label: p.departureAirportCode + '-' + p.arrivalAirportCode
        }
      })
      this.$refs['createUpdatePurInsuranceDialog'].handleCreate(passengers, flights)
    },
    // 更新自营保险单
    updatePurchaseInsuranceOrder(row) {
      this.$refs['createUpdatePurInsuranceDialog'].handleUpdate(row)
    },
    changeSuccess() {
      this.$confirm('确定要进行改签成功吗？', '改签成功', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const changeOrderNo = this.detail.changeOrderNo
        // 请求数据data
        changeOrderSuccess({
          changeOrderNo: changeOrderNo,
          list: this.detail.ticketSuccessBOList,
          changeSuccessRefundType: this.detail.changeSuccessRefundType
        }).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '已完成'
            })
            // 在查询一次页面
            changeOrderDetail(changeOrderNo).then((response) => {
              if (response.status === '200') {
                // 赋值
                this.detail = response.data
                // 图片预览地址
                this.srcList = response.data.appendixList.map(function(item) { return item.appendix })
              }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    changeNotify() {
      this.$refs['sendMessageDialog'].handleOpen(this.detail)
    },
    completeChangeOrder() {
      if (!this.detail.changeSuccessRefundType && this.detail.changeSuccessRefundType === null) {
        this.$message.error('请选择改签方式')
        return
      }
      this.btnLoading = true
      this.$confirm('确定改签完成？', '改签完成', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.btnLoading = false
        completeChangePurchaseOrder(this.detail.changeOrderNo, this.detail.changeSuccessRefundType).then((response) => {
          if (response.status === '200') {
            this.getDetail()
            this.$message({
              type: 'success',
              message: '订单改签成功!'
            })
          }
        }).catch(() => {
          this.btnLoading = false
          this.$message({
            type: 'info',
            message: '改签完成操作取消'
          })
        })
      })
    },
    orderEdit(row) {
      // row.showEdit = true
      this.$refs['editAgentOrderDialog'].handleUpdate(row, this.detail.changeOrderNo)
    },
    issueDetail() {
      // const { href } = this.$router.resolve({
      //   path: '/distribution/issue-detail',
      //   query: {
      //     ticketIssueOrderNo: orderNo,
      //     status: 0
      //   }
      // })
      // window.open(href, '_blank')
      this.issueDetailVisible = true
      this.$nextTick(() => {
        this.$refs['issueDetailDialog'].handleOpen({ ticketIssueOrderNo: this.detail.issueOrderNo, status: 0 })
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
  .origin-ticket-table .el-table__footer-wrapper tbody tr td{
    &:nth-child(1),
    &:nth-child(18),
    &:nth-child(19),
    &:nth-child(28),
    &:nth-child(29) {
      color: #F56C6B !important;
    }
  }

  .new-ticket-table .el-table__footer-wrapper tbody tr td{
    &:nth-child(1),
    &:nth-child(13),
    &:nth-child(14) {
      color: #F56C6B !important;
    }
  }

  .custom-card-red .el-table__expanded-cell[class*=cell] {
    padding: 15px 35px;
  }

  .change-refund-method-title{
    font-weight: bold;
    font-size: 14px;
    color: #000;
    line-height: 28px;
  }
</style>
