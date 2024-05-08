<template>
    <div class="app-container">
        <div class="page-container">
            <div class="warning">
                <p>温馨提示： 舱位价格实时变动，请在15分钟内支付完成！</p>
            </div>
        </div>

        <div class="detail-container">
            <div class="detail-orderno flex">
                <p>订单号：jz5498651365899988212</p>
                <el-button type="primary" @click="onDetail()" class="ml-15">订单详情</el-button>
            </div>
            <div class="div-flex">
                <div class="left-flex">
                    <div>
                        <span>单程</span>
                        <span>广州(CAN)T2</span>
                        <span>—</span>
                        <span>厦门(XMN) T1</span>
                        <span>CZ6954</span>
                        <span>2023-08-10 08:15-12:30</span>
                        标准行李额：20kg
                    </div>
                    <div>
                        <span>乘机人：<em>张佳琪</em></span>
                        <span>身份证：<em>445321200301013263</em></span>
                        额外行李额：15kg
                    </div>
                    <div>
                        <span>乘机人：<em>ZHOUKAI</em> </span>
                        <span> 护照：<em>PP12356984</em></span>
                    </div>
                </div>
                <div class="right-flex">
                    <div>支付总价<em>￥</em><span>1862.00</span></div>
                    <el-button
                        type="warning"
                        size="medium"
                        style="
                            background-color: #f59a23;
                            border-color: #f59a23;
                            width: 200px;
                            margin-top: 10px;
                        "
                        @click="goPay()"
                        >去支付
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  name: 'TicketDetail',
  components: {
  },
  data() {
    return {
      loading: false,
      identityCardTypeOptions: [],
      id: ''
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    onDetail() {
      this.$router.push(`/domestic-tickets/issue-detail?id=${this.id}`)
    },
    goPay() {
      // 关闭当前路由
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.push(`/domestic-tickets/ticket-payment?id=${this.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
    padding: 50px 20px;

    .detail-orderno {
        font-size: 24px;
        color: #555555;
    }

    .left-flex {
        div {
            font-size: 16px;
            color: rgb(127, 127, 127);
            padding: 15px 0;

            span {
                margin-right: 10px;
            }
        }

        em {
            font-weight: 700;
            font-style: normal;
        }
    }
    .right-flex {
        font-size: 18px;
        padding-right: 40px;
        color: #333333;

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
}
</style>
