<template>
	<div class="content-release">
		<div class="go-back">
			<!-- <a-button  @click="_toExportList" class="item-btn btn-right" type="primary">
				导出Excel
			</a-button> -->
			<a-button @click="goBack">返回</a-button>
		</div>
		<a-form>
			<a-form-item>
				<a-input v-model="purchaseNo	" placeholder="请输入采购单号"/>
			</a-form-item>
			<a-form-item>
				<a-input v-model="orderNo" placeholder="请输入订单号"/>
			</a-form-item>
			<a-form-item>
				<a-select v-model="productMark" :placeholder="'请选择正负状态'" allowClear>
					<a-select-option
						v-for="(item,index) of productMarkArr"
						:key="index"
						:value="item.value"
					>{{item.label}}</a-select-option>
				</a-select>
			</a-form-item>
		  <a-form-item class="item-btns">
		    <a-button @click="_toSearch" class="item-btn" type="primary">
		      查找
		    </a-button>
				<!-- @click="_toReset" -->
				<!-- <a-button class="item-btn">
		      重置
		    </a-button> -->
				<a-button  @click="_toExportList" class="item-btn btn-right" type="primary">
					导出Excel
				</a-button>
		  </a-form-item>
		</a-form>
		<div class="main-release">
			<div class="cr-content">
				<div class="cr-group">
					<div class="info-groups">
						<div class="info-groups-item-2 basics-info">应付单编号：{{orderTradeInfo.payBillNo}}</div>
						<div class="info-groups-item basics-info">应付单时间范围：{{orderTradeInfo.billTimeScope}}</div>
						<!-- <div class="info-groups-item basics-info">应付总金额：￥{{itemParams.totalAmount}}</div> -->
						<!-- <div class="info-groups-item basics-info">税额合计：￥{{itemParams.totalTax}}</div> -->
						<div class="info-groups-item basics-info">生成时间：{{orderTradeInfo.creationTime}}</div>
					</div>
				</div>
				<!-- 详情列表 -->
				<div id="neighborhoodLife">
					<div class="content-main" ref="content_main">
						<a-row style="padding:20px;height:100%;">
							<a-col flex:auto>
								<!-- 表格 -->
								<a-table
									:columns="columns"
									:row-key="(r,i) => i"
									:data-source="tableData"
									:scroll="{ x: 1000 }"
									:pagination="false"
									:loading="tableLoading"
									style="margin-top:8px;">
									<template slot="num" slot-scope="text, record, index">
									    <span>
												{{
									        (current - 1) * pageSize +
									            parseInt(index) +
									            1
												}}
											</span>
									</template>
									<template slot="productMark" slot-scope="operation">
										<span>{{operation.productMark}}</span>
									</template>
									<template slot="changeType" slot-scope="operation">
										<span v-if="operation.productMark=='+'">发货成功</span>
										<span v-if="operation.productMark=='-'">售后退款</span>
									</template>
								</a-table>
								<!-- 分页 -->
								<a-pagination
									:total="total"
									:show-total="total => `共 ${total} 条`"
									show-quick-jumper
									show-size-changer
									v-model="current"
									:default-current="current"
									:page-size.sync="pageSize"
									:pageSizeOptions="['10','20','50','100']"
									@change="onShowSizeChange"
									@showSizeChange="onShowSizeChange"
									style="margin-top:30px;width:100%;text-align: right;"
								/>
							</a-col>
						</a-row>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import api from "@/api";
	import message from 'ant-design-vue/es/message';
	const tableData = []
	import { mapState } from "vuex";
	export default {
		name: "contentRelease",
		components: {

		},
		data() {
			return {
				purchaseNo	: '',	//采购单号
				orderType: undefined,
				productMark: undefined,
				productMarkArr:[
					{label:'正',value:'0'},
					{label:'负',value:'1'}
				],

				orderNo: '',	//订单号
				orderUserPhone:'',
				receiverPhone: '',

				itemParams: {}, //跳转item详情
				orderTradeInfo: {}, //应付订单列表item
				orderState : 0,	//1,2,3,4
				afterSalesOperate:0,
				orderItemList:[],
				loading: false,
				showModal: false,
				//表头数据-商品信息
				//表头数据
				columns: [
					{
						title: "序号",
						dataIndex: "num",
						key: "num",
						width: 80,
						scopedSlots: { customRender: "num" },
					},
					{
						title: "供应商名称",
						dataIndex: "supplier",
						key: "supplier",
						width: 200,
						ellipsis: false,
					},
					{
						title: "采购单号",
						dataIndex: "purchaseNo",
						key: "purchaseNo",
						width: 150,
						ellipsis: false,
					},
					{
						title: "订单号",
						dataIndex: "orderNo",
						key: "orderNo",
						width: 250,
						ellipsis: false,
					},
					{
						title: "物料编码",
						dataIndex: "materialNumber",
						key: "materialNumber",
						width: 180,
						ellipsis: false,
					},
					{
						title: "商品SKU编码",
						dataIndex: "productCode",
						key: "productCode",
						width: 200,
						ellipsis: false,
					},
					{
						title: "邻里编码",
						dataIndex: "productCode",
						key: "productCode",
						width: 200,
						ellipsis: false,
					},
					{
						title: "单位",
						dataIndex: "unit",
						key: "unit",
						width: 80,
						ellipsis: false,
					},
					{
						title: "数量",
						dataIndex: "number",
						key: "number",
						width: 80,
						ellipsis: false,
					},
					{
						title: "含税单价",
						dataIndex: "unitPriceTax",
						key: "unitPriceTax",
						width: 120,
						ellipsis: false,
					},
					{
						title: "不含税单价",
						dataIndex: "unitPrice",
						key: "unitPrice",
						width: 120,
						ellipsis: false,
					},
					{
						title: "税率",
						dataIndex: "taxrate",
						key: "taxrate",
						width: 80,
						ellipsis: false,
					},
					{
						title: "不含税金额",
						dataIndex: "localNotaxCr",
						key: "localNotaxCr",
						width: 120,
						ellipsis: false,
					},
					{
						title: "税额",
						dataIndex: "localTaxCr",
						key: "localTaxCr",
						width: 120,
						ellipsis: false,
					},
					

					{
						title: "正负状态",
						// dataIndex: "productMark",
						key: "productMark",
						scopedSlots: { customRender: "productMark" },
						width: 100,
						ellipsis: false,
					},
						{
						title: "变化类型",
						// dataIndex: "ncPull",
						key: "changeType",
						scopedSlots: { customRender: "changeType" },
						width: 100,
						ellipsis: false,
					},

				],

				tableData,
				tableLoading: false,
				//分页
				total: 0,
				pageSize: 10,
				current: 1,
				data:[],
				tableRefresh: false,
				pageRefresh: true,
			};
		},
		computed: mapState([
			"Case_Access_Token",
		]),
		watch: {
			Case_Access_Token(newVal, oldVal) {
				this.payBillGetInfoByInfo();
			},
		},
		mounted() {
			if(!this.Case_Access_Token) return;
			this.itemParams = this.$route.params;
			this.orderTradeInfo = this.$route.params.itemParams;
			// this.payBillGetInfoByPayBillNo(this.$route.params.payBillNo);
			this.payBillGetInfoByInfo();
		},
		filters:{
			getOrderStateName: function (val) {
				let orderStateName = '';
				switch(val) {
					case 'UNPAID':
						orderStateName = '未支付';
						break;
					case 'PAID':
						orderStateName = '已支付';
						break;
					case 'ON_GOING':
						orderStateName = '进行中';
						break;
					case 'COMPLETED':
						orderStateName = '已完成';
						break;
					case 'CANCELED':
						orderStateName = '已取消';
						break;
					case 'CLOSE':
						orderStateName = '已取消';
						break;
					default:
						console.log('');
				}
			  return orderStateName
			},
		},

		methods: {
			goBack() {
				this.$router.go(-1); //返回上一层
			},
			_toSearch(){
				this.payBillGetInfoByInfo();
			},
			// NC数据拉取，让他先选择时间范围
			_toNcPull(){

			},
			_toExportList(){
				this.payBillInfoExportList();
			},
			// NC应收单数据拉取
			payBillGetBillSummary() {
			  this.tableLoading = true;
				const para = {
					pageNum: 1,
					pageSize: 10,
					yf_endDate: "2021-06-04T08:39:20.085Z",
					yf_startDate: "2021-06-04T08:39:20.085Z"
			  };
			  api.payBillGetBillSummary(para).then(res => {
			    if (res.code === 200) {
			      this.$message.success(res.message);
						this.payBillGetInfoByInfo();
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			// 点击搜索应付单详情列表
			payBillGetInfoByInfo() {
			  this.tableLoading = true;
				const para = {
					orderNo: this.orderNo,
					payBillNo: this.itemParams.payBillNo,
					productMark: this.productMark,
					purchaseNo: this.purchaseNo,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
			  api.payBillGetInfoByInfo(para).then(res => {
			    if (res.code === 200) {
			      this.tableData = res.data.records;
			      this.total = res.data.total*1;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			payBillInfoExportList() {
			  this.tableLoading = true;
				const para = {
					orderNo: this.orderNo,
					productMark: this.productMark,
					purchaseNo: this.purchaseNo,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
			  api.payBillInfoExportList(para).then(res => {
			    if (res.code === 200) {
						const regex = /http/;
						const a = document.createElement('a');
						a.href = res.data.replace(regex, 'https');
						a.click();
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			// 链接跳转搜索
			payBillGetInfoByPayBillNo(para) {
			  this.tableLoading = true;
			  api.payBillGetInfoByPayBillNo(para).then(res => {
			    if (res.code === 200) {
						this.tableData = res.data.records;
						this.total = res.data.total*1;
						this.payBillGetInfoByInfo();
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},

			// 分页
			onShowSizeChange(current, pageSize) {
			  this.current = current;
			  this.pageSize = pageSize;
				this.payBillGetInfoByInfo();
			},
		},
	};
</script>

<style lang="less" scoped>
	@import url("./index.less");
</style>
