<template>
  <el-dialog width="80%" top="5vh" :visible.sync="dialogFormVisible" :title="'详情列表'">
    <div class="div-flex">
      <div class="right-container" style="width: 100%">
        <div class="custom-card">
          <div class="card-title">常旅客列表</div>
          <div class="card-box" style="padding: 15px 10px">
            <el-form ref="checkboxFormRef" :model="frequentFlyerListQuery" :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="常旅客姓名">
                    <el-input
                      v-model="
                        frequentFlyerListQuery.name
                      "
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="证件号">
                    <el-input
                      v-model="
                        frequentFlyerListQuery.cardNum
                      "
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="保险类型">
                    <el-select
                      v-model="
                        insuranceListQuery.insuranceType
                      "
                      clearable
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
                </el-col>
                <el-form-item class="btns">
                  <el-button type="primary" @click="getInsuranceList()">
                    查询
                  </el-button>
                </el-form-item>
              </el-row>
            </el-form>
            <el-table
              ref="multipleTable"
              :data="insuranceList"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" selection-align="center" />
              <el-table-column label="保险公司" prop="companyName" />
              <el-table-column label="保险名称" prop="insuranceName" />
              <el-table-column label="保险类型" prop="insuranceType" />
              <el-table-column label="原始价格" prop="originPrice" />
              <el-table-column label="采购成本" prop="purchasePrice" />
              <el-table-column label="保额" prop="insuranceCoverage" />
              <el-table-column label="单人最大销售数量限制" prop="purchaseLimit" width="150" />
              <el-table-column label="销售价格" prop="salesPrice">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.salesPrice" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createData()">
          保存
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import InsuranceTypeEnum from '@/enum/insuranceType'
import { save, queryCanList } from '@/api/basic/distributor-insurance'

export default {
  name: 'InsuranceDistributionDialog',
  components: {
    // Datatable
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      insuranceTypeOptions: [],
      radioListQuery: {},
      radioList: [{
        agentOrganizationId: '00000000-0000-0000-0000-000000000000',
        distributionAccount: 'FX01',
        distributor: '分销商01'
      }, {
        agentOrganizationId: 'a6adb342-1c6b-28f6-09fe-dc3e970bdd7f',
        distributionAccount: 'FX02',
        distributor: '分销商01'
      }],
      selectioned: [],
      checkboxList: [{
        distributionAccount: 'FX01',
        distributionName: '分销商01',
        balance: 100000,
        creditLimit: 0
      }],
      multipleSelection: [],
      insuranceList: [],
      insuranceTotal: 0,
      insuranceListQuery: {
        current: -1,
        size: -1,
        agentOrganizationId: '00000000-0000-0000-0000-000000000000'
      },
      agentInsuranceDTO: {
        agentOrganizationId: '',
        agentName: '',
        insuranceConfigIdList: []
      },
      insuranceConfigIdDTO: {
        insuranceConfigId: '',
        salesPrice: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getInsuranceList()
  },
  mounted() {
    this.insuranceTypeOptions = Object.keys(InsuranceTypeEnum.InsuranceType).map(key => ({
      value: InsuranceTypeEnum.InsuranceType[key],
      label: key
    }))
  },
  methods: {
    handle() {
      this.dialogFormVisible = true
    },
    getRadioList() {
      // this.loading = true
      // fetchList(this.insuranceListQuery).then((response) => {
      //   this.loading = false
      //   if (response) {
      //     this.list = response.data.records
      //     this.total = response.data.total
      //   }
      // })
    },
    handleRidioChange(val) {
      this.selectioned = val
    },
    dialogCheck: function(selection, row) {
      this.$refs.radioTable.clearSelection()
      if (selection.length === 0) {
        return
      }
      if (row) {
        this.selectioned = selection
        this.$refs.radioTable.toggleRowSelection(row, this.selectioned)
        if (row.agentOrganizationId) {
          this.insuranceListQuery.agentOrganizationId = row.agentOrganizationId
          this.agentInsuranceDTO.agentOrganizationId = row.agentOrganizationId
          this.agentInsuranceDTO.agentName = row.distributor
          this.getInsuranceList()
        }
      }
    },
    getInsuranceList() {
      this.loading = true
      queryCanList(this.insuranceListQuery).then((response) => {
        this.loading = false
        if (response.status === '200') {
          if (response.data) {
            this.insuranceList = response.data
          }
        }
        // console.log('****************this.insuranceList', this.insuranceList)
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    createData() {
      this.agentInsuranceDTO.insuranceConfigIdList = []
      // console.log('********************* this.multipleSelection', this.multipleSelection)
      for (var i = 0; i < this.multipleSelection.length; i++) {
       // console.log('-------------i=', i)
        this.insuranceConfigIdDTO = {}
        this.insuranceConfigIdDTO.insuranceConfigId = this.multipleSelection[i].id
        this.insuranceConfigIdDTO.salesPrice = this.multipleSelection[i].salesPrice
        this.agentInsuranceDTO.insuranceConfigIdList.push(this.insuranceConfigIdDTO)
       // console.log('---------------this.agentInsuranceDTO', this.agentInsuranceDTO)
      }

      save(this.agentInsuranceDTO).then(response => {
        if (response.status === '200') {
          // this.$emit('handleFilter', true)
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
  }
}
</script>

<style lang="scss"></style>
