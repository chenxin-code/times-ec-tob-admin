<template>
  <div class="container-edit">
    <baseLayout :header="false">
      <template slot="content">
        <div class="content-main" ref="content_main">
          <a-form-model :label-col="{ span: 3 }" :wrapper-col="{ span: 18 }">
            <div class="main-box row space-between-start">
              <div class="lefttab column">
                <div class="topwrap row space-between-center">
                  <span class="topname">搜索用户：</span>
                  <div class="row end-center">
                    <a-input
                      v-model="searchData.phone"
                      type="tel"
                      max-length.number="11"
                      placeholder="输入手机号查询"
                      style="width:50%"
                    />
                    <a-button
                      class="searchButton"
                      type="primary"
                      @click="searchByPhone"
                      >查询</a-button
                    >
                  </div>
                </div>
                <div class="">
                  <a-table
                    :columns="tableColumns"
                    :row-key="(r, i) => i"
                    :data-source="tableData"
                    :scroll="{ y: 600 }"
                    :row-selection="rowSelection"
                    :loading="tableLoading"
                    :pagination="false"
                  >
                    <template slot="operation" slot-scope="record">
                      <div class="editable-row-operations">
                        <a @click="add(record)">添加</a>
                      </div>
                    </template>
                  </a-table>
                </div>
              </div>
              <div class="column operationButton">
                <a-button type="default" class="iconbutton" @click="toRight">
                  <a-icon type="right" />
                </a-button>
                <a-button type="default" class="iconbutton" @click="toLeft">
                  <a-icon type="left" />
                </a-button>
              </div>
              <div class="lefttab column">
                <div class="topwrap row">
                  <span class="topname">已添加</span>
                </div>
                <a-table
                  :columns="tableColumnsed"
                  :row-key="(r, i) => i"
                  :data-source="tableDataed"
                  :scroll="{ y: 600 }"
                  :pagination="false"
                  :loading="tableLoadinged"
                  :row-selection="rowSelectionRight"
                  ><template slot="operation" slot-scope="record">
                    <div class="editable-row-operations">
                      <a @click="del(record)">删除</a>
                    </div>
                  </template>
                </a-table>
              </div>
            </div>
          </a-form-model>
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
        title: '用户名称',
        dataIndex: 'empName',
        key: 'empName',
        align: 'center',
        ellipsis: true,
      },
    ]
    let tableColumnsed = [
      {
        title: '用户名称',
        dataIndex: 'empName',
        key: 'empName',
        align: 'center',
        ellipsis: true,
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
    //左边的checkbox配置
    const rowSelection = {
      onChange: this.leftTableChange,
      selectedRowKeys: this.selectedLeft,
    }
    //右边的checkbox配置
    const rowSelectionRight = {
      onChange: this.rightTableChange,
      selectedRowKeys: this.selectedRight,
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
      rowSelection,
      rowSelectionRight,
      leftSelect: [],
      rightSelect: [],
      selectedLeft: [],
      selectedRight: [],
    }
  },
  mounted() {
    // this.getHasAddList()
    this.tableData = [
      {
        empName: '用户名称0',
        phone: '13560086925',
        company: '广州时代公司单',
        parment: '销售部',
        key: 1,
        id: 1,
      },
      {
        empName: '用户名称1',
        phone: '13560086925',
        company: '广州时代公司单',
        parment: '销售部',
        key: 2,
        id: 2,
      },
      {
        empName: '用户名称2',
        phone: '13560086925',
        company: '广州时代公司单',
        parment: '销售部',
        key: 3,
        id: 3,
      },
    ]
    this.tableDataed = [
      //   {
      //     empName: '用户名称',
      //     phone: '13560086925',
      //     company: '广州时代公司单',
      //     parment: '销售部',
      //     key: 1,
      //     id: 1,
      //   },
      //   {
      //     empName: '用户名称',
      //     phone: '13560086925',
      //     company: '广州时代公司单',
      //     parment: '销售部',
      //     key: 2,
      //     id: 2,
      //   },
      //   {
      //     empName: '用户名称',
      //     phone: '13560086925',
      //     company: '广州时代公司单',
      //     parment: '销售部',
      //     key: 3,
      //     id: 3,
      //   },
    ]
  },
  methods: {
    // 手机号搜索用户
    async searchByPhone() {
      let params = {
        phone: this.searchData.phone,
      }
      this.tableLoading = true
      let reg = /^1[3456789]\d{9}$/
      try {
        if (reg.test(this.searchData.phone)) {
          let res = await api.operatorGetUnifyEmployeeInfoByPhone(params)
          if (res.code == 200) {
            this.tableData = [res.data]
          }
        } else {
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
    //左边checkbox选择
    leftTableChange(selectedRowKeys, selectedRows) {
      this.leftSelect = selectedRows
    },
    //右边checkbox选择
    rightTableChange(selectedRowKeys, selectedRows) {
      this.rightSelect = selectedRows
    },
    //左边数据移除到右边
    toRight() {
      let { leftSelect, tableData, tableDataed, selectedRowKeys } = this
      if (leftSelect.length > 0) {
        this.tableDataed = tableDataed.concat(leftSelect)
        let newArray = tableData
        if (leftSelect.length == tableData.length) {
          return (this.tableData = [])
        }
        leftSelect.map((item, index) => {
          let findIndex = newArray.findIndex(items => {
            return items.id == item.id
          })
          if (findIndex !== -1) {
            newArray.splice(findIndex, 1)
          }
        })
        this.tableData = newArray
        this.selectedLeft = []
        this.leftSelect = []
      }
    },
    //右边数据移除到左边
    toLeft() {
      let { rightSelect, tableData, tableDataed } = this
      if (rightSelect.length > 0) {
        this.tableData = tableData.concat(rightSelect)
        let newArray = tableDataed
        if (rightSelect.length == tableDataed.length) {
          return (this.tableDataed = [])
        }
        rightSelect.map((item, index) => {
          let findIndex = newArray.findIndex(items => {
            return items.id == item.id
          })
          if (findIndex !== -1) {
            newArray.splice(findIndex, 1)
          }
        })
        this.tableDataed = newArray
        this.selectedRight = []
        this.rightSelect = []
      }
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
.row {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
.ant-form {
  height: 100%;
}
.main-box {
  height: 100%;
  padding: 20px;
}
.topwrap {
  padding: 20px;
  width: 100%;
}
.operationButton {
  height: 100%;
}
.lefttab {
  width: 45%;
  float: left;
  margin: 10px;
  border: 1px solid rgb(236, 234, 234);
  //   min-height: 400px;
}
.searchButton {
  margin-left: 10px;
}
.iconbutton {
  margin: 5px;
}
/deep/.ant-transfer-list {
  width: 46%;
}
</style>
