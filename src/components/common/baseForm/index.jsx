import { _ } from "core-js"

/***
 * 表单查询组件
 * rowCol: 一行显示多少列
 * formList: 表单项
 *  {
 *    label: String
 *    type: [input, select, date, button]
 *    name: String
 *    placeholder: String
 *    selectOptions: []
 *    disabled: Boolean
 *    rules: []
 *    initialValue: any
 *    onChange: Function
 *    htmlType
 *    align
 *    labelCol
 *    wrapperCol
 *  }
 * onSubmit 默认提交表单事件
 * @returns {undefined}
 */
const defaultFn = () => undefined

const FormList = {
  name: "baseForm",
  props: {
    formList: {
      type: Array,
      default: []
    },
    rowCol: {
      type: [Number, String],
      default: 3
    },
    formSetting: {
      type: Object,
      default: () => ({})
    },
    onSubmit: {
      type: Function,
      default: defaultFn
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    addbutton:{
        type:Boolean,
        default:false
    },
    addText:{
        type: String,
        default:'添加'
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "formList" }),
      style:{
        marginLeft:'15px'
      }
    }
  },
  created: function() {
    this.form = this.$form.createForm(this, { name: "formList" })
    this.setFieldsValue = this.form.setFieldsValue
    this.getFieldsValue = this.form.getFieldsValue
  },
  computed: {
    rowSpan() {
        return Math.floor(24 / this.rowCol)
    }
  },
  methods: {
    generateItem(attrs) {
      const {
        type,
        dateType,
        name,
        rules,
        onChange = defaultFn,
        onSearch = defaultFn,
        buttonName,
        buttonType = "primary",
        htmlType = "submit",
        disabled,
        showSearch,
        initialValue,
        ...others
      } = attrs,
      {style,addbutton,addText} = this;
      switch (type) {
        case "input":
          return (
            <a-input
              v-decorator={[name, { rules: rules, initialValue }]}
              {...others}
              maxLength={attrs.maxLength}
              placeholder={attrs.placeholder}
              disabled={disabled}
            />
          )
        case "select":
          return (
            <a-select
              v-decorator={ [name, { rules: rules, initialValue }] }
              placeholder={ attrs.placeholder }
              onChange={ onChange }
              disabled={disabled}
              show-search={showSearch}
              filter-option={onSearch}
              { ...others }
            >
              {(others.selectOptions || []).map(option => (
                <a-select-option
                  key={option.id}
                  value={option.id}
                  data-title={option.name}
                >
                  {option.name}
                </a-select-option>
              ))}
            </a-select>
          )
        case "picker":
          let dateLabel = `a-${dateType ?? 'date'}-picker`
          return (
            <dateLabel
              v-decorator={[name, { rules: rules, initialValue }]}
              disabled={disabled}
              {...others}
            />
          )
        case "button":
            let arr = [
                <a-button
                  type={buttonType}
                  html-type={htmlType}
                  disabled={disabled}
                  {...others}
                  style={style}
                >
                  {buttonName}
                </a-button>,
                <a-button
                  type="primary"
                  class="a-buttom-reset"
                  style={style}
                  onClick={this.handleReset}
                >
                  重置
                </a-button>,
            ];
            console.log(addbutton,'addbutton');
            if(addbutton){
                let itemArr = <a-button
                        type="primary"
                        class="a-buttom-reset"
                        style={style}
                        onClick={this.onAdd}
                    >
                    {addText}
                </a-button>;
                arr.push(itemArr);
            } 
          return arr;
        default:
          return null
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.onSubmit(values);
        }
      })
    },
    handleReset(){
      this.form.resetFields();
      this.form.validateFields((err, values) => {
        this.onSubmit(values);
      })
    },
    onAdd(){
        this.$emit('onAdd');
    }
  },
  render() {
    return (
      <a-form
        form={this.form}
        autoComplete="off"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        {...this.formSetting}
        onSubmit={this.handleSubmit}
      >
        <a-row gutter={24}>
          {this.formList.map((item, index) => {
            const { align, labelCol, wrapperCol, ...others } = item
            return (
                <a-col  span={this.formList.length % 3 === 1 ? 6 : this.rowSpan}>
                    <a-form-item
                        key={index}
                        label={item.label}
                        align={align}
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                        style={{'margin-bottom':0}}
                        >
                        {this.generateItem(others)}
                    </a-form-item>
                </a-col>
            )
          })}
        </a-row>
      </a-form>
    )
  }
}

export default FormList
