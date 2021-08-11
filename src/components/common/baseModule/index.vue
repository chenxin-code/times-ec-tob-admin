<template>
  <div class="container-module">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'baseModule',
}
</script>
<style lang="less" scoped>
.container-module {
  max-width: 100%;
  overflow-x: hidden;
  //   margin-bottom: 10px;
  background: #fff;
  padding: 10px;
}
</style>
