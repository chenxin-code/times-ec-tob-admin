export const filtFn = function (arr, v) {
  let str = '';
  arr.forEach(element => {
    if (element.v === v) str = element.n;
  });
  return str;
}

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

export const orderSourceArr = [
  {n:'时代星选小程序', v: 'TIMES_XINGXUAN'},
  {n:'邻里邦ProAPP', v: 'TIMES_LINLIBANG'},
  {n:'美居APP', v: 'TIMES_MEIJU'},
]

export const orderStateListArr = [
  {n:'待支付', v: 'UNPAID'},
  {n:'已支付', v: 'PAID'},
  {n:'进行中', v: 'ON_GOING'},
  {n:'已完成', v: 'COMPLETED'},
  {n:'已取消', v: 'CANCELED'},
  { n: '交易关闭', v: 'CLOSE' },
  {n:'全部', v: 'all'}
]

export const tableColumns = [
  {
    title: "商品编码",
    dataIndex: "productCode",
    width: 200,
    ellipsis: false,
  },
  {
    title: "招标物料编码",
    width:200,
    dataIndex: "materialNumber",
    // ellipsis: true,
  },
  {
    title: "物料名称",
    width:120,
    dataIndex: "materialName",
    // ellipsis: true,
  },
  {
    title: "单位/名称",
    width:120,
    dataIndex: "unit",
    // ellipsis: true,
  },
  {
    title: "规格/材质/类别",
    width:140,
    dataIndex: "texture",
    // ellipsis: true,
  },
  {
    title: "要求",
    width:120,
    dataIndex: "demand",
    // ellipsis: true,
  },
  {
    title: "税率",
    width:120,
    dataIndex: "taxRate",
    // ellipsis: true,
  },
  {
    title: "数量",
    width:120,
    dataIndex: "quantityOrdered",
    // ellipsis: true,
  },
  {
    title: "单价",
    width:120,
    dataIndex: "unitPrice",
    // ellipsis: true,
  },
  {
    title: "费用小计",
    width:120,
    dataIndex: "orderAmount",
    // ellipsis: true,
  },
  {
    title: "委托单位",
    width:220,
    dataIndex: "delegateImplement",
    // ellipsis: true,
  },
  {
    title: "交货时间",
    width:200,
    dataIndex: "deliveryTime",
    // ellipsis: true,
  },
];