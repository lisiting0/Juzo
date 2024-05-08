<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row>
        <el-col>
          <el-form-item label="充值日期">
            <el-date-picker
              v-model="listQuery.dateRange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 400px"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item class="btns">
            <el-button type="primary" @click="getList()">
              查询
            </el-button>
            <el-button type="info" @click="resetForm">
              重置
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <datatable
      :loading="loading"
      :mode="null"
      :table-key="'History'"
      :table-data="list"
      :table-head="columns"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>

  import Datatable from '@/components/DataTable'
  import Pagination from '@/components/Pagination'
  import Columns from './columns'
  import baseListQuery from '@/utils/abp'
  import { shortMessageQuery } from '@/api/identity/agent-balance'

export default {
  name: 'History',
  components: {
    Datatable,
    Pagination
  },
  data() {
    return {
      loading: false,
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  mounted() {
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      if (this.listQuery.dateRange) {
        this.listQuery.startTime = this.listQuery.dateRange[0]
        this.listQuery.endTime = this.listQuery.dateRange[1]
      } else {
        this.listQuery.startTime = null
        this.listQuery.endTime = null
      }
      shortMessageQuery(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.data.records
          this.list.forEach(item => {
            item.messageNum = item.flowAmount * 10
          })
          this.total = response.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    resetForm() {
      this.listQuery = { ...baseListQuery }
    }
  }
}
</script>

<style lang="scss" scoped></style>
