<template>
  <div class="app-container">
    <el-form
      ref="formRef"
      v-loading="loading"
      :model="detail"
      :rules="rules"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <div class="form-container">
        <div class="title">余额信息</div>
        <div class="form-item">
          <div class="form-item-title">账户余额</div>
          <div class="form-item-con">
            <span class="red-text">￥{{ detail.walletBalance }}</span>
            <span class="blue-text ml-5 mr-20">元</span>
            <el-tag type="success" @click="queryFlow">充值记录</el-tag>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">
            原支付密码
            <el-tooltip
              class="item"
              effect="dark"
              content="支付密码6位"
              placement="top-start"
            >
              <i class="el-icon-question" title="" />
            </el-tooltip>
          </div>
          <div class="form-item-con">
            <div class="flex">
              <el-form-item label="" prop="oldPassword">
                <el-input
                  v-model="detail.oldPassword"
                  type="Password"
                  clearable
                  style="width: 147px"
                  maxlength="6"
                  minlength="6"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">
            支付密码
            <el-tooltip
              class="item"
              effect="dark"
              content="支付密码6位"
              placement="top-start"
            >
              <i class="el-icon-question" title="" />
            </el-tooltip>
          </div>
          <div class="form-item-con">
            <div class="flex">
              <el-form-item label="" prop="password">
                <el-input
                  v-model="detail.password"
                  type="password"
                  clearable
                  style="width: 147px"
                  maxlength="6"
                  minlength="6"
                />
                <el-button :loading="loading" style="margin-left: 10px" type="primary" @click="save()"> 修改密码 </el-button>
                <el-button :loading="loading" style="margin-left: 10px" type="primary" @click="reset()"> 重置密码 </el-button>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">短信余额</div>
          <div class="form-item-con">
            <span class="red-text">￥{{ detail.shortMessageBalance }}</span>
            <span class="blue-text ml-5 mr-10">元</span>
          </div>
        </div>
        <div class="form-item footer" />
      </div>
    </el-form>

    <!-- 充值记录弹窗 -->
    <el-dialog width="60%" :visible.sync="dialogFormVisible" :title="'详情列表'">
      <el-table
        :data="rechargeList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="createTime"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="oldAmount"
          label="充值前金额"
          width="180"
        />
        <el-table-column
          prop="flowAmount"
          label="充值金额"
          width="180"
        />
        <el-table-column
          prop="newAmount"
          label="充值后金额"
          width="180"
        />
        <el-table-column
          prop="payChannel"
          label="支付方式"
        >
          <template v-if="scope.row.payChannel != null" slot-scope="scope">
            {{
              $t(
                `AdminService["Enum:PayChannelType:${scope.row.payChannel}"]`
              )
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
        />
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { agentBalanceQuery, updateAgentBalancePassword, agentBalanceFlowQuery, resetAgentBalancePassword } from '@/api/identity/agent-balance'

export default {
  password: 'balanceInformation',
  components: {
  },
  data() {
    return {
      loading: false,
      detail: {},
      rules: {
        password: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        oldPassword: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ]
      },

      // 充值记录信息
      dialogFormVisible: false,
      rechargeList: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList() {
      this.loading = true
      agentBalanceQuery(this.detail).then((response) => {
        this.loading = false
        if (response.status === '200') {
          this.detail = response.data
          this.total = response.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.loading = true
          // 修改密码
          updateAgentBalancePassword(this.detail).then((response) => {
            this.loading = false
            if (response.status === '200') {
              this.$message.success('密码修改成功')
              this.getList()
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    // 重置支付密码
    reset() {
      this.loading = true
      this.$confirm('确定要进行重置支付密码的操作吗,新密码将通过邮件通知到您？', '重置支付密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(() => {
        resetAgentBalancePassword().then((response) => {
          this.loading = false
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '重置成功,新密码将通过邮件的形式通知!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '重置失败'
          })
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$message({
          type: 'info',
          message: '重置取消'
        })
      })
    },
    queryFlow() {
      agentBalanceFlowQuery({ balanceType: 0 }).then((response) => {
        if (response.status === '200') {
          this.dialogFormVisible = true
          this.rechargeList = response.data
        } else {
          this.$message.error(response.message)
        }
      }).catch(() => {
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
