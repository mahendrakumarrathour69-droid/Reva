import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { userActionServices } from '../redux/userServices';
import { LOGIN, FORGOTOTP, SOCIALLOGIN } from '../utils/reducerConstant';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import { showLoader, hideLoader } from '../component/AppLoader';
import { AuthContext } from '../navigation/context';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { firebaseToken } from '../constant/constant';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appleAuth } from '@invertase/react-native-apple-authentication';
export default function Login(props) {
  const { signIn } = useContext(AuthContext);
  const [hidePassword, sethidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.loginData);
  const [firebaseTokenData, setFirebaseToken] = useState('');
  const googleLoginData = useSelector(state => state.socialLoginData);

  console.log('googleLoginData', JSON.stringify(googleLoginData));
  var socailLoginData;
  useEffect(() => {
    
     GoogleSignin.configure();
    // Configure Google Sign-In
    // webClientId: '530793332806-ie8as4el560fqo740r44ic8fcflgpcfs.apps.googleusercontent.com', // Replace with your actual Web client ID from the Google Cloud Console
// GoogleSignin.configure({
 
//   webClientId: '530793332806-l13d2hpbnfni6kkqadasf7q2i2sb8nma.apps.googleusercontent.com',
//   androidClientId:' 530793332806-nua0r1bnj8j2obm6cgqbd7rtgt31gcrv.apps.googleusercontent.com',
//   scopes: ['profile', 'email'],
//   offlineAccess: true, // Optional, if you need offline access
//   hostedDomain: '',    // Optional, restrict sign-in to specific domains (leave empty if not needed)
//   forceConsentPrompt: true, // Replace with your actual Web client ID from the Google Cloud Console
// });

    AsyncStorage.getItem(firebaseToken).then(data => {
      setFirebaseToken(data);
    });
  }, []);


  const handleLogin = () => {
    if (email.trim() === '') {
      snackbarError('Email should not be blanked');
    } else if (
      /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) === false
    ) {
      snackbarError('Please enter a valid email ');
    } else if (password.trim() === '') {
      snackbarError('Password should not be blanked');
    } else if (password.length < 3) {
      snackbarError('Password should be a minimum of 6 characters');
    } else {
      const loginData = {
        email: email,
        password: password,
        device_type: Platform.OS === 'ios' ? 'IPHONE' : 'ANDROID',
        device_id: firebaseTokenData,
        role: 2,
      };
      console.log("loginDataloginData>>>>", loginData);
      showLoader();
      dispatch(userActionServices.loginData(loginData));
      //dispatch(login_Data(loginData))
    }
  };
  useEffect(() => {
    hideLoader();
    if (loginData.type === LOGIN) {
      if (
        Object.keys(loginData.value).length != 0 &&
        loginData.value != undefined &&
        loginData.value.status
      ) {
        if (loginData.value.data.is_verify == 0) {
          //snackbarSuccess(loginData.value.message);
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarSuccess(loginData.value.message);
          }, 100);
          props.navigation.navigate('EmailOtpVerification', {
            user_id: loginData.value.data.userInfo.id,
            email: loginData.value.data.userInfo.email,
            is_verify: loginData.value.data.is_verify,
            from: 'Login',
          });
        } else {
          // snackbarSuccess('Login Successfully');
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarSuccess('Login Successfully');
          }, 100);
          AsyncStorage.setItem(ACCESS_TOKEN, loginData.value.data.access_token);
          AsyncStorage.setItem(
            USER_DATA,
            JSON.stringify(loginData.value.data.userInfo),
          );
          AsyncStorage.setItem(TOKEN, 'true');
          signIn();
          // props.navigation.navigate('DrawerComponent');
          dispatch(userActionServices.resetData());
        }
      } else {
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarError(loginData.value.message);
        }, 100);
       
        dispatch(userActionServices.resetData());
      }
    }

    // if (forgotOtpData.type === FORGOTOTP) {
    //   if (forgotOtpData.value.status === 1) {
    //     snackbarSuccess(
    //       'Please verify otp sent on your register mobile number',
    //     );
    //     props.navigation.navigate('RegisterOtp', {phone: phone, id: 2});
    //     dispatch(userActionServices.resetData());
    //   } else {
    //     snackbarError(forgotOtpData.value.message);
    //     dispatch(userActionServices.resetData());
    //   }
    // }
  }, [loginData]);

  // google Login
  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('data', userInfo);
      handleGoogle(userInfo.user, 'google');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('data', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('data', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('data', error);
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }

  
};
  

 
    //Apple Login
    const AppleLogin = async () => {
      console.log("click Apple")
      const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log("appleAuthRequestResponse>>",appleAuthRequestResponse);
      
      if (appleAuthRequestResponse.email !== null) {
          let tempData = {
              id: appleAuthRequestResponse?.user, //social_id
              name: appleAuthRequestResponse?.fullName?.givenName + " " + appleAuthRequestResponse?.fullName?.familyName,
              email: appleAuthRequestResponse?.email,
              //image: ""
          }
          handleGoogle( tempData,"Apple")
      } else {
          let tempData = {
              id: appleAuthRequestResponse?.user, //social_id
              // name: "",
              // email: "",
              // image: ""
          }
          handleGoogle( tempData,"Apple")
      }
  }

  const handleGoogle = (googleData, type) => {
    console.log('googleData', googleData);
    if (type == 'google') {
      socailLoginData = {
        google_id: googleData.id,
        email: googleData.email,
        first_name: googleData.givenName,
        last_name: googleData.familyName,
        device_type: Platform.OS === 'ios' ? 'IPHONE' : 'ANDROID',
        device_id: firebaseTokenData=='' || firebaseTokenData==undefined || firebaseTokenData=='null'?"token":firebaseTokenData ,
        role: 2,
      };
    }else if(type=='Apple'){
      socailLoginData = {
        apple_id: googleData.id,
        email: googleData.email,
        first_name: googleData.name,
        last_name: googleData.familyName,
        device_type: Platform.OS === 'ios' ? 'IPHONE' : 'ANDROID',
        device_id: firebaseTokenData=='' || firebaseTokenData==undefined || firebaseTokenData=='null'?"token":firebaseTokenData ,
        role: 2,
      };
      
    } else {
      socailLoginData = {
        facebook_id: googleData.id,
        email: googleData.email,
        first_name: googleData.name,
        device_type: Platform.OS === 'ios' ? 'IPHONE' : 'ANDROID',
        device_id: firebaseTokenData=='' || firebaseTokenData==undefined || firebaseTokenData=='null'?"token":firebaseTokenData ,
        role: 2,
      };
    }
    console.log("socailLoginData>>",socailLoginData);
    dispatch(userActionServices.socialLoginData(socailLoginData));
    LoginManager;
  };

  const facebookLogin = () => {
    console.log('ddhkdshkshgksh');
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }

    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async result => {
        console.log('result', result);
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            fetch(
              'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
              data.accessToken,
            )
              .then(response => response.json())
              .then(json => {
                fbloginApi(json);
              })
              .catch(error => {
                console.log(error);
              });
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
    LoginManager.logOut();
  };

  function fbloginApi(json) {
    console.log('fb data', json);
    handleGoogle(json, 'facebook');
  }

  // gogleglogin response
  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       console.log("link.urll",link);
        
  //       if (link.url === 'https://invertase.io/offer') {
  //       console.log("deepLInk");
  //    props.navigation.navigate('RegisterScreen')
     
  //       }
  //     });
  // }, []);

  useEffect(() => {
    hideLoader();
    if (googleLoginData.type === SOCIALLOGIN) {
      if (
        Object.keys(googleLoginData.value).length != 0 &&
        googleLoginData.value != undefined &&
        googleLoginData.value.status
      ) {
        // snackbarSuccess('Login Successfully');
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarSuccess('Login Successfully');
        }, 100);
        AsyncStorage.setItem(
          ACCESS_TOKEN,
          googleLoginData.value.data.access_token,
        );
        AsyncStorage.setItem(
          USER_DATA,
          JSON.stringify(googleLoginData.value.data.userInfo),
        );
        AsyncStorage.setItem(TOKEN, 'true');
        signIn();
        // props.navigation.navigate('DrawerComponent');
        dispatch(userActionServices.resetData());
      } else {
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          //  snackbarSuccess('Login Successfully');
          snackbarError(googleLoginData.value.message);
        }, 100);
        handleGoogleLogout()
        dispatch(userActionServices.resetData());
      }
    }
  }, [googleLoginData]);

  async function handleGoogleLogout() {
    try {
      await GoogleSignin.signOut();
      console.log("logout >>>>>");
      // Perform additional cleanup and logout operations.
    } catch (error) {
      console.log('Google Sign-Out Error: ', error);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          height: mvs(125),
          backgroundColor: colors.darkblue,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.white,
            fontSize: s(32),
            marginTop: mvs(15),
            fontFamily: fonts.quicksandMedium,
          }}>
          Login
        </Text>
        <Text
          style={{
            color: colors.white,
            fontSize: s(16),
            marginTop: mvs(6),
            fontFamily: fonts.quicksandBook,
          }}>
          Please fill your information below
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: ms(38),
          marginTop: mvs(102),
        }}>
        <View style={{ marginTop: mvs(10) }}>
          <Text style={styles.textTitle}>
            Email <Text style={{ color: colors.red }}>*</Text>
          </Text>

          <View
            style={{
              borderColor: colors.lightBackground,
              backgroundColor: colors.lightBackground,
              borderRadius: ms(6),
              padding: Platform.OS === 'android' ? ms(6) : ms(13),
              marginTop: mvs(7),
            }}>
            <TextInput
              style={{
                color: colors.blue,
                fontSize: s(14),
                height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                fontFamily: fonts.quicksandMedium,
              }}
              value={email}
                keyboardType='email-address'
              onChangeText={text => setEmail(text)}
              placeholderTextColor={colors.grey}
              placeholder="Email"></TextInput>
          </View>
        </View>
        <View style={{ marginTop: mvs(10) }}>
          <Text style={styles.textTitle}>
            Password <Text style={{ color: colors.red }}>*</Text>
          </Text>

          <View
            style={{
              borderColor: colors.lightBackground,
              backgroundColor: colors.lightBackground,
              borderRadius: ms(6),
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: Platform.OS === 'android' ? ms(4) : ms(13),
              alignItems: 'center',
              marginTop: mvs(7),
            }}>
            <TextInput
              style={{
                color: colors.blue,
                flex: 1,
                marginEnd: ms(5),
                fontSize: s(14),
                height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                fontFamily: fonts.quicksandMedium,
              }}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Password "
              placeholderTextColor={colors.grey}
              secureTextEntry={hidePassword}></TextInput>
            <TouchableOpacity
              onPress={() => sethidePassword(!hidePassword)}
              style={{ padding: Platform.OS === 'ios' ? ms(0) : ms(8) }}>
              <Image
                source={hidePassword == true ? images.eyeClose : images.eyeOpen}
                style={{
                  height: mvs(12),
                  width: mvs(18),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={{
            borderColor: colors.primaryColor,
            backgroundColor: colors.primaryColor,
            borderWidth: ms(1),
            paddingVertical: ms(11),
            justifyContent: 'center',
            borderRadius: ms(6),
            marginTop: mvs(25),
          }}>
          <Text
            style={{
              fontSize: s(18),
              color: 'white',
              textAlign: 'center',
              fontFamily: fonts.quicksandMedium,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PasswordReset')}
          style={{ marginTop: mvs(25), alignSelf: 'center' }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.primaryColor,
              fontFamily: fonts.quicksandMedium,
            }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        // onPress={()=>{
        //   props?.navigation.navigate('DeepLinking')
        // }}
        style={{ marginTop: mvs(25), alignSelf: 'center' }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.blueLight,
              fontFamily: fonts.quicksandMedium,
            }}>
            OR continue with
          </Text>
        </TouchableOpacity>
     
          
            
      </View>
<View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
      <TouchableOpacity style={{marginTop:25,height:50,width:50,marginHorizontal:20}} onPress={() => googleLogin()}>
            <View style={{borderWidth:1,borderColor:colors.lightBackground,borderRadius:10,flex:1,justifyContent:'center',alignItems:'center'}}>
              <Image
                source={images.googleIcon}
                style={{
                  resizeMode: 'contain',
                  height: 20,
                  width:20,
              
                  // width: 'auto',
                //  minWidth: '90%',
                }}></Image>
                </View>
            </TouchableOpacity>
      {
              Platform.OS=='ios' ?

              <TouchableOpacity style={{marginTop:25,height:50,width:50,}} onPress={() => AppleLogin()}>
              <View style={{borderWidth:1,borderColor:colors.lightBackground,borderRadius:10,flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image
                  source={images.apple}
                  style={{
                    resizeMode: 'contain',
                    height: 20,
                    width:20,
                
                    // width: 'auto',
                  //  minWidth: '90%',
                  }}></Image>
                  </View>
              </TouchableOpacity>
            :null
            }
     </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View
          style={{
          marginVertical:Platform.OS=='ios'?40:10,
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.blueLight,
              fontFamily: fonts.quicksandBook,
            }}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('RegisterScreen')}>
            <Text
              style={{
                color: colors.primaryColor,
                fontSize: s(14),
                fontFamily: fonts.quicksandMedium,
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textTitle: {
    color: colors.blue,
    fontSize: s(16),
    fontFamily: fonts.quicksandMedium,
  },
});
