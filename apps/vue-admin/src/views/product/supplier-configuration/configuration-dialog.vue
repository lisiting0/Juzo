<template>
  <el-dialog
    width="80%"
    top="5vh"
    :visible.sync="dialogFormVisible"
    :title="'详情列表'"
  >
    <div class="div-flex">
      <div class="left-container" style="width: 30%">
        <div class="custom-card">
          <div class="card-title">分销商列表</div>
          <div class="card-box" style="padding: 15px 10px">
            <!-- <el-form
                            ref="radioFormRef"
                            :model="agentListQuery"
                            :inline="true"
                            class="demo-form-inline"
                        >
                            <el-row>
                                <el-col :span="15">
                                    <el-form-item label="分销商">
                                        <el-select
                                            v-model="agentListQuery.agentId"
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
                                    <el-button
                                        type="primary"
                                        @click="getticketSupplierDetail()"
                                    >
                                        查询
                                    </el-button>
                                </el-form-item>
                            </el-row>
                        </el-form> -->
            <el-table
              ref="radioTable"
              :data="agentList"
              fit
              stripe
              @selection-change="handleRidioChange"
              @select="dialogCheck"
            >
              <el-table-column type="selection" width="50" />
              <el-table-column label="分销商" prop="name" />
            </el-table>
          </div>
        </div>
      </div>
      <div class="right-container" style="width: 58%">
        <div class="custom-card">
          <div class="card-title">可分配产品列表</div>
          <div class="card-box" style="padding: 15px 10px">
            <el-table
              ref="multipleTable"
              :data="agentProductList"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                selection-align="center"
              />
              <el-table-column
                label="产品名称"
                prop="productName"
              />
              <el-table-column label="是否关联" prop="enabled">
                <template slot-scope="scope">
                  {{
                    scope.row.enabled ? '已关联' : '未关联'
                  }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="save()"> 保存 </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { ticketSupplierList, ticketSupplierDetail } from '@/api/distribution/supplier'
import { productSupplierList, updateProductSupplier } from '@/api/product/domestic-product-supplier'

export default {
  name: 'SupplierCofigurationDialog',
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      agentListOptions: [],
      agentListQuery: {},
      agentList: [],
      selectedAgent: [],
      agentProductList: [],
      multipleSelection: []
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {
  },
  methods: {
    handle() {
      this.dialogFormVisible = true
      this.getSupplierList()
    },
    getSupplierList() {
      ticketSupplierList({ page: 1, limit: 1000 }).then(response => {
        if (response) {
          this.agentListOptions = response.items
          this.agentList = response.items
        }
      })
    },
    getticketSupplierDetail() {
      this.agentList = []
      ticketSupplierDetail(this.agentListQuery.agentId).then(response => {
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
      this.selectedAgent = val
      this.getSupplierProducts()
    },
    dialogCheck: function(selection, row) {
      this.$refs.radioTable.clearSelection()
      if (selection.length === 0) {
        return
      }
      if (row) {
        this.selectedAgent = selection
        this.$refs.radioTable.toggleRowSelection(row, this.selectedAgent)
        this.getSupplierProducts()
      }
    },
    getSupplierProducts() {
      this.loading = true
      if (!this.selectedAgent) {
        return
      }
      setTimeout(() => {
        productSupplierList({ agentId: this.selectedAgent[0].id }).then((response) => {
          this.loading = false
          if (response.items.length > 0) {
            this.agentProductList = response.items
          }
        }).catch(() => {
          this.loading = false
        })
      }, 800)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    save() {
      if (this.selectedAgent.length === 0) {
        this.$message({
          message: '请选择分销商',
          type: 'warning'
        })
        return
      }
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择需要关联的产品',
          type: 'warning'
        })
        return
      }
      const arr1 = this.multipleSelection
      const arr2 = this.agentProductList
      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
          if (arr2[i].productTypeId === arr1[j].productTypeId) {
            // 修改目标字段的值
            arr2[i].enabled = true
            break
          }
        }
      }
      const references = arr2.map(item => ({
        productTypeId: item.productTypeId,
        enabled: item.enabled
      }))
      const json = {
        agentId: this.selectedAgent[0].id,
        agentName: this.selectedAgent[0].name,
        references: references
      }
      updateProductSupplier(json).then(() => {
        this.$emit('handleFilter', true)
        this.dialogFormVisible = false
        this.$notify({
          title: this.$i18n.t("AdminService['Success']"),
          message: this.$i18n.t("AdminService['SuccessMessage']"),
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="scss"></style>
