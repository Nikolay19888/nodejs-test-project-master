var gulp = require('gulp');
 var nodemon = require('gulp-nodemon');
var inject = require('gulp-inject');
 
gulp.src('./src/**/*.html')
  .pipe(inject(gulp.src('./src/**/*.js', {read: false}), {relative: true}))
  .pipe(gulp.dest('./src'));
  
   var paths = {
     angularjs: [
         './client/app/**/*.js'
     ],
     css: [
        './client/css/*.css'
     ],
	 target: [
	 './server/views/index.ejs'
	 ]
 };
 
 
  gulp.task('index', function(){
     return gulp.src(paths.target)
         .pipe(inject(gulp.src(paths.angularjs, {read: false}), {relative: true}))
         .pipe(gulp.dest('./client/app'))
         .pipe(inject( gulp.src(paths.css, {read: false}), {relative: true}))
         .pipe(gulp.dest('./client/css'));
 });
 
 
 
  gulp.task('watch', function() {
     gulp.watch([
     paths.angularjs,
     paths.css
     ], ['index']);
 });
 
 gulp.task('start', function () {
  nodemon({
   script: 'app.js',
   ext: 'js html',
   env: { 'NODE_ENV': 'development' }
  })
})

 gulp.task('default', ['index', 'watch', 'start' ]);
  //gulp.task('default', ['watch', 'build-ts', 'build-copy']);