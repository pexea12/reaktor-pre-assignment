module.exports = {
  testMatch: [
    '**/tests/**/*.test.(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
