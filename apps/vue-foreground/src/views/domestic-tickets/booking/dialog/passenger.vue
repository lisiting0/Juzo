<template>
    <el-dialog
        width="80%"
        top="5vh"
        center
        :visible.sync="dialogFormVisible"
        :title="'常旅客'"
    >
        <div class="app-container">
          <el-form ref="searchFormRef" :model="listQuery" :inline="true" class="demo-form-inline">
            <el-row>
              <el-col :span="4">
                <el-form-item label="姓名">
                  <el-input v-model="listQuery.name" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="证件号">
                  <el-input v-model="listQuery.cardNum" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item class="btns">
                  <el-button type="primary" @click="getList()">
                    查询
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-table
            :data="list"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column align="center" prop="lastName" label="乘机人" />
            <el-table-column align="center" prop="frequentFlyerType" label="旅客类型">
              <template slot-scope="scope">
                {{ $t(`AdminService["Enum:PassengerType:${scope.row.frequentFlyerType}"]`) }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="cardNum" label="证件号"></el-table-column>
            <el-table-column align="center" prop="phone" label="手机号" />
            <el-table-column align="center" prop="email" label="邮箱" />
          </el-table>

          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" :loading="loading" @click="save()">
                保存
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import Pagination from '@/components/Pagination'
import baseListQuery from '@/utils/abp'
import { frequentFlyerList } from '@/api/identity/frequent-flyer.js'
import Columns from './columns'

export default {
  name: 'AgentCofigurationDialog',
  components: {
    Pagination
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        agentOrganizationId: this.$store.state.app.user.organizationId,
        ...baseListQuery
      },
      multipleSelection: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
  },
  mounted() {
    this.columns = Columns.columns
  },
  methods: {
    handle() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['searchFormRef'].clearValidate()
      })
    },
    getList() {
      this.loading = true
      frequentFlyerList(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.data.records
          this.total = response.data.total
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    save() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择常旅客',
          type: 'warning'
        })
        return
      }
      this.$emit('AddFrePassenger', this.multipleSelection)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss"></style>
