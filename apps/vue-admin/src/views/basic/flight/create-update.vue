<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    width="80%"
    :title="
      dialogStatus == 'create'
        ? $t('table.add')
        : $t('table.edit')
    "
  >
    <el-form
      ref="formRef"
      :model="dto"
      :rules="rules"
      :inline="true"
      class="demo-form-inline form-inline-label-115"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="航司" prop="carrierNumber">
            <el-select
              v-model="dto.carrierNumber"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in airlines"
                :key="item.id"
                :label="item.carrierName"
                :value="item.id"
              >
                <span style="float: left">{{
                  item.carrierName
                }}</span>
                <span
                  style="
                                        float: right;
                                        color: #8492a6;
                                        font-size: 13px;
                                    "
                >{{ item.carrierCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="航班号" prop="flightNumber">
            <el-input v-model="dto.flightNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出发城市" prop="departureCityId">
            <el-select
              v-model="dto.departureCityId"
              filterable
              clearable
              placeholder="请选择"
              @change="departureCityChange"
            >
              <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.cityNameCn"
                :value="item.id"
              >
                <span style="float: left">{{
                  item.cityNameCn
                }}</span>
                <span
                  style="
                                        float: right;
                                        color: #8492a6;
                                        font-size: 13px;
                                    "
                >{{ item.cityCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达城市" prop="arrivalCityId">
            <el-select
              v-model="dto.arrivalCityId"
              filterable
              clearable
              placeholder="请选择"
              @change="arrivalCityChange"
            >
              <el-option
                v-for="item in cities"
                :key="item.id"
                :label="item.cityNameCn"
                :value="item.id"
              >
                <span style="float: left">{{
                  item.cityNameCn
                }}</span>
                <span
                  style="
                                        float: right;
                                        color: #8492a6;
                                        font-size: 13px;
                                    "
                >{{ item.cityCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出发机场" prop="departureAirportId">
            <el-select
              v-model="dto.departureAirportId"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in departureAirports"
                :key="item.id"
                :label="item.airportName"
                :value="item.id"
              >
                <span style="float: left">{{
                  item.airportName
                }}</span>
                <span
                  style="
                                        float: right;
                                        color: #8492a6;
                                        font-size: 13px;
                                    "
                >{{ item.airportCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达机场" prop="arrivalAirportId">
            <el-select
              v-model="dto.arrivalAirportId"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in arrivalAirports"
                :key="item.id"
                :label="item.airportName"
                :value="item.id"
              >
                <span style="float: left">{{
                  item.airportName
                }}</span>
                <span
                  style="
                                        float: right;
                                        color: #8492a6;
                                        font-size: 13px;
                                    "
                >{{ item.airportCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出发时刻" prop="departureTime">
            <el-input v-model="dto.departureTime" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达时刻" prop="arrivalTime">
            <el-input v-model="dto.arrivalTime" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出发航站楼">
            <el-input v-model="dto.departureTerminal" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到达航站楼">
            <el-input v-model="dto.arrivalTerminal" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="经停城市">
            <el-input v-model="dto.stopCityIdList" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经停机场">
            <el-input v-model="dto.stopAirportIdList" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经停出发时刻">
            <el-input v-model="dto.stopDepartureTime" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经停到达时刻">
            <el-input v-model="dto.stopArrivalTime" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="飞机机型">
            <el-input v-model="dto.planeModel" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="适用班期">
            <weeks v-model="dto.schedule" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效期始">
            <el-date-picker
              v-model="dto.validityBegin"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效期止">
            <el-date-picker v-model="dto.validityEnd" type="date" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否共享">
            <el-radio-group v-model="dto.isShare">
              <el-radio
                v-for="option in booleanOptions"
                :key="option.value"
                :label="option.value"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实际承运航班">
            <el-input v-model="dto.actualCarrierFlight" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否支持单程">
            <el-radio-group v-model="dto.isSupportOnewayTrip">
              <el-radio
                v-for="option in booleanOptions"
                :key="option.value"
                :label="option.value"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否支持往返">
            <el-radio-group v-model="dto.isSupportRoundTrip">
              <el-radio
                v-for="option in booleanOptions"
                :key="option.value"
                :label="option.value"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否提供餐食">
            <el-radio-group v-model="dto.isProvidedMeal">
              <el-radio
                v-for="option in booleanOptions"
                :key="option.value"
                :label="option.value"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
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
import Enum from '@/enum/enum'
import { cityList } from '@/api/city/city'
import Weeks from '@/components/Weeks/index'
// import { airportList } from '@/api/basic/airport'
import { airlineList } from '@/api/basic/airline'
import { save, update } from '@/api/basic/flight'

export default {
  name: 'FlightCreateUpdate',
  components: { Weeks },
  data() {
    return {
      isIndeterminate: true,

      query: { current: -1, size: -1 },
      showId: false,
      dialogStatus: '',
      dialogFormVisible: false,
      natInternationalOptions: [],
      hasOptions: [],
      booleanOptions: [],
      dto: {},
      cities: [],
      airports: [],
      airlines: [],

      departureAirports: [],
      arrivalAirports: [],

      rules: {
        carrierNumber: [
          {
            required: true,
            message: '请输入或选择航司',
            trigger: ['blur', 'change']
          }
        ],
        flightNumber: [
          {
            required: true,
            message: '请输入航班号',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 6,
            message: '航班号必须为6位以内数字',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]+$/,
            message: '航班号必须为6位以内的数字',
            trigger: 'blur'
          }
        ],
        departureCityId: [
          {
            required: true,
            message: '请输入或选择出发城市',
            trigger: ['blur', 'change']
          }
        ],
        arrivalCityId: [
          {
            required: true,
            message: '请输入或选择到达城市',
            trigger: ['blur', 'change']
          }
        ],
        departureAirportId: [
          {
            required: true,
            message: '请输入或选择出发机场',
            trigger: ['blur', 'change']
          }
        ],
        arrivalAirportId: [
          {
            required: true,
            message: '请输入或选择到达机场',
            trigger: 'blur'
          }
        ],
        departureTime: [
          {
            required: true,
            message: '请输入出发时刻',
            trigger: 'blur'
          }
        ],
        arrivalTime: [
          {
            required: true,
            message: '请输入到达时刻',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getCityList()
    this.getDepartureAirportList(this.dto.departureCityId)
    this.getArrivalAirportList(this.dto.arrivalCityId)
    this.getAirlineList()
  },
  mounted() {
    this.natInternationalOptions = Enum.natInternationalOptions
    this.hasOptions = Enum.hasOptions
    this.booleanOptions = Enum.booleanOptions
  },
  methods: {
    getCityList() {
      cityList({ cityCode: null }).then((response) => {
        if (response.status === '200') {
          this.cities = response.data
        }
      })
    },

    getDepartureAirportList(cityId) {
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i].id === cityId) {
          this.departureAirports = this.cities[i].airportConfigBaseDTOList
        }
      }
    },

    getArrivalAirportList(cityId) {
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i].id === cityId) {
          this.arrivalAirports = this.cities[i].airportConfigBaseDTOList
        }
      }
    },
    getAirlineList() {
      airlineList(this.query).then((response) => {
        if (response.status === '200') {
          this.airlines = response.data.records
        }
      })
    },

    departureCityChange(value) {
      delete this.dto.departureAirportId
      this.getDepartureAirportList(value)
    },

    arrivalCityChange(value) {
      delete this.dto.arrivalAirportId
      this.getArrivalAirportList(value)
    },

    resetFlied() {
      this.dto = {
        schedule: []
      }
    },
    handleCreate() {
      this.resetFlied()
      this.showId = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
      this.getCityList()
    },
    createData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          save(this.dto).then(response => {
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
        this.getDepartureAirportList(row.departureCityId)
        this.getArrivalAirportList(row.arrivalCityId)
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          update(this.dto).then(response => {
            this.$emit('handleFilter', false)
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
    }
  }
}
</script>

<style scoped></style>
