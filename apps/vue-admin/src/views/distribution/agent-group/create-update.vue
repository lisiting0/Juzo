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
      label-width="100px"
      :model="dto"
    >
      <el-form-item label="名称" prop="name">
        <el-input
          v-model.trim="dto.name"
          clearable
          placeholder="名称"
        />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="dto.description"
          clearable
          placeholder="描述"
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
import { createTicketAgentGroup, updateTicketAgentGroup } from '@/api/distribution/agent-group'

export default {
  name: 'AgentGroupCreateUpdate',
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      dto: {},
      formRules: {
        name: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        description: [
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
          createTicketAgentGroup(this.dto).then(response => {
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
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    edit(row) {
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
          updateTicketAgentGroup(this.dto).then(response => {
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
        } else {
          this.$message.error('请完善必填项')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
