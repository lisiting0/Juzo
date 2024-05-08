<template>
  <div class="app-container">
    <el-form
      ref="formRef"
      :model="dto"
      :rules="formRules"
      :inline="true"
      class="demo-form-inline"
    >
      <div class="custom-card">
        <div class="card-title">自定义短信</div>
        <div class="card-box" style="padding: 15px 10px">
          <table
            class="table-bordered first-td-bg"
            style="width: 100%"
          >
            <tr>
              <td>短信内容</td>
              <td>
                <div class="content">
                  <el-input
                    v-model="smsContent"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入短信内容"
                    class="textarea-success-bg"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>接收手机号</td>
              <td>
                <div class="content">
                  <el-input
                    v-model="recevicePhone"
                    type="textarea"
                    :rows="2"
                    placeholder="支持输入多个手机号，用逗号隔开"
                    class="textarea-success-bg"
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <el-form-item align="center">
        <el-button
          size="small"
          type="primary"
          @click="submitForm('formRef')"
        >确认发送
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'SMS',
  components: {},
  data() {
    return {
      dto: {
        smsContent: '',
        recevicePhone: ''
      },
      formRules: {
        smsContent: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        recevicePhone: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// table tr td {
//     &:first-child {
//         font-size: 14px;
//         color: #606266;
//         text-align: center;
//     }
//     &:last-child {
//         padding: 10px;
//     }
//     .title {
//         margin-bottom: 10px;
//     }
//     .content {
//         margin-bottom: 10px;
//         &:last-child {
//             margin-bottom: 0;
//         }
//     }
// }
</style>
