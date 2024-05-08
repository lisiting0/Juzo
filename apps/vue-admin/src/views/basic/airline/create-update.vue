<template>
  <el-dialog
    width="30%"
    top="5vh"
    :visible.sync="dialogFormVisible"
    :title="
      dialogStatus == 'create'
        ? $t('table.add')
        : $t('table.edit')
    "
  >
    <el-form ref="formRef" :rules="rules" label-width="180px" :model="dto">
      <el-form-item label="航司简称" prop="carrierName">
        <el-input v-model="dto.carrierName" clearable placeholder="航司简称" />
      </el-form-item>
      <el-form-item label="航司二字码" prop="carrierCode">
        <el-input v-model="dto.carrierCode" clearable placeholder="航司二字码唯一" />
      </el-form-item>
      <el-form-item label="航司编号" prop="carrierPrefixNumber">
        <el-input v-model="dto.carrierPrefixNumber" clearable placeholder="航司编号(票号前缀)" />
      </el-form-item>
      <el-form-item label="是否国际航司" prop="carrierCountryType">
        <el-radio-group v-model="dto.carrierCountryType">
          <el-radio v-for="option in natInternationalOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有国内航班" prop="haveDomesticAirport">
        <el-radio-group v-model="dto.haveDomesticAirport">
          <el-radio v-for="option in hasOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有国际航班" prop="haveForeignAirport">
        <el-radio-group v-model="dto.haveForeignAirport">
          <el-radio v-for="option in hasOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有效" prop="carrierStatus">
        <el-radio-group v-model="dto.carrierStatus">
          <el-radio v-for="option in booleanOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在城市" prop="cityId">
        <el-select v-model="dto.cityId" filterable clearable placeholder="请选择">
          <el-option
            v-for="option in cityOptions"
            :key="option.id"
            :value="option.id"
            :label="option.cityNameCn + '(' + option.cityCode + ')'"
          >
            <span style="float: left">{{ option.cityNameCn }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px; ">{{ option.cityCode }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="dto.phone" clearable />
      </el-form-item>
      <el-form-item label="官网网址" prop="officialUrl">
        <el-input v-model="dto.officialUrl" clearable />
      </el-form-item>
      <el-form-item label="是否支持两三方协议" prop="twoThreeProtocol">
        <el-radio-group v-model="dto.twoThreeProtocol">
          <el-radio v-for="option in booleanOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否支持值机" prop="checkIn">
        <el-radio-group v-model="dto.checkIn">
          <el-radio v-for="option in booleanOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button :loading="saveLoading" :disabled="buttonDisabled" type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Enum from '@/enum/enum'
import { cityList } from '@/api/city/city'
import { save, update } from '@/api/basic/airline'

export default {
  name: 'AirlineCreateUpdate',
  data() {
    return {
      saveLoading: false,
      buttonDisabled: false,
      dialogStatus: '',
      dialogFormVisible: false,
      natInternationalOptions: [],
      domesticFlightOptions: [],
      hasOptions: [],
      booleanOptions: [],
      cityOptions: [],
      dto: {},
      rules: {
        carrierName: [
          {
            required: true,
            message: '请输入航司的简称',
            trigger: 'blur'
          }
        ],
        carrierCode: [
          {
            required: true,
            message: '请输入航司二字码唯一',
            trigger: 'blur'
          }
        ],
        carrierCountryType: [
          {
            required: true,
            message: '请选择国内国际',
            trigger: ['blur', 'change']
          }
        ],
        carrierPrefixNumber: [
          {
            required: true,
            message: '请输入公司编号(票号前缀)',
            trigger: 'blur'
          }
        ],
        cityId: [
          {
            required: true,
            message: '请输入所在城市',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getCityList()
  },
  mounted() {
    this.natInternationalOptions = Enum.natInternationalOptions
    this.hasOptions = Enum.hasOptions
    this.booleanOptions = Enum.booleanOptions
  },
  methods: {
    getCityList() {
      cityList({ cityCode: null }).then((response) => {
        if (response.status === '200') {
          this.cityOptions = response.data
        }
      })
    },
    resetFlied() {
      this.dto = {
        carrierCountryType: 0,
        haveDomesticAirport: 1,
        haveForeignAirport: 1,
        carrierStatus: 1,
        twoThreeProtocol: 1,
        checkIn: 1
      }
    },
    handleCreate() {
      this.resetFlied()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
      this.buttonDisabled = false
    },
    createData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.saveLoading = true
          this.buttonDisabled = false
          save(this.dto).then(response => {
            this.saveLoading = false
            if (response.status === '200') {
              this.$emit('handleFilter', true)
              this.dialogFormVisible = false
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
    },
    handleUpdate(row) {
      this.dto = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.buttonDisabled = false

      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.saveLoading = true
          this.buttonDisabled = true
          update(this.dto).then(response => {
            this.$emit('handleFilter', false)
            this.dialogFormVisible = false
            if (response.status === '200') {
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
            this.saveLoading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-select {
  display: block;
}
</style>
