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
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { userActionServices } from '../redux/userServices';
import { VERIFYOTP, RESENDOTP } from '../utils/reducerConstant';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import CountDown from 'react-native-countdown-component';
import { showLoader } from '../component/AppLoader';
import { AuthContext } from '../navigation/context';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { firebaseToken } from '../constant/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function EmailOtpVerification(props) {
  console.log('props==>', props);
  const { signIn } = useContext(AuthContext);
  const id = props.route.params.user_id;
  const email = props.route.params.email;
  const from = props.route.params.from;

  const is_verify = props.route.params.is_verify;
  const dispatch = useDispatch();
  const otpData = useSelector(state => state.verifyData);
  const resendOtpData = useSelector(state => state.resendOtpData);
  console.log('otpData', otpData);
  // OTP data
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [counterShow, setCounterShow] = useState(true);
  const [error, setError] = useState(false);
  const [firebaseTokenData, setFirebaseToken] = useState('');

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const [counter, setCounter] = useState(30);

  const [resendEnable, setResendEnable] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(firebaseToken).then(data => {
      setFirebaseToken(data);
    });
  }, []);
  useEffect(() => {
    if (otpData.type === VERIFYOTP) {
      if (
        Object.keys(otpData.value).length != 0 &&
        otpData.value != undefined && otpData.value.status
      ) {
        if (is_verify == 0) {
          // snackbarSuccess('Email verification successfully');
          setTimeout(() => {
            // snackbarSuccess('Email verification successfully');
            snackbarSuccess(otpData.value.message);
          }, 100);
          AsyncStorage.setItem(ACCESS_TOKEN, otpData.value.data.access_token);
          AsyncStorage.setItem(
            USER_DATA,
            JSON.stringify(otpData.value.data.userInfo),
          );
          AsyncStorage.setItem(TOKEN, 'true');
          signIn();
          // props.navigation.navigate('DrawerComponent');
          dispatch(userActionServices.resetData());
        } else if (from == 'Forgot') {
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            // snackbarSuccess('OTP verify successfully');
            snackbarSuccess(otpData.value.message);
          }, 100);
          props.navigation.navigate('NewPasswordRest', {
            // user_id: otpData.value.data.id,
            user_id: otpData.value.data.user_id,
          });
          dispatch(userActionServices.resetData());
        } else {
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            // snackbarSuccess('OTP verify successfully. please login.');
            snackbarSuccess(otpData.value.message);
          }, 100);
          props.navigation.navigate('Login');
          dispatch(userActionServices.resetData());
        }
      } else {
        setTimeout(() => {
          snackbarError(otpData.value.message);
        }, 100);
      }
    }

    if (resendOtpData.type === RESENDOTP) {
      if (
        Object.keys(resendOtpData.value).length != 0 &&
        resendOtpData.value != undefined
      ) {
        // snackbarSuccess(resendOtpData.response.data.message)
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarSuccess(resendOtpData.value.message);
        }, 100);
      } else {
        setTimeout(() => {
          snackbarError(resendOtpData.value.message);
        }, 100);
      }
    }
  }, [otpData, resendOtpData]);

  const handleVerifyOtp = () => {
    if (
      otp1.trim() == '' ||
      otp2.trim() == '' ||
      otp3.trim() == '' ||
      otp4.trim() == ''
    ) {
      snackbarError('OTP should not be blanked');
    } else {
      let otp = otp1 + otp2 + otp3 + otp4;
      const otps = {
        user_id: id.toString(),
        otp: otp,
        from_page: from,
        device_type: Platform.OS === 'ios' ? 'IPHONE' : 'ANDROID',
        device_id: firebaseTokenData,
      };
      showLoader();
      dispatch(userActionServices.verifyData(otps));
    }
  };

  const handleResendOtp = () => {
    const otps = {
      user_id: id,
      fromPage: from,
    };
    showLoader();
    dispatch(userActionServices.resendOtp(otps));
  };
  useEffect(() => {
    if (counter <= 0) {
      setResendEnable(true);
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  const handleClickResend = () => {
    setResendEnable(false);
    setCounter(30);
    handleResendOtp();
  };
  function handleKeyPress(value, pos) {
    if (
      value == 1 ||
      value == 2 ||
      value == 3 ||
      value == 4 ||
      value == 5 ||
      value == 6 ||
      value == 7 ||
      value == 8 ||
      value == 9 ||
      value == 0
    ) {
      switch (pos) {
        case 1: {
          setOtp1();
          setOtp1(value);
          break;
        }
        case 2: {
          setOtp2();
          setOtp2(value);
          break;
        }
        case 3: {
          setOtp3();
          setOtp3(value);
          break;
        }
        case 4: {
          setOtp4();
          setOtp4(value);
          break;
        }

        default: {
          break;
        }
      }
    }
  }
  function handleTextChange(e, pos) {
    switch (pos) {
      case 1: {
        setOtp1(e);
        if (e.length === 1) {
          if (otp2 == '') {
            input2.current.focus();
          }
        } else if (e.length === 0) {
          //refOtp1.current.blur();
        }
        break;
      }
      case 2: {
        setOtp2(e);
        if (e.length === 1) {
          if (otp3 == '') {
            input3.current.focus();
          }
        } else if (e.length === 0) {
          if (otp1 != '' && otp3 == '') {
            input1.current.focus();
          } else {
            input2.current.focus();
          }
        }
        break;
      }
      case 3: {
        setOtp3(e);
        if (e.length === 1) {
          if (otp4 == '') {
            input4.current.focus();
          }
        } else if (e.length === 0) {
          if (otp2 != '' && otp4 == '') {
            input2.current.focus();
          } else {
            input3.current.focus();
          }
        }
        break;
      }
      case 4: {
        setOtp4(e);
        if (e.length === 1) {
          if (otp4 == '') {
            input4.current.focus();
          }
        } else if (e.length === 0) {
          if (otp3 != '') {
            input3.current.focus();
          } else {
            input4.current.focus();
          }
        }
        break;
      }

      default: {
        console.log('Something Went worng at OTP Input');
        break;
      }
    }
  }

  const handleEndCounter = () => {
    setCounterShow(false);
  };
  // const backspace = id => {
  //   setError(false);
  //   if (id === 'two') {
  //     if (otp2) {
  //       setOtp2('');
  //     } else if (otp1) {
  //       setOtp1('');
  //       input1.current.focus();
  //     }
  //   } else if (id === 'three') {
  //     if (otp3) {
  //       setOtp3('');
  //     } else if (otp2) {
  //       setOtp2('');
  //       input2.current.focus();
  //     }
  //   } else if (id === 'four') {
  //     if (otp4) {
  //       setOtp4('');
  //     } else if (otp3) {
  //       setOtp3('');
  //       input3.current.focus();
  //     }
  //   }
  // };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <TouchableOpacity
        onPress={() => props.navigation.pop()}
        style={{
          marginTop: mvs(20),
          marginLeft: ms(16),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={images.backArrow}
          style={{
            width: mvs(7),
            height: mvs(15),
            resizeMode: 'contain',
            tintColor: colors.blueLight,
          }}
        />
        <Text
          style={{
            fontSize: s(16),
            color: colors.blue,
            marginLeft: ms(10),
            fontFamily: fonts.quicksandBold,
          }}>
          Back
        </Text>
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.white }}
        showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: mvs(60), alignItems: 'center' }}>
          <Image
            source={images.email_otp}
            style={{ height: mvs(110), width: mvs(110), resizeMode: 'contain' }}
          />
          <Text
            style={{
              fontSize: s(36),
              color: colors.blue,
              marginTop: mvs(50),
              textAlign: 'center',
              fontFamily: fonts.quicksandMedium,
            }}>
            Verify your {'\n'} Email Address
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: mvs(12),
          }}>
          <View style={{ paddingHorizontal: ms(16) }}>
            <Text
              style={{
                fontSize: s(16),
                color: colors.blue,
                textAlign: 'center',
                fontFamily: fonts.quicksandMedium,
              }}
              numberOfLines={2}
              ellipsizeMode="tail">
              We have sent OTP to {'\n'} {email}
            </Text>
          </View>
          {/* <TouchableOpacity style={{position: 'absolute'}}>
          <Image
            source={images.edit}
            style={{
              height: mvs(16.9),
              width: mvs(16.9),
              resizeMode: 'contain',
              left: Platform.OS == 'android' ? 230 : 240,
              // marginLeft: ms(38),
            }}></Image>
        </TouchableOpacity> */}
        </View>
        <View style={[styles.textinputMainView]}>
          <View
            style={[
              styles.textinputView,
              // {borderColor: error ? ' rgb(226,0,0)' : 'rgb(181,181,181)'},
            ]}>
            <TextInput
              style={{
                flex: 1,
                color: colors.blue,
                fontFamily: fonts.quicksandMedium,
                fontSize: ms(25),
                textAlign: 'center',
                paddingVertical: 0,
              }}
              placeholder="-"
              placeholderTextColor={colors.grey}
              value={otp1}
              onChangeText={text => handleTextChange(text, 1, '')}
              onKeyPress={e => handleKeyPress(e.nativeEvent.key.valueOf(), 1)}
              maxLength={1}
              keyboardType={'number-pad'}
              ref={input1}
              selectionColor="rgb(112,112,112)"
            />
          </View>

          <View
            style={[
              styles.textinputView,
              // {borderColor: error ? ' rgb(226,0,0)' : 'rgb(181,181,181)'},
            ]}>
            <TextInput
              // onKeyPress={({nativeEvent}) =>
              //   nativeEvent.key === 'Backspace' ? backspace('two') : null
              // }
              style={{
                flex: 1,
                color: colors.blue,
                fontFamily: fonts.quicksandMedium,
                fontSize: ms(25),
                textAlign: 'center',
                paddingVertical: 0,
              }}
              placeholder="-"
              placeholderTextColor={colors.grey}
              value={otp2}
              onChangeText={text => handleTextChange(text, 2)}
              onKeyPress={e => handleKeyPress(e.nativeEvent.key.valueOf(), 2)}
              maxLength={1}
              keyboardType={'number-pad'}
              ref={input2}
              selectionColor="rgb(112,112,112)"
            />
          </View>
          <View
            style={[
              styles.textinputView,
              // {borderColor: error ? ' rgb(226,0,0)' : 'rgb(181,181,181)'},
            ]}>
            <TextInput
              // onKeyPress={({nativeEvent}) =>
              //   nativeEvent.key === 'Backspace' ? backspace('three') : null
              // }
              style={{
                flex: 1,
                color: colors.blue,
                fontFamily: fonts.quicksandMedium,
                fontSize: ms(25),
                textAlign: 'center',
                paddingVertical: 0,
              }}
              placeholder="-"
              placeholderTextColor={colors.grey}
              value={otp3}
              onChangeText={text => handleTextChange(text, 3)}
              onKeyPress={e => handleKeyPress(e.nativeEvent.key.valueOf(), 3)}
              maxLength={1}
              keyboardType={'number-pad'}
              ref={input3}
              selectionColor="rgb(112,112,112)"
            />
          </View>
          <View
            style={[
              styles.textinputView,
              // {borderColor: error ? ' rgb(226,0,0)' : 'rgb(181,181,181)'},
            ]}>
            <TextInput
              // onKeyPress={({nativeEvent}) =>
              //   nativeEvent.key === 'Backspace' ? backspace('four') : null
              // }
              style={{
                flex: 1,
                color: colors.blue,
                fontFamily: fonts.quicksandMedium,
                fontSize: ms(25),
                textAlign: 'center',
                paddingVertical: 0,
              }}
              placeholder="-"
              placeholderTextColor={colors.grey}
              value={otp4}
              onChangeText={text => handleTextChange(text, 4)}
              onKeyPress={e => handleKeyPress(e.nativeEvent.key.valueOf(), 4)}
              maxLength={1}
              keyboardType={'number-pad'}
              ref={input4}
              selectionColor="rgb(112,112,112)"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleVerifyOtp()}
          style={{
            borderColor: colors.primaryColor,
            backgroundColor: colors.primaryColor,
            borderWidth: ms(1),
            paddingVertical: ms(11),
            justifyContent: 'center',
            borderRadius: ms(6),
            marginTop: mvs(25),
            marginHorizontal: ms(38),
          }}>
          <Text
            style={{
              fontSize: s(18),
              color: 'white',
              textAlign: 'center',
              fontFamily: fonts.quicksandMedium,
            }}>
            Confirm
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: mvs(25),
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              resendEnable ? handleClickResend() : {};
            }}
            activeOpacity={resendEnable ? 0 : 1.0}
            style={{}}>
            <Text
              style={{
                fontFamily: fonts.apexNewMedium,
                color: resendEnable ? colors.blue : colors.grey,
                fontSize: s(16),
              }}>
              {' '}
              Resend
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: colors.red,
              fontFamily: fonts.quicksandMedium,
              fontSize: s(14),
              lineHeight: mvs(26),
              marginLeft: ms(10),
              alignSelf: 'center',
            }}>
            {counter > 9 ? '00:' + counter : '00:0' + counter}
          </Text>
          <Text
            style={{
              color: colors.red,
              fontSize: s(14),
              marginStart: ms(5),
              fontFamily: fonts.quicksandMedium,
            }}>
            Sec
          </Text>
          {/* <View style={{paddingLeft: ms(4)}}>
          <CountDown
            size={10}
            until={30}
            onFinish={handleEndCounter}
            digitStyle={{
              // backgroundColor: '#fff',
              width: Platform.OS === 'ios' ? ms(20) : ms(20),
              height: Platform.OS === 'ios' ? ms(20) : ms(20),
            }}
            digitTxtStyle={{
              color: colors.red,
              fontFamily: fonts.quicksandMedium,
              fontSize: s(14),
            }}
            // separatorStyle={colors.red}
            timeToShow={['M', 'S']}
            timeLabels={{m: null, s: null}}
            showSeparator
          />
        </View> */}
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  otpText: {
    marginTop: mvs(5),
    fontFamily: fonts.latoRegular,
    fontSize: s(14),
    color: 'rgb(181,181,181)',
  },
  textinputMainView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: mvs(35),
    height: ms(40),
    marginHorizontal: ms(25),
  },
  textinputView: {
    borderWidth: 1,
    // justifyContent: 'space-around',
    backgroundColor: colors.lightBackground,
    width: ms(60),
    height: ms(60),
    borderRadius: 5,
    borderColor: colors.lightBackground,
  },
});
