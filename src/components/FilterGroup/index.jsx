/***
 * 表单查询组件
 * rowCol: 一行显示多少列
 * formList: 表单项
 *  {
 *    label: String
 *    type: [input, select, date, button,input.number]
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
const defaultFn = () => undefined;
const FormList = {
  name: 'Button',
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
    doubleBtn: false,
    doubleBtnText: '',
    doubleBtnEvent: {
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
    }
  },
  data() {
    return {
      form: null
    };
  },
  created: function() {
    this.form = this.$form.createForm(this, { name: 'formList' });
    this.setFieldsValue = this.form.setFieldsValue;
    this.getFieldsValue = this.form.getFieldsValue;
  },
  computed: {
    rowSpan() {
      return Math.floor(24 / this.rowCol);
    }
  },
  methods: {
    generateItem(attrs) {
      const {
        type,
        name,
        rules,
        onChange = defaultFn,
        onSearch = defaultFn,
        buttonName,
        disabled,
        showSearch,
        ...others
      } = attrs;
      switch (type) {
        case 'input':
          return <a-input v-decorator={[name, { rules: rules }]} {...others} placeholder={attrs.placeholder} />;
        case 'input.number':
          console.log({...others})
        return <a-input type="number" v-decorator={[name, { rules: rules }]} {...others} placeholder={attrs.placeholder} />;
        case 'select':
          return (
            <a-select
              v-decorator={[name, { rules: rules }]}
              placeholder={attrs.placeholder}
              onChange={onChange}
              disabled={disabled}
              show-search={showSearch}
              filter-option={onSearch}
              {...others}>
              {(others.selectOptions || []).map(option => (
                <a-select-option key={option.id + '1'} value={option.id} data-title={option.name}>
                  {option.name}
                </a-select-option>
              ))}
            </a-select>
          );
        case 'datePicker':
          return <a-date-picker v-decorator={[name, { rules: rules }]} {...others} />;
        case 'rangePicker':
          return <a-range-picker v-decorator={[name, { rules: rules }]} {...others} />;
        default:
          return null;
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
            this.onSubmit(values);
        }
      });
    }
  },
  render() {
    return (
      <a-form
        form={this.form}
        autoComplete='off'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        {...this.formSetting}
        onSubmit={this.handleSubmit}>
        <a-row>
            <a-col span="20">
            <a-row gutter={24}>
                {this.formList.map((item, index) => {
                    const { align, labelCol, wrapperCol, ...others } = item;
                    return (
                    <a-col span={this.formList.length % 3 === 1 ? 6 : this.rowSpan}>
                        <a-form-item key={index} label={item.label} align={align} labelCol={labelCol} wrapperCol={wrapperCol}>
                        {this.generateItem(others)}
                        </a-form-item>
                    </a-col>
                    );
                })}
            </a-row>
            </a-col>
            <a-col span="2" offset="2">
              <a-button style={{width: '100%'}} type="primary" html-type="submit" onClick={this.handleSubmit}>查询</a-button>
              <a-button v-show={this.doubleBtn} style={{width: '100%', marginTop: '20px'}} type="primary" onClick={this.doubleBtnEvent}>{this.doubleBtnText}</a-button>
            </a-col>
        </a-row>
      </a-form>
    );
  }
};

export default FormList;
