module.exports = [
	
	// Old ms flex syntax
	{
		disable: {
			explorer: 11.0
		},
		Declaration: function (declaration) {
			if (declaration.is(null, 'display', ['flex', 'inline-flex'])) {
				return declaration.insertBefore('display: -ms-' + declaration.value + 'box');
			}
			
			if (declaration.name === 'flex-wrap') {
				return declaration.insertBefore('-ms-flex-wrap: ' + (declaration.value === 'nowrap' ? 'none' : declaration.value));
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
				return declaration.insertBefore('-ms-flex-pack: ' + alignmentValue(declaration.value));
			}
			
			if (declaration.name === 'align-items') {
				return declaration.insertBefore('-ms-flex-align: ' + alignmentValue(declaration.value));
			}
			
			if (declaration.name === 'align-self') {
				return declaration.insertBefore('-ms-flex-item-align: ' + alignmentValue(declaration.value));
			}
			
			if (declaration.name === 'align-content') {
				return declaration.insertBefore('-ms-flex-line-pack: ' + alignmentValue(declaration.value));
			}

			if (declaration.is(null, /^flex/)) {
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
				if (declaration.is(null, null, ['flex', 'inline-flex'])) {
					declaration.insertBefore('display: -webkit-' + declaration.value.replace('flex', 'box'));
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

				declaration.insertBefore('-webkit-box-orient:' + orient);

				if (direction) {
					declaration.insertBefore('-webkit-box-direction:' + direction);
				}
			},
			order: function (declaration) {
				var value = (declaration.value == 0) ? 1 : property.value;

				declaration.insertBefore('-webkit-box-ordinal-group:' + value);
			},
			"justify-content": function (declaration) {
				var value = alignmentValue(declaration.value);

				if ((value === 'space-between') || (value === 'space-around')) {
					value = 'justify';
				}

				declaration.insertBefore('-webkit-box-pack:' + value);
			},
			"align-items": function (declaration) {
				declaration.insertBefore('-webkit-box-align:' + alignmentValue(declaration.value));
			},
			"flex-grow": function (declaration) {
				declaration.insertBefore('-webkit-box-flex:' + declaration.value);
			},
			"flex": function (declaration) {
				declaration.insertBefore('-webkit-box-flex:' + declaration.value);
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
			if (declaration.is(null, /^(flex.*|align.*|justify-content|order)$/)) {
				return declaration.cloneBefore().name = '-webkit-' + declaration.name;
			}

			if (declaration.is(null, 'display', ['flex', 'inline-flex'])) {
				return declaration.cloneBefore().value = '-webkit-' + declaration.value;
			}
		}
	}
];

function alignmentValue (value) {
	if (value === 'flex-start') {
		return 'start';
	}

	if (value === 'flex-end') {
		return 'end';
	}

	return value;
}