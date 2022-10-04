<template>
  <div class="department-containor"  v-loading="loading">
    <el-card class="tree-card">
      <tree-tools :tree-node="company" :is-root="true" @showDialogDepart="addDepart" @addDepats="getDepartments" />
      <el-tree
        :data="departs"
        :props="defaultProps"
        :default-expand-all="true"
      >
        <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @showDialogDepart="addDepart" @editDepart="editDepart"></tree-tools>
      </el-tree>
      <!-- 新增修改 部门 窗体 -->
      <add-depart :showDialog.sync="showDialog" :tree-node="node" @addDepats="getDepartments" ref="addDepart"></add-depart>
    </el-card>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import addDepart from './components/add-depart.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: 'DepartmentsIndex',
  components: {
    TreeTools,
    addDepart
  },
  props: {},
  data() {
    return {
      company: {},
      departs: [], // 树形结构 数据
      defaultProps: {
        // children: 'manager',
        label: 'name'
      },
      showDialog: false, // 控制新增修改 窗体 显示隐藏
      node: {}, // 点击的当前部门
      loading: false // 用来控制进度弹层的显示和隐藏
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDepartments()
  },
  mounted() {},
  methods: {
    // handleNodeClick() {},
    // 获取部门数据
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      console.log(result)
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
      this.loading = false
    },
    // 触发 添加部门窗口
    addDepart(node) {
      console.log(node)
      this.showDialog = true
      this.node = node
    },
    // 编辑部门
    editDepart(node) {
      this.showDialog = true
      this.node = node
      // 直接调用子组件中的方法 传入一个id
      this.$refs.addDepart.getDepartDetail(node.id)
      console.log(this.$refs.addDepart)
    }
  }
}
</script>
<style lang="scss" scoped>
  .department-containor{
    .tree-card{
      padding: 30px  140px;
      font-size:14px;
      .tree-header{
        height: 50px;
      }
    }
  }
</style>
