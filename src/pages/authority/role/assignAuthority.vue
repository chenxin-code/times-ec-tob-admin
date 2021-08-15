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
            <template slot="menuIds" slot-scope="scope">
              <a-checkbox-group
                  :options="['']"
                  :checked="checkMenu(scope.id)"
                  @change="onChange(scope.id)"/>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div>
    <FormSubmitButton :isShow="true" @submit="save()" />
  </div>
</template>

<script>
import api from './../../../api';

export default {
  data() {
    return {
      checkedMenuIds: [],
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
          key: 'menuIds',
          scopedSlots: {customRender: 'menuIds'},
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
    checkMenu(id){
      return this.checkedMenuIds.indexOf(id) !== -1;
    },
    onChange(id) {
      let index = this.checkedMenuIds.indexOf(id);
      if(index === -1){
        this.checkedMenuIds.push(id);
      }else{
        delete this.checkedMenuIds[index];
      }
      console.log(this.checkedMenuIds);
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
      api.insertRoleMenu({
        roleId: this.$route.params.id,
        menuIds: this.checkedMenuIds,
      }).then(resp => {
        if (resp.code === 200) {
          this.$message.success('保存成功');
          this.$router.back();
        }
      })
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
        this.checkedMenuIds = resp.data.menuCheckedIds;
      }
    }).finally(() => {
      this.tableLoading = false;
    })
  },
}
</script>

<style lang="less" scoped></style>
