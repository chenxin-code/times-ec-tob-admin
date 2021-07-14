<template>
  <div style="height: 100%;padding:20px" class="after-sale">
		<a-form-model :model="form" layout="inline" ref="formi" labelAlign='left'>
			<a-form-model-item label="申请开始时间" prop="applyTimeStart">
				<a-date-picker
					v-model="form.applyTimeStart"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
				/>
			</a-form-model-item>
			<a-form-model-item label="申请结束时间" prop="applyTimeEnd">
				<a-date-picker
					v-model="form.applyTimeEnd"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
				/>
			</a-form-model-item>
			<a-form-model-item label="下单开始时间" prop="orderTimeStart">
				<a-date-picker
					v-model="form.orderTimeStart"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
				/>
			</a-form-model-item>
			<a-form-model-item label="下单结束时间" prop="orderTimeEnd">
				<a-date-picker
					v-model="form.orderTimeEnd"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
				/>
			</a-form-model-item>
			<a-form-model-item label="商品名称" prop="itemName">
				<a-input v-model="form.itemName"  :maxLength='20'/>
			</a-form-model-item>
			<a-form-model-item label="商品编号" prop="itemCode">
				<a-input v-model="form.itemCode"  :maxLength='20'/>
			</a-form-model-item>
			<a-form-model-item label="订单编号" prop="orderNo">
				<a-input v-model="form.orderNo"  :maxLength='20'/>
			</a-form-model-item>
			<a-form-model-item label="售后单号" prop="afterSaleNo">
				<a-input v-model="form.afterSaleNo"  :maxLength='20'/>
			</a-form-model-item>
			<a-form-model-item label="收货人" prop="receiverName">
				<a-input v-model="form.receiverName"  :maxLength='20'/>
			</a-form-model-item>
			<a-form-model-item label="收货手机" prop="receiverPhone">
				<a-input v-model="form.receiverPhone"  :maxLength='20'/>
			</a-form-model-item>
			<a-form-model-item label="供应商名称" prop="supplierName">
				<a-input v-model="form.supplierName"  :maxLength='20'/>
			</a-form-model-item>
			<a-form-model-item label="售后类型" prop="afterSaleType">
				<a-select v-model="form.afterSaleType" >
					<a-select-option :value="v.v" :label="v.n" v-for="(v,i) in afterSaleTypeArr" :key="i">
						{{v.n}}
					</a-select-option>
				</a-select>
			</a-form-model-item>
			<a-form-model-item label="审核状态" prop="afterSaleStatus">
				<a-select v-model="form.afterSaleStatus" >
					<a-select-option :value="v.v" :label="v.n" v-for="(v,i) in afterSaleStatusArr" :key="i">
						{{v.n}}
					</a-select-option>
				</a-select>
			</a-form-model-item>
		  <a-form-model-item class="item-btns">
		    <a-button class="item-btn" type="primary" @click="_toSearch">
		      搜索
		    </a-button>
				<a-button class="item-btn" @click="_toReset">
		      重置
		    </a-button>
		  </a-form-model-item>
		</a-form-model>
		<!--  -->
		<div class="order-table">
			<a-table
				:rowKey="(record) => record.id"
				:columns="tableColumns"
				:data-source="tableData"
				:pagination="false"
				:scroll="{ x: 1300,y:800 }"
				:loading="tableLoading"
			>
				<span slot="goods" slot-scope="text, record">
					<div
						class="goods-items"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<div class="gi-item">
							<!-- <div class="gi-pic">
								<img :src="item.itemImg" alt="" />
							</div> -->
							<div class="gi-info">
								<div class="title">{{ item.itemName }}</div>
								<div class="size" :title='titleFn(item.itemSpecsArray)'>规格：
									<span class="feature" v-for="(item1, index1) in item.itemSpecsArray" :key="index1">
										{{item1.featureName+" - "+item1.featureValue}}
										<span v-if="item.itemSpecsArray.length>1 && index1 != item.itemSpecsArray.length-1">,</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</span>

				<div slot="sku" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.itemCode }}</span>
					</div>
				</div>
				<div slot="itemCostPrice" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.itemCostPrice || '--' }}</span>
					</div>
				</div>
				<div slot="itemPrice" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.itemPrice || '--' }}</span>
					</div>
				</div>
				<div slot="totalAmount" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.totalAmount }}</span>
					</div>
				</div>
				<div slot="supplierName" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.supplierName || '--' }}</span>
					</div>
				</div>
				<div slot="refundAmount" slot-scope="text, record">
					<div
						class="goods-detail"
						v-for="(item, index) in record.orderItemsList"
						:key="index"
					>
						<span>{{ item.refundAmount || '--' }}</span>
					</div>
				</div>
				<div slot="orderAddress" slot-scope="text, record">
						<div>{{ (record.orderAddress&&record.orderAddress.receiverName) || '--' }}</div>
						<div>{{ (record.orderAddress&&record.orderAddress.receiverPhone) || '--' }}</div>
				</div>
				<span slot="action" slot-scope="text, record">
					<a-button type="link" :disabled='record.afterSaleState!="APPROVING"' @click="upFn(record,'APPROVED')">
						通过</a-button>
					<a-button type="link" :disabled='record.afterSaleState!="APPROVING"' @click="upFn(record,'REJECT')">驳回</a-button>
				</span>
			</a-table>
			<!-- 分页 -->
			<a-pagination
				:total="total"
				:show-total="total => `共 ${total} 条`"
				show-quick-jumper
				show-size-changer
				v-model="current"
				:default-current="current"
				:page-size.sync="pageSize"
				:pageSizeOptions="[ '1','10','20','50','100']"
				@change="onShowSizeChange"
				@showSizeChange="onShowSizeChange"
				style="margin-top:30px;width:100%;text-align: right;"
			/>
		</div>
		<!--  -->
		<a-modal
      :visible="visible"
			:title="auditResult=='APPROVED'?'审核通过原因':'审核驳回原因（必填）'"
      :confirm-loading="confirmLoading"
			:dialogClass='"after-sale-modal"'
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model layout="inline" :model="formInline" ref='modalForm'>
				<a-form-model-item label='原因' prop="auditReason" :rules="{
					required: auditResult=='APPROVED'?false:true,
					message: '请输入原因',
					trigger: 'blur',
				}">
					<a-input v-model="formInline.auditReason" type="textarea" />
				</a-form-model-item>
			</a-form-model>
    </a-modal>
  </div>
