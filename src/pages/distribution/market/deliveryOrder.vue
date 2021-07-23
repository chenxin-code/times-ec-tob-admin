<template>
  <div id="distributorAudit">
    <div class="content-main" style="overflow-y: auto;height: calc(100% - 45px);">
      <div style="width:100%;display: flex;align-items:center;padding: 20px 20px;">
        <div style="width:3px;height:16px;background: #4B7AFB;"></div>
        <span style="color:#666666;margin-left:5px;">配送单</span>
      </div>
      <a-table
        :columns="tableColumns"
        :row-key="(r,i) => i"
        :data-source="dataList"
        :scroll="{ x: 1600 }"
        :pagination="false"
        style="margin-top:8px;"
      >
        <span slot="action" slot-scope="scope">
          <a-button type="link"
                    @click="$router.push({path: '/account/edit', query: {id: scope.id,loginName: scope.loginName}})">编辑</a-button>
          <a-button type="link" @click="updatePwd(scope.loginName)">修改密码</a-button>
          <a-button type="link" @click="goDel(scope.loginName)">删除</a-button>
        </span>
      </a-table>
    </div>
    <div class="content-footer">
     <a-button type="primary" size="large" style="width: 120px; margin-right: 10px;" @click="FALLBACK">返回</a-button>
    </div>
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
        dataList: [],
         //表格高度
        scrollY: 300,
         //表头数据
        tableColumns: [
          {
            title: "配送单号",
            dataIndex: "itemName",
            key: "itemName",
            width: 120,
            ellipsis: true,
          },
          {
            title: "配送时间",
            key: "",
            width: 120,
            ellipsis: true,
          },
          {
            title: "签收单号",
            key: "skuCode",
            dataIndex: "skuCode",
            width: 120,
            ellipsis: true,
          },
          {
            title: "签收时间",
            dataIndex: "itemSpecs",
            key: "itemSpecs",
            width: 120,
            ellipsis: true,
          },
          {
            title: "状态",
            key: "supplierName",
            dataIndex: "supplierName",
            width: 120,
            ellipsis: true,
          },
          {
            title: "操作",
            key: "operation",
            fixed: "right",
            width: 250,
            scopedSlots: {customRender: "action"},
          }
        ]
      }
    },
    created() {
      // let params = {saleOrderNo: this.$route.params.saleOrderNo}
      // this.getData(params)
    },
    methods: {
      ...mapActions(["FALLBACK"]),
      async getData(params) {
        let res = await api.getMarketDetail(params);
        this.dataList = res.data
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
</style>
