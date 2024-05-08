<template>
  <div class="app-container">
    <el-form
      ref="formRef"
      :model="dto"
      :rules="formRules"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-radio-group v-model="ways" size="small">
        <el-radio-button label="PNR提取">PNR提取</el-radio-button>
        <el-radio-button label="黑屏信息提取">黑屏信息提取</el-radio-button>
      </el-radio-group>
      <div class="custom-box" style="padding-bottom: 0">
        <template v-if="ways === 'PNR提取'">
          <el-row>
            <el-col :span="4">
              <el-form-item label="大PNR" prop="bigPnr">
                <el-input v-model.trim="dto.bigPnr" prop="bigPnr" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="小PNR" prop="smallPnr">
                <el-input
                  v-model.trim="dto.smallPnr"
                  prop="smallPnr"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="office" prop="office">
                <el-select v-model="dto.office" prop="office" clearable>
                  <el-option
                    v-for="option in officeOptions"
                    :key="option.value"
                    :value="option.label"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                size="small"
                :loading="btnLoading"
                @click="getInfomationFromRtPnr()"
              >
                提取
              </el-button>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row style="padding: 0 20px">
            <el-col :span="8">
              <el-form-item label="">
                <el-input
                  v-model="prnContent"
                  type="textarea"
                  :rows="6"
                  class="black-bg"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                size="small"
                @click="getInfomationFromParsePnr()"
              >
                提取
              </el-button>
            </el-col>
          </el-row>
        </template>
      </div>
      <div class="custom-card">
        <div class="card-title">基本信息</div>
        <div class="card-box">
          <el-row>
            <template v-if="ways === '黑屏信息提取'">
              <el-col :span="4">
                <el-form-item prop="bigPnr" label="大PNR">
                  <el-input v-model="dto.bigPnr" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item prop="smallPnr" label="小PNR">
                  <el-input v-model="dto.smallPnr" clearable />
                </el-form-item>
              </el-col>
            </template>
            <el-col :span="4">
              <el-form-item prop="agentDepartmentId" label="部门">
                <el-select
                  ref="selectTree"
                  v-model="dto.agentDepartmentId"
                  filterable
                  placeholder="请选择..."
                >
                  <el-option
                    :key="dto.agentDepartmentId"
                    :value="dto.agentDepartmentId"
                    :label="dto.agentDepartmentName"
                    style="height: auto"
                    hidden
                  />
                  <el-tree
                    ref="tree"
                    :data="departments"
                    :props="defaultProps"
                    :node-key="defaultProps.value"
                    default-expand-all
                    @node-click="handleClickNode"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="agentId" label="客户名称">
                <el-select v-model="dto.agentId" placeholder="请选择">
                  <el-option
                    v-for="item in agentList"
                    :key="item.id"
                    :label="item.name"
                    :value="
                      item.id + '|' + item.organizationId + '|' + item.name
                    "
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="agentId" label="供应商">
                九州自营
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="航段类型" prop="orderFlightType">
                <el-select
                  v-model="dto.orderFlightType"
                  @change="orderFlightTypeChange"
                >
                  <el-option
                    v-for="option in tripTypeOptions"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="productId" label="所属产品">
                <el-select v-model="dto.productId" clearable>
                  <el-option
                    v-for="option in products"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="policyId" label="政策代码">
                <el-select v-model="dto.policyId" clearable>
                  <el-option
                    v-for="option in policys"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="reimbursementType" label="报销凭证">
                <el-select
                  v-model="dto.reimbursementType"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="option in reimbursementTypeOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="contactName" label="联系人">
                <el-input v-model="dto.contactName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="contactPhone" label="联系手机">
                <el-input v-model="dto.contactPhone" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="contactEmail" label="联系邮箱">
                <el-input v-model="dto.contactEmail" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="passengerOriginType" label="订单乘客来源">
                <el-select
                  v-model="dto.passengerOriginType"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="option in orderPassengerOriginTypeOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">航程信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <el-table :data="dto.orderFlightBOList" border style="width: 100%">
            <el-table-column
              v-if="dto.orderFlightType === 2"
              width="80px"
              align="center"
              prop="id"
              :render-header="(h, obj) => renderHeader(h, obj, 'segment')"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="
                    dto.orderFlightType === 2 &&
                      dto.orderFlightBOList.length > 3
                  "
                  size="mini"
                  type="danger"
                  @click="onDelete(scope.$index, scope.row, 'segment')"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="航程序号" :width="50">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="航程类型" prop="segmentType" :width="105">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].segmentType`"
                  :rules="orderFlightBORules.segmentType"
                  class="mb-0"
                >
                  <el-select
                    v-model="scope.row.segmentType"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="option in segmentTypeOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="航司" prop="carrierNumber">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].carrierNumber`"
                  :rules="orderFlightBORules.carrierNumber"
                  class="mb-0"
                >
                  <el-select
                    v-model="scope.row.carrierNumber"
                    filterable
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in carrierList"
                      :key="item.carrierCode"
                      :label="item.carrierCode + '(' + item.carrierName + ')'"
                      :value="item.carrierCode"
                    >
                      <span style="float: left">{{ item.carrierName }}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.carrierCode }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="航班号" prop="flightNumber">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].flightNumber`"
                  :rules="orderFlightBORules.flightNumber"
                  class="mb-0"
                >
                  <el-input
                    v-model.trim="scope.row.flightNumber"
                    clearable
                    placeholder="航班号"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="起飞机场" prop="departureAirportInfo">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].departureAirportInfo`"
                  :rules="orderFlightBORules.departureAirportInfo"
                  class="mb-0"
                >
                  <el-select
                    v-model="scope.row.departureAirportInfo"
                    filterable
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in airportList"
                      :key="item.airportCode"
                      :label="item.airportCode + '(' + item.airportName + ')'"
                      :value="item.airportCode"
                    >
                      <span style="float: left">{{ item.airportName }}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.airportCode }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="到达机场" prop="arrivalAirportInfo">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].arrivalAirportInfo`"
                  :rules="orderFlightBORules.arrivalAirportInfo"
                  class="mb-0"
                >
                  <el-select
                    v-model="scope.row.arrivalAirportInfo"
                    filterable
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in airportList"
                      :key="item.airportCode"
                      :label="item.airportCode + '(' + item.airportName + ')'"
                      :value="item.airportCode"
                    >
                      <span style="float: left">{{ item.airportName }}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.airportCode }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="205" label="起飞时间" prop="depatureDate">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].departureTime`"
                  :rules="orderFlightBORules.departureTime"
                  class="mb-0"
                >
                  <el-date-picker
                    v-model="scope.row.departureTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择起飞时间"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="205" label="到达时间" prop="arrivalTime">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].departureTime`"
                  :rules="orderFlightBORules.departureTime"
                  class="mb-0"
                >
                  <el-date-picker
                    v-model="scope.row.arrivalTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择到达时间"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="舱位等级">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].cabinLevel`"
                  :rules="orderFlightBORules.cabinLevel"
                  class="mb-0"
                >
                  <el-select
                    v-model="scope.row.cabinLevel"
                    filterable
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="option in cabinLevelOptions"
                      :key="option.value"
                      :label="option.label"
                      :value="option.value"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="cabinCode" label="舱位">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].cabinCode`"
                  :rules="orderFlightBORules.cabinCode"
                  class="mb-0"
                >
                  <el-input
                    v-model.trim="scope.row.cabinCode"
                    clearable
                    placeholder="舱位"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              prop="aircraftCode"
              label="机型"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, '行李额')
              "
            >
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].aircraftCode`"
                  :rules="orderFlightBORules.aircraftCode"
                  class="mb-0"
                >
                  <el-input
                    v-model.trim="scope.row.aircraftCode"
                    clearable
                    placeholder="机型"
                  />
                </el-form-item>
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].luggageWeight`"
                  :rules="orderFlightBORules.luggageWeight"
                  class="mb-0 mt-5"
                >
                  <el-input
                    v-model.trim="scope.row.luggageWeight"
                    clearable
                    placeholder="行李额"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              prop="terminal"
              label="起飞航站楼"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, '到达航站楼')
              "
            >
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].departureTerminal`"
                  :rules="orderFlightBORules.departureTerminal"
                  class="mb-0"
                >
                  <el-input
                    v-model.trim="scope.row.departureTerminal"
                    clearable
                    placeholder="起飞航站楼"
                  />
                </el-form-item>
                <el-form-item
                  label=""
                  :prop="`orderFlightBOList[${scope.$index}].arrivalTerminal`"
                  :rules="orderFlightBORules.arrivalTerminal"
                  class="mb-0 mt-5"
                >
                  <el-input
                    v-model.trim="scope.row.arrivalTerminal"
                    clearable
                    placeholder="到达航站楼"
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">
          乘客信息
          <!-- <el-button type="warning" size="small" plain @click="openFrequentFlyerDialog()">导入常旅客</el-button> -->
          <el-upload class="upload-btn" action="">
            <el-button type="info" size="small" plain>乘客模板下载</el-button>
          </el-upload>
          <el-upload
            ref="importPassengerRef"
            class="upload-btn"
            :action="importPassengerUrl"
            :on-success="handleAvatarSuccess"
          >
            <el-button type="warning" size="small" plain>导入乘客</el-button>
          </el-upload>
        </div>
        <div class="card-box" style="padding: 15px 10px">
          <el-table :data="dto.orderPassengerBOList" border style="width: 100%">
            <el-table-column
              width="80px"
              align="center"
              prop="id"
              :render-header="(h, obj) => renderHeader(h, obj, 'passenger')"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="dto.orderPassengerBOList.length > 1"
                  size="mini"
                  type="danger"
                  @click="onDelete(scope.$index, scope.row, 'passenger')"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column width="100" label="乘客类型" prop="passengerType">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].passengerType`"
                  :rules="orderPassengerBORules.passengerType"
                  class="mb-0"
                >
                  <el-select v-model="scope.row.passengerType">
                    <el-option
                      v-for="option in passengerTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :width="180" label="姓名" prop="lastName">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].lastName`"
                  :rules="orderPassengerBORules.lastName"
                  class="mb-0"
                >
                  <el-input
                    v-model.trim="scope.row.lastName"
                    clearable
                    placeholder="姓名"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              :width="200"
              label="证件类型"
              prop="cardType"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, '国籍')
              "
            >
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].cardType`"
                  :rules="orderPassengerBORules.cardType"
                  class="mb-0"
                >
                  <el-select
                    v-model="scope.row.cardType"
                    clearable
                    @change="cardChange(scope.row)"
                  >
                    <el-option
                      v-for="option in identityCardTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
                <div class="div-flex mt-5">
                  <el-form-item
                    label=""
                    :prop="`orderPassengerBOList[${scope.$index}].nationality`"
                    :rules="[
                      {
                        required: isIdentityCard,
                        message: `请输入国籍`,
                        trigger: 'blur',
                      },
                    ]"
                    class="mb-0"
                  >
                    <el-input
                      v-show="isIdentityCard"
                      v-model.trim="scope.row.nationality"
                      clearable
                      placeholder="国籍"
                    />
                  </el-form-item>
                  <el-form-item
                    label=""
                    :prop="`orderPassengerBOList[${scope.$index}].cardIssuePlace`"
                    :rules="[
                      {
                        required: isIdentityCard,
                        message: `请输入签发地`,
                        trigger: 'blur',
                      },
                    ]"
                    class="mb-0"
                  >
                    <el-input
                      v-show="isIdentityCard"
                      v-model.trim="scope.row.cardIssuePlace"
                      clearable
                      placeholder="签发地"
                    />
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :width="250"
              label="证件号"
              prop="cardNum"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, '证件有效期')
              "
            >
              <template slot-scope="scope">
                <el-form-item
                  v-if="isIdentityCard"
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].cardNum`"
                  :rules="orderPassengerBORules.otherCardNum"
                >
                  <el-input
                    v-model.trim="scope.row.cardNum"
                    clearable
                    placeholder="证件号"
                  />
                </el-form-item>
                <el-form-item
                  v-else
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].cardNum`"
                  :rules="orderPassengerBORules.cardNum"
                >
                  <el-input
                    v-model.trim="scope.row.cardNum"
                    clearable
                    placeholder="证件号"
                    @change="identityNoChange($event, scope.$index)"
                  />
                </el-form-item>
                <el-form-item
                  v-if="isIdentityCard"
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].cardExpired`"
                  :rules="orderPassengerBORules.cardExpired"
                  class="mb-0"
                >
                  <el-date-picker
                    v-model.trim="scope.row.cardExpired"
                    type="date"
                    placeholder="证件有效期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    class="mt-5"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              :width="180"
              prop="birthday"
              label="出生日期"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, '性别')
              "
            >
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].birthday`"
                  :rules="orderPassengerBORules.birthday"
                  class="mb-0"
                >
                  <el-date-picker
                    v-model="scope.row.birthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 150px; margin-bottom: 10px"
                    placeholder="出生日期"
                    format="yyyy-MM-dd"
                    @change="birthDateChange($event, scope.$index)"
                  />
                </el-form-item>
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].gender`"
                  :rules="orderPassengerBORules.gender"
                  class="mb-0"
                >
                  <el-select v-model="scope.row.gender" clearable>
                    <el-option
                      v-for="option in genderTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :width="150" prop="phone" label="手机号">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].phone`"
                  :rules="orderPassengerBORules.phone"
                  class="mb-0"
                >
                  <el-input
                    v-model.trim="scope.row.phone"
                    clearable
                    placeholder="手机号"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              :width="190"
              prop="isGp"
              label="是否GP"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, 'GP所属银行信息')
              "
            >
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isGp" />
                <el-select
                  v-model="scope.row.gpBankValue"
                  clearable
                  filterable
                  :disabled="!scope.row.isGp"
                >
                  <el-option
                    v-for="item in gpBankList"
                    :key="item.bankCode"
                    :value="item.bankName"
                    :label="item.bankName"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :width="105"
              prop="originTicketPrice"
              label="票面价"
            >
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].originTicketPrice`"
                  :rules="orderPassengerBORules.originTicketPrice"
                  class="mb-0"
                >
                  <el-input-number
                    v-model.number="scope.row.originTicketPrice"
                    style="width: 80px"
                    :min="0"
                    :max="100000"
                    placeholder="票面价"
                    :controls="false"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              :width="80"
              prop="airportTax"
              label="基建"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, '燃油')
              "
            >
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].flightTax`"
                  :rules="orderPassengerBORules.flightTax"
                  class="mb-0"
                >
                  <el-input-number
                    v-model.number="scope.row.flightTax"
                    style="width: 60px"
                    :min="0"
                    :max="200"
                    placeholder="基建"
                    :controls="false"
                  />
                </el-form-item>
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].fuelTax`"
                  :rules="orderPassengerBORules.fuelTax"
                  class="mb-0"
                >
                  <el-input-number
                    v-model.number="scope.row.fuelTax"
                    style="width: 60px"
                    :min="0"
                    :max="200"
                    placeholder="燃油"
                    :controls="false"
                    class="mt-5"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              :width="105"
              prop="serviceFeesAmount"
              label="销售服务费"
            >
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].serviceFeesAmount`"
                  :rules="orderPassengerBORules.serviceFeesAmount"
                  class="mb-0"
                >
                  <el-input-number
                    v-model.number="scope.row.serviceFeesAmount"
                    style="width: 80px"
                    :min="0"
                    :max="100000"
                    placeholder="销售服务费"
                    :controls="false"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :width="105" prop="markupAmount" label="加价/让利">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].markupAmount`"
                  :rules="orderPassengerBORules.markupAmount"
                  class="mb-0"
                >
                  <el-input-number
                    v-model.number="scope.row.markupAmount"
                    style="width: 80px"
                    :min="0"
                    :max="100000"
                    placeholder="加价/让利"
                    :controls="false"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :width="105" prop="soldTicketPrice" label="销售价">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].soldTicketPrice`"
                  :rules="orderPassengerBORules.soldTicketPrice"
                  class="mb-0"
                >
                  <el-input-number
                    v-model.number="scope.row.soldTicketPrice"
                    style="width: 80px"
                    :min="0"
                    :max="100000"
                    placeholder="销售价"
                    :controls="false"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :width="105" prop="soldTicketPrice" label="结算价">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  :prop="`orderPassengerBOList[${scope.$index}].soldTicketPrice`"
                  :rules="orderPassengerBORules.soldTicketPrice"
                  class="mb-0"
                >
                  <el-input-number
                    v-model.number="scope.row.soldTicketPrice"
                    style="width: 80px"
                    :min="0"
                    :max="100000"
                    placeholder="结算价"
                    :controls="false"
                  />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">保险信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <el-table :data="insuranceBOList" border style="width: 100%">
            <el-table-column
              v-show="false"
              width="80px"
              align="center"
              prop="id"
              :render-header="(h, obj) => renderHeader(h, obj, 'insurance')"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="onDelete(scope.$index, scope.row, 'insurance')"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column width="180" label="是否赠送">
              <template slot-scope="scope">
                <el-form-item label="" class="mb-0">
                  <el-checkbox v-model="scope.row.isGiveAway" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="200" label="姓名" prop="passenger">
              <template slot-scope="scope">
                <el-form-item label="" prop="passenger" class="mb-0">
                  <el-select v-model="scope.row.passenger" clearable>
                    <el-option
                      v-for="option in dto.orderPassengerBOList"
                      :key="option.lastName"
                      :value="option"
                      :label="option.lastName"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="200" label="保险类型" prop="insuranceType">
              <template slot-scope="scope">
                <el-form-item label="" prop="insuranceType" class="mb-0">
                  <el-select
                    v-model="scope.row.insuranceType"
                    clearable
                    @change="
                      insuranceTypeChange($event, scope.$index, scope.row)
                    "
                  >
                    <el-option
                      v-for="option in insuranceTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="200" label="航意险名称" prop="id">
              <template slot-scope="scope">
                <el-form-item label="" prop="insuranceType" class="mb-0">
                  <el-select
                    v-model="scope.row.id"
                    clearable
                    value-key="id"
                    @change="insuranceChange($event, scope.$index, scope.row)"
                  >
                    <el-option
                      v-for="item in insuranceList"
                      :key="item.id"
                      :value="item"
                      :label="item.insuranceConfigBaseDTO.insuranceName"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              width="200"
              prop="insuranceCoverage"
              label="保额(万元)"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.insuranceCoverage"
                  clearable
                  disabled
                  placeholder="保额"
                />
              </template>
            </el-table-column>
            <el-table-column width="200" prop="salesPrice" label="销售价格">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.salesPrice"
                  clearable
                  disabled
                  placeholder="销售价格"
                />
              </template>
            </el-table-column>
            <el-table-column prop="num" label="份数">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.num"
                  :min="1"
                  :max="scope.row.purchaseLimit"
                  label="份数"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="custom-card-red">
        <div class="card-title">
          <div style="line-height: 24px">
            自营机票采购单信息<el-button
              type="primary"
              size="mini"
              style="float: right"
              @click="createPurchaseOrder()"
            >创建采购单</el-button>
          </div>
        </div>
        <div class="card-box" style="padding: 10px 10px">
          <el-table
            :data="dto.purchaseCreateBOList"
            :header-row-class-name="'gray-row'"
            style="width: 100%"
            :default-expand-all="isExpand"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table
                  border
                  :data="scope.row.purchaseTicketCreateBOList"
                  :header-row-class-name="'gray-row'"
                  style="width: 100%"
                >
                  <el-table-column align="center" prop="" label="乘机人">
                    <template slot-scope="subScope">
                      <span>{{
                        subScope.row.lastName + subScope.row.firstName
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    width="80"
                    prop="passengerType"
                    label="乘客类型"
                  >
                    <template slot-scope="{ row }">
                      {{
                        $t(
                          `AdminService["Enum:PassengerType:${row.passengerType}"]`
                        )
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="180"
                    align="center"
                    prop="carrierTicketNo"
                    label="票号"
                  >
                    <template slot-scope="subScope">
                      <div
                        v-for="(segItem, segIndex) in subScope.row
                          .segmentPurchaseInfoList"
                        :key="'carrierTicketNo' + segIndex"
                      >
                        <el-form-item
                          :prop="`purchaseCreateBOList[${scope.$index}].purchaseTicketCreateBOList[${subScope.$index}].segmentPurchaseInfoList[${segIndex}].carrierTicketNo`"
                          :rules="purchaseTicketCreateBORules.carrierTicketNo"
                        >
                          <el-input
                            v-model.trim="segItem.carrierTicketNo"
                            clearable
                            placeholder="票号"
                          />
                        </el-form-item>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="cabinCode" label="舱位">
                    <template slot-scope="subScope">
                      <div
                        v-for="(segItem, segIndex) in subScope.row
                          .segmentPurchaseInfoList"
                        :key="'cabinCode' + segIndex"
                      >
                        <el-form-item
                          :prop="`purchaseCreateBOList[${scope.$index}].purchaseTicketCreateBOList[${subScope.$index}].segmentPurchaseInfoList[${segIndex}].cabinCode`"
                          :rules="purchaseTicketCreateBORules.cabinCode"
                        >
                          <el-input
                            v-model.trim="segItem.cabinCode"
                            clearable
                            placeholder="舱位"
                            class="w-100"
                          />
                          <el-input
                            v-model.trim="segItem.fareBaseCode"
                            clearable
                            placeholder="运价基础"
                            class="w-100"
                          />
                        </el-form-item>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="couponAmount"
                    label="优惠券"
                  >
                    <template slot-scope="subScope">
                      <div
                        v-for="(segItem, segIndex) in subScope.row
                          .segmentPurchaseInfoList"
                        :key="'couponAmount' + segIndex"
                      >
                        <el-form-item
                          :prop="`purchaseCreateBOList[${scope.$index}].purchaseTicketCreateBOList[${subScope.$index}].segmentPurchaseInfoList[${segIndex}].couponAmount`"
                        >
                          <el-input
                            v-model.number="segItem.couponAmount"
                            clearable
                            placeholder="优惠券"
                          />
                        </el-form-item>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="purchaseTicketPrice"
                    label="票面价"
                  >
                    <template slot-scope="subScope">
                      <el-form-item
                        :prop="`purchaseCreateBOList[${scope.$index}].purchaseTicketCreateBOList[${subScope.$index}].purchaseTicketPrice`"
                        :rules="purchaseTicketCreateBORules.purchaseTicketPrice"
                      >
                        <el-input
                          v-model.number="subScope.row.purchaseTicketPrice"
                          clearable
                          placeholder="票面价"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="flightTax" label="基建">
                    <template slot-scope="subScope">
                      <el-form-item
                        :prop="`purchaseCreateBOList[${scope.$index}].purchaseTicketCreateBOList[${subScope.$index}].flightTax`"
                        :rules="purchaseTicketCreateBORules.flightTax"
                      >
                        <el-input
                          v-model.number="subScope.row.flightTax"
                          clearable
                          placeholder="基建"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="fuelTax" label="燃油">
                    <template slot-scope="subScope">
                      <el-form-item
                        :prop="`purchaseCreateBOList[${scope.$index}].purchaseTicketCreateBOList[${subScope.$index}].fuelTax`"
                        :rules="purchaseTicketCreateBORules.fuelTax"
                      >
                        <el-input
                          v-model.number="subScope.row.fuelTax"
                          clearable
                          placeholder="燃油"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="rebate" label="后返">
                    <template slot-scope="subScope">
                      <el-form-item
                        :prop="`purchaseCreateBOList[${scope.$index}].purchaseTicketCreateBOList[${subScope.$index}].rebate`"
                      >
                        <el-input
                          v-model.number="subScope.row.rebate"
                          clearable
                          placeholder="后返"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="additionalAmount"
                    label="额外成本"
                  >
                    <template slot-scope="subScope">
                      <el-form-item
                        :prop="`purchaseCreateBOList[${scope.$index}].purchaseTicketCreateBOList[${subScope.$index}].additionalAmount`"
                      >
                        <el-input
                          v-model.number="subScope.row.additionalAmount"
                          clearable
                          placeholder="额外成本"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="paymentAmount"
                    label="实付金额"
                  >
                    <template slot-scope="subScope">
                      <el-form-item
                        :prop="`purchaseCreateBOList[${scope.$index}].purchaseTicketCreateBOList[${subScope.$index}].paymentAmount`"
                        :rules="purchaseTicketCreateBORules.paymentAmount"
                      >
                        <el-input
                          v-model.number="subScope.row.paymentAmount"
                          clearable
                          placeholder="实付金额"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column width="170" prop="" label="操作">
                    <template slot-scope="subScope">
                      <el-button
                        v-if="scope.row.purchaseTicketCreateBOList.length > 1"
                        type="danger"
                        plain
                        size="mini"
                        :loading="btnLoading"
                        @click="deletePassenger(subScope.$index)"
                      >删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              width="180"
              prop="issuePurchaseOrderNo"
              label="采购出票订单号"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].issuePurchaseOrderNo`"
                >
                  <el-input v-model="scope.row.issuePurchaseOrderNo" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              width="170"
              prop="purchaseOrderStatus"
              label="订单状态"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].purchaseOrderStatus`"
                  :rules="purchaseTicketCreateBORules.purchaseOrderStatus"
                >
                  <el-select v-model="scope.row.purchaseOrderStatus">
                    <el-option
                      v-for="option in purchaseOrderStatusTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="80" prop="orderFlightType" label="航段类型">
              <template slot-scope="scope">
                {{
                  $t(
                    `AdminService["Enum:TripType:${scope.row.orderFlightType}"]`
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column
              width="120"
              prop="orderFlightList"
              label="起飞到达"
            >
              <template slot-scope="scope">
                <div
                  v-for="(orderFlight, flightIndex) in scope.row
                    .orderFlightList"
                  :key="'orderFlightList' + flightIndex"
                >
                  {{ orderFlight }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="140"
              prop="adultBigPnr"
              label="大编码"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, '小编码')
              "
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].adultBigPnr`"
                  :rules="[
                    {
                      required:
                        !scope.row.adultBigPnr && !scope.row.adultSmallPnr,
                    },
                  ]"
                >
                  <el-input v-model="scope.row.adultBigPnr" />
                </el-form-item>
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].adultSmallPnr`"
                  :rules="[
                    {
                      required:
                        !scope.row.adultBigPnr && !scope.row.adultSmallPnr,
                    },
                  ]"
                >
                  <el-input v-model="scope.row.adultSmallPnr" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              width="180"
              prop="ticketChannel"
              label="出票渠道"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, '下单账号')
              "
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].ticketChannel`"
                  :rules="purchaseTicketCreateBORules.ticketChannel"
                >
                  <el-select v-model="scope.row.ticketChannel">
                    <el-option
                      v-for="option in ticketChannelTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].purchaseOrderAccount`"
                  :rules="purchaseTicketCreateBORules.purchaseOrderAccount"
                >
                  <el-input v-model="scope.row.purchaseOrderAccount" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              width="160"
              prop="purchasePayPlatform"
              label="支付平台"
              :render-header="
                (h, obj) => customLabelRenderHeader(h, obj, '支付账号')
              "
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].purchasePayPlatform`"
                  :rules="purchaseTicketCreateBORules.purchasePayPlatform"
                >
                  <el-select v-model="scope.row.purchasePayPlatform">
                    <el-option
                      v-for="option in purchasePayPlatformTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].purchasePayAccount`"
                  :rules="purchaseTicketCreateBORules.purchasePayAccount"
                >
                  <el-input v-model="scope.row.purchasePayAccount" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              width="160"
              prop="purchasePayFlowNo"
              label="支付流水号"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].purchasePayFlowNo`"
                  :rules="purchaseTicketCreateBORules.purchasePayFlowNo"
                >
                  <el-input v-model="scope.row.purchasePayFlowNo" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="purchasePayStatus" label="支付状态">
              <template slot-scope="scope">
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].purchasePayStatus`"
                  :rules="purchaseTicketCreateBORules.purchasePayStatus"
                >
                  <el-select v-model="scope.row.purchasePayStatus">
                    <el-option
                      v-for="option in purchasePayStatusTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="purchasePayAmount" label="订单支付总价">
              <template slot-scope="scope">
                <el-form-item
                  :prop="`purchaseCreateBOList[${scope.$index}].purchasePayAmount`"
                  :rules="purchaseTicketCreateBORules.purchasePayAmount"
                >
                  <el-input v-model="scope.row.purchasePayAmount" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="80" prop="" label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="dto.purchaseCreateBOList.length > 1"
                  type="danger"
                  plain
                  size="mini"
                  :loading="btnLoading"
                  @click="deletePurchaseOrder(scope.$index)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="custom-card">
        <div class="card-title">订单备注</div>
        <div class="card-box">
          <el-row>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input
                  v-model="dto.remark"
                  type="textarea"
                  :rows="2"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <el-form-item align="center">
        <el-button
          size="small"
          type="primary"
          :loading="btnLoading"
          @click="submitForm('formRef')"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import InsuranceTypeEnum from '@/enum/insuranceType'
