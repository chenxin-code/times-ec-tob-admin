<template>
  <div>
    <div class="btns">
      <a-button class="item-btn" :loading="btnloading" type="primary" @click="add()"
                v-if="$route.path === '/negative/add'">保存
      </a-button>
      <a-button class="item-btn" @click="$router.back()">返回</a-button>
    </div>
    <a-form-model :model="thisForm" layout="inline" :rules="rules" ref="thisForm" labelAlign="left">
      <div class="common-title">
        <div class="common-title-content">新增负数单</div>
      </div>
      <a-form-model-item label="选择订单" prop="saleOrderNo">
        <a-select
            show-search
            :value="thisForm.saleOrderNo"
            placeholder="搜索订单编号"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
            :disabled="isDisable">
          <a-select-option v-for="(item,index) in orderNoList" :value="item" :key="index">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="负数单号">
        <a-input v-model="aaa" :disabled="isDisable"/>
      </a-form-model-item>
      <a-form-model-item label="创建人">
        <a-input v-model="aaa" :disabled="isDisable"/>
      </a-form-model-item>
      <a-form-model-item label="创建时间">
        <a-input v-model="aaa" :disabled="isDisable"/>
      </a-form-model-item>
      <div class="common-title">
        <div class="common-title-content">选择商品</div>
      </div>
      <a-button style="margin-left: 20px;" :disabled="disBtn" @click="calc()" type="primary">计算总价</a-button>
      <a-table
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          :loading="tableLoading"
          :rowKey="(r, i) => i"
          :scroll="{ x: 2500, y: 400 }">
        <template slot="set1" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set1" :disabled="isDisable"/>
          </a-form-model-item>
        </template>
        <template slot="set2" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set2" :disabled="isDisable"/>
          </a-form-model-item>
        </template>
        <template slot="set3" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set3" :disabled="isDisable"/>
          </a-form-model-item>
        </template>
        <template slot="set4" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set4" :disabled="isDisable"/>
          </a-form-model-item>
        </template>
        <template slot="set5" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set5" :disabled="isDisable"/>
          </a-form-model-item>
        </template>
        <template slot="remark" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.remark" :disabled="isDisable" style="width: 200px !important;"/>
          </a-form-model-item>
        </template>
      </a-table>
      <div class="common-title">
        <div class="common-title-content">订单总价</div>
      </div>
      <div style="display: flex">
        <div style="flex: 1">
          <a-form-model-item label="税前销售总价">{{ pretaxItemPriceDeduct }}</a-form-model-item>
          <a-form-model-item label="税后销售总价">{{ itemPriceDeduct }}</a-form-model-item>
          <a-form-model-item label="税前优惠总价">{{ pretaxReducedPriceDeduct }}</a-form-model-item>
          <a-form-model-item label="税后优惠总价">{{ reducedPriceDeduct }}</a-form-model-item>
        </div>
        <div style="flex: 1">
          <a-form-model-item label="已扣税前销售总价">{{ totalPretaxItemPrice }}</a-form-model-item>
          <a-form-model-item label="已扣税后销售总价">{{ totalAmount }}</a-form-model-item>
          <a-form-model-item label="已扣税前优惠总价">{{ totalPretaxReducedPrice }}</a-form-model-item>
          <a-form-model-item label="已扣税后优惠总价">{{ totalReducedPrice }}</a-form-model-item>
        </div>
      </div>
      <a-form-model-item label="税前扣减销售总价">
        <a-input v-model="totalPretaxItemPriceDeduct" :disabled="isDisable2"/>
      </a-form-model-item>
      <a-form-model-item label="税后扣减销售总价">
        <a-input v-model="totalAmountDeduct" :disabled="isDisable2"/>
      </a-form-model-item>
      <a-form-model-item label="税前扣减优惠总价">
        <a-input v-model="totalPretaxReducedPriceDeduct" :disabled="isDisable2"/>
      </a-form-model-item>
      <a-form-model-item label="税后扣减优惠总价">
        <a-input v-model="totalReducedPriceDeduct" :disabled="isDisable2"/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from "../../api";
