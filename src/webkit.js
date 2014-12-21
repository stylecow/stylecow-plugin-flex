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
				declaration.cloneBefore().search({
					type: 'Keyword',
					name: ['flex', 'inline-flex']
				}).forEach(function (keyword) {
					keyword.name = '-webkit-' + keyword.name;
				});
			}
		});


		//other vendor prefixes
		stylecow.addTask({
			filter: {
				type: 'Declaration',
				name: /^(flex.*|align.*|justify-content|order)$/
			},
			fn: function (declaration) {
				declaration.cloneBefore().name = '-webkit-' + declaration.name;
			}
		});
	});
};
