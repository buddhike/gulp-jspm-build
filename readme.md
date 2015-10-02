gulp-jspm-build
===

Gulp task to run jspm build and produce output as a Vinyl stream.

[![Join the chat at https://gitter.im/buddhike/gulp-jspm-build](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/buddhike/gulp-jspm-build?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/buddhike/gulp-jspm-build.svg?branch=master)](https://travis-ci.org/buddhike/gulp-jspm-build)

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

## config
Optional, the jspm configuration file to use.

## configOverride
Override sections of config.js. This could be useful if you want to change things
like baseURL.

```javascript
configOverride: {
    baseURL: '/foo'
}
```

## baseUrl
The jspm base URL, as normally specified in your ```package.json``` under ```config.jspm.directories.baseURL```. Defaults to ```'.'```.

## bundleSfx
Create a single file executable, including all necessary dependencies and systemjs. Defaults to ```false```.

> See the [jspm documentation](https://github.com/jspm/jspm-cli/blob/master/docs/production-workflows.md#creating-a-self-executing-bundle)
  for more information.

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
