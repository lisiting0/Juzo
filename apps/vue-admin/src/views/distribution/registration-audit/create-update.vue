<template>
  <el-dialog
    width="50%"
    top="5vh"
    :center="true"
    :visible.sync="dialogFormVisible"
    :title="dialogStatus == 'add' ? '分销商注册申请' : '分销商注册编辑'"
  >
    <el-form
      ref="formRef"
      :model="dto"
      :rules="formRules"
      class="apply-form demo-form-inline"
      autocomplete="on"
      label-position="left"
    >
      <div class="custom-card">
        <div class="card-title">账号信息</div>
        <div class="card-box padding-2">
          <div align="center">
            <div class="card-item">
              <label class="card-item-title">账号类型</label>
              <div class="card-item-content">
                <el-form-item prop="partnerType" label="">
                  <el-radio-group v-model="dto.partnerType">
                    <el-radio
                      v-for="option in partnerTypeOptions"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{ option.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="card-item">
              <label class="card-item-title">账号</label>
              <div class="card-item-content">
                <el-form-item prop="loginName" label="">
                  <el-input
                    v-model.trim="dto.loginName"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
            <!-- <div>
              <div class="card-item">
                <label class="card-item-title">密码</label>
                <div class="card-item-content">
                  <el-form-item prop="password" label="">
                    <el-input
                      v-model.trim="dto.password"
                      clearable
                    />
                  </el-form-item>
                </div>
              </div>
            </div> -->
            <div>
              <div class="card-item">
                <label class="card-item-title">手机号码</label>
                <div class="card-item-content">
                  <el-form-item prop="phone" label="">
                    <el-input
                      v-model.trim="dto.phone"
                      clearable
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">
          {{ dto.partnerType === 1 ? '企业资质信息' : '个人信息' }}
        </div>
        <div class="card-box padding-2">
          <div align="center">
            <div class="card-item">
              <label class="card-item-title">{{ dto.partnerType === 1 ? '公司名称' : '名称' }}</label>
              <div class="card-item-content">
                <el-form-item prop="name" label="">
                  <el-input
                    v-model.trim="dto.name"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
            <div class="card-item">
              <label class="card-item-title">{{ dto.partnerType === 1 ? '公司地址' : '地址' }}</label>
              <div class="card-item-content">
                <el-form-item prop="address" label="">
                  <el-input
                    v-model.trim="dto.address"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
            <div class="card-item">
              <label class="card-item-title">{{ dto.partnerType === 1? '统一社会代码': '身份证号码' }}</label>
              <div class="card-item-content">
                <el-form-item prop="identityNumber" label="">
                  <el-input
                    v-model.trim="dto.identityNumber"
                    clearable
                  />
                </el-form-item>
              </div>
            </div>
            <div class="card-item">
              <label class="card-item-title">{{ dto.partnerType === 1 ? '统一社会代码图片': '证件图片' }}</label>
              <div class="card-item-content">
                <el-form-item prop="identityImage" label="">
                  <el-upload
                    action=""
                    accept=".jpg, .png"
                    list-type="picture-card"
                    :limit="2"
                    :auto-upload="false"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-change="getFile"
                    :class="{
                      'hidden-card':
                        tempImages.length == 2,
                    }"
                  >
                    <i
                      slot="default"
                      class="el-icon-plus"
                    />
                    <div
                      v-if="dto.partnerType === 0"
                      slot="tip"
                      class="el-upload__tip"
                      style="color: #d9001b"
                    >
                      个人证件需要提供正反面
                    </div>
                  </el-upload>
                  <el-dialog :visible="dialogVisible">
                    <img
                      width="100%"
                      :src="previewImage"
                      alt=""
                    >
                  </el-dialog>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">联系信息</div>
        <div class="card-box padding-2">
          <div align="center">
            <div class="card-item">
              <label class="card-item-title">联系人</label>
              <div class="card-item-content">
                <el-form-item prop="contact" label="">
                  <el-input
                    v-model.trim="dto.contact"
                    :placeholder="'联系人'"
                    name="contact"
                    autocomplete="on"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="card-item">
              <label class="card-item-title">电子邮箱</label>
              <div class="card-item-content">
                <el-form-item prop="email" label="">
                  <el-input
                    v-model.trim="dto.email"
                    :placeholder="'电子邮箱'"
                    name="contact"
                    autocomplete="on"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="card-item">
              <label class="card-item-title">联系人QQ</label>
              <div class="card-item-content">
                <el-form-item prop="qq" label="">
                  <el-input
                    v-model.trim="dto.qq"
                    :placeholder="'联系人QQ'"
                    name="contact"
                    autocomplete="on"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="createData()"> 保存 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import JuzoPartnerTypeEnum from '@/enum/JuzoPartnerType'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import rules from '@/utils/rules'
