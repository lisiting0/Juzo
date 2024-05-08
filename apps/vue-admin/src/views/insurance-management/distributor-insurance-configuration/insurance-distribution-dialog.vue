<template>
  <el-dialog
    width="80%"
    top="5vh"
    :visible.sync="dialogFormVisible"
    :title="'详情列表'"
  >
    <div class="div-flex">
      <div class="left-container" style="width: 30%">
        <div class="custom-card" style="height: 500px">
          <div class="card-title">分销商列表</div>
          <div class="card-box" style="padding: 15px 10px; height: 90%">
            <el-form
              ref="radioFormRef"
              :model="radioListQuery"
              :inline="true"
              class="demo-form-inline"
            >
              <el-row>
                <el-col :span="15">
                  <el-form-item label="分销商">
                    <el-select
                      v-model="radioListQuery.agentId"
                      filterable
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in agentListOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-form-item class="btns">
                  <el-button type="primary" @click="getTicketAgentDetail()">
                    查询
                  </el-button>
                </el-form-item>
              </el-row>
            </el-form>
            <el-table
              ref="radioTable"
              :data="agentList"
              fit
              stripe
              height="90%"
              @selection-change="handleRidioChange"
              @select="dialogCheck"
            >
              <!-- @selection-change="handleRidioChange"-->
              <el-table-column type="selection" width="50" />
              <el-table-column label="分销商" prop="name" />
            </el-table>
          </div>
        </div>
      </div>
      <div class="right-container" style="width: 68%">
        <div class="custom-card" style="height: 500px">
          <div class="card-title">可分配保险列表</div>
          <div class="card-box" style="padding: 15px 10px; height: 90%">
            <el-form
              ref="checkboxFormRef"
              :model="insuranceListQuery"
              :inline="true"
              class="demo-form-inline"
            >
              <el-row>
                <el-col :span="6">
                  <el-form-item label="保险公司">
                    <el-input
                      v-model="insuranceListQuery.companyName"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="保险名称">
                    <el-input
                      v-model="insuranceListQuery.insuranceName"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="保险类型">
                    <el-select
                      v-model="insuranceListQuery.insuranceType"
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
              height="90%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" selection-align="center" />
              <el-table-column label="保险公司" prop="companyName" />
              <el-table-column label="保险名称" prop="insuranceName" />
              <el-table-column label="保险类型" prop="insuranceType" />
              <el-table-column label="原始价格" prop="originPrice" />
              <el-table-column label="采购成本" prop="purchasePrice" />
              <el-table-column label="保额" prop="insuranceCoverage" />
              <el-table-column
                label="单人最大销售数量限制"
                prop="purchaseLimit"
                width="150"
              />
              <el-table-column label="销售价格" prop="salesPrice">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.salesPrice" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="createData()"> 保存 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import InsuranceTypeEnum from '@/enum/insuranceType'
import { save, queryCanList } from '@/api/basic/distributor-insurance'
import { ticketAgentList, ticketAgentDetail } from '@/api/distribution/agent'

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
      agentListOptions: [],
      agentList: [],
      selectioned: [],
      checkboxList: [
        {
          distributionAccount: 'FX01',
          distributionName: '分销商01',
          balance: 100000,
          creditLimit: 0
        }
      ],
      multipleSelection: [],
      insuranceList: [],
      insuranceTotal: 0,
      insuranceListQuery: {
        current: -1,
        size: -1,
        status: 1,
        agentOrganizationId: ''
      },
      agentInsuranceDTO: {
        agentOrganizationId: '',
        agentOrganizationName: '',
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
  created() {},
  mounted() {
    this.insuranceTypeOptions = Object.keys(
      InsuranceTypeEnum.InsuranceType
    ).map((key) => ({
      value: InsuranceTypeEnum.InsuranceType[key],
      label: key
    }))
  },
  methods: {
    handle() {
      this.dialogFormVisible = true
      this.getTicketAgentList()
    },
    getTicketAgentList() {
      ticketAgentList({
        page: 1,
        limit: 1000
      }).then((response) => {
        if (response) {
          this.agentListOptions = response.items
          this.agentList = response.items
        }
      })
    },
    getTicketAgentDetail() {
      this.agentList = []
      ticketAgentDetail(this.radioListQuery.agentId).then((response) => {
        if (response) {
          this.agentList.push(response)
        }
      })
    },
    handleRidioChange(val) {
      if (val.length > 1) {
        this.$refs.radioTable.clearSelection()
        this.$refs.radioTable.toggleRowSelection(val.pop())
      }
      this.selectioned = val
    },
    dialogCheck: function(selection, row) {
      console.log('-------row', row)
      this.$refs.radioTable.clearSelection()
      if (selection.length === 0) {
        return
      }
      if (row) {
        this.selectioned = selection
        this.$refs.radioTable.toggleRowSelection(row, this.selectioned)
        if (row.organizationId) {
          this.insuranceListQuery.agentOrganizationId = row.organizationId
          this.agentInsuranceDTO.agentOrganizationId = row.organizationId
          this.agentInsuranceDTO.agentOrganizationName = row.name
          this.getInsuranceList()
        }
      }
    },
    getInsuranceList() {
      this.loading = true
      queryCanList(this.insuranceListQuery)
        .then((response) => {
          this.loading = false
          if (response.status === '200') {
            if (response.data) {
              this.insuranceList = response.data
            }
          }
        })
        .catch((error) => {
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
        this.insuranceConfigIdDTO.insuranceConfigId =
          this.multipleSelection[i].id
        this.insuranceConfigIdDTO.salesPrice =
          this.multipleSelection[i].salesPrice
        this.agentInsuranceDTO.insuranceConfigIdList.push(
          this.insuranceConfigIdDTO
        )
        // console.log('---------------this.agentInsuranceDTO', this.agentInsuranceDTO)
      }

      save(this.agentInsuranceDTO).then((response) => {
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
