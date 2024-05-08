<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    width="80%"
    top="5vh"
    :title="dialogStatus == 'create' ? $t('table.add') : $t('table.edit')"
    :before-close="handleClose"
  >
    <el-form ref="formRef" label-width="150px" :model="dto" :rules="formRules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="采购订单号" prop="issuePurchaseOrderNo">
            <el-input
              v-model="dto.issuePurchaseOrderNo"
              clearable
              placeholder="采购订单号"
              :disabled="orderStatus === 3"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购订单状态" prop="purchaseOrderStatus">
            <!-- <el-input v-model="dto.purchaseOrderStatus" clearable placeholder="采购订单号" /> -->
            <el-select
              v-model="dto.purchaseOrderStatus"
              placeholder="采购订单状态"
              clearable
              :disabled="orderStatus === 3"
            >
              <el-option
                v-for="option in purchaseOrderStatusTypeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="大编码" prop="adultBigPnr">
            <el-input
              v-model="dto.adultBigPnr"
              clearable
              placeholder="大编码"
              :disabled="orderStatus === 3"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小编码" prop="adultSmallPnr">
            <el-input
              v-model="dto.adultSmallPnr"
              clearable
              placeholder="小编码"
              :disabled="orderStatus === 3"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出票渠道" prop="ticketChannel">
            <el-select
              v-model="dto.ticketChannel"
              placeholder="出票渠道"
              clearable
              :disabled="orderStatus === 3"
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
          <el-form-item label="下单账号" prop="officeNo">
            <el-input
              v-model.number="dto.officeNo"
              clearable
              placeholder="下单账号"
              :disabled="orderStatus === 3"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付平台" prop="purchasePayPlatform">
            <el-select
              v-model="dto.purchasePayPlatform"
              placeholder="支付平台"
              clearable
              :disabled="orderStatus === 3"
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
              :disabled="orderStatus === 3"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付状态" prop="purchasePayStatus">
            <el-select
              v-model="dto.purchasePayStatus"
              :disabled="orderStatus === 3"
            >
              <el-option
                v-for="option in purchasePayStatusTypeOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付流水号" prop="purchasePayFlowNo">
            <el-input
              v-model.trim="dto.purchasePayFlowNo"
              clearable
              placeholder="支付流水号"
              :disabled="orderStatus === 3"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单总金额" prop="purchasePayAmount">
            <el-input
              v-model.number="dto.purchasePayAmount"
              :min="1"
              clearable
              placeholder="订单总金额"
              :disabled="orderStatus === 3"
              @change="purchasePayAmountChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="dto.remark"
          clearable
          placeholder="备注"
          :disabled="orderStatus === 3"
        />
      </el-form-item>
      <el-form-item>
        <el-table
          border
          :data="dto.purchaseTicketList"
          :header-row-class-name="'gray-row'"
          style="width: 100%"
        >
          <el-table-column align="center" prop="" label="乘机人">
            <template slot-scope="{ row }">
              <span>{{
                row.passengerBO.lastName + row.passengerBO.firstName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="80"
            prop="passengerType"
            label="乘客类型"
          >
            <template slot-scope="{ row }">
              {{
                $t(
                  `AdminService["Enum:PassengerType:${row.passengerBO.passengerType}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="200"
            prop=" carrierTicketNo"
            label="票号"
          >
            <template slot-scope="scope">
              <div
                v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList"
                :key="'carrierTicketNo' + segIndex"
              >
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
            width="140"
            prop="cabinCode"
            label="舱位/运价基础"
          >
            <template slot-scope="scope">
              <div
                v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList"
                :key="'cabinCode' + segIndex"
              >
                <el-form-item
                  :prop="`purchaseTicketList[${scope.$index}].segmentPurchaseInfoList[${segIndex}].cabinCode`"
                  :rules="formRules.cabin"
                >
                  <el-input
                    v-model.trim="segItem.cabinCode"
                    clearable
                    placeholder="舱位"
                    class="w-100"
                    :disabled="orderStatus === 3"
                  />
                  <el-input
                    v-model.trim="segItem.fareBaseCode"
                    clearable
                    placeholder="运价基础"
                    class="w-120"
                    :disabled="orderStatus === 3"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="purchaseTicketPrice"
            label="票面价"
          >
            <template slot-scope="scope">
              <el-form-item :prop="`purchaseTicketList[${scope.$index}].purchaseTicketPrice`">
                <el-input
                  v-model.number="scope.row.purchaseTicketPrice"
                  clearable
                  placeholder="票面价"
                  class="w-80"
                  :disabled="orderStatus === 3"
                  @input="handlerChange(scope.row)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="purchaseAgencyFees"
            label="代理费"
          >
            <template slot-scope="scope">
              <div
                v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList"
                :key="'cabinCode' + segIndex"
              >
                <el-form-item
                  :prop="`purchaseTicketList[${scope.$index}].segmentPurchaseInfoList[${segIndex}].purchaseAgencyFees`"
                  :rules="formRules.purchaseAgencyFees"
                >
                  <el-input
                    v-model.trim="segItem.purchaseAgencyFees"
                    clearable
                    placeholder="代理费"
                    class="w-60"
                    :disabled="orderStatus === 3"
                    @input="handlerChange(scope.row)"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="couponAmount" label="优惠券">
            <template slot-scope="scope">
              <div
                v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList"
                :key="'cabinCode' + segIndex"
              >
                <el-form-item
                  :prop="`purchaseTicketList[${scope.$index}].segmentPurchaseInfoList[${segIndex}].couponAmount`"
                  :rules="formRules.couponAmount"
                >
                  <el-input
                    v-model.trim="segItem.couponAmount"
                    clearable
                    placeholder="优惠券"
                    class="w-60"
                    :disabled="orderStatus === 3"
                    @input="handlerChange(scope.row)"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="flightTax" label="基建">
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].flightTax`"
              >
                <el-input
                  v-model.number="scope.row.flightTax"
                  clearable
                  placeholder="基建"
                  :disabled="orderStatus === 3"
                  @input="handlerChange(scope.row)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="fuelTax" label="燃油">
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].fuelTax`"
              >
                <el-input
                  v-model.number="scope.row.fuelTax"
                  clearable
                  placeholder="燃油"
                  :disabled="orderStatus === 3"
                  @input="handlerChange(scope.row)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="rebate" label="后返">
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].rebate`"
              >
                <el-input
                  v-model.number="scope.row.rebate"
                  clearable
                  placeholder="后返"
                  :disabled="orderStatus === 3"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="additionalAmount" label="额外成本">
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].additionalAmount`"
              >
                <el-input
                  v-model.number="scope.row.additionalAmount"
                  clearable
                  placeholder="额外成本"
                  :disabled="orderStatus === 3"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="paymentAmount"
            label="支付金额"
          >
            <template slot-scope="scope">
              <el-form-item :prop="`purchaseTicketList[${scope.$index}].paymentAmount`">
                <el-input
                  v-model.number="scope.row.paymentAmount"
                  :min="1"
                  clearable
                  placeholder="支付金额"
                  class="w-80"
                  :disabled="orderStatus === 3"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            v-if="orderStatus !== 3"
            align="center"
            width="100"
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
import TicketChannelTypeEnum from '@/enum/TicketChannelType'
import PurchasePayPlatformTypeEnum from '@/enum/PurchasePayPlatformType'
import PurchasePayStatusTypeEnum from '@/enum/PurchasePayStatusType'
import PurchaseOrderStatusTypeEnum from '@/enum/PurchaseOrderStatusType'
import {
  createIssueTicketSelfPurchaseOrder,
  updateIssueTicketSelfPurchaseOrder
} from '@/api/agent/issue-order'
import rules from '@/utils/rules'

export default {
  name: 'CreateEditPurchaseOrder',
  props: {},
  data() {
    return {
      orderStatus: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      loading: false,
      btnLoading: false,
      ticketChannelTypeOptions: [],
      purchasePayPlatformTypeOptions: [],
      purchasePayStatusTypeOptions: [],
      purchaseOrderStatusTypeOptions: [],
      purchaseOrderId: '',
      dto: {
        purchaseTicketList: []
      },
      formRules: {
        changePurchaseOrderNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        ticketChannel: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        officeNo: [
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
        purchasePayStatus: [
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
        ticketNo: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateTicketNo
          }
        ],
        cabin: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入新舱位'))
              }
              const reg1 = /^[A-Z]{1}$/
              if (reg1.test(value)) {
                callback()
              } else {
                callback(new Error('请填写正确的舱位'))
              }
            }
          }
        ],
        paymentAmount: [
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
    this.ticketChannelTypeOptions = Object.keys(
      TicketChannelTypeEnum.TicketChannelType
    ).map((key) => ({
      value: TicketChannelTypeEnum.TicketChannelType[key],
      label: this.$t(`AdminService["Enum:TicketChannelType:${TicketChannelTypeEnum.TicketChannelType[key]}"]`)
    }))
    this.purchasePayPlatformTypeOptions = Object.keys(
      PurchasePayPlatformTypeEnum.PurchasePayPlatformType
    ).map((key) => ({
      value: PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key],
      label: this.$t(`AdminService["Enum:PurchasePayPlatformType:${PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key]}"]`)
    }))
    this.purchasePayStatusTypeOptions = Object.keys(
      PurchasePayStatusTypeEnum.PurchasePayStatusType
    ).map((key) => ({
      value: PurchasePayStatusTypeEnum.PurchasePayStatusType[key],
      label: this.$t(`AdminService["Enum:PurchasePayStatusType:${PurchasePayStatusTypeEnum.PurchasePayStatusType[key]}"]`)
    }))
    this.purchaseOrderStatusTypeOptions = Object.keys(
      PurchaseOrderStatusTypeEnum.PurchaseOrderStatusType
    ).map((key) => ({
      value: PurchaseOrderStatusTypeEnum.PurchaseOrderStatusType[key],
      label: this.$t(`AdminService["Enum:PurchaseOrderStatusType:${PurchaseOrderStatusTypeEnum.PurchaseOrderStatusType[key]}"]`)
    }))
  },
  mounted() {},
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
    purchasePayAmountChange(val) {
      const averagePaidPrice = val / this.dto.purchaseTicketList.length
      this.dto.purchaseTicketList.forEach((element) => {
        element.paymentAmount = averagePaidPrice
      })
    },
    handleCreate(orderDetail, selfIssueTicketPurchaseOrderList) {
      this.resetFlied()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.loading = true
      const purchaseTicketListTemp = []
      if (selfIssueTicketPurchaseOrderList.length > 0) {
        // 筛选原订单乘机人和已下采购单的乘机人
        const orderPassengerIds = selfIssueTicketPurchaseOrderList.flatMap(
          (item) =>
            item.purchaseTicketList.map((ticket) => ticket.orderPassengerId)
        )
        const filteredPassengers = orderDetail.orderPassengerBOList.filter(
          (passenger) => !orderPassengerIds.includes(passenger.passengerId)
        )
        filteredPassengers.forEach((pasEle) => {
          purchaseTicketListTemp.push({
            orderPassengerId: pasEle.passengerId,
            passengerBO: {
              lastName: pasEle.lastName,
              firstName: pasEle.firstName,
              passengerType: pasEle.passengerType
            },
            purchaseTicketPrice: pasEle.originTicketPrice,
            flightTax: pasEle.flightTax,
            fuelTax: pasEle.fuelTax,
            additionalAmount: 0,
            paymentAmount: 0,
            rebate: 0,
            segmentPurchaseInfoList: orderDetail.orderFlightBOList.map(
              (fEle, fIndex) => ({
                cabinCode: fEle.cabinCode,
                carrierTicketNo: '',
                couponAmount: 0,
                fareBaseCode: '',
                purchaseAgencyFees: 0,
                segmentNumber: fIndex
              })
            )
          })
        })
      } else {
        orderDetail.orderPassengerBOList.forEach((pasEle) => {
          purchaseTicketListTemp.push({
            orderPassengerId: pasEle.passengerId,
            passengerBO: {
              lastName: pasEle.lastName,
              firstName: pasEle.firstName,
              passengerType: pasEle.passengerType
            },
            purchaseTicketPrice: pasEle.originTicketPrice,
            flightTax: pasEle.flightTax,
            fuelTax: pasEle.fuelTax,
            additionalAmount: 0,
            paymentAmount: 0,
            rebate: 0,
            segmentPurchaseInfoList: orderDetail.orderFlightBOList.map(
              (fEle, fIndex) => ({
                cabinCode: fEle.cabinCode,
                carrierTicketNo: '',
                couponAmount: 0,
                fareBaseCode: '',
                purchaseAgencyFees: 0,
                segmentNumber: fIndex
              })
            )
          })
        })
      }
      this.dto = {
        issueOrderNo: orderDetail.ticketIssueOrderNo,
        purchaseTicketList: purchaseTicketListTemp
      }
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
        this.loading = false
      })
    },
    createData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          createIssueTicketSelfPurchaseOrder(this.dto)
            .then((response) => {
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
            })
            .catch((error) => {
              this.btnLoading = false
              throw error
            })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    handleUpdate(row, orderStatus) {
      // console.log('--------this.row', row)
      // this.orderStatus = orderStatus
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // this.dto = Object.assign({}, row)
      this.dto = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          delete this.dto.orderFlightList
          updateIssueTicketSelfPurchaseOrder(this.dto)
            .then((response) => {
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
            })
            .catch((error) => {
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
    handlerChange(row) {
      var sumOtherfee = 0
      row.segmentPurchaseInfoList.forEach((element) => {
        sumOtherfee =
          sumOtherfee +
          Number(element.purchaseAgencyFees) +
          Number(element.couponAmount)
      })
      row.paymentAmount =
        Number(row.purchaseTicketPrice) +
        Number(row.flightTax) +
        Number(row.fuelTax) -
        Number(sumOtherfee)
      var sumPurchasePayAmount = 0
      this.dto.purchaseTicketList.forEach((element) => {
        sumPurchasePayAmount = sumPurchasePayAmount + element.paymentAmount
      })
      this.dto.purchasePayAmount = sumPurchasePayAmount
    }
  }
}
</script>

<style scoped></style>
