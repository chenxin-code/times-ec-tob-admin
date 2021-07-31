<template>
	<div>
		<a-modal
			v-model="afterVisible"
			title="修改城市公司"
			okText="保存"
			:width="600"
			@ok="handleOk"
			@cancel="handleCancel"
		>
			<template>
				<a-form
					:form="form"
					:label-col="{ span: 8 }"
					:wrapper-col="{ span: 12 }"
				>
					<a-form-item label="订单编号">
						<a-input
							type="text"
							v-model="saleOrderNo"
							placeholder="输入订单编号"
							disabled
						/>
					</a-form-item>
					<a-form-item label="项目名称">
						<a-input
							type="text"
							v-model="projectName"
							placeholder="输入项目名称"
							disabled
						/>
					</a-form-item>
					<a-form-item label="采购公司（出账公司）">
						<a-input
							type="text"
							v-model="purchaseCompany"
							placeholder="采购公司（出账公司）"
							disabled
						/>
					</a-form-item>
					<a-form-item label="城市公司">
						<a-select
							v-model="cityCompanyCode"
							placeholder="请选择城市公司"
							@change="selectChange"
						>
							<a-select-option
								v-for="item in cityCompanyList"
								:key="item.cityCompanyCode"
								:value="item.cityCompanyCode"
							>
								{{ item.cityCompany }}
							</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="财务账套">
						<a-select
							v-model="rolevalue"
							placeholder="请选择财务账套"
						>
							<a-select-option
								v-for="item in roleList"
								:key="item.id"
								:value="item.id"
							>
								{{ item.roleName }}
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-form>
			</template>
		</a-modal>
	</div>
</template>

<script>
import message from 'ant-design-vue/es/message'
import api from "@/api";
export default {
	props: [
		'visible',
		'row'
	],
	computed: {
		afterVisible: {
			get () {
				return this.visible;
			},
			set (value) {
				this.$emit('changeHandle', value);
			}
		},
		// 订单编号
		saleOrderNo() {
			return this.row.saleOrderNo
		},
		// 项目名称
		projectName() {
			return this.row.projectName
		},
		// 采购公司
		purchaseCompany() {
			return  this.row.purchaseCompany
		}
	},
	data() {
		return {
			cityCompanyCode: undefined, // 城市公司code
			cityCompany: undefined, // 城市公司
			cityCompanyList: [], // 城市公司列表

			rolevalue: '',
			roleList: [
				// {id: 1, roleName: 'test'}
			],
			form: this.$form.createForm(this, { name: "afterSaleApproveModal" }),
		}
	},
	methods: {
		// 获取城市公司
		async getCityCompanyList() {
			try {
				let res = await api.getMarketCompanyList()
				this.cityCompanyList = res.data;
			} finally {
			}
		},
		async handleOk(e) {
			try {
				let params = {
					saleOrderNo: this.saleOrderNo, // 订单编号
					projectName: this.projectName, // 项目名称
					purchaseCompany: this.purchaseCompany, // 采购公司
					cityCompanyCode: this.cityCompanyCode, // 城市公司code
					cityCompany: this.cityCompany, // 城市公司
					financialAccounting: '',
				}
				let res = await api.marketUpdateCityCompany(params)
				message.success('修改成功！')
				this.afterVisible = false
			} finally {
			}
		},
		handleCancel() {
			this.$emit('changeHandle')
		},
		selectChange(cityCompanyCode){
			this.cityCompanyList.forEach(item => {
				if(item.cityCompanyCode == cityCompanyCode) {
					this.cityCompany = item.cityCompany
				}
			});
			
		}
	},
	mounted() {
		// 获取城市公司
		this.getCityCompanyList()
	}
};
</script>

<style lang="less" scoped>
</style>
