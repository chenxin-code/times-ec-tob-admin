<template>
  <div style="height: 100%;display: flex;">
    <div style="width: 20%;overflow: auto;">
      <companyTree @onSelect="onSelect" />
    </div>
    <div style="width: 80%;">
      <a-form-model :model="thisForm" layout="inline" ref="thisForm" labelAlign="left">
        <a-form-model-item label="企业名称" prop="enterpriseName">
          <a-input v-model="thisForm.enterpriseName" placeholder="请输入企业名称" :maxLength='30'/>
        </a-form-model-item>
        <a-form-model-item class="item-btns">
          <a-button class="item-btn" type="primary" @click="getList()">查询</a-button>
          <a-button class="item-btn" @click="reset()">重置</a-button>
          <a-button class="item-btn" @click="$router.push({path: '/company/add'})" type="primary">新增</a-button>
        </a-form-model-item>
      </a-form-model>
      <a-row style="padding: 0 20px;height: 100%;">
        <a-col>
          <a-table
              :columns="tableColumns"
              :row-key="(r,i) => i"
              :data-source="tableData"
              :scroll="{ x: 1000, y:scrollY}"
              :pagination="false"
              :loading="tableLoading">
            <template slot="statusStr" slot-scope="scope">
              <div class="editable-row-operations">
                <span v-html="statusStrParse(scope.status)"></span>
              </div>
            </template>
              <span slot="action" slot-scope="scope">
                <a-button type="link" @click="$router.push({path: '/company/edit', query: {id: scope.id}})">编辑</a-button>
                <a-button type="link" @click="showToken(scope.accountNumber,scope.password)">查看token</a-button>
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
              style="margin-top:30px;width:100%;text-align: right;"
          />
        </a-col>
      </a-row>
    </div>
    <a-modal :centered="true" v-model="showTokenModal" title="查看token" :maskClosable="false">
      <template slot="footer">
        <a-button key="back" @click="showTokenModal = false">关闭</a-button>
      </template>
      <a-form layout="inline">
        <a-form-item style="font-size: 18px;" class="token-modal">
          <div>
            <span style="margin-right: 10px;">
              <span>账号：</span>
            </span>
            <span style="color: #a1a1a1;">{{accountNumber}}</span>
          </div>
          <div>
            <span style="margin-right: 10px;">
              <span>密钥：</span>
            </span>
            <span style="color: #a1a1a1;">{{password}}</span>
          </div>
        </a-form-item>
      </a-form>
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
      accountNumber: null,
      password: null,
      showTokenModal: false,
      parentId: null,
      scrollY:100,
      thisForm: {
        enterpriseName: null
      },
      tableColumns: [
        {
          title: "企业名称",
          dataIndex: "enterpriseName",
          width: 200,
        },
        {
          title: "父企业名称",
          dataIndex: "parentName",
          width: 200,
        },
        {
          title: "企业编码",
          dataIndex: "enterpriseCode",
          width: 200,
        },
        {
          title: "企业状态",
          key: 'statusStr',
          scopedSlots: { customRender: 'statusStr' },
          width: 200,
        },
        {
          title: "经营范围",
          dataIndex: "businessScope",
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
  computed: {
    statusStrParse() {
      return param => {
        if (param === 0) {
          return '正常';
        } else if (param === 1) {
          return '停用';
        } else {
          return '';
        }
      }
    },
  },
  mounted() {
    this.getList();
    setTimeout(() => this.scrollY = document.body.clientHeight - 320 + 'px', 0);
  },
  methods: {
    reset(){
      this.parentId = null;
      this.thisForm.enterpriseName = null;
      this.current = 1;
      this.pageSize = 10;
      this.getList();
    },
    showToken(accountNumber,password){
      console.log(accountNumber,password);
      this.accountNumber = accountNumber;
      this.password = password;
      this.showTokenModal = true;
    },
    onSelect(id, enterpriseName){
      console.log(id, enterpriseName);
      this.parentId = id;
      this.current = 1;
      this.pageSize = 10;
      this.getList();
    },
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
    getList() {
      this.tableLoading = true;
      api.getProjectList({
        ...this.thisForm,
        pageNum: this.current,
        pageSize: this.pageSize,
        parentId: this.parentId,
        queryType: 1,
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

  > .token-modal {
    width: 500px;
    /deep/ .ant-form-item-control-wrapper {
      width: 500px;
    }
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
