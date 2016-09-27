'use strict';

var gulp = require('gulp'),

  ts = require('gulp-typescript'),

  pug = require('gulp-pug'),

  merge = require('merge2'),

  clean = require('gulp-clean'),

  async = require('async'),

  msg = require('gulp-msg'),

  globby = require('globby'),

  fs = require('fs'),

  path = require('path'),

  change = require('change-case'),

  connect = require('gulp-connect'),

  compass = require('gulp-compass'),

  bump = require('gulp-bump'),

  git = require('gulp-git'),

  exec = require('child_process').exec,

  chalk = require('chalk');

var tsProject = ts.createProject({

  'sourceMap': true,

  'emitDecoratorMetadata': true,

  'experimentalDecorators': true,

  'removeComments': false,

  'noImplicitAny': false,

  'moduleResolution': 'node',

  'module': 'commonjs',

  'declaration': true

}),

  tsDemoProject = ts.createProject({

    'sourceMap': true,

    'emitDecoratorMetadata': true,

    'experimentalDecorators': true,

    'removeComments': false,

    'noImplicitAny': false,

    'moduleResolution': 'node',

    'module': 'commonjs',

    'declaration': true

  });

gulp.task('watch', function () {

  gulp.watch('src/scripts/**/*.ts', [
    'build'
  ]);

  gulp.watch('src/views/**/*.pug', [
    'build'
  ]);

  gulp.watch('src/styles/*.{sass,scss,css}', [
    'build'
  ]);

  gulp.watch('demo/**/*.ts', [
    'build'
  ]);

});

gulp.task('connect', function () {

  connect.serverClose();

  connect.server();

});

function doClean (cb) {

  var paths = [
    'dist/',
    'demo/www/scripts/',
    'node_modules/angular2-searchbox/'
  ];

  paths.forEach(function (path) {

    gulp
      .src(path, {
        'read': false
      })
      .pipe(msg.note('Cleaning Folder ... <%= file.relative %>'))
      .pipe(clean());

  });

  setTimeout(function () {

    return cb(null);

  }, 100);

}

function doTemplates (cb) {

  var templates = '\'use strict\';\r\n\r\n';

  console.log('asdsda template building.');

  globby([
    'dist/views/**/*.html'
  ]).then(function (paths) {

    fs
      .unlink('src/scripts/ng.templates.ts', function () {

        async.each(paths, function (_path, next) {

          fs
            .readFile(_path, 'utf8', function (err, contents) {

              if (!err && contents) {

                var name = change.pascalCase(
                    path
                      .basename(_path)
                      .split('.')
                      .shift()
                  ) + 'Template';

                templates += 'export const ' + name +

                  ': string = `' + contents + '`;\r\n';

              }

              return next();

            });

        }, function () {

          fs.writeFile('src/scripts/ng.templates.ts', templates, function (err) {

            if (err) {

              return console.log(err);

            }

            return cb(null);

          });

        });

      });

  });

}

function buildTs (cb) {

  var tsResult = gulp
    .src(['src/**/*.ts', 'src/**/*.d.ts'])
    .pipe(msg.info('Compiling: <%= file.relative %>'))
    .pipe(ts(tsProject));

  merge([

    tsResult.dts.pipe(gulp.dest('dist/')),

    tsResult.js.pipe(gulp.dest('dist/'))

  ]);

  setTimeout(function () {

    return cb(null);

  }, 750);

}

function buildTsDemo (cb) {

  setTimeout(function () {

    gulp
      .src([
        'index.js',
        'index.d.ts'
      ])
      .pipe(msg.success('Copy to node_modules ... <%= file.relative %>'))
      .pipe(gulp.dest('node_modules/angular2-searchbox/'));

    gulp
      .src([
        'dist/**/*'
      ])
      .pipe(msg.success('Copy to node_modules ... <%= file.relative %>'))
      .pipe(gulp.dest('node_modules/angular2-searchbox/dist/'));

  }, 250);

  setTimeout(function () {

    var tsResult = gulp
      .src('demo/src/**/*.ts')
      .pipe(msg.info('Compiling Demo: <%= file.relative %>'))
      .pipe(ts(tsDemoProject));

    merge([

      tsResult.dts.pipe(gulp.dest('demo/www/')),

      tsResult.js.pipe(gulp.dest('demo/www/'))

    ]);

  }, 500);

  setTimeout(function () {

    return cb(null);

  }, 750);

}

function buildPug (cb) {

  gulp
    .src('src/views/**/*.pug')
    .pipe(msg.info('Generating HTML templates - <%= file.relative %>'))
    .pipe(pug())
    .pipe(gulp
      .dest('dist/views/')
    );

  setTimeout(function () {

    return cb(null);

  }, 300);

}

function watch (cb) {

  gulp
    .start([
      'connect',
      'watch'
    ]);

  return cb(null);

}

function doCopy (cb) {

  gulp
    .src(['src/typings/**/*'])
    .pipe(msg.note('Copying typings for demo: <%= file.relative %>'))
    .pipe(gulp.dest('demo/src/typings'));

  gulp
    .src(['demo/src/**/*.html'])
    .pipe(msg.info('Copying static html for demo: <%= file.relative %>'))
    .pipe(gulp.dest('demo/www/'));


  gulp
    .src(['demo/src/**/*.js'])
    .pipe(msg.info('Copying static js for demo: <%= file.relative %>'))
    .pipe(gulp.dest('demo/www/'));

  setTimeout(function () {

    return cb(null);

  }, 50);

}

function buildStyles (cb) {

  gulp
    .src('src/styles/**/*.{sass,scss}')
    .pipe(compass({

      'style': 'expanded',

      'sass': 'src/styles',

      'css': 'src/styles'

    }))
    .pipe(gulp.dest('dist/styles/'));

  setTimeout(function () {

    return cb(null);

  }, 100);

}

gulp.task('templates', function (cb) {

  async.series([

    buildPug,

    doTemplates

  ], cb);

});

var buildProcess = [

  doClean,

  doCopy,

  buildStyles,

  buildPug,

  doTemplates,

  buildTs,

  buildTsDemo

];

gulp.task('build', function (cb) {

  async.series(buildProcess, cb);

});

gulp.task('serve', function (cb) {

  var serveProcess = []
    .concat(buildProcess);

  serveProcess
    .push(watch);

  async.series(serveProcess, cb);

});

gulp.task('bump', function (cb) {

  gulp.src('./package.json')
    .pipe(msg.info('Bumping package: <%= file.relative %>'))
    .pipe(bump())
    .pipe(gulp.dest('./'));

  setTimeout(function () {

    return cb(null);

  }, 100);

});

gulp.task('commit', ['bump'], function (cb) {

  var pkg = require('./package.json'),

    argv = require('yargs').argv;

  git.exec({

    'args': 'add *'

  }, function () {

    git.exec({

      'args': 'tag -a v'.concat(
        pkg.version,
        ' -m \"Ng - Release v',
        pkg.version,
        '\"'
      )

    }, function () {

      git.exec({

        'args': 'commit -m \"'.concat(
          argv.m,
          ' - v',
          pkg.version,
          '\"'
        )

      }, function () {

        git.push(
          'origin',
          'master', {
            'args': '--follow-tags'
          }, function () {

            exec('npm publish', function () {

              console.log(chalk.white.bgBlue('Ng - Commit finished!'));

              console.log(chalk.white.bgBlue('Ng - Published to NPM!'));

              return cb(null);

            });

          });

      });

    });

  })

});