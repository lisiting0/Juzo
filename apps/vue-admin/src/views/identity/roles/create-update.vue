<template>
  <el-dialog
    width="30%"
    :visible.sync="dialogFormVisible"
    :title="dialogStatus == 'add' ? $t('table.add') : $t('table.edit')"
  >
    <el-form ref="formRef" :rules="rules" label-width="150px" :model="dto">
      <el-form-item prop="name" label="角色">
        <el-input v-model.trim="dto.name" clearable placeholder="角色" />
      </el-form-item>
      <el-form-item prop="isDefault" label="是否默认">
        <el-checkbox v-model="dto.isDefault" />
      </el-form-item>
      <el-form-item prop="isPublic" label="是否公开">
        <el-checkbox v-model="dto.isPublic" />
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
import { createRole, updateRole } from '@/api/identity/role'

export default {
  name: 'RolesCreateUpdate',
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      roleOptions: [],
      dto: {},
      rules: {
        role: [
          {
            required: true,
            message: '请输入角色名称',
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
          this.dto.isStatic = false
          createRole(this.dto).then(response => {
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
      this.dto = Object.assign({}, row)
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          updateRole(this.dto).then(response => {
            this.$emit('handleFilter', false)
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
