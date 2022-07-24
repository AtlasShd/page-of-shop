'use strict';

import gulpWebp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';

export const images = () => {
	return app.gulp
		.src(app.path.src.images)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'IMAGES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(app.plugins.if(app.isBuild, gulpWebp()))
		.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
		.pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images)))
		.pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
		.pipe(
			app.plugins.if(
				app.isBuild,
				cache(
					imagemin({
						progressive: true,
						svgoPlugins: [{ removeViewBox: false }],
						interlaced: true,
						optimizationLevel: 3,
					})
				)
			)
		)
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browsersync.stream());
};
