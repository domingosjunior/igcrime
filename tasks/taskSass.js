// Inicia server
module.exports = function (gulp, plugins, config) {
  gulp.task('sass', function(){
      return gulp.src(config.sassSrc)
                 .pipe(plugins.sourcemaps.init())
                 .pipe(plugins.sass({
                                     outputStyle: 'expanded',
                                     sourceComments: 'map'
                                    })
                              .on('error', plugins.sass.logError)
                      )
                 .pipe(plugins.sourcemaps.write('./'))
                 .pipe(gulp.dest(config.sassDist))
                 .pipe(plugins.browserSync.reload({stream:true}));
  });
};
