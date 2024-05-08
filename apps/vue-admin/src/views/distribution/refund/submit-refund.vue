<template>
  <el-dialog
    width="80%"
    top="2vh"
    :visible.sync="dialogFormVisible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :label-position="'right'"
      label-width="115px"
      :model="detailInfo"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item prop="isVolunteer" label="退票类型">
            <el-radio-group v-model="submitData.isVolunteer">
              <el-radio :label="0">自愿</el-radio>
              <el-radio :label="1">非自愿</el-radio>
            </el-radio-group>
            <el-checkbox v-model="submitData.cancelSeat" :true-label="1" :false-label="0" style="margin-left: 30px;">委托平台取消机位</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col v-if="submitData.isVolunteer === 1" :span="12">
          <el-form-item prop="refundTicketReason" label="非自愿退票原因">
            <el-select v-model="submitData.refundTicketReason" clearable size="mini" style="width: 500px">
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
      <el-form-item v-if="submitData.isVolunteer === 1" prop="fileList" label="上传附件">
        <el-upload
          class="upload-demo"
          action=""
          :auto-upload="false"
          :on-change="handleAvatarSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" class="mt-10">
        <el-input
          v-model="submitData.remark"
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
        />
      </el-form-item>

      <el-form-item label="选择航程">
        <div>
          <el-table
            :data="detailInfo.orderFlightBOList"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column align="center" prop="segmentType" label="行程">
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:SegmentType:${scope.row.segmentType}"]`) }}
              </template>
            </el-table-column>
            <el-table-column label="起飞-到达" prop="depatureAirport" align="center" width="350">
              <template slot-scope="scope">
                <div>起飞：{{ scope.row.departureAirportName }}({{ scope.row.departureAirportCode }})--{{ scope.row.departureTime }}</div>
                <div>到达：{{ scope.row.arrivalAirportName }}({{ scope.row.arrivalAirportCode }}--{{ scope.row.arrivalTime }})</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="航班号" prop="flightNumber" />
            <el-table-column align="center" label="舱位" prop="cabinCode" />
            <el-table-column align="center" label="舱位等级">
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:CabinClassType:${scope.row.cabinLevel}"]`) }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="aircraftCode" label="机型" />
            <el-table-column align="center" prop="departureTerminal" label="出发航站楼" />
            <el-table-column align="center" prop="arrivalTerminal" label="到达航站楼" />
          </el-table>
        </div>
      </el-form-item>

      <el-form-item label="选择乘机人">
        <div>
          <el-table
            :data="detailInfo.orderPassengerBOList"
            border
            style="width: 100%"
            @selection-change="passengerHandleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column label="乘机人">
              <template slot-scope="scope">
                {{ scope.row.lastName }} {{ scope.row.firstName }}
              </template>
            </el-table-column>
            <el-table-column label="证件类型" prop="cardType">
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:IdentityCardType:${scope.row.cardType}"]`) }}
                <el-popover placement="top-start" width="200" trigger="hover">
                  <p>国籍:{{ scope.row.nationality }}</p>
                  <p>签发地:{{ scope.row.cardIssuePlace }}</p>
                  <p>证件有效期:{{ scope.row.cardExpired }}</p>
                  <el-link slot="reference" type="success">详情</el-link>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="票号" prop="carrierTicketNo" />
            <el-table-column :width="180" label="证件号" prop="cardNum" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="originTicketPrice" label="票面价">
              <template slot-scope="scope">
                <div v-if="scope.row.changeTicketPrice != undefined && scope.row.changeTicketPrice != null"> {{ scope.row.changeTicketPrice }}</div>
                <div v-if="scope.row.changeTicketPrice == undefined || scope.row.changeTicketPrice == null"> {{ scope.row.originTicketPrice }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="soldTicketPrice" label="销售价">
              <template slot-scope="scope">
                <div v-if="scope.row.changeSoldTicketPrice != undefined && scope.row.changeSoldTicketPrice != null"> {{ scope.row.changeTicketPrice }}</div>
                <div v-if="scope.row.changeSoldTicketPrice == undefined || scope.row.changeSoldTicketPrice == null"> {{ scope.row.soldTicketPrice }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="airportTax" label="基建/燃油">
              <template slot-scope="scope">
                <span v-if="scope.row.changeFlightTax != undefined && scope.row.changeFlightTax != null">
                  <div>{{ scope.row.changeFlightTax }}</div>
                  <div>{{ scope.row.changeFuelTax }}</div>
                </span>
                <span v-if="scope.row.changeFlightTax == undefined || scope.row.changeFlightTax == null">
                  <div>{{ scope.row.flightTax }}</div>
                  <div>{{ scope.row.fuelTax }}</div>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>

      <el-form-item v-if="orderInsuranceShowList != undefined && orderInsuranceShowList != null && orderInsuranceShowList.length != 0" label="保险处理">
        <span style="color: #ff0000;};">（起飞前退票可以退保，起飞后退票不能退保）</span>
        <br>
        <el-table
          :data="orderInsuranceShowList"
          border
          style="width: 100%"
          @selection-change="handleInsuranceSelection"
        >
          <el-table-column
            type="selection"
            :selectable="selectableFunc"
            width="55"
          />
          <el-table-column label="乘机人" prop="passengerName" />
          <el-table-column label="保险类型" prop="insuranceType">
            <template slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:InsuranceType:${scope.row.insuranceType}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column label="投保状态" prop="insuranceStatus">
            <template slot-scope="scope">
              {{
                $t(
                  `AdminService["Enum:InsuranceOrderStatus:${scope.row.insuranceStatus}"]`
                )
              }}
            </template>
          </el-table-column>
          <el-table-column label="保险公司" prop="insuranceCompany" />
          <el-table-column label="保险名称" prop="insuranceName" />
          <el-table-column label="保险金额" prop="insuranceSalePrice">
            <template slot-scope="scope">
              {{ scope.row.insuranceSalePrice * scope.row.number }}
            </template>
          </el-table-column>
          <el-table-column label="单保险销售价" prop="insuranceSalePrice" />
          <el-table-column label="购买份数" prop="number" />
        </el-table>
        <div>
          预计退款保险金额: <span style="color: red;">￥{{ chooseInsuranceAmount }}</span>
        </div>
      </el-form-item>

      <el-form-item label="退票费用明细">
        <div v-if="issueRefundAmount != undefined && issueRefundAmount != null && issueRefundAmount != 0">
          出票单退款信息:
          <el-table :data="issueRefundList" border style="width: 100%">
            <el-table-column label="乘机人" prop="passengerName" />
            <el-table-column label="类型" prop="passengerType">
              <template v-if="scope.row.passengerType != null" slot-scope="scope">
                {{
                  $t(
                    `AdminService["Enum:PassengerType:${scope.row.passengerType}"]`
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column label="原单号" prop="originOrderNo" width="150" />
            <el-table-column label="航程数" prop="segmentNumber">
              <template slot-scope="scope">
                第{{ scope.row.segmentNumber + 1 }}程
              </template>
            </el-table-column>
            <el-table-column label="舱位" prop="cabinCode" />
            <el-table-column prop="originTicketPrice" label="票面价" />
            <el-table-column prop="soldTicketPrice" label="销售价" />
            <el-table-column prop="airportTax" label="基建/燃油" />
            <el-table-column prop="paymentAmount" label="实付金额" />
            <el-table-column prop="refundFeesRate" label="退票手续费费率">
              <template slot-scope="scope">
                {{ scope.row.refundFeesRate * 100 }}%
              </template>
            </el-table-column>
            <el-table-column prop="refundFeesAmount" label="退票手续费" />
            <el-table-column label="当前应用客规" prop="nowGuestRule">
              <template slot-scope="scope">
                  <span v-if="scope.row.nowGuestRule">
                    {{ scope.row.nowGuestRule.beforeMinDistanceHours }} - {{ scope.row.nowGuestRule.beforeMaxDistanceHours }} ({{ scope.row.nowGuestRule.feesRate }})
                  </span>
              </template>
            </el-table-column>
            <el-table-column label="下一客规及时间点" prop="originCabinCode">
              <template slot-scope="scope">
                  <span v-if="scope.row.nextGuestRule">
                    相差分钟: {{ scope.row.nextGuestRuleMinute }}
                    <br>
                    {{ scope.row.nextGuestRule.beforeMinDistanceHours }} - {{ scope.row.nextGuestRule.beforeMaxDistanceHours }} ({{ scope.row.nextGuestRule.feesRate }})
                  </span>
              </template>
            </el-table-column>
            <el-table-column prop="refundAmount" label="退票金额" />
          </el-table>
          <div>
            预计退款金额: <span style="color: red;">￥{{ issueRefundAmount }}</span>
          </div>
        </div>

        <div v-if="changeRefundAmount != undefined && changeRefundAmount != null && changeRefundAmount != 0">
          改签单退款信息:
          <el-table :data="changeRefundList" border style="width: 100%">
            <el-table-column label="乘机人" prop="passengerName" />
            <el-table-column label="类型" prop="passengerType">
              <template v-if="scope.row.passengerType != null" slot-scope="scope">
                {{
                  $t(
                    `AdminService["Enum:PassengerType:${scope.row.passengerType}"]`
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column label="原单号" prop="originOrderNo" width="150" />
            <el-table-column label="航程数" prop="segmentNumber">
              <template slot-scope="scope">
                第{{ scope.row.segmentNumber + 1 }}程
              </template>
            </el-table-column>
            <el-table-column label="舱位" prop="cabinCode" />
            <el-table-column prop="changeFeesAmount" label="改签手续费" />
            <el-table-column prop="priceDifference" label="升舱费" />
            <!--            <el-table-column prop="airportTax" label="基建/燃油" />-->
            <el-table-column prop="paymentAmount" label="实付金额" />
            <el-table-column prop="refundFeesRate" label="退票手续费费率">
              <template slot-scope="scope">
                {{ scope.row.refundFeesRate * 100 }}%
              </template>
            </el-table-column>
            <el-table-column prop="refundFeesAmount" label="退票手续费" />
            <el-table-column label="当前应用客规" prop="nowGuestRule">
              <template slot-scope="scope">
                  <span v-if="scope.row.nowGuestRule">
                    {{ scope.row.nowGuestRule.beforeMinDistanceHours }} - {{ scope.row.nowGuestRule.beforeMaxDistanceHours }} ({{ scope.row.nowGuestRule.feesRate }})
                  </span>
              </template>
            </el-table-column>
            <el-table-column label="下一客规及时间点" prop="originCabinCode">
              <template slot-scope="scope">
                  <span v-if="scope.row.nextGuestRule">
                    相差分钟: {{ scope.row.nextGuestRuleMinute }}
                    <br>
                    {{ scope.row.nextGuestRule.beforeMinDistanceHours }} - {{ scope.row.nextGuestRule.beforeMaxDistanceHours }} ({{ scope.row.nextGuestRule.feesRate }})
                  </span>
              </template>
            </el-table-column>
            <el-table-column prop="refundAmount" label="退票金额" />
          </el-table>
          <div>
            预计退款金额: <span style="color: red;">￥{{ changeRefundAmount }}</span>
          </div>
        </div>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="submit"> 提交 </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import RefundTypeEnum from '@/enum/refundType'
  import RefundReasonTypeEnum from '@/enum/refundReasonType'
  import { refundOrderCreate, refundPreAmountQuery } from '@/api/agent/refund-order'
  import { issueOrderDetail } from '@/api/agent/issue-order'
  import { changeOrderDetail } from '@/api/agent/change-order'
  import { queryOrderInsurance } from '@/api/agent/order-insurance'

  export default {
    name: 'SubmitRefund',
    data() {
      return {
        // 展示交互数据
        detailInfo: {},
        dialogFormVisible: false,
        refundTypeOptions: [],
        refundReasonTypeOptions: [],
        fileList: [],

        // 乘客下保险展示信息
        orderInsuranceShowList: [],

        // 退票费用展示信息
        chooseInsuranceAmount: null,
        issueRefundAmount: null,
        changeRefundAmount: null,
        issueRefundList: null,
        changeRefundList: null,

        // 提交传递信息
        submitData: {
          orderNo: '',
          isVolunteer: 0,
          refundTicketReason: null,
          cancelSeat: 0,
          remark: '',
          orderFlightIdList: null,
          orderPassengerIdList: null,
          orderInsuranceIdList: null
        }
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
      this.refundTypeOptions = Object.keys(RefundTypeEnum.RefundType).map(key => ({
        value: RefundTypeEnum.RefundType[key],
        label: key
      }))
      this.refundReasonTypeOptions = Object.keys(RefundReasonTypeEnum.RefundReasonType).map(key => ({
        value: RefundReasonTypeEnum.RefundReasonType[key],
        label: key
      }))
    },
    methods: {
      // 打开申请退票页面
      detail(orderNo, type) {
        this.submitData.orderNo = orderNo
        // type区分是出票 | 改签, 查询对应的退票展示信息
        if (type === 0) {
          issueOrderDetail(orderNo, 0).then((response) => {
            if (response.status === '200') {
              this.detailInfo = response.data
            }
          })
        } else {
          changeOrderDetail(orderNo).then((response) => {
            if (response.status === '200') {
              this.detailInfo = response.data
              this.detailInfo.orderPassengerBOList = response.data.changeOrderPassengerBOList
              this.detailInfo.orderFlightBOList = response.data.changeOrderFlightBOList
            }
          })
        }
        this.dialogFormVisible = true
      },
      // 获取图片转base64
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          const reader = new FileReader()
          let imgResult = ''
          reader.readAsDataURL(file)
          reader.onload = function() {
            imgResult = reader.result
          }
          reader.onerror = function(error) {
            reject(error)
          }
          reader.onloadend = function() {
            resolve(imgResult)
          }
        })
      },
      handleRemove(file, fileList) {
        this.submitData.appendix = null
        this.fileList = []
      },
      handleAvatarSuccess(file) {
        this.getBase64(file.raw).then(res => {
          const params = res.split(',')
          if (params.length > 0) {
            this.submitData.appendix = res
            this.fileList.push(file)
          }
        })
      },
      // 判断保险是否可选择
      selectableFunc(row, index) {
        return row.isExceedDepartureDate
      },
      // 航程选择
      handleSelectionChange(val) {
        this.submitData.orderFlightIdList = val.map(item => item.id)
        this.issueRefundAmount = null
        this.changeRefundAmount = null
        this.issueRefundList = null
        this.changeRefundList = null
        this.queryRefundAmountList()
      },
      // 乘客选择
      passengerHandleSelectionChange(val) {
        this.submitData.orderPassengerIdList = val.map(item => item.passengerId)
        this.issueRefundAmount = null
        this.changeRefundAmount = null
        this.issueRefundList = null
        this.changeRefundList = null
        this.submitData.orderInsuranceIdList = null

        if (this.submitData.orderPassengerIdList === null || this.submitData.orderPassengerIdList.length === 0) {
          return
        }
        // 查询一下乘客下的保险
        queryOrderInsurance(this.submitData.orderNo, this.submitData.orderPassengerIdList)
          .then((response) => {
            if (response.status === '200') {
              // 保险订单列表
              this.orderInsuranceShowList = response.data
            }
          })
        this.queryRefundAmountList()
      },
      // 进行预退款金额信息的查询展示
      queryRefundAmountList() {
        // 判断是否选择了人员
        if (this.submitData.orderPassengerIdList === undefined || this.submitData.orderPassengerIdList === null || this.submitData.orderPassengerIdList.length === 0) {
          return
        }
        if (this.submitData.orderFlightIdList === undefined || this.submitData.orderFlightIdList === null || this.submitData.orderFlightIdList.length === 0) {
          return
        }
        if (this.submitData.isVolunteer === undefined || this.submitData.isVolunteer === null) {
          this.$message.error('请选择改签类型')
          return
        }
        refundPreAmountQuery({
          orderNo: this.submitData.orderNo,
          orderPassengerIdList: this.submitData.orderPassengerIdList,
          orderFlightIdList: this.submitData.orderFlightIdList,
          isVolunteer: this.submitData.isVolunteer,
          orderInsuranceIdList: this.submitData.orderInsuranceIdList
        }).then((response) => {
          if (response.status === '200') {
            this.issueRefundAmount = response.data.issueRefundAmount
            this.changeRefundAmount = response.data.changeRefundAmount
            this.issueRefundList = response.data.issueRefundList
            this.changeRefundList = response.data.changeRefundList
          }
        })
      },
      submit() {
        if (this.submitData.orderPassengerIdList === undefined || this.submitData.orderPassengerIdList === null || this.submitData.orderPassengerIdList.length === 0) {
          this.$message.error('请选择乘客')
          return
        }
        if (this.submitData.orderFlightIdList === undefined || this.submitData.orderFlightIdList === null || this.submitData.orderFlightIdList.length === 0) {
          this.$message.error('请选择航程')
          return
        }
        this.$confirm('确定要进行所选乘客的退票处理吗？', '退票创建', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          refundOrderCreate(this.submitData).then(response => {
            // this.$emit('handleFilter');
            if (response.status === '200') {
              // 属性回归
              this.dialogFormVisible = false
              this.detailInfo = {}
              this.issueRefundAmount = null
              this.changeRefundAmount = null
              this.issueRefundList = null
              this.changeRefundList = null
              this.submitData = {
                orderNo: '',
                isVolunteer: 0,
                refundTicketReason: null,
                cancelSeat: 0,
                remark: '',
                orderFlightIdList: null,
                orderPassengerIdList: null,
                orderInsuranceIdList: null
              }
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$i18n.t("AdminService['Error']"),
                message: this.$i18n.t("AdminService['ErrorMessage']"),
                type: 'error',
                duration: 2000
              })
            }
          })
        })
      },
      // 选择保险
      handleInsuranceSelection(selection) {
        this.submitData.orderInsuranceIdList = selection.map(item => item.id)
        // 退的保险金额
        this.chooseInsuranceAmount = selection.map(item => item.insuranceSalePrice * item.number).reduce((amount, num) => amount + num, 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
