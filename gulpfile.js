/**
 * Created by user on 23.07.2016.
 */
var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var sort = require('gulp-sort');
// add required packages
gulp.task('connect', function() {
    connect.server({
        port: 47,
        livereload: true,
        root: ['dist']
    });
});


gulp.task('concatJs', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(sort({
            comparator: function(file1, file2) {
                var p1 = file1.history[0],
                    p2 = file2.history[0];
                var value1 = p1.split("\\").length-1,
                    value2 = p2.split("\\").length-1;
                // расстановка файлов: чем больше уровень вложенности
                // (больше папок перед файлом - больше символов "\" в пути -
                // тем больше он дочерний, должен быть впереди
                return value1 < value2;
            }
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist'));
});
gulp.task('concatCss', function(){
    "use strict";
    return gulp.src('src/js/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('replaceIndexHtml', function(){
    "use strict";
    return gulp.src('src/index.html')
            .pipe(gulp.dest('dist'))

});
gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['concatJs']);
    gulp.watch('src/index.html', ['replaceIndexHtml']);
    gulp.watch('src/js/**/*.css', ['concatCss']);

});


gulp.task('default', ['concatJs', 'concatCss', 'replaceIndexHtml', 'connect', 'watch']);