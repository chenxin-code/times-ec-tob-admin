<template>
  <div id="distributorAudit">
    <div class="content-main" style="overflow-y: auto;height: calc(100% - 45px);">
      <div style="width:100%;display: flex;align-items:center;padding: 20px 20px;">
        <div style="width:3px;height:16px;background: #4B7AFB;"></div>
        <span style="color:#666666;margin-left:5px;">配送单</span>
      </div>
      <a-table
        :columns="columns1"
        :row-key="(r,i) => i"
        :data-source="dataList"
        :scroll="{ x: 1600 }"
        :pagination="false"
        style="margin-top:8px;"
      >
        <span slot="action" slot-scope="scope">
          <a-button type="link" @click="detail(scope)">查看</a-button>
          <a-button type="link" v-if="scope.approveStatus == 0" @click="signFor(scope)">签收</a-button>
        </span>
      </a-table>
    </div>
    <div class="content-footer">
     <a-button type="primary" size="large" style="width: 120px; margin-right: 10px;" @click="FALLBACK">返回</a-button>
    </div>
    <a-modal
			v-model="isShowModal"
			title=""
			okText="确定"
			:width="1000"
      :footer="null"
			@cancel="handleCancel"
		>
			<template>
        <div class="item-list">
          <span>配送单号：{{dataListDetail.deliveryNo}}</span>
          <span>配送时间：{{dataListDetail.deliveryTime}}</span>
        </div>
        <div>
          <a-table
            :columns="columns2"
            :row-key="(r,i) => i"
            :data-source="dataListDetail.deliveryItemList"
            :scroll="{ x: 800 }"
            :pagination="false"
            style="margin-top:8px;">
            <template slot="noReceiveNum" slot-scope="scope">
              <div>
                <span>{{scope.deliveryNum - scope.receiveNum}}</span>
              </div>
            </template>
          </a-table>
        </div>
        <div class="item-list" v-if="dataListDetail.approveStatus != 0">
          <span>签收单号：{{dataListDetail.receiveNo}}</span>
          <span>签收时间：{{dataListDetail.approveTime}}</span>
          <div class="img-box" v-if="dataListDetail.receiverProofImgList && dataListDetail.receiverProofImgList.length > 0">
            <img 
              v-for="item in dataListDetail.receiverProofImgList"
              :key="item"
              :src="item" />
          </div>
        </div>
			</template>
		</a-modal>
  </div>
</template>

<script>
  import api from "@/api"
  import { mapActions } from "vuex"
  import { debounce } from "@/utils/util"
  export default {
    name: "deliveryOrder",
    data() {
      return {
        saleOrderNo: '',
        pageData: {
          pageNum: 1,
          pageSize: 10,
        },
        dataList: [],
        dataListDetail: {},
        isShowModal: false,
         //表格高度
        scrollY: 300,
         //表头数据
        columns1: [
          {
            title: "配送单号",
            dataIndex: "deliveryNo",
            key: "deliveryNo",
            width: 120,
            ellipsis: true,
          },
          {
            title: "配送时间",
            dataIndex: 'deliveryTime',
            key: "deliveryTime",
            width: 120,
            ellipsis: true,
          },
          {
            title: "签收单号",
            key: "receiveNo",
            dataIndex: "receiveNo",
            width: 120,
            ellipsis: true,
          },
          {
            title: "签收时间",
            dataIndex: "approveTime",
            key: "approveTime",
            width: 120,
            ellipsis: true,
          },
          {
            title: "状态",
            key: "approveStatus",
            dataIndex: "approveStatus",
            width: 120,
            ellipsis: true,
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
                  str = '进行中'
                  break
                default:
                  ''
                  break
              }
              return str
            },
          },
          {
            title: "操作",
            key: "operation",
            fixed: "right",
            width: 200,
            scopedSlots: {customRender: "action"},
          }
        ],
        columns2: [
          {
            title: "商品名称",
            dataIndex: "itemName",
            key: "itemName",
            ellipsis: true,
            align: 'center'
          },
          {
            title: "配送数量",
            key: "deliveryNum",
            dataIndex: 'deliveryNum',
            ellipsis: true,
            align: 'center'
          },
          {
            title: "签收数量",
            key: "receiveNum",
            dataIndex: "receiveNum",
            ellipsis: true,
            align: 'center'
          },
          {
            title: "未签收数量",
            width: 250,
            ellipsis: true,
            scopedSlots: {customRender: "noReceiveNum"},
            align: 'center'
          },
          {
            title: "备注",
            key: "payBillMark",
            dataIndex: "payBillMark",
            ellipsis: true,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this.saleOrderNo = this.$route.params.saleOrderNo
      let params = {
        saleOrderNo: this.saleOrderNo
      }
      this.getData(params)
    },
    methods: {
      ...mapActions(["FALLBACK"]),
      async getData(params) {
        try{
          let res = await api.marketDeliveryOrderList(params);
          this.dataList = res.data
        } catch(e) {
        }
      },
      // 取消
      handleCancel() {
        this.isShowModal = false
      },
      // 详情
      async detail(row) {
        this.isShowModal = true
        try {
          let params = {
            deliveryNo: row.deliveryNo
          }
          let res = await api.marketQueryInfo(params)
          this.dataListDetail = res.data
        } catch(e) {
        }
      },
      // 签收
      signFor(row) {
        this.$confirm({
          title: '签收',
          content: '确定签收？',
          centered: true,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            let params = {
              deliveryNo: row.deliveryNo,
              receiverProofImgs: row.receiverProofImgs ? row.receiverProofImgs : [],
              receiveType: 0,
              itemList: []
            }
            row.deliveryItemList.forEach(item => {
              let opt = {
                deliveryItemId: item.id,
                num: item.deliveryNum ? item.deliveryNum : 0
              }
              params.itemList.push(opt)
            })
            api.marketDeliveryOrderConfirm(params).then(res => {
              if(res.code == 200) {
                this.$message.success('签收成功')
                let params = {
                  saleOrderNo: this.saleOrderNo
                }
                this.getData(params)
              }
            })
          },
          onCancel: () => {
            console.log('Cancel');
          },
        });
      }
    }
  }
</script>

<style lang="less" scoped>
.content-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.item-list {
  padding: 10px 0;
  span {
    padding-right: 10px;
    display: inline-block;
  }
}
.img-box {
  padding-top: 10px;
  img {
    width:auto;
    height: 100px;
    margin-right: 10px;
  }
}
</style>
