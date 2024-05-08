<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form demo-form-inline"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          分销商{{ $t('AdminService["Register"]') }}申请<lang-select class="set-language" />
        </h3>
        <p class="explain">
          {{ $t("AbpAccount['AlreadyRegistered']") }}
          <el-link
            type="primary"
            :underline="false"
            @click="navitoLogin()"
          ><i>{{ $t("AbpAccount['Login']") }}</i>
          </el-link>
        </p>
        <p class="panel-title">账号信息</p>
        <div class="panel">
          <el-form-item label="账号类型">
            <el-radio-group v-model.trim="registerForm.partnerType">
              <el-radio :label="1">企业</el-radio>
              <el-radio :label="0">个人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="loginName" label="账号">
            <el-input
              v-model.trim="registerForm.loginName"
              name="loginName"
              :placeholder="'账号'"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="phone" label="手机号码">
            <el-input
              v-model.trim="registerForm.phone"
              name="phone"
              :placeholder="'手机号码'"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="verifyCode" label="短信验证码">
            <el-input
              v-model.trim="registerForm.verifyCode"
              name="verifyCode"
              :placeholder="'短信验证码'"
              autocomplete="off"
              style="width: 69%; margin-right: 5px"
            />
            <el-button type="primary" @click="getVerifyCode">获取验证码</el-button>
          </el-form-item>
        </div>
        <p class="panel-title">
          {{ registerForm.partnerType === 1? '企业资质信息': '个人信息' }}
        </p>
        <div class="panel">
          <el-form-item
            prop="name"
            :label="registerForm.partnerType === 1 ? '公司名称' : '名称'"
          >
            <el-input
              v-model.trim="registerForm.name"
              name="name"
              :placeholder="registerForm.partnerType === 1? '公司名称': '名称'"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            prop="address"
            :label="registerForm.partnerType === 1 ? '公司地址' : '地址'"
          >
            <el-input
              v-model.trim="registerForm.address"
              name="address"
              :placeholder="registerForm.partnerType === 1? '公司地址': '地址'"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item
            prop="identityNumber"
            :label="registerForm.partnerType === 1? '统一社会代码': '身份证件号'"
          >
            <el-input
              v-model.trim="registerForm.identityNumber"
              :placeholder="registerForm.partnerType === 1? '统一社会代码': '身份证件号'"
              name="identityNumber"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            prop="identityImage"
            :label="registerForm.partnerType === 1? '统一社会代码图片': '证件图片'"
          >
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
                  (registerForm.partnerType === 0 &&
                    tempImages.length == 2) ||
                  (registerForm.partnerType === 1 &&
                    tempImages.length == 1),
              }"
            >
              <i slot="default" class="el-icon-plus" />
              <div
                v-if="registerForm.partnerType === 0"
                slot="tip"
                class="el-upload__tip"
                style="color: #d9001b"
              >
                个人证件需要提供正反面
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </div>
        <p class="panel-title">联系信息</p>
        <div class="panel">
          <el-form-item prop="contact" label="联系人">
            <el-input
              v-model.trim="registerForm.contact"
              :placeholder="'联系人'"
              name="contact"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input
              v-model.trim="registerForm.email"
              :placeholder="$t('AbpAccount[\'EmailAddress\']')"
              name="password"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="qq" label="QQ">
            <el-input
              v-model.trim="registerForm.qq"
              name="qq"
              placeholder="QQ"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item prop="agree" label="  ">
            <el-checkbox v-model.trim="registerForm.agree">我已同意</el-checkbox>
          </el-form-item>
        </div>
        <div align="center">
          <el-button
            :loading="loading"
            style="width: 100px"
            @click="navitoLogin()"
          >
            取消
          </el-button>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100px"
            @click.native.prevent="handleRegiter"
          >
            {{ $t('AdminService["Register"]') }}
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'
import LangSelect from '@/components/LangSelect'
import rules from '@/utils/rules'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Register',
  components: { LangSelect },
  data() {
    return {
      passwordType: 'password',
      confirmPasswordType: 'password',
      registerForm: {
        partnerType: 0,
        verifyCode: '362321'
      },
      dialogVisible: false,
      dialogImageUrl: '',
      tempImages: [],
      registerRules: {
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
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(this.$i18n.t("AbpAccount['ThisFieldIsRequired.']")))
              }
              if (this.registerForm.partnerType === 1) {
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
        agree: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ]
      },
      loading: false
    }
  },
  computed: {
    currentTenant() {
      return this.$store.getters.abpConfig.currentTenant.name
    }
  },
  mounted() {
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        this.registerForm.ip = response.data.ip
      })
      .catch(error => console.log(error))
  },
  destroyed() { },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showConfirmPwd() {
      if (this.confirmPasswordType === 'password') {
        this.confirmPasswordType = ''
      } else {
        this.confirmPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getVerifyCode() { },
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
            url: res
          })
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.tempImages = this.tempImages.filter(x => x.uid !== file.uid)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    navitoLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    handleRegiter() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if (this.registerForm.partnerType === 0 && this.tempImages.length !== 2) {
            this.$message({
              message: '个人证件需要提供正反面',
              type: 'warning'
            })
            return false
          } else if (this.registerForm.partnerType === 1 && this.tempImages.length !== 1) {
            this.$message({
              message: '请上传统一社会代码图片',
              type: 'warning'
            })
            return false
          }
          this.loading = true
          this.registerForm.identityImage = this.tempImages.map(x => x.url).join('|')
          this.registerForm.verifyId = uuidv4()
          this.registerForm.organizationType = 0 // 0机票代理人 1机票供应商
          register(this.registerForm)
            .then(() => {
              this.$message({
                message: '注册申请成功，请耐心等候，审核通过即可登录账号',
                type: 'warning'
              })
              this.$router.push({
                path: '/login'
              })
              this.loading = false
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
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .register-container .register-form .el-input input {
        color: $bg;
    }

    .demo-form-inline .el-form-item .el-form-item__label {
        flex: 0 0 135px;
    }

    .register-container .register-form {
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
$bg: #2d3a4b;
$dark_gray: #020303;
$light_gray: #eee;

.register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    background: url(../../assets/custom-theme/juzo.png) no-repeat;
    background-size: 100% 100%;

    .register-form {
        position: relative;
        width: 800px;
        padding: 30px 35px;
        margin: 50px auto;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .panel-title {
            color: #fff;
            font-size: 14px;
            padding: 10px;
            background-color: #1890ff;
        }

        .panel {
            max-width: 100%;
            width: 520px;
            margin: 0 auto;
        }

        .explain {
            font-size: 14px;
            padding-right: 15px;
        }
    }

    .el-button--text {
        color: #606266;
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }
    .title-container .el-button--text:hover {
        color: #1890ff;
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $bg;
            margin: 0px auto;
            text-align: center;
            font-weight: bold;
        }
        h5 {
            color: #fff;
            font-size: 16px;
            .el-button {
                font-size: 16px;
            }
        }
        .set-language {
            position: absolute;
            top: 3px;
            font-size: 18px;
            right: 0px;
            cursor: pointer;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        bottom: 6px;
    }

    .el-icon {
        font-size: 18px;
    }
    .image__preview {
        .inline-block {
            display: inline-block;
            margin-right: 5px;
        }
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
