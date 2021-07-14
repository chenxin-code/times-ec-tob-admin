<template>
	<div>
		<a-modal
			v-model="afterVisible"
			title="修改城市公式"
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
					@submit="handleSubmit"
				>
					<a-form-item label="订单编号">
						<a-input
							type="number"
							v-model="userPhone"
							placeholder="输入订单编号"
						/>
					</a-form-item>
					<a-form-item label="项目名称">
						<a-input
							type="number"
							v-model="userPhone"
							placeholder="输入项目名称"
						/>
					</a-form-item>
					<a-form-item label="采购公司（出账公司）">
						<a-select
							v-model="rolevalue"
							placeholder="请选择"
							@change="handleChange"
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
					<a-form-item label="城市公司">
						<a-select
							v-model="rolevalue"
							placeholder="请选择"
							@change="handleChange"
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
					<a-form-item label="财务账套">
						<a-select
							v-model="rolevalue"
							placeholder="请选择"
							@change="handleChange"
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
import api from "@/api";
export default {
	props: [
		'visible'
	],
	computed: {
		afterVisible: {
			get () {
				return this.visible;
			},
			set (value) {
				this.$emit('changeHandle', value);
			}
		}
	},
	data() {
		return {
			userPhone: '',
			rolevalue: '',
			roleList: [
				{id: 1, roleName: 'test'}
			],
			form: this.$form.createForm(this, { name: "afterSaleApproveModal" }),
		}
	},
	methods: {
		handleSubmit() {
		},
		handleOk(e) {
		},
		handleCancel() {
			this.$emit('changeHandle')
		},
		handleChange() {
			
		}
	},
};
</script>

<style lang="less" scoped>
</style>
