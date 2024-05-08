<template>
  <el-dialog
    width="70%"
    :visible.sync="dialogFormVisible"
    title="自动出票"
    @close="closeDialog()"
  >
    <div v-loading="loadingFlag" class="app-container">
      <div style="overflow: hidden">
        <div style="float: left; width: 50%">
          <el-button type="primary" size="mini" @click="handlerBSPBOP()">BSP/BOP</el-button>
          <el-button type="primary" size="mini" @click="handlerB2B()">B2B</el-button>
        </div>
        <div style="float: right; width: 50%; text-align: right">
          <el-button type="primary" size="mini" @click="issueTicketBSP()">BSP出票</el-button>
          <el-button type="primary" size="mini" @click="issueTicketBOP()">BOP出票</el-button>
        </div>
      </div>
      <div v-show="!isB2B" class="custom-card">
        <div class="card-title">
          <span v-if="bspResult">BSP出票 OFFICE:{{ bspResult.officeNo }}</span>
          <span v-if="bspResult" style="margin-left: 20px">BOP出票 OFFICE:{{ bspResult.officeNo }}</span>
        </div>
        <div v-show="adtPriceList.length > 0" style="height: 300px">
          <el-table
            v-if="bspResult"
            ref="adtPriceRadioTable"
            :data="adtPriceList"
            border
            style="width: 100%"
            height="100%"
            @selection-change="handleadtPriceRadioChange"
            @select="adtPriceRadioCheck"
          >
            <el-table-column type="selection" width="50" />
            <el-table-column>
              <template>
                <span>成人</span>
              </template>
            </el-table-column>
            <el-table-column label="票面价" prop="ticketPrice" />
            <el-table-column label="运价基础" prop="fareCode" >
              <template slot-scope="scope">
                <span v-if="scope.row.fareCode">{{ scope.row.fareCode }}</span>
                <span v-if="scope.row.fromFareCode">{{ scope.row.fromFareCode }}+{{ scope.row.backFareCode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="基建" prop="airportTax" />
            <el-table-column label="燃油" prop="fuelTax" />
            <el-table-column label="代理费" prop="commissionFee" />
            <el-table-column label="采购总价">
              <template slot-scope="scope">
                {{
                  Number(scope.row.ticketPrice) +
                    Number(scope.row.airportTax) +
                    Number(scope.row.fuelTax) -
                    Number(scope.row.commissionFee)
                }}
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" />
          </el-table>
        </div>
        <div v-show="chdPriceList.length > 0" style="margin-top: 10px">
          <el-table
            v-if="bspResult"
            ref="chdPriceRadioTable"
            :data="chdPriceList"
            border
            style="width: 100%"
            @selection-change="handlechdPriceRadioChange"
            @select="chdPriceRadioCheck"
          >
            <el-table-column type="selection" width="50" />
            <el-table-column>
              <template>
                <span>儿童</span>
              </template>
            </el-table-column>
            <el-table-column label="票面价" prop="ticketPrice" />
            <el-table-column label="基建" prop="airportTax" />
            <el-table-column label="燃油" prop="fuelTax" />
            <el-table-column label="代理费" prop="commissionFee" />
            <el-table-column label="采购总价">
              <template slot-scope="scope">
                {{
                  Number(scope.row.ticketPrice) +
                    Number(scope.row.airportTax) +
                    Number(scope.row.fuelTax) -
                    Number(scope.row.commissionFee)
                }}
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" />
          </el-table>
        </div>
        <div v-show="infPriceList.length > 0" style="margin-top: 10px">
          <el-table
            v-if="bspResult"
            ref="infPriceRadioTable"
            :data="infPriceList"
            border
            style="width: 100%"
            @selection-change="handleinfPriceRadioChange"
            @select="infPriceRadioCheck"
          >
            <el-table-column>
              <template>
                <span>婴儿</span>
              </template>
            </el-table-column>
            <el-table-column label="票面价" prop="ticketPrice" />
            <el-table-column label="基建" prop="airportTax" />
            <el-table-column label="燃油" prop="fuelTax" />
            <el-table-column label="代理费" prop="commissionFee" />
            <el-table-column label="采购总价">
              <template slot-scope="scope">
                {{
                  Number(scope.row.ticketPrice) +
                    Number(scope.row.airportTax) +
                    Number(scope.row.fuelTax) -
                    Number(scope.row.commissionFee)
                }}
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" />
          </el-table>
        </div>
      </div>
      <div v-show="isB2B" class="custom-card">
        <div class="card-title">
          B2B出票OFFICE:
          <span v-if="b2bResult"> {{ b2bResult.officeNo }} </span>
        </div>
        <el-table
          v-if="b2bResult"
          :data="b2bResult.priceList"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="50" />

          <el-table-column label="票面价" prop="ticketPrice" />
          <el-table-column label="基建" prop="airportTax" />
          <el-table-column label="燃油" prop="fuelTax" />
          <el-table-column label="代理费" prop="commissionFee" />
          <el-table-column label="优惠券/红包" prop="couponAmount" />
          <el-table-column label="采购总价">
            <template slot-scope="scope">
              {{
                Number(scope.row.ticketPrice) +
                  Number(scope.row.airportTax) +
                  Number(scope.row.fuelTax) -
                  Number(scope.row.commissionFee) -
                  Number(scope.row.couponAmount)
              }}
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" />
          <el-table-column label="支付方式" prop="">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.purchasePayPlatform"
                placeholder="请选择支付方式"
                clearable
                filterable
              >
                <el-option
                  v-for="item in purchasePayPlatformTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="B2B出票"
                @click="issueTicketB2B(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import {
  getAutoQueryList,
  autoConfirmIssueTicket
} from '@/api/agent/issue-order'
import PurchasePayPlatformTypeEnum from '@/enum/PurchasePayPlatformType'

export default {
  name: 'AutoIssueTicketPurchaseOrder',
  components: {},
  data() {
    return {
      isB2B: false,
      dialogFormVisible: false,
      loadingFlag: false,
      purchaseOrderId: '',
      purchasePayPlatformTypeOptions: [],
      bspResult: {
        officeNo: '',
        account: '',
        priceList: []
      },
      adtPriceList: [
        {
          chdPriceList: [{ selected: 0 }],
          infPriceList: [{ selected: 0 }]
        }
      ],
      chdPriceList: [],
      infPriceList: [],
      adtPriceRow: null,
      chdPriceRow: null,
      infPriceRow: null,
      b2bResult: {
        officeNo: '',
        account: '',
        cacheId: '',
        priceList: []
      }
    }
  },
  created() {},
  mounted() {
    this.purchasePayPlatformTypeOptions = Object.keys(
      PurchasePayPlatformTypeEnum.PurchasePayPlatformType
    ).map((key) => ({
      value: PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key],
      label: this.$t(`AdminService["Enum:PurchasePayPlatformType:${PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key]}"]`)
    }))
  },
  methods: {
    handlerOpen(item) {
      // console.log('*****item:', item)
      this.dialogFormVisible = true
      this.purchaseOrderId = item.id
      this.getBSPList()
    },
    getBSPList() {
      this.loadingFlag = true
      getAutoQueryList(this.purchaseOrderId, 0)
        .then((response) => {
          this.loadingFlag = false
          if (response) {
            var responseData = response.data
            this.adtPriceList = []
            this.chdPriceList = []
            this.infPriceList = []
            this.bspResult = JSON.parse(JSON.stringify(response.data))
            responseData.priceList.forEach((element) => {
              if (element.passengerType === 0) {
                this.adtPriceList.push(element)
              }
              if (element.passengerType === 1) {
                this.chdPriceList.push(element)
              }
              if (element.passengerType === 2) {
                this.infPriceList.push(element)
              }
            })
          }
          this.$nextTick(() => {
            if (this.adtPriceList.length > 0) {
              this.$refs['adtPriceRadioTable'].toggleRowSelection(
                this.adtPriceList[0]
              )
            }
            if (this.chdPriceList.length > 0) {
              this.$refs['chdPriceRadioTable'].toggleRowSelection(
                this.chdPriceList[0]
              )
            }
            if (this.infPriceList.length > 0) {
              this.$refs['infPriceRadioTable'].toggleRowSelection(
                this.infPriceList[0]
              )
            }
          })
        })
        .catch((err) => {
          this.loadingFlag = false
          console.log(err)
        })
    },
    getB2BList() {
      this.loadingFlag = true
      getAutoQueryList(this.purchaseOrderId, 1)
        .then((response) => {
          this.loadingFlag = false
          if (response) {
            this.b2bResult = response.data
          }
        })
        .catch(() => {
          this.loadingFlag = false
        })
    },
    handlerBSPBOP() {
      this.isB2B = false
    },
    handlerB2B() {
      this.isB2B = true
      this.getB2BList()
    },
    issueTicketBSP() {
      // console.log('---------this.row', row)
      var isConfirmIssue = 0
      if (
        this.adtPriceList.length > 0 &&
        this.chdPriceList.length > 0 &&
        this.infPriceList.length > 0
      ) {
        if (
          this.adtPriceRow === null ||
          this.chdPriceRow === null ||
          this.infPriceRow === null
        ) {
          this.$message({
            message: '成人，儿童，婴儿价格必须分别选择一条',
            type: 'error'
          })
        } else {
          isConfirmIssue = 1
        }
      }
      if (
        this.adtPriceList.length > 0 &&
        this.chdPriceList.length > 0 &&
        this.infPriceList.length === 0
      ) {
        if (this.adtPriceRow === null || this.chdPriceRow === null) {
          this.$message.error('成人，儿童价格必须分别选择一条!')
        } else {
          isConfirmIssue = 1
        }
      }
      if (
        this.adtPriceList.length > 0 &&
        this.chdPriceList.length === 0 &&
        this.infPriceList.length > 0
      ) {
        if (this.adtPriceRow === null || this.infPriceRow === null) {
          this.$message.error('成人，婴儿价格必须分别选择一条!')
        } else {
          isConfirmIssue = 1
        }
      }

      if (
        this.adtPriceList.length > 0 &&
        this.chdPriceList.length === 0 &&
        this.infPriceList.length === 0
      ) {
        if (this.adtPriceRow === null) {
          this.$message.error('成人价格必须选择一条!')
        } else {
          isConfirmIssue = 1
        }
      }
      if (isConfirmIssue === 1) {
        this.$confirm('确定需要进行BSP出票操作么操作么？', 'BSP出票', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 组装请求的price
          const priceList = [
            this.adtPriceRow,
            this.chdPriceRow,
            this.infPriceRow
          ].filter((p) => p !== null)
          autoConfirmIssueTicket({
            id: this.purchaseOrderId,
            ticketChannel: '1',
            account: this.bspResult.account,
            autoPurchasePriceBO: priceList
          })
            .then((response) => {
              if (response.status === 200) {
                this.$message({
                  titile: 'BSP出票成功',
                  type: 'success'
                })
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: 'BSP出票失败'
              })
            })
        })
      }
    },
    issueTicketBOP(row) {
      var isConfirmIssue = 0
      if (
        this.adtPriceList.length > 0 &&
        this.chdPriceList.length > 0 &&
        this.infPriceList.length > 0
      ) {
        if (
          this.adtPriceRow === null ||
          this.chdPriceRow === null ||
          this.infPriceRow === null
        ) {
          this.$message({
            message: '成人，儿童，婴儿价格必须分别选择一条',
            type: 'error'
          })
        } else {
          isConfirmIssue = 1
        }
      }
      if (
        this.adtPriceList.length > 0 &&
        this.chdPriceList.length > 0 &&
        this.infPriceList.length === 0
      ) {
        if (this.adtPriceRow === null || this.chdPriceRow === null) {
          this.$message.error('成人，儿童价格必须分别选择一条!')
        } else {
          isConfirmIssue = 1
        }
      }
      if (
        this.adtPriceList.length > 0 &&
        this.chdPriceList.length === 0 &&
        this.infPriceList.length > 0
      ) {
        if (this.adtPriceRow === null || this.infPriceRow === null) {
          this.$message.error('成人，婴儿价格必须分别选择一条!')
        } else {
          isConfirmIssue = 1
        }
      }

      if (
        this.adtPriceList.length > 0 &&
        this.chdPriceList.length === 0 &&
        this.infPriceList.length === 0
      ) {
        if (this.adtPriceRow === null) {
          this.$message.error('成人价格必须选择一条!')
        } else {
          isConfirmIssue = 1
        }
      }
      if (isConfirmIssue === 1) {
        this.$confirm('确定需要进行BOP出票操作操作么?', 'BOP出票', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // 组装请求的price
          const priceList = [
            this.adtPriceRow,
            this.chdPriceRow,
            this.infPriceRow
          ].filter((p) => p !== null)
          autoConfirmIssueTicket({
            id: this.purchaseOrderId,
            ticketChannel: '2',
            account: this.bspResult.account,
            autoPurchasePriceBO: priceList
          })
            .then((response) => {
              if (response.status === 200) {
                this.$message({
                  titile: 'BOP出票成功',
                  type: 'success'
                })
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: 'BOP出票失败'
              })
            })
        })
      }
    },
    issueTicketB2B(row) {
      this.$confirm('确定需要进行B2B出票操作操作么?', 'B2B出票', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        autoConfirmIssueTicket({
          id: this.purchaseOrderId,
          ticketChannel: '0',
          purchasePayPlatform: row.purchasePayPlatform,
          account: this.b2bResult.account,
          cacheId: this.b2bResult.cacheId,
          autoPurchasePriceBO: row
        })
          .then((response) => {
            if (response.status === 200) {
              this.$message({
                titile: 'B2B出票成功',
                type: 'success'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: 'B2B出票失败'
            })
          })
      })
    },
    closeDialog() {
      this.dialogFormVisible = false
    },
    handleadtPriceRadioChange(val) {
      // console.log('----------this.val', val)
      if (val.length > 1) {
        this.$refs['adtPriceRadioTable'].clearSelection()
        this.$refs['adtPriceRadioTable'].toggleRowSelection(val.pop())
      }
      this.selectioned = val
    },
    adtPriceRadioCheck: function(selection, row) {
      // console.log('-------row', row)
      // console.log('-------selection', selection)
      this.$refs['adtPriceRadioTable'].clearSelection()
      if (selection.length === 0) {
        return
      }
      if (row) {
        this.adtPriceRow = row
        this.selectioned = selection
        this.$refs['adtPriceRadioTable'].toggleRowSelection(
          row,
          this.selectioned
        )
      }
    },
    handlechdPriceRadioChange(val) {
      if (val.length > 1) {
        this.$refs['chdPriceRadioTable'].clearSelection()
        this.$refs['chdPriceRadioTable'].toggleRowSelection(val.pop())
      }
      this.selectioned = val
    },
    chdPriceRadioCheck: function(selection, row) {
      // console.log('-------row', row)
      // console.log('-------selection', selection)
      this.$refs['chdPriceRadioTable'].clearSelection()
      if (selection.length === 0) {
        return
      }
      if (row) {
        this.chdPriceRow = row
        this.selectioned = selection
        this.$refs['chdPriceRadioTable'].toggleRowSelection(
          row,
          this.selectioned
        )
      }
    },
    handleinfPriceRadioChange(val) {
      if (val.length > 1) {
        this.$refs['infPriceRadioTable'].clearSelection()
        this.$refs['infPriceRadioTable'].toggleRowSelection(val.pop())
      }
      this.selectioned = val
    },
    infPriceRadioCheck: function(selection, row) {
      // console.log('-------row', row)
      // console.log('-------selection', selection)
      this.$refs['infPriceRadioTable'].clearSelection()
      if (selection.length === 0) {
        return
      }
      if (row) {
        this.infPriceRow = row
        this.selectioned = selection
        this.$refs['infPriceRadioTable'].toggleRowSelection(
          row,
          this.selectioned
        )
      }
    }
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach((row) => {
    //       this.$refs.multipleTable.toggleRowSelection(row)
    //     })
    //   } else {
    //     this.$refs.multipleTable.clearSelection()
    //   }
    // },
  }
}
</script>
<style lang="scss" scoped>
.div.el-dialog__body {
  padding-top: 0px;
  padding-right: 20px;
  padding-bottom: 0px;
  padding-left: 20px;
}
.app-container {
  padding-top: 0px;
}
</style>
