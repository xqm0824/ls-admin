<template>
  <div class="container">
    <header class="header flex">
      <div class="logo"></div>
      <div
        @click="switchNav(item.path)"
        class="nav-item "
        :class="index == activeNav ? 'active' : '' "
        v-for="(item, index) in nav"
        :key="index"
      >
        {{item.title}}
      </div>
      <div class="flex-1">
        <img src="@/assets/icon-index.png" title="回到首页" @click="linkIndex">
        <img src="@/assets/icon-exit.png" title="退出" @click="loginOut">
      </div>
    </header>
    <div class="main" :style="{ 'height': mainHeight + 'px' }">
      <div class="menu">
        <ul 
          v-for="(item, index) in menu"
          :key="index"
        >
          <li class="menu-item menu-title">{{item.sub}}</li>
          <router-link
            active-class="active"
            tag="li"
            class="menu-item"
            v-for="(child, idx) in item.menu"
            :key="idx"
            :to="child.path"
          >
            {{child.name}}
          </router-link>
        </ul>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import nav from '@/utils/nav'
  export default {
    name: 'index',
    data() {
      return {
        mainHeight: window.innerHeight - 90,
        nav: nav,
      }
    },
    methods: {
      switchNav(path) {
        this.$router.push(path);
      },
      linkIndex() {
        this.$router.push("/index");
      },
      loginOut() {
        this.$router.push("/");
        this.$store.comit("CLEAR_USERINFO");
      }
    },
    computed: {
      activeNav() {
        return this.$store.getters.activeNav;
      },
      menu() {
        return nav[this.$store.getters.activeNav].child
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/common";
  .container {
    position: fixed;
    width: 100vw;
    height: 100vw;
    left: 0;
    top: 0;
    overflow: auto;
    .header {
      width: 100%;
      height: 70px;
      min-width: 1240px;
      background-color: #5bc0bf;
      .logo {
        width: 200px;
        height: 100%;
      }
      .nav-item {
        line-height: 70px;
        padding: 0 20px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
      .active {
        background-color: #7ccdcc
      }
      .flex-1 {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 30px;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        * {
          margin-left: 20px;
        }
      }
    }
    .main {
      display: flex;
      width: 100%;
      .menu {
        width: 200px;
        height: 100%;
        flex-shrink: 0;
        overflow: auto;
        background-color: #efefef;
        font-size: 15px;
        .menu-title {
          color: #b9b9ba !important;
          cursor: pointer !important;
        }
        .menu-item {
          display: block;
          line-height: 50px;
          color: #595757;
          text-align: center;
          box-sizing: border-box;
          cursor: pointer;
        }
        .active {
          color: #5bc0bf;
          border-bottom: 1px solid #5bc0bf;
          background-color: #fff;
          font-weight: bold;
        }
      }
      .content {
        position: relative;
        flex: 1;
        min-width: 1040px;
        overflow: auto;
      }
    }
  }
</style>