import PassengerTypeEnum from '@/enum/PassengerType'
import GenderTypeEnum from '@/enum/genderType'
import IdentityCardTypeEnum from '@/enum/identityCardType'
import SegmentTypeEnum from '@/enum/segmentType'
import CabinClassTypeEnum from '@/enum/CabinClassType'
import ReimbursementTypeEnum from '@/enum/ReimbursementType'
import PurchaseOrderStatusTypeEnum from '@/enum/PurchaseOrderStatusType'
import TicketChannelTypeEnum from '@/enum/TicketChannelType'
import TripTypeEnum from '@/enum/TripType'
import PurchasePayPlatformTypeEnum from '@/enum/PurchasePayPlatformType'
import PurchasePayStatusTypeEnum from '@/enum/PurchasePayStatusType'
import OrderPassengerOriginTypeEnum from '@/enum/OrderPassengerOriginType'
import {
  issueOrderManualCreate,
  importPassenger
} from '@/api/agent/issue-order'
import OfficeTypeEnum from '@/enum/officeType'
import { fetchList as getAirportListNoPage } from '@/api/basic/airport'
import { queryManualCreatePage } from '@/api/basic/distributor-insurance.js'
import { fetchList as getCarrierListNoPage } from '@/api/basic/airline'
import { bankList } from '@/api/basic/bank'
import { ticketAgentList } from '@/api/distribution/agent'
import { rtPnr, parsePnr } from '@/api/ibeplus/ibeplus'
import rules from '@/utils/rules'
import { getDepartments } from '@/api/identity/departmentOrganizationUnit'
import { productList } from '@/api/product/product'
import { policyList } from '@/api/product/policy'

