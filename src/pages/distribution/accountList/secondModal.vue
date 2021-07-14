<template>
  <div>
    <a-modal
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="secondHandleOk"
      @cancel="secondHandleCancel"
    >
			<div class="info-box">
				<img  :src="addUserInfo.userImage" />
				<div class="avatar-userName">{{addUserInfo.userName}}</div>
				<div class="avatar-title">确定添加此账号</div>
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
		addUserInfo: {
			type: Object,
			default: {}
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
		img{
			width: 88px;
			height: 88px;
			border-radius: 88px;
			overflow: hidden;
		}
  }
	.avatar-userName{
		margin: 4px 0 10px;
		width: 42px;
		height: 20px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 20px;
	}
	.avatar-title{
		// width: 138px;
		height: 28px;
		font-size: 20px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 28px;
	}
	.ant-modal-footer{
    border-top: none;
	}
</style>