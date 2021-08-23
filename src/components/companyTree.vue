<template>
  <div style="padding:15px;height:100%;overflow-y:auto;">
    <a-input-search
      style="margin-bottom: 8px;"
      placeholder="搜索企业"
      @change="onChange"
    />
    <a-tree
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="treeData"
      :replace-fields="{ children: 'children', title: 'title', key: 'key' }"
      @expand="onExpand"
      @select="onSelect"
    >
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
import api from '../api'

export default {
  name: 'companyTree',
  data() {
    return {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      treeData: [],
      dataList: [],
    }
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange(e) {
      const value = e.target.value
      const expandedKeys = this.dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return this.getParentKey(item.key, this.treeData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      })
    },
    //冒泡排序
    bubbleSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (arr[j].updateTime < arr[j + 1].updateTime) {
            let temp = arr[j + 1]
            arr[j + 1] = arr[j]
            arr[j] = temp
            if (arr[j].children) {
              this.bubbleSort(arr[j].children)
            }
          }
        }
      }
      return arr
    },
    generateList(data) {
      for (let i = 0; i < data.length; i++) {
        this.dataList.push({ key: data[i].key, title: data[i].title })
        if (data[i].children) {
          this.generateList(data[i].children)
        }
      }
    },
    getParentKey(key, tree) {
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children)
          }
        }
      }
      return parentKey
    },
    onSelect(selectedKeys, info) {
      this.$emit(
        'onSelect',
        info.node.dataRef.id,
        info.node.dataRef.enterpriseName
      )
    },
  },
  mounted() {
    api.getCompanyTree().then(resp => {
      if (resp.code === 200) {
        let respData = JSON.parse(JSON.stringify(resp.data))
        respData.forEach((item, index) => {
          respData[index].key = item.id
          respData[index].title = item.enterpriseName
          respData[index].updateTime = new Date(item.updateTime).getTime() //转时间戳排序
          respData[index].scopedSlots = { title: 'title' }
        })
        this.treeData = respData.filter(parent => {
          let item = respData.filter(child => {
            return parent['id'] === child['parentId']
          })
          if (item.length > 0) {
            parent['children'] = item
          }
          return parent['parentId'] === '-1'
        })
        this.treeData = this.bubbleSort(this.treeData)
        this.generateList(this.treeData)
      }
    })
  },
}
</script>

<style scoped></style>
