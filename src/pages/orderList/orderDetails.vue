<template>
	<div class="order-details">
		<div class="details-header">
			<a-button @click="$router.back()">返回</a-button>
		</div>

		<div class="details-step">
			<div class="step-box">
				<a-steps :current="stepCurrent" labelPlacement="vertical">
					<a-step
						v-for="item in steps"
						:key="item.title"
						:title="item.title"
					/>
				</a-steps>
			</div>
			<div class="step-btn">
				<a-button
					type="primary"
					@click="applyAfter"
					v-if="stepCurrent == 2"
					>申请售后</a-button
				>
			</div>
		</div>

		<div class="order-info">
			<p class="info-title">订单信息</p>

			<a-descriptions>
				<a-descriptions-item label="采购单号">
					{{ orderInfoData.supplierOrderNo }}
				</a-descriptions-item>
				<a-descriptions-item label="订单号">
					1810000000
				</a-descriptions-item>
				<a-descriptions-item label="下单时间">
					{{ orderInfoData.orderTime }}
				</a-descriptions-item>
				<a-descriptions-item label="支付方式">
					{{ orderInfoData.payWay == "ONLINE" ? "线上" : "线下" }}
				</a-descriptions-item>
				<a-descriptions-item label="订单状态">
					{{ dealOrderStatus(orderInfoData.orderStatus) }}
				</a-descriptions-item>
				<a-descriptions-item label="应收/实收金额">
					{{ orderInfoData.amountPayable }} /
					{{ orderInfoData.amountPay }}
				</a-descriptions-item>
			</a-descriptions>
		</div>

		<div class="order-info">
			<p class="info-title">收货信息</p>

			<a-descriptions>
				<a-descriptions-item label="收货人">
					{{ receiver }}
				</a-descriptions-item>
				<a-descriptions-item label="收货地址">
					{{ orderInfoData.receiveAddress }}
				</a-descriptions-item>
			</a-descriptions>
		</div>

		<div class="order-info-list">
			<p class="list-title">商品信息</p>

			<div>
				<a-table
					:rowKey="(record) => record.id"
					:columns="columns"
					:data-source="orderItemListData"
					:scroll="{ x: 1300, y: 800 }"
					:pagination="{ hideOnSinglePage: true }"
				>
					<span slot="goods" slot-scope="text, record">
						<div class="goods-items">
							<div class="gi-item">
								<!-- <div class="gi-pic">
									<img :src="record.itemImg" alt="" />
								</div> -->
								<div class="gi-info">
									<p class="title">{{ record.itemName }}</p>
									<p
										class="size"
										:title="titleFn(record.itemSpecsArray)"
									>
										规格：
										<span
											class="feature"
											v-for="(item,
											index) in record.itemSpecsArray"
											:key="index"
											>{{
												item.featureName +
													"：" +
													item.featureValue
											}}</span
										>
									</p>
								</div>
							</div>
						</div>
					</span>
				</a-table>
			</div>
		</div>

		<div class="order-info-list1">
			<p class="list-title">配送信息</p>

			<div>
				<a-table
					:rowKey="(record) => record.id"
					:columns="dispatchingColumns"
					:data-source="deliveryListData"
					:scroll="{ x: 1300, y: 800 }"
					:pagination="{ hideOnSinglePage: true }"
				>
					<div slot="goods" slot-scope="text, record">
						<div
							class="goods-items"
							v-for="(item, index) in record.deliveryItemList"
							:key="index"
						>
							<div class="gi-item">
								<!-- <div class="gi-pic">
									<img :src="item.itemImg" alt="" />
								</div> -->
								<div class="gi-info">
									<p class="title">{{ item.itemName }}</p>
									<p
										class="size"
										:title="titleFn(item.itemSpecsArray)"
									>
										规格：<span
											class="feature"
											v-for="(item1,
											index1) in item.itemSpecsArray"
											:key="index1"
											>{{
												item1.featureName +
													"：" +
													item1.featureValue
											}}</span
										>
									</p>
								</div>
							</div>
						</div>
					</div>

					<div slot="skuCode" slot-scope="text, record">
						<div
							v-for="(item, index) in record.deliveryItemList"
							:key="index"
							class="goods-items-block"
						>
							<span>{{ item.skuCode }}</span>
						</div>
					</div>

					<span slot="deliveryNum" slot-scope="text, record">
						<div
							v-for="(item, index) in record.deliveryItemList"
							:key="index"
							class="goods-items-block"
						>
							<span>{{ item.deliveryNum }}</span>
						</div>
					</span>
					<span slot="dispatching" slot-scope="scope">
						<a @click="showBox(scope,1)">查看凭证</a>
					</span>
          <span slot="receiptProof" slot-scope="scope">
            <a @click="showBox(scope,2)" v-if="scope.approveStatus === 1">查看凭证</a>
					</span>
					<span slot="approveStatus" slot-scope="text, record">
						<span v-if="record.approveStatus == 0">审核中</span>
						<span v-if="record.approveStatus == 1">审核通过</span>
						<span v-if="record.approveStatus == 2">审核驳回</span>
						<span v-if="record.approveStatus == 3">已挂起</span>
					</span>
					<span slot="receivingAudit" slot-scope="text, record">
						<span v-if="record.approveStatus == 1">--</span>
						<a
							@click="passOrAbortDelivery(record, 'APPROVED')"
							v-if="
								record.approveStatus == 0 ||
									record.approveStatus == 3
							"
							>通过</a
						>
						<a-divider
							type="vertical"
							v-if="record.approveStatus == 0"
						/>
						<a
							v-if="record.approveStatus == 0"
							@click="passOrAbortDelivery(record, 'REJECT')"
							>挂起</a
						>
					</span>
				</a-table>
			</div>
		</div>

		<AfterSaleApproveModal
			:supplierOrderNo="afterOrderNo"
			:supplierCode="supplierCode"
			:afterVisible="afterVisible"
			@change="changeVisible"
		></AfterSaleApproveModal>

		<div>
			<a-modal
				:visible="previewVisible"
				:dialog-style="{ top: '30px' }"
				:footer="null"
				@cancel="handleCancel"
			>
				<img
					class="delivery-proof-img"
					style="width: 100%"
					v-for="(item, index) in deliveryProofImgList"
					:key="index"
					:src="item"
				/>
			</a-modal>
		</div>
		<a-modal
			:visible="approveVisible"
			:title="
				auditResult === 'APPROVED'
					? '审核通过原因'
					: '审核挂起原因（必填）'
			"
			:confirm-loading="confirmLoading"
			:dialogClass="'after-sale-modal'"
			@ok="handleApproveOk"
			@cancel="handleApproveCancel"
		>
			<a-form-model layout="inline" :model="formInline" ref="modalForm">
				<a-form-model-item
					label="原因"
					prop="auditReason"
					:rules="{
						required: auditResult !== 'APPROVED',
						message: '请输入原因',
						trigger: 'blur',
					}"
				>
					<a-input
						v-model="formInline.auditReason"
						type="textarea"
						class="reason"
						:maxLength="300"
					/>
				</a-form-model-item>
        <a-form-model-item label="收货凭证" v-if="auditResult === 'APPROVED'" :rules="{required: true}" style="margin-top: 15px;">
          <a-upload
              v-for="(item, index) in imageUrlArr" :key="index"
              style="width:120px"
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :action="BASEURL"
              :headers="{Access_Token: Case_Access_Token,access_channel: 'mgmt'}"
              :before-upload="beforeUpload"
              @change="handleChange"
          >
            <div class="column-identify-pic">
              <div class="delete-pic" @click.stop="deletePic(item)">
                <a-icon
                    type="delete"
                    style="color: #fff; font-size: 30px"
                />
              </div>
              <img
                  class="picture"
                  :src="item"
                  alt="avatar"
              />
            </div>
          </a-upload>
          <a-upload v-if="imageUrlArr.length<5" style="width:120px"
                    name="file"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :action="BASEURL"
                    :headers="{Access_Token: Case_Access_Token,access_channel: 'mgmt'}"
                    :before-upload="beforeUpload"
                    @change="handleChange"
          >
            <div>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传图片</div>
            </div>
          </a-upload>
        </a-form-model-item>
			</a-form-model>
		</a-modal>
    <a-modal
        :visible="imgBoxVisible"
        :dialog-style="{ top: '30px' }"
        :footer="null"
        @cancel="imgBoxVisible = false">
      <span>查看凭证：</span>
      <div class="upload-group">
        <div v-for="(item, index) in imgListBox" :key="index" style="width: 120px;">
          <div class="column-identify-pic" @click="_seeImgItem(item)">
            <img :src="item" alt="avatar" class="picture" />
          </div>
        </div>
      </div>
    </a-modal>
    <a-modal
        :visible="previewVisibleSingle"
        :dialog-style="{ top: '30px' }"
        :footer="null"
        @cancel="handleCancelSingle">
      <div class="preview-visible-img">
        <img alt="example" style="width: 100%" :src="deliveryProofImgListItem" />
      </div>
    </a-modal>
	</div>
