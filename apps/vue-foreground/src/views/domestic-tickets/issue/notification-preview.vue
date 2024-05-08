<template>
    <el-dialog
        width="60%"
        top="5vh"
        :center="true"
        :visible.sync="dialogFormVisible"
        :title="'通知预览'"
    >
        <el-form ref="formRef" :model="detailInfo">
            <div class="card-box" style="padding: 15px 10px">
                <table class="table-bordered first-td-bg" style="width: 100%">
                    <tr>
                        <td colspan="6">联系人</td>
                        <td>
                            <template v-if="detailInfo.contactMessage">
                                <div class="title">
                                    <el-tag>短信</el-tag>
                                </div>
                                <div class="content">
                                    <el-form-item
                                        label=""
                                        prop="contactMessage"
                                        style="width: 100%; margin-left: 0;"
                                    >
                                        <el-input
                                            v-model="detailInfo.contactMessage"
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
                            <template v-if="detailInfo.contactEmail">
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
                                            v-model="detailInfo.contactEmail"
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
                            <template v-if="detailInfo.contactWechat">
                                <div class="title">
                                    <el-tag>邮箱</el-tag>
                                </div>
                                <div class="content">
                                    <el-form-item
                                        label=""
                                        prop="contactWechat"
                                        style="width: 100%"
                                    >
                                        <el-input
                                            v-model="detailInfo.contactWechat"
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
                    </tr>
                    <tr>
                        <td colspan="6">乘机人</td>
                        <td>
                            <template v-if="detailInfo.passengerMessage">
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
                                            v-model="detailInfo.passengerMessage"
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
                            <template v-if="detailInfo.passengerEmail">
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
                                            v-model="detailInfo.passengerEmail"
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
                            <template v-if="detailInfo.passengertWechat">
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
                                            v-model="detailInfo.passengertWechat"
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
                    </tr>
                </table>
            </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button
                type="primary"
                :loading="loading"
                :disabled="loading"
                @click="onHandle()"
            >
                确认通知
            </el-button>
            <el-button @click="dialogFormVisible = false">取消通知</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { fetchList } from '@/api/message/notification-configuration'
import { issueSuccessNotify } from '@/api/domestic-tickets/issue-order'

export default {
  name: 'NotificationPreview',
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      notificationConfig: null,
      detailInfo: {
        contactTemplates: null,
        contactEmail: null,
        contactWechat: null
      },
      orderDetail: null
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    getNotificationConfig() {
      this.loading = true
      fetchList({
        type: 0,
        enabled: true,
        organizationId: this.$store.state.app.user.organizationId,
        page: 1,
        limit: 1000
      }).then((response) => {
        this.loading = false
        if (response) {
          const res = response.items[0]
          for (const key in res.contactTemplates) {
            if (key === '短信') {
              this.$set(this.detailInfo, 'contactMessage', this.replaceStr(res.contactTemplates[key]))
            } else if (key === '邮箱') {
              this.$set(this.detailInfo, 'contactEmail', this.replaceStr(res.contactTemplates[key]))
            } else if (key === '微信') {
              this.$set(this.detailInfo, 'contactWechat', this.replaceStr(res.contactTemplates[key]))
            }
          }
          for (const key in res.passengerTemplates) {
            if (key === '短信') {
              this.$set(this.detailInfo, 'passengerMessage', this.replaceStr(res.passengerTemplates[key]))
            } else if (key === '邮箱') {
              this.$set(this.detailInfo, 'passengerEmail', this.replaceStr(res.passengerTemplates[key]))
            } else if (key === '微信') {
              this.$set(this.detailInfo, 'passengertWechat', this.replaceStr(res.passengerTemplates[key]))
            }
          }
        }
      }).catch(() => {
        this.loading = false
      })
    },
    detail(row) {
      this.getNotificationConfig()
      this.dialogFormVisible = true
      this.orderDetail = Object.assign({}, row)
    },
    replaceStr(message) {
      const placeholders = {
        ticketIssueOrderNo: this.orderDetail.ticketIssueOrderNo,
        carrierTicketNo: this.orderDetail.orderPassengerBOList.map(x => x.carrierTicketNo).join(','),
        contactPhone: this.orderDetail.orderContactBO[0].contactPhone,
        passengers: this.orderDetail.orderPassengerBOList.map(x => x.lastName + x.firstName).join(','),
        flightNo1: this.orderDetail.orderFlightBOList[0].carrierNumber + this.orderDetail.orderFlightBOList[0].flightNumber,
        departureTime1: this.orderDetail.orderFlightBOList[0].departureTime,
        arrivalTime1: this.orderDetail.orderFlightBOList[0].arrivalTime,
        departureCityNameCn1: this.orderDetail.orderFlightBOList[0].departureCityNameCn,
        arrivalCityNameCn1: this.orderDetail.orderFlightBOList[0].arrivalCityNameCn,
        departureAirportName1: this.orderDetail.orderFlightBOList[0].departureAirportName,
        arrivalAirportName1: this.orderDetail.orderFlightBOList[0].arrivalAirportName,
        flightNo2: this.orderDetail.orderFlightBOList.length > 1 ?? this.orderDetail.orderFlightBOList[1].carrierNumber + this.orderDetail.orderFlightBOList[1].flightNumber,
        departureTime2: this.orderDetail.orderFlightBOList.length > 1 ?? this.orderDetail.orderFlightBOList[1].departureTime,
        arrivalTime2: this.orderDetail.orderFlightBOList.length > 1 ?? this.orderDetail.orderFlightBOList[1].arrivalTime,
        departureCityNameCn2: this.orderDetail.orderFlightBOList.length > 1 ?? this.orderDetail.orderFlightBOList[1].departureCityNameCn,
        arrivalCityNameCn2: this.orderDetail.orderFlightBOList.length > 1 ?? this.orderDetail.orderFlightBOList[1].arrivalCityNameCn,
        departureAirportName2: this.orderDetail.orderFlightBOList.length > 1 ?? this.orderDetail.orderFlightBOList[1].departureAirportName,
        arrivalAirportName2: this.orderDetail.orderFlightBOList.length > 1 ?? this.orderDetail.orderFlightBOList[1].arrivalAirportName
      }
      // 替换字符串中的占位符
      const replacedMessage = message.replace(/\[(.*?)\]/g, (match, placeholder) => {
        if (placeholders[placeholder]) {
          return placeholders[placeholder]
        }
        return match
      })
      return replacedMessage
    },
    onHandle() {
      this.$confirm('确定需要对该订单进行出票通知操作么？', '出票通知', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        issueSuccessNotify(this.detail.ticketIssueOrderNo).then((response) => {
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '通知成功!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '通知失败'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .textarea-success-bg.el-textarea.is-disabled .el-textarea__inner{
    color: #606266;
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
</style>
