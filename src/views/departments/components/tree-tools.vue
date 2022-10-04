<template>
  <el-row type="flex" justify="space-between" align="middle" class="tree-departs">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments';
export default {
  name: 'TreeTools',
  components: {},
  props: {
    treeNode: { // 树节点数据 对象
      type: Object, // 对象类型
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    handleCommand(command) {
      // this.$message('click on item ' + command)
      if (command === 'add') {
        // 点击添加按钮
        // this.showDialog = true
        console.log(this.treeNode)
        this.$emit('showDialogDepart', this.treeNode)
      } else if (command === 'edit') {
        // 点击编辑按钮
        this.$emit('editDepart', this.treeNode)
      } else {
        // 点击删除部门
        console.log(this.treeNode)
        this.$confirm('确定要删除该部门吗', '提示')
          .then( () => {
           return delDepartments(this.treeNode.id) // 返回一个promise，使得接着使用then
          })
          .then( () => {
            // 删除成功后 会到这里
            // 通知父节点
            this.$emit('delDepts')
            this.$message.success('删除部门成功')
          })
          .catch( ()=> {});
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
  .tree-departs{
    width: 100%;
    height: 40px;
  }
</style>
