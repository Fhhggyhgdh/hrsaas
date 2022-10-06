<template>
  <el-row type="flex" justify="space-around" align="middle" style="height:40px;width:100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <el-col>
          <span>{{ treeNode.manager }}</span>
        </el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        // 添加
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // 编辑
        this.$emit('editDept', this.treeNode)
      } else {
        // 删除
        // 二次确认
        this.$confirm('是否确认删除该部门', '提示', {
          type: 'warning'
        }).then(async res => {
          return delDepartments(this.treeNode.id)
        }).then(res => {
          this.$message.success('删除成功')
          this.$emit('refreshList')
        })
        // 调用删除接口
      }
    }
  }

}
</script>

<style>

</style>
