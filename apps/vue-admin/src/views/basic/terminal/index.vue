<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form
      ref="searchFormRef"
      :model="getListInput"
      :inline="true"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="4">
          <el-form-item label="国内国际">
            <el-select
              v-model="getListInput.natInternational"
              clearable
            >
              <el-option
                v-for="env in natInternationalOptions"
                :key="env.value"
                :value="env.value"
                :label="env.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="机场">
            <el-input v-model="getListInput.airport" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航站楼">
            <el-input v-model="getListInput.terminal" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航空公司">
            <el-input
              v-model="getListInput.airlineCompany"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="出发日期">
            <el-date-picker
              v-model="getListInput.departureDate"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="到达日期">
            <el-date-picker
              v-model="getListInput.destinationDate"
              type="date"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align: right">
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="getList()"
          >
            查询
          </el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-row style="padding-left: 20px">
      <el-button type="primary" size="small" @click="getList()">新增</el-button>
      <el-upload
        class="upload-btn"
        action="https://jsonplaceholder.typicode.com/posts/"
      >
        <el-button type="success" size="small">导入</el-button>
      </el-upload>
      <el-button type="primary" size="small" @click="getList()">导出</el-button>
      <el-button type="info" size="small" @click="getList()">模板下载</el-button>
    </el-row>

    <datatable
      mode="edit"
      :table-key="'terminal'"
      :table-data="list"
      :table-head="columns"
      @on-edit="onEdit"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <terminalCreateUpdate
      ref="dialog"
      :width="dialog.width"
      :center="dialog.center"
      :title="dialog.title"
      :dto="dialog.dto"
    />
  </div>
</template>

<script>
import Datatable from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import TerminalCreateUpdate from './create-update'
import Enum from '@/enum/enum'
import Columns from './columns'

export default {
  name: 'Cabin',
  components: {
    Datatable,
    Pagination,
    TerminalCreateUpdate
  },
  data() {
    return {
      loading: false,
      getListInput: {},
      natInternationalOptions: [],
      columns: [],
      list: [
        {
          airport: '西安',
          natInternational: 1,
          terminal: 'T3',
          airlineCompany: '3U川航',
          departureDate: '2022-03-16T09:51:27.344745Z',
          destinationDate: '2016-03-21',
          book: 1,
          operatingTime: '2022-03-16T09:51:27.344745Z'
        }
      ],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialog: {
        width: '30%',
        center: false, // 将center设置为true即可使标题和底部居中
        title: this.$t('table.edit'),
        dto: {}
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.natInternationalOptions = Enum.natInternationalOptions
    this.columns = Columns.columns
  },
  methods: {
    getList() {
      // this.loading = true
      // fetchList().then((response) => {
      //   this.list = response.data.items
      //   this.loading = false
      // })
      this.total = this.list.length
    },
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    onEdit(arg) {
      // 处理自定义事件
      console.log(arg)
      this.$refs.dialog.openDialog()
      this.$nextTick(() => {
        this.dialog.dto = arg
      })
    },
    closeDialog() {
      this.$refs.dialog.closeDialog()
    }
  }
}
</script>

<style></style>
