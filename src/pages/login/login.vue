<template>
  <div id="login">
    <div class="login-logo">
      <span class="big-logo"></span>
    </div>
    <a-row class="contant" type="flex" align="middle">
      <a-col class="login-banner" flex="762px"></a-col>
      <a-col class="login-form" flex="360px">
        <a-form
          id="formLogin"
          class="user-layout-login"
          ref="formLogin"
          :form="form"
          @submit="handleSubmit"
        >
          <a-tabs
            class="tab"
            :activeKey="customActiveKey"
            :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
            @change="handleTabClick"
          >
            <a-tab-pane key="tab1" tab="手机号登录">
              <a-form-item :validate-status="validateStatus" :help="validateHelp">
                <a-input-group compact class="choose_areacode">

                  <a-select default-value="86" class="select-areacode" @change="handleChange" :getPopupContainer="(triggerNode)=>{ return triggerNode.parentNode || document.body;}">
                    <a-select-option value="86" class="select-areaoptions">
                      +86
                    </a-select-option>
                    <a-select-option value="886" class="select-areaoptions">
                      +886
                    </a-select-option>
                    <a-select-option value="852" class="select-areaoptions">
                      +852
                    </a-select-option>
                    <a-select-option value="853" class="select-areaoptions">
                      +853
                    </a-select-option>
                  </a-select>

                  <a-input @change="phoneChange" class="user-phone" size="large" type="text" placeholder="手机号" v-decorator="['mobile']">

                  </a-input>
                </a-input-group>
              </a-form-item>
              <a-row :gutter="16">
                <a-col class="gutter-row" :span="16">
                  <a-form-item>
                    <a-input size="large" type="text" placeholder="验证码" :maxLength="6" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">

                    </a-input>
                  </a-form-item>
                </a-col>
                <a-col class="gutter-row sms_btn" :span="8">
                  <a-button
                    class="getCaptcha"
                    tabindex="-1"
                    :disabled="state.smsSendBtn"
                    @click.stop.prevent="getCaptcha"
                    v-text="!state.smsSendBtn && '发送验证码' || (state.time+' s')"
                  ></a-button>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="tab2" tab="账号登录">
              <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;" message="账户或密码错误" />
              <a-form-item>

                <a-input class="user-name" size="large" type="text" placeholder="账号"
                  v-decorator="[
                    'username',
                    {rules: [{ required: true, message: '请输入帐户名' }], validateTrigger: 'change'}
                  ]"
                >
                 <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>

              <a-form-item>
                <a-input-password
                  size="large"
                  placeholder="密码"
                  v-decorator="[
                    'password',
                    {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                  ]"
                >
                  <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input-password>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="danger"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >登录</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import api from "@/api";
import QS from "qs";
import { isTruePhone } from "@/utils/util";


