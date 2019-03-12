const gulp = require("gulp"); // gulp
const util = require("gulp-util"); // gulp辅助调试
const uglify = require("gulp-uglify"); // 压缩混淆js
const minifyCSS = require("gulp-minify-css"); // 压缩css
const fileinclude = require("gulp-file-include"); // 文件级模板引擎
const autoprefixer = require("gulp-autoprefixer"); // 添加css前缀
const browerSync = require("browser-sync").create(); // 开发调试服务器
const sass = require("gulp-sass"); // css预处理
const px2rem = require("gulp-px2rem-plugin"); // rem自动计算
const rev = require("gulp-rev-append"); // 引用资源自动计算添加hash
const clean = require("gulp-clean"); // 清理生成文件
const minifyHTML = require("gulp-minify-html"); // 压缩html
const config = require("./config.json"); // 配置文件，主要是px2rem宽度设置
const path = {
  script: { src: "./src/js/*.js", dst: "./dist/js" },
  css: { src: "./src/css/*.css", dst: "./dist/css" },
  scss: { src: "./src/scss/*.scss", dst: "./dist/css" },
  html: { src: "./src/*.html", dst: "./dist", rev: "./dist/*.html" },
  tpl: { src: "./src/tpl/*.html", dst: "./src/tpl" },
  assets: { src: "./src/assets/**/*.*", dst: "./dist/assets" },
  clean: {
    css: "./dist/css/*.css",
    js: "./dist/js/*.js",
    html: "./dist/*.html"
  },
  dist: "./dist",
  all: "./dist/**/*.*"
};
// 错误处理函数
const errFn = err => {
  util.log(util.colors.red("[Error]"), err.toString());
};

// sass 编译引擎
sass.compiler = require("node-sass");

//js文件 源=>压缩=>输出
gulp.task("script", function() {
  gulp
    .src(path.script.src)
    .on("error", errFn)
    .pipe(uglify())
    .pipe(gulp.dest(path.script.dst));
});

//css文件 源=>压缩=>补全前缀=>输出
gulp.task("css", function() {
  gulp
    .src(path.css.src)
    .on("error", errFn)
    .pipe(px2rem({ width_design: config.width_design }))
    .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.css.dst));
});

//处理SASS文件：转换，压缩自动加上前缀名，然后换个名输出;
gulp.task("scss", function() {
  gulp
    .src(path.scss.src)
    .on("error", errFn)
    .pipe(sass())
    .pipe(px2rem({ width_design: config.width_design }))
    .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.scss.dst));
});

//其他资源文件
gulp.task("assets", function() {
  gulp.src(path.assets.src).pipe(gulp.dest(path.assets.dst));
});

//html文件 源=>拼接模板=>输出
gulp.task("html", function() {
  gulp
    .src(path.html.src)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: path.tpl.dst,
        indent: true
      })
    )
    .pipe(minifyHTML({ empty: true, spare: true }))
    .pipe(gulp.dest(path.html.dst));
});

//clean，清理文件
gulp.task("clean", function() {
  gulp
    .src([path.clean.html, path.clean.css, path.clean.js], { read: false })
    .pipe(clean());
});

//hash 为所有引用资源增加hash=>输出
gulp.task("rev", function() {
  gulp
    .src(path.html.rev)
    .pipe(rev())
    .pipe(gulp.dest(path.html.dst));
});

//启动服务预览
gulp.task("server", function() {
  browerSync.init({ server: path.dist });
});

//监视文件变化热刷新
gulp.task("auto", function() {
  gulp.watch(path.script.src, ["script"]);
  gulp.watch(path.css.src, ["css"]);
  gulp.watch(path.scss.src, ["scss"]);
  gulp.watch(path.html.src, ["html"]);
  gulp.watch(path.tpl.src, ["html"]);
  gulp.watch(path.assets.src, ["assets"]);
  gulp.watch(path.all).on("change", browerSync.reload);
});

// 开发模式
gulp.task("dev", [
  "clean",
  "script",
  "css",
  "scss",
  "html",
  "assets",
  "server",
  "auto"
]);

// 打包发布
gulp.task("build", ["rev"]);
