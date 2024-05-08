
<template>
  <el-dialog width="80%" top="3vh" :visible.sync="dialogFormVisible" :title="'详情'">
    <el-form
      v-if="dto"
      ref="formRef"
      :inline="true"
      class="demo-form-inline form-inline-label-155"
    >
      <div class="custom-card">
        <div class="card-title">基本信息</div>
        <div class="card-box">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="tripType" label="航程类型：">
                {{ $t(`AdminService["Enum:TripType:${dto.tripType}"]`) }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="policyCode" label="政策代码：">
                {{ dto.policyCode }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="政策名称：">
                {{ dto.name }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态：" prop="enabled">
                {{ dto.enabled ? '启用' : '禁用' }}
              </el-form-item>
            </el-col>
            <el-col v-if="dto.description" :span="6">
              <el-form-item prop="description" label="政策描述：">
                {{ dto.description }}
              </el-form-item>
            </el-col>
            <el-col v-if="dto.ticketAgentGroupId" :span="6">
              <el-form-item label="分销等级：" prop="ticketAgentGroupId">
                {{ dto.ticketAgentGroupId }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">航班信息{{ dto.tripType === 1 ? ' -- 去程' : dto.tripType === 2 ? ' -- 第一程' : '' }}</div>
        <div class="card-box">
          <el-row>
            <el-col :span="6">
              <el-form-item label="航司：" prop="airline">
                {{ dto.airline }}
              </el-form-item>
            </el-col>
            <div v-for="(item, i) in dto.domesticPolicySegments" :key="i">
              <template v-if="i === 0">
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].excludedFightSegments`" label="排除航段：">
                    {{ item.excludedFightSegments }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].flightNoFilterType`" label="航班号条件：">
                    {{ $t(`Juzo["Enum:PolicyFlightNoFilterType:${item.flightNoFilterType}"]`) }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].flightNoFilter`" label="航班号限制条件：">
                    {{ item.flightNoFilter }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].departureAirports`" label="出发机场：">
                    {{ item.departureAirports }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].arrivalAirports`" label="到达机场：">
                    {{ item.arrivalAirports }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].includeCabins`" label="适用舱位：">
                    {{ item.includeCabins }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].excludeCabins`" label="排除舱位：">
                    {{ item.excludeCabins }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].supportCodeShare`" label="支持共享航班：">
                    {{ item.supportCodeShare | boolean }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].codeShareAirlines`" label="共享航班主飞航司：">
                    {{ item.codeShareAirlines }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].departureDateRange`" label="有效航班起飞日期：">
                    {{ item.departureDateBegin | dateYMD }} - {{ item.departureDateEnd | dateYMD }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :prop="`domesticPolicySegments[${i}].validDayOfWeek`" label="有效班期：">
                    {{ convertToWeekdays(item.validDayOfWeek) }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].stop`" label="支持经停航班：">
                    {{ $t(`Juzo["Enum:PolicyStopType:${item.stop}"]`) }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].agentCommissionMoney`" label="航司代理费返钱：">
                    {{ item.agentCommissionMoney }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].agentCommissionPoint`" label="航司代理费返点：">
                    {{ item.agentCommissionPoint }}%
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].matchFareBaseCode`" label="是否匹配运价基础：">
                    {{ item.matchFareBaseCode ? '是' : '否' }}
                  </el-form-item>
                </el-col>
                <el-col v-if="item.serviceCommissionMoney" :span="6">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].serviceCommissionMoney`"
                    label="加享产品后返金额："
                  >
                    {{ item.serviceCommissionMoney }}
                  </el-form-item>
                </el-col>
                <el-col v-if="item.fareBaseCodeKeyword" :span="6">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].fareBaseCodeKeyword`"
                    label="匹配票价基础关键字："
                  >
                    {{ item.fareBaseCodeKeyword }}
                  </el-form-item>
                </el-col>
                <el-col v-if="item.fareBaseServiceDescription" :span="6">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].fareBaseServiceDescription`"
                    label="票价基础服务说明："
                  >
                    {{ item.fareBaseServiceDescription }}
                  </el-form-item>
                </el-col>
              </template>
            </div>
          </el-row>
        </div>
      </div>
      <div v-if="dto.domesticPolicySegments && dto.domesticPolicySegments.length > 1" class="custom-card">
        <div class="card-title">航班信息{{ dto.tripType === 1 ? ' -- 返程' : dto.tripType === 2 ? ' -- 第二程' : '' }}</div>
        <div class="card-box">
          <el-row>
            <div v-for="(item, i) in dto.domesticPolicySegments" :key="''+i">
              <template v-if="i > 0">
                <el-col :span="24">
                  <el-form-item :prop="`domesticPolicySegments[${i}].excludedFightSegments`" label="排除航段：">
                    {{ item.excludedFightSegments }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].flightNoFilterType`" label="航班号条件：">
                    {{ $t(`Juzo["Enum:PolicyFlightNoFilterType:${item.flightNoFilterType}"]`) }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].flightNoFilter`" label="航班号限制条件：">
                    {{ item.flightNoFilter }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].departureAirports`" label="出发机场：">
                    {{ item.departureAirports }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].arrivalAirports`" label="到达机场：">
                    {{ item.arrivalAirports }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].includeCabins`" label="适用舱位：">
                    {{ item.includeCabins }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].excludeCabins`" label="排除舱位：">
                    {{ item.excludeCabins }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].supportCodeShare`" label="支持共享航班：">
                    {{ item.supportCodeShare | boolean }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].codeShareAirlines`" label="共享航班主飞航司：">
                    {{ item.codeShareAirlines }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].departureDateRange`" label="有效航班起飞日期：">
                    {{ item.departureDateRange | dateYMD }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].validDayOfWeekArr`" label="有效班期：">
                    <weeks v-model="item.validDayOfWeekArr" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].stop`" label="是否支持经停航班：">
                    {{ item.stop | boolean }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].agentCommissionMoney`" label="航司代理费返钱：">
                    {{ item.agentCommissionMoney }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].agentCommissionPoint`" label="航司代理费返点：">
                    {{ item.agentCommissionPoint }}%
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :prop="`domesticPolicySegments[${i}].matchFareBaseCode`" label="是否匹配运价基础：">
                    {{ item.matchFareBaseCode | boolean }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].serviceCommissionMoney`"
                    label="加享产品后返金额："
                  >
                    {{ item.serviceCommissionMoney }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].fareBaseCodeKeyword`"
                    label="匹配票价基础关键字："
                  >
                    {{ item.fareBaseCodeKeyword }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    :prop="`domesticPolicySegments[${i}].fareBaseServiceDescription`"
                    label="票价基础服务说明："
                  >
                    {{ item.fareBaseServiceDescription }}
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
            <el-col :span="6">
              <el-form-item prop="product" label="所属产品：">
                {{ dto.product }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="reimbursementType" label="报销类型：">
                {{ dto.reimbursementType }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="validDateBegin" label="有效开始日期：">
                {{ dto.validDateBegin }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="validDateEnd" label="有效结束日期：">
                {{ dto.validDateEnd }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="validTimeBegin" label="有效开始时间：">
                {{ dto.validTimeBegin }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="validTimeEnd" label="有效结束时间：">
                {{ dto.validTimeEnd }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="maxAdvanceBookingDays" label="最晚提前预定天数：">
                {{ dto.maxAdvanceBookingDays }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="minAdvanceBookingDays" label="最早提前预定天数：">
                {{ dto.minAdvanceBookingDays }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">运价规则</div>
        <div class="card-box">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="priceSourceType" label="运价来源类型：">
                {{ $t(`AdminService["Enum:TicketPriceSourceType:${dto.priceSourceType}"]`) }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="commissionPoint" label="票面价返点：">
                {{ dto.commissionPoint }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="commissionMoney" label="票面价留钱：">
                {{ dto.commissionMoney }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="ticketPriceFloatingPoint" label="票面价浮动比例：">
                {{ dto.ticketPriceFloatingPoint }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="ticketPriceFloatingMoney" label="票面价浮动金额：">
                {{ dto.ticketPriceFloatingMoney }}
              </el-form-item>
            </el-col>
            <el-col v-if="dto.ticketPrice" :span="6">
              <el-form-item
                prop="ticketPrice"
                label="指定票面价："
              >
                {{ dto.ticketPrice }}
              </el-form-item>
            </el-col>
            <el-col v-if="dto.ticketPriceUpperLimit" :span="6">
              <el-form-item prop="ticketPriceUpperLimit" label="票价上限：">
                {{ dto.ticketPriceUpperLimit }}
              </el-form-item>
            </el-col>
            <el-col v-if="dto.ticketPriceLowerLimit" :span="6">
              <el-form-item prop="ticketPriceLowerLimit" label="票价下限：">
                {{ dto.ticketPriceLowerLimit }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">校验规则</div>
        <div class="card-box">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="generatePnr" label="是否生成PNR：">
                {{ dto.generatePnr ? '是' : '否' }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="useOfficeNo" label="使用OfficeNo：">
                {{ dto.useOfficeNo }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="pata" label="是否PATA验价：">
                {{ dto.pata ? '是' : '否' }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="pataCommand" label="PATA特殊命令：">
                {{ dto.pataCommand }}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="minSeatLeftWhenDisabled" label="禁售最小座位阈值：">
                {{ dto.minSeatLeftWhenDisabled }}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  name: 'PolicyDetail',
  components: { },
  data() {
    return {
      dialogFormVisible: false,
      dto: {}
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handle(detail) {
      this.dialogFormVisible = true
      if (detail) {
        this.dto = JSON.parse(detail)
      }
    },
    convertToWeekdays(binaryNumber) {
      const result = []
      // 取二进制数的最低位第0位）
      var bit1 = binaryNumber & 1
      if (bit1) {
        result.push(bit1)
      }
      // 取二进制数的第2位
      var bit2 = binaryNumber & 2
      if (bit2) {
        result.push(bit2)
      }
      // 取二进制数的第4位
      var bit4 = binaryNumber & 4
      if (bit4) {
        result.push(bit4)
      }
      // 取二进制数的第8位
      var bit8 = binaryNumber & 8
      if (bit8) {
        result.push(bit8)
      }
      // 取二进制数的第16位
      var bit16 = binaryNumber & 16
      if (bit16) {
        result.push(bit16)
      }
      // 取二进制数的第16位
      var bit32 = binaryNumber & 32
      if (bit32) {
        result.push(bit32)
      }
      // 取二进制数的第16位
      var bit64 = binaryNumber & 64
      if (bit64) {
        result.push(bit64)
      }
      return result.map(x => this.$t(`Juzo["Enum:Week:${x}"]`)).join('|')
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
