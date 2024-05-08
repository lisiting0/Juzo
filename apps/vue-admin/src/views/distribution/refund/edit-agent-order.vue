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
                <el-input
                  v-model="dto.lastName"
                  clearable
                  placeholder="姓名"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号" prop="cardNum">
                <el-input
                  v-model="dto.cardNum"
                  clearable
                  placeholder="证件号"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="gender">
                <el-select v-model="dto.gender" clearable disabled>
                  <el-option
                    v-for="option in genderTypeOptions"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">客户订单价格信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <el-row>
            <!-- 客户价格信息 -->
            <el-col :span="12">
              <el-form-item label="票面价" prop="originTicketPrice">
                <el-input v-model="dto.originTicketPrice" clearable disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售价" prop="soldTicketPrice">
                <el-input v-model="dto.soldTicketPrice" clearable disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="回收代理费" prop="proxyFees">
                <el-input v-model="dto.proxyFees" clearable disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机建" prop="flightTax">
                <el-input v-model="dto.flightTax" clearable disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="燃油" prop="fuelTax">
                <el-input v-model="dto.fuelTax" clearable disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保险" prop="insuranceAmount">
                <el-input v-model="dto.insuranceAmount" clearable disabled />
              </el-form-item>
            </el-col>
            <el-col v-if="dto.orderBusinessType === 1" :span="12">
              <el-form-item label="升舱费" prop="changePriceDifference">
                <el-input
                  v-model="dto.changePriceDifference"
                  clearable
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="退票费率(%)" prop="feesRate">
                <el-input v-model="dto.feesRate" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="退票手续费" prop="feesAmount">
                <el-input
                  v-model="dto.feesAmount"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="退票服务费" prop="refundServiceAmount">
                <el-input
                  v-model="dto.refundServiceAmount"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="退票加价/让利" prop="refundMarkupAmount">
                <el-input
                  v-model="dto.refundMarkupAmount"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="应退金额" prop="refundAmount">
                <el-input v-model="dto.refundAmount" clearable />
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
import { updatePassengerTicket } from '@/api/agent/refund-order'

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
      orderBusinessType: 0,
      dto: {
        refundAmount: 0,
        proxyFees: 0
      },
      formRules: {
        feesAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        refundServiceAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        refundMarkupAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        refundAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
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
        label: this.$t(`AdminService["Enum:GenderType:${GenderTypeEnum.GenderType[key]}"]`)
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
    handleUpdate(row, ticketRefundOrderNo) {
      // console.log('--------this.row', row)
      // this.orderStatus = orderStatus
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.ticketIssueOrderNo = ticketRefundOrderNo
      this.orderBusinessType = row.orderBusinessType
      this.dto = JSON.parse(JSON.stringify(row))
      this.dto.proxyFees = this.dto.originTicketPrice - this.dto.soldTicketPrice
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
              orderFlightIdList: this.dto.orderFlightIdList,
              originTicketPrice: this.dto.originTicketPrice,
              soldTicketPrice: this.dto.soldTicketPrice,
              flightTax: this.dto.flightTax,
              fuelTax: this.dto.fuelTax,
              priceDifference: this.dto.changePriceDifference,
              refundMarkupAmount: this.dto.refundMarkupAmount,
              refundServiceFeesAmount: this.dto.refundServiceAmount,
              insuranceAmount: this.dto.insuranceAmount,
              feesRate: this.dto.feesRate,
              feesAmount: this.dto.feesAmount,
              refundAmount: this.dto.refundAmount,
              supplierOriginTicketPrice: this.dto.supplierOriginTicketPrice,
              supplierOriginSoldPrice: this.dto.supplierOriginSoldPrice,
              supplierPriceDifference: this.dto.supplierPriceDifference,
              supplierChangeFeesAmount: this.dto.supplierChangeFeesAmount,
              supplierFlightTaxes: this.dto.supplierFlightTaxes,
              supplierFuelTaxes: this.dto.supplierFuelTaxes,
              supplierPlatformService: this.dto.supplierPlatformService,
              supplierSupplierService: this.dto.supplierSupplierService,
              supplierMarkupAmount: this.dto.supplierMarkupAmount,
              supplierTicketAmount: this.dto.supplierTicketAmount,
              supplierSettlementAmount: this.dto.supplierSettlementAmount,
              supplierRefundFeesRate: this.dto.supplierRefundFeesRate,
              supplierRefundFeesAmount: this.dto.supplierRefundFeesAmount,
              supplierRefundSettlementAmount:
                this.dto.supplierRefundSettlementAmount
            })
              .then((response) => {
                this.btnLoading = false
                this.dialogFormVisible = false
                if (response.status === '200') {
                  this.$emit('handleFilter', true)
                  this.$message({
                    type: 'success',
                    message: '乘客退票订票信息修改成功!'
                  })
                  this.$emit('handleFilter', true)
                }
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '乘客退票订票信息修改失败'
                })
              })
          })
        }
      })
    },
    handlerChange() {
      if (this.orderBusinessType === 0) {
        this.dto.refundAmount =
          Number(this.dto.soldTicketPrice) +
          Number(this.dto.flightTax) +
          Number(this.dto.fuelTax) +
          Number(this.dto.insuranceAmount) -
          Number(this.dto.feesAmount) -
          Number(this.dto.refundServiceAmount) -
          Number(this.dto.refundMarkupAmount)
      } else {
        this.dto.refundAmount =
          Number(this.dto.changePriceDifference) +
          Number(this.dto.insuranceAmount) -
          Number(this.dto.feesAmount) -
          Number(this.dto.refundServiceAmount) -
          Number(this.dto.refundMarkupAmount)
      }
    }
  }
}
</script>

<style scoped></style>
