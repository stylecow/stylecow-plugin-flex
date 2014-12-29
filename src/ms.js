module.exports = function (stylecow) {
	var names = {
		'flex-grow': '-ms-flex-positive',
		'flex-shrink': '-ms-flex-negative',
		'order': '-ms-flex-order',
		'justify-content': '-ms-flex-pack',
		'align-items': '-ms-flex-align',
		'align-self': '-ms-flex-item-align',
		'align-content': '-ms-flex-line-pack',
		'flex-wrap': '-ms-flex-wrap',
	};

	var values = {
		'flex-start': 'start',
		'flex-end': 'end',
		'nowrap': 'none'
	};

	stylecow.forBrowsersLowerThan({
		explorer: 11.0
	}, function () {

		//display: flex/inline-flex => display: -ms-flexbox/-ms-inline-flexbox
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
						keyword.name = '-ms-' + keyword.name + 'box';
					});
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


		//Other vendor prefixes
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: /^flex/
			},
			fn: function (declaration) {
				if (!names[declaration.name]) {
					return declaration.cloneBefore().name = '-ms-' + declaration.name;
				}
			}
		});
	});
};
