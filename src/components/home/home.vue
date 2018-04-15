<template>
  <el-container class='outer'>
    <el-header class='header'>
      <el-row>
        <el-col :span="4"><img src="./logo.png"></el-col>
        <el-col :offset="18" :span="2" class='logout'><a href="#" @click='handleLogout'>退出</a></el-col>
      </el-row>
    </el-header>
    <el-container class='wrap'>
      <el-aside width="200px" class='sideBar'>
        <el-menu
          :unique-opened='true'
          :router='true'
          default-active="2"
          class="el-menu-vertical-demo ulList"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="/roles">角色列表</el-menu-item>
              <el-menu-item index="2-2">权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="3-1">商品列表</el-menu-item>
              <el-menu-item index="3-2">商品分类</el-menu-item>
              <el-menu-item index="3-3">商品参数</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
              <el-menu-item index="1-1">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
              <el-menu-item index="1-1">数据报表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class='main'>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 引入auth的文件
import {removeToken} from '@/assets/js/auth.js'
export default {
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    /*
    退出登陆
     */
    handleLogout () {
      // 将token从本地删除
      removeToken()
      this.$router.push('/login')
    }
  }
}
</script>
<style>
.outer{
  height: 100%;
}
.wrap{
  height: 100%;
}
.header{
  background-color: #B3C0D1;
}
.sideBar{
  background-color: #D3DCE6;
}
.sideBar span{
  color: #fff;
}
.main{
  background-color: #E9EEF3;
}
.logout{
  line-height: 60px;
}
.ulList{
  height: 100%;
  background-color: #545c64;
}
</style>
