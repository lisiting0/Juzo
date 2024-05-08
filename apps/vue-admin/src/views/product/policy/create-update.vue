
<template>
  <div class="app-container">
    <el-form
      ref="formRef"
      :model="dto"
      :rules="formRules"
      :inline="true"
      class="demo-form-inline form-inline-label-155"
    >
      <div class="custom-card">
        <div class="card-title">基本信息</div>
        <div class="card-box">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="tripType" label="航程类型">
                <el-select
                  v-model="dto.tripType"
                  clearable
                  @change="tripTypeChange"
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
            <el-col :span="6">
              <el-form-item prop="policyCode" label="政策代码">
                <el-input
                  v-model="dto.policyCode"
                  clearable
                  placeholder="政策代码"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="政策名称">
                <el-input
                  v-model.trim="dto.name"
                  clearable
                  placeholder="政策名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="enabled">
                <el-radio-group v-model="dto.enabled">
                  <el-radio
                    v-for="option in enabledOptions"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{ option.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="description" label="政策描述">
                <el-input v-model="dto.description" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="分销等级"
                prop="ticketAgentGroupId"
              >
                <el-select
                  v-model="dto.ticketAgentGroupId"
                  clearable
                >
                  <el-option
                    v-for="option in ticketAgentGroupOptions"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">
          航班信息{{
            dto.tripType === 1
              ? ' -- 去程'
              : dto.tripType === 2
                ? ' -- 第一程'
                : ''
          }}
        </div>
        <div class="card-box">
          <el-row>
            <el-col :span="12">
              <el-form-item label="航司" prop="airline">
                <template slot="label">
                  <span>
                    航司
                    <el-tooltip
                      effect="dark"
                      content="仅允许录入一个航司"
                      placement="top"
                    >
                      <i class="el-icon-question" />
                    </el-tooltip>
                  </span>
                </template>
                <el-select
                  v-model="dto.airline"
                  filterable
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="option in airlines"
                    :key="option.carrierCode"
                    :value="option.carrierCode"
                    :label="
                      option.carrierName +
                        '(' +
                        option.carrierCode +
                        ')'
                    "
                  >
                    <span style="float: left">{{
                      option.carrierName
                    }}</span>
                    <span
                      style="
                                                float: right;
                                                color: #8492a6;
                                                font-size: 13px;
                                            "
                    >{{ option.carrierCode }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <div
              v-for="(item, i) in dto.domesticPolicySegments"
              :key="i"
            >
              <template v-if="i === 0">
                <el-col :span="12">
                  <!-- <el-form-item :prop="`domesticPolicySegments[${i}].excludedFightSegmentsArr`" label="排除航段">
                        <template slot="label">
                          <span>
                            排除航段
                              <el-tooltip
                                  effect="dark"
                                  content="*标识全部，多个|分割,不支持** 例如CANHAK、HAK*、*HAK"
                                  placement="top"
                              >
                                  <i class="el-icon-question" />
                              </el-tooltip>
                          </span>
                        </template>
                        <el-select
                          v-model="item.excludedFightSegmentsArr"
                          multiple
                          filterable
                          allow-create
                          default-first-option
                          placeholder="*标识全部，不支持**，例如CANHAK、HAK*、*HAK"
                          @change="$forceUpdate()"
                          class="text-upper">
                          <el-option
                            v-for="item in excludedFightSegmentOptions"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-input
                            v-model.trim="item.excludedFightSegments"
                            clearable
                            placeholder="*标识全部，不支持**，例如CANHAK|HAK*|*HAK"
                        />
                    </el-form-item> -->
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].excludedFightSegments`"
                    label="排除航段"
                  >
                    <template slot="label">
                      <span>
                        排除航段
                        <el-tooltip
                          effect="dark"
                          content="*标识全部，多个|分割,不支持** 例如CANHAK、HAK*、*HAK"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="
                        item.excludedFightSegments
                      "
                      clearable
                      placeholder="*标识全部，不支持**，例如CANHAK|HAK*|*HAK"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].flightNoFilterType`"
                    label="航班号条件"
                  >
                    <el-select
                      v-model="item.flightNoFilterType"
                      clearable
                    >
                      <el-option
                        v-for="option in flightNoFilterTypeOptions"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].flightNoFilter`"
                    label="航班号限制条件"
                  >
                    <template slot="label">
                      <span>
                        航班号限制条件
                        <el-tooltip
                          effect="dark"
                          content="不包括航司二字码，多个|分割，例如1234|12M|12C"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="item.flightNoFilter"
                      clearable
                      placeholder="例如1234|12M|12C"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].departureAirports`"
                    label="出发机场"
                  >
                    <template slot="label">
                      <span>
                        出发机场
                        <el-tooltip
                          effect="dark"
                          content="*标识全部，多段使用|线分割，例：HAK|HAK"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="
                        item.departureAirports
                      "
                      clearable
                      placeholder="*标识全部，多段使用|线分割，例：HAK|HAK"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].arrivalAirports`"
                    label="到达机场"
                  >
                    <template slot="label">
                      <span>
                        到达机场
                        <el-tooltip
                          effect="dark"
                          content="*标识全部，多段使用|线分割，例：HAK|HAK"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="item.arrivalAirports"
                      clearable
                      placeholder="*标识全部，多段使用|线分割，例：HAK|HAK"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].includeCabins`"
                    label="适用舱位"
                  >
                    <el-input
                      v-model.trim="item.includeCabins"
                      clearable
                      placeholder="*标识全部，多段使用|线分割，例：N|A|M|L|H|E|R"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].excludeCabins`"
                    label="排除舱位"
                  >
                    <el-input
                      v-model.trim="item.excludeCabins"
                      clearable
                      placeholder="*标识全部，多段使用|线分割，例：N|A|M|L|H|E|R"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].supportCodeShare`"
                    label="支持共享航班"
                  >
                    <el-radio-group
                      v-model="item.supportCodeShare"
                    >
                      <el-radio
                        v-for="option in boolOptions"
                        :key="option.value"
                        :label="option.value"
                      >
                        {{ option.label }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].codeShareAirlines`"
                    label="共享航班主飞航司"
                  >
                    <template slot="label">
                      <span>
                        共享航班主飞航司
                        <el-tooltip
                          effect="dark"
                          content="支持共享航班为是时有效，*标识全部，多个|线分割，例如MU|CZ|CA"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="
                        item.codeShareAirlines
                      "
                      clearable
                      placeholder="*标识全部，多个|线分割"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].departureDateRange`"
                    label="有效航班起飞日期"
                  >
                    <el-date-picker
                      v-model="item.departureDateRange"
                      type="daterange"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].validDayOfWeekArr`"
                    label="有效班期"
                  >
                    <weeks
                      v-model="item.validDayOfWeekArr"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].stop`"
                    label="支持经停航班"
                  >
                    <el-radio-group v-model="item.stop">
                      <el-radio
                        v-for="option in stopOptions"
                        :key="option.value"
                        :label="option.value"
                      >
                        {{ option.label }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].agentCommissionMoney`"
                    label="航司代理费返钱"
                  >
                    <el-input
                      v-model.number="
                        item.agentCommissionMoney
                      "
                      clearable
                      placeholder="航司代理费返钱"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].agentCommissionPoint`"
                    label="航司代理费返点%"
                  >
                    <el-input
                      v-model.number="
                        item.agentCommissionPoint
                      "
                      clearable
                      placeholder="航司代理费返点%"
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="`domesticPolicySegments[${i}].agentCommissionRule`" label="航司代理费规则">
                    <template slot="label">
                      <span>
                        航司代理费规则
                        <el-tooltip
                          effect="dark"
                          content="[0,20){5,0.1}|[20,40){5,0.2}|[40,60){5,0.3}|[60,100){5,0.4}|[100,){5,0.5}
                          其中[0,20){5,0.1}表示当0<=航司代理费<20时,返给分销商总金额=MIN(5块+返航司代理费*10%,航司代理费)"
                          placement="top"
                        >

                          <i class="el-icon-question" />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input v-model="item.agentCommissionRule" clearable placeholder="航司代理费规则，例如：[0,20){5,0.1}|[20,40){5,0.2}|[40,60){5,0.3}|[60,100){5,0.4}|[100,){5,0.5}" />
                    <span style="color: #f10c0c;">航司代理费规则优先使用，兜底为航司代理费返钱+航司代理费返点</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-radio
                    v-for="option in boolOptions"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{ option.label }}
                  </el-radio>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].serviceCommissionMoney`"
                    label="加享产品后返金额"
                    :rules="[
                      {
                        required:
                          item.matchFareBaseCode ===
                          true,
                        message:
                          '请输入加享产品后返金额',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      v-model.number="
                        item.serviceCommissionMoney
                      "
                      clearable
                      placeholder="加享产品后返金额"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].fareBaseCodeKeyword`"
                    label="加享匹配票价基础关键字"
                    :rules="[
                      {
                        required:
                          item.matchFareBaseCode ===
                          true,
                        message:
                          '请输入匹配票价基础关键字',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      v-model.trim="
                        item.fareBaseCodeKeyword
                      "
                      clearable
                      placeholder="匹配票价基础关键字"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].fareBaseServiceDescription`"
                    label="加享票价基础服务说明"
                    :rules="[
                      {
                        required:
                          item.matchFareBaseCode ===
                          true,
                        message:
                          '请输入票价基础服务说明',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      v-model.trim="
                        item.fareBaseServiceDescription
                      "
                      clearable
                      placeholder="票价基础服务说明"
                    />
                  </el-form-item>
                </el-col>
              </template>
            </div>
          </el-row>
        </div>
      </div>
      <div
        v-if="dto.domesticPolicySegments.length > 1"
        class="custom-card"
      >
        <div class="card-title">
          航班信息{{
            dto.tripType === 1
              ? ' -- 返程'
              : dto.tripType === 2
                ? ' -- 第二程'
                : ''
          }}
        </div>
        <div class="card-box">
          <el-row>
            <div
              v-for="(item, i) in dto.domesticPolicySegments"
              :key="'' + i"
            >
              <template v-if="i > 0">
                <el-col :span="24">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].excludedFightSegments`"
                    label="排除航段"
                  >
                    <template slot="label">
                      <span>
                        排除航段
                        <el-tooltip
                          effect="dark"
                          content="*标识全部，多个|分割,不支持** 例如CANHAK、HAK*、*HAK"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="
                        item.excludedFightSegments
                      "
                      clearable
                      placeholder="*标识全部，不支持**，例如CANHAK|HAK*|*HAK"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].flightNoFilterType`"
                    label="航班号条件"
                  >
                    <el-select
                      v-model="item.flightNoFilterType"
                      clearable
                    >
                      <el-option
                        v-for="option in flightNoFilterTypeOptions"
                        :key="option.value"
                        :value="option.value"
                        :label="option.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].flightNoFilter`"
                    label="航班号限制条件"
                  >
                    <template slot="label">
                      <span>
                        航班号限制条件
                        <el-tooltip
                          effect="dark"
                          content="不包括航司二字码，多个|分割，例如1234|12M|12C"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="item.flightNoFilter"
                      clearable
                      placeholder="例如1234|12M|12C"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].departureAirports`"
                    label="出发机场"
                  >
                    <template slot="label">
                      <span>
                        出发机场
                        <el-tooltip
                          effect="dark"
                          content="*标识全部，多段使用|线分割，例：HAK|HAK"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="
                        item.departureAirports
                      "
                      clearable
                      placeholder="*标识全部，多段使用|线分割，例：HAK|HAK"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].arrivalAirports`"
                    label="到达机场"
                  >
                    <template slot="label">
                      <span>
                        到达机场
                        <el-tooltip
                          effect="dark"
                          content="*标识全部，多段使用|线分割，例：HAK|HAK"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="item.arrivalAirports"
                      clearable
                      placeholder="*标识全部，多段使用|线分割，例：HAK|HAK"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].includeCabins`"
                    label="适用舱位"
                  >
                    <el-input
                      v-model.trim="item.includeCabins"
                      clearable
                      placeholder="*标识全部，多段使用|线分割，例：N|A|M|L|H|E|R"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].excludeCabins`"
                    label="排除舱位"
                  >
                    <el-input
                      v-model.trim="item.excludeCabins"
                      clearable
                      placeholder="*标识全部，多段使用|线分割，例：N|A|M|L|H|E|R"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].supportCodeShare`"
                    label="支持共享航班"
                  >
                    <el-radio-group
                      v-model="item.supportCodeShare"
                    >
                      <el-radio
                        v-for="option in boolOptions"
                        :key="option.value"
                        :label="option.value"
                      >
                        {{ option.label }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].codeShareAirlines`"
                    label="共享航班主飞航司"
                  >
                    <template slot="label">
                      <span>
                        共享航班主飞航司
                        <el-tooltip
                          effect="dark"
                          content="支持共享航班为是时有效，*标识全部，多个|线分割，例如MU|CZ|CA"
                          placement="top"
                        >
                          <i
                            class="el-icon-question"
                          />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input
                      v-model.trim="
                        item.codeShareAirlines
                      "
                      clearable
                      placeholder="*标识全部，多个|线分割"
                      class="text-upper"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].departureDateRange`"
                    label="有效航班起飞日期"
                  >
                    <el-date-picker
                      v-model="item.departureDateRange"
                      type="daterange"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].validDayOfWeekArr`"
                    label="有效班期"
                  >
                    <weeks
                      v-model="item.validDayOfWeekArr"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].stop`"
                    label="支持经停航班"
                  >
                    <el-radio-group v-model="item.stop">
                      <el-radio
                        v-for="option in stopOptions"
                        :key="option.value"
                        :label="option.value"
                      >
                        {{ option.label }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].agentCommissionMoney`"
                    label="航司代理费返钱"
                  >
                    <el-input
                      v-model.number="
                        item.agentCommissionMoney
                      "
                      clearable
                      placeholder="航司代理费返钱"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].agentCommissionPoint`"
                    label="航司代理费返点"
                  >
                    <el-input
                      v-model.number="
                        item.agentCommissionPoint
                      "
                      clearable
                      placeholder="航司代理费返点"
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="`domesticPolicySegments[${i}].agentCommissionRule`" label="航司代理费规则">
                    <template slot="label">
                      <span>
                        航司代理费规则
                        <el-tooltip
                          effect="dark"
                          content="[0,20){5,0.1}|[20,40){5,0.2}|[40,60){5,0.3}|[60,100){5,0.4}|[100,){5,0.5} <br/>
                          其中[0,20){5,0.1}表示当0<=航司代理费<20时,返给分销商总金额=MIN(5块+航司代理费*10%,航司代理费)"
                          placement="top"
                        >
                          <i class="el-icon-question" />
                        </el-tooltip>
                      </span>
                    </template>
                    <el-input v-model="item.agentCommissionRule" clearable placeholder="航司代理费规则，例如：[0,20){5,0.1}|[20,40){5,0.2}|[40,60){5,0.3}|[60,100){5,0.4}|[100,){5,0.5}" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].matchFareBaseCode`"
                    label="是否匹配运价基础"
                  >
                    <el-radio-group
                      v-model="item.matchFareBaseCode"
                    >
                      <el-radio
                        v-for="option in boolOptions"
                        :key="option.value"
                        :label="option.value"
                      >
                        {{ option.label }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].serviceCommissionMoney`"
                    label="加享产品后返金额"
                    :rules="[
                      {
                        required:
                          item.matchFareBaseCode ===
                          true,
                        message:
                          '请输入加享产品后返金额',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      v-model.number="
                        item.serviceCommissionMoney
                      "
                      clearable
                      placeholder="加享产品后返金额"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].fareBaseCodeKeyword`"
                    label="匹配票价基础关键字"
                    :rules="[
                      {
                        required:
                          item.matchFareBaseCode ===
                          true,
                        message:
                          '请输入匹配票价基础关键字',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      v-model.trim="
                        item.fareBaseCodeKeyword
                      "
                      clearable
                      placeholder="匹配票价基础关键字"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].fareBaseServiceDescription`"
                    label="票价基础服务说明"
                    :rules="[
                      {
                        required:
                          item.matchFareBaseCode ===
                          true,
                        message:
                          '请输入票价基础服务说明',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input
                      v-model.trim="
                        item.fareBaseServiceDescription
                      "
                      clearable
                      placeholder="票价基础服务说明"
                    />
                  </el-form-item>
                </el-col>
              </template>
            </div>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">销售规则</div>
        <div class="card-box">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="product" label="所属产品">
                <el-select
                  v-model="dto.product"
                  clearable
                  @change="productChange"
                >
                  <el-option
                    v-for="option in products"
                    :key="option.value"
                    :value="option"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="reimbursementType"
                label="报销类型"
              >
                <el-select
                  v-model="dto.reimbursementType"
                  clearable
                >
                  <el-option
                    v-for="option in reimbursementTypeOptions"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="validDateBegin"
                label="销售有效开始日期 "
              >
                <el-date-picker
                  v-model.trim="dto.validDateBegin"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="销售有效开始日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="validDateEnd"
                label="销售有效结束日期 "
              >
                <el-date-picker
                  v-model.trim="dto.validDateEnd"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="销售有效结束日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="validTimeBegin"
                label="销售有效开始时间 "
              >
                <el-time-select
                  v-model.trim="dto.validTimeBegin"
                  placeholder="销售有效开始时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="validTimeEnd"
                label="销售有效结束时间 "
              >
                <el-time-select
                  v-model.trim="dto.validTimeEnd"
                  placeholder="销售有效结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="maxAdvanceBookingDays"
                label="最晚提前预定天数"
              >
                <el-input
                  v-model.number="dto.maxAdvanceBookingDays"
                  clearable
                  placeholder="最晚提前预定天数"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="minAdvanceBookingDays"
                label="最早提前预定天数"
              >
                <el-input
                  v-model.number="dto.minAdvanceBookingDays"
                  clearable
                  placeholder="最早提前预定天数"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">运价规则&nbsp;&nbsp;<span style="color: rgb(235, 17, 17);">与航司代理费返钱返点规则叠加，请慎重！请慎重！请慎重！</span></div>
        <div class="card-box">
          <el-row>
            <el-col :span="12">
              <el-form-item
                prop="priceSourceType"
                label="运价来源类型"
              >
                <el-select
                  v-model="dto.priceSourceType"
                  clearable
                >
                  <el-option
                    v-for="option in priceSourceTypeOptions"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="commissionPoint"
                label="票面价返点%"
              >
                <template slot="label">
                  <span>
                    票面价返点%
                    <el-tooltip
                      effect="dark"
                      content="正数表示票面价返点给分销商,负数表示多收分销商的点，例如：票面价1000,返点5，表示结算价950；票面价1000，返钱-5，表示结算价1050"
                      placement="top"
                    >
                      <i
                        class="el-icon-question"
                      />
                    </el-tooltip>
                  </span>
                </template>
                <el-input
                  v-model.number="dto.commissionPoint"
                  clearable
                  placeholder="票面价返点"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="commissionMoney"
                label="票面价返钱"
              >
                <template slot="label">
                  <span>
                    票面价返钱
                    <el-tooltip
                      effect="dark"
                      content="正数表示票面价返钱给分销商,负数表示多收分销商的钱，例如：票面价1000,返钱5，表示结算价995；票面价1000，返钱-5，表示结算价1005"
                      placement="top"
                    >
                      <i
                        class="el-icon-question"
                      />
                    </el-tooltip>
                  </span>
                </template>
                <el-input
                  v-model.number="dto.commissionMoney"
                  clearable
                  placeholder="票面价返钱"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="ticketPriceFloatingPoint"
                label="票面价浮动比例"
              >
                <el-input
                  v-model.number="
                    dto.ticketPriceFloatingPoint
                  "
                  clearable
                  placeholder="票面价浮动比例"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="ticketPriceFloatingMoney"
                label="票面价浮动金额"
              >
                <el-input
                  v-model.number="
                    dto.ticketPriceFloatingMoney
                  "
                  clearable
                  placeholder="票面价浮动金额"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="ticketPrice"
                label="指定票面价"
                :rules="[
                  {
                    required: dto.priceSourceType === 100,
                    message: '请指定票面价',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model.number="dto.ticketPrice"
                  clearable
                  placeholder="指定票面价"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="ticketPriceUpperLimit"
                label="票价上限"
              >
                <el-input
                  v-model.number="dto.ticketPriceUpperLimit"
                  clearable
                  placeholder="票价上限"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="ticketPriceLowerLimit"
                label="票价下限"
              >
                <el-input
                  v-model.number="dto.ticketPriceLowerLimit"
                  clearable
                  placeholder="票价下限"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">校验规则</div>
        <div class="card-box">
          <el-row>
            <el-col :span="12">
              <el-form-item
                prop="generatePnr"
                label="是否生成PNR"
              >
                <el-checkbox v-model.trim="dto.generatePnr" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="useOfficeNo"
                label="使用OfficeNo"
              >
                <el-select v-model="dto.useOfficeNo" clearable>
                  <el-option
                    v-for="option in officeNos"
                    :key="option.value"
                    :value="option.label"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="pata" label="是否PATA验价">
                <el-checkbox
                  v-model.trim="dto.pata"
                  @change="pataChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="pataCommand"
                label="PATA特殊命令"
              >
                <el-input
                  v-model.trim="dto.pataCommand"
                  clearable
                  placeholder="大客户号(PATA特殊命令)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="minSeatLeftWhenDisabled"
                label="禁售最小座位阈值"
              >
                <el-input
                  v-model.number="dto.minSeatLeftWhenDisabled"
                  clearable
                  placeholder="禁售最小座位阈值"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div align="center">
        <el-form-item>
          <el-button @click="close">关闭</el-button>
          <el-button
            :loading="loading"
            type="primary"
            @click="
              !id ? createData('formRef') : updateData('formRef')
            "
          >
            {{ id ? '保存' : '新增' }}
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { airlineList } from '@/api/basic/airline'
import { productList } from '@/api/product/product'
import { priceSourceAccountList } from '@/api/configuration/price-source-account'
import TripTypeEnum from '@/enum/TripType'
import PolicyFlightNoFilterTypeEnum from '@/enum/PolicyFlightNoFilterType'
import PolicyStopTypeEnum from '@/enum/PolicyStopType'
import Weeks from '@/components/Weeks/index'
import ReimbursementTypeEnum from '@/enum/ReimbursementType'
import PriceSourceTypeEnum from '@/enum/PriceSourceType'
import rules from '@/utils/rules'
import { policyDetail, updatePolicy, createPolicy } from '@/api/product/policy'
import { ticketAgentGroupList } from '@/api/distribution/agent-group'
import { getTicketSupplierByUserId } from '@/api/identity/ticket-supplier'
import { getUserByUserName } from '@/api/identity/user'

export default {
  name: 'PolicyCreateUpdate',
  components: { Weeks },
  data() {
    return {
      supplier: {},
      id: '',
      loading: false,
      ticketAgentGroupOptions: [],
      tripTypeOptions: [],
      excludedFightSegmentOptions: [{
        value: '*',
        label: '*'
      }],
      departureAirportOptions: [{
        value: '*',
        label: '*'
      }],
      emptyOptions: [{
        value: '*',
        label: '*'
      }],
      enabledOptions: [
        {
          value: true,
          label: '启用'
        },
        {
          value: false,
          label: '禁用'
        }
      ],
      boolOptions: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      flightNoFilterTypeOptions: [],
      stopOptions: [],
      query: { current: -1, size: -1 },
      airlines: [],
      products: [],
      officeNos: [],
      reimbursementTypeOptions: [],
      priceSourceTypeOptions: [],
      dto: {
        supplierId: '',
        tripType: 0,
        enabled: true,
        reimbursementType: 0,
        priceSourceType: 1,
        domesticPolicySegments: [{
          index: 1,
          // excludedFightSegmentsArr: [],
          excludedFightSegments: null,
          departureAirports: null,
          arrivalAirports: null,
          includeCabins: null,
          excludeCabins: null,
          validDayOfWeekArr: [1, 2, 4, 8, 16, 32, 64],
          flightNoFilterType: 0,
          supportCodeShare: true,
          stop: 0,
          agentCommissionMoney: 0,
          agentCommissionPoint: 0,
          matchFareBaseCode: false,
          serviceCommissionMoney: 0
        }]
      },
      formRules: {
        tripType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        policyCode: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        airline: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        'domesticPolicySegments[0].excludedFightSegments': [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value) {
                const regex = /^\*|^[A-Za-z]{6}$|^[A-Za-z]{3}\*|\*[A-Za-z]{3}$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('排除航段格式不正确，*标识全部，例：只有一个*，或多段用CANHAK、HAK*、*HAK')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              } else {
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[0].departureAirports': [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('起飞机场不能为空'))
              } else {
                const regex = /^\*|^[A-Za-z]{3}$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('飞机场格式不正确，*标识全部，例：只有一个*，多段使用|线分割，CAN|PKX|CTU')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[0].arrivalAirports': [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('到达机场不能为空'))
              } else {
                const regex = /^\*|^[A-Za-z]{3}$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('到达机场格式不正确，*标识全部，例：只有一个*，多段使用|线分割，CAN|PKX|CTU')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[0].includeCabins': [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('适用舱位不能为空'))
              } else {
                const regex = /^\*|^[A-Za-z]$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('适用舱位格式不正确，*标识全部，例：只有一个*，多段使用|线分割，V|T')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[0].excludeCabins': [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value) {
                const regex = /^\*|^[A-Za-z]$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('排除舱位格式不正确，*标识全部，例：只有一个*，多段使用|线分割，V|T')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              } else {
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[0].departureDateRange': [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        'domesticPolicySegments[0].validDayOfWeekArr': [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        'domesticPolicySegments[0].agentCommissionMoney': [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        'domesticPolicySegments[0].agentCommissionPoint': [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        // 第二程
        'domesticPolicySegments[1].excludedFightSegments': [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value) {
                const regex = /^\*|^[A-Za-z]{6}$|^[A-Za-z]{3}\*|\*[A-Za-z]{3}$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('排除航段格式不正确，*标识全部，例：只有一个*，或多段用CANHAK、HAK*、*HAK')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              } else {
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[1].departureAirports': [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('起飞机场不能为空'))
              } else {
                const regex = /^\*|^[A-Za-z]{3}$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('飞机场格式不正确，*标识全部，例：只有一个*，多段使用|线分割，CAN|PKX|CTU')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[1].arrivalAirports': [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('到达机场不能为空'))
              } else {
                const regex = /^\*|^[A-Za-z]{3}$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('到达机场格式不正确，*标识全部，例：只有一个*，多段使用|线分割，CAN|PKX|CTU')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[1].includeCabins': [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('适用舱位不能为空'))
              } else {
                const regex = /^\*|^[A-Za-z]$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('适用舱位格式不正确，*标识全部，例：只有一个*，多段使用|线分割，V|T')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[1].excludeCabins': [
          {
            required: false,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value) {
                const regex = /^\*|^[A-Za-z]$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('排除舱位格式不正确，*标识全部，例：只有一个*，多段使用|线分割，V|T')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              } else {
                callback()
              }
            }
          }
        ],
        'domesticPolicySegments[1].departureDateRange': [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        'domesticPolicySegments[1].validDayOfWeekArr': [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        'domesticPolicySegments[1].agentCommissionMoney': [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        'domesticPolicySegments[1].agentCommissionPoint': [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        product: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        validDateBegin: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        validDateEnd: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        useOfficeNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        reimbursementType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        priceSourceType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        commissionPoint: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateNumber
          }
        ],
        commissionMoney: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateNumber
          }
        ],
        ticketPriceFloatingPoint: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateNumber
          }
        ],
        ticketPriceFloatingMoney: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateNumber
          }
        ]
      }
    }
  },
  created() {
    this.flightNoFilterTypeOptions = Object.keys(PolicyFlightNoFilterTypeEnum.PolicyFlightNoFilterType).map(key => ({
      value: PolicyFlightNoFilterTypeEnum.PolicyFlightNoFilterType[key],
      label: this.$t(`Juzo["Enum:PolicyFlightNoFilterType:${PolicyFlightNoFilterTypeEnum.PolicyFlightNoFilterType[key]}"]`)
    }))
    this.stopOptions = Object.keys(PolicyStopTypeEnum.PolicyStopType).map(key => ({
      value: PolicyStopTypeEnum.PolicyStopType[key],
      label: this.$t(`Juzo["Enum:PolicyStopType:${PolicyStopTypeEnum.PolicyStopType[key]}"]`)
    }))
    this.reimbursementTypeOptions = Object.keys(ReimbursementTypeEnum.ReimbursementType).map(key => ({
      value: ReimbursementTypeEnum.ReimbursementType[key],
      label: this.$t(`Juzo["Enum:ReimbursementType:${ReimbursementTypeEnum.ReimbursementType[key]}"]`)
    }))
    this.tripTypeOptions = Object.keys(TripTypeEnum.TripType).map(key => ({
      value: TripTypeEnum.TripType[key],
      label: this.$t(`Juzo["Enum:TripType:${TripTypeEnum.TripType[key]}"]`)
    })).filter(x => x.value !== 3)
    this.priceSourceTypeOptions = Object.keys(PriceSourceTypeEnum.PriceSourceType).map(key => ({
      value: PriceSourceTypeEnum.PriceSourceType[key],
      label: this.$t(`Juzo["Enum:PriceSourceType:${PriceSourceTypeEnum.PriceSourceType[key]}"]`)
    }))
    this.getAirlines()
    this.getProducts()
    this.getOfficeNos()
    this.getTicketAgentGroups()
    this.dto.generatePnr = true
    this.dto.commissionPoint = 0
    this.dto.commissionMoney = 0
  },
  mounted() {
    this.id = this.$route.query.id
    if (this.id) {
      this.getPolicyDetail()
    }
    this.getTicketSupplier()
  },
  methods: {
    getTicketSupplier() {
      getUserByUserName(this.$store.getters.userName).then((response) => {
        if (response) {
          getTicketSupplierByUserId(response.id).then((resp) => {
            if (resp) {
              this.supplier = resp
              console.log('----------this.supplier', this.supplier)
            }
          })
        }
      })
    },
    tripTypeChange(val) {
      if (val === 1 || val === 2) {
        this.dto.domesticPolicySegments = [{
          index: 1,
          excludedFightSegments: null,
          departureAirports: null,
          arrivalAirports: null,
          includeCabins: null,
          excludeCabins: null,
          validDayOfWeekArr: [1, 2, 4, 8, 16, 32, 64],
          flightNoFilterType: 0,
          supportCodeShare: true,
          stop: 0,
          agentCommissionMoney: 0,
          agentCommissionPoint: 0,
          matchFareBaseCode: false,
          serviceCommissionMoney: 0
        }, {
          index: 2,
          excludedFightSegments: null,
          departureAirports: null,
          arrivalAirports: null,
          includeCabins: null,
          excludeCabins: null,
          validDayOfWeekArr: [1, 2, 4, 8, 16, 32, 64],
          flightNoFilterType: 0,
          supportCodeShare: true,
          stop: 0,
          agentCommissionMoney: 0,
          agentCommissionPoint: 0,
          matchFareBaseCode: false,
          serviceCommissionMoney: 0
        }]
      } else {
        this.dto.domesticPolicySegments = [{
          index: 1,
          excludedFightSegments: null,
          departureAirports: null,
          arrivalAirports: null,
          includeCabins: null,
          excludeCabins: null,
          validDayOfWeekArr: [1, 2, 4, 8, 16, 32, 64],
          flightNoFilterType: 0,
          supportCodeShare: true,
          stop: 0,
          agentCommissionMoney: 0,
          agentCommissionPoint: 0,
          matchFareBaseCode: false,
          serviceCommissionMoney: 0
        }]
      }
    },
    getAirlines() {
      airlineList(this.query).then((response) => {
        if (response) {
          this.airlines = response.data.records
        }
      })
    },
    getProducts() {
      productList({
        page: 1,
        limit: 1000,
        sort: ''
      }).then((response) => {
        if (response) {
          response.items.forEach(element => {
            this.products.push({
              value: element.id,
              label: element.name
            })
          })
        }
      })
    },
    getTicketAgentGroups() {
      ticketAgentGroupList({
        page: 1,
        limit: 1000,
        sort: ''
      }).then((response) => {
        if (response) {
          response.items.forEach(element => {
            this.ticketAgentGroupOptions.push({
              value: element.id,
              label: element.name
            })
          })
        }
      })
    },
    getOfficeNos() {
      priceSourceAccountList({
        // supplierId: '00000000-0000-0000-0000-000000000000',
        page: 1,
        limit: 1000,
        sort: ''
      }).then((response) => {
        if (response) {
          response.items.forEach(element => {
            this.officeNos.push({
              value: element.id,
              label: element.officeNo
            })
          })
        }
      })
    },
    pataChange(value) {
      if (value) {
        this.pataCommandValidate = true
      }
    },
    productChange(object) {
      this.dto.productId = object.value
      this.dto.productName = object.label
    },
    close() {
      // 关闭当前路由
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.push(`/product/policy`)
    },
    setDto() {
      this.dto.domesticPolicySegments.forEach(ele => {
        ele.departureAirports = ele.departureAirports.toUpperCase()
        ele.arrivalAirports = ele.arrivalAirports.toUpperCase()
        ele.excludedFightSegments = ele.excludedFightSegments?.toUpperCase()
        ele.flightNoFilter = ele.flightNoFilter?.toUpperCase()
        ele.includeCabins = ele.includeCabins.toUpperCase()
        ele.excludeCabins = ele.excludeCabins?.toUpperCase()
        ele.codeShareAirlines = ele.codeShareAirlines?.toUpperCase()
        ele.validDayOfWeek = this.dto.domesticPolicySegments[0].validDayOfWeekArr.reduce((acc, num) => acc + num, 0)
        ele.departureDateBegin = this.dto.domesticPolicySegments[0].departureDateRange[0]
        ele.departureDateEnd = this.dto.domesticPolicySegments[0].departureDateRange[1]
      })
    },
    createData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.setDto()
          // console.log(this.supplier)
          this.dto.supplierId = this.supplier[0].id
          // console.log('------create policy', this.dto)
          if (!this.dto.ticketPrice && this.dto.ticketPrice < 1) {
            this.dto.ticketPrice = null
          }
          this.dto
          createPolicy(this.dto).then(response => {
            if (response) {
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
              this.close()
            }
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    getFactors(num) {
      const weekArray = []
      const binaryString = num.toString(2) // 将数字转换为二进制字符串
      for (let i = 0; i < binaryString.length; i++) {
        if (binaryString[i] === '1') {
          weekArray.push(Math.pow(2, binaryString.length - 1 - i)) // 将对应位置的值添加到数组中
        }
      }
      return weekArray.reverse()
    },
    getPolicyDetail() {
      policyDetail(this.id).then((response) => {
        this.dto = response
        // 编辑状态下删除supplierId
        delete this.dto.supplierId
        this.$set(this.dto, 'product', this.dto.productName)
        this.$set(this.dto.domesticPolicySegments[0], 'validDayOfWeekArr', this.getFactors(this.dto.domesticPolicySegments[0].validDayOfWeek))
        this.$set(this.dto.domesticPolicySegments[0], 'departureDateRange', [this.dto.domesticPolicySegments[0].departureDateBegin, this.dto.domesticPolicySegments[0].departureDateEnd])
        if (this.dto.domesticPolicySegments.length > 1) {
          this.$set(this.dto.domesticPolicySegments[1], 'validDayOfWeekArr', this.getFactors(this.dto.domesticPolicySegments[0].validDayOfWeek))
          this.$set(this.dto.domesticPolicySegments[1], 'departureDateRange', [this.dto.domesticPolicySegments[0].departureDateBegin, this.dto.domesticPolicySegments[0].departureDateEnd])
        }
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.setDto()
          this.loading = true
          if (!this.dto.ticketPrice && this.dto.ticketPrice < 1) {
            this.dto.ticketPrice = null
          }

          updatePolicy(this.dto).then(response => {
            if (response) {
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),

                type: 'success',
                duration: 2000
              })
              this.close()
            }
          }).catch((error) => {
            this.loading = false
            throw error
          })
        } else {
          this.$message.error('请填写完整必填项')
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
</style>
