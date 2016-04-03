var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    templateCache = require('gulp-angular-templatecache'),
    stylus = require('gulp-stylus'),
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
    },
    styles: {
        src: ['src/styles/styles.styl'],
        watch: ['src/styles/**/*.styl']
    },
    templates: {
        src: ['src/**/*.html'],
        options: {
            adapter: 'angular',
            base: 'src/scripts/',
            name: 'templates'
        }
    },
    webserver: {
        livereload: true
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

gulp.task('styles', function () {
    gulp.src(config.styles.src)
        .pipe(stylus())
        .pipe(gulp.dest(config.dest));    
})

gulp.task('watch', function () {
    gulp.watch(config.vendor.src, ['vendor']);
    gulp.watch(config.scripts.src, ['scripts']);
    gulp.watch(config.templates.src, ['templates']);
    gulp.watch(config.styles.watch, ['styles']);
});

gulp.task('webserver', function () {
    gulp.src('.')
        .pipe(webserver(config.webserver));
});


gulp.task('templates', function () {
    gulp.src(config.templates.src)
        .pipe(templateCache('templates.js', {
            standalone: true,
            transformUrl: function (url) {
                return url.replace('templates', 'template');
            }    
        }))
        .pipe(gulp.dest(config.dest));
});



gulp.task('default', ['vendor', 'scripts', 'styles', 'watch', 'webserver', 'templates'])