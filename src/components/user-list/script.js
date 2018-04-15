export default {
  data () {
    return {
      inputText: '',
      tableData: [],
      currentPage: 1,
      pageSize: 1,
      totalSize: 0,
      dialogFormVisible: false,
      editChange: false,
      userData: {
        username: '',
        email: '',
        mobile: ''
      },
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      // 校验输入的数据是否符合规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入活电话', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /*
    每页尺寸发生变化的时候
     */
    handleSizeChange (changeSize) {
      this.pageSize = changeSize
      // 告诉服务器更新的是第一页的数据
      this.loadUserByPage(1, changeSize)
      // 将视图中1的页吗高亮
      this.currentPage = 1
    },

    /*
    页码发生变化的时候
     */
    handleCurrentChange (val) {
      // 每点击一次就要发送一次请求
      this.loadUserByPage(val, this.pageSize)
      // 只有数据改变的时候 视图才会变化
      this.currentPage = val
    },

    /*
    发送请求 获取用户数据
     */
    async loadUserByPage (pagenum, pagesize) {
      // 通过axios的实例中发送请求
      const res = await this.$http.get('/users', {
        params: {
          pagenum,
          pagesize,
          query: this.inputText
        }
      })
      // console.log(res)
      const {data} = res.data
      const {total} = data
      // console.log(total)
      this.tableData = data.users
      this.totalSize = total
    },

    /*
    添加用户
     */
    async handleAddUser (formData) {
      console.log(formData)
      // 只有验证通过才能添加成功
      this.$refs[formData].validate(async (valid) => {
        // console.log(valid)
        if (!valid) {
          // 如果验证失败 什么也不做 取消提交表单的默认事件
          return false
        }
        // 点击确定时 发送请求 更改数据 提示成功或者失败
        const res = await this.$http.post('/users', this.form)
        // console.log(res)
        if (res.data.meta.status === 201) {
          // 创建成功 取消弹出框  刷新页面
          this.loadUserByPage(1, this.pageSize)
          this.dialogFormVisible = false

          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 添加成功后清除表单数据
          for (let key in this.form) {
            this.form[key] = ''
          }
        }
      })
    },

    /*
    删除用户
     */
    async deleteUser (id) {
      // console.log(id)
      this.$confirm('确定要删除该用户吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认发送请求  删除数据  返回结果
        const res = await this.$http.delete(`/users/${id}`)
        if (res.data.meta.status === 200) {
          // 重新渲染页面
          this.loadUserByPage(this.currentPage, this.pageSize)
          this.$message({
            type: 'success',
            message: '删除用户成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    /*
    通过id获取用户信息
     */
    async getUserByid (id) {
      const res = await this.$http.get(`/users/${id}`)
      // 将获取的数据渲染在页面上
      // console.log(res)
      this.userData = res.data.data
      this.editChange = true
    },

    /*
    保存编辑的信息
     */
    async saveEdit (formData) {
      this.$refs[formData].validate(async (valid) => {
        if (!valid) {
          return false
        }
        // 从userData中获取id
      const {id:userId} = this.userData
      const res = await this.$http.put(`users/${userId}`,this.userData)
      if (res.data.meta.status === 200) {
        // 重新加载数据
        this.loadUserByPage(this.currentPage, this.pageSize)
        this.editChange = false
        this.$message({
          type: 'success',
          message: '编辑成功!'
        })
      }
    })
  },

    /*
    搜索用户信息
     */
    async handleSearch () {
      this.loadUserByPage(1, this.pageSize)
    },

    /*
    更改用户状态
     */
    async handleChangeSate (val,user) {
      console.log(val,user)
      // scope.row里面是用户的所有信息
      const res = await this.$http.put(`/users/${user.id}/state/${user.mg_state}`)
      // val为当前用户的状态
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户已更改为${val?'开启':'禁用'}状态`
        })
      }
    }
  },
  async created () {
    // 页面一开始就显示每页1条，在第一页
    this.loadUserByPage(1, 1)
  }
}
