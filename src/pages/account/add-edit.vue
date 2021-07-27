<template>
  <div style="height: 100%;">
    <div class="btns">
      <a-button class="item-btn" :loading="btnloading" type="primary" @click="addEdit()">保存</a-button>
      <a-button class="item-btn" @click="$router.back()">返回</a-button>
    </div>
    <a-form-model :model="thisForm" layout="inline" :rules="rules" ref="thisForm" labelAlign="left">
      <div class="common-title">
        <div class="common-title-content">账号信息</div>
      </div>
      <a-form-model-item label="所属企业" prop="enterpriseName">
        <div :class="`companySelect ${showRedBorder && 'border-red'}`" @click="visible = true">
          {{ enterpriseName }}
        </div>
        <p v-show="showRedBorder" class="companySelectTip">请选择所属企业</p>
      </a-form-model-item>
      <a-form-model-item label="姓名" prop="accountName">
        <a-input v-model="thisForm.accountName" :maxLength="10"/>
      </a-form-model-item>
      <a-form-model-item label="登录名" prop="loginName">
        <a-input v-model="thisForm.loginName" autocomplete="off" :maxLength="50" :disabled="isDisable"/>
      </a-form-model-item>
      <a-form-model-item label="状态">
        <a-select v-model="thisForm.accountState">
          <a-select-option value="NORMAL">正常</a-select-option>
          <a-select-option value="DISABLED">禁用</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password" v-if="!isDisable">
        <a-input-password v-model="thisForm.password" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="confirmPassword" v-if="!isDisable">
        <a-input-password v-model="thisForm.confirmPassword" autocomplete="off"/>
      </a-form-model-item>
      <a-form-model-item label="电子邮箱" prop="email">
        <a-input v-model="thisForm.email"/>
      </a-form-model-item>
      <a-form-model-item label="手机号码" prop="accountPhone">
        <a-input v-model="thisForm.accountPhone"/>
      </a-form-model-item>
    </a-form-model>
    <a-modal title="选择所属企业" :visible="visible" @ok="handleOk" @cancel="visible = false" width="500px">
      <companyTree @onSelect="onSelect"/>
    </a-modal>
  </div>
</template>

<script>
import api from "./../../api";
import companyTree from './../../components/companyTree';
import md5 from 'md5';

