<template>
  <div class="app-container">
    <div style="margin-left: 50px; color: red">
      温馨提示： 舱位价格实时变动，请在15分钟内支付完成！ 剩余时间：{{ countdown }}
    </div>

    <div class="ticket-price">
      订单金额<em>￥</em><span>{{ orderAmount }}</span>  支付手续费<em>￥</em><span>{{ feesAmount }}</span><el-button v-if="orderAmount === null" type="success" size="mini" :loading="orderAmount === null" icon="el-icon-check" circle />
    </div>

    <div class="payment-container">
      <ul>
        <li>
          <el-radio v-model="paymentMethod" label="1" @input="queryPayChannelAmount()">钱包余额（{{ balance }}）</el-radio>
        </li>
      </ul>

      <div style="margin-top: 50px">
        <el-radio-group v-model="paymentMethod" class="custom-radio" @input="queryPayChannelAmount()">
          <el-radio-button label="2">
            <svg-icon
              icon-class="wechat"
              class="mr-5"
              style="
                color: green;
                font-size: 14px;
                line-height: 14px;
              "
            />微信支付
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div align="center" style="margin-top: 50px">
      <el-button
        type="warning"
        size="medium"
        style="
            background-color: #f59a23;
            border-color: #f59a23;
            width: 200px;
            margin-top: 10px;
          "
        :loading="paymentButtonLoading"
        :disabled="paymentButtonLoading"
        @click="payment()"
      >立即支付
      </el-button>
    </div>

    <el-dialog
      title="请输入密码"
      :visible.sync="centerDialogVisible"
      width="20%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form
        ref="ruleForm"
        status-icon
        :rules="rules"
        :model="ruleForm"
      >
        <el-form-item label="" prop="password">
          <hand-password
            ref="handPassword"
            input-id="handPassword-password"
            :need-validate-pwd="false"
            :max-length="6"
            @inputPwd="inputPassword"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false;">取 消</el-button>
        <el-button
          :loading="paymentButtonLoading"
          :disabled="paymentButtonLoading"
          type="primary"
          @click="submitForm()"
        >确 定
        </el-button>
      </span>
    </el-dialog>

    <PaymentDetail ref="dialog" />
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
import { issueOrderDetail } from '@/api/domestic-tickets/issue-order'
import { changeOrderDetail } from '@/api/domestic-tickets/change-order'
import { financeDetail } from '@/api/domestic-tickets/finance'
import { queryPay, toPay, payCountdown } from '@/api/domestic-tickets/payment'
import PaymentDetail from './payment-detail'
import HandPassword from '@/components/HandPassword/index.vue'
moment.locale('zh-cn')

export default {
  name: 'TicketPayment',
  components: {
    PaymentDetail,
    HandPassword
  },
  data() {
    return {
      loading: false,
      orderAmount: null,
      feesAmount: null,
      paymentNo: '',
      // 支付倒计时
      remainTime: null,
      countDownTimer: null,
      balance: null,
      paymentMethod: '1',
      centerDialogVisible: false,
      paymentButtonLoading: false,
      showPassword: false,
      ruleForm: {
        secretPwd: '',
        password: ''
      },
      rules: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^[^\s\u4e00-\u9fa5]+$/, message: '不允许输入空格、中文等特殊符号' }
        ]
      }
    }
  },
  computed: {
    // 倒计时 计算属性
    countdown() {
      // 计算分钟和秒数
      const minutes = Math.floor(this.remainTime / 60)
      const seconds = this.remainTime % 60

      // 格式化为字符串
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

      return formattedTime
    }
  },
  created() {
    const orderNo = this.$route.query.orderNo
    // 0-出票单 1-改签单
    const orderType = this.$route.query.type
    // 查询订单金额
    if (orderType === '0') {
      issueOrderDetail(orderNo).then((response) => {
        if (response.status === '200') {
          if (response.data.orderStatus !== 0) {
            this.$message({
              type: 'error',
              message: '订单不是待支付状态,无需支付,请查看订单信息详情!'
            })
            this.$router.go(-1)
          }
          // 交易号
          this.paymentNo = response.data.paymentNo
          // 查询一下渠道实付金额
          this.queryPayChannelAmount()
          // 查询一下支付倒计时
          payCountdown(this.paymentNo).then((response) => {
            if (response.status === '200') {
              this.remainTime = response.data.remainTime
              // 设置定时器
              this.countDownTimer = setInterval(() => {
                if (this.remainTime > 0) {
                  this.remainTime--
                }
              }, 1000)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '查询订单信息失败,请重试!'
          })
          this.$router.go(-1)
        }
      })
    } else {
      changeOrderDetail(orderNo).then((response) => {
        if (response.status === '200') {
          // 支付状态校验
          if (response.data.orderStatus !== 1) {
            this.$message({
              type: 'error',
              message: '订单不是待支付状态,无需支付,请查看订单信息详情!'
            })
            this.$router.go(-1)
          }
          this.paymentNo = response.data.paymentNo
          // 查询一下渠道实付金额
          this.queryPayChannelAmount()
          // 查询一下支付倒计时
          payCountdown(this.paymentNo).then((response) => {
            if (response.status === '200') {
              this.remainTime = response.data.remainTime
              // 设置定时器
              this.countDownTimer = setInterval(() => {
                if (this.remainTime > 0) {
                  this.remainTime--
                }
              }, 1000)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '查询订单信息失败,请重试!'
          })
          this.$router.go(-1)
        }
      })
    }

    // 查询一下分销商的余额
    financeDetail().then((response) => {
      if (response.status === '200') {
        this.balance = response.data.walletBalance
      } else {
        this.$message({
          type: 'error',
          message: '查询用户账户余额失败,请重试!'
        })
        this.$router.go(-1)
      }
    })
  },
  mounted() {
  },
  beforeDestroy() {
    // 在组件销毁前停止定时任务，以防止内存泄漏
    clearInterval(this.countDownTimer)
  },
  methods: {
    inputPassword(val) {
      this.ruleForm.password = val
      this.$refs.ruleForm.validateField('password')
    },
    // 查询渠道实付实际金额
    queryPayChannelAmount() {
      this.orderAmount = null
      queryPay({
        tradeNo: this.paymentNo,
        payChannel: this.paymentMethod
      }).then((response) => {
        if (response.status === '200') {
          // 订单金额
          this.orderAmount = response.data.paymentAmount
          this.feesAmount = response.data.feesAmount
        }
      })
    },
    payment() {
      // 如果是账户支付,则开启输出密码
      if (this.paymentMethod === '1') {
        this.centerDialogVisible = true
      } else {
        this.submitPayment()
      }
      // 关闭当前路由
      this.$store.dispatch('tagsView/delView', this.$route)
    },
    // 提交支付
    submitPayment() {
      this.paymentButtonLoading = true
      // 进行支付接口的调用
      const requestBody = {
        tradeNo: this.paymentNo,
        payChannel: this.paymentMethod,
        password: this.ruleForm.password
      }
      toPay(requestBody).then((response) => {
        if (response.status === '200') {
          this.centerDialogVisible = false
          // 判断一下是否需要打开收银台
          if (response.data.isOpenCashier === 0) {
            // 不需要打开,可能直接就是支付成功,弹窗展示支付结果
            this.$refs['dialog'].detail(this.paymentNo)
          } else {
            // 可能是微信之类的需要打开相关信息,给用户支付,弹窗展示
            const base64QRCode = response.data.qrCode
            // const base64QRCode = 'data:image/png;base64,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';
            this.$alert(`<div style="font-size: 18px;color: #333333;font-weight: bold;padding: 30px;margin: 0 50px;border-bottom: 1px solid #ddd;">支付金额:
            <em style="font-size: 18px;font-style: normal;font-weight: bold;color: rgb(217, 0, 27);margin-left: 10px;">￥</em>
            <span style="font-size: 30px;color: rgb(217, 0, 27);font-weight: bold;">${this.orderAmount}</span>
            </div><br/><img src="${base64QRCode}" alt="QR Code" />`, `微信支付二维码,请扫码支付`, {
              dangerouslyUseHTMLString: true,
              showConfirmButton: true,
              confirmButtonText: '我已支付'
            }).then(() => {
              this.$refs['dialog'].detail(this.paymentNo)
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
        this.$set(this.ruleForm, 'password', null)
        this.paymentButtonLoading = false
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submitPayment()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket-price {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    padding: 30px;
    margin: 0 50px;
    border-bottom: 1px solid #ddd;

    em {
        font-size: 18px;
        font-style: normal;
        font-weight: bold;
        color: rgb(217, 0, 27);
        margin-left: 10px;
    }
    span {
        font-size: 30px;
        color: rgb(217, 0, 27);
        font-weight: bold;
    }
}

.payment-container {
    margin: 0 90px;
    ul {
        padding: 0;
        margin: 0;
        border-bottom: 1px dashed #b5c5d5;
        li {
            list-style-type: none;
            padding: 20px;

            span {
                color: rgb(217, 0, 27);
                font-weight: bold;
            }
        }
    }
}

.el-radio.is-bordered {
    border: 1px dashed #1890ff;
}
</style>
