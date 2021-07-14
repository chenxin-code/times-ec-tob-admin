<template>
  <div style="height: 100%;">
		<a-form>
			<a-form-item>
				<a-input v-model="payBillNo" placeholder="请输入应付单编号"/>
			</a-form-item>
		  <a-form-item>
				<a-date-picker
					v-model="beginTimes"
					:disabled-date="disabledStartDate"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
					placeholder="生成开始日期"
					@openChange="handleStartOpenChange"
					@change="onDateChange"
					style="width: 100%;"
				/>
		  </a-form-item>
		  <a-form-item has-feedback>
				<a-date-picker
					v-model="endTime"
					:disabled-date="disabledEndDate"
					show-time
					format="YYYY-MM-DD HH:mm:ss"
					placeholder="生成结束日期"
					:open="endOpen"
					@openChange="handleEndOpenChange"
					@change="onDateChange"
					style="width: 100%;"
				/>
		  </a-form-item>
			<a-form-item>
				<a-input v-model="supplier" placeholder="请输入供应商名称"/>
			</a-form-item>
			<a-form-item>
				<a-select v-model="positiveNegativeState" :placeholder="'请选择正负状态'" allowClear>
					<a-select-option
						v-for="(item,index) of positiveNegativeStateArr"
						:key="index"
						:value="item.value"
					>{{item.label}}</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item>
				<a-select v-model="payBillSign" :placeholder="'请选择确认状态'" allowClear>
					<a-select-option
						v-for="(item,index) of payBillSignArr"
						:key="index"
						:value="item.value"
					>{{item.label}}</a-select-option>
				</a-select>
			</a-form-item>
		  <a-form-item class="item-btns">
		    <a-button @click="_toSearch" class="item-btn" type="primary">
		      查找
		    </a-button>
				<a-button class="item-btn" @click="_toReset">
		      重置
		    </a-button>
				<a-button  @click="_toAddBill" class="item-btn" type="primary">
		      生成应付单
		    </a-button>
				<a-button  @click="_toExportList" class="item-btn" type="primary">
					导出Excel
		    </a-button>

		  </a-form-item>
		</a-form>


		<div id="neighborhoodLife">
			<div class="content-main" ref="content_main">
				<a-row style="padding:20px;height:100%;">
					<a-col flex:auto>
						<!-- 表格 -->						
						<a-table
							:columns="tableColumns"
							:row-key="(r,i) => i"
							:data-source="tableData"				
							:pagination="false"
							:scroll="{ x: true }"
							:loading="tableLoading"
							style="margin-top:8px;">
							<template slot="num" slot-scope="text, record, index">
							    <span>
										{{
							        (current - 1) * pageSize +
							            parseInt(index) +
							            1
										}}
									</span>
							</template>
							<template slot="payBillNo" slot-scope="operation">
								<a @click="onEdit(operation, operation.payBillNo)">{{operation.payBillNo}}</a>
							</template>
							<template slot="ncPullTime" slot-scope="operation">
								<!-- v-if="operation.ncPull==1" -->
								<span>{{ operation.ncPull==1 ? operation.ncPullTime : '--'}}</span>
							</template>
							<template slot="payBillSign" slot-scope="operation">
								<span>{{operation |getOrderStateName}}</span>
							</template>
							<template slot="totalAmount" slot-scope="operation">
								<span>￥{{operation}}</span>
							</template>
							<template slot="totalTax" slot-scope="operation">
								<span>￥{{operation}}</span>
							</template>
							<template slot="operationOne" slot-scope="operation">
								<div class="editable-row-operations">
									<a @click="onSee(operation)">查看</a>
								</div>
							</template>
							<template slot="operation" slot-scope="operation">
								<div class="editable-row-operations">
									<a v-if="operation.payBillSign==0" @click="onDetermine(operation.payBillNo)">确定</a>
									<span v-else style="color: #bfbfbf;">已确认</span>
								</div>
							</template>
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
							:pageSizeOptions="['10','20','50','100']"
							@change="onShowSizeChange"
							@showSizeChange="onShowSizeChange"
							style="margin-top:30px;width:100%;text-align: right;"
						/>
					</a-col>
				</a-row>
			</div>
		</div>

		<div class="add-collectingBill">

			<!-- :confirm-loading="confirmLoading" -->
			<a-modal
				title="生成应付单"
				:visible="visible"
				@ok="handleOk"
				@cancel="handleCancel">
				<template>
					<a-form>
					  <a-form-item>
							<a-date-picker
							    v-model="firstTime"
							    :disabled-date="disabledFirstDate"
							    :disabled = "firstTimeDisabled"
									show-time
							    format="YYYY-MM-DD HH:mm:ss"
							    placeholder="生成开始日期"
							    @openChange="handleStartOpenChangeOne"
							    @change="onDateChange"
									style="width: 100%;"
							/>
					  </a-form-item>
					  <a-form-item has-feedback>
							<a-date-picker
							    v-model="lastTime"
							    :disabled-date="disabledLastDate"
							    show-time
							    format="YYYY-MM-DD HH:mm:ss"
							    placeholder="生成结束日期"
							    :open="endOpenOne"
							    @openChange="handleEndOpenChangeOne"
							    @change="onDateChange"
									style="width: 100%;"
							/>
					  </a-form-item>
					</a-form>
				</template>
			</a-modal>
		</div>
		<div class="add-collectingBill">
			<a-modal
				title="关联应付单"
				:visible="showSee"
				@cancel="handleCancelSee"
				:dialog-style="{ top: '30px' }"
				:footer="null"
				>
				<div class="preview-relation">
					<span v-for="(item, index) in payBillList" :key="index">
						<a @click="toEdit(item)">{{item}}</a>
					</span>
				</div>
			</a-modal>
		</div>

		<secondModal :visible='showSecondModal' @secondHandleOk="secondHandleOk" @secondHandleCancel="secondHandleCancel"/>



	</div>
