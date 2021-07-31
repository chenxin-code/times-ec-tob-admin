<template>
	<div class="content-floor">
		<div class="content-footer" v-if="$route.params.typ === '2'">
			<a-button
				type="primary"
				size="large"
				style="width: 120px;"
				:loading="loading"
				@click="onSubmit()"
				>保存</a-button
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
		formList: {
			type: Boolean,
			default: false,
		},
	},
	computed: {},
	methods: {},
	created() {},
	mounted() {},
}
</script>
<style lang="less">
.content-footer {
	display: flex;
	justify-content: flex-end;
	align-items: center;

	& > *:not(.last-child) {
		margin-right: 10px;
	}
}
</style>