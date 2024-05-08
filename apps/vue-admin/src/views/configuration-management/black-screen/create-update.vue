<template>
  <el-dialog
    width="30%"
    top="5vh"
    :visible.sync="dialogFormVisible"
    :title="
      dialogStatus == 'add' ? $t('table.add') : $t('table.edit')
    "
  >
    <el-form
      ref="formRef"
      :rules="formRules"
      label-width="180px"
      :model="dto"
    >
      <el-form-item label="航司" prop="airline">
        <el-input
          v-model.trim="dto.airline"
          clearable
          placeholder="航司"
          @input="handleInput"
        />
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model.trim="dto.userName"
          clearable
          placeholder="账号"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="dto.password"
          clearable
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item label="服务器地址" prop="server">
        <el-input
          v-model.trim="dto.server"
          clearable
          placeholder="服务器地址"
        />
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input
          v-model.trim="dto.port"
          clearable
          placeholder="端口"
        />
      </el-form-item>
      <el-form-item prop="isRaw" label="配置类型">
        <el-select v-model="dto.isRaw" clearable>
          <el-option
            v-for="option in isRawOptions"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SI账户密码" prop="signIn">
        <el-input
          v-model.trim="dto.signIn"
          clearable
          placeholder="SI账户密码，用|分割，例：账号|密码"
        />
      </el-form-item>
      <el-form-item label="office号" prop="officeNo">
        <el-input
          v-model.trim="dto.officeNo"
          clearable
          placeholder="office号"
        />
      </el-form-item>
      <el-form-item label="分组部门" prop="groupName">
        <el-input
          v-model.trim="dto.groupName"
          clearable
          placeholder="分组部门"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dialogStatus === 'add' ? createData() : updateData()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createPriceSourceAccount, updatePriceSourceAccount } from '@/api/configuration/price-source-account'

export default {
  name: 'ConfigurationCreateUpdate',
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      isRawOptions: [
        {
          value: true,
          label: '原始配置'
        }, {
          value: false,
          label: '非原始配置'
        }
      ],
      dto: {},
      formRules: {
        userName: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        server: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        port: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        isRaw: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        signIn: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入SI账号密码，用|分割，例：账号|密码'))
              }
              const regex = /\|/
              if (!regex.test(value)) {
                callback(new Error('请输入SI账号密码，用|分割，例：账号|密码'))
              }
              callback()
            }
          }
        ],
        officeNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        groupName: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {

  },
  methods: {
    resetFlied() {
      this.dto = {}
    },
    handleInput() {
      this.dto.airline = this.dto.airline.toUpperCase()
    },
    handleCreate() {
      this.resetFlied()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.dto.enableSsl = true
          createPriceSourceAccount(this.dto).then(response => {
            if (response) {
              this.$emit('handleFilter', true)
              this.dialogFormVisible = false
              this.$notify({
                account: this.$i18n.t("AdminService['Success']"),
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
      this.resetFlied()
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.dto = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          updatePriceSourceAccount(this.dto).then(response => {
            this.$emit('handleFilter', true)
            this.dialogFormVisible = false
            if (response) {
              this.$notify({
                account: this.$i18n.t("AdminService['Success']"),
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
