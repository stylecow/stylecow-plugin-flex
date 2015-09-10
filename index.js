"use strict";

module.exports = function (tasks) {
    tasks.use(require('./src/ms'));
    tasks.use(require('./src/webkit'));
};
