<template>
  <div class="app-container">
    <el-form
      ref="formRef"
      :model="detail"
      :rules="formRules"
      :inline="true"
      class="account-info-form demo-form-inline form-inline-label-115"
    >
      <div class="form-container">
        <div class="title">账户信息</div>
        <div class="form-item">
          <div class="form-item-title">
            {{ detail.partnerType === 1 ? '公司名称' : '名称' }}
          </div>
          <div class="form-item-con">
            <el-form-item label="" prop="name">
              <el-input v-model.trim="detail.name" clearable />
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">
            {{ detail.partnerType === 1 ? '公司地址' : '地址' }}
          </div>
          <div class="form-item-con">
            <el-form-item label="" prop="address">
              <el-input v-model.trim="detail.address" clearable />
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">
            {{
              detail.partnerType === 1
                ? '统一社会代码'
                : '身份证件号'
            }}
          </div>
          <div class="form-item-con">
            <el-form-item label="" prop="identityNumber">
              <el-input
                v-model.trim="detail.identityNumber"
                :placeholder="
                  detail.partnerType === 1
                    ? '统一社会代码'
                    : '身份证件号'
                "
                name="identityNumber"
                autocomplete="off"
              />
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">
            {{
              detail.partnerType === 1
                ? '统一社会代码图片'
                : '证件图片'
            }}
          </div>
          <div class="form-item-con">
            <el-form-item label="" prop="identityImage">
              <el-upload
                action=""
                accept=".jpg, .png"
                list-type="picture-card"
                :limit="2"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="getFile"
                :file-list="tempImages"
                :class="{
                  'hidden-card':
                    (detail.partnerType === 0 &&
                      tempImages.length == 2) ||
                    (detail.partnerType === 1 &&
                      tempImages.length == 1),
                }"
              >
                <i slot="default" class="el-icon-plus" />
                <div
                  v-if="detail.partnerType === 0"
                  slot="tip"
                  class="el-upload__tip"
                  style="color: #d9001b"
                >
                  个人证件需要提供正反面
                </div>
              </el-upload>
              <el-dialog
                :modal="false"
                :visible.sync="dialogVisible"
                style="z-index: 20"
              >
                <img
                  width="100%"
                  :src="dialogImageUrl"
                  alt=""
                >
              </el-dialog>
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">手机号码</div>
          <div class="form-item-con">
            <el-form-item label="" prop="phone">
              <el-input v-model.trim="detail.phone" clearable />
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">联系人</div>
          <div class="form-item-con">
            <el-form-item label="" prop="contact">
              <el-input v-model.trim="detail.contact" clearable />
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">邮箱</div>
          <div class="form-item-con" prop="email">
            <el-form-item label="">
              <el-input v-model.trim="detail.email" clearable />
            </el-form-item>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item-title">QQ</div>
          <div class="form-item-con" prop="qq">
            <el-form-item label="">
              <el-input v-model.trim="detail.qq" clearable />
            </el-form-item>
          </div>
        </div>
        <div class="form-item footer">
          <el-button type="primary" @click="save()"> 保存 </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import rules from '@/utils/rules'
import { getAgentByUser, ticketAgentDetail, updateTicketAgent } from '@/api/identity/agent'

export default {
  name: 'AccountInformation',
  components: {
  },
  data() {
    return {
      loading: false,
      detail: {},
      tempImages: [],
      dialogImageUrl: '',
      dialogVisible: false,
      formRules: {
        name: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validatePhone
          }
        ],
        address: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        identityNumber: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")))
              }
              if (this.detail.partnerType === 1) {
                const pattern = /^[0-9A-Z]{18}$/
                if (!pattern.test(value)) {
                  callback(new Error('统一社会信用代码由18位字符组成的编码'))
                } else {
                  callback()
                }
              } else {
                const regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                if (!regId.test(value)) {
                  callback(new Error('请输入正确的二代身份证号码'))
                } else {
                  callback()
                }
              }
            }
          }
        ],
        identityImage: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        contact: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validateContacts
          }
        ],
        email: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validateEmail
          }
        ],
        qq: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validateQQ
          }
        ]
      }
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {
  },
  methods: {
    resetFiled() {
      this.detail = {}
      this.tempImages = []
      this.dialogImageUrl = ''
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
    getFile(file) {
      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.tempImages.push({
            uid: file.uid,
            url: res
          })
        }
      })
    },
    handleRemove(file) {
      this.tempImages = this.tempImages.filter(x => x.uid !== file.uid)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getDetail() {
      this.loading = true
      const abpConfig = this.app.abpConfig
      getAgentByUser(abpConfig.currentUser.id).then((response) => {
        if (response) {
          ticketAgentDetail(response.id).then((res) => {
            this.loading = false
            if (res) {
              this.resetFiled()
              this.detail = res
              const tempImages = this.detail.identityImage.split('|')
              tempImages.forEach(element => {
                this.tempImages.push({
                  url: element
                })
              })
              this.dialogImageUrl = this.tempImages[0].url
            }
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    save() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.detail.partnerType === 0 && this.tempImages.length !== 2) {
            this.$message({
              message: '个人证件需要提供正反面',
              type: 'warning'
            })
            return false
          } else if (this.detail.partnerType === 1 && this.tempImages.length !== 1) {
            this.$message({
              message: '请上传统一社会代码图片',
              type: 'warning'
            })
            return false
          }
          this.loading = true
          this.detail.identityImage = this.tempImages.map(x => x.url).join('|')
          updateTicketAgent(this.detail)
            .then(response => {
              this.loading = false
              if (response) {
                location.reload()
                this.$notify({
                  account: this.$i18n.t("AdminService['Success']"),
                  message: this.$i18n.t("AdminService['SuccessMessage']"),
                  type: 'success'
                })
              }
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

<style lang="scss">
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .account-info-form {
        .el-upload-list--picture-card .el-upload-list__item,
        .el-upload--picture-card {
            width: 130px;
            height: 130px;
        }

        .hidden-card {
            .el-upload {
                display: none;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.form-container .form-item {
    height: auto;
}
.el-form-item {
    margin-bottom: 0;
}
</style>
