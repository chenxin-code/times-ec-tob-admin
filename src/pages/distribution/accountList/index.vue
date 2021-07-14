<template>
  <div style="height: 100%;">
		<a-form>
			<a-form-item label="账号名称">
				<a-input v-model="userName" placeholder="请输入账号名称" :maxLength='20'/>
			</a-form-item>
		  <a-form-item class="item-btns">
		    <a-button class="item-btn" type="primary" @click="_toSearch">
		      查找
		    </a-button>
				<a-button class="item-btn" @click="_toReset">
		      重置
		    </a-button>
				<a-button class="item-btn" type="primary" @click="onAdd(0)">
		      添加
		    </a-button>
		  </a-form-item>
		</a-form>
		<!-- <distributorList /> -->
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
							<template slot="name" slot-scope="operation">
								<div class="editable-row-operations">
									<span>{{operation.name}}</span>
								</div>
							</template>
							<template slot="roleName" slot-scope="operation">
								<div class="editable-row-operations">
									<span>{{operation.roleName}}</span>
								<!-- 	<span v-if="operation.type === 1">管理员</span>
									<span v-if="operation.type === 2">官方号</span>
									<span v-if="operation.type === 3">普通</span> -->
								</div>
							</template>
							<template slot="userState" slot-scope="operation">
								<div class="editable-row-operations">
									<span v-if="operation.userState === 1">启用</span>
									<span v-if="operation.userState === 0">禁用</span>
								</div>
							</template>
							<template slot="operation" slot-scope="operation">
								<div class="editable-row-operations">
									<a @click="_onEdit(operation)">编辑</a>
									<a-divider type="vertical" />
									<a @click="onChangeStatus(operation)">{{operation.userState === 1 ? "禁用" : "启用" }}</a>

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

		<a-modal
			title="状态切换"
			:visible="false"
			:closable="false"
			@ok="handleOk"
			@cancel="handleCancel"
		>
			<p>是否将用户状态切换为</p>
		</a-modal>

		<addAccountModal
			:visible="showModal"
			:title="showModalTitle"
			:showModalIndex="showModalIndex"
			:roleList="roleList"
			:updateRoleCode="updateRoleCode"
			:listItem="listItem"
			:supplierList="supplierList"
			@handleChange="handleChange"
			@supplierChange="supplierChange"
			@handleOk="handleOk"
			@handleCancel="handleCancel"
		/>
		<secondModal
			:visible='showSecondModal'
			:addUserInfo = 'addUserInfo'
			@secondHandleOk="secondHandleOk"
			@secondHandleCancel="secondHandleCancel"
		/>
  </div>
</template>

