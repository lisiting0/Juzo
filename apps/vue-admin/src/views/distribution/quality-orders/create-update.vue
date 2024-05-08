<template>
  <el-dialog
    width="50%"
    top="5vh"
    :center="true"
    :visible.sync="dialogFormVisible"
    :before-close="handleClose"
    :title="dialogStatus == 'add' ? '' : ''"
  >
    <el-form
      ref="formRef"
      :model="dto"
      :rules="formRules"
      class="demo-form-inline form-inline-label-115"
      autocomplete="on"
      label-position="right"
    >
      <div class="custom-card">
        <div class="card-title">质检订单创建</div>
        <div class="card-box padding-2">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="tempAgentId" label="客户名称">
                <el-select
                  v-model="dto.tempAgentId"
                  filterable
                  placeholder="请选择"
                  @change="changeAgent($event)"
                >
                  <el-option
                    v-for="item in agentList"
                    :key="item.id"
                    :label="item.name"
                    :value="
                      item.id +
                        '|' +
                        item.name +
                        '|' +
                        item.organizationId +
                        '|' +
                        item.departmentOrganizationId +
                        '|' +
                        item.departmentOrganizationName
                    "
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="agentAccount" label="客户账号">
                <el-select
                  v-model="dto.agentAccount"
                  filterable
                  placeholder="请选择"
                  @change="$forceUpdate()"
                >
                  <el-option
                    v-for="item in agentAccountList"
                    :key="item.id"
                    :label="item.loginName"
                    :value="item.loginName"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="业务类型"
                prop="orderBusinessType"
              >
                <el-select
                  v-model="dto.orderBusinessType"
                  clearable
                >
                  <el-option
                    v-for="option in orderBusinessTypeOptions"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="originOrderNo"
                label="关联订单号"
              >
                <el-input
                  v-model.trim="dto.originOrderNo"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="qualityCheckType"
                label="结算类型"
              >
                <el-radio-group v-model="dto.qualityCheckType">
                  <el-radio
                    v-for="option in qualityCheckTypeOptions"
                    :key="option.value"
                    :label="option.value"
                  >
                    {{ option.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="amount" label="质检金额">
                <el-input
                  v-model.number="dto.amount"
                  clearable
                  class="input-red-text"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="remark" label="质检理由描述">
                <el-input
                  v-model.trim="dto.remark"
                  type="textarea"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="appendixList" label="附件">
                <el-upload
                  ref="upload"
                  action=""
                  accept=".jpg, .png"
                  list-type="picture-card"
                  :limit="2"
                  :file-list="tempImages"
                  :auto-upload="false"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-change="getFile"
                >
                  <i slot="default" class="el-icon-plus" />
                </el-upload>
                <el-dialog
                  :modal="false"
                  :visible.sync="dialogVisible"
                  style="z-index: 20"
                >
                  <img
                    width="100%"
                    :src="previewImage"
                    alt=""
                  >
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :loading="loading"
        @click="dialogStatus === 'add' ? createData() : updateData()"
      >
        保存
      </el-button>
      <el-button @click="dialogFormVisible = false"> 取消 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import OrderBusinessTypeEnum from '@/enum/OrderBusinessType'
import QualityCheckTypeEnum from '@/enum/QualityCheckType'
import { ticketAgentList } from '@/api/distribution/agent'
import { qualityOrderCreate, qualityOrderUpdate } from '@/api/agent/quality-orders'

export default {
  name: 'QualityOrdersCreateUpdate',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      allAgentList: [],
      agentList: [],
      agentAccountList: [],
      orderBusinessTypeOptions: [],
      qualityCheckTypeOptions: [],
      dto: {
        qualityCheckType: 0,
        qualityOrderOrigin: 1
      },
      dialogVisible: false,
      tempImages: [],
      previewImage: '',
      loading: false,
      formRules: {
        tempAgentId: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        agentAccount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        originOrderNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        orderBusinessType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        qualityCheckType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        amount: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.tempImages = []
    this.getTicketAgentList()
  },
  mounted() {
    this.orderBusinessTypeOptions = Object.keys(OrderBusinessTypeEnum.OrderBusinessType).map(key => ({
      value: OrderBusinessTypeEnum.OrderBusinessType[key],
      label: key
    }))
    this.qualityCheckTypeOptions = Object.keys(QualityCheckTypeEnum.QualityCheckType).map(key => ({
      value: QualityCheckTypeEnum.QualityCheckType[key],
      label: key
    }))
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    getTicketAgentList() {
      ticketAgentList({
        page: 1,
        limit: 1000
      }).then((response) => {
        if (response) {
          this.allAgentList = response.items
          this.agentList = response.items
          this.agentAccountList = response.items
        }
      })
    },
    changeAgent(value) {
      // :value="item.id + '|' + item.name + '|' + item.organizationId + '|' + item.departmentOrganizationId + '|' + item.departmentOrganizationName"
      const agentInfo = value.split('|')
      this.dto.agentId = agentInfo[0]
      this.dto.agentName = agentInfo[1]
      this.dto.agentOrganizationId = agentInfo[2]
      this.dto.agentOrganizationName = agentInfo[1]
      this.dto.agentDepartmentId = agentInfo[3]
      this.dto.agentDepartmentName = agentInfo[4]
      setTimeout(() => {
        this.agentAccountList = this.allAgentList.filter(x => x.departmentOrganizationId === agentInfo[3])
        console.log(this.agentAccountList)
        this.$set(this.dto, 'agentAccount', '')
      }, 500)
    },
    resetFlied() {
      this.dto = {
        qualityCheckType: 0,
        qualityOrderOrigin: 1
      }
      this.tempImages = []
      this.previewImage = ''
    },
    add() {
      this.resetFlied()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
        this.$refs.upload.clearFiles()
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
      this.previewImage = file.url
      this.dialogVisible = true
    },
    createData() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.loading = true
          this.dto.appendixList = this.tempImages.map(x => x.url)
          qualityOrderCreate(this.dto).then(res => {
            this.$refs.upload.clearFiles()
            this.$emit('handleFilter', true)
            this.dialogFormVisible = false
            this.loading = false
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
    },
    edit(detail) {
      this.resetFlied()
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.dto = Object.assign({}, detail)
      this.$nextTick(() => {
        setTimeout(() => {
          const agent = this.allAgentList.filter(x => x.id === this.dto.agentId)[0]
          this.$set(this.dto, 'tempAgentId', agent.id + '|' + agent.name + '|' + agent.organizationId + '|' + agent.departmentOrganizationId + '|' + agent.departmentOrganizationName)
          this.agentAccountList = this.allAgentList.filter(x => x.departmentOrganizationId === agent.departmentOrganizationId)
        }, 1000)
        if (this.dto.appendixList.length > 0) {
          this.dto.appendixList.forEach(element => {
            if (element && element != null) {
              this.tempImages.push({
                url: element
              })
            }
          })
          this.dto.appendixList = this.tempImages
        }
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.loading = true
          this.dto.appendixList = this.tempImages.map(x => x.url)
          qualityOrderUpdate(this.dto).then(res => {
            this.$refs.upload.clearFiles()
            this.$emit('handleFilter', true)
            this.dialogFormVisible = false
            this.loading = false
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
    .quality-order-form {
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

.input-red-text {
    input {
        color: red;
    }
}
</style>

<style lang="scss" scoped>
.el-dialog--center .el-dialog__body {
    padding-bottom: 5px;
}
</style>
