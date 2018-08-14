# gulp 脚手架
gulp 前端开发环境,适用于传统多页应用,H5等

## 使用
- 克隆项目
- 按照目录划分进行编码
- 启动项目,码力全开
- 拷贝dist目录,上线

## 运行

克隆
```
git clone  https://github.com/jydeng/gulp-structure.git;
```

安装依赖
```
npm install; 
```

启动
```
npm start;
```

## 目录结构分析
- src -- 源码
  - assets -- 图片、SVG等资源目录
  - css -- css
  - js  -- js
  - tpl -- 模板,页头页脚等

- dist -- 生成、压缩后的代码

## 说明
具体配置细节可以参见gulpfile.js, 也可以参考src/index.html,这是一个栗子,若需要stylus、sass、typescript、es6支持可以在npm上搜索gulp-plugins进行安装。

gulp整个流程相对于webpack更加简洁明了,在开发多页面应用,例如首页、H5等项目中还是很方便的。