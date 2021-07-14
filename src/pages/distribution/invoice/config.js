export const filtFn = function (arr, v) {
  let str = '';
  arr.forEach(element => {
    if (element.v === v) str = element.n;
  });
  return str;
}

export const invoiceTypeArr = [
  {n: '纸质专用发票', v: '0' },
  {n:'电子专用发票', v: '1'},
  {n:'电子普通发票', v: '2'},
  {n:'纸质普通发票', v: '3'},
]
export const invoicingStatusArr = [
  {n:'未开票', v: '0'},
  {n:'开票成功', v: '1'},
  {n: '开票失败', v: '2'},
  {n:'开票中', v: '3'},
]
export const fundRestreamArr = [
  {n:'否', v: '0'},
  {n:'是', v: '1'},
]
export const approvalStatusArr = [
  {n:'未审核', v: '0'},
  {n:'通过', v: '1'},
]
export const fromArr = [
  {
    n: '购买方', c: [
    {n:'购买方式类型', c: 'TRAVEL', t: 'sele' },
    {n:'名称', c: 'gmfname', t: 'input' },
    {n:'纳税人识别号', c: 'gmftaxIdentifyNumber',t:'input'},
    {n:'电话', c: 'gmftel',t:'input'},
    {n:'开户行', c: 'gmfaccountBank',t:'input'},
    {n:'开户行账号', c: 'gmfaccount',t:'input'},
    {n:'地址', c: 'gmfaddress',t:'input'},
  ]},
  {n:'销售方', c: [
    {n:'名称', c: 'xsfname', t: 'input' },
    {n:'纳税人识别号', c: 'xsftaxIdentifyNumber',t:'input'},
    {n:'电话', c: 'xsftel',t:'input'},
    {n:'开户行', c: 'xsfaccountBank',t:'input'},
    {n:'开户行账号', c: 'xsfaccount',t:'input'},
    {n:'地址', c: 'xsfaddress',t:'input'},
  ]}
]
export const rules = {
  invoiceType: [
    { required: true, message: '请选择类型', trigger: 'blur' },
  ],
  buyerType: [
    { required: true, message: '请选择类型', trigger: 'change' },
  ],
  gmfname: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  gmftaxIdentifyNumber: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  gmftel: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  gmfaccountBank: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  gmfaccount: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  gmfaddress: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  xsfname: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  xsftaxIdentifyNumber: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  xsftel: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  xsfaccountBank: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  xsfaccount: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  xsfaddress: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  invoicingPerson: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  review: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  payee: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
};
export const tableColumns = [ //表头数据
  {
    title: "发票编码",
    dataIndex: "invoiceCode",
    width:200
    // ellipsis: true,
  },
  {
    title: "出账公司",
    dataIndex: "org",
    width:120

    // ellipsis: true,
  },
  {
    title: "发票类型",
    dataIndex: "invoiceType",
    width:120

    // ellipsis: true,
  },
  {
    title: "金额",
    dataIndex: "mny",
    width:100

    // ellipsis: true,
  },
  {
    title: "税额",
    dataIndex: "tax",
    width:100

    // ellipsis: true,
  },
  {
    title: "开票时间",
    dataIndex: "invoiceTime",
    width:200
    // ellipsis: true,
  },
  {
    title: "开票人",
    dataIndex: "invoicingPerson",
    width:120

    // ellipsis: true,
  },
  {
    title: "审核状态",
    dataIndex: "approvalStatus",
    width:100

    // ellipsis: true,
  },
  {
    title: "审核人",
    dataIndex: "approvalPerson",
    width:120

    // ellipsis: true,
  },
  {
    title: "审核意见",
    dataIndex: "approvalComments",
    width:180

    // ellipsis: true,
  },
  {
    title: "开票状态",
    dataIndex: "invoicingStatus",
    width:100

    // ellipsis: true,
  },
  {
    title: "是否回款",
    dataIndex: "fundRestream",
    width:100

    // ellipsis: true,
  },
  {
    title: "操作",//"更改出账公司",
    key: "operation",
    scopedSlots: { customRender: "operation" },	//这个应该是插槽的东西
    width: 120,
    fixed: "right",
  },
]
export const tableColumnsAdd = [ //表头数据
  {
    title: "订单编号",
    dataIndex: "supplierOrderNo",
    width: 220,
    customRender: (text, record, index) => {
      let str = text || record.orderNo || '';
			return str;
		},
    // ellipsis: true,
  },
  {
    title: "税收分类编码",
    width:180,
    dataIndex: "taxCode",
    // ellipsis: true,
    customRender: (text, record, index) => {
      let str = text || record.taxClassificationCode || '';
			return str;
		},
  },
  {
    title: "商品名称",
    dataIndex: "itemName",
    width:220,
    customRender: (text, record, index) => {
      let str = text || record.productName || '';
			return str;
		},
    // ellipsis: true,
  },
  {
    title: "规格",
    dataIndex: "itemSpecs",
    width:220,
    customRender: (text, record, index) => {
      let str = text || record.specification || '';
			return str;
		},
    // ellipsis: true,
  },
  {
    title: "单位",
    dataIndex: "unit",
    width:100,

    // ellipsis: true,
  },
  {
    title: "数量",
    dataIndex: "buyNum",
    width:100,
    customRender: (text, record, index) => {
      let str = text || record.number || '';
			return str;
		},
    // ellipsis: true,
  },
  {
    title: "单价",
    dataIndex: "itemPrice",
    width:100,
    customRender: (text, record, index) => {
      let str = text || record.price || '';
			return str;
		},
    // ellipsis: true,
  },
  {
    title: "金额",
    dataIndex: "totalAmount",
    width:100,
    customRender: (text, record, index) => {
      let str = text || record.mny || '';
			return str;
		},
    // ellipsis: true,
  },
  {
    title: "税率",
    dataIndex: "taxRate",
    width:100,

    // ellipsis: true,
  },
  {
    title: "税额",
    dataIndex: "tax",
    width:100,
    customRender: (text, record, index) => {
			return Number(text).toFixed(2);
		},
    // ellipsis: true,
  },
]
export const tableColumnsAddTab = [ //表头数据
  {
    title: "采购单号",
    width:220,
    dataIndex: "purchaseNo",
    // ellipsis: true,
  },
  {
    title: "订单号",
    width:220,
    dataIndex: "supplierOrderNo",
    // ellipsis: true,
  },
  {
    title: "出账公司",
    width:140,
    dataIndex: "payCompanyName",
    // ellipsis: true,
  },
  {
    title: "出账公司编码",
    width:220,
    dataIndex: "payCompanyCode",
    // ellipsis: true,
  },
  {
    title: "出账公司类型",
    width:120,
    dataIndex: "payCompanyType",
    // ellipsis: true,
  },
  {
    title: "业绩财务帐套",
    width:120,
    dataIndex: "financePerformanceBook",
    // ellipsis: true,
  },
  {
    title: "财务NC系统编码",
    width:220,
    dataIndex: "financeNcCode",
    // ellipsis: true,
  },
  {
    title: "城市公司",
    width:220,
    dataIndex: "cityCompany",
    // ellipsis: true,
  },
  {
    title: "商品名称",
    width:200,
    dataIndex: "itemName",
    // ellipsis: true,
  },
  {
    title: "货品编码（sku）",
    width:220,
    dataIndex: "skuCode",
    // ellipsis: true,
  },
  {
    title: "购买数量",
    dataIndex: "buyNum",
    width:100,
    // ellipsis: true,
  },
  {
    title: "发货数量",
    dataIndex: "deliveryNum",
    width:100,
    // ellipsis: true,
  },
  {
    title: "单价",
    width:100,
    dataIndex: "itemPrice",
    // ellipsis: true,
  },
  {
    title: "金额",
    width:100,
    dataIndex: "totalAmount",
    // ellipsis: true,
  },
  {
    title: "税收分类编码",
    width:220,
    dataIndex: "taxCode",
    // ellipsis: true,
  },
  {
    title: "税率",
    width:100,
    dataIndex: "taxRate",
    // ellipsis: true,
  },
  {
    title: "已开票数量",
    width:120,
    dataIndex: "invoiceNum",
    // ellipsis: true,
  },
  {
    title: "开票数量",
    width: 100,
    key: "kpsl",
    scopedSlots: { customRender: "kpsl" },
    // ellipsis: true,
  },
  {
    title: "可开票数量",
    width:180,
    dataIndex: "canOpenInvoiceNum",
    // ellipsis: true,
  },
  // {
  //   title: "已退款退货成功数",
  //   width:180,
  //   dataIndex: "name12",
  //   // ellipsis: true,
  // },
]