<template>
    <div class="app-container">
        <el-form
            ref="searchFormRef"
            :model="listQuery"
            :inline="true"
            class="demo-form-inline"
        >
            <el-row>
                <!-- <el-col :span="4">
                    <el-form-item prop="status" label="公告状态">
                        <el-select v-model="listQuery.status" clearable>
                            <el-option
                                v-for="option in announcementStatusOptions"
                                :key="option.value"
                                :value="option.value"
                                :label="option.label"
                            />
                        </el-select>
                    </el-form-item>
                </el-col> -->
                <el-col :span="6">
                    <el-form-item prop="dateRange" label="创建日期">
                        <el-date-picker
                            type="daterange"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            v-model="listQuery.dateRange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item prop="title" label="公告标题">
                        <el-input v-model="listQuery.title" clearable />
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

        <datatable
            :loading="loading"
            :mode="'detail'"
            :table-key="'PlatformAnnouncement'"
            :table-data="list"
            :table-head="columns"
            @on-detail="onDetail"
        />
        <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
        />

        <detail ref="dialog" @handleFilter="handleFilter" />
    </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import Columns from './columns'
import baseListQuery from '@/utils/abp'
import Detail from './detail.vue'
import { announcementList } from '@/api/message/announcement'
import { utcStartDate, utcEndDate } from '@/utils/tool'

export default {
  name: 'PlatformAnnouncement',
  components: {
    Datatable,
    Pagination,
    Detail
  },
  data() {
    return {
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
    // this.announcementStatusOptions = Object.keys(JuzoAnnouncementStatusTypeEnum.JuzoAnnouncementStatusType).map(key => ({
    //   value: JuzoAnnouncementStatusTypeEnum.JuzoAnnouncementStatusType[key],
    //   label: this.$t(`AdminService["Enum:JuzoAnnouncementStatusType:${JuzoAnnouncementStatusTypeEnum.JuzoAnnouncementStatusType[key]}"]`)
    // }))
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      this.loading = true
      this.listQuery.status = 1
      if (this.listQuery.dateRange !== undefined && this.listQuery.dateRange !== null && this.listQuery.dateRange[0] !== undefined) {
        this.listQuery.creationTimeBegin = utcStartDate(this.listQuery.dateRange[0])
        this.listQuery.creationTimeEnd = utcEndDate(this.listQuery.dateRange[1])
      } else {
        this.listQuery.creationTimeBegin = ''
        this.listQuery.creationTimeEnd = ''
      }
      delete this.listQuery.getFlightListSortType
      announcementList(this.listQuery).then((response) => {
        if (response) {
          this.list = response.items
          this.total = response.totalCount
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleFilter(firstPage = true) {
      if (firstPage) this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    onDetail(row) {
      this.$refs['dialog'].handle(row)
    }
  }
}
</script>

<style lang="scss" scoped></style>
