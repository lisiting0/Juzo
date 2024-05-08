
// 电话
const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
// 必须为数字
const numberReg = /^\d+$|^\d+[.]?\d+$/
// 密码
const passwordReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/
// 联系人
const contactsReg = /^[\u0391-\uFFE5A-Za-z]+$/
// 邮箱
const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
// 证件号码
const regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
// 整数
const IntegerRegex = /(^-?[1-9]\d*)|(0{1})$/
// 正整数
// const IntegerPlusRegex = /^[+]{0,1}(\d+)$/
// QQ
const qqRegex = /^[1-9][0-9]{4,10}$/
// 只能输入字母或数字
const loginNameRegex = /^[A-Za-z0-9]+$/
// 密码至少包含一位非字母数字字符., 密码至少包含一位大写字母 (A-Z)
const psdReg = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/

const FormValidate = (function() {
  function FormValidate() { }
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function() {
    return {
      // 只能数字的验证
      validateNumber(rule, value, callback) {
        if (value !== '') {
          if (!numberReg.test(value)) {
            callback(new Error('必须为数字'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 密码的验证
      validatePsdReg(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入密码'))
        }
        if (!passwordReg.test(value)) {
          callback(new Error('请输入6-20位英文字母、数字或者符号，且字母、数字和标点符号至少包含两种'))
        } else {
          callback()
        }
      },

      // 联系人
      validateContacts(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入联系人'))
        }
        if (!contactsReg.test(value)) {
          callback(new Error('联系人不可输入特殊字符'))
        } else {
          callback()
        }
      },

      // 邮箱的验证规则
      validateEmail(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入邮箱'))
        }
        if (!emailReg.test(value)) {
          callback(new Error('邮箱格式不正确'))
        } else {
          callback()
        }
      },

      // 电话号码的验证
      validatePhone(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入手机号码'))
        }
        if (!phoneReg.test(value)) {
          callback(new Error('手机格式不正确'))
        } else {
          callback()
        }
      },

      // 身份证的验证规则
      validateCardNo(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入身份证'))
        }
        if (!regId.test(value)) {
          callback(new Error('请输入正确的二代身份证号码'))
        } else {
          callback()
        }
      },

      // 统一信用代码校验
      validateUnifiedSocialCreditCode(rule, value, callback) {
        if (!value) {
          return callback(new Error('统一社会信用代码不能为空'))
        }
        const pattern = /^[0-9A-Z]{18}$/
        if (!pattern.test(value)) {
          callback(new Error('统一社会信用代码由18位字符组成的编码'))
        } else {
          callback()
        }
      },

      // 整数校验
      validateInteger(rule, value, callback) {
        if (!value) {
          return callback(new Error('不能为空'))
        }
        if (!IntegerRegex.test(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      },

      // 整数校验
      validateCanNullInteger(rule, value, callback) {
        if (!value) {
          if (!IntegerRegex.test(value)) {
            callback(new Error('请输入数字值'))
          } else {
            callback()
          }
        }
      },

      // qq的验证规则
      validateQQ(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入QQ号'))
        }
        if (!qqRegex.test(value)) {
          callback(new Error('QQ号格式不正确'))
        } else {
          callback()
        }
      },

      // 账号校验规则
      validateLoginName(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入账号'))
        }
        if (!loginNameRegex.test(value)) {
          callback(new Error('格式不正确，仅支持英文和数字'))
        } else {
          callback()
        }
      },

      // 可空的密码的验证
      validateCanNullPassword(rule, value, callback) {
        if (value && !psdReg.test(value)) {
          callback(new Error('密码至少包含一位非字母数字字符., 密码至少包含一位大写字母 (A-Z).'))
        } else {
          callback()
        }
      },

      // 验证票号
      validateTicketNo(rule, value, callback) {
        if (!value) {
          return callback(new Error('字段不可为空.'))
        }
        const reg1 = /^\d{3}-\d{10}$/
        const reg2 = /^\d{3}-\d{10}\+\d{3}-\d{10}$/
        const reg3 = /^\d{13}$/
        const reg4 = /^\d{13}\+\d{13}$/
        const reg1Test = reg1.test(value)
        const reg2Test = reg2.test(value)
        const reg3Test = reg3.test(value)
        const reg4Test = reg4.test(value)
        if (reg1Test || reg2Test || reg3Test || reg4Test) {
          callback()
        } else {
          return callback(new Error('请填写正确的票号'))
        }
      }
    }
  }

  return FormValidate
}())

exports.FormValidate = FormValidate
