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
      <template v-if="menu.children && menu.children.length > 0">
        <a-sub-menu :key="menu.url">
          <span slot="title"
            ><img v-if="menu.icon" :src="menu.icon" class="menu-icon" />

            <span class="menu-title" :key="menu.url">{{
              menu.menuName
            }}</span></span
          >
          <template v-for="menuChildren in menu.children">
            <template
              v-if="menuChildren.children && menuChildren.children.length > 0"
            >
              <a-sub-menu :key="menuChildren.url">
                <span slot="title"
                  ><img
                    v-if="menuChildren.icon"
                    :src="menuChildren.icon"
                    class="menu-icon"
                  />
                  <span class="menu-title" :key="menuChildren.url">
                    {{ menuChildren.menuName }}</span
                  ></span
                >
                <template v-for="menuCh in menuChildren.children">
                  <a-menu-item
                    :key="menuCh.url"
                    @click="onClickMenuChid(menuCh.url)"
                  >
                    <img
                      v-if="menuCh.icon"
                      :src="menuCh.icon"
                      class="menu-icon"
                    />{{ menuCh.menuName }}
                  </a-menu-item>
                </template>
              </a-sub-menu>
            </template>
            <template v-else>
              <a-menu-item
                :key="menuChildren.url"
                @click="onClickMenuChid(menuChildren.url)"
              >
                <img
                  v-if="menuChildren.icon"
                  :src="menuChildren.icon"
                  class="menu-icon"
                />
                {{ menuChildren.menuName }}
              </a-menu-item>
            </template>
          </template>
        </a-sub-menu>
      </template>
      <template v-else>
        <template>
          <a-menu-item :key="menu.url" @click="onClickMenu(menu.url)">
            <span
              ><img v-if="menu.icon" :src="menu.icon" class="menu-icon" /><span
                class="menu-title"
                >{{ menu.menuName }}</span
              ></span
            >
          </a-menu-item>
        </template>
      </template>
    </template>
  </a-menu>
</template>

<script>
import api from '@/api'
import { mapState } from 'vuex'
import MENU_ROUTES from '../../config/menu'
import { hasRangeAuthorityWithoutProject } from '@/utils/authority'

export default {
  name: 'Menu',
  props: {
    msg: String,
  },
  data() {
    return {
      // menus: [],
      openKeys: [
        this.$route.path.split('/')[2] ? this.$route.path.split('/')[2] : '',
      ],
      rootPath: '',
      collapsed: false,
    }
  },
  computed: mapState(['menus']),
  watch: {},
  created() {
    console.log(this.menus, 'menus')
  },
  methods: {
    checkKeys(openKeys) {
      this.openKeys = openKeys
      this.$forceUpdate()
    },
    onClickMenuChid(path) {
      this.$router.push({ path: path })
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
      const matchedMenu = MENU_ROUTES.find(x => x.path === pathname) || {
        group: '',
      }
      let filteredMenus = []
      const groupMenus = MENU_ROUTES.filter(x => x.group === matchedMenu.group)

      if (groupMenus.length > 0) {
        filteredMenus = groupMenus
      } else {
        if (pathname.split('/').length > 0) {
          const pathParams = pathname.split('/')
          // console.log(MENU_ROUTES)
          const newMatchedMenu = MENU_ROUTES.find(x =>
            x.hasChild
              ? x.hasChild ===
                (pathParams[1] === 'advertise' ? pathParams[1] : pathParams[1])
              : x.path ===
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
          // console.log('newMatchedMenu',newMatchedMenu)
          if (newMatchedMenu) {
            const newGroupMenus = MENU_ROUTES.filter(
              x => x.group === newMatchedMenu.group
            )
            filteredMenus = newGroupMenus || []
          }
        }
      }
      this.rootPath = pathname
      this.menus = filteredMenus
    },
  },
}
</script>
<style>
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
