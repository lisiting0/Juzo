<template>
  <el-dialog
    width="60%"
    top="3vh"
    :visible.sync="dialogFormVisible"
    :title="
      dialogStatus == 'add' ? $t('table.add') : dialogStatus == 'detail' ? $t('table.detail') : $t('table.edit')
    "
  >
    <el-form ref="formRef" :rules="rules" label-width="180px" :model="dto">
      <el-form-item label="公告标题" prop="title">
        <el-input
          v-model="dto.title"
          clearable
          placeholder="公告标题"
        />
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <Tinymce v-if="dialogFormVisible" ref="editor" v-model="dto.content" :height="400" />
      </el-form-item>
      <el-form-item prop="dateRange" label="有效日期">
        <el-date-picker
          v-model="dto.dateRange"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button
        v-if="dialogStatus !== 'detail'"
        type="primary"
        @click="dialogStatus === 'add' ? createData() : updateData()"
      >
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import JuzoAnnouncementStatusTypeEnum from '@/enum/JuzoAnnouncementStatusType'
import Tinymce from '@/components/Tinymce'
import { createAnnouncement, updateAnnouncement } from '@/api/distribution/announcement'

export default {
  name: 'AnnouncementCreateUpdate',
  components: { Tinymce },
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      announcementStatusOptions: [],
      dto: {
        content: ''
      },
      editorKey: 1, // 初始 key 值为 1
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }
        ],
        dateRange: [
          {
            required: true,
            message: '请输入有效日期',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.announcementStatusOptions = Object.keys(JuzoAnnouncementStatusTypeEnum.JuzoAnnouncementStatusType).map(key => ({
      value: JuzoAnnouncementStatusTypeEnum.JuzoAnnouncementStatusType[key],
      label: this.$t(`AdminService["Enum:JuzoAnnouncementStatusType:${JuzoAnnouncementStatusTypeEnum.JuzoAnnouncementStatusType[key]}"]`)
    }))
  },
  methods: {
    resetFlied() {
      this.dto.content = ''
    },
    handleCreate() {
      this.resetFlied()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.dto.validDateBegin = this.dto.dateRange[0]
          this.dto.validDateEnd = this.dto.dateRange[1]
          createAnnouncement(this.dto).then(response => {
            if (response) {
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
      this.resetFlied()
      this.dto = Object.assign({}, row)
      this.dto.dateRange = [row.validDateBegin, row.validDateEnd]
      this.$set(this.dto, 'content', row.content)
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          this.dto.validDateBegin = this.dto.dateRange[0]
          this.dto.validDateEnd = this.dto.dateRange[1]
          updateAnnouncement(this.dto).then(response => {
            this.$emit('handleFilter', false)
            this.dialogFormVisible = false
            if (response) {
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
    handleDetail(row) {
      this.resetFlied()
      this.dto = Object.assign({}, row)
      this.dto.dateRange = [row.validDateBegin, row.validDateEnd]
      this.$set(this.dto, 'content', row.content)
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
