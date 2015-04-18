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

		// from  display: flex/inline-flex
		// to    display: -ms-flexbox/-ms-inline-flexbox
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
					.getAll({
						type: 'Keyword',
						name: ['flex', 'inline-flex']
					})
					.forEach(function (keyword) {
						keyword.name += 'box';
						keyword.vendor = 'ms';
					});
			}
		});

		//name/value replacements
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: Object.keys(names),
				vendor: false
			},
			fn: function (declaration) {
				declaration
					.cloneBefore()
					.setName(names[declaration.name])
					.getAll({
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
				name: /^flex/,
				vendor: false
			},
			fn: function (declaration) {
				if (!names[declaration.name]) {
					declaration
						.cloneBefore()
						.setVendor('ms');
				}
			}
		});
	});
};
