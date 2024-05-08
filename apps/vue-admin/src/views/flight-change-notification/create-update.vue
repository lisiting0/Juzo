<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="50%"
    :title="dialogStatus == 'create' ? $t('table.add') : $t('table.edit')"
  >
    <el-form ref="formRef" label-width="150px" :model="dto" :rules="rules">
      <el-form-item label="航变类型" prop="flightChangeType">
        <el-select
          v-model="dto.flightChangeType"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in flightChangeCategoryTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="原航班号" prop="originFlightNumber">
        <el-input v-model="dto.originFlightNumber" clearable />
      </el-form-item>
      <el-form-item label="原航班航程起飞机场" prop="originDepartureAirport">
        <el-select
          v-model="dto.originDepartureAirport"
          filterable
          clearable
          @change="handlerOriginFlightChange()"
        >
          <el-option
            v-for="item in airports"
            :key="item.id"
            :label="item.airportName + '(' + item.airportCode + ')'"
            :value="item.airportCode"
          >
            <span style="float: left">{{ item.airportName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.airportCode
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原航班航程到达机场" prop="originArrivalAirport">
        <el-select
          v-model="dto.originArrivalAirport"
          filterable
          clearable
          @change="handlerOriginFlightChange()"
        >
          <el-option
            v-for="item in airports"
            :key="item.id"
            :label="item.airportName + '(' + item.airportCode + ')'"
            :value="item.airportCode"
          >
            <span style="float: left">{{ item.airportName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.airportCode
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原航班航程" prop="originFlightInfo">
        <el-input v-model="dto.originFlightInfo" disabled />
      </el-form-item>
      <el-form-item label="原航班起飞时间" prop="originDepartureTime">
        <el-date-picker
          v-model="dto.originDepartureTime"
          type="datetime"
          size="normal"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item
        label="原航班到达时间"
        size="normal"
        prop="originArrivalTime"
      >
        <el-date-picker
          v-model="dto.originArrivalTime"
          type="datetime"
          size="normal"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="新航班号" prop="newFlightNumber">
        <el-input v-model="dto.newFlightNumber" clearable />
      </el-form-item>
      <el-form-item label="新航班航程起飞机场" prop="newDepartureAirport">
        <el-select
          v-model="dto.newDepartureAirport"
          filterable
          clearable
          @change="handlerNewFlightChange"
        >
          <el-option
            v-for="item in airports"
            :key="item.id"
            :label="item.airportName + '(' + item.airportCode + ')'"
            :value="item.airportCode"
          >
            <span style="float: left">{{ item.airportName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.airportCode
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新航班航程到达机场" prop="newArrivalAirport">
        <el-select
          v-model="dto.newArrivalAirport"
          filterable
          clearable
          @change="handlerNewFlightChange"
        >
          <el-option
            v-for="item in airports"
            :key="item.id"
            :label="item.airportName + '(' + item.airportCode + ')'"
            :value="item.airportCode"
          >
            <span style="float: left">{{ item.airportName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.airportCode
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新航班航程" prop="newFlightInfo">
        <el-input v-model="dto.newFlightInfo" disabled />
      </el-form-item>
      <el-form-item label="新航班起飞时间" prop="newDepartureTime">
        <el-date-picker
          v-model="dto.newDepartureTime"
          type="datetime"
          size="normal"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="新航班到达时间" size="normal" prop="newArrivalTime">
        <el-date-picker
          v-model="dto.newArrivalTime"
          type="datetime"
          size="normal"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="备注" size="normal" prop="remark">
        <el-input v-model="dto.remark" placeholder="" size="normal" clearable />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  save,
  update
} from '@/api/flight-change-notification/flight-change-notification'
import FlightChangeCategoryTypeEnum from '@/enum/FlightChangeCategoryType'
import { airportList } from '@/api/basic/airport'

export default {
  name: 'FlightChangeNotificationCreateUpdate',
  data() {
    return {
      showId: false,
      dialogStatus: '',
      dialogFormVisible: false,
      flightChangeCategoryTypeOptions: [],
      dto: { status: 0 },
      airports: [],
      noPageQuery: {
        current: -1,
        size: -1
      },
      rules: {
        originDepartureAirport: [
          {
            required: true,
            message: '请输入时区',
            trigger: 'blur'
          }
        ],
        originArrivalAirport: [
          {
            required: true,
            message: '请输入城市名称',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getAllAirport()
  },
  mounted() {
    this.flightChangeCategoryTypeOptions = Object.keys(
      FlightChangeCategoryTypeEnum.FlightChangeCategoryType
    ).map((key) => ({
      value: FlightChangeCategoryTypeEnum.FlightChangeCategoryType[key],
      label: this.$t(`AdminService["Enum:FlightChangeCategoryType:${FlightChangeCategoryTypeEnum.FlightChangeCategoryType[key]}"]`)
    }))
  },
  methods: {
    getAllAirport() {
      this.loading = true
      airportList(this.noPageQuery)
        .then((response) => {
          this.loading = false
          if (response.status === '200') {
            this.airports = response.data.records
          }
        })
        .catch((error) => {
          this.loading = false
          throw error
        })
    },
    resetFlied() {
      this.dto = {}
    },
    handleCreate() {
      this.resetFlied()
      this.showId = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.getAllAirport()
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          console.log(this.dto)
          this.dto.status = 0
          save(this.dto).then((response) => {
            if (response.status === '200') {
              this.$emit('handleFilter', true)
              this.dialogFormVisible = false
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.dto = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.showId = true
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          update(this.dto).then((response) => {
            this.$emit('handleFilter', true)
            this.dialogFormVisible = false
            if (response.status === '200') {
              this.$notify({
                title: this.$i18n.t("AdminService['Success']"),
                message: this.$i18n.t("AdminService['SuccessMessage']"),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handlerOriginFlightChange(val) {
      this.dto.originFlightInfo =
        this.dto.originDepartureAirport + '-' + this.dto.originArrivalAirport
    },
    handlerNewFlightChange(val) {
      this.dto.newFlightInfo =
        this.dto.newDepartureAirport + '-' + this.dto.newArrivalAirport
    }
  }
}
</script>

<style scoped>
.el-select {
  display: block;
}
</style>
