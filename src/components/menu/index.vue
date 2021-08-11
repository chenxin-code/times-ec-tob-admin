<template>
  <a-menu
    theme="dark"
    mode="inline"
    class="menuslis"
    :openKeys="openKeys"
    :selected-keys="[$route.meta.menu]"
    @openChange="checkKeys"
  >
    <template v-for="menu in menus">
      <template v-if="menu.children">
        <a-sub-menu :key="menu.permCode">
          <span slot="title"
            ><img :src="menu.permIcon" class="menu-icon" /><span
              class="menu-title"
              >{{ menu.permName }}</span
            ></span
          >
          <template v-for="menuChildren in menu.children">
            <template>
              <a-menu-item
                :key="menuChildren.permUrl"
                @click="onClickMenuChid(menuChildren.permUrl)"
              >
                {{ menuChildren.permName }}
              </a-menu-item>
            </template>
          </template>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :key="menu.permUrl" @click="onClickMenu(menu.permUrl)">
          <span
            ><img :src="menu.permIcon" class="menu-icon" /><span
              class="menu-title"
              >{{ menu.permName }}</span
            ></span
          >
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script>
import MENU_ROUTES from '../../config/menu'
import { hasRangeAuthorityWithoutProject } from '@/utils/authority'
import { mapState } from 'vuex'

export default {
  name: 'Menu',
  props: {
    msg: String,
  },
  data() {
    return {
      menus: [],
      openKeys: [
        this.$route.path.split('/')[2] ? this.$route.path.split('/')[2] : '',
      ],
      rootPath: '',
      collapsed: false,
    }
  },
  //   computed: mapState(['menus']),
  watch: {
    $route: 'setMenus',
  },
  created() {
    this.setMenus()
  },
  methods: {
    checkKeys(openKeys) {
      this.openKeys = openKeys
      this.$forceUpdate()
    },
    onClickMenuChid(path) {
      this.$router.push({ path: path })
    },
    onClickMenu(path) {
      this.openKeys = ['']
      this.$forceUpdate()
      this.$router.push({ path: path })
    },
    hasRangeAuthorityWithoutProject(authKeys) {
      return hasRangeAuthorityWithoutProject(authKeys)
    },
    setMenus() {
      const pathname = this.$route.path
      const matchedMenu = MENU_ROUTES.find(x => x.permUrl === pathname) || {
        group: '',
      }
      let filteredMenus = []
      const groupMenus = MENU_ROUTES.filter(x => x.group === matchedMenu.group)
      if (groupMenus.length > 0) {
        filteredMenus = groupMenus
      } else {
        if (pathname.split('/').length > 0) {
          const pathParams = pathname.split('/')
          console.log(MENU_ROUTES)
          const newMatchedMenu = MENU_ROUTES.find(x =>
            x.hasChild
              ? x.hasChild ===
                (pathParams[1] === 'advertise' ? pathParams[1] : pathParams[1])
              : x.permUrl ===
                '/' +
                  (pathParams[1] === 'user' ||
                  pathParams[1] === 'advertise' ||
                  pathParams[1] === 'operationsManagement' ||
                  pathParams[1] === 'project'
                    ? pathParams[1] + '/' + pathParams[2]
                    : pathParams[1])
          )

          // const newMatchedMenu = MENU_ROUTES.find(x =>
          // x.path ===
          //   ("/" + ((pathParams[1] === "user" || pathParams[1] === "advertise") ? pathParams[1] + "/" + pathParams[2] : pathParams[1])));

          if (newMatchedMenu) {
            const newGroupMenus = MENU_ROUTES.filter(
              x => x.group === newMatchedMenu.group
            )
            filteredMenus = newGroupMenus || []
          }
        }
      }
      //正式环境隐藏对应菜单 暂时
      const { ENV } = process.env
      if (ENV == 'production') {
        filteredMenus = filteredMenus.filter(item => {
          return ['account', 'supplier'].indexOf(item.permCode) < 0
        })
      }
      // debugger
      this.rootPath = pathname
      this.menus = filteredMenus
      //打印menus
      const menus = this.$store.state.menus
      console.log('filteredMenus--->', filteredMenus, menus)
    },
  },
}
</script>
<style>
.ant-layout-sider-children {
  overflow: hidden;
}
.menuslis {
  height: 90%;
  width: 100%;
  overflow-y: auto;
}
.menu-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  top: -1px;
  position: relative;
  margin-right: 10px;
}
.ant-layout-sider-collapsed .menu-title {
  opacity: 0;
}
</style>
