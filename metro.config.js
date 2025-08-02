const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude test files and testing libraries from bundling
const existingBlockList = Array.isArray(config.resolver.blockList) 
  ? config.resolver.blockList 
  : config.resolver.blockList 
    ? [config.resolver.blockList] 
    : [];

config.resolver.blockList = [
  ...existingBlockList,
  /.*\/__tests__\/.*/,
  /.*\.test\.(js|jsx|ts|tsx)$/,
  /.*\.spec\.(js|jsx|ts|tsx)$/,
  /node_modules\/@testing-library\/.*/,
  /node_modules\/jest.*/,
];

module.exports = config;