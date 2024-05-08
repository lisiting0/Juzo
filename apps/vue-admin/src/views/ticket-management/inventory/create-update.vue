<template>
  <el-dialog width="30%" top="5vh" :visible.sync="dialogFormVisible" :title="dialogStatus == 'add' ? '票证新增' : '票证编辑'">
    <el-form ref="formRef" :label-position="'right'" label-width="100px" :rules="rules" :model="dto">
      <el-form-item label="票证类型" prop="ticketProveType">
        <el-select v-model="dto.ticketProveType" filterable clearable placeholder="请选择票证类型">
          <el-option v-for="option in ticketTypeOptions" :key="option.value" :value="option.value" :label="option.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="dto.ticketStockAuditStatus" :disabled="dialogStatus == 'add' ? false : true" clearable>
          <el-option v-for="option in statusOptions" :key="option.value" :value="option.value" :label="option.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="起始号码" prop="starterNumber">
        <el-input v-model="dto.starterNumber" clearable placeholder="起始号码" @input="handlerChange()" />
      </el-form-item>
      <el-form-item label="终止号码" prop="endNumber">
        <el-input v-model="dto.endNumber" clearable placeholder="终止号码" @input="handlerChange()" />
      </el-form-item>
      <el-form-item label="数量" prop="stockNum">
        <el-input v-model="dto.stockNum" clearable placeholder="数量" :disabled="true" />
      </el-form-item>
      <el-form-item label="OFFICE" prop="office">
        <el-select v-model="dto.office" clearable>
          <el-option v-for="option in officeOptions" :key="option.value" :value="option.value" :label="option.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dto.remark" type="textarea" :rows="2" clearable placeholder="备注" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus == 'add' ? onAdd() : onEdit()">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import TicketTypeEnum from '@/enum/ticketType'
import StatusEnum from '@/enum/applicationStatus'
import OfficeTypeEnum from '@/enum/officeType'
import { save } from '@/api/ticket-manage/stock.js'

export default {
  name: 'InventoryCreateUpdate',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      ticketTypeOptions: [],
      statusOptions: [],
      officeOptions: [],
      dto: {
      },
      rules: {
        ticketStockAuditStatus: [
          {
            required: true,
            message: '请选择票证状态',
            trigger: ['blur', 'change']
          }
        ],
        ticketProveType: [
          {
            required: true,
            message: '请选择票证类型',
            trigger: ['blur', 'change']
          }
        ],
        starterNumber: [
          {
            required: true,
            message: '请输入起始号码',
            trigger: 'blur'
          }
        ],
        endNumber: [
          {
            required: true,
            message: '请输入终止号码',
            trigger: 'blur'
          }
        ],
        office: [
          {
            required: true,
            pattern: /^[a-zA-Z0-9]+$/,
            message: '请输入OFFICE',
            trigger: ['blur', 'change']
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
    this.statusOptions = Object.keys(StatusEnum.ApplicationStatus).map(key => ({
      value: StatusEnum.ApplicationStatus[key],
      label: key
    }))
    this.officeOptions = Object.keys(OfficeTypeEnum.officeType).map(key => ({
      value: OfficeTypeEnum.officeType[key],
      label: key
    }))
  },
  methods: {
    resetFlied() {
      this.dto = {
        status: 1,
        type: 1
      }
    },
    add() {
      this.resetFlied()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
    },
    onAdd() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          save(this.dto).then(response => {
            this.$emit('handleFilter', true)
            this.dialogFormVisible = false
            if (response.status === '200') {
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
    },
    edit(row) {
      this.detailInfo = Object.assign({}, row)
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    handlerChange() {
      this.dto.stockNum = this.dto.endNumber - this.dto.starterNumber
    },
    onEdit() {
      // this.$refs['formRef'].validate(valid => {
      //   if (valid) {
      //     update(this.dto).then(response => {
      //       this.$emit('handleFilter', false)
      //       this.dialogFormVisible = false
      //       if (response) {
      //         this.$notify({
      //           title: this.$i18n.t("AdminService['Success']"),
      //           message: this.$i18n.t("AdminService['SuccessMessage']"),
      //           type: 'success',
      //           duration: 2000
      //         })
      //       }
      //     })
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped></style>
