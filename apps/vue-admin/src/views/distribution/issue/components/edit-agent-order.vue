<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    width="50%"
    top="5vh"
    :title="dialogStatus == 'create' ? $t('table.add') : $t('table.edit')"
    :before-close="handleClose"
  >
    <el-form ref="formRef" label-width="150px" :model="dto" :rules="formRules">
      <div class="custom-card">
        <div class="card-title">乘客信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="lastName">
                <el-input v-model="dto.lastName" clearable placeholder="姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号" prop="cardNum">
                <el-input
                  v-model="dto.cardNum"
                  clearable
                  placeholder="证件号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="dto.phone" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="gender">
                <el-select v-model="dto.gender" clearable>
                  <el-option
                    v-for="option in genderTypeOptions"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker
                  v-model="dto.birthday"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  style="width: 150px; margin-bottom: 10px"
                  placeholder="出生日期"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">客户价格信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <el-row>
            <!-- 客户价格信息 -->
            <el-col :span="12">
              <el-form-item label="票面价" prop="originTicketPrice">
                <el-input v-model="dto.originTicketPrice" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售价" prop="soldTicketPrice">
                <el-input
                  v-model="dto.soldTicketPrice"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="政策返钱" prop="keepAmount">
                <el-input v-model="dto.keepAmount" clearable @input="handlerChange()" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="政策返点(%)" prop="rebate">
                <el-input v-model="dto.rebate" clearable @input="handlerChange()" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机建" prop="flightTax">
                <el-input
                  v-model="dto.flightTax"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="燃油" prop="fuelTax">
                <el-input
                  v-model="dto.fuelTax"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售服务费" prop="serviceFeesAmount">
                <el-input
                  v-model="dto.serviceFeesAmount"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="加价/让利" prop="markupAmount">
                <el-input
                  v-model="dto.markupAmount"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机票总价(不含保险)" prop="ticketAmount">
                <el-input v-model="dto.ticketAmount" clearable disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应收金额" prop="payableAmount">
                <el-input v-model="dto.payableAmount" clearable disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        :loading="btnLoading"
        :disabled="btnLoading"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import GenderTypeEnum from '@/enum/genderType'
import { updatePassengerTicket } from '@/api/agent/issue-order'
// import rules from '@/utils/rules'

export default {
  name: 'EditAgentOrder',
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      loading: false,
      btnLoading: false,
      ticketIssueOrderNo: '',
      genderTypeOptions: [],
      dto: {
        payableAmount: 0,
        ticketAmount: 0
      },
      formRules: {
        lastName: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        cardNum: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        birthday: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        gender: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        originTicketPrice: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        soldTicketPrice: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        serviceFeesAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        keepAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        rebate: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        flightTax: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        fuelTax: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        markupAmount: [
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
  created() {},
  mounted() {
    this.genderTypeOptions = Object.keys(GenderTypeEnum.GenderType).map(
      (key) => ({
        value: GenderTypeEnum.GenderType[key],
        label: this.$t(
          `AdminService["Enum:GenderType:${GenderTypeEnum.GenderType[key]}"]`
        )
      })
    )
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    resetFlied() {
      this.dto = {
        purchaseTicketList: []
      }
    },
    handleUpdate(row, ticketIssueOrderNo) {
      // console.log('--------this.row', row)
      // this.orderStatus = orderStatus
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.ticketIssueOrderNo = ticketIssueOrderNo
      this.dto = JSON.parse(JSON.stringify(row))
      this.dto.payableAmount =
        Number(this.dto.soldTicketPrice) +
        Number(this.dto.flightTax) +
        Number(this.dto.fuelTax) +
        Number(this.dto.insuranceAmount) +
        Number(this.dto.serviceFeesAmount) +
        Number(this.dto.markupAmount)
      this.dto.ticketAmount =
        Number(this.dto.soldTicketPrice) +
        Number(this.dto.flightTax) +
        Number(this.dto.fuelTax) +
        Number(this.dto.serviceFeesAmount) +
        Number(this.dto.markupAmount)
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.$confirm(
            '确定需要对该乘客的订票信息进行修改么？',
            '乘客订票信息修改',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }
          ).then(() => {
            updatePassengerTicket({
              orderNo: this.ticketIssueOrderNo,
              passengerId: this.dto.passengerId,
              passengerType: this.dto.passengerType,
              firstName: this.dto.firstName,
              lastName: this.dto.lastName,
              gender: this.dto.gender,
              cardType: this.dto.cardType,
              cardNum: this.dto.cardNum,
              birthday: this.dto.birthday,
              phone: this.dto.phone,
              originTicketPrice: this.dto.originTicketPrice,
              soldTicketPrice: this.dto.soldTicketPrice,
              flightTax: this.dto.flightTax,
              fuelTax: this.dto.fuelTax,
              keepAmount: this.dto.keepAmount,
              rebate: this.dto.rebate,
              markupAmount: this.dto.markupAmount,
              serviceFeesAmount: this.dto.serviceFeesAmount,
              supplierOriginTicketPrice: this.dto.supplierOriginTicketPrice,
              supplierOriginSoldPrice: this.dto.supplierOriginSoldPrice,
              supplierFlightTaxes: this.dto.supplierFlightTaxes,
              supplierFuelTaxes: this.dto.supplierFuelTaxes,
              supplierKeepAmount: this.dto.supplierKeepAmount,
              supplierRebate: this.dto.supplierRebate,
              supplierPlatformService: this.dto.supplierPlatformService,
              supplierSupplierService: this.dto.supplierSupplierService,
              supplierMarkupAmount: this.dto.supplierMarkupAmount
            })
              .then((response) => {
                this.btnLoading = false
                this.dialogFormVisible = false
                if (response.status === '200') {
                  this.$emit('handleFilter', true)
                  this.$message({
                    type: 'success',
                    message: '乘客订票信息修改成功!'
                  })
                  this.$emit('handleFilter', true)
                }
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '乘客订票信息修改失败'
                })
              })
          })
        }
      })
    },
    handlerChange() {
      this.dto.soldTicketPrice = Number(this.dto.originTicketPrice) - Number(this.dto.keepAmount) - Number(this.dto.originTicketPrice) * Number(this.dto.rebate) / 100
      this.dto.payableAmount =
        Number(this.dto.soldTicketPrice) +
        Number(this.dto.flightTax) +
        Number(this.dto.fuelTax) +
        Number(this.dto.insuranceAmount) +
        Number(this.dto.serviceFeesAmount) +
        Number(this.dto.markupAmount)
      this.dto.ticketAmount =
        Number(this.dto.soldTicketPrice) +
        Number(this.dto.flightTax) +
        Number(this.dto.fuelTax) +
        Number(this.dto.serviceFeesAmount) +
        Number(this.dto.markupAmount)
    }
  }
}
</script>

<style scoped></style>
