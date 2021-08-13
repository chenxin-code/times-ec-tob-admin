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
                    <!-- <a-input
                      v-model="searchData.phone"
                      type="tel"
                      max-length.number="11"
                      placeholder="输入手机号查询"
                      style="width:80%"
                    />
                    <a-button
                      class="searchButton"
                      type="primary"
                      @click="searchByPhone"
                      >查询</a-button
                    > -->
                    <a-form
                      :form="modelForm"
                      @submit="searchByPhone"
                      class="row center"
                    >
                      <a-form-item>
                        <a-input
                          v-decorator="[
                            'phone',
                            {
                              rules: [
                                { required: true, message: '请输入手机号查询' },
                                {
                                  pattern: /^1[3456789]\d{9}$/,
                                  message: '格式不对',
                                },
                              ],
                              initialValue: modelForm.phone,
                            },
                          ]"
                          placeholder="请输入手机号"
                        />
                      </a-form-item>
                      <a-button
                        type="primary"
                        html-type="submit"
                        :loading="searchPhoneLoading"
                        class="searchButton"
                      >
                        查询
                      </a-button>
                    </a-form>
                  </div>
                </div>
                <div>
                  <a-table
                    :columns="tableColumns"
                    :data-source="tableData"
                    :scroll="{ y: 600 }"
                    :row-selection="{
                      ...rowSelection,
                      selectedRowKeys: selectedLeft,
                    }"
                    :loading="tableLoading"
                    :pagination="false"
                  >
                    <template slot="empName" slot-scope="text, record">
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
                <div>
                  <a-table
                    :columns="tableColumnsed"
                    :row-key="(r, i) => i"
                    :data-source="tableDataed"
                    :scroll="{ y: 600 }"
                    :pagination="false"
                    :loading="tableLoadinged"
                    :row-selection="{
                      ...rowSelectionRight,
                      selectedRowKeys: selectedRight,
                    }"
                    ><template slot="empName" slot-scope="text, record">
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
        scopedSlots: { customRender: 'empName' },
      },
    ]
    let tableColumnsed = [
      {
        title: '用户名称',
        dataIndex: 'empName',
        key: 'empName',
        align: 'center',
        ellipsis: true,
        scopedSlots: { customRender: 'empName' },
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
      modelForm: this.$form.createForm(this, { name: 'form' }),
      searchPhoneLoading: false,
    }
  },
  mounted() {
    // this.getHasAddList()
  },
  methods: {
    // 手机号搜索用户
    async searchByPhone(e) {
      e.preventDefault()
      let userPhone = this.modelForm.getFieldsValue().phone
      let reg = /^1[3456789]\d{9}$/
      if (!reg.test(userPhone)) {
        return (this.searchPhoneLoading = false)
      }
      this.searchPhoneLoading = true
      api
        .setAddAccountByPhone({ phone: userPhone })
        .then(res => {
          if (res.code == 200) {
            if (res.data) {
              let { data } = res
              let employ = []
              data.employeeOrganizationVOs.map(item => {
                item.empName = data.empName
                item.key = data.empName
                item.mobilePhone = data.mobilePhone
                item.userId = data.userId
                item.id = data.id
                item.empId = data.empId
                employ.push(item)
              })
              console.log(employ, 'employ')
              this.tableData = employ
            }
          }
        })
        .finally(err => {
          this.searchPhoneLoading = false
        })
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
      this.selectedLeft = selectedRowKeys
    },
    //右边checkbox选择
    rightTableChange(selectedRowKeys, selectedRows) {
      this.rightSelect = selectedRows
      this.selectedRight = selectedRowKeys
    },
    //左边数据移除到右边
    toRight() {
      let { leftSelect, tableData, tableDataed, selectedLeft } = this
      if (leftSelect.length > 0) {
        this.tableDataed = tableDataed.concat(leftSelect)
        if (leftSelect.length == tableData.length) {
          this.selectReset()
          return (this.tableData = [])
        }
        this.tabelData = this.commDeletFn(leftSelect, tableData)
      }
    },
    //右边数据移除到左边
    toLeft() {
      let { rightSelect, tableData, tableDataed, selectedRight } = this
      if (rightSelect.length > 0) {
        this.tableData = tableData.concat(rightSelect)
        if (rightSelect.length == tableDataed.length) {
          this.selectReset()
          return (this.tableDataed = [])
        }
        this.tableDataed = this.commDeletFn(rightSelect, tableDataed)
      }
    },
    //公共移除方法
    commDeletFn(arr, Arr) {
      let newArray = Arr
      arr.map((item, index) => {
        let findIndex = newArray.findIndex(items => {
          return items.id == item.id
        })
        if (findIndex !== -1) {
          newArray.splice(findIndex, 1)
        }
      })
      //选项置空
      this.selectReset()
      return newArray
    },
    //选项置空
    selectReset() {
      this.leftSelect = []
      this.rightSelect = []
      this.selectedLeft = []
      this.selectedRight = []
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
.ant-form {
  height: 100%;
}
.main-box {
  height: 100%;
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
