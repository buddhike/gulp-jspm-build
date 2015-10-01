gulp-jspm-build
===
gulp task to run jspm build and produce output as a vinyl stream.

# Install

```npm install gulp-jspm-build```

# Usage

```javascript
var jspm = require('gulp-jspm-build');

gulp.task('jspm', function(){
    jspm({
        bundles: [
            { src: 'app', dst: 'app.js' }
        ]
    })
    .pipe(gulp.dest('.dist'));
});

```

# Options

## bundles

An array of bundles to create. Each object in the array specifies the
arguments to ```systemjs-builder``` in following format.

### src

```string``` - Modules to bundle. You can use jspm arithmetic expressions here.

```javascript
'app'
'core + navigation + app'
'app - react'
```

### dst

```string``` - Bundled file name.

### options

```object``` - Arguments to ```systemjs-builder```.

```javascript
{ minify: true, mangle: true }
```

## bundleOptions
Same as ```options``` for individual bundle but specifies common options for all
bundles.

## configOverride
Override sections of config.js. This could be useful if you want to change things
like baseURL.

```javascript
configOverride: {
    baseURL: '/foo'
}
```

# Example

```javascript
var jspm = require('gulp-jspm-build');

gulp.task('jspm', function(){
    jspm({        
        bundleOptions: {
            minify: true,
            mangle: true
        }
        bundles: [
            { src: 'app', dst: 'app.js' }
            {
                src: 'react + react-router',
                dst: 'lib.js',
                options: { mangle: false }
            }
        ],
        configOverride: {
            baseURL: '/foo'
        }
    })
    .pipe(gulp.dest('.dist'));
});
```
