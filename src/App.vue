<template>
  <el-container>
    <el-aside class="page-aside" :class="{'collapse': data.collapse}">
      <header-logo :collapse="data.collapse"></header-logo>
      <div class="aside-menu-box">
        <sidebar :collapse="data.collapse"></sidebar>
      </div>
    </el-aside>
    <el-container>
      <el-header height="60px">
        <page-header></page-header>
      </el-header>
      <el-main class="page-main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
@use "assets/scss/index";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body {
  padding: 0;
  margin: 0;
}

.page-aside {
  height: 100vh;
  border-right: 1px solid rgba(0, 0, 0, .1);
  overflow-x: hidden;
  overflow-y: auto;
  width: auto !important;

  .aside-menu-box {
    width: 240px;
    transition: width .2s;
  }

  &.collapse .aside-menu-box {
    width: 64px;
  }
}

.page-main {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
<script lang="ts" setup>
import Sidebar from '@/components/Sidebar/Sidebar'
import PageHeader from '@/components/PageHeader/PageHeader'
import HeaderLogo from '@/components/HeaderLogo/HeaderLogo'
import { onBeforeMount, reactive } from 'vue'

const data = reactive({
  collapse: false
})

onBeforeMount(() => {
  window.addEventListener('resize', onResize)
})

const onResize = () => {
  if (document.documentElement.clientWidth < 900) {
    data.collapse = true
  } else {
    data.collapse = false
  }
}
</script>
