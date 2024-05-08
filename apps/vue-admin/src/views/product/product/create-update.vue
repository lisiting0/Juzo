<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    width="60%"
    top="5vh"
    :title="
      dialogStatus == 'create'
        ? $t('table.add')
        : $t('table.edit')
    "
  >
    <el-form
      ref="formRef"
      label-width="150px"
      :model="dto"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="产品名称" prop="name">
            <el-input
              v-model="dto.name"
              clearable
              placeholder="产品名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品描述" prop="description">
            <el-input
              v-model="dto.description"
              clearable
              placeholder="产品描述"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="适用航司" prop="airlines">
            <el-input
              v-model="dto.airlines"
              clearable
              placeholder="*表示所有 |分割 不可空 CZ|MU|CA"
              class="text-upper"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="dto.cabinClasss" label="适用舱等" prop="cabinClasss">
            <el-checkbox-group v-model="dto.cabinClasss">
              <el-checkbox
                v-for="option in cabinClassTypeOptions"
                :key="option.value"
                :label="option.value"
              >
                {{ option.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否出固定舱位" prop="fixCabin">
            <el-radio
              v-model="dto.fixCabin"
              :label="true"
            >是</el-radio>
            <el-radio
              v-model="dto.fixCabin"
              :label="false"
            >否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否出固定票价" prop="fixTicketPrice">
            <el-radio
              v-model="dto.fixTicketPrice"
              :label="true"
            >是</el-radio>
            <el-radio
              v-model="dto.fixTicketPrice"
              :label="false"
            >否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="是否使用航司客规"
            prop="useAirlineRule"
          >
            <el-radio
              v-model="dto.useAirlineRule"
              :label="true"
            >是</el-radio>
            <el-radio
              v-model="dto.useAirlineRule"
              :label="false"
            >否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="限制出票时间"
            prop="issueTimeLimitMinutes"
          >
            <el-input
              v-model="dto.issueTimeLimitMinutes"
              clearable
              placeholder="限制出票时间(分钟)，正数表示下单后分钟数 负数表示距离起飞分钟数"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="限制自愿退票时间"
            prop="voluntaryRefundTimeLimitMinutes"
          >
            <el-input
              v-model="dto.voluntaryRefundTimeLimitMinutes"
              clearable
              placeholder="限制自愿退票时间(分钟)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="限制非自愿退票时间"
            prop="involuntaryRefundTimeLimitMinutes"
          >
            <el-input
              v-model="dto.involuntaryRefundTimeLimitMinutes"
              clearable
              placeholder="限制非自愿退票时间(分钟)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="限制自愿改签时间"
            prop="voluntaryChangeTimeLimitMinutes"
          >
            <el-input
              v-model="dto.voluntaryChangeTimeLimitMinutes"
              clearable
              placeholder="限制自愿改签时间(分钟)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="限制非自愿改签时间"
            prop="involuntaryChangeTimeLimitMinutes"
          >
            <el-input
              v-model="dto.involuntaryChangeTimeLimitMinutes"
              clearable
              placeholder="限制非自愿改签时间(分钟)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="dto.passengerTypes" label="乘机人类型" prop="passengerTypes">
            <el-checkbox-group v-model="dto.passengerTypes">
              <el-checkbox
                v-for="option in PassengerTypeOptions"
                :key="option.value"
                :label="option.value"
              >
                {{ option.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效证件类型" prop="validIdType">
            <el-select
              v-model="dto.validIdType"
              placeholder="有效证件类型"
              clearable
            >
              <el-option
                v-for="option in validIdTypeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否支持出GP票" prop="supportGP">
            <el-radio v-model="dto.supportGP" :label="null">不限</el-radio>
            <el-radio v-model="dto.supportGP" :label="true">是</el-radio>
            <el-radio v-model="dto.supportGP" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="genderType">
            <el-select v-model="dto.genderType" placeholder="性别">
              <el-option
                v-for="option in genderTypeFlagOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="最大年龄限制" prop="maxAgeLimit">
            <el-input
              v-model="dto.maxAgeLimit"
              clearable
              placeholder="最大年龄限制"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最小年龄限制" prop="minAgeLimit">
            <el-input
              v-model="dto.minAgeLimit"
              clearable
              placeholder="最小年龄限制"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="最大乘机人数限制"
            prop="maxPassengerLimit"
          >
            <el-input
              v-model="dto.maxPassengerLimit"
              clearable
              placeholder="最大乘机人数限制"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="最小乘机人数限制"
            prop="minPassengerLimit"
          >
            <el-input
              v-model="dto.minPassengerLimit"
              clearable
              placeholder="最小乘机人数限制"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        :loading="btnLoading"
        :disabled="btnLoading"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import CabinClassTypeEnum from '@/enum/CabinClassFlagType'
import PassengerTypeFlagEnum from '@/enum/PassengerTypeFlag'
import ValidIdTypeEnum from '@/enum/validIdType'
import GenderTypeFlagEnum from '@/enum/genderTypeFlag'
import { createProduct, updateProduct } from '@/api/product/product'
import rules from '@/utils/rules'
export default {
  name: 'ProductCreateUpdate',
  props: {},
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      loading: false,
      btnLoading: false,
      cabinClassTypeOptions: [],
      PassengerTypeOptions: [],
      validIdTypeOptions: [],
      genderTypeFlagOptions: [],
      dto: {
        cabinClasss: [],
        passengerTypes: []
      },
      formRules: {
        name: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        airlines: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请选择国内国际'))
              }
              const AirlineRegex = /^(?:[*]|[A-Za-z]{2}|CZ|XX|EE)$/
              if (!AirlineRegex.test(value)) {
                callback(new Error('*表示所有,*表示所有，多个航司用|分割，例：CZ|MU|CA'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // 限制出票时间，单位分钟
        issueTimeLimitMinutes: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateInteger
          }
        ],
        // 限制自愿退票时间
        voluntaryRefundTimeLimitMinutes: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateInteger
          }
        ],
        // 限制非自愿退票时间
        involuntaryRefundTimeLimitMinutes: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateInteger
          }
        ],
        // 限制自愿改签时间
        voluntaryChangeTimeLimitMinutes: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateInteger
          }
        ],
        // 限制非自愿退票时间
        involuntaryChangeTimeLimitMinutes: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur',
            validator: rules.FormValidate.Form().validateInteger
          }
        ],
        genderType: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {
    'dto.airlines'(newVal) {
      this.dto.airlines = newVal?.toUpperCase()
    },
    'dto.cabinClasss'(newVal) {
      if (newVal) {
        if (newVal.length === 0) {
          this.dto.cabinClass = 0
        } else {
          this.dto.cabinClass = newVal.reduce((acc, num) => acc + num, 0)
        }
      }
    },
    'dto.passengerTypes'(newVal) {
      if (newVal) {
        if (newVal.length === 0) {
          this.dto.passengerType = 0
        } else {
          this.dto.passengerType = newVal.reduce((acc, num) => acc + num, 0)
        }
      }
    }
  },
  created() {
    this.cabinClassTypeOptions = Object.keys(CabinClassTypeEnum.CabinClassFlagType).map(key => ({
      value: CabinClassTypeEnum.CabinClassFlagType[key],
      label: this.$t(`Juzo["Enum:CabinClassFlagType:${CabinClassTypeEnum.CabinClassFlagType[key]}"]`)
    }))
    this.PassengerTypeOptions = Object.keys(PassengerTypeFlagEnum.PassengerTypeFlag).map(key => ({
      value: PassengerTypeFlagEnum.PassengerTypeFlag[key],
      label: this.$t(`Juzo["Enum:PassengerTypeFlag:${PassengerTypeFlagEnum.PassengerTypeFlag[key]}"]`)
    }))
    this.validIdTypeOptions = Object.keys(ValidIdTypeEnum.ValidIdType).map(key => ({
      value: ValidIdTypeEnum.ValidIdType[key],
      label: this.$t(`AdminService["Enum:ValidIdType:${ValidIdTypeEnum.ValidIdType[key]}"]`)
    }))
    this.genderTypeFlagOptions = Object.keys(GenderTypeFlagEnum.GenderTypeFlag).map(key => ({
      value: GenderTypeFlagEnum.GenderTypeFlag[key],
      label: this.$t(`AdminService["Enum:GenderTypeFlag:${GenderTypeFlagEnum.GenderTypeFlag[key]}"]`)
    }))
  },
  mounted() {
  },
  methods: {
    resetFlied() {
      this.dto = {
        fixCabin: true,
        fixTicketPrice: true,
        useAirlineRule: true,
        supportGP: null,
        passengerType: 0,
        validIdType: 0,
        genderType: 0,
        cabinClasss: [],
        passengerTypes: []
      }
    },
    convertBinary(val) {
      if (val === 0) {
        return []
      } else {
        const binaryString = val.toString(2) // 将数字转换为二进制字符串
        const binaryDigits = binaryString.split('') // 将二进制字符串拆分为单个数字
        const result = []
        for (let i = 0; i < binaryDigits.length; i++) {
          if (binaryDigits[i] === '1') {
            result.push(Math.pow(2, binaryDigits.length - 1 - i))
          }
        }
        return result
      }
    },
    handleCreate() {
      this.resetFlied()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.loading = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
        this.loading = false
      })
    },
    createData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.btnLoading = true
          createProduct(this.dto).then(response => {
            this.btnLoading = false
            if (response) {
              this.$emit('handleFilter', true)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
          }).catch((error) => {
            this.btnLoading = false
            throw error
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dto = Object.assign({}, row)
      this.$set(this.dto, 'cabinClasss', this.convertBinary(row.cabinClass))
      this.$set(this.dto, 'passengerTypes', this.convertBinary(row.passengerType))
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          delete this.dto.cabinClasss
          delete this.dto.passengerTypes
          // 手动更新表单数据
          this.dto = Object.assign({}, this.dto)
          this.btnLoading = true
          updateProduct(this.dto).then(response => {
            this.btnLoading = false
            this.dialogFormVisible = false
            this.$emit('handleFilter', false)
            if (response) {
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
          }).catch((error) => {
            this.btnLoading = false
            throw error
          })
        } else {
          this.$message.error('请完善必填项')
        }
      })
    }
  }
}
</script>

<style scoped></style>
