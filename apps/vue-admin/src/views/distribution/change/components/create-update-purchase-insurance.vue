<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    width="400"
    top="5vh"
    :title="$t('table.edit')"
  >
    <el-form
      ref="formRef"
      label-width="150px"
      :model="dto"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="采购保险单号" prop="orderInsuranceNo">
            <el-input
              v-model="dto.orderInsuranceNo"
              clearable
              placeholder="采购保险单号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单状态" prop="purchaseInsuranceStatus">
            <el-select
              v-model="dto.purchaseInsuranceStatus"
              placeholder="订单状态"
              clearable
            >
              <el-option
                v-for="option in statusOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="保险类型"
            prop="insuranceType"
          >
            <el-select
              v-model="dto.insuranceType"
              clearable
            >
              <el-option
                v-for="option in insuranceTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保险公司" prop="insuranceCompany">
            <el-input v-model="dto.insuranceCompany" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生效日期" prop="effectiveDate">
            <el-date-picker v-model.trim="dto.effectiveDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付流水号" prop="purchasePayFlowNo">
            <el-input
              v-model.trim="dto.purchasePayFlowNo"
              clearable
              placeholder="支付流水号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付总价" prop="purchasePayAmount">
            <el-input
              v-model.number="dto.purchasePayAmount"
              :min="1"
              clearable
              placeholder="支付总价"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购单价" prop="purchasePrice">
            <el-input
              v-model.number="dto.purchasePrice"
              :min="1"
              clearable
              placeholder="采购单价"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购份数" prop="purchaseNumber">
            <el-input
              v-model.number="dto.purchaseNumber"
              :min="1"
              clearable
              placeholder="采购份数"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        :loading="btnLoading"
        :disabled="btnLoading"
        @click="updateData()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import PurchaseInsuranceStatusEnum from '@/enum/PurchaseInsuranceStatus'
import InsuranceTypeEnum from '@/enum/insuranceType'
import {
    updateOrderInsurance
  } from '@/api/agent/order-insurance'

export default {
  name: 'CreateUpdatePurchaseInsurance',
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      btnLoading: false,
      statusOptions: [],
      insuranceTypeOptions: [],
      dto: {
      },
      formRules: {
        orderInsuranceNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchaseInsuranceStatus: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        insuranceType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        insuranceCompany: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        effectiveDate: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        purchasePayFlowNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchasePayAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchasePrice: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchaseNumber: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.statusOptions = Object.keys(PurchaseInsuranceStatusEnum.PurchaseInsuranceStatus).map(key => ({
      value: PurchaseInsuranceStatusEnum.PurchaseInsuranceStatus[key],
      label: this.$t(`AdminService["Enum:PurchaseInsuranceStatus:${PurchaseInsuranceStatusEnum.PurchaseInsuranceStatus[key]}"]`)
    }))
    this.insuranceTypeOptions = Object.keys(InsuranceTypeEnum.InsuranceType).map(key => ({
      value: InsuranceTypeEnum.InsuranceType[key],
      label: key
    }))
  },
  mounted() {
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dto = Object.assign({}, row)
      this.dto.passengerName = row.passengerBO.lastName + row.passengerBO.firstName
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.btnLoading = true
          updateOrderInsurance(this.dto).then(response => {
            this.btnLoading = false
            if (response) {
              this.dialogFormVisible = false
              this.$emit('handleFilter', true)
            }
          }).catch((error) => {
            this.btnLoading = false
            throw error
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    }
  }
}
</script>

<style scoped></style>
