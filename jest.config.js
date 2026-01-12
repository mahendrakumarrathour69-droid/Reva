module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest-setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__tests__/fileTransformer.js'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-splash-screen|react-native-keyboard-manager|@react-native-community|react-native-reanimated|@react-navigation|react-native-calendars|react-native-size-matters|react-native-swiper|react-native-loading-spinner-overlay|react-native-countdown-component|react-native-swipe-gestures|react-native-snap-carousel|@react-native-firebase|react-native-notifications|react-native-read-more-text|react-native-date-picker|react-native-keyboard-aware-scroll-view|react-native-iphone-x-helper|react-native-webview)/)"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/fileTransformer.js"
  ]
};
