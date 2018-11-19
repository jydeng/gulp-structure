const gulp = require("gulp");
const uglify = require("gulp-uglify");
const minifyCSS = require("gulp-minify-css");
const fileinclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const browerSync = require("browser-sync").create();
const gulpUtil = require("gulp-util");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

const srcScript = "./src/js/*.js";
const dstScript = "./dist/js";
const srcCSS = "./src/css/*.css";
const dstCSS = "./dist/css";
const srcHtml = "./src/*.html";
const dstHtml = "./dist";
const tplPath = "./src/tpl";
const tplHtml = "./src/tpl/*.html";
const srcAssets = "./src/assets/**/*.*";
const dstAssets = "./dist/assets";
const srcSass = "./src/css/*.scss";
const dstSass = "./dist/css";

//js文件 源=>压缩=>输出
gulp.task("script", function() {
  gulp
    .src(srcScript)

    .pipe(uglify())

    .on("error", function(err) {
      gulpUtil.log(gulpUtil.colors.red("[Error]"), err.toString());
    })

    .pipe(gulp.dest(dstScript));
});

//css文件 源=>压缩=>补全前缀=>输出
gulp.task("css", function() {
  gulp
    .src(srcCSS)

    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )

    .pipe(minifyCSS())

    .pipe(gulp.dest(dstCSS));
});

//处理SASS文件：转换，压缩自动加上前缀名，然后换个名输出;

//命令行使用gulp sass启动此任务;

gulp.task("sass", function() {
  gulp
    .src(srcSass)

    .pipe(sass())

    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )

    .pipe(minifyCSS())

    .pipe(gulp.dest(dstSass));
});

//html文件 源=>拼接模板=>输出
gulp.task("html", function() {
  gulp
    .src(srcHtml)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: tplPath,
        indent: true
      })
    )
    .pipe(gulp.dest(dstHtml));
});

//其他资源文件
gulp.task("assets", function() {
  gulp

    .src(srcAssets)

    .pipe(gulp.dest(dstAssets));
});

//启动服务预览
gulp.task("server", function() {
  browerSync.init({
    server: "./dist"
  });
});

//监视文件变化热刷新
gulp.task("auto", function() {
  gulp.watch(srcScript, ["script"]);

  gulp.watch(srcCSS, ["css"]);

  gulp.watch(dstSass, ["sass"]);

  gulp.watch(srcHtml, ["html"]);

  gulp.watch(tplHtml, ["html"]);

  gulp.watch(srcAssets, ["assest"]);

  gulp.watch("./dist/**/*.*").on("change", browerSync.reload);
});

//整个工作流的入口
gulp.task("default", [
  "script",
  "css",
  "sass",
  "html",
  "assets",
  "server",
  "auto"
]);
