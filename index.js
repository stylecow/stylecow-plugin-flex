module.exports = function (stylecow) {
	require('./src/ms')(stylecow);
	require('./src/webkit')(stylecow);
	require('./src/webkit-old')(stylecow);
};
