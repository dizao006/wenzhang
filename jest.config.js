module.exports = {
	testTimeout: 10000,
	reporters: [
		'default'
	],
	watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
	moduleFileExtensions: ['js', 'json'],
	rootDir: __dirname,
	testMatch: ["<rootDir>/pages/ai2/ai2.test.js"],
	testPathIgnorePatterns: ['/node_modules/']
}