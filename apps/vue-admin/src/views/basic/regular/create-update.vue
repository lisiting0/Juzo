<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="40%"
    top="5vh"
    :title="
      dialogStatus == 'create'
        ? $t('table.add')
        : $t('table.edit')
    "
  >
    <el-form ref="formRef" label-width="165px" :model="dto" :rules="rules">
      <el-form-item label="客规类型" prop="guestRuleType">
        <el-select v-model="dto.guestRuleType" filterable clearable placeholder="请选择">
          <el-option v-for="item in ruleTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="乘客类型" prop="passengerType">
        <el-select v-model="dto.passengerType" filterable clearable placeholder="请选择">
          <el-option v-for="item in passengerTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="客规来源" prop="originType">
        <el-select v-model="dto.originType" filterable clearable placeholder="请选择">
          <el-option v-for="item in originTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="航司" prop="carrierId">
        <el-select v-model="dto.carrierId" filterable clearable placeholder="请选择" @change="carrierChange">
          <el-option v-for="item in carries" :key="item.id" :label="item.carrierName+'('+item.carrierCode+')'" :value="item.id">
            <span style="float: left">{{ item.carrierName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.carrierCode }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="舱位" prop="cabinId">
        <el-select v-model="dto.cabinId" filterable clearable placeholder="请选择">
          <el-option v-for="item in cabins" :key="item.id" :label="item.cabinCode" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="销售开始时间">
            <el-date-picker
              v-model="dto.salesStartTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售结束时间">
            <el-date-picker
              v-model="dto.salesEndTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="起飞开始时间">
            <el-date-picker
              v-model="dto.takeoffStartTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="起飞结束时间">
            <el-date-picker
              v-model="dto.takeoffEndTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="最大距离起飞前小时数" prop="beforeMaxDistanceHours">
            <el-input v-model="dto.beforeMaxDistanceHours" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最小距离起飞前小时数" prop="beforeMinDistanceHours">
            <el-input v-model="dto.beforeMinDistanceHours" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="手续费(%)" prop="feesRate">
        <el-input v-model="dto.feesRate" clearable />
      </el-form-item>
      <el-form-item label="客规描述">
        <el-input v-model="dto.description" clearable />
      </el-form-item>
      <el-form-item label="客规备注">
        <el-input v-model="dto.remark" clearable />
      </el-form-item>
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
import { save, update } from '@/api/basic/regular'
import { airlineList } from '@/api/basic/airline'
import { fetchList as cabinList } from '@/api/basic/cabin'

export default {
  name: 'RegularCreateUpdate',
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      ruleTypeOptions: [{
        value: 0,
        label: '退票'
      },
      {
        value: 1,
        label: '改签'
      },
      {
        value: 2,
        label: '签转'
      },
      {
        value: 3,
        label: '其他'
      }],
      passengerTypeOptions: [
        {
          value: 0,
          label: '成人'
        },
        {
          value: 1,
          label: '儿童'
        },
        {
          value: 2,
          label: '婴儿'
        }
      ],
      originTypeOptions: [{
        value: 0,
        label: '航司'
      },
      {
        value: 1,
        label: '自定义'
      },
      {
        value: 2,
        label: '其他'
      }],
      hasOptions: [],
      dto: {},
      query: { current: -1, size: -1 },
      cabinQuery: { current: -1, size: -1 },
      carries: [],
      cabins: [],
      rules: {
        guestRuleType: [
          {
            required: true,
            message: '请输入或选择客规类型',
            trigger: 'change'
          }
        ],
        passengerType: [
          {
            required: true,
            message: '请输入或选择乘客类型',
            trigger: 'change'
          }
        ],
        originType: [
          {
            required: true,
            message: '请输入或选择客规来源',
            trigger: 'change'
          }
        ],
        carrierId: [
          {
            required: true,
            message: '请输入或选择航司',
            trigger: 'change'
          }
        ],
        cabinId: [
          {
            required: true,
            message: '请输入或选择舱位',
            trigger: 'change'
          }
        ],
        beforeMaxDistanceHours: [
          {
            required: true,
            message: '请输入最大距离起飞前小时数',
            trigger: 'blur'
          }
        ],
        beforeMinDistanceHours: [
          {
            required: true,
            message: '请输入最小距离起飞前小时数',
            trigger: 'blur'
          }
        ],
        feesRate: [
          {
            required: true,
            message: '请输入手续费(%)',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {
  },
  created() {
    this.getAirlineList()
  },
  mounted() {
  },
  methods: {
    getAirlineList() {
      airlineList(this.query).then((response) => {
        if (response.status === '200') {
          this.carries = response.data.records
        }
      })
    },

    carrierChange(value) {
      delete this.dto.cabinId
      this.cabinQuery.size = -1
      this.cabinQuery.current = -1
      this.cabinQuery.carrierCode = value.carrierCode
      cabinList(this.cabinQuery).then((response) => {
        if (response.status === '200') {
          this.cabins = response.data.records
        }
      })
      this.cabinQuery.carrierCode = null
    },

    resetFlied() {
      this.dto = {
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
      this.carrierChange(row.carrierBaseDTO)
      this.dto = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.dto.carrierId = this.dto.carrierId.id
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

<style scoped>
.el-select {
  display: block;
}
</style>
