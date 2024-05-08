<template>
  <el-dialog
    width="50%"
    top="5vh"
    :center="true"
    :visible.sync="dialogFormVisible"
    :title="dialogStatus == 'detail' ? '分销商注册申请' : '分销商注册审核'"
  >
    <div style="font-weight: bold">
      审核状态：<el-link :underline="false" type="danger">{{ $t("AdminService['Enum:JuzoRegistrationApprovalStatusType:" +detailInfo.status +"']") }}</el-link>
    </div>
    <div class="custom-card">
      <div class="card-title">账号信息</div>
      <div class="card-box padding-2">
        <div align="center">
          <div class="card-item">
            <label class="card-item-title">账号类型</label>
            <div class="card-item-content">
              <el-radio-group v-model="detailInfo.partnerType">
                <el-radio
                  v-for="option in partnerTypeOptions"
                  :key="option.value"
                  :label="option.value"
                  disabled
                >
                  {{ option.label }}
                </el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="card-item">
            <label class="card-item-title">账号</label>
            <div class="card-item-content">
              {{ detailInfo.loginName }}
            </div>
          </div>
          <!-- <div>
                        <div class="card-item">
                            <label class="card-item-title">密码</label>
                            <div class="card-item-content">
                                {{ detailInfo.password }}
                            </div>
                        </div>
                    </div> -->
          <div>
            <div class="card-item">
              <label class="card-item-title">手机号码</label>
              <div class="card-item-content">
                {{ detailInfo.phone }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="custom-card">
      <div class="card-title">
        {{ detailInfo.partnerType === 1 ? '企业资质信息' : '个人信息' }}
      </div>
      <div class="card-box padding-2">
        <div align="center">
          <div class="card-item">
            <label class="card-item-title">{{ detailInfo.partnerType === 1 ? '公司名称' : '名称' }}</label>
            <div class="card-item-content">
              {{ detailInfo.name }}
            </div>
          </div>
          <div class="card-item">
            <label class="card-item-title">{{ detailInfo.partnerType === 1 ? '公司地址' : '地址' }}</label>
            <div class="card-item-content">
              {{ detailInfo.address }}
            </div>
          </div>
          <div class="card-item">
            <label class="card-item-title">{{ detailInfo.partnerType === 1 ? '统一社会代码' : '身份证号码' }}</label>
            <div class="card-item-content">
              {{ detailInfo.identityNumber }}
            </div>
          </div>
          <div class="card-item">
            <label class="card-item-title">{{ detailInfo.partnerType === 1 ? '统一社会代码图片' : '证件照' }}</label>
            <div class="card-item-content">
              <div class="image__preview">
                <div
                  v-for="(img, imgIndex) in identityImage"
                  :key="'img' + imgIndex"
                  class="inline-block"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="img"
                    :preview-src-list="previewList"
                  />
                </div>
              </div>
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
              {{ detailInfo.contact }}
            </div>
          </div>
          <div class="card-item">
            <label class="card-item-title">邮箱</label>
            <div class="card-item-content">
              {{ detailInfo.email }}
            </div>
          </div>
          <div class="card-item">
            <label class="card-item-title">QQ</label>
            <div class="card-item-content">
              {{ detailInfo.qq }}
            </div>
          </div>
          <div v-if="dialogStatus !== 'detail'" class="card-item">
            <label class="card-item-title">所属部门</label>
            <div class="card-item-content">
              <el-form>
                <el-form-item
                  label=""
                  prop="departmentOrganizationId"
                  style="margin-bottom: 0"
                >
                  <el-select
                    ref="selectTree"
                    v-model="detailInfo.departmentOrganizationId"
                    filterable
                    placeholder="请选择..."
                  >
                    <el-option
                      :key="detailInfo.departmentOrganizationId"
                      :value="detailInfo.departmentOrganizationId"
                      :label="detailInfo.departmentOrganizationName"
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
              </el-form>
            </div>
          </div>
          <div v-if="dialogStatus !== 'detail'" class="card-item">
            <label class="card-item-title">分销等级</label>
            <div class="card-item-content">
              <el-form>
                <el-form-item
                  label=""
                  prop="ticketAgentGroupId"
                  style="margin-bottom: 0"
                >
                  <el-select
                    v-model="detailInfo.ticketAgentGroupId"
                    clearable
                  >
                    <el-option
                      v-for="option in ticketAgentGroupOptions"
                      :key="option.value"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="card-item">
            <label class="card-item-title">审核备注</label>
            <div class="card-item-content">
              <el-form>
                <el-form-item
                  label=""
                  prop="remark"
                  style="margin-bottom: 0"
                >
                  <el-input
                    v-model="detailInfo.remark"
                    type="textarea"
                    clearable
                    placeholder="备注"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dialogStatus === 'detail' && detailInfo.status !== 0"
      class="custom-card"
    >
      <div class="card-title">审核信息</div>
      <div class="card-box padding-2">
        <div align="center">
          <div class="card-item">
            <label class="card-item-title">审核人</label>
            <div class="card-item-content">
              {{ detailInfo.approverName }}
            </div>
          </div>
          <div class="card-item">
            <label class="card-item-title">审核时间</label>
            <div class="card-item-content">
              {{ moment(detailInfo.approveTime, 'YYYY-MM-DD hh:mm:ss') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <template v-if="dialogStatus == 'handle'">
        <el-button
          type="danger"
          :loading="loading"
          :disabled="loading"
          @click="onHandle(false)"
        >
          审核失败
        </el-button>
        <el-button
          type="primary"
          :loading="loading"
          :disabled="loading"
          @click="onHandle(true)"
        >
          审核通过
        </el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import JuzoPartnerTypeEnum from '@/enum/JuzoPartnerType'
import { approve } from '@/api/distribution/audit'
import { getDepartments } from '@/api/identity/departmentOrganizationUnit'
import { ticketAgentGroupList } from '@/api/distribution/agent-group'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  name: 'RegistrationAuditDetail',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      ticketAgentGroupOptions: [],
      partnerTypeOptions: [],
      departments: [],
      defaultProps: {
        value: 'id',
        /** 标签显示 **/
        label: 'displayName',
        /** 子级 **/
        children: 'children'
      },
      detailInfo: {
        departmentOrganizationId: '',
        departmentOrganizationName: '',
        remark: ''
      },
      identityImage: [],
      previewList: [],
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.partnerTypeOptions = Object.keys(JuzoPartnerTypeEnum.JuzoPartnerType).map(key => ({
      value: JuzoPartnerTypeEnum.JuzoPartnerType[key],
      label: this.$t(`AdminService["Enum:JuzoPartnerType:${JuzoPartnerTypeEnum.JuzoPartnerType[key]}"]`)
    }))
    this.getDepartmentData()
    this.getTicketAgentGroups()
  },
  mounted() {
  },
  methods: {
    moment(filed, format) {
      return moment(filed).format(format)
    },
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
      this.$set(this.detailInfo, 'departmentOrganizationId', data.id)
      this.$set(this.detailInfo, 'departmentOrganizationName', data.displayName)
      // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
      this.$refs.selectTree.blur()
    },
    resetFlied() {
      this.detailInfo = {
        departmentOrganizationId: '',
        displayName: '',
        remark: ''
      }
      this.identityImage = []
    },
    handle(row, status) {
      this.resetFlied()
      this.dialogStatus = status
      this.dialogFormVisible = true
      this.detailInfo = Object.assign({}, row)
      if (this.detailInfo.partnerType === 0) {
        this.identityImage = this.detailInfo.identityImage.split('|')
      } else {
        this.identityImage.push(this.detailInfo.identityImage)
      }
      this.previewList = this.identityImage
    },
    onHandle(isApproved) {
      if (!this.detailInfo.departmentOrganizationId) {
        this.$message.error('请选择所属部门')
        return
      }
      if (!this.detailInfo.remark) {
        this.$message.error('请填写审核备注')
        return
      }
      this.loading = true
      approve(this.detailInfo.id, { isApproved: isApproved, remark: this.detailInfo.remark, departmentOrganizationId: this.detailInfo.departmentOrganizationId, ticketAgentGroupId: this.detailInfo.ticketAgentGroupId }).then(response => {
        this.$emit('handleFilter', true)
        this.dialogFormVisible = false
        if (response) {
          if (isApproved) {
            this.$confirm(`用户名：<span class='danger-weight-text'>${response.partnerName}</span><br/>账号：<span class='danger-weight-text'>${response.primaryUserName}</span><br/>密码：<span class='danger-weight-text'>${response.primaryUserPassword}</span>`, '请通知申请人注册的账号密码', {
              dangerouslyUseHTMLString: true,
              type: 'warning',
              showCancelButton: false,
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              confirmButtonText: '关闭'
            })
              .then(() => {
                return new Promise(resolve => {
                  this.$notify({
                    dangerouslyUseHTMLString: true,
                    title: '账号密码获取成功',
                    message: `用户名：<span class='danger-weight-text'>${response.partnerName}</span><br/>账号：<span class='danger-weight-text'>${response.primaryUserName}</span><br/>密码：<span class='danger-weight-text'>${response.primaryUserPassword}</span>`,
                    type: 'success',
                    duration: 10000
                  })
                  // 延迟一段时间后再关闭窗口
                  setTimeout(() => {
                    resolve()
                  }, 2000)
                })
              })
              .catch(() => {
              })
          }
          this.loading = false
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-card .card-box .card-item .card-item-title {
    flex: 0 0 130px;
}
.card-item {
    width: 60%;
}
.image__preview {
    .inline-block {
        display: inline-block;
        margin-right: 5px;
    }
}
</style>
