<template>
  <div style="height: 100%;">
		<a-form>
			<a-form-item>
				<a-input v-model="collectingBillNo" placeholder="请输入应收单编码"/>
			</a-form-item>
		  <a-form-item>
				<a-date-picker
				    v-model="startTime"
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
			<!-- <a-form-item>
				<a-input v-model="billingCompany" placeholder="请输入出账公司"/>
			</a-form-item> -->
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
				<a-select v-model="confirmStatus" :placeholder="'请选择确认状态'" allowClear>
					<a-select-option
						v-for="(item,index) of confirmStatusArr"
						:key="index"
						:value="item.value"
					>{{item.label}}</a-select-option>
				</a-select>
			</a-form-item>


			<a-form-item>
				<a-input v-model="purchaseNo" placeholder="请输入关联采购单号"/>
			</a-form-item>

		  <a-form-item class="item-btns">
		    <a-button @click="_toSearch" class="item-btn" type="primary">
		      查找
		    </a-button>
				<a-button class="item-btn" @click="_toReset">
		      重置
		    </a-button>
				<a-button  @click="_toAddBill" class="item-btn" type="primary">
				  生成应收单
				</a-button>
				<a-button  @click="_toExportList" class="item-btn" type="primary">
					导出Excel
				</a-button>
		  </a-form-item>
			<!-- <a-form-item class="item-btns">
		    <a-button  @click="_toAddBill" class="item-btn" type="primary">
		      生成应收单
		    </a-button>
				<a-button  @click="_toExportList" class="item-btn" type="primary">
					导出Excel
				</a-button>
		  </a-form-item> -->
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
							:scroll="{ x: 1000 }"
							:pagination="false"
							:loading="tableLoading"
							style="margin-top:8px;"
						>
							<template slot="num" slot-scope="text, record, index">
							    <span>
										{{
							        (current - 1) * pageSize +
							            parseInt(index) +
							            1
										}}
									</span>
							</template>
							<template slot="collectingBillNo" slot-scope="operation">
								<a @click="onEdit(operation, operation.collectingBillNo)">{{operation.collectingBillNo}}</a>
							</template>

							<template slot="collectionMark" slot-scope="operation">
								<span>{{operation |getOrderStateName}}</span>
							</template>
							<template slot="totalAmount" slot-scope="operation">
								<span>￥{{operation | formatMicrometer}}</span>
							</template>
							<template slot="totalTax" slot-scope="operation">
								<span>￥{{operation | formatMicrometer}}</span>
							</template>
							<template slot="ncPullTime" slot-scope="operation">
								<!-- v-if="operation.ncPull==1" -->
								<span>{{ operation.ncPull==1 ? operation.ncPullTime : '--'}}</span>
							</template>
							<template slot="operationOne" slot-scope="operation">
								<div class="editable-row-operations">
									<a @click="onSee(operation, operation.collectingBillNo)">查看</a>
								</div>
							</template>
							<template slot="operationTwo" slot-scope="operation">
								<div class="editable-row-operations">
									<a v-if="operation.collectingBillSign==0" @click="onDetermine(operation.collectingBillNo)">确认</a>
									<span v-if="operation.collectingBillSign==1" style="color: #bfbfbf;">已确认</span>
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
				title="生成应收单"
				:visible="visible"
				@ok="handleOk"
				@cancel="handleCancel">
				<template>
					<a-form>
					  <a-form-item>
							<!-- firstTimeDisabled -->
							<a-date-picker
							    v-model="firstTime"
							    :disabled-date="disabledFirstDate"
									:disabled = "firstTimeDisabled"
							    show-time
							    format="YYYY-MM-DD"
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
							    format="YYYY-MM-DD"
							    placeholder="生成结束日期"
							    :open="endOpenOne"
							    @openChange="handleEndOpenChangeOne"
							    @change="onDateLastTimeChange"
									style="width: 100%;"
							/>
					  </a-form-item>
					</a-form>
				</template>
			</a-modal>
		</div>
		<div class="add-collectingBill">
			<a-modal
				title="关联应收单"
				:visible="showSee"
				@cancel="handleCancelSee"
				:dialog-style="{ top: '30px' }"
				:footer="null"
				>
				<div class="preview-visible-img">
					<span v-for="(item, index) in relateCollectingBillList" :key="index">
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
			startTime: null,
			endTime: null,
			firstTime: null,
			lastTime: null,
			firstTimeDisabled: false,
			endOpen: false,
			endOpenOne: false,
			collectingBillNo: '',	//订单号
			// orderType: undefined,
			orderTypeArr:[
				{label:'服务',value:'SERVICE'},
				{label:'旅游',value:'TRAVEL'}
			],
			positiveNegativeState: undefined,
			positiveNegativeStateArr:[
				{label:'正',value:'0'},
				{label:'负',value:'1'},
				{label:'归零',value:'2'}
			],
			confirmStatus: undefined,
			confirmStatusArr:[
				{label:'未确认',value:'0'},
				{label:'已确认',value:'1'}
			],

			billingCompany: '',
			purchaseNo:'',

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
					// align: "center",
				},
				{
					title: "应收单编码",
					// dataIndex: "collectingBillNo",
					key: "collectingBillNo",
					width: 160,
					scopedSlots: { customRender: "collectingBillNo" },
					ellipsis: false,
					// align: "center"
				},
				{
					title: "应收单时间范围",
					dataIndex: "billTimeScope",
					key: "billTimeScope",
					width: 200,
					// scopedSlots: { customRender: "creationTime" },
					ellipsis: false,
					// align: "center"
				},

				{
					title: "应收总金额",
					dataIndex: "totalAmount",
					key: "totalAmount",
					scopedSlots: { customRender: "totalAmount" },
					width: 120,
					ellipsis: false,
					// align: "center"
				},
				{
					title: "税额合计",
					dataIndex: "totalTax",
					key: "totalTax",
					scopedSlots: { customRender: "totalTax" },
					width: 120,
					ellipsis: false,
					// align: "center"
				},
				{
					title: "出账公司",
					dataIndex: "orgName",
					key: "orgName",
					width: 180,
					// scopedSlots: { customRender: "orgName" },
					ellipsis: false,
					// align: "center"
				},
				{
					title: "推送NC时间",
					// dataIndex: "ncPullTime",
					key: "ncPullTime",
					width: 170,
					scopedSlots: { customRender: "ncPullTime" },
					ellipsis: false,
				},
				{
					title: "正负状态",
					dataIndex: "collectionMark",
					key: "collectionMark",
					scopedSlots: { customRender: "collectionMark" },
					width: 100,
					ellipsis: false,
					align: "center"
				},
				{
					title: "关联应收单",
					key: "operationOne",
					scopedSlots: { customRender: "operationOne" },	
					width: 120,
					fixed: "right",
					align: "center"
				},
				{
					title: "操作",
					key: "operationTwo",
					scopedSlots: { customRender: "operationTwo" },
					width: 80,
					fixed: "right",
					align: "center"
				},
			],
			relateCollectingBillList: [],	//关联应收单
			orderTradeInfo : {},	//要跳转的列表item
			visible: false,
			showSee: false,
			//列表数据
			tableData,
			tableLoading: false,
			//分页
			total: 0,
			pageSize: 10,
			current: 1,
			data:[],
			tableRefresh: false,
			pageRefresh: true,
    }),
		computed: mapState([
			"Case_Access_Token",
		]),
		watch: {
			Case_Access_Token(newVal, oldVal) {
				this.selectCollectingBill();
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
						orderStateName = '正';
						break;
					case '1':
						orderStateName = '负';
						break;
					case '2':
						orderStateName = '归零';
						break;
					default:
						orderStateName = '正';
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
			this.tableData = [];
			this.tableLoading = false;
			this.total = 0;
			this.pageSize = 10;
			this.current = 1;
			this.data = [];
			this.tableRefresh = false;
			this.pageRefresh = true;
			this.selectCollectingBill();
			this.firstTimeDisabled = false;
		},


		methods: {
			disabledStartDate(startTime) {
				const endTime = this.endTime;
				if (!startTime || !endTime) {
						return false;
				}
				return startTime.valueOf() > endTime.valueOf();
			},
			disabledEndDate(endTime) {
				const startTime = this.startTime;
				if (!endTime || !startTime) {
						return false;
				}
				return startTime.valueOf() >= endTime.valueOf();
			},

			// firstTime   lastTime
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
			onDateLastTimeChange(date, dateString) {
				this.lastTime = dateString;
			},

			// 0.1 搜索与重置
			_toSearch(){
				this.selectCollectingBill();
			},
			_toAddBill(){
				this.queryAddCollectingBillStartDate();
			},
			_toExportList(){
				this.exportCollectingBillList();
			},

			_toReset(){
				this.startTime = null;
				this.endTime = null;
				this.endOpen = false;
				this.endOpenOne = false;
				this.collectingBillNo = '';	//订单号
				this.confirmStatus = undefined;	//
				this.positiveNegativeState = undefined;	//
				this.billingCompany = '';
				this.purchaseNo = '';
				// this.orderStateList = ["PAID", "ON_GOING", "COMPLETED", "CANCELED", "CLOSE"];	//订单状态
				this.tableData = [];
				this.tableLoading = false;
				this.total = 0;
				this.pageSize = 10;
				this.current = 1;
				this.data = [];
				this.tableRefresh = false;
				this.pageRefresh = true;
				this.selectCollectingBill();
			},
			onDetermine(supplierOrderNo) {
				this.confirmCollectingBill(supplierOrderNo);
			},
			// 应收确认
			confirmCollectingBill(para) {
			  this.tableLoading = true;
			  api.confirmCollectingBill(para).then(res => {
			    if (res.code === 200) {
			      this.$message.success(res.message);
			    }
			  }).finally(() => {
			    this.tableLoading = false;
					this.selectCollectingBill();
			  });
			},
			//应收列表查询
			selectCollectingBill() {
			  this.tableLoading = true;
				const para = {
					// billingCompany: this.billingCompany,
					collectingBillNo: this.collectingBillNo,
					confirmStatus: this.confirmStatus,
					endTime: this.endTime,
					positiveNegativeState: this.positiveNegativeState,
					purchaseNo: this.purchaseNo,
					startTime:this.startTime,
					supplierOrderNo: '',
					// orderStateList: this.orderStateList,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
			  api.selectCollectingBill(para).then(res => {
			    if (res.code === 200) {
			      this.tableData = res.data.records;
			      this.total = res.data.total*1;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			//导出
			exportCollectingBillList() {
			  this.tableLoading = true;
				const para = {
					// billingCompany: this.billingCompany,
					collectingBillNo: this.collectingBillNo,
					confirmStatus: this.confirmStatus,
					endTime: this.endTime,
					positiveNegativeState: this.positiveNegativeState,
					purchaseNo: this.purchaseNo,
					startTime:this.startTime,
					supplierOrderNo: '',
					// orderStateList: this.orderStateList,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
			  api.exportCollectingBillList(para).then(res => {
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


			//编辑
			onEdit(operation, collectingBillNo) {
				this.orderTradeInfo = operation;
				this.showSee = false;
			  debounce(()=>{
			    this.$router.push({
			      name: "collectionInfo",
			      params: {
							orderTradeInfo: this.orderTradeInfo,
							collectingBillNo:collectingBillNo
			      }
			    })
			  })
			},
			toEdit(collectingBillNo) {
				this.showSee = false;
			  debounce(()=>{
			    this.$router.push({
			      name: "collectionInfo",
			      params: {
							orderTradeInfo: this.orderTradeInfo,
							collectingBillNo:collectingBillNo
			      }
			    })
			  })
			},

			onSee(operation, collectingBillNo) {
				this.orderTradeInfo = operation;
				this.relateCollectingBillList = [];
				this.queryRelateCollectingBillList(collectingBillNo);
			},

			queryRelateCollectingBillList(collectingBillNo) {
			  this.tableLoading = true;
				const para = {
					collectingBillNo: collectingBillNo,
			  };
			  api.queryRelateCollectingBillList(para).then(res => {
			    if (res.code === 200) {
						if(res.data.length){
							this.relateCollectingBillList = res.data;
							this.showSee = true;
						}else{
							this.$message.warning('暂无关联应收单');
						}
						// this.relateCollectingBillList = ['YS2106100427'];
					}
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			queryAddCollectingBillStartDate() {
			  this.tableLoading = true;
				const para = {};
			  api.queryAddCollectingBillStartDate(para).then(res => {
			    if (res.code === 200) {
						this.firstTime = res.data;
						this.visible = true;
						this.firstTimeDisabled = true;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},


			// 0.2弹窗
			handleOk(){
				// 这里应该是有一个请求
				if((new Date(this.firstTime)).getTime() > (new Date(this.lastTime)).getTime()){
					this.$message.error('结束时间不应早于开始时间');
					this.lastTime = null;
					return
				}
				this.collectingBillAdd();
			},
			handleCancel(){
				this.visible = false;
				this.lastTime = null;
			},
			// 0.2弹窗
			handleOkSee(){
				this.showSee = false;
				// this.collectingBillAdd();
			},

			//生成应收单
			collectingBillAdd() {
			  this.tableLoading = true;
				const para = {
					startTime: this.firstTime+' 00:00:00',
					endTime: this.lastTime+' 23:59:59'
			  };
			  api.collectingBillAdd(para).then(res => {
			    if (res.code === 200) {
						this.$message.success('应收单生成中，请稍后刷新页面查看');
			    }
			  }).finally(() => {
					this.visible = false;
			    this.tableLoading = false;
					this.selectCollectingBill();
			  });
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
				this.selectCollectingBill();
			},
    }
  }
</script>
<style lang="less" scoped>
	@import url("./index.less");
	.preview-visible-img{
		span{
			display: block;
			font-size: 14px;
			line-height: 24px;
			color: #4B7AFB;
		}
	}
</style>