<template>
	<div class="content-floor" v-if="isShow">
		<div class="content-footer-view">
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
</template>
<script type="text/javascript">
import { debounce } from '../../utils/util'

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
		loading: {
			type: Boolean,
			default: false,
		},
		isShowSubmit: {
			type: Boolean,
			default: true,
		},
		isShowCancel: {
			type: Boolean,
			default: true,
		},
	},
	computed: {},
	methods: {
		onSubmit() {
			debounce(() => {
				this.$emit('submit')
			}, 500)
		},
		onBack() {
			this.$router.back()
			this.$emit('back')
		},
	},
	created() {},
	mounted() {},
}
</script>
<style lang="less" scoped>
.content-floor {
	position: fixed;
	bottom:12px;
	right:12px;}
.content-footer-view {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 20px;

	& > *:not(.last-child) {
		margin-right: 10px;
	}
}
</style>