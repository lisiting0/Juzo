<template>
  <el-dialog
    width="30%"
    top="5vh"
    :visible.sync="dialogFormVisible"
    :title="dialogStatus == 'add' ? $t('table.add') : $t('table.edit')"
  >
    <el-form
      ref="formRef"
      :rules="formRules"
      label-width="180px"
      :model="dto"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户信息" name="first">
          <el-form-item label="账号" prop="userName">
            <el-input
              v-model.trim="dto.userName"
              clearable
              placeholder="账号"
            />
          </el-form-item>
          <el-form-item label="姓氏" prop="surname">
            <el-input
              v-model.trim="dto.surname"
              clearable
              placeholder="姓氏"
            />
          </el-form-item>
          <el-form-item label="名" prop="name">
            <el-input
              v-model.trim="dto.name"
              clearable
              placeholder="名"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model.trim="dto.password"
              type="password"
              clearable
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input
              v-model.trim="dto.phoneNumber"
              clearable
              placeholder="手机号"
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model.trim="dto.email"
              clearable
              placeholder="邮箱"
            />
          </el-form-item>

          <el-form-item label="" prop="isActive" style="margin-bottom: 0;">
            <el-checkbox v-model="dto.isActive" label="是否激活" name="isActive" />
          </el-form-item>
          <el-form-item label="" prop="lockoutEnabled">
            <el-checkbox v-model="dto.lockoutEnabled" label="登录失败,账户被锁定" name="lockoutEnabled" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="角色" name="second">
          <el-form-item label="角色">
            <el-tree
              ref="tree"
              show-checkbox
              :check-strictly="checkStrictly"
              :data="rolesList"
              :props="defaultProps"
              node-key="name"
              class="permission-tree"
            />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
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
import rules from '@/utils/rules'
import { createUser, updateUser } from '@/api/identity/user'
import { getRolesAll } from '@/api/identity/role'
import { getRolesByUserId } from '@/api/identity/user'

export default {
  name: 'AccountCreateUpdate',
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      activeName: 'first',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rolesList: [],
      dto: { initPassword: '' },
      formRules: {
        userName: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validateLoginName
          }
        ],
        password: [
          {
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validateCanNullPassword
          }
        ],
        phone: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validatePhone
          }
        ],
        email: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validateEmail
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
    this.getRoles()
  },
  mounted() {

  },
  methods: {
    async getRoles() {
      const res = await getRolesAll()
      this.rolesList = res.items
    },
    resetFlied() {
      this.dto = {}
    },
    add() {
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
            createUser(this.dto).then(response => {
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
    edit(row) {
      this.resetFlied()
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.dto = Object.assign({}, row)
      this.getRolesByUserId(this.dto.id)
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    getRolesByUserId(id) {
      getRolesByUserId(id).then(response => {
        if (response) {
          this.$refs.tree.setCheckedNodes(response.items)
          this.dto.roleNames = response.items.map(x => x.name)
        }
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          const checkedKeys = this.$refs['tree'].getCheckedKeys()
          this.dto.roleNames = checkedKeys
          updateUser(this.dto).then(response => {
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