export default {
  name: 'Home',
  data() {
    return {
      validateStatus: "",
      validateHelp: "",
      areaCode: "86",
      collapsed: false,
      customActiveKey: "tab1",
      isLoginError: false,
      form: this.$form.createForm(this),
      mobile: "",
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    };
  },
  components: {
  },
  created () {
    if (window.localStorage.getItem("login_refresh") === "false") {
      window.localStorage.setItem("login_refresh", "true");
      location.reload();
    }
    // console.log(this.$route.path)
  },
  // beforeRouteEnter(to, from, next) {
  //   if (window.localStorage.getItem("login_refresh") === "false") {
  //     window.localStorage.setItem("login_refresh", "true");
  //     location.reload();
  //   }
  //   next();
  // },
  methods: {
    handleChange(e){
      this.areaCode = e;
      this.mobile = this.form.getFieldValue('mobile');
      if (this.mobile && this.mobile != "") {
        this.checkPhone();
      }

    },
    phoneChange(e){
      this.mobile = e.currentTarget.value;
      this.checkPhone();
    },
    checkPhone(){
      console.log(this.form.getFieldValue('mobile'))
      if (!isTruePhone(this.areaCode,this.mobile)) {
        this.validateStatus = "error";
        this.validateHelp = "请输入正确的手机号";
      } else {
        this.validateStatus = "";
        this.validateHelp = "";
      }

    },
    handleTabClick (key) {
      this.customActiveKey = key
    },
    handleSubmit (e) {
      e.preventDefault()
      if(this.customActiveKey  === "tab1" && this.mobile === "") {
        this.validateStatus = "error";
        this.validateHelp = "请输入手机号";
      } else {
        const {
          form: { validateFields },
          state,
          customActiveKey,

        } = this

        state.loginBtn = true

        const validateFieldsKey = customActiveKey === "tab1" ? ["mobile", "captcha"] : ["username", "password"]

        validateFields(validateFieldsKey, { force: true }, (err, values) => {
          if (!err) {
            const loginParams = { ...values }
            const para = QS.stringify({
              grant_type: customActiveKey === "tab1" ? "sms_code" : "password",
              client_id: "web_b",
              client_secret: "times",
              username: customActiveKey === "tab1" ? loginParams.mobile : loginParams.username,
              password: customActiveKey === "tab1" ? loginParams.captcha : loginParams.password,
              scope: "all"
            })

            api.toLogin(para).then(res => {
              if (res.code === 200) {
                window.localStorage.setItem("SD_LOGIN_NAME", para.username);
                window.localStorage.setItem("SD_ACCESS_TOKEN", res.data.token);
                window.localStorage.setItem("SD_ACCESS_REFRESHTOKEN", res.data.refreshToken);
                this.$router.push({ path: "/portal" })
              }
            }).finally(() => {
              state.loginBtn = false;
            });

          } else {
            setTimeout(() => {
              state.loginBtn = false
            }, 600)
          }
        })
      }
    },
    getCaptcha (e) {
      e.preventDefault()
      const { form: { validateFields }, state } = this

      if (state.time === 60) {

        validateFields(["mobile"], { force: true }, (err, values) => {
          if (!err) {

            const para = {
              phoneNumber: values.mobile,
              areaCode: "86"
            }
            const hide = this.$message.loading("验证码发送中..", 0)
            api.sendCode(para).then(res => {
              if (res.code === 200) {
                console.log("成功")
                state.smsSendBtn = true
                const interval = window.setInterval(() => {
                  if (state.time-- <= 0) {
                    state.time = 60
                    state.smsSendBtn = false
                    window.clearInterval(interval)
                  }
                }, 1000)


                // setTimeout(hide, 1)
              }
            }).finally(() => {
              setTimeout(hide, 1)
              // clearInterval(interval)
              // state.time = 60
              // state.smsSendBtn = false
            });
          }
        })
      }
    },
  }
}
</script>

<style lang="less" rel="stylesheet/stylus" scoped>
#login {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url("../../assets/img/login/login_bg.png") no-repeat;
  background-size: 100% 100%;
  .login-logo{
    position: fixed;
    top: 50px;
    left: 60px;
    color: #fff;
    font-size: 30px;

    .big-logo {
      width: 156px;
      height: 44px;
      background: url("../../assets/img/login/big_logo.png") no-repeat;
      margin: 16px;
      color: #fff;
      display: inline-block;
    }
  }

  .contant{
    width: 1200px;
    height: 100%;
    margin: 0 auto;

    .login-banner{
      width: 762px;
      height: 430px;
      margin-right: 78px;
      border-radius: 10px;
      box-shadow: 0 4px 20px 0 rgba(0,0,0,0.30);
      background: url("../../assets/img/login/login_banner.png") no-repeat;
    }

    .login-form{
      width: 360px;
      height: 430px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 20px 0 rgba(0,0,0,0.30);
      padding: 46px 30px 36px 30px;



      .user-phone{
        width: calc(100% - 80px);
      }

      .user-name{
        width: 100%;
      }
    }
  }
}
</style>
