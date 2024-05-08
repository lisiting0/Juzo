<template>
  <el-dialog
    width="50%"
    top="5vh"
    :visible.sync="dialogFormVisible"
    :title="dialogStatus == 'create'
      ? $t('table.add')
      : $t('table.edit')
    "
  >
    <el-form
      ref="formRef"
      :model="detail"
      :rules="rules"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-form-item label="大客户号" prop="keyAccountNo">
        <!-- <el-select v-model="detail.agentOrganizationId" placeholder="请选择">
          <el-option
            v-for="item in agentList"
            :key="item.id"
            :label="item.name"
            :value="
              item.id + '|' + item.organizationId + '|' + item.name
            "
          />
        </el-select> -->
        <el-input v-model="detail.keyAccountNo" clearable />
      </el-form-item>
      <el-form-item label="大客名称" prop="keyAccountName">
        <el-input v-model="detail.keyAccountName" clearable />
      </el-form-item>

      <el-form-item label="乘机人" prop="lastName">
        <el-input v-model="detail.lastName" clearable />
      </el-form-item>
      <el-form-item label="旅客类型" prop="passengerType">
        <el-select
          v-model="detail.passengerType"
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

      <el-form-item label="性别" prop="gender" style="width: 100%">
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
      <el-form-item label="证件类型" prop="cardType">
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
      <el-form-item label="证件号" prop="cardNum">
        <el-input v-model="detail.cardNum" clearable />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="detail.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="选择出生日期"
        />
      </el-form-item>
      <el-form-item label="国籍" prop="nationality">
        <el-input
          v-model="detail.nationality"
          clearable
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="证件签发地" prop="cardIssuePlace">
        <el-input
          v-model="detail.cardIssuePlace"
          clearable
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="detail.phone" clearable />
      </el-form-item>
      <el-form-item label="证件有效期" prop="cardExpired">
        <el-date-picker
          v-model="detail.cardExpired"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="选择证件有效期"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="detail.email" clearable />
      </el-form-item>
      <!-- <el-form-item label="是否GP" prop="isGp">
        <el-radio-group v-model="detail.isGp" @input="handlerGpChange()">
          <el-radio
            v-for="option in gpOptions"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="GP银行信息" prop="gpBankValue">
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
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >保存
      </el-button>
      <el-button @click="dialogFormVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import PassengerTypeEnum from '@/enum/PassengerType'
import IdentityCardTypeEnum from '@/enum/identityCardType'
import GenderTypeEnum from '@/enum/genderType'
import {
  keyAccountWhiteListSave,
  keyAccountWhiteListUpdate
} from '@/api/agent/key-account-white-list'
import Enum from '@/enum/enum'
import { bankList } from '@/api/bank/bank'
// import { ticketAgentList } from '@/api/distribution/agent'

export default {
  name: 'SubAccountModifyPassword',
  components: {},
  data() {
    return {
      agentList: [],
      dialogFormVisible: false,
      dialogStatus: 'create',
      passengerTypeOptions: [],
      genderTypeOptions: [],
      identityCardTypeOptions: [],
      gpOptions: [],
      gpBankList: [],
      loading: false,
      detail: {
        gender: 1,
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
        keyAccountNo: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        keyAccountName: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['blur', 'change']
          }
        ],
        // gender: [
        //   {
        //     required: true,
        //     message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
        //     trigger: ['blur', 'change']
        //   }
        // ],
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
    // this.getTicketAgentList()
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
    //  // 客户
    //  getTicketAgentList() {
    //   ticketAgentList({
    //     // agentDepartmentId: this.dto.agentDepartmentId,
    //     page: 1,
    //     limit: 1000
    //   }).then((response) => {
    //     if (response) {
    //       this.agentList = response.items
    //     }
    //   })
    // },
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
          // const agentinfo = this.detail.agentOrganizationId.split('|')
          this.loading = true
          this.detail.firstName = ' '
          // this.detail.agentOrganizationId = agentinfo[1]
          // this.detail.agentOrganizationName = agentinfo[2]
            keyAccountWhiteListSave(this.detail)
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
          // const agentinfo = this.detail.agentOrganizationId.split('|')
          // this.detail.agentOrganizationId = agentinfo[1]
          // this.detail.agentOrganizationName = agentinfo[2]
          keyAccountWhiteListUpdate(this.detail)
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
