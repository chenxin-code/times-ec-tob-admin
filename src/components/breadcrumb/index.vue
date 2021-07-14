<template>
  <a-breadcrumb style="line-height: 64px">
    <a-breadcrumb-item v-for="(item, index) in routers" :key="index">
      <router-link :to="item.path">{{item.name}}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      routers: [],
    };
  },
  props: {
    msg: String
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.routers = this.$route.meta.bread
    }
  },
  watch: {
    '$route'() {
      this.routers = this.$route.meta.bread
    }
  }
}
</script>
<style scoped>
</style>
