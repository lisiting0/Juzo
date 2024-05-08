<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="50%"
    top="3vh"
    title="关联航司后返"
  >
    <div>
      <el-row>
        <el-button type="primary" size="small" @click="onAdd()">
          新增
        </el-button>
      </el-row>

      <!-- 列表信息 -->
      <template>
        <el-table
          :data="list"
          style="width: 100%"
        >
          <el-table-column
            prop="airline"
            label="航司二字码"
          />
          <el-table-column
            prop="rebate"
            label="返点"
          />
          <el-table-column
            prop="操作"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="onEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="info" @click="onDel(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

    </div>
  </el-dialog>
</template>

<script>
// , airlineMappingCreate, airlineMappingUpdate, airlineMappingDelete
import { airlineMappingQuery } from '@/api/configuration/issue-ticket-self'

export default {
  name: 'IssueTicketSelfConfigurationCreateUpdate',
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      list: [],
      configId: null
    }
  },
  computed: {},
  watch: {
  },
  mounted() {
  },
  methods: {
    handleShow(configId) {
      this.dialogFormVisible = true
      this.getList(configId)
      this.configId = configId
    },
    getList(configId) {
      airlineMappingQuery(configId).then((response) => {
        this.list = response.data
      }).catch(() => {
          this.$message.error('查询失败...')
        })
    },
    onAdd() {

    },
    onEdit(row) {

    },
    onDel(row) {

    }
  }
}
</script>

<style scoped>
.el-select {
    display: block;
}
</style>
