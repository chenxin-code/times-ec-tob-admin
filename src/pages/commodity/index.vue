<template>
  <div style="height: 100%;">
    <a-form-model :model="form" layout="inline" ref="thisForm" labelAlign='left'>
      <a-form-model-item label="SKU名称/SKU编码" prop="a">
        <a-input v-model="form.sku" placeholder="请输入SKU名称或SKU编码" :maxLength='30'/>
      </a-form-model-item>
      <a-form-model-item label="商品状态" prop="b">
        <a-select v-model="form.b" placeholder="请选择">
          <a-select-option :value="v.v" :label="v.n" v-for="(v,i) in selectArr" :key="i">
            {{ v.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
       <a-form-model-item label="商品品类" prop="d">
        <a-select v-model="form.d" placeholder="请选择">
          <a-select-option :value="v.v" :label="v.n" v-for="(v,i) in selectArr" :key="i">
            {{ v.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="所属供应商" prop="d">
        <a-select v-model="form.d" placeholder="请选择">
          <a-select-option :value="v.v" :label="v.n" v-for="(v,i) in selectArr" :key="i">
            {{ v.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="item-btns">
        <a-button class="item-btn" type="primary" @click="quitList()">查询</a-button>
        <a-button class="item-btn" @click="_toReset()">重置</a-button>
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
                :scroll="{ x: 1300 ,y:scrollY}"
                :pagination="false"
                :loading="tableLoading"
                style="margin-top: 8px;">
              <span slot="action" slot-scope="scope">
                <a-button type="link"  @click="edit(scope)">查看</a-button>
                <a-button type="link" @click="edit(scope)">编辑</a-button>
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
 name:'commodity',
  components: {},
  data() {
    return {
      scrollY:100,
      selectArr: [
        {id: '一', name: '1'},
        {id: '二', name: '2'},
        {id: '三', name: '3'},
      ],
      form: {
        a: null,
        b: null,
        c: null,
        d: null,
      },
      tableColumns: [
        {
          title: "商品名称",
          dataIndex: "brandName",
          key:"brandName",
          width: 200,
        },
        {
          title: "SPU编码",
          dataIndex: "itemName",
          key:"itemName",
          width: 200,
        },
        {
          title: "SKU名称",
          dataIndex: "skuName",
          key:"skuName",
          width: 200,
        },
        {
          title: "SKU编码",
          dataIndex: "skuCode",
          key:"skuCode",
          width: 200,
        },
        {
          title: "商品品类",
          dataIndex: "categoryName",
          key:"categoryName",
          width: 200,
        },
        {
          title: "单位",
          dataIndex: "unit",
          key:"unit",
          width: 200,
        },
        {
          title: "供应商",
          width: 200,
          dataIndex: "supplierName",
          key:"supplierName",
        },
        {
          title: "品牌",
          width: 200,
          dataIndex: "brandName",
          key:"brandName",
        },
        {
          title: "税率",
          width: 200,
          dataIndex: "taxRate",
          key:"taxRate",
        },
        {
          title: "库存",
          width: 200,
          dataIndex: "stock",
          key:"stock",
        },
        {
          title: "是否阶梯价",
          width: 200,
          dataIndex: "",
        },
        {
          title: "成本价（数量=元）",
          width: 200,
          key:"costPrice",
          dataIndex: "costPrice",
        },
        {
          title: "税前销售价（数量=元）",
          width: 200,
          key:"beforeTaxSellingPrice",
          dataIndex: "beforeTaxSellingPrice",
        },
        {
          title: "税后销售价（数量=元）",
          width: 200,
          key:"afterTaxSellingPrice",
          dataIndex: "afterTaxSellingPrice",
        },
        {
          title: "商品状态",
          width: 200,
          dataIndex: "",
        },
        {
          title: "操作",
          key: "operation",
          fixed: "right",
          width: 180,
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
   created() {
    const timer1 = setTimeout(() => {
      this.scrollY = document.body.clientHeight - 390 + 'px';
    }, 0);
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer1);
    });
  },
   mounted() {
    this.getList();
  },
  methods: {
      edit(){
          this.$router.push({ name: 'commodityEdit', params: { userId: 1 }})
      },
      //重置
    _toReset() {
      this.$refs.thisForm.resetFields();
      this.getList();
    },
    //分页
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
    //查询
    quitList(){
      this.current = 1;
      this.getList()
    },
    //获取列表
    getList() {
      this.tableLoading = true;
      let params = {
        categoryId: this.form.sku,
        // keyword: "",
        // selling: 0,
        // supplierId: 0
        pageNum: this.current,
        pageSize: this.pageSize,
      }
      api.getProductListByPager(params).then(resp => {
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
