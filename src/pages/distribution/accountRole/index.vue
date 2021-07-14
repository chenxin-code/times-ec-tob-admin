<template>
  <div style="height: 100%;">

		<div id="neighborhoodLife">
			<div class="content-main" ref="content_main">
				<a-row style="padding:20px;height:100%;">
					<a-col flex:auto>

						<!-- :row-selection="rowSelection" -->
						<a-table
							:columns="tableColumns"
							:row-key="(r,i) => i"
							:data-source="tableData"

							:pagination="false"
							:loading="tableLoading"
							style="margin-top:8px;"
						>
							<template slot="roleName" slot-scope="operation">
								<div class="editable-row-operations">
										<a-tag>{{operation.roleName}}</a-tag>
								</div>
							</template>
							<template slot="operation" slot-scope="operation">
								<div v-if="operation.roleCode != 'ADMIN' && operation.roleCode != 'SUPPER_ADMIN'" class="editable-row-operations">
									<a @click="toEdit(operation)">权限设置</a>
								</div>
							</template>
						</a-table>
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


		<a-modal
		  title="权限设置"
		  :visible="showModal"
		  :confirm-loading="confirmLoading"
		  @ok="handleOk"
		  @cancel="handleCancel"
		>
			<template>
			  <div class="limit-items">
					<div class="limit-item">
						<h4>菜单</h4>
						<a-checkbox-group
							v-model="defaultCheckedList3"
							:options="plainOptions3"
							:disabled="selectOperation.roleCode=='OPERATOR_OFFICIAL' ? true : false"
							@change="onChange3"
							/>
					</div>
				</div>
			</template>
		</a-modal>

  </div>
</template>

