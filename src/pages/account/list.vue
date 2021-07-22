<template>
  <div style="height: 100%;display: flex;">
    <div style="width: 20%;overflow: auto;">
      <companyTree @onSelect="onSelect"/>
    </div>
    <div style="width: 80%;">
      <a-form-model :model="thisForm" layout="inline" ref="thisForm" labelAlign="left">
        <a-form-model-item label="姓名" prop="accountName">
          <a-input v-model="thisForm.accountName" placeholder="请输入姓名" :maxLength='30'/>
        </a-form-model-item>
        <a-form-model-item class="item-btns">
          <a-button class="item-btn" type="primary" @click="getList()">查询</a-button>
          <a-button class="item-btn" @click="$router.push({path: '/account/add'})" type="primary">新增</a-button>
        </a-form-model-item>
      </a-form-model>
      <div class="content-main" ref="content_main">
        <a-row style="padding: 20px;height: 100%;">
          <a-col>
            <a-table
                :columns="tableColumns"
                :row-key="(r,i) => i"
                :data-source="tableData"
                :scroll="{ x: 1000 }"
                :pagination="false"
                :loading="tableLoading"
                style="margin-top: 8px;">
              <template slot="accountState" slot-scope="scope">
                <div class="editable-row-operations">
                  <span v-html="accountStateParse(scope.accountState)"></span>
                </div>
              </template>
              <span slot="action" slot-scope="scope">
                <a-button type="link"
                          @click="$router.push({path: '/account/edit', query: {id: scope.id,loginName: scope.loginName}})">编辑</a-button>
                <a-button type="link" @click="updatePwd(scope.loginName)">修改密码</a-button>
                <a-button type="link" @click="goDel(scope.loginName)">删除</a-button>
              </span>
            </a-table>
            <a-pagination
                :total="total"
                :show-total="total => `共 ${total} 条`"
                show-quick-jumper
                show-size-changer
                v-model="current"
                :default-current="current"
                :page-size.sync="pageSize"
                :pageSizeOptions="['1','10','20','50','100']"
                @change="onShowSizeChange"
                @showSizeChange="onShowSizeChange"
                style="margin-top: 30px;width: 100%;text-align: right;"/>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-modal :centered="true" v-model="showPwdModal" title="修改密码" :maskClosable="false" on-ok="handlePhoneOk()">
      <template slot="footer">
        <a-button :disabled="modalLoading" key="back" @click="showPwdModal = false">取消</a-button>
        <a-button :disabled="modalLoading" key="submit" type="primary" :loading="modalLoading" @click="handlePhoneOk()">
          确定
        </a-button>
      </template>
      <a-form layout="inline">
        <a-form-item>
          <div style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
            <div
                style="width: 150px;margin-right: 10px;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;">
              <span>登录名</span>
            </div>
            <span style="width: 350px;color: #a1a1a1;">{{ loginName }}</span>
          </div>
          <div style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
            <div
                style="width: 150px;margin-right: 10px;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;">
              <span style="color: red;">*</span>
              <span>密码</span>
            </div>
            <a-input-password v-model="newPwd" style="width: 350px;" :class="{ redBorder: pwdNull }"
                              placeholder="请输入密码"/>
          </div>
          <div v-if="pwdNull"
               style="color: red;border-color: red;padding: 5px 0 5px 77px;font-size: 14px;line-height: 14px;">请输入密码
          </div>
          <div style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
            <div
                style="width: 150px;margin-right: 10px;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;">
              <span style="color: red;">*</span>
              <span>确认密码</span>
            </div>
            <a-input-password v-model="newPwd2" style="width: 350px;" :class="{ redBorder: pwd2Null || pwdDiff }"
                              placeholder="请输入确认密码"/>
          </div>
          <div v-if="pwd2Null"
               style="color: red;border-color: red;padding: 5px 0 5px 77px;font-size: 14px;line-height: 14px;">请输入确认密码
          </div>
          <div v-if="!pwd2Null && pwdDiff"
               style="color: red;border-color: red;padding: 5px 0 5px 77px;font-size: 14px;line-height: 14px;">两次输入密码不一致
          </div>
        </a-form-item>
      </a-form>
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
    return {
      loginName: null,
      showPwdModal: false,
      modalLoading: false,
      pwdNull: false,
      pwd2Null: false,
      pwdDiff: false,
      newPwd: null,
      newPwd2: null,
      enterpriseId: null,
      thisForm: {
        accountName: null
      },
      tableColumns: [
        {
          title: "姓名",
          dataIndex: "accountName",
          width: 200,
        },
        {
          title: "登录名",
          dataIndex: "loginName",
          width: 200,
        },
        {
          title: "所属企业",
          dataIndex: "enterpriseName",
          width: 200,
        },
        {
          title: "手机号码",
          dataIndex: "accountPhone",
          width: 200,
        },
        {
          title: "电子邮箱",
          dataIndex: "email",
          width: 200,
        },
        {
          title: "用户状态",
          key: 'accountState',
          scopedSlots: {customRender: 'accountState'},
          width: 200,
        },
        {
          title: "操作",
          key: "operation",
          fixed: "right",
          width: 250,
          scopedSlots: {customRender: "action"},
        },
      ],
      tableData: [],
      tableLoading: false,
      total: 0,
      pageSize: 10,
      current: 1,
    }
  },
  computed: {
    accountStateParse() {
      return param => {
        if (param === 'NORMAL') {
          return '正常';
        } else if (param === 'DISABLED') {
          return '禁用';
        } else {
          return '';
        }
      }
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    onSelect(id, enterpriseName) {
      console.log(id, enterpriseName);
      this.enterpriseId = id;
      this.current = 1;
      this.pageSize = 10;
      this.getList();
    },
    updatePwd(loginName) {
      this.loginName = loginName;
      this.showPwdModal = true;
    },
    goDel(loginName) {
      this.$confirm({
        title: `删除账号`,
        content: `您确定要删除该账号吗？`,
        centered: true,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.tableLoading = true;
          api.delAccount({loginName: loginName}).then(resp => {
            if (resp.code === 200) {
              this.$message.success('删除成功');
              this.getList();
            }
          }).finally(() => {
            this.tableLoading = false;
          });
        }
      });
    },
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
    getList() {
      this.tableLoading = true;
      api.queryAccountList({
        ...this.thisForm,
        enterpriseId: this.enterpriseId,
        pageNum: this.current,
        pageSize: this.pageSize,
      }).then(resp => {
        if (resp.code === 200) {
          this.tableData = resp.data.records;
          this.total = Number(resp.data.total);
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    handlePhoneOk() {
      if (!this.newPwd) {
        this.pwdNull = true;
      }
      if (!this.newPwd2) {
        this.pwd2Null = true;
      }
      if (this.pwdNull || this.pwd2Null) {
        return;
      }
      if (this.newPwd !== this.newPwd2) {
        this.pwdDiff = true;
        return;
      }
      this.modalLoading = true;
      api.updatePassword({
        loginName: this.loginName,
        newPwd: md5(this.newPwd),
      }).then(resp => {
        if (resp.code === 200) {
          this.$message.success('操作成功');
          this.loginName = null;
          this.modalLoading = false;
          this.pwdNull = false;
          this.pwd2Null = false;
          this.pwdDiff = false;
          this.newPwd = null;
          this.newPwd2 = null;
          this.showPwdModal = false;
        }
      }).finally(() => {});
    },
  },
  watch: {
    newPwd: {
      handler(newVal) {
        if (newVal) {
          this.pwdNull = false;
        }
      },
      immediate: true,
    },
    newPwd2: {
      handler(newVal) {
        if (newVal) {
          this.pwd2Null = false;
        }
      },
      immediate: true,
    },
  }
}
</script>

<style lang="less" scoped>
.ant-form {
  padding: 20px;

  > div {
    width: 300px;
  }

  /deep/ .ant-form-item-control-wrapper {
    width: 250px;
  }

  /deep/ .ant-calendar-picker-input {
    width: 250px;
  }

  /deep/ .ant-form-item-label {
    width: 50px;
  }

  /deep/ .item-btns {
    width: 500px !important;

    .ant-form-item-control-wrapper {
      width: 400px !important;
    }
  }

  /deep/ .item-btns .item-btn {
    margin-right: 20px;
  }

  /deep/ .redBorder .ant-input {
    border-color: red;
  }
}
</style>
