<template>
  <div class="header">
    <div class="header-left">
      <el-input
        v-model="data.search"
        class="w-50 m-2 search-input"
        placeholder="搜索"
        :prefix-icon="Search"
      />
    </div>
    <div class="header-right">
      <div class="header-item" @click="miniApp" title="最小化">
        <el-icon>
          <Minus/>
        </el-icon>
      </div>
      <div class="header-item" v-if="!data.isMax" @click="maxApp" title="最大化">
        <el-icon>
          <FullScreen/>
        </el-icon>
      </div>
      <div class="header-item" v-if="data.isMax" @click="maxApp" title="还原">
        <el-icon>
          <CopyDocument/>
        </el-icon>
      </div>
      <div class="header-item" @click="closeApp" title="关闭">
        <el-icon>
          <Close/>
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'

const data = reactive({
  isMax: false,
  search: ''
})

window.electronAPI.maxHandle((event, value) => {
  if (value) {
    data.isMax = true
  } else {
    data.isMax = false
  }
})

const miniApp = () => {
  window.electronAPI.minApp()
}

const maxApp = () => {
  if (data.isMax) {
    window.electronAPI.unmaxApp()
    data.isMax = false
  } else {
    window.electronAPI.maxApp()
    data.isMax = true
  }
}

const closeApp = () => {
  window.electronAPI.closeApp()
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  -webkit-app-region: drag;

  .header-left, .header-right {
    height: 60px;
    display: flex;
    align-items: center;
    align-content: center;
  }

  .header-item {
    -webkit-app-region: no-drag;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
    color: #676262;

    &:hover {
      color: var(--el-color-primary);
    }

    &:last-child {
      padding: 10px 0 10px 10px;
    }
  }

  .search-input {
    -webkit-app-region: no-drag;
  }
}
</style>
