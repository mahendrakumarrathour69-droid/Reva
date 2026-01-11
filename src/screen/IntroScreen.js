// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useContext, useEffect, useState, useRef} from 'react';

// import {s, vs, ms, mvs} from 'react-native-size-matters';
// import Swiper from 'react-native-swiper';
// import images from '../utils/images';
// import {fonts} from '../utils/font';
// import {colors} from '../utils/colors';
// export default function IntroScreen(props) {
//   const [idxActive, setidxActive] = useState(0);
//   console.log('idxActive', idxActive);
//   return (
//     <View style={{flex: 1, backgroundColor: 'white'}}>
//       <Image style={styles.smalLogo} source={images.smallLogo} />
//       <Swiper
//         style={styles.wrapper}
//         showsButtons={false}
//         loop={false}
//         onIndexChanged={setidxActive}
//         // dotStyle={{bottom: 50}}
//         // activeDotStyle={{bottom: 50}}
//         dotColor={colors.blueopacity}
//         activeDotColor={colors.primaryColor}
//         buttonWrapperStyle={styles.swiperbtnCss}>
//         <View style={{}}>
//           <View style={styles.imgView}>
//             <Image
//               source={images.walkThrough1}
//               resizeMode="contain"
//               style={styles.firstimgCss}
//             />
//           </View>
//           <View style={styles.imgView}>
//             <Text style={styles.firstText}>
//               Book appointments {'\n'}at home
//             </Text>
//             <Text style={styles.secondtext}>
//               Get doctors, nurses and physiotherapists to treat you at home{' '}
//             </Text>

//             <TouchableOpacity
//               onPress={() => props.navigation.navigate('RegisterScreen')}
//               style={{marginTop: mvs(20)}}>
//               <Text style={styles.skiptext}>Skip</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{}}>
//           <View style={styles.imgView}>
//             <Image
//               source={images.walkThrough2}
//               resizeMode="contain"
//               style={styles.firstimgCss}
//             />
//           </View>
//           <View style={styles.imgView}>
//             <Text style={styles.firstText}>Get all-round care </Text>
//             <Text style={styles.secondtext}>
//               Book 24hr care, diagnostic tests and vaccinations from a single
//               place{' '}
//             </Text>

//             <TouchableOpacity
//               onPress={() => props.navigation.navigate('RegisterScreen')}
//               style={{marginTop: mvs(20)}}>
//               <Text style={styles.skiptext}>Skip</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{}}>
//           <View style={styles.imgView}>
//             <Image
//               source={images.walkThrough1}
//               resizeMode="contain"
//               style={styles.firstimgCss}
//             />
//           </View>
//           <View style={styles.imgView}>
//             <Text style={styles.firstText}>Medical aid at your doorstep </Text>
//             <Text style={styles.secondtext}>
//               Receive medicines and medical equipment without stepping out{' '}
//             </Text>

//             <TouchableOpacity
//               onPress={() => props.navigation.navigate('Login')}
//               style={styles.getstartedButton}>
//               <Text style={styles.getstartedText}>Get Started</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Swiper>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   smalLogo: {
//     height: mvs(55),
//     width: mvs(66),
//     resizeMode: 'contain',
//     marginTop: mvs(105),
//     marginLeft: ms(50),
//   },

//   swiperbtnCss: {
//     backgroundColor: 'transparent',
//     position: 'absolute',
//     flex: 1,
//     alignItems: 'flex-end',
//   },
//   wrapper: {},
//   slide1: {},

//   firstimgCss: {
//     height: mvs(160),
//     width: mvs(190),
//     resizeMode: 'contain',
//   },
//   imgView: {
//     marginTop: mvs(40),
//     marginHorizontal: ms(40),
//   },
//   firstText: {
//     fontSize: s(28),
//     color: colors.blue,
//     fontFamily: fonts.quicksandMedium,
//   },
//   secondtext: {
//     fontSize: s(16),
//     color: colors.blueLight,
//     marginTop: mvs(30),
//     fontFamily: fonts.quicksandMedium,
//   },
//   skiptext: {
//     fontSize: s(18),
//     color: colors.blackopacity,
//   },
//   getstartedText: {
//     fontSize: s(18),
//     color: colors.white,
//     alignSelf: 'center',
//     marginVertical: mvs(15),
//     fontFamily: fonts.quicksandMedium,
//   },
//   getstartedButton: {
//     marginTop: mvs(20),
//     borderWidth: 1,
//     borderRadius: 6,
//     width: ms(158),
//     backgroundColor: '#00b1ff',
//     borderColor: '#00b1ff',
//   },
// });
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';

