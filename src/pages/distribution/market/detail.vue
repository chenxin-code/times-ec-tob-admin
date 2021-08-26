<template>
  <div id="distributorAudit" class="container-edit">
    <baseLayout :header="false">
      <template slot="content">
        <div class="content-main">
          <div
            style="width:100%;display: flex;align-items:center;padding: 20px 20px;"
          >
            <div style="width:3px;height:16px;background: #4B7AFB;"></div>
            <span style="color:#666666;margin-left:5px;">订单基础信息</span>
          </div>
          <a-form-model
            label="inline"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            style="padding:0 10px;"
          >
            <div class="form-wrop">
              <div class="form-wrop-item">
                <a-form-model-item label="订单编号">
                  <span class="info">{{ dataList.saleOrderNo }}</span>
                </a-form-model-item>
                <a-form-model-item label="城市公司">
                  <span class="info">{{ dataList.cityCompany }}</span>
                </a-form-model-item>
                <a-form-model-item label="账务账套">
                  <span class="info">{{ dataList.financialAccounting }}</span>
                </a-form-model-item>
                <a-form-model-item label="下单时间">
                  <span class="info">{{ dataList.orderTime }}</span>
                </a-form-model-item>
                <a-form-model-item label="备注">
                  <span class="info">{{ dataList.remark }}</span>
                </a-form-model-item>
              </div>
              <div class="form-wrop-item">
                <a-form-model-item label="项目名称">
                  <span class="info">{{ dataList.projectName }}</span>
                </a-form-model-item>

                <a-form-model-item label="采购公司(出账公司)">
                  <span class="info">{{ dataList.purchaseCompany }}</span>
                </a-form-model-item>
                <a-form-model-item label="支付方式">
                  <span class="info">{{
                    dataList.payWay == 'ONLINE' ? '线上' : '线下'
                  }}</span>
                </a-form-model-item>

                <a-form-model-item label="下单场景">
                  <span class="info">{{ dataList.orderSource }}</span>
                </a-form-model-item>
                <a-form-model-item label="创建时间">
                  <span class="info">{{ dataList.createTime }}</span>
                </a-form-model-item>
              </div>
            </div>
          </a-form-model>

          <div
            style="width:100%;display: flex;align-items:center;padding: 20px 20px;"
          >
            <div style="width:3px;height:16px;background: #4B7AFB;"></div>
            <span style="color:#666666;margin-left:5px;">订单价格</span>
          </div>
          <a-form-model
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            style="padding:0 10px;"
          >
            <div class="form-wrop">
              <div class="form-wrop-item">
                <a-form-model-item label="税前订单总额">
                  <span class="info">{{ dataList.totalPretaxAmount }}</span>
                </a-form-model-item>
                <a-form-model-item label="税前优惠价">
                  <span class="info">{{
                    dataList.totalPretaxReducedAmount
                  }}</span>
                </a-form-model-item>
              </div>
              <div class="form-wrop-item">
                <a-form-model-item label="税后订单总额">
                  <span class="info">{{ dataList.totalAmount }}</span>
                </a-form-model-item>
                <a-form-model-item label="税后优惠价">
                  <span class="info">{{ dataList.totalReducedAmount }}</span>
                </a-form-model-item>
              </div>
            </div>
          </a-form-model>

          <div
            style="width:100%;display: flex;align-items:center;padding: 20px 20px;"
          >
            <div style="width:3px;height:16px;background: #4B7AFB;"></div>
            <span style="color:#666666;margin-left:5px;">收货信息</span>
          </div>
          <a-form-model
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            style="padding:0 10px;"
          >
            <div class="form-wrop">
              <div class="form-wrop-item">
                <a-form-model-item label="收货人">
                  <span class="info">{{
                    dataList.addressDto ? dataList.addressDto.receiverName : ''
                  }}</span>
                </a-form-model-item>
                <a-form-model-item label="收货地址">
                  <span class="info">{{
                    dataList.addressDto ? dataList.addressDto.provinceName : ''
                  }}</span>
                  <span class="info">{{
                    dataList.addressDto ? dataList.addressDto.cityName : ''
                  }}</span>
                  <span class="info">{{
                    dataList.addressDto ? dataList.addressDto.districtName : ''
                  }}</span>
                </a-form-model-item>
                <a-form-model-item label="详细地址">
                  <span class="info">{{
                    dataList.addressDto ? dataList.addressDto.detailAddress : ''
                  }}</span>
                </a-form-model-item>
              </div>
              <div class="form-wrop-item">
                <a-form-model-item label="收货人电话">
                  <span class="info">{{
                    dataList.addressDto ? dataList.addressDto.receiverPhone : ''
                  }}</span>
                </a-form-model-item>
              </div>
            </div>
          </a-form-model>
          <div
            style="width:100%;display: flex;align-items:center;padding: 20px 20px;"
          >
            <div style="width:3px;height:16px;background: #4B7AFB;"></div>
            <span style="color:#666666;margin-left:5px;">商品信息</span>
          </div>
          <a-table
            :columns="tableColumns"
            :row-key="(r, i) => i"
            :data-source="dataList.itemList"
            :scroll="{ x: 1600 }"
            :pagination="false"
            style="margin-top:8px;"
          >
            <template slot="itemSpecs" slot-scope="text">
              {{ getValue(text) }}
            </template>
          </a-table>
        </div>
      </template>
      <template slot="footer">
        <!-- <a-button class="a-buttom-reset" type="primary" @click="saveRole"
          >保存</a-button
        > -->
        <a-button class="a-buttom-reset" type="default" @click="$router.go(-1)"
          >返回</a-button
        >
      </template>
    </baseLayout>
  </div>
