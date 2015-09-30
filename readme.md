#gulp-jspm-build
custom gulp task to run jspm build and produce output as a Vinyl stream.

This project is under development and not ready for production yet.

#Install

```npm install gulp-jspm-build```

#Usage

```
var jspm = require('gulp-jspm-build');

gulp.task('jspm', function(){
    jspm({
        bundles: [
            { src: 'app/app', dst: 'app.js', options: { sourceMaps: true, minify: true} }
        ]
    })
    .pipe(gulp.dest('.dist'));
});

```
