<template>
  <div style="height: 100%;">
    <a-form-model layout="inline" ref="thisForm" labelAlign="left">
      <a-form-model-item label="SKU名称/编码" prop="a">
        <a-input
          v-model="sku"
          placeholder="请输入SKU名称或编码"
          :maxLength="30"
        />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="b">
        <a-select default-value="全部" @change="handleChangesataus">
          <a-select-option
            :value="v.id"
            v-for="(v, i) in selectArrstrain"
            :key="i"
          >
            {{ v.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品品类" prop="d">
        <a-tree-select
          v-model="value"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="treeData"
          :replace-fields="{
            children: 'children',
            key: 'categoryCode',
            value: 'categoryId',
            title: 'name',
          }"
          @change="onChange"
          defaultValue="全部"
          tree-default-expand-all
        >
        </a-tree-select>
      </a-form-model-item>
      <a-form-model-item label="所属供应商" prop="d">
        <a-select default-value="全部" @change="handleChange">
          <a-select-option
            :value="item.id"
            v-for="item in selectlist"
            :key="item.id"
          >
            {{ item.supplierName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="quitList()"
          >查询</a-button
        >
        <!-- <a-button class="item-btn" @click="_toReset()">重置</a-button> -->
      </a-form-model-item>
    </a-form-model>
    <div id="neighborhoodLife">
      <div class="content-main" ref="content_main">
        <a-row style="padding: 4px;height: 100%;">
          <a-col>
            <a-table
              :columns="tableColumns"
              :row-key="(r, i) => i"
              :data-source="tableData"
              :scroll="{ x: 1300, y: scrollY }"
              :pagination="false"
              :loading="tableLoading"
              style="margin-top: 8px;"
            >
              <span slot="action" slot-scope="scope">
                <a-button type="link" @click="edit(scope, '1')">查看</a-button>
                <a-button type="link" @click="edit(scope, '2')">编辑</a-button>
              </span>
              <template slot="isTieredPricing" slot-scope="scope">
              {{scope.isTieredPricing== true?'是':'否'}}
            </template>
               <template slot="costPrice" slot-scope="scope">
              <div class="editable-row-operations" v-for="item in scope.costPrice" :key="item.skuId">
                <p v-if="scope.isTieredPricing">{{item.minNum}}-{{item.maxNum?item.maxNum:'无穷大'}} : {{ item.costPrice}}</p>
                <p v-else > {{ item.costPrice}}</p>
              </div>
            </template>
            
            <template slot="sellingPrice" slot-scope="scope">
              <div class="editable-row-operations" v-for="item in scope.sellingPrice" :key="item.skuId">
                <p v-if="scope.isTieredPricing">{{item.minNum}}-{{item.maxNum?item.maxNum:'无穷大'}} : {{ item.priceBeforeTax}}</p>
                <p v-else > {{ item.priceBeforeTax}}</p>
              </div>
            </template>

            <template slot="sellingPrice" slot-scope="scope">
              <div class="editable-row-operations" v-for="item in scope.sellingPrice" :key="item.skuId">
                <p v-if="scope.isTieredPricing">{{item.minNum}}-{{item.maxNum?item.maxNum:'无穷大'}} : {{ item.priceBeforeTax}}</p>
                <p v-else > {{ item.priceBeforeTax}}</p>
              </div>
            </template>

            <template slot="sellingPricepro" slot-scope="scope">
              <div class="editable-row-operations" v-for="item in scope.sellingPrice" :key="item.skuId">
                <p v-if="scope.isTieredPricing">{{item.minNum}}-{{item.maxNum?item.maxNum:'无穷大'}} : {{ item.priceBeforeTax}}</p>
                <p v-else > {{ item.priceBeforeTax}}</p>
              </div>
            </template>

            </a-table>
            <a-pagination
              :total="total"
              :show-total="total => `共 ${total} 条`"
              show-quick-jumper
              show-size-changer
              v-model="current"
              :default-current="current"
              :page-size.sync="pageSize"
              :pageSizeOptions="['1', '10', '20', '50', '100']"
              @change="onShowSizeChange"
              @showSizeChange="onShowSizeChange"
              style="margin-top: 10px;width: 100%;text-align: right;"
            />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'commodity',
  components: {},
  data() {
    return {
      tableData: [],
      tableLoading: false,
      total: 0,
      pageSize: 10,
      current: 1,
      treeData: [],
      value: undefined,
      scrollY: 100,
      selectArrstrain: [
        { id: '', name: '全部' },
        { id: '1', name: '上架' },
        { id: '2', name: '下架' },
      ],
      selectlist: [],
      sku: '',
      status: '',
      strain: '',
      categoryId: '',
      tableColumns: [
        {
          title: "序号",
          key: "index",
          width: 60,
          fixed: "left",
          customRender: (text,record,index) => `${index+1}`,
        },
        {
          title: '商品名称',
          dataIndex: 'itemName',
          key: 'itemName',
          width: 200,
        },
        {
          title: 'SPU编码',
          dataIndex: 'itemCode',
          key: 'itemCode',
          width: 200,
        },
        {
          title: 'SKU名称',
          dataIndex: 'skuName',
          key: 'skuName',
          width: 200,
        },
        {
          title: 'SKU编码',
          dataIndex: 'skuCode',
          key: 'skuCode',
          width: 200,
        },
        {
          title: '商品品类',
          dataIndex:'categoryName',
          // scopedSlots: { customRender: 'categoryName'},
          key: 'categoryName',
          width: 100,
        },
        {
          title: '单位',
          dataIndex: 'unit',
          key: 'unit',
          width: 60,
        },
        {
          title: '供应商',
          width: 200,
          dataIndex: 'supplierName',
          key: 'supplierName',
        },
        {
          title: '品牌',
          width: 200,
          dataIndex: 'brandName',
          key: 'brandName',
        },
        {
          title: '税率',
          width: 60,
          dataIndex: 'taxRate',
          key: 'taxRate',
        },
        {
          title: '库存',
          width: 80,
          dataIndex: 'stock',
          key: 'stock',
        },
        {
          title: '是否阶梯价',
          width: 80,
          key: 'isTieredPricing',
          scopedSlots: { customRender: 'isTieredPricing'}
          // customRender:(isTieredPricing)=>isTieredPricing == 'true' ? '是':'否',
        },
        {
          title: '成本价(数量=元)',
          width: 100,
          key: 'costPrice',
          scopedSlots: { customRender: 'costPrice'}
        },
        {
          title: '税前销售价(数量=元)',
          width: 120,
          key: 'sellingPrice',
          // dataIndex: 'beforeTaxSellingPrice',
          scopedSlots: { customRender: 'sellingPrice'}
        },
        {
          title: '税后销售价(数量=元)',
          width: 120,
          // key: 'sellingPrice',
          // dataIndex: 'sellingPrice',
          scopedSlots: { customRender: 'sellingPricepro'}
        },
        {
          title: '商品状态',
          customRender:(selling)=>selling==1?'上架':'下架',
          width: 90,
          dataIndex: 'selling',
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 180,
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  created() {
    this.getList() //列表
    this.supplierlis() //供应商
    api.getCategoryTree().then(resp => {
      this.treeData = resp.data
      this.treeData.unshift({ categoryCode: '', name: '全部' })
      // replaceFields
    })
    setTimeout(
      () => (this.scrollY = document.body.clientHeight - 310 + 'px'),
      0
    )
  },
  methods: {
    onChange(value) {
      this.categoryId = value
    },
    supplierlis(value) {
      api
        .getSupplierListByPager({
          keyword: value ?? '',
          pageNum: 1,
          pageSize: 100000,
        })
        .then(res => {
          this.selectlist = res.data.records
          this.selectlist.unshift({ id: '', supplierName: '全部' })
        })
    },
    handleChange(value) {
      this.status = value
    },
    handleChangesataus(value) {
      this.strain = value
    },
    edit(scope, typ) {
      console.log(typ)
      this.$router.push({
        name: 'commodityEdit',
        params: { id: scope.id, typ: typ },
      })
    },
    //分页
    onShowSizeChange(current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      this.getList()
    },
    //查询
    quitList() {
      this.current = 1
      this.getList()
    },
    //获取列表
    getList() {
      this.tableLoading = true
      let params = {
        categoryId: this.categoryId, //商品品类
        keyword: this.sku,
        selling: this.strain, //上下架
        supplierId: this.status, //供应商id
        pageNum: this.current,
        pageSize: this.pageSize,
      }
      JSON.stringify(params)
      api
        .getProductListByPager(params)
        .then(resp => {
          if (resp.code === 200) {
            this.tableData = resp.data.records
            this.total = resp.data.total * 1
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.ant-form {
  padding: 6px;

  // > div {
  //   width: 400px;
  // }

  /deep/ .ant-form-item-control-wrapper {
    width: 250px;
  }

  /deep/ .ant-calendar-picker-input {
    width: 250px;
  }

  /deep/ .ant-form-item-label {
    width: 120px;
    text-align: right;
  }

  /deep/ .item-btns {
    width: 250px !important;

    .ant-form-item-control-wrapper {
      width: 400px !important;
    }
  }

}
</style>
