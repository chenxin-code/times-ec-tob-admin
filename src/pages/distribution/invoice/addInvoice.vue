<template>
  <div style="height: 100%;">
		<!--  -->
		<div class="btns">
			<a-button class="item-btn" :loading='btnloading' type="primary" v-if="params.add" @click="_toSearch" >
				保存
			</a-button>
			<a-button class="item-btn"  @click="$router.back()">
				返回
			</a-button>
		</div>
		<a-form-model :model="form" layout="inline" :rules="rules" ref="formi" labelAlign='left'>
			<div class="tit">发票类型</div>
			<a-form-model-item label="发票类型" prop="invoiceType">
				<a-select v-model="form.invoiceType" placeholder="请选择" :disabled='!params.add'>
					<a-select-option :value="v.v" :label="v.n" v-for="(v,i) in invoiceTypeArr" :key="i">
						{{v.n}}
					</a-select-option>
				</a-select>
			</a-form-model-item>
			<div v-for="(v,i) in fromArr" :key="i">
				<div class="tit">{{v.n}}</div>
				<template v-for="(vc,ic) in v.c">
					<a-form-model-item label="购买方式类型"  prop="buyerType" :key="ic" v-if='vc.t=="sele"'>
						<a-radio-group v-model="form.buyerType" :disabled='!params.add'>
							<a-radio value="企业">企业</a-radio>
							<a-radio value="个人">个人</a-radio>
						</a-radio-group>
					</a-form-model-item>
					<a-form-model-item :label="vc.n" :prop="vc.c" :key="ic"  v-else>
						<a-input v-model="form[vc.c]" :disabled='!params.add'  />
					</a-form-model-item>
				</template>
			</div>
			<div class="tit">开票人</div>
			<a-form-model-item label="开票人" prop="invoicingPerson" >
				<a-input v-model="form.invoicingPerson" :disabled='!params.add'  />
			</a-form-model-item>
			<a-form-model-item label="复核" prop="review" >
				<a-input v-model="form.review" :disabled='!params.add'  />
			</a-form-model-item>
			<a-form-model-item label="收款人" prop="payee" >
				<a-input v-model="form.payee" :disabled='!params.add'  />
			</a-form-model-item>
		</a-form-model>
		<div class="detailed" style="margin-left:20px">
			<div>
				开票清单
				<a-alert v-if="selectedRowsIf" message="请选择开票清单" type="error" show-icon />
			</div>
			<a-button class="item-btn" size='small' @click="addFn" v-if="params.add">
				新增
			</a-button>
		</div>
		<div id="neighborhoodLife">
			<div class="content-main" ref="content_main">
				<a-row style="padding:20px;height:100%;">
					<a-col flex:auto>
						<!-- 表格 -->
						<a-table
							:columns="tableColumnsAdd"
							:row-key="(r,i) => i"
							:data-source="selectedRows"
							:scroll="{ x: 1000 }"
							:pagination="false"
							:loading="tableLoading"
							style="margin-top:8px;">
						</a-table>
					</a-col>
				</a-row>
			</div>
		</div>
		<!--  -->
		<a-modal
			width="80%"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <addInvoiceTab v-model="selectedRowsObj"></addInvoiceTab>
    </a-modal>
  </div>
</template>

