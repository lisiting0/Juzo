<template>
  <el-dialog width="50%" :visible.sync="dialogFormVisible" title="">
    <el-form
      ref="formRef"
      :model="detail"
      :rules="rules"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <div class="form-container-cell">
        <div class="header">
          {{
            dialogStatus == 'create'
              ? this.$t('table.add')
              : this.$t('table.edit')
          }}
        </div>
        <div class="form-item-row">
          <div class="form-item-cell">乘机人</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="lastName">
              <el-input v-model="detail.lastName" clearable />
            </el-form-item>
          </div>
          <div class="form-item-cell">旅客类型</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="frequentFlyerType">
              <el-select
                v-model="detail.frequentFlyerType"
                clearable
                placeholder="旅客类型"
              >
                <el-option
                  v-for="env in passengerTypeOptions"
                  :key="env.value"
                  :value="env.value"
                  :label="env.label"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form-item-row">
          <div class="form-item-cell">性别</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="gender" style="width: 100%">
              <el-radio-group v-model="detail.gender">
                <el-radio
                  v-for="option in genderTypeOptions"
                  :key="option.value"
                  :label="option.value"
                >
                  {{ option.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="form-item-cell">证件类型</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="cardType">
              <el-select
                v-model="detail.cardType"
                clearable
                placeholder="证件类型"
              >
                <el-option
                  v-for="env in identityCardTypeOptions"
                  :key="env.value"
                  :value="env.value"
                  :label="env.label"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form-item-row">
          <div class="form-item-cell">证件号</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="cardNum">
              <el-input v-model="detail.cardNum" clearable />
            </el-form-item>
          </div>
          <div class="form-item-cell">出生日期</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="birthday">
              <el-date-picker
                v-model="detail.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择出生日期"
              />
            </el-form-item>
          </div>
        </div>
        <div class="form-item-row">
          <div class="form-item-cell">国籍</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="nationality">
              <el-input
                v-model="detail.nationality"
                clearable
                maxlength="10"
                show-word-limit
              />
            </el-form-item>
          </div>
          <div class="form-item-cell">证件签发地</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="cardIssuePlace">
              <el-input
                v-model="detail.cardIssuePlace"
                clearable
                maxlength="10"
                show-word-limit
              />
            </el-form-item>
          </div>
        </div>
        <div class="form-item-row">
          <div class="form-item-cell">手机号</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="phone">
              <el-input v-model="detail.phone" clearable />
            </el-form-item>
          </div>
          <div class="form-item-cell">证件有效期</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="cardExpired">
              <el-date-picker
                v-model="detail.cardExpired"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择证件有效期"
              />
            </el-form-item>
          </div>
        </div>
        <div class="form-item-row">
          <div class="form-item-cell">邮箱</div>
          <div class="form-item-cell">
            <el-form-item label="" prop="email">
              <el-input v-model="detail.email" clearable />
            </el-form-item>
          </div>
          <div class="form-item-cell" />
          <div class="form-item-cell" />
        </div>
        <div class="form-item-row">
          <div class="form-item-cell">是否GP</div>
          <div class="form-item-cell">
            <el-radio-group v-model="detail.isGp" @input="handlerGpChange()">
              <!--  -->
              <el-radio
                v-for="option in gpOptions"
                :key="option.value"
                :label="option.value"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </div>
          <div class="form-item-cell">GP银行信息</div>
          <div class="form-item-cell">
            <el-form-item label="">
              <el-form-item label="" prop="gpBankValue">
                <el-select
                  v-model="detail.gpBankValue"
                  clearable
                  placeholder="GP所属银行信息"
                  :disabled="!detail.isGp"
                >
                  <el-option
                    v-for="item in gpBankList"
                    :key="item.bankCode"
                    :value="item.bankName"
                    :label="item.bankName"
                  />
                </el-select>
              </el-form-item>
              <!-- <el-input v-model="detail.gpBankValue" clearable :disabled="!detail.isGp" /> -->
            </el-form-item>
          </div>
        </div>
        <div class="footer">
          <el-button
            type="primary"
            @click="dialogStatus === 'create' ? createData() : updateData()"
            >保存
          </el-button>
          <el-button @click="dialogFormVisible = false">关闭</el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import PassengerTypeEnum from '@/enum/PassengerType'
import IdentityCardTypeEnum from '@/enum/IdentityCardType'
import GenderTypeEnum from '@/enum/GenderType'
import {
  frequentFlyerSave,
  frequentFlyerUpdate
} from '@/api/identity/frequent-flyer'
import Enum from '@/enum/enum'
import { bankList } from '@/api/bank/bank'

export default {
  name: 'SubAccountModifyPassword',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: 'create',
      passengerTypeOptions: [],
      genderTypeOptions: [],
      identityCardTypeOptions: [],
      gpOptions: [],
      gpBankList: [],
      loading: false,
      detail: {
        genderTyoe: 1,
        isGp: 0
      },
      rules: {
        lastName: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        frequentFlyerType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        gender: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        cardType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        cardNum: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        birthday: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created() {
    this.getGPBankList()
  },
  mounted() {
    this.passengerTypeOptions = Object.keys(
      PassengerTypeEnum.PassengerType
    ).map((key) => ({
      value: PassengerTypeEnum.PassengerType[key],
      label: this.$t(
        `AdminService["Enum:PassengerType:${PassengerTypeEnum.PassengerType[key]}"]`
      )
    }))
    this.genderTypeOptions = Object.keys(GenderTypeEnum.GenderType).map(
      (key) => ({
        value: GenderTypeEnum.GenderType[key],
        label: this.$t(
          `AdminService["Enum:GenderType:${GenderTypeEnum.GenderType[key]}"]`
        )
      })
    )
    this.identityCardTypeOptions = Object.keys(
      IdentityCardTypeEnum.IdentityCardType
    ).map((key) => ({
      value: IdentityCardTypeEnum.IdentityCardType[key],
      label: this.$t(
        `AdminService["Enum:IdentityCardType:${IdentityCardTypeEnum.IdentityCardType[key]}"]`
      )
    }))
    this.gpOptions = Enum.booleanOptions
  },
  methods: {
    getGPBankList() {
      bankList().then((response) => {
        if (response) {
          this.gpBankList = response.data
        }
      })
    },
    handleCreate() {
      this.detail.gender = 0
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.loading = true
          this.detail.firstName = ' '
          this.detail.agentOrganizationId = this.$store.state.app.user.organizationId
          frequentFlyerSave(this.detail)
            .then((res) => {
              if (res) {
                this.$emit('handleFilter', true)
                this.dialogFormVisible = false
                this.$notify({
                  title: this.$i18n.t("AdminService['Success']"),
                  message: this.$i18n.t("AdminService['SuccessMessage']"),
                  type: 'success',
                  duration: 2000
                })
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleUpdate(row) {
      this.detail = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true

      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.loading = true
          frequentFlyerUpdate(this.detail)
            .then((res) => {
              if (res) {
                this.$emit('handleFilter', true)
                this.dialogFormVisible = false
                this.$notify({
                  title: this.$i18n.t("AdminService['Success']"),
                  message: this.$i18n.t("AdminService['SuccessMessage']"),
                  type: 'success',
                  duration: 2000
                })
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handlerGpChange(value) {
      if (!this.detail.isGp) {
        this.detail.gpBankValue = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
