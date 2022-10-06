<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" @addDept="handleAddDept" />
    </el-card>
    <el-tree :data="departs" :default-expand-all="true" :props="defaultProps" @refreshList="getDepartments">
      <tree-tools slot-scope="{data} " :tree-node="data" @addDept="handleAddDept" @editDept="editDept" />
    </el-tree>
    <add-dept ref="addDept" :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
  </div>

</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: { treeTools, AddDept },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [],
      defaultProps: {
        label: 'name'
      },
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyManage, companyName } = await getDepartments()
        this.departs = tranListToTreeData(depts, '')
        this.company = { name: companyName, manager: companyManage, id: '' }
      } finally {
        this.loading = false
      }
    },
    handleAddDept(treeNode) {
      this.dialogVisible = true
      this.currentNode = treeNode
    },
    editDept(node) {
      this.dialogVisible = true
      this.currentNode = node
      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss" scoped>
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      padding-right: 20px;
    }
  }
}
</style>
