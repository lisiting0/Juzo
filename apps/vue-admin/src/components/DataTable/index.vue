<template>
  <div class="app-container">
    <el-row class="mb-15">
      <template v-if="batchOperationText">
        <el-button type="primary" plain size="small" @click="confirm()">
          {{ batchOperationText }}
        </el-button>
        <span v-if="batchOperationTip" style="margin-left: 10px;font-size: 12px;color: red">{{ batchOperationTip }}</span>
        <template v-if="tableKey === 'Recycling'">
          <el-button
            type="warning"
            plain
            size="small"
            @click="cancel()"
          >取消回收
          </el-button>
        </template>
        <template v-if="tableKey === 'BlackScreenConfiguration'">
          <el-button
            type="warning"
            plain
            size="small"
            @click="cancel()"
          >下线
          </el-button>
        </template>
        <template v-if="showDownloadTemplate">
          <el-button type="info" size="small" @click="download()">模板下载</el-button>
        </template>
      </template>
    </el-row>

    <el-table
      v-loading="loading"
      :table-key="tableKey"
      :data="tableData"
      :row-style="{ height: '5px' }"
      :cell-style="{ padding: '5px' }"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 第一列可以显示的内容 -->
      <el-table-column
        v-if="mode && mode === 'select'"
        fixed
        type="selection"
        width="55"
        class="selection"
        prop="id"
      />
      <template v-if="mode && (mode === 'edit' || mode === 'editDelete')">
        <el-table-column
          fixed
          align="center"
          prop="action"
          label="操作"
          :width="
            tableKey === 'inventory' ||
              tableKey === 'InsuranceConfiguration' ||
              tableKey === 'DistributionAccount' ||
              tableKey === 'PlatformAnnouncement' ||
              tableKey === 'issue' ||
              tableKey === 'change' ||
              tableKey === 'refund' ||
              tableKey === 'Policy' ||
              tableKey === 'quality-orders-management'
              ? 200
              : tableKey === 'flightChangeNotification' ||
                tableKey === 'creditManagement'
                ? 250
                : tableKey === 'Account' || tableKey === 'Roles'
                  ? 300
                  : 150
          "
        >
          <template slot-scope="scope">
            <template v-if="tableKey === 'issue' || tableKey === 'change' || tableKey === 'refund'">
              <el-button
                v-if="!scope.row.lockUserId || scope.row.lockUserId === currentUser"
                type="primary"
                size="mini"
                @click="edit(scope.row)"
              >
                {{ $t('table.handle') }}
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="detail(scope.row)"
              >
                详情
              </el-button>
              <el-button
                v-if="(tableKey === 'issue' && scope.row.orderStatus in [0, 1])
                  || (tableKey === 'change' && scope.row.orderStatus in [0, 1, 2, 3])
                  || (tableKey === 'refund' && scope.row.orderStatus in [0, 1, 2])"
                type="danger"
                size="mini"
                @click="del(scope.row)"
              >
                {{ $t('table.cancel') }}
              </el-button>
              <el-button
                v-if="scope.row.lockUserId && scope.row.lockUserId !== currentUser"
                type="success"
                plain
                size="mini"
                @click="unlock(scope.row)"
              >
                解锁
              </el-button>
            </template>
            <template v-if="tableKey === 'Policy'">
              <el-button
                type="success"
                size="mini"
                @click="edit(scope.row)"
              >
                {{ $t('table.edit') }}
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="copy(scope.row)"
              >
                复制
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="del(scope.row)"
              >
                {{ $t('table.delete') }}
              </el-button>
            </template>

            <template v-else-if="tableKey === 'AgentConfiguration' || tableKey === 'SupplierConfiguration'">
              <el-button
                :type="scope.row.enabled ? 'danger' : 'success'"
                plain
                size="mini"
                @click="del(scope.row)"
              >
                {{ scope.row.enabled ? '取消关联' : '关联' }}
              </el-button>
            </template>
            <template v-else-if="tableKey === 'RegistrationAudit'">
              <el-button
                v-if="scope.row.status !== 0"
                type="success"
                size="mini"
                @click="detail(scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                v-if="scope.row.status === 0"
                type="primary"
                plain
                size="mini"
                @click="copy(scope.row)"
              >
                审核
              </el-button>
            </template>
            <template v-else-if="tableKey === 'creditReview'">
              <el-button
                v-if="scope.row.auditStatus !== 0"
                type="success"
                size="mini"
                @click="detail(scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
              <el-button
                v-if="scope.row.auditStatus === 0"
                type="primary"
                plain
                size="mini"
                @click="copy(scope.row)"
              >
                审核
              </el-button>
            </template>
            <template v-else-if="tableKey === 'creditManagement'">
              <el-button
                type="primary"
                size="mini"
                @click="edit(scope.row)"
              >
                充值余额
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="copy(scope.row)"
              >
                增加授信
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="detail(scope.row)"
              >
                {{ $t('table.detail') }}
              </el-button>
            </template>
            <template v-else-if="tableKey === 'issueTicketSelfConfiguration'">
              <el-button
                type="primary"
                size="mini"
                @click="edit(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="del(scope.row)"
              >
                删除
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="copy(scope.row)"
              >
                关联航司返点
              </el-button>
            </template>
            <template v-else-if="tableKey === 'flightChangeNotification'">
              <el-button
                type="primary"
                size="mini"
                @click="edit(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="del(scope.row)"
              >
                发布
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="detail(scope.row)"
              >
                匹配订单
              </el-button>
            </template>
            <template v-else-if="tableKey === 'inventory'">
              <!--              <el-button-->
              <!--                v-if="scope.row.ticketStockAuditStatus === 0"-->
              <!--                type="success"-->
              <!--                size="mini"-->
              <!--                @click="edit(scope.row)"-->
              <!--              >-->
              <!--                {{ $t('table.edit') }}-->
              <!--              </el-button>-->
              <el-button
                v-if="scope.row.ticketStockAuditStatus === 0"
                type="primary"
                plain
                size="mini"
                @click="detail(scope.row)"
              >
                审核
              </el-button>
              <!--              <el-button-->
              <!--                type="warning"-->
              <!--                size="mini"-->
              <!--                @click="del(scope.row)"-->
              <!--              >-->
              <!--                作废-->
              <!--              </el-button>-->
            </template>
            <template v-else-if="tableKey === 'Roles'">
              <el-button
                type="success"
                size="mini"
                @click="edit(scope.row)"
              >
                {{ $t('table.edit') }}
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="del(scope.row)"
              >
                删除
              </el-button>
              <el-button
                type="primary"
                plain
                size="mini"
                @click="copy(scope.row)"
              >
                分配权限
              </el-button>
              <!-- <el-button
                                    type="success"
                                    plain
                                    size="mini"
                                    @click="detail(scope.row)"
                                  >
                                    设置账号
                                  </el-button> -->
            </template>
            <template v-else-if="tableKey === 'Account' || tableKey === 'DistributionAccount'">
              <el-button
                type="success"
                size="mini"
                @click="edit(scope.row)"
              >
                {{ $t('table.edit') }}
              </el-button>
              <template v-if="tableKey === 'DistributionAccount'">
                <el-button
                  type="danger"
                  size="mini"
                  @click="del(scope.row)"
                >
                  删除
                </el-button>
                <el-button
                  :type="scope.row.disabled ? 'success' : 'danger'"
                  size="mini"
                  plain
                  @click="copy(scope.row)"
                >
                  {{ !scope.row.disabled ? '禁用' : '启用' }}
                </el-button>
              </template>
              <template v-if="tableKey === 'Account'">
                <el-button
                  :type="!scope.row.isActive ? 'success' : 'danger'"
                  size="mini"
                  plain
                  @click="del(scope.row)"
                >
                  {{ scope.row.isActive ? '禁用' : '启用' }}
                </el-button>
                <el-button
                  type="warning"
                  size="mini"
                  @click="detail(scope.row)"
                >
                  密码重置
                </el-button>
                <el-button
                  type="primary"
                  plain
                  size="mini"
                  @click="copy(scope.row)"
                >
                  权限设置
                </el-button>
              </template>
            </template>
            <template v-else-if="tableKey === 'del-account'">
              <el-button
                type="danger"
                size="mini"
                @click="del(scope.row)"
              >
                {{ $t('table.delete') }}
              </el-button>
            </template>
            <template v-else-if="tableKey === 'add-account'">
              <el-button
                type="success"
                size="mini"
                @click="edit(scope.row)"
              >
                添加
              </el-button>
            </template>
            <template v-else-if="tableKey === 'AvoidanceInquiry'">
              <el-button
                v-if="scope.row.voidedTicketProveStatus in [0, 1]"
                type="success"
                plain
                size="mini"
                @click="detail(scope.row)"
              >
                审核
              </el-button>
            </template>
            <template v-else-if="tableKey === 'PlatformAnnouncement'">
              <el-button
                v-if="scope.row.status === 0"
                type="success"
                size="mini"
                @click="edit(scope.row)"
              >
                {{ $t('table.edit') }}
              </el-button>
              <el-button
                v-if="scope.row.status !== 0"
                type="success"
                plain
                size="mini"
                @click="detail(scope.row)"
              >
                详情
              </el-button>
              <el-button
                v-if="scope.row.status === 0"
                type="primary"
                plain
                size="mini"
                @click="copy(scope.row)"
              >
                发布
              </el-button>
              <el-button
                v-if="scope.row.status !== 2"
                type="danger"
                plain
                size="mini"
                @click="del(scope.row)"
              >
                取消
              </el-button>
            </template>
            <template v-else-if="tableKey === 'quality-orders-management'">
              <el-button
                v-if="scope.row.qualityCheckStatus === 0"
                type="primary"
                plain
                size="mini"
                @click="copy(scope.row)"
              >
                审核
              </el-button>
              <el-button
                v-if="scope.row.qualityCheckStatus === 0"
                type="danger"
                size="mini"
                @click="del(scope.row)"
              >
                取消
              </el-button>
              <el-button
                v-if="scope.row.qualityCheckStatus !== 0"
                type="success"
                size="mini"
                @click="detail(scope.row)"
              >
                详情
              </el-button>
              <el-button
                v-if="scope.row.qualityCheckStatus === 1 && scope.row.qualityCheckType === 1"
                type="primary"
                plain
                size="mini"
                @click="lock(scope.row)"
              >
                处理
              </el-button>
              <el-button
                v-if="scope.row.qualityCheckStatus === 0"
                type="primary"
                size="mini"
                @click="edit(scope.row)"
              >
                {{ $t('table.edit') }}
              </el-button>
            </template>
            <template v-else>
              <el-button
                type="success"
                size="mini"
                @click="edit(scope.row)"
              >
                {{ $t('table.edit') }}
              </el-button>
              <template v-if="tableKey === 'InsuranceConfiguration'">
                <el-button
                  v-if="mode === 'editDelete'"
                  :type="scope.row.status === 0 ? 'success' : 'warning'"
                  plain
                  size="mini"
                  @click="detail(scope.row)"
                >
                  {{ scope.row.status === 0 ? '启售' : '停售' }}
                </el-button>
              </template>
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
        :key="column.prop + column.objectValue"
        :fixed="column.fixed"
        :width="column.width"
        :label="getHeader(column)"
        :align="column.align"
      >
        <template slot-scope="scope">
          <template v-if="column.prop === 'action'">

            <template v-if="tableKey === 'BlackScreenConfiguration'">
              <el-button
                type="success"
                size="mini"
                @click="edit(scope.row)"
              >
                {{ $t('table.edit') }}
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="del(scope.row)"
              >
                {{ $t('table.delete') }}
              </el-button>
            </template>
          </template>
          <template v-else>
            <template v-if="column.fieldType === 'other' || column.fieldType === 'group'">
              <template v-if="tableKey === 'NotificationConfiguration' && column.prop === 'organizationId'">
                <organization :organization-id="scope.row.organizationId" /></template>
              <template v-if="tableKey === 'Notification' && column.prop === 'ticketAgentId'">
                <organization :organization-id="scope.row.ticketAgentId" />
              </template>
              <template v-if="tableKey === 'issue' && column.prop === 'policyCode'">
                <policyName v-if="scope.row.policyCode" :policy-id="scope.row.policyCode" />
              </template>
              <template v-if="(tableKey === 'refund-report' || tableKey === 'issue-report' || tableKey === 'transaction-flow-report') && column.prop === 'remark'">
                <el-popover
                  placement="top-start"
                  title="备注"
                  width="500"
                  trigger="hover"
                  class="el-tooltip"
                  :content="scope.row.remark"
                >
                  <div slot="reference">{{ scope.row.remark | maxLength(30) }}</div>
                </el-popover>
              </template>
              <!-- 特殊情况已处理过，直接输出即可 -->
              <template v-else>
                <div v-html="getCellContent(column, scope.row)" />
              </template>
            </template>
            <template v-else>
              <div :class="column.class">
                {{ getCellContent(column, scope.row) }}
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
import Organization from '@/components/Organization'
import ApplicableProductsEnum from '@/enum/applicableProducts'
import PolicyName from '@/components/BaseName/PolicyName'
export default {
  name: 'DataTable',
  components: {
    Organization,
    PolicyName
  },
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
      default: null // 批量操作文字
    },
    batchOperationTip: {
      type: String,
      required: false,
      default: null // 批量操作文字
    },
    showDownloadTemplate: {
      type: Boolean,
      required: false,
      default: false
    },
    onEdit: {
      type: Function,
      default: () => { }
    },
    onDelete: {
      type: Function,
      default: () => { }
    },
    onCopy: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
      multipleSelection: [],
      currentUser: ''
    }
  },
  watch: {},
  mounted() {
    this.currentUser = this.$store.getters.abpConfig.currentUser.id
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
          if (item[col.prop] !== null) {
            return moment(item[col.prop])
              .endOf('day')
              .format('YYYY-MM-DD HH:mm:ss')
          }
          return ''
        case 'dateYMD':
          if (item[col.prop] !== null) {
            return moment(item[col.prop]).format('YYYY-MM-DD')
          }
          return
        case 'number':
          return item[col.prop]
            ? item[col.prop].toFixed(col.precision || 3)
            : ''
        case 'enum':
          if (item[col.prop] !== undefined && item[col.prop] !== null) {
            return this.$t(
              `${col.enumNamespace}["Enum:${col.enumType}:${item[col.prop]}"]`
            )
          } else {
            return
          }
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
        case 'object':
          switch (col.objectFieldType) {
            case 'boolean':
              if (col.booleanOptions) {
                const mappings = col.booleanOptions.split('|')
                if (typeof item[col.prop][col.objectValue] === 'boolean') {
                  const arr = mappings.find(
                    (x) =>
                      x.indexOf(item[col.prop][col.objectValue] + '') !== -1
                  )
                  if (arr) {
                    const splitArr = arr.split(
                      item[col.prop][col.objectValue] + ''
                    )
                    return splitArr[1]
                  }
                } else {
                  const index = parseInt(item[col.prop][col.objectValue])
                  if (index >= 0 && index < mappings.length) {
                    return mappings[index].split(index)[1]
                  }
                }
                return
              }
              return item[col.prop] ? '是' : '否'
            case 'enum':
              if (item[col.prop]) {
                return this.$t(`${col.enumNamespace}["Enum:${col.enumType}:${item[col.prop][col.objectValue]}"]`)
              }
              return
            default:
              return item[col.prop] ? item[col.prop][col.objectValue] : null
          }
        case 'other':
          if (col.prop === 'surnamename') {
            let name = ''
            if (item['surname']) {
              name = item['surname']
            }
            if (item['name']) {
              name += item['name']
            }
            return name
          } else if (col.prop === 'roles') {
            return item[col.prop].map((x) => x.name).join('|')
          } else if (col.prop === 'sources') {
            return this.getFlagType(
              item[col.prop],
              'TicketPriceSourceType',
              'AdminService'
            )
          } else if (col.prop === 'organizationId') {
            return item[col.prop]
          } else if (col.prop === 'applicableProduct') {
            return this.getKeysByValues(
              ApplicableProductsEnum.ApplicableProducts,
              item[col.prop]
            )
          } else if (col.prop === 'cabinClass') {
            return this.getFlagType(
              item[col.prop],
              'CabinClassFlagType',
              'Juzo'
            )
          } else if (
            col.prop === 'passengerType' ||
            col.prop === 'passengerTypes'
          ) {
            return this.getFlagType(item[col.prop], 'PassengerTypeFlag', 'Juzo')
          }
          return
        case 'array':
          if (item[col.prop] != null) {
            return this.convertToWeekdays(item[col.prop])
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
                  return ''
                case 'dateYMD':
                  if (item[x.prop]) {
                    return moment(item[x.prop]).format('YYYY-MM-DD')
                  }
                  return ''
                case 'number':
                  return item[x.prop]
                    ? item[x.prop].toFixed(col.precision || 3)
                    : ''
                case 'enum':
                  if (item[x.prop] != null) {
                    return this.$t(`${x.enumNamespace}["Enum:${x.enumType}:${item[x.prop]}"]`)
                  }
                  return ''
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
                  if (item[x.prop]) {
                    if (x.class) {
                      return ('<span class=' + x.class + '>' + item[x.prop] + '</span>')
                    }
                    return item[x.prop]
                  }
                  return ''
              }
            })
            .join('\n')
        default: // text
          return item[col.prop] ?? ''
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    edit(row) {
      // 发送自定义事件，并传递参数
      this.$emit('on-edit', row)
    },
    lock(row) {
      // 发送自定义事件，并传递参数
      this.$emit('on-lock', row)
    },
    unlock(row) {
      // 发送自定义事件，并传递参数
      this.$emit('on-unlock', row)
    },
    detail(row) {
      // 发送自定义事件，并传递参数
      this.$emit('on-detail', row)
    },
    copy(row) {
      // 发送自定义事件，并传递参数
      this.$emit('on-copy', row)
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
    convertToWeekdays(arr) {
      const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      const result = []
      for (let i = 0; i < arr.length; i++) {
        const index = Math.log2(arr[i]) // 获取对应的索引
        result.push(weekdays[index])
      }
      return result.join(' ')
    },
    getFlagType(binaryNumber, enumType, enumNamespace) {
      if (parseInt(binaryNumber) === 0) {
        return this.$t(`${enumNamespace}["Enum:${enumType}:${binaryNumber}"]`)
      } else {
        const result = []
        // 取二进制数的最低位第0位）
        var bit1 = binaryNumber & 1
        if (bit1) {
          result.push(bit1)
        }
        // 取二进制数的第2位
        var bit2 = binaryNumber & 2
        if (bit2) {
          result.push(bit2)
        }
        // 取二进制数的第4位
        var bit4 = binaryNumber & 4
        if (bit4) {
          result.push(bit4)
        }
        // 取二进制数的第8位
        var bit8 = binaryNumber & 8
        if (bit8) {
          result.push(bit8)
        }
        // 取二进制数的第16位
        var bit16 = binaryNumber & 16
        if (bit16) {
          result.push(bit16)
        }
        return result
          .map((x) => this.$t(`${enumNamespace}["Enum:${enumType}:${x}"]`))
          .join('|')
      }
    },
    getKeysByValues(obj, values) {
      if (values) {
        return Object.keys(obj)
          .filter((key) => values.includes(obj[key]))
          ?.join('|')
      }
    }
  }
}
</script>
