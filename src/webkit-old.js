module.exports = function (stylecow) {
	var names = {
		'justify-content': '-webkit-box-pack',
		'align-items': '-webkit-box-align',
		'flex-grow': '-webkit-box-flex',
		'flex': '-webkit-box-flex',
	};

	var values = {
		'flex-start': 'start',
		'flex-end': 'end',
		'space-between': 'justify',
		'space-around': 'justify'
	};

	stylecow.forBrowsersLowerThan({
		chrome: 21.0,
		safari: 6.1,
		android: 4.4,
		ios: 7.0
	}, function () {

		//vendor prefixes in display: flex/inline-flex
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				string: [
					'display: flex;',
					'display: inline-flex;'
				]
			},
			fn: function (declaration) {
				declaration.cloneBefore().search({
					type: 'Keyword',
					name: ['flex', 'inline-flex']
				}).forEach(function (keyword) {
					keyword.name = '-webkit-' + keyword.name.replace('flex', 'box');
				});
			}
		});


		//flex-direction
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: 'flex-direction'
			},
			fn: function (declaration) {
				var orient, direction;

				switch (declaration.join(' ')) {
					case 'row':
						orient = 'horizontal';
						break;

					case 'row-reverse':
						orient = 'horizontal';
						direction = 'reverse';
						break;

					case 'column':
						orient = 'vertical';
						break;

					case 'column-reverse':
						orient = 'vertical';
						direction = 'reverse';
						break;

					default:
						return false;
				}

				declaration.before(stylecow.Declaration.createFromString('-webkit-box-orient: ' + orient));

				if (direction) {
					declaration.before(stylecow.Declaration.createFromString('-webkit-box-direction: ' + direction));
				}
			}
		});


		//flex-direction
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: 'order'
			},
			fn: function (declaration) {
				var value = parseInt(declaration.join(' '));

				if (value === 0) {
					value = 1;
				}

				declaration.before(stylecow.Declaration.createFromString('-webkit-box-ordinal-group: ' + value));
			}
		});


		//name/value replacements
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: Object.keys(names)
			},
			fn: function (declaration) {
				var polyfill = declaration.cloneBefore();

				polyfill.name = names[declaration.name];

				polyfill.search({
					type: 'Keyword',
					name: Object.keys(values)
				}).forEach(function (keyword) {
					keyword.name = values[keyword.name];
				});
			}
		});
	});
};
