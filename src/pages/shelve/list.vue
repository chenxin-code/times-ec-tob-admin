<template>
  <div style="height: 100%;">
    <a-form-model :model="thisForm" layout="inline" ref="thisForm" labelAlign="left">
      <a-form-model-item label="SKU名称/SKU编码" prop="a">
        <a-input v-model="thisForm.a" placeholder="请输入SKU名称或SKU编码" :maxLength='30'/>
      </a-form-model-item>
      <a-form-model-item label="商品状态" prop="b">
        <a-select v-model="thisForm.b" placeholder="请选择">
          <a-select-option :value="v.v" :label="v.n" v-for="(v,i) in selectArr" :key="i">
            {{ v.n }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="item-btns">
        <a-button class="item-btn" type="primary" @click="getList()">查询</a-button>
        <a-button class="item-btn" @click="_toReset()">重置</a-button>
      </a-form-model-item>
      <a-form-model-item label="商品品类" prop="c">
        <a-select v-model="thisForm.c" placeholder="请选择">
          <a-select-option :value="v.v" :label="v.n" v-for="(v,i) in selectArr" :key="i">
            {{ v.n }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="所属供应商" prop="d">
        <a-select v-model="thisForm.d" placeholder="请选择">
          <a-select-option :value="v.v" :label="v.n" v-for="(v,i) in selectArr" :key="i">
            {{ v.n }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="item-btns">
        <a-button class="item-btn" :disabled="disBtn" @click="piliang('on')" :loading="casLoading" type="primary">批量上架
        </a-button>
        <a-button class="item-btn" :disabled="disBtn" @click="piliang('off')" :loading="casLoading" type="primary">
          批量下架
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <div id="neighborhoodLife">
      <div class="content-main" ref="content_main">
        <a-row style="padding: 20px;height: 100%;">
          <a-col>
            <a-table
                :row-selection="rowSelection"
                :columns="tableColumns"
                :row-key="(r,i) => i"
                :data-source="tableData"
                :scroll="{ x: 1000 }"
                :pagination="false"
                :loading="tableLoading"
                style="margin-top: 8px;">
              <span slot="action" slot-scope="text, record">
                <a-button type="link">查看详情</a-button>
                <a-button type="link">上架</a-button>
                <a-button type="link">下架</a-button>
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

export default {
  components: {},
  data() {
    return {
      selectArr: [
        {n: '一', v: '1'},
        {n: '二', v: '2'},
        {n: '三', v: '3'},
      ],
      thisForm: {
        a: null,
        b: null,
        c: null,
        d: null,
      },
      tableColumns: [
        {
          title: "商品名称",
          dataIndex: "a",
          width: 200,
        },
        {
          title: "SPU编码",
          dataIndex: "b",
          width: 200,
        },
        {
          title: "SKU名称",
          dataIndex: "c",
          width: 200,
        },
        {
          title: "SKU编码",
          dataIndex: "d",
          width: 200,
        },
        {
          title: "商品品类",
          dataIndex: "e",
          width: 200,
        },
        {
          title: "供应商",
          width: 200,
          dataIndex: "f",
        },
        {
          title: "供应商",
          width: 200,
          dataIndex: "g",
        },
        {
          title: "库存",
          width: 200,
          dataIndex: "h",
        },
        {
          title: "成本价（数量=元）",
          width: 200,
          dataIndex: "i",
        },
        {
          title: "税前销售价（数量=元）",
          width: 200,
          dataIndex: "j",
        },
        {
          title: "税后销售价（数量=元）",
          width: 200,
          dataIndex: "k",
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
      casLoading: false,
      disBtn: true,
      beSelected: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.beSelected = [];
          selectedRows.forEach((item) => {
            this.beSelected.push(item.a)
          });
          this.disBtn = selectedRows.length === 0
        }
      },
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    piliang(type) {
      this.casLoading = true;
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
      this.tableData = [{
        a: 1,
        b: 1,
        c: 1,
        d: 1,
        e: 1,
        f: 1,
        g: 1,
        h: 1,
        i: 1,
        j: 1,
        k: 1
      }];
      return
      this.tableLoading = true;
      api.接口({
        ...this.thisForm,
        pageNum: this.current,
        pageSize: this.pageSize,
      }).then(resp => {
        if (resp.code === 200) {
          this.tableData = resp.data.records;
          this.total = resp.data.total * 1;
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
    width: 400px;
  }

  /deep/ .ant-form-item-control-wrapper {
    width: 250px;
  }

  /deep/ .ant-calendar-picker-input {
    width: 250px;
  }

  /deep/ .ant-form-item-label {
    width: 130px;
    text-align: right;
  }

  /deep/ .item-btns {
    width: 250px !important;

    .ant-form-item-control-wrapper {
      width: 400px !important;
    }
  }

  /deep/ .item-btns .item-btn {
    margin-right: 20px;
  }
}
</style>
