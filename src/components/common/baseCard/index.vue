<template>
  <div :class="{'container-card': true, 'card-before': title}">
    <div v-if="title" class="container-card-title">{{title}}</div>
    <div class="container-card-content" :style="{background: background, ...styleConfig}">
      <div v-if="!!$slots.contentTitle" class="container-card-content-title">
        <slot name="contentTitle"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "baseCard",
  props: {
    title: {
      type: String,
      default: ''
    },
    background:{
      type: String,
      default: '#f4f5f9'
    },
    styleConfig:{
      type: Object,
      default: () => {
        return {
          padding: '10px'
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container-card {
  background-color: #ffffff;
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
  position: relative;
}
.card-before:before{
	content: '';
	position: absolute;
	right: 30px;
  bottom: 0;
	height: 1px;
	width: calc(100% - 180px);
	border-top: #ccc dashed 1px;
}
.container-card-title{
  text-align: right;
  width: 150px;
  padding: 10px 0;
  padding-right: 15px;
  
}
.container-card-content{
  width: calc(100% - 180px);
}
.container-card-content-title{
  border-bottom: 1px solid #ccc;
}
</style>

