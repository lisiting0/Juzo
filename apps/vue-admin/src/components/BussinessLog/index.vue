<template>
  <div class="custom-card">
    <div class="card-title">订单日志</div>
    <div class="card-box time-line">
      <div style="height: 300px; overflow: auto">
        <el-timeline :reverse="false">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { queryLog } from '@/api/businesslog/businesslog'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'BusinessLog',
  props: {
    id: {
      type: String,
      default: ''
    },
    dataType: {
      type: Number,
      default: 0
    },
    modelName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activities: []
    }
  },
  mounted() {
    if (this.id) {
      this.getBusinessLog()
    }
  },
  beforeDestroy() {
  },
  methods: {
    getBusinessLog() {
      queryLog(this.modelName, this.dataType, this.id).then((response) => {
        if (response) {
          response.items.forEach(item => {
            this.activity = {}
            this.activity.content = item.operatorName + ' | ' + item.content + ' | ' + item.title
            this.activity.timestamp = moment(item.creationTime).format('YYYY-MM-DD HH-mm:ss')
            this.activities.push(this.activity)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.time-line {
    .el-timeline-item__wrapper {
        top: 0;
    }
}
</style>

