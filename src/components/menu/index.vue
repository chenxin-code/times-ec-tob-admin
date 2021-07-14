<template>
  <a-menu theme="dark" mode="inline" class="menuslis" :openKeys="openKeys"  :selected-keys="[$route.meta.menu]" @openChange="checkKeys">
      <template v-for="menu in menus">
        <template v-if="menu.children">
            <a-sub-menu :key="menu.name">
              <span slot="title"><img :src="menu.icon" class="menu-icon" /><span class="menu-title">{{menu.title}}</span></span>
              <template v-for="(menuChildren) in menu.children">
                <template>
                  <a-menu-item :key="menuChildren.path" @click="onClickMenuChid(menuChildren.path)">
                    {{menuChildren.title}}
                  </a-menu-item>
                </template>
              </template>
            </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="menu.path" @click="onClickMenu(menu.path)">
            <span><img :src="menu.icon" class="menu-icon" /><span class="menu-title">{{menu.title}}</span></span>
          </a-menu-item>
        </template>
      </template>
  </a-menu>
</template>

<script>

import MENU_ROUTES from "../../config/menu";
import {hasRangeAuthorityWithoutProject} from '@/utils/authority'

export default {
  name: 'Menu',
  props: {
    msg: String
  },
  data () {
    return {
      menus: [],
      openKeys:  [this.$route.path.split('/')[2] ? this.$route.path.split('/')[2] : ''],
      rootPath: '',
      collapsed: false
    }
  },
  watch: {
    '$route': 'setMenus'
  },
  created () {
    this.setMenus();
  },
  methods: {
    checkKeys(openKeys) {
      this.openKeys = openKeys;
      // this.openKeys = openKeys;
      this.$forceUpdate();
      console.log(this.openKeys)
    },
    onClickMenuChid(path) {
      this.$router.push({path: path})
      console.log(this.openKeys)
    },
    onClickMenu(path) {
      this.openKeys = [''];
      this.$forceUpdate();
      this.$router.push({path: path})
      console.log("this.openKeys",this.openKeys)
    },
    hasRangeAuthorityWithoutProject(authKeys){
      return hasRangeAuthorityWithoutProject(authKeys)
    },
    setMenus(){
      const pathname = this.$route.path;
      const matchedMenu = MENU_ROUTES.find(x => x.path === pathname) || { group: "" };
      let filteredMenus = [];
      const groupMenus = MENU_ROUTES.filter(x => x.group === matchedMenu.group);

      if (groupMenus.length > 0) {
        filteredMenus = groupMenus;
      }
      else {
        if (pathname.split("/").length > 0) {
          const pathParams = pathname.split("/");
          console.log(MENU_ROUTES)
          const newMatchedMenu = MENU_ROUTES.find(x =>
            x.hasChild ? x.hasChild ===
                    (((pathParams[1] === "advertise") ?
                        (pathParams[1]) : pathParams[1])) :
            x.path ===
              ("/" + ((pathParams[1] === "user" || pathParams[1] === "advertise"|| pathParams[1] === 'operationsManagement'|| pathParams[1] === "project") ? pathParams[1] + "/" + pathParams[2] : pathParams[1])));

          // const newMatchedMenu = MENU_ROUTES.find(x =>
            // x.path ===
            //   ("/" + ((pathParams[1] === "user" || pathParams[1] === "advertise") ? pathParams[1] + "/" + pathParams[2] : pathParams[1])));
      
          if (newMatchedMenu) {
              const newGroupMenus = MENU_ROUTES.filter(x => x.group === newMatchedMenu.group);
              filteredMenus = newGroupMenus || [];
          }
        }
      }
      debugger
      this.rootPath = pathname;
      this.menus = filteredMenus;
    }
  }
}
</script>
<style>
.ant-layout-sider-children{
  overflow: hidden;
}
.menuslis{
height: 90%;
width: 110%;
overflow-y: scroll;
}
.menu-icon{
  display: inline-block;
  width: 14px;
  height: 14px;
  top: -1px;
  position: relative;
  margin-right: 10px;
}
.ant-layout-sider-collapsed .menu-title{
  opacity: 0;
}
</style>