</template>

<script>
import {
	columns1 as columns,
	columns2 as dispatchingColumns,
	modalColumns,
	rowSelection,
	afterSaleType,
} from "./defaultConfig";
import AfterSaleApproveModal from "./afterSaleApproveModal";
import api from "@/api";
import { mapState } from "vuex";
import { ACTION_BASEURL } from "@/utils/ajax";
const BASEURL = ACTION_BASEURL+`/times-ec-anchang/admin/oss/file/upload`;

export default {
	name: "orderDetails",
	components: {
		AfterSaleApproveModal,
	},
	data() {
		return {
			orderNo: "",
			columns,
			dispatchingColumns,
			modalColumns,
			rowSelection,
			afterSaleType,
			expandedRowKeys: [],
			stepCurrent: 0,
			steps: [
				{
					title: "待发货",
					content: "Second-content",
				},
				{
					title: "进行中",
					content: "Last-content",
				},
				{
					title: "已完成",
					content: "Last-content",
				},
			],
			visible: false,
			refundReason: "",
			previewVisible: false,
			orderInfoData: {},
			orderItemListData: [],
			receiver: "",
			deliveryListData: [],
			deliveryProofImgList: [],
			afterOrderNo: "",
			supplierCode: "",
			afterVisible: false,
			approveVisible: false,
			confirmLoading: false,
			auditResult: "APPROVED",
			formInline: {
				auditReason: "",
			},
      imgBoxVisible: false,
      imgListBox: [],
      deliveryProofImgListItem: '',
      previewVisibleSingle: false,
      imageUrlArr: [],	//图片上传数组
      ACTION_BASEURL,
      BASEURL,	//图片上传路径
      loading: false,
		};
	},
	computed: mapState(["Case_Access_Token"]),
	watch: {
		Case_Access_Token(newVal, oldVal) {
			this.init();
		},
	},
	mounted() {
		if (this.Case_Access_Token) {
			this.init();
		}
	},
	methods: {
    deletePic(item) {
      this.imageUrlArr = this.imageUrlArr.filter(x => x != item);
    },
    // 图片路径处理
    checkImgStartWithHTTPS(imageUrl) {
      let res = imageUrl.substring(0, 4);
      if (res !== "http") {
        return `https://${imageUrl}`;
      } else {
        return imageUrl;
      }
    },
    /** 图片上传 **/
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        let imageUrl = this.checkImgStartWithHTTPS(
            info.file.response.data
        );
        this.loading = false;
        this.imageUrlArr.push(imageUrl);
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    _seeImgItem(item){
      this.deliveryProofImgListItem = item;
      this.previewVisibleSingle = true;
    },
    showBox(scope,index) {
      if(index === 1){
        this.imgListBox = scope.deliveryProofImgList;
      }else if(index === 2){
        this.imgListBox = scope.receiverProofImgList;
      }
      this.imgBoxVisible = true;
    },
		init() {
			this.orderNo = this.$route.params.id;
			this.getOrderInfoAction(this.orderNo);
		},
		async getOrderInfoAction(id) {
			let postData = { orderNo: id };
			try {
				let { data, code } = await api.getOrderInfo(postData);
				this.orderInfoData = data;
				if (data.orderStatus === "CANCELED") {
					this.steps = [
						{
							title: "待发货",
							content: "Second-content",
						},
						{
							title: "已关闭",
							content: "Last-content",
						},
					];
				}
				this.orderItemListData = data.orderItemList;
				this.deliveryListData = data.deliveryList;
				this.receiver = `${data.addressDto.receiverName} ${data.addressDto.receiverPhone}`;
				this.afterOrderNo = data.supplierOrderNo;
				this.supplierCode = data.supplierCode;
			} catch (err) {}
		},
		titleFn(v) {
			let str = "";
			v.forEach((ele) => {
				str += ele.featureName + " - " + ele.featureValue;
			});
			return str;
		},
		dealOrderStatus(text) {
			let str = "";
			switch (text) {
				case "WAIT_DELIVERY":
					str = "待发货";
					break;
				case "DELIVERING":
					str = "部分发货";
					this.stepCurrent = 1;
					break;
				case "WAIT_RECEIVE":
					str = "待收货";
					this.stepCurrent = 1;

					break;
				case "COMPLETED":
					str = "已完成";
					this.stepCurrent = 2;
					break;
				case "CANCELED":
					str = "已取消";

					this.stepCurrent = 3;
					break;
				case "CLOSE":
					str = "交易关闭";
					break;
				default:
					break;
			}
			return str;
		},
		checkVoucher(scope) {
			this.deliveryProofImgList = scope.deliveryProofImgList;
			this.previewVisible = true;
		},
		handleCancel() {
			this.previewVisible = false;
		},
    handleCancelSingle() {
      this.previewVisibleSingle = false;
      this.deliveryProofImgListItem = '';
    },
		applyAfter() {
			this.afterVisible = true;
		},
		changeVisible(data) {
			this.afterVisible = data;
		},
		handleOk(e) {
			this.afterVisible = false;
		},
		passOrAbortDelivery(record, type) {
			this.auditResult = type;
			this.approveVisible = true;
			this.deliveryNo = record.deliveryNo;
		},
		async deliveryApproveAction(opt) {
			let postData = {
				approveRemark: "",
				approveStatus: this.auditResult === "APPROVED" ? 1 : 3,
				deliveryNo: this.deliveryNo,
			};
			if(this.auditResult === "APPROVED"){
        postData = Object.assign(postData,{receiverProofImgList: this.imageUrlArr})
      }
			postData = { ...postData, ...opt };
			let { code } = await api.deliveryApprove(postData);
			this.approveVisible = false;
			this.confirmLoading = false;
			this.$refs.modalForm.resetFields();

			if (code == 200) {
				if (this.auditResult === "APPROVED") {
				  this.imageUrlArr = [];
					this.$message.success("已提交通过");
				} else {
					this.$message.success("已提交挂起");
				}
				this.getOrderInfoAction(this.orderNo);
			}
		},
		handleApproveOk(e) {
			this.$refs.modalForm.validate((valid) => {
				if (valid) {
          if(this.auditResult === 'APPROVED' && !this.imageUrlArr.length){
            this.$message.warning('请上传收货凭证');
            return
          }
					this.confirmLoading = true;
					this.deliveryApproveAction({
						approveRemark: this.formInline.auditReason,
					});
				}
			});
		},
		handleApproveCancel(e) {
			this.$refs.modalForm.resetFields();
			this.approveVisible = false;
		},
	},
};
</script>

<style lang="less" scoped>
@import url("./orderDetails.less");
@import url("./index.less");
</style>
