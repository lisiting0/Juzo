<template>
  <div class="app-container">
    <el-row class="mb-15">
      <template v-if="tableKey === 'MessageNotification'">
        <el-button type="success" plain size="small" @click="confirm()">
          批量开启
        </el-button>
        <el-button type="danger" plain size="small" @click="cancel()">
          批量关闭
        </el-button>
      </template>
    </el-row>
    <el-table
      ref="dataTable"
      v-loading="loading"
      :table-key="tableKey"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 第一列可以显示的内容 -->
      <el-table-column
        v-if="mode && mode == 'select'"
        fixed
        type="selection"
        width="55"
      />
      <template v-if="mode && mode == 'detail'">
        <el-table-column fixed align="center" prop="action" label="操作">
          <template slot-scope="scope">
            <el-button
              :loading="btnloading"
              :disabled="btnloading"
              type="primary"
              size="mini"
              @click="detail(scope.row)"
            >
              {{ $t('table.detail') }}
            </el-button>
          </template>
        </el-table-column>
      </template>
      <template v-if="mode && (mode == 'edit' || mode == 'editDelete')">
        <el-table-column
          fixed
          align="center"
          prop="action"
          label="操作"
          :width="
            tableKey === 'creditManagement' ||
            tableKey === 'inventory' ||
            tableKey === 'roles' ||
            tableKey === 'InsuranceConfiguration'
              ? 250
              : tableKey === 'account'
              ? 300
              : 150
          "
        >
          <template slot-scope="scope">
            <template v-if="tableKey === 'quality-orders-management'">
              <el-button
                v-if="scope.row.qualityCheckStatus !== 0"
                type="success"
                size="mini"
                @click="detail(scope.row)"
              >
                详情
              </el-button>
              <el-button
                v-if="scope.row.qualityCheckStatus === 1 && scope.row.qualityCheckType === 0"
                type="primary"
                plain
                size="mini"
                @click="handle(scope.row)"
              >
                处理
              </el-button>
              <el-button
                v-if="scope.row.qualityCheckStatus === 0"
                type="primary"
                size="mini"
                @click="edit(scope.row)">
                {{ $t('table.edit') }}
              </el-button>
            </template>
            <template v-else>
              <el-button
                type="primary"
                size="mini"
                @click="edit(scope.row)">
                {{ $t('table.edit') }}
              </el-button>
              <el-button
                v-if="mode === 'editDelete'"
                type="danger"
                size="mini"
                @click="del(scope.row)"
              >
                {{ $t('table.delete') }}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </template>

      <!-- 内容块 -->
      <el-table-column
        v-for="column in tableHead"
        :key="column.prop + column.objectVaue"
        :fixed="column.fixed"
        :width="column.width"
        :label="getHeader(column)"
        :align="column.align"
      >
        <template slot-scope="scope">
          <template v-if="tableKey === 'SubAccount' && column.prop === 'accountType'">
            <template v-if="scope.row.id === primaryUserId">主账号</template>
            <template v-else>子账号</template>
          </template>
          <!-- 个别列自定义 -->
          <template v-if="tableKey === 'PurchaseReport'">
            <template v-if="column.prop === 'remark'">
              <el-popover
                placement="left-start"
                title="备注"
                width="350"
                trigger="hover"
                :content="scope.row.remark"
              >
                <el-link
                  v-if="scope.row.remark !== null && scope.row.remark !== undefined"
                  slot="reference"
                  :underline="false"
                  >{{ maxLength(scope.row.remark, 0, 10) }}
                </el-link>
              </el-popover>
            </template>
          </template>
          <!-- 操作列 -->
          <template v-if="column.prop === 'action'">
            <template v-if="tableKey === 'SubAccount'">
              <router-link
                v-if="scope.row.id === primaryUserId"
                to="/profile/index"
              >
                <el-button type="primary" plain size="mini">
                  修改密码
                </el-button>
              </router-link>
              <el-button
                v-if="
                  currentUserId == primaryUserId &&
                  scope.row.id !== primaryUserId &&
                  primaryUserId === scope.row.creatorId
                "
                type="primary"
                plain
                size="mini"
                @click="edit(scope.row)"
              >
                修改密码
              </el-button>
              <!-- <el-button
                                type="success"
                                plain
                                size="mini"
                                @click="detail(scope.row)"
                                v-if="currentUserId == primaryUserId &&
                                    (scope.row.id !== primaryUserId &&
                                    primaryUserId === scope.row.creatorId)"
                            >
                                权限分配
                            </el-button> -->
              <el-button
                v-if="
                  currentUserId == primaryUserId &&
                  scope.row.id !== primaryUserId &&
                  primaryUserId === scope.row.creatorId
                "
                :type="scope.row.isActive ? 'danger' : 'success'"
                plain
                size="mini"
                @click="del(scope.row)"
              >
                {{ !scope.row.isActive ? '启用' : '禁用' }}
              </el-button>
            </template>
            <template v-if="tableKey === 'PermanentPassenger'">
              <el-button type="primary" size="mini" @click="edit(scope.row)">
                {{ $t('table.edit') }}
              </el-button>
              <el-button type="danger" size="mini" @click="del(scope.row)">
                {{ $t('table.delete') }}
              </el-button>
            </template>
            <template v-if="tableKey === 'MessageNotification'">
              <el-button type="success" size="mini" @click="detail(scope.row)">
                {{ $t('table.detail') }}
              </el-button>
            </template>
          </template>
          <template v-else>
            <template v-if="column.fieldType === 'other' || column.fieldType === 'group'">
              <template v-if="tableKey === 'PlatformAnnouncement' && column.prop === 'isRead'">
                <el-link
                  :underline="false"
                  :type="scope.row.isRead ? '' : 'danger'"
                  >{{ scope.row.isRead ? '已读' : '未读' }}</el-link>
              </template>
              <template v-else>
                <div v-html="getCellContent(column, scope.row)" />
              </template>
            </template>
            <template v-else>
              <div :class="column.class">
                <div v-html="getCellContent(column, scope.row)" />
              </div>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'DataTable',
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    tableKey: {
      type: String,
      required: false,
      default: null
    },
    tableData: {
      type: Array,
      default: null
    },
    tableHead: {
      type: Array,
      required: true,
      default: null
    },
    batchOperationText: {
      type: String,
      required: false,
      default: null
    },
    batchOperationTip: {
      type: String,
      required: false,
      default: null
    },
    showDownloadTemplate: {
      type: Boolean,
      required: false,
      default: false
    },
    onEdit: {
      type: Function,
      default: () => {}
    },
    onDelete: {
      type: Function,
      default: () => {}
    },
    onHandle: {
      type: Function,
      default: () => {}
    },
    onDetail: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      btnloading: false,
      multipleSelection: [],
      currentUserId: '',
      primaryUserId: ''
    }
  },
  watch: {},
  mounted() {
    setTimeout(() => {
      this.currentUserId = this.$store.state.app.abpConfig.currentUser.id
      this.primaryUserId = this.$store.state.app.user.primaryUserId
    }, 500)
  },
  methods: {
    getHeader(col) {
      switch (col.fieldType) {
        case 'group':
          return col.columns
            .map((x) => {
              return x.label
            })
            .join('\n')
        default:
          return col.label
      }
    },
    getCellContent(col, item) {
      switch (col.fieldType) {
        case 'date':
          if (item[col.prop]) {
            return moment(item[col.prop])
              .endOf('day')
              .format('YYYY-MM-DD HH:mm:ss')
          }
          return
        case 'dateYMD':
          if (item[col.prop] != null) {
            return moment(item[col.prop]).format('YYYY-MM-DD')
          }
          return
        case 'number':
          return item[col.prop]
            ? item[col.prop].toFixed(col.precision || 3)
            : ''
        case 'enum':
          if (item[col.prop] != null) {
            return this.$t(
              `${col.enumNamespace}["Enum:${col.enumType}:${item[col.prop]}"]`
            )
          }
          return
        case 'boolean':
          if (col.booleanOptions) {
            const mappings = col.booleanOptions.split('|')
            if (typeof item[col.prop] === 'boolean') {
              const arr = mappings.find(
                (x) => x.indexOf(item[col.prop] + '') !== -1
              )
              if (arr) {
                const splitArr = arr.split(item[col.prop] + '')
                return splitArr[1]
              }
            } else {
              const index = parseInt(item[col.prop])
              if (index >= 0 && index < mappings.length) {
                return mappings[index].split(index)[1]
              }
            }
            return
          }
          return item[col.prop] ? '是' : '否'
        case 'array':
          if (item[col.prop] != null) {
            return this.convertToWeekdays(item[col.prop])
          }
          return
        case 'object':
          return item[col.prop] ? item[col.prop][col.objectVaue] : null
        case 'other':
          if (col.prop === 'sources') {
            return this.ticketOrderSourceFlagType(item[col.prop])
          }
          return
        case 'group':
          return col.columns
            .map((x) => {
              switch (x.fieldType) {
                case 'date':
                  if (item[x.prop]) {
                    return moment(item[x.prop])
                      .endOf('day')
                      .format('YYYY-MM-DD HH:mm:ss')
                  }
                  return
                case 'dateYMD':
                  if (item[x.prop]) {
                    return moment(item[x.prop]).format('YYYY-MM-DD')
                  }
                  return
                case 'number':
                  if (item[x.prop]) {
                    return item[x.prop].toFixed(3)
                  }
                  return
                case 'enum':
                  if (item[x.prop] != null) {
                    return this.$t(
                      `${x.enumNamespace}["Enum:${x.enumType}:${item[x.prop]}"]`
                    )
                  }
                  return
                case 'boolean':
                  if (x.booleanOptions) {
                    const mappings = x.booleanOptions.split('|')
                    if (typeof item[x.prop] === 'boolean') {
                      const arr = mappings.find(
                        (x) => x.indexOf(item[x.prop] + '') !== -1
                      )
                      if (arr) {
                        const splitArr = arr.split(item[x.prop] + '')
                        return splitArr[1]
                      }
                    } else {
                      const index = parseInt(item[x.prop])
                      if (index >= 0 && index < mappings.length) {
                        return mappings[index].split(index)[1]
                      }
                    }
                  }
                  return item[x.prop] ? '是' : '否'
                default:
                  if (x.class) {
                    return (
                      '<span class=' + x.class + '>' + item[x.prop] + '</span>'
                    )
                  } else {
                    return item[x.prop]
                  }
              }
            })
            .join('\n')
        default: // text
          if (item[col.prop]) {
            return item[col.prop]
          }
          return
      }
    },
    nullOrUndefinedStr(val) {
      if (val === null || val === undefined) {
        return ''
      }
      return val
    },
    edit(row) {
      // 发送自定义事件，并传递参数
      this.$emit('on-edit', row)
    },
    detail(row) {
      this.btnloading = true
      // 发送自定义事件，并传递参数
      this.$emit('on-detail', row)
      setTimeout(() => {
        this.btnloading = false
      }, 2000)
    },
    handle(row) {
      // 发送自定义事件，并传递参数
      this.$emit('on-handle', row)
    },
    del(row) {
      // 发送自定义事件，并传递参数
      this.$emit('on-delete', row)
    },
    /**
     * 批量操作
     */
    confirm() {
      this.$emit('on-confirm', this.multipleSelection)
    },
    /**
     * 批量操作
     */
    cancel() {
      this.$emit('on-cancel', this.multipleSelection)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    convertToWeekdays(arr) {
      const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      const result = []
      for (let i = 0; i < arr.length; i++) {
        const index = Math.log2(arr[i]) // 获取对应的索引
        result.push(weekdays[index])
      }
      return result.join(' ')
    },
    ticketOrderSourceFlagType(sourceValue) {
      const binaryString = sourceValue.toString(2) // 将数字转换为二进制字符串
      if (binaryString === 0) {
        return this.$t(
          `AdminService["Enum:TicketOrderSourceFlagType:${binaryString}"]`
        )
      } else {
        const binaryDigits = binaryString.split('') // 将二进制字符串拆分为单个数字
        const result = []
        for (let i = 0; i < binaryDigits.length; i++) {
          if (binaryDigits[i] === '1') {
            result.push(Math.pow(2, binaryDigits.length - 1 - i))
          }
        }
        return result
          .map((x) =>
            this.$t(`AdminService["Enum:TicketOrderSourceFlagType:${x}"]`)
          )
          .join('|')
      }
    },
    maxLength(val, start, end) {
      return val.slice(start, end)
    }
  }
}
</script>
