<template>
  <div class="header-logo">
    <img :src="require('@/assets/logo.png')">
    <transition-group name="logo-title">
      <h1 v-if="!props.collapse" key="header-title">Musir</h1>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  collapse: Boolean
})
</script>

<style lang="scss" scoped>
.header-logo {
  text-align: center;
  line-height: 60px;
  font-weight: bolder;

  h1 {
    font-size: 20px;
    display: inline-block;
    margin: 0;
  }

  img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
