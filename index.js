module.exports = function (stylecow) {

	stylecow.addTask([
		
		// Old ms flex syntax
		{
			disable: {
				explorer: 11.0
			},
			Declaration: function (declaration) {
				if (declaration.is({
					name: 'display',
					value: ['flex', 'inline-flex']
				})) {
					return declaration.before('display: -ms-' + declaration.value + 'box');
				}
				
				if (declaration.name === 'flex-wrap') {
					return declaration.before('-ms-flex-wrap: ' + (declaration.value === 'nowrap' ? 'none' : declaration.value));
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
					return declaration.before('-ms-flex-pack: ' + alignmentValue(declaration.value));
				}
				
				if (declaration.name === 'align-items') {
					return declaration.before('-ms-flex-align: ' + alignmentValue(declaration.value));
				}
				
				if (declaration.name === 'align-self') {
					return declaration.before('-ms-flex-item-align: ' + alignmentValue(declaration.value));
				}
				
				if (declaration.name === 'align-content') {
					return declaration.before('-ms-flex-line-pack: ' + alignmentValue(declaration.value));
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
					if (declaration.is({
						name: 'display',
						value: ['flex', 'inline-flex']
					})) {
						declaration.before('display: -webkit-' + declaration.value.replace('flex', 'box'));
					}
				},
				"flex-direction": function (declaration) {
					var orient, direction;

					switch (declaration.value) {
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

					declaration.before('-webkit-box-orient:' + orient);

					if (direction) {
						declaration.before('-webkit-box-direction:' + direction);
					}
				},
				order: function (declaration) {
					var value = (declaration.value == 0) ? 1 : property.value;

					declaration.before('-webkit-box-ordinal-group:' + value);
				},
				"justify-content": function (declaration) {
					var value = alignmentValue(declaration.value);

					if ((value === 'space-between') || (value === 'space-around')) {
						value = 'justify';
					}

					declaration.before('-webkit-box-pack:' + value);
				},
				"align-items": function (declaration) {
					declaration.before('-webkit-box-align:' + alignmentValue(declaration.value));
				},
				"flex-grow": function (declaration) {
					declaration.before('-webkit-box-flex:' + declaration.value);
				},
				"flex": function (declaration) {
					declaration.before('-webkit-box-flex:' + declaration.value);
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
				if (declaration.is({
					name: 'display',
					value: ['flex', 'inline-flex']
				})) {
					return declaration.cloneBefore().setContent('-webkit-' + declaration.value);
				}

				if (declaration.is({
					name: /^(flex.*|align.*|justify-content|order)$/
				})) {
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
