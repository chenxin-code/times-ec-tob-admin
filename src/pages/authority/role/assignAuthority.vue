<template>
  <div id="neighborhoodLife">
    <div class="content-main" ref="content_main">
      <a-row style="padding: 20px;height: 100%;">
        <a-col>
          <a-table
              :columns="columns"
              :data-source="tableData"
              :loading="tableLoading"
              row-key="id"
              :indentSize="35"
              :pagination="false">
            <template slot="menuType" slot-scope="scope">
              <div class="editable-row-operations">
                <span v-html="menuTypeParse(scope.menuType)"></span>
              </div>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
/*
*
* 保存：角色权限管理接口服务--【管理端】新增角色菜单信息--/times-ec-tob-mall/admin/role/insertRoleMenu
查詢：菜单接口服务--【管理端】加载角色菜单列表树(用于角色分配菜单权限)--/times-ec-tob-mall/admin/menu/roleMenuTreeData
*
* */
import api from './../../../api'

export default {
  data() {
    return {
      tableColumn: [
        {field: 'menuName', title: '菜单', treeNode: true},
        {field: 'menuType', title: '类型'},
        {field: 'aaaaa', title: '权限'},
      ],
      tableData: [],
      columns: [
        {
          title: '菜单',
          dataIndex: 'menuName',
          key: 'menuName',
          width: 300,
          fixed: 'left',
        },
        {
          title: '类型',
          key: 'menuType',
          scopedSlots: {customRender: 'menuType'},
        },
        {
          title: '权限',
          dataIndex: 'aaaaa',
          key: 'aaaaa',
        },
      ],
      tableLoading: false,
    }
  },
  components: {},
  computed: {
    menuTypeParse() {
      return param => {
        if (param === 1) {
          return '菜单'
        } else if (param === 2) {
          return '按钮'
        } else {
          return ''
        }
      }
    },
  },
  methods: {
    delChild(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length === 0) {
          delete data[i].children;
        } else {
          this.delChild(data[i].children);
        }
      }
    },
  },
  mounted() {
    this.tableLoading = true;
    api.roleMenuTreeData({roleId: 1}).then(resp => {
      if (resp.code === 200) {
        this.tableData = resp.data.menus.map(item => {
          return {
            ...item,
          }
        })
        this.delChild(this.tableData);
      }
    }).finally(() => {
      this.tableLoading = false;
    })
  },
}
</script>

<style lang="less" scoped></style>
