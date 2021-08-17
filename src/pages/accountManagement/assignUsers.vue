<template>
  <div class="container-edit">
    <baseLayout :header="false">
      <template slot="content">
        <div class="content-main" ref="content_main">
          <div class="main-box row space-between-start">
            <div class="lefttab mr column">
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
                  <template slot="operation" slot-scope="record">
                    <!-- :scroll="{ y: 600 }" -->
                    <div
                      class="editable-row-operations"
                      @click="addRole(record)"
                    >
                      <a>添加</a>
                    </div>
                  </template>
                </a-table>
              </div>
            </div>
            <div class="lefttab ml column">
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
                  ><template slot="operation" slot-scope="record">
                    <!-- :scroll="{ y: 600 }" -->
                    <div
                      class="editable-row-operations"
                      @click="delRole(record)"
                    >
                      <a>删除</a>
                    </div>
                  </template>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <a-button class="a-buttom-reset" type="primary" @click="saveRole"
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
    this.getNoAssignRole({ userId: this.$route.params.id })
    this.getAssignRole({ userId: this.$route.params.id })
  },
  methods: {
    // 添加
    async addRole(row) {
      let tableData = this.tableData
      this.tableDataed.push(row)
      tableData.map((item, index) => {
        if (item.id == row.id) {
          tableData.splice(index, 1)
        }
      })
      this.tableData = tableData
    },
    // 删除
    async delRole(row) {
      let tableDataed = this.tableDataed
      this.tableData.push(row)
      tableDataed.map((item, index) => {
        if (item.id == row.id) {
          tableDataed.splice(index, 1)
        }
      })
      this.tableDataed = tableDataed
    },
    //获取还没关联的角色
    getNoAssignRole(param) {
      api.getNoAssociateRolesByUserId(param).then(res => {
        if (res.code == 200) {
          res.data.map(item => {
            item.key = item.id
          })
          this.tableData = res.data
        }
      })
    },
    //获取关联的角色
    getAssignRole(param) {
      api.getAssociateRolesByUserId(param).then(res => {
        if (res.code == 200) {
          res.data.map(item => {
            item.key = item.id
          })
          this.tableDataed = res.data
        }
      })
    },
    //批量保存已添加的角色
    saveRole() {
      let roleIds = []
      this.tableDataed.map(item => {
        roleIds.push(item.id)
      })
      console.log(roleIds, 'roleIds')
      let params = {
        roleIds: roleIds,
        userId: this.$route.params.id,
      }
      api.batchAssociateRole(params).then(res => {
        if (res.code == 200) {
          this.$message.success(`保存成功`)
          this.getNoAssignRole({ userId: this.$route.params.id })
          this.getAssignRole({ userId: this.$route.params.id })
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
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
  //   float: left;
  margin: 15px;
}
.lefttab.mr {
  margin-right: 7.5px;
}
.lefttab.ml {
  margin-left: 7.5px;
}
.table_box {
  border: 1px solid rgb(236, 234, 234);
  border-bottom: none;
}
</style>
