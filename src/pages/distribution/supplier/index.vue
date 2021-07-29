<template>
  <div id="member-info" class="list-box">
    <div class="search-list">
      <div class="search-list-item">
        <span class="label-text">供应商名称：</span>
        <a-input
          placeholder="请输入供应商名称"
          class="iw250"
          v-model="searchData.supplierName"
        />
      </div>
      <div class="search-list-item">
        <span class="label-text">供应商编码：</span>
        <a-input
          placeholder="请输入供应商编码"
          class="iw250"
          v-model="searchData.insideCode"
        />
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
        <!-- 操作 -->
        <span slot="action" slot-scope="text, record">
          <a @click="checkDetails(record)">查看</a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { mapState } from 'vuex'
export default {
  name: 'supplier',
  data() {
    let columns = [
      {
        title: '供应商名称',
        dataIndex: 'supplierName',
        key: 'supplierName',
        width: 200,
        align: 'center',
      },
      {
        title: '供应商编码',
        width: 250,
        key: 'supplierCode',
        dataIndex: 'supplierCode',
        align: 'center',
      },
      {
        title: '创建时间',
        width: 250,
        key: 'createTime',
        dataIndex: 'createTime',
        align: 'center',
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 200,
        scopedSlots: { customRender: 'action' },
        align: 'center',
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
        supplierName: '', // 供应商名称
        insideCode: '', // 供应商编码
      },
      loading: false,
      dataList: [],
      //表格高度
      scrollY: 100,
    }
  },
  computed: mapState(['Case_Access_Token']),
  watch: {
    Case_Access_Token(newVal, oldVal) {
      let params = {
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        supplierName: this.searchData.supplierName, // 供应商名称
        insideCode: this.searchData.insideCode, // 供应商编码
      }
      this.getData(params)
    },
  },
  mounted() {
    if (this.Case_Access_Token) {
      let params = {
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        supplierName: this.searchData.supplierName, // 供应商名称
        insideCode: this.searchData.insideCode, // 供应商编码
      }
      this.getData(params)
    }
  },
  created() {
    const timer1 = setTimeout(() => {
      this.scrollY = document.body.clientHeight - 370 + 'px'
    }, 0)
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer1)
    })
  },
  methods: {
    // 获取列表数据
    async getData(params) {
      this.loading = true
      if (!params) {
        params = {
          pageNum: this.pageData.pageNum, // 第几页
          pageSize: this.pageData.pageSize, // 每页多少条
          supplierName: this.searchData.supplierName, // 供应商名称
          insideCode: this.searchData.insideCode, // 供应商编码
        }
      }
      try {
        let res = await api.getSupplierListByPager(params)
        this.dataList = res.data.records
        this.pageData.total = Number(res.data.total)
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      let params = {
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        supplierName: this.searchData.supplierName, // 供应商名称
        insideCode: this.searchData.insideCode, // 供应商编码
      }
      this.getData(params)
    },
    tableChange(e) {
      let { pageSize, current } = e
      this.pageData.current = current
      this.pageData.pageSize = pageSize
      this.pageData.current = e.current * 1
      this.pageData.total = e.total * 1

      let params = {
        pageNum: this.pageData.current,
        pageSize: this.pageData.pageSize,
      }
      this.getData(params)
    },
    toReset() {
      this.searchData = {
        supplierName: '', // 供应商名称
        insideCode: '', // 供应商编码
      }
      let params = {
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        supplierName: this.searchData.supplierName, // 供应商名称
        insideCode: this.searchData.insideCode, // 供应商编码
      }
      this.getData(params)
    },
    // 查看详情
    checkDetails(record) {
      this.$router.push({
        name: 'supplierdetail',
        params: {
          id: record.supplierCode,
        },
        query: {
          id: record.supplierCode,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
