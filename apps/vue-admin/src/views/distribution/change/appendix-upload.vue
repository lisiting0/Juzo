<template>
  <el-dialog
    width="30%"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      ref="formRef"
      :label-position="'right'"
      label-width="100px"
      :model="detailInfo"
    >
      <el-form-item label="改签类型理由">
        <el-select v-model="detailInfo.changeTicketReason" clearable>
          <el-option
            v-for="option in changeTypeOptions"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="detailInfo.remark"
          type="textarea"
          :rows="2"
          placeholder="备注"
        />
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          action=""
          :auto-upload="false"
          :on-change="handleAvatarSuccess"
          :on-remove="handleRemove"
          class="avatar-uploader"
        >
          <img v-if="dialogVisible" :src="detailInfo.appendix" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="recharge()"> 确认 </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { uploadAppendix } from '@/api/agent/change-order'
  import ChangeTypeEnum from '@/enum/changeType'

  export default {
    name: 'CreditReviewDetail',
    data() {
      return {
        // 传递数据
        detailInfo: {},
        dialogFormVisible: false,
        dialogVisible: false,
        changeTypeOptions: [],
        uploadUrl: process.env.VUE_APP_UPLOAD_API
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
      this.changeTypeOptions = Object.keys(ChangeTypeEnum.ChangeType).map(key => ({
        value: ChangeTypeEnum.ChangeType[key],
        label: key
      }))
    },
    methods: {
      detail(row) {
        this.detailInfo.changeOrderNo = row
        this.dialogFormVisible = true
      },
      handle(row) {
        this.dialogFormVisible = true
      },
      // 获取图片转base64
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          const reader = new FileReader()
          let imgResult = ''
          reader.readAsDataURL(file)
          reader.onload = function() {
            imgResult = reader.result
          }
          reader.onerror = function(error) {
            reject(error)
          }
          reader.onloadend = function() {
            resolve(imgResult)
          }
        })
      },
      handleRemove(file, fileList) {
        this.detailInfo.appendix = null
        this.dialogVisible = false
      },
      handleAvatarSuccess(file) {
        this.getBase64(file.raw).then(res => {
          const params = res.split(',')
          if (params.length > 0) {
            this.detailInfo.appendix = res
            this.dialogVisible = true
          }
        })
      },
      recharge() {
        uploadAppendix(this.detailInfo).then(response => {
          if (response.status === '200') {
            this.$emit('handleFilter')
            this.dialogFormVisible = false
            this.detailInfo = {}
            this.dialogVisible = false
            this.$notify({
              title: this.$i18n.t("AdminService['Success']"),
              message: this.$i18n.t("AdminService['SuccessMessage']"),
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$i18n.t("AdminService['Error']"),
              message: this.$i18n.t("AdminService['ErrorMessage']"),
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
