<template>
	<div class="order-m order-list">
		<div class="order-header">
			<a-tabs default-active-key="1" @change="switchover">
				<a-tab-pane key="1" tab="全部"> </a-tab-pane>
				<a-tab-pane key="2" tab="待发货"> </a-tab-pane>
				<a-tab-pane key="3" tab="部分发货"> </a-tab-pane>
				<a-tab-pane key="4" tab="已发货"> </a-tab-pane>
				<a-tab-pane key="5" tab="已完成"> </a-tab-pane>
				<a-tab-pane key="6" tab="已取消"> </a-tab-pane>
			</a-tabs>
		</div>

		<div class="search-list">
			<div class="search-list-item">
				<span class="label-text">开始时间：</span>
				<a-date-picker
					class="iw250"
					v-model="orderTimeStart"
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
					v-model="orderTimeEnd"
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
				<span class="label-text">采购单号：</span>
				<a-input
					placeholder="请输入采购单号"
					class="iw250"
					v-model="purchaseCode"
				/>
			</div>
			<div class="search-list-item">
				<span class="label-text">订单编号：</span>
				<a-input
					placeholder="请输入订单编号"
					class="iw250"
					v-model="orderNo"
				/>
			</div>
			<div class="search-list-item">
				<span class="label-text">收货人：</span>
				<a-input
					placeholder="请输入收货人"
					class="iw250"
					v-model="receiverName"
				/>
			</div>
			<div class="search-list-item">
				<span class="label-text">收货手机：</span>
				<a-input
					placeholder="请输入收货手机"
					class="iw250"
					v-model="receiverPhone"
				/>
			</div>

			<div class="search-list-item" v-if="switchoverValue == 1">
				<span class="label-text">订单状态：</span>
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
				<span class="label-text">供应商名称：</span>
				<a-input
					placeholder="请输入供应商名称"
					class="iw250"
					v-model="supplierName"
				/>
			</div>

			<div class="search-list-item" style="margin-left:30px">
				<a-button type="primary" @click="handleSearch">查询</a-button>
			</div>
		</div>

		<div class="order-table">
			<a-table
				:rowKey="(record) => record.id"
				:columns="columns"
				:data-source="orderListData"
				:scroll="{ x: 1300, y: 800 }"
				:pagination="paginationIndex"
				:loading="loading"
				@change="tableChange"
			>
				<a slot="name" slot-scope="text">{{ text }}</a>
				<span slot="goods" slot-scope="text, record">
					<div
						class="goods-items"
						v-for="(item, index) in record.orderItemList"
						:key="index"
					>
						<div class="gi-item">
							<!-- <div class="gi-pic">
								<img :src="item.itemImg" alt="" />
							</div> -->
							<div class="gi-info">
								<div class="title">{{ item.itemName }}</div>
								<div
									class="size"
									:title="titleFn(item.itemSpecsArray)"
								>
									规格：
									<span
										class="feature"
										v-for="(item1,
										index1) in item.itemSpecsArray"
										:key="index1"
									>
										{{
											item1.featureName +
												" - " +
												item1.featureValue
										}}
										<span
											v-if="
												item.itemSpecsArray.length >
													1 &&
													index1 !=
														item.itemSpecsArray
															.length -
															1
											"
											>,</span
										>
									</span>
								</div>
							</div>
						</div>
					</div>
				</span>

				<div slot="sku" slot-scope="text, record">
					<div
						class="goods-detail goods-items-block"
						v-for="(item, index) in record.orderItemList"
						:key="index"
					>
						<span>{{ item.itemCode }}</span>
					</div>
				</div>

				<div slot="price" slot-scope="text, record">
					<div
						class="goods-detail goods-items-block"
						v-for="(item, index) in record.orderItemList"
						:key="index"
					>
						<span>{{ item.itemPrice }}</span>
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

				<span slot="action" slot-scope="text, record">
					<a @click="checkDetails(record)">查看详情</a>

					<a-divider
						type="vertical"
						v-if="record.orderStatus == 'WAIT_DELIVERY'"
					/>
					<a
						v-if="record.orderStatus == 'WAIT_DELIVERY'"
						@click="handleCancelOrder(record)"
						>取消订单</a
					>

					<a-divider
						type="vertical"
						v-if="record.orderStatus == 'COMPLETED'"
					/>
					<a
						v-if="record.orderStatus == 'COMPLETED'"
						@click="applyAfterSale(record)"
						>申请售后</a
					>
				</span>
			</a-table>
		</div>

		<AfterSaleApproveModal
			:supplierOrderNo="afterOrderNo"
			:supplierCode="supplierCode"
			:afterVisible="afterVisible"
			@change="changeVisible"
		></AfterSaleApproveModal>
	</div>
</template>

<script>
import {
	orderStatusListSelect,
	columns,
	modalColumns,
	rowSelection,
	pagination,
	afterSaleType,
} from "./defaultConfig";

