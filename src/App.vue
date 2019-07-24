<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑 Light";
}
body {
  line-height: 1;
}
.text-center {
  text-align: center;
}
.body {
  padding: 80px 30px 30px;
}
ol,ul {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.fr {
  float: right
}
.flex.h-center {
  align-items: center;
}
.flex.between {
  justify-content: space-between;
}
.flex-1 {
  flex: 1;
}
.font-14 {
  font-size: 14px;
}
.font-15 {
  font-size: 15px;
}
.font-18 {
  font-size: 18px;
}
.font-20 {
  font-size: 20px;
}
.font-22 {
  font-size: 22px;
}
.font-24 {
  font-size: 24px;
}
[class*="font-"].red {
  color: #d23029;
}
[class*="font-"].gray {
  color: #5a5a5a;
}
[class*="font-"].bold {
  font-weight: bold;
}
</style>
