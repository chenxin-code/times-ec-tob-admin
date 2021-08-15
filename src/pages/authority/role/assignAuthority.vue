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
            <template slot="aaaaa" slot-scope="scope">
              <a-checkbox-group
                  :options="['1', '2', '3']"
                  :default-value="['1']"
                  @change="onChange" />
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div>
    <FormSubmitButton :isShow="true" @submit="save()" />
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
      tableData: [],
      columns: [
        {
          title: '菜单',
          dataIndex: 'menuName',
          key: 'menuName',
        },
        {
          title: '类型',
          key: 'menuType',
          scopedSlots: {customRender: 'menuType'},
          align: 'center',
        },
        {
          title: '权限',
          key: 'aaaaa',
          scopedSlots: {customRender: 'aaaaa'},
          align: 'center',
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
    onChange(checkedValues) {
      console.log('checked = ', checkedValues);
    },
    delChild(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length === 0) {
          delete data[i].children;
        } else {
          this.delChild(data[i].children);
        }
      }
    },
    save() {

    },
  },
  mounted() {
    this.tableLoading = true;
    api.roleMenuTreeData({roleId: this.$route.params.id}).then(resp => {
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
