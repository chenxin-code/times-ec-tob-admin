<template>
  <div style="height: 100%;marginBottom: 60px;">
    <div class="content-header">
      {{ id.id ? "编辑" : "添加" }}商品基础信息
      <span class="fallback" @click="FALLBACK" style="cursor:pointer">返回</span>
    </div>
    <div class="content-main" style="height: calc(100% - 91px);margin-top:20px;">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" style="height: 100%;overflow: auto;" autoComplete="off">
        <a-form-item label="SKU名称">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '供应商名称不能为空' },{whitespace: true,message: '供应商名称不能为空'}] } ]"
            placeholder="请输入供应商名称"
          />
        </a-form-item>
        <a-form-item label="合作期限">
          <a-range-picker showToday.Boolean="true"  style="width: 100%" 
          v-decorator="['time', { rules: [{ required: true, message: '合作期限不能为空' }] } ]"
            />
        </a-form-item>
        <a-form-item label="SKU编码">
          <a-input
            v-decorator="['code', { rules: [{ required: true, message: '合同编号不能为空' },{whitespace: true,message: '合同编号不能为空'}] } ]"
            placeholder="请输入合同编号"
          />
        </a-form-item>
        <a-form-item label="SPU名称">
          <a-input
            v-decorator="['contact', { rules: [{ required: true, message: '联系人名称不能为空' },{whitespace: true,message: '联系人名称不能为空'}] } ]"
            placeholder="请输入联系人名称"
          />
        </a-form-item>
        <a-form-item label="SPU编码">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item label="商城SKU自编码">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item label="商品状态">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item label="商品品类">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item label="所属品牌">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
         <a-form-item label="供应商">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
         <a-form-item label="税收分类编码">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
         <a-form-item label="税率">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
         <a-form-item label="价格类型">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
         <a-form-item label="库存">
          <a-input
            v-decorator="['contactPhone', { rules: [{ required: true, message: '联系电话不能为空' },{pattern :/^1[3456789]\d{9}$/,message: '联系电话格式不正确'}] } ]"
            placeholder="请输入联系电话"
          />
        </a-form-item>
        <a-form-item label="PC端商品详情">
          <quill-editor ref="myTextEditor" class="editorted" v-model="pccontent" :options="editorOption" ></quill-editor>
        
        </a-form-item>
        <a-form-item label="app商品详情">
          <quill-editor ref="TextEditor" class="editorted" v-model="appcontent" :options="editorOption" ></quill-editor>
        </a-form-item>
         <a-form-item label="成本价">
           <div class="intpud">
            <span  style="width: 50px;" >数量:</span> 
             <a-input placeholder="请输入" class="cbintpudnum" type="number" />
             <span  style="width: 70px;">成本价：</span> 
             <a-input placeholder="请输入" type="number" class="cbintpudnum" />
           </div>
        </a-form-item>

        <a-form-item label="销售价">
           <div class="intpud" v-for="(item,k) in dataList" :key="k">
             <span style="minWidth: 45px;" >数量：</span> 
             <a-input placeholder="请输入" :value="item.id" class="intpudnum"  type="number" />
             <span class="spshu">税前销售价:</span> 
             <a-input placeholder="请输入" :value="item.name" class="intpudnum" type="number" />
             <span class="spshu">税后销售价:</span> 
             <a-input placeholder="请输入" :value="item.cod" class="intpudnum" type="number" />
           </div>
          <a-button-group class="butdb">
            <a-button size='small' @click="dellis" :disabled='deldisabled'><a-icon type="minus" /></a-button>
            <a-button type="primary" @click="addlis" size='small'><a-icon type="plus"/></a-button>
          </a-button-group>
        </a-form-item>
      </a-form>
    </div>
    <div class="content-footer">
      <a-button type="primary" size="large" style="width: 120px;" :loading="loading" @click="onSubmit(0)">保存</a-button>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import moment from "moment";
