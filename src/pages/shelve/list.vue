<template>
  <div style="height: 100%;">
    <a-form-model  layout="inline" ref="thisForm" labelAlign="left">
      <a-form-model-item label="SKU名称/SKU编码" prop="a">
        <a-input v-model="sku" placeholder="请输入SKU名称或SKU编码" :maxLength='30'/>
      </a-form-model-item>
      <a-form-model-item label="状态" prop="b">
        <a-select default-value="全部" @change="(value)=>this.selling = value">
            <a-select-option :value="v.id" v-for="(v,i) in selectArrstrain" :key="i">
              {{v.name}}
            </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="商品品类" prop="d">
       <a-tree-select
    v-model="value"
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    :replace-fields="{children:'children',key:'categoryCode',value:'categoryId',title:'name'}"
    @change='(value)=>this.categoryId = value'
    defaultValue="全部"
    tree-default-expand-all
  >
  </a-tree-select>
      </a-form-model-item>
      <a-form-model-item label="所属供应商" prop="d">
        <a-select default-value='全部' @change="(value)=>this.status = value">
          <a-select-option :value="item.id"  v-for="item in selectlist" :key="item.id">
            {{item.supplierName}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="item-btns">
        <a-button class="item-btn" type="primary" @click="getList()">查询</a-button>
        <a-button class="item-btn" :disabled="disBtn" @click="piliang('on')" :loading="piliangLoading" type="primary">批量上架</a-button>
        <a-button class="item-btn" :disabled="disBtn" @click="piliang('off')" :loading="piliangLoading" type="primary">批量下架</a-button>
      </a-form-model-item>
    </a-form-model>
    <div id="neighborhoodLife">
      <div class="content-main" ref="content_main">
        <a-row style="padding: 4px;height: 100%;">
          <a-col>
            <a-table
                :row-selection="rowSelection"
                :columns="tableColumns"
                :row-key="(r,i) => i"
                :data-source="tableData"
                :scroll="{ x: 1000 ,y: scrollY}"
                :pagination="false"
                :loading="tableLoading"
                style="margin-top: 8px;">
              <span slot="action" slot-scope="scope">
                <a-button type="link" @click="$router.push({ name: 'shelveEdit', params: { id: scope.id ,typ: '1'}})">查看详情</a-button>
                <a-button v-if="scope.selling" type="link" @click="updates(scope)">上架</a-button>
                <a-button v-else type="link" @click="updates(scope)">下架</a-button>
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
                style="margin-top: 10px;width: 100%;text-align: right;"/>
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
      scrollY:100,
      selectArrstrain:[ //有bug
        {id: '', name: '全部'},
        {id: -1, name: '上架'},
        {id: -1, name: '下架'},
      ],
     treeData: [],
     categoryId:'',//下拉树
      value: undefined,
      selectlist:[],
        sku: '',
        status: '',
        selling: '',//山下架
        supplier: '',
      tableColumns: [
        {
          title: "序号",
          key: "index",
          width: 60,
          fixed: "left",
          customRender: (text,record,index) => `${index+1}`,
        },
        {
          title: "商品名称",
          dataIndex: "itemName",
          key:"itemName",
          width: 200,
        },
        {
          title: "SPU编码",
          dataIndex: "itemCode",
          key:"itemCode",
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
          width: 100,
        },
        {
          title: "供应商",
          width: 200,
          dataIndex: "supplierName",
          key:"supplierName",
        },
         {
          title: "库存",
          width: 100,
          dataIndex: "stock",
          key:"stock",
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
      piliangLoading: false,
      disBtn: true,
      beSelected: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          let that = this;
          that.beSelected = selectedRows.map((item)=>{
            return item.id
          })
          this.disBtn = selectedRows.length === 0
        }
      },
    }
  },
  created() {
    api.getSupplierListByPager({"pageNum":1,"pageSize":10000}).then((res)=>{
       this.selectlist = res.data.records;
       this.selectlist.unshift({id:'',supplierName:'全部'})
     })
     api.getCategoryTree().then(resp => {
        this.treeData = resp.data;
        this.treeData.unshift({categoryId:'',name:"全部"})
    })
  },
  mounted() {
    this.getList();
    const timer1 = setTimeout(() => {
      this.scrollY = document.body.clientHeight - 290 + 'px';
    }, 0);
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer1);
    });
  },
  methods: {
    piliang(type) {//批量上下架
      if(type === 'on') this.updateseli(1);
      else this.updateseli(0);
    },
    updateseli(type){
        this.$confirm({
        title: `批量状态更改`,
        content: `您确定要执行${type== 0 ?'批量下架':'批量上架'}？`,
        centered: true,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.tableLoading = true;
            api.updateSelling({ids:this.beSelected,selling:type}).then((res)=>{
              this.$message.success(`${type== 0 ?'批量下架':'批量上架'}成功`);
              this.piliangLoading = false;
              this.getList();
          }).finally(() => {
            this.tableLoading = false;
          });
        }
      });
    },
    updates(scope){//单独上下架
     this.$confirm({
        title: `状态更改`,
        content: `您确定要执行${scope.selling?'上架':'下架'}？`,
        centered: true,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.tableLoading = true;
           api.updateSellingById(scope.id).then((res)=>{
              this.$message.success(`${scope.selling?'上架':'下架'}成功`);
              this.getList();
          }).finally(() => {
            this.tableLoading = false;
          });
        }
      });
     
    },
    onShowSizeChange(current, pageSize) {//分页
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
    getList() {
      this.tableLoading = true;
      let params = {
        categoryId: this.categoryId, //商品id
        keyword: this.sku,
        selling: this.selling,//上下架
        supplierId: this.status,//供应商id
        pageNum: this.current,
        pageSize: this.pageSize,
      }
      JSON.stringify(params)
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
  padding: 6px;


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
    width: 300px !important;

    .ant-form-item-control-wrapper {
      width: 300px !important;
    }
  }

  /deep/ .item-btns .item-btn {
    margin-right: 20px;
  }
}
</style>
