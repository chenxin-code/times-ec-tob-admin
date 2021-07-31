<template>
  <div id="portal" slot="content">
    <div class="portal-header">
      <div class="time-logo-content">
        <img class="time-logo" src="@/assets/img/portal/logo.png" />
      </div>
      <div class="user-content" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <a-dropdown>
          <span class="ant-dropdown-link">
            <img class="user-avatar" :src="userAvatar" />
            {{username}}
            <a-icon type="down"/>
          </span>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link :to="{path: '/user/userInfo'}">个人中心</router-link>
            </a-menu-item>
            <a-menu-item @click="handleLogout">
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <div class="container">
      <div class="content">
        <div class="portal-back" @click="handleLogout">返回</div>
        <div class="menu-block" v-for="(menu_block, index) in portalMenusHas" :key="index">
          <div class="menu-title">{{menu_block.label}}</div>
          <template v-for="(menuItem, index) in menu_block.children">
            <template v-if="menuItem.type === 'other'">
              <div class="menu-item" :key="index" @click="turn_other(menuItem.authKeys[0])" v-if="hasRangeAuthorityWithoutProject(menuItem.authKeys)">
                <img class="menu-item-icon" :src="getImgUrl(menuItem.icon)" alt="icon" />
                <span class="menu-item-title" >
                    {{menuItem.title}}
                </span>
                <img class="menu-item-next" src="@/assets/img/portal/icon_right.png" alt="icon right"
                />
              </div>
            </template>
            <template v-else>
              <div class="menu-item" :key="index" @click="turn_route(menuItem.route)" v-if="hasRangeAuthorityWithoutProject(menuItem.authKeys)">
                <img class="menu-item-icon" :src="getImgUrl(menuItem.icon)" alt="icon" />
                <span class="menu-item-title" >
                    {{menuItem.title}}
                </span>
                <img class="menu-item-next" src="@/assets/img/portal/icon_right.png" alt="icon right"
                />
              </div>
            </template>
          </template>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PORTAL_MENUS from "@/config/portal";
import {hasRangeAuthorityWithoutProject} from "@/utils/authority";
import api from "@/api";
import { mapState } from "vuex";
const defaultAvatar = require("@/assets/img/user/avatar.png");

export default {
  name: "portal",
  data() {
    return {
      //列表数据
      data : [],
      portalMenus: [],
      portalMenusHas: [],
      dropDown: false,
      userAvatar: defaultAvatar,
      username: "",
      url: ""
    }
  },
  computed: mapState([
    "Case_Access_Token",
  ]),
  watch: {
    Case_Access_Token(newVal, oldVal) {
      this.getAuthority();
      this.getUserInfo();
    },
  },
  created () {
    if(!this.Case_Access_Token) return;
    // console.log(this.portalMenusHas)
    this.getAuthority();
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      api.getUserInfo().then(res => {
        if (res.code === 200) {
          this.userAvatar = res.data.userImage ? res.data.userImage : defaultAvatar;
          this.username = res.data.userName;
          window.localStorage.setItem("SD_USERAVATAR", this.userAvatar);
          window.localStorage.setItem("SD_USERNAME", res.data.userName);
          this.$store.commit("setUseravatar", this.userAvatar);
          this.$store.commit("setUsername", res.data.userName);
        }
      });
    },
    getAuthority(){
      const that = this;
      api.getPermission().then(res => {
        if (res.code === 200) {
          this.url = res.data.url;
          window.localStorage.setItem("SD_AUTHORITIES", JSON.stringify(res.data.code));
          PORTAL_MENUS.map(menuBlock => {
            const filteredMenuBlock = menuBlock.children.filter(
                x => hasRangeAuthorityWithoutProject(x.authKeys),
            );
            console.log(filteredMenuBlock)
            if (filteredMenuBlock.length > 0) {
              that.portalMenusHas.push(menuBlock)
            } else {
              that.portalMenusHas.push([]);
            }
          })
        }
      })
    },
    hasRangeAuthorityWithoutProject(authKeys){
      return hasRangeAuthorityWithoutProject(authKeys)
    },
    mouseenter(){
      this.dropDown = !this.dropDown
    },
    mouseleave(){
      this.dropDown = !this.dropDown
    },
    getImgUrl(icon){
      return require("@/assets/img/portal/"+icon);
    },
    handleLogout(){
      window.localStorage.setItem("SD_ACCESS_TOKEN", "");
      window.localStorage.setItem("SD_ACCESS_REFRESHTOKEN", "");
      window.localStorage.setItem("SD_AUTHORITIES", "");
      window.localStorage.setItem("SD_USERAVATAR", "");
      window.localStorage.setItem("SD_USERNAME", "");
      this.$router.push({ path: "/login" })
    },
    turn_route(route){
      this.$router.push({ path: route })
    },
    turn_other(key) {
      window.open(this.url[key] + window.localStorage.getItem("SD_ACCESS_TOKEN"))
    }
  }
}
</script>

<style lang="less" scoped>
  #portal{
    height: 100%;
    width: 100%;
    background: #EBEBF0;
    overflow: hidden;

    .portal-header{
      width: 100%;
      height: 80px;
      line-height: 80px;
      background: #fff;
      padding: 0 30px;

      .time-logo-content{
        display: inline-block;
        color: #E7374A;
        width: 156px;
        height: 44px;

      }

      .user-content{
        display: inline-block;
        float: right;
        position: relative;

        .ant-dropdown-link{
          height: 60px;
          line-height: 60px;
          display: inline-block;
        }

        .user-avatar{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 12px;
        }

        .username{
          margin-right: 10px;
          color: #666;
          font-size: 14px;
        }
      }
    }

    .container{
      width: 100%;
      height: calc(100% - 80px);
      padding: 40px 0 0 0;
      overflow: scroll;

      .content{
        width: 1200px;
        min-height: 100%;
        height: auto;
        background: #fff;
        margin: 0 auto;
        padding: 50px 28px 50px 50px;
        position: relative;

        .portal-back{
          position: absolute;
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #4B7AFB;
          right: 50px;
          top: 50px;
          z-index: 9;
        }

        .menu-block{

          .menu-title{
            opacity: 0.65;
            font-family: PingFangSC-Regular;
            font-size: 20px;
            color: #333333;
            margin-bottom: 17px;
          }

          .menu-item{
            width: 352px;
            height: 100px;
            line-height: 100px;
            float: left;
            background: #FFFFFF;
            box-shadow: 0 0 6px 0 rgba(0,0,0,0.20);
            border-radius: 8px;
            padding: 0 20px 0 28px;
            cursor: pointer;
            margin-right: 22px;
            margin-bottom: 22px;
            position: relative;

            .menu-item-icon{
              width: 42px;
              height: 42px;
              margin-right: 16px;
              display: inline-block;
            }

            .menu-item-next{
              width: 24px;
              height: 24px;
              opacity: .3;
              position: absolute;
              top: 36px;
              right: 20px;
            }
          }

          .clear{
            clear: both;
          }
        }
      }
    }
  }
</style>