<script>
	import api from "@/api";
	import message from 'ant-design-vue/es/message';
	import { mapState } from "vuex";
  export default {
    name: "distributor",
    components: {

    },
    data: () => ({
      tabKey: "1",
      tableRefresh: false,
      pageRefresh: true,

			showModal: false,
			selectOperation : {},	//权限设置选中项
			plainOptions1: [],
			plainOptions2: [],
			plainOptions3: [],

			checkedList1:[],
			checkedList2:[],
			checkedList3:[],
			defaultCheckedList1: [],
			defaultCheckedList2: [],
			defaultCheckedList3: [],
			confirmLoading: false,

			//表格高度
			scrollY: 100,
			//表头数据
			tableColumns: [
				{
					title: "级别名称",
					key: "roleName",
					scopedSlots: { customRender: "roleName" },
					width: 150,
					ellipsis: true,
				},
				{
					title: "操作",
					key: "operation",
					scopedSlots: { customRender: "operation" },	//这个应该是插槽的东西
					width: 120,
					fixed: "right",
				},
			],
			//列表数据
			tableData: [],
			tableLoading: false,
			//分页
			total: 0,
			pageSize: 10,
			current: 1,
			data:[],
			tableRefresh: false,
			pageRefresh: true

    }),
    beforeRouteLeave(to, from, next) {
      if (to.name === "addHcmUser" || to.name === "authorizeHcmUser") {
        this.tableRefresh = true;
        this.pageRefresh = false
      }else {
        this.pageRefresh = true
      }
      next();
    },
		computed: {
			rowSelection() {
				return {
					onChange: (selectedRowKeys, selectedRows) => {
						console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
					},
					getCheckboxProps: record => ({
						props: {
							disabled: record.name === 'Disabled User', // Column configuration not to be checked
							name: record.name,
						},
					}),
				};
			},
			...mapState([
				"Case_Access_Token",
			])
		},
		watch: {
			Case_Access_Token(newVal, oldVal) {
				if(this.pageRefresh){
					this.tableData = [];
					this.tableLoading = false;
					this.total = 0;
					this.pageSize = 10;
					this.current = 1;
					this.data = [];
					this.tableRefresh = false;
					this.pageRefresh = true;
					this.getRoleList();
					this.getPermissionList();
				}else if (this.tableRefresh) {
					this.getRoleList();
					this.getPermissionList();
				}
			},
		},
		mounted: function() {
    	if(!this.Case_Access_Token) return;

			if(this.pageRefresh){
				this.tableData = [];
				this.tableLoading = false;
				this.total = 0;
				this.pageSize = 10;
				this.current = 1;
				this.data = [];
				this.tableRefresh = false;
				this.pageRefresh = true;
				this.getRoleList();
				this.getPermissionList();
			}else if (this.tableRefresh) {
				this.getRoleList();
				this.getPermissionList();
			}
		},

    methods: {
			toEdit(operation){
				this.selectOperation = operation;
				this.getPermListByRole();
				this.showModal = true;
			},
			// 0.2弹窗
			handleOk(){
				this.showModal = false;
				// 这里应该是有一个请求
				this.showSecondModal = true;
				let permIdList = [...this.defaultCheckedList1, ...this.defaultCheckedList2, ...this.defaultCheckedList3]
				console.log(permIdList);
				this.saveRolePermRel(permIdList);
			},
			handleCancel(){
				this.showModal = false;
			},
			/** 多选的方法 **/
			onChange3(checkedValues) {
				this.checkedList3 = checkedValues;
			},
			// 分页
			onShowSizeChange(current, pageSize) {
			  this.current = current;
			  this.pageSize = pageSize;
			  this.getRoleList();
			},
			//根据角色查询用户权限
			getPermListByRole() {
			  this.tableLoading = true;
				const para = {
					roleId : this.selectOperation.id,
			  };
			  api.getPermListByRole(para).then(res => {
			    if (res.code === 200) {
						this.permList = res.data.permList;
							let defaultCheckedList1 = [];
							let defaultCheckedList2 = [];
							let defaultCheckedList3 = [];
							let permList = JSON.parse(JSON.stringify(res.data.permList));
							permList.forEach(item=>{
								this.plainOptions1.forEach(its1=>{
									if(item.id == its1.id){
										defaultCheckedList1.push(item.id);
									}
								});
								this.plainOptions2.forEach(its2=>{
									if(item.id == its2.id){
										defaultCheckedList2.push(item.id);
									}
								});
								this.plainOptions3.forEach(its3=>{
									if(item.id == its3.id){
										defaultCheckedList3.push(item.id);
									}
								});
							});
							this.defaultCheckedList1 = defaultCheckedList1;
							this.defaultCheckedList2 = defaultCheckedList2;
							this.defaultCheckedList3 = defaultCheckedList3;

			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			//保存角色权限关系
			saveRolePermRel(permIdList) {
			  this.tableLoading = true;
				const para = {
					roleId : this.selectOperation.id,
					permIdList: permIdList
			  };
			  api.saveRolePermRel(para).then(res => {
			    if (res.code === 200) {
						message.success(res.message);
						// this.getUserList();
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},

			//账号-分页查询角色列表
			getRoleList() {
			  this.tableLoading = true;
				const para = {
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
			  api.getRoleList(para).then(res => {
			    if (res.code === 200) {
						this.tableData = res.data.records;
						this.total = res.data.total*1;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			//分页查询可编辑权限列表
			getPermissionList() {
			  this.tableLoading = true;
				const para = {
					pageNum: 1,
					pageSize : 9999,
			  };
			  api.getPermissionList(para).then(res => {
			    if (res.code === 200) {
						// 过滤分类 plainOptions1
						res.data.records.forEach(item=>{
							item['label'] = item.permName;
							item['value'] = item.id;
						});
						const plainOptions1 = res.data.records.filter(x => x.permType === 'PUBLISH');
						const plainOptions2 = res.data.records.filter(x => x.permType === 'READ');
						const plainOptions3 = res.data.records.filter(x => x.permType === 'MANAGEMENT');
						// this.plainOptions1 = JSON.parse(JSON.stringify(plainOptions1));
						this.plainOptions1 = plainOptions1
						this.plainOptions2 = plainOptions2
						this.plainOptions3 = plainOptions3
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
    }
  }
</script>

<style lang="less" scoped>
  .ant-input-search .ant-input-suffix {
    right: 18px;
  }
  .ant-tabs, .ant-tabs .ant-tabs-top-content, .ant-tabs .ant-tabs-bottom-content {
    height: 100%;
  }
  .ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane, .ant-tabs .ant-tabs-bottom-content > .ant-tabs-tabpane {
    transition: none;
  }
  .ant-tabs .ant-tabs-top-content.ant-tabs-content-animated, .ant-tabs .ant-tabs-bottom-content.ant-tabs-content-animated {
    transition: none;
  }
	.ant-tag{
		width: 176px;
		height: 32px;
		line-height: 32px;
		border-radius: 4px;
		color: #999999;
		font-size: 14px;
	}
	.limit-items{
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: flex-start;
		height: 240px;
		overflow-y: auto;
		.limit-item{
			box-sizing: border-box;
			width: 33.3%;
			height: 100%;
			padding-left: 20px;
			border-right: 1px solid #EEEEEE;
		}
		.limit-item:first-child{
			padding-left: 0;
		}
		.limit-item:last-child{
			border-right: none;
		}
	}
	/deep/ .ant-checkbox-group{
		display: flex;
		flex-direction: column;
	}
	/deep/ .ant-checkbox-group-item{
		color: #333333;
		margin: 8px 0;
	}
</style>
