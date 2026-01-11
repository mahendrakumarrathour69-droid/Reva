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
import Input from '../component/input';

import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import { SETPASSWORD } from '../utils/reducerConstant';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';
export default function NewPasswordRest(props) {
  const [password, setPassword] = useState('');
  const [hidePassword, sethidePassword] = useState(true);
  const [confirmHidePassword, setConfirmHidePassword] = useState(true);
  const [capitalLetter, setCapitalLetter] = useState(false);
  const [specialcharacter, setspecialcharacter] = useState(false);
  const [chartecterlength, setchartecterlength] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState('');
  const [isValid, setisValid] = useState('');
  const [value, setValue] = useState('');
  const id = props.route.params.user_id;
  const dispatch = useDispatch();
  const setPasswordData = useSelector(state => state.setPasswordData);
  console.log('registerData', setPasswordData);

  const handlePassword = () => {
    if (isValid == '') {
      snackbarError('Password should not be blanked');
    } else if (
      isValid[0] == false &&
      isValid[1] == false &&
      isValid[2] == false &&
      isValid[3] == false &&
      isValid[4] == false
    ) {
      snackbarError('Password should not be blanked');
    } else if (confirmpassword.trim() == '') {
      snackbarError('ConfirmPassword should not be blanked');
    } else if (value != confirmpassword) {
      snackbarError('Password does not match');
    } else if (
      isValid &&
      isValid[0] &&
      isValid[1] &&
      isValid[2] &&
      isValid[3] &&
      isValid[4]
    ) {
      const setPasswords = {
        user_id: id,
        password: value,
        confirm_password: confirmpassword,
      };
      showLoader();
      dispatch(userActionServices.setNewPassword(setPasswords));
    } else {
      snackbarError('Enter password in correct format');
    }
  };
  // response api
  useEffect(() => {
    hideLoader();
    if (setPasswordData.type === SETPASSWORD) {
      if (
        Object.keys(setPasswordData.value).length != 0 &&
        setPasswordData.value != undefined && setPasswordData.value.status
      ) {
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarSuccess(setPasswordData.value.message);
        }, 100);

        props.navigation.navigate('Login');
        dispatch(userActionServices.resetData());
        // setMobileNumber('');
      } else {
        setTimeout(() => {
          snackbarError(setPasswordData.value.message);
        }, 100);
      }
    }
  }, [setPasswordData]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => props.navigation.pop()}
          style={{
            height: mvs(30),
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
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: mvs(12),
          }}>
          <Image
            source={images.smallLogo}
            style={{ width: 50.3, height: 41.6, resizeMode: 'contain' }}></Image>
        </View>

        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <View style={{ marginTop: mvs(60), alignItems: 'center' }}>
            <Image
              source={images.passwordLock}
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
              Password Reset
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: mvs(12),
            }}>
            <View>
              <Text
                style={{
                  fontSize: s(16),
                  color: colors.blue,
                  textAlign: 'center',
                  fontFamily: fonts.quicksandMedium,
                }}>
                Please set a new password below
              </Text>
            </View>
          </View>

          <View style={{ marginHorizontal: ms(38), marginTop: mvs(50) }}>
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
                <Input
                  placeholder="Password"
                  placeholderTextColor={colors.grey}
                  style={styles.input}
                  value={value}
                  pattern={[
                    '^.{8,15}$', // min 8 chars
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, //special character
                    '(?=.*\\d)', // number required
                    '(?=.*[A-Z])', // uppercase letter
                    '(?=.*[a-z])', //lower letter
                  ]}
                  onChangeText={text => setValue(text)}
                  onValidation={isValid => setisValid(isValid)}
                />

                {/* <TextInput
                  style={{
                    color: colors.blueLight,
                    flex: 1,
                    fontSize: s(14),

                    fontFamily: fonts.quicksandMedium,
                  }}
                  value={password}
                  secureTextEntry={hidePassword}
                  onChangeText={text => setPassword(text)}
                  placeholder=" Password "></TextInput>
                <TouchableOpacity
                  onPress={() => sethidePassword(!hidePassword)}
                  style={{marginHorizontal: ms(5)}}>
                  <Image
                    source={
                      hidePassword == true ? images.eyeOpen : images.eyeOpen
                    }
                    style={{
                      height: mvs(8),
                      width: mvs(14.6),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
            {/* <View>
              <Text style={{color: isValid && isValid[0] ? 'green' : 'red'}}>
                Rule 1: min 8 chars
              </Text>
              <Text
                style={{
                  color: isValid && isValid[1] && isValid[2] ? 'green' : 'red',
                }}>
                Rule 2: Special charactor and number required
              </Text> */}
            {/* <Text style={{ color: isValid && isValid[1] ? 'green' : 'red' }}>
            Rule 3: special character
          </Text> */}
            {/* <Text
                style={{
                  color: isValid && isValid[3] && isValid[4] ? 'green' : 'red',
                }}>
                Rule 3: lowercase letter and uppercase
              </Text> */}
            {/* </View> */}
            <View style={{ marginTop: mvs(10) }}>
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.blueLight,
                  fontFamily: fonts.quicksandMedium,
                }}>
                Password must contain:
              </Text>
            </View>
            <View
              style={{
                marginTop: mvs(10),
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <Image
                source={
                  isValid && isValid[3] && isValid[4]
                    ? images.ic_check_select
                    : images.ic_check_unselect
                }
                style={{
                  resizeMode: 'contain',
                  height: mvs(14),
                  width: mvs(14),
                }}></Image>
              <View style={{ marginLeft: ms(8) }}>
                <Text
                  style={{
                    fontSize: s(14),
                    // color: colors.blue,
                    color:
                      isValid && isValid[3] && isValid[4]
                        ? colors.blue
                        : colors.blueopacity,
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  A Capital Letter & a Small Letter
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: mvs(5),
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <Image
                source={
                  isValid && isValid[1] && isValid[2]
                    ? images.ic_check_select
                    : images.ic_check_unselect
                }
                style={{
                  resizeMode: 'contain',
                  height: mvs(14),
                  width: mvs(14),
                }}></Image>
              <View style={{ marginLeft: ms(8) }}>
                <Text
                  style={{
                    fontSize: s(14),
                    // color: colors.blue,
                    color:
                      isValid && isValid[1] && isValid[2]
                        ? colors.blue
                        : colors.blueopacity,
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  A Special Character & a Number
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: mvs(5),
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <Image
                source={
                  isValid && isValid[0]
                    ? images.ic_check_select
                    : images.ic_check_unselect
                }
                style={{
                  resizeMode: 'contain',
                  height: mvs(14),
                  width: mvs(14),
                }}></Image>
              <View style={{ marginLeft: ms(8) }}>
                <Text
                  style={{
                    fontSize: s(14),
                    // color: colors.blueopacity,
                    color:
                      isValid && isValid[0] ? colors.blue : colors.blueopacity,
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  8-15 characters long
                </Text>
              </View>
            </View>
            <View style={{ marginTop: mvs(18) }}>
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
                    flex: 1,
                    marginEnd: ms(5),
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                  }}
                  placeholder=" Confirm Password "
                  value={confirmpassword}
                  onChangeText={text => setconfirmpassword(text)}
                  placeholderTextColor={colors.grey}
                  secureTextEntry={confirmHidePassword}></TextInput>
                <TouchableOpacity
                  onPress={() => setConfirmHidePassword(!confirmHidePassword)}
                  style={{ padding: Platform.OS === 'ios' ? ms(0) : ms(8) }}>
                  <Image
                    source={
                      confirmHidePassword == true
                        ? images.eyeClose
                        : images.eyeOpen
                    }
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
              onPress={() => handlePassword()}
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
                Set A New Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: mvs(24),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: s(14),
                color: colors.blueLight,
                fontFamily: fonts.quicksandBook,
              }}>
              Don't have an account?
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
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textTitle: {
    color: colors.blue,
    fontSize: s(16),
    fontFamily: fonts.quicksandMedium,
  },
  input: {
    flex: 1,
    fontFamily: fonts.quicksandMedium,
    fontSize: s(14),
    marginEnd: ms(5),
    color: colors.blue,
  },
});
