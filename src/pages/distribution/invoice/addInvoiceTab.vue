<template>
  <div style="height: 100%;">
		<a-form-model :model="form" layout="inline" ref="formi" labelAlign='left'>
			<a-form-model-item label="采购单号" prop="purchaseNo" >
				<a-input v-model="form.purchaseNo" placeholder="请输入" :maxLength='20'/>
			</a-form-model-item>
			<a-form-model-item label="订单号" prop="supplierOrderNo" >
				<a-input v-model="form.supplierOrderNo" placeholder="请输入" :maxLength='20'/>
			</a-form-model-item>
			<a-form-model-item label="出账公司" prop="billingCompany" >
				<a-input v-model="form.billingCompany" placeholder="请输入" :maxLength='20'/>
			</a-form-model-item>
		  <a-form-model-item class="item-btns">
		    <a-button class="item-btn" type="primary" @click="_toSearch">
		      查询
		    </a-button>
		  </a-form-model-item>
		</a-form-model>
		<div id="neighborhoodLife">
			<div class="content-main" ref="content_main">
				<a-row style="padding:20px;height:100%;">
					<a-col flex:auto>
						<!-- 表格 -->
						<a-table
							:row-selection="{ selectedRowKeys: value.selectedRowKeys, onChange: onSelectChange }"
							:columns="tableColumnsAddTab"
							:row-key="(r,i) => i"
							:data-source="tableData"
							:scroll="{ x: 1000,y:400 }"
							:pagination="false"
							:loading="tableLoading"
							style="margin-top:8px;"
						>
							<template slot="kpsl" slot-scope="kpsl">
								<a-input v-model="kpsl.kpsl" type='Number' @blur="inBlur(kpsl)" />
							</template>
						</a-table>
					</a-col>
				</a-row>
			</div>
		</div>
  </div>
</template>

<script>
  import api from "@/api";
	import { tableColumnsAddTab,invoiceTypeArr,fromArr } from './config';
  export default {
		props:{
			value:Object
		},
    components: {
    },
    data: () => ({
			invoiceTypeArr,
			fromArr,
      visible: false,
      confirmLoading: false,
			form: {},
			//表头数据
			tableColumnsAddTab,
			//列表数据
			tableData: [],
			tableLoading: false,
			//分页
			total: 0,
			pageSize: 10,
			current: 1,
			// kpsl: '' //开票数量
    }),
		mounted: function() {
			this.selectNewInvoiceCommodityList();
		},
    methods: {
			inBlur(v) {
				console.log(v)
				if(v.kpsl > v.canOpenInvoiceNum) this.$message.error('开票数量不能大于'+v.canOpenInvoiceNum);
			},
			onSelectChange(selectedRowKeys,selectedRows) {
				console.log(selectedRowKeys,selectedRows);
				for (let index = 0; index < selectedRows.length; index++) {
					const element = selectedRows[index];
					if(element.kpsl > element.canOpenInvoiceNum || !element.kpsl) {
						this.$message.error('开票数量有错误，请重新填写');
						return
					}
				}
				selectedRows.forEach(v => {
					v.tax = (v.itemPrice-v.noTaxPrice)*v.kpsl;
				})
				this.$emit('input',{
					selectedRows: selectedRows,
					selectedRowKeys: selectedRowKeys
				})
			},
			_toSearch(){
				console.log(this.form);
				this.selectNewInvoiceCommodityList();
			},
			selectNewInvoiceCommodityList() {
			  this.tableLoading = true;
				const para = {
					...this.form,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
			  api.selectNewInvoiceCommodityList(para).then(res => {
			    if (res.code === 200) {
			      this.tableData = res.data;
						this.tableData.forEach(v => v.kpsl = '');
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
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
		// padding: 20px;
		.ant-form-item{
			width: 330px;
			// margin: 10px 0 10px 50px;
		}
		/deep/.ant-calendar-picker-input {
				width: 250px;
		}
		/deep/.ant-form-item-control-wrapper{
			width: 250px;
		}
		// /deep/.ant-form-item-label{
			// width: 80px;
		// }
		/deep/ .item-btns{
			width: 50px !important;
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
</style>
