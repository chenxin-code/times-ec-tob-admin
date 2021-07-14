<template>
	<div class="content-release">
		<a-button @click="goBack"  style="margin:20px 10px 10px 20px">返回</a-button>
		<a-button @click="purchaseSplit"  :disabled='itemParams.state == "是"'
		type="primary" style="margin:10px" :loading='placeLoading'>下单</a-button>
		<!-- <a-form>
			<a-form-item>
				<a-select v-model="orderSource" :placeholder="'请选择导入结果'" allowClear>
					<a-select-option
						v-for="(item,index) of orderSourceArr"
						:key="index"
						:value="item.value"
					>{{item.label}}</a-select-option>
				</a-select>
			</a-form-item>
		</a-form> -->
		<div class="main-release">
			<div class="cr-content">
				<div class="cr-group">
					<div class="info-groups">
						<!-- <div class="info-groups-item-2 basics-info">应付单编号：{{orderTradeInfo.payNo}}</div> -->
						<div class="info-groups-item basics-info">采购单编码：{{itemParams.purchaseNo}}</div>
						<div class="info-groups-item basics-info">项目名称：{{itemParams.projectName}}</div>
						<div class="info-groups-item basics-info">出账公司：{{itemParams.companyName}}</div>
						<div class="info-groups-item basics-info">出账公司编号：{{itemParams.companyCode}}</div>
						<div class="info-groups-item basics-info">业绩财务账套：{{itemParams.financialAccounting}}</div>
						<div class="info-groups-item basics-info">业绩财务账套编码{{itemParams.financialAccountCode}}</div>
						<div class="info-groups-item basics-info">财务NC系统编码：{{itemParams.ncCode}}</div>
						<div class="info-groups-item basics-info">签收人：{{itemParams.shippingPerson}}</div>
						<div class="info-groups-item basics-info">联系方式：{{itemParams.shippingPhone}}</div>
						<div class="info-groups-item basics-info">城市公司：{{itemParams.cityCompany}}</div>
						<div class="info-groups-item basics-info">出账公司类型：{{itemParams.companyType}}</div>
						<div class="info-groups-item basics-info">送货地址：{{itemParams.shippingAddress}}</div>
						<div class="info-groups-item basics-info">市场部负责人：{{itemParams.marketingPrincipal}}</div>
						<!-- <div class="info-groups-item basics-info">收货联系人：{{itemParams.shippingPerson}}</div> -->
						<!-- <div class="info-groups-item basics-info">联系人方式：{{itemParams.shippingPhone}}</div> -->
						<div class="info-groups-item basics-info">采购日期：{{itemParams.purchaseDate}}</div>
					</div>
				</div>
				<div class="shop-info">
					<!-- 表格 -->
					<a-table
						:columns="tableColumns"
						:row-key="(r,i) => i"
						:data-source="tableData"
						:scroll="{ x: 1000, y:800 }"
						:pagination="false"
						:loading="tableLoading"
						style="margin-top:8px;"
					>
					</a-table>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import api from "@/api";
	import { tableColumns } from './config';
	import { mapState } from "vuex";

	export default {
		components: {
		},
		data() {
			return {
				itemParams: {},
				//表格高度
				scrollY: 100,
				//表头数据
				tableColumns,
				//列表数据
				tableData: [],
				tableLoading: false,
				//分页
				total: 0,
				pageSize: 10,
				current: 1,
				placeLoading:false
			};
		},
		computed: mapState([
			"Case_Access_Token",
		]),
		watch: {
			Case_Access_Token(newVal, oldVal) {
				this.purchaseNo();
			},
		},
		mounted() {
    	if(!this.Case_Access_Token) return;
			this.itemParams = this.$route.params;
			this.purchaseNo();
		},
		methods: {
			purchaseNo() {
				this.tableLoading = true;
				const para = {
					purchaseNo: this.itemParams.purchaseNo,
				};
				api.purchaseNo(para).then(res => {
					if (res.code === 200) {
						this.tableData = res.data.records;
						// this.tableData.forEach( v=> {
						// 	v.taxRate = v.taxRate+' %'
						// })
					}
				}).finally(() => {
					this.tableLoading = false;
				});
			},
			purchaseSplit() {
				this.placeLoading = true;
				const para = {
					purchaseNo: this.itemParams.purchaseNo,
				};
				api.purchaseSplit(para).then(res => {
					if (res.code === 200) {
						this.$message.success('下单成功',()=>{
							this.goBack();
						});
					}
				}).finally( () => {
					this.placeLoading = false;
				})
			},
			goBack() {
				this.$router.go(-1); //返回上一层
			},
		},
	};
</script>

<style lang="less" scoped>
	@import url("./index.less");
</style>
