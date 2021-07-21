<template>
  <div style="height: 100%;">
    <a-form-model :model="thisForm" layout="inline" ref="thisForm" labelAlign="left">
      <a-form-model-item label="订单编号" prop="orderNo">
        <a-input v-model="thisForm.orderNo" placeholder="请输入订单编号"/>
      </a-form-model-item>
      <a-form-model-item class="item-btns">
        <a-button class="item-btn" type="primary" @click="getList()">查询</a-button>
        <a-button class="item-btn" @click="$router.push({path: '/negative/add'})" type="primary">新增</a-button>
      </a-form-model-item>
    </a-form-model>
    <div id="neighborhoodLife">
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
              <span slot="action" slot-scope="scope">
                <a-button type="link"
                          @click="$router.push({path: '/negative/show', query: {id: scope.id}})">查看详情</a-button>
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
                style="margin-top:30px;width:100%;text-align: right;"
            />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import api from "./../../api";

export default {
  components: {},
  data() {
    return {
      thisForm: {
        orderNo: null
      },
      tableColumns: [
        {
          title: "负数单编号",
          dataIndex: "negativeNo",
          width: 300,
        },
        {
          title: "订单编号",
          dataIndex: "saleOrderNo",
          width: 300,
        },
        {
          title: "备注",
          dataIndex: "remark",
          width: 250,
        },
        {
          title: "创建人",
          dataIndex: "createUser",
          width: 200,
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
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
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
    getList() {
      this.tableLoading = true;
      api.queryNegativeList({
        ...this.thisForm,
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
    width: 330px;
  }

  /deep/ .ant-form-item-control-wrapper {
    width: 230px;
  }

  /deep/ .ant-calendar-picker-input {
    width: 230px;
  }

  /deep/ .ant-form-item-label {
    width: 80px;
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
