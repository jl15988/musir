<template>
  <el-menu
    style="border: none; overflow-x: hidden;"
    :collapse-transition="false"
    :collapse="props.collapse"
    :default-active="$route.path"
    router>
    <template v-for="menu in menus">
      <el-menu-item-group
        v-if="menu.children && !menu.meta.hide"
        :title="menu.meta.title"
        :key="menu.path">
      </el-menu-item-group>
      <template v-if="menu.children">
        <template v-for="item in menu.children">
          <div
            v-if="item.meta.noList"
            :key="item.path"
            title="添加歌单">
            <el-button size="small" text style="width: 100%; padding: 20px 0;" @click="addFile">
              <el-icon>
                <Plus/>
              </el-icon>
              <span v-if="!props.collapse">点击添加</span>
            </el-button>
          </div>
          <el-menu-item
            v-if="!item.meta.hide && !item.meta.noList"
            :title="item.meta.title"
            :index="menu.path + '/' + item.path"
            :key="item.path">
            <el-icon v-if="item.meta.icon">
              <component :is="item.meta.icon"/>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
      <el-menu-item
        v-if="!menu.children && !menu.meta.hide"
        :title="menu.meta.title"
        :index="menu.path"
        :key="menu.path">
        <el-icon v-if="menu.meta.icon">
          <component :is="menu.meta.icon"/>
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import routes from '@/router/routes'
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  collapse: Boolean
})

const playlist: any[] = []

const plays = playlist.map(play => {
  return {
    path: '/mySheet/list?uid=' + play.uid,
    component: () => (''),
    meta: {
      title: play.title
    }
  } as RouteRecordRaw
})

const menus = routes.map(item => {
  if (item.path === '/mySheet') {
    if (plays && plays.length > 0) {
      item.children = item.children?.concat(plays)
    } else {
      item.children?.push({
        path: '',
        component: () => (''),
        meta: {
          noList: true
        }
      })
    }
  }
  return item
})

const addFile = () => {
  console.log(111)
  window.electronAPI.scanLocal()
}

</script>

<style scoped>

</style>
