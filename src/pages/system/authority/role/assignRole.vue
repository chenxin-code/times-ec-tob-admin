<template>
  <div class="container-edit">
    <baseLayout :header="false">
      <template slot="content">
        <div class="content-main" ref="content_main">
          <div class="content-box">
            <div class="main-box row space-between-start">
              <div class="lefttab mr column">
                <div class="topwrap row space-between-center">
                  <span class="topname">用户：</span>
                  <div class="row end-center" style="width:80%">
                    <a-form
                      :form="modelForm"
                      @submit="searchByPhone"
                      class="row end-center"
                    >
                      <a-form-item>
                        <a-input
                          v-decorator="[
                            'phone',
                            {
                              rules: [
                                {
                                  required: false,
                                  message: '请输入手机号查询',
                                },
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
                <div class="flex">
                  <a-table
                    ref="aTable"
                    :columns="tableColumns"
                    :data-source="tableData"
                    :scroll="{ y: scrollY }"
                    :row-key="(r, i) => r.id"
                    :row-selection="{
                      ...rowSelection,
                      selectedRowKeys: selectedLeft,
                    }"
                    :loading="tableLoading"
                    :pagination="false"
                  >
                    <template slot="name" slot-scope="text, record">
                      <div class="editable-row-operations">
                        <span></span>
                        {{ record.name }}&nbsp;&nbsp;
                        {{ record.phone }}&nbsp;&nbsp;
                        {{ record.companyName }}&nbsp;&nbsp;
                        {{ record.departName }}
                      </div>
                    </template>
                  </a-table>
                </div>
              </div>
              <div class="column center operationButton">
                <a-button type="default" class="iconbutton" @click="toRight">
                  <a-icon type="right" />
                </a-button>
                <a-button type="default" class="iconbutton" @click="toLeft">
                  <a-icon type="left" />
                </a-button>
              </div>
              <div class="lefttab ml column">
                <div class="topwrap row start center">
                  <span class="topname">已添加</span>
                </div>
                <div class="flex">
                  <a-table
                    :columns="tableColumnsed"
                    :row-key="(r, i) => r.id"
                    :data-source="tableDataed"
                    :scroll="{ y: scrollY }"
                    :pagination="false"
                    :loading="tableLoadinged"
                    :row-selection="{
                      ...rowSelectionRight,
                      selectedRowKeys: selectedRight,
                    }"
                    ><template slot="name" slot-scope="text, record">
                      <div class="editable-row-operations">
                        {{ record.name }}&nbsp;&nbsp;
                        {{ record.phone }}&nbsp;&nbsp;
                        {{ record.companyName }}&nbsp;&nbsp;
                        {{ record.departName }}
                      </div>
                    </template>
                  </a-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <a-button class="a-buttom-reset" type="primary" @click="saveAccount"
          >保存</a-button
        >
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
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        ellipsis: true,
        scopedSlots: { customRender: 'name' },
      },
    ]
    let tableColumnsed = [
      {
        title: '用户名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        ellipsis: true,
        scopedSlots: { customRender: 'name' },
      },
    ]
    let pageData = {
      total: 0, // 总条数
      current: 1,
      pageNum: 1,
      pageSize: 100,
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
      scrollY: 400,
    }
  },
  mounted() {
    this.getHasAddList()
    setTimeout(() => {
      this.scrollY = document.body.clientHeight - 300
    }, 0)
  },
  methods: {
    // 手机号搜索用户
    async searchByPhone(e) {
      e.preventDefault()
      this.searchPhoneLoading = true
      let tableData = this.tableData,
        tableDataed = this.tableDataed
      let has = true,
        hass = true
      this.modelForm.validateFields((err, values) => {
        if (!err) {
          values.phone = values.phone.trim()
          tableData.map(element => {
            if (element.phone == values.phone) {
              has = false
            }
          })
          tableDataed.map(element => {
            if (element.phone == values.phone) {
              hass = false
            }
          })
          if (!has || !hass) {
            this.searchPhoneLoading = false
            return this.$message.info('该员工已存在')
          }

          api
            .setAddAccountByPhone(values)
            .then(res => {
              if (res.code == 200) {
                if (res.data) {
                  let { data } = res
                  let employ = []
                  data.employeeOrganizationVOs.map(item => {
                    item.name = data.empName
                    item.phone = data.mobilePhone
                    item.id = data.id
                    item.roleId = this.$route.params.id
                    item.userId = data.userId
                    item.userName = data.userName
                    employ.push(item)
                    this.tableData = employ
                  })
                }
              }
            })
            .finally(err => {
              this.searchPhoneLoading = false
            })
        } else {
          this.searchPhoneLoading = false
        }
      })
    },
    // 获取已添加的用户
    async getHasAddList() {
      this.tableLoadinged = true
      let params = {
        pageNum: this.pageData.pageNum, // 第几页
        pageSize: this.pageData.pageSize, // 每页多少条
        roleId: this.$route.params.id, // roleId
      }
      try {
        let res = await api.getAccountListData(params)
        if (res.code == 200) {
          let { records, total } = res.data
          let userId = []
          if (records.length > 0) {
            records.map(item => {
              records.key = item.id
              userId.push(item.id)
            })
          }
          this.tableDataed = records
          this.pageData.total = Number(total)
          params.userIds = userId.join(',')
          delete params.roleId
          console.log(params, 'params')
          await this.getNoAddList(params)
        }
      } finally {
        this.tableLoadinged = false
      }
    },
    // 获取未添加的用户
    async getNoAddList(params) {
      let resp = await api.getAccountListData(params)
      if (resp.code == 200) {
        let { records } = resp.data
        if (records.length > 0) {
          records.map(item => {
            records.key = item.id
          })
          this.tableData = records
        }
      }
    },
    //保存已添加用户
    saveAccount() {
      let { tableDataed } = this
      let list = [],
        params = {
          roleId: this.$route.params.id,
          userList: [],
        }
      if (tableDataed.length > 0) {
        tableDataed.map(item => {
          list.push({
            companyName: item.companyName,
            departName: item.departName,
            originalId: item.userId,
            originalEmpId: item.id,
            name: item.name,
            phone: item.phone,
            userName: item.name,
          })
        })
        params.userList = list
      }
      api.batchSaveList(params).then(res => {
        if (res.code == 200) {
          let param = {
            pageNum: this.pageData.pageNum, // 第几页
            pageSize: this.pageData.pageSize, // 每页多少条
            roleId: this.$route.params.id, // roleId
          }
          this.$message.success('保存成功')
          this.$router.back()
          this.getHasAddList(param)
          this.selectReset()
        }
      })
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
/deep/.ant-table-thead > tr:first-child > th:first-child :after {
  content: '访问';
}
// .ant-table-selection-column {
// }
.container-edit {
  position: relative;
  height: 100%;
  .ant-form {
    width: 100%;
  }
  .ant-form-item {
    margin-bottom: 0;
    width: 80%;
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
  align-items: flex-start;
}
.center {
  align-items: center;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
  align-items: flex-start;
}
.end-center {
  justify-content: flex-end;
  align-items: center;
}
.ant-form {
  height: 100%;
}
.content-box {
  height: 100%;
}
.main-box {
  position: relative;
  height: 100%;
}
.topwrap {
  padding: 15px;
  width: 100%;
  height: 70px;
}
.operationButton {
  height: 100%;
  padding: 15px 0;
}
.lefttab {
  width: 50%;
  margin: 15px;
  border: 1px solid rgb(236, 234, 234);
  height: 98%;
  box-sizing: border-box;
  position: relative;
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
