<template>
  <el-dialog
    width="25%"
    :visible.sync="dialogFormVisible"
    :title="'增加授信'"
  >
    <el-form
      ref="formRef"
      :rules="rules"
      :label-position="'right'"
      label-width="100px"
      :model="dto"
    >
      <el-form-item label="分销商">
        {{ dto.agentOrganizationName }}
      </el-form-item>
      <el-form-item label="当前授信">
        {{ dto.creditBalance }}
      </el-form-item>
      <el-form-item label="增加授信" prop="credit">
        <el-input
          v-model="dto.creditAmount"
          clearable
          placeholder="增加授信"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="增加后授信">
        <template v-if="dto.creditBalance && dto.creditAmount">{{
          dto.creditBalance*1 + dto.creditAmount*1
        }}</template>
      </el-form-item>
      <el-form-item label="附件" prop="attachment">
        <el-upload
          action=""
          :auto-upload="false"
          list-type="picture-card"
          :on-change="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          class="dialog-img"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dto.attachment" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="recharge()">授信</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { rechargeCredit } from '@/api/agent/credit-management'

export default {
name: 'Credit',
data() {
  var checkNumber = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('授信不能为空'))
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (value < 1000) {
          callback(new Error('必须大于1000'))
        } else {
          callback()
        }
      }
    }, 1000)
  }
  return {
    dialogStatus: '',
    dialogFormVisible: false,
    dialogImageUrl: '',
    dialogVisible: false,
    dto: {},
    rules: {
      increaseCredit: [
        { validator: checkNumber, trigger: 'blur' }
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
    this.dto = {}
  },
  handle(row) {
    this.resetFlied()
    this.dto = row
    // console.log('************this.row', row)
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      this.$refs['formRef'].clearValidate()
    })
  },
  handleRemove(file, fileList) {
    this.dto.attachment = null
    this.dialogVisible = false
  },
  handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url
    this.dialogVisible = true
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
  handleAvatarSuccess(file) {
    this.getBase64(file.raw).then(res => {
      const params = res.split(',')
      if (params.length > 0) {
        this.dto.attachment = res
        this.dialogVisible = true
      }
    })
  },
  recharge() {
    this.$refs['formRef'].validate(valid => {
        if (valid) {
              // console.log(this.dto)
              rechargeCredit(this.dto).then(response => {
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
  }
}
}
</script>

<style lang="scss" scoped></style>
