<template>
  <div id="distributorAudit" style="background:#fff;height:100%;">
    <div class="content-main" style="overflow-y: auto;height: calc(100% - 45px);">
      <div style="width:100%;display: flex;align-items:center;padding: 20px 20px;">
        <div style="width:3px;height:16px;background: #4B7AFB;"></div>
        <span style="color:#666666;margin-left:5px;">配送单</span>
      </div>
      <a-table
        :columns="columns1"
        :row-key="(r, i) => i"
        :data-source="dataList"
        :scroll="{ x: 1600 }"
        :pagination="false"
        style="margin-top:8px;">
        <span slot="action" slot-scope="scope">
          <a-button type="link" @click="look(scope)">查看</a-button>
          <a-button type="link" v-if="scope.approveStatus === 0" @click="sign(scope)">签收</a-button>
        </span>
      </a-table>
    </div>
    <!-- <div class="content-footer">
     <a-button type="primary" size="large" style="width: 120px; margin-right: 10px;" @click="FALLBACK">返回</a-button>
    </div> -->
    <FormSubmitButton :isShow="true" :isShowSubmit="false" />
    <!--lookModal-->
    <a-modal
      v-model="lookModal"
      title=""
      okText="确定"
      :width="1000"
      :footer="null"
      @cancel="lookModal = false">
      <template>
        <div class="item-list">
          <div>
            <span>配送单号：{{ lookData.deliveryNo }}</span>
            <span>配送时间：{{ lookData.deliveryTime }}</span>
          </div>
          <p class="red" v-if="lookData.approveStatus === 0">进行中</p>
          <p class="green" v-else-if="lookData.approveStatus === 1 || lookData.approveStatus === 2">已完成</p>
        </div>
        <div>
          <a-table
            :columns="lookColumns"
            :row-key="(r, i) => i"
            :data-source="lookData.deliveryItemList"
            :scroll="{ x: 800 }"
            :pagination="false"
            style="margin-top:8px;"
          >
            <template slot="noReceiveNum" slot-scope="scope">
              <div>
                <span>{{ scope.deliveryNum - scope.receiveNum }}</span>
              </div>
            </template>
          </a-table>
        </div>
        <div class="item-list">
          <div>
            <div class="img-box" v-if="lookData.deliveryProofImgList && lookData.deliveryProofImgList.length > 0">
              <div class="item-title">配送凭证：</div>
              <p v-for="item in lookData.deliveryProofImgList" style="margin-bottom: 10px;">
                <a :href="item">{{item}}</a>
              </p>
            </div>
          </div>
        </div>
        <div class="item-list top-line" v-if="lookData.approveStatus !== 0">
          <div>
            <span>签收单号：{{ lookData.receiveNo }}</span>
            <span>签收时间：{{ lookData.approveTime }}</span>
            <div class="img-box" v-if="lookData.receiverProofImgList && lookData.receiverProofImgList.length > 0">
              <div class="item-title">签收凭证：</div>
              <p v-for="item in lookData.receiverProofImgList" style="margin-bottom: 10px;">
                <a :href="item">{{item}}</a>
              </p>
            </div>
          </div>
        </div>
      </template>
    </a-modal>
    <!--signModal-->
    <a-modal
        v-model="signModal"
        title=""
        okText="确定"
        :width="1000"
        @cancel="signModal = false">
      <template>
        <div class="item-list">
          <div>
            <span>配送单号：{{ signData.deliveryNo }}</span>
            <span>配送时间：{{ signData.deliveryTime }}</span>
          </div>
          <p class="red" v-if="signData.approveStatus === 0">进行中</p>
          <p class="green" v-else-if="signData.approveStatus === 1 || signData.approveStatus === 2">已完成</p>
        </div>
        <div>
          <a-table
              :columns="signColumns"
              :row-key="(r, i) => i"
              :data-source="signData.deliveryItemList"
              :scroll="{ x: 800 }"
              :pagination="false"
              style="margin-top:8px;"
          >
            <template slot="hand1" slot-scope="scope">
              <a-form-model-item>
                <a-input v-model="scope.hand1" @input="$forceUpdate()" @blur="scope.hand1 = naturalFormat(scope.hand1);$forceUpdate()"/>
              </a-form-model-item>
            </template>
            <template slot="hand2" slot-scope="scope">
              <a-form-model-item>
                <a-input v-model="scope.hand2" @input="$forceUpdate()" style="width: 300px !important;"/>
              </a-form-model-item>
            </template>
          </a-table>
        </div>
        <div class="item-list">
          <div>
            <div class="img-box" v-if="signData.deliveryProofImgList && signData.deliveryProofImgList.length > 0">
              <div class="item-title">配送凭证：</div>
              <p v-for="item in signData.deliveryProofImgList" style="margin-bottom: 10px;">
                <a :href="item">{{item}}</a>
              </p>
            </div>
          </div>
        </div>
        <div style="padding: 10px 0;border-top: 1px solid #a1a1a1;">
          <p style="margin-bottom: 15px;">上传签收凭证</p>
          <a-upload
              :action="BASEURL"
              :headers="{Access_Token: Case_Access_Token,access_channel: 'mgmt'}"
              :before-upload="beforeUpload"
              :remove="handleRemove"
              @change="handleChange">
            <a-button :disabled="imageUrlArr.length >= 5">
              <a-icon type="upload" />
              {{ imageUrlArr.length >= 5 ? '上传数量限制5个' : '上传' }}
            </a-button>
          </a-upload>
        </div>
      </template>
      <template slot="footer">
        <a-button type="primary" @click="save()">保存</a-button>
      </template>
    </a-modal>
    <a-modal
      :visible="previewVisible"
      :dialog-style="{ top: '30px' }"
      :footer="null"
      @cancel="previewVisible = false;imgUrl = ''">
      <div class="preview-visible-img">
        <img alt="example" style="width: 100%" :src="imgUrl" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import api from './../../../api';
