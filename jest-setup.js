import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

jest.mock('react-native-keyboard-manager', () => ({
  setEnable: jest.fn(),
  setEnableAutoToolbar: jest.fn(),
  setKeyboardDistanceFromTextField: jest.fn(),
}));

jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: 1,
  show: jest.fn(),
}));

jest.mock('@react-native-firebase/app', () => {
  return {
    apps: [],
    initializeApp: jest.fn(),
    messaging: jest.fn(() => ({
      hasPermission: jest.fn(() => Promise.resolve(true)),
      subscribeToTopic: jest.fn(),
      unsubscribeFromTopic: jest.fn(),
      requestPermission: jest.fn(() => Promise.resolve(true)),
      getToken: jest.fn(() => Promise.resolve('myMockToken')),
      onMessage: jest.fn(),
      onNotificationOpenedApp: jest.fn(),
      getInitialNotification: jest.fn(() => Promise.resolve(false)),
      setBackgroundMessageHandler: jest.fn(),
      onTokenRefresh: jest.fn(),
    })),
    // Mock the NativeEventEmitter used by Firebase
    // This is needed to avoid "Invariant Violation: `new NativeEventEmitter()` requires a non-null argument."
    // when using the actual Firebase modules which try to instantiate a NativeEventEmitter
  };
});

// Mock the NativeEventEmitter globally if needed, or specific modules
const { NativeModules } = require('react-native');
NativeModules.RNFBMessagingModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  events: [],
};

NativeModules.RNFBFirestoreModule = {
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  events: [],
  useEmulator: jest.fn(),
  // add other required methods
};

NativeModules.RnNotifications = {
  postLocalNotification: jest.fn(),
  cancelLocalNotification: jest.fn(),
  getInitialNotification: jest.fn(() => Promise.resolve(null)),
  // Add other methods as needed
};
NativeModules.RNNotifications = NativeModules.RnNotifications; // Try alias

jest.mock('react-native-notifications', () => {
    return {
        Notifications: {
            registerRemoteNotifications: jest.fn(),
            events: jest.fn(() => ({
                registerRemoteNotificationsRegistered: jest.fn(),
                registerRemoteNotificationsRegistrationFailed: jest.fn(),
                registerNotificationReceivedForeground: jest.fn(),
                registerNotificationReceivedBackground: jest.fn(),
                registerNotificationOpened: jest.fn(),
            })),
            getInitialNotification: jest.fn(() => Promise.resolve(null)),
            postLocalNotification: jest.fn(),
            cancelLocalNotification: jest.fn(),
        }
    }
});

jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(() => Promise.resolve(false)),
    setBackgroundMessageHandler: jest.fn(),
    onTokenRefresh: jest.fn(),
  });
});

jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        update: jest.fn(),
        onSnapshot: jest.fn(),
      })),
      add: jest.fn(),
      where: jest.fn(() => ({
        get: jest.fn(),
        onSnapshot: jest.fn(),
      })),
    })),
  });
});

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
}));

jest.mock('@invertase/react-native-apple-authentication', () => ({
  appleAuth: {
    isSupported: true,
  },
}));

jest.mock('react-native-fbsdk-next', () => ({
  LoginManager: {
    logInWithPermissions: jest.fn(),
  },
  Settings: {
    initializeSDK: jest.fn(),
  },
}));

jest.mock('@stripe/stripe-react-native', () => ({
  StripeProvider: ({ children }) => children,
}));

jest.mock('react-native-document-picker', () => ({
  pick: jest.fn(),
}));

jest.mock('react-native-image-crop-picker', () => ({
  openPicker: jest.fn(),
  openCamera: jest.fn(),
}));

jest.mock('react-native-webview', () => {
    const { View } = require('react-native');
    return {
        WebView: View,
    };
});

jest.mock('@react-native-community/netinfo', () => ({
    useNetInfo: jest.fn(),
    addEventListener: jest.fn(),
}));

jest.mock('rn-fetch-blob', () => ({
    DocumentDir: () => {},
    ImageCache: {
      get:  {
        clear: () => {},
      }
    },
    fs: {
      dirs: {
        MainBundleDir: () => {},
        DocumentDir: () => {},
      },
    },
}));

// jest.mock('react-native-permissions', () => ({
//   check: jest.fn(),
//   request: jest.fn(),
//   PERMISSIONS: {
//     ANDROID: {},
//     IOS: {},
//   },
//   RESULTS: {},
// }));
