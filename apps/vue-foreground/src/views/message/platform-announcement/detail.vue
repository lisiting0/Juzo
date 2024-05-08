<template>
    <el-dialog width="60%" :visible.sync="dialogVisible" title="" top="3vh">
        <div class="form-container">
            <div class="title">
                <div>{{ message.title }}</div>
                <div class="creationTime">
                    创建时间：{{
                        message.creationTime | moment('YYYY-MM-DD HH:mm:ss')
                    }}
                </div>
            </div>
            <div
                class="form-item announcement-content"
                style="height: 640px"
                v-html="message.content"
            />
            <div class="footer" align="center">
                <el-button @click="close">关闭</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { announcementDetail } from '@/api/message/announcement'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  name: 'AnnouncementDetail',
  components: {
  },
  data() {
    return {
      dialogVisible: false,
      message: {}
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handle(message) {
      this.dialogVisible = true
      this.$store.state.loading = true
      announcementDetail(message.id).then((response) => {
        if (response) {
          this.message = response
        }
        this.$store.state.loading = false
      })
    },
    close() {
      this.$emit('handleFilter', true)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
    .creationTime {
        font-weight: 400;
        font-style: normal;
        font-size: 12px;
        letter-spacing: 0;
        margin-top: 10px;
    }
}

.form-container {
    .form-item {
        display: block;
        border-bottom: 1px solid #e2e3e4;

        &.announcement-content{
          overflow-y: scroll;
        }
    }

    .footer {
        margin-top: 10px;
    }
}
</style>
