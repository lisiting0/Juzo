<template>
  <div>
    <el-dialog
      ref="changeFlightDialogRef"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :visible.sync="dialogFormVisible"
      width="85%"
      top="2vh"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :label-position="'right'"
        label-width="100px"
        :model="submitData"
        :rules="submitRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="改签原因" prop="changeReasonType">
              <el-select v-model="submitData.changeReasonType" clearable size="mini" style="width: 500px">
                <el-option
                  v-for="option in changeTypeOptions"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="submitData.remark"
                type="textarea"
                :rows="1"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-show="submitData.changeReasonType !== 0" label="上传附件" prop="fileList">
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

        <el-form-item label="选择原航程">
          <div>
            <el-table
              ref="originalFlightRef"
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
                  {{
                    $t(
                      `AdminService["Enum:SegmentType:${scope.row.segmentType}"]`
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column label="起飞-到达" prop="depatureAirport" align="center" width="350">
                <template slot-scope="scope">
                  <div>起飞：{{ scope.row.departureAirportName }}({{ scope.row.departureAirportCode }})--{{ scope.row.departureTime }}</div>
                  <div>到达：{{ scope.row.arrivalAirportName }}({{ scope.row.arrivalAirportCode }}--{{ scope.row.arrivalTime }})</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="航班号" prop="flightNumber">
                <template slot-scope="scope">
                  {{ scope.row.carrierNumber }}{{ scope.row.flightNumber }}
                </template>
              </el-table-column>
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
                  {{ scope.row.lastName }} {{ scope.row.firstName ? scope.row.firstName : null }}
                </template>
              </el-table-column>
              <el-table-column label="乘机人类型">
                <template slot-scope="scope">
                  {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
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
              <el-table-column prop="originTicketPrice" label="行程总票面价">
                <template slot-scope="scope">
                  <div v-if="scope.row.changeTicketPrice != undefined && scope.row.changeTicketPrice != null"> {{ scope.row.changeTicketPrice }}</div>
                  <div v-if="scope.row.changeTicketPrice == undefined || scope.row.changeTicketPrice == null"> {{ scope.row.originTicketPrice }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="soldTicketPrice" label="行程总销售价">
                <template slot-scope="scope">
                  <div v-if="scope.row.changeSoldTicketPrice != undefined && scope.row.changeSoldTicketPrice != null"> {{ scope.row.changeTicketPrice }}</div>
                  <div v-if="scope.row.changeSoldTicketPrice == undefined || scope.row.changeSoldTicketPrice == null"> {{ scope.row.soldTicketPrice }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="airportTax" label="行程总基建/燃油">
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

        <!-- =====================================选择的新航程数据==================================================== -->

        <el-form-item label="选择新航程">
          <div v-for="(value, key, index) in newChangeShowFlightList" :key="key">
            <div style="color: red">
              {{ key }}
            </div>
            <!-- 日期查询 -->
            <el-date-picker
              v-model="searchChangeFlightDate[key]"
              type="date"
              placeholder="选择起飞日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 250px;margin-right: 10px"
              :clearable="false"
              @input="e=>changeDateHandler(key,e)"
            />
            <div style="display: inline-block;margin-right: 10px;">
              <!-- 航司选择 -->
              <el-select v-model="searchChangeAirline[key]" disabled filterable clearable @change="e=>changeAirlineHandler(key,e)">
                <el-option
                  v-for="option in airlines"
                  :key="option.carrierCode"
                  :value="option.carrierCode"
                  :label="option.carrierName+'('+option.carrierCode+')'"
                >
                  <span style="float: left">{{ option.carrierName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ option.carrierCode }}</span>
                </el-option>
              </el-select>
            </div>
            <!-- 搜索新航班
              搜索框时,如果是多程的话, 则是搜索套餐价格, 需要将两程一起传递过去
            -->
            <el-button v-if="jsonLength <= 1" icon="el-icon-search" type="success" circle @click="newChangeSearch(key,value[0])" />
            <el-button v-if="jsonLength !== 1 && index !== 0" icon="el-icon-search" type="success" circle @click="twoNewChangeSearch" />

            <!-- 展示信息 -->
            <el-table
              v-if="value[0].carrierNumber"
              :ref="key"
              :data="value"
              border
              style="width: 100%;margin-top: 10px;"
            >

              <el-table-column
                align="center"
                prop="segmentType"
                label="航班号"
              >
                <template slot-scope="scope">
                  <div>{{ scope.row.carrierNumber }}{{ scope.row.flightNumber }}</div>
                </template>
              </el-table-column>
              <el-table-column label="起飞-到达" prop="depatureAirport" align="center" width="250">
                <template v-if="scope.row.flightId != null" slot-scope="scope">
                  <div>起飞：{{ scope.row.departureAirportName }}({{ scope.row.departureAirportCode }})</div>
                  <div>到达：{{ scope.row.arrivalAirportName }}({{ scope.row.arrivalAirportCode }})</div>
                </template>
              </el-table-column>
              <el-table-column label="起降时间" prop="depatureAirport" align="center" width="250">
                <template v-if="scope.row.flightId != null" slot-scope="scope">
                  <div>起飞：{{ scope.row.departureTime }}</div>
                  <div>降落：{{ scope.row.arrivalTime }}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="舱位" prop="cabinCode" />
              <el-table-column align="center" prop="aircraftCode" label="成人票面价">
                <template slot-scope="scope">
                  {{ scope.row.originTicketPrice }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="departureTerminal" label="成人机建/燃油">
                <template slot-scope="scope">
                  <div>{{ scope.row.flightTax }}</div>
                  <div>{{ scope.row.fuelTax }}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="surplusNum" label="余位" />
            </el-table>
            <el-divider />
          </div>
        </el-form-item>

        <el-form-item label="">
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人姓名">
                <el-input
                  v-model="submitData.contactName"
                  placeholder="联系人姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人手机号">
                <el-input
                  v-model="submitData.contactPhone"
                  placeholder="联系人手机号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人邮箱">
                <el-input
                  v-model="submitData.contactEmail"
                  placeholder="联系人邮箱"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item v-if="orderInsuranceShowList != undefined && orderInsuranceShowList != null && orderInsuranceShowList.length != 0" label="保险变更">
          <span style="color: #ff0000;};">（可选择是否更改保险到新航班）</span>
          <br>
          <el-table
            :data="orderInsuranceShowList"
            border
            style="width: 100%"
            @selection-change="handleInsuranceSelection"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column label="乘机人" prop="passengerName" />
            <el-table-column label="保险类型" prop="insuranceType">
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:InsuranceType:${scope.row.insuranceType}"]`) }}
              </template>
            </el-table-column>
            <el-table-column label="投保状态" prop="insuranceStatus">
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:InsuranceOrderStatus:${scope.row.insuranceStatus}"]`) }}
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
        </el-form-item>

        <!-- 改签费用明细信息 -->
        <el-form-item label="改签费用明细">
          <div v-if="changeAmountList != undefined && changeAmountList != null && changeAmountList.length != 0">
            <el-table :data="changeAmountList" border style="width: 100%">
              <el-table-column label="类型" prop="passengerType">
                <template v-if="scope.row.passengerType != null" slot-scope="scope">
                  {{ $t(`AdminService["Enum:PassengerType:${scope.row.passengerType}"]`) }}
                </template>
              </el-table-column>
              <el-table-column label="乘机人" prop="passengerName" />
              <el-table-column label="原航程" prop="originFlightName" width="280" />
              <el-table-column label="新航程" prop="flightName" width="280" />
              <el-table-column label="原舱位" prop="originCabinCode" />
              <el-table-column label="原票面价" prop="originTicketPrice" />
              <el-table-column label="新舱位" prop="cabinCode" />
              <el-table-column label="新票面价" prop="newTicketPrice" />
              <el-table-column label="新机建/燃油" prop="originCabinCode">
                <template slot-scope="scope">
                  {{ scope.row.flightTax }}/{{ scope.row.fuelTax }}
                </template>
              </el-table-column>
              <el-table-column label="机建/燃油差价" prop="originCabinCode">
                <template slot-scope="scope">
                  <span v-if="scope.row.passengerType === 2">
                    0/0
                  </span>
                  <span v-if="scope.row.passengerType !== 2">
                    {{ scope.row.flightTaxDifference }}/{{ scope.row.fuelTaxDifference }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="升舱差价" prop="priceDifference" />
              <el-table-column label="改签手续费" prop="changeFeesAmount" />
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
              <el-table-column label="小计" prop="total" />
            </el-table>
            <div>
              预计改签费用总额: <span style="color: red;">￥{{ changeFeesAmount }}</span>
            </div>
          </div>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" align="center">
        <el-button :loading="submitLoadingFlag" @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoadingFlag" @click="submit"> 提交 </el-button>
      </div>
    </el-dialog>

    <choseFlight ref="choseFlightDialog" @handleFilter="handleNewChangeSelectionChange" @handleTwoFilter="twoHandleNewChangeSelectionChange" />

  </div>
</template>

<script>
import ChangeTypeEnum from '@/enum/changeType'
import { fetchList as getAirlinestNoPage } from '@/api/basic/airline'
import { issueOrderDetail } from '@/api/agent/issue-order'
import { changeOrderDetail, changePreFeesAmountQuery, applyCreateChangeOrder, applyTwoCreateChangeOrder } from '@/api/agent/change-order'
import { queryOrderInsurance } from '@/api/agent/order-insurance'
import choseFlight from '../change/chose-flight.vue'

export default {
  name: 'SubmitRefund',
  components: {
    choseFlight
  },
  data() {
    return {
      loading: false,
      submitRules: {
        changeReasonType: [{ required: true, message: '请选择改签类型', trigger: 'change' }]
      },
      // 展示交互数据
      detailInfo: {},
      dialogFormVisible: false,
      submitLoadingFlag: false,
      changeTypeOptions: [],
      fileList: [],

      // 改签航段类型列表
      segmentTypeList: [],

      // 航司数据
      airlines: [],

      // 乘客下保险展示信息
      orderInsuranceShowList: [],

      // 新航班选择展示数据
      newChangeShowFlightList: {},
      searchChangeFlightDate: {},
      searchChangeAirline: {},

      // 改签费用展示信息
      changeFeesAmount: null,
      changeAmountList: null,

      // 提交改签时,需要的
      netFlightInfo: null,
      twonetFlightInfo: [],
      // 提交传递信息
      changeSelectFlightList: {},
      chooseOrderPassengerList: [],
      orderPassengerIdList: null,
      orderFlightList: null,
      // 选择的集合信息
      orderInsuranceIdList: null,
      submitData: {
        orderNo: '',
        changeReasonType: null,
        remark: ''
      }
    }
  },
  computed: {
    jsonLength() {
      return Object.keys(this.newChangeShowFlightList).length
    }
  },
  watch: {},
  created() {
    this.getAirlines()
  },
  mounted() {
    this.changeTypeOptions = Object.keys(ChangeTypeEnum.ChangeType).map(key => ({
      value: ChangeTypeEnum.ChangeType[key],
      label: key
    }))
    //  // dialog默认不提前加载内部元素，需要如下处理，不然没办法找到Dialog内部的ref元素
    // this.dialogFormVisible = true // :visible.sync="open"
    // this.$refs.changeFlightDialogRef.rendered = true // updateInsertDialog是dialog的ref;
    // this.dialogFormVisible = false
  },
  methods: {
    getAirlines() {
      getAirlinestNoPage({
        size: -1,
        current: -1
      }).then((response) => {
        this.airlines = response.data.records
      })
    },
    // 打开申请改签页面
    detail(orderNo, type) {
      this.submitData = {}
      this.dialogFormVisible = true
      this.loading = true
      this.submitData.orderNo = orderNo
      this.$set(this.submitData, 'changeReasonType', 0)
      // type区分是出票 | 改签, 查询对应的改签展示信息
      if (type === 0) {
        issueOrderDetail(orderNo, 0).then((response) => {
          if (response.status === '200') {
            this.detailInfo = response.data
            this.$set(this.submitData, 'contactName', response.data.orderContactBO[0].contactName)
            this.$set(this.submitData, 'contactPhone', response.data.orderContactBO[0].contactPhone)
            this.$set(this.submitData, 'contactEmail', response.data.orderContactBO[0].contactEmail)
            this.$nextTick(function() {
                // 设置表格所有行全部选中
                this.$refs.originalFlightRef.toggleAllSelection()
              })
          }
        })
      } else {
        changeOrderDetail(orderNo).then((response) => {
          if (response.status === '200') {
            this.detailInfo = response.data
            this.detailInfo.orderPassengerBOList = response.data.changeOrderPassengerBOList
            this.detailInfo.orderFlightBOList = response.data.changeOrderFlightBOList
            this.$set(this.submitData, 'contactName', response.data.orderContactBO[0].contactName)
            this.$set(this.submitData, 'contactPhone', response.data.orderContactBO[0].contactPhone)
            this.$set(this.submitData, 'contactEmail', response.data.orderContactBO[0].contactEmail)
            this.$nextTick(function() {
                // 设置表格所有行全部选中
                this.$refs.originalFlightRef.toggleAllSelection()
              })
          }
        })
      }
      this.newChangeShowFlightList = {}
      setTimeout(() => {
        this.loading = false
      }, 1000)
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
    // 日期空间方法
    changeDateHandler(key, e) {
      this.$set(this.searchChangeFlightDate, this.searchChangeFlightDate[key], e)
    },
    // 改变航司方法
    changeAirlineHandler(key, e) {
      this.$set(this.searchChangeAirline, this.searchChangeAirline[key], e)
    },
    // 老航程选择,重新选择
    handleSelectionChange(val) {
      // console.log('选择原航班', val)
        // this.segmentTypeList = []
        // val.forEach(element => {
        //   this.segmentTypeList.push(element.segmentType)
        // })
        // if (this.segmentTypeList.length === 1 && this.segmentTypeList[0] === 1) {
        //   this.$message.error('不符合航司改签条件(只改去程/第一程)')
        // }
      // 数据重置
      this.orderFlightList = val
      this.newChangeShowFlightList = {}
      this.searchChangeFlightDate = {}
      this.searchChangeAirline = {}
      this.changeSelectFlightList = {}
      this.changeAmountList = null

      // 给orderFlightList排序
      this.orderFlightList = this.orderFlightList.sort((a, b) => {
        const timeA = new Date(a.departureTime)
        const timeB = new Date(b.departureTime)
        return timeA - timeB
      })

      // 查询所对应的新航班 pojo原航程的信息
      for (const pojo of this.orderFlightList) {
        // 展示信息
        const key = '(原航班) 起飞：' + pojo.departureAirportName + '--' + pojo.departureTime +
          ' 到达：' + pojo.arrivalAirportName + '--' + pojo.arrivalTime +
          ' 舱位：' + pojo.cabinCode
        // 判断原数据集中是否已存在key
        // if (key in this.newChangeShowFlightList === false) {
        // 调用改签航班查询方法 ， 默认查询当天
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        const day = String(currentDate.getDate()).padStart(2, '0')
        // 默认当天日期
        this.searchChangeFlightDate[key] = `${year}-${month}-${day}`
        this.searchChangeAirline[key] = pojo.carrierNumber
        // 对应的新航程列表,先置空
        this.newChangeShowFlightList[key] = [{
          originOrderFlightId: pojo.id,
          originCarrierCode: pojo.carrierNumber,
          originDepartureCityCode: pojo.departureCityCode,
          originArrivalCityCode: pojo.arrivalCityCode,
          originDepartureAirportCode: pojo.departureAirportCode,
          originArrivalAirportCode: pojo.arrivalAirportCode,
          originCabinCode: pojo.cabinCode
        }]
      }
      // 查询预改签金额展示
      this.queryChangeAmountList()
    },
    // 多程时,查询查询新航程信息
    twoNewChangeSearch() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          // 判断是否选择了乘客
          if (this.orderPassengerIdList === undefined || this.orderPassengerIdList === null || this.orderPassengerIdList.length === 0) {
            this.$message.error('请选择乘客')
            return
          }
          // 是否选择了改签类型
          if (this.submitData.changeReasonType === undefined || this.submitData.changeReasonType === null) {
            this.$message.error('请选择改签原因')
            return
          }
          const keys = Object.keys(this.newChangeShowFlightList)

          this.twonetFlightInfo = []
          // 查询日期
          const toDate = this.searchChangeFlightDate[keys[0]]
          const backDate = this.searchChangeFlightDate[keys[1]]

          const toAirline = this.searchChangeAirline[keys[0]]
          const backAirline = this.searchChangeAirline[keys[1]]

          console.log(keys[0] + '原航班--查询改签航班日期===>' + toDate + ',新航司===>' + toAirline)
          console.log(keys[1] + '原航班--查询改签航班日期===>' + backDate + ',新航司===>' + backAirline)
          // 数据重置
          // delete this.changeSelectFlightList[key]
          // 是否需要改签了儿童
          const includeChild = this.chooseOrderPassengerList.filter((pojo) => pojo.passengerType === 1).length > 0
          this.$refs['choseFlightDialog'].twoHandler(
            toDate,
            backDate,
            this.newChangeShowFlightList[keys[0]][0],
            this.newChangeShowFlightList[keys[1]][0],
            keys[0],
            keys[1],
            this.detailInfo.policyCode,
            includeChild,
            this.detailInfo.reimbursementType,
            this.detailInfo.policyPersistent,
            toAirline,
            backAirline,
            this.submitData.orderNo,
            this.detailInfo.productPersistent)
        }
      })
    },
    // 查询新航程信息
    newChangeSearch(key, value) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          // 判断是否选择了乘客
          if (this.orderPassengerIdList === undefined || this.orderPassengerIdList === null || this.orderPassengerIdList.length === 0) {
            this.$message.error('请选择乘客')
            return
          }
      // 是否选择了改签类型
      if (this.submitData.changeReasonType === undefined || this.submitData.changeReasonType === null) {
        this.$message.error('请选择改签原因')
        return
      }
          this.netFlightInfo = {}
          // 查询日期
          const date = this.searchChangeFlightDate[key]
      const airline = this.searchChangeAirline[key]
      console.log(key + '原航班--查询改签航班日期===>' + date + ',新航司===>' + airline)
          // 数据重置
          // delete this.changeSelectFlightList[key]

          // 是否需要改签了儿童
          const includeChild = this.chooseOrderPassengerList.filter((pojo) => pojo.passengerType === 1).length > 0
      this.$refs['choseFlightDialog'].handler(date, value, key, this.detailInfo.policyCode, includeChild, this.detailInfo.reimbursementType, this.detailInfo.policyPersistent, airline)
        }
      })
    },
    // 多程-多程-多程-多程-新航程的选择
    twoHandleNewChangeSelectionChange(flight, cabinInfo, key, cabinPrices) {
      // 更新model数据,通过key区分 , 参数转换
      const flightDataJson = flight
      flightDataJson.originTicketPrice = cabinInfo.auditTicketPrice
      flightDataJson.childOriginTicketPrice = cabinInfo.childTicketPrice
      flightDataJson.babyOriginTicketPrice = cabinInfo.babyTicketPrice
      flightDataJson.flightTax = cabinInfo.auditAirportTax
      flightDataJson.fuelTax = cabinInfo.auditFuelTax
      flightDataJson.childFlightTax = cabinInfo.childAirportTax
      flightDataJson.childFuelTax = cabinInfo.childFuelTax
      flightDataJson.surplusNum = cabinInfo.status
      flightDataJson.cabinCode = cabinInfo.cabin
      flightDataJson.cabinLevel = cabinInfo.cabinLevel
      flightDataJson.carrierNumber = flight.airline
      flightDataJson.flightNumber = flight.flightNo
      flightDataJson.departureAirportCode = flight.departureAirport
      flightDataJson.arrivalAirportCode = flight.arrivalAirport

      // 展示信息 , 先delete一下原先的,这样才能赋值上
      this.$delete(this.newChangeShowFlightList, key)
      this.$set(this.newChangeShowFlightList, key, [flightDataJson])
      // 选择信息
      this.changeSelectFlightList[key] = flightDataJson
      this.twonetFlightInfo = cabinPrices
      // 查询预改签金额展示
      this.queryChangeAmountList()
    },
    // 新航程的选择
    handleNewChangeSelectionChange(flight, cabinInfo, key) {
      // 更新model数据,通过key区分 , 参数转换
      const flightDataJson = flight
      flightDataJson.originTicketPrice = cabinInfo.auditTicketPrice
      flightDataJson.childOriginTicketPrice = cabinInfo.childTicketPrice
      flightDataJson.babyOriginTicketPrice = cabinInfo.babyTicketPrice
      flightDataJson.flightTax = cabinInfo.auditAirportTax
      flightDataJson.fuelTax = cabinInfo.auditFuelTax
      flightDataJson.childFlightTax = cabinInfo.childAirportTax
      flightDataJson.childFuelTax = cabinInfo.childFuelTax
      flightDataJson.surplusNum = cabinInfo.status
      flightDataJson.cabinCode = cabinInfo.cabin
      flightDataJson.cabinLevel = cabinInfo.cabinLevel
      flightDataJson.childCabin = cabinInfo.childCabin
      flightDataJson.babyCabin = cabinInfo.babyCabin
      flightDataJson.carrierNumber = flight.airline
      flightDataJson.flightNumber = flight.flightNo
      flightDataJson.departureAirportCode = flight.departureAirport
      flightDataJson.arrivalAirportCode = flight.arrivalAirport

      // 展示信息 , 先delete一下原先的,这样才能赋值上
      this.$delete(this.newChangeShowFlightList, key)
      this.$set(this.newChangeShowFlightList, key, [flightDataJson])
      // 选择信息
      this.changeSelectFlightList[key] = flightDataJson
      this.netFlightInfo = { ...flight }
      // 查询预改签金额展示
      this.queryChangeAmountList()
    },
    // 乘客选择
    passengerHandleSelectionChange(val) {
      this.orderPassengerIdList = val.map(item => item.passengerId)
      this.chooseOrderPassengerList = val
      this.orderInsuranceIdList = null
      // 查询一下乘客下的保险
      queryOrderInsurance(this.submitData.orderNo, this.orderPassengerIdList)
        .then((response) => {
          if (response.status === '200') {
            // 保险订单列表
            this.orderInsuranceShowList = response.data
          }
        })
      // 查询预改签金额展示
      this.queryChangeAmountList()
    },
    // 进行预退款金额信息的查询展示
    queryChangeAmountList() {
      this.changeFeesAmount = null
      this.changeAmountList = null
      // 判断是否选择了人员
      if (this.orderPassengerIdList === undefined || this.orderPassengerIdList === null || this.orderPassengerIdList.length === 0) {
        return
      }
      if (this.orderFlightList === undefined || this.orderFlightList === null || this.orderFlightList.length === 0) {
        return
      }
      const chooseChangeFlightList = Object.values(this.changeSelectFlightList)
      if (chooseChangeFlightList === undefined || chooseChangeFlightList === null || chooseChangeFlightList.length === 0) {
        return
      }
        // 改签原因
        if (this.submitData.changeReasonType === undefined || this.submitData.changeReasonType === null) {
          this.$message.error('请选择改签原因')
          return
        }
      // 查询接口
      const orderFlightIdList = this.orderFlightList.map(item => item.id)
      changePreFeesAmountQuery({
        orderNo: this.submitData.orderNo,
        orderPassengerIdList: this.orderPassengerIdList,
        orderFlightIdList: orderFlightIdList,
          preChangeTicketPriceBOList: chooseChangeFlightList,
          changeReasonType: this.submitData.changeReasonType
      }).then((response) => {
        if (response.status === '200') {
          this.changeFeesAmount = response.data.changeFeesAmount
          this.changeAmountList = response.data.changeAmountList
        }
      })
    },
    submit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.orderPassengerIdList === undefined || this.orderPassengerIdList === null || this.orderPassengerIdList.length === 0) {
            this.$message.error('请选择乘客')
            return
          }
          if (this.orderFlightList === undefined || this.orderFlightList === null || this.orderFlightList.length === 0) {
            this.$message.error('请选择原航程')
            return
          }
          const chooseChangeFlightList = Object.values(this.changeSelectFlightList)
          if (chooseChangeFlightList === undefined || chooseChangeFlightList === null || chooseChangeFlightList.length === 0) {
            this.$message.error('请选择新航程')
            return
          }

        //   if (this.segmentTypeList.length === 1 && this.segmentTypeList[0] === 1) {
        //   this.$message.error('不符合航司改签条件(只改去程/第一程)')
        //   return
        // }

          this.$confirm('确定要进行所选乘客的改签处理吗？', '改签创建', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.submitLoadingFlag = true
            // 组装数据
            const createChangeTicketToPriceBOList = []
            // 乘客 => 原航班 => 新选航班
            for (const passenger of this.chooseOrderPassengerList) {
              for (const chooseChangeFlightBO of chooseChangeFlightList) {
                // 传递数据
                const requestBodyData = {
                  orderPassengerId: passenger.passengerId,
                  originOrderFlightId: chooseChangeFlightBO.originOrderFlightId,
                  cabinCode: chooseChangeFlightBO.cabinCode,
                  originTicketPrice: chooseChangeFlightBO.originTicketPrice,
                  soldTicketPrice: chooseChangeFlightBO.originTicketPrice,
                  // flightTax: chooseChangeFlightBO.flightTax,
                  // fuelTax: chooseChangeFlightBO.fuelTax,
                  flightId: chooseChangeFlightBO.flightId,
                  carrierNumber: chooseChangeFlightBO.carrierNumber,
                  flightNumber: chooseChangeFlightBO.flightNumber,
                  aircraftCode: chooseChangeFlightBO.aircraftModel,
                  departureTime: chooseChangeFlightBO.departureTime,
                  departureZone: 8,
                  departureTerminal: chooseChangeFlightBO.departureTerminal,
                  arrivalTime: chooseChangeFlightBO.arrivalTime,
                  arrivalZone: 8,
                  arrivalTerminal: chooseChangeFlightBO.arrivalTerminal,
                  cabinLevel: chooseChangeFlightBO.cabinLevel,
                  actualCarrierFlight: chooseChangeFlightBO.operatingAirline !== null ? chooseChangeFlightBO.operatingAirline + chooseChangeFlightBO.operatingFlightNo : '',
                  luggageWeight: 0,
                  handLuggageWeight: 0,
                  departureAirportCode: chooseChangeFlightBO.departureAirportCode,
                  arrivalAirportCode: chooseChangeFlightBO.arrivalAirportCode,
                  // 经停信息
                  stopFlightList: JSON.parse(chooseChangeFlightBO.stopDetail)
                }
                // 判断乘客类型
                switch (passenger.passengerType) {
                  case 0:
                    // 成人
                    requestBodyData.originTicketPrice = chooseChangeFlightBO.originTicketPrice
                    requestBodyData.flightTax = chooseChangeFlightBO.flightTax
                    requestBodyData.fuelTax = chooseChangeFlightBO.fuelTax
                    break
                  case 1:
                    // 儿童
                    requestBodyData.originTicketPrice = chooseChangeFlightBO.childOriginTicketPrice
                    requestBodyData.flightTax = chooseChangeFlightBO.childFlightTax
                    requestBodyData.fuelTax = chooseChangeFlightBO.childFuelTax
                    break
                  case 2:
                    // 婴儿
                    requestBodyData.originTicketPrice = chooseChangeFlightBO.babyOriginTicketPrice
                      requestBodyData.flightTax = 0
                      requestBodyData.fuelTax = 0
                    break
                  default:
                    this.$message.error('提交异常,请重试...')
                    return
                }
                createChangeTicketToPriceBOList.push(requestBodyData)
              }
            }
            const data = {
              orderNo: this.submitData.orderNo,
              reimbursementType: this.detailInfo.reimbursementType,
              changeReasonType: this.submitData.changeReasonType,
              appendix: this.submitData.appendix,
              remark: this.submitData.remark,
              contactName: this.submitData.contactName,
              contactPhone: this.submitData.contactPhone,
              contactEmail: this.submitData.contactEmail,
              orderInsuranceIdList: this.orderInsuranceIdList === null ? [] : this.orderInsuranceIdList,
              createChangeTicketToPriceBO: createChangeTicketToPriceBOList,
              // 预定服务需要参数
              adultNum: this.chooseOrderPassengerList.filter((value) => value.passengerType === 0).length,
              childNum: this.chooseOrderPassengerList.filter((value) => value.passengerType === 1).length,
              infantNum: this.chooseOrderPassengerList.filter((value) => value.passengerType === 2).length
            }
            if (this.detailInfo.policyCode !== null) {
              data.policyId = this.detailInfo.policyCode
            }
            if (this.detailInfo.orderFlightType === 0) {
              data.cabinAllTypeResponse = this.netFlightInfo
              if (data.cabinAllTypeResponse.departureTime) {
                data.cabinAllTypeResponse.departureTime = data.cabinAllTypeResponse.departureTime.split(' ')[1]
                data.cabinAllTypeResponse.arrivalTime = data.cabinAllTypeResponse.arrivalTime.split(' ')[1]
              }
              // 调用预订服务的 改签接口,进行价格验价
              applyCreateChangeOrder(data).then((response) => {
                if (response) {
                  this.$notify({
                    title: this.$i18n.t("AdminService['Success']"),
                    message: this.$i18n.t("AdminService['SuccessMessage']"),
                    type: 'success',
                    duration: 2000
                  })
                  this.dialogFormVisible = false
                  this.orderPassengerIdList = null
                  this.orderFlightList = null
                  this.changeSelectFlightList = {}
                  // let orderNo = response.data;
                  // 因为改签需要进行 管理后台的确认操作,这里不需要进入支付页面
                }
                this.submitLoadingFlag = false
              }).catch(() => {
                this.submitLoadingFlag = false
              })
            } else {
              data.cabinAllTypeResponse = this.twonetFlightInfo
              // 多程的
              applyTwoCreateChangeOrder(data).then((response) => {
                if (response) {
                  this.$notify({
                    title: this.$i18n.t("AdminService['Success']"),
                    message: this.$i18n.t("AdminService['SuccessMessage']"),
                    type: 'success',
                    duration: 2000
                  })
                  this.dialogFormVisible = false
                  this.orderPassengerIdList = null
                  this.orderFlightList = null
                  this.changeSelectFlightList = {}
                  // let orderNo = response.data;
                  // 因为改签需要进行 管理后台的确认操作,这里不需要进入支付页面
                }
                this.submitLoadingFlag = false
              }).catch(() => {
                this.submitLoadingFlag = false
              })
            }
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    // 选择保险
    handleInsuranceSelection(selection) {
      this.orderInsuranceIdList = selection.map(item => item.id)
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
      border-color: #409eff;
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
  .el-form-item--small.el-form-item{
    margin-bottom: 10px;
  }
</style>
