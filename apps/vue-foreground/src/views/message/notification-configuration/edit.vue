<template>
  <div class="app-container">
    <el-form
      ref="formRef"
      :model="dto"
      :rules="formRules"
      :inline="true"
      class="demo-form-inline"
    >
      <div class="custom-card">
        <div class="card-title">信息设置</div>
        <div class="card-box" style="padding: 15px 10px">
          <div class="form-container-cell" style="width: 100%">
            <div class="form-item-row">
              <div class="form-item-cell">消息类型</div>
              <div class="form-item-cell">
                <el-form-item label="">
                  <el-select
                    v-model="dto.type"
                    prop="type"
                    clearable
                    disabled
                  >
                    <el-option
                      v-for="option in messageTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="form-item-cell">状态</div>
              <div class="form-item-cell">
                <el-form-item prop="enabled" label="">
                  <el-radio-group v-model="dto.enabled" disabled>
                    <el-radio
                      v-for="option in messageStatusOptions"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{ option.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="form-item-row">
              <div class="form-item-cell">来源</div>
              <div class="form-item-cell">
                <el-form-item prop="sources" label="">
                  <el-checkbox-group v-model="dto.sources" disabled>
                    <el-checkbox
                      v-for="option in sourceOptions"
                      :key="option.value"
                      :label="option.value"
                    >{{ option.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
              <div class="form-item-cell">发送方式</div>
              <div class="form-item-cell">
                <el-form-item
                  label=""
                  prop="sendMethods"
                  style="width: 100%"
                >
                  <el-checkbox-group
                    v-model="dto.sendMethods"
                    disabled
                    @change="sendMethodsChange"
                  >
                    <el-checkbox
                      v-for="option in sendMethodOptions"
                      :key="option"
                      :label="option"
                    >{{ option }}
                  </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
            <div class="form-item-row">
              <div class="form-item-cell">发送时间段</div>
              <div class="form-item-cell">
                <el-form-item
                  label=""
                  :rules="{
                    required: true,
                    message: '请选择发送时间段',
                  }"
                >
                  <el-time-picker
                    v-model="sendTime"
                    is-range
                    value-format="HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                    disabled
                  />
                </el-form-item>
              </div>
              <div class="form-item-cell" />
              <div class="form-item-cell" />
            </div>
          </div>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">
          <span style="display: inline-block; width: 15%;">发送对象</span>
          <span style="display: inline-block; width: 65%;">通知模板</span>
          <span style="display: inline-block; width: 20%;">是否系统自动</span>
        </div>
        <div class="card-box" style="padding: 15px 10px">
          <table
            class="table-bordered first-td-bg"
            style="width: 100%"
          >
            <tr>
              <td colspan="6">联系人</td>
              <td>
                <template v-if="dto.sendMethods.includes('短信')">
                  <div class="title">
                    <el-tag>短信</el-tag>
                  </div>
                  <div class="content">
                    <el-form-item
                      label=""
                      prop="contactMessage"
                      style="width: 100%"
                      :rules="[
                        {
                          required: messageValidate,
                          message:'请输入联系人通知短信内容',
                        },
                      ]"
                    >
                      <el-input
                        v-model="dto.contactMessage"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
                        disabled
                      />
                    </el-form-item>
                  </div>
                </template>
                <template v-if="dto.sendMethods.includes('邮箱')">
                  <div class="title">
                    <el-tag>邮箱</el-tag>
                  </div>
                  <div class="content">
                    <el-form-item
                      label=""
                      prop="contactEmail"
                      style="width: 100%"
                      :rules="[
                        {
                          required: emailValidate,
                          message: '请输入联系人通知邮箱内容',
                        },
                      ]"
                    >
                      <el-input
                        v-model="dto.contactEmail"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
                        disabled
                      />
                    </el-form-item>
                  </div>
                </template>
                <template v-if="dto.sendMethods.includes('邮箱')">
                  <div class="title">
                    <el-tag>邮箱</el-tag>
                  </div>
                  <div class="content">
                    <el-form-item
                      label=""
                      prop="contactWechat"
                      style="width: 100%"
                      :rules="[
                        {
                          required: wechatValidate,
                          message: '请输入联系人通知微信内容',
                        },
                      ]"
                    >
                      <el-input
                        v-model="dto.contactWechat"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
                        disabled
                      />
                    </el-form-item>
                  </div>
                </template>
              </td>
              <td style="width: 300px">
                <el-radio-group v-model="dto.enableContactAutoSend" disabled>
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否（人工触发）</el-radio>
                </el-radio-group>
              </td>
            </tr>
            <tr>
              <td colspan="6">乘机人</td>
              <td>
                <template v-if="dto.sendMethods.includes('短信')">
                  <div class="title">
                    <el-tag>短信</el-tag>
                  </div>
                  <div class="content">
                    <el-form-item
                      label=""
                      prop="passengerMessage"
                      style="width: 100%"
                      :rules="[
                        {
                          required: messageValidate,
                          message: '请输入乘机人通知短信内容',
                        },
                      ]"
                    >
                      <el-input
                        v-model="dto.passengerMessage"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
                        disabled
                      />
                    </el-form-item>
                  </div>
                </template>
                <template v-if="dto.sendMethods.includes('邮箱')">
                  <div class="title">
                    <el-tag>邮箱</el-tag>
                  </div>
                  <div class="content">
                    <el-form-item
                      label=""
                      prop="passengerEmail"
                      style="width: 100%"
                      :rules="[
                        {
                          required: emailValidate,
                          message: '请输入乘机人通知邮箱内容',
                        },
                      ]"
                    >
                      <el-input
                        v-model="dto.passengerEmail"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
                        disabled
                      />
                    </el-form-item>
                  </div>
                </template>
                <template v-if="dto.sendMethods.includes('微信')">
                  <div class="title">
                    <el-tag>微信</el-tag>
                  </div>
                  <div class="content">
                    <el-form-item
                      label=""
                      prop="passengertWechat"
                      style="width: 100%"
                      :rules="[
                        {
                          required: wechatValidate,
                          message: '请输入乘机人通知微信内容',
                        },
                      ]"
                    >
                      <el-input
                        v-model="dto.passengertWechat"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
                        disabled
                      />
                    </el-form-item>
                  </div>
                </template>
              </td>
              <td style="width: 300px">
                <el-radio-group v-model="dto.enablePassengerAutoSend" disabled>
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否（人工触发）</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <el-form-item align="center">
        <!-- <el-button
          :loading="fullScreenLoading"
          size="small"
          type="primary"
          @click="submitForm()"
          >{{ $t('table.save') }}
        </el-button> -->
        <routerBack />
      </el-form-item>
      <div class="custom-card">
        <div class="card-title">模板字段</div>
        <div class="card-box" style="padding: 15px 10px">
          <table
            class="table-bordered template-table"
            style="width: 100%"
          >
            <tr>
              <td>[ticketIssueOrderNo] ：出票订单号</td>
              <td>例：IJZ5462136523</td>
              <td>[carrierTicketNo] ：票号</td>
              <td>例：784-2533250697</td>
              <td>[passengers] ：旅客姓名</td>
              <td>例：陈晓</td>
            </tr>
            <tr>
              <td>[contactName] ：联系人</td>
              <td>例：张三</td>
              <td>[contactPhone] ：联系人手机</td>
              <td>例：18406615060</td>
              <td />
              <td />
            </tr>
            <tr>
              <td>[flightNo1] ：第一程航班号</td>
              <td>例：CZ5623</td>
              <td>[departureTime1] ：第一程出发时间</td>
              <td>例：2024-03-09 09:05:00</td>
              <td>[arrivalTime1] 第一程到达时间</td>
              <td>例：2024-03-09 11:45:00</td>
            </tr>
            <tr>
              <td>[departureCityNameCn1] ：第一程出发城市</td>
              <td>例：广州</td>
              <td>[arrivalCityNameCn1] ：第一程到达城市</td>
              <td>例：成都</td>
              <td>[departureAirportName1] ：第一程出发机场</td>
              <td>例：广州白云机场</td>
            </tr>
            <tr>
              <td>[arrivalAirportName1] ：第一程到达机场</td>
              <td>例：双流机场</td>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td>[flightNo2] ：第二程航班号</td>
              <td>例：CZ5603</td>
              <td>[departureTime2] ：第二程出发时间</td>
              <td>例：2024-03-11 09:05:00</td>
              <td>[arrivalTime2] 第二程到达时间</td>
              <td>例：2024-03-11 11:45:00</td>
            </tr>
            <tr>
              <td>[departureCityNameCn2] ：第二程出发城市</td>
              <td>例：成都</td>
              <td>[arrivalCityNameCn2] ：第二程到达城市</td>
              <td>例：广州</td>
              <td>[departureAirportName2] ：第二程出发机场</td>
              <td>例：双流机场</td>
            </tr>
            <tr>
              <td>[arrivalAirportName2] ：第二程到达机场</td>
              <td>例：广州白云机场</td>
              <td />
              <td />
              <td />
              <td />
            </tr>
          </table>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import RouterBack from '@/components/RouterBack/index.vue'
