<template>
  <el-dialog width="50%" :visible.sync="dialogFormVisible" title="">
    <el-form
      ref="formRef"
      :model="detail"
      :rules="rules"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <div class="form-container">
        <div class="title">修改密码</div>
        <div class="form-item">
          <div class="form-item-title">新密码</div>
          <div class="form-item-con">
            <el-form-item label="" prop="newPassword">
              <el-input
                v-model.trim="detail.newPassword"
                type="password"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">确认密码</div>
          <div class="form-item-con">
            <el-form-item label="" prop="confirmPassword">
              <el-input
                v-model.trim="detail.confirmPassword"
                type="password"
                clearable
              />
            </el-form-item>
          </div>
        </div>
        <div class="form-item footer">
          <el-button type="primary" @click="save()">保存 </el-button>
          <el-button
            @click="dialogFormVisible = false"
          >关闭</el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import rules from '@/utils/rules'
import { updateSubAccount } from '@/api/identity/agent'

export default {
  name: 'SubAccountModifyPassword',
  components: {
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(
          this.$i18n.t("AbpAccount['ThisFieldIsNotValid.']")
        ))
      }
      if (value && value !== this.detail.newPassword) {
        return callback(new Error('新密码和确认密码不匹配'))
      }
      callback()
    }
    return {
      dialogFormVisible: false,
      loading: false,
      detail: {},
      rules: {
        newPassword: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validatePsdReg
          }
        ],
        confirmPassword: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: validatePass
          }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handle(row) {
      this.detail = Object.assign({}, row)
      this.dialogFormVisible = true

      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    save() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.loading = true
          const dataJson = {
            userId: this.detail.id,
            newPassword: this.detail.confirmPassword
          }
          const user = this.$store.state.app.user
          updateSubAccount(user.id, dataJson)
            .then(() => {
              this.loading = false
              this.$emit('handleFilter', false)
              this.dialogFormVisible = false
              this.$message({
                account: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success'
              })
            }).catch(() => {
              this.loading = false
            })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
