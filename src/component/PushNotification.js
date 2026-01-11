// import React, { useEffect } from 'react';
// import { Platform } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Notifications } from 'react-native-notifications';
// import { FCM_TOKEN } from '../utils/constant';

// export default function PushNotification({ navigation, user, pageOn }) {
//   useEffect(() => {
//     Notifications.registerRemoteNotifications();
//     checkApplicationPermission();
//   }, []);

//   async function checkApplicationPermission() {
//     const authorizationStatus = await messaging().requestPermission();
//     if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
//       getToken();
//     } else if (
//       authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
//     ) {
//       requestUserPermission();
//     } else {
//     }
//   }

//   async function getToken() {
//     let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
//     //console.log("fcmToken1 ", fcmToken);
//     if (!fcmToken) {
//       fcmToken = await messaging().getToken();
//       //console.log("fcmToken2", fcmToken);
//       if (fcmToken) {
//         await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
//       }
//     }
//     //global.fcmToken = fcmToken
//   }

//   async function requestUserPermission() {
//     const authorizationStatus = await messaging().requestPermission();
//     if (authorizationStatus) {
//       getToken();
//     }
//   }

//   useEffect(() => {
//     // Assume a message-notification contains a "type" property in the data payload of the screen to open
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('GOT NOTIFICATION>>>' + JSON.stringify(remoteMessage));
//       if (Platform.OS == 'ios') {
//         Notifications.events().registerNotificationReceivedForeground(
//           (notification, completion) => {
//             console.log('Notification Received - Foreground', notification);
//             completion({ alert: true, sound: true, badge: false });
//           },
//         );
//         Notifications.events().registerNotificationReceivedBackground(
//           (notification, completion) => {
//             completion({ alert: true, sound: true, badge: false });
//           },
//         );

//         Notifications.postLocalNotification({
//           title:
//             remoteMessage.data &&
//               remoteMessage.data.notification &&
//               remoteMessage.data.notification.title
//               ? remoteMessage.data.notification.title
//               : remoteMessage.notification.title,
//           body:
//             remoteMessage.data &&
//               remoteMessage.data.notification &&
//               remoteMessage.data.notification.body
//               ? remoteMessage.data.notification.body
//               : remoteMessage.notification.body,
//           data: {},
//           silent: false,
//           category: 'SOME_CATEGORY',
//           userInfo: {},
//         });
//       } else {
//         Notifications.postLocalNotification({
//           title: remoteMessage.notification.title,
//           body: remoteMessage.notification.body,
//           data: {},
//           extra: 'data',
//         });
//       }

//       Notifications.events().registerNotificationOpened(
//         (notification, completion) => {
//           console.log(
//             `Notification opened RIGHT: ` +
//             JSON.stringify(notification.payload),
//           );
//           // REDIRECT USER TO SCREEN ONPRESS OF NOTIFICATION BY --> remoteMessage.data?.type
//           if (remoteMessage.data?.type == 'type') {
//             // navigation.navigate('scene')
//           }
//           //console.log(`Notification opened: `+JSON.stringify(notification));
//           //console.log(`remoteMessage.data.token1, `+remoteMessage.data.token);
//           completion();
//         },
//       );
//     });

//     messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log('on notification Open HEY' + JSON.stringify(remoteMessage));
//       if (remoteMessage) {
//         // REDIRECT USER TO SCREEN ONPRESS OF NOTIFICATION BY --> remoteMessage.data?.type
//         if (remoteMessage.data?.type == 'type') {
//           // navigation.navigate('scene')
//         }
//         // console.log(`remoteMessage.data.token2, `+remoteMessage.data.token)
//       }
//     });
//     // Check whether an initial notification is available
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         //console.log('Initial notification ' + JSON.stringify(remoteMessage))
//         if (remoteMessage) {
//           // REDIRECT USER TO SCREEN ONPRESS OF NOTIFICATION BY --> remoteMessage.data?.type
//           if (remoteMessage.data?.type == 'type') {
//             // navigation.navigate('scene')
//           }
//           // console.log(`remoteMessage.data.token3, `+remoteMessage.data.token)
//         }
//       });

//     return unsubscribe;
//   }, []);

//   return <></>;
// }

// import React, {useEffect} from 'react';
// import {Platform} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Notifications} from 'react-native-notifications';
// import {FCM_TOKEN} from '../utils/constant';

// export default function PushNotification({navigation, user, pageOn}) {
//   useEffect(() => {
//     Notifications.registerRemoteNotifications();
//     checkApplicationPermission();
//   }, []);

//   async function checkApplicationPermission() {
//     const authorizationStatus = await messaging().requestPermission();
//     if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
//       getToken();
//     } else if (
//       authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
//     ) {
//       requestUserPermission();
//     } else {
//     }
//   }

//   async function getToken() {
//     let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
//     //console.log("fcmToken1 ", fcmToken);
//     if (!fcmToken) {
//       fcmToken = await messaging().getToken();
//       //console.log("fcmToken2", fcmToken);
//       if (fcmToken) {
//         await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
//       }
//     }
//     //global.fcmToken = fcmToken
//   }

//   async function requestUserPermission() {
//     const authorizationStatus = await messaging().requestPermission();
//     if (authorizationStatus) {
//       getToken();
//     }
//   }