export default {
  name: 'IssueCreate',
  data() {
    return {
      btnLoading: false,
      importPassengerUrl: '',
      ways: 'PNR提取',
      office: 0,
      // office
      officeOptions: [],
      // pnr内容
      pnrInformation: {
        bigPnr: 'MXE3TY',
        seatAvailableTimeLimitUtc: '2023-12-07T09:45:00Z',
        passengers: [
          {
            index: 'P1',
            type: 0,
            name: '卿家华',
            ticketNo: '',
            phone: '18994311854',
            cardNo: '512921197503282148',
            idType: 'NI',
            countryCode: null,
            nationCode: null,
            surname: null,
            givenName: null,
            birthDate: null,
            validDate: null,
            gender: null,
            carrier: null
          }
        ],
        flights: [
          {
            fullFlightNo: 'CA3860',
            departureDate: '2023-12-08',
            departureAirport: 'CKG',
            arrivalAirport: 'SWA',
            departureTime: '11:50:00',
            arrivalDate: '2023-12-08',
            arrivalTime: '14:00:00',
            cabin: 'Y',
            seatStatus: 'NO',
            rowNumber: '2'
          }
        ],
        contactPhone: '18013103150',
        office: 'CAN824'
      },
      rtPnrData: { pnr: '' },
      parsePnrData: { text: '' },
      prnContent: '',
      // 部门
      departments: [],
      defaultProps: {
        value: 'id',
        /** 标签显示 **/
        label: 'displayName',
        /** 子级 **/
        children: 'children'
      },
      // 客户名称
      agentList: [],
      // 航段类型
      tripTypeOptions: [],
      // 产品
      products: [],
      // 政策
      policys: [],
      // 航程类型
      segmentTypeOptions: [],
      // 航司
      carrierList: [],
      // 机场
      airportList: [],
      // 舱位等级
      cabinLevelOptions: [],
      // 乘客类型
      passengerTypeOptions: [],
      //  订单乘客的来源类型 0-散客 1-计划团 2-临时团
      orderPassengerOriginTypeOptions: [],
      // 证件类型
      identityCardTypeOptions: [],
      // 性别
      genderTypeOptions: [],
      // 订单状态
      purchaseOrderStatusTypeOptions: [],
      // 渠道类型
      ticketChannelTypeOptions: [],
      // 支付平台
      purchasePayPlatformTypeOptions: [],
      // 航程信息
      orderFlightDto: {
        segmentType: 0,
        segmentNumber: 0,
        departureAirportInfo: '',
        arrivalAirportInfo: '',
        carrierNumber: 'CZ',
        flightNumber: '',
        departureTime: '',
        arrivalTime: '',
        cabinLevel: 0,
        cabinCode: '',
        aircraftCode: '',
        luggageWeight: '',
        departureTerminal: '',
        arrivalTerminal: ''
      },
      isIdentityCard: false,
      // 乘机人信息
      orderPassengerDto: {
        passengerType: 0,
        isGp: 0,
        gpBankValue: null,
        firstName: '',
        lastName: '',
        gender: null,
        nationality: '',
        birthday: '',
        cardType: 0,
        cardNum: '',
        cardIssuePlace: '',
        cardExpired: '',
        phone: '',
        originTicketPrice: 0,
        soldTicketPrice: 0,
        flightTax: 0,
        fuelTax: 0,
        serviceFeesAmount: 0,
        markupAmount: 0,
        keepAmount: 0,
        rebate: 0,
        orderInsuranceBOList: [
          {
            insuranceConfigId: '',
            isInsurance: '',
            insuranceType: '',
            num: '',
            insuranceCoverage: '',
            salesPrice: ''
          }
        ]
      },
      // gp信息
      gpBankList: [],
      // 保险列表
      insuranceBOList: [],
      insuranceList: [],
      insuranceTypeOptions: [],
      reimbursementTypeOptions: [],
      isExpand: true,
      // 采购信息
      purchaseTicketDto: {
        issuePurchaseOrderNo: '',
        adultBigPnr: '',
        adultSmallPnr: '',
        officeNo: '',
        childBigPnr: '',
        childSmallPnr: '',
        orderFlightType: '',
        orderFlightList: [],
        ticketChannel: 0,
        purchaseOrderAccount: '',
        purchasePayPlatform: 0,
        purchasePayAccount: '',
        purchasePayFlowNo: '',
        purchasePayStatus: 0,
        purchaseOrderStatus: 0,
        purchasePayAmount: null,
        purchasePayErrMessage: '',
        remark: '',
        purchaseTicketCreateBOList: [
          {
            firstName: '',
            lastName: '',
            segmentPurchaseInfoList: [
              {
                carrierTicketNo: '',
                cabinCode: '',
                segmentNumber: 0,
                fareBaseCode: '',
                purchaseAgencyFees: 0,
                couponAmount: 0
              }
            ],
            purchaseTicketPrice: null,
            flightTax: null,
            fuelTax: null,
            rebate: 0,
            additionalAmount: 0,
            paymentAmount: null
          }
        ]
      },
      dto: {
        status: 0,
        orderStatus: 3,
        bigPnr: '',
        smallPnr: '',
        isSelfOperated: 0,
        agentDepartmentId: '',
        agentDepartmentName: '',
        agentId: '',
        agentName: '',
        agentOrganizationId: '',
        supplierOrganizationId: '00000000-0000-0000-0000-000000000000',
        supplierOrganizationName: '九州自营',
        orderFlightType: 0,
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        remark: '',
        passengerOriginType: 0,
        orderFlightBOList: [],
        orderPassengerBOList: [],
        purchaseCreateBOList: []
      },
      queryByNoPage: { current: -1, size: -1 },
      formRules: {
        agentDepartmentId: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        orderFlightType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        productId: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        policyId: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
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
        ],
        reimbursementType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        passengerOriginType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ]
      },
      orderFlightBORules: {
        segmentType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        departureAirportInfo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        arrivalAirportInfo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        carrierNumber: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        flightNumber: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        departureTime: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        cabinLevel: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        cabinCode: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ]
      },
      orderPassengerBORules: {
        passengerType: [
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
        cardType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        cardNum: [
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
        otherCardNum: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        cardExpired: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        birthday: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        gender: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        phone: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validatePhone
          }
        ],
        originTicketPrice: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        soldTicketPrice: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        flightTax: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        fuelTax: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ]
      },
      insuranceBORules: {
        passenger: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        insuranceType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        id: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ]
      },
      purchaseTicketCreateBORules: {
        purchaseOrderStatus: [
          {
            required: true,
            trigger: 'change',
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")
          }
        ],
        ticketChannel: [
          {
            required: true,
            trigger: 'change',
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")
          }
        ],
        purchaseOrderAccount: [
          {
            required: true,
            trigger: 'blur',
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")
          }
        ],
        purchasePayPlatform: [
          {
            required: true,
            trigger: 'change',
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")
          }
        ],
        purchasePayAccount: [
          {
            required: true,
            trigger: 'blur',
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")
          }
        ],
        purchasePayFlowNo: [
          {
            required: true,
            trigger: 'blur',
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")
          }
        ],
        purchasePayStatus: [
          {
            required: true,
            trigger: 'change',
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")
          }
        ],
        purchasePayAmount: [
          {
            required: true,
            trigger: 'blur',
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")
          }
        ],
        carrierTicketNo: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateTicketNo
          }
        ],
        cabinCode: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchaseTicketPrice: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        flightTax: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        fuelTax: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        paymentAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getDepartmentData()
    this.getProducts()
    this.getPolicys()
    this.getAirportList()
    this.getCarrierList()
    this.getGPBankList()
    this.getImportPassengerUrl()
    this.dto.orderFlightBOList.push(this.orderFlightDto)
    this.dto.orderPassengerBOList.push(this.orderPassengerDto)
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
    this.officeOptions = Object.keys(OfficeTypeEnum.officeType).map((key) => ({
      value: OfficeTypeEnum.officeType[key],
      label: key
    }))
    this.insuranceTypeOptions = Object.keys(
      InsuranceTypeEnum.InsuranceType
    ).map((key) => ({
      value: InsuranceTypeEnum.InsuranceType[key],
      label: key
    }))
    this.segmentTypeOptions = Object.keys(SegmentTypeEnum.SegmentType).map(
      (key) => ({
        value: SegmentTypeEnum.SegmentType[key],
        label: key
      })
    )
    this.cabinLevelOptions = Object.keys(CabinClassTypeEnum.CabinClassType).map(
      (key) => ({
        value: CabinClassTypeEnum.CabinClassType[key],
        label: key
      })
    )
    this.reimbursementTypeOptions = Object.keys(
      ReimbursementTypeEnum.ReimbursementType
    ).map((key) => ({
      value: ReimbursementTypeEnum.ReimbursementType[key],
      label: this.$t(`Juzo["Enum:ReimbursementType:${ReimbursementTypeEnum.ReimbursementType[key]}"]`)
    }))
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
    this.orderPassengerOriginTypeOptions = Object.keys(
      OrderPassengerOriginTypeEnum.OrderPassengerOriginType
    ).map((key) => ({
      value: OrderPassengerOriginTypeEnum.OrderPassengerOriginType[key],
      label: this.$t(`AdminService["Enum:OrderPassengerOriginType:${OrderPassengerOriginTypeEnum.OrderPassengerOriginType[key]}"]`)
    }))
  },
  methods: {
    // PNR导入
    getInfomationFromRtPnr() {
      if (
        this.dto.smallPnr === '' ||
        !this.dto.office ||
        this.dto.office === ''
      ) {
        this.$message.error('小PNR 和 office号不能为空')
      } else {
        this.btnLoading = true
        this.rtPnrData.pnr = this.dto.smallPnr
        this.pnrInformation = {}
        rtPnr(this.dto.office, this.rtPnrData).then((response) => {
          this.btnLoading = false
          if (response) {
            this.pnrInformation = response
            this.initDto()
          }
        })
      }
    },
    // 黑屏导入
    getInfomationFromParsePnr() {
      if (this.prnContent.trim() === '') {
        this.$message.error('PNR内容不能为空')
      } else {
        this.btnLoading = true
        this.parsePnrData.text = this.prnContent
        this.pnrInformation = {}
        parsePnr(this.parsePnrData).then((response) => {
          this.btnLoading = false
          if (response) {
            this.pnrInformation = response
            this.initDto()
          }
        })
      }
    },
    // 初始化数据
    initDto() {
      this.dto.bigPnr = this.pnrInformation.bigPnr
      this.dto.contactPhone = this.pnrInformation.contactPhone
      this.dto.orderFlightBOList = this.pnrInformation.flights.map(
        (flight, flightIndex) => ({
          ...flight,
          segmentType: 0,
          segmentNumber: flightIndex,
          carrierNumber: flight.fullFlightNo
            ? flight.fullFlightNo.substring(0, 2)
            : '',
          carrierName: flight.fullFlightNo
            ? flight.fullFlightNo.substring(0, 2)
            : '',
          flightNumber: flight.fullFlightNo
            ? flight.fullFlightNo.substring(2, flight.fullFlightNo.length - 2)
            : '',
          departureTime: flight.departureDate + ' ' + flight.departureTime,
          departureAirportInfo: flight.departureAirport,
          arrivalAirportInfo: flight.arrivalAirport,
          arrivalTime: flight.arrivalDate + ' ' + flight.arrivalTime,
          cabinCode: flight.cabin,
          cabinLevel: 0
        })
      )
      this.dto.orderPassengerBOList = this.pnrInformation.passengers.map(
        (passengerEle) => ({
          ...passengerEle,
          passengerType: passengerEle.type !== null ? passengerEle.type : '',
          lastName: passengerEle.name
            ? passengerEle.name
            : passengerEle.surname
            ? passengerEle.surname
            : '',
          firstName: passengerEle.givenName ? passengerEle.givenName : '',
          phone: passengerEle.phone ? passengerEle.phone : '',
          cardNum: passengerEle.cardNo ? passengerEle.cardNo : '',
          cardType:
            passengerEle.idType === 'NI'
              ? 0
              : passengerEle.idType === 'PP'
              ? 1
              : 9,
          countryCode: passengerEle.countryCode,
          nationality: passengerEle.nationCode,
          birthday: passengerEle.birthDate
            ? passengerEle.birthDate
            : passengerEle.cardNo &&
              (passengerEle.cardNo.length === 15 ||
                passengerEle.cardNo.length === 18)
            ? this.birthDateHandle(passengerEle.cardNo)
            : '',
          cardExpired: passengerEle.validDate ? passengerEle.validDate : '',
          gender: passengerEle.gender ? passengerEle.gender : 0,
          originTicketPrice: 0,
          soldTicketPrice: 0,
          flightTax: 0,
          fuelTax: 0,
          serviceFeesAmount: 0,
          markupAmount: 0,
          keepAmount: 0,
          rebate: 0
        })
      )
    },
    // 调api获取接口分组数据
    getDepartmentData() {
      getDepartments()
        .then((response) => {
          this.departments = response.items
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 部门选中事件
    handleClickNode(data) {
      this.$set(this.dto, 'agentDepartmentId', data.id)
      this.$set(this.dto, 'agentDepartmentName', data.displayName)
      // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
      this.$refs.selectTree.blur()
      this.getTicketAgentList()
    },
    // 客户
    getTicketAgentList() {
      ticketAgentList({
        agentDepartmentId: this.dto.agentDepartmentId,
        page: 1,
        limit: 1000
      }).then((response) => {
        if (response) {
          this.agentList = response.items
        }
      })
    },
    // 航段类型事件
    orderFlightTypeChange(val) {
      this.dto.orderFlightBOList = []
      if (val === 0) {
        this.dto.orderFlightBOList.push(this.orderFlightDto)
      } else if (val === 1) {
        for (let index = 0; index < 2; index++) {
          this.dto.orderFlightBOList.push({
            ...this.orderFlightDto,
            segmentNumber: index
          })
        }
      } else {
        for (let index = 0; index < 3; index++) {
          this.dto.orderFlightBOList.push({
            ...this.orderFlightDto,
            segmentNumber: index,
            segmentType: index === 2 ? 1 : 0
          })
        }
      }
    },
    // 获取所有产品
    getProducts() {
      productList({
        page: 1,
        limit: 1000,
        sort: ''
      }).then((response) => {
        if (response) {
          response.items.forEach((element) => {
            this.products.push({
              value: element.id,
              label: element.name
            })
          })
        }
      })
    },
    // 获取所有政策
    getPolicys() {
      policyList({
        page: 1,
        limit: 1000,
        sort: ''
      }).then((response) => {
        if (response) {
          response.items.forEach((element) => {
            this.policys.push({
              value: element.id,
              label: element.name
            })
          })
        }
      })
    },
    // 获取航司列表
    getCarrierList() {
      getCarrierListNoPage(this.queryByNoPage).then((response) => {
        if (response.status === '200') {
          this.carrierList = response.data.records
        }
      })
    },
    // 获取机场列表
    getAirportList() {
      getAirportListNoPage(this.queryByNoPage).then((response) => {
        if (response.status === '200') {
          this.airportList = response.data.records
        }
      })
    },
    // 获取gp
    getGPBankList() {
      bankList().then((response) => {
        if (response.status === '200') {
          this.gpBankList = response.data
        }
      })
    },
    // 根据证件号处理出生日期
    birthDateHandle(val) {
      if (val.length === 15 || val.length === 18) {
        const year = val.substr(6, 4)
        const month = val.substr(10, 2)
        const date = val.substr(12, 2)
        const ymd = year + '-' + month + '-' + date
        return ymd
      } else {
        return ''
      }
    },
    // 表头处理
    renderHeader(h, { column, $index }, type) {
      const that = this
      return h(
        'el-button',
        {
          props: {
            type: 'success',
            size: 'mini',
            onclick: 'onAdd'
          },
          on: {
            click: function() {
              that.onAdd(type)
            }
          }
        },
        '新增'
      )
    },
    // 表头名称处理
    customLabelRenderHeader(h, { column, $index }, secondLabel) {
      return h('div', [h('div', column.label), h('div', secondLabel)])
    },
    // 表头增加按钮操作
    onAdd(type) {
      switch (type) {
        case 'segment':
          this.dto.orderFlightBOList = this.dto.orderFlightBOList.map(
            (fEle) => ({
              ...fEle,
              segmentType: 0
            })
          )
          this.dto.orderFlightBOList.push({
            ...this.orderFlightDto,
            segmentType: 1,
            segmentNumber: this.dto.orderFlightBOList.length + 1
          })
          break
        case 'insurance':
          this.insuranceBOList.push({
            insuranceConfigId: '',
            isInsurance: '',
            insuranceType: '',
            num: '',
            insuranceCoverage: '',
            salesPrice: ''
          })
          break
        default:
          this.dto.orderPassengerBOList.push(this.orderPassengerDto)
          break
      }
    },
    // 删除按钮操作
    onDelete(index, row, type) {
      switch (type) {
        case 'segment':
          this.dto.orderFlightBOList.splice(index, 1)
          // 将最后一程航程类型改为返程
          this.$set(
            this.dto.orderFlightBOList[this.dto.orderFlightBOList.length - 1],
            'segmentType',
            1
          )
          break
        case 'insurance':
          this.insuranceBOList.splice(index, 1)
          break
        default:
          this.dto.orderPassengerBOList.splice(index, 1)
          break
      }
    },
    // 证件类型切换
    cardChange(row) {
      if (row.cardType === 0) {
        this.isIdentityCard = false
      } else {
        this.isIdentityCard = true
      }
    },
    // 证件号change事件
    identityNoChange(val, index) {
      // 身份证年/月/日
      const year = val.substr(6, 4)
      const month = val.substr(10, 2)
      const date = val.substr(12, 2)
      const ymd = year + '-' + month + '-' + date
      this.resetGenger(ymd, index)
    },
    // 出生日期change事件
    birthDateChange(val, index) {
      this.resetGenger(val, index)
    },
    // 设置男女
    resetGenger(val, index) {
      this.$set(this.dto.orderPassengerBOList[index], 'birthday', val)
      // 设置男女
      if (parseInt(val.slice(-2, -1)) % 2 === 1) {
        this.$set(this.dto.orderPassengerBOList[index], 'gender', 1)
      } else {
        this.$set(this.dto.orderPassengerBOList[index], 'gender', 0)
      }
    },
    // 导入乘客
    getImportPassengerUrl() {
      this.importPassengerUrl = importPassenger()
    },
    // 乘客模板下载
    handleAvatarSuccess(res, file) {
      var passengerList = res.data
      var orderPassengerBO = {}
      passengerList.forEach((passenger) => {
        orderPassengerBO = {}
        orderPassengerBO.passengerType = passenger.passengerType
        orderPassengerBO.lastName = passenger.lastName + passenger.firstName
        orderPassengerBO.cardType = passenger.cardType
        orderPassengerBO.nationality = passenger.nationality
        orderPassengerBO.cardIssuePlace = passenger.cardIssuePlace
        orderPassengerBO.cardNum = passenger.cardNum
        orderPassengerBO.cardExpired = passenger.cardExpired
        orderPassengerBO.birthday = passenger.birthday
        orderPassengerBO.phone = passenger.phone
        orderPassengerBO.gender = passenger.gender
        orderPassengerBO.isGp = passenger.isGp
        orderPassengerBO.gpBankValue = passenger.gpBankValue
        orderPassengerBO.originTicketPrice = 0
        orderPassengerBO.soldTicketPrice = 0
        orderPassengerBO.flightTax = 0
        orderPassengerBO.fuelTax = 0

        this.dto.orderPassengerBOList.push(orderPassengerBO)
      })
      this.$refs.importPassengerRef.clearFiles()
    },
    // 保险类型切换
    insuranceTypeChange(value, index, row) {
      if (
        row.passenger === null ||
        row.passenger === undefined ||
        row.passenger === ''
      ) {
        this.$message.error('请选择乘客')
        return
      }
      if (
        row.passenger === null ||
        row.passenger === undefined ||
        row.passenger.birthday === ''
      ) {
        this.$message.error('请填写乘客的出生日期')
        return
      }
      this.getInsuranceList(value, row)
    },
    // 保险change事件
    insuranceChange(value, index, row) {
      // 选择保险
      for (var i = 0; i < this.insuranceList.length; i++) {
        if (value.id === this.insuranceList[i].id) {
          this.insuranceBOList[index].insuranceCoverage =
            this.insuranceList[i].insuranceConfigBaseDTO.insuranceCoverage
          this.insuranceBOList[index].salesPrice =
            this.insuranceList[i].salesPrice
          this.insuranceBOList[index].insuranceConfigId =
            value.insuranceConfigId
          this.insuranceBOList[index].purchaseLimit =
            value.insuranceConfigBaseDTO.purchaseLimit
          this.insuranceBOList[index].num = null
          this.insuranceBOList[index].lastName = row.passenger.lastName
          return
        }
      }
    },
    // 可用保险列表
    // insuranceType  0 航空意外 1 航空延误
    // status 0 停售 1 正常销售
    getInsuranceList(insuranceType, row) {
      const agentinfo = this.dto.agentId.split('|')
      queryManualCreatePage({
        insuranceType: insuranceType,
        agentOrganizationId: agentinfo[1],
        birthday: row.passenger.birthday
      }).then((response) => {
        if (response.status === '200') {
          this.insuranceList = response.data
        }
      })
    },
    // 常旅客
    openFrequentFlyerDialog() {},
    // 创建采购单
    createPurchaseOrder() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.dto.purchaseCreateBOList.push({
            ...this.purchaseTicketDto,
            adultBigPnr: this.dto.bigPnr,
            smallPnr: this.dto.smallPnr,
            officeNo: this.dto.office,
            orderFlightType: this.dto.orderFlightType,
            orderFlightList: this.dto.orderFlightBOList.map(
              (flight) =>
                flight.departureAirportInfo + '-' + flight.arrivalAirportInfo
            ),
            purchaseTicketCreateBOList: this.dto.orderPassengerBOList.map(
              (passenger) => ({
                firstName: passenger.firstName,
                lastName: passenger.lastName,
                passengerType: passenger.passengerType,
                purchaseTicketPrice: passenger.originTicketPrice ?? 0,
                flightTax: passenger.flightTax ?? 0,
                fuelTax: passenger.fuelTax ?? 0,
                rebate: 0,
                additionalAmount: 0,
                paymentAmount: 0,
                segmentPurchaseInfoList: this.dto.orderFlightBOList.map(
                  (flight, flightIndex) => ({
                    segmentNumber: flightIndex,
                    cabinCode: flight.cabinCode,
                    couponAmount: 0,
                    fareBaseCode: null
                  })
                )
              })
            )
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    deletePurchaseOrder(index) {
      this.$confirm('确定需要删除该自营采购订单么？', '删除自营采购订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.btnLoading = true
        this.dto.purchaseCreateBOList.splice(index, 1)
        this.btnLoading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dto.purchaseCreateBOList.length === 0) {
            this.$message.error('自营采购单不能为空')
            return
          }
          this.btnLoading = true
          const agentinfo = this.dto.agentId.split('|')
          this.dto.agentId = agentinfo[1]
          this.dto.agentName = agentinfo[2]
          this.dto.agentOrganizationId = agentinfo[1]
          this.dto.agentOrganizationName = agentinfo[2]
          for (var i = 0; i < this.dto.orderPassengerBOList.length; i++) {
            this.dto.orderPassengerBOList[i].isGp = this.dto
              .orderPassengerBOList[i].isGp
              ? 1
              : 0
            // 保险处理
            this.dto.orderPassengerBOList[i].orderInsuranceBOList = []
            for (var j = 0; j < this.insuranceBOList.length; j++) {
              // 是否赠送
              this.insuranceBOList[j].isGiveAway = this.insuranceBOList[j]
                .isGiveAway
                ? 1
                : 0
              // 判断当前的保险是否输入passenger-lastName
              if (
                this.dto.orderPassengerBOList[i].lastName ===
                this.insuranceBOList[j].lastName
              ) {
                // 去除没用的字段传参
                const reqInsuranceBO = { ...this.insuranceBOList[j] }
                delete reqInsuranceBO.passenger
                delete reqInsuranceBO.id
                this.dto.orderPassengerBOList[i].orderInsuranceBOList.push(
                  reqInsuranceBO
                )
              }
            }
          }
          issueOrderManualCreate(this.dto).then((response) => {
            this.btnLoading = false
            if (response.status === '200') {
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
              this.$router.push(`/distribution/issue`)
            } else {
              this.$message.error(response.message)
              return false
            }
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-box {
  padding: 20px 0 0;
  border: 1px dashed lightblue;
  margin: 10px 0;
}

.custom-box-red {
  padding: 5px 5px;
  border: 1px dashed lightcoral;
  margin: 10px 0;
}

.mb-0 {
  margin-bottom: 0;
}
</style>
