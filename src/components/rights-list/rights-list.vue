<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class='rightsBread'>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type='index'
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  async created () {
    // 发送请求获取数据  显示在页面上
    const res = await this.$http.get('rights/list')
    const {data} = res.data
    if (res.data.meta.status === 200) {
      // 获取数据成功 将数据现在在页面上
      this.tableData = data
    }
  }
}
</script>
<style>
.rightsBread{
  background-color: #D3DCE6;
  line-height: 3;
  padding-left: 10px;
  font-size: 16px;
}
</style>
