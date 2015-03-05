module.exports = function (stylecow) {
	var names = {
		'justify-content': '-webkit-box-pack',
		'align-items': '-webkit-box-align',
		'flex-grow': '-webkit-box-flex'
	};

	var values = {
		'flex-start': 'start',
		'flex-end': 'end',
		'space-between': 'justify',
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
				declaration
					.cloneBefore()
					.search({
						type: 'Keyword',
						name: ['flex', 'inline-flex']
					})
					.forEach(function (keyword) {
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
				applyFlexDirection(declaration.join(' '), declaration);
			}
		});


		//flex-flow: <flex-direction> || <flex-wrap>
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: 'flex-flow'
			},
			fn: function (declaration) {
				var value = declaration[0];

				if (value[0]) { //flex-direction
					applyFlexDirection(value[0].toString(), declaration);
				}

				if (value[1]) { //flex-wrap
					applyFlexWrap(value[1].toString(), declaration);
				}
			}
		});


		//flex: <flex-grow> <flex-shrink>? || <flex-basis>
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: 'flex'
			},
			fn: function (declaration) {
				var value = declaration[0];

				if (value[0]) { //flex-grow
					var val = value[0].toString();

					if (val === 'none') {
						val = '0.0';
					}

					declaration.before(stylecow.Declaration.createFromString('-webkit-box-flex: ' + value[0]));
				}
			}
		});


		//flex-wrap
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: 'flex-wrap'
			},
			fn: function (declaration) {
				applyFlexWrap(declaration.join(' '), declaration);
			}
		});


		//order
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: 'order'
			},
			fn: function (declaration) {
				var value = parseInt(declaration.join(' ')) + 1;

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
				declaration
					.cloneBefore()
					.set('name', names[declaration.name])
					.search({
						type: 'Keyword',
						name: Object.keys(values)
					})
					.forEach(function (keyword) {
						keyword.name = values[keyword.name];
					});
			}
		});
	});

	function applyFlexWrap(value, declaration) {
		switch (value) {
			case 'wrap':
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-lines: multiple'));
				break;

			case 'nowrap':
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-lines: single'));
				break;

			case 'wrap-reverse':
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-lines: multiple'));
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-direction: reverse'));
				break;
		}
	}

	function applyFlexDirection(value, declaration) {
		switch (value) {
			case 'row':
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-orient: horizontal'));
				break;

			case 'row-reverse':
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-orient: horizontal'));
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-direction: reverse'));
				break;

			case 'column':
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-orient: vertical'));
				break;

			case 'column-reverse':
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-orient: vertical'));
				declaration.before(stylecow.Declaration.createFromString('-webkit-box-direction: reverse'));
				break;
		}
	}
};
