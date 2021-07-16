<template>
  <div style="padding: 25px 15px;">
    <a-input-search style="margin-bottom: 8px;" placeholder="搜索企业" @change="onChange"/>
    <a-tree
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :tree-data="treeData"
        :replace-fields="{children: 'children', title: 'title', key: 'key'}"
        @expand="onExpand"
        @select="onSelect">
      <template slot="title" slot-scope="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "companyTree",
  data() {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      treeData: [],
      dataList: [],
    };
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      const expandedKeys = this.dataList.map(item => {
        if (item.title.indexOf(value) > -1) {
          return this.getParentKey(item.key, this.treeData);
        }
        return null;
      }).filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      });
    },
    generateList(data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        this.dataList.push({key, title: key});
        if (node.children) {
          this.generateList(node.children);
        }
      }
    },
    getParentKey(key, tree) {
      let parentKey;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key;
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    },
    onSelect(selectedKeys) {
      this.$emit('onSelect', selectedKeys);
    },
  },
  mounted() {
    api.getCompanyTree().then(resp => {
      if (resp.code === 200) {
        //this.treeData = resp.data;
        this.treeData = [
          {
            title: '广州65464',
            key: '广州534',
            scopedSlots: {title: 'title'},
            children: [
              {
                title: '南沙534',
                key: '南沙534',
                scopedSlots: {title: 'title'},
                children: [
                  {
                    title: '金洲534',
                    key: '金洲543',
                    scopedSlots: {title: 'title'},
                    children: [
                      {
                        title: '御城11111111',
                        key: '御城11111111',
                        scopedSlots: {title: 'title'},
                      },
                      {title: '隽城543', key: '隽城534', scopedSlots: {title: 'title'},},
                    ]
                  },
                  {title: '蕉门534', key: '蕉门534', scopedSlots: {title: 'title'},},
                  {title: '黄阁543', key: '黄阁543', scopedSlots: {title: 'title'},},
                ],
              },
              {
                title: '天河534',
                key: '天河534',
                scopedSlots: {title: 'title'},
              },
            ],
          },
          {
            title: '深圳534',
            key: '深圳345',
            scopedSlots: {title: 'title'},
            children: [
              {title: '南山645', key: '南山543', scopedSlots: {title: 'title'},},
              {title: '龙华654', key: '龙华543', scopedSlots: {title: 'title'},},
              {title: '龙岗534', key: '龙岗543', scopedSlots: {title: 'title'},},
            ],
          }
        ];
        this.generateList(this.treeData);
      }
    });
  },
};
</script>

<style scoped>

</style>