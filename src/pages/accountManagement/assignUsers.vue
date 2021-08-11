<template>
  <div class="container-edit">
    <baseLayout>
      <template slot="content">
        <div class="content-main" ref="content_main">
          <a-form-model
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 18 }"
            style="padding:30px 10px;"
          >
            <div class="lefttab">
              <div class="topwrap">
                <span class="topname">搜索用户：</span>
                <a-input
                  v-model="searchData.phone"
                  type="tel"
                  max-length.number="11"
                  placeholder="输入手机号查询"
                  style="width:50%"
                />
                <a-button type="primary" @click="searchByPhone">查询</a-button>
              </div>
              <a-table
                :columns="tableColumns"
                :row-key="(r, i) => i"
                :data-source="tableData"
                :scroll="{ x: 600, y: 500 }"
                :pagination="false"
                :loading="tableLoading"
                style="margin-top: 8px"
                ><template slot="operation" slot-scope="record">
                  <div class="editable-row-operations">
                    <a @click="add(record)">添加</a>
                  </div>
                </template>
              </a-table>
            </div>
            <div class="lefttab">
              <div class="topwrap">
                <span class="topname">角色已添加</span>
              </div>
              <a-table
                :columns="tableColumnsed"
                :row-key="(r, i) => i"
                :data-source="tableDataed"
                :scroll="{ x: 600, y: 500 }"
                :pagination="false"
                :loading="tableLoadinged"
                style="margin-top: 8px"
                ><template slot="operation" slot-scope="record">
                  <div class="editable-row-operations">
                    <a @click="del(record)">删除</a>
                  </div>
                </template>
              </a-table>
              <a-pagination
                size="small"
                :total="pageData.total"
                :show-total="total => `共 ${total} 条`"
                v-model="pageData.current"
                :default-current="pageData.current"
                :page-size.sync="pageData.pageSize"
                :pageSizeOptions="['10', '20', '50', '100']"
                @change="onShowSizeChangeed"
                @showSizeChange="onShowSizeChangeed"
                style="margin-top: 30px; width: 40%; text-align: left;"
              />
            </div>
          </a-form-model>
        </div>
      </template>
      <template slot="footer">
        <a-button class="a-buttom-reset" type="primary">保存</a-button>
      </template>
    </baseLayout>
  </div>
</template>
<script>
import api from '@/api'
export default {
  data() {
    let tableColumns = [
      {
        title: '序号',
        customRender: (text, record, index) => `${index + 1}`,
        width: 80,
        align: 'center',
      },
      {
        title: '角色',
        dataIndex: 'empName',
        key: 'empName',
        ellipsis: true,
      },
      {
        title: '手机号',
        dataIndex: 'mobilePhone',
        key: 'mobilePhone',
        width: 120,
        ellipsis: true,
      },
      // {
      //   title: "公司",
      //   dataIndex: "companyName",
      //   key: "companyName",
      //   width: 120,
      //   ellipsis: true,
      // },
      // {
      //   title: "部门",
      //   dataIndex: "departmentName",
      //   key: "departmentName",
      //   ellipsis: true,
      // },
      {
        title: '操作',
        key: 'operation',
        scopedSlots: { customRender: 'operation' },
        // width: 260,
        fixed: 'right',
      },
    ]
    let tableColumnsed = [
      {
        title: '序号',
        customRender: (text, record, index) => `${index + 1}`,
        width: 60,
        align: 'center',
      },
      {
        title: '角色',
        dataIndex: 'roleName',
        key: 'roleName',
        // width: 120,
        ellipsis: true,
      },
      {
        title: '操作',
        key: 'operation',
        scopedSlots: { customRender: 'operation' },
        width: 60,
        fixed: 'right',
      },
    ]
    let pageData = {
      total: 0, // 总条数
      current: 1,
      pageNum: 1,
      pageSize: 10,
    }
    let searchData = {
      phone: undefined, // 手机号
    }
    return {
      tableColumns,
      tableColumnsed,
      pageData,
      searchData,
      tableData: [],
      tableDataed: [],
      tableLoading: false,
      tableLoadinged: false,
    }
  },
  mounted() {
    // this.getHasAddList()
  },
  methods: {
    // 手机号搜索用户
    async searchByPhone() {
      let params = {
        phone: this.searchData.phone,
      }
      this.tableLoading = true

      try {
        let res = await api.operatorGetUnifyEmployeeInfoByPhone(params)
        if (res.code == 200) {
          this.tableData = [res.data]
        }
      } finally {
        this.tableLoading = false
      }
    },
    // 添加
    async add(row) {
      this.tableLoading = true
      let params = {
        name: row.empName,
        originalEmpId: row.empId || 0,
        originalId: row.userId,
        phone: row.mobilePhone,
        roleId: this.$route.params.id,
        userName: row.userName,
      }
      try {
        let res = await api.operatorSave(params)
        if (res.code == 200) {
          this.$message.success('添加成功')
          this.pageData.current = 1
          this.pageData.pageNum = 1
          this.getHasAddList()
        }
      } finally {
        this.tableLoading = false
      }
    },
    // 删除
    async del(row) {
      this.tableLoadinged = true
      let params = {
        roleId: this.$route.params.id,
        userId: row.id,
      }
      try {
        let res = await api.operatorDelete(params)
        if (res.code == 200) {
          this.pageData.current = 1
          this.pageData.pageNum = 1
          this.getHasAddList()
        }
      } finally {
        this.tableLoadinged = false
      }
    },
    // 获取角色列表数据
    async getHasAddList(params) {
      this.tableLoadinged = true
      if (!params) {
        params = {
          pageNum: this.pageData.pageNum, // 第几页
          pageSize: this.pageData.pageSize, // 每页多少条
          roleId: this.$route.params.id, // roleId
        }
      }
      try {
        let res = await api.operatorGetListByPager(params)
        if (res.code == 200) {
          this.tableDataed = res.data.records
          this.pageData.total = Number(res.data.total)
        }
      } finally {
        this.tableLoadinged = false
      }
    },
    // 分页
    onShowSizeChangeed(current, pageSize) {
      this.pageData.current = current
      this.pageData.pageSize = pageSize
      this.getHasAddList()
    },
  },
}
</script>
<style lang="less" scoped>
.container-edit {
  position: relative;
  height: 100%;
  .ant-form-item {
    margin-bottom: 0;
  }
}
.a-buttom-reset {
  margin-left: 15px;
  margin-bottom: 10px;
}
.topname {
  margin: 80px 15% 80px 15px;
  clear: both;
  line-height: 30px;
}
.lefttab {
  width: 45%;
  padding: 10px;
  float: left;
  margin: 10px;
  border: 1px solid rgb(236, 234, 234);
  min-height: 400px;
}
</style>
