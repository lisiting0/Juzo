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
        <div class="card-title">客户价格信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <el-row>
            <!-- 客户价格信息 -->
            <el-col :span="12">
              <el-form-item label="票面价" prop="changeTicketPrice">
                <el-input v-model="dto.changeTicketPrice" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售价" prop="changeSoldTicketPrice">
                <el-input
                  v-model="dto.changeSoldTicketPrice"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机建" prop="changeFlightTax">
                <el-input
                  v-model="dto.changeFlightTax"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="燃油" prop="changeFuelTax">
                <el-input
                  v-model="dto.changeFuelTax"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="升舱费" prop="priceDifference">
                <el-input
                  v-model="dto.priceDifference"
                  clearable
                  @input="handlerChange()"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="改签费" prop="feesAmount">
                <el-input
                  v-model="dto.feesAmount"
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
import { updatePassengerTicket } from '@/api/agent/change-order'
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
      changeTicketOrderNo: '',
      genderTypeOptions: [],
      dto: {
        payableAmount: 0,
        ticketAmount: 0
      },
      formRules: {
        changeTicketPrice: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        changeSoldTicketPrice: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        changeFlightTax: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        changeFuelTax: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        priceDifference: [
          {
            required: true,
            trigger: 'blur',
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")
          }
        ],
        feesAmount: [
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
    handleUpdate(row, changeTicketOrderNo) {
      // this.orderStatus = orderStatus
      // console.log('----------this.row', row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.changeTicketOrderNo = changeTicketOrderNo
      this.dto = JSON.parse(JSON.stringify(row))
      this.dto.payableAmount =
        Number(this.dto.feesAmount) +
        Number(this.dto.priceDifference) +
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
            '确定需要对该乘客的改签订票信息进行修改么？',
            '乘客改签订票信息修改',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }
          ).then(() => {
            updatePassengerTicket({
              orderNo: this.changeTicketOrderNo,
              passengerId: this.dto.passengerId,
              originTicketPrice: this.dto.changeTicketPrice,
              soldTicketPrice: this.dto.changeSoldTicketPrice,
              flightTax: this.dto.changeFlightTax,
              fuelTax: this.dto.changeFuelTax,
              priceDifference: this.dto.priceDifference,
              feesAmount: this.dto.feesAmount,
              markupAmount: this.dto.markupAmount,
              serviceFeesAmount: this.dto.serviceFeesAmount,
              supplierPriceDifference: this.dto.supplierPriceDifference,
              supplierFeesAmount: this.dto.supplierFeesAmount,
              supplierSupplierService: this.dto.supplierSupplierService
            })
              .then((response) => {
                this.btnLoading = false
                this.dialogFormVisible = false
                if (response.status === '200') {
                  this.$emit('handleFilter', true)
                  this.$message({
                    type: 'success',
                    message: '乘客改签订票信息修改成功!'
                  })
                  this.$emit('handleFilter', true)
                }
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '乘客改签订票信息修改失败'
                })
              })
          })
        }
      })
    },
    handlerChange() {
      this.dto.payableAmount =
        Number(this.dto.feesAmount) +
        Number(this.dto.priceDifference) +
        Number(this.dto.serviceFeesAmount) +
        Number(this.dto.markupAmount)
    }
  }
}
</script>

<style scoped></style>