import TicketAgentNotificationTypeEnum from '@/enum/TicketAgentNotificationType'
import TicketOrderSourceFlagTypeEnum from '@/enum/TicketOrderSourceFlagType'
import { notificationConfigurationDetail, updateNotificationConfiguration } from '@/api/message/notification-configuration'

export default {
  name: 'MessageNotificationCreateUpdate',
  components: {
    RouterBack
  },
  data() {
    return {
      fullScreenLoading: false,
      id: '',
      messageStatusOptions: [
        {
          value: true,
          label: '开启'
        }, {
          value: false,
          label: '关闭'
        }
      ],
      messageTypeOptions: [],
      ticketAgentOptions: [],
      sourceOptions: [],
      sendMethodOptions: ['短信', '邮箱', '微信'],
      messageValidate: false,
      emailValidate: false,
      wechatValidate: false,
      sendTime: [],
      dto: {
        type: 0,
        enabled: true,
        sources: [],
        sendMethods: [],
        enableContactAutoSend: false,
        enablePassengerAutoSend: false
      },
      formRules: {
        type: [
          {
            required: true,
            message: '请选择消息类型',
            trigger: 'change'
          }
        ],
        sources: [
          {
            required: true,
            message: '请输入来源',
            trigger: 'change'
          }
        ],
        sendMethods: [
          {
            required: true,
            message: '请选择发送方式',
            trigger: 'change'
          }
        ]
      }
    }
  },
  mounted() {
    this.messageTypeOptions = Object.keys(TicketAgentNotificationTypeEnum.TicketAgentNotificationType).map(key => ({
      value: TicketAgentNotificationTypeEnum.TicketAgentNotificationType[key],
      label: this.$t(`AdminService["Enum:TicketAgentNotificationType:${TicketAgentNotificationTypeEnum.TicketAgentNotificationType[key]}"]`)
    }))
    this.sourceOptions = Object.keys(TicketOrderSourceFlagTypeEnum.TicketOrderSourceFlagType).map(key => ({
      value: TicketOrderSourceFlagTypeEnum.TicketOrderSourceFlagType[key],
      label: this.$t(`AdminService["Enum:TicketOrderSourceFlagType:${TicketOrderSourceFlagTypeEnum.TicketOrderSourceFlagType[key]}"]`)
    }))
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      notificationConfigurationDetail(this.id).then((response) => {
        if (response) {
          this.dto = response
          this.dto.sendMethods = response.sendMethods.split('|')
          if (response.sources === 0) {
            this.dto.sources = []
          } else {
            this.dto.sources = this.ticketOrderSourceFlagType(response.sources)
          }
          for (const key in response.contactTemplates) {
            if (key === '短信') {
              this.dto.contactMessage = this.dto.contactTemplates[key]
              this.messageValidate = true
            } else if (key === '邮箱') {
              this.dto.contactEmail = this.dto.contactTemplates[key]
              this.emailValidate = true
            } else if (key === '微信') {
              this.dto.contactWechat = this.dto.contactTemplates[key]
              this.wechatValidate = true
            }
          }
          for (const key in response.passengerTemplates) {
            if (key === '短信') {
              this.dto.passengerMessage = this.dto.passengerTemplates[key]
              this.messageValidate = true
            } else if (key === '邮箱') {
              this.dto.passengerEmail = this.dto.passengerTemplates[key]
              this.emailValidate = true
            } else if (key === '微信') {
              this.dto.passengertWechat = this.dto.passengerTemplates[key]
              this.wechatValidate = true
            }
          }
          this.sendTime = [response.sendTimeBegin, response.sendTimeEnd]
        }
      })
    },
    ticketOrderSourceFlagType(sourceValue) {
      // 将数字转换为二进制字符串
      const binaryString = sourceValue.toString(2)
      // 将二进制字符串拆分为单个数字
      const binaryDigits = binaryString.split('')
      const result = []
      if (binaryString === '0') {
        result.push(parseInt(binaryString))
      } else {
        for (let i = 0; i < binaryDigits.length; i++) {
          if (binaryDigits[i] === '1') {
            result.push(Math.pow(2, binaryDigits.length - 1 - i))
          }
        }
      }
      return result
    },
    sendMethodsChange(value) {
      this.messageValidate = value.some((method) => method.includes('短信'))
      this.emailValidate = value.some((method) => method.includes('邮箱'))
      this.wechatValidate = value.some((method) => method.includes('微信'))
    },
    submitForm() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.fullScreenLoading = true
          this.dto.sendMethods = this.dto.sendMethods.join('|')
          if (this.dto.contactMessage) {
            this.dto.contactTemplates = { '短信': this.dto.contactMessage }
          }
          if (this.dto.contactEmail) {
            this.dto.contactTemplates['邮箱'] = this.dto.contactEmail
          }
          if (this.dto.contactWechat) {
            this.dto.contactTemplates['微信'] = this.dto.contactWechat
          }
          if (this.dto.passengerMessage) {
            this.dto.passengerTemplates = { '短信': this.dto.passengerMessage }
          }
          if (this.dto.passengerEmail) {
            this.dto.passengerTemplates['邮箱'] = this.dto.passengerEmail
          }
          if (this.dto.passengertWechat) {
            this.dto.passengerTemplates['微信'] = this.dto.passengertWechat
          }
          if (this.dto.sources.length === 0) {
            this.dto.sources = 0
          } else {
            const soures = this.dto.sources.reduce((accumulator, currentValue) => accumulator + currentValue)
            this.dto.sources = soures
          }
          this.dto.sendTimeBegin = this.sendTime[0]
          this.dto.sendTimeEnd = this.sendTime[1]
          if (this.id) {
            this.dto.organizationId = this.$store.state.app.user.organizationId
            updateNotificationConfiguration(this.dto).then(response => {
              this.fullScreenLoading = false
              this.$store.dispatch('tagsView/delView', this.$route)
              if (response) {
                this.result()
              }
            })
          }
        }
      })
    },
    result() {
      this.$notify({
        title: this.$i18n.t("AdminService['Success']"),
        message: this.$i18n.t("AdminService['SuccessMessage']"),
        type: 'success',
        duration: 2000
      })
      this.$router.push(`/message/notification-configuration`)
    }
  }
}
</script>
<style lang="scss">
  .textarea-success-bg.el-textarea.is-disabled .el-textarea__inner{
    color: #606266;
  }
  .table-bordered {
    tr td {
      font-size: 12px;
    }
  }
  table tr td:first-child,
  .table-bordered tr td:nth-child(1),
  .table-bordered tr td:nth-child(3),
  .table-bordered tr td:nth-child(5)  {
    font-size: 12px !important;
  }
</style>
<style lang="scss" scoped>
.custom-box {
    padding: 20px 0 0;
    border: 1px dashed lightblue;
    margin: 10px 0;
}

table tr td {
    &:first-child {
        font-size: 14px;
        color: #606266;
        text-align: center;
    }
    &:last-child {
        padding: 10px;
    }
    .title {
        margin-bottom: 10px;
    }
    .content {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
}
table tr:last-child td {
    border-bottom: 1px solid var(--devui-dividing-line, #eef0f5);
}
</style>
