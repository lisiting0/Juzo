<template>
    <div>
        <div
            :class="[
                'el-input',
                'el-input--suffix',
                prefixIconName != '' ? 'el-input--prefix' : '',
            ]"
        >
            <!-- 判断account是否为admin，是为了给开发留个后门，方便使用浏览器记住密码哈哈 -->
            <!-- 禁止复制、粘贴、剪切 -->
            <input
                :type="account == 'admin' ? 'password' : 'text'"
                autocomplete="off"
                :id="inputId"
                v-model="secretPwd"
                @input="inputPassword"
                @copy.prevent="() => {}"
                @paste.prevent="() => {}"
                @cut.prevent="() => {}"
                :placeholder="placeholder"
                :maxlength="maxLength"
                class="el-input__inner"
                :style="{ 'padding-right': clearPwd != '' ? '56px' : '30px' }"
            />
            <span v-show="prefixIconName != ''" class="el-input__prefix"><i :class="prefixIconName"></i></span>
            <span class="el-input__suffix">
                <span class="el-input__suffix-inner">
                    <i
                        v-show="secretPwd !== ''"
                        @click="inputPassword({ target: { value: '' } })"
                        class="el-input__icon el-icon-circle-close"
                        style="cursor: pointer; vertical-align: middle"
                    ></i>
                    <svg-icon
                        v-if="showPwd"
                        @click="handleShowPwd"
                        iconClass="明文"
                        class="el-input__icon el-icon-view"
                        style="
                            cursor: pointer;
                            height: 32px;
                            font-size: 12px;
                            color: #c0c4cc;
                            vertical-align: middle;
                            margin-right: 6px;
                        "
                    />
                    <svg-icon
                        v-else
                        @click="handleShowPwd"
                        iconClass="暗文"
                        class="el-input__icon el-icon-view"
                        style="
                            cursor: pointer;
                            height: 32px;
                            font-size: 12px;
                            color: #c0c4cc;
                            vertical-align: middle;
                            margin-right: 6px;
                        "
                    /> </span
            ></span>
        </div>
        <div v-show="errorPwd" class="el-form-item__error">密码不能为空</div>
    </div>
</template>
<script>
/**
 * 手写密码，不支持右键菜单、复制、黏贴、剪切
 */
export default {
  name: 'HandPassword',
  props: {
    // 输入框的id
    inputId: {
      type: String,
      default: 'passwordInput'
    },
    // 后门：用户名称，方便开发使用浏览器记住密码
    account: {
      type: String,
      default: ''
    },
    // 需要使用子组件的校验，一般不使用
    needValidatePwd: {
      type: Boolean,
      default: false
    },
    // 输入框的暗注释
    placeholder: {
      type: String,
      default: '请输入密码'
    },
    // 输入框的最大输入长度
    maxLength: {
      type: Number,
      default: 100
    },
    // 输入框头部图标类名
    prefixIconName: {
      type: String,
      default: ''
    },
    // 初始化密码值，一般用于编辑表单
    originPwd: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 暗文密码
      secretPwd: '',
      // 明文密码
      clearPwd: '',
      // 是否显示明文
      showPwd: false,
      // 是否密码错误
      errorPwd: false
    }
  },
  watch: {
    /**
     * 监听初始化密码，将明文和暗文密码分别初始化
     */
    originPwd: {
      handler(val) {
        this.clearPwd = val
        this.secretPwd = '●'.repeat(val.length)
      },
      immediate: true
    }
  },
  created() {
    /**
     * 禁止浏览器右键，因为右键菜单里有撤销、重写、黏贴、复制
     */
    window.oncontextmenu = function(e) {
      e.preventDefault()
    }
  },
  methods: {
    /**
     * 重置方法，一般是给父组件调用
     */
    reset() {
      this.showPwd = false
      this.errorPwd = false
    },
    /**
     * 检查密码
     */
    checkPassword() {
      if (this.needValidatePwd) {
        if (this.clearPwd === '') {
          this.errorPwd = true
        } else {
          this.errorPwd = false
        }
      }
    },
    /**
     * 点击密码框后的小眼睛，切换明文或暗文
     */
    handleShowPwd() {
      if (this.showPwd) {
        this.secretPwd = '●'.repeat(this.secretPwd.length)
      } else {
        this.secretPwd = JSON.parse(JSON.stringify(this.clearPwd))
      }
      this.showPwd = !this.showPwd
    },
    /**
     * 输入密码
     */
    inputPassword(val) {
      // 原生input需要取target.value
      const inputVal = val.target.value

      // 如果明文展示或者只输入了一个字符，比较简单，直接复制
      if (this.showPwd || inputVal.indexOf('●') === -1) {
        if (this.showPwd) {
          this.secretPwd = inputVal
        } else {
          this.secretPwd = '●'.repeat(inputVal.length)
        }
        this.clearPwd = inputVal
      } else {
        // 明文长度
        const planeTextLen = this.clearPwd.length
        // 暗文长度
        const cipherTextLen = inputVal.length
        // 获取光标位置
        const selectionEnd = document.getElementById(this.inputId).selectionEnd
        // 真实密码数组
        const realArr = this.clearPwd.split('')
        // 文本框显示密码数组
        const coverArr = inputVal.split('')
        // 新输入的字符位置
        let index = -1
        // 新输入的字符
        let lastChar = ''
        // 找到新输入的字符及位置
        coverArr.forEach((el, idx) => {
          if (/[^●]/g.test(el)) {
            index = idx
            lastChar += el
          }
        })

        if (planeTextLen < cipherTextLen) {
          // 新增
          realArr.splice(index, 0, lastChar)
        } else if (cipherTextLen <= planeTextLen && index !== -1) {
          // 替换
          realArr.splice(index, planeTextLen - (cipherTextLen - 1), lastChar)
        } else {
          // 删除
          realArr.splice(selectionEnd, planeTextLen - cipherTextLen)
        }
        this.clearPwd = realArr.join('')
        this.secretPwd = '●'.repeat(this.secretPwd.length)
        // 还原光标位置
        this.$nextTick(() => {
          document.getElementById(this.inputId).selectionEnd = selectionEnd
        })
      }
      this.checkPassword()
      // 告知父组件明文密码
      this.$emit('inputPwd', this.clearPwd)
    }
  }
}
</script>
