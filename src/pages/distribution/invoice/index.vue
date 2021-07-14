<template>
  <div style="height: 100%;">
    <a-form-model :model="form" layout="inline" ref="formi" labelAlign="left">
      <a-form-model-item label="出账公司" prop="org">
        <a-input
          v-model="form.org"
          placeholder="请输入请款单编码"
          :maxLength="20"
        />
      </a-form-model-item>
      <a-form-model-item label="开票开始日期" prop="invoiceStart">
        <a-date-picker v-model="form.invoiceStart" />
      </a-form-model-item>
      <a-form-model-item label="开票结束日期" prop="invoiceEnd">
        <a-date-picker v-model="form.invoiceEnd" />
      </a-form-model-item>
      <a-form-model-item label="发票类型" prop="invoiceType">
        <a-select v-model="form.invoiceType" placeholder="请选择" allowClear>
          <a-select-option
            :value="v.v"
            :label="v.n"
            v-for="(v, i) in invoiceTypeArr"
            :key="i"
          >
            {{ v.n }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="审核状态" prop="approvalStatus">
        <a-select v-model="form.approvalStatus" placeholder="请选择" allowClear>
          <a-select-option
            :value="v.v"
            :label="v.n"
            v-for="(v, i) in approvalStatusArr"
            :key="i"
          >
            {{ v.n }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="开票状态" prop="invoicingStatus">
        <a-select
          v-model="form.invoicingStatus"
          placeholder="请选择"
          allowClear
        >
          <a-select-option
            :value="v.v"
            :label="v.n"
            v-for="(v, i) in invoicingStatusArr"
            :key="i"
          >
            {{ v.n }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="是否回款" prop="fundRestream">
        <a-select v-model="form.fundRestream" placeholder="请选择" allowClear>
          <a-select-option
            :value="v.v"
            :label="v.n"
            v-for="(v, i) in fundRestreamArr"
            :key="i"
          >
            {{ v.n }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="item-btns">
        <a-button class="item-btn" type="primary" @click="_toSearch">
          搜索
        </a-button>
        <a-button class="item-btn" @click="_toReset">
          重置
        </a-button>
        <a-button class="item-btn" type="primary" @click="deaFn('')">
          新增
        </a-button>
        <a-button
          class="item-btn"
          type="primary"
          :loading="casLoading"
          @click="down"
        >
          电子发票下载
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <div id="neighborhoodLife">
      <div class="content-main" ref="content_main">
        <a-row style="padding:20px;height:100%;">
          <a-col flex:auto>
            <!-- 表格 -->
            <a-table
              :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
              }"
              :columns="tableColumns"
              :row-key="(r, i) => i"
              :data-source="tableData"
              :scroll="{ x: 1300,y: 800 }"
              :pagination="false"
              :loading="tableLoading"
              style="margin-top:8px;"
            >
              <template slot="operation" slot-scope="operation">
                <div class="editable-row-operations">
                  <!-- <a @click="upFn(operation)">更改</a> -->
                  <a @click="deaFn(operation)">详情</a>
                </div>
              </template>
            </a-table>
            <!-- 分页 -->
            <a-pagination
              :total="total"
              :show-total="(total) => `共 ${total} 条`"
              show-quick-jumper
              show-size-changer
              v-model="current"
              :default-current="current"
              :page-size.sync="pageSize"
              :pageSizeOptions="['10', '20', '50', '100']"
              @change="onShowSizeChange"
              @showSizeChange="onShowSizeChange"
              style="margin-top:30px;width:100%;text-align: right;"
            />
          </a-col>
        </a-row>
      </div>
    </div>
    <!--  -->
    <a-modal
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="modal-box">
        <div>
          <div class="name">原出账公司：</div>
          <div>{{ "**" }}</div>
        </div>
        <div>
          <div class="name">新出账公司：</div>
          <a-input placeholder="请输入" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import api from "@/api";
import { debounce, openLink } from "@/utils/util";
import {
  tableColumns,
  invoiceTypeArr,
  filtFn,
  approvalStatusArr,
  invoicingStatusArr,
  fundRestreamArr,
} from "./config";
import { mapState } from "vuex";
export default {
  components: {},
  data: () => ({
    invoiceTypeArr,
    approvalStatusArr,
    invoicingStatusArr,
    fundRestreamArr,
    visible: false,
    confirmLoading: false,
    form: {
      invoiceEnd: "",
      invoiceStart: "",
      org: "",
      approvalStatus: undefined,
      fundRestream: undefined,
      invoiceType: undefined,
      invoicingStatus: undefined,
    },
    userName: "",
    //表头数据
    tableColumns,
    //列表数据
    tableData: [],
    tableLoading: false,
    //分页
    total: 0,
    pageSize: 10,
    current: 1,
    selectedRowKeys: [],
    selectedRows: "",
    casLoading: false,
  }),
  computed: mapState([
    "Case_Access_Token",
  ]),
  watch: {
    Case_Access_Token(newVal, oldVal) {
      this.InvoiceList();
    },
  },
  mounted: function() {
    if(!this.Case_Access_Token) return;
    this.InvoiceList();
  },
  methods: {
    _toSearch() {
      console.log(this.form);
      this.InvoiceList();
    },
    _toReset() {
      this.$refs.formi.resetFields();
      this.InvoiceList();
    },
    InvoiceList() {
      this.tableLoading = true;
      const para = {
        ...this.form,
        pageNum: this.current,
        pageSize: this.pageSize,
      };
      if (para.invoiceEnd)
        para.invoiceEnd = para.invoiceEnd.format("YYYY-MM-DD HH:mm:ss");
      if (para.invoiceStart)
        para.invoiceStart = para.invoiceStart.format("YYYY-MM-DD HH:mm:ss");

      api
        .InvoiceList(para)
        .then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.records;
            this.total = res.data.total * 1;
            this.tableData.forEach((v) => {
              v.invoiceType = filtFn(invoiceTypeArr, v.invoiceType);
              v.approvalStatus = filtFn(approvalStatusArr, v.approvalStatus);
              v.invoicingStatus = filtFn(invoicingStatusArr, v.invoicingStatus);
              v.fundRestream = filtFn(fundRestreamArr, v.fundRestream);
            });
          }
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    down() {
      // 电子发票
      this.casLoading = true;
      console.log(this.selectedRows);
      let arr = JSON.parse(JSON.stringify(this.selectedRows));
      let qarr = [];
      if (arr.length) {
        arr.forEach((element) => {
          qarr.push(
            api.downInvoice({
              invoiceId: element.id,
              sellerId: element.sellerId,
            })
          );
        });
      }
      Promise.all(qarr)
        .then((re) => {
          re.forEach((ele) => {
            let obj = JSON.parse(ele.data);
            window.open(obj.url)
            const a = document.createElement('a');
            console.log('电子发票下载地址',obj.url)
            a.href = obj.url;
            a.click();
            // openLink(obj.url);
          });
          this.selectedRowKeys = [];
          this.selectedRows = [];
          this.casLoading = false;
        })
        .catch((e) => {
          this.selectedRowKeys = [];
          this.selectedRows = [];
          this.casLoading = false;
        });
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
      console.log(this.selectedRows);
    },
    deaFn(operation) {
      let obj = operation ? { ...operation } : { add: true };
      debounce(() => {
        this.$router.push({
          name: "addInvoice",
          params: obj,
        });
      });
    },
    upFn(val) {
      console.log(val);
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      this.visible = false;
    },
    // 分页
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.InvoiceList();
    },
  },
};
</script>

<style lang="less" scoped>
// .ant-input-search .ant-input-suffix {
//   right: 18px;
// }
</style>
<style lang="less" scoped>
.ant-form {
  padding: 20px;
  > div {
    width: 350px;
  }
  /deep/.ant-form-item-control-wrapper {
    width: 250px;
  }
  /deep/.ant-calendar-picker-input {
    width: 250px;
  }
  /deep/.ant-form-item-label {
    width: 100px;
  }
  /deep/ .item-btns {
    margin-top: 10px;
    width: 700px !important;
    .ant-form-item-control-wrapper {
      width: 700px !important;
    }
  }
  /deep/ .item-btns .item-btn {
    margin-right: 20px;
  }
}
.modal-box {
  padding-top: 20px;
  > div {
    height: 50px;
    display: flex;
    align-items: center;
    .name {
      width: 100px;
    }
    input {
      flex: 1;
    }
  }
}
// .ant-form{
// 	box-sizing: border-box;
// 	padding: 20px 0 0 20px;
// 	width: 100%;
// 	display: flex;
// 	align-items: center;
// 	flex-wrap:wrap;
// 	.ant-form-item{
// 		display: flex;
// 		// width: 33.33%;
// 		width: 300px;
// 		padding-right: 20px;
// 	}
// 	/deep/ .item-btns .ant-form-item-control{
// 		display: flex;
// 		justify-content: flex-end;
// 	}
// 	/deep/ .item-btns .ant-form-item-children{
// 		width: 100%;
// 		display: flex;
// 		align-items: center;
// 		justify-content: flex-end;
// 	}
// }
</style>
