<template>
  <div style="height: 100%;margin-bottom: 0px;">
    <div class="content-header">
      {{ $route.params.typ === '1' ? '查看' : '编辑' }}商品基础信息
      <span class="fallback" @click="$router.back()" style="cursor:pointer"
        >返回</span
      >
    </div>
    <div
      class="content-main"
      style="height: calc(100% - 100px);margin-top: 12px;padding:20px 60px 20px 20px;"
    >
      <a-form
        :form="form"
        :labelCol="{ style: { width: '200px' } }"
        :wrapperCol="{ style: { width: '60%' } }"
        style="width:100%;"
        autoComplete="off"
      >
        <div class="form-box-flex">
          <div class="form-box">
            <a-form-item label="SKU名称">
              <a-input disabled v-decorator="['skuName']" />
            </a-form-item>
            <a-form-item label="SKU编码">
              <a-input disabled v-decorator="['skuCode']" />
            </a-form-item>
            <a-form-item label="SPU名称">
              <a-input disabled v-decorator="['itemName']" />
            </a-form-item>
            <a-form-item label="SPU编码">
              <a-input disabled v-decorator="['itemCode']" />
            </a-form-item>
            <a-form-item label="商城SKU自编码">
              <a-input
                :disabled="disbliend"
                v-decorator="['skuCodeInside']"
                placeholder="请输入SKU自编码"
              />
            </a-form-item>
            <a-form-item label="商品状态">
              <a-select
                :disabled="disbliend"
                v-decorator="[
                  'selling',
                  { rules: [{ required: true, message: '商品状态不能为空' }] },
                ]"
                default-value="全部"
              >
                <a-select-option
                  :value="v.id"
                  v-for="(v, i) in selectArrstrain"
                  :key="i"
                >
                  {{ v.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="商品品类">
              <a-tree-select
                :disabled="disbliend"
                v-decorator="['categoryId']"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :tree-data="treeData"
                :replace-fields="{
                  children: 'children',
                  key: 'categoryCode',
                  value: 'categoryId',
                  title: 'name',
                }"
                @change="onChange"
                tree-default-expand-all
              >
              </a-tree-select>
            </a-form-item>
          </div>
          <div class="form-box">
            <a-form-item label="所属品牌">
              <a-input
                :disabled="disbliend"
                v-decorator="[
                  'brandName',
                  { rules: [{ required: true, message: '所属品牌不能为空' }] },
                ]"
                placeholder="请输入所属品牌"
              />
            </a-form-item>
            <a-form-item label="供应商">
              <a-select
                :disabled="disbliend"
                show-search
                placeholder="请选择供应商"
                option-filter-prop="children"
                :filter-option="filterOption"
                @search="handleSearch"
                @change="handleChange"
                v-decorator="[
                  'supplierName',
                  { rules: [{ required: true, message: '请选择供应商' }] },
                ]"
              >
                <a-select-option
                  v-for="item in supplierList"
                  :key="item.id"
                  :value="
                    `${item.id}` +
                      `:${item.supplierName}` +
                      `:${item.companyId}`
                  "
                >
                  {{ item.supplierName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="税收分类编码">
              <a-input disabled v-decorator="['taxCategoryCode']" />
            </a-form-item>
            <a-form-item label="税率">
              <a-input
                type="number"
                :disabled="disbliend"
                v-decorator="[
                  'taxRate',
                  {
                    rules: [
                      { required: true, message: '税率不能为空' },
                      {
                        pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
                        message: '税率不正确',
                      },
                    ],
                  },
                ]"
                placeholder="请输入税率"
              />
            </a-form-item>
            <a-form-item label="价格类型">
              <a-select
                :disabled="disbliend"
                v-model="isTieredPricing"
                @change="isTieredPricingchange"
              >
                <a-select-option
                  :value="v.id"
                  v-for="(v, i) in selectcontact"
                  :key="i"
                >
                  {{ v.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="库存">
              <a-input
                :disabled="disbliend"
                v-decorator="[
                  'stock',
                  {
                    rules: [
                      { required: true, message: '库存不能为空' },
                      { pattern: /\d/, message: '库存不正确' },
                    ],
                  },
                ]"
                placeholder="请输入库存"
                type="number"
              />
            </a-form-item>
          </div>
        </div>
      </a-form>
      <!-- 
        :label-col="{ span: 5 }"
         :wrapper-col="{ span: 12 }"
       -->
      <a-form
        :form="form"
        style="overflow: auto;width:100%;"
        autoComplete="off"
        :labelCol="{ style: { width: '200px' } }"
        :wrapperCol="{ style: { width: '80%' } }"
      >
        <div class="form-box-flex">
          <div class="form-box">
            <a-form-item label="PC端商品详情">
              <quill-editor
                ref="myTextEditor"
                @focus="onEditorFocus($event)"
                class="editorted"
                v-model="pcItemInfo"
                :disabled="disbliend"
                :options="editorOption"
              ></quill-editor>
            </a-form-item>
            <a-form-item label="app商品详情">
              <quill-editor
                ref="TextEditor"
                @focus="onEditorFocus($event)"
                class="editorted"
                v-model="appItemInfo"
                :disabled="disbliend"
                :options="editorOption"
              ></quill-editor>
            </a-form-item>
            <a-form-item label="成本价" v-show="costPrice.length > 0">
              <div class="intpud" v-for="item in costPrice" :key="item.id">
                <span style="width: 50px;">数量:</span>
                <a-input
                  placeholder="请输入"
                  :disabled="disbliend"
                  :value="item.minNum"
                  class="cbintpudnum"
                  type="number"
                />
                <span style="width: 70px;">成本价：</span>
                <a-input
                  disabled
                  :value="item.costPrice"
                  type="number"
                  class="cbintpudnum"
                />
              </div>
            </a-form-item>
            <a-form-item label="销售价" v-show="isTieredPricing == true">
              <div
                class="intpud"
                v-for="(item, index) in sellingPrice"
                :key="index"
              >
                <span style="min-width: 45px;">数量：</span>
                <span class="num" style="text-align:right;">{{
                  item.minNum
                }}</span
                >~<a-input
                  :disabled="disbliend"
                  placeholder="无穷大"
                  v-model="item.maxNum"
                  class="intpudnum"
                  type="number"
                />
                <span class="spshu">税前销售价:</span>
                <a-input
                  placeholder="请输入"
                  :disabled="disbliend"
                  v-model="item.priceBeforeTax"
                  class="intpudnum"
                  type="number"
                />
                <span class="spshu">税后销售价:</span>
                <a-input
                  placeholder="请输入"
                  :disabled="disbliend"
                  v-model="item.priceAfterTax"
                  class="intpudnum"
                  type="number"
                />
              </div>
              <a-button-group class="butdb" v-if="!disbliend">
                <a-button @click="addlis()" type="primary" size="small">
                  <a-icon type="plus" />
                </a-button>
                <a-button
                  @click="dellis()"
                  size="small"
                  v-if="sellingPrice.length > 1"
                >
                  <a-icon type="minus" />
                </a-button>
              </a-button-group>
            </a-form-item>

            <a-form-item label="销售价" v-show="isTieredPricing == false">
              <div class="intpud">
                <span class="spshu">税前销售价:</span>
                <a-input
                  placeholder="请输入"
                  :disabled="disbliend"
                  v-model="sellingPrice[0].priceBeforeTax"
                  class="intpudnum"
                  type="number"
                />
                <span class="spshu">税后销售价:</span>
                <a-input
                  placeholder="请输入"
                  :disabled="disbliend"
                  v-model="sellingPrice[0].priceAfterTax"
                  class="intpudnum"
                  type="number"
                />
              </div>
            </a-form-item>
          </div>
        </div>
      </a-form>
    </div>
    <div class="content-footer" v-if="$route.params.typ === '2'">
      <a-button
        type="primary"
        size="large"
        style="width: 120px;"
        :loading="loading"
        @click="onSubmit()"
        >保存</a-button
      >
    </div>
  </div>
</template>

<script>
import api from '@/api'
import moment from 'moment'
import { debounce } from '@/utils/util'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'shelveEdit',
  components: { quillEditor },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'form' }),
      loading: false,
      value: undefined,
      isTieredPricing: true, //是否阶梯价
      supplierList: [], //供应商列表
      supplierId: '', //供应商id
      supplierName: '', //供应商名称
      costPrice: [], //成本价
      marketPrice: [], //市场价
      categoryId: null, //	所属类目id
      categoryName: '', //所属类目名称
      sellingPrice: [
        { minNum: 1, maxNum: null, priceBeforeTax: null, priceAfterTax: null },
      ], //销售价
      dataLiading: false,
      submitLoading: false,
      //富文本
      pcItemInfo: '',
      appItemInfo: '',
      selectcontact: [
        { id: false, name: '普通价' },
        { id: true, name: '阶梯价' },
      ],
      selectArrstrain: [
        { id: true, name: '上架' },
        { id: false, name: '下架' },
      ],
      editorOption: {
        readOnly: true,
        placeholder: '请在这里输入',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], //列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ['clean'], //清除字体样式
            ['image'], //上传图片、上传视频
          ],
        },
      },
      treeData: [], //品类列表
      disbliend: true,
    }
  },
  computed: {},
  created() {
    this.getData()
    this.supplier()
    api.getCategoryTree().then(resp => {
      this.treeData = resp.data
    })
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false
    next()
  },
  methods: {
    onEditorFocus(event) {
      if (this.$route.params.typ === '1') {
        event.enable(false)
      } else {
        event.enable(true)
      }
    },
    isTieredPricingchange(value) {
      console.log(value)
      this.isTieredPricing = value
    },
    onChange(value, key) {
      console.log(value, key)
      this.categoryId = value
      this.categoryName = key[0]
    },
    handleSearch(value) {
      debounce(() => {
        this.supplier(value)
      }, 300)
    },
    supplier(value) {
      api
        .getSupplierListByPager({ keyword: value, pageNum: 1, pageSize: 10 })
        .then(res => {
          this.supplierList = res.data.records
        })
    },
    handleChange(value) {
      //供应商
      this.supplierId = value.split(':')[0]
      this.supplierName = value.split(':')[1]
      this.companyId = value.split(':')[2]
      console.log(this.supplierId, this.supplierName, this.companyId)
    },
    addlis() {
      //加
      if (this.sellingPrice[this.sellingPrice.length - 1].maxNum) {
        this.sellingPrice.push({
          minNum: this.sellingPrice[this.sellingPrice.length - 1].maxNum,
          maxNum: this.sellingPrice[this.sellingPrice.length - 1].maxNum,
          priceBeforeTax: this.sellingPrice[this.sellingPrice.length - 1]
            .priceBeforeTax,
          priceAfterTax: this.sellingPrice[this.sellingPrice.length - 1]
            .priceAfterTax,
        })
      } else {
        this.$message.error('请填写上一条的最大值')
      }
    },
    dellis() {
      //减
      this.sellingPrice.pop()
    },
    //富文本方法
    onEditorChange({ editor, html, text }) {
      this.content = html
    },
    getData() {
      //获取列表详情
      api.getProductDetail(this.$route.params.id).then(res => {
        if (res.code === 200) {
          const data = res.data
          this.supplierId = data.supplierId //供应商id
          this.supplierName = data.supplierName
          this.pcItemInfo = data.pcItemInfo //pc详情
          this.appItemInfo = data.appItemInfo //app详情
          this.costPrice = data.costPrice //成本价
          this.marketPrice = data.marketPrice //市场价
          this.sellingPrice = data.sellingPrice //销售价
          ;(this.categoryId = data.categoryId), //所属类目id
            (this.categoryName = data.categoryName), //所属类目名称
            (this.isTieredPricing = data.isTieredPricing), //价格类型
            this.form.setFieldsValue({
              skuCodeInside: data.skuCodeInside, //商品sku自编码
              categoryId: data.categoryName, //所属类目id
              taxCategoryCode: data.taxCategoryCode, //税收分类编码
              skuName: data.skuName, //sku名称
              selling: data.selling == true ? '上架' : '下架', //商品状态
              time: [data.cooperationPeriod, data.cooperationEndperiod], //时间
              skuCode: data.skuCode, //sku编码
              itemCode: data.itemCode, //spu编码
              itemName: data.itemName, //spu名称
              brandName: data.brandName, //所属品牌
              supplierName: data.supplierName, //供应商
              taxRate: data.taxRate, //税率
              stock: data.stock, //库存
            })
        }
      })
    },
    //保存
    onSubmit() {
      let that = this
      debounce(() => {
        this.form.validateFields((err, values) => {
          this.loading = true
          if (that.isTieredPricing == false) {
            that.sellingPrice = that.sellingPrice[0]
          }
          let data = {
            id: that.$route.params.id ?? '',
            categoryId: that.categoryId, //所属类目id
            categoryName: that.categoryName, //所属类目名称
            supplierId: that.supplierId, //供应商id
            supplierName: that.supplierName, //供应商名称
            isTieredPricing: that.isTieredPricing, //价格类型
            pcItemInfo: that.pcItemInfo, //pc详情
            appItemInfo: that.appItemInfo, //app详情
            costPrice: that.costPrice, //成本价
            marketPrice: that.marketPrice, //市场价
            sellingPrice: that.sellingPrice, //销售价
            taxCategoryCode: values.taxCategoryCode, //税收分类编码
            skuName: values.skuName, //sku名称
            skuCode: values.skuCode, //sku编码
            itemCode: values.itemCode, //spu编码
            skuCodeInside: values.skuCodeInside, //商品sku自编码
            itemName: values.itemName, //spu名称
            selling: values.selling == '上架' ? true : false, //商品状态 上下架
            brandName: values.brandName, //所属品牌
            supplierName: values.supplierName, //供应商
            taxRate: Number(values.taxRate), //税率
            stock: Number(values.stock), //库存
          }
          console.log(data)
          api
            .updateProduct(data)
            .then(res => {
              if (res.code === 200) {
                this.$message.success('编辑成功')
                this.$router.push({ name: 'commodity' })
              }
            })
            .finally(() => {
              this.loading = false
            })
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.cbintpudnum {
  margin: 0 20px 0 0;
  width: 40%;
}

.spshu {
  width: 40%;
  min-width: 85px;
  width: 120px;
}

.intpudnum {
  margin: 0 20px 0 0;
  width: 70%;
}

.intpud {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.butdb {
  float: right;
  // position: absolute;
  // left: 550px;
  // top: 0px;
}

.editorted {
  margin: 20px auto;
  overflow: auto;
}

.content-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > *:not(.last-child) {
    margin-right: 10px;
  }
}

.search {
  width: 100%;
  height: 32px;
  margin: 0 0 20px 0;
}

.title {
  height: 32px;
  line-height: 32px;
  margin: 0 0 20px 0;
}

.table {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  > div {
    width: 48%;
  }
}

.content-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > *:not(.last-child) {
    margin-right: 10px;
  }
}

.search-alert-error {
  font-size: 10px;
  line-height: 1;
  padding: 5px 15px 5px 37px;

  /deep/ .ant-alert-icon {
    top: 5px;
  }
}

.editable-row-operations button {
  margin-right: 10px;
  padding: 0;
}
</style>
