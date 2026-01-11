import React, { useEffect, useReducer, useMemo } from 'react';
import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  TOKEN,
  FIRST_TIME_USER,
} from '../utils/constant';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../screen/IntroScreen';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import RegisterScreen from '../screen/RegisterScreen';
import EmailOtpVerification from '../screen/EmailOtpVerification';
import Login from '../screen/Login';
import PasswordReset from '../screen/PasswordReset';
import NewPasswordRest from '../screen/NewPasswordRest';
import DrawerComponent from '../component/DrawerNavigation';
import SearchScreen from '../screen/SearchScreen';
import EditProfile from '../screen/EditProfile';
import CarerListing from '../screen/CarerListing';
import CarerDetail from '../screen/CarerDetail';
import { AuthContext } from './context';
import BookingRequest from '../screen/BookingRequest';
import PaymentScreen from '../screen/PaymentScreen';
import Services from '../screen/Services';
import JobPostedList from '../screen/JobPostedList';
import Notifications from '../screen/Notifications';
import ConfirmBooking from '../screen/ConfirmBooking';
import PromoCode from '../screen/PromoCode';
import AppliedList from '../screen/AppliedList';
import PostJobList from '../screen/PostJobList';
import Invoice from '../screen/Invoice';
import MyBooking from '../screen/MyBooking';
import Splash from '../screen/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../screen/Profile';
import AppliedDetails from '../screen/AppliedDetails';
import JobDetails from '../screen/JobDetails';
import { ChatScreen } from '../screen/ChatScreen';
import { ChatList } from '../screen/ChatList';
import PrivacyPolicy from '../screen/PrivacyPolicy';
import TermsCondition from '../screen/TermsCondition';
import ViewProposal from '../screen/ViewProposal';
import ViewServiceAgreement from '../screen/ViewServiceAgreement';
import ViewJobOffer from '../screen/ViewJobOffer';
import ServiceRequest from '../screen/ServiceRequest';
import RequestDetails from '../screen/RequestDetails';
import ApplyCoupons from '../screen/ApplyCoupons';
import MyBookingJobDeatils from '../screen/MyBookingJobDeatils';
import PaymentDetail from '../screen/PaymentDetail';
import ReviewRating from '../screen/ReviewRating';
import MyTicket from '../screen/MyTicket';
import PaymentHistory from '../screen/PaymentHistory';



const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
//after login stack call
const AuthenticateStack = createNativeStackNavigator();
const AuthenticateNavigator = () => (
  <AuthenticateStack.Navigator
    screenOptions={{ headerShown: false, gestureEnabled: false }}
    initialRouteName="DrawerComponent">
    <AuthenticateStack.Screen
      name="DrawerComponent"
      component={DrawerComponent}
      initialParams={{ defaultIndex: 'Home' }}
      navigationOptions={{ headerShown: false }}

      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="SearchScreen"
      component={SearchScreen}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="EditProfile"
      component={EditProfile}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="CarerListing"
      component={CarerListing}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="CarerDetail"
      component={CarerDetail}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="PaymentScreen"
      component={PaymentScreen}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="BookingRequest"
      component={BookingRequest}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="Services"
      component={Services}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="Notifications"
      component={Notifications}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="JobPostedList"
      component={JobPostedList}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="ConfirmBooking"
      component={ConfirmBooking}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="PromoCode"
      component={PromoCode}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="AppliedList"
      component={AppliedList}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="PostJobList"
      component={PostJobList}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="Invoice"
      component={Invoice}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="ChatList"
      component={ChatList}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="ChatScreen"
      component={ChatScreen}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="MyBooking"
      component={MyBooking}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="ViewProposal"
      component={ViewProposal}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="ViewServiceAgreement"
      component={ViewServiceAgreement}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="ViewJobOffer"
      component={ViewJobOffer}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="Profile"
      component={Profile}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="TermsCondition"
      component={TermsCondition}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicy}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="AppliedDetails"
      component={AppliedDetails}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

    <AuthenticateStack.Screen
      name="JobDetails"
      component={JobDetails}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="ServiceRequest"
      component={ServiceRequest}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="RequestDetails"
      component={RequestDetails}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="ApplyCoupons"
      component={ApplyCoupons}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="MyBookingJobDeatils"
      component={MyBookingJobDeatils}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="PaymentDetail"
      component={PaymentDetail}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="ReviewRating"
      component={ReviewRating}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="MyTicket"
      component={MyTicket}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <AuthenticateStack.Screen
      name="PaymentHistory"
      component={PaymentHistory}
      navigationOptions={{ headerShown: false }}
      options={{ animationEnabled: true, headerShown: false }}
    />

  </AuthenticateStack.Navigator>
);

// Before login stack screen
const UnauthenticateScreen = createNativeStackNavigator();
const UnAuthnticateNavigator = () => (
  <UnauthenticateScreen.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}>
    <UnauthenticateScreen.Screen
      name="Login"
      component={Login}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <UnauthenticateScreen.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <UnauthenticateScreen.Screen
      name="PasswordReset"
      component={PasswordReset}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <UnauthenticateScreen.Screen
      name="NewPasswordRest"
      component={NewPasswordRest}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <UnauthenticateScreen.Screen
      name="EmailOtpVerification"
      component={EmailOtpVerification}
      options={{ animationEnabled: true, headerShown: false }}
    />
   
  </UnauthenticateScreen.Navigator>
);

