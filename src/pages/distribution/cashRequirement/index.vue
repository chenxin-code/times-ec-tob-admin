<template>
  <div style="height: 100%;">
		<a-form-model :model="form" layout="inline" ref="formi" labelAlign='left'>
			<a-form-model-item label="请款单编码" prop="cashRequirementNo">
				<a-input v-model="form.cashRequirementNo" placeholder="请输入请款单编码" :maxLength='30'/>
			</a-form-model-item>
			<a-form-model-item label="应付单编码" prop="payBillNo">
				<a-input v-model="form.payBillNo" placeholder="请输入应付单编码" :maxLength='30'/>
			</a-form-model-item>
			<a-form-model-item label="请款开始日期" prop="beginTimes">
				<a-date-picker v-model="form.beginTimes"  />
			</a-form-model-item>
			<a-form-model-item label="请款结束日期" prop="endTimes">
				<a-date-picker v-model="form.endTimes" />
			</a-form-model-item>
			<a-form-model-item label="预算占用状态" prop="occupyState">
				<a-select v-model="form.occupyState" placeholder="请选择">
					<a-select-option :value="v.v" :label="v.n" v-for="(v,i) in occupyStateArr" :key="i">
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
				<a-button class="item-btn" @click="down" :loading="downLoading" type="primary">
		      导出
		    </a-button>
				<a-button class="item-btn" @click="CashOccupancy" :loading="casLoading"  type="primary">
		      申请占用
		    </a-button>
		  </a-form-model-item>
		</a-form-model>
		<div id="neighborhoodLife">
			<div class="content-main" ref="content_main">
				<a-row style="padding:20px;height:100%;">
					<a-col flex:auto>
						<!-- 表格 -->
						<a-table
							:row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
							:columns="tableColumns"
							:row-key="(r,i) => i"
							:data-source="tableData"
							:scroll="{ x: 1000 }"
							:pagination="false"
							:loading="tableLoading"
							style="margin-top:8px;"
						>
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
					</a-col>
				</a-row>
			</div>
		</div>
  </div>
</template>

<script>
  import api from "@/api";
	import { mapState } from "vuex";
	import { tableColumns,occupyStateArr } from './config';
  export default {
    components: {
    },
    data: () => ({
			occupyStateArr,
			form: {
        beginTimes: undefined,
        endTimes: undefined,
        cashRequirementNo: undefined,
        payBillNo: undefined,
        occupyState: undefined,
      },
			userName: '',
			//表头数据
			tableColumns,
			//列表数据
			tableData: [],
			tableLoading: false,
			//分页
			total: 0,
			pageSize: 10,
			current: 1,
			selectedRowKeys: [],
			selectedRows:'',
			downLoading: false,
			casLoading: false
    }),
		computed: mapState([
			"Case_Access_Token",
		]),
		watch: {
			Case_Access_Token(newVal, oldVal) {
				this.CashList();
			},
		},
		mounted: function() {
    	if(!this.Case_Access_Token) return;
			this.CashList();
		},
    methods: {
			down() {
				this.downLoading = true;
				const para = {
					...this.form,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
				if (para.beginTimes) para.beginTimes =  para.beginTimes.format('YYYY-MM-DD HH:mm:ss');
				if (para.endTimes) para.endTimes =  para.endTimes.format('YYYY-MM-DD HH:mm:ss');
			  api.CashExport(para).then(res => {
			    if (res.code === 200) {
						this.downLoading = false;
						const regex = /http/;
						const a = document.createElement('a');
						console.log(res.data.replace(regex, 'https'));
						a.href = res.data.replace(regex, 'https');
						a.click();
			    }
			  }).finally( () => {
					this.downLoading = false;
				});
			},
			CashOccupancy() { // 占用
				console.log(this.selectedRows);
				let arr = JSON.parse(JSON.stringify(this.selectedRows));
				let qarr = [];
				if (arr.length) {
					this.casLoading = true;
					arr.forEach(element => {
						qarr.push(api.CashOccupancy({cashRequirementNo:element.cashRequirementNo}));
					});
					Promise.all(qarr).then( (re) => {
						this.selectedRowKeys = [];
						this.selectedRows = [];
						this.casLoading = false;
						this.CashList();
					})
				} else {
					this.$message.warning('请勾选请款单');
				}

			},
			onSelectChange(selectedRowKeys,selectedRows) {
				this.selectedRows = selectedRows;
				this.selectedRowKeys = selectedRowKeys;
				console.log(this.selectedRows)
			},
			_toSearch(){
				console.log(this.form);
				this.CashList();
			},
			_toReset(){
				this.$refs.formi.resetFields();
				this.CashList();
			},
			// 分页
			onShowSizeChange(current, pageSize) {
			  this.current = current;
			  this.pageSize = pageSize;
			  this.CashList();
			},
			CashList() {
			  this.tableLoading = true;
				const para = {
					...this.form,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
				if (para.beginTimes) para.beginTimes =  para.beginTimes.format('YYYY-MM-DD HH:mm:ss');
				if (para.endTimes) para.endTimes =  para.endTimes.format('YYYY-MM-DD HH:mm:ss');
			  api.CashList(para).then(res => {
			    if (res.code === 200) {
			      this.tableData = res.data.records;
			      this.total = res.data.total*1;
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
	// .ant-form{
	// 	box-sizing: border-box;
	// 	padding: 20px 0 0 20px;
	// 	width: 100%;
	// 	display: flex;
	// 	align-items: center;
	// 	flex-wrap:wrap;
	// 	.ant-form-item{
	// 		display: flex;
	// 		// width: 33.33%;
	// 		width: 300px;
	// 		padding-right: 20px;
	// 	}
	// 	/deep/ .item-btns .ant-form-item-control{
	// 		display: flex;
	// 		justify-content: flex-end;
	// 	}
	// 	/deep/ .item-btns .ant-form-item-children{
	// 		width: 100%;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: flex-end;
	// 	}
	// }
</style>
