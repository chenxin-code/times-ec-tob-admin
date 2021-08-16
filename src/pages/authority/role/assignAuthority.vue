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
            >
              :scrollY="scrollY"
              <template slot="menuType" slot-scope="{ props }">
                <div class="editable-row-operations">
                  <span v-html="menuTypeParse(props.menuType)"></span>
                </div>
              </template>
              <template slot="menuIds" slot-scope="scope">
                <a-checkbox
                  :checked="checkMenu(scope.id)"
                  @change="onChange(scope.id)"
                />
              </template>
            </baseTable>
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
    let pageData = {
      total: 0,
      current: 1,
      pageNum: 1,
      pageSize: 10,
    }
    return {
      checkedMenuIds: [],
      tableData: [],
      columns: [
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
          key: 'menuIds',
          scopedSlots: { customRender: 'menuIds' },
          align: 'center',
          fixed: 'right',
        },
      ],
      pageData,
      tableLoading: false,
      menuTypes: {
        1: '菜单',
        2: '页面',
      },
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
    checkMenu(id) {
      return this.checkedMenuIds.indexOf(id) !== -1
    },
    onChange(id) {
      let index = this.checkedMenuIds.indexOf(id)
      if (index === -1) {
        this.checkedMenuIds.push(id)
      } else {
        delete this.checkedMenuIds[index]
      }
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
    save() {
      this.tableLoading = true
      api
        .insertRoleMenu({
          roleId: this.$route.query.id,
          menuIds: this.checkedMenuIds,
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
    api
      .roleMenuTreeData({ roleId: this.$route.query.id })
      .then(resp => {
        if (resp.code === 200) {
          this.tableData = resp.data.menus.map(item => {
            return {
              ...item,
            }
          })
          this.delChild(this.tableData)
          this.checkedMenuIds = resp.data.menuCheckedIds
        }
      })
      .finally(() => {
        this.tableLoading = false
      })
  },
}
</script>

<style lang="less" scoped>
.column {
  display: flex;
  flex-direction: column;
  justify-content: start;
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
</style>
