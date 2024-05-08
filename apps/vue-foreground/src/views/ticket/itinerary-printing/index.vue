<template>
  <div class="app-container">
    <div class="div-flex" style="justify-content: center">
      <el-form
        ref="searchFormRef"
        :inline="true"
        class="demo-form-inline form-inline-label-125"
        style="padding: 20px; float: left"
      >
        <el-form-item label="PNR/票号/订单号">
          <el-input v-model="infoNo" clearable style="width: 70%; margin-right: 10px;" />
          <el-button type="primary" size="small" @click="search()">
            查询
          </el-button>
        </el-form-item>
        <el-form-item label="领用起始单号"> {{ agentStarterNumber }}</el-form-item>

        <el-form-item label="打印起始单号">
          <el-input v-model="startNumber" clearable />
        </el-form-item>

        <el-form-item label="剩余数量"> {{ surplusNum }}</el-form-item>
        <el-form-item>
          <el-radio v-model="paperRadio" :label="1">单张送纸</el-radio>
          <el-radio v-model="paperRadio" :label="2">多张送纸</el-radio>
        </el-form-item>

        <el-form-item>
          <div>
            <el-table
              ref="ItineraryPrintingTable"
              :data="printList"
              tooltip-effect="dark"
              :border="true"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column
                label="票号"
                prop="carrierTicketNo"
              />
              <el-table-column
                label="行程单号"
                prop="ticketProveNumber"
              />
            </el-table>

            <el-form-item align="center" style="margin-top: 20px;">
              <el-button type="primary" @click="onCreate()">
                创建行程单
              </el-button>
              <el-button type="primary" @click="onPrint()">
                打印行程单
              </el-button>
            </el-form-item>

          </div>
        </el-form-item>
      </el-form>
    </div>
    <preview ref="previewDialog" />
  </div>
</template>

<script>

  // import Datatable from '@/components/DataTable'
  import Preview from './preview.vue'
  import { issueOrderProveBind, issueTicketQueryInfoNo } from '@/api/domestic-tickets/issue-order'
  import { agentAvailableTicket } from '@/api/ticket/agent-ticketprove'

  export default {
    name: 'ItineraryPrinting',
    components: { Preview },
    data() {
      return {
        infoNo: '',
        orderNo: '',
        agentStarterNumber: '',
        startNumber: '',
        surplusNum: '',
        paperRadio: 1,
        printList: [],
        selectionPrintList: []
      }
    },
    created() {
      this.infoNo = this.$route.query.orderNo
      this.search()
    },
    mounted() {
    },
    methods: {
      customSelectable(row) {
        // 自定义选择逻辑，根据行数据判断是否可选
        return row.ticketProveNumber == null
      },
      search() {
        if (this.infoNo != null && this.infoNo !== '') {
          issueTicketQueryInfoNo(this.infoNo).then((response) => {
            console.log(response)
            if (response.status === '200') {
              if (response.data == null || response.data.length === 0) {
                this.$message.error('数据不存在或不是已出票的订单,请重试')
              }
              this.printList = response.data
            }
          })
        }
        // 查询一下当前分销商的拥有的票证数据
        agentAvailableTicket().then((response) => {
          console.log(response)
          if (response.status === '200') {
            this.agentStarterNumber = response.data.agentStarterNumber
            this.startNumber = response.data.agentStarterNumber
            this.surplusNum = response.data.surplusNum
          }
        })
      },
      handleSelectionChange(val) {
        // 选中处理
        this.selectionPrintList = val
      },
      onCreate() {
        if (!Array.isArray(this.selectionPrintList) || this.selectionPrintList.length === 0) {
          // 数组为空
          this.$message.error('请选择票号数据')
        } else {
          // 绑定行程单
          this.$confirm('确定要进行票号行程单的绑定吗？', '行程单绑定', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const reqTicketNoList = this.selectionPrintList.map(p => p.carrierTicketNo)
            issueOrderProveBind(this.startNumber, reqTicketNoList).then((response) => {
              if (response.status === '200') {
                this.$message.success('绑定成功')
                this.search()
              }
            })
          })
        }
      },
      onPrint() {
        if (!Array.isArray(this.selectionPrintList) || this.selectionPrintList.length === 0) {
          // 数组为空
          this.$message.error('请选择票号数据')
          return
        }
        const ticketNoList = this.selectionPrintList.map(p => p.carrierTicketNo)
        this.$refs['previewDialog'].handle(ticketNoList)
      }
    }
  }
</script>

<style lang="scss" scoped></style>
