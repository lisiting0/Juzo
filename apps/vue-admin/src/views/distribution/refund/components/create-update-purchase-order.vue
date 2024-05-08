<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    :before-close="handleClose"
    width="80%"
    top="5vh"
    :title="
      dialogStatus == 'create'
        ? $t('table.add')
        : $t('table.edit')
    "
  >
    <el-form
      ref="formRef"
      label-width="150px"
      :model="dto"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="出票订单号" prop="originPurchaseOrderNo">
            <el-input
              v-model="dto.originPurchaseOrderNo"
              clearable
              placeholder="出票订单号"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退票订单号" prop="refundPurchaseOrderNo">
            <el-input
              v-model="dto.refundPurchaseOrderNo"
              clearable
              placeholder="退票订单号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="大编码" prop="adultBigPnr">
            <el-input
              v-model="dto.adultBigPnr"
              clearable
              placeholder="大编码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小编码" prop="adultSmallPnr">
            <el-input
              v-model="dto.adultSmallPnr"
              clearable
              placeholder="小编码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出票渠道" prop="ticketChannel">
            <el-select
              v-model="dto.ticketChannel"
              placeholder="出票渠道"
              clearable
              disabled
            >
              <el-option
                v-for="option in ticketChannelTypeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下单账号" prop="purchaseOrderAccount">
            <el-input
              v-model.number="dto.purchaseOrderAccount"
              clearable
              placeholder="下单账号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付平台" prop="purchasePayPlatform">
            <el-select
              v-model="dto.purchasePayPlatform"
              placeholder="支付平台"
              clearable
              disabled
            >
              <el-option
                v-for="option in purchasePayPlatformTypeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付账号" prop="purchasePayAccount">
            <el-input
              v-model.number="dto.purchasePayAccount"
              clearable
              placeholder="支付账号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付流水号" prop="purchasePayFlowNo">
            <el-input
              v-model.trim="dto.purchasePayFlowNo"
              clearable
              placeholder="支付流水号"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实退金额" prop="purchaseRefundAmount">
            <el-input
              v-model.number="dto.purchaseRefundAmount"
              :min="1"
              clearable
              placeholder="实退金额"
              @change="purchasePayAmountChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退票类型" prop="isVolunteer">
            <el-select v-model="dto.isVolunteer">
              <el-option
                v-for="option in refundTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="dto.isVolunteer === 1" :span="12">
          <el-form-item label="退票理由">
            <el-select v-model="dto.refundTicketReason" clearable>
              <el-option
                v-for="option in refundReasonTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="dto.remark"
          clearable
          placeholder="备注"
        />
      </el-form-item>
      <el-form-item>
        <el-table
          border
          :data="dto.purchaseTicketList"
          :header-row-class-name="'gray-row'"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop=""
            label="乘机人"
          >
            <template slot-scope="{row}">
              <span>{{ row.passengerBO.lastName + row.passengerBO.firstName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="80"
            prop="passengerType"
            label="乘客类型"
          >
            <template slot-scope="{row}">
              {{ $t(`AdminService["Enum:PassengerType:${row.passengerBO.passengerType}"]`) }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="180"
            prop="carrierTicketNo"
            label="票号"
          >
            <template slot-scope="scope">
              <div v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList" :key="'carrierTicketNo'+ segIndex">
                <el-form-item
                  :prop="`purchaseTicketList[${scope.$index}].segmentPurchaseInfoList[${segIndex}].carrierTicketNo`"
                  :rules="formRules.carrierTicketNo"
                >
                  <el-input
                    v-model.trim="segItem.carrierTicketNo"
                    clearable
                    placeholder="票号"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="80"
            prop="cabinCode"
            label="舱位"
          >
            <template slot-scope="scope">
              <div v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList" :key="'cabinCode'+ segIndex">
                <el-form-item
                  :prop="`purchaseTicketList[${scope.$index}].segmentPurchaseInfoList[${segIndex}].cabinCode`"
                  :rules="formRules.cabinCode"
                >
                  <el-input
                    v-model.trim="segItem.cabinCode"
                    clearable
                    placeholder="舱位"
                    class="w-60 text-upper"
                    @change="cabinChange($event, scope.$index, segIndex)"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="110"
            prop="purchaseTicketPrice"
            label="票面价"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].purchaseTicketPrice`"
                :rules="formRules.purchaseTicketPrice"
              >
                <el-input
                  v-model.number="scope.row.purchaseTicketPrice"
                  clearable
                  placeholder="票面价"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="110"
            prop="purchaseSoldPrice"
            label="结算价"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].purchaseSoldPrice`"
                :rules="formRules.purchaseSoldPrice"
              >
                <el-input
                  v-model.number="scope.row.purchaseSoldPrice"
                  clearable
                  placeholder="结算价"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            prop="flightTax"
            label="基建"
            :render-header="(h, obj) => customLabelRenderHeader(h, obj, '燃油')"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].flightTax`"
                :rules="formRules.flightTax"
                style="margin-bottom: 5px;"
              >
                <el-input
                  v-model.number="scope.row.flightTax"
                  clearable
                  placeholder="基建"
                />
              </el-form-item>
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].fuelTax`"
                :rules="formRules.fuelTax"
                style="margin-bottom: 0;"
              >
                <el-input
                  v-model.number="scope.row.fuelTax"
                  clearable
                  placeholder="燃油"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            prop="rebate"
            label="后返"
            :render-header="(h, obj) => customLabelRenderHeader(h, obj, '额外成本')"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].rebate`"
                :rules="formRules.rebate"
                style="margin-bottom: 0;"
              >
                <el-input
                  v-model.number="scope.row.rebate"
                  clearable
                  placeholder="后返"
                />
              </el-form-item>
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].additionalAmount`"
                :rules="formRules.additionalAmount"
                style="margin-bottom: 0;"
              >
                <el-input
                  v-model.number="scope.row.additionalAmount"
                  clearable
                  placeholder="额外成本"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            prop="purchasePaymentAmount"
            label="出票实付金额"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].purchasePaymentAmount`"
              >
                <el-input
                  v-model.number="scope.row.purchasePaymentAmount"
                  clearable
                  placeholder="出票实付金额"
                  @input="handlerChange(scope.row)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            prop="changeFeesAmount"
            label="改签手续费"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].changeFeesAmount`"
              >
                <el-input
                  v-model.number="scope.row.changeFeesAmount"
                  clearable
                  placeholder="改签手续费"
                  @input="handlerChange(scope.row)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            prop="refundFeesAmount"
            label="退票手续费"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].refundFeesAmount`"
              >
                <el-input
                  v-model.number="scope.row.refundFeesAmount"
                  clearable
                  placeholder="退票手续费"
                  @input="handlerChange(scope.row)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            prop="purchaseRefundAmount"
            label="实退金额"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].purchaseRefundAmount`"
                :rules="formRules.purchaseRefundAmount"
              >
                <el-input
                  v-model.number="scope.row.purchaseRefundAmount"
                  :min="1"
                  clearable
                  placeholder="实退金额"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            v-if="dto.purchaseTicketList.length > 1"
            align="center"
            width="80"
            prop=""
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                v-if="dto.purchaseTicketList.length > 1"
                type="danger"
                plain
                size="mini"
                @click="delPassenger(scope.$index)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="cancel">取消</el-button>
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
import TicketChannelTypeEnum from '@/enum/TicketChannelType'
import PurchasePayPlatformTypeEnum from '@/enum/PurchasePayPlatformType'
import RefundTypeEnum from '@/enum/refundType'
import RefundReasonTypeEnum from '@/enum/refundReasonType'
import {
    createRefundPurchaseOrder,
    updateRefundPurchaseOrder
  } from '@/api/agent/refund-order'

