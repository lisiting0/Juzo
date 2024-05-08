<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="50%"
    :title="dialogStatus == 'create' ? $t('table.add') : $t('table.edit')"
  >
    <el-form ref="formRef" label-width="150px" :model="dto" :rules="rules">
      <!-- <el-form-item v-show="showId" label="编号">
        <el-input v-model="dto.id" :readonly="true" />
      </el-form-item> -->
      <el-form-item label="机场三字编号" prop="airportCode">
        <el-input v-model="dto.airportCode" clearable />
      </el-form-item>
      <el-form-item label="机场名称" prop="airportName">
        <el-input v-model="dto.airportName" clearable />
      </el-form-item>
      <el-form-item label="所在时区" prop="timeZone">
        <el-input v-model="dto.timeZone" clearable />
      </el-form-item>
      <el-form-item label="城市名称" prop="cityId">
        <el-select
          v-model="dto.cityId"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in cities"
            :key="item.id"
            :label="item.cityNameCn + '(' + item.cityCode + ')'"
            :value="item.id"
          >
            <span style="float: left">{{ item.cityNameCn }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.cityCode
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域" size="normal">
        <el-select
          v-model="dto.region"
          filterable
          clearable
          placeholder="请选择区域"
        >
          <el-option
            v-for="item in regionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Enum from '@/enum/enum'
import { cityList } from '@/api/city/city'
import { save, update } from '@/api/basic/airport'
import RegionTypeEnum from '@/enum/RegionType'

export default {
  name: 'AirportCreateUpdate',
  data() {
    return {
      showId: false,
      dialogStatus: '',
      dialogFormVisible: false,
      natInternationalOptions: [],
      hasOptions: [],
      regionOptions: [],
      dto: {},
      cities: [],
      rules: {
        timeZone: [
          {
            required: true,
            message: '请输入时区',
            trigger: 'blur'
          },
          {
            pattern: /^-?[1-9]\d*$/,
            message: '时区必须为数字',
            trigger: 'blur'
          }
        ],
        cityId: [
          {
            required: true,
            message: '请输入城市名称',
            trigger: 'change'
          }
        ],
        airportCode: [
          {
            required: true,
            message: '请输入三字编码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 3,
            message: '机场三字码必须为3位大写字母',
            trigger: 'blur'
          },
          {
            pattern: /^[A-Z]+$/,
            message: '机场三字码必须为3位大写字母',
            trigger: 'blur'
          }
        ],
        airportName: [
          {
            required: true,
            message: '请输入机场名称',
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
    this.regionOptions = Object.keys(RegionTypeEnum.RegionType).map((key) => ({
      value: RegionTypeEnum.RegionType[key],
      label: this.$t(`AdminService["Enum:RegionType:${RegionTypeEnum.RegionType[key]}"]`)
    }))
  },
  methods: {
    getCityList() {
      cityList({ cityCode: null }).then((response) => {
        if (response.status === '200') {
          this.cities = response.data
        }
      })
    },
    resetFlied() {
      this.dto = {}
    },
    handleCreate() {
      this.resetFlied()
      this.showId = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
      this.getCityList()
    },
    createData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          console.log(this.dto)
          save(this.dto).then((response) => {
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
      this.showId = true
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          update(this.dto).then((response) => {
            this.$emit('handleFilter', true)
            this.dialogFormVisible = false
            if (response.status === '200') {
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

<style scoped>
.el-select {
  display: block;
}
</style>
