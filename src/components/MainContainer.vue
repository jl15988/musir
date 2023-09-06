<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="$store.state.pages.caches">
        <component :is="Component" :key="$route.path"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<!--<style lang="scss">-->
<!--@use "src/assets/scss/index";-->
<!--</style>-->