// Before login stack screen
const IntroScreens = createNativeStackNavigator();
const IntroScreenNavigator = () => (
  <IntroScreens.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="IntroScreen">
    <IntroScreens.Screen
      name="IntroScreen"
      component={IntroScreen}
      options={{ animationEnabled: true, headerShown: false }}
    />
    <IntroScreens.Screen
      name="Login"
      component={Login}
      options={{ animationEnabled: true, headerShown: false }}
    />

    {/* <IntroScreens.Screen
      name="Login"
      component={Login}
      options={{animationEnabled: true, headerShown: false}}
    /> */}
  </IntroScreens.Navigator>
);

const AuthStackNavigator = createNativeStackNavigator();
function AuthStackScreen(data) {
  console.log('data.userToken', data);

  if (data.userToken === 'true' && data.userIntro === 'true') {
    console.log('inif');
    return (
      <AuthStackNavigator.Navigator headerMode="none">
        <AuthStackNavigator.Screen
          name="AuthenticateUser"
          component={AuthenticateNavigator}
          navigationOptions={{ headerShown: false }}
          options={{ animationEnabled: true, headerShown: false }}
        />
      </AuthStackNavigator.Navigator>
    );
  } else if (data.userIntro === 'true') {
    console.log('introoo');
    return (
      <AuthStackNavigator.Navigator headerMode="none">
        <AuthStackNavigator.Screen
          name="UnAuthenticateUser"
          component={UnAuthnticateNavigator}
          navigationOptions={{ headerShown: false }}
          options={{ animationEnabled: true, headerShown: false }}
        />
      </AuthStackNavigator.Navigator>
    );
  } else {
    console.log('inelse');
    return (
      <AuthStackNavigator.Navigator headerMode="none">
        <AuthStackNavigator.Screen
          name="IntroScreenNavigator"
          component={IntroScreenNavigator}
          navigationOptions={{ headerShown: false }}
          options={{ animationEnabled: true, headerShown: false }}
        />
      </AuthStackNavigator.Navigator>
    );
  }
}

export default function RootNavigator() {
  useEffect(() => {
    setTimeout(() => {
      bootstrapAsync();
      state.isLoading;
    }, 1000);

    const bootstrapAsync = async () => {
      let userInfo;
      try {
        userInfo = {
          token: await AsyncStorage.getItem(TOKEN),
          intro: await AsyncStorage.getItem(FIRST_TIME_USER),
        };
      } catch (e) {
        console.log('error in useEffect ', e);
      }
      console.log('RESTORE_TOKEN', userInfo);
      dispatch({ type: RESTORE_TOKEN, userData: userInfo });
    };
  }, []);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      console.log('prevState, action', prevState, action);
      switch (action.type) {
        case RESTORE_TOKEN:
          return {
            ...prevState,
            userToken: action.userData.token,
            userIntro: action.userData.intro,
            isLoading: false,
          };
        case SIGN_IN:
          return {
            ...prevState,
            userToken: action.userData.token,
            userIntro: action.userData.intro,
            isSignout: false,
          };
        case SIGN_OUT:
          return {
            ...prevState,
            isSignout: true,
            userIntro: action.intro,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userIntro: null,
    },
  );

  const authContext = useMemo(() => {
    return {
      signIn: async () => {
        let userInfo;
        try {
          userInfo = {
            token: await AsyncStorage.getItem(TOKEN),
            intro: await AsyncStorage.getItem(FIRST_TIME_USER),
          };
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({ type: SIGN_IN, userData: userInfo });
      },

      signOut: async () => {
        let userInfo;
        try {
          userInfo = await AsyncStorage.getItem(FIRST_TIME_USER);
          //intro: await AsyncStorage.getItem(FIRST_TIME_USER);
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({ type: SIGN_OUT, intro: userInfo });
      },
    };
  }, []);

  console.log('state', state);
  if (state.isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>{AuthStackScreen(state)}</NavigationContainer>
    </AuthContext.Provider>
  );
  // return (
  //   <NavigationContainer>
  //     <RootStack.Navigator
  //       screenOptions={{headerShown: false}}
  //       initialRouteName="IntroScreen">
  //       <RootStack.Screen name="IntroScreen" component={IntroScreen} />
  //       <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
  //       <RootStack.Screen name="Login" component={Login} />
  //       <RootStack.Screen name="PasswordReset" component={PasswordReset} />
  //       <RootStack.Screen name="NewPasswordRest" component={NewPasswordRest} />
  //       <RootStack.Screen name="DrawerComponent" component={DrawerComponent} />
  //       <RootStack.Screen name="SearchScreen" component={SearchScreen} />
  //       <RootStack.Screen name="EditProfile" component={EditProfile} />
  //       <RootStack.Screen name="CarerListing" component={CarerListing} />
  //       <RootStack.Screen name="CarerDetail" component={CarerDetail} />
  //       <RootStack.Screen name="PaymentScreen" component={PaymentScreen} />
  //       <RootStack.Screen name="BookingRequest" component={BookingRequest} />
  //       <RootStack.Screen name="Services" component={Services} />
  //       <RootStack.Screen name="Notifications" component={Notifications} />
  //       <RootStack.Screen name="JobPostedList" component={JobPostedList} />
  //       <RootStack.Screen name="ConfirmBooking" component={ConfirmBooking} />
  //       <RootStack.Screen name="PromoCode" component={PromoCode} />
  //       <RootStack.Screen name="AppliedList" component={AppliedList} />
  //       <RootStack.Screen name="PostJobList" component={PostJobList} />
  //       <RootStack.Screen name="Invoice" component={Invoice} />
  //       <RootStack.Screen name="MyBooking" component={MyBooking} />
  //       <RootStack.Screen name="ChatList" component={ChatList} />
  //       <RootStack.Screen
  //         name="EmailOtpVerification"
  //         component={EmailOtpVerification}
  //       />
  //     </RootStack.Navigator>
  //   </NavigationContainer>
  // );
}

