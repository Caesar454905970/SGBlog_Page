# Vue 3 + Vite +element plus

```
v16.13.1
```

## Recommended IDE Setup

## 项目结构:

```

2022-01-20  18:27                68 App.vue
2022-01-20  14:24    <DIR>          assets  静态文件目录
2022-01-21  15:27    <DIR>          components 组件目录
2022-01-21  15:23    <DIR>          Layout 后台框架
2022-01-21  11:32               386 main.js
2022-01-21  13:19    <DIR>          router 路由设置
2022-01-20  16:55    <DIR>          store vuex
2022-01-21  14:04    <DIR>          utils 工具
2022-01-21  10:10    <DIR>          views  菜单跳转路由
```




## 搭建第一个 Vite 项目

UP主博客文章

```
https://blog.csdn.net/xqnode/article/details/121100123?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164265710416780271576160%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=164265710416780271576160&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-121100123.first_rank_v2_pc_rank_v29&utm_term=Vite%2BVue3%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE%E8%84%9A%E6%89%8B%E6%9E%B6&spm=1018.2226.3001.4187
```

```
npm init vite@latest
```

选vue

然后进入项目文件（不选择ts_vue)

执行

```
npm install

npm run dev
```

## 安装路由

```
npm install vue-router@4
```

```
npm i element-plus -S

```

#### vue中 查看各个版本

```
package.json
```

## 安装Element-plus

```
npm i element-plus -S
```

### 使用图标步骤

```
npm install @element-plus/icons-vue -s

package.json找到@element-plus/icons-vue

在组件中引入 Edit必须 大写
import { Edit } from '@element-plus/icons-vue'

使用
  <el-icon :size="20" :color="'green'">
    <edit></edit>
  </el-icon>
```

