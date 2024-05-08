<template>
  <el-dialog
    width="30%"
    :visible.sync="dialogFormVisible"
    :title="'分销商保险设置' + $t('table.edit')"
  >
    <el-form ref="formRef" :rules="rules" label-width="180px" :model="dto">
      <!--      <el-form-item label="分销账号">-->
      <!--        <el-input-->
      <!--          v-model="dto.agentId"-->
      <!--          disabled-->
      <!--          placeholder="分销账号"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="分销商">
        <el-input
          v-model="dto.agentOrganizationName"
          disabled
          placeholder="分销商"
        />
      </el-form-item>
      <el-form-item label="保险公司">
        <el-input
          v-model="dto.insuranceConfigBaseDTO.companyName"
          disabled
          placeholder="保险公司"
        />
      </el-form-item>
      <el-form-item label="保险名称">
        <el-input
          v-model="dto.insuranceConfigBaseDTO.insuranceName"
          disabled
          placeholder="保险名称"
        />
      </el-form-item>
      <el-form-item label="保险类型">
        <el-select
          v-model="dto.insuranceConfigBaseDTO.insuranceType"
          clearable
          disabled
          placeholder="保险类型"
        >
          <el-option
            v-for="env in insuranceTypeOptions"
            :key="env.value"
            :value="env.value"
            :label="env.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="保额">
        <el-input v-model="dto.insuranceConfigBaseDTO.insuranceCoverage" disabled placeholder="保额" />
      </el-form-item>
      <el-form-item label="原始价">
        <el-input
          v-model="dto.insuranceConfigBaseDTO.originPrice"
          disabled
          placeholder="原始价"
        />
      </el-form-item>
      <el-form-item label="采购成本">
        <el-input
          v-model="dto.insuranceConfigBaseDTO.purchasePrice"
          disabled
          placeholder="采购成本"
        />
      </el-form-item>
      <el-form-item label="销售价" prop="salesPrice">
        <el-input
          v-model="dto.salesPrice"
          clearable
          placeholder="销售价"
        />
      </el-form-item>
      <el-form-item label="单人销售数量最大限制">
        <el-input
          v-model="dto.insuranceConfigBaseDTO.purchaseLimit"
          disabled
          placeholder="单人销售数量最大限制"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click=" update()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import InsuranceTypeEnum from '@/enum/insuranceType'
import { update } from '@/api/basic/distributor-insurance'

export default {
  name: 'DistributorInsuranceUpdate',
  data() {
    return {
      dialogFormVisible: false,
      insuranceTypeOptions: [],
      dto: {
        insuranceConfigBaseDTO: {
          companyName: '',
          insuranceName: '',
          insuranceType: '',
          insuranceCoverage: '',
          originPrice: '',
          purchasePrice: '',
          purchaseLimit: ''
      }
    },
      rules: {
        salesPrice: [
          {
            required: true,
            message: '请输入销售价',
            trigger: 'blur'
          },
          {
            pattern: /\d+(\.\d{1,2})?/,
            message: '请输入不多余2位小数的数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.insuranceTypeOptions = Object.keys(InsuranceTypeEnum.InsuranceType).map(key => ({
      value: InsuranceTypeEnum.InsuranceType[key],
      label: key
    }))
  },
  methods: {
    resetFlied() {
      this.dto = {
        distributionType: 0,
        accountType: 1,
        support: 1,
        status: 1
      }
    },
    handleUpdate(row) {
      this.dto = Object.assign({}, row)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    update() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          update(this.dto).then(response => {
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