</template>

<script>
import api from '@/api'
import { mapActions } from 'vuex'
import { debounce } from '@/utils/util'
export default {
  name: 'marketDetail',
  data() {
    return {
      dataList: [],
      //表格高度
      scrollY: 300,
      //表头数据
      tableColumns: [
        {
          title: '序号',
          customRender: (text, record, index) => `${index + 1}`,
          width: 110,
          align: 'left',
        },
        {
          title: '商品名称',
          dataIndex: 'itemName',
          key: 'itemName',
          width: 200,
          ellipsis: true,
          align: 'left',
        },
        {
          title: 'SKU名称',
          key: 'skuName',
          dataIndex: 'skuName',
          width: 200,
          ellipsis: true,
          align: 'left',
        },
        {
          title: 'SKU编码',
          key: 'skuCode',
          dataIndex: 'skuCode',
          width: 200,
          ellipsis: true,
          align: 'left',
        },
        {
          title: '规格',
          width: 250,
          ellipsis: true,
          align: 'left',
          dataIndex: 'itemSpecs',
          // key: 'itemSpecs',
          scopedSlots: { customRender: 'itemSpecs' },
        },
        {
          title: '所属供应商',
          key: 'supplierName',
          dataIndex: 'supplierName',
          width: 200,
          ellipsis: true,
          align: 'left',
        },
        {
          title: '购买数量',
          key: 'itemNum',
          dataIndex: 'itemNum',
          width: 150,
          ellipsis: true,
          align: 'left',
        },
        {
          title: '税前销售价',
          key: 'pretaxItemPrice',
          dataIndex: 'pretaxItemPrice',
          width: 150,
          ellipsis: true,
          align: 'left',
        },
        {
          title: '税后销售价',
          key: 'itemPrice',
          dataIndex: 'itemPrice',
          width: 150,
          ellipsis: true,
          align: 'left',
        },
        {
          title: '税前优惠价',
          key: 'pretaxReducedPrice',
          dataIndex: 'pretaxReducedPrice',
          width: 150,
          ellipsis: true,
          align: 'left',
        },
        {
          title: '税后优惠价',
          key: 'reducedPrice',
          dataIndex: 'reducedPrice',
          width: 150,
          ellipsis: true,
          align: 'left',
        },
        {
          title: '税率',
          key: 'taxRate',
          dataIndex: 'taxRate',
          width: 150,
          ellipsis: true,
          align: 'left',
        },
        {
          title: '备注',
          key: 'remark',
          dataIndex: 'remark',
          width: 200,
          fixed: 'right',
          ellipsis: true,
          align: 'center',
        },
      ],
    }
  },
  created() {
    let params = { saleOrderNo: this.$route.params.saleOrderNo }
    this.getData(params)
  },
  methods: {
    ...mapActions(['FALLBACK']),
    async getData(params) {
      let res = await api.getMarketDetail(params)
      this.dataList = res.data
    },
    getValue(val) {
      if (val) {
        const _val = typeof val == 'string' ? JSON.parse(val) : val
        return _val['规格'] && _val['规格'].join('\n')
      } else {
        return val
      }
    },
  },
}
</script>

<style lang="less" scoped>
.container-edit {
  position: relative;
  height: 100%;
  .content-main {
    overflow-y: auto;
    height: calc(100% - 30px);
  }
}
.form-wrop {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  min-width: 700px;
  padding-left: 3%;
  word-wrap: break-word;
}
.form-wrop-item {
  width: 50%;
  // overflow:hidden;
  // white-space:nowrap;
  // text-overflow:ellipsis;
  // word-wrap: break-word;
}
#distributorAudit {
  height: 100%;
  background: #fff;
  overflow: hidden;
  .content-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .info {
    color: #666666;
  }
  .active {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px;
    height: 28px;
    display: block;
  }
  .span-flag {
    cursor: pointer;
    color: #4b7afb;
  }
}
</style>
