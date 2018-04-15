<template>
  <div class='login-wrap'>
    <el-form class='login-form' :rules="loginRules" ref="loginForm" :model="form" label-width="80px">
      <h2 class='login-header'>管理员登陆</h2>
      <el-form-item label="用户名" prop='username'>
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='password'>
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class='login-btn' type="primary" @click="onSubmit('loginForm')">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 引入auth文件中存储token的文件
import {saveUserInfo} from '@/assets/js/auth.js'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    async onSubmit (formData) {
      // 表单验证
       this.$refs[formData].validate(async (valid) => {
        if (!valid) {
          return false
        }
        const res = await this.$http.post('/login', this.form)
        const {data} = res
        console.log(data)
        if (data.meta.status === 200) {
          // 登陆成功 将token保存到本地，跳转到home页
          saveUserInfo(data.data)
          this.$router.push({
            name: 'home'
          })
        }
      })

    }
  }
}
</script>
<style>
.login-wrap{
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form{
  background-color: #fff;
  width: 400px;
  padding: 20px;
  padding-right: 30px;
}
.login-header{
  padding: 0;
  margin: 0;
  text-align: center;
  margin-bottom: 20px
}
.login-btn{
  width: 100%;
}
</style>
