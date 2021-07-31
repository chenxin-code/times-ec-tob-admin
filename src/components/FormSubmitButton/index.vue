<template>
	<div class="content-floor" v-if="isShow">
		<div class="content-footer" >
			<a-button
				v-if="isShowSubmit"
				type="primary"
				size="large"
				style="width: 120px;"
				:loading="loading"
				@click="onSubmit()"
				>保存</a-button
			>
				<a-button
				v-if="isShowCancel"
				size="large"
				type="primary"
				style="width: 120px;"		
				@click="onBack()"
				>返回</a-button
			>
		</div>
	</div>
</div>
</template>
<script type="text/javascript">
export default {
	name: 'FormSubmitButton',
	components: {},
	data() {
		return {}
	},
	props: {
		isShow: {
			type: Boolean,
			default: false,
		},
		loading:{
			type: Boolean,
			default: false,
		},
		isShowSubmit:{
			type: Boolean,
			default: true,
		},
		isShowCancel:{
			type: Boolean,
			default: true,
		},
	},
	computed: {},
	methods: {
		onSubmit(){
			this.$emit('submit')
		},
		onBack(){
			this.$router.back()
			this.$emit('back')
		}
	},
	created() {},
	mounted() {},
}
</script>
<style lang="less" scoped>
.content-footer {
	display: flex;
	justify-content: flex-end;
	align-items: center;

	& > *:not(.last-child) {
		margin-right: 10px;
	}
}
</style>