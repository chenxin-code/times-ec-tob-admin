<template>
  <div style="height: 100%;display: flex;">
    <div style="width: 20%;padding: 0 15px;overflow: auto">
      <a-tree :tree-data="treeData" @select="onSelect()"></a-tree>
    </div>
    <div style="width: 80%;">
      <a-form-model :model="form" layout="inline" ref="thisForm" labelAlign='left'>
        <a-form-model-item label="企业名称" prop="a">
          <a-input v-model="form.a" placeholder="请输入企业名称" :maxLength='30'/>
        </a-form-model-item>
        <a-form-model-item class="item-btns">
          <a-button class="item-btn" type="primary" @click="getList()">查询</a-button>
          <a-button class="item-btn" @click="_toReset()">重置</a-button>
          <a-button class="item-btn" @click="newOrder()" type="primary">新增</a-button>
        </a-form-model-item>
      </a-form-model>
      <a-row style="padding: 20px;height: 100%;">
        <a-col>
          <a-table
              :columns="tableColumns"
              :row-key="(r,i) => i"
              :data-source="tableData"
              :scroll="{ x: 1000 }"
              :pagination="false"
              :loading="tableLoading"
              style="margin-top: 8px;">
              <span slot="action" slot-scope="text, record">
                <a-button type="link">编辑</a-button>
                <a-button type="link">查看token</a-button>
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
              :pageSizeOptions="['1','10','20','50','100']"
              @change="onShowSizeChange"
              @showSizeChange="onShowSizeChange"
              style="margin-top:30px;width:100%;text-align: right;"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import api from "./../../api";
export default {
  components: {},
  data() {
    return {
      treeData: [
        {
          title: '广州',
          key: '广州',
          children: [
            {
              title: '南沙',
              key: '南沙',
              children: [
                {
                  title: '金洲',
                  key: '金洲',
                  children: [
                    { title: '御城1111111111111111111111111', key: '御城' },
                    { title: '隽城', key: '隽城' },
                  ]
                },
                { title: '蕉门', key: '蕉门' },
                { title: '黄阁', key: '黄阁' },
              ],
            },
            {
              title: '天河',
              key: '天河',
            },
          ],
        },
        {
          title: '深圳',
          key: '深圳',
          children: [
            { title: '南山', key: '南山' },
            { title: '龙华', key: '龙华' },
            { title: '龙岗', key: '龙岗' },
          ],
        }
      ],
      form: {
        a: null,
      },
      tableColumns: [
        {
          title: "企业名称",
          dataIndex: "a",
          width: 200,
        },
        {
          title: "父企业名称",
          dataIndex: "b",
          width: 200,
        },
        {
          title: "企业编码",
          dataIndex: "c",
          width: 200,
        },
        {
          title: "企业状态",
          dataIndex: "d",
          width: 200,
        },
        {
          title: "经营范围",
          dataIndex: "e",
          width: 200,
        },
        {
          title: "操作",
          key: "operation",
          fixed: "right",
          width: 200,
          scopedSlots: {customRender: "action"},
        },
      ],
      tableData: [],
      tableLoading: false,
      total: 0,
      pageSize: 10,
      current: 1,
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info);
    },
    newOrder() {
      this.$router.push({path: '/company/add'});
    },
    _toReset() {
      this.$refs.thisForm.resetFields();
      this.getList();
    },
    onShowSizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
    getList() {
      this.tableData = [{
        a: 1,
        b: 1,
        c: 1,
        d: 1,
        e: 1
      }];
      return
      this.tableLoading = true;
      api.接口({
        ...this.form,
        pageNum: this.current,
        pageSize: this.pageSize,
      }).then(resp => {
        if (resp.code === 200) {
          this.tableData = resp.data.records;
          this.total = resp.data.total * 1;
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
  }
}
</script>

<style lang="less" scoped>
.ant-form {
  padding: 20px;

  > div {
    width: 350px;
  }

  /deep/ .ant-form-item-control-wrapper {
    width: 250px;
  }

  /deep/ .ant-calendar-picker-input {
    width: 250px;
  }

  /deep/ .ant-form-item-label {
    width: 100px;
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
