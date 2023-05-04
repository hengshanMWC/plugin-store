# Overview
加载储存插件，支持函数、对象、路径引入

# Install
安装依赖
```
npm i plugin-store
```
```js
// esm
import { PluginStore } from 'plugin-Store'

const pluginStore = new PluginStore()
```
```js
// cjs
const { PluginStore } = require('plugin-Store')

const pluginStore = new PluginStore()
```
```js
// script引入
<script src="https://unpkg.com/box-cat/dist/boxCat.js"></script>
const pluginStore = new PluginStore.PluginStore()
```

# Class
PluginStore类型
```ts
type CreatePluginData<T> = () => T
type AddType<T> = T | CreatePluginData<T>
export class PluginStore<T extends {
  id: any
}> {
  use(...plugins: Array<AddType<T> | string>): Promise<void>
  get(id: T['id']): T | undefined
  remove(id: string): void
}
```
# Api
## use
注册插件，数据结构需要带id字段，用来标识插件id，防止重复注册。

路径注册通过 import 读取**默认导出**的插件
```js
pluginStore.use({
  id: 'test'
}, createPlugin(), './plugin')
```

## get
通过id获取插件
```ts
const id = 'test'
pluginStore.use({
  id
})
pluginStore.get(id).id === id
```

## remove
通过id删除插件
```ts
pluginStore.remove('test')
```





