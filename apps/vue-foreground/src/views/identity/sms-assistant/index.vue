<template>
    <div class="app-container">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="短信充值" name="first">
                <SMSRecharge />
            </el-tab-pane>
            <el-tab-pane label="短信充值历史" name="second">
                <SMSHistory />
            </el-tab-pane>
            <el-tab-pane label="短信发送记录" name="third">
                <SMSConsumptionRecords />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import SMSRecharge from './recharge/index.vue'
import SMSHistory from './history/index.vue'
import SMSConsumptionRecords from './consumption-records/index.vue'

export default {
  name: 'SMSAssistant',
  components: {
    SMSRecharge,
    SMSHistory,
    SMSConsumptionRecords
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style></style>
