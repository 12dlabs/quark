/// <binding AfterBuild='less, min' Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    project = require("./project.json"),
    path = require('path'),
    less = require('gulp-less'),
    react = require('gulp-react');

var paths = {
    // webroot: "./" + project.webroot + "/"
    webroot: "./wwwroot/"
};

// paths.js = paths.webroot + "js/**/*.js";
paths.js = paths.webroot + "js/*/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.cssDir = paths.webroot + "css/";
paths.react = "./components/*.jsx";
paths.reactIndex = "./components/*.jsx";
paths.componentStyle = "./components/*.less";
paths.css = paths.webroot + "css/**/*.css";
paths.less = paths.webroot + "css/*.less";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/index.min.js";
paths.concatCssDest = paths.webroot + "css/flowChart.min.css";
paths.reactDest = paths.webroot + "components/";
paths.reactIndexDest = paths.webroot + "components/index.js";
paths.componentStyleDest = paths.webroot + "components/components.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task('less', function () {
    return gulp.src(paths.less)
      .pipe(less({
          paths: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(gulp.dest(paths.cssDir));
});

gulp.task('react', function () {
    return gulp.src(paths.react)
        .pipe(react())
        .pipe(gulp.dest(paths.reactDest));
});

gulp.task('reactIndex', function () {
    return gulp.src(paths.reactIndex)
        .pipe(react())
        .pipe(concat(paths.reactIndexDest))
        .pipe(gulp.dest("."));
});

gulp.task('componentStyle', function () {
    return gulp.src(paths.componentStyle)
        .pipe(less())
        .pipe(concat(paths.componentStyleDest))
        .pipe(gulp.dest("."));
});

gulp.task("min:js", function () {
    gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    gulp.src([paths.webroot + "css/edit.css", paths.webroot + "css/sopChart.css", paths.webroot + "css/toastr.css"])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
    
    gulp.src([paths.webroot + "css/qna.css"])
        .pipe(concat(paths.webroot + "css/qna.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task('watch', function () {
    gulp.watch( paths.less, ['less']);
    gulp.watch( [paths.js, "!" + paths.minJs], ['min:js']);
    gulp.watch( [paths.css, "!" + paths.minCss], ['min:css']);
    gulp.watch( paths.react, ['react']);
    gulp.watch( paths.reactIndex, ['reactIndex']);
    gulp.watch( paths.componentStyle, ['componentStyle']);
});

gulp.task("min", ["min:js", "min:css"]);
gulp.task("default", ["clean", "less", "componentStyle", "react", "reactIndex", "min"]);