</template>

<script>
	import api from "@/api";
	// import message from 'ant-design-vue/es/message';
  import { debounce } from '@/utils/util';
  import { province } from '@/utils/area';
  import secondModal from "./secondModal";	//二次确认
	import { mapState } from "vuex";


	const tableData = []

  export default {
    name: "distributor",
    components: {
			 secondModal
    },
    data: () => ({
			beginTimes: null,
			endTime: null,
			firstTime: null,
			lastTime: null,
			firstTimeDisabled: false,
			endOpen: false,
			endOpenOne: false,
			// orderType: undefined,
			orderTypeArr:[
				{label:'服务',value:'SERVICE'},
				{label:'旅游',value:'TRAVEL'}
			],
			positiveNegativeState: undefined,
			positiveNegativeStateArr:[
				{label:'正',value:'0'},
				{label:'负',value:'1'}
			],
			payBillSign: undefined,
			payBillSignArr:[
				{label:'待确认',value:'0'},
				{label:'已通过',value:'1'},
				{label:'未通过',value:'2'}
			],

			supplier: '',	//供应商名称
			payBillNo:'',	//应付单编号

			orderStateList: ["UNPAID" ,"PAID", "ON_GOING", "COMPLETED", "CANCELED", "CLOSE"],	//订单状态

      tableRefresh: false,
      pageRefresh: true,
			showModal: true,
			showSecondModal: false,

			//表格高度
			scrollY: 100,
			//表头数据
			tableColumns: [
				{
					title: "序号",
					dataIndex: "num",
					key: "num",
					width: 80,
					scopedSlots: { customRender: "num" },
				},
				{
					title: "应付单编码",
					// dataIndex: "payBillNo",
					key: "payBillNo",
					width: 160,
					scopedSlots: { customRender: "payBillNo" },
					ellipsis: false,
				},
				{
					title: "应付单时间范围",
					dataIndex: "billTimeScope",
					key: "billTimeScope",
					width: 200,
					// scopedSlots: { customRender: "creationTime" },
					ellipsis: false,
				},

				{
					title: "应付总金额",
					dataIndex: "totalAmount",
					key: "totalAmount",
					scopedSlots: { customRender: "totalAmount" },
					width: 120,
					ellipsis: false,
				},
				{
					title: "税额合计",
					dataIndex: "totalTax",
					key: "totalTax",
					scopedSlots: { customRender: "totalTax" },
					width: 120,
					ellipsis: false,
				},
				{
					title: "供应商",
					dataIndex: "supplier",
					key: "supplier",
					width: 300,
					ellipsis: false,
				},
				{
					title: "推送NC时间",
					// dataIndex: "ncPullTime",
					key: "ncPullTime",
					scopedSlots: { customRender: "ncPullTime" },
					width: 180,
					ellipsis: false,
				},
				{
					title: "正负状态",
					dataIndex: "payBillSign",
					key: "payBillSign",
					scopedSlots: { customRender: "payBillSign" },
					width: 100,
					ellipsis: false,
				},
				{
					title: "关联应付单",
					key: "operationOne",
					scopedSlots: { customRender: "operationOne" },	//这个应该是插槽的东西
					width: 110,
					fixed: "right",
				},
				{
					title: "操作",
					key: "operation",
					scopedSlots: { customRender: "operation" },	//这个应该是插槽的东西
					width: 80,
					fixed: "right",
				},
			],

			visible: false,
			showSee: false,
			orderTradeInfo: {},
			payBillList: [],	//商品关联应付
			//列表数据
			tableData,
			tableLoading: false,
			//分页
			total: 0,
			pageSize: 10,
			current: 1,
			data:[],
    }),
		computed: mapState([
			"Case_Access_Token",
		]),
		watch: {
			Case_Access_Token(newVal, oldVal) {
				this.payBillGetAll();
			},
		},
    beforeRouteLeave(to, from, next) {
      if (to.name === "addHcmUser" || to.name === "authorizeHcmUser") {
        this.tableRefresh = true;
        this.pageRefresh = false
      }else {
        this.pageRefresh = true
      }
      next();
    },

		filters:{
			getOrderStateName: function (val) {
				let orderStateName = '';
				switch(val) {
					case '0':
						orderStateName = '待确认';
						break;
					case '1':
						orderStateName = '已通过';
						break;
					case '2':
						orderStateName = '不通过';
						break;
					default:
						orderStateName = '待确认';
				}
			  return orderStateName
			},
			getOrderSource: function (val) {
				let orderSource = '';
				switch(val) {
					case 'TIMES_XINGXUAN':
						orderSource = '邻里星选';
						break;
					case 'TIMES_LINLIBANG':
						orderSource = '邻里邦pro';
						break;
					case 'TIMES_MEIJU':
						orderSource = '美居APP';
						break;
					default:
				}
			  return orderSource
			},
		},
		mounted: function() {
    	if(!this.Case_Access_Token) return;
			this.orderTradeInfo = {};
			this.payBillList = [];
			this.tableData = [];
			this.tableLoading = false;
			this.total = 0;
			this.pageSize = 10;
			this.current = 1;
			this.data = [];
			this.tableRefresh = false;
			this.pageRefresh = true;
			this.firstTimeDisabled = false;
			this.payBillGetAll();
		},
		methods: {
			disabledStartDate(beginTimes) {
				const endTime = this.endTime;
				if (!beginTimes || !endTime) {
						return false;
				}
				return beginTimes.valueOf() > endTime.valueOf();
			},
			disabledEndDate(endTime) {
				const beginTimes = this.beginTimes;
				if (!endTime || !beginTimes) {
						return false;
				}
				return beginTimes.valueOf() >= endTime.valueOf();
			},
			disabledFirstDate(firstTime) {
				const lastTime = this.lastTime;
				if (!firstTime || !lastTime) {
						return false;
				}
				return firstTime.valueOf() > lastTime.valueOf();
			},
			disabledLastDate(lastTime) {
				const firstTime = this.firstTime;
				if (!lastTime || !firstTime) {
						return false;
				}
				return firstTime.valueOf() >= lastTime.valueOf();
			},

			handleStartOpenChange(open) {
				if (!open) {
					this.endOpen = true;
				}
			},
			handleEndOpenChange(open) {
				this.endOpen = open;
			},

			handleStartOpenChangeOne(open) {
				if (!open) {
					this.endOpenOne = true;
				}
			},
			handleEndOpenChangeOne(open) {
				this.endOpenOne = open;
			},


			onDateChange(date, dateString) {
				// console.log(dateString);
			},
			// 0.1 搜索与重置
			_toSearch(){
				this.payBillGetAll();
			},
			_toAddBill(){
				// this.visible = true;
				this.getPayBillStartDate();
			},
			getPayBillStartDate() {
			  this.tableLoading = true;
				const para = {};
			  api.getPayBillStartDate(para).then(res => {
			    if (res.code === 200) {
						this.firstTime = res.data;
						this.visible = true;
						this.firstTimeDisabled = true;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			_toExportList(){
				this.payBillExportList();
			},

			_toReset(){
				this.beginTimes = null;
				this.endTime = null;
				this.endOpen = false;
				this.endOpenOne = false;
				this.payBillNo = '';	//订单号
				this.payBillSign = undefined;	//
				this.positiveNegativeState = undefined;	//
				this.supplier = '';
				this.payBillNo = '';
				// this.orderStateList = ["PAID", "ON_GOING", "COMPLETED", "CANCELED", "CLOSE"];	//订单状态
				this.tableData = [];
				this.tableLoading = false;
				this.total = 0;
				this.pageSize = 10;
				this.current = 1;
				this.data = [];
				this.tableRefresh = false;
				this.pageRefresh = true;
				this.payBillGetAll();
			},

			//应付列表查询
			payBillGetAll() {
			  this.tableLoading = true;
				const para = {
					beginTimes:this.beginTimes,
					endTimes: this.endTime,
					payBillNo: this.payBillNo,
					payBillSign: this.payBillSign,
					positiveNegativeState: this.positiveNegativeState,
					supplier: this.supplier,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
			  api.payBillGetAll(para).then(res => {
			    if (res.code === 200) {
			      this.tableData = res.data.records;
			      this.total = res.data.total*1;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			//应付列表Excel导出
			payBillExportList() {
			  this.tableLoading = true;
				const para = {
					beginTimes:this.beginTimes,
					endTimes: this.endTime,
					payBillNo: this.payBillNo,
					payBillSign: this.payBillSign,
					positiveNegativeState: this.positiveNegativeState,
					supplier: this.supplier,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
			  api.payBillExportList(para).then(res => {
			    if (res.code === 200) {
			    	const regex = /http/;
			      const a = document.createElement('a');
			    	a.href = res.data.replace(regex, 'https');
			    	a.click();
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},

			//生成应付单
			addPayBill() {
			  this.tableLoading = true;
				const para = {
					endTime: this.lastTime,
					startTime: this.firstTime
			  };
			  api.addPayBill(para).then(res => {
			    if (res.code === 200) {
						this.$message.success('应付单生成中，请稍后刷新页面查看');
			    }
			  }).finally(() => {
			    this.tableLoading = false;
					this.visible = false;
					this.lastTime = null;
					this.payBillGetAll();
			  });
			},

			//应付确认
			payBillConfirmPayBill(para) {
			  this.tableLoading = true;
			  api.payBillConfirmPayBill(para).then(res => {
			    if (res.code === 200) {
			      this.$message.success(res.message);
			    }
			  }).finally(() => {
			    this.tableLoading = false;
					this.payBillGetAll();
			  });
			},

			//编辑
			onEdit(operation, payBillNo) {
			  debounce(()=>{
			    this.$router.push({
			      name: "paymentInfo",
			      params: {
							itemParams: operation,
							payBillNo: payBillNo
						},
			    })
			  })
			},
			//
			toEdit(payBillNo) {
				debounce(()=>{
				  this.$router.push({
				    name: "paymentInfo",
				    params: {
							itemParams: this.orderTradeInfo,
							payBillNo: payBillNo
						},
				  })
				})
			},
			onSee(operation) {
				this.orderTradeInfo = operation;
				this.payBillList = [];
				this.queryRelatePayBillList(operation.payBillNo);
			},
			queryRelatePayBillList(payBillNo) {
			  this.tableLoading = true;
				const para = {
					collectingBillNo: payBillNo,	//应付单号
			  };
			  api.queryRelatePayBillList(para).then(res => {
			    if (res.code === 200) {
						if(res.data.length){
							this.payBillList = res.data;
							this.showSee = true;
						}else{
							this.$message.warning('暂无关联应付单');
						}
					}
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			onDetermine(payBillNo) {
				this.payBillConfirmPayBill(payBillNo);
			},
			// 0.2弹窗
			handleOk(){
				this.addPayBill();
			},
			handleCancel(){
				this.visible = false;
			},
			// 0.2弹窗
			handleOkSee(){
				this.showSee = false;
			},
			handleCancelSee(){
				this.showSee = false;
			},

			secondHandleOk(){
				this.showSecondModal = false;
			},
			secondHandleCancel(){
				this.showSecondModal = false;
			},
			// 分页
			onShowSizeChange(current, pageSize) {
			  this.current = current;
			  this.pageSize = pageSize;
				this.payBillGetAll();
			},

    }
  }
</script>
<style lang="less" scoped>
	@import url("./index.less");
	.preview-relation{
		height: 40vh;
		span{
			display: block;
		}
	}
</style>