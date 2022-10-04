<template>
  <el-dialog :title="titleText" :visible="showDialog">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="部门名称" prop="name">
        <el-input style="width:80%"  v-model="ruleForm.name" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width:80%" v-model="ruleForm.code" placeholder="1-50个字符"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- <el-input style="width:80%" v-model="ruleForm.manager"></el-input> -->
        <el-select v-model="ruleForm.manager" placeholder="请选择" @focus="getEmployeeSimples">
          <el-option
            v-for="item in emplayeesList"
            :key="item.id"
            :label="item.username"
            :value="item.username">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input style="width:80%" type="textarea" :rows="3" v-model="ruleForm.introduce" placeholder="1-300个字符"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancelForm('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'

export default {
  name: 'AddDepart',
  components: {},
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      required: true
    } // 当前操作的节点
  },
  data () {
    var checkNameRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      // value是输入的部门名称
      const { depts } = await getDepartments()
       // 如何去找技术部所有的子节点
       let isRepeat = false
       if (this.ruleForm.id) {
        // 编辑部门
        // 除自身之外，其他同级部门不能重名
        isRepeat = depts.filter(item => item.id !== this.treeNode.id && item.pid === this.treeNode.id).some(item => item.name === value)
       } else {
        // 新增部门
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
       }
      // const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      // 必须返回callback() 表示结束
      isRepeat ? callback(new Error(`同级部门已经存在${value}部门了`)) : callback()
    }
    var checkCodeRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      // value是输入的部门名称
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.ruleForm.id) {
        isRepeat = depts.some(item => item.code === value && value && item.code !== this.treeNode.code)
      } else {
        isRepeat = depts.some(item => item.code === value && value)
      }
      // const isRepeat = depts.some(item => item.code === value && value)
      // 必须返回callback() 表示结束
      isRepeat ? callback(new Error(`同级部门已经存在${value}编码了`)) : callback()
    } 
    return {
      ruleForm: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name:[
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '要求1-50个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code:[
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '要求1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager:[
          { required: true, message: '部门负责人不能为空', trigger: 'blur'},
          { min: 1, max: 50, message: '要求1-50个字符', trigger: 'blur' }
        ],
        introduce:[
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '要求1-300个字符', trigger: 'blur' }
        ]
      },
      emplayeesList: {} // 员工列表
    }
  },
  watch: {},
  computed: {
    titleText: function() { return this.ruleForm.id ? '编辑部门' : '新增子部门'}
  },
  methods: {
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate( async (isOk) => {
        if (isOk) {
          // 提交成功
          if (this.ruleForm.id) {
            // id存在，表示是编辑界面
            await updateDepartments(this.ruleForm)
            // this.$emit('updateDepats' )
          } else {
            // 新增子部门
            // 调用新增接口，添加父部门的id
            await addDepartments({ ...this.ruleForm, pid: this.treeNode.id})
          }
           // 告诉父组件，重新拉取数据
          this.$emit('addDepats' )
          this.$emit('update:showDialog', false)
          this.$refs.ruleForm.resetFields()
        } else {
          // console.log('error submit!!');
          // 提交失败
          return false;
        }
      })
    },
    // 取消提交
    cancelForm() {
      this.ruleForm = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.ruleForm.resetFields() // 重置校验字段
      this.$emit('update:showDialog', false) // 关闭
   },
    // 获取员工简单信息
    async getEmployeeSimples() {
      const result = await getEmployeeSimple()
      this.emplayeesList = result
    },
    // 根据id获取部门详情
    async getDepartDetail(id) {
      this.ruleForm = await getDepartDetail(id)
    }
  },
  created () {
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
</style>
