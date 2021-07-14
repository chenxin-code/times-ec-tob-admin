<template>
  <div>
    <a-modal
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="secondHandleOk"
      @cancel="secondHandleCancel"
    >
			<div class="info-box">
				<a-avatar :size="64" icon="user" />
				<div>范久久</div>
				<div>确定添加此账号</div>
			</div>
			
    </a-modal>
  </div>
</template>
<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '二次确认'
		},
		
	},
  data() {
    return {
      // visible: false,
      confirmLoading: false,
			
			formLayout: 'horizontal',
			form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    secondHandleOk(e) {
			this.$emit("secondHandleOk", e)
			// this.visible = false;
      // this.confirmLoading = true;
      // setTimeout(() => {
      //   this.visible = false;
      //   this.confirmLoading = false;
      // }, 2000);
    },
    secondHandleCancel(e) {
			this.$emit("secondHandleCancel", e)
      // console.log('Clicked cancel button');
      // this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
  .info-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
  }
</style>