//   useEffect(() => {
//     // Assume a message-notification contains a "type" property in the data payload of the screen to open
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('GOT NOTIFICATION>>>' + JSON.stringify(remoteMessage));
//       if (Platform.OS == 'ios') {
//         Notifications.events().registerNotificationReceivedForeground(
//           (notification, completion) => {
//             console.log('Notification Received - Foreground', notification);
//             completion({alert: true, sound: true, badge: false});
//           },
//         );
//         Notifications.events().registerNotificationReceivedBackground(
//           (notification, completion) => {
//             completion({alert: true, sound: true, badge: false});
//           },
//         );

//         Notifications.postLocalNotification({
//           title:
//             remoteMessage.data &&
//             remoteMessage.data.notification &&
//             remoteMessage.data.notification.title
//               ? remoteMessage.data.notification.title
//               : remoteMessage.notification.title,
//           body:
//             remoteMessage.data &&
//             remoteMessage.data.notification &&
//             remoteMessage.data.notification.body
//               ? remoteMessage.data.notification.body
//               : remoteMessage.notification.body,
//           data: {},
//           silent: false,
//           category: 'SOME_CATEGORY',
//           userInfo: {},
//         });
//       } else {
//         Notifications.postLocalNotification({
//           title: remoteMessage.notification.title,
//           body: remoteMessage.notification.body,
//           data: {},
//           extra: 'data',
//         });
//       }

//       Notifications.events().registerNotificationOpened(
//         (notification, completion) => {
//           console.log(
//             `Notification opened RIGHT: ` +
//               JSON.stringify(notification.payload),
//           );
//           // REDIRECT USER TO SCREEN ONPRESS OF NOTIFICATION BY --> remoteMessage.data?.type
//           if (remoteMessage.data?.type == 'type') {
//             // navigation.navigate('scene')
//           }
//           //console.log(`Notification opened: `+JSON.stringify(notification));
//           //console.log(`remoteMessage.data.token1, `+remoteMessage.data.token);
//           completion();
//         },
//       );
//     });

//     messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log('on notification Open HEY' + JSON.stringify(remoteMessage));
//       if (remoteMessage) {
//         // REDIRECT USER TO SCREEN ONPRESS OF NOTIFICATION BY --> remoteMessage.data?.type
//         if (remoteMessage.data?.type == 'type') {
//           // navigation.navigate('scene')
//         }
//         // console.log(`remoteMessage.data.token2, `+remoteMessage.data.token)
//       }
//     });
//     // Check whether an initial notification is available
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         //console.log('Initial notification ' + JSON.stringify(remoteMessage))
//         if (remoteMessage) {
//           // REDIRECT USER TO SCREEN ONPRESS OF NOTIFICATION BY --> remoteMessage.data?.type
//           if (remoteMessage.data?.type == 'type') {
//             // navigation.navigate('scene')
//           }
//           // console.log(`remoteMessage.data.token3, `+remoteMessage.data.token)
//         }
//       });

//     return unsubscribe;
//   }, []);

//   return <></>;
// }

import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notifications } from 'react-native-notifications';
import { FCM_TOKEN } from '../utils/constant';

export default function PushNotification({ navigation, user, pageOn }) {
  useEffect(() => {
    // Register for notifications and check permissions
    Notifications.registerRemoteNotifications();
    checkApplicationPermission();
  }, []);

  // Function to check and request notification permissions
  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      getToken();
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      requestUserPermission();
    } else {
      // Handle permission denied case
      console.log('Notification permission denied');
    }
  }

  // Function to get or generate FCM token
  async function getToken() {
    let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
      }
    }
  }

  // Request user permission in case of provisional status
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      getToken();
    }
  }

  useEffect(() => {
    // Listen for notifications when app is in foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notification received in foreground: ', remoteMessage);
      
      if (Platform.OS === 'ios') {
        // iOS specific notifications handling
        Notifications.events().registerNotificationReceivedForeground(
          (notification, completion) => {
            console.log('Notification Received - Foreground', notification);
            completion({ alert: true, sound: true, badge: false });
          }
        );
        Notifications.events().registerNotificationReceivedBackground(
          (notification, completion) => {
            completion({ alert: true, sound: true, badge: false });
          }
        );

        // Post local notification on iOS
        Notifications.postLocalNotification({
          title: remoteMessage.notification.title || 'No Title',
          body: remoteMessage.notification.body || 'No Body',
          data: remoteMessage.data,
          silent: false,
          category: 'SOME_CATEGORY',
          userInfo: {},
        });
      } else {
        // Android-specific notification handling
        Notifications.postLocalNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          data: remoteMessage.data,
          extra: 'data',
        });
      }

      // Handling notification tap (when user opens the app via a notification)
      Notifications.events().registerNotificationOpened(
        (notification, completion) => {
          console.log('Notification opened: ', notification.payload);
          if (remoteMessage.data?.type === 'type') {
            // Handle navigation on notification click
            // navigation.navigate('Scene');
          }
          completion();
        }
      );
    });

    // Handle background notification opening
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened from background: ', remoteMessage);
      if (remoteMessage) {
        if (remoteMessage.data?.type === 'type') {
          // Handle navigation on notification click
          // navigation.navigate('Scene');
        }
      }
    });

    // Handle initial notification when the app is launched from a notification
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        if (remoteMessage.data?.type === 'type') {
          // Handle navigation on initial notification click
          // navigation.navigate('Scene');
        }
      }
    });

    return unsubscribe;
  }, []);

  return <></>;
}
