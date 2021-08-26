<template>
  <div class="list-box" style="background:#fff;height:100%;">
    <div class="tab">
      <a-tabs default-active-key="1" @change="switchover">
        <a-tab-pane key="1" tab="进行中"> </a-tab-pane>
        <a-tab-pane key="2" tab="已完成"> </a-tab-pane>
      </a-tabs>
    </div>

    <div class="search-list">
      <div class="search-list-item">
        <span class="label-text">订单编号：</span>
        <a-input
          placeholder="请输入订单编号"
          class="iw250"
          v-model="searchData.saleOrderNo"
        />
      </div>
      <div class="search-list-item">
        <span class="label-text">平台单号：</span>
        <a-input
          placeholder="请输入平台单号"
          class="iw250"
          v-model="searchData.thirdPurchaseNo"
        />
      </div>
      <div class="search-list-item">
        <span class="label-text">下单时间：</span>
        <a-range-picker
          class="iw250"
          v-model="searchData.dateTime"
          show-time
          format="YYYY-MM-DD"
        />
      </div>
      <div class="search-list-item">
        <span class="label-text">采购公司：</span>
        <a-select v-model="orderStatusValue" class="iw250">
          <a-select-option
            :value="item.id"
            v-for="item in orderStatusListSelect"
            :key="item.name"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </div>

      <div class="search-list-item">
        <span class="label-text">收货人：</span>
        <a-input
          placeholder="请输入收货人"
          class="iw250"
          v-model="searchData.receiver"
        />
      </div>

      <div class="search-list-item">
        <span class="label-text">城市公司：</span>
        <a-select
          :placeholder="'请选择城市公司'"
          v-model="searchData.cityCompany"
          class="iw250"
        >
          <a-select-option
            v-for="item in cityCompanyList"
            :key="item.cityCompanyCode"
            :value="item.cityCompanyCode"
          >
            {{ item.cityCompany }}
          </a-select-option>
        </a-select>
      </div>

      <div class="search-list-item" style="margin-left:30px">
        <a-button type="primary" @click="handleSearch">查询</a-button>
      </div>
      <div class="search-list-item" style="margin-left:30px">
        <a-button type="primary" @click="toReset">重置</a-button>
      </div>
    </div>

    <div class="order-table">
      <a-table
        :rowKey="record => record.id"
        :columns="columns"
        :data-source="dataList"
        :scroll="{ x: 1300, y: scrollY }"
        :pagination="pageData"
        :loading="loading"
        @change="tableChange"
      >
        <span slot="operation" slot-scope="text, record">
          <template v-if="$power('edit')">
            <a @click="applyAfterSale(record)">修改城市公司</a>
          </template>
          <template v-if="$power('query')">
            <a-divider type="vertical" />
            <a @click="checkDetails(record)">查看</a>
          </template>
          <template v-if="$power('queryOrder')">
            <a-divider type="vertical" />
            <a @click="checkDeliveryOrder(record)">查看配送订单</a>
          </template>
          <template
            v-if="
              $power('confirm') &&
                (record.comfirmFlag == null || record.comfirmFlag == 0)
            "
          >
            <a-divider type="vertical" />
            <a @click="checkConfirmOrder(record)">确认订单</a>
          </template>
        </span>
      </a-table>
    </div>
    <AfterSaleApproveModal
      :row="rowData"
      :visible="afterVisible"
      @changeHandle="changeHandle"
    ></AfterSaleApproveModal>
  </div>
</template>

