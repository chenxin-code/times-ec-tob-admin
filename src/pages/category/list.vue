<template>
  <div id="neighborhoodLife">
    <div class="content-main" ref="content_main">
      <a-row style="padding: 20px;height: 100%;">
        <a-col>
          <a-table
              :columns="columns"
              :data-source="categoryData"
              :loading="tableLoading"
              row-key="categoryId"
              :pagination="false">
            <template slot="children" slot-scope="scope">
              <div class="editable-row-operations">
                <span v-html="childrenParse(scope.children)"></span>
              </div>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import api from "./../../api";

export default {
  data() {
    return {
      categoryData: [],
      columns: [
        {
          title: '品类名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '是否末级',
          key: 'children',
          scopedSlots: {customRender: 'children'},
        },
      ],
      tableLoading: false,
    };
  },
  computed: {
    childrenParse() {
      return param => {
        if (param.length === 0) {
          return '是';
        } else {
          return '否';
        }
      }
    },
  },
  mounted() {
    this.tableLoading = true;
    api.getCategoryTree({}).then(resp => {
      if (resp.code === 200) {
        this.categoryData = resp.data;
        console.log(this.categoryData);
      }
    }).finally(() => {
      this.tableLoading = false;
    });
  },
};
</script>

<style lang="less" scoped>

</style>