</template>

<script>

  import api from "@/api";
	import { tableColumns,afterSaleStatusArr,afterSaleTypeArr } from './config';
	import { mapState } from "vuex";
  export default {
    components: {
    },
    data(){
			var vm = this;
			return {
				afterSaleStatusArr,
				afterSaleTypeArr,
				visible: false,
				confirmLoading: false,
				formInline:{
					auditReason: ''
				},
				form: {
					applyTimeStart:'',
					applyTimeEnd:'',
					orderTimeStart:'',
					orderTimeEnd:'',
					afterSaleStatus: undefined,
					afterSaleType: undefined
				},
				tableColumns,
				tableData: [],
				tableLoading: false,
				//分页
				total: 0,
				pageSize: 10,
				current: 1,
				auditResult: 'APPROVED', // 审核结果 APPROVED: 通过 REJECT：驳回
				afterSaleNo: ''
			}
    },
		computed: {
			...mapState([
				"Case_Access_Token",
			])
		},
		watch: {
			Case_Access_Token(newVal, oldVal) {
				this.aftersaleList();
			},
		},
		mounted: function() {
    	if(!this.Case_Access_Token) return;
			this.aftersaleList();
		},
    methods: {
			titleFn(v) {
				let str = '';
				v.forEach(ele => {
					str += ele.featureName+" - "+ele.featureValue;
				})
				return str;
			},
			_toSearch(){
				console.log(this.form);
				// console.log(this.form.name2.format('YYYY-MM-DD HH:mm:ss'))
				this.aftersaleList();
			},
			_toReset(){
				this.$refs.formi.resetFields();
				this.aftersaleList();
			},
			upFn(val,type) {
				console.log(val);
				this.afterSaleNo = val.afterSaleNo;
				this.auditResult = type;
				this.visible = true;
			},
			handleOk(e) {
				this.$refs.modalForm.validate(valid => {
					if (valid) {
						this.confirmLoading = true;
						api.aftersaleAudit({
							...this.formInline,
							auditResult: this.auditResult,
							afterSaleNo: this.afterSaleNo,

						}).then(res => {
							if (res.code === 200) {
								this.$message.success('操作成功');
								this.aftersaleList();
							}
						}).finally(() => {
							this.confirmLoading = false;
							this.visible = false;
						});
					}
				});
			},
			handleCancel(e) {
				this.$refs.modalForm.resetFields();
				this.visible = false;
			},
			aftersaleList() {
			  this.tableLoading = true;
				const para = {
					...this.form,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
				if (para.applyTimeStart) para.applyTimeStart =  para.applyTimeStart.format('YYYY-MM-DD HH:mm:ss');
				if (para.applyTimeEnd) para.applyTimeEnd =  para.applyTimeEnd.format('YYYY-MM-DD HH:mm:ss');
				if (para.orderTimeStart) para.orderTimeStart =  para.orderTimeStart.format('YYYY-MM-DD HH:mm:ss');
				if (para.orderTimeEnd) para.orderTimeEnd =  para.orderTimeEnd.format('YYYY-MM-DD HH:mm:ss');
			  api.aftersaleList(para).then(res => {
			    if (res.code === 200) {
			      this.tableData = res.data.records;
			      this.total = res.data.total*1;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
				// 分页
			onShowSizeChange(current, pageSize) {
			  this.current = current;
			  this.pageSize = pageSize;
			  this.aftersaleList();
			},
    }
  }
</script>

<style lang="less">
  .after-sale-modal .ant-modal-content{
		.ant-form-item-label{
			width: 60px ;
		}
		.ant-form-item-control-wrapper{
			width: 380px;
		}
		// /deep/.ant-calendar-picker-input{
		// 	width: 250px;
		// }
	}
</style>
<style lang="less" scoped>
.order-table {
		.goods-items+.goods-items{
			margin-top: 8px;
		}
    .goods-items {
        // padding: 10px 0px;
        // border-bottom: 1px solid #ccc;
				.gi-item {
    				display: flex;
					.gi-pic {
							height: 80px;
							width: 80px;
							>img {
									height: 80px;
									width: 80px;
							}
					}
					.gi-info {
							margin-left: 10px;
							flex: 1;
							.title {
									color: #666;
									font-size: 14px;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
							}
							.size {
									max-width: 300px;
									color: rgb(143, 139, 139);
									font-size: 12px;
									    overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
							}
					}
			}
    }
    .goods-detail {
			width: 100%;
        // height: 100px;
        display: flex;
        align-items: center;
        // padding: 16px;
        box-sizing: border-box;
    }
		.goods-detail+.goods-detail{
			margin-top: 30px;
		}
}


	.after-sale {
		.ant-form{
			padding: 20px;
			>div{
				width: 350px;
			}
			/deep/.ant-form-item-control-wrapper{
				width: 250px;
			}
			/deep/.ant-calendar-picker-input{
				width: 250px;
			}
			/deep/.ant-form-item-label{
				width: 100px;
			}
			/deep/ .item-btns{
				// width: 500px !important;
				.ant-form-item-control-wrapper{
					width: 400px !important;
				}
			}
			/deep/ .item-btns .item-btn{
				margin-right: 20px;
			}
		}
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
</style>
