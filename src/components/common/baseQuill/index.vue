<template>
  <div class="quill-wrap">
    <quill-editor
      v-model="content"
      class="editor"
      ref="myQuillEditor"
      :options="editorOption"
      v-bind="config"
    >
    </quill-editor>
  </div>
</template>
<script>
  import {quillEditor} from 'vue-quill-editor'
  import editorOption from '@/utils/quillConfig'
  import 'quill/dist/quill.core.css' // import styles
  import 'quill/dist/quill.snow.css' // for snow theme
  import 'quill/dist/quill.bubble.css' // for bubble theme

  export default {
    name: 'baseQuill',
    components: {quillEditor},
    data() {
      return {
       content: '',
       editorOption: editorOption
      }
    },
    props:{
      config:{
        type: Object,
        default: () => {}
      }
    }
  }
</script>
<style lang="less" scoped>
.editor {
  line-height: normal !important;
  height: 500px;
  display: flex;
  flex-direction: column;
  /deep/.ql-container{
    background-color: #fff;
    height: auto;
    min-height: calc(100% - 42px);
  }
  /deep/.ql-editor{
    background-color: #fff;
  }
}
</style>