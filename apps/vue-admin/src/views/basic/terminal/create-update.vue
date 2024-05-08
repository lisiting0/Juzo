<template>
  <el-dialog
    :visible.sync="terminalDialogVisible"
    :width="width"
    :center="center"
    :title="title"
    @close="closeDialog"
  >
    <el-form ref="formRef" label-width="150px" :model="dto" :rules="rules">
      <el-form-item label="机场">
        <el-input v-model="dto.airport" clearable />
      </el-form-item>
      <el-form-item label="航空公司">
        <el-input v-model="dto.airlineCompany" clearable />
      </el-form-item>
      <el-form-item label="航站楼">
        <el-input v-model="dto.terminal" clearable />
      </el-form-item>
      <el-form-item label="国内国际">
        <el-radio-group v-model="dto.natInternational">
          <el-radio
            v-for="option in natInternationalOptions"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出发日期">
        <el-date-picker v-model="dto.departureDate" type="date" />
      </el-form-item>
      <el-form-item label="到达日期">
        <el-date-picker v-model="dto.destinationDate" type="date" />
      </el-form-item>
      <el-form-item label="提前登记">
        <el-input v-model="dto.book" clearable />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="terminalDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="onSubmit('formRef')">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Enum from '@/enum/enum'

export default {
  name: 'TerminalCreateUpdate',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    },
    center: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    dto: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      terminalDialogVisible: this.dialogVisible,
      natInternationalOptions: [],
      rules: {
        name: [
          {
            required: true,
            message: '请输入机场名称',
            trigger: 'blur'
          }
        ],
        airlineCompany: [
          {
            required: true,
            message: '请输入航空公司',
            trigger: 'blur'
          }
        ],
        terminal: [
          {
            required: true,
            message: '请输入出发日期',
            trigger: 'blur'
          }
        ],
        departureDate: [
          {
            required: true,
            message: '请输入到达日期',
            trigger: 'blur'
          }
        ],
        destinationDate: [
          {
            required: true,
            message: '请输入航站楼',
            trigger: 'blur'
          }
        ],
        natInternational: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请选择国内国际'))
              } else {
                callback()
              }
            },
            message: '请选择国内国际',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {
  },
  mounted() {
    this.natInternationalOptions = Enum.natInternationalOptions
  },
  methods: {
    openDialog() {
      this.terminalDialogVisible = true
    },
    closeDialog() {
      this.terminalDialogVisible = false
    },
    onSubmit() {
      this.$refs.formRef.validate(async(valid, validateObject) => {
        if (!valid) {
          return
        }
        this.terminalDialogVisible = false
      })
    }
  }
}
</script>

<style scoped>
.el-select {
    display: block;
}
</style>
