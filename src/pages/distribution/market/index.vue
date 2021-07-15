<template>
	<div class="order-m order-list">
		<div class="order-header">
			<a-tabs default-active-key="1" @change="switchover">
				<a-tab-pane key="1" tab="进行中"> </a-tab-pane>
				<a-tab-pane key="2" tab="已完成"> </a-tab-pane>
			</a-tabs>
		</div>

		<div class="search-list">
      <div class="search-list-item">
				<span class="label-text">订单编号：</span>
				<a-input
					placeholder="请输入订单编号"
					class="iw250"
					v-model="searchData.saleOrderNo"
				/>
			</div>
			<div class="search-list-item">
				<span class="label-text">开始时间：</span>
				<a-date-picker
					class="iw250"
					v-model="searchData.orderTimeStart"
					:disabled-date="disabledStartDate"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
					placeholder="下单开始时间"
					@openChange="handleStartOpenChange"
					@change="onStartDateChange"
				/>
			</div>
			<div class="search-list-item">
				<span class="label-text">结束时间：</span>

				<a-date-picker
					class="iw250"
					v-model="searchData.orderTimeEnd"
					:disabled-date="disabledEndDate"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
					placeholder="下单结束时间"
					:open="endOpen"
					@openChange="handleEndOpenChange"
					@change="onEndDateChange"
				/>
			</div>
      	<div class="search-list-item">
					<span class="label-text">采购公司：</span>
				<a-select v-model="orderStatusValue" class="iw250">
					<a-select-option
						:value="item.id"
						v-for="item in orderStatusListSelect"
						:key="item.name"
					>
						{{ item.name }}
					</a-select-option>
				</a-select>
			</div>
			
			<div class="search-list-item">
				<span class="label-text">收货人：</span>
				<a-input
					placeholder="请输入收货人"
					class="iw250"
					v-model="searchData.receiver"
				/>
			</div>

			<div class="search-list-item">
				<span class="label-text">城市公司：</span>
				<a-select :placeholder="'请选择城市公司'" v-model="searchData.cityCompany" class="iw250">
					<a-select-option
						v-for="item in cityCompanyList"
						:key="item.cityCompanyCode"
						:value="item.cityCompanyCode"
					>
						{{ item.cityCompany }}
					</a-select-option>
				</a-select>
			</div>

			<div class="search-list-item" style="margin-left:30px">
				<a-button type="primary" @click="handleSearch">查询</a-button>
			</div>
      <div class="search-list-item" style="margin-left:30px">
				<a-button type="primary" @click="_toReset">重置</a-button>
			</div>
		</div>

		<div class="order-table">
			<a-table
				:rowKey="(record) => record.id"
				:columns="columns"
				:data-source="dataList"
				:scroll="{ x: 1300, y: scrollY }"
				:pagination="paginationIndex"
				:loading="loading"
				@change="tableChange"
			>
				<a slot="name" slot-scope="text">{{ text }}</a>

				<div slot="addressDto" slot-scope="text, record">
					<div>
						<!-- <p>姓名：{{record.addressDto.receiverName}}</p>
						<p>电话：{{record.addressDto.receiverPhone}}}</p>
						<p>地址：{{record.addressDto.detailAddress}}}</p> -->
					</div>
				</div>

				<div slot="amount" slot-scope="text, record">
					<div
						class="goods-detail goods-items-block"
						v-for="(item, index) in record.orderItemList"
						:key="index"
					>
						<span>{{ item.buyNum }}</span>
					</div>
				</div>
				<span slot="deliveryStatus" slot-scope="text, record">
					<div
						class="goods-detail goods-items-block"
						v-for="(item, index) in record.orderItemList"
						:key="index"
					>
						<span>{{
							item.deliveryStatus == "0"
								? "未发货"
								: item.deliveryStatus == "1"
								? "部分发货"
								: "全部发货"
						}}</span>
					</div>
				</span>
                      <!-- 操作 -->
				<span slot="action" slot-scope="text, record">
					<a	@click="applyAfterSale(record)"	>修改城市公司</a>
					<a-divider	type="vertical"/>
					<a @click="checkDetails(record)">查看</a> 
				</span>
			</a-table>
		</div>

		<AfterSaleApproveModal
			:row="rowData"
			:visible="afterVisible"
			@changeHandle="changeHandle"
		></AfterSaleApproveModal>
	</div>
</template>

<script>
import {
	orderStatusListSelect,
	columns,
	rowSelection,
	pagination,
	afterSaleType,
} from "./defaultConfig";

