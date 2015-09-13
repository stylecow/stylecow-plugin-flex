"use strict";

module.exports = function (tasks) {
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

    var support = {
        explorer: 11.0
    };

    // from  display: flex/inline-flex
    // to    display: -ms-flexbox/-ms-inline-flexbox
    tasks.addTask({
        forBrowsersLowerThan: support,
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
    tasks.addTask({
        forBrowsersLowerThan: support,
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
                .forEach(keyword => keyword.name = values[keyword.name]);
        }
    });

    //Other vendor prefixes
    tasks.addTask({
        forBrowsersLowerThan: support,
        filter: {
            type: 'Declaration',
            name: [
                'flex-direction',
                'flex-flow',
                'flex-basis',
            ],
            vendor: false
        },
        fn: function (declaration) {
            declaration
                .cloneBefore()
                .setVendor('ms');
        }
    });

    //Shorthand flex
    //https://github.com/philipwalton/flexbugs/blob/master/README.md#6-the-default-flex-value-has-changed
    tasks.addTask({
        forBrowsersLowerThan: {
            explorer: 12
        },
        filter: {
            type: 'Declaration',
            name: 'flex',
            vendor: false
        },
        fn: function (declaration) {
            if (declaration.has({
                type: 'Keyword',
                name: ['auto', 'initial']
            })) {
                return;
            }

            var value = declaration[0];

            if (!value[1]) {
                value[0].codeBefore('1', 'Number');
            }

            if (!value[2]) {
                value[1].codeAfter('0%', 'Unit');
            } else if (value[2].type === 'Number') {
                value[2].replaceWithCode(value[2] + '%', 'Unit');
            }
        }
    });

    //Shorthand flex
    //https://github.com/philipwalton/flexbugs/blob/master/README.md#6-the-default-flex-value-has-changed
    tasks.addTask({
        forBrowsersLowerThan: support,
        filter: {
            type: 'Declaration',
            name: 'flex',
            vendor: false
        },
        fn: function (declaration) {
            switch (declaration.toString()) {
                case 'flex: 1;':
                    return declaration.codeBefore('-ms-flex: 1 1 0%', 'Declaration');

                case 'flex: auto;':
                    return declaration.codeBefore('-ms-flex: 1 1 auto', 'Declaration');

                case 'flex: initial;':
                    return declaration.codeBefore('-ms-flex: 0 1 auto', 'Declaration');

                default:
                    return declaration.cloneBefore().setVendor('ms');
            }
        }
    });
};
