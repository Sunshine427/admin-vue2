export default {
  data () {
    return {
      rolesList: [],
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '120px',
      addRolesRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请对角色进行描述', trigger: 'blur' },
          { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
        ]
      },
      editRolesForm: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    /*
    获取角色列表
     */
    async loadRolesList () {
      const res = await this.$http.get('/roles')
      const {data} = res.data
      if (res.data.meta.status === 200) {
        this.rolesList = data
      }
    },

    /*
    添加角色
    */
    async handleAddroles (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return false
        }
         // 将数据发送给服务武器
        const res = await this.$http.post('/roles',this.addRolesForm)
        if (res.data.meta.status === 201) {
          // 重新获取数据
          this.loadRolesList()
          // 关闭对话框
          this.dialogFormVisible = false
          // 清空数据
          for (let key in this.addRolesForm) {
            this.addRolesForm[key] = ''
          }
        }
      })
    },

    /*
    删除角色
    */
    async handleDeleteRole (user) {
      const {id:roleId} = user
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 发送请求 删除数据
          const res = await this.$http.delete(`/roles/${roleId}`)
          if (res.data.meta.status === 200) {
            this.loadRolesList()
            this.$message({
              type: 'success',
              message: '删除成功!'
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
    根据id获取角色信息
    */
    async getRoleById (user) {
      this.dialogEditFormVisible = true
      const {id:roleId} = user
      const res = await this.$http.get(`/roles/${roleId}`)
      if (res.data.meta.status === 200) {
        // 获取数据成功
        this.editRolesForm = res.data.data
        console.log(this.editRolesForm)
      }
    },

  /*
  编辑角色
  */
  async handleeditroles (formName) {
    this.$refs[formName].validate(async (valid) => {
      if (!valid) {
        return false
      }
      // 验证通过
      console.log(this.editRolesForm)
      const res = await this.$http.put(`/roles/${this.editRolesForm.roleId}`,this.editRolesForm)
      if (res.data.meta.status === 200) {
        this.loadRolesList()
        this.dialogEditFormVisible = false
      }
    })
   }
  },

  /*
  页面一进入就发送请求 显示角色列表
   */
  async created () {
    this.loadRolesList()
  }
}
