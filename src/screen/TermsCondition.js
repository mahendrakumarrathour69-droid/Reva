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
  Dimensions,
  Linking,
  Alert,
  BackHandler,
  StatusBar,
} from 'react-native';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {fonts} from '../utils/font';
import {WebView} from 'react-native-webview';
import images from '../utils/images';
import {API_URL} from '../utils/apiConstants';
import {colors} from '../utils/colors';
import {hideLoader, showLoader} from '../component/AppLoader';

export default function TermsCondition(props) {
  const {navigation} = props;

  useEffect(() => {
    // showLoader();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: ms(16),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => props.navigation.pop()}>
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
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',

            marginHorizontal: ms(3),
            fontFamily: fonts.quicksandMedium,
          }}>
          <Text
            style={{
              fontSize: s(26),
              color: colors.blue,
              fontFamily: fonts.quicksandMedium,
            }}
     ></Text>
        </View>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('Notifications')}>
            <Image
              style={{
                height: mvs(19),
                width: ms(21),
                resizeMode: 'contain',
              }}
              source={images.notification}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{
          marginTop: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
      <WebView
        onLoad={() => hideLoader()}
        source={{uri: API_URL + 'terms-and-condition-carerseeker'}}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainHederView: {
    flexDirection: 'row',

    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  leftHederIconCss: {
    width: 20,
    height: 16,
    resizeMode: 'contain',
  },
  headerTitle: {
    flex: 1,

    color: colors.white,
    fontSize: 24,
    fontFamily: fonts.quicksandMedium,
    textAlign: 'center',
  },
});
