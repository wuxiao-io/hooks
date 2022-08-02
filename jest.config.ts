import type { Config } from '@jest/types'

const ignoreDirs = [
  'dist/'
]

const defaultOptions: Config.InitialOptions = {
  coverageDirectory: '<rootDir>/coverage/',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`
  },
  testPathIgnorePatterns: ignoreDirs,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}

export default defaultOptions
