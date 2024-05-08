<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="40%"
    top="3vh"
    :title="dialogStatus == 'create' ? $t('table.add') : $t('table.edit')"
  >
    <el-form
      ref="formRef"
      :model="detail"
      :inline="true"
      class="demo-form-inline form-inline-label-125"
    >
      <el-form-item label="出票渠道" prop="bspPaymentType">
        <el-select
          v-model="detail.ticketChannel"
          filterable
          clearable
          placeholder="出票渠道"
        >
          <el-option
            v-for="item in ticketChannelTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="支付渠道选择" prop="bspPaymentType">
        <el-select
          v-model="detail.purchasePayPlatform"
          filterable
          clearable
          placeholder="支付渠道选择"
        >
          <el-option
            v-for="item in purchasePayPlatformTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="自营出票Office" prop="officeNo">
        <el-input
          v-model="detail.officeNo"
          clearable
          placeholder="自营出票Office"
        />
      </el-form-item>
      <el-form-item label="打票机号配置" prop="ticketPrinterNo">
        <el-input
          v-model="detail.printerNo"
          clearable
          placeholder="打票机号配置"
        />
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="detail.account"
          clearable
          placeholder="账号"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="detail.password"
          clearable
          placeholder="密码"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { create, update } from '@/api/configuration/issue-ticket-self'
import TicketChannelTypeEnum from '@/enum/TicketChannelType'
import PurchasePayPlatformTypeEnum from '@/enum/PurchasePayPlatformType'

export default {
  name: 'IssueTicketSelfConfigurationCreateUpdate',
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      detail: {},
      ticketChannelTypeOptions: [],
      purchasePayPlatformTypeOptions: []
    }
  },
  computed: {},
  watch: {
    dialogVisible(newValue) {
      this.cabinDialogVisible = newValue
    }
  },
  mounted() {
    this.ticketChannelTypeOptions = Object.keys(TicketChannelTypeEnum.TicketChannelType).map(key => ({
      value: TicketChannelTypeEnum.TicketChannelType[key],
      label: this.$t(`AdminService["Enum:TicketChannelType:${TicketChannelTypeEnum.TicketChannelType[key]}"]`)
    }))
    this.purchasePayPlatformTypeOptions = Object.keys(PurchasePayPlatformTypeEnum.PurchasePayPlatformType).map(key => ({
      value: PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key],
      label: this.$t(`AdminService["Enum:PurchasePayPlatformType:${PurchasePayPlatformTypeEnum.PurchasePayPlatformType[key]}"]`)
    }))
  },
  methods: {
    resetFlied() {
      this.detail = {
      }
    },
    handleCreate() {
      this.resetFlied()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          create(this.detail).then(response => {
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
    },
    handleUpdate(row) {
      this.detail = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          update(this.detail).then(response => {
            this.$emit('handleFilter', false)
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
    }
  }
}
</script>

<style scoped>
.el-select {
    display: block;
}
</style>
