# gulp-structure

gulp 前端工作流,适用于非框架多页应用,Html5 活动页等不方便使用 webpack 管理依赖的项目。

## 如何使用

1. 克隆项目、安装依赖一气呵成
2. 阅读gulpfile.js，按照项目目录进行开发
3. npm run start 调试
4. npm run build 打包构建 
5. 拷贝/dist上线

## 目录结构
```
project
|   config.json 项目配置文件
|   gulpfile.js gulp配置文件
|   README.md   说明文件
|—— src 源码
|   |   index.html 主页
|   |
|   |—— tpl 模板
|   |   header.html 头部
|   |   footer.html 底部
|   |
|   |—— scss SASS
|   |   index.scss
|   |
|   |—— js JavaScript
|   |   index.js
|   |
|   |—— css CSS
|   |   index.css
|   |
|   |—— assets  各种资源以及库文件
|   |
|   |
|—— dist 构建发布

```

## 说明

gulp 整个流程相对于 webpack 更加简洁明了,适用于非框架多页应用,Html5 活动页等不方便使用 webpack 管理依赖的项目。
