<template>
  <div class="shelve">
    <a-form-model layout="inline" ref="thisForm" labelAlign="left">
      <a-form-model-item
        label="SKU名称/SKU编码"
        prop="a"
        :wrapperCol="{ style: { width: '250px' } }"
      >
        <a-input
          v-model.trim="sku"
          placeholder="请输入SKU名称或SKU编码"
          :maxLength="30"
        />
      </a-form-model-item>
      <a-form-model-item
        label="状态"
        prop="b"
        :wrapperCol="{ style: { width: '250px' } }"
      >
        <a-select
          default-value="全部"
          @change="value => (this.selling = value)"
        >
          <a-select-option
            :value="v.id"
            v-for="(v, i) in selectArrstrain"
            :key="i"
          >
            {{ v.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item
        label="商品品类"
        prop="d"
        :wrapperCol="{ style: { width: '250px' } }"
      >
        <a-tree-select
          show-search
          searchPlaceholder
          treeNodeFilterProp="title"
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
          @change="value => (this.categoryId = value)"
          defaultValue="全部"
          tree-default-expand-all
        >
        </a-tree-select>
      </a-form-model-item>
      <a-form-model-item
        label="所属供应商"
        prop="d"
        :wrapperCol="{ style: { width: '250px' } }"
      >
        <a-select
          default-value="全部"
          show-search
          allowClear
          v-model="status"
          option-filter-prop="children"
          :filter-option="filterOption"
          @search="handleSearch"
          @change="handleChange"
          :default-active-first-option="false"
          :show-arrow="false"
          :not-found-content="null"
        >
          <a-select-option
            :value="item.supplierCode"
            v-for="item in selectlist"
            :key="item.supplierCode"
          >
            {{ item.supplierName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="btnRow item-btns">
        <a-button class="item-btn" type="primary" @click="getList()"
          >查询</a-button
        >
        <a-button class="item-btn" type="primary" @click="onReset()"
          >重置</a-button
        >
        <template v-if="$power('batch_on_off')">
          <a-button
            class="item-btn"
            @click="piliang('on')"
            :loading="piliangLoading"
            type="primary"
            >批量上架</a-button
          >
          <a-button
            class="item-btn"
            @click="piliang('off')"
            :loading="piliangLoading"
            type="primary"
            >批量下架</a-button
          >
        </template>
      </a-form-model-item>
    </a-form-model>
    <div id="neighborhoodLife">
      <div class="content-main" ref="content_main">
        <a-row style="padding: 4px;height: 100%;">
          <a-col>
            <a-table
              :row-selection="{
                ...rowSelection,
                selectedRowKeys: selectedRowKeys,
              }"
              :columns="tableColumns"
              :row-key="(r, i) => i"
              :data-source="tableData"
              :scroll="{ x: 1000, y: scrollY }"
              :pagination="false"
              :loading="tableLoading"
              style="margin-top: 8px;"
            >
              <span slot="action" slot-scope="scope">
                <a-button
                  v-if="$power('query')"
                  type="link"
                  @click="
                    $router.push({
                      name: 'shelveEdit',
                      params: { id: scope.id, typ: '1' },
                    })
                  "
                  >查看详情</a-button
                >
                <template v-if="$power('on_off')">
                  <a-button
                    v-if="!scope.selling"
                    type="link"
                    @click="updates(scope)"
                    >上架</a-button
                  >
                  <a-button v-else type="link" @click="updates(scope)"
                    >下架</a-button
                  >
                </template>
              </span>

              <template slot="costPrice" slot-scope="scope">
                <div
                  class="editable-row-operations"
                  v-for="(item, index) in scope.costPrice"
                  :key="index"
                >
                  <p v-if="scope.isTieredPricing">
                    {{ item.minNum }}-{{
                      item.maxNum ? item.maxNum : '无穷大'
                    }}
                    = ￥{{ item.costPrice }}
                  </p>
                  <p v-else>￥{{ item.costPrice }}</p>
                </div>
              </template>

              <template slot="sellingPrice" slot-scope="scope">
                <div
                  class="editable-row-operations"
                  v-for="(item, index) in scope.sellingPrice"
                  :key="index"
                >
                  <p v-if="scope.isTieredPricing">
                    {{ item.minNum }}-{{
                      item.maxNum ? item.maxNum : '无穷大'
                    }}
                    = ￥{{ item.priceBeforeTax }}
                  </p>
                  <p v-else>￥{{ item.priceBeforeTax }}</p>
                </div>
              </template>

              <template slot="sellingPricepro" slot-scope="scope">
                <div
                  class="editable-row-operations"
                  v-for="(item, index) in scope.sellingPrice"
                  :key="index"
                >
                  <p v-if="scope.isTieredPricing">
                    {{ item.minNum }}-{{
                      item.maxNum ? item.maxNum : '无穷大'
                    }}
                    = ￥{{ item.priceBeforeTax }}
                  </p>
                  <p v-else>￥{{ item.priceBeforeTax }}</p>
                </div>
              </template>

              <template slot="sellingPricepro" slot-scope="scope">
                <div
                  class="editable-row-operations"
                  v-for="(item, index) in scope.sellingPrice"
                  :key="index"
                >
                  <p v-if="scope.isTieredPricing">
                    {{ item.minNum }}-{{
                      item.maxNum ? item.maxNum : '无穷大'
                    }}
                    = ￥{{ item.priceBeforeTax }}
                  </p>
                  <p v-else>￥{{ item.priceBeforeTax }}</p>
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
import api from './../../api'
import { debounce } from '../../utils/util'

export default {
  components: {},
  data() {
    return {
      drstatus: '全部', //所属供应商默认值
      scrollY: 100,
      selectArrstrain: [
        //有bug
        { id: '', name: '全部' },
        { id: 1, name: '上架' },
        { id: 0, name: '下架' },
      ],
      treeData: [],
      categoryId: '', //下拉树
      value: undefined,
      selectlist: [],
      sku: '',
      status: '',
      selling: '', //山下架
      supplier: '',
      tableColumns: [
        {
          title: '商品名称',
          dataIndex: 'itemName',
          key: 'itemName',
          align: 'left',
          width: 200,
        },
        {
          title: 'SPU编码',
          dataIndex: 'itemCode',
          key: 'itemCode',
          align: 'left',
          width: 200,
        },
        {
          title: 'SKU名称',
          dataIndex: 'skuName',
          key: 'skuName',
          align: 'left',
          width: 200,
        },
        {
          title: 'SKU编码',
          dataIndex: 'skuCode',
          key: 'skuCode',
          align: 'left',
          width: 200,
        },
        {
          title: '商品品类',
          dataIndex: 'categoryName',
          key: 'categoryName',
          align: 'left',
          width: 100,
        },
        {
          title: '供应商',
          width: 200,
          align: 'left',
          dataIndex: 'supplierName',
          key: 'supplierName',
        },
        {
          title: '库存',
          width: 100,
          align: 'left',
          dataIndex: 'stock',
          key: 'stock',
        },
        {
          title: '成本价(数量=元)',
          width: 160,
          align: 'left',
          key: 'costPrice',
          scopedSlots: { customRender: 'costPrice' },
        },
        {
          title: '税前销售价(数量=元)',
          width: 200,
          align: 'left',
          key: 'sellingPrice',
          // dataIndex: 'beforeTaxSellingPrice',
          scopedSlots: { customRender: 'sellingPrice' },
        },
        {
          title: '税后销售价(数量=元)',
          width: 200,
          align: 'left',
          // key: 'sellingPrice',
          // dataIndex: 'sellingPrice',
          scopedSlots: { customRender: 'sellingPricepro' },
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          align: 'center',
          width: 180,
          scopedSlots: { customRender: 'action' },
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
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          let that = this
          that.beSelected = selectedRows.map(item => {
            return item.id
          })
          this.disBtn = selectedRows.length === 0
          this.selectedRowKeys = selectedRowKeys
        },
      },
    }
  },
  created() {
    api.getCategoryTree().then(resp => {
      this.treeData = resp.data
      this.treeData.unshift({ categoryId: '', name: '全部' })
    })
  },
  mounted() {
    this.getList()
    // this.supplierlis()
    const timer1 = setTimeout(() => {
      this.scrollY = document.body.clientHeight - 320 + 'px'
    }, 0)
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer1)
    })
  },
  methods: {
    supplierlis(value) {
      api
        .getSupplierListByPager2({
          keyword: value || '',
          pageNum: 1,
          pageSize: 100,
        })
        .then(res => {
          this.selectlist = res.data.records.slice(0, 50)
          this.selectlist.unshift({ id: '', supplierName: '全部' })
        })
    },
    handleSearch(value) {
      debounce(() => {
        this.supplierlis(value)
      }, 500)
    },
    handleChange(value) {
      this.status = value
      console.log(this.status)
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    //重置数据
    onReset() {
      this.categoryId = ''
      this.sku = ''
      this.selling = ''
      this.status = ''
      this.current = 1
      this.beSelected = []
      this.selectedRowKeys = []
      this.getList()
    },
    piliang(type) {
      if (this.beSelected.length == 0) {
        return this.$message.error(`请选择需要操作的数据`)
      }
      //批量上下架
      if (type === 'on') this.updateseli(1)
      else this.updateseli(0)
    },
    updateseli(type) {
      this.$confirm({
        title: `批量状态更改`,
        content: `您确定要执行${type == 0 ? '批量下架' : '批量上架'}？`,
        centered: true,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.tableLoading = true
          api
            .updateSelling({ ids: this.beSelected, selling: type })
            .then(res => {
              this.$message.success(
                `${type == 0 ? '批量下架' : '批量上架'}成功`
              )
              this.piliangLoading = false
              this.selectedRowKeys = []
              this.beSelected = []
              this.getList()
            })
            .finally(() => {
              this.tableLoading = false
            })
        },
      })
    },
    updates(scope) {
      //单独上下架
      this.$confirm({
        title: `状态更改`,
        content: `您确定要执行${scope.selling ? '下架' : '上架'}？`,
        centered: true,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.tableLoading = true
          api
            .updateSellingById(scope.id)
            .then(res => {
              this.$message.success(`${scope.selling ? '下架' : '上架'}成功`)
              const findIndex = this.beSelected.findIndex(
                item => item == scope.id
              )
              if (findIndex !== -1) {
                this.selectedRowKeys.splice(findIndex, 1)
                this.beSelected.splice(findIndex, 1)
              }
              this.getList()
            })
            .finally(() => {
              this.tableLoading = false
            })
        },
      })
    },
    onShowSizeChange(current, pageSize) {
      //分页
      this.current = current
      this.pageSize = pageSize
      this.selectedRowKeys = []
      this.beSelected = []
      this.getList()
    },
    getList() {
      this.tableLoading = true
      let params = {
        categoryId: this.categoryId, //商品id
        keyword: this.sku,
        selling: this.selling, //上下架
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
            this.total = Number(resp.data.total)
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
.shelve {
  padding: 20px;
  height: 100%;
  background: #fff;
}
.ant-form {
  /deep/ .ant-form-item-control-wrapper {
    margin-bottom: 10px;
  }

  // /deep/ .ant-calendar-picker-input {
  //   width: 250px;
  // }

  // /deep/ .ant-form-item-label {
  //   width: 130px;
  //   text-align: right;
  // }

  // /deep/ .item-btns {
  //   width: 300px !important;
  //   .ant-form-item-control-wrapper {
  //     width: 300px !important;
  //   }
  // }
  //   .btnRow {
  //     display: flex;
  //     flex-direction: row;
  //     justify-content: flex-start;
  //     align-items: center;
  //   }
  /deep/ .item-btns .item-btn {
    margin-right: 18px;
  }
}
</style>