export default {
  components: {companyTree},
  data() {
    let passwordValidator = (rule, value, callback) => {
      if (this.thisForm.confirmPassword !== '') {
        this.$refs.thisForm.validateField('confirmPassword')
      }
      callback()
    }, confirmPasswordValidator = (rule, value, callback) => {
      if (value !== this.thisForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }, checkEmailFormat = (rule, value, callback) => {
      if (value && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        callback(new Error('电子邮箱格式不正确'))
      } else {
        callback()
      }
    }, checkMobileFormat = (rule, value, callback) => {
      if (value && !/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }, onlyForRedStar = (rule, value, callback) => {
      callback()
    };
    return {
      showRedBorder: false,
      selectEnterpriseId: null,
      selectEnterpriseName: null,
      enterpriseId: null,
      enterpriseName: null,
      visible: false,
      thisForm: {
        accountName: null,
        loginName: null,
        accountState: 'NORMAL',
        password: null,
        confirmPassword: null,
        email: null,
        accountPhone: null,
      },
      rules: {
        enterpriseName: [
          {required: true, validator: onlyForRedStar, trigger: 'blur'},
        ],
        accountName: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        loginName: [
          {required: true, message: '请输入登录名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: passwordValidator, trigger: 'blur'},
        ],
        confirmPassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {validator: confirmPasswordValidator, trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'},
          {validator: checkEmailFormat, trigger: 'blur'},
        ],
        accountPhone: [
          {validator: checkMobileFormat, trigger: 'blur'},
        ],
      },
      btnloading: false,
    }
  },
  mounted() {
    if (this.$route.path === '/account/edit') {
      api.queryAccountInfo({
        loginName: this.$route.query.loginName
      }).then(resp => {
        if (resp.code === 200) {
          this.enterpriseId = resp.data.enterpriseId;
          this.enterpriseName = resp.data.enterpriseName;
          this.thisForm.accountName = resp.data.accountName;
          this.thisForm.loginName = resp.data.loginName;
          this.thisForm.accountState = resp.data.accountState;
          this.thisForm.password = resp.data.password;
          this.thisForm.email = resp.data.email;
          this.thisForm.accountPhone = resp.data.accountPhone;
        }
      });
    }
  },
  computed: {
    isDisable() {
      return this.$route.path === '/account/edit'
    },
  },
  methods: {
    onSelect(id, enterpriseName) {
      console.log(id, enterpriseName);
      this.selectEnterpriseId = id;
      this.selectEnterpriseName = enterpriseName;
    },
    handleOk() {
      if (this.selectEnterpriseId && this.selectEnterpriseName) {
        this.enterpriseId = this.selectEnterpriseId;
        this.enterpriseName = this.selectEnterpriseName;
        this.visible = false;
        this.showRedBorder = false;
      } else {
        this.$message.error('没有选择所属企业');
      }
    },
    addEdit() {
      if (this.$route.path === '/account/add') {
        if (!this.enterpriseId) {
          this.showRedBorder = true;
        }
        this.$refs.thisForm.validate(valid => {
          if (valid && !this.showRedBorder) {
            this.thisForm = Object.assign(this.thisForm, {
              enterpriseId: this.enterpriseId,
              enterpriseName: this.enterpriseName
            });
            this.thisForm.password = md5(this.thisForm.password);
            this.thisForm.confirmPassword = md5(this.thisForm.confirmPassword);
            this.btnloading = true;
            api.addAccount(this.thisForm).then(resp => {
              if (resp.code === 200) {
                this.$message.success('添加成功');
                this.$router.back();
              }
            }).finally(() => {
              this.btnloading = false;
            });
          }
        });
      } else if (this.$route.path === '/account/edit') {
        if (!this.enterpriseId) {
          this.showRedBorder = true;
        }
        this.$refs.thisForm.validate(valid => {
          if (valid && !this.showRedBorder) {
            this.thisForm = Object.assign(this.thisForm, {
              id: this.$route.query.id,
              enterpriseId: this.enterpriseId,
              enterpriseName: this.enterpriseName,
              password: null,
              confirmPassword: null,
            });
            this.btnloading = true;
            api.updateAccount(this.thisForm).then(resp => {
              if (resp.code === 200) {
                this.$message.success('保存成功');
                this.$router.back();
              }
            }).finally(() => {
              this.btnloading = false;
            });
          }
        });
      }
    },
  }
}
</script>

<style lang="less" scoped>
.ant-form {
  padding: 20px;

  .ant-form-item {
    width: 700px;
    margin: 10px 0 10px 50px;
  }

  /deep/ .ant-calendar-picker-input {
    min-width: 200px;
  }

  /deep/ .ant-form-item-control-wrapper {
    width: 300px;
  }

  /deep/ .ant-form-item-label {
    width: 90px;
  }

  /deep/ .item-btns {
    width: 800px !important;
  }

  /deep/ .item-btns .item-btn {
    margin-right: 20px;
  }
}

.common-title {
  color: #666;
  padding: 20px 0 20px 30px;

  .common-title-content {
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    padding-left: 8px;
    border-left: 3px solid rgba(33, 33, 206, 0.5);
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0 0;

  button {
    margin-left: 20px;
  }
}

.companySelect {
  width: 100%;
  line-height: 32px;
  height: 32px;
  border: 1px solid #bfbfbf;
  color: #bfbfbf;
  background-color: rgba(0, 0, 0, 0.02);
  padding-left: 10px;
  border-radius: 3px;
  cursor: pointer;
}

.companySelectTip {
  color: #f5222d;
  margin: 0;
  line-height: 1.5;
  padding-top: 3px;
}

.border-red {
  border-color: #f5222d;
}
</style>
