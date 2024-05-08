<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>部门</span>
      </div>
      <div class="text item">
        <div
          v-if="departments.length > 0"
          class="block"
          style="width: 50%"
        >
          <el-tree
            :data="departments"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            @node-click="nodeClick"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
          >
            <span
              slot-scope="{ node, data }"
              class="custom-tree-node"
            >
              <!-- 如果是编辑状态 -->
              <template v-if="data.isEdit == 1">
                <el-input
                  ref="input"
                  v-model="newDisplayName"
                  style="
                                        width: 200px;
                                        height: 20px;
                                        line-height: 20px;
                                    "
                  @blur="() => submitEdit(node, data)"
                />
              </template>
              <!-- 如果不是编辑状态 -->
              <span v-else v-text="data.displayName" />
              <span>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="() => edit(node, data)"
                />
                <el-button
                  type="success"
                  size="mini"
                  icon="el-icon-plus"
                  @click="() => append(node, data)"
                />
                <el-button
                  v-if="data.id != 1"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="() => remove(node, data)"
                />
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from '@/api/identity/departmentOrganizationUnit'
export default {
  name: 'Departments',
  components: {
  },
  data() {
    return {
      departments: [],
      parentId: '10086',
      newDisplayName: '',
      defaultProps: {
        children: 'children',
        displayName: 'displayName'
      }
    }
  },
  created() {
    this.getDepartmentData()
  },
  mounted() {
  },
  methods: {
    // 调api获取接口分组数据
    getDepartmentData() {
      getDepartments()
        .then(response => {
          this.departments = []
          for (let i = 0; i < response.items.length; i++) {
            response.items[i]['isEdit'] = 0
            response.items[i]['isDelete'] = false
          }
          this.departments = response.items
          // console.log('data:', this.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDragStart(node, ev) {
      console.log('drag start', node.data.displayName)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.data.displayName)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.data.displayName)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.data.displayName)
    },
    // 拖拽结束时（可能未成功）触发的事件
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.data.displayName, dropType)
      console.log(draggingNode)
    },
    // 拖拽成功完成时触发的事件
    // 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.data.displayName, dropType)
      // 当放置的位置不是目标位置中时直接取data,反之取父节点data
      console.log('被拖拽节点对应的 Node: ')
      console.log(draggingNode)
      console.log('结束拖拽时最后进入的节点: ')
      console.log(dropNode)
      console.log('被拖拽节点的放置位置（before、after、inner）' + dropType)
      console.log(dropNode.parent.data)
      const data = dropType !== 'inner' ? dropNode.parent.data : dropNode.data
      const params = {
        displayName: draggingNode.data.displayName,
        parentId: data.id
      }
      // 调后端更新
      this.updateDeparmentData(draggingNode.data.id, params)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.id === this.parentId) {
        return false
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      // 顶层默认分组不允许拖拽
      if (draggingNode.data.id === this.parentId) {
        return false
      } else {
        return true
      }
    },
    append(node, data) {
      console.log(node, data)
      const newChild = {
        isEdit: 0,
        displayName: `部门-${node.level}-${node.childNodes.length + 1}`,
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.createDeparmentData(newChild.displayName, data.id).then(res => {
        if (res) {
          data.children.push(newChild)
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    remove(node, data) {
      // console.log(node)
      if (node.childNodes.length > 0) {
        this.$message.error('该部门下有子部门，不允许删除')
        return
      }
      this.$confirm(`确定要删除 ${data.displayName} 部门么？`, '删除部门', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.delDeparmentData(data.id)
          .then(res => {
            if (res) {
              const parent = node.parent
              const children = parent.data.children || parent.data
              const index = children.findIndex(d => d.id === data.id)
              children.splice(index, 1)
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    edit(node, data) {
      console.log(node)
      console.log(
        'before:',
        data.id,
        data.displayName,
        data.isEdit
      )
      this.$set(data, 'isEdit', 1)
      this.newDisplayName = data.displayName
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
      console.log('after:', data.id, data.displayName, data.isEdit)
    },
    submitEdit(node, data) {
      console.log(node)
      if (data.displayName === this.newDisplayName) {
        console.log('没有修改')
        this.newDisplayName = ''
        this.$set(data, 'isEdit', 0)
      } else {
        let parentId = ''
        if (typeof node.parent.data === 'object') {
          parentId = node.parent.data.id
        }
        this.updateDeparmentData(data.id, { displayName: this.newDisplayName, parentId: parentId })
          .then(res => {
            if (res) {
              this.newDisplayName = ''
              this.$set(data, 'displayName', this.newDisplayName)
              this.$set(data, 'isEdit', 0)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    cancelEdit(node, data) {
      this.newDisplayName = ''
      this.$set(data, 'isEdit', 0)
    },
    createDeparmentData(displayName, id) {
      createDepartment({ displayName: displayName, parentId: id })
        .then(response => {
          if (response) {
            this.getDepartmentData()
            return true
          }
        })
        .catch(err => {
          console.log(err)
          return false
        })
    },
    updateDeparmentData(id, data) {
      updateDepartment(id, data)
        .then(response => {
          if (response) {
            this.getDepartmentData()
            return true
          }
        })
        .catch(err => {
          console.log(err)
          return false
        })
    },
    delDeparmentData(id) {
      deleteDepartment(id)
        .then(() => {
          this.getDepartmentData()
          return true
        })
        .catch(err => {
          console.log(err)
          return false
        })
    },
    nodeClick(node, data, obj) {
      console.log('点击了：', node.id, node.displayName)
    }
  }
}
</script>
<style>
.el-input--mini .el-input__inner {
    height: 26px;
    line-height: 26px;
}
</style>
<style lang="scss" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 20px;
}
/* 修改el-input高度，方案二： */
.el-input__inner {
    height: 20px;
}

.el-button--mini {
    padding: 2px 3px;
}
</style>