import { mapState, mapActions } from 'vuex';
import { debounce } from '@/utils/util';
import { ACTION_BASEURL } from "@/utils/ajax";
const BASEURL = ACTION_BASEURL+`/times-ec-tob-mall/admin/oss/file/upload`;

export default {
  name: 'deliveryOrder',
  computed: {
    ...mapState(["Case_Access_Token"]),
  },
  data() {
    return {
      previewVisible: false,
      imgUrl: '',
      saleOrderNo: '',
      pageData: {
        pageNum: 1,
        pageSize: 10,
      },
      dataList: [],
      lookData: {},
      signData: {},
      lookModal: false,
      signModal: false,
      //表格高度
      scrollY: 300,
      //表头数据
      columns1: [
        {
          title: '配送单号',
          dataIndex: 'deliveryNo',
          key: 'deliveryNo',
          width: 120,
        },
        {
          title: '配送时间',
          dataIndex: 'deliveryTime',
          key: 'deliveryTime',
          width: 120,
        },
        {
          title: '签收单号',
          key: 'receiveNo',
          dataIndex: 'receiveNo',
          width: 120,
        },
        {
          title: '签收时间',
          dataIndex: 'approveTime',
          key: 'approveTime',
          width: 120,
        },
        {
          title: '状态',
          key: 'approveStatus',
          dataIndex: 'approveStatus',
          width: 120,
          customRender: (text, record, index) => {
            let str = ''
            switch (record.approveStatus) {
              case 0:
                str = '进行中'
                break
              case 1:
                str = '已完成'
                break
              case 2:
                str = '已完成'
                break
              default:
                ''
                break
            }
            return str
          },
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 200,
          scopedSlots: { customRender: 'action' },
        },
      ],
      lookColumns: [
        {
          title: '商品名称',
          dataIndex: 'itemName',
          key: 'itemName',
          align: 'left',
          width: 300,
        },
        {
          title: '配送数量',
          key: 'deliveryNum',
          dataIndex: 'deliveryNum',
          align: 'left',
        },
        {
          title: '签收数量',
          key: 'receiveNum',
          dataIndex: 'receiveNum',
          align: 'left',
        },
        {
          title: '未签收数量',
          width: 250,
          scopedSlots: { customRender: 'noReceiveNum' },
          align: 'left',
        },
        {
          title: '备注',
          key: 'receiveRemark',
          dataIndex: 'receiveRemark',
          align: 'left',
        },
      ],
      signColumns: [
        {
          title: '商品名称',
          dataIndex: 'itemName',
          key: 'itemName',
          align: 'left',
          width: 300,
        },
        {
          title: '配送数量',
          key: 'deliveryNum',
          dataIndex: 'deliveryNum',
          align: 'left',
          width: 150,
        },
        {
          title: '签收数量',
          key: 'hand1',
          scopedSlots: { customRender: 'hand1' },
          align: 'left',
          width: 150,
        },
        {
          title: '备注',
          key: 'hand2',
          scopedSlots: { customRender: 'hand2' },
          align: 'left',
          width: 400,
        },
      ],
      ACTION_BASEURL,
      BASEURL,	//图片上传路径
      imageUrlArr: [],	//图片上传数组
    }
  },
  created() {
    this.saleOrderNo = this.$route.params.saleOrderNo;
    this.getData();
  },
  methods: {
    // ...mapActions(['FALLBACK']),
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('File must smaller than 2MB!');
      }
      return isLt2M;
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        return;
      }
      if (info.file.status === 'done') {
        let imageUrl = this.checkImgStartWithHTTPS(
            info.file.response.data
        );
        this.imageUrlArr.push(imageUrl);
      }
      console.log('imageUrlArr---->',this.imageUrlArr);
    },
    handleRemove(file) {
      console.log(file.response.data);
      this.imageUrlArr = this.imageUrlArr.filter(x => x !== file.response.data);
      console.log('imageUrlArr---->',this.imageUrlArr);
    },
    checkImgStartWithHTTPS(imageUrl) {
      let res = imageUrl.substring(0, 4);
      if (res !== "http") {
        return `https://${imageUrl}`;
      } else {
        return imageUrl;
      }
    },
    naturalFormat(val) {
      if (val) {
        if (/^([0]|[1-9][0-9]*)$/.test(val)) {
          return val
        } else {
          return ''
        }
      }
    },
    async getData() {
      let res = await api.marketDeliveryOrderList({saleOrderNo: this.saleOrderNo});
      this.dataList = res.data;
    },
    seeImgItem(item) {
      this.imgUrl = item
      this.previewVisible = true
    },
    async look(row) {
      let res = await api.marketQueryInfo({deliveryNo: row.deliveryNo});
      this.lookData = res.data;
      this.lookModal = true;
    },
    async sign(row) {
      let res = await api.marketQueryInfo({deliveryNo: row.deliveryNo});
      this.signData = res.data;
      this.signData.deliveryItemList.forEach((item, index) => {
        this.signData.deliveryItemList[index] = {
          ...item,
          //组装数据格式
          hand1: null,
          hand2: null,
        };
      });
      console.log('this.signData.deliveryItemList----------->',this.signData.deliveryItemList);
      this.signModal = true;
    },
    save() {
      let params = {
        deliveryNo: this.signData.deliveryNo,
        receiverProofImgs: this.imageUrlArr,
        receiveType: 1,
        itemList: [],
      };
      this.signData.deliveryItemList.forEach(item => {
        params.itemList.push({
          deliveryItemId: item.id,
          num: item.hand1 ? item.hand1 : 0,
          remark: item.hand2,
        });
      });
      api.marketDeliveryOrderConfirm(params).then(res => {
        if (res.code === 200) {
          this.$message.success('签收成功');
          this.signModal = false;
          this.getData();
        }
      });
    },
  },
}
</script>

<style lang="less" scoped>
.content-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.item-list {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  &.top-line {
    border-top: 1px solid #a1a1a1;
  }
  span {
    padding-right: 10px;
    display: inline-block;
  }
  p {
    &.red {
      color: #d9001b;
    }
    &.green {
      color: #03B615;
    }
    font-weight: 600;
    margin-right: 30px;
  }
}
.img-box {
  padding-top: 10px;
  .item-title {
    padding-bottom: 10px;
  }
  img {
    width: auto;
    height: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}
.preview-visible-img {
  padding-top: 10px;
  img {
    margin-top: 10px;
  }
}
</style>
