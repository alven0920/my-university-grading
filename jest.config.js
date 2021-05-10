module.exports = {
  setupFiles: ['dotenv/config'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  testEnvironment: 'node',
  testRegex: '/__specs__/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    }
  }
};