<script>
import AfterSaleApproveModal from './afterSaleApproveModal'
import moment from 'moment'
import api from '@/api'
import { mapState } from 'vuex'
export default {
  name: 'market',
  components: {
    AfterSaleApproveModal,
  },
  data() {
    let orderStatusListSelect = []
    let columns = [
      {
        title: '订单编号',
        dataIndex: 'saleOrderNo',
        key: 'saleOrderNo',
        width: 250,
        align: 'left',
      },
      {
        title: '平台单号',
        dataIndex: 'thirdPurchaseNo',
        key: 'thirdPurchaseNo',
        width: 250,
        align: 'left',
      },
      {
        title: '采购公司(出账公司)',
        width: 250,
        align: 'left',
        key: 'purchaseCompany',
        dataIndex: 'purchaseCompany',
        align: 'left',
      },
      {
        title: '收货信息',
        width: 300,
        align: 'left',
        key: 'receiverAddress',
        dataIndex: 'receiverAddress',
        // scopedSlots: { customRender: 'receiverAddress' },
        align: 'left',
      },
      {
        title: '支付方式',
        width: 100,
        align: 'left',
        key: 'payWay',
        customRender: (text, record, index) => {
          let str = ''
          switch (record.payWay) {
            case 'ONLINE':
              str = '线上'
              break
            case 'OFFLINE':
              str = '线下'
              break
            default:
              ''
              break
          }
          return str
        },
        align: 'left',
      },
      {
        title: '税前订单总额（元）',
        dataIndex: 'totalPretaxAmount',
        key: 'totalPretaxAmount',
        width: 200,
        align: 'left',
      },
      {
        title: '税后订单总额（元）',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        width: 200,
        align: 'left',
      },
      {
        title: '税前优惠总额（元）',
        dataIndex: 'totalPretaxReducedAmount',
        key: 'totalPretaxReducedAmount',
        width: 200,
        align: 'left',
      },
      {
        title: '税后优惠总额（元）',
        dataIndex: 'totalReducedAmount',
        key: 'totalReducedAmount',
        width: 200,
        align: 'left',
      },
      {
        title: '下单时间',
        dataIndex: 'orderTime',
        key: 'orderTime',
        width: 200,
        align: 'left',
      },
      {
        title: '账套名称',
        dataIndex: 'financialAccounting',
        key: 'financialAccounting',
        width: 200,
        align: 'left',
      },
      {
        title: '城市公司',
        dataIndex: 'cityCompany',
        key: 'cityCompany',
        width: 150,
        align: 'left',
      },
      {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
        width: 200,
        align: 'left',
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 350,
        align: 'right',
        scopedSlots: { customRender: 'operation' },
      },
    ]
    let pageData = {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      current: 1,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40'],
      showTotal: total => `共有${total}条`,
      showSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      showQuickJumper: true,
      onChange: pageNum => (this.pageNum = pageNum),
    }
    return {
      columns,
      pageData,
      searchData: {
        saleOrderNo: '', // 订单编号
        dateTime: [], // 时间
        orderTimeStart: '', // 开始时间
        orderTimeEnd: '', // 结束时间
        purchaseCompany: '', // 采购公司
        receiver: '', // 收货人 模糊查询
        cityCompany: undefined, // 城市公司
        thirdPurchaseId: '', //平台单号
      },
      orderState: 'PROCESSING',
      loading: false,
      dataList: [],
      cityCompanyList: [],
      orderStatusValue: '', // 采购公司 城市公司
      orderStatusListSelect,
      afterVisible: false,
      endOpen: false,
      rowData: {},
      //表格高度
      scrollY: 100,
    }
  },
  computed: mapState(['Case_Access_Token']),
  watch: {
    Case_Access_Token(newVal, oldVal) {
      this.getData()
    },
    orderStatusValue(val) {
      let emptyArr = []
      switch (val) {
        case '0':
          emptyArr = []
          break
        case '1':
          emptyArr = ['WAIT_DELIVERY']
          break
        case '2':
          emptyArr = ['DELIVERING', 'WAIT_RECEIVE']
          break
        default:
          break
      }
      this.orderStatusListSearch = emptyArr
    },
  },
  mounted() {
    if (this.Case_Access_Token) {
      this.getData()
      this.getCityCompanyList()
    }
  },
  created() {
    const timer1 = setTimeout(() => {
      this.scrollY = document.body.clientHeight - 390 + 'px'
    }, 0)
    // this.$once('hook:beforeDestroy', () => {
    //   clearTimeout(timer1)
    // })
  },
  methods: {
    // 获取列表数据
    async getData(params) {
      this.loading = true
      params = {
        orderState: this.orderState, // 订单状态 进行中 已完成
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        saleOrderNo: this.searchData.saleOrderNo, // 订单编号
        thirdPurchaseNo: this.searchData.thirdPurchaseNo, // 平台单号
        orderTimeStart:
          this.searchData.dateTime.length > 0
            ? this.parseDate(this.searchData.dateTime[0])
            : '', // 开始时间
        orderTimeEnd:
          this.searchData.dateTime.length > 0
            ? this.parseDate(this.searchData.dateTime[1], true)
            : '', // 结束时间
        purchaseCompany: this.searchData.purchaseCompany, // 采购公司
        receiver: this.searchData.receiver, // 收货人 模糊查询
        cityCompany: this.searchData.cityCompany, // 城市公司
      }
      try {
        let res = await api.getMarketOrderList(params)
        this.dataList = res.data.records
        this.pageData.total = Number(res.data.total)
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.pageData.current = 1
      this.getData()
    },
    parseDate(date, isEnd) {
      let str = undefined
      if (date) {
        let oDate = new Date(date)
        str =
          oDate.getFullYear() +
          '-' +
          (oDate.getMonth() + 1) +
          '-' +
          oDate.getDate()
      }
      if (!isEnd) {
        str = str + ' 00:00:00'
      } else {
        str = str + ' 23:59:59'
      }
      return str
    },
    //分页
    tableChange(e) {
      let { pageSize, current } = e
      this.pageData.current = current
      this.pageData.pageSize = pageSize
      this.getData()
    },
    toReset() {
      this.searchData = {
        saleOrderNo: '', // 订单编号
        dateTime: [],
        orderTimeStart: '', // 开始时间
        orderTimeEnd: '', // 结束时间
        purchaseCompany: '', // 采购公司
        receiver: '', // 收货人 模糊查询
        cityCompany: undefined, // 城市公司
        thirdPurchaseId: '',
      }
      this.pageData.current = 1
      this.getData()
    },
    // 查看详情
    checkDetails(row) {
      this.$router.push({
        name: 'marketdetail',
        params: {
          saleOrderNo: row.saleOrderNo,
        },
      })
    },
    // 查看配送订单
    checkDeliveryOrder(row) {
      this.$router.push({
        name: 'deliveryOrder',
        params: {
          saleOrderNo: row.saleOrderNo,
        },
      })
    },
    //确认订单
    checkConfirmOrder(row) {
      let that = this
      this.$confirm({
        title: `您确定要确认该订单吗?`,
        centered: true,
        onOk() {
          api
            .marketOrderConfirmApply({
              confirmFlag: 1,
              thirdPurchaseId: row.thirdPurchaseId,
            })
            .then(res => {
              if (res.code == 200) {
                that.$message.info(`${type}成功`)
                that.getData()
              }
            })
            .finally(err => {})
        },
        onCancel() {},
      })
    },
    // 获取城市公司
    async getCityCompanyList() {
      try {
        let res = await api.getMarketCompanyList()
        this.cityCompanyList = res.data
      } finally {
      }
    },
    applyAfterSale(record) {
      this.rowData = record
      this.afterVisible = true
    },
    // 选项卡切换 进行中 已完成
    switchover(key) {
      switch (key) {
        case '1':
          this.orderState = 'PROCESSING'
          break
        case '2':
          this.orderState = 'FINISHED'
          break
        default:
          break
      }
      let params = {
        orderState: this.orderState, // 订单状态 进行中 已完成
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        saleOrderNo: this.searchData.saleOrderNo, // 订单编号
        thirdPurchaseId: this.searchData.thirdPurchaseId, // 平台单号
        orderTimeStart:
          this.searchData.dateTime.length > 0
            ? this.parseDate(this.searchData.dateTime[0])
            : '', // 开始时间
        orderTimeEnd:
          this.searchData.dateTime.length > 0
            ? this.parseDate(this.searchData.dateTime[1], true)
            : '', // 结束时间
        purchaseCompany: this.searchData.purchaseCompany, // 采购公司
        receiver: this.searchData.receiver, // 收货人 模糊查询
        cityCompany: this.searchData.cityCompany, // 城市公司
      }
      this.pageData.current = 1
      this.getData(params)
    },
    changeHandle() {
      this.afterVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
@import url('./index.less');
/deep/.ant-table-tbody > tr {
  height: 53.6px;
}
</style>
