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
        <div class="card-box">
          <table
            class="table-bordered template-table"
            style="width: 100%"
          >
            <tr>
              <td style="width: 15%">分销商</td>
              <td style="width: 35%">
                <el-form-item prop="ticketAgentId" label="">
                  <el-select
                    v-model="dto.ticketAgentId"
                    clearable
                    :disabled="id ? true: false"
                  >
                    <el-option
                      v-for="option in ticketAgentOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </td>
              <td style="width: 15%">消息类型</td>
              <td>
                <el-form-item prop="type" label="">
                  <el-select v-model="dto.type" clearable>
                    <el-option
                      v-for="option in messageTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>来源</td>
              <td>
                <el-form-item prop="sources" label="">
                  <el-checkbox-group v-model="dto.sources">
                    <el-checkbox
                      v-for="option in sourceOptions"
                      :key="option.value"
                      :label="option.value"
                    >{{ option.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </td>
              <td>状态</td>
              <td>
                <el-form-item prop="enabled" label="">
                  <el-radio-group v-model="dto.enabled">
                    <el-radio
                      v-for="option in messageStatusOptions"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{ option.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>发送时间段</td>
              <td>
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
                  />
                </el-form-item>
              </td>
              <td>发送方式</td>
              <td>
                <el-form-item
                  label=""
                  prop="sendMethods"
                  style="width: 100%"
                >
                  <el-checkbox-group
                    v-model="dto.sendMethods"
                    @change="sendMethodsChange"
                  >
                    <el-checkbox
                      v-for="option in sendMethodOptions"
                      :key="option"
                      :label="option"
                    >{{ option }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title" style="text-align: center">
          <span style="display: inline-block; width: 15%">发送对象</span>
          <span style="display: inline-block; width: 65%">通知模板</span>
          <span style="display: inline-block; width: 20%">是否系统自动</span>
        </div>
        <div class="card-box" style="padding: 15px 10px">
          <table class="table-bordered" style="width: 100%">
            <tr>
              <td colspan="6" style="width: 15%">联系人</td>
              <td style="width: 65%">
                <template v-if="dto.sendMethods.includes('短信')">
                  <div class="title">
                    <el-tag>短信</el-tag>
                  </div>
                  <div class="content">
                    <el-form-item
                      label=""
                      prop="contactMessage"
                      style="width: 100%"
                    >
                      <el-input
                        v-model.trim="dto.contactMessage"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
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
                    >
                      <el-input
                        v-model.trim="dto.contactEmail"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
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
                      prop="contactWechat"
                      style="width: 100%"
                    >
                      <el-input
                        v-model.trim="dto.contactWechat"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
                      />
                    </el-form-item>
                  </div>
                </template>
              </td>
              <td style="width: 20%">
                <el-radio-group v-model="dto.enableContactAutoSend">
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
                    >
                      <el-input
                        v-model.trim="dto.passengerMessage"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
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
                    >
                      <el-input
                        v-model.trim="dto.passengerEmail"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
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
                    >
                      <el-input
                        v-model.trim="dto.passengertWechat"
                        type="textarea"
                        :rows="2"
                        :autosize="{minRows: 2}"
                        placeholder="请输入内容"
                        class="textarea-success-bg"
                      />
                    </el-form-item>
                  </div>
                </template>
              </td>
              <td>
                <el-radio-group v-model="dto.enablePassengerAutoSend">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否（人工触发）</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <el-form-item align="center">
        <el-button v-loading="loading" size="small" type="primary" @click="submitForm()">{{ $t('table.save') }}</el-button>
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
import { ticketAgentList } from '@/api/distribution/agent'
import { createNotificationConfiguration, notificationConfigurationDetail, updateNotificationConfiguration } from '@/api/distribution/notification-configuration'
export default {
  name: 'MessageTemplateCreateUpdate',
  components: {
    RouterBack
  },
  data() {
    return {
      loading: false,
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
      sendTime: ['00:00:00', '00:00:00'],
      dto: {
        type: 0,
        enabled: true,
        sources: [],
        sendMethods: [],
        enableContactAutoSend: false,
        enablePassengerAutoSend: false,
        contactMessage: '',
        passengerMessage: ''
      },
      formRules: {
        organizationId: [
          {
            required: true,
            message: '请选择组织',
            trigger: 'change'
          }
        ],
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
  created() {
    this.getAgents()
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
    getAgents() {
      ticketAgentList({
        page: 1,
        limit: 1000,
        sort: ''
      }).then((response) => {
        if (response) {
          this.ticketAgentOptions = response.items.map(e => ({ value: e.id, label: e.name }))
        }
      })
    },
    getDetail() {
      this.loading = true
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
              this.$set(this.dto, 'contactMessage', this.dto.contactTemplates[key])
            } else if (key === '邮箱') {
              this.$set(this.dto, 'contactEmail', this.dto.contactTemplates[key])
            } else if (key === '微信') {
              this.$set(this.dto, 'contactWechat', this.dto.contactTemplates[key])
            }
          }
          for (const key in response.passengerTemplates) {
            if (key === '短信') {
              this.$set(this.dto, 'passengerMessage', this.dto.passengerTemplates[key])
            } else if (key === '邮箱') {
              this.$set(this.dto, 'passengerEmail', this.dto.passengerTemplates[key])
            } else if (key === '微信') {
              this.$set(this.dto, 'passengertWechat', this.dto.passengerTemplates[key])
            }
          }
          this.sendTime = [response.sendTimeBegin, response.sendTimeEnd]
        }
        this.loading = false
      }).catch((error) => {
        this.loading = false
        throw error
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
      }
      for (let i = 0; i < binaryDigits.length; i++) {
        if (binaryDigits[i] === '1') {
          result.push(Math.pow(2, binaryDigits.length - 1 - i))
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
          this.loading = true
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
            updateNotificationConfiguration(this.dto).then(response => {
              this.loading = false
              this.$store.dispatch('tagsView/delView', this.$route)
              if (response) {
                this.result()
              }
            }).catch((error) => {
              this.loading = false
              throw error
            })
          } else {
            createNotificationConfiguration(this.dto).then(response => {
              this.loading = false
              if (response) {
                this.result()
              }
            }).catch((error) => {
              this.loading = false
              throw error
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
      this.$router.push(`/distribution/notification-configuration`)
    }
  }
}
</script>
<style lang="scss">
  .table-bordered {
    border-spacing: 0;
    tr td {
      font-size: 12px;
    }
  }
</style>
<style lang="scss" scoped>
  table tr td {
    &:first-child {
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
.el-form-item {
    margin-bottom: 0;
}
</style>
