<template>
  <div>
    <div v-for="(item,index) in RangePrice" :key="index">
      <a-input v-model="item.From" :disabled="index > 0"/>
      ~
      <a-input v-model="item.To"/>
      价格
      <a-input v-model="item.Price"/>
    </div>
    <a-button @click="add()">+</a-button>
    <a-button @click="RangePrice.pop()" v-if="RangePrice.length > 1">-</a-button>
    <a-button @click="submit()">提交</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RangePrice: [
        {From: null, To: null, Price: null},
      ],
    }
  },
  methods: {
    add() {
      if (this.RangePrice[this.RangePrice.length - 1].To) {
        this.RangePrice.push({From: this.RangePrice[this.RangePrice.length - 1].To, To: null, Price: null});
      } else {
        this.$message.success('上一条不完整');
      }
    },
    submit() {
      this.RangePrice.forEach(item => {
        if (!item.From || !item.To || !item.Price) {
          this.$message.success('阶梯价不完整');
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.ant-input {
  width: 100px;
}
</style>