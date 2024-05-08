<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>团队名单整理</span>
        <div style="float: right">
          <el-upload
            class="upload-btn"
            action="/api/upload"
            :show-file-list="false"
            :http-request="onImportPic"
            accept=".jpg, .png, .jpeg"
          >
            <el-button
              type="primary"
              plain
              size="small"
              :disabled="loading"
              :loading="loading"
            >
              上传身份证图片<i
                class="el-icon-upload el-icon--right"
              />
            </el-button>
          </el-upload>
          <el-upload
            class="upload-btn"
            action="/api/upload"
            :show-file-list="false"
            :http-request="onImportExcel"
          >
            <el-button
              type="success"
              plain
              size="small"
              :disabled="loading"
              :loading="loading"
            >
              导入excel<i
                class="el-icon-document el-icon--right"
              />
            </el-button>
          </el-upload>
        </div>
      </div>
      <div class="text item">
        <el-form
          ref="searchFormRef"
          :model="detail"
          :inline="true"
          class="demo-form-inline form-inline-label-125"
        >
          <el-alert
            title=""
            type="warning"
            :closable="false"
            class="mb-15"
          >
            <div slot="title">
              1、识别不保证100％准确，请认真检查；<br>
              2、涉及隐私数据，系统不做保存；<br>
              3、若你继续使用，代表你同意前两点；<br>
              4、身份证有效性验证（不小心输错一位，系统团队名单整理．护照×．团队名单整理×团队名单整理．身份证帮你找出来）并从中获取生日、城市、年龄信息为你节省时间
            </div>
          </el-alert>
          <el-row>
            <el-col :span="6">
              <el-form-item label="航司代码" prop="airline">
                <el-input
                  v-model.trim="detail.airline"
                  clearable
                  class="text-upper"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="CT项电话" prop="ctPhone">
                <!-- <el-input
                                    v-model.trim="detail.ctPhone"
                                    clearable
                                /> -->
                <el-select
                  v-model="detail.ctPhone"
                  placeholder="CT项电话"
                >
                  <el-option
                    v-for="item in ctPhones"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="CTCM项固定电话"
                prop="ctcmPhone"
              >
                <el-input
                  v-model.trim="detail.ctcmPhone"
                  clearable
                  placeholder="多个号码时，请用英文逗号 , 隔开"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="乘客信息文本"
                prop="passengersNameIdCard"
              >
                <el-input
                  v-model="detail.passengersNameIdCard"
                  type="textarea"
                  :rows="6"
                  :autosize="{ minRows: 6 }"
                  class="black-bg"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="detail.eterm">
            <el-col :span="12">
              <el-form-item label="eterm指令" prop="eterm">
                <el-input
                  v-model="detail.eterm"
                  type="textarea"
                  :rows="6"
                  :autosize="{ minRows: 6 }"
                  class="black-bg"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item align="center">
                <el-button
                  :disabled="loading"
                  :loading="loading"
                  type="primary"
                  @click="onEeterm()"
                >生成ETERT指令
                </el-button>
                <el-button type="info" @click="onReset">清空</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { importIdentificationCard, importExcel } from '@/api/group/group-booking'