import AfterSaleApproveModal from "./afterSaleApproveModal";
import api from "@/api";
import { mapState } from "vuex";
const paginationIndex = { ...pagination };
export default {
	name: "market",
	components: {
		AfterSaleApproveModal,
	},
	data() {
		return {
			columns,
			paginationIndex,
			searchData: {
				saleOrderNo: '',  // 订单编号 
				orderTimeStart: '', // 开始时间
				orderTimeEnd: '', // 结束时间
				purchaseCompany: '', // 采购公司
				receiver: '', // 收货人 模糊查询
				cityCompany: undefined, // 城市公司
			},
			orderState: 'PROCESSING',
			pageData: {
				pageNum: 1,
				pageSize: 10
			},
			loading: false,
			dataList: [],
			cityCompanyList: [],
			orderStatusValue: "0",  // 采购公司 城市公司
			orderStatusListSelect,
			afterVisible: false,
			endOpen: false,
			rowData: {},
      //表格高度
      scrollY: 100,
		};
	},
	computed: mapState(["Case_Access_Token"]),
	watch: {
		Case_Access_Token(newVal, oldVal) {
			let params = {
				orderState: this.orderState, // 订单状态 进行中 已完成
				pageNum: this.pageData.pageNum, // 第几页
				pageSize:this.pageData.pageSize, // 每页多少条
				saleOrderNo: this.searchData.saleOrderNo,  // 订单编号 
				orderTimeStart: this.searchData.orderTimeStart, // 开始时间
				orderTimeEnd: this.searchData.orderTimeEnd, // 结束时间
				purchaseCompany: this.searchData.purchaseCompany, // 采购公司
				receiver: this.searchData.receiver, // 收货人 模糊查询
				cityCompany: this.searchData.cityCompany, // 城市公司
			}
			this.getData(params);
		},
		orderStatusValue(val) {
			let emptyArr = [];
			switch (val) {
				case "0":
					emptyArr = [];
					break;
				case "1":
					emptyArr = ["WAIT_DELIVERY"];
					break;
				case "2":
					emptyArr = ["DELIVERING", "WAIT_RECEIVE"];
					break;
				default:
					break;
			}
			this.orderStatusListSearch = emptyArr;
		},
	},
	mounted() {
		if (this.Case_Access_Token) {
			let params = {
				orderState: this.orderState, // 订单状态 进行中 已完成
				pageNum: this.pageData.pageNum, // 第几页
				pageSize:this.pageData.pageSize, // 每页多少条
				saleOrderNo: this.searchData.saleOrderNo,  // 订单编号 
				orderTimeStart: this.searchData.orderTimeStart, // 开始时间
				orderTimeEnd: this.searchData.orderTimeEnd, // 结束时间
				purchaseCompany: this.searchData.purchaseCompany, // 采购公司
				receiver: this.searchData.receiver, // 收货人 模糊查询
				cityCompany: this.searchData.cityCompany, // 城市公司
			}
			this.getData(params);
			this.getCityCompanyList()
		}
	},
  created() {
    const timer1 = setTimeout(() => {
      this.scrollY = document.body.clientHeight - 370 + 'px';
    }, 0);
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer1);
    });
  },
	methods: {
		// 获取列表数据
		async getData(params) {
			this.loading = true
			if(!params) {
				params = {
					orderState: this.orderState, // 订单状态 进行中 已完成
					pageNum: this.pageData.pageNum, // 第几页
					pageSize:this.pageData.pageSize, // 每页多少条
					saleOrderNo: this.searchData.saleOrderNo,  // 订单编号 
					orderTimeStart: this.searchData.orderTimeStart, // 开始时间
					orderTimeEnd: this.searchData.orderTimeEnd, // 结束时间
					purchaseCompany: this.searchData.purchaseCompany, // 采购公司
					receiver: this.searchData.receiver, // 收货人 模糊查询
					cityCompany: this.searchData.cityCompany, // 城市公司
				}
			}
			try {
				let res = await api.getMarketOrderList(params)
				this.dataList = res.data.records;
			} finally {
				this.loading = false
			}
		},
		handleSearch() {
			let params = {
				orderState: this.orderState, // 订单状态 进行中 已完成
				pageNum: this.pageData.pageNum, // 第几页
				pageSize:this.pageData.pageSize, // 每页多少条
				saleOrderNo: this.searchData.saleOrderNo,  // 订单编号 
				orderTimeStart: this.searchData.orderTimeStart, // 开始时间
				orderTimeEnd: this.searchData.orderTimeEnd, // 结束时间
				purchaseCompany: this.searchData.purchaseCompany, // 采购公司
				receiver: this.searchData.receiver, // 收货人 模糊查询
				cityCompany: this.searchData.cityCompany, // 城市公司
			}
			this.getData(params)
		},
		tableChange(e) {
			let { pageSize, current } = e;
			this.current = current;
			this.pageSize = pageSize;
			this.paginationIndex.current = e.current * 1;
			this.paginationIndex.total = e.total * 1;
			this.getData({
				pageNum: this.current,
				pageSize: this.pageSize,
			});
		},
		_toReset() {
			let params = {
				orderState: '', // 订单状态 进行中 已完成
				pageNum: this.pageData.pageNum, // 第几页
				pageSize:this.pageData.pageSize, // 每页多少条
				saleOrderNo: '',  // 订单编号 
				orderTimeStart: '', // 开始时间
				orderTimeEnd: '', // 结束时间
				purchaseCompany: '', // 采购公司
				receiver: '', // 收货人 模糊查询
				cityCompany: undefined, // 城市公司
			}
			this.getData(params)
		},
		// 查看详情
		checkDetails(record) {
			this.$router.push({
				name: "marketdetail",
				params: {
					saleOrderNo: record.saleOrderNo,
				},
			});
		},
		// 获取城市公司
		async getCityCompanyList() {
			try {
				let res = await api.getMarketCompanyList()
				this.cityCompanyList = res.data;
			} finally {
			}
		},
		applyAfterSale(record) {
			this.rowData = record
			this.afterVisible = true;
		},
		// 选项卡切换 进行中 已完成
		switchover(key) {
			switch (key) {
				case "1":
					this.orderState = 'PROCESSING'
					break;
				case "2":
					this.orderState = 'FINISHED'
					break;
				default:
					break;
			}
			let params = {
				orderState: this.orderState, // 订单状态 进行中 已完成
				pageNum: this.pageData.pageNum, // 第几页
				pageSize:this.pageData.pageSize, // 每页多少条
				saleOrderNo: this.searchData.saleOrderNo,  // 订单编号 
				orderTimeStart: this.searchData.orderTimeStart, // 开始时间
				orderTimeEnd: this.searchData.orderTimeEnd, // 结束时间
				purchaseCompany: this.searchData.purchaseCompany, // 采购公司
				receiver: this.searchData.receiver, // 收货人 模糊查询
				cityCompany: this.searchData.cityCompany, // 城市公司
			}
			this.getData(params)
		},
		changeHandle() {
			this.afterVisible = false;
		},
		disabledStartDate(orderTimeStart) {
			const orderTimeEnd = this.searchData.orderTimeEnd;
			if (!orderTimeStart || !orderTimeEnd) {
				return false;
			}
			return orderTimeStart.valueOf() > orderTimeEnd.valueOf();
		},
		disabledEndDate(orderTimeEnd) {
			const orderTimeStart = this.searchData.orderTimeStart;
			if (!orderTimeEnd || !orderTimeStart) {
				return false;
			}
			return orderTimeStart.valueOf() >= orderTimeEnd.valueOf();
		},
		handleStartOpenChange(open) {
			if (!open) {
				this.endOpen = true;
			}
		},
		handleEndOpenChange(open) {
			this.endOpen = open;
		},
		onStartDateChange(date, dateString) {
			this.orderTimeStart = dateString;
		},
		onEndDateChange(date, dateString) {
			this.orderTimeEnd = dateString;
		},
	},
};
</script>

<style lang="less" scoped>
@import url("./index.less");
.order-m {
	padding: 20px;
}
/deep/ .ant-modal-body {
	padding: 0px;
}
/deep/ .order-table .ant-table-tbody > tr > td {
	&:nth-child(1) {
		padding: 16px !important;
	}
	// &:nth-child(2) {
	// 	padding: 0;
	// }
	// &:nth-child(3) {
	// 	padding: 0;
	// }
	&:nth-child(4) {
		padding: 0;
	}
	&:nth-last-child(1) {
		padding: 16px;
	}
}
.goods-items {

	width: 100%;

	.gi-item {
		display: flex;
		.gi-pic {
			height: 80px;
			width: 80px;
			> img {
				height: 80px;
				width: 80px;
			}
		}
		.gi-info {
			margin-left: 10px;
			// padding: 15px 0;
			flex: 1;
			// display: flex;
			// flex-direction: column;
			// justify-content: space-between;
			// > p {
				// overflow: hidden;
				// text-overflow:ellipsis;
				// white-space: nowrap;
			// }
			.title {
				color: #666;
				font-size: 14px;
			}
			.size {
				color: rgb(143, 139, 139);
				font-size: 12px;
			}
		}
	}
}
</style>
