<template>
  <el-dialog
    width="80%"
    top="5vh"
    :visible.sync="dialogFormVisible"
    :title="dialogStatus == 'create' ? $t('table.add'): $t('table.edit')"
  >
    <el-form ref="formRef" :rules="rules" :model="dto">
      <el-form-item label="状态" prop="status" style="margin-bottom: 0">
        <el-radio-group v-model="dto.status">
          <el-radio v-for="option in insuranceStatusOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="custom-card">
        <div class="card-title">保险险种设置</div>
        <div class="card-box" style="padding: 15px 10px">
          <table class="table-bordered template-table" style="width: 100%">
            <tr>
              <td>保险公司</td>
              <td>
                <el-form-item label="" prop="companyName" style="margin-bottom: 0">
                  <el-input v-model="dto.companyName" clearable placeholder="保险公司" />
                </el-form-item>
              </td>
              <td>保险名称</td>
              <td>
                <el-form-item label="" prop="insuranceName" style="margin-bottom: 0">
                  <el-input v-model="dto.insuranceName" clearable placeholder="保险名称" />
                </el-form-item>
              </td>
              <td>保险类型</td>
              <td>
                <el-form-item label="" prop="insuranceType" style="margin-bottom: 0">
                  <el-select v-model="dto.insuranceType" clearable>
                    <el-option
                      v-for="env in insuranceTypeOptions"
                      :key="env.value"
                      :value="env.value"
                      :label="env.label"
                    />
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>限购份数/人</td>
              <td>
                <el-form-item label="" prop="purchaseLimit" style="margin-bottom: 0; width: 200px">
                  <el-input v-model="dto.purchaseLimit" placeholder="限购份数">
                    <template slot="append">份</template>
                  </el-input>
                </el-form-item>
              </td>
              <td>适用产品</td>
              <td>
                <el-form-item label="" prop="applicableProduct" style="margin-bottom: 0">
                  <el-checkbox-group v-model="dto.applicableProduct">
                    <el-checkbox v-for="item in applicableProductOptions" :key="item.value" :label="item.value">{{
                      item.label }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </td>
              <td>保单形式</td>
              <td>
                <el-form-item label="" prop="materialType" style="margin-bottom: 0">
                  <el-radio-group v-model="dto.materialType">
                    <el-radio v-for="option in materialTypeOptions" :key="option.value" :label="option.value">
                      {{ option.label }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>原价</td>
              <td>
                <el-form-item label="" prop="originPrice" style="margin-bottom: 0; width: 200px">
                  <el-input v-model="dto.originPrice" placeholder="原价">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </td>
              <td>采购价</td>
              <td>
                <el-form-item label="" prop="purchasePrice" style="margin-bottom: 0; width: 200px">
                  <el-input v-model="dto.purchasePrice" placeholder="采购价">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </td>
              <td>保额</td>
              <td>
                <el-form-item label="" prop="insuranceCoverage" style="margin-bottom: 0; width: 200px">
                  <el-input v-model="dto.insuranceCoverage" placeholder="保额">
                    <template slot="append">万元</template>
                  </el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>适用年龄</td>
              <td>
                <el-form-item label="" prop="age" style="margin-bottom: 0">
                  <el-radio-group v-model="dto.age">
                    <el-radio :label="0">不限</el-radio>
                    <el-radio :label="1">限</el-radio>
                  </el-radio-group>
                  <template v-if="dto.age === 1">
                    <el-form-item
                      label=""
                      prop="startAgeLimit"
                      style="width: 50px; margin: 0 0 0 10px; display: inline-block; "
                    >
                      <el-input v-model="dto.startAgeLimit" placeholder="年龄" />
                    </el-form-item>
                    <span style="line-height: 40px; padding: 0 10px;">至</span>
                    <el-form-item
                      label=""
                      prop="endAgeLimit"
                      style="width: 50px; margin-bottom: 0; display: inline-block;"
                    >
                      <el-input v-model="dto.endAgeLimit" placeholder="年龄" />
                    </el-form-item>
                    <span style="line-height: 40px;padding: 0 10px;">周岁</span>
                  </template>
                </el-form-item>
              </td>
              <td>有效期</td>
              <td>
                <el-form-item label="" prop="validityType" style="margin-bottom: 0">
                  <el-radio-group v-model="dto.validityType">
                    <el-radio :label="0" :value="0">当日当次</el-radio>
                    <el-radio :label="1" :value="1">日期</el-radio>
                  </el-radio-group>
                  <template v-if="dto.validityType === 1">
                    <el-input
                      v-model="dto.validityPeriodLimit"
                      placeholder="天"
                      style=" margin-bottom: 0; width: 150px; margin-left: 10px;"
                    >
                      <template slot="append">天</template>
                    </el-input>
                  </template>
                </el-form-item>
              </td>
              <td />
              <td />
            </tr>
            <tr>
              <td>保额说明</td>
              <td colspan="5">
                <el-input v-model="dto.insuranceContent" />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="custom-card">
        <div class="card-title">对接设置</div>
        <div class="card-box" style="padding: 15px 10px">
          <table class="table-bordered template-table" style="width: 100%">
            <tr>
              <td>对接方式</td>
              <td colspan="5">
                <el-form-item label="" prop="insuranceDockingType" style="margin-bottom: 0">
                  <el-select v-model="dto.insuranceDockingType" clearable>
                    <el-option
                      v-for="env in dockingMethodOptions"
                      :key="env.value"
                      :value="env.value"
                      :label="env.label"
                    />
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr v-if="dto.insuranceDockingType === 1">
              <td>选择渠道方</td>
              <td colspan="5">
                <el-form-item label="" prop="supplierType" style="margin-bottom: 0">
                  <el-select v-model="dto.supplierType" clearable>
                    <el-option
                      v-for="env in supplierTypeOptions"
                      :key="env.value"
                      :value="env.value"
                      :label="env.label"
                    />
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr v-if="dto.insuranceDockingType === 1">
              <td>渠道方保险产品代码</td>
              <td colspan="5">
                <el-form-item label="" prop="supplierProductNo" style="margin-bottom: 0">
                  <el-input v-model="dto.supplierProductNo" />
                </el-form-item>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import InsuranceStatusEnum from '@/enum/insuranceStatus'
import InsuranceTypeEnum from '@/enum/insuranceType'
import ApplicableProductsEnum from '@/enum/applicableProducts'
import PolicyFormEnum from '@/enum/policyForm'
import { save, update } from '@/api/basic/insurance'

export default {
  name: 'InsuranceConfigurationCreateUpdate',
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      insuranceStatusOptions: [],
      insuranceTypeOptions: [],
      applicableProduct: [],
      applicableProductOptions: [],
      materialTypeOptions: [],
      dockingMethodOptions: [{
        label: '线下投保',
        value: 0
      }, {
        label: '系统接口自动投保',
        value: 1
      }],
      supplierTypeOptions: [{
        label: '国信',
        value: 0
      }],
      dto: {
        applicableProduct: []
      },
      rules: {
        status: [
          {
            required: true,
            message: '请选择保险状态',
            trigger: ['blur', 'change']
          }
        ],
        insuranceName: [
          {
            required: true,
            message: '请输入保险名称',
            trigger: 'blur'
          }
        ],
        companyName: [
          {
            required: true,
            message: '请输入保险公司',
            trigger: 'blur'
          }
        ],
        insuranceType: [
          {
            required: true,
            message: '请选择保险类型',
            trigger: ['blur', 'change']
          }
        ],
        purchaseLimit: [
          {
            required: true,
            message: '请输入限购份数/人',
            trigger: 'blur'
          }
        ],
        originPrice: [
          {
            // type: 'number',
            required: true,
            message: '请输入原价',
            trigger: 'blur'
          }
        ],
        purchasePrice: [
          {
            required: true,
            message: '请输入采购价格',
            trigger: 'blur'
          }
        ], // insuranceCoverage
        insuranceCoverage: [
          {
            required: true,
            message: '请输入保额',
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
    this.insuranceStatusOptions = Object.keys(InsuranceStatusEnum.InsuranceStatus).map(key => ({
      value: InsuranceStatusEnum.InsuranceStatus[key],
      label: key
    }))
    this.insuranceTypeOptions = Object.keys(InsuranceTypeEnum.InsuranceType).map(key => ({
      value: InsuranceTypeEnum.InsuranceType[key],
      label: key
    }))
    this.materialTypeOptions = Object.keys(PolicyFormEnum.PolicyForm).map(key => ({
      value: PolicyFormEnum.PolicyForm[key],
      label: key
    }))
    this.applicableProductOptions = Object.keys(ApplicableProductsEnum.ApplicableProducts).map(key => ({
      value: ApplicableProductsEnum.ApplicableProducts[key],
      label: key
    }))
  },
  methods: {
    resetFlied() {
      this.dto = {
        applicableProduct: []
      }
    },
    handleCreate() {
      this.resetFlied()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          save(this.dto).then(response => {
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
      // console.log('---------- this.dto:', this.dto)
      this.dto.originPrice = this.dto.originPrice + ''
      this.dto.purchasePrice = this.dto.purchasePrice + ''
      this.dto.purchaseLimit = this.dto.purchaseLimit + ''
      this.dto.insuranceCoverage = this.dto.insuranceCoverage + ''
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
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
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
table tr td {
  &:first-child {
    font-size: 14px;
    color: #606266;
    text-align: center;
  }

  &:last-child {
    padding: 10px;
  }

  .title {
    margin-bottom: 10px;
  }

  .content {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
