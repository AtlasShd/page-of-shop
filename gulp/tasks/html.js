'use strict';

import pug from 'gulp-pug';
import template from 'gulp-template';

import dataset from '../dataset.json' assert {type: "json"};

export const html = () => {
	return app.gulp
		.src(app.path.src.html)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'HTML',
					message: 'Error: <%= error.message %>',
				})
			)
		)
    .pipe(template({dataset}))
    .pipe(pug({
      pretty: true,
    }))
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
};