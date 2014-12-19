module.exports = function (stylecow) {

	stylecow.addTask([
		
		// Old ms flex syntax
		{
			disable: {
				explorer: 11.0
			},
			Declaration: function (declaration) {
				if (declaration.is({ string: 'display: flex;' })) {
					return declaration.before(stylecow.Declaration.createFromString('display: -ms-flexbox'));
				}

				if (declaration.is({ string: 'display: inline-flex;' })) {
					return declaration.before(stylecow.Declaration.createFromString('display: -ms-inline-flexbox'));
				}

				if (declaration.name === 'flex-wrap') {
					if (declaration.is({ string: 'flex-wrap: nowrap;' })) {
						return declaration.before(stylecow.Declaration.createFromString('-ms-flex-wrap: none'));
					}

					return declaration.cloneBefore().name = '-ms-flex-wrap';
				}

				if (declaration.name === 'flex-grow') {
					return declaration.cloneBefore().name = '-ms-flex-positive';
				}
				
				if (declaration.name === 'flex-shrink') {
					return declaration.cloneBefore().name = '-ms-flex-negative';
				}
				
				if (declaration.name === 'order') {
					return declaration.cloneBefore().name = '-ms-flex-order';
				}
				
				if (declaration.name === 'justify-content') {
					return declaration.before(stylecow.Declaration.createFromString('-ms-flex-pack: ' + alignmentValue(declaration.join(' '))));
				}
				
				if (declaration.name === 'align-items') {
					return declaration.before(stylecow.Declaration.createFromString('-ms-flex-align: ' + alignmentValue(declaration.join(' '))));
				}
				
				if (declaration.name === 'align-self') {
					return declaration.before(stylecow.Declaration.createFromString('-ms-flex-item-align: ' + alignmentValue(declaration.join(' '))));
				}
				
				if (declaration.name === 'align-content') {
					return declaration.before(stylecow.Declaration.createFromString('-ms-flex-line-pack: ' + alignmentValue(declaration.join(' '))));
				}

				if (declaration.is({name: /^flex/})) {
					return declaration.cloneBefore().name = '-ms-' + declaration.name;
				}
			}
		},

		// Old webkit flex syntax
		{
			disable: {
				chrome: 21.0,
				safari: 6.1,
				android: 4.4,
				ios: 7.0
			},
			Declaration: {
				display: function (declaration) {
					if (declaration.is({ string: 'display: flex;' })) {
						return declaration.before(stylecow.Declaration.createFromString('display: -webkit-box'));
					}

					if (declaration.is({ string: 'display: inline-flex;' })) {
						return declaration.before(stylecow.Declaration.createFromString('display: -webkit-inline-box'));
					}
				},

				"flex-direction": function (declaration) {
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
				},

				order: function (declaration) {
					var value = parseInt(declaration.join(' '));

					if (value === 0) {
						value = 1;
					}

					declaration.before(stylecow.Declaration.createFromString('-webkit-box-ordinal-group: ' + value));
				},

				"justify-content": function (declaration) {
					var value = alignmentValue(declaration.join(' '));

					if ((value === 'space-between') || (value === 'space-around')) {
						value = 'justify';
					}

					declaration.before(stylecow.Declaration.createFromString('-webkit-box-pack: ' + value));
				},

				"align-items": function (declaration) {
					declaration.before(stylecow.Declaration.createFromString('-webkit-box-align: ' + alignmentValue(declaration.join(' '))));
				},

				"flex-grow": function (declaration) {
					declaration.cloneBefore().name = '-webkit-box-flex';
				},

				"flex": function (declaration) {
					declaration.cloneBefore().name = '-webkit-box-flex';
				}
			}
		},

		// -webkit- vendor prefixes to new sintax
		{
			disable: {
				chrome: 21.0,
				safari: 6.1,
				android: 4.4,
				ios: 7.0
			},
			Declaration: function (declaration) {
				if (declaration.is({ string: 'display: flex;' })) {
					return declaration.before(stylecow.Declaration.createFromString('display: -webkit-flex'));
				}

				if (declaration.is({ string: 'display: inline-flex;' })) {
					return declaration.before(stylecow.Declaration.createFromString('display: -webkit-inline-flex'));
				}

				if (declaration.is({ name: /^(flex.*|align.*|justify-content|order)$/ })) {
					return declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		}
	]);
};

function alignmentValue (value) {
	if (value === 'flex-start') {
		return 'start';
	}

	if (value === 'flex-end') {
		return 'end';
	}

	return value;
}