<script>
  import api from "@/api";
	import message from 'ant-design-vue/es/message'
  import { ADVERTISE_SKIP_TYPE } from "@/constance";
  import moment from "moment";
	import { mapState } from "vuex";

  import { debounce } from '@/utils/util';
  import addAccountModal from "./addAccountModal";	//添加账号
  import secondModal from "./secondModal";	//二次确认
  export default {
    name: "distributor",
    components: {
			addAccountModal,
			secondModal
    },
    data: () => ({
			addUserInfo: {},	//需要添加的用户信息
      // tabKey: "1",
      tableRefresh: false,
      pageRefresh: true,
			showModal: false,
			showModalTitle: '',
			showModalIndex: 0,
			showSecondModal: false,
			userName: '',

			//表格高度
			scrollY: 100,
			//表头数据
			tableColumns: [
				{
					title: "ID",
					dataIndex: "id",
					key: "id",
					width: 200,

					ellipsis: true,
				},
				{
					title: "账号名",
					key: "name",
					scopedSlots: { customRender: "name" },
					width: 150,
					ellipsis: true,
				},
				{
					title: "账号角色",
					key: "roleName",
					// dataIndex: "type",
					ellipsis: true,
					width: 150,
					// customRender: (val) => ADVERTISE_SKIP_TYPE[val] || val
					scopedSlots: { customRender: "roleName" },
				},
				{
					title: "状态",
					key: "userState",
					scopedSlots: { customRender: "userState" },
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
			supplierList:[],	//供应商列表
			tableLoading: false,
			//分页
			total: 0,
			pageSize: 10,
			current: 1,
			data:[],
			tableRefresh: false,
			pageRefresh: true,
			roleList: [],	//角色等级列表
			listItem : {},	//被编辑的数据
			updateRoleId : '',	//被编辑的用户新的角色id
			updateRoleCode : '',
			supplierCode : '',	//被编辑的用户供应商code
    }),
		computed: mapState([
			"Case_Access_Token",
		]),
		watch: {
			Case_Access_Token(newVal, oldVal) {
				if(this.pageRefresh){
					this.tableData = [];
					this.supplierList = [];
					this.tableLoading = false;
					this.total = 0;
					this.pageSize = 10;
					this.current = 1;
					this.data = [];
					this.tableRefresh = false;
					this.pageRefresh = true;
					this.getUserList();
				}else if (this.tableRefresh) {
					this.getUserList();
				}
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
		mounted: function() {
    	if(!this.Case_Access_Token) return;
			if(this.pageRefresh){
			  this.tableData = [];
			  this.supplierList = [];
				this.tableLoading = false;
				this.total = 0;
				this.pageSize = 10;
				this.current = 1;
				this.data = [];
				this.tableRefresh = false;
				this.pageRefresh = true;
			  this.getUserList();
			}else if (this.tableRefresh) {
			  this.getUserList();
			}
		},
    methods: {
			// 0.1新建
			onAdd(){
				console.log('789');
				this.showModal = true;
				this.showModalTitle = '添加账号';
				this.showModalIndex = 0;
			},
			_onEdit(operation){
				console.log(operation);
				this.listItem = operation;
				this.updateRoleId = operation.roleId ? operation.roleId : '';
				this.updateRoleCode = operation.roleCode ? operation.roleCode : '';
				this.supplierCode = operation.supplierCode ? operation.supplierCode : '';
				this.getRoleList();
				this.showModal = true;
				this.showModalIndex = 1;
				this.showModalTitle = '编辑账号';
			},
			onChangeStatus(operation){
				this.updateUserState(operation);
			},
			// 0.2弹窗
			handleOk(e){
				if(this.showModalIndex==1){	//改状态
					this.updateUserInfo();
				}else{
					this.getUnifyEmployeeInfoByPhone(e);
				}
			},
			handleCancel(){
				this.showModal = false;
			},
			handleChange(id){
				console.log('id:'+id);
				this.updateRoleId = id;
				let updateRoleItem = this.roleList.find(x => x.id == this.updateRoleId);
				this.updateRoleCode = updateRoleItem.roleCode;
			},
			supplierChange(id){
				console.log('supplierCode:'+id);
				this.supplierCode = id;
			},

			secondHandleOk(){
				this.syncUserInfo();
			},

			secondHandleCancel(){
				this.showSecondModal = false;
			},
			/** 查找 **/
			_toSearch(){
				console.log(this.userName);

				this.tableData = [];
				this.tableLoading = false;
				this.total = 0;
				this.pageSize = 10;
				this.current = 1;
				this.data = [];
				this.tableRefresh = false;
				this.pageRefresh = true;
				this.getUserList();
			},
			_toReset(){
				this.userName = '';
				this.tableData = [];
				this.tableLoading = false;
				this.total = 0;
				this.pageSize = 10;
				this.current = 1;
				this.data = [];
				this.tableRefresh = false;
				this.pageRefresh = true;
				this.getUserList();
			},
			// 分页
			onShowSizeChange(current, pageSize) {
			  this.current = current;
			  this.pageSize = pageSize;
			  this.getUserList();
			},
			//获取用户列表
			getUserList() {
			  this.tableLoading = true;
				const para = {
					name: this.userName,
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
			  api.getUserList(para).then(res => {
			    if (res.code === 200) {
			      this.tableData = res.data.records;
			      this.total = res.data.total*1;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},

			//获取供应商列表
			getsupplierList() {
			  this.tableLoading = true;
				const para = {
					supplierName: '',
					pageNum: 1,
					pageSize : 9999,
			  };
			  api.supplierList(para).then(res => {
			    if (res.code === 200) {
						this.supplierList = res.data.records;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},

			//账号-分页查询角色列表
			getRoleList() {
			  this.tableLoading = true;
				const para = {
					pageNum: 1,
					pageSize : 9999,
			  };
			  api.getRoleList(para).then(res => {
			    if (res.code === 200) {
						this.roleList = res.data.records;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},

			//切换用户状态
			updateUserState(data) {
			  this.tableLoading = true;
				let userState = (data.userState == 1) ? 0 : 1;
				const para = {
					id: data.id,
					userState: userState
			  };
			  api.updateUserState(para).then(res => {
			    if (res.code === 200) {
						message.success(res.message);
			    }
			  }).finally(() => {
			    this.tableLoading = false;
					this.getUserList();
			  });
			},
			//编辑角色
			updateUserInfo() {
			  this.tableLoading = true;
				let updateRoleItem = this.roleList.find(x => x.id == this.updateRoleId);
				const para = {
					id: this.listItem.id,
					roleId: this.updateRoleId,
					roleCode: updateRoleItem.roleCode,
					supplierCode: this.supplierCode,
			  };
			  api.updateUserInfo(para).then(res => {
			    if (res.code === 200) {
						message.success(res.message);
						this.getUserList();
			    }
			  }).finally(() => {
			    this.tableLoading = false;
					this.showModal = false;
			  });
			},
			//新增用户至一体化数据
			syncUserInfo() {
			  this.tableLoading = true;
				const para = {
					avatarUrl: this.addUserInfo.userImage,
					name: this.addUserInfo.empName,
					originalEmpId: this.addUserInfo.id,
					originalId: this.addUserInfo.userId,
					phone: this.addUserInfo.mobilePhone,
					userName: this.addUserInfo.userName,
			  };
			  api.syncUserInfo(para).then(res => {
			    if (res.code === 200) {
						message.success(res.message);
						this.getUserList();
			    }
			  }).finally(() => {
			    this.tableLoading = false;
					this.showSecondModal = false;
			  });
			},

			//手机号查用户-第三方
			getUnifyEmployeeInfoByPhone(phone) {
			  this.tableLoading = true;
				const para = {
					phone: phone,
			  };
			  api.getUnifyEmployeeInfoByPhone(para).then(res => {
			    if (res.code === 200) {
						this.showModal = false;
						if(res.data){
							this.addUserInfo = res.data;
							this.showSecondModal = true;
						}else{
							message.error('该手机号没有找到对应用户');
						}
			    }
			  }).finally(() => {

			    this.tableLoading = false;
					this.showModal = false;
			  });
			},
    }
  }
</script>

<style lang="less" scoped>
  .ant-input-search .ant-input-suffix {
    right: 18px;
  }
</style>
<style lang="less" scoped>
	.ant-form{
		box-sizing: border-box;
		padding: 20px 0 0 20px;
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap:wrap;
		.ant-form-item{
			display: flex;
			// width: 33.33%;
			width: 300px;
			padding-right: 20px;
		}
		/deep/ .item-btns .ant-form-item-control{
			display: flex;
			justify-content: flex-end;
		}
		/deep/ .item-btns .ant-form-item-children{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		/deep/ .item-btns .item-btn{
			margin-right: 20px;
		}

	}
</style>
