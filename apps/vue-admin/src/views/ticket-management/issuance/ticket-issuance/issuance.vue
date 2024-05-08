<template>
  <el-dialog width="50%" top="5vh" :visible.sync="dialogFormVisible" :title="'票证发放'">
    <el-form ref="formRef" :label-position="'right'" label-width="100px" :rules="rules" :model="dto">
      <el-form-item label="发放给分销商" prop="agentId" value-key="id">
        <el-select v-model="dto.agentId" filterable placeholder="请选择" @change="changeValue($event)">
          <el-option
            v-for="item in agentsOptions"
            :key="item.organizationId"
            :label="item.name"
            :value="item.id + '|' + item.organizationId + '|' + item.name"
          >
            <span style="float: left">{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-table
        :data="dto.ticketProveStockBOList"
        border
        show-summary
        :summary-method="getSummaries"
        :row-class-name="'warning-row'"
        style="width: 100%;margin-bottom: 20px;"
      >
        <el-table-column label="起始号码" prop="starterNumber" align="center">
          <template slot-scope="scope1">
            <el-input-number
              v-model="scope1.row.starterNumber"
              :min="scope1.row.minNumber"
              :max="scope1.row.endNumber"
              label="起始号码"
              placeholder="起始号码"
              @change="changeInput(scope.$index)"
            />
            <!--
              <el-input
              v-model="scope.row.starterNumber"
              clearable
              placeholder="起始号码"
              @input="changeInput(scope.$index)"
            /> :disabled="true"    @focus="changeInput(scope.$index)"  @blur="changeInput(scope.$index)" -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="终止号码" prop="endNumber">
          <template slot-scope="scope2">
            <el-input-number
              v-model="scope2.row.endNumber"
              :min="scope2.row.starterNumber"
              :max="scope2.row.maxNumber"
              label="终止号码"
              @change="changeInput(scope.$index)"
            />
            <!-- <el-input v-model="scope.row.endNumber" clearable placeholder="终止号码" @input="changeInput(scope.$index)" /> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="发放数量" prop="surplusNum">
          <template slot-scope="scope3">
            <el-input :value="scope3.row.surplusNum" clearable disabled placeholder="发放数量" />
          </template>
        </el-table-column>
      </el-table>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dto.remark" type="textarea" :rows="2" clearable placeholder="备注" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="onSave()"> 保存 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import TicketTypeEnum from '@/enum/ticketType'
import StatusEnum from '@/enum/applicationStatus'
import { queryAvailableNumber } from '@/api/ticket-manage/ticket-insurance'
import { ticketAgentList } from '@/api/identity/organization'
import { ticketGrant } from '@/api/ticket-manage/ticket-insurance'

export default {
  name: 'InventoryCreateUpdate',
  data() {
    return {
      agentsOptions: [],
      dialogFormVisible: false,
      dto: {
        agentId: '',
        agentName: '',
        agentOrganizationId: '',
        agentOrganizationName: '',
        ticketProveStockBOList: [
          {
            minNumber: '',
            maxNumber: ''
          }
        ]
      },
      scope: {
        row: 10
      },
      queryAvailableNumberdto: {
        ticketStockId: '',
        starterNumber: 0,
        endNumber: 0
      },
      availableNumber: 0,
      rules: {
        startingNo: [
          {
            required: true,
            message: '请输入起始号码',
            trigger: 'blur'
          }
        ],
        terminationNo: [
          {
            required: true,
            message: '请输入终止号码',
            trigger: 'blur'
          }
        ],
        quantities: [
          {
            required: true,
            message: '请输入数量',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    rowMin() {
      return this.scope.row
    }
  },
  watch: {},
  created() {
    this.getTicketAgentList()
  },
  mounted() {
    this.ticketTypeOptions = Object.keys(TicketTypeEnum.TicketType).map(key => ({
      value: TicketTypeEnum.TicketType[key],
      label: key
    }))
    this.statusOptions = Object.keys(StatusEnum.ApplicationStatus).map(key => ({
      value: StatusEnum.ApplicationStatus[key],
      label: key
    }))
  },
  methods: {
    getTicketAgentList() {
      ticketAgentList().then(response => {
        if (response) {
          this.agentsOptions = response.items
        }
      })
    },
    changeInput(row) {
      console.log('------------------row ', row)
      // if (this.dto.ticketProveStockBOList[row].starterNumber || this.dto.ticketProveStockBOList[row].endNumber) {
      //   return
      // }
      this.queryAvailableNumberdto.ticketStockId = this.dto.ticketProveStockBOList[row].ticketStockId
      this.queryAvailableNumberdto.starterNumber = this.dto.ticketProveStockBOList[row].starterNumber
      this.queryAvailableNumberdto.endNumber = this.dto.ticketProveStockBOList[row].endNumber
      this.getAvailableNumber()
      console.log('-----------change input: this.availableNumber ', this.availableNumber)
      // console.log('*********************', this.queryAvailableNumberdto)
      this.$set(this.dto.ticketProveStockBOList[row], 'surplusNum', this.availableNumber)
      // console.log('*********************', this.availableNumber)
    },
    changeValue(value) {
      // console.log('---------this.value', value)
      this.dto.agentId = value.split('|')[1]
      this.dto.agentName = value.split('|')[2]
      this.dto.agentOrganizationId = value.split('|')[1]
      this.dto.agentOrganizationName = value.split('|')[2]
    },

    initTickets(tickets) {
      this.dto.ticketProveStockBOList = []
      this.dto.ticketProveStockBOList = tickets.map(obj => ({ ...obj }))
      for (var i = 0; i < this.dto.ticketProveStockBOList.length; i++) {
        this.dto.ticketProveStockBOList[i].minNumber = this.dto.ticketProveStockBOList[i].starterNumber
        this.dto.ticketProveStockBOList[i].maxNumber = this.dto.ticketProveStockBOList[i].endNumber
      }
    },
    handle() {
      this.dialogFormVisible = true
    },
    getAvailableNumber() {
      queryAvailableNumber(this.queryAvailableNumberdto).then((response) => {
        if (response.status === '200') {
          this.availableNumber = response.data
        }
      })
    },
    getSummaries(param) {
      // 列表数据
      const { columns, data } = param
      // 定义新的数组接收
      const sums = []
      columns.forEach((column, index) => {
        // 定义第一列的底部是' 总计'
        if (index === 0) {
          sums[0] = '总计'
          return
        }
        // 循环列表数据得到我们的各个行与列的数据
        const values = data.map(item => Number(item[column.property]))
        // 通过prop找到你需要计算的列。
        if (column.property === 'starterNumber' ||
          column.property === 'endNumber') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index]
          // 定义一个值接收得到的总计的数值
          // this.contaddsum = sums[index].toFixed(3)
        } else {
          sums[index] = '-'
        }
      })
      // 得到返回值
      return sums
    },
    onSave() {
      // console.log('---------this.dto:', this.dto)
      // this.dto.agentName = this.dto.agentOrganizationId.agentName
      // this.dto.agentId = this.dto.agentOrganizationId.id
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          ticketGrant(this.dto).then(response => {
            if (response.status === '200') {
              this.$emit('handleFilter', true)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped></style>
