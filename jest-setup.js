import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View: View,
    Extrapolate: { CLAMP: 'clamp' },
    Transition: {
      Together: 'Together',
      Out: 'Out',
      In: 'In',
    },
    useSharedValue: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn(() => ({})),
    useDerivedValue: jest.fn(),
    withTiming: jest.fn(),
    withSpring: jest.fn(),
    withDelay: jest.fn(),
    createAnimatedComponent: (component) => component,
    default: {
        call: () => {},
        createAnimatedComponent: (component) => component,
    },
  };
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');

// Mock react-native-splash-screen
jest.mock('react-native-splash-screen', () => ({
    hide: jest.fn(),
    show: jest.fn(),
}));

// Mock react-native-keyboard-manager
jest.mock('react-native-keyboard-manager', () => ({
    setEnable: jest.fn(),
    setEnableDebug: jest.fn(),
    setKeyboardDistanceFromTextField: jest.fn(),
    setEnableAutoToolbar: jest.fn(),
    setToolbarDoneBarButtonItemText: jest.fn(),
    setToolbarManageBehaviourBy: jest.fn(),
    setToolbarPreviousNextButtonEnable: jest.fn(),
    setShouldShowToolbarPlaceholder: jest.fn(),
    setOverrideKeyboardAppearance: jest.fn(),
    setKeyboardAppearance: jest.fn(),
    setShouldResignOnTouchOutside: jest.fn(),
    setShouldPlayInputClicks: jest.fn(),
    resignFirstResponder: jest.fn(),
    isKeyboardShowing: jest.fn(),
}));

// Mock react-native-snackbar
jest.mock('react-native-snackbar', () => ({
    LENGTH_LONG: 0,
    LENGTH_SHORT: 1,
    LENGTH_INDEFINITE: 2,
    show: jest.fn(),
}));

// Mock @react-native-google-signin/google-signin
jest.mock('@react-native-google-signin/google-signin', () => ({
    GoogleSignin: {
        configure: jest.fn(),
        hasPlayServices: jest.fn(),
        signIn: jest.fn(),
        signOut: jest.fn(),
    },
    statusCodes: {
        SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
        IN_PROGRESS: 'IN_PROGRESS',
        PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
        SIGN_IN_REQUIRED: 'SIGN_IN_REQUIRED',
    },
}));

// Mock react-native-image-crop-picker
jest.mock('react-native-image-crop-picker', () => ({
    openPicker: jest.fn(),
    openCamera: jest.fn(),
}));

// Mock @stripe/stripe-react-native
jest.mock('@stripe/stripe-react-native', () => ({
    StripeProvider: jest.fn(({ children }) => children),
    useStripe: jest.fn(() => ({
        initPaymentSheet: jest.fn(),
        presentPaymentSheet: jest.fn(),
        confirmPayment: jest.fn(),
    })),
    CardField: jest.fn(),
    CardFieldInput: jest.fn(),
}));

// Mock react-native-webview
jest.mock('react-native-webview', () => {
    const View = require('react-native').View;
    return {
        WebView: View,
    };
});

// Mock rn-fetch-blob
jest.mock('rn-fetch-blob', () => ({
    DocumentDir: () => {},
    ImageCache: {
        get: {
            clear: () => {},
        },
    },
    fs: {
        dirs: {
            MainBundleDir: () => {},
            CacheDir: () => {},
            DocumentDir: () => {},
        },
    },
}));

// Mock react-native-document-picker
jest.mock('react-native-document-picker', () => ({
    pick: jest.fn(),
    pickMultiple: jest.fn(),
    isCancel: jest.fn(),
    types: {
        allFiles: 'allFiles',
        images: 'images',
        plainText: 'plainText',
        audio: 'audio',
        pdf: 'pdf',
        zip: 'zip',
        csv: 'csv',
        doc: 'doc',
        docx: 'docx',
        ppt: 'ppt',
        pptx: 'pptx',
        xls: 'xls',
        xlsx: 'xlsx',
    },
}));

// Mock react-native-fbsdk-next
jest.mock('react-native-fbsdk-next', () => ({
    LoginManager: {
        logInWithPermissions: jest.fn(),
        logOut: jest.fn(),
    },
    AccessToken: {
        getCurrentAccessToken: jest.fn(),
    },
    Settings: {
        initializeSDK: jest.fn(),
    },
}));

// Mock react-native-snap-carousel
jest.mock('react-native-snap-carousel', () => {
    const React = require('react');
    const View = require('react-native').View;
    return class MockCarousel extends React.Component {
        render() {
            return React.createElement(View, this.props, this.props.children);
        }
    };
});

// Mock @react-native-firebase/messaging
jest.mock('@react-native-firebase/messaging', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        hasPermission: jest.fn(() => Promise.resolve(true)),
        subscribeToTopic: jest.fn(),
        unsubscribeFromTopic: jest.fn(),
        requestPermission: jest.fn(() => Promise.resolve(true)),
        getToken: jest.fn(() => Promise.resolve('my-mock-token')),
        onMessage: jest.fn(),
        onNotificationOpenedApp: jest.fn(),
        getInitialNotification: jest.fn(() => Promise.resolve(false)),
    })),
}));

// Mock @react-native-firebase/firestore
jest.mock('@react-native-firebase/firestore', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                set: jest.fn(),
                get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
                update: jest.fn(),
                onSnapshot: jest.fn(),
            })),
            add: jest.fn(),
            where: jest.fn(() => ({
                get: jest.fn(() => Promise.resolve({ empty: true, docs: [] })),
                onSnapshot: jest.fn(),
            })),
        })),
    })),
}));

// Mock @react-native-firebase/app
jest.mock('@react-native-firebase/app', () => ({
    __esModule: true,
    default: {
        app: jest.fn(() => ({
            utils: jest.fn(() => ({})),
        })),
        apps: [],
        initializeApp: jest.fn(),
    },
}));

// Mock react-native-notifications
jest.mock('react-native-notifications', () => ({
    Notifications: {
        getInitialNotification: jest.fn(() => Promise.resolve()),
        registerRemoteNotifications: jest.fn(),
        events: jest.fn(() => ({
            registerRemoteNotificationsRegistered: jest.fn(),
            registerRemoteNotificationsRegistrationFailed: jest.fn(),
            registerNotificationReceivedForeground: jest.fn(),
            registerNotificationReceivedBackground: jest.fn(),
            registerNotificationOpened: jest.fn(),
        })),
    },
}));
