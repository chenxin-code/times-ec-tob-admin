<template>
  <div style="height: 100%;">
		<a-form>
			<!-- <a-form-item>
				<a-input v-model="projectName" placeholder="请输入采购项目"/>
			</a-form-item> -->
			<a-form-item>
				<a-input v-model="fileName" placeholder="请输入采购单号"/>
			</a-form-item>
		  <a-form-item>
				<a-date-picker
				    v-model="purchaseBegin"
				    show-time
				    format="YYYY-MM-DD HH:mm:ss"
				    placeholder="采购开始日期"
						style="width: 100%;"
				/>
		  </a-form-item>
		  <a-form-item has-feedback>
				<a-date-picker
				    v-model="purchaseEnd"
				    show-time
				    format="YYYY-MM-DD HH:mm:ss"
				    placeholder="采购结束日期"
						style="width: 100%;"
				/>
		  </a-form-item>
			<a-form-item>
				<a-date-picker
				    v-model="uploadingBegin"
				    show-time
				    format="YYYY-MM-DD HH:mm:ss"
				    placeholder="上传开始日期"
						style="width: 100%;"
				/>
		  </a-form-item>
		  <a-form-item has-feedback>
				<a-date-picker
				    v-model="uploadingEnd"
				    show-time
				    format="YYYY-MM-DD HH:mm:ss"
				    placeholder="上传结束日期"
						style="width: 100%;"
				/>
		  </a-form-item>
		  <a-form-item class="item-btns">
		    <a-button class="item-btn" type="primary" @click="_toSearch">
		      查找
		    </a-button>
				<a-button class="item-btn" @click="_toReset">
		      重置
		    </a-button>
				<a-button class="item-btn" type="primary" @click="upFn">
					下载模板
		    </a-button>
				<a-upload
					name="file"
					:multiple="true"
					:action="action"
					@change="handleChange"
					:beforeUpload='beforeUpload'
					:headers='headobj'
					:showUploadList='false'
					:disabled='uploading'
				>
					<a-button :loading='uploading'> <a-icon type="upload" /> 上传采购单 </a-button>
				</a-upload>
		  </a-form-item>
		</a-form>

		<div id="neighborhoodLife">
			<div class="content-main" ref="content_main">
				<a-row style="padding:20px;height:100%;">
					<a-col flex:auto>
						<a-table
							:columns="tableColumns"
							:row-key="(r,i) => i"
							:data-source="tableData"
							:scroll="{ x: 1000 }"
							:pagination="false"
							:loading="tableLoading"
							style="margin-top:8px;"
						>
							<template slot="operation" slot-scope="operation">
								<div class="editable-row-operations">
									<a @click="onEdit(operation)" >查看详情</a>
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
		<secondModal :visible='showSecondModal' :difference='difference' @close="close" ref="secondModal" />
  </div>
</template>

<script>
	import api from "@/api";
	import { tableColumns, filtFn, stateArr } from './config';
  import { debounce } from '@/utils/util';
  import secondModal from "./secondModal";	//二次确认
	import { mapState } from "vuex";
  const ACTION = process.env.VUE_APP_BASE_API+'/times-ec-anchang/admin/purchase/importExcel';
  export default {
    components: {
			 secondModal
    },
    data: () => ({
			action: ACTION,
			difference:[], // 上次差异
			projectName: '',
			fileName: '',
			uploadingBegin: '',
			uploadingEnd: '',
			purchaseBegin: '',
			purchaseEnd: '',
			showSecondModal: false,
			//表格高度
			scrollY: 100,
			//表头数据
			tableColumns,
			//列表数据
			tableData: [],
			tableLoading: false,
			//分页
			total: 0,
			pageSize: 10,
			current: 1,
			headobj:{
				Access_channel: 'mgmt',
				Access_Token : localStorage.getItem("Case_Access_Token") || ''
			},
			uploading:false, // 上传
    }),
		computed: mapState([
			"Case_Access_Token",
		]),
		watch: {
			Case_Access_Token(newVal, oldVal) {
				this.purchaseList();
			},
		},
		mounted: function() {
			console.log('到底有没有发部')
			console.log(process.env.VUE_APP_BASE_API)
			// this.action = process.env.VUE_APP_BASE_API+'/times-ec-anchang/admin/purchase/importExcel';
				this.purchaseList();
		},
		methods: {
			beforeUpload() {
				this.headobj.Access_Token = localStorage.getItem("Case_Access_Token") || '';
				this.uploading=true
			},
			_toSearch(){
				this.purchaseList();
			},
			_toReset(){
				this.projectName = '';
				this.fileName = '';
				this.uploadingBegin = null;
				this.uploadingEnd = null;
				this.purchaseBegin = null;
				this.purchaseEnd = null;
				this.purchaseList();
			},
			purchaseList() {
				if(!this.Case_Access_Token) return;
			  this.tableLoading = true;
				const para = {
					pageNum: this.current,
					pageSize : this.pageSize,
			  };
				if (this.projectName) para.projectName = this.projectName;
				if (this.fileName) para.fileName = this.fileName;
				if (this.uploadingBegin) para.uploadingBegin = this.uploadingBegin.format('YYYY-MM-DD HH:mm:ss');
				if (this.uploadingEnd) para.uploadingEnd = this.uploadingEnd.format('YYYY-MM-DD HH:mm:ss');
				if (this.purchaseBegin) para.purchaseBegin = this.purchaseBegin.format('YYYY-MM-DD HH:mm:ss');
				if (this.purchaseEnd) para.purchaseEnd = this.purchaseEnd.format('YYYY-MM-DD HH:mm:ss');
			  api.purchaseList(para).then(res => {
			    if (res.code === 200) {
			      this.tableData = res.data.records;
						this.tableData.forEach( v=> {
			      	v.state = filtFn(stateArr,v.state);
						})
			      this.total = res.data.total*1;
			    }
			  }).finally(() => {
			    this.tableLoading = false;
			  });
			},
			handleChange(info,a,b) {
				if (info.file.status === 'done' ) {
					if (info.file.response.code === 200) {
						if (info.file.response.data.sign == 0) { //0-有差异，1-没有差异
							this.difference = info.file.response.data;
							this.uploading = false;
							this.showSecondModal = true;
						} else if (info.file.response.data.sign == 1) {
							this.$message.success('上传成功');
							this.uploading = false;
							this.purchaseList();
						}

					}else {
						this.$message.error('上传失败'+info.file.response.message);
						this.uploading = false;
					}
				} else if (info.file.status === 'error') {
					this.$message.error('上传失败');
					this.uploading = false;
				}
			},
			onEdit(operation) {
			  debounce(()=>{
			    this.$router.push({
			      name: "marketInfo",
			      params: {
							...operation
			      }
			    })
			  })
			},
			close(){
				this.showSecondModal = false;
				this.purchaseList();

			},
			upFn() {
				// const regex = /http/;
				const a = document.createElement('a');
				// console.log(res.data.replace(regex, 'https'));
				a.href = 'https://times-new-store.oss-cn-shenzhen.aliyuncs.com/times-ec-anchang/purchase/template/%E6%A1%88%E5%9C%BA%E9%87%87%E8%B4%AD%E5%8D%95%E6%A8%A1%E6%9D%BF.xlsx';
				a.click();
			},
			// 分页
			onShowSizeChange(current, pageSize) {
			  this.current = current;
			  this.pageSize = pageSize;
				this.purchaseList();
			},

    }
  }
</script>

<style lang="less" scoped>
	@import url("./index.less");
</style>