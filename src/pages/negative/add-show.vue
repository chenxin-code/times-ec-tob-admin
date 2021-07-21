<template>
  <div>
    <div class="btns">
      <a-button class="item-btn" :loading="btnloading" type="primary" @click="addEdit()" v-if="$route.path === '/negative/add'">保存</a-button>
      <a-button class="item-btn"  @click="$router.back()">返回</a-button>
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
            style="width: 200px"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
            :disabled="isDisable">
          <a-select-option v-for="item in orderNoList" :key="item.value">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="负数单号" v-if="isDisable">

      </a-form-model-item>
      <a-form-model-item label="创建人" v-if="isDisable">

      </a-form-model-item>
      <a-form-model-item label="创建时间" v-if="isDisable">

      </a-form-model-item>
      <div class="common-title">
        <div class="common-title-content">选择商品</div>
      </div>
      <a-table
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          :loading="tableLoading"
          :rowKey="(r, i) => i"
          :scroll="{ x: 2500, y: 400 }">
        <template slot="set1" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set1" :disabled="isDisable" />
          </a-form-model-item>
        </template>
        <template slot="set2" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set2" :disabled="isDisable" />
          </a-form-model-item>
        </template>
        <template slot="set3" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set3" :disabled="isDisable" />
          </a-form-model-item>
        </template>
        <template slot="set4" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set4" :disabled="isDisable" />
          </a-form-model-item>
        </template>
        <template slot="set5" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.set5" :disabled="isDisable" />
          </a-form-model-item>
        </template>
        <template slot="remark" slot-scope="scope">
          <a-form-model-item>
            <a-input v-model="scope.remark" :disabled="isDisable" style="width: 200px !important;" />
          </a-form-model-item>
        </template>
      </a-table>
      <div class="common-title">
        <div class="common-title-content">订单总价</div>
      </div>
      <a-form-model-item label="税前销售总价">0.00</a-form-model-item>
      <a-form-model-item label="税后销售总价">0.00</a-form-model-item>
      <a-form-model-item label="税前优惠总价">0.00</a-form-model-item>
      <a-form-model-item label="税后优惠总价">0.00</a-form-model-item>
      <a-form-model-item label="已扣税前销售总价">0.00</a-form-model-item>
      <a-form-model-item label="已扣税后销售总价">0.00</a-form-model-item>
      <a-form-model-item label="已扣税前优惠总价">0.00</a-form-model-item>
      <a-form-model-item label="已扣税后优惠总价">0.00</a-form-model-item>
      <a-form-model-item label="税前扣减销售总价" prop="a">
        <a-input v-model="thisForm.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="税后扣减销售总价" prop="a">
        <a-input v-model="thisForm.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="税前扣减优惠总价" prop="a">
        <a-input v-model="thisForm.a" :disabled="isDisable" />
      </a-form-model-item>
      <a-form-model-item label="税后扣减优惠总价" prop="a">
        <a-input v-model="thisForm.a" :disabled="isDisable" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNoList: [],
      thisForm: {
        a: null,
      },
      rules: {
        saleOrderNo: [
          { required: true, message: '请选择订单', trigger: 'blur' },
        ],
      },
      btnloading: false,
      columns: [
        {
          title: '商品名称',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: 'SKU名称',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: 'SKU编码',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '规格',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '所属供应商',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '购买数量',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '已扣减数量',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '税前销售价',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '已扣税前销售价',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '税后销售价',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '已扣税后销售价',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '税前优惠价',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '已扣税前优惠价',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '税后优惠价',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '已扣税后优惠价',
          key: 'a',
          dataIndex: 'a',
          width: 150,
        },
        {
          title: '设置扣减数量',
          key: 'set1',
          scopedSlots: { customRender: 'set1' },
          width: 150,
        },
        {
          title: '设置税前销售价',
          key: 'set2',
          scopedSlots: { customRender: 'set2' },
          width: 150,
        },
        {
          title: '设置税后销售格',
          key: 'set3',
          scopedSlots: { customRender: 'set3' },
          width: 150,
        },
        {
          title: '设置税前优惠价',
          key: 'set4',
          scopedSlots: { customRender: 'set4' },
          width: 150,
        },
        {
          title: '设置税后优惠价',
          key: 'set5',
          scopedSlots: { customRender: 'set5' },
          width: 150,
        },
        {
          title: '备注',
          key: 'remark',
          scopedSlots: { customRender: 'remark' },
          width: 300,
        },
      ],
      tableData: [{a: 1,set1: '设置1',set2: '设置2',set3: '设置3',set4: '设置4',set5: '设置5',remark: '...'}],
      tableLoading: false,
    }
  },
  computed: {
    isDisable() {
      return this.$route.path === '/negative/show'
    },
  },
  methods: {
    handleSearch(value) {
      fetch(value, data => (this.orderNoList = data));
    },
    handleChange(value) {
      console.log(value);
      this.thisForm.saleOrderNo = value;
      fetch(value, data => (this.orderNoList = data));
    },
  },
}
</script>

<style lang="less" scoped>
.ant-form {
  padding: 20px;
  .ant-form-item{
    width: 600px;
    margin: 10px 0 10px 50px;
  }
  /deep/.ant-calendar-picker-input {
    min-width: 200px;
  }
  /deep/.ant-form-item-control-wrapper{
    width: 250px;
  }
  /deep/.ant-form-item-label{
    //width: 110px;
  }
  /deep/ .item-btns{
    width: 800px !important;
  }
  /deep/ .item-btns .item-btn{
    margin-right: 20px;
  }
}
/deep/.ant-table {
  padding: 20px;
  .ant-input {
    width: 100px !important;
  }
  .ant-form-item{
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
.btns{
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0 0;
  button{
    margin-left: 20px;
  }
}
</style>