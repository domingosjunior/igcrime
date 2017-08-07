// Minifica, concatena codigos js/css e move para build
module.exports = function (gulp, plugins, config) {
    gulp.task("buildCode", function(){
        return gulp.src(config.htmlSrcPath)
                   .pipe(plugins.usemin({
                        jsLib:[plugins.uglify],
                        jsScript:[plugins.uglify],
                        css:[plugins.autoprefixer, plugins.cssmin],
                        html: [function () {
                            return plugins.htmlmin({
                                                    collapseWhitespace: true,
                                                    removeComments: true,
                                                    collapseInlineTagWhitespace: true,
                                                });
                        }],
                   }))
                   .pipe(gulp.dest(config.srcDist));
  });
};
