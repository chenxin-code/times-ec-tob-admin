<template>
  <div class="home">
    <div class="img-box">
      <div>
        <h1 class="text">欢迎进入案场erp</h1>
        <img :src="imgUrl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      imgUrl: require('@/assets/img/home/welcome.png'),
    }
  },
  methods: {},
}
</script>

<style lang="less" rel="stylesheet/stylus" scoped>
.home {
  background: #fff;
  height: 100%;
  .text {
    text-align: center;
    color: #555555;
    font-size: 34px;
    font-weight: 700;
  }
  .img-box {
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    justify-content: center;
  }
}
</style>
