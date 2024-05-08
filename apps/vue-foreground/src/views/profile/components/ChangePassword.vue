<template>
  <el-form ref="aForm" :model="aForm" :rules="aRules">
    <el-form-item
      :label="$t('AbpAccount[\'DisplayName:CurrentPassword\']')"
      prop="password"
    >
      <el-input v-model.trim="aForm.password" type="password" />
    </el-form-item>
    <el-form-item
      :label="$t('AbpAccount[\'DisplayName:NewPassword\']')"
      prop="newPassword"
    >
      <el-input v-model.trim="aForm.newPassword" type="password" />
    </el-form-item>
    <el-form-item
      :label="$t('AbpAccount[\'DisplayName:NewPasswordConfirm\']')"
      prop="againPassword"
    >
      <el-input v-model.trim="aForm.againPassword" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{
        $t("AbpAccount['Submit']")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import rules from '@/utils/rules'
import { changePassword } from '@/api/user'
export default {
  data() {
    var avalidatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error(
          this.$i18n.t("AbpAccount['ThisFieldIsNotValid.']")
        ))
      } else if (value !== this.aForm.newPassword) {
        return callback(new Error('新密码和确认密码不一致'))
      } else {
        callback()
      }
    }
    return {
      aForm: {
        password: '',
        newPassword: '',
        againPassword: ''
      },
      aRules: {
        password: [{
          required: true,
          trigger: ['blur', 'change'],
          validator: rules.FormValidate.Form().validatePsdReg
        }
        ],
        newPassword: [{
          required: true,
          message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
          trigger: ['blur', 'change']
        }
        ],
        againPassword: [{
          required: true,
          validator: avalidatePass,
          trigger: ['blur', 'change']
        }
        ]
      },
      loading: false
    }
  },
  methods: {
    submit() {
      this.$refs.aForm.validate(valid => {
        if (valid) {
          this.loading = true
          const dataJson = {
            currentPassword: this.aForm.password,
            newPassword: this.aForm.againPassword
          }
          changePassword(dataJson).then(() => {
            this.loading = false
            this.$notify({
              title: this.$i18n.t("AdminService['Success']"),
              message: this.$i18n.t("AdminService['SuccessMessage']"),
              type: 'success',
              duration: 2000
            })
          })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