import AfterSaleApproveModal from "./afterSaleApproveModal";
import api from "@/api";
import { mapState } from "vuex";
const paginationIndex = { ...pagination };
export default {
	name: "orderManagement",
	components: {
		AfterSaleApproveModal,
	},
	data() {
		return {
			orderStatusValue: "0",
			orderStatusListSelect,
			columns,
			modalColumns,
			paginationIndex,

			loading: false,

			afterSaleType,
			rowSelection,
			expandedRowKeys: [],
			selectedRowKeys: [],
			afterVisible: false,
			refundReason: "",
			orderListData: [],
			current: 1,
			pageSize: 10,
			orderNo: "",
			purchaseCode: "",
			receiverName: "",
			orderStatusListSearch: [],
			switchoverValue: "1",
			orderTimeStart: null,
			orderTimeEnd: null,
			endOpen: false,
			supplierName: "",
			receiverPhone: "",
			orderItemsData: [],
			afterOrderNo: "",
			supplierCode: "",
		};
	},
	computed: mapState(["Case_Access_Token"]),
	watch: {
		Case_Access_Token(newVal, oldVal) {
			this.init();
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
				case "3":
					emptyArr = ["COMPLETED"];
					break;
				case "4":
					emptyArr = ["CANCELED", "CLOSE"];
					break;
				default:
					break;
			}
			this.orderStatusListSearch = emptyArr;
		},
	},
	mounted() {
		if (this.Case_Access_Token) {
			this.init();
		}
	},
	methods: {
		init() {
			let lastPage = sessionStorage.getItem("listPageParams");
			let lastPost = {};
			lastPost = { ...lastPost, ...JSON.parse(lastPage) };
			this.getOrderListAction(lastPost);
		},

		handleSearch() {
			let searchKeyword = {
				orderNo: this.orderNo,
				purchaseCode: this.purchaseCode,
				receiverName: this.receiverName,
				orderStatusList: this.orderStatusListSearch,
				orderTimeStart: this.orderTimeStart ? this.orderTimeStart : "",
				orderTimeEnd: this.orderTimeEnd ? this.orderTimeEnd : "",
				supplierName: this.supplierName,
				receiverPhone: this.receiverPhone,
			};
			this.getOrderListAction(searchKeyword);
		},
		async getOrderListAction(opt) {
			let getConfig = { pageNum: 1, pageSize: 10 };
			getConfig = { ...getConfig, ...opt };
			sessionStorage.setItem(
				"listPageParams",
				JSON.stringify({
					pageSize: getConfig.pageSize,
					pageNum: getConfig.pageNum,
				})
			);
			this.loading = true;
			try {
				let { data, code } = await api.getOrderList(getConfig);
				if (code !== 200) return;
				this.orderListData = data.records;
				this.current = data.current;
				this.pageSize = data.size;
				this.paginationIndex.current = data.current * 1;
				this.paginationIndex.total = data.total * 1;
			} finally {
				this.loading = false;
			}
		},
		titleFn(v) {
			let str = "";
			v.forEach((ele) => {
				str += ele.featureName + " - " + ele.featureValue;
			});
			return str;
		},
		clearValue() {
			this.orderNo = "";
			this.purchaseCode = "";
			this.receiverName = "";
			this.orderStatusListSearch = [];
			this.orderTimeStart = null;
			this.orderTimeEnd = null;
			this.supplierName = "";
			this.receiverPhone = "";
		},
		checkDetails(record) {
			this.$router.push({
				name: "OrderDetails",
				params: {
					id: record.supplierOrderNo,
				},
			});
		},
		handleOk(e) {
			this.visible = false;
		},
		async getOrderItemsAction(No) {
			let { data, code } = await api.getOrderItems(No);
			this.orderItemsData = data;
		},
		applyAfterSale(record) {
			this.afterOrderNo = record.supplierOrderNo;
			this.supplierCode = record.supplierCode;
			this.afterVisible = true;
		},
		handleCancelOrder(record) {
			let that = this;
			that.$confirm({
				title: "确定取消订单？",
				content: "",
				onOk() {
					that.cancelOrderAction(record.supplierOrderNo);
				},
				onCancel() {},
			});
		},
		async cancelOrderAction(id) {
			let { code } = await api.cancelOrder(id);
			if (code == 200) {
				this.$message.success("取消成功");
				this.getOrderListAction({
					pageNum: this.current,
					pageSize: this.pageSize,
				});
			}
		},
		switchover(key) {
			this.clearValue();
			this.switchoverValue = key;
			let empArr = [];
			switch (key) {
				case "1":
					empArr = [];
					break;
				case "2":
					empArr = ["WAIT_DELIVERY"];
					break;
				case "3":
					empArr = ["DELIVERING"];
					break;
				case "4":
					empArr = ["WAIT_RECEIVE"];
					break;
				case "5":
					empArr = ["COMPLETED"];
					break;
				case "6":
					empArr = ["CANCELED", "CLOSE"];
					break;
				default:
					break;
			}

			this.orderStatusListSearch = empArr;
			this.getOrderListAction({
				orderStatusList: this.orderStatusListSearch,
			});
		},
		tableChange(e) {
			let { pageSize, current } = e;
			this.current = current;
			this.pageSize = pageSize;
			this.paginationIndex.current = e.current * 1;
			this.paginationIndex.total = e.total * 1;
			this.getOrderListAction({
				pageNum: this.current,
				pageSize: this.pageSize,
			});
		},
		changeVisible(data) {
			this.afterVisible = data;
		},
		onSelectChange(selectedRowKeys) {
			this.selectedRowKeys = selectedRowKeys;
		},
		disabledStartDate(orderTimeStart) {
			const orderTimeEnd = this.orderTimeEnd;
			if (!orderTimeStart || !orderTimeEnd) {
				return false;
			}
			return orderTimeStart.valueOf() > orderTimeEnd.valueOf();
		},
		disabledEndDate(orderTimeEnd) {
			const orderTimeStart = this.orderTimeStart;
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
			> p {
				// overflow: hidden;
				// text-overflow:ellipsis;
				// white-space: nowrap;
			}
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
