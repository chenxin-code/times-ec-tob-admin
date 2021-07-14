<template>
  <div id="login">
    <a-button type="primary" @click="handleSubmitB">获取B端token</a-button><br/>
    <a-textarea v-model="btoken" style="font-size:16px;margin-top:20px;height:100px;"></a-textarea>
    <a-button type="primary" @click="handleSubmitC" style="margin-top:20px;">获取C端token</a-button><br/>
    <a-textarea v-model="ctoken" style="font-size:16px;margin-top:20px;height:100px;"></a-textarea>
  </div>
</template>

<script>
  import api from "@/api";
  import QS from "qs";
  import ATextarea from "ant-design-vue/es/input/TextArea";
  export default {
    name: 'Home',
    data() {
      return {
        btoken:"",
        ctoken:""
      };
    },
    components: {
      ATextarea
    },
    created () {

    },
    methods: {
      handleSubmitB (e) {
        e.preventDefault();
        this.btoken = "";
        const para = QS.stringify({
          grant_type:"password",
          client_id:"web_b",
          client_secret:"times",
          username:"fanjiujiu",
          password:123456,
          scope:"all"
        });
        api.toLogin(para).then(res => {
          if (res.code === 200) {
            console.log(res.data)
            this.btoken = res.data.token
          }
        })
      },
      handleSubmitC (e) {
        e.preventDefault();
        this.ctoken = "";
        const para = QS.stringify({
          grant_type:"sms_code",
          client_id:"app_c",
          client_secret:"times",
          username:"13911223344",
          password:123456,
          scope:"all"
        });
        api.toLogin(para).then(res => {
          if (res.code === 200) {
            console.log(res.data)
            this.ctoken = res.data.token
          }
        })
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/stylus" scoped>
  #login {
    width: 100%;
    height: 100%;
    padding:20px;
  }
</style>
