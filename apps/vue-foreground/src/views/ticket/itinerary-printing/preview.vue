<template>
  <el-dialog
    width="80%"
    :visible.sync="dialogVisible"
    title=""
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :inline="true"
      class="demo-form-inline form-inline-label-125"
    >
      <el-carousel :autoplay="false" arrow="always" trigger="click">
        <el-carousel-item v-for="item in previewList" :key="item">
          <div>
            <table style="border: 1px solid #e2e3e4; width: 100%">
              <tr class="border-bottom">
                <td>旅客姓名</td>
                <td colspan="3">
                  <el-form-item
                    label=""
                    prop="passengerName"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.passengerName"
                      clearable
                    />
                  </el-form-item>
                </td>
                <td>有效身份证件号码</td>
                <td colspan="2">
                  <el-form-item
                    label=""
                    prop="cardNum"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.cardNum"
                      clearable
                    />
                  </el-form-item>
                </td>
                <td style="text-align: right">签注</td>
                <td colspan="3">
                  <el-form-item
                    label=""
                    prop="endorsement"
                    style="margin-bottom: 0"
                  >
                    <el-select
                      v-model="item.endorsement"
                      clearable
                      placeholder="签注"
                    >
                      <el-option
                        v-for="env in endorsementOptions"
                        :key="env.value"
                        :value="env.value"
                        :label="env.label"
                      />
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>订座记录</td>
                <td>
                  <el-form-item
                    label=""
                    prop="bookingRecord"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.bookingRecord"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>承运人</td>
                <td>航班号</td>
                <td>舱位等级</td>
                <td>日期</td>
                <td>时间</td>
                <td>票价级别/客票类别</td>
                <td>客票生效日期</td>
                <td>有效截止日期</td>
                <td>免费行李</td>
              </tr>
              <tr>
                <td>自FROM</td>
                <td>
                  <el-form-item
                    label=""
                    prop="fromBook"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.fromBook"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="fromCarrier"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.fromCarrier"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="fromFlightNo"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.fromFlightNo"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="fromLevel"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.fromLevel"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="fromDate"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.fromDate"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="fromTime"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.fromTime"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="fromTicketLevel"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.fromTicketLevel"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="fromValidDate"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.fromValidDate"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="effectiveDeadline"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.effectiveDeadline"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="freeBaggage"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.freeBaggage"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>至TO</td>
                <td>
                  <el-form-item
                    label=""
                    prop="toBook"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toBook"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toCarrier"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toCarrier"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toFlightNo"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toFlightNo"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toLevel"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toLevel"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toDate"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toDate"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toTime"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toTime"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toTicketLevel"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toTicketLevel"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toValidDate"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toValidDate"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toEffectiveDeadline"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toEffectiveDeadline"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toFreeBaggage"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toFreeBaggage"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>至TO</td>
                <td>
                  <el-form-item
                    label=""
                    prop="toxCarrier"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toxCarrier"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item
                    label=""
                    prop="toxFlightNo"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.toxFlightNo"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td colspan="8">
                  <div class="div-flex">
                    <div class="flex">
                      票面
                      <el-form-item
                        label=""
                        prop="ticketPrice"
                        style="margin-bottom: 0"
                      >
                        <el-input
                          v-model="item.ticketPrice"
                          style="width: 120px"
                        >
                          <template
                            slot="prepend"
                          >CNY</template>
                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="flex">
                      机建
                      <el-form-item
                        label=""
                        prop="airportTax"
                        style="margin-bottom: 0"
                      >
                        <el-input
                          v-model="item.airportTax"
                          style="width: 120px"
                        >
                          <template
                            slot="prepend"
                          >CN</template>
                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="flex">
                      税费
                      <el-form-item
                        label=""
                        prop="oilFee"
                        style="margin-bottom: 0"
                      >
                        <el-input
                          v-model="item.oilFee"
                          style="width: 120px"
                        >
                          <template
                            slot="prepend"
                          >YQ</template>
                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="flex">
                      其他
                      <el-form-item
                        label=""
                        prop="other"
                        style="margin-bottom: 0"
                      >
                        <el-input
                          v-model="item.other"
                          style="width: 120px"
                        >
                          <template
                            slot="prepend"
                          />
                        </el-input>
                      </el-form-item>
                    </div>
                    <div class="flex">
                      合计
                      <el-form-item
                        label=""
                        prop="total"
                        style="margin-bottom: 0"
                      >
                        <el-input
                          v-model="item.total"
                          style="width: 150px"
                        >
                          <template
                            slot="prepend"
                          >CNY</template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="border-bottom">
                <td>电子客票号码</td>
                <td>
                  <el-form-item
                    label=""
                    prop="electronicTicketNumber"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="
                        item.electronicTicketNumber
                      "
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td class="align-right">验证码</td>
                <td colspan="2">
                  <el-form-item
                    label=""
                    prop="validCode"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.validCode"
                      clearable
                    />
                  </el-form-item>
                </td>
                <td class="align-right">提示信息</td>
                <td colspan="3">
                  <el-form-item
                    label=""
                    prop="tip"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.tip"
                      clearable
                    />
                  </el-form-item>
                </td>
                <td class="align-right">保险费</td>
                <td>
                  <el-form-item
                    label=""
                    prop="insurancePremium"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.insurancePremium"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>销售单位代号</td>
                <td>
                  <el-form-item
                    label=""
                    prop="salesUnitCode"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="
                        item.salesUnitCode
                      "
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td class="align-left" colspan="7">填开单位</td>
                <td class="align-left" colspan="2">填开日期</td>
              </tr>
              <tr>
                <td>AGENT CODE</td>
                <td>
                  <el-form-item
                    label=""
                    prop="code"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.code"
                      clearable
                      style="width: 100px"
                    />
                  </el-form-item>
                </td>
                <td class="align-left" colspan="7">
                  <el-form-item
                    label=""
                    prop="unit"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.unit"
                      clearable
                      style="width: 80%"
                    />
                  </el-form-item>
                </td>
                <td class="align-left" colspan="2">
                  <el-form-item
                    label=""
                    prop="date"
                    style="margin-bottom: 0"
                  >
                    <el-input
                      v-model="item.date"
                      clearable
                      style="width: 200px"
                    />
                  </el-form-item>
                </td>
              </tr>
            </table>
            <div class="mt-10 tip" style="border: 1px solid #e2e3e4;">
              <p>温馨提示：</p>
              <p>1、如果没有安装打印控件或没有安装字体点击此处[下载安装]，第一次使用请务必阅读[行程单打印使用说明]</p>
              <p>2、如果您发现行程单上的内容有误，请点击[发送错误报告]</p>
              <p>3、如果没有出票的PNR请单击乘机人姓名，然后核对行程单数据，即可打印。</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-form>
  </el-dialog>
