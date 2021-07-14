<template>
  <div style="height: 100%;">
    <div class="btns">
      <a-button class="item-btn" :loading='btnloading' type="primary" @click="addEdit()">保存</a-button>
      <a-button class="item-btn"  @click="$router.back()">返回</a-button>
    </div>
    <a-form-model :model="form" layout="inline" :rules="rules" ref="thisForm" labelAlign='left'>
      <div class="common-title">
        <div class="common-title-content">企业基本信息</div>
      </div>
      <a-form-model-item label="企业名称" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="父级企业" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="企业编码" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="企业人数" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <div class="common-title">
        <div class="common-title-content">企业信息</div>
      </div>
      <a-form-model-item label="经营范围" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="信用等级" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="所在地区" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="通讯地址" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="公司地址" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="备注" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <div class="common-title">
        <div class="common-title-content">联系方式</div>
      </div>
      <a-form-model-item label="企业电话" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="电子邮箱" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="联系人" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="联系电话" prop="a">
        <a-input v-model="form.a" :disabled="isDisable" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from "./../../api";
export default {
  data() {
    return {
      visible: false,
      form: {
        a: null,
        b: null,
      },
      rules: {
        a: [
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      },
      btnloading: false,
    }
  },
  mounted() {

  },
  computed: {
    isDisable() {
      return this.$route.path === '/company/edit'
    },
  },
  methods: {
    addEdit(){
      this.$refs.thisForm.validate(valid => {
        if (valid) {

        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.ant-form {
  padding: 20px;
  .ant-form-item{
    width: 600px;
    margin: 10px 0 10px 50px;
  }
  /deep/.ant-calendar-picker-input {
    min-width: 200px;
  }
  /deep/.ant-form-item-control-wrapper{
    min-width: 200px;
  }
  /deep/.ant-form-item-label{
    width: 110px;
  }
  /deep/ .item-btns{
    width: 800px !important;
  }
  /deep/ .item-btns .item-btn{
    margin-right: 20px;
  }
}
.common-title {
  color: #666;
  padding: 20px 0 0 30px;
  .common-title-content {
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    padding-left: 8px;
    border-left: 3px solid rgba(33, 33, 206, 0.5);
  }
}
.btns{
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0 0;
  button{
    margin-left: 20px;
  }
}
</style>
