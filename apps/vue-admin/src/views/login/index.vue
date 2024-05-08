<template>
  <div class="login-container">
    <div class="left-container">
      <div class="welcome">欢迎进入</div>
      <div class="title">九州管理系统</div>
    </div>
    <div class="right-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">
            {{ $t('AdminService["Login:Title"]') }}
          </h3>
          <lang-select class="set-language" />
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            :placeholder="
              $t('AbpAccount[\'UserNameOrEmailAddress\']')
            "
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="$t('AbpAccount[\'Password\']')"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="
                  passwordType === 'password'
                    ? 'eye'
                    : 'eye-open'
                "
              />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button
          :loading="loading"
          type="primary"
          size="medium"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
        >
          {{ $t("AbpAccount['Login']") }}
        </el-button>
        <div style="text-align: right">
          <el-button
            v-if="features['AdminService.SocialLogins'] === 'true'"
            class="thirdparty-button"
            type="primary"
            size="small"
            @click="showDialog = true"
          >
            {{ $t("AdminService['Login:ThirdParty']") }}
          </el-button>
        </div>
      </el-form>
    </div>

    <el-dialog
      :title="$t('AbpUiMultiTenancy[\'SwitchTenant\']')"
      :visible.sync="tenantDialogFormVisible"
    >
      <el-form ref="dataForm" :model="tenant" label-position="top">
        <el-form-item :label="$t('AbpUiMultiTenancy[\'Name\']')">
          <el-input v-model="tenant.name" type="text" />
          <span>{{
            $t("AbpUiMultiTenancy['SwitchTenantHint']")
          }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tenantDialogFormVisible = false">
          {{ $t("AbpTenantManagement['Cancel']") }}
        </el-button>
        <el-button
          type="primary"
          :disabled="tenantDisabled"
          @click="saveTenant()"
        >
          {{ $t("AbpTenantManagement['Save']") }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="$t('AdminService[\'Login:ThirdParty\']')"
      :visible.sync="showDialog"
    >
      {{ $t("AdminService['Login:ThirdPartyTips']") }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      tenantDialogFormVisible: false,
      tenant: { name: this.$store.getters.abpConfig.currentTenant.name }
    }
  },
  computed: {
    currentTenant() {
      return this.$store.getters.abpConfig.currentTenant.name
    },
    features() {
      return this.$store.getters.abpConfig.features.values
    },
    tenantDisabled() {
      if (
        this.tenant.name &&
        this.tenant.name === this.$store.getters.abpConfig.currentTenant.name
      ) {
        return true
      }
      return false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              setTimeout(() => {
                // 不刷新页面app/applicationConfiguration总是无法获取到内容
                this.$store.dispatch('app/applicationConfiguration').then((res) => {
                  if (res.currentUser.roles.includes('admin')) {
                    this.$router.push({
                      path: this.redirect || '/',
                      query: this.otherQuery
                    })
                  } else {
                    this.$message.error(`当前账号角色不是管理员，无法登录，请检查账号!`)
                    this.$store.state.app.abpConfig.currentUser.isAuthenticated = false
                    this.$store.dispatch('user/logout')
                    return
                  }
                })
              }, 1000)
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    navitoRegister() {
      this.$router.push({
        path: '/register'
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    saveTenant() {
      this.$store.dispatch('app/setTenant', this.tenant.name).then(response => {
        if (response && !response.success) {
          this.$notify({
            title: this.$i18n.t("AbpUi['Error']"),
            message: this.$i18n.t(
              "AbpUiMultiTenancy['GivenTenantIsNotAvailable']",
              [this.tenant.name]
            ),
            type: 'error',
            duration: 2000
          })
          return
        }

        this.tenantDialogFormVisible = false
      })
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .login-form .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container .login-form {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px #d9dee1 inset !important;
                -webkit-text-fill-color: $light_gray !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #d9dfe2;
$dark_gray: #889aa4;
$light_gray: #006eff;

.login-container {
    min-height: 100%;
    width: 100%;
    height: 100%;
    background-color: $bg;
    overflow: hidden;
    background: url(../../assets/juzo.png) no-repeat;
    // background-size: 100% 100%;
    background-size: 90%; /* 背景图大小为容器的 80% */
    background-position: center; /* 背景图居中显示 */
    display: flex;
    align-items: center;
    justify-content: center;

    .left-container,
    .right-container {
        width: 400px;
        height: 500px;
        border-width: 0px;
    }

    .left-container {
        background-color: rgba(0, 110, 255, 0.513725490196078);
        border: none;
        border-radius: 0px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        text-align: center;
        vertical-align: center;
        line-height: 80px;
        padding-top: 125px;
        color: #ffffff;
        letter-spacing: 0.5em;

        .welcome {
            font-size: 20px;
        }

        .title {
            font-size: 40px;
            font-weight: bold;
        }
    }

    .right-container {
        background-color: rgba(255, 255, 255, 0.93333333);

        .el-button--primary {
            background: #006eff;
            border: #006eff;
        }

        .el-button--primary:hover,
        .el-button--primary:focus {
            background: #46a6ff;
            border-color: #46a6ff;
            color: #ffffff;
        }
    }

    .login-form {
        position: relative;
        width: 100%;
        max-width: 100%;
        padding: 140px 35px 0;
        margin: 0 auto;
        overflow: hidden;

        .explain {
            color: #000;
            font-size: 14px;
            padding-right: 15px;
        }
    }

    .tips {
        font-size: 14px;
        color: #000;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;

        .svg-icon {
            color: #000;
        }
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .set-language {
            color: #000;
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
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
