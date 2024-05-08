<template>
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

    <div class="btn-group">
      <el-button
        :loading="fullscreenLoading"
        type="primary"
        plain
        size="small"
        @click="onTemplateDownload()"
      >
        模板下载
      </el-button>
      <el-button :loading="fullscreenLoading" type="primary" size="small" @click="onAdd()">
        新增常旅客
      </el-button>
      <el-upload
        class="upload-btn"
        action="/api/upload"
        :show-file-list="false"
        :http-request="onImport"
      >
      <el-button :loading="fullscreenLoading" type="info" plain size="small">
        批量导入
      </el-button>
      </el-upload>
    </div>

    <datatable
      :loading="loading"
      mode="editDelete"
      :table-key="'PermanentPassenger'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-delete="onDelete"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <!-- <modifyPassword ref="modifyPasswordDialog" />
      <privilegeAssignment ref="privilegeAssignmentDialog" provider-name="R"/> -->
    <createUpdate ref="createUpdateDialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery, { downloadExcel } from '@/utils/abp'
import Enum from '@/enum/enum'
import CreateUpdate from './create-update.vue'
import { frequentFlyerList, exportExcel, frequentFlyerDelete, importExcel } from '@/api/identity/frequent-flyer.js'
import { Message } from 'element-ui'

export default {
  name: 'PermanentPassenger',
  components: {
    Datatable,
    Pagination,
    CreateUpdate
  },
  data() {
    return {
      loading: false,
      fullscreenLoading: false,
      enDisableOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        agentOrganizationId: this.$store.state.app.user.organizationId,
        ...baseListQuery
      }
    }
  },
  created() {
    this.getList(this.listQuery)
  },
  mounted() {
    this.enDisableOptions = Enum.enDisableOptions
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      frequentFlyerList(this.listQuery).then((response) => {
        this.loading = false
        if (response) {
          this.list = response.data.records
          this.total = response.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList(this.listQuery)
    },
    onAdd() {
      this.$refs['createUpdateDialog'].handleCreate()
    },
    onEdit(row) {
      this.$refs['createUpdateDialog'].handleUpdate(row)
    },
    onTemplateDownload() {
      this.fullscreenLoading = true
      this.listQuery.current = 1
      this.listQuery.size = 1
      exportExcel(this.listQuery).then(response => {
        if (response) {
          downloadExcel(response, '常旅客模板')
          this.fullscreenLoading = false
          this.listQuery.current = 1
          this.listQuery.size = 10
        }
      }).catch(() => {
        this.fullscreenLoading = false
      })
    },
    onImport(e) {
      this.fullscreenLoading = true
      const formData = new FormData()
      formData.append('file', e.file)
      importExcel(formData).then(response => {
        if (response) {
          this.fullscreenLoading = false
          Message({
            message: '上传成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.handleFilter(true)
        }
      }).catch(() => {
        this.fullscreenLoading = false
      })
    },
    onDelete(row) {
      this.$confirm(`确定要删除该常旅客么？`, `删除`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.fullscreenLoading = true
        frequentFlyerDelete(row.id).then((response) => {
        this.fullscreenLoading = false
          this.handleFilter()
          this.$message({
            type: 'success',
            message: `删除成功!`
          })
        })
      }).catch(() => {
        this.fullscreenLoading = false
        this.$message({
          type: 'info',
          message: `取消删除!`
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
