<template>
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="listQuery"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item prop="dateRange" label="创建时间">
            <el-date-picker
              v-model="listQuery.dateRange"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="title" label="公告标题">
            <el-input v-model.trim="listQuery.title" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="公告状态">
            <el-select v-model.trim="listQuery.status" clearable>
              <el-option
                v-for="option in announcementStatusOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item class="btns">
            <el-button type="primary" @click="handleFilter()">
              查询
            </el-button>
            <el-button type="info" @click="resetForm">
              重置
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="onAdd()">
        {{ $t('table.add') }}
      </el-button>
    </el-row>

    <datatable
      :loading="loading"
      mode="edit"
      :table-key="'PlatformAnnouncement'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
      @on-copy="onPublish"
      @on-detail="onDetail"
      @on-delete="onCancel"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <announcementCreateUpdate ref="dialog" @handleFilter="handleFilter" />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import JuzoAnnouncementStatusTypeEnum from '@/enum/JuzoAnnouncementStatusType'
import AnnouncementCreateUpdate from './create-update.vue'
import { announcementList, updateAnnouncementStatus } from '@/api/distribution/announcement'
import { utcStartDate, utcEndDate } from '@/utils/tool'

export default {
  name: 'PlatformAnnouncement',
  components: {
    Datatable,
    Pagination,
    AnnouncementCreateUpdate
  },
  data() {
    return {
      loading: false,
      announcementStatusOptions: [],
      columns: [],
      list: [],
      total: 0,
      listQuery: {
        ...baseListQuery,
        status: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.announcementStatusOptions = Object.keys(JuzoAnnouncementStatusTypeEnum.JuzoAnnouncementStatusType).map(key => ({
      value: JuzoAnnouncementStatusTypeEnum.JuzoAnnouncementStatusType[key],
      label: this.$t(`AdminService["Enum:JuzoAnnouncementStatusType:${JuzoAnnouncementStatusTypeEnum.JuzoAnnouncementStatusType[key]}"]`)
    }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      this.listQuery.status = this.listQuery.status === '' ? undefined : this.listQuery.status
      if (this.listQuery.dateRange !== undefined && this.listQuery.dateRange !== null) {
        this.listQuery.creationTimeBegin = utcStartDate(this.listQuery.dateRange[0])
        this.listQuery.creationTimeEnd = utcEndDate(this.listQuery.dateRange[1])
      } else {
        this.listQuery.creationTimeBegin = ''
        this.listQuery.creationTimeEnd = ''
      }
      announcementList(this.listQuery).then((response) => {
        if (response) {
          this.list = response.items
          this.total = response.totalCount
        }
        this.loading = false
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    onAdd() {
      this.$refs['dialog'].handleCreate()
    },
    onEdit(row) {
      this.$refs['dialog'].handleUpdate(row)
    },
    onDetail(row) {
      this.$refs['dialog'].handleDetail(row)
    },
    onPublish(row) {
      this.$confirm(`确定要发布该公告 ${row.title} 么？`, `发布公告`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        updateAnnouncementStatus(row.id, {
          status: 1
        }).then((response) => {
          this.loading = false
          if (response) {
            this.handleFilter()
            this.$message({
              type: 'success',
              message: `发布成功!`
            })
          }
        }).catch((error) => {
          this.loading = false
          throw error
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `取消发布!`
        })
      })
    },
    onCancel(row) {
      this.$confirm(`确定要取消该公告 ${row.title} 么？`, `取消公告`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        updateAnnouncementStatus(row.id, {
          status: 2
        }).then((response) => {
          this.loading = false
          if (response) {
            this.handleFilter()
            this.$message({
              type: 'success',
              message: `取消成功!`
            })
          }
        }).catch((error) => {
          this.loading = false
          throw error
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `取消取消公告!`
        })
      })
    }
  }
}
</script>

<style></style>
