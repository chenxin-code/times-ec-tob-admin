<template>
	<div>
		<a-modal
			v-model="visible"
			:dialog-style="{ top: '30px' }"
			title="申请售后"
			okText="确定申请"
			:width="1000"
			@ok="handleOk"
			@cancel="handleCancel"
			:destroyOnClose="true"
		>
			<div class="modal-after">
				<div class="after-item">
					<span class="title">订单编号：</span>{{ supplierOrderNo }}
				</div>
				<div class="after-item">
					<span class="title">售后类型：</span>
					<a-select v-model="afterSaleTypeValue" class="iw250">
						<a-select-option
							:value="item.id"
							v-for="(item, index) in afterSaleType"
							:key="item.name"
						>
							{{ item.name }}
						</a-select-option>
					</a-select>
				</div>
				<div class="after-item">
					<span class="title">商品</span>
					<a-table
						:rowKey="(record) => record.id"
						:columns="modalColumns"
						:data-source="orderItemsData"
						:pagination="paginationAfter"
						:scroll="{ x: 1300, y: 800 }"
						:row-selection="{
							selectedRowKeys: selectedRowKeys,
							onChange: onSelectChange,
						}"
						:expanded-row-keys.sync="expandedRowKeys"
						@change="tableChange"
					>
						<span slot="goods" slot-scope="text, record">
							<div class="goods-items">
								<div class="gi-item">
									<!-- <div class="gi-pic">
										<img :src="record.itemImg" alt="" />
									</div> -->
									<div class="gi-info">
										<p class="title">
											{{ record.itemName }}
										</p>
										<p class="size" :title="titleFn(record.itemSpecsArray)">
											规格：<span
												class="feature"
												v-for="(item1,
												index1) in record.itemSpecsArray"
												:key="index1"
												>{{
													item1.featureName +
														"：" +
														item1.featureValue
												}}</span
											>
										</p>
									</div>
								</div>
							</div>
						</span>

						<span
							slot="afterAmount"
							slot-scope="text, record, index"
						>
							<a-input-number
								:min="0"
								:max="record.available"
								v-model="itemNumArr[index].itemNum"
								@change="amountChange"
							/>
						</span>
					</a-table>
				</div>

				<div
					class="after-item"
					v-if="afterSaleTypeValue == 'REFUND_RETURN'"
				>
					<span class="title">退款金额：</span>{{ refundMoney }}
				</div>
				<div class="after-item after-tips">
					<span class="title">申请理由：（必填）</span>

					<div style="position:relative;width:400px;">
						<a-textarea
							v-model="applyReason"
							placeholder="请输入申请理由"
							:auto-size="{ minRows: 5, maxRows: 8 }"
							:maxLength="300"
						/>
						<span class="tips-text"
							>{{ applyReason.length }}/300</span
						>
					</div>
				</div>
			</div>
		</a-modal>
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
import api from "@/api";
const paginationAfter = { ...pagination };

export default {
	name: "afterSaleApproveModal",
	props: {
		afterVisible: {
			type: Boolean,
			default: false,
		},
		supplierOrderNo: {
			type: String,
			default: "",
		},
		supplierCode: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			orderStatusListSelect,
			columns,
			modalColumns,
			rowSelection,
			paginationAfter,
			afterSaleType,
			visible: false,
			orderItemsData: [],
			refundReason: "",
			selectedRowKeys: [],
			expandedRowKeys: [],
			afterSaleTypeValue: "REFUND_RETURN",
			applyReason: "",
			itemNumArr: [],
			refundMoney: 0,
		};
	},
	watch: {
		visible(val) {
			this.itemNumArr.forEach((item) => {
				item.id = "";
				item.itemNum = "";
				item.itemPrice = "";
			});
			this.selectedRowKeys = [];
			this.refundMoney = 0;
			this.applyReason = "";
			if (val) {
				if (this.supplierOrderNo) {
					this.getOrderItemsAction(this.supplierOrderNo);
				}
			}
		},
		afterVisible(val) {
			this.visible = val;
		},
	},
	mounted() {},
	methods: {
		async afterSaleApproveAction() {
			let postData = {
				afterSaleType: this.afterSaleTypeValue,
				applyReason: this.applyReason,
				sourceType: 1, //sourceType
				orderno: this.supplierOrderNo,
				supplierCode: this.supplierCode,
				items: [],
			};
			postData.items = this.itemNumArr.filter((val) => {
				return this.selectedRowKeys.indexOf(val.id) > -1;
			});
			if (postData.afterSaleType == "REFUND_RETURN") {
				postData.refundMoney = this.refundMoney;
			}
			if (!postData.applyReason) {
				this.$message.error("售后申请理由必填");
				return;
			}
			try {
				let { code } = await api.afterSaleApprove(postData);
				if (code == 200) {
					this.$message.success("提交售后成功");

					setTimeout(() => {
						this.$router.push({
							name: "orderAfterSaleList",
						});
					}, 1000);
				}
			} finally {
				this.visible = false;
				this.$emit("change", false);
			}
		},
		handleOk(e) {
			this.afterSaleApproveAction();
		},
		handleCancel() {
			this.$emit("change", false);
		},
		async getOrderItemsAction(No, opt) {
			let pData = {
				pageNum: 1,
				pageSize: 10,
			};
			pData = { ...pData, ...opt };
			let { data, code } = await api.getOrderItems(No, pData);
			this.orderItemsData = data.records;
			this.paginationAfter.current = data.current * 1;
			this.paginationAfter.total = data.total * 1;
			this.itemNumArr = [];
			this.orderItemsData.forEach((item) => {
				let empObj = {
					id: item.id,
					itemNum: "",
					itemPrice: item.itemPrice,
				};
				this.itemNumArr.push(empObj);
			});
		},
		titleFn(v) {
			let str = "";
			v.forEach((ele) => {
				str += ele.featureName + " - " + ele.featureValue;
			});
			return str;
		},
		tableChange(e) {
			this.paginationAfter.current = e.current * 1;
			this.paginationAfter.total = e.total * 1;

			this.getOrderItemsAction(this.supplierOrderNo, {
				pageNum: e.current * 1,
				pageSize: e.pageSize,
			});
		},
		amountChange() {
			let amountNum = 0;
			this.itemNumArr.forEach((item) => {
				if (item.itemNum) {
					amountNum += item.itemNum * item.itemPrice;
				}
			});
			this.refundMoney = amountNum.toFixed(2);
		},
		onSelectChange(selectedRowKeys) {
			this.selectedRowKeys = selectedRowKeys;
		},
	},
};
</script>

<style lang="less" scoped>
@import url("./index.less");
.tips-text {
	position: absolute;
	right: 5px;
	bottom: 3px;
	user-select: none;
	color: #cfcfcf;
}
.after-item {
	margin-bottom: 5px;

	.title {
		color: #333;
	}
}

.title {
	color: #666;
	font-size: 14px;
}
.size {
	color: rgb(143, 139, 139);
	font-size: 12px;
}
</style>
