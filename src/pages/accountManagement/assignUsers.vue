<template>
  <div class="container-edit">
    <baseLayout :header="false">
      <template slot="content">
        <div class="content-main" ref="content_main">
          <div class="main-box row space-between-start">
            <div class="lefttab column">
              <div class="topwrap row space-between-center">
                <span class="topname">角色</span>
              </div>
              <div class="flex table_box">
                <a-table
                  :columns="tableColumns"
                  :data-source="tableData"
                  :loading="tableLoading"
                  :pagination="false"
                >
                  <template slot="empName" slot-scope="text, record">
                    <!-- :scroll="{ y: 600 }" -->
                    <div class="editable-row-operations">
                      {{ record.empName }}&nbsp;&nbsp;
                      {{ record.mobilePhone }}&nbsp;&nbsp;
                      {{ record.companyName }}&nbsp;&nbsp;
                      {{ record.departName }}
                    </div>
                  </template>
                </a-table>
              </div>
            </div>
            <div class="lefttab column">
              <div class="topwrap row">
                <span class="topname">已添加角色</span>
              </div>
              <div class="flex table_box">
                <a-table
                  :columns="tableColumnsed"
                  :row-key="(r, i) => i"
                  :data-source="tableDataed"
                  :pagination="false"
                  :loading="tableLoadinged"
                  ><template slot="empName" slot-scope="text, record">
                    <!-- :scroll="{ y: 600 }" -->
                    <div class="editable-row-operations">
                      {{ record.empName }}&nbsp;&nbsp;
                      {{ record.mobilePhone }}&nbsp;&nbsp;
                      {{ record.companyName }}&nbsp;&nbsp;
                      {{ record.departName }}
                    </div>
                  </template>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <a-button class="a-buttom-reset" type="primary">保存</a-button>
        <a-button class="a-buttom-reset" type="default" @click="$router.go(-1)"
          >返回</a-button
        >
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
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
        ellipsis: true,
        align: 'center',
      },
      {
        title: '操作',
        key: 'operation',
        scopedSlots: { customRender: 'operation' },
        width: '100px',
        align: 'center',
        fixed: 'right',
      },
    ]
    let tableColumnsed = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
        // width: 120,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '操作',
        key: 'operation',
        scopedSlots: { customRender: 'operation' },
        align: 'center',
        width: '100px',
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
    console.log(this.$route.params.id, 'this.$route.params.id')
    // this.getNoAssignRole({ userId: this.$route.params.id })
  },
  methods: {
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

    //获取还没关联的角色
    getNoAssignRole(param) {
      api.selectNoAssociateRolesByUserId(param).then(res => {})
    },
  },
}
</script>
<style lang="less" scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;
}
.center {
  align-items: center;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.flex {
  flex: 1;
}
.space-between-center {
  justify-content: space-between;
  align-items: center;
}
.space-between-start {
  justify-content: space-between;
  align-items: start;
}
.end-center {
  justify-content: flex-end;
  align-items: center;
}

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
.topwrap {
  padding: 10px 16px;
  background: #f2f2f2;
  width: 100%;
}

.lefttab {
  width: 50%;
  float: left;
  margin: 10px;
  //   min-height: 400px;
}
.table_box {
  border: 1px solid rgb(236, 234, 234);
  border-bottom: none;
}
</style>
