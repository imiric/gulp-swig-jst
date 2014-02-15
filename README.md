## Information

<table>
<tr>
<td>Package</td><td>gulp-swig-jst</td>
</tr>
<tr>
<td>Description</td>
<td>Stream precompiled Swig templates</td>
</tr>
<tr>
<td>Node Version</td>
<td>≥ 0.10</td>
</tr>
</table>


[Learn more about templating with Swig](http://paularmstrong.github.io/swig/)

## Install with NPM


```
$ npm install --save-dev gulp-swig-jst
```

---

## API

### options.toFile

Whether to output a file to the target directory

---


## Usage

### Compile templates to a single JST file

Output the contents of a folder's swig files into a single AMD-wrapped file named `templates.js`:

```
var jst     = require('gulp-swig-jst');
var wrap    = require('gulp-wrap-amd');
var concat  = require('gulp-concat');
var declare = require('gulp-declare');

gulp.task('jst', function () {
  gulp.src('../views/templates/**/*.twig')
    .pipe(jst())
    .pipe(declare({ noRedeclare: true }))
    .pipe(concat('templates.js'))
    .pipe(wrap({ exports: 'this' }))
    .pipe(gulp.dest('./scripts/'))
});
```

Example usage:

```
define(['backbone', 'swig', 'templates'], function (Backbone, swig, templates) {
  'use strict';

  return Backbone.View.extend({
  
  	template: templates['venue']['ticketbtn'],

    render: function(){
      this.$el.html(swig.run(this.template, this.model.toJSON()));

      return this;
    }
  });
});
```

### Compile templates to individual files

Output the contents of a folder's swig files into AMD-wrapped files renamed to `<filename>.js`:

```
var jst  = require('gulp-swig-jst');
var wrap = require('gulp-wrap-amd');

gulp.task('jst-test', function () {
  return gulp.src('../views/templates/*.twig')
    .pipe(jst({ toFile: true }))
    .pipe(wrap())
    .pipe(gulp.dest('./scripts/'))
});
```

## License

(MIT License)

Copyright (c) 2014 Oliver Turner

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
