module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/tests/**'
  ],
  coverageDirectory: 'results/coverage',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './results',
        filename: 'test-report.html',
        pageTitle: 'SauceDemo Test Report',
        expand: true,
        openReport: false
      }
    ]
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ]
};