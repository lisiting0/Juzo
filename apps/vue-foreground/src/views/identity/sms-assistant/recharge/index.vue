<template>
  <div class="app-container">
    <el-form
      :model="detail"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <div class="top-panel">
        <el-form-item label="用户名">{{ detail.agentOrganizationName }}</el-form-item>
        <el-form-item label="短信余额">{{ detail.shortMessageBalance }} </el-form-item>
        <el-form-item
          label="短信价格"
        ><span class="blue-bold-text">0.1元/条</span></el-form-item>
        <el-form-item
          label="可用短信数量"
        ><span class="blue-bold-text">{{ detail.shortMessageBalance * 10 }}</span>
        </el-form-item>
        <el-form-item label="充值金额">
          <el-input
            v-model="rechargeAmount"
            clearable
            style="width: 10%"
          />
        </el-form-item>
      </div>
      <div class="bottom-panel">
        <el-form-item label="请选择支付方式" />
        <el-form-item label="">
          <el-radio
            v-model="paymentMethod"
            label="1"
          >账户余额（<span>{{ detail.walletBalance }}</span>）
          </el-radio>
        </el-form-item>
        <el-form-item label="">
          <el-radio v-model="paymentMethod" label="2" border><svg-icon icon-class="wechat" class="mr-5" style="color: green;font-size: 16px;line-height: 16px;" />微信支付</el-radio>
        </el-form-item>
      </div>
    </el-form>
    <div class="btn-panel">
      <el-button type="primary" size="small" :loading="paymentButtonLoading" @click="recharge">
        去支付
      </el-button>
    </div>

    <el-dialog
      :visible.sync="centerDialogVisible"
      title="请输入密码"
      width="20%"
      :center="true"
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
            inputId="handPassword-password"
            :maxLength="6"
            :needValidatePwd="false"
            @inputPwd="inputPassword"
          ></hand-password>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 支付结果展示信息 -->
    <el-dialog
      width="30%"
      :visible.sync="paymentDetailDialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form
        ref="formRef"
        :label-position="'right'"
        label-width="100px"
        :model="detailInfo"
      >
        <el-form-item label="支付流水号">
          {{ detailInfo.tradeNo }}
        </el-form-item>
        <el-form-item label="支付金额">
          {{ rechargeAmount }}
        </el-form-item>
        <el-form-item v-if="detailInfo.payChannel != null" label="支付方式">
          微信支付
        </el-form-item>
        <el-form-item label="支付状态">
          {{ $t(`AdminService["Enum:TradeStatus:${detailInfo.tradePayStatus}"]`) }}
          <el-button type="success" size="mini" :loading="true" icon="el-icon-check" circle />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="stopTimer"> 关闭 </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { agentBalanceQuery, agentShortMessageRecharge } from '@/api/identity/agent-balance'
  import { payDetail } from '@/api/domestic-tickets/payment'
import HandPassword from '@/components/HandPassword/index.vue'

export default {
  name: 'Recharge',
  components: {
    HandPassword
  },
  data() {
    return {
      timer: null,
      loading: false,
      detail: {
      },
      paymentMethod: '1',
      rechargeAmount: '',
      password: '',
      centerDialogVisible: false,
      paymentButtonLoading: false,
      ruleForm: {
        password: ''
      },
      rules: {
        password: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入密码'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },

      paymentDetailDialogVisible: false,
      paymentNo: '',
      detailInfo: {}
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {
  },
  beforeDestroy() {
    // 在组件销毁前停止定时任务，以防止内存泄漏
    this.stopTimer()
  },
  methods: {
    inputPassword(val) {
      this.ruleForm.password = val
      this.$refs.ruleForm.validateField('password')
    },
    getDetail() {
      this.loading = true
      agentBalanceQuery().then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.detail = response.data
        }
      }).catch(() => {
        this.loading = false
      })
    },
    submitPayment() {
      this.paymentButtonLoading = true
      agentShortMessageRecharge(
        {
          amount: this.rechargeAmount,
          payChannelType: this.paymentMethod,
          password: this.ruleForm.password
        }
      ).then((response) => {
        if (response.status === '200') {
          // 需要区分是账户余额支付 还是 微信支付的
          if (this.paymentMethod === '1') {
            // 不需要打开,可能直接就是支付成功,弹窗展示支付结果
            this.$message.success('充值成功')
          } else {
            // 可能是微信之类的需要打开相关信息,给用户支付,弹窗展示
            const base64QRCode = response.data.qcCodeBase64
            this.paymentNo = response.data.paymentNo
            this.$alert(`<div style="font-size: 18px;color: #333333;font-weight: bold;padding: 30px;margin: 0 50px;border-bottom: 1px solid #ddd;">支付金额:
            <em style="font-size: 18px;font-style: normal;font-weight: bold;color: rgb(217, 0, 27);margin-left: 10px;">￥</em>
            <span style="font-size: 30px;color: rgb(217, 0, 27);font-weight: bold;">${this.rechargeAmount}</span>
            </div><br/><div align='center'><img src="${base64QRCode}" alt="QR Code" style='width:200px; height: 200px;'/></div>`, `微信支付二维码,请扫码支付`, {
              dangerouslyUseHTMLString: true,
              showConfirmButton: true,
              confirmButtonText: '我已支付',
              center: true
            }).then(() => {
              // 调用出展示支付结果的弹窗信息
              payDetail({ tradeNo: this.paymentNo }).then((payResponse) => {
                if (payResponse.status === '200') {
                  this.paymentDetailDialogVisible = true
                  console.log(payResponse)
                  this.detailInfo = payResponse.data
                  // 启用定时查询
                  this.startTimer()
                } else {
                  this.$message({
                    type: 'error',
                    message: '对不起,进行支付结果查询失败,请稍后查看!'
                  })
                }
              })
            })
          }
          this.getDetail()
        }
        this.ruleForm = { password: '' }
      }).catch(() => {
        this.paymentButtonLoading = false
      })
      this.paymentButtonLoading = false
    },
    recharge() {
      if (this.rechargeAmount === undefined || this.rechargeAmount === '') {
        this.$message.error('请填写充值金额')
        return
      }
      // 如果是账户支付,则开启输出密码
      if (this.paymentMethod === '1') {
        this.centerDialogVisible = true
      } else {
        this.submitPayment()
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submitPayment()
          this.centerDialogVisible = false
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    // 定时查询的任务
    startTimer() {
      console.log('开始进行payment结果定时任务查询...')
      // 每隔30秒执行一次任务
      this.timer = setInterval(() => {
        // 执行你的任务逻辑
        payDetail({ tradeNo: this.paymentNo }).then((response) => {
          if (response.status === '200') {
            console.log(response)
            this.detailInfo = response.data
          }
        })
      }, 30000)
    },
    stopTimer() {
      // 停止定时任务
      console.log('停止payment结果定时任务查询...')
      clearInterval(this.timer)
      this.paymentDetailDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
