<template>
  <el-menu
    style="border: none"
    :collapse-transition="false"
    :collapse="props.collapse"
    :default-active="$route.path">
    <template v-for="menu in menus">
      <el-menu-item-group v-if="menu.children" :title="menu.meta.title" :key="menu.path">
      </el-menu-item-group>
      <template v-if="menu.children">
        <router-link v-for="item in menu.children" :to="menu.path + '/' + item.path" :key="item.path">
          <el-menu-item :title="item.meta.title" :index="menu.path + '/' + item.path">
            <el-icon v-if="item.meta.icon">
              <component :is="item.meta.icon"/>
            </el-icon>
            <span>{{item.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
      <router-link v-if="!menu.children && !menu.meta.show" :to="menu.path" :key="menu.path">
        <el-menu-item :title="menu.meta.title" :index="menu.path">
          <el-icon v-if="menu.meta.icon">
            <component :is="menu.meta.icon"/>
          </el-icon>
          <span>{{ menu.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

<!--    <el-menu-item-group title="我的音乐">-->
<!--    </el-menu-item-group>-->
<!--    <el-menu-item title="收藏" index="/favorite">-->
<!--      <el-icon>-->
<!--        <Star/>-->
<!--      </el-icon>-->
<!--      <span>收藏</span>-->
<!--    </el-menu-item>-->
<!--    <el-menu-item title="本地" index="/local">-->
<!--      <el-icon>-->
<!--        <Monitor/>-->
<!--      </el-icon>-->
<!--      <span>本地</span>-->
<!--    </el-menu-item>-->
<!--    <el-menu-item title="最近" index="/lately">-->
<!--      <el-icon>-->
<!--        <Clock/>-->
<!--      </el-icon>-->
<!--      <span>最近</span>-->
<!--    </el-menu-item>-->
<!--    <el-menu-item title="列表" index="/list">-->
<!--      <el-icon>-->
<!--        <Tickets/>-->
<!--      </el-icon>-->
<!--      <span>列表</span>-->
<!--    </el-menu-item>-->

<!--    <el-menu-item-group title="我的歌单">-->
<!--      <el-menu-item v-for="(item, index) in playlist" :key="index" :title="item.title">-->
<!--        <div class="ellipsis-box">{{ item.title }}</div>-->
<!--      </el-menu-item>-->
<!--    </el-menu-item-group>-->
<!--    <el-menu-item title="设置">-->
<!--      <el-icon>-->
<!--        <Operation/>-->
<!--      </el-icon>-->
<!--      <span>设置</span>-->
<!--    </el-menu-item>-->
  </el-menu>
</template>

<script lang="ts" setup>

import { defineProps, toRefs } from 'vue'
import routes from '@/router/routes'

const props = defineProps({
  collapse: Boolean
})

const playlist = [{
  title: '全部'
}, {
  title: '喜欢'
}]

const menus = routes.map(item => {
  // if (item.path === '/mySheet') {
  //   for (let play of playlist) {
  //     item.children.push({
  //       path: ''
  //     })
  //   }
  // }
  return item
})

</script>

<style scoped>

</style>