import {debounce} from '../../utils/util';

export default {
  data() {
    return {
      aaa: null,
      orderNoList: [],
      thisForm: {
        a: null,
        saleOrderNo: null,
      },
      rules: {
        saleOrderNo: [
          {required: true, message: '请选择订单', trigger: 'blur'},
        ],
        a: [
          {required: true, message: '请选择订单', trigger: 'blur'},
        ],
      },
      btnloading: false,
      columns: [
        {
          title: '商品名称',
          key: 'itemName',
          dataIndex: 'itemName',
          width: 150,
        },
        {
          title: 'SKU名称',
          key: 'skuName',
          dataIndex: 'skuName',
          width: 150,
        },
        {
          title: 'SKU编码',
          key: 'skuCode',
          dataIndex: 'skuCode',
          width: 150,
        },
        {
          title: '规格',
          key: 'itemSpecsArray',
          dataIndex: 'itemSpecsArray',
          width: 150,
        },
        {
          title: '所属供应商',
          key: 'supplierName',
          dataIndex: 'supplierName',
          width: 150,
        },
        {
          title: '购买数量',
          key: 'itemNum',
          dataIndex: 'itemNum',
          width: 150,
        },
        {
          title: '已扣减数量',
          key: 'itemNumDeduct',
          dataIndex: 'itemNumDeduct',
          width: 150,
        },
        {
          title: '税前销售价',
          key: 'pretaxItemPrice',
          dataIndex: 'pretaxItemPrice',
          width: 150,
        },
        {
          title: '已扣税前销售价',
          key: 'pretaxItemPriceDeduct',
          dataIndex: 'pretaxItemPriceDeduct',
          width: 150,
        },
        {
          title: '税后销售价',
          key: 'itemPrice',
          dataIndex: 'itemPrice',
          width: 150,
        },
        {
          title: '已扣税后销售价',
          key: 'itemPriceDeduct',
          dataIndex: 'itemPriceDeduct',
          width: 150,
        },
        {
          title: '税前优惠价',
          key: 'pretaxReducedPrice',
          dataIndex: 'pretaxReducedPrice',
          width: 150,
        },
        {
          title: '已扣税前优惠价',
          key: 'pretaxReducedPriceDeduct',
          dataIndex: 'pretaxReducedPriceDeduct',
          width: 150,
        },
        {
          title: '税后优惠价',
          key: 'reducedPrice',
          dataIndex: 'reducedPrice',
          width: 150,
        },
        {
          title: '已扣税后优惠价',
          key: 'reducedPriceDeduct',
          dataIndex: 'reducedPriceDeduct',
          width: 150,
        },
        {
          title: '设置扣减数量',//itemNumDeduct
          key: 'set1',
          scopedSlots: {customRender: 'set1'},
          width: 150,
        },
        {
          title: '设置税前销售价',//pretaxItemPrice
          key: 'set2',
          scopedSlots: {customRender: 'set2'},
          width: 150,
        },
        {
          title: '设置税后销售价',//itemPrice
          key: 'set3',
          scopedSlots: {customRender: 'set3'},
          width: 150,
        },
        {
          title: '设置税前优惠价',//pretaxReducedPrice
          key: 'set4',
          scopedSlots: {customRender: 'set4'},
          width: 150,
        },
        {
          title: '设置税后优惠价',//reducedPrice
          key: 'set5',
          scopedSlots: {customRender: 'set5'},
          width: 150,
        },
        {
          title: '备注',
          key: 'remark',
          scopedSlots: {customRender: 'remark'},
          width: 300,
        },
      ],
      tableData: [
        //{a: 1, set1: '设置1', set2: '设置2', set3: '设置3', set4: '设置4', set5: '设置5', remark: '...'},
      ],
      tableLoading: false,
      disBtn: true,
      beSelected: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.beSelected = [];
          selectedRows.forEach(item => {
            this.beSelected.push(item);
          });
          this.disBtn = selectedRows.length === 0;
          if (!this.disBtn) {
            //4个输入框总价
            this.totalPretaxItemPriceDeduct = null;
            this.totalAmountDeduct = null;
            this.totalPretaxReducedPriceDeduct = null;
            this.totalReducedPriceDeduct = null;
          }
        }
      },
      //8个总价
      itemPriceDeduct: null,
      pretaxItemPriceDeduct: null,
      pretaxReducedPriceDeduct: null,
      reducedPriceDeduct: null,
      totalAmount: null,
      totalPretaxItemPrice: null,
      totalPretaxReducedPrice: null,
      totalReducedPrice: null,
      //4个输入框总价
      totalPretaxItemPriceDeduct: null,
      totalAmountDeduct: null,
      totalPretaxReducedPriceDeduct: null,
      totalReducedPriceDeduct: null,
    }
  },
  computed: {
    isDisable() {
      return this.$route.path === '/negative/show'
    },
    isDisable2() {
      return this.$route.path === '/negative/show' || !this.disBtn
    },
  },
  methods: {
    add(){
      this.$refs.thisForm.validate(valid => {
        
      });
    },
    calc() {
      //4个输入框总价
      let totalPretaxItemPriceDeduct = 0,
          totalAmountDeduct = 0,
          totalPretaxReducedPriceDeduct = 0,
          totalReducedPriceDeduct = 0;
      this.tableData.forEach((item, index) => {
        totalPretaxItemPriceDeduct += item.set1 * item.set2;
        totalAmountDeduct += item.set1 * item.set3;
        totalPretaxReducedPriceDeduct += item.set1 * item.set4;
        totalReducedPriceDeduct += item.set1 * item.set5;
      });
      this.totalPretaxItemPriceDeduct = totalPretaxItemPriceDeduct;
      this.totalAmountDeduct = totalAmountDeduct;
      this.totalPretaxReducedPriceDeduct = totalPretaxReducedPriceDeduct;
      this.totalReducedPriceDeduct = totalReducedPriceDeduct;
    },
    handleSearch(value) {
      debounce(() => {
        this.getOrderListByOrderNo(value);
      }, 500);
    },
    handleChange(value) {
      this.thisForm.saleOrderNo = value;
      //this.getOrderListByOrderNo(value);
      this.tableLoading = true;
      api.getNegativeItems({orderNo: this.thisForm.saleOrderNo}).then(resp => {
        if (resp.code === 200) {
          this.tableData = resp.data.itemList;
          this.tableData.forEach((item, index) => {
            this.tableData[index] = {
              ...item,
              //组装数据格式
              set1: null, set2: null, set3: null, set4: null, set5: null, remark: null
            };
          });
          console.log(this.tableData);
          //8个总价
          this.itemPriceDeduct = resp.data.itemPriceDeduct;
          this.pretaxItemPriceDeduct = resp.data.pretaxItemPriceDeduct;
          this.pretaxReducedPriceDeduct = resp.data.pretaxReducedPriceDeduct;
          this.reducedPriceDeduct = resp.data.reducedPriceDeduct;
          this.totalAmount = resp.data.totalAmount;
          this.totalPretaxItemPrice = resp.data.totalPretaxItemPrice;
          this.totalPretaxReducedPrice = resp.data.totalPretaxReducedPrice;
          this.totalReducedPrice = resp.data.totalReducedPrice;
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    getOrderListByOrderNo(orderNo) {
      if (orderNo) {
        api.getOrderListByOrderNo({orderNo: orderNo}).then(resp => {
          if (resp.code === 200) {
            this.orderNoList = resp.data;
          }
        });
      }
    },
  },
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
    width: 250px;
  }

  /deep/ .ant-form-item-label {
    //width: 110px;
  }

  /deep/ .item-btns {
    width: 800px !important;
  }

  /deep/ .item-btns .item-btn {
    margin-right: 20px;
  }
}

/deep/ .ant-table {
  padding: 20px;

  .ant-input {
    width: 100px !important;
  }

  .ant-form-item {
    margin: 0 !important;
    width: auto !important;
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
</style>