
<template>
  <el-dialog width="70%" top="5vh" :visible.sync="dialogFormVisible" title="退票订单发送消息">

    <div class="app-container">
      <div>
        <el-button type="primary" @click="sendMessage()">发送短信</el-button>
        <el-button type="primary" @click="sendEmail()">发送邮件</el-button>
      </div>
      <div class="custom-card">
        <div class="card-title">乘客信息</div>
        <el-table
          :data="orderPassengeList"
          border
          style="width: 100%"
          @selection-change="handleOrderPassengeSelectionChange"
        >
          <el-table-column type="selection" selection-align="center" />
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <span v-show="false"> {{ scope.row.passengerId }}</span>
              {{ scope.row.lastName }}{{ scope.row.firstName }}
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.phone" />
            </template>
          </el-table-column>
          <el-table-column label="邮箱">
            <template slot-scope="scope">
              <el-input v-model="scope.row.email" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="custom-card">
        <div class="card-title">联系人信息</div>

        <el-table
          :data="orderContact"
          border
          style="width: 100%"
          @selection-change="handleOrderContactSelectionChange"
        >
          <el-table-column type="selection" selection-align="center" />
          <el-table-column label="联系人">
            <template slot-scope="scope">
              {{ scope.row.contactName }}
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.contactPhone" />
            </template>
          </el-table-column>
          <el-table-column label="邮箱">
            <template slot-scope="scope">
              <el-input v-model="scope.row.contactEmail" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="custom-card">
        <div class="card-title">历史发送记录</div>
        <el-table :data="messageList" border style="width: 100%">
          <el-table-column width="100" label="发送时间" prop="sendTimeUtc" />
          <el-table-column width="100" label="发送对象" prop="target" />
          <el-table-column width="50" label="消息类型" prop="method" />
          <el-table-column width="180" label="消息主题" prop="title" />
          <el-table-column width="180" label="消息内容" prop="content" />
          <el-table-column width="180" label="消息发送状态" prop="success" />
          <el-table-column width="180" label="失败原因" prop="failureReason" />
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script>

import { refundSuccessNotify } from '@/api/agent/refund-order'
import { getSMSByOrderNo } from '@/api/distribution/ticket-agent-order-notification'

export default {
    name: 'RefundSendMessage',
    components: {
    },
    data() {
        return {
            orderPassengeList: [],
            orderContact: [],
            messageList: [],
            dialogFormVisible: false,
            ticketRefundOrderNo: '',
            orderPassengeSelectedList: [],
            orderContactSelectedList: [],
            messageData: {
                orderNo: '',
                method: 0,
                contactPhoneList: [],
                passengerPhoneList: [{
                    id: '',
                    phone: ''
                }]
            },
            pessengerPhone: {
                id: '',
                phone: ''
            }
        }
    },
    created() {
        this.getMessageList()
    },
    mounted() {
    },
    methods: {
        handleOrderPassengeSelectionChange(val) {
            this.orderPassengeSelectedList = val
        },
        handleOrderContactSelectionChange(val) {
            this.orderContactSelectedList = val
        },
        handleOpen(detail) {
            this.dialogFormVisible = true
            this.ticketRefundOrderNo = detail.ticketRefundOrderNo
            this.orderPassengeList = detail.refundTicketBOList.map(obj => ({ ...obj }))
            this.orderContact = detail.orderContactBO.map(obj => ({ ...obj }))
            this.getMessageList()
        },
        sendMessage() {
            if (Array.isArray(this.orderPassengeSelectedList) && this.orderPassengeSelectedList.length === 0 &&
            Array.isArray(this.orderContactSelectedList) && this.orderContactSelectedList.length === 0) {
                this.$message({
                    type: 'error',
                    message: '请至少选择一个发送的对象'
                })
            } else {
                this.messageData.orderNo = this.ticketRefundOrderNo
                this.messageData.method = 0
                this.messageData.passengerPhoneList = []
                this.orderPassengeSelectedList.forEach(element => {
                    this.pessengerPhone = {}
                    this.pessengerPhone.id = element.passengerId
                    this.pessengerPhone.phone = element.phone
                    if (element.phone) {
                    this.messageData.passengerPhoneList.push(this.pessengerPhone)
                    }
                })
                this.messageData.contactPhoneList = []
                this.orderContactSelectedList.forEach(element => {
                    this.messageData.contactPhoneList.push(element.contactPhone)
                })

                // console.log('*********this.messageData', this.messageData)

                this.$confirm('确定需要对该订单进行出票发送短信通知操作么？', '发送短信通知', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                  refundSuccessNotify(this.messageData).then((response) => {
                        if (response.status === '200') {
                            this.$message({
                                type: 'success',
                                message: '发送通知成功!'
                            })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '发送通知失败'
                        })
                    })
                })
            }
        },
        sendEmail() {
            if (Array.isArray(this.orderPassengeSelectedList) && this.orderPassengeSelectedList.length === 0 &&
            Array.isArray(this.orderContactSelectedList) && this.orderContactSelectedList.length === 0) {
                this.$message({
                    type: 'error',
                    message: '请至少选择一个发送的对象'
                })
            } else {
                this.messageData.orderNo = this.ticketRefundOrderNo
                this.messageData.method = 1
                this.messageData.passengerPhoneList = []
                this.orderPassengeSelectedList.forEach(element => {
                    this.pessengerPhone = {}
                    this.pessengerPhone.id = element.passengerId
                    this.pessengerPhone.phone = element.email
                    if (element.email) {
                        this.messageData.passengerPhoneList.push(this.pessengerPhone)
                    }
                })
                this.messageData.contactPhoneList = []
                this.orderContactSelectedList.forEach(element => {
                    this.messageData.contactPhoneList.push(element.contactEmail)
                })

                // console.log('*********this.messageData', this.messageData)

                this.$confirm('确定需要对该订单进行出票发送邮件通知操作么？', '发送邮件通知', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                  refundSuccessNotify(this.messageData).then((response) => {
                        if (response.status === '200') {
                            this.$message({
                                type: 'success',
                                message: '发送邮件通知成功!'
                            })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '发送邮件通知失败'
                        })
                    })
                })
            }
        },
        getMessageList() {
            // console.log()
            getSMSByOrderNo(this.ticketRefundOrderNo).then((response) => {
                if (response) {
                    this.messageList = response.items
                }
            }).catch(() => {

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
