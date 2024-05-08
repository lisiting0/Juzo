<template>
  <el-dialog
    width="30%"
    :visible.sync="dialogFormVisible"
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
      <el-form-item label="订单号">
        {{ detailInfo.businessOrderNo }}
      </el-form-item>
      <el-form-item label="支付流水号">
        {{ detailInfo.tradeNo }}
      </el-form-item>
      <el-form-item label="支付金额">
        {{ detailInfo.paymentAmount }}
      </el-form-item>
      <el-form-item v-if="detailInfo.payChannel != null" label="支付方式">
        {{
          $t(
            `AdminService["Enum:PayChannelType:${detailInfo.payChannel}"]`
          )
        }}
      </el-form-item>
      <el-form-item label="支付状态">
        {{
          $t(
            `AdminService["Enum:TradeStatus:${detailInfo.tradePayStatus}"]`
          )
        }}
        <el-button type="success" size="mini" :loading="true" icon="el-icon-check" circle />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="primary" @click="goBack()"> 返回订单信息</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import { payDetail } from '@/api/domestic-tickets/payment'

  export default {
    name: 'PaymentDetail',
    data() {
      return {
        timer: null,
        // 传递数据
        detailInfo: {},
        dialogFormVisible: false,
        paymentNo: ''
      }
    },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {
      // 在组件销毁前停止定时任务，以防止内存泄漏
      this.stopTimer()
    },
    methods: {
      detail(paymentNo) {
        this.dialogFormVisible = true
        this.paymentNo = paymentNo
        this.queryPayInfo()
        // 在组件挂载后开始定时任务
        this.startTimer()
      },
      goBack() {
        // 返回到订单的详情页面
        this.$router.back()
        // 关闭定时
        this.stopTimer()
      },
      queryPayInfo() {
        payDetail({ tradeNo: this.paymentNo }).then((response) => {
          if (response.status === '200') {
            console.log(response)
            this.detailInfo = response.data
          } else {
            this.$message({
              type: 'error',
              message: '对不起,进行支付结果查询失败,请查看订单信息!'
            })
          }
        })
      },
      // 定时查询的任务
      startTimer() {
        console.log('开始进行payment结果定时任务查询...')
        // 每隔15秒执行一次任务
        this.timer = setInterval(() => {
          // 执行你的任务逻辑
          this.queryPayInfo()
        }, 15000)
      },
      stopTimer() {
        // 停止定时任务
        console.log('停止payment结果定时任务查询...')
        clearInterval(this.timer)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
