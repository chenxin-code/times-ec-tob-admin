<template>
	<div>
		<a-modal
			:title="title"
			:visible="visible"
			:confirm-loading="confirmLoading"
			@ok="handleOk"
			@cancel="handleCancel"
		>
			<template>
				<a-form
					v-if="showModalIndex == 0"
					:form="form"
					:label-col="{ span: 8 }"
					:wrapper-col="{ span: 12 }"
					@submit="handleSubmit"
				>
					<a-form-item label="账号绑定的手机号码">
						<a-input
							type="number"
							v-model="userPhone"
							placeholder="输入账号绑定的手机号码"
						/>
					</a-form-item>
				</a-form>
				<a-form
					v-if="showModalIndex == 1"
					:form="form"
					:label-col="{ span: 4 }"
					:wrapper-col="{ span: 12 }"
					@submit="handleSubmit"
				>
					<a-form-item label="编辑角色">
						<a-select
							v-model="listItem.roleId"
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
					<!-- 供应商才可关联 -->
					<a-form-item
						v-if="updateRoleCode == 'SUPPLIER'"
						label="关联供应商"
					>
						<a-select
							v-model="listItem.supplierCode"
							placeholder="请选择"
							@change="supplierChange"
						>
						
							<a-select-option
								v-for="item in supplierList"
								:key="item.id"
								:value="item.supplierCode"
							>
								{{ item.supplierName }}
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-form>
			</template>
		</a-modal>
	</div>
</template>
<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: "添加账号",
		},
		updateRoleCode: {
			type: String,
			default: "",
		},
		showModalIndex: {
			type: Number,
			default: 0,
		},
		roleList: {
			type: Array,
			default: [],
		},
		supplierList: {
			//供应商列表
			type: Array,
			default: [],
		},

		listItem: {
			type: Object,
			default: {},
		},
	},
	data() {
		return {
			userPhone: "",
			// visible: false,
			confirmLoading: false,

			formLayout: "horizontal",
			form: this.$form.createForm(this, { name: "coordinated" }),
		};
	},
	methods: {
		handleChange(value) {
			this.$emit("handleChange", `${value}`);
		},
		supplierChange(value) {
			this.$emit("supplierChange", `${value}`);
		},

		showModal() {
			this.visible = true;
		},
		handleOk(e) {
			if (this.showModalIndex == 1) {
				this.$emit("handleOk", e);
			} else {
				this.$emit("handleOk", this.userPhone);
				this.userPhone = "";
			}
		},
		handleCancel(e) {
			this.$emit("handleCancel", e);
			this.userPhone = "";
			// console.log('Clicked cancel button');
			// this.visible = false;
		},

		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					console.log("Received values of form: ", values);
				}
			});
		},
		handleSelectChange(value) {
			console.log(value);
			this.form.setFieldsValue({
				note: `Hi, ${value === "male" ? "man" : "lady"}!`,
			});
		},
	},
};
</script>
