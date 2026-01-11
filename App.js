import { View, Text, StatusBar, TextInput, PermissionsAndroid } from 'react-native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import KeyboardManager from 'react-native-keyboard-manager';
import RootNavigator from './src/navigation/AppNavigation';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { firebaseToken } from './src/constant/constant';
import store from './src/redux/store';
import AppLoader, { loaderRef } from './src/component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from './src/component/PushNotification';


export default function App() {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setKeyboardDistanceFromTextField(10);
  }
  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 2000);
  }, []);
  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   SplashScreen.hide();
  //   // }, 2000);
  //   // console.log(">>>>aman",UIManager.getViewManagerConfig('RNCSafeAreaProvider')); 
  //   requestUserPermission();
  // }, []);

  useEffect(() => {
  
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    requestPermission()
    requestNotificationPermission()
 
  }, []);

  const requestNotificationPermission = async () => {
    if(Platform.OS ==="android"){
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
          response => {
            if(!response){
              PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS',{
                  title: 'Notification',
                  message:
                    'App needs access to your notification ' +
                    'so you can get Updates',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
              })
            }
          }
        ).catch(
          err => {
            console.log("Notification Error=====>",err);
          }
        )
      } catch (err){
        console.log(err);
      }
    }
  };
  async function requestPermission() {
    console.log("Requesting notification permissions...");
 
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
 
      if (enabled) {
        console.log("Notification permission granted.");
        await getFcmToken();
      } else {
        console.log("Notification permission not granted.");
      }
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
    }
  }
 
 
 

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('authStatus', authStatus);
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('authorization status', authStatus);
      console.log('enabled', enabled);
      getFcmToken();
    }
  };
  const getFcmToken = async () => {
    let checkToken = await AsyncStorage.getItem(firebaseToken);
    console.log('old token', checkToken);
    if (!checkToken) {
      try {
        const fcmToken = await messaging()
          .registerDeviceForRemoteMessages()
          .then(async token => {
            console.log('token', token);
            const getToken = await messaging().getToken();
            if (getToken) {
              AsyncStorage.setItem(firebaseToken, getToken);
              console.log('getToken', getToken);
            } else {
              AsyncStorage.setItem(firebaseToken, 'gsg');
              console.log('Failed', 'No token received');
            }
          });
      } catch (error) {
        console.log('error in fcm token', error);
        alert(error?.message);
      }
    }
  };
  

  // const getFcmToken = async () => {
  //   let checkToken = await AsyncStorage.getItem(firebaseToken);
  //   console.log('old token', checkToken);
  //   if (!checkToken) {
  //     try {
  //       const fcmToken = await messaging().getToken();
  //       console.log(fcmToken);
  //       if (!!fcmToken) {
  //         console.log('fcm token generrated', fcmToken);
  //         await AsyncStorage.setItem(firebaseToken, fcmToken);
  //       } else {
  //         AsyncStorage.setItem(firebaseToken, 'gsg');
  //       }
  //     } catch (error) {
  //       console.log('error in fcm token', error);
  //       alert(error?.message);
  //     }
  //   }
  // };
  const CustomStattusBar = ({ backgroundColor, barStyle = 'dark-content' }) => {
    const insets = useSafeAreaInsets();
    return (
      <View style={{ height: insets.top, backgroundColor }}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColor}
          barStyle={barStyle}></StatusBar>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
        <PushNotification></PushNotification>
      <AppLoader ref={loaderRef} />
      {/* <CustomStattusBar backgroundColor="white"></CustomStattusBar> */}
      {/* <StatusBar barStyle="dark-content" backgroundColor="pink" translucent={true} /> */}
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </View>
  );
}