</template>

<script>
import EndorsementEnum from '@/enum/Endorsement'
import { issueOrderGetTicketPrintInfo } from '@/api/domestic-tickets/issue-order'

export default {
  name: 'Preview',
  components: {
  },
  data() {
    return {
      dialogVisible: false,
      endorsementOptions: [{
        endorsement: 1
      }],
      previewList: []
    }
  },
  created() {
  },
  mounted() {
    this.endorsementOptions = Object.keys(EndorsementEnum.Endorsement).map(key => ({
      value: EndorsementEnum.Endorsement[key],
      label: this.$t(`AdminService["Enum:Endorsement:${EndorsementEnum.Endorsement[key]}"]`)
    }))
  },
  methods: {
    handle(rows) {
      // 集合查询
      console.log(rows)
      issueOrderGetTicketPrintInfo(rows).then((response) => {
        console.log(response)
        if (response.status === '200') {
          this.dialogVisible = true
          this.previewList = response.data
        } else {
          this.$message.error(response.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
table {
    tr {
        .el-form-item--mini .el-form-item__label {
            line-height: 32px !important;
        }
        td {
          padding: 0 5px;
            &.align-right {
                text-align: right;
            }
            &.align-left {
                text-align: left;
            }
        }
        &.border-bottom {
            td {
                border-bottom: 1px solid #e2e3e4;
            }
        }
    }
}
.tip{
  padding: 0 10px;
  p{
    line-height: 10px;
    font-size: 12px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #eff4f4;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #eff4f4;
}
</style>
