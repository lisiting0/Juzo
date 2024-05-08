<template>
    <div id="app">
        <router-view />

        <!-- 消息通知 -->
        <el-popover
            placement="bottom"
            width="330"
            trigger="click"
            v-show="popoverVisible"
        >
            <el-badge value="1" class="badge_block" slot="reference">
                <el-avatar :size="50" style="background-color: rgb(64, 158, 255)">
                    <i class="el-icon-message-solid" style="font-size: 18px"></i>
                </el-avatar>
            </el-badge>
            <!-- 头部选项
            <el-menu
                mode="horizontal"
                active-text-color="#40aaf7"
                :default-active="activeIndex"
                @select="handleSelect"
                class="el-menu-demo"
            >
                <el-menu-item index="1">通知(5)</el-menu-item>
                <el-menu-item index="2">消息(4)</el-menu-item>
                <el-menu-item index="3">待办(3)</el-menu-item>
            </el-menu> -->
            <div class="el-menu-demo notification_title">通知({{message.length}})</div>
            <div class="box">
                <div class="notification_text" v-for="msg in message" :key="msg.notificationId">
                    <div class="left_image">
                        <i class="el-icon-chat-dot-round" style="font-size: 36px" />
                    </div>
                    <div class="text">
                        <p>{{ msg.content}}</p>
                        <p style="font-size: 12px; color: #ccc">{{ msg.notificationInfoCreationTimeUtc }}</p>
                    </div>
                    <div class="right_button">
                        <!-- <el-button type="primary" size="mini">处理</el-button> -->
                    </div>
                </div>
            </div>
            <div class="bottom_button">
                <span class="bottom_button_left" @click="clearMessage">清空</span>
                <span class="bottom_button_right" @click="more">查看更多</span>
            </div>
        </el-popover>
    </div>
</template>

<script>

import * as signalR from '@microsoft/signalr'
import store from '@/store'

const hubUrl = process.env.VUE_APP_BASE_API
let connection
if (store.getters.token) {
  // .net core 版本中默认不会自动重连，需手动调用 withAutomaticReconnect（断线自动重连）
  connection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect()
    .withUrl(`${hubUrl}/signalr-hubs/notification`, { accessTokenFactory: () => store.getters.token })
    .build()

  // 启动
  connection.start().catch(err => {
    console.log(err)
  })

  // 自动重连成功后的处理
  connection.onreconnected(connectionId => {
    console.log(connectionId)
  })
}

export default {
  name: 'App',
  data() {
    return {
      popoverVisible: false,
      message: []
    }
  },
  watch: {
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.popoverVisible = this.$store.state.app.abpConfig?.currentUser?.isAuthenticated
    // })
    // this.$watch('$store.state.app.abpConfig.currentUser', (newVal, oldVal) => {
    //   this.popoverVisible = newVal?.isAuthenticated
    // })
    // 调用后端方法 ReceiveMessageAsync 接收定时数据 
      connection.on('ReceiveMessage', function(message) {
        console.log('ReceiveMessageAsync')
        console.log(message)
        const notExist = this.message.filter(m => m.notificationId === message.notificationId)
        if (notExist.length === 0) {
          this.message.push(message)
          if (!this.popoverVisible) {
            this.popoverVisible = true
          }
        }
        this.message.sort((a, b) => (a.notificationInfoCreationTimeUtc - b.notificationInfoCreationTimeUtc))
      })
  },
  methods: {
    clearMessage() {
      this.message = []
    },
    more() {
      this.$router.push(`/message/notification`)
    }
  }
}
</script>
<style lang="scss" scoped>
.badge_block {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 999999;
}
.el-menu-demo {
    padding: 0 20px;
}
.el-menu-demo .el-menu-item,
.el-submenu__title {
    height: 35px;
    line-height: 35px;
}
.notification_title {
    height: 35px;
    line-height: 35px;
    color: rgb(64, 170, 247);
    border-bottom: 1px solid rgb(64, 170, 247);
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
}
//每一条
.notification_text {
    width: 100%;
    height: 80px;
    border-bottom: 1px #ccc solid;
    position: relative;
}
//底部按钮
.bottom_button {
    width: 330px;
    height: 50px;
    border-top: #ccc 1px solid;
    position: absolute;
    bottom: 0;
    left: 0;
}
//左右按钮
.bottom_button_left,
.bottom_button_right {
    display: inline-block;
    width: 164px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}
//左按钮
.bottom_button_left {
    border-right: solid 1px #ccc;
}
//左按钮
.bottom_button_left:hover {
    color: #40aaf7;
}
//右按钮
.bottom_button_right:hover {
    color: #40aaf7;
}
//内容部分超出隐藏，给滚动条
.box {
    height: 400px;
    margin-bottom: 37px;
    overflow: auto;

    .notification_text {
        display: flex;
        align-items: center;
        //图片
        .left_image {
            margin-right: 10px;
        }
        //文字部分位置
        .text {
            width: 65%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
//滚动条的样式
::-webkit-scrollbar {
    //滚动条宽高
    width: 5px;
    height: 10px;
}
::-webkit-scrollbar-thumb {
    //滚动条颜色和圆角
    background-color: #dbd9d9;
    border-radius: 3px;
}
</style>
