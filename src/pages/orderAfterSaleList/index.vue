<template>
	<div class="order-m">
		<div class="search-list">
			<div class="search-list-item">
				<span class="label-text">开始时间：</span>
				<a-date-picker
					class="iw250"
					v-model="applyTimeStart"
					:disabled-date="disabledStartDate"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
					placeholder="申请开始时间"
					@openChange="handleStartOpenChange"
					@change="onStartDateChange"
				/>
			</div>
			<div class="search-list-item">
				<span class="label-text">结束时间：</span>

				<a-date-picker
					class="iw250"
					v-model="applyTimeEnd"
					:disabled-date="disabledEndDate"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
					placeholder="申请结束时间"
					:open="endOpen"
					@openChange="handleEndOpenChange"
					@change="onEndDateChange"
				/>
			</div>

			<div class="search-list-item">
				<span class="label-text">售后单号：</span>
				<a-input
					placeholder="请输入售后单号"
					class="iw250"
					v-model="afterSaleNo"
				/>
			</div>
			<div class="search-list-item">
				<span class="label-text">采购单号：</span>
				<a-input
					placeholder="请输入采购单号"
					class="iw250"
					v-model="purchaseNo"
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
				<span class="label-text">供应商名称：</span>
				<a-input
					placeholder="请输入供应商名称"
					class="iw250"
					v-model="supplierName"
				/>
			</div>
			<div class="search-list-item">
				<span class="label-text">售后类型：</span>
				<a-select class="iw250" v-model="afterSaleType">
					<a-select-option
						:value="item.id"
						v-for="(item, index) in afterSaleTypeList"
						:key="index"
					>
						{{ item.name }}
					</a-select-option>
				</a-select>
			</div>

			<div class="search-list-item">
				<span class="label-text">审核状态：</span>
				<a-select class="iw250" v-model="afterSaleStatus">
					<a-select-option
						:value="item.id"
						v-for="(item, index) in approveList"
						:key="index"
					>
						{{ item.name }}
					</a-select-option>
				</a-select>
			</div>

			<div class="search-list-item" style="margin-left:30px">
				<a-button type="primary" @click="handleSearch">查询</a-button>
			</div>
		</div>

		<div class="order-table">
			<a-table
				:rowKey="(record) => record.id"
				:columns="columns"
				:data-source="afterSaleListData"
				:scroll="{ x: 1300, y: 800 }"
				:pagination="pagination"
				:loading="loading"
				@change="tableChange"
			>
				<a slot="name" slot-scope="text">{{ text }}</a>
				<span slot="goods" slot-scope="text, record">
					<div
						class="goods-items"
						v-for="(item, index) in record.orderItemsList"
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
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.itemCode }}</span>
					</div>
				</div>

				<div slot="price" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.itemPrice }}</span>
					</div>
				</div>

				<div slot="amount" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.itemNum }}</span>
					</div>
				</div>

				<div slot="subtotal" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.totalAmount }}</span>
					</div>
				</div>
				<div slot="supplierName" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.supplierName }}</span>
					</div>
				</div>

				<span slot="action" slot-scope="text, record">
					<a
						v-if="record.afterSaleState == 'APPROVING'"
						@click="handleCancel(record)"
						>取消售后</a
					>
					<a v-else>--</a>
				</span>
			</a-table>
		</div>
	</div>
</template>

<script>
import {
	pagination,
	columns,
	data,
	approveList,
	afterSaleTypeList,
} from "./afterConfig";
import api from "@/api";
import { mapState } from "vuex";

