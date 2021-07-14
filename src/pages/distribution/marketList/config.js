export const filtFn = function (arr, v) {
  let str = '';
  arr.forEach(element => {
    if (element.v === v) str = element.n;
  });
  return str;
}

export const stateArr = [
  {n: '是', v: 'Y' },
  {n:'否', v: 'N'},
]

export const payTypeArr = [
  {n: '纸质专用发票', v: 'WECHAT' },
  {n:'电子专用发票', v: 'ALI_PAY'},
  {n:'电子普通发票', v: 'CARD'},
  {n:'纸质普通发票', v: 'CAR1D'},
]

export const fromArr = [
  {
    n: '购买方', c: [
    {n:'购买方式类型', c: 'TRAVEL', t: 'sele' },
    {n:'名称', c: 'TRAVEL', t: 'input' },
    {n:'纳税人识别号', c: 'TRAVEL',t:'input'},
    {n:'电话', c: 'TRAVEL',t:'input'},
    {n:'开户行', c: 'TRAVEL',t:'input'},
    {n:'开户行账号', c: 'TRAVEL',t:'input'},
    {n:'地址', c: 'TRAVEL',t:'input'},
  ]},
  {n:'销售方', c: [
    {n:'名称', c: 'TRAVEL', t: 'input' },
    {n:'纳税人识别号', c: 'TRAVEL',t:'input'},
    {n:'电话', c: 'TRAVEL',t:'input'},
    {n:'开户行', c: 'TRAVEL',t:'input'},
    {n:'开户行账号', c: 'TRAVEL',t:'input'},
    {n:'地址', c: 'TRAVEL',t:'input'},
  ]}
]


export const tableColumns = [
  {
    title: "采购单编号",
    dataIndex: "purchaseNo",
    width: 200,
    // ellipsis: false,
  },
  {
    title: "采购项目",
    dataIndex: "projectName",
    width: 160,
    // ellipsis: false,
  },

  {
    title: "采购日期",
    dataIndex: "purchaseDate",
    width: 200,
    // ellipsis: false,
  },
  // {
  //   title: "文件名称",
  //   dataIndex: "fileName",
  //   width: 160,
  //   // ellipsis: false,
  // },
  {
    title: "出账公司",
    dataIndex: "companyName",
    width: 160,
    // ellipsis: false,
  },
  {
    title: "出账公司编码",
    dataIndex: "companyCode",
    width: 160,
    // ellipsis: false,
  },
  {
    title: "出账公司类型",
    dataIndex: "companyType",
    width: 160,
    // ellipsis: false,
  },
  {
    title: "业绩财务账套",
    dataIndex: "financialAccounting",
    width: 160,
    // ellipsis: false,
  },
  {
    title: "业绩财务账套编码",
    dataIndex: "financialAccountCode",
    width: 160,
    // ellipsis: false,
  },
  {
    title: "财务NC系统编码",
    dataIndex: "ncCode",
    width: 160,
  },

  {
    title: "城市公司",
    dataIndex: "cityCompany",
    width: 160,
  },
  {
    title: "上传日期",
    dataIndex: "uploadingDate",
    width: 200,
  },
  {
    title: "上传人",
    dataIndex: "uploadingName",
    width: 160,
  },

  {
    title: "是否已下单",
    dataIndex: "state",
    width: 160,
  },
  {
    title: "操作",
    key: "operation",
    scopedSlots: { customRender: "operation" },	//这个应该是插槽的东西
    width: 120,
    fixed: "right",
  },
];