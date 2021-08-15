<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
      <!--      <keep-alive>-->
      <!--        <router-view v-if="$route.meta.keepAlive"></router-view>-->
      <!--      </keep-alive>-->
      <!--      <router-view v-if="!$route.meta.keepAlive"></router-view>-->
    </div>
  </a-config-provider>
</template>

<script>
import api from '@/api'
import message from 'ant-design-vue/es/message'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { getQueryString } from '@/utils/util'

moment.locale('zh-cn')

export default {
  name: 'App',
  components: {
    // Home
  },
  data() {
    return {
      locale: zhCN,
    }
  },

  created() {
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('refreshflag', '1')
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    // this.$store.dispatch('EXCHANGE_TOKEN')
    // this.loginByOriginalToken(getQueryString('token'));
  },

  mounted() {},

  methods: {
    // 换token -Access_Token
    loginByOriginalToken(token) {
      this.tableLoading = true
      const para = {
        originalToken: token,
      }
      api
        .loginByOriginalToken(para)
        .then(res => {
          if (res.code === 200) {
            let Access_Token = 'Bearer ' + res.data.newToken
            window.localStorage.setItem('Case_Access_Token', Access_Token)
          }
        })
        .finally(() => {
          this.tableLoading = false
          this.showModal = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
#app {
  font-family: PingFangSC-Semibold, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  // min-width: 1240px;
}

// 覆盖下拉样式 下拉菜单未选中也变成黑色
.ant-select-dropdown-menu-item {
  color: #000 !important;
}

// 穿梭框插槽样式
.search-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  .search-item-2 {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    width: 35%;
    .name {
      width: 30%;
      text-align: left;
      font-size: 13px;
      &::after {
        content: ':';
        margin: 0 3px;
      }
    }
    .name.long {
      width: 40%;
    }
    .val {
      width: 70%;
    }
  }
  .search-item-4 {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    width: 42%;
    .name {
      width: 40%;
      text-align: left;
      font-size: 13px;
      &::after {
        content: ':';
        margin: 0 3px;
      }
    }
    .val {
      width: 60%;
    }
  }
  // .search-item-btn{
  //   display: flex;
  //   align-items: center;
  //   padding-bottom: 10px;
  //   width: 15%;
  .btn {
  }
  // }
}
</style>