export default {
	name: "orderAfterSaleList",
	data() {
		return {
			data,
			pagination,
			columns,
			approveList,
			afterSaleTypeList,
			loading: false,
			pageSize: 10,
			current: 1,
			orderNo: "",
			orderStatusListSearch: [],
			switchoverValue: "1",
			applyTimeStart: null,
			applyTimeEnd: null,
			endOpen: false,
			supplierName: "",
			purchaseNo: "",
			afterSaleNo: "",
			afterSaleStatus: "",
			afterSaleType: "",
			afterSaleListData: [],
		};
	},
	computed: mapState(["Case_Access_Token"]),
	watch: {
		Case_Access_Token(newVal, oldVal) {
			this.getOrderAfterListAction();
		},
	},
	mounted() {
		if (!this.Case_Access_Token) return;

		this.getOrderAfterListAction();
	},
	methods: {
		handleSearch() {
			let postData = {
				applyTimeStart: this.applyTimeStart ? this.applyTimeStart : "",
				applyTimeEnd: this.applyTimeEnd ? this.applyTimeEnd : "",
				afterSaleNo: this.afterSaleNo,
				purchaseNo: this.purchaseNo,
				orderNo: this.orderNo,
				supplierName: this.supplierName,
				afterSaleStatus: this.afterSaleStatus,
				afterSaleType: this.afterSaleType,
			};
			this.getOrderAfterListAction(postData);
		},
		async getOrderAfterListAction(opt) {
			let postData = {
				pageNum: 1,
				pageSize: 10,
			};
			postData = { ...postData, ...opt };
			this.loading = true;
			try {
				let { data, code } = await api.getOrderAfterList(postData);
				this.afterSaleListData = data.records;
				this.pagination.total = data.total * 1;
				this.pagination.current = data.current * 1;
				this.pageSize = data.size * 1;
				this.current = data.current * 1;
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
		handleCancel(record) {
			this.cancelApproveAction({ afterSaleNo: record.afterSaleNo });
		},
		async cancelApproveAction(opt) {
			let defaluts = {
				afterSaleNo: "",
				cancelType: 1,
			};
			defaluts = { ...defaluts, ...opt };
			let { code } = await api.cancelApprove(defaluts);

			if (code == 200) {
				this.$message.success("取消成功");
				this.getOrderAfterListAction({
					pageNum: this.current,
					pageSize: this.pageSize,
					applyTimeStart: this.applyTimeStart
						? this.applyTimeStart
						: "",
					applyTimeEnd: this.applyTimeEnd ? this.applyTimeEnd : "",
					afterSaleNo: this.afterSaleNo,
					purchaseNo: this.purchaseNo,
					orderNo: this.orderNo,
					supplierName: this.supplierName,
					afterSaleStatus: this.afterSaleStatus,
					afterSaleType: this.afterSaleType,
				});
			}
		},
		tableChange(e) {
			let { pageSize, current } = e;
			this.current = current;
			this.pageSize = pageSize;
			this.getOrderAfterListAction({
				pageNum: current,
				pageSize: pageSize,
				applyTimeStart: this.applyTimeStart ? this.applyTimeStart : "",
				applyTimeEnd: this.applyTimeEnd ? this.applyTimeEnd : "",
				afterSaleNo: this.afterSaleNo,
				purchaseNo: this.purchaseNo,
				orderNo: this.orderNo,
				supplierName: this.supplierName,
				afterSaleStatus: this.afterSaleStatus,
				afterSaleType: this.afterSaleType,
			});
		},
		onStartDateChange(date, dateString) {
			this.applyTimeStart = dateString;
		},
		onEndDateChange(date, dateString) {
			this.applyTimeEnd = dateString;
		},
		disabledStartDate(applyTimeStart) {
			const applyTimeEnd = this.applyTimeEnd;
			if (!applyTimeStart || !applyTimeEnd) {
				return false;
			}
			return applyTimeStart.valueOf() > applyTimeEnd.valueOf();
		},
		disabledEndDate(applyTimeEnd) {
			const applyTimeStart = this.applyTimeStart;
			if (!applyTimeEnd || !applyTimeStart) {
				return false;
			}
			return applyTimeStart.valueOf() >= applyTimeEnd.valueOf();
		},
		handleStartOpenChange(open) {
			if (!open) {
				this.endOpen = true;
			}
		},
		handleEndOpenChange(open) {
			this.endOpen = open;
		},
	},
};
</script>

<style lang="less" scoped>
@import url("./index.less");
.title {
	color: #666;
	font-size: 14px;
}
.size {
	color: rgb(143, 139, 139);
	font-size: 12px;
}
.goods-items + .goods-items {
	margin-top: 8px;
}

.goods-detail + .goods-detail {
	margin-top: 30px;
}
</style>