import { apply } from '@/api/distribution/audit'

export default {
  name: 'RegistrationAuditCreateUpdate',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      partnerTypeOptions: [],
      dto: {},
      dialogVisible: false,
      tempImages: [],
      previewImage: '',
      loading: false,
      formRules: {
        loginName: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validateLoginName
          }
        ],
        phone: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validatePhone
          }
        ],
        verifyCode: [
          {
            required: true,
            trigger: ['blur', 'change'],
            validator: rules.FormValidate.Form().validateInteger
          }
        ],
        name: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
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
            validator: rules.FormValidate.Form().validateCardNo
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
        // qq: [
        //   {
        //     required: true,
        //     trigger: ['blur', 'change'],
        //     validator: rules.FormValidate.Form().validateQQ
        //   }
        // ],
        agree: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
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
    this.partnerTypeOptions = Object.keys(JuzoPartnerTypeEnum.JuzoPartnerType).map(key => ({
      value: JuzoPartnerTypeEnum.JuzoPartnerType[key],
      label: this.$t(`AdminService["Enum:JuzoPartnerType:${JuzoPartnerTypeEnum.JuzoPartnerType[key]}"]`)
    }))
  },
  methods: {
    getIp() {
      axios.get('https://api.ipify.org?format=json')
        .then(response => {
          this.dto.ip = response.data.ip
        })
        .catch(error => console.log(error))
    },
    resetFlied() {
      this.dto = {
        partnerType: 0,
        identityImage: [],
        verifyCode: '362321'
      }
      this.tempImages = []
      this.previewImage = []
    },
    add() {
      this.resetFlied()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.getIp()
        this.$refs['formRef'].clearValidate()
      })
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
    getFile(file, fileList) {
      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.tempImages.push({
            uid: file.uid,
            base64: res
          })
          this.dto.identityImage = this.tempImages
        }
      })
    },
    handleRemove(file, fileList) {
      this.tempImages = this.tempImages.filter(x => x.uid !== file.uid)
      this.dto.identityImage = this.tempImages
    },
    handlePictureCardPreview(file) {
      this.previewImage = file.url
      this.dialogVisible = true
    },
    createData() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          if (this.dto.partnerType === 0 && this.dto.identityImage.length !== 2) {
            this.$message({
              message: '个人证件需要提供正反面',
              type: 'warning'
            })
            return false
          }
          this.loading = true
          this.dto.identityImage = this.tempImages.map(x => x.base64).join('|')
          this.dto.verifyId = uuidv4()
          this.dto.organizationType = 0 // 0机票代理人 1机票供应商
          apply(this.dto).then(res => {
            this.$emit('handleFilter', true)
            this.dialogFormVisible = false
            this.$notify({
              account: this.$i18n.t("AdminService['Success']"),
              message: this.$i18n.t("AdminService['SuccessMessage']"),
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .apply-form {
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
.el-dialog--center .el-dialog__body {
    padding-bottom: 5px;
}
.custom-card .card-box .card-item {
    padding: 0;
    .card-item-title {
        flex: 0 0 130px;
        line-height: 28px;
    }
}
.card-item {
    width: 50%;
}
.image__preview {
    .inline-block {
        display: inline-block;
        margin-right: 5px;
    }
}
</style>
