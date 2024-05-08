<template>
  <el-dialog width="50%" top="5vh" :visible.sync="dialogFormVisible" :title="'票证报废'">
    <el-form ref="formRef" :label-position="'right'" label-width="100px" :rules="rules" :model="dto">
      <el-table
        :data="dto.ticketProveStockBOList"
        border
        show-summary
        :summary-method="getSummaries"
        :row-class-name="'warning-row'"
        style="width: 100%;margin-bottom: 20px;"
      >
        <el-table-column label="起始号码" prop="starterNumber" align="center">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.starterNumber" clearable placeholder="起始号码" /> -->
            <el-input-number
              v-model="scope.row.starterNumber"
              :min="scope.row.minNumber"
              :max="scope.row.endNumber"
              label="起始号码"
              placeholder="起始号码"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="终止号码" prop="endNumber">
          <template slot-scope="scope">
            <!-- <el-input v-model="scope.row.endNumber" clearable placeholder="终止号码" /> -->
            <el-input-number
              v-model="scope.row.endNumber"
              :min="scope.row.starterNumber"
              :max="scope.row.maxNumber"
              label="终止号码"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="数量" prop="count">
          <template slot-scope="scope">
            <el-input v-model="scope.row.count" clearable disabled placeholder="数量" />
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
import { voidedTicketProcess } from '@/api/ticket-manage/ticket-avoidance'

export default {
  name: 'InventoryCreateUpdate',
  data() {
    return {
      dialogFormVisible: false,
      dto: {
        ticketProveStockBOList: [{
          minNumber: '',
          maxNumber: '',
          count: ''
        }]
      },
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
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.ticketTypeOptions = Object.keys(TicketTypeEnum.TicketType).map(key => ({
      value: TicketTypeEnum.TicketType[key],
      label: key
    }))
  },
  methods: {
    initAvoidanceTickets(tickets) {
      this.dto.ticketProveStockBOList = []
      this.dto.ticketProveStockBOList = tickets.map(obj => ({ ...obj }))
      for (var i = 0; i < this.dto.ticketProveStockBOList.length; i++) {
        this.dto.ticketProveStockBOList[i].minNumber = this.dto.ticketProveStockBOList[i].starterNumber
        this.dto.ticketProveStockBOList[i].maxNumber = this.dto.ticketProveStockBOList[i].endNumber
      }
      // this.dto.ticketProveStockBOList = tickets
      // console.log(this.dto.ticketProveStockBOList)
    },
    handle() {
      this.dialogFormVisible = true
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
        if (column.property === 'startingNo' || column.property === 'terminationNo') {
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
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          voidedTicketProcess(this.dto).then(response => {
            if (response.status === '200') {
              this.$emit('handleFilter', true)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(response.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
