# snx-webbv

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

###包结构

```
|——public
|	|——favicon.ico          # logo
|	|——index.html           # 入口模板
|——src
|	|——api                  # api
|	|——assets               # 本地静态资源
|	|——components           # 业务通用组件
|	|——config               # 项目基础配置,包含menu、portal
|	|——constance            # 全部变量配置
|	|——pages                # 业务页面
|	|——router               # Vue-Router
|	|——store                # Vuex
|	|——utils                # 工具库
|	|——App.vue              # Vue模板入口
|	|——main.js              # Vue入口js

```

### 新页面

- 需要在目录下建立文件夹，命名为小写，如需分词使用驼峰 ，如 “addSpace”
- 文件夹下至少需要 1 个文件

```
|-- page
|	|-- index.vue // 页面
```

### 全局 css

```
|—src
|	|—assets
|   |	|—css
|   |	|	|—common.less
```

### api 定义

```
|—api
|	|—模块.js              配置当前模块ajax
|	|—index.js            引入模块.js
|	|—urlConfig.js        配置api
```

#### 接口地址列表

- 接口地址 swigger
- 案场：https://mall-uat-api-linli.timesgroup.cn:9527/times-ec-anchang/swagger-ui.html#/%E5%BA%94%E4%BB%98%E5%8D%95%E6%8E%A5%E5%8F%A3%E6%9C%8D%E5%8A%A1
- erp：https://mall-uat-api-linli.timesgroup.cn:9526/times-ec-erp/swagger-ui.html#/%E8%BD%AC%E6%8E%A5%E5%95%86%E5%93%81%E4%B8%AD%E5%BF%83%E6%9C%8D%E5%8A%A1/queryBySkuIdUsingPOST


---
###  案场订单列表 & 售后列表
#### 案场订单列表
- 商品列表渲染常规字段 定义 在defaultConfig.js中定义，
- action字段 目前定义  查看详情，申请售后，取消订单
- 申请售后模态弹窗与订单详情模态弹窗一致，已封装在afterSaleApproveModal.vue文件
- 售后申请需获取订单商品数量，根据可申请售后的商品数 发起售后申请，需验证可售后数量  不可为空或为0
- 订单详情配送信息  需要区分部分发货 及全部发货的状态
- 配送信息需要在erp后台操作发货，才有发货信息流转到案场订单信息的配送信息
- 配送信息的通过/挂起操作，通过即等于确认收货操作，挂起后仍可以通过


#### 售后列表
- 订单列表，订单详情申请售后结束统一返回售后列表 ，
> 审核状态枚举
``` js
    {
		id: "APPROVING",
		name: "审核中",
	},
	{
		id: "REJECT",
		name: "审核不通过",
	},
	{
		id: "APPROVED",
		name: "审核通过",
	},
	{
		id: "CANCEL",
		name: "自行取消",
	}
```
- 售后列表表格目前仅允许操作取消订单操作，更多是作为展示使用
