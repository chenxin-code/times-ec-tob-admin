<template>
  <div style="height: 100%;">
    <div class="btns">
      <a-button class="item-btn" :loading='btnloading' type="primary" @click="addEdit()">保存</a-button>
      <a-button class="item-btn" @click="$router.back()">返回</a-button>
    </div>
    <a-form-model :model="form" layout="inline" :rules="rules" ref="thisForm" labelAlign='left'>
      <div class="common-title">
        <div class="common-title-content">企业基本信息</div>
      </div>
      <a-form-model-item label="是否顶级企业">
        <a-switch v-model="isTop"/>
      </a-form-model-item>
      <a-form-model-item label="选择父级企业" v-if="!isTop">
        <div :class="`companySelect ${showRedBorder && 'border-red'}`" @click="visible = true">
          {{ parentName }}
        </div>
        <p v-show="showRedBorder" class="companySelectTip">请选择父级企业</p>
      </a-form-model-item>
      <a-form-model-item label="企业名称" prop="enterpriseName">
        <a-input v-model="form.enterpriseName"/>
      </a-form-model-item>
      <a-form-model-item label="企业编码" prop="enterpriseCode">
        <a-input v-model="form.enterpriseCode"/>
      </a-form-model-item>
      <a-form-model-item label="企业人数" prop="employeeNum">
        <a-input v-model="form.employeeNum"/>
      </a-form-model-item>
      <div class="common-title">
        <div class="common-title-content">企业信息</div>
      </div>
      <a-form-model-item label="经营范围" prop="businessScope">
        <a-input v-model="form.businessScope"/>
      </a-form-model-item>
      <a-form-model-item label="信用等级" prop="creditLevel">
        <a-input v-model="form.creditLevel"/>
      </a-form-model-item>
      <a-form-model-item label="所在地区" prop="a">
        <a-input v-model="form.a"/>
      </a-form-model-item>
      <a-form-model-item label="通讯地址" prop="mailAddress">
        <a-input v-model="form.mailAddress"/>
      </a-form-model-item>
      <a-form-model-item label="公司地址" prop="detailAddress">
        <a-input v-model="form.detailAddress"/>
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-input v-model="form.remark"/>
      </a-form-model-item>
      <div class="common-title">
        <div class="common-title-content">联系方式</div>
      </div>
      <a-form-model-item label="企业电话" prop="enterprisePhone">
        <a-input v-model="form.enterprisePhone"/>
      </a-form-model-item>
      <a-form-model-item label="电子邮箱" prop="email">
        <a-input v-model="form.email"/>
      </a-form-model-item>
      <a-form-model-item label="联系人" prop="concatPerson">
        <a-input v-model="form.concatPerson"/>
      </a-form-model-item>
      <a-form-model-item label="联系电话" prop="concatPhone">
        <a-input v-model="form.concatPhone"/>
      </a-form-model-item>
    </a-form-model>
    <a-modal title="选择父级企业" :visible="visible" @ok="handleOk" @cancel="visible = false" width="500px">
      <companyTree @onSelect="onSelect"/>
    </a-modal>
  </div>
</template>

<script>
import api from "./../../api";
import companyTree from './../../components/companyTree';

export default {
  components: {companyTree},
  data() {
    return {
      showRedBorder: false,
      selectParentId: null,
      selectParentName: null,
      parentId: null,
      parentName: null,
      visible: false,
      isTop: true,
      form: {
        enterpriseName: null,
        enterpriseCode: null,
        employeeNum: null,
        businessScope: null,
        creditLevel: null,
        mailAddress: null,
        detailAddress: null,
        remark: null,
        enterprisePhone: null,
        email: null,
        concatPerson: null,
        concatPhone: null,
      },
      rules: {
        enterpriseName: [
          {required: true, message: '请输入企业名称', trigger: 'blur'},
        ],
        enterprisePhone: [
          {required: true, message: '请输入企业电话', trigger: 'blur'},
        ],
        concatPerson: [
          {required: true, message: '请输入联系人', trigger: 'blur'},
        ],
        concatPhone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
        ],
      },
      btnloading: false,
    }
  },
  mounted() {
    if (this.$route.path === '/company/edit') {
      api.getProjectDetail({
        id: this.$route.query.id
      }).then(resp => {
        if (resp.code === 200) {
          this.isTop = resp.data.parentId === '-1';
          this.parentId = resp.data.parentId;
          this.parentName = resp.data.parentName;
          this.form.enterpriseName = resp.data.enterpriseName;
          this.form.enterpriseCode = resp.data.enterpriseCode;
          this.form.employeeNum = resp.data.employeeNum;
          this.form.businessScope = resp.data.businessScope;
          this.form.creditLevel = resp.data.creditLevel;
          this.form.mailAddress = resp.data.mailAddress;
          this.form.detailAddress = resp.data.detailAddress;
          this.form.remark = resp.data.remark;
          this.form.enterprisePhone = resp.data.enterprisePhone;
          this.form.email = resp.data.email;
          this.form.concatPerson = resp.data.concatPerson;
          this.form.concatPhone = resp.data.concatPhone;
        }
      });
    }
  },
  computed: {},
  methods: {
    onSelect(id, enterpriseName) {
      console.log('选中了', id, enterpriseName);
      this.selectParentId = id;
      this.selectParentName = enterpriseName;
    },
    handleOk() {
      if (this.selectParentId && this.selectParentName) {
        this.parentId = this.selectParentId;
        this.parentName = this.selectParentName;
        this.visible = false;
        this.showRedBorder = false;
      } else {
        this.$message.error('没有选择父级企业');
      }
    },
    addEdit() {
      if (this.$route.path === '/company/add') {
        if (!this.isTop && !this.parentId) {
          this.showRedBorder = true;
        }
        this.$refs.thisForm.validate(valid => {
          if (valid && !this.showRedBorder) {
            if (this.isTop) {
              this.form = Object.assign(this.form, {parentId: '-1', parentName: null});
            } else {
              this.form = Object.assign(this.form, {parentId: this.parentId, parentName: this.parentName});
            }
            this.btnloading = true;
            api.addProject(this.form).then(resp => {
              if (resp.code === 200) {
                this.$message.success('操作成功');
                this.$router.back();
              }
            }).finally(() => {
              this.btnloading = false;
            });
          }
        });
      } else if (this.$route.path === '/company/edit') {
        if (!this.isTop && !this.parentId) {
          this.showRedBorder = true;
        }
        this.$refs.thisForm.validate(valid => {
          if (valid && !this.showRedBorder) {
            this.form = Object.assign(this.form, {id: this.$route.query.id, updateType: 0});
            if (this.isTop) {
              this.form = Object.assign(this.form, {parentId: '-1', parentName: null});
            } else {
              this.form = Object.assign(this.form, {parentId: this.parentId, parentName: this.parentName});
            }
            this.btnloading = true;
            api.updateProject(this.form).then(resp => {
              if (resp.code === 200) {
                this.$message.success('操作成功');
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
    width: 600px;
    margin: 10px 0 10px 50px;
  }

  /deep/ .ant-calendar-picker-input {
    min-width: 200px;
  }

  /deep/ .ant-form-item-control-wrapper {
    min-width: 200px;
  }

  /deep/ .ant-form-item-label {
    width: 110px;
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
