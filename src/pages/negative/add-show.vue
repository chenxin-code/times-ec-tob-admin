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
        <div class="common-title-content">{{$route.path === '/negative/add'?'新增':'查看'}}负数单</div>
      </div>
      <a-form-model-item label="选择销售单" prop="saleOrderNo" v-if="$route.path === '/negative/add'">
        <a-select
            show-search
            :value="thisForm.saleOrderNo"
            placeholder="搜索销售单编号"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
            style="width: 250px;">
          <a-select-option v-for="(item,index) in orderNoList" :value="item" :key="index">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="销售单号" v-if="$route.path === '/negative/show'">{{saleOrderNo}}</a-form-model-item>
      <a-form-model-item label="负数单号" v-if="$route.path === '/negative/show'">{{$route.query.negativeNo}}</a-form-model-item>
      <a-form-model-item label="创建人" v-if="$route.path === '/negative/show'">{{createUser}}</a-form-model-item>
      <a-form-model-item label="创建时间" v-if="$route.path === '/negative/show'">{{createTime}}</a-form-model-item>
      <div class="common-title">
        <div class="common-title-content">选择商品</div>
      </div>
      <a-table
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          :loading="tableLoading"
          :rowKey="(r, i) => i"
          :scroll="{ x: 2500, y: 400 }" v-if="$route.path === '/negative/add'">
        <template slot="set1" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set1"/>
          </a-form-model-item>
        </template>
        <template slot="set2" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set2"/>
          </a-form-model-item>
        </template>
        <template slot="set3" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set3"/>
          </a-form-model-item>
        </template>
        <template slot="set4" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set4"/>
          </a-form-model-item>
        </template>
        <template slot="set5" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set5"/>
          </a-form-model-item>
        </template>
        <template slot="remark" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.remark" style="width: 200px !important;"/>
          </a-form-model-item>
        </template>
      </a-table>
      <a-table
          :columns="columns2"
          :data-source="tableData2"
          :pagination="false"
          :loading="tableLoading2"
          :rowKey="(r, i) => i"
          :scroll="{ x: 2500, y: 400 }" v-else-if="$route.path === '/negative/show'">
        <template slot="itemNumDeduct" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.itemNumDeduct" disabled/>
          </a-form-model-item>
        </template>
        <template slot="pretaxItemPriceDeduct" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.pretaxItemPriceDeduct" disabled/>
          </a-form-model-item>
        </template>
        <template slot="itemPriceDeduct" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.itemPriceDeduct" disabled/>
          </a-form-model-item>
        </template>
        <template slot="pretaxReducedPriceDeduct" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.pretaxReducedPriceDeduct" disabled/>
          </a-form-model-item>
        </template>
        <template slot="reducedPriceDeduct" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.reducedPriceDeduct" disabled/>
          </a-form-model-item>
        </template>
        <template slot="remark" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.remark" style="width: 200px !important;" disabled/>
          </a-form-model-item>
        </template>
      </a-table>
      <div class="common-title">
        <div class="common-title-content">销售单总价</div>
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
      <a-form-model-item label="税前扣减销售总价" v-if="$route.path === '/negative/add'">
        <a-input v-model="totalPretaxItemPriceDeduct" :disabled="!disInput"/>
      </a-form-model-item>
      <a-form-model-item label="税后扣减销售总价" v-if="$route.path === '/negative/add'">
        <a-input v-model="totalAmountDeduct" :disabled="!disInput"/>
      </a-form-model-item>
      <a-form-model-item label="税前扣减优惠总价" v-if="$route.path === '/negative/add'">
        <a-input v-model="totalPretaxReducedPriceDeduct" :disabled="!disInput"/>
      </a-form-model-item>
      <a-form-model-item label="税后扣减优惠总价" v-if="$route.path === '/negative/add'">
        <a-input v-model="totalReducedPriceDeduct" :disabled="!disInput"/>
      </a-form-model-item>
      <a-form-model-item label="税前扣减销售总价" v-if="$route.path === '/negative/show'">
        <a-input v-model="totalPretaxItemPrice" disabled/>
      </a-form-model-item>
      <a-form-model-item label="税后扣减销售总价" v-if="$route.path === '/negative/show'">
        <a-input v-model="totalAmount" disabled/>
      </a-form-model-item>
      <a-form-model-item label="税前扣减优惠总价" v-if="$route.path === '/negative/show'">
        <a-input v-model="totalPretaxReducedPrice" disabled/>
      </a-form-model-item>
      <a-form-model-item label="税后扣减优惠总价" v-if="$route.path === '/negative/show'">
        <a-input v-model="totalReducedPrice" disabled/>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from "../../api";
