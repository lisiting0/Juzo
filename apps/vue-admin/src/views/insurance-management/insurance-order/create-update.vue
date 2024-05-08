<template>
  <el-dialog
    width="80%"
    :visible.sync="dialogFormVisible"
    :title="
      dialogStatus == 'create'
        ? $t('table.add') + '保险订单'
        : $t('table.edit') + '保险订单'
    "
  >
    <el-form ref="formRef" :rules="rules" :model="dto">
      <div class="custom-card">
        <div class="card-title">基本信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <table class="table-bordered template-table" style="width: 100%">
            <tr>
              <td>分销账号</td>
              <td>
                <el-form-item label="" prop="agentId" style="margin-bottom: 0">
                  <el-input v-model="dto.agentId" clearable placeholder="分销账号" :disabled="true" />
                </el-form-item>
              </td>
              <td>分销商</td>
              <td>
                <el-form-item label="" prop="agentName" style="margin-bottom: 0">
                  <el-input v-model="dto.agentName" clearable placeholder="分销商" disabled />
                </el-form-item>
              </td>
              <td>投保状态</td>
              <td>
                <el-form-item label="" prop="insuranceStatus" style="margin-bottom: 0">
                  <el-select v-model="dto.insuranceStatus" clearable disabled>
                    <el-option
                      v-for="env in policyStatusOptions"
                      :key="env.value"
                      :value="env.value"
                      :label="env.label"
                    />
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>保险公司</td>
              <td>
                <el-form-item label="" prop="insuranceCompany" style="margin-bottom: 0">
                  <el-input v-model="dto.insuranceCompany" placeholder="保险公司" disabled />
                </el-form-item>
              </td>
              <td>保险名称</td>
              <td>
                <el-form-item label="" prop="insuranceName" style="display: block; margin-bottom: 0">
                  <el-input v-model="dto.insuranceName" placeholder="保险名称" disabled />
                </el-form-item>
              </td>
              <td>保险类型</td>
              <td>
                <el-form-item label="" prop="insuranceForm" style="margin-bottom: 0">
                  <el-select v-model="dto.insuranceType" clearable disabled>
                    <el-option
                      v-for="env in insuranceTypeOptions"
                      :key="env.value"
                      :value="env.value"
                      :label="env.label"
                    />
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>出票订单号</td>
              <td>
                <el-form-item label="" prop="orderNo" style="margin-bottom: 0">
                  <el-input v-model="dto.orderNo" placeholder="出票订单号" disabled />
                </el-form-item>
              </td>
              <td>票号</td>
              <td>
                <el-form-item label="" prop="carrierTicketNo" style="margin-bottom: 0">
                  <el-input v-model="dto.carrierTicketNo" placeholder="票号" disabled />
                </el-form-item>
              </td>
              <td />
            </tr>
            <tr>
              <td>投保乘机人</td>
              <td>
                <el-form-item label="" prop="passengerName" style="margin-bottom: 0">
                  <el-input v-model="dto.passengerName" placeholder="投保乘机人" disabled />
                </el-form-item>
              </td>
              <td>证件类型</td>
              <td>
                <el-form-item label="" prop="cardType" style="margin-bottom: 0">
                  <el-select v-model="dto.cardType" clearable disabled>
                    <el-option
                      v-for="option in identityCardTypeOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </td>
              <td>证件号</td>
              <td>
                <el-form-item label="" prop="cardNum" style="margin-bottom: 0">
                  <el-input v-model="dto.cardNum" placeholder="证件号" disabled />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>生效日期</td>
              <td>
                <el-form-item label="" prop="effectiveDate" style="margin-bottom: 0">
                  <el-date-picker v-model="dto.effectiveDate" disabled />
                </el-form-item>
              </td>
              <td>截止日期</td>
              <td>
                <el-form-item label="" prop="deadlineDate" style="margin-bottom: 0">
                  <el-date-picker v-model="dto.deadlineDate" disabled />
                </el-form-item>
              </td>
              <td />
              <td />
            </tr>
          </table>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">保险信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <table class="table-bordered template-table" style="width: 100%">
            <tr>
              <td>采购份数</td>
              <td>
                <el-form-item label="" prop="number" style="margin-bottom: 0">
                  <el-input v-model="dto.number" placeholder="采购份数" disabled />
                </el-form-item>
              </td>
              <td>销售价</td>
              <td>
                <el-form-item label="" prop="insuranceSalePrice" style="margin-bottom: 0">
                  <el-input v-model="dto.insuranceSalePrice" placeholder="销售单价" disabled />
                </el-form-item>
              </td>
              <td>采购价</td>
              <td>
                <el-form-item label="" prop="purchasePrice" style="margin-bottom: 0">
                  <el-input v-model="dto.purchasePrice" placeholder="采购单价" disabled />
                </el-form-item>
              </td>
              <td>收款金额</td>
              <td>
                <el-form-item label="" style="margin-bottom: 0">
                  <el-input placeholder="销售总额" disabled :value="dto.insuranceSalePrice * dto.number" />
                </el-form-item>
              </td>
              <td>利润</td>
              <td>
                <el-form-item label="" style="margin-bottom: 0">
                  <el-input placeholder="利润总额" disabled :value="dto.insuranceSalePrice * dto.number - dto.purchasePrice * dto.number" />
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">投保信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <table class="table-bordered template-table" style="width: 100%">
            <tr>
              <td>投保状态</td>
              <td>
                <el-form-item label="" prop="insuranceStatus" style="margin-bottom: 0">
                  <el-select v-model="dto.insuranceStatus" clearable :disabled="insuranceStatus !== 0">
                    <el-option
                      v-for="env in policyStatusOptions"
                      :key="env.value"
                      :value="env.value"
                      :label="env.label"
                    />
                  </el-select>
                </el-form-item>
              </td>
              <td>供应商保险单号</td>
              <td>
                <el-form-item label="" prop="insuranceProfit" style="margin-bottom: 0">
                  <el-input v-model="dto.insuranceSupplierNo" :disabled="insuranceStatus !== 0" />
                </el-form-item>
              </td>
              <td>供应单证流水号</td>
              <td>
                <el-form-item label="" prop="insuranceProfit" style="margin-bottom: 0">
                  <el-input v-model="dto.insuranceSupplierFlow" :disabled="insuranceStatus !== 0" />
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button v-if="insuranceStatus === 0" type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import PolicyStatusEnum from '@/enum/policyStatus'
import InsuranceTypeEnum from '@/enum/insuranceType'
import IdentityCardTypeEnum from '@/enum/identityCardType'
import { manualCreate as save, update } from '@/api/insurance/insurance-order'

