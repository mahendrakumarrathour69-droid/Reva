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
  Modal,
  Linking,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import MyDropDown from '../component/MyDropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import { REGISTER, SOCIALLOGIN } from '../utils/reducerConstant';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AuthContext } from '../navigation/context';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { firebaseToken } from '../constant/constant';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication'
export default function RegisterScreen(props) {
  const roll_id = 2;
  const dispatch = useDispatch();
  var socialLoginData;
  const { signIn } = useContext(AuthContext);
  const googleLoginData = useSelector(state => state.socialLoginData);
  console.log('googleLoginData', googleLoginData);
  const isFocused = useIsFocused();
  const registerData = useSelector(state => state.register);
  console.log('registerData', registerData);
  const [individual, setindividual] = useState(true);
  const [organisation, setOrganisation] = useState(false);
  const [firebaseTokenData, setFirebaseToken] = useState('');

  const [hidePassword, sethidePassword] = useState(true);
  const [confirmHidePassword, setConfirmHidePassword] = useState(true);
  const [input, setInput] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+44');
  const [landlineNumber, setLandlineNumber] = useState('');
  const [organisationName, setorganisationName] = useState('');
  const [contactPersonName, setcontactPersonName] = useState('');
  const [isCheck, setIsCheck]=useState(0)
  const [gender, setGender] = useState({ id: 0, title: 'Select Gender' });
  const [title, setTitle] = useState({ id: 0, title: 'Select Title' });
  const titleList = [
    {
      id: '1',

      title: 'Mr',
    },
    {
      id: '2',

      title: 'Ms',
    },
    {
      id: '3',

      title: 'Mrs',
    },
  ];
  const genderList = [
    {
      id: '1',

      title: 'Male',
    },
    {
      id: '2',

      title: 'Female',
    },
    {
      id: '3',

      title: 'Prefer not to say',
    },
  ];

  //userType select
  const userTypeSelct = async type => {
    console.log('type', type);
    if (type == 1) {
      setindividual(true);
      setOrganisation(false);
      setInput(1);
    } else {
      setOrganisation(true);
      setindividual(false);
      setInput(2);
    }
  };
 // Regex for validating password
 const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

  // register user validation and api call
  const handleRegister = () => {
    if (input === 1) {
      if (title == 'Select Title') {
        snackbarError('Select Title');
      } else if (firstName.trim() == '') {
        snackbarError('First Name should not be blanked');
      } else if (lastName.trim() == '') {
        snackbarError('Last Name should not be blanked');
      } else if (email.trim() == '') {
        snackbarError('Email should not be blanked');
      } else if (
        /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) === false
      ) {
        snackbarError('Please enter a valid email ');
      } else if (mobileNumber.trim() == '') {
        snackbarError('Mobile Number should not be blanked');
      } else if (/\s/.test(mobileNumber)) {
        snackbarError('Mobile number should not contains spaces');
      } else if (mobileNumber.length != 10) {
        snackbarError('Mobile number should be 10 digits');
      } else if (gender.title == 'Select Gender') {
        snackbarError('Select Gender');
      } else if (password.trim() == '') {
        snackbarError('Password should not be blanked');
      } else if (password.length < 3) {
        snackbarError('Password length must be at least 3 characters');
      }   else if (
        (passwordRegex.test(password)===false)
      ) {
        snackbarError('The password must be 8-15 characters and contain at least 1 number, 1 lower case, 1 upper case and 1 special character from following @$!%*?&');
      }
      
      
      else if (confirmPassword.trim() == '') {
        snackbarError('ConfirmPassword should not be blanked');
      } else if (password != confirmPassword) {
        snackbarError('Password does not match');
      }else if(!isCheck){
        snackbarError('Please accept Terms and Conditions');
      } else {
        const loginRequest = {
          user_type: input,
          title: title.title,
          first_name: firstName,
          last_name: lastName,
          email: email,
          country_id: 1,
          phone_number: mobileNumber,
          gender: gender.title,
          password: password,
          password_confirmation: confirmPassword,
          role: roll_id,
          is_checkbox:isCheck?1:0
        };
        showLoader();
        console.log("register>>>",loginRequest);
        dispatch(userActionServices.register(loginRequest));
      }
    } else {
      if (organisationName.trim() == '') {
        snackbarError('OrganisationName should not be blanked');
      } else if (email.trim() == '') {
        snackbarError('Email should not be blanked');
      } else if (
        /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) === false
      ) {
        snackbarError('Please enter a valid email ');
      } else if (landlineNumber.trim() == '') {
        snackbarError('Landline number should not be blanked');
      } else if (/\s/.test(landlineNumber)) {
        snackbarError('Landline number should not contains spaces');
      } else if (landlineNumber.length != 10) {
        snackbarError('Landline number should be 10 digits');
      } else if (mobileNumber.trim() == '') {
        snackbarError('Mobile number should not be blanked');
      } else if (/\s/.test(mobileNumber)) {
        snackbarError('Mobile number should not contains spaces');
      } else if (mobileNumber.length != 10) {
        snackbarError('Mobile number should be 10 digits');
      } else if (contactPersonName.trim() == '') {
        snackbarError('ContactPersonName should not be blanked');
      } else if (password.trim() == '') {
        snackbarError('Password should not be blanked');
        }else if (
          (passwordRegex.test(password)===false)
        ) {
          snackbarError('The password must be 8-15 characters and contain at least 1 number, 1 lower case, 1 upper case and 1 special character from following @$!%*?&');
        
        }
      else if (password.length < 3) {
        snackbarError('Password length must be at least 3 characters');
      } else if (confirmPassword.trim() == '') {
        snackbarError('ConfirmPassword should not be blanked');
      } else if (password != confirmPassword) {
        snackbarError('Password does not match');
      }else if(!isCheck){
        snackbarError('Please accept Terms and Conditions');
      } 
       else {
        const loginRequest = {
          user_type: input,
          organisation_name: organisationName,
          email: email,
          landline_country_id: 1,
          landline_number: landlineNumber,
          country_id: 1,
          phone_number: mobileNumber,
          contact_person: contactPersonName,
          password: password,
          password_confirmation: confirmPassword,
          role: roll_id,
          is_checkbox:isCheck?1:0
        };
        showLoader();
        console.log("register>>>",loginRequest);
        
        dispatch(userActionServices.register(loginRequest));
      }
    }

    // if (mobileNumber.trim() == '') {
    //   snackbarError('Phone number should not be blanked');
    // } else if (mobileNumber.length < 7) {
    //   snackbarError('Phone number should be in between 7 to 12 digits');
    // } else {
    //   dispatch(userActionServices.register(mobileNumber));
    // }
  };
  // response api
  useEffect(() => {
    hideLoader();
    if (registerData.type === REGISTER) {
      if (
        Object.keys(registerData.value).length != 0 &&
        registerData.value != undefined &&
        registerData.value.status
      ) {
        // snackbarSuccess(' Congratulations ! you have registered successfully.');
        props.navigation.replace('EmailOtpVerification', {
          user_id: registerData.value.data.id,
          email: registerData.value.data.email,
          from: 'Register',
        });
        dispatch(userActionServices.resetData());
        // setMobileNumber('');
      } else {
        setTimeout(() => {
          snackbarError(registerData.value.message);
        }, 100);
      }
    }
  }, [registerData]);
  // dropdown select item
  const handleUpdate = (rowData, type) => {
    console.log('data', rowData);
    if (type === 'Title') {
      setTitle(rowData);
    } else if (type === 'Gender') {
      setGender(rowData);
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
    AsyncStorage.getItem(firebaseToken).then(data => {
      setFirebaseToken(data);
    });
  }, []);
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
      socialLoginData = {
        google_id: googleData.id,
        email: googleData.email,
        first_name: googleData.givenName,
        last_name: googleData.familyName,
        device_type: Platform.OS === 'ios' ? 'IPHONE' : 'ANDROID',
        device_id: firebaseTokenData,
        role: 2,
      };
    }else if(type=='Apple'){
      socialLoginData = {
            apple_id: googleData.id,
            email: googleData.email,
            first_name: googleData.name,
            last_name: googleData.familyName,
            device_type: Platform.OS === 'ios' ? 'IPHONE' : 'ANDROID',
            device_id: firebaseTokenData,
            role: 2,
          };
          
        } else {
      socialLoginData = {
        facebook_id: googleData.id,
        email: googleData.email,
        first_name: googleData.name,
        device_type: Platform.OS === 'ios' ? 'IPHONE' : 'ANDROID',
        device_id: firebaseTokenData,
        role: 2,
      };
    }
    console.log("socialLoginData>>",socialLoginData);
    

    dispatch(userActionServices.socialLoginData(socialLoginData));
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

        dispatch(userActionServices.resetData());
      }
    }
  }, [googleLoginData]);

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
          Register
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: ms(38),
          paddingTop: mvs(20),
        }}>
        <Text style={styles.textTitle}>
          User Type <Text style={{ color: colors.red }}>*</Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: mvs(7),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => userTypeSelct(1)}
            style={styles.buttonStyle}>
            <Image
              source={
                individual === true ? images.fillCheck : images.blankCheck
              }
              style={styles.checkImageStyle}
            />
            <Text
              style={{
                fontSize: s(14),
                marginLeft: ms(8),
                color: colors.blueLight,
                fontFamily: fonts.quicksandMedium,
              }}>
              Individual
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => userTypeSelct(2)}
            style={styles.buttonStyle}>
            <Image
              source={
                organisation === true ? images.fillCheck : images.blankCheck
              }
              style={styles.checkImageStyle}
            />
            <Text
              style={{
                fontSize: s(14),
                marginLeft: ms(8),
                color: colors.blueLight,
                fontFamily: fonts.quicksandMedium,
              }}>
              Organisation
            </Text>
          </TouchableOpacity>
        </View>

        {organisation === false ? (
          <View style={{ marginTop: mvs(10) }}>
            <Text style={styles.textTitle}>
              Title <Text style={{ color: colors.red }}>*</Text>
            </Text>

            {/* <TouchableOpacity
              onPress={() => setTitelModal(true)}
              activeOpacity={0.5}
              style={{
                borderColor: colors.lightBackground,
                backgroundColor: colors.lightBackground,
                borderRadius: ms(6),
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: Platform.OS === 'android' ? ms(13) : ms(13),
                alignItems: 'center',
                marginTop: mvs(7),
              }}>
              <Text
                style={{
                  color: colors.blueLight,
                  fontSize: s(14),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {titleType == '' ? 'Select Title' : titleType}
              </Text>
              <Image
                source={images.downArrow}
                style={{
                  height: mvs(8),
                  width: mvs(14.6),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity> */}
            <MyDropDown
              // refs={refSubject}
              selected={title}
              itemList={titleList}
              placeholder={'Select Title'}
              onUpdate={data => handleUpdate(data, 'Title')}
            />
          </View>
        ) : (
          <View style={{ marginTop: mvs(10) }}>
            <Text style={styles.textTitle}>
              Organisation Name <Text style={{ color: '#ff6363' }}>*</Text>
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
                  flex: 1,
                  height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                  fontSize: s(14),

                  fontFamily: fonts.quicksandMedium,
                }}
                value={organisationName}
                onChangeText={text => setorganisationName(text)}
                placeholderTextColor={colors.grey}
                placeholder="Organisation Name"></TextInput>
            </View>
          </View>
        )}

        {organisation === false ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(7),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: ms(6),
                  // padding: ms(13),
                  width: '48%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#0d447a',
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  First Name <Text style={{ color: colors.red }}>*</Text>
                </Text>
              </View>
              <View
                style={{
                  borderRadius: ms(6),

                  // padding: ms(13),

                  width: '48%',

                  flexDirection: 'row',
                }}>
                <Text style={styles.textTitle}>
                  Last Name <Text style={{ color: colors.red }}>*</Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(7),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                onPress={() => userTypeSelct(1)}
                style={{
                  borderRadius: ms(6),
                  paddingVertical: Platform.OS === 'ios' ? mvs(12) : mvs(4),
                  // padding: ms(13),

                  width: '48%',
                  borderWidth: 1,
                  borderColor: '#eef7ff',
                  backgroundColor: '#eef7ff',
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={{
                    fontSize: s(14),
                    marginHorizontal: ms(8),
                    flex: 1,

                    height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                    color: colors.blue,
                    fontFamily: fonts.quicksandMedium,
                  }}
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                  placeholderTextColor={colors.grey}
                  placeholder="First Name"></TextInput>
              </View>
              <View
                onPress={() => userTypeSelct(1)}
                style={{
                  borderRadius: ms(6),
                  paddingVertical: Platform.OS === 'ios' ? mvs(12) : mvs(4),
                  // padding: ms(13),

                  width: '48%',
                  borderWidth: 1,
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.lightBackground,
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={{
                    fontSize: s(14),
                    marginHorizontal: ms(8),
                    flex: 1,

                    height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                    color: colors.blue,
                    fontFamily: fonts.quicksandMedium,
                  }}
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                  placeholderTextColor={colors.grey}
                  placeholder="Last Name"></TextInput>
              </View>
            </View>
          </View>
        ) : (
          <></>
        )}
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
        {organisation === false ? (
          <></>
        ) : (
          <View style={{ marginTop: mvs(10) }}>
            <Text style={styles.textTitle}>
              Landline Number <Text style={{ color: colors.red }}>*</Text>
            </Text>

            <View
              style={{
                borderColor: '#eef7ff',
                backgroundColor: '#eef7ff',
                borderRadius: ms(6),
                padding: ms(13),
                marginTop: mvs(7),
              
                flexDirection: 'row',
                padding: Platform.OS === 'android' ? ms(4) : ms(13),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginLeft: Platform.OS === 'android' ? ms(5) : ms(0),
                  color: colors.blue,
                  fontSize: s(14),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {countryCode}
              </Text>
              <View
                style={{
                  height: Platform.OS === 'ios' ? '100%' : '50%',
                  width: ms(1),
                  marginHorizontal: ms(10),
                  backgroundColor: 'rgb(181,181,181)',
                }}
              />

              <TextInput
                style={{
                  color: colors.blue,
                  fontSize: s(14),
                  flex: 1,
                  height: Platform.OS === 'ios' ? mvs(25) : mvs(40),
                  fontFamily: fonts.quicksandMedium,
                }}
                value={landlineNumber}
                onChangeText={text => setLandlineNumber(text)}
                keyboardType="number-pad"
                maxLength={10}
                placeholderTextColor={colors.grey}
                placeholder="Landline Number"></TextInput>
            </View>
          </View>
        )}
        <View style={{ marginTop: mvs(10) }}>
          <Text style={{ color: '#0d447a', fontSize: s(16) }}>
            Mobile Number{' '}
            {organisation === false ? (
              <Text style={{ color: colors.red }}>*</Text>
            ) : (
              <></>
            )}
          </Text>

          <View
            style={{
              borderColor: colors.lightBackground,
              backgroundColor: colors.lightBackground,
              borderRadius: ms(6),
              padding: ms(13),
              marginTop: mvs(7),
              flexDirection: 'row',
              justifyContent: 'center',
              padding: Platform.OS === 'android' ? ms(4) : ms(13),
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginLeft: Platform.OS === 'android' ? ms(5) : ms(0),
                color: colors.blue,
                fontSize: s(14),

                fontFamily: fonts.quicksandMedium,
              }}>
              {countryCode}
            </Text>
            <View
              style={{
                height: Platform.OS === 'ios' ? '100%' : '50%',
                width: ms(1),
                marginHorizontal: ms(10),
                backgroundColor: 'rgb(181,181,181)',
              }}
            />

            <TextInput
              style={{
                color: colors.blue,
                fontSize: s(14),

                height: Platform.OS === 'ios' ? mvs(25) : mvs(40),
                fontFamily: fonts.quicksandMedium,
                flex: 1,
              }}
              maxLength={10}
              value={mobileNumber}
              onChangeText={text => setMobileNumber(text)}
              placeholderTextColor={colors.grey}
              keyboardType="number-pad"
              placeholder="Mobile Number"></TextInput>
          </View>
        </View>
        {organisation === false ? (
          <View style={{ marginTop: mvs(10) }}>
            <Text style={{ color: '#0d447a', fontSize: s(16) }}>
              Gender <Text style={{ color: '#ff6363' }}>*</Text>
            </Text>
            <MyDropDown
              // refs={refSubject}
              selected={gender}
              itemList={genderList}
              placeholder={'Select Gender'}
              onUpdate={data => handleUpdate(data, 'Gender')}
            />
          </View>
        ) : (
          <View style={{ marginTop: mvs(10) }}>
            <Text style={styles.textTitle}>Contact Person Name</Text>

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
                value={contactPersonName}
                onChangeText={text => setcontactPersonName(text)}
                placeholderTextColor={colors.grey}
                placeholder="Contact Person Name"></TextInput>
            </View>
          </View>
        )}
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
                height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                fontSize: s(14),
                fontFamily: fonts.quicksandMedium,
              }}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={hidePassword}
              placeholderTextColor={colors.grey}
              placeholder="Password"></TextInput>
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

        <View style={{ marginTop: mvs(10) }}>
          <Text style={styles.textTitle}>
            Confirm Password <Text style={{ color: colors.red }}>*</Text>
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
                fontSize: s(14),
                flex: 1,
                marginEnd: ms(5),
                height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                fontFamily: fonts.quicksandMedium,
              }}
              value={confirmPassword}
              onChangeText={text => setconfirmPassword(text)}
              secureTextEntry={confirmHidePassword}
              placeholderTextColor={colors.grey}
              placeholder="Confirm Password"></TextInput>
            <TouchableOpacity
              onPress={() => setConfirmHidePassword(!confirmHidePassword)}
              style={{ padding: Platform.OS === 'ios' ? ms(0) : ms(8) }}>
              <Image
                source={
                  confirmHidePassword == true ? images.eyeClose : images.eyeOpen
                }
                // source={images.eyeOpen}
                style={{
                  height: mvs(12),
                  width: mvs(18),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop:10,flexDirection:'row'}}>
          <TouchableOpacity onPress={()=> setIsCheck(!isCheck)}>
          <Image
          source={ isCheck?images?.fillrectanglecheck: images?.rectangleCheck}
          style={{
                  resizeMode: 'contain',
                  height: mvs(14),
                  width: mvs(14),
                }}></Image>
                </TouchableOpacity>
<View style ={{flexDirection:'row'}}>

<Text style={{fontSize:14,fontFamily:fonts?.quicksandMedium, color: isCheck ?colors.darkblue:colors.grey,marginLeft:10}}>Accept {' '}
          
              </Text>
              <TouchableOpacity
               onPress={()=>{
                Linking.openURL('https://reva.devarka.com/careseeker-terms-and-condition')
              }}
              >
              <Text style ={{textDecorationLine: 'underline',fontSize:14,fontFamily:fonts?.quicksandMedium,color:colors.darkblue,marginRight:10}} >Terms and Conditions</Text>
              </TouchableOpacity>
              </View>
        </View>
        <TouchableOpacity
          onPress={() => handleRegister()}
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
            Continue
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: mvs(25), alignSelf: 'center' }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.blueLight,
              fontFamily: fonts.quicksandMedium,
            }}>
            OR continue with
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: mvs(25),
            justifyContent: 'space-between',
          }}>
       
          <TouchableOpacity onPress={() => googleLogin()}>
            <Image
              source={images.google}
              style={{
                resizeMode: 'contain',
                height: mvs(45),
                width: 'auto',
                minWidth: '48%',
              }}></Image>
          </TouchableOpacity>
        </View> */}
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
        <View
          style={{
            paddingVertical:30,
            paddingBottom:80,

            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.blueLight,
              fontFamily: fonts.quicksandBook,
            }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ color: colors.primaryColor, fontSize: s(14) }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: colors.blue,
    fontSize: s(16),
    fontFamily: fonts.quicksandMedium,
  },
  buttonStyle: {
    borderRadius: ms(6),
    paddingVertical: mvs(12),
    // padding: ms(13),

    width: '48%',
    borderWidth: 1,
    borderColor: colors.lightBackground,
    backgroundColor: colors.lightBackground,
    flexDirection: 'row',
  },
  checkImageStyle: {
    height: mvs(18),
    width: mvs(18),
    marginLeft: ms(6),
    resizeMode: 'contain',
  },
});