<script>
  import api from "@/api";
	import { tableColumnsAdd,invoiceTypeArr,fromArr,rules } from './config';
	import addInvoiceTab from './addInvoiceTab.vue';
  export default {
    components: {
			addInvoiceTab
    },
    data: () => ({
			invoiceTypeArr,
			fromArr,
      visible: false,
      confirmLoading: false,
			form: {
				invoiceType: undefined,
				buyerType: '',
				gmfname: '',
				gmftaxIdentifyNumber: '',
				gmftel: '',
				gmfaccountBank: '',
				gmfaccount: '',
				gmfaddress: '',
				xsfname: '',
				xsftaxIdentifyNumber: '',
				xsftel: '',
				xsfaccountBank: '',
				xsfaccount: '',
				xsfaddress: '',
				invoicingPerson: '',
				review: '',
				payee: ''
			},
			rules,
			//表头数据
			tableColumnsAdd,
			tableLoading: false,
			params: {},
			selectedRowsObj: {
				selectedRowKeys: [],
				selectedRows: [],
			},
			selectedRowsIf: false,
			btnloading:false,
			selectedRows: []
    }),
		mounted: function() {
			console.log(this.$route.params);
			this.params = this.$route.params;
			if(!this.params.add) this.InvoiceDetail();
		},
    methods: {
			//获取用户列表
			InvoiceDetail() {
			  this.tableLoading = true;
				const para = {
					buyerId: this.params.buyerId,
					invoiceId: this.params.id,
					sellerId: this.params.sellerId,
			  };
			  api.InvoiceDetail(para).then(res => {
			    if (res.code === 200) {
			      this.form = res.data;
						this.selectedRows = res.data.invoiceDetailList;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			_toSearch(){
				this.$refs.formi.validate(valid => {
					if (valid) {
						console.log(this.form);
						if (this.selectedRows.length) {
							this.selectedRowsIf = false;
							this.btnloading = true;
							let obj = JSON.parse(JSON.stringify(this.form));
							obj.invoiceDetailReqDtoList = this.selectedRows;
							obj.invoiceDetailReqDtoList.forEach(ele => {
								ele.mny = ele.totalAmount;
								ele.number = ele.buyNum;
								ele.orderItemId = ele.orderItemsId;
								ele.price = ele.itemPrice;
								ele.productCode = ele.skuCode;
								ele.productName = ele.itemName;
								ele.purchaseCode = ele.purchaseNo;
								ele.specification = ele.itemSpecs;
								ele.taxClassificationCode = ele.taxCode;
								ele.taxRate = ele.taxRate;
								ele.unit = ele.unit;
								ele.invoicing = ele.kpsl;
								ele.orderNo = ele.supplierOrderNo;
							})
							api.insertInvoice(obj).then(res => {
								if (res.code === 200) {
									this.$message.success('操作成功');
									this.$router.back();
								}
							}).finally(() => {
								this.btnloading = false;
							});
						} else this.selectedRowsIf = true;
					}
				});
			},
			_toReset(){
				this.$refs.formi.resetFields();
				this.InvoiceDetail();
			},
			addFn(val) {
				this.visible = true;
			},
			handleOk(e) {
				// console.log(this.selectedRowsObj)
				this.selectedRowsObj.selectedRowKeys = [];
				let ids = this.selectedRows.map(ele => ele.orderItemsId);
				this.selectedRowsObj.selectedRows.forEach( v => {
					if(ids.indexOf(v.orderItemsId) == -1){
						this.selectedRows.push(JSON.parse(JSON.stringify(v)))
					} else {
						this.selectedRows.splice(ids.indexOf(v.orderItemsId),1);
						this.selectedRows.push(JSON.parse(JSON.stringify(v)))
					}
				})
				if (this.selectedRowsObj.selectedRows.length) {
					this.selectedRowsIf = false;
				} else this.selectedRowsIf = true;
					this.visible = false;
			},
			handleCancel(e) {
				// console.log(this.selectedRowsObj)
				// if(this.selectedRowsObj.selectedRowKeys.length) this.selectedRowsObj.selectedRows = [];
				this.selectedRowsObj.selectedRowKeys = [];
				this.visible = false;
			},
    }
  }
</script>

<style lang="less" scoped>
  // .ant-input-search .ant-input-suffix {
  //   right: 18px;
  // }
</style>
<style lang="less" scoped>
	.ant-form {
		padding: 20px;
		.ant-form-item{
			width: 600px;
			margin: 10px 0 10px 50px;
		}
		/deep/.ant-calendar-picker-input {
				min-width: 200px;
		}
		/deep/.ant-form-item-control-wrapper{
				min-width: 200px;
		}
		/deep/.ant-form-item-label{
			width: 110px;
		}
		/deep/ .item-btns{
			width: 800px !important;
		}
		/deep/ .item-btns .item-btn{
			margin-right: 20px;
		}
	}
	.tit{
			margin: 10px 0;
		}
	.modal-box{
		padding-top: 20px;
		>div{
			height: 50px;
			display: flex;
			align-items: center;
			.name{
				width: 100px;
			}
			input{
				flex: 1;
			}
		}
	}
	.detailed{
		display: flex;
		justify-content: space-between;
		.item-btn{
			margin-right: 50px;
		}
	}
	.btns{
		display: flex;
		justify-content: flex-end;
		padding: 20px 20px 0 0;
		button{
			margin-left: 20px;
		}
	}
</style>