export default {
  name: 'InsuranceOrderCreateUpdate',
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('授信不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 1000) {
            callback(new Error('必须大于1000'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      dialogStatus: '',
      insuranceStatus: '',
      dialogFormVisible: false,
      policyStatusOptions: [],
      insuranceTypeOptions: [],
      identityCardTypeOptions: [],
      dto: {
      },
      rules: {
        distributionAccount: [
          {
            required: true,
            message: '请输入分销账号',
            trigger: 'blur'
          }
        ],
        distributor: [
          {
            required: true,
            message: '请输入分销商',
            trigger: 'blur'
          }
        ],
        policyStatus: [
          {
            required: true,
            message: '请选择保险状态',
            trigger: ['blur', 'change']
          }
        ],
        insuranceCompany: [
          {
            required: true,
            message: '请输入保险公司',
            trigger: 'blur'
          }
        ],
        insuranceName: [
          {
            required: true,
            message: '请输入保险名称',
            trigger: 'blur'
          }
        ],
        insuranceType: [
          {
            required: true,
            message: '请选择保险类型',
            trigger: ['blur', 'change']
          }
        ],
        issueOrderNo: [
          {
            required: true,
            message: '请输入出票订单号',
            trigger: 'blur'
          }
        ],
        ticketNo: [
          {
            required: true,
            message: '请输入票号',
            trigger: 'blur'
          }
        ],
        passenger: [
          {
            required: true,
            message: '请输入投保乘机人',
            trigger: 'blur'
          }
        ],
        identityCardType: [
          {
            required: true,
            message: '请选择证件类型',
            trigger: ['blur', 'change']
          }
        ],
        cardNo: [
          {
            required: true,
            message: '请输入证件号',
            trigger: 'blur'
          }
        ],
        commencementDate: [
          {
            required: true,
            message: '请输入生效日期',
            trigger: 'blur'
          }
        ],
        cutoffDate: [
          {
            required: true,
            message: '请输入截止日期',
            trigger: 'blur'
          }
        ],
        purchasedCount: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        salesPrice: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        procurementPrice: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        amountReceived: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        margins: [
          { validator: checkNumber, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.policyStatusOptions = Object.keys(PolicyStatusEnum.PolicyStatus).map(key => ({
      value: PolicyStatusEnum.PolicyStatus[key],
      label: key
    }))
    this.insuranceTypeOptions = Object.keys(InsuranceTypeEnum.InsuranceType).map(key => ({
      value: InsuranceTypeEnum.InsuranceType[key],
      label: key
    }))
    this.identityCardTypeOptions = Object.keys(IdentityCardTypeEnum.IdentityCardType).map(key => ({
      value: IdentityCardTypeEnum.IdentityCardType[key],
      label: this.$t(`AdminService["Enum:IdentityCardType:${IdentityCardTypeEnum.IdentityCardType[key]}"]`)
    }))
  },
  methods: {
    resetFlied() {
      this.dto = {
      }
    },
    handleCreate() {
      this.resetFlied()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          console.log(this.dto)
          save(this.dto).then(response => {
            if (response.status === '200') {
              this.$emit('handleFilter', true)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(response.message)
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.dto = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.insuranceStatus = this.dto.insuranceStatus
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          update(this.dto).then(response => {
            this.$emit('handleFilter', false)
            this.dialogFormVisible = false
            if (response.status === '200') {
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(response.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
