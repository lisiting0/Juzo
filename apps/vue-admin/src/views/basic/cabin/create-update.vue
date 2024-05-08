<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="40%"
    top="3vh"
    :title="dialogStatus == 'create' ? $t('table.add') : $t('table.edit')"
  >
    <el-form
      ref="formRef"
      :model="dto"
      :rules="rules"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <!-- <el-form-item v-show="showId" label="编号">
        <el-input v-model.trim="dto.id" :readonly="true" disabled />
      </el-form-item> -->
      <el-form-item label="航司" prop="carrierId">
        <el-select
          v-model.trim="dto.carrierId"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in carries"
            :key="item.id"
            :label="item.carrierName + '(' + item.carrierCode + ')'"
            :value="item.id"
          >
            <span style="float: left">{{ item.carrierName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.carrierCode
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="舱位编号" prop="cabinCode">
        <el-input v-model.trim="dto.cabinCode" clearable />
      </el-form-item>
      <el-form-item label="舱位名称">
        <el-input v-model.trim="dto.cabinName" clearable />
      </el-form-item>
      <el-form-item label="是否可销售舱位">
        <el-radio-group v-model.trim="dto.isSold">
          <el-radio
            v-for="option in booleanOptions"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公布运价">
        <el-radio-group v-model="dto.publicFlightRates">
          <el-radio
            v-for="option in booleanOptions"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="舱位等级">
        <el-radio-group v-model="dto.cabinLevel">
          <el-radio
            v-for="option in cabinLevelOptions"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="舱位类型">
        <el-radio-group v-model="dto.cabinType">
          <el-radio
            v-for="option in cabinTypeOptions"
            :key="option.label"
            :label="option.label"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="成人票价级别">
            <el-input v-model.trim="dto.adultFareLevel" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="儿童票价级别">
            <el-input v-model.trim="dto.childrenFareLevel" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="婴儿票价级别">
            <el-input v-model.trim="dto.babyFareLevel" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="折扣率">
        <el-input v-model.trim="dto.discountRate" clearable />
      </el-form-item>
      <el-form-item label="携带行李重量">
        <el-input v-model.trim="dto.luggageWeight" clearable />
      </el-form-item>
      <el-form-item label="手提行李额">
        <el-input v-model.trim="dto.handLuggageWeight" clearable />
      </el-form-item>
      <el-form-item label="行李额备注">
        <el-input
          v-model.trim="dto.baggageRemark"
          type="textarea"
          autosize
          clearable
        />
      </el-form-item>
      <el-form-item label="生效日期" prop="effectiveDate">
        <el-date-picker
          v-model.trim="dto.effectiveDate"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="起飞日期" prop="departureDate">
        <el-date-picker
          v-model.trim="dto.departureDate"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Enum from '@/enum/enum'
import CabinClassTypeEnum from '@/enum/CabinClassType'
import { save, update } from '@/api/basic/cabin'
import { airlineList } from '@/api/basic/airline'

export default {
  name: 'CabinCreateUpdate',
  data() {
    return {
      showId: false,
      dialogStatus: '',
      dialogFormVisible: false,
      natInternationalOptions: [],
      cabinLevelOptions: [],
      cabinTypeOptions: [],
      booleanOptions: [],
      hasOptions: [],
      dto: {},
      query: { current: -1, size: -1 },
      carries: [],
      rules: {
        carrierId: [
          {
            required: true,
            message: '请输入或选择航司',
            trigger: ['blur', 'change']
          }
        ],
        cabinCode: [
          {
            required: true,
            message: '请输入舱位编号',
            trigger: 'blur'
          }
        ],
        cabinName: [
          {
            required: true,
            message: '请输入舱位名称',
            trigger: 'blur'
          }
        ]
        // departureDate: [
        //   {
        //     required: true,
        //     message: '请输入起飞日期',
        //     trigger: 'blur'
        //   }
        // ],
        // effectiveDate: [
        //   {
        //     required: true,
        //     message: '请输入生效日期',
        //     trigger: 'blur'
        //   }
        // ]
      }
    }
  },
  computed: {},
  watch: {
    dialogVisible(newValue) {
      this.cabinDialogVisible = newValue
    }
  },
  mounted() {
    this.cabinLevelOptions = Object.keys(CabinClassTypeEnum.CabinClassType).map(
      (key) => ({
        value: CabinClassTypeEnum.CabinClassType[key],
        label: key
      })
    )
    this.cabinTypeOptions = Enum.cabinTypeOptions
    this.booleanOptions = Enum.booleanOptions
  },
  methods: {
    getAirlineList() {
      airlineList(this.query).then((response) => {
        if (response.status === '200') {
          this.carries = response.data.records
        }
      })
    },

    resetFlied() {
      this.dto = {
        isSold: 0,
        publicFlightRates: 0
      }
    },
    handleCreate() {
      this.resetFlied()
      this.showId = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
      this.getAirlineList()
    },
    createData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          // console.log(this.dto)
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
      this.getAirlineList()
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          // console.log('---------- this.dto', this.dto)
          update(this.dto).then((response) => {
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
