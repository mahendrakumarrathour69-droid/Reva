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

import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import { FORGOTEMAIL } from '../utils/reducerConstant';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';
export default function PasswordReset(props) {
  const roll_id = 2;

  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const forgotEmailData = useSelector(state => state.forgotEmail);
  console.log('registerData', forgotEmailData);

  const handlePasswordReset = () => {
    if (email.trim() == '') {
      snackbarError('Email should not be blanked');
    } else if (
      /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email) === false
    ) {
      snackbarError('Please enter a valid email ');
    } else {
      const passwordReset = {
        email: email,
        roll: roll_id
      };
      showLoader();
      dispatch(userActionServices.forgotEmail(passwordReset));
    }
  }
  // response api
  useEffect(() => {
    hideLoader();
    if (forgotEmailData.type === FORGOTEMAIL) {
      if (
        Object.keys(forgotEmailData.value).length != 0 &&
        forgotEmailData.value != undefined && forgotEmailData.value.status
      ) {

        // snackbarSuccess(' Congratulations ! you have registered successfully.');
        props.navigation.navigate('EmailOtpVerification', {
          user_id: forgotEmailData.value.data.user_id,
          email: email,
          from: "Forgot"
        });
        dispatch(userActionServices.resetData());
        // setMobileNumber('');
      } else {
        setTimeout(() => {
          snackbarError(forgotEmailData.value.message);
        }, 100);
      }
    }
  }, [forgotEmailData]);
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

      <View
        style={{
          marginTop: mvs(60),
          alignItems: 'center',
        }}>
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
        <View
          style={{
            alignSelf: 'center',
            marginTop: mvs(12),
          }}>
          <View>
            <Text
              style={{
                fontSize: s(16),
                color: colors.blue,
                fontFamily: fonts.quicksandMedium,
                textAlign: 'center',
              }}>
              Please enter your email below
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ marginHorizontal: ms(38), marginTop: mvs(50) }}>
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
                onChangeText={text => setEmail(text)}
                placeholderTextColor={colors.grey}
                placeholder="Email"></TextInput>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handlePasswordReset()}
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
                  Send OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ justifyContent: 'flex-end', marginVertical: ms(20) }}>
        <View
          style={{
            flexDirection: 'row',

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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textTitle: {
    color: colors.blue,
    fontSize: s(16),
    fontFamily: fonts.quicksandMedium,
  },
});
