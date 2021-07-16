<template>
  <div style="height: 100%;display: flex;">
    <div style="width: 20%;overflow: auto;">
      <companyTree @onSelect="onSelect" />
    </div>
    <div style="width: 80%;">
      <a-form-model :model="form" layout="inline" ref="thisForm" labelAlign='left'>
        <a-form-model-item label="账号名称" prop="a">
          <a-input v-model="form.a" placeholder="请输入账号名称" :maxLength='30'/>
        </a-form-model-item>
        <a-form-model-item class="item-btns">
          <a-button class="item-btn" type="primary" @click="getList()">查询</a-button>
          <a-button class="item-btn" @click="_toReset()">重置</a-button>
          <a-button class="item-btn" @click="newOrder()" type="primary">新增</a-button>
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
              <span slot="action" slot-scope="text, record">
                <a-button type="link">编辑</a-button>
                <a-button type="link">删除</a-button>
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
                style="margin-top: 30px;width: 100%;text-align: right;" />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import api from "./../../api";
import companyTree from './../../components/companyTree';
export default {
  components: {companyTree},
  data() {
    return {
      form: {
        a: null
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
          title: "所属机构",
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
          dataIndex: "accountState",
          width: 200,
        },
        {
          title: "操作",
          key: "operation",
          fixed: "right",
          width: 200,
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
  mounted() {
    this.getList();
  },
  methods: {
    onSelect(selectedKeys){
      console.log('选中了', selectedKeys);
    },
    newOrder() {
      this.$router.push({path: '/account/add'});
    },
    _toReset() {
      this.$refs.thisForm.resetFields();
      this.getList();
    },
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
    getList() {
      this.tableLoading = true;
      api.queryAccountList({
        ...this.form,
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
  }
}
</script>

<style lang="less" scoped>
.ant-form {
  padding: 20px;

  > div {
    width: 350px;
  }

  /deep/ .ant-form-item-control-wrapper {
    width: 250px;
  }

  /deep/ .ant-calendar-picker-input {
    width: 250px;
  }

  /deep/ .ant-form-item-label {
    width: 100px;
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
}
</style>