import {debounce} from '../../utils/util';

export default {
  data() {
    let checkAmountFormat = (rule, value, callback) => {
      if (value && !/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)) {
        callback(new Error('金额格式不正确'));
      } else {
        callback();
      }
    };
    return {
      saleOrderNo: null,
      createUser: null,
      createTime: null,
      orderNoList: [],
      thisForm: {
        saleOrderNo: null,
      },
      rules: {
        saleOrderNo: [
          {required: true, message: '请选择销售单', trigger: 'blur'},
        ],
      },
      btnloading: false,
      columns: [
        {
          title: '商品名称',
          key: 'itemName',
          dataIndex: 'itemName',
          align: "center",
          width: 250,
        },
        {
          title: 'SKU名称',
          key: 'skuName',
          dataIndex: 'skuName',
          align: "center",
          width: 200,
        },
        {
          title: 'SKU编码',
          key: 'skuCode',
          dataIndex: 'skuCode',
          align: "center",
          width: 200,
        },
        {
          title: '规格',
          key: 'itemSpecsArray',
          dataIndex: 'itemSpecsArray',
          align: "center",
          width: 150,
        },
        {
          title: '所属供应商',
          key: 'supplierName',
          dataIndex: 'supplierName',
          align: "center",
          width: 200,
        },
        {
          title: '购买数量',
          key: 'itemNum',
          dataIndex: 'itemNum',
          align: "center",
          width: 150,
        },
        {
          title: '已扣减数量',
          key: 'itemNumDeduct',
          dataIndex: 'itemNumDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '税前销售价',
          key: 'pretaxItemPrice',
          dataIndex: 'pretaxItemPrice',
          align: "center",
          width: 150,
        },
        {
          title: '已扣税前销售价',
          key: 'pretaxItemPriceDeduct',
          dataIndex: 'pretaxItemPriceDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '税后销售价',
          key: 'itemPrice',
          dataIndex: 'itemPrice',
          align: "center",
          width: 150,
        },
        {
          title: '已扣税后销售价',
          key: 'itemPriceDeduct',
          dataIndex: 'itemPriceDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '税前优惠价',
          key: 'pretaxReducedPrice',
          dataIndex: 'pretaxReducedPrice',
          align: "center",
          width: 150,
        },
        {
          title: '已扣税前优惠价',
          key: 'pretaxReducedPriceDeduct',
          dataIndex: 'pretaxReducedPriceDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '税后优惠价',
          key: 'reducedPrice',
          dataIndex: 'reducedPrice',
          align: "center",
          width: 150,
        },
        {
          title: '已扣税后优惠价',
          key: 'reducedPriceDeduct',
          dataIndex: 'reducedPriceDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '设置扣减数量',//itemNumDeduct
          key: 'set1',
          scopedSlots: {customRender: 'set1'},
          align: "center",
          width: 150,
        },
        {
          title: '设置税前销售价',//pretaxItemPriceDeduct
          key: 'set2',
          scopedSlots: {customRender: 'set2'},
          align: "center",
          width: 150,
        },
        {
          title: '设置税后销售价',//itemPriceDeduct
          key: 'set3',
          scopedSlots: {customRender: 'set3'},
          align: "center",
          width: 150,
        },
        {
          title: '设置税前优惠价',//pretaxReducedPriceDeduct
          key: 'set4',
          scopedSlots: {customRender: 'set4'},
          align: "center",
          width: 150,
        },
        {
          title: '设置税后优惠价',//reducedPriceDeduct
          key: 'set5',
          scopedSlots: {customRender: 'set5'},
          align: "center",
          width: 150,
        },
        {
          title: '备注',
          key: 'remark',
          scopedSlots: {customRender: 'remark'},
          align: "center",
          width: 300,
        },
      ],
      columns2: [
        {
          title: '商品名称',
          key: 'itemName',
          dataIndex: 'itemName',
          align: "center",
          width: 250,
        },
        {
          title: 'SKU名称',
          key: 'skuName',
          dataIndex: 'skuName',
          align: "center",
          width: 200,
        },
        {
          title: 'SKU编码',
          key: 'skuCode',
          dataIndex: 'skuCode',
          align: "center",
          width: 200,
        },
        {
          title: '规格',
          key: 'itemSpecsArray',
          dataIndex: 'itemSpecsArray',
          align: "center",
          width: 150,
        },
        {
          title: '所属供应商',
          key: 'supplierName',
          dataIndex: 'supplierName',
          align: "center",
          width: 200,
        },
        {
          title: '购买数量',
          key: 'itemNum',
          dataIndex: 'itemNum',
          align: "center",
          width: 150,
        },
        {
          title: '已扣减数量',
          key: 'itemNumDeduct',
          dataIndex: 'itemNumDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '税前销售价',
          key: 'pretaxItemPrice',
          dataIndex: 'pretaxItemPrice',
          align: "center",
          width: 150,
        },
        {
          title: '已扣税前销售价',
          key: 'pretaxItemPriceDeduct',
          dataIndex: 'pretaxItemPriceDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '税后销售价',
          key: 'itemPrice',
          dataIndex: 'itemPrice',
          align: "center",
          width: 150,
        },
        {
          title: '已扣税后销售价',
          key: 'itemPriceDeduct',
          dataIndex: 'itemPriceDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '税前优惠价',
          key: 'pretaxReducedPrice',
          dataIndex: 'pretaxReducedPrice',
          align: "center",
          width: 150,
        },
        {
          title: '已扣税前优惠价',
          key: 'pretaxReducedPriceDeduct',
          dataIndex: 'pretaxReducedPriceDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '税后优惠价',
          key: 'reducedPrice',
          dataIndex: 'reducedPrice',
          align: "center",
          width: 150,
        },
        {
          title: '已扣税后优惠价',
          key: 'reducedPriceDeduct',
          dataIndex: 'reducedPriceDeduct',
          align: "center",
          width: 150,
        },
        {
          title: '设置扣减数量',
          key: 'itemNumDeduct',
          scopedSlots: {customRender: 'itemNumDeduct'},
          align: "center",
          width: 150,
        },
        {
          title: '设置税前销售价',
          key: 'pretaxItemPriceDeduct',
          scopedSlots: {customRender: 'pretaxItemPriceDeduct'},
          align: "center",
          width: 150,
        },
        {
          title: '设置税后销售价',
          key: 'itemPriceDeduct',
          scopedSlots: {customRender: 'itemPriceDeduct'},
          align: "center",
          width: 150,
        },
        {
          title: '设置税前优惠价',
          key: 'pretaxReducedPriceDeduct',
          scopedSlots: {customRender: 'pretaxReducedPriceDeduct'},
          align: "center",
          width: 150,
        },
        {
          title: '设置税后优惠价',
          key: 'reducedPriceDeduct',
          scopedSlots: {customRender: 'reducedPriceDeduct'},
          align: "center",
          width: 150,
        },
        {
          title: '备注',
          key: 'remark',
          scopedSlots: {customRender: 'remark'},
          align: "center",
          width: 300,
        },
      ],
      tableData: [],
      tableData2: [],
      tableLoading: false,
      tableLoading2: false,
      disInput: true,
      beSelected: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.beSelected = [];
          selectedRows.forEach(item => {
            this.beSelected.push(item);
          });
          this.disInput = selectedRows.length === 0;
          if (!this.disInput) {
            //4个输入框总价
            this.totalPretaxItemPriceDeduct = null;
            this.totalAmountDeduct = null;
            this.totalPretaxReducedPriceDeduct = null;
            this.totalReducedPriceDeduct = null;
          }
        }
      },
      //8个非输入框总价
      pretaxItemPriceDeduct: null,
      itemPriceDeduct: null,
      pretaxReducedPriceDeduct: null,
      reducedPriceDeduct: null,
      totalPretaxItemPrice: null,
      totalAmount: null,
      totalPretaxReducedPrice: null,
      totalReducedPrice: null,
      //4个输入框总价
      totalPretaxItemPriceDeduct: null,
      totalAmountDeduct: null,
      totalPretaxReducedPriceDeduct: null,
      totalReducedPriceDeduct: null,
    }
  },
  computed: {},
  methods: {
    add(){
      this.$refs.thisForm.validate(valid => {
        if(valid){
          let itemList = JSON.parse(JSON.stringify(this.beSelected));
          itemList.forEach((item,index) => {
            itemList[index].itemNumDeduct = item.set1;//覆盖
            itemList[index].pretaxItemPriceDeduct = item.set2;//覆盖
            itemList[index].itemPriceDeduct = item.set3;//覆盖
            itemList[index].pretaxReducedPriceDeduct = item.set4;//覆盖
            itemList[index].reducedPriceDeduct = item.set5;//覆盖
          });
          console.log(this.beSelected);
          api.addNegativeBill({
            saleOrderNo: this.thisForm.saleOrderNo,
            itemList: itemList,
            //8个非输入框总价
            pretaxItemPriceDeduct: this.pretaxItemPriceDeduct,
            itemPriceDeduct: this.itemPriceDeduct,
            pretaxReducedPriceDeduct: this.pretaxReducedPriceDeduct,
            reducedPriceDeduct: this.reducedPriceDeduct,
            totalPretaxItemPrice: this.totalPretaxItemPriceDeduct,//覆盖
            totalAmount: this.totalAmountDeduct,//覆盖
            totalPretaxReducedPrice: this.totalPretaxReducedPriceDeduct,//覆盖
            totalReducedPrice: this.totalReducedPriceDeduct,//覆盖
          }).then(resp => {
            if (resp.code === 200) {
              this.$message.success('添加成功');
              this.$router.back();
            }
          });
        }
      });
    },
    calc() {
      //4个输入框总价
      let totalPretaxItemPriceDeduct = 0,
          totalAmountDeduct = 0,
          totalPretaxReducedPriceDeduct = 0,
          totalReducedPriceDeduct = 0;
      this.beSelected.forEach((item, index) => {
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
          //8个非输入框总价
          this.pretaxItemPriceDeduct = resp.data.pretaxItemPriceDeduct;
          this.itemPriceDeduct = resp.data.itemPriceDeduct;
          this.pretaxReducedPriceDeduct = resp.data.pretaxReducedPriceDeduct;
          this.reducedPriceDeduct = resp.data.reducedPriceDeduct;
          this.totalPretaxItemPrice = resp.data.totalPretaxItemPrice;
          this.totalAmount = resp.data.totalAmount;
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
  mounted() {
    if (this.$route.path === '/negative/show') {
      this.tableLoading2 = true;
      api.queryNegativeDetail({negativeNo: this.$route.query.negativeNo}).then(resp => {
        if (resp.code === 200) {
          this.saleOrderNo = resp.data.saleOrderNo;
          this.createUser = resp.data.createUser;
          this.createTime = resp.data.createTime;
          this.tableData2 = resp.data.infoList;
          //8个非输入框总价
          this.pretaxItemPriceDeduct = resp.data.pretaxItemPriceDeduct;
          this.itemPriceDeduct = resp.data.itemPriceDeduct;
          this.pretaxReducedPriceDeduct = resp.data.pretaxReducedPriceDeduct;
          this.reducedPriceDeduct = resp.data.reducedPriceDeduct;
          this.totalPretaxItemPrice = resp.data.totalPretaxItemPrice;
          this.totalAmount = resp.data.totalAmount;
          this.totalPretaxReducedPrice = resp.data.totalPretaxReducedPrice;
          this.totalReducedPrice = resp.data.totalReducedPrice;
        }
      }).finally(() => {
        this.tableLoading2 = false;
      });
    }
  },
  watch: {
    beSelected: {
      handler() {
        debounce(() => {
          console.log('beSelected变化了');
          this.calc();
        }, 500);
      },
      deep: true
    }
  }
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
    //width: 250px;
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