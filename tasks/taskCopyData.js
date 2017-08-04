// Copia database
module.exports = function (gulp, plugins, config) {
    gulp.task("copyData", function(){
        return gulp.src('src/data/**/*')
                   .pipe(plugins.imagemin([plugins.imagemin.optipng({ optimizationLevel: 5 })]))
                   .pipe(gulp.dest('dist/data/'));
  });
};