export default {
  name: 'GroupTool',
  components: {
  },
  data() {
    return {
      loading: false,
      ctPhones: [
        '13632342546',
        '15521242022',
        '15989221452',
        '13711554780',
        '18318320582'
      ],
      passengers: [],
      tempEterm: [],
      detail: {
        airline: null,
        ctPhone: null,
        ctcmPhone: null,
        passengersNameIdCard: null,
        eterm: null
      }
    }
  },
  watch: {
    'detail.airline'(newVal) {
      this.detail.airline = newVal?.toUpperCase()
    }
  },
  created() { },
  mounted() { },
  methods: {
    onImportPic(e) {
      this.loading = true
      const formData = new FormData()
      formData.append('formFile', e.file)
      importIdentificationCard(formData).then(response => {
        this.loading = false
        if (response) {
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 5 * 1000
          })
          if (!this.passengers.some(x => x.idNumber === response.idNumber)) {
            this.passengers.push({
              name: response.name,
              idNumber: response.idNumber
            })
            this.detail.passengersNameIdCard = this.passengers.map((obj) => { return obj.name + ' ' + obj.idNumber }).join('\n')
          }
        }
      })
    },
    onImportExcel(e) {
      this.loading = true
      const formData = new FormData()
      formData.append('formFile', e.file)
      importExcel(formData).then(response => {
        this.loading = false
        if (response) {
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 5 * 1000
          })
          response.forEach(element => {
            if (!this.passengers.some(x => x.idNumber === element.cardNo)) {
              this.passengers.push({
                name: element.name,
                idNumber: element.cardNo,
                phone: element.phone
              })
            }
          })
          this.detail.passengersNameIdCard = this.passengers.map((obj) => { return obj.name + ' ' + obj.idNumber + ' ' + obj.phone }).join('\n')
          const uniquePhones = Array.from(new Set(this.passengers.map(obj => obj.phone)))
          this.detail.ctcmPhone = uniquePhones.map((p) => { return p }).join(',')
        }
      })
    },
    onEeterm() {
      if (!this.detail.airline) {
        this.$message.error('请输入航司代码')
        return
      }
      if (!this.detail.ctPhone) {
        this.$message.error('请选择CT项固定电话')
        return
      }
      if (!this.detail.ctcmPhone) {
        this.$message.error('请输入CTCM项固定电话')
        return
      }
      if (this.passengers.length === 0) {
        this.$message.error('请导入乘机人信息')
        return
      }
      const chunkedArray = this.chunkArray(this.passengers, 9)
      chunkedArray.forEach(passengers => {
        this.etermInstruction(passengers)
      })
      this.detail.eterm = this.tempEterm.join('\n\n')
    },
    chunkArray(array, chunkSize) {
        const chunks = []
        for (let i = 0; i < array.length; i += chunkSize) {
          chunks.push(array.slice(i, i + chunkSize))
        }
        return chunks
    },
    assignRandomPhone(passengers, phones) {
      const shuffledPassengers = passengers
      for (let i = 0; i < Math.min(passengers.length, phones.length); i++) {
        shuffledPassengers[i].phone = phones[i]
      }
      return passengers
    },
    findPassengersWithSamePhone(passengers) {
      const phoneGroups = {}
      passengers.forEach(passenger => {
          const phone = passenger.phone
          if (phoneGroups[phone]) {
              phoneGroups[phone].push(passenger)
          } else {
              phoneGroups[phone] = [passenger]
          }
      })
      const duplicatePhonesPassengers = Object.values(phoneGroups).filter(group => group.length > 1)

      duplicatePhonesPassengers.forEach(group => {
        for (let i = 0; i < group.length; i++) {
          group[i].index = i + 1
        }
      })
      return duplicatePhonesPassengers
    },
    findPassengersWithUniquePhone(passengers) {
      const phoneCounts = {}
      passengers.forEach(passenger => {
          const phone = passenger.phone
          if (phoneCounts[phone]) {
            phoneCounts[phone]++
          } else {
            phoneCounts[phone] = 1
          }
      })
      const uniquePhonesPassengers = passengers.filter(passenger => { return phoneCounts[passenger.phone] === 1 })
      return uniquePhonesPassengers
    },
    etermInstruction(passengers) {
      const nm = 'NM' + passengers.map((obj) => { return '1' + obj.name }).join('') + '\n'
      const ctct = `OSI ${this.detail.airline} CTCT${this.detail.ctPhone}` + '\n'
      const ctcmPhones = Array.from(new Set(this.detail.ctcmPhone.split(',')))
      const ctcms = []
      if (ctcmPhones.length === passengers.length) {
        ctcmPhones.forEach((phone, phoneIndex) => {
          ctcms.push(`OSI ${this.detail.airline} CTCM${phone}/P${phoneIndex + 1}`)
        })
      } else {
        const pCount = []
        if (ctcmPhones.length === 1) {
          passengers.forEach((element, eleIndex) => { pCount.push(`P${eleIndex + 1}`) })
          ctcms.push(`OSI ${this.detail.airline} CTCM${ctcmPhones.join('')}/${pCount.join('/')}`)
        } else {
          let pCount = []
          let totalPassengerCount = 0
          passengers = this.assignRandomPhone(passengers, ctcmPhones)
          const passengersWithSamePhone = this.findPassengersWithSamePhone(passengers)
          passengersWithSamePhone.forEach((group, groupIndex) => {
            group.forEach((passenger, passengerIndex) => {
              const passengerIndexOverall = totalPassengerCount + passengerIndex + 1
              pCount.push(`P${passengerIndexOverall}`)
            })
            totalPassengerCount += group.length
            ctcms.push(`OSI ${this.detail.airline} CTCM${group[0].phone}/${pCount.join('/')}`)
            pCount = []
          })
          const passengersWithUniquePhone = this.findPassengersWithUniquePhone(passengers)
          passengersWithUniquePhone.forEach((uP, uPIndex) => {
            ctcms.push(`OSI ${this.detail.airline} CTCM${uP.phone}/P${(uPIndex + 1 + totalPassengerCount)}`)
          })
        }
      }
      const ssrs = []
      passengers.forEach((p, pIndex) => {
        ssrs.push(`SSR FOID ${this.detail.airline} HK/NI${p.idNumber}/P${pIndex + 1}`)
      })
      this.tempEterm.push(nm + ctct + ctcms.join('\n') + '\n' + ssrs.join('\n'))
    },
    onReset() {
      this.passengers = []
      this.tempEterm = []
      this.detail = {
        airline: null,
        ctPhone: null,
        ctcmPhone: null,
        passengersNameIdCard: '',
        eterm: null
      }
    }
  }
}
</script>

<style lang="scss">
.black-bg .el-textarea__inner {
    background-color: black !important;
    color: #04d804;
}
</style>
