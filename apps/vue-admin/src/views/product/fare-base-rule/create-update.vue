<template>
  <el-dialog
    v-loading="loading"
    :visible.sync="dialogFormVisible"
    width="60%"
    top="5vh"
    :title="dialogStatus == 'create' ? $t('table.add') : $t('table.edit')"
  >
    <el-form
      ref="formRef"
      label-width="150px"
      :model="dto"
      :rules="formRules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="运价基础名称" prop="name">
            <el-input
              v-model="dto.name"
              clearable
              placeholder="运价基础名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运价基础描述" prop="description">
            <el-input
              v-model="dto.description"
              clearable
              placeholder="运价基础描述"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="航司" prop="airline">
            <el-select
              v-model="dto.airline"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in carries"
                :key="item.id"
                :label="
                  item.carrierName +
                    '(' +
                    item.carrierCode +
                    ')'
                "
                :value="item.carrierCode"
              >
                <span style="float: left">{{
                  item.carrierName
                }}</span>
                <span
                  style="
                                        float: right;
                                        color: #8692a6;
                                        font-size: 13px;
                                    "
                >{{ item.carrierCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="航班号" prop="flightNo">
            <el-input
              v-model.trim="dto.flightNo"
              clearable
              placeholder="航班号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出发机场" prop="departureAirport">
            <el-input
              v-model.trim="dto.departureAirport"
              clearable
              placeholder="出发机场"
              class="text-upper"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达机场" prop="arrivalAirport">
            <el-input
              v-model.trim="dto.arrivalAirport"
              clearable
              placeholder="到达机场"
              class="text-upper"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            v-if="dto.passengerTypeValues"
            label="乘机人类型"
            prop="passengerTypeValues"
            style="margin-bottom: 0"
          >
            <el-checkbox-group v-model="dto.passengerTypeValues">
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
          <el-form-item prop="cabins" label="包含舱位">
            <el-input
              v-model.trim="dto.cabins"
              clearable
              placeholder="*标识全部，多段使用|线分割，例：N|A|M|L|H|E|R"
              class="text-upper"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="aircraftModels" label="机型">
            <el-input v-model.trim="dto.aircraftModels" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="commissionFee" label="航司后返金额">
            <el-input
              v-model.number="dto.commissionFee"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出发日期起始"
            prop="departureDateBegin"
          >
            <el-date-picker
              v-model="dto.departureDateBegin"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出发日期结束" prop="departureDateEnd">
            <el-date-picker
              v-model="dto.departureDateEnd"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售日期起始" prop="saleDateBegin">
            <el-date-picker
              v-model="dto.saleDateBegin"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售日期结束" prop="saleDateEnd">
            <el-date-picker
              v-model="dto.saleDateEnd"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="fareBaseCodeKeyword"
            label="票价基础关键字"
          >
            <el-input v-model="dto.fareBaseCodeKeyword" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            prop="fareBaseServiceDescription"
            label="票价基础服务说明"
          >
            <el-input
              v-model="dto.fareBaseServiceDescription"
              type="textarea"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" align="center">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        :disabled="loading"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import PassengerTypeFlagEnum from '@/enum/PassengerTypeFlag'
import { airlineList } from '@/api/basic/airline'
import { createFareBaseRule, updateFareBaseRule } from '@/api/product/fare-base-rule'
export default {
  name: 'FareBaseRuleCreateUpdate',
  props: {},
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      loading: false,
      carries: [],
      PassengerTypeOptions: [],
      dto: {},
      formRules: {
        name: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        airline: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        departureDateBegin: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        departureDateEnd: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        saleDateBegin: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        saleDateEnd: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'change'
          }
        ],
        passengerTypeValues: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: ['change', 'blur']
          }
        ],
        cabins: [
          {
            required: false,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value) {
                const regex = /^\*|^[A-Za-z]$/
                try {
                  const splitValue = value.split('|')
                  splitValue.forEach(ele => {
                    if (!regex.test(ele)) {
                      throw new Error('包含舱位格式不正确，*标识全部，例：只有一个*，多段使用|线分割，V|T')
                    }
                  })
                } catch (error) {
                  callback(error)
                  return
                }
                callback()
              } else {
                callback()
              }
            }
          }
        ],
        fareBaseCodeKeyword: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        fareBaseServiceDescription: [
          {
            required: true,
            message: this.$i18n.t("AbpAccount['ThisFieldIsRequired.']"),
            trigger: 'blur'
          }
        ],
        commissionFee: [
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
  watch: {
    'dto.cabins'(newVal) {
      this.dto.cabins = newVal?.toUpperCase()
    },
    'dto.departureAirport'(newVal) {
      this.dto.departureAirport = newVal?.toUpperCase()
    },
    'dto.arrivalAirport'(newVal) {
      this.dto.arrivalAirport = newVal?.toUpperCase()
    },
    'dto.passengerTypeValues'(newVal) {
      if (newVal) {
        if (newVal.length === 0) {
          this.dto.passengerTypes = 0
        } else {
          this.dto.passengerTypes = newVal.reduce((acc, num) => acc + num, 0)
        }
      }
    }
  },
  created() {
    this.PassengerTypeOptions = Object.keys(PassengerTypeFlagEnum.PassengerTypeFlag).map(key => ({
      value: PassengerTypeFlagEnum.PassengerTypeFlag[key],
      label: this.$t(`Juzo["Enum:PassengerTypeFlag:${PassengerTypeFlagEnum.PassengerTypeFlag[key]}"]`)
    }))
    this.getAllAirLine()
  },
  mounted() {
  },
  methods: {
    getAllAirLine() {
      this.loading = true
      airlineList({
        current: -1,
        size: -1
      }).then((response) => {
        if (response.status === '200') {
          this.loading = false
          this.carries = response.data.records
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    resetFlied() {
      this.dto = {
        passengerTypes: 0,
        passengerTypeValues: [],
        commissionFee: 0
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
          this.loading = true
          createFareBaseRule(this.dto).then(response => {
            this.loading = false
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
            this.loading = false
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
      this.$set(this.dto, 'passengerTypeValues', this.convertBinary(row.passengerTypes))
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.loading = true
          delete this.dto.passengerTypeValues
          updateFareBaseRule(this.dto).then(response => {
            this.loading = false
            this.$emit('handleFilter', false)
            this.dialogFormVisible = false
            if (response) {
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
          }).catch((error) => {
            this.loading = false
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
