module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
