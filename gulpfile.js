var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    concat = require('gulp-concat');


var config = {
    dest: 'build/',
    vendor: {
        output: 'vendor.js',
        src: [
            'bower_components/angular/angular.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ]
    },
    scripts: {
        output: 'scripts.js',
        src: ['src/**/*.js']
    }
}

gulp.task('vendor', function () {
    gulp.src(config.vendor.src)
        .pipe(concat(config.vendor.output))
        .pipe(gulp.dest(config.dest));
});


gulp.task('scripts', function () {
    gulp.src(config.scripts.src)
        .pipe(concat(config.scripts.output))
        .pipe(gulp.dest(config.dest))
});

gulp.task('watch', function () {
    gulp.watch(config.vendor.src, ['vendor']);
    gulp.watch(config.scripts.src, ['scripts']);
})

gulp.task('webserver', function () {
    gulp.src('.')
        .pipe(webserver(config.webserver));
})

gulp.task('default', ['vendor', 'scripts', 'watch', 'webserver'])