<template>
  <el-dialog
    width="60%"
    :visible.sync="dialogFormVisible"
    top="5vh"
    :title="
      dialogStatus == 'add'
        ? $t('table.add')
        : $t('table.edit')
    "
  >
    <el-form ref="formRef" class="formRef" label-width="80" :rules="formRules" :model="dto">
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="账号类型"
            prop="partnerType"
            style="margin-bottom: 0"
          >
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
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="所属部门"
            prop="departmentOrganizationId"
            style="margin-bottom: 0"
          >
            <el-select
              ref="selectTree"
              v-model="dto.departmentOrganizationId"
              filterable
              placeholder="请选择..."
              style="width: 75%;"
            >
              <el-option
                :key="dto.departmentOrganizationId"
                :value="dto.departmentOrganizationId"
                :label="dto.departmentOrganizationName"
                style="height: auto"
                hidden
              />
              <el-tree
                ref="tree"
                :data="departments"
                :props="defaultProps"
                :node-key="defaultProps.value"
                default-expand-all
                @node-click="handleClickNode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分销等级" prop="enabled">
            <el-select
              v-model="dto.ticketAgentGroupId"
              clearable
              style="width: 75%;"
            >
              <el-option
                v-for="option in ticketAgentGroupOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="custom-card">
        <div class="card-title">基本信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <table
            class="table-bordered template-table"
            style="width: 100%"
          >
            <tr>
              <td>账号类型</td>
              <td>主账号</td>
              <td>分销名称</td>
              <td>{{ dto.name }}</td>
            </tr>
            <tr>
              <td>手机号码</td>
              <td>
                <el-form-item label="" prop="phone">
                  <el-input
                    v-model.trim="dto.phone"
                    clearable
                    placeholder="手机号码"
                  />
                </el-form-item>
              </td>
              <td>{{ dto.partnerType === 1 ? '统一社会代码' : '证件号码' }}</td>
              <td>
                <el-form-item label="" prop="identityNumber">
                  <el-input
                    v-model.trim="dto.identityNumber"
                    clearable
                    :placeholder="dto.partnerType === 1 ? '统一社会代码' : '证件号码'"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>账号状态</td>
              <td>
                <el-form-item label="" prop="disabled">
                  <el-radio-group v-model="dto.disabled">
                    <el-radio
                      v-for="option in disabledOptions"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{ option.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </td>
              <td>子账户开通权限</td>
              <td>
                <el-form-item label="" prop="canCreateAccount">
                  <el-radio-group v-model="dto.canCreateAccount">
                    <el-radio
                      v-for="option in canCreateAccountOptions"
                      :key="option.value"
                      :label="option.value"
                    >
                      {{ option.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>{{ dto.partnerType === 1 ? '统一社会代码图片' : '证件图片' }}</td>
              <td>
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
                        (dto.partnerType === 0 &&
                          tempImages.length == 2) ||
                        (dto.partnerType === 1 &&
                          tempImages.length == 1),
                    }"
                  >
                    <i slot="default" class="el-icon-plus" />
                    <div
                      v-if="dto.partnerType === 0"
                      slot="tip"
                      class="el-upload__tip"
                      style="color: #d9001b"
                    >
                      个人证件需要提供正反面
                    </div>
                  </el-upload>
                  <el-dialog :modal="false" :visible="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-form-item>
              </td>
              <td>Logo</td>
              <td>
                <el-form-item label="" prop="logo">
                  <el-upload
                    action=""
                    accept=".jpg, .png"
                    list-type="picture-card"
                    :limit="1"
                    :auto-upload="false"
                    :on-remove="handleRemoveLogo"
                    :on-change="getFileLogo"
                    :file-list="tempLogo"
                    :class="{'hidden-card': tempLogo.length == 1}"
                  >
                    <i slot="default" class="el-icon-plus" />
                  </el-upload>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>描述</td>
              <td colspan="3">
                <el-form-item label="" prop="description">
                  <el-input
                    v-model.trim="dto.description"
                    name="description"
                    type="textarea"
                    clearable
                    placeholder="描述"
                  />
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">联系信息</div>
        <div class="card-box" style="padding: 15px 10px">
          <table
            class="table-bordered template-table"
            style="width: 100%"
          >
            <tr>
              <td>联系人</td>
              <td>
                <el-form-item label="" prop="contact">
                  <el-input
                    v-model.trim="dto.contact"
                    clearable
                    placeholder="联系人"
                  />
                </el-form-item>
              </td>
              <td>邮箱</td>
              <td>
                <el-form-item label="" prop="email">
                  <el-input
                    v-model.trim="dto.email"
                    clearable
                    placeholder="邮箱"
                  />
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>QQ</td>
              <td>
                <el-form-item label="" prop="qq">
                  <el-input
                    v-model.trim="dto.qq"
                    clearable
                    placeholder="QQ"
                  />
                </el-form-item>
              </td>
              <td>地址</td>
              <td>
                <el-form-item label="" prop="address">
                  <el-input
                    v-model.trim="dto.address"
                    clearable
                    placeholder="联系电话"
                  />
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        v-loading.fullscreen.lock="fullScreenLoading"
        type="primary"
        @click="dialogStatus === 'add' ? createData() : updateData()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Enum from '@/enum/enum'
import JuzoPartnerTypeEnum from '@/enum/JuzoPartnerType'
import { updateTicketAgent } from '@/api/distribution/agent'
import rules from '@/utils/rules'
import { getDepartments } from '@/api/identity/departmentOrganizationUnit'
import { ticketAgentGroupList } from '@/api/distribution/agent-group'

export default {
  name: 'AccountCreateUpdate',
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      partnerTypeOptions: [],
      ticketAgentGroupOptions: [],
      canCreateAccountOptions: [
        {
          value: true,
          label: '开启'
        },
        {
          value: false,
          label: '关闭'
        }
      ],
      disabledOptions: [],
      departments: [],
      defaultProps: {
        value: 'id',
        /** 标签显示 **/
        label: 'displayName',
        /** 子级 **/
        children: 'children'
      },
      fullScreenLoading: false,
      dto: {},
      tempImages: [],
      dialogImageUrl: '',
      dialogVisible: false,
      tempLogo: [],
      formRules: {
        departmentOrganizationId: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
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
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.partnerTypeOptions = Object.keys(JuzoPartnerTypeEnum.JuzoPartnerType).map(key => ({
      value: JuzoPartnerTypeEnum.JuzoPartnerType[key],
      label: this.$t(`AdminService["Enum:JuzoPartnerType:${JuzoPartnerTypeEnum.JuzoPartnerType[key]}"]`)
    }))
    this.accountTypeOptions = Enum.accountTypeOptions
    this.disabledOptions = Enum.enDisableOptions
    this.getDepartmentData()
    this.getTicketAgentGroups()
  },
  mounted() {
  },
  methods: {
    // 调api获取接口分组数据
    getDepartmentData() {
      getDepartments()
        .then(response => {
          this.departments = response.items
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTicketAgentGroups() {
      ticketAgentGroupList({
        page: 1,
        limit: 1000,
        sort: ''
      }).then((response) => {
        if (response) {
          response.items.forEach(element => {
            this.ticketAgentGroupOptions.push({
              value: element.id,
              label: element.name
            })
          })
        }
      })
    },
    handleClickNode(data) {
      this.$set(this.dto, 'departmentOrganizationId', data.id)
      this.$set(this.dto, 'departmentOrganizationName', data.displayName)
      // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
      this.$refs.selectTree.blur()
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
    //  logo
    getFileLogo(file) {
      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.tempLogo.push({
            url: res
          })
        }
      })
    },
    //  移除logo
    handleRemoveLogo(file) {
      this.tempLogo = []
    },
    resetFlied() {
      this.dto = {
        partnerType: 0,
        canCreateAccount: false,
        disabled: false,
        logo: '',
        description: '',
        departmentOrganizationId: '',
        departmentOrganizationName: ''
      }
      this.tempImages = []
      this.dialogImageUrl = ''
      this.tempLogo = []
    },
    handleCreate() {
      this.resetFlied()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      // this.$refs['formRef'].validate(valid => {
      //   if (valid) {
      //     console.log(this.dto)
      //     save(this.dto).then(response => {
      //       if (response) {
      //         this.$emit('handleFilter', true)
      //         this.dialogFormVisible = false
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
    handleUpdate(row) {
      this.resetFlied()
      this.dto = Object.assign({}, row)
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      const tempImages = this.dto.identityImage.split('|')
      tempImages.forEach(element => {
      this.tempImages.push({
          url: element
        })
      })
      this.dto.identityImage = this.tempImages
      this.tempLogo.push({
        url: this.dto.logo ? this.dto.logo : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      })
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          if (this.dto.partnerType === 0 && this.tempImages.length !== 2) {
            this.$message({
              message: '个人证件需要提供正反面',
              type: 'warning'
            })
            return false
          } else if (this.dto.partnerType === 1 && this.tempImages.length !== 1) {
            this.$message({
              message: '请上传统一社会代码图片',
              type: 'warning'
            })
            return false
          }
          this.dto.identityImage = this.tempImages.map(x => x.url).join('|')
          if (this.tempLogo.length === 1) {
            this.dto.logo = this.tempLogo[0].url
          }
          this.fullscreenLoading = true
          updateTicketAgent(this.dto).then(response => {
            this.$emit('handleFilter', true)
            this.dialogFormVisible = false
            if (response) {
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

<style lang="scss">
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {

    .formRef {
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
.el-form-item {
    margin-bottom: 0;
}
</style>