export default {
  name: 'CreateEditPurchaseOrder',
  props: {},
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      loading: false,
      btnLoading: false,
      ticketChannelTypeOptions: [],
      purchasePayPlatformTypeOptions: [],
      refundTypeOptions: [],
      refundReasonTypeOptions: [],
      purchaseOrderId: '',
      dto: {
        purchaseTicketList: []
      },
      formRules: {
        refundPurchaseOrderNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        ticketChannel: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        purchaseOrderAccount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchasePayPlatform: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        purchasePayAccount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
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
        carrierTicketNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        cabinCode: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchaseTicketPrice: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchaseSoldPrice: [
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
        additionalAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchasePaymentAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        changeFeesAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        refundFeesAmount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        purchaseRefundAmount: [
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
    this.ticketChannelTypeOptions = Object.keys(TicketChannelTypeEnum.TicketChannelType).map(key => ({
      value: TicketChannelTypeEnum.TicketChannelType[key],
      label: this.$t(`AdminService["Enum:TicketChannelType:${TicketChannelTypeEnum.TicketChannelType[key]}"]`)
    }))
    this.purchasePayPlatformTypeOptions = Object.keys(PurchasePayPlatformTypeEnum.PurchasePayPlatformType).map(key => ({
      value: PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key],
      label: this.$t(`AdminService["Enum:PurchasePayPlatformType:${PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key]}"]`)
    }))
    this.refundTypeOptions = Object.keys(RefundTypeEnum.RefundType).map(key => ({
      value: RefundTypeEnum.RefundType[key],
      label: key
    }))
    this.refundReasonTypeOptions = Object.keys(RefundReasonTypeEnum.RefundReasonType).map(key => ({
      value: RefundReasonTypeEnum.RefundReasonType[key],
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
    customLabelRenderHeader(h, { column, $index }, secondLabel) {
      return h('div', [
        h('div', column.label),
        h('div', secondLabel)
      ])
    },
    resetFlied() {
      this.dto = {
        purchaseTicketList: []
      }
    },
    cabinChange(val, index, segIndex) {
      this.$set(this.dto.purchaseTicketList[index].segmentPurchaseInfoList[segIndex], 'cabinCode', val?.toUpperCase())
      console.log(this.dto)
    },
    purchasePayAmountChange(val) {
      const averagePaidPrice = val / this.dto.purchaseTicketList.length
      this.dto.purchaseTicketList.forEach(element => {
        element.purchaseRefundAmount = averagePaidPrice
      })
    },
    handleCreate(orderDetail, selfRefundTicketPurchaseOrderList) {
      this.resetFlied()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.loading = true
      const purchaseTicketList = []
      if (selfRefundTicketPurchaseOrderList.length > 0) {
        // 筛选原订单乘机人和已下采购单的乘机人
        const orderPassengerIds = selfRefundTicketPurchaseOrderList.flatMap((item) => item.purchaseTicketList.map((ticket) => ticket.orderPassengerId))
        const filteredPassengers = orderDetail.refundTicketBOList.filter((passenger) =>
          !orderPassengerIds.includes(passenger.passengerId)
        )
        filteredPassengers.forEach(pasEle => {
          purchaseTicketList.push({
            orderPassengerId: pasEle.passengerId,
            passengerBO: {
              lastName: pasEle.lastName,
              firstName: pasEle.firstName,
              passengerType: pasEle.passengerType
            },
            purchaseTicketPrice: pasEle.originTicketPrice,
            purchaseSoldPrice: pasEle.soldTicketPrice,
            flightTax: pasEle.flightTax,
            fuelTax: pasEle.fuelTax,
            rebate: 0,
            additionalAmount: 0,
            purchasePaymentAmount: pasEle.paymentAmount,
            changeFeesAmount: 0,
            refundFeesAmount: pasEle.feesAmount,
            purchaseRefundAmount: pasEle.refundAmount,
            originTicketIdList: pasEle.ticketIdList,
            segmentPurchaseInfoList: pasEle.orderFlightBOList.map((fEle, fIndex) => { return { carrierTicketNo: pasEle.carrierTicketNo, cabinCode: fEle.cabinCode, segmentNumber: fIndex } })
          })
        })
      } else {
        orderDetail.refundTicketBOList.forEach(pasEle => {
          purchaseTicketList.push({
            orderPassengerId: pasEle.passengerId,
            passengerBO: {
              lastName: pasEle.lastName,
              firstName: pasEle.firstName,
              passengerType: pasEle.passengerType
            },
            purchaseTicketPrice: pasEle.originTicketPrice,
            purchaseSoldPrice: pasEle.soldTicketPrice,
            flightTax: pasEle.flightTax,
            fuelTax: pasEle.fuelTax,
            rebate: 0,
            additionalAmount: 0,
            purchasePaymentAmount: pasEle.paymentAmount,
            changeFeesAmount: 0,
            refundFeesAmount: pasEle.feesAmount,
            purchaseRefundAmount: pasEle.refundAmount,
            segmentPurchaseInfoList: pasEle.orderFlightBOList.map((fEle, fIndex) => { return { carrierTicketNo: pasEle.carrierTicketNo, cabinCode: fEle.cabinCode, segmentNumber: fIndex } })
          })
        })
      }
      this.dto = {
        isVolunteer: orderDetail.isVolunteer,
        orderNo: orderDetail.ticketRefundOrderNo,
        originPurchaseOrderNo: orderDetail.originIssueOrderNo,
        adultBigPnr: orderDetail.adultPnr.split('|')[0],
        adultSmallPnr: orderDetail.adultPnr.split('|')[1],
        purchaseTicketList: purchaseTicketList
      }
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
        this.loading = false
      })
    },
    createData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.btnLoading = true
          createRefundPurchaseOrder(this.dto).then(response => {
            this.btnLoading = false
            this.dialogFormVisible = false
            if (response.status === '200') {
              this.$emit('handleFilter', true)
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
          }).catch((error) => {
            this.btnLoading = false
            throw error
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dto = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.btnLoading = true
          delete this.dto.orderFlightList
          updateRefundPurchaseOrder(this.dto).then(response => {
            this.btnLoading = false
            this.dialogFormVisible = false
            if (response.status === '200') {
              this.$emit('handleFilter', true)
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
          }).catch((error) => {
            this.btnLoading = false
            throw error
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    delPassenger(index) {
      this.dto.purchaseTicketList.splice(index, 1)
    },
    cancel() {
      this.dialogFormVisible = false
      this.$emit('handleFilter', true)
    },
    handlerChange(row) {
      row.purchaseRefundAmount =
        Number(row.purchasePaymentAmount) -
        Number(row.changeFeesAmount) -
        Number(row.refundFeesAmount)
    }
  }
}
</script>

<style scoped></style>
