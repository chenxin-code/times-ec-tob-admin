<template>
  <!-- <div id="neighborhoodLife" style="height:100%;background:#fff">
    <div class="content-main" ref="content_main">
      <a-row style="padding: 15px;height: 100%;">
        <a-col>
          <a-table
            :columns="columns"
            :data-source="tableData"
            :loading="tableLoading"
            row-key="id"
            :indentSize="35"
            :pagination="false"
          >
            <template slot="menuType" slot-scope="scope">
              <div class="editable-row-operations">
                <span v-html="menuTypeParse(scope.menuType)"></span>
              </div>
            </template>
            <template slot="menuIds" slot-scope="scope">
              <a-checkbox
                :checked="checkMenu(scope.id)"
                @change="onChange(scope.id)"
              />
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div>
    <FormSubmitButton :isShow="true" @submit="save()" />
  </div> -->
  <div id="neighborhoodLife" class="neighborhoodLife">
    <baseLayout :header="false">
      <template slot="content">
        <div class="content-box" ref="content_main">
          <div class="content-box">
            <baseTable
              :columns="columns"
              :tableData="tableData"
              :pageSize="pageData.pageSize"
              :current="pageData.current"
              :loading="tableLoading"
              :total="pageData.total"
              :rowSelection="rowSelection"
            >
              <template slot="menuType" slot-scope="{ props }">
                <div class="editable-row-operations">
                  <span v-html="menuTypeParse(props.menuType)"></span>
                </div>
              </template>
              <template slot="buttonChildren" slot-scope="{ props, index }">
                <a-checkbox-group
                  v-model="props.defalutbutton"
                  @change="
                    e => {
                      onChange(e, props, index)
                    }
                  "
                >
                  <template v-for="item in props.buttonChildren">
                    <a-checkbox
                      :key="item.id"
                      :value="item.id"
                      :checked="item.possessOrNot == 1 ? true : false"
                    >
                      {{ item.menuName }}
                    </a-checkbox>
                  </template>
                </a-checkbox-group>
              </template>
            </baseTable>
          </div>
        </div>
      </template>
      <template slot="footer">
        <a-button class="a-buttom-reset" type="primary" @click="save"
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
    let pageData = {
      total: 0,
      current: 1,
      pageNum: 1,
      pageSize: 10,
    }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        )
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
      },
    }
    return {
      checkedMenuIds: [],
      tableData: [],
      tableDatas: [],
      columns: [
        {
          title: '访问',
          dataIndex: 'look',
          key: 'look',
          width: 50,
        },
        {
          title: '菜单',
          dataIndex: 'menuName',
          key: 'menuName',
          width: 300,
        },
        {
          title: '类型',
          key: 'menuType',
          scopedSlots: { customRender: 'menuType' },
          align: 'center',
          width: 100,
        },
        {
          title: '权限',
          key: 'buttonChildren',
          scopedSlots: { customRender: 'buttonChildren' },
          align: 'center',
          //   width: '240px',
          fixed: 'right',
        },
      ],
      pageData,
      tableLoading: false,
      checkChange: [],
      rowSelection: rowSelection,
    }
  },
  components: {},
  computed: {
    menuTypeParse() {
      return param => {
        if (param === 1) {
          return '菜单'
        } else if (param === 2) {
          return '页面'
        } else {
          return ''
        }
      }
    },
  },
  methods: {
    getRoleList() {
      api
        .roleMenuTreeData({ roleId: this.$route.params.id })
        .then(resp => {
          if (resp.code === 200) {
            let tableData = []
            this.tableData = resp.data.map(item => {
              return {
                ...item,
              }
            })
            tableData = this.tableData
            this.delChild(this.tableData)
            this.mapTableData(tableData)
            this.tableDatas = [...this.tableData]
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    //是否选中权限操作
    onChange(value, props, index) {
      let { checkChange } = this
      let checkChangeHard = [...checkChange]
      props.buttonChildren.map(item => {
        if (value.length == 0) {
          item.possessOrNot = 0
        } else {
          value.map(items => {
            if (item.id == items) {
              item.possessOrNot = 1
            } else {
              item.possessOrNot = 0
            }
          })
        }
      })
      //默认全部插入数据
      let checkChangess = checkChangeHard.concat(value)
      let checkChanges = this.unique(checkChangess)
      //筛选出来没有勾选
      let unCheckList = props.buttonChildren.filter(item => {
        return value.indexOf(item.id) < 0
      })
      unCheckList = unCheckList.map(item => {
        return item.id
      })
      checkChanges = checkChanges.filter(item => {
        return unCheckList.indexOf(item) < 0
      })
      //赋值
      this.checkChange = [...checkChanges]
      this.tableDatas = [...this.tableData]
    },
    //去重
    unique(arr, val) {
      const res = new Map()
      return arr.filter(item => !res.has(item) && res.set(item, 1))
    },
    //删除没选中的权限
    checkChangeFn(checkChange, item) {
      let findIndex = checkChange.findIndex(check => {
        return check == item
      })
      if (findIndex !== -1) {
        checkChange.splice(findIndex, 1)
      }
      return checkChange
    },
    delChild(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length === 0) {
          delete data[i].children
        } else {
          this.delChild(data[i].children)
        }
      }
    },
    //默认选中的递归
    mapTableData(data) {
      //定义一个递归函数
      this.mapButtonCHhild(data)
      //浅拷贝数组变量
      this.defalutCheck = [...this.checkChange]
    },
    //默认选中的递归
    mapButtonCHhild(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].buttonChildren.length === 0) {
          if (data[i].children && data[i].children.length > 0) {
            this.mapButtonCHhild(data[i].children)
          }
        } else {
          data[i].defalutbutton = []
          data[i].buttonChildren.map(item => {
            if (item.possessOrNot == 1) {
              data[i].defalutbutton.push(item.id)
              this.checkChange.push(item.id)
            }
          })
          if (data[i].children && data[i].children.length > 0) {
            this.mapButtonCHhild(data[i].children)
          }
        }
      }
    },
    //默认递归选中父级Id
    mapTableDataForId(data, list) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].defalutbutton && data[i].defalutbutton.length <= 0) {
          if (data[i].children && data[i].children.length > 0) {
            this.mapTableDataForId(data[i].children, list)
          }
        } else {
          if (data[i].defalutbutton) {
            if (data[i].parentId != '0') {
              list.push(data[i].parentId)
            }
            list.push(data[i].id)
          }
          if (data[i].children && data[i].children.length > 0) {
            this.mapTableDataForId(data[i].children, list)
          }
        }
      }
      return list
    },
    //保存选中的权限
    save() {
      //获取父级的id
      let ParentId = []
      ParentId = this.mapTableDataForId(this.tableDatas, ParentId)
      ParentId = this.unique([...ParentId])
      this.tableLoading = true
      api
        .insertRoleMenu({
          roleId: this.$route.params.id,
          menuIds: this.checkChange.concat(ParentId), //选中的权限拼接父级的id
        })
        .then(resp => {
          if (resp.code === 200) {
            this.$message.success('保存成功')
            this.$router.back()
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
  },
  mounted() {
    this.tableLoading = true
    this.getRoleList()
  },
}
</script>

<style lang="less" scoped>
.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.flex {
  flex: 1;
}
.container-module {
  width: 100%;
}
.neighborhoodLife {
  width: 100%;
  height: 100%;
  background: #fff;
}
.content-box {
  background: #fff;
  width: 100%;
  height: 100%;
}
.a-buttom-reset {
  margin-left: 15px;
  margin-bottom: 10px;
}
/deep/ .ant-checkbox-wrapper + .ant-checkbox-wrapper {
  padding: 0 5px 0 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
