<template>
    <el-dialog width="50%" :visible.sync="dialogFormVisible" title="">
        <el-form
            ref="formRef"
            :model="detail"
            :rules="formRules"
            :inline="true"
            class="demo-form-inline form-inline-label-115"
        >
            <div class="form-container">
                <div class="title">新增子账户</div>
                <div class="form-item">
                    <div class="form-item-title">账号</div>
                    <div class="form-item-con">
                        <el-form-item label="" prop="userName">
                            <el-input v-model="detail.userName" clearable />
                        </el-form-item>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">密码</div>
                    <div class="form-item-con">
                        <el-form-item label="" prop="password">
                            <el-input
                                v-model="detail.password"
                                type="password"
                                clearable
                            />
                        </el-form-item>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">手机</div>
                    <div class="form-item-con">
                        <el-form-item label="" prop="phone">
                            <el-input v-model="detail.phone" clearable />
                        </el-form-item>
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-title">邮箱</div>
                    <div class="form-item-con">
                        <el-form-item label="" prop="email">
                            <el-input v-model="detail.email" clearable />
                        </el-form-item>
                    </div>
                </div>
                <div class="form-item footer">
                    <el-button type="primary" @click="save()">保存 </el-button>
                    <el-button @click="dialogFormVisible = false">关闭</el-button>
                </div>
            </div>
        </el-form>
    </el-dialog>
</template>

<script>
import rules from '@/utils/rules'
import { createSubAccount } from '@/api/identity/agent'

export default {
  name: 'SubAcountModifyPassword',
  components: {
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      detail: {},
      formRules: {
        userName: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateLoginName
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validatePsdReg
          }
        ],
        phone: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validatePhone
          }
        ],
        email: [
          {
            required: true,
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateEmail
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
    resetFlied() {
      this.detail = {}
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.resetFlied()
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    save() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.loading = true
          const userId = this.$store.state.app.user.id
          createSubAccount(userId, this.detail)
            .then(() => {
              this.loading = false
              this.$emit('handleFilter', true)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: '密码修改成功',
                type: 'success'
              })
            })
            .catch(() => {
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
