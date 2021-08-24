<template>
  <div style="height: 100%;background:#fff;">
    <a-form-model
      :model="thisForm"
      layout="inline"
      ref="thisForm"
      labelAlign="left"
    >
      <a-form-model-item label="订单编号" prop="orderNo">
        <a-input v-model.trim="thisForm.orderNo" placeholder="请输入订单编号" />
      </a-form-model-item>
      <a-form-model-item class="item-btns">
        <a-button class="item-btn" type="primary" @click="getList()"
          >查询</a-button
        >
        <a-button class="item-btn" type="primary" @click="reset()"
          >重置</a-button
        >
        <a-button
          class="item-btn"
          @click="$router.push({ path: '/negative/add' })"
          type="primary"
          >新增</a-button
        >
      </a-form-model-item>
    </a-form-model>
    <div id="neighborhoodLife">
      <div class="content-main" ref="content_main">
        <a-row style="padding: 0 20px;height: 100%;">
          <a-col>
            <a-table
              :columns="tableColumns"
              :row-key="(r, i) => i"
              :data-source="tableData"
              :scroll="{ x: 1300, y: scrollY }"
              :pagination="false"
              :loading="tableLoading"
            >
              <span slot="action" slot-scope="scope">
                <a-button
                  type="link"
                  @click="
                    $router.push({
                      path: '/negative/show',
                      query: { id: scope.id, negativeNo: scope.negativeNo },
                    })
                  "
                  >查看详情</a-button
                >
                <a-button type="link" @click="goDel(scope.negativeNo)"
                  >删除</a-button
                >
              </span>
            </a-table>
            <a-pagination
              :total="total"
              :show-total="total => `共 ${total} 条`"
              show-quick-jumper
              show-size-changer
              v-model="current"
              :default-current="current"
              :page-size.sync="pageSize"
              :pageSizeOptions="['1', '10', '20', '50', '100']"
              @change="onShowSizeChange"
              @showSizeChange="onShowSizeChange"
              style="margin-top:30px;width:100%;text-align: right;"
            />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import api from './../../api'

export default {
  components: {},
  data() {
    return {
      thisForm: {
        orderNo: null,
      },
      tableColumns: [
        {
          title: '负数单编号',
          dataIndex: 'negativeNo',
          align: 'center',
          width: 250,
        },
        {
          title: '订单编号',
          dataIndex: 'saleOrderNo',
          align: 'center',
          width: 250,
        },
        {
          title: '备注',
          dataIndex: 'remark',
          align: 'center',
          width: 250,
        },
        {
          title: '创建人',
          dataIndex: 'createUserName',
          align: 'center',
          width: 200,
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center',
          width: 200,
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
      tableData: [],
      tableLoading: false,
      total: 0,
      pageSize: 10,
      current: 1,
      scrollY: 100,
    }
  },
  created() {
    const timer1 = setTimeout(() => {
      this.scrollY = document.body.clientHeight - 290 + 'px'
    }, 0)
  },
  mounted() {
    this.getList()
  },
  methods: {
    reset() {
      this.thisForm.orderNo = null
      this.current = 1
      this.pageSize = 10
      this.getList()
    },
    onShowSizeChange(current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      this.getList()
    },
    getList() {
      this.tableLoading = true
      api
        .queryNegativeList({
          ...this.thisForm,
          pageNum: this.current,
          pageSize: this.pageSize,
        })
        .then(resp => {
          if (resp.code === 200) {
            this.tableData = resp.data.records
            this.total = Number(resp.data.total)
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    goDel(negativeNo) {
      this.$confirm({
        title: `删除负数单`,
        content: `您确定要删除该负数单吗？`,
        centered: true,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.tableLoading = true
          api
            .delNegativeBill({ negativeNo: negativeNo })
            .then(resp => {
              if (resp.code === 200) {
                this.$message.success('删除成功')
                this.getList()
              }
            })
            .finally(() => {
              this.tableLoading = false
            })
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.ant-form {
  padding: 20px;

  > div {
    width: 330px;
  }

  /deep/ .ant-form-item-control-wrapper {
    width: 230px;
  }

  /deep/ .ant-calendar-picker-input {
    width: 230px;
  }

  /deep/ .ant-form-item-label {
    width: 80px;
  }

  /deep/ .item-btns {
    width: 500px !important;

    .ant-form-item-control-wrapper {
      width: 400px !important;
    }
  }

  /deep/ .item-btns .item-btn {
    margin-right: 20px;
  }
}
</style>
