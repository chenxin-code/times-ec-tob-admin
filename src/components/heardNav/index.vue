<template>
  <a-radio-group
    :default-value="radioValue"
    v-model="radioValue"
    button-style="solid"
    @change="navChange"
  >
    <a-radio-button
      :value="item.path"
      v-for="(item, index) in routers"
      :key="index"
    >
      <div class="row">
        <span>{{ item.name }}</span>
        <div class="closeIcon" @click.stop="deleteRoute(item, index)">
          <a-icon type="close-circle" />
        </div>
      </div>
    </a-radio-button>
  </a-radio-group>
</template>
<script>
export default {
  name: 'HeardNav',
  data() {
    return {
      routers: [],
      radioValue: '',
    }
  },
  props: {
    msg: String,
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    /*初始化路由*/
    getBreadcrumb() {
      let routers = this.$route.meta.bread[0]
      this.routers.push({ name: routers.name, path: routers.path })
      this.radioValue = routers.path
    },
    /*导航栏切换路由*/
    navChange(e) {
      this.$router.push({ path: e.target.value })
      this.radioValue = e.target.value
    },
    /*移除导航栏路由*/
    deleteRoute(item, index) {
      let { routers } = this
      if (this.radioValue == item.path) {
        return
      }
      if (routers.length > 1) {
        routers.splice(index, 1)
        this.routers = routers
      } else {
        this.$router.push({ path: item.path })
      }
    },
  },
  watch: {
    $route() {
      //   this.routers = this.$route.meta.bread
      let { routers } = this
      let routerss = this.$route.meta.bread[0]
      this.radioValue = routerss.path
      if (routers.length <= 0) {
        this.routers.push({ name: routerss.name, path: routerss.path })
      } else if (routers.length <= 10) {
        //最长限制10个
        let has = false
        routers.forEach(element => {
          if (element.path == routerss.path) {
            has = true
          }
        })
        if (!has) {
          this.routers.push({ name: routerss.name, path: routerss.path })
        }
      }
    },
  },
}
</script>
<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.closeIcon {
  width: 30px;
  height: 100%;
  text-align: right;
}
</style>
