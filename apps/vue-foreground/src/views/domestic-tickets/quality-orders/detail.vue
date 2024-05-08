<template>
    <el-dialog
        width="80%"
        top="5vh"
        :center="true"
        :visible.sync="dialogFormVisible"
        :title="''"
    >
        <el-form
            ref="formRef"
            label-width="130px"
            :model="detailInfo"
            :rules="formRules"
        >
            <div class="custom-card">
                <div class="card-title">
                    {{
                        dialogStatus == 'detail'
                            ? '质检订单详情'
                            : '质检订单审核'
                    }}
                </div>
                <div class="card-box padding-2">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="申请时间：">
                                {{
                                    moment(
                                        detailInfo.createTime,
                                        'YYYY-MM-DD hh:mm:ss'
                                    )
                                }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="订单状态：">
                                <span class="status-text">
                                    {{
                                        $t(
                                            `Juzo["Enum:QualityCheckStatusType:${detailInfo.qualityCheckStatus}"]`
                                        )
                                    }}
                                </span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="质检订单号：">
                                {{ detailInfo.qualityCheckOrderNo }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="关联业务订单号：">
                                {{ detailInfo.originOrderNo }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="客户账户：">
                                {{ detailInfo.agentAccount }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="客户名称：">
                                {{ detailInfo.agentOrganizationName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="创建人：">
                                {{ detailInfo.createUserName }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="业务类型：">
                                {{
                                    $t(
                                        `AdminService["Enum:OrderBusinessType:${detailInfo.orderBusinessType}"]`
                                    )
                                }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结算类型：">
                                {{
                                    $t(
                                        `Juzo["Enum:QualityCheckType:${detailInfo.qualityCheckType}"]`
                                    )
                                }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="质检金额：">
                                <span class="red-text">{{
                                    detailInfo.amount
                                }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col
                            v-if="detailInfo.qualityCheckStatus === 3"
                            :span="6"
                        >
                            <el-form-item label="结算账户：">
                                {{ detailInfo.paymentChannel }}
                            </el-form-item>
                        </el-col>
                        <el-col
                            v-if="detailInfo.qualityCheckStatus === 3"
                            :span="6"
                        >
                            <el-form-item label="交易流水：">
                                {{ detailInfo.tradeNo }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="质检理由描述：">
                                {{ detailInfo.remark }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="附件信息：">
                              <el-upload
                                action=""
                                :disabled="true"
                                :auto-upload="false"
                                class="avatar-uploader"
                              >
                                <img :src="tempImages" class="avatar">
                              </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div v-if="detailInfo.qualityCheckStatus !== 5" class="custom-card">
                <div class="card-title">审核信息</div>
                <div
                    class="card-box padding-2"
                    style="padding-bottom: 75px !important"
                >
                  <template v-if="detailInfo.qualityCheckStatus !== 0">
                    <el-col :span="12">
                        <el-form-item label="审核员：">
                            {{ detailInfo.auditUserName }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="审核备注：">
                            {{ detailInfo.auditRemark }}
                        </el-form-item>
                    </el-col>
                  </template>
                  <el-col v-if="detailInfo.qualityCheckStatus === 0" :span="12">
                      <el-form-item label="审核备注：">
                          <el-input
                              v-model="detailInfo.auditRemark"
                              type="textarea"
                              :placeholder="'审核备注'"
                              name="auditRemark"
                              autocomplete="on"
                          />
                      </el-form-item>
                  </el-col>
                </div>
            </div>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <template v-if="dialogStatus == 'audit'">
                <el-button
                    type="danger"
                    :loading="loading"
                    :disabled="loading"
                    @click="onHandle(false)"
                >
                    审核失败
                </el-button>
                <el-button
                    type="primary"
                    :loading="loading"
                    :disabled="loading"
                    @click="onHandle(true)"
                >
                    审核通过
                </el-button>
            </template>
            <el-button @click="dialogFormVisible = false">关闭</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { qualityOrderAudit } from '@/api/domestic-tickets/quality-orders'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  name: 'QualityOrdersDetail',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      detailInfo: {},
      formRules: {
        auditRemark: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ]
      },
      tempImages: [],
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    moment(filed, format) {
      return moment(filed).format(format)
    },
    resetFlied() {
      this.detailInfo = {}
      this.tempImages = []
    },
    handle(row, status) {
      this.resetFlied()
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
      this.dialogStatus = status
      this.dialogFormVisible = true
      this.detailInfo = Object.assign({}, row)
      this.tempImages = this.detailInfo.appendixList
      this.previewList = this.tempImages
    },
    onHandle(isPass) {
      if (!this.detailInfo.auditRemark) {
        this.$message.error('请输入审核备注')
        return
      }
      this.loading = true
      this.$refs.formRef.validate(valid => {
        if (valid) {
          qualityOrderAudit({
            qualityCheckOrderNo: this.detailInfo.qualityCheckOrderNo,
            qualityCheckStatus: !isPass ? 4 : this.detailInfo.qualityCheckStatus,
            auditRemark: this.detailInfo.auditRemark
          }).then(response => {
            if (response) {
              if (isPass) {
                this.$message.success('审核通过')
              } else {
                this.$message.success('审核失败')
              }
              this.$emit('handleFilter', true)
              this.dialogFormVisible = false
            }
          }).catch((error) => {
            this.loading = false
            throw error
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-card .card-box .card-item .card-item-title {
    flex: 0 0 130px;
}

.image__preview {
    .inline-block {
        display: inline-block;
        margin-right: 5px;
    }
}
</style>
