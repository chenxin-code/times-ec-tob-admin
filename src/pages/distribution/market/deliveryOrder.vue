<template>
  <div id="distributorAudit" style="height:100%;">
    <baseLayout :header="false">
      <template slot="content">
        <div class="content-main" style="height: calc(100% - 20px);">
          <div
            style="width:100%;display: flex;align-items:center;padding: 20px 20px;"
          >
            <div style="width:3px;height:16px;background: #4B7AFB;"></div>
            <span style="color:#666666;margin-left:5px;">配送单</span>
          </div>
          <a-table
            :columns="columns1"
            :row-key="(r, i) => i"
            :data-source="dataList"
            :scroll="{ x: 1600 }"
            :pagination="false"
            style="margin-top:8px;"
          >
            <span slot="action" slot-scope="scope">
              <a-button type="link" @click="look(scope)">查看</a-button>
              <a-button
                type="link"
                v-if="scope.approveStatus === 0"
                @click="sign(scope)"
                >签收</a-button
              >
            </span>
          </a-table>
        </div>
      </template>
      <template slot="footer">
        <a-button class="a-buttom-reset" type="default" @click="$router.go(-1)"
          >返回</a-button
        >
      </template>
    </baseLayout>
    <!--lookModal-->
    <a-modal
      v-model="lookModal"
      title=""
      okText="确定"
      :width="1000"
      :footer="null"
      :destroyOnClose="true"
      @cancel="lookModal = false"
    >
      <template>
        <div class="item-list">
          <div>
            <span>配送单号：{{ lookData.deliveryNo }}</span>
            <span>配送时间：{{ lookData.deliveryTime }}</span>
          </div>
          <p class="red" v-if="lookData.approveStatus === 0">进行中</p>
          <p
            class="green"
            v-else-if="
              lookData.approveStatus === 1 || lookData.approveStatus === 2
            "
          >
            已完成
          </p>
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
            <div
              class="img-box"
              v-if="
                lookData.deliveryProofImgList &&
                  lookData.deliveryProofImgList.length > 0
              "
            >
              <div class="item-title">配送凭证：</div>
              <p
                v-for="(item, index) in lookData.deliveryProofImgList"
                :key="item"
                style="margin-bottom: 10px;"
              >
                <a :href="item" download="">{{
                  lookData.deliveryImgList[index]
                }}</a>
              </p>
            </div>
          </div>
        </div>
        <div class="item-list top-line" v-if="lookData.approveStatus !== 0">
          <div>
            <span>签收单号：{{ lookData.receiveNo }}</span>
            <span>签收时间：{{ lookData.approveTime }}</span>
            <div
              class="img-box"
              v-if="
                lookData.receiverProofImgList &&
                  lookData.receiverProofImgList.length > 0
              "
            >
              <div class="item-title">签收凭证：</div>
              <p
                v-for="(item, index) in lookData.receiverProofImgList"
                :key="item"
                style="margin-bottom: 10px;"
              >
                <a :href="item" download="">{{
                  lookData.receiverImgList[index]
                }}</a>
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
      :destroyOnClose="true"
      @cancel="signModalCancel"
    >
      <template>
        <div class="item-list">
          <div>
            <span>配送单号：{{ signData.deliveryNo }}</span>
            <span>配送时间：{{ signData.deliveryTime }}</span>
          </div>
          <p class="red" v-if="signData.approveStatus === 0">进行中</p>
          <p
            class="green"
            v-else-if="
              signData.approveStatus === 1 || signData.approveStatus === 2
            "
          >
            已完成
          </p>
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
                <a-input
                  v-model="scope.hand1"
                  placeholder="请输入自然数"
                  @input="$forceUpdate()"
                  @blur="
                    scope.hand1 = naturalFormat(scope.hand1, scope.deliveryNum)
                    $forceUpdate()
                  "
                />
              </a-form-model-item>
            </template>
            <template slot="hand2" slot-scope="scope">
              <a-form-model-item>
                <a-input
                  v-model="scope.hand2"
                  :maxLength="50"
                  @input="$forceUpdate()"
                  style="width: 300px !important;"
                />
              </a-form-model-item>
            </template>
          </a-table>
        </div>
        <div class="item-list">
          <div>
            <div
              class="img-box"
              v-if="
                signData.deliveryProofImgList &&
                  signData.deliveryProofImgList.length > 0
              "
            >
              <div class="item-title">配送凭证：</div>
              <p
                v-for="(item, index) in signData.deliveryProofImgList"
                :key="item"
                style="margin-bottom: 10px;"
              >
                <a :href="item" download="">{{
                  signData.deliveryImgList[index]
                }}</a>
              </p>
            </div>
          </div>
        </div>
        <div style="padding: 10px 0;border-top: 1px solid #a1a1a1;">
          <p style="margin-bottom: 15px;">上传签收凭证</p>
          <a-upload
            list-type="picture"
            :action="BASEURL"
            :headers="{
              Access_Token: Case_Access_Token,
              access_channel: 'mgmt',
            }"
            :before-upload="beforeUpload"
            :remove="handleRemove"
            @change="handleChange"
          >
            <a-button :disabled="imageUrlArr.length >= 10">
              <a-icon type="upload" />
              {{ imageUrlArr.length >= 10 ? '上传数量限制10个' : '上传' }}
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
      @cancel="
        previewVisible = false
        imgUrl = ''
      "
    >
      <div class="preview-visible-img">
        <img alt="example" style="width: 100%" :src="imgUrl" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import api from './../../../api'