import { s, vs, ms, mvs } from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import { AuthContext } from '../navigation/context';
import { FIRST_TIME_USER } from '../constant/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function IntroScreen(props) {
  const [idxActive, setidxActive] = useState(0);
  const { signIn } = useContext(AuthContext);
  console.log('idxActive', idxActive);

  const pressSkip = () => {
    AsyncStorage.setItem(FIRST_TIME_USER, 'true');
    // props.navigation.replace('Login');
    signIn()
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image style={styles.smalLogo} source={images.smallLogo} />
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        onIndexChanged={setidxActive}
        // dotStyle={{bottom: 50}}
        // activeDotStyle={{bottom: 50}}
        dotColor={colors.blueopacity}
        activeDotColor={colors.primaryColor}
        buttonWrapperStyle={styles.swiperbtnCss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: mvs(50) }}>
          <View style={styles.imgView}>
            <Image
              source={images.walkThrough1}
              resizeMode="contain"
              style={styles.firstimgCss}
            />
          </View>
          <View style={styles.imgView}>
            <Text style={styles.firstText}>
              Book appointments at home

            </Text>
            <Text style={styles.secondtext}>
            Get doctors, nurses and physiotherapists to treat you at home

            </Text>
            <TouchableOpacity
              onPress={() => pressSkip()}
              style={{ marginTop: mvs(20) }}>
              <Text style={styles.skiptext}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: mvs(50) }}>
          <View style={styles.imgView}>
            <Image
              source={images.walkThrough2}
              resizeMode="contain"
              style={styles.firstimgCss}
            />
          </View>
          <View style={styles.imgView}>
            <Text style={styles.firstText}>Get all-round care</Text>

            <Text style={styles.secondtext}
              numberOfLines={3}
              ellipsizeMode='tail'
            >Book 24hr care, diagnostic tests and vaccinations from a single place
            </Text>
            <TouchableOpacity
              onPress={() => pressSkip()}
              style={{ marginTop: mvs(20) }}>
              <Text style={styles.skiptext}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: mvs(50) }}>
          <View style={styles.imgView}>
            <Image
              source={images.walkThrough1}
              resizeMode="contain"
              style={styles.firstimgCss}
            />
          </View>
          <View style={styles.imgView}>
            <Text style={styles.firstText}>Medical aid at your  doorstep
            </Text>

            <Text style={styles.secondtext}
              numberOfLines={3}
              ellipsizeMode='tail'
            >
      Receive medicines and medical equipment without stepping out

            </Text>
            <TouchableOpacity
              onPress={() => pressSkip()}
              style={styles.getstartedButton}>
              <Text style={styles.getstartedText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Swiper>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smalLogo: {
    height: mvs(55),
    width: mvs(66),
    resizeMode: 'contain',
    marginTop: mvs(105),
    marginLeft: ms(50),
  },

  swiperbtnCss: {
    backgroundColor: 'transparent',
    position: 'absolute',
    flex: 1,
    alignItems: 'flex-end',
  },
  wrapper: {},
  slide1: {},

  firstimgCss: {
    height: mvs(160),
    width: mvs(190),
    resizeMode: 'contain',
  },
  imgView: {
    marginTop: mvs(40),
    marginHorizontal: ms(40),
  },
  firstText: {
    fontSize: s(28),
    color: colors.blue,
    fontFamily: fonts.quicksandMedium,
  },
  secondtext: {
    fontSize: s(16),
    color: colors.blueLight,
    marginTop: mvs(30),
    fontFamily: fonts.quicksandMedium,
  },
  skiptext: {
    fontSize: s(18),
    color: colors.blackopacity,
    fontFamily: fonts.quicksandMedium,
  },
  getstartedText: {
    fontSize: s(18),
    color: colors.white,
    alignSelf: 'center',
    marginVertical: mvs(15),
    fontFamily: fonts.quicksandMedium,
  },
  getstartedButton: {
    marginTop: mvs(20),
    borderWidth: 1,
    borderRadius: 6,
    width: ms(158),
    backgroundColor: '#00b1ff',
    borderColor: '#00b1ff',
  },
});
