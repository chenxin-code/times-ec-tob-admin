<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="toPortal">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception404',
  methods: {
    toPortal () {
      this.$router.push({ path: '/portal' })
    }
  }
}
</script>
