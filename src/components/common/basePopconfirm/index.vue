<template>
  <a-popconfirm v-bind="config" @confirm="confirm">
    <template slot="title">
      <slot name="title">危险操作，确认继续吗？</slot>
    </template>
    <slot></slot>
  </a-popconfirm>
</template>
<script>
export default {
  name: 'basePopconfirm',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          'placement': 'top',
          'ok-text': '确认',
          'cancel-text': '取消'
        }
      }
    }
  },
  methods: {
    confirm(){
      this.$emit('confirm')
    }
  },
}
</script>