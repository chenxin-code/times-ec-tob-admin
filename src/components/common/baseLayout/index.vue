<template>
  <a-layout class="base-layout">
    <a-layout-header class="base-layout-header" v-if="header">
      <slot name="header">
        <div class="base-layout-header-title">
          <div>{{ titles }}</div>
          <slot name="header-tab"></slot>
        </div>
        <a-button
          v-if="backButton"
          class="a-buttom-reset-link"
          type="link"
          @click="$router.go(-1)"
          >返回</a-button
        >
      </slot>
    </a-layout-header>
    <a-layout-content
      ref="baseLayoutContent"
      :class="{
        'base-layout-content': true,
        'base-layout-footer-hide': !showFooter,
      }"
    >
      <slot name="content"></slot>
    </a-layout-content>
    <a-layout-footer v-if="showFooter" class="base-layout-footer">
      <slot name="footer"></slot>
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { isBoolean } from 'xe-utils'
export default {
  name: 'baseLayout',
  props: {
    title: {
      type: String,
      default: '',
    },
    header: {
      type: Boolean,
      default: true,
    },
    backButton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    titles() {
      return this.title || this.$route.params.title
    },
    showFooter() {
      return !!this.$slots.footer
    },
  },
}
</script>
<style lang="less" scoped>
.base-layout {
  background: #fff;
  height: 100%;
  overflow-y: auto;
  .base-layout {
    display: flex;
  }
}
.base-layout-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f0f2f5;
  background: #fff;
  width: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.base-layout-footer {
  height: 50px;
  line-height: 50px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #f0f2f5;
  padding: 0 15px;
  text-align: right;
  z-index: 1;
}
.base-layout-content {
  overflow-y: auto;
}
.base-layout-footer-hide {
  padding-bottom: 0;
}
.base-layout-header-title {
  display: flex;
  align-items: center;
}
</style>
