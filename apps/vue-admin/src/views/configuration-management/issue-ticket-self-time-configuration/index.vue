<template>
  <div class="app-container">
    <div style="margin-left:20%; width: 60%; ">
      <div style="margin-bottom: 10px; text-align: center;">
        自营出票时间配置
      </div>
      <el-form
        :model="form"
        label-width="100px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="开始时间">
          <el-time-select
            v-model="form.startTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:59'
            }"
            placeholder="选择时间"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-time-select
            v-model="form.endTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '23:59'
            }"
            placeholder="选择时间"
          />
        </el-form-item>
        <el-form-item label="是否有效">
          <el-radio-group v-model="form.isEffective">
            <el-radio :label="0">无效</el-radio>
            <el-radio :label="1">有效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优先出票渠道">
          <el-select v-model="form.firstTicketChannel" placeholder="请选择优先出票渠道" clearable filterable>
            <el-option v-for="item in ticketChannelTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { query, update } from '@/api/configuration/issue-ticket-self-time.js'
import TicketChannelTypeEnum from '@/enum/TicketChannelType'

export default {
  name: 'PaymentConfiguration',
  components: {
  },
  data() {
    return {
      form: {},
      loading: false,
      updateLoading: false,
      ticketChannelTypeOptions: [],
      list: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.ticketChannelTypeOptions = Object.keys(TicketChannelTypeEnum.TicketChannelType).map(key => ({
      value: TicketChannelTypeEnum.TicketChannelType[key],
      label: this.$t(`AdminService["Enum:TicketChannelType:${TicketChannelTypeEnum.TicketChannelType[key]}"]`)
    }))
  },
  methods: {
    getList() {
      this.loading = true
      query().then((response) => {
        this.loading = false
        if (response) {
          this.form = response.data
        }
      }).catch((error) => {
        this.loading = false
        throw error
      })
    },
    onSubmit() {
      this.updateLoading = true
      update(this.form).then((response) => {
        if (response) {
          this.$message.success('修改成功')
          this.updateLoading = false
          this.getList()
        }
      }).catch((error) => {
        this.updateLoading = false
        throw error
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
