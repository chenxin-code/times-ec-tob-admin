<template>
  <div class="container-module" :style="{ height: `${height}` }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'baseModule',
  props: {
    height: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="less" scoped>
.container-module {
  max-width: 100%;
  //   overflow-x: hidden;
  //   margin-bottom: 10px;
  background: #fff;
  padding: 15px;
}
</style>
