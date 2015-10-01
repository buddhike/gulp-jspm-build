#gulp-jspm-build
custom gulp task to run jspm build and produce output as a vinyl stream.

#Install

```npm install gulp-jspm-build```

#Usage

```
var jspm = require('gulp-jspm-build');

gulp.task('jspm', function(){
    jspm({
        bundles: [
            { src: 'app/app', dst: 'app.js' }
        ]
    })
    .pipe(gulp.dest('.dist'));
});

```
