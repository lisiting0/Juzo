<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    :before-close="handleClose"
    width="60%"
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
          <el-form-item label="出票采购订单号" prop="issuePurchaseOrderNo">
            <el-input
              v-model.trim="dto.issuePurchaseOrderNo"
              clearable
              placeholder="出票采购订单号"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单状态" prop="purchaseOrderStatus">
            <el-select v-model="dto.purchaseOrderStatus" placeholder="采购订单状态" clearable>
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
          <el-form-item label="改签采购订单号" prop="changePurchaseOrderNo">
            <el-input
              v-model.trim="dto.changePurchaseOrderNo"
              clearable
              placeholder="改签订单号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="大编码" prop="adultBigPnr">
            <el-input
              v-model.trim="dto.adultBigPnr"
              clearable
              placeholder="大编码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小编码" prop="adultSmallPnr">
            <el-input
              v-model.trim="dto.adultSmallPnr"
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
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付平台" prop="purchasePayPlatform">
            <el-select
              v-model="dto.purchasePayPlatform"
              placeholder="支付平台"
              clearable
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
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付状态" prop="purchasePayStatus">
            <el-select
              v-model="dto.purchasePayStatus"
              placeholder="purchasePayStatus"
              clearable
            >
              <el-option
                v-for="option in purchasePayStatusOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单总金额" prop="purchasePayAmount">
            <el-input
              v-model.number="dto.purchasePayAmount"
              :min="1"
              clearable
              placeholder="订单总金额"
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
            width="200"
            prop="changeCarrierTicketNo"
            label="新票号"
          >
            <template slot-scope="scope">
              <div v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList" :key="'changeCarrierTicketNo'+ segIndex">
                <el-form-item>
                  <!-- :prop="`purchaseTicketList[${scope.$index}].segmentPurchaseInfoList[${segIndex}].changeCarrierTicketNo`"
                  :rules="formRules.ticketNo"  -->
                  <el-input
                    v-model.trim="segItem.changeCarrierTicketNo"
                    clearable
                    placeholder="新票号"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="80"
            prop="changeCabinCode"
            label="新舱位"
          >
            <template slot-scope="scope">
              <div v-for="(segItem, segIndex) in scope.row.segmentPurchaseInfoList" :key="'changeCabinCode'+ segIndex">
                <el-form-item
                  :prop="`purchaseTicketList[${scope.$index}].segmentPurchaseInfoList[${segIndex}].changeCabinCode`"
                  :rules="formRules.cabin"
                >
                  <el-input
                    v-model.trim="segItem.changeCabinCode"
                    clearable
                    placeholder="新舱位"
                    class="w-60"
                  />
                </el-form-item>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="priceDifference"
            label="升舱费"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].priceDifference`"
              >
                <el-input
                  v-model.number="scope.row.priceDifference"
                  clearable
                  placeholder="升舱费"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="feesAmount"
            label="改签费"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].feesAmount`"
              >
                <el-input
                  v-model.number="scope.row.feesAmount"
                  clearable
                  placeholder="改签费"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="serviceAmount"
            label="服务费"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].serviceAmount`"
              >
                <el-input
                  v-model.number="scope.row.serviceAmount"
                  clearable
                  placeholder="服务费"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="paymentAmount"
            label="支付总价"
          >
            <template slot-scope="scope">
              <el-form-item
                :prop="`purchaseTicketList[${scope.$index}].paymentAmount`"
                :rules="formRules.paymentAmount"
              >
                <el-input
                  v-model.number="scope.row.paymentAmount"
                  :min="1"
                  clearable
                  placeholder="支付总价"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            v-if="dto.purchaseTicketList.length > 1"
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
import PurchasePayStatusTypeEnum from '@/enum/PurchasePayStatusType'
import { updateChangePurchaseOrder, createChangePurchaseOrder } from '@/api/agent/change-order'
import rules from '@/utils/rules'
import PurchaseOrderStatusTypeEnum from '@/enum/PurchaseOrderStatusType'

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
      purchasePayStatusOptions: [],
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
        cabin: [{
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
        }],
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
    this.ticketChannelTypeOptions = Object.keys(TicketChannelTypeEnum.TicketChannelType).map(key => ({
      value: TicketChannelTypeEnum.TicketChannelType[key],
      label: this.$t(`AdminService["Enum:TicketChannelType:${TicketChannelTypeEnum.TicketChannelType[key]}"]`)
    }))
    this.purchasePayPlatformTypeOptions = Object.keys(PurchasePayPlatformTypeEnum.PurchasePayPlatformType).map(key => ({
      value: PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key],
      label: this.$t(`AdminService["Enum:PurchasePayPlatformType:${PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key]}"]`)
    }))
    this.purchasePayStatusOptions = Object.keys(PurchasePayStatusTypeEnum.PurchasePayStatusType).map(key => ({
      value: PurchasePayStatusTypeEnum.PurchasePayStatusType[key],
      label: this.$t(`AdminService["Enum:PurchasePayStatusType:${PurchasePayStatusTypeEnum.PurchasePayStatusType[key]}"]`)
    }))
    this.purchaseOrderStatusTypeOptions = Object.keys(PurchaseOrderStatusTypeEnum.PurchaseOrderStatusType).map(key => ({
      value: PurchaseOrderStatusTypeEnum.PurchaseOrderStatusType[key],
      label: this.$t(`AdminService["Enum:PurchaseOrderStatusType:${PurchaseOrderStatusTypeEnum.PurchaseOrderStatusType[key]}"]`)
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
    resetFlied() {
      this.dto = {
        purchaseTicketList: []
      }
    },
    purchasePayAmountChange(val) {
      const averagePaidPrice = val / this.dto.purchaseTicketList.length
      this.dto.purchaseTicketList.forEach(element => {
        element.paymentAmount = averagePaidPrice
      })
    },
    handleCreate(orderDetail, selfChangeTicketPurchaseOrderList) {
      this.resetFlied()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.loading = true
      const purchaseTicketListTemp = []
      if (selfChangeTicketPurchaseOrderList.length > 0) {
        // 筛选原订单乘机人和已下采购单的乘机人
        const orderPassengerIds = selfChangeTicketPurchaseOrderList.flatMap((item) => item.purchaseTicketList.map((ticket) => ticket.orderPassengerId))
        const filteredPassengers = orderDetail.originOrderPassengerBOList.filter((passenger) =>
          !orderPassengerIds.includes(passenger.passengerId)
        )
        filteredPassengers.forEach(pasEle => {
          purchaseTicketListTemp.push({
            orderPassengerId: pasEle.passengerId,
            passengerBO: {
              lastName: pasEle.lastName,
              firstName: pasEle.firstName,
              passengerType: pasEle.passengerType
            },
            priceDifference: 0,
            feesAmount: 0,
            serviceAmount: 0,
            paymentAmount: 0,
            segmentPurchaseInfoList: orderDetail.originOrderFlightBOList.map((fEle, fIndex) => { return { changeCabinCode: fEle.cabinCode, segmentNumber: fIndex } })
          })
        })
      } else {
        orderDetail.originOrderPassengerBOList.forEach(pasEle => {
          purchaseTicketListTemp.push({
            orderPassengerId: pasEle.passengerId,
            passengerBO: {
              lastName: pasEle.lastName,
              firstName: pasEle.firstName,
              passengerType: pasEle.passengerType
            },
            priceDifference: 0,
            feesAmount: 0,
            serviceAmount: 0,
            paymentAmount: 0,
            segmentPurchaseInfoList: orderDetail.originOrderFlightBOList.map((fEle, fIndex) => { return { changeCabinCode: fEle.cabinCode, segmentNumber: fIndex } })
          })
        })
      }
      this.dto = {
        orderNo: orderDetail.changeOrderNo,
        issuePurchaseOrderNo: orderDetail.issueOrderNo,
        adultBigPnr: orderDetail.adultPnr.split('|')[0],
        adultSmallPnr: orderDetail.adultPnr.split('|')[1],
        purchaseTicketList: purchaseTicketListTemp
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
          createChangePurchaseOrder(this.dto).then(response => {
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
          updateChangePurchaseOrder(this.dto).then(response => {
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
    }
  }
}
</script>

<style scoped></style>
