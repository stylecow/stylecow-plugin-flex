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
};
