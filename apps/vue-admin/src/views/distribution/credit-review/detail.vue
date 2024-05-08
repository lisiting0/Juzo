<template>
  <el-dialog width="30%" top="5vh" :visible.sync="dialogFormVisible" :title="dialogStatus == 'detail' ? '详情' : '审核'">
    <el-form ref="formRef" :label-position="'right'" label-width="100px" :model="detailInfo">
      <el-form-item label="申请账号名称" prop="agentOrganizationName">
        {{ detailInfo.agentOrganizationName }}
      </el-form-item>
      <el-form-item label="申请类型" prop="auditType">
        {{
          $t(
            `AdminService["Enum:AuditType:${detailInfo.auditType}"]`
          )
        }}
      </el-form-item>
      <el-form-item label="数额" prop="auditAmount">
        {{ detailInfo.auditAmount }}
      </el-form-item>
      <el-form-item label="状态" prop="auditStatus">
        {{
          $t(
            `AdminService["Enum:AuditStatus:${detailInfo.auditStatus}"]`
          )
        }}
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="detailInfo.remark"
          type="textarea"
          :rows="2"
          placeholder="备注"
          :disabled="dialogStatus === 'detail' ? true : false"
        />
      </el-form-item>
      <el-form-item label="附件" prop="attachment">
        <div class="demo-image__preview">
          <el-image style="width: 25%;" :src="detailInfo.attachment" :preview-src-list="attachmentList" />
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button type="danger" :style="{ display: isVisble }" @click="recharge(2)"> 审核拒绝 </el-button>
      <el-button type="primary" :style="{ display: isVisble }" @click="recharge(1)"> 审核通过 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { auditSuccess } from '@/api/agent/credit-review'

export default {
  name: 'CreditReviewDetail',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      detailInfo: {},
      dialogImageUrl: '',
      dialogVisible: false,
      isVisble: 'none',
      attachmentList: [],
      rules: {
        remark: [
          {
            required: true,
            message: '请输入备注信息',
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
  },
  methods: {
    resetFlied() {
      this.detailInfo = {}
    },
    detail(row) {
      this.detailInfo = Object.assign({}, row)
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.isVisble = 'none'
    },
    handle(row) {
      this.detailInfo = Object.assign({}, row)
      this.dialogStatus = 'handle'
      this.dialogFormVisible = true
      this.isVisble = ''
      this.attachmentList.push(this.detailInfo.attachment)
    },
    handleRemove(file, fileList) {
      this.detailInfo.appendix = null
      this.dialogVisible = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onHandle() {
      // this.$refs['formRef'].validate(valid => {
      //   if (valid) {
      //     update(this.detailInfo).then(response => {
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
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.detailInfo.appendix = res.data
      this.dialogVisible = true
    },
    recharge(status) {
      this.$confirm('确定需要审核通过操作么？', '充值审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const requestData = { ...this.detailInfo }
        requestData.auditStatus = status
        auditSuccess(requestData).then(response => {
          this.$emit('handleFilter', true)
          this.dialogFormVisible = false
          if (response.status === '200') {
            this.$message({
              type: 'success',
              message: '余额充值审核成功!'
            })
            // this.getIssueOrderDetail()
            this.$notify({
              title: this.$i18n.t("AdminService['Success']"),
              message: this.$i18n.t("AdminService['SuccessMessage']"),
              type: 'success',
              duration: 2000
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '充值审核失败'
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