import { mapState, mapActions } from 'vuex'
import { debounce } from '@/utils/util'
import { ACTION_BASEURL } from '@/utils/ajax'
const BASEURL = ACTION_BASEURL + `/times-ec-tob-mall/admin/oss/file/upload`

export default {
  name: 'deliveryOrder',
  computed: {
    ...mapState(['Case_Access_Token']),
  },
  data() {
    return {
      previewVisible: false,
      imgUrl: '',
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
          align: 'center',
          width: 120,
        },
        {
          title: '配送时间',
          dataIndex: 'deliveryTime',
          key: 'deliveryTime',
          align: 'center',
          width: 120,
        },
        {
          title: '签收单号',
          key: 'receiveNo',
          dataIndex: 'receiveNo',
          align: 'center',
          width: 120,
        },
        {
          title: '签收时间',
          dataIndex: 'approveTime',
          key: 'approveTime',
          align: 'center',
          width: 120,
        },
        {
          title: '状态',
          key: 'approveStatus',
          dataIndex: 'approveStatus',
          align: 'center',
          width: 80,
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
          align: 'center',
          width: 200,
          scopedSlots: { customRender: 'action' },
        },
      ],
      lookColumns: [
        {
          title: '商品名称',
          dataIndex: 'itemName',
          key: 'itemName',
          align: 'center',
          width: 300,
        },
        {
          title: '配送数量',
          key: 'deliveryNum',
          dataIndex: 'deliveryNum',
          align: 'center',
          width: 120,
        },
        {
          title: '签收数量',
          key: 'receiveNum',
          dataIndex: 'receiveNum',
          align: 'center',
          width: 120,
        },
        {
          title: '未签收数量',
          scopedSlots: { customRender: 'noReceiveNum' },
          align: 'center',
          width: 120,
        },
        {
          title: '备注',
          key: 'receiveRemark',
          dataIndex: 'receiveRemark',
          align: 'center',
          width: 300,
        },
      ],
      signColumns: [
        {
          title: '商品名称',
          dataIndex: 'itemName',
          key: 'itemName',
          align: 'center',
          width: 300,
        },
        {
          title: '配送数量',
          key: 'deliveryNum',
          dataIndex: 'deliveryNum',
          align: 'center',
          width: 120,
        },
        {
          title: '签收数量',
          key: 'hand1',
          scopedSlots: { customRender: 'hand1' },
          align: 'center',
          width: 150,
        },
        {
          title: '备注',
          key: 'hand2',
          scopedSlots: { customRender: 'hand2' },
          align: 'center',
          width: 300,
        },
      ],
      ACTION_BASEURL,
      BASEURL, //图片上传路径
      imageUrlArr: [], //图片上传数组
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // ...mapActions(['FALLBACK']),
    beforeUpload(file) {
      return true //暂不限制文件大小
      const isLt2M = file.size / 1024 / 1024 <= 2
      if (!isLt2M) {
        this.$message.error('文件大小不能超过2MB')
      }
      return isLt2M
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        return
      }
      if (info.file.status === 'done') {
        let imageUrl = this.checkImgStartWithHTTPS(info.file.response.data)
        this.imageUrlArr.push(imageUrl)
      }
    },
    handleRemove(file) {
      this.imageUrlArr = this.imageUrlArr.filter(x => x !== file.response.data)
    },
    checkImgStartWithHTTPS(imageUrl) {
      let res = imageUrl.substring(0, 4)
      if (res !== 'http') {
        return `https://${imageUrl}`
      } else {
        return imageUrl
      }
    },
    naturalFormat(hand1, deliveryNum) {
      if (hand1) {
        if (/^([0]|[1-9][0-9]*)$/.test(hand1)) {
          if (hand1 > deliveryNum) {
            this.$message.error(
              '签收数量不能大于配送数量【' + deliveryNum + '】'
            )
            return ''
          } else {
            return hand1
          }
        } else {
          this.$message.error('签收数量必须是自然数')
          return ''
        }
      }
    },
    async getData() {
      let res = await api.marketDeliveryOrderList({
        saleOrderNo: this.$route.query.saleOrderNo,
      })
      this.dataList = res.data
    },
    seeImgItem(item) {
      this.imgUrl = item
      this.previewVisible = true
    },
    async look(row) {
      let res = await api.marketQueryInfo({ deliveryNo: row.deliveryNo })
      if (res.code == 200) {
        let deliveryImgList = [],
          receiverImgList = []
        if (res.data.deliveryProofImgList.length > 0) {
          res.data.deliveryProofImgList.map(item => {
            deliveryImgList.push(item.split('/times-ec-erp/')[1])
          })
          res.data.deliveryImgList = deliveryImgList
        }
        if (res.data.receiverProofImgList.length > 0) {
          res.data.receiverProofImgList.map(item => {
            receiverImgList.push(item.split('/times-ec-tob-mall/')[1])
          })
          res.data.receiverImgList = receiverImgList
        }
        this.lookData = res.data
        this.lookModal = true
      }
    },
    async sign(row) {
      let res = await api.marketQueryInfo({ deliveryNo: row.deliveryNo })
      if (res.code == 200) {
        let deliveryImgList = []
        if (res.data.deliveryProofImgList.length > 0) {
          res.data.deliveryProofImgList.map(item => {
            deliveryImgList.push(item.split('/times-ec-erp/')[1])
          })
          res.data.deliveryImgList = deliveryImgList
        }
        this.signData = res.data
        this.signData.deliveryItemList.forEach((item, index) => {
          this.signData.deliveryItemList[index] = {
            ...item,
            //组装数据格式
            hand1: null,
            hand2: null,
          }
        })
        this.signModal = true
      }
    },
    signModalCancel() {
      this.signModal = false
      this.imageUrlArr = []
    },
    save() {
      debounce(() => {
        let checkHand1 = this.signData.deliveryItemList.every(item => {
          return item.hand1
        })
        if (!checkHand1) {
          this.$message.error('请填写签收数量')
          return
        }
        if (this.imageUrlArr.length === 0) {
          this.$message.error('请上传签收凭证')
          return
        }
        let params = {
          deliveryNo: this.signData.deliveryNo,
          receiverProofImgs: this.imageUrlArr,
          receiveType: 1,
          itemList: [],
        }
        this.signData.deliveryItemList.forEach(item => {
          params.itemList.push({
            deliveryItemId: item.id,
            num: item.hand1 ? item.hand1 : 0,
            remark: item.hand2,
          })
        })
        api.marketDeliveryOrderConfirm(params).then(res => {
          if (res.code === 200) {
            this.$message.success('签收成功')
            this.signModal = false
            this.imageUrlArr = []
            this.getData()
          }
        })
      }, 500)
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
      color: #03b615;
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
