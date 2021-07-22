<template>
    <div class="edit_container">
        <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
        >
        </quill-editor>
    </div>
</template>
<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import { quillRedefine } from "vue-quill-editor-upload";
const SmAuthorization = localStorage.getItem("SmAuthorization");
export default {
    name: "editor",
    props: {
        baseUrl: {
            type: String,
        },
        initContentText: {
            type: String,
            default: "",
        },
        contentOnlyCheck:{
            type: Boolean,
            default: false,
        }
    },
    components: {
        quillEditor,
    },
    data() {
        return {
            SmAuthorization: SmAuthorization,
            // SmAuthorization:{

			// 			},
            content: ``,
            editorOption: {
                placeholder: "请在这里输入",
                modules: {
                    toolbar: [
                        // ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
                        // ["blockquote", "code-block"], //引用，代码块
                        // [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
                        // [{ list: "ordered" }, { list: "bullet" }], //列表
                        // [{ script: "sub" }, { script: "super" }], // 上下标
                        // [{ indent: "-1" }, { indent: "+1" }], // 缩进
                        // [{ direction: "rtl" }], // 文本方向
                        // [{ size: ["small", false, "large", "huge"] }], // 字体大小
                        // [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
                        // [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
                        // [{ font: [] }], //字体
                        // [{ align: [] }], //对齐方式
                        // ["clean"], //清除字体样式
                        // ["image"], //上传图片、上传视频
                    ],
                },
            },
        };
    },
    created: function() {
        let that = this;
        that.upLoadUrl = that.baseUrl;
        let sma = that.SmAuthorization
        // return
        that.editorOption = quillRedefine({
            placeholder: "请在这里输入",
            // 图片上传的设置
            uploadConfig: {
                action: that.upLoadUrl, // 必填参数 图片上传地址
                // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
                // 你必须把返回的数据中所包含的图片地址 return 回去
                token: that.SmAuthorization,
                // 设置请求头 xhr: 异步请求， formData: 表单对象
                header: (xhr, formData) => {
                    // xhr.setRequestHeader('myHeader','myValue');
                    // formData.append('token', '1234')
                    xhr.setRequestHeader('SmAuthorization',sma);
                },
                res: (respnse) => {
                    console.log(respnse);
                    if(that.contentOnlyCheck) return false
                    var path = respnse.data; //这里return你的图片地址即可
                    return path;
                },
                name: "file", // 图片上传参数名
                size: 2048, // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
            },
            toolOptions: [
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
                ["clean"],
                ["image"],
            ],
        });
    },
    watch: {
        initContentText(val, newVal) {
            // console.log(val, newVal);
            this.content = val;
        },
    },
    mounted() {
        this.content=this.initContentText
    },
    methods: {
        setEditorEnable(val){
            this.editor.enable(val);
        },
        getValue() {
            return this.content;
        },
        onEditorReady(editor) {
            // 准备编辑器
        },
        onEditorBlur() {}, // 失去焦点事件
        onEditorFocus(e) {
            // 获得焦点事件
            // console.log("获得焦点事件", e.html);
        },
        onEditorChange(event) {
            // console.log(event.html);
            // this.htmls = event.html;
        }, // 内容改变事件
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
};
</script>
<style lang="less">

.ql-editor{
    min-height: 300px;
max-height: 500px;
}
</style>