import { mapActions } from "vuex";
import { debounce } from "@/utils/util";
import { quillEditor } from 'vue-quill-editor'
export default {
  name: "supplierEdit",
  props: {
    id: {
      type: Object,
      default: () => ({})
    }
  },
  components: { quillEditor},
  data() {
    return {
      form: this.$form.createForm(this, { name: "form" }),
      loading: false,
      companyName: "",
      dataSource: [],
      dataLiading: false,
      submitLoading: false,
      deldisabled:false,
      dataList:[{id:1}],
      //富文本
      pccontent: '',
      // editorOption: {
      //     placeholder: '编辑文章内容'
      //   },
        editorOption: {
                placeholder: "请在这里输入",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
                        ["blockquote", "code-block"], //引用，代码块
                        [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
                        [{ list: "ordered" }, { list: "bullet" }], //列表
                        [{ script: "sub" }, { script: "super" }], // 上下标
                        [{ indent: "-1" }, { indent: "+1" }], // 缩进
                        [{ direction: "rtl" }], // 文本方向
                        [{ size: ["small", false, "large", "huge"] }], // 字体大小
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
                        [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
                        [{ font: [] }], //字体
                        [{ align: [] }], //对齐方式
                        ["clean"], //清除字体样式
                        ["image"], //上传图片、上传视频
                    ],
                },
                },
      appcontent: '',
    };
  },
  computed: {},
  created() {
    this.initData(); //表
    if(this.id.id){
        api. updateProduct({supplierId: this.id.id}).then(res => {
        })
      }
  },
  mounted() {
    this.$refs.form.setFieldsValue({
        status: this.formList[1].selectOptions[0]?.id,
        supplier:this.formList[2].selectOptions[0]?.id,
      });
    this.getData();
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  },
  methods: {
    addlis(){
      this.deldisabled = false;
      console.log(this.dataList.slice(-1)[0])
      this.dataList.push({});
      console.log(this.dataList);
    },
    dellis(){
      if(this.dataList.length <=1){
        this.deldisabled = true;
        return;
      }
        this.dataList.shift();
    },
    //富文本方法
    onEditorChange({ editor, html, text }) {
            this.content = html;
        },
    initData() {
      this.dataLiading = true;
      const getCompanyPageList = new Promise((resolve, reject) => {
        api
          .getCompanyPageList({
            companyName: this.companyName,
            companyType: 2,
            pageIndex: this.currentLeft,
            pageSize: this.pageSizeLeft
          })
          .then(res => {
            this.totalLeft = Number(res.data.total);
            this.dataSource = res.data.records.map(a => {
              a.key = a.id;
              return a;
            });
            resolve(res.data);
          })
          .catch(err => {
            reject();
          });
      });
    },
   
    ...mapActions(["FALLBACK"]),
    getData() {
      if (this.id?.id) {
        api.getSupplierDetail({ id: this.id.id }).then(res => {
          if (res.code === 200) {
            const data = res.data;
            this.form.setFieldsValue({
              name: data.supplierName,
              time: [data.cooperationPeriod, data.cooperationEndperiod],
              contact: data.contactName,
              contactPhone: data.contactPhone,
              code: data.contractNo
              // companyName: this.companyName,
              // companyId: data.companyName,
            });
          }
        });
      }
    },
    onSubmit(e) {
      console.log(this.pccontent,this.appcontent);
      debounce(() => {
        const isAdd = !this.id.id;
        this.form.validateFields((err, values) => {
          if (!err) {
            this.loading = true;
            values = {
              id: !isAdd ? this.id.id : undefined,
              contractNo: values.code,
              supplierName: values.name, //供应商名称
              // cooperationPeriod: values.time[0], //合作期限
              cooperationPeriod:
                values.time !== []
                  ? moment(values.time[0]).format("YYYY-MM-DD")
                  : null,
              cooperationEndperiod:
                values.time !== []
                  ? moment(values.time[1]).format("YYYY-MM-DD")
                  : null,
              contactName: values.contact, //联系人名称
              contactPhone: values.contactPhone, //联系电话
              // companyName: this.companyName,
              // companyId: this.companyId,
              state: 1, //供应商状态 默认1启用   0禁用
              companyList: this.dataSourceRight.map(a => a.id)
            };
            if(this.dataSourceRight.length < 1){
              this.loading = false;
              return this.$message.error("请关联子公司")
            }
            api[isAdd ? "addSupplier" : "editSupplier"](values)
              .then(res => {
                if (res.code === 200) {
                  this.$message.success((isAdd ? "新增" : "编辑") + "成功");
                  this.$router.push({ name: "supplier" });
                }
              })
              .finally(() => {
                this.loading = false;
              });
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.cbintpudnum{
  margin: 0 20px 0 0;
  width: 40%;
}
.spshu{
  width: 40%;
  min-width: 85px;
}
.intpudnum{
  margin: 0 20px 0 0;
  width: 70%;
}
.intpud{
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.butdb{
  float: right;
  // position: absolute;
  // left: 550px;
  // top: 0px;
}
.editorted{
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
