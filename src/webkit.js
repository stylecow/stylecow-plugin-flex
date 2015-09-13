"use strict";

module.exports = function (tasks) {
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

    var support = {
        chrome: 21.0,
        safari: 6.1,
        android: 4.4,
        ios: 7.0
    };

    //vendor prefixes in display: flex/inline-flex
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
                    keyword.name = keyword.name.replace('flex', 'box');
                    keyword.vendor = 'webkit';
                });
        }
    });


    //flex-direction
    tasks.addTask({
        forBrowsersLowerThan: support,
        filter: {
            type: 'Declaration',
            name: 'flex-direction'
        },
        fn: function (declaration) {
            applyFlexDirection(declaration.join(' '), declaration);
        }
    });


    //flex-flow: <flex-direction> || <flex-wrap>
    tasks.addTask({
        forBrowsersLowerThan: support,
        filter: {
            type: 'Declaration',
            name: 'flex-flow'
        },
        fn: function (declaration) {
            var value = declaration.get('Value');

            if (value[0]) { //flex-direction
                applyFlexDirection(value[0].toString(), declaration);
            }

            if (value[1]) { //flex-wrap
                applyFlexWrap(value[1].toString(), declaration);
            }
        }
    });


    //flex: <flex-grow> <flex-shrink>? || <flex-basis>
    tasks.addTask({
        forBrowsersLowerThan: support,
        filter: {
            type: 'Declaration',
            name: 'flex'
        },
        fn: function (declaration) {
            var value = declaration.get('Value');

            if (value[0]) { //flex-grow
                var val = value[0].toString();

                if (val === 'none') {
                    val = '0.0';
                }

                declaration.codeBefore('-webkit-box-flex: ' + val, 'Declaration');
            }
        }
    });


    //flex-wrap
    tasks.addTask({
        forBrowsersLowerThan: support,
        filter: {
            type: 'Declaration',
            name: 'flex-wrap'
        },
        fn: function (declaration) {
            applyFlexWrap(declaration.join(' '), declaration);
        }
    });


    //order
    tasks.addTask({
        forBrowsersLowerThan: support,
        filter: {
            type: 'Declaration',
            name: 'order'
        },
        fn: function (declaration) {
            declaration.codeBefore('-webkit-box-ordinal-group: ' + (parseInt(declaration.join(' ')) + 1), 'Declaration');
        }
    });


    //name/value replacements
    tasks.addTask({
        forBrowsersLowerThan: support,
        filter: {
            type: 'Declaration',
            name: Object.keys(names)
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

    function applyFlexWrap(value, declaration) {
        switch (value) {
            case 'wrap':
                declaration.codeBefore('-webkit-box-lines: multiple', 'Declaration');
                break;

            case 'nowrap':
                declaration.codeBefore('-webkit-box-lines: single', 'Declaration');
                break;

            case 'wrap-reverse':
                declaration.codeBefore('-webkit-box-lines: multiple', 'Declaration');
                declaration.codeBefore('-webkit-box-direction: reverse', 'Declaration');
                break;
        }
    }

    function applyFlexDirection(value, declaration) {
        switch (value) {
            case 'row':
                declaration.codeBefore('-webkit-box-orient: horizontal', 'Declaration');
                break;

            case 'row-reverse':
                declaration.codeBefore('-webkit-box-orient: horizontal', 'Declaration');
                declaration.codeBefore('-webkit-box-direction: reverse', 'Declaration');
                break;

            case 'column':
                declaration.codeBefore('-webkit-box-orient: vertical', 'Declaration');
                break;

            case 'column-reverse':
                declaration.codeBefore('-webkit-box-orient: vertical', 'Declaration');
                declaration.codeBefore('-webkit-box-direction: reverse', 'Declaration');
                break;
        }
    }
};
