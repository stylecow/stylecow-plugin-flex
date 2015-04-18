module.exports = function (stylecow) {

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
					.get({
						type: 'Keyword',
						name: ['flex', 'inline-flex']
					})
					.setVendor('webkit');
			}
		});


		//other vendor prefixes
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: /^(flex.*|align.*|justify-content|order)$/,
				vendor: false
			},
			fn: function (declaration) {
				declaration
					.cloneBefore()
					.setVendor('webkit');
			}
		});
	});
};
