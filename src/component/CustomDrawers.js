import React, {useEffect, useState, useContext} from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  SafeAreaView,
  Platform,
  Linking,
} from 'react-native';

import {s, ms, mvs} from 'react-native-size-matters';

import {DrawerContentScrollView} from '@react-navigation/drawer';
import {AuthContext} from '../navigation/context';
import images from '../utils/images';
import {colors} from '../utils/colors';
import {snackbarSuccess, snackbarError} from '../utils/snackbar';
import {showLoader, hideLoader} from '../component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fonts} from '../utils/font';
import {ACCESS_TOKEN, TOKEN, USER_DATA} from '../utils/constant';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { API_URL } from '../utils/apiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { userActionServices } from '../redux/userServices';
import { DELETEACCOUNT, PROFILE } from '../utils/reducerConstant';
import { LoginManager } from 'react-native-fbsdk-next';

const CustomDrawers = props => {
  const {navigation} = props;
  const {signOut} = useContext(AuthContext);
   const delete_accounts_User = useSelector(state => state.delete_accounts);
   console.log("delete_accounts_User>>",delete_accounts_User);
   console.log("delete_accounts_User  type  >>",delete_accounts_User.type);
   
    const dispatch = useDispatch();
    const handleLogout = () => {
      Alert.alert('Alert!', 'Are you sure you want to Logout?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => ConfirmLogout() },
      ]);
    };
    const handleDelete = () => {
      Alert.alert('Are you sure?', 'Delete Account will permanently delete all of your information. This action cannot be undo. Are you sure you want to proceed?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => deleteAccountApi() },
      ]);
    };
  

    const ConfirmLogout = () => {
      snackbarSuccess('Logout successfully');
      //AsyncStorage.setItem(ACCESS_TOKEN, '');
      AsyncStorage.setItem(USER_DATA, '');
      AsyncStorage.setItem(TOKEN, 'false');
      // AsyncStorage.setItem("updateProfile","0")
      // AsyncStorage.setItem(PROFILE,"profile")
     // revokeSignInWithAppleToken()
      GoogleSignin.signOut();
      
      LoginManager.logOut();
      handleGoogleLogout()
      signOut();
    };
    const deleteAccountApi = () => {
      dispatch(userActionServices.deletAccountS())
    };
    async function handleGoogleLogout() {
      try {
        await GoogleSignin.signOut();
        console.log("logout >>>>>");
        // Perform additional cleanup and logout operations.
      } catch (error) {
        console.log('Google Sign-Out Error: ', error);
      }
    }
  
    useEffect(() => {
      hideLoader();
      if (delete_accounts_User.type === DELETEACCOUNT) {
        if (
         
          delete_accounts_User.value.status
        ) {
          AsyncStorage.setItem(USER_DATA, '');
      AsyncStorage.setItem(TOKEN, 'false');
      handleGoogleLogout()
      signOut();
        } else {
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarError(delete_accounts_User.value.message);
          }, 100);
         
          dispatch(userActionServices.resetData());
        }
      }
  
     
    }, [delete_accounts_User]);
  // const logout = () => {
  //   AsyncStorage.setItem('indivdualKey', '');
  //   AsyncStorage.setItem('orgnizationKey', '');
  //   props.navigation.navigate('Login');
  // };
  // const handleLogout = () => {
  //   Alert.alert('Alert!', 'Are you sure you want to Logout?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {text: 'Yes', onPress: () => ConfirmLogout()},
  //   ]);
  // };
  // async function handleGoogleLogout() {
  //   try {
  //     await GoogleSignin.signOut();
  //     console.log("logout >>>>>");
  //     // Perform additional cleanup and logout operations.
  //   } catch (error) {
  //     console.log('Google Sign-Out Error: ', error);
  //   }
  // }
  // const ConfirmLogout = () => {
  //   snackbarSuccess('Logout Successfullty');
  //   // AsyncStorage.setItem(ACCESS_TOKEN, '');
  //   AsyncStorage.setItem(USER_DATA, '');
  //   AsyncStorage.setItem(TOKEN, 'false');
  //   handleGoogleLogout()
  //   signOut();
  // };
  // useEffect(() => {
  //   hideLoader();
  //   if (delete_accounts_User.type === DELETEACCOUNT) {
  //     if (
       
  //       delete_accounts_User.value.status
  //     ) {
  //       AsyncStorage.setItem(USER_DATA, '');
  //   AsyncStorage.setItem(TOKEN, 'false');
  //   handleGoogleLogout()
  //   signOut();
  //     } else {
  //       setTimeout(() => {
  //         // snackbarError(error.response.data.Message);
  //         snackbarError(delete_accounts_User.value.message);
  //       }, 100);
       
  //       dispatch(userActionServices.resetData());
  //     }
  //   }

   
  // }, [delete_accounts_User]);


  return (
    <SafeAreaView
      style={{flex: 1, width: '100%', backgroundColor: colors.white}}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: mvs(70),
            flexDirection: 'row',
            justifyContent: 'center',

            flex: 1,
            marginTop: Platform.OS === 'ios' ? mvs(-43) : 0,
          }}>
          <View style={{justifyContent: 'center', flex: 1}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: s(28),
                fontFamily: fonts.quicksandMedium,
                color: colors.darkblue,
              }}>
              My Account
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.closeDrawer()}
            style={{
              position: 'absolute',
              right: Platform.OS === 'ios' ? ms(20) : ms(20),
            }}>
            <Image
              source={images.cross}
              style={{
                height: mvs(18),
                width: mvs(18),
                top: 30,

                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: colors.lightBackground,
          }}></View>
        {/* <TouchableOpacity
          activeOpacity={0.5}
          // onPress={() => props.navigation.navigate('MyWallet')}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: ms(16),
              height: mvs(65),
            }}>
            <Image source={images.myWallet} style={styles.drawerIconProfile} />
            <Text style={styles.drawerTextStyle}>My Wallet</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity>
         */}
        {/* <TouchableOpacity activeOpacity={0.5}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: ms(16),
              height: mvs(65),
            }}>
            <Image source={images.myWallet} style={styles.drawerIconProfile} />
            <Text style={styles.drawerTextStyle}>My Wallet</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity> */}
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: colors.lightBackground,
          }}></View>
        {/* <TouchableOpacity
          activeOpacity={0.5}
          // onPress={() => props.navigation.navigate('MyWallet')}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: ms(16),
              height: mvs(65),
            }}>
            <Image
              source={images.paymentHistory}
              style={styles.drawerIconProfile}
            />
            <Text style={styles.drawerTextStyle}>Payments History</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
            onPress={() => props.navigation.navigate('PaymentHistory')}
          activeOpacity={0.5}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: ms(16),
              height: mvs(65),
            }}>
            <Image
              source={images.paymentHistory}
              style={styles.drawerIconProfile}
            />
            <Text style={styles.drawerTextStyle}>Payments History</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: colors.lightBackground,
          }}></View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('JobPostedList')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: ms(16),
              height: mvs(65),
            }}>
            <Image source={images.jobPosted} style={styles.drawerIconProfile} />
            <Text style={styles.drawerTextStyle}>Jobs Posted</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: colors.lightBackground,
          }}></View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
           
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'DrawerComponent',
                  params: {defaultIndex: 'MyBooking'},
                },
              ],
            })}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: ms(16),
              height: mvs(65),
            }}>
            <Image
              source={images.myBookingDrawer}
              style={styles.drawerIconProfile}
            />
            <Text style={styles.drawerTextStyle}>My Bookings</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: colors.lightBackground,
          }}></View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Notifications')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: ms(16),
              height: mvs(65),
            }}>
            <Image
              source={images.bellNotification}
              style={styles.drawerIconProfile}
            />
            <Text style={styles.drawerTextStyle}>Notifications</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: colors.lightBackground,
          }}></View>
        <TouchableOpacity
          activeOpacity={0.5}
           onPress={() => props.navigation.navigate('ChatList')}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: ms(16),
              height: mvs(65),
            }}>
            <Image source={images.chat} style={styles.drawerIconProfile} />
            <Text style={styles.drawerTextStyle}>Chats</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: colors.lightBackground,
          }}></View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('PromoCode')}
          >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: ms(16),
              height: mvs(65),
            }}>
            <Image
              source={images.offerDiscount}
              style={styles.drawerIconProfile}
            />
            <Text style={styles.drawerTextStyle}>Offers and coupons</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: colors.lightBackground,
          }}></View>
        <TouchableOpacity
          activeOpacity={0.5}
           onPress={() => props.navigation.navigate('ReviewRating')}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: ms(16),
              height: mvs(65),
            }}>
            <Image source={images.Review} style={styles.drawerIconProfile} />
            <Text style={styles.drawerTextStyle}>Reviews And Ratings</Text>
            <Image source={images.sideArrow} style={styles.sideArrow} />
          </View>
        </TouchableOpacity>
   
        {/* <View
          style={{
            borderRadius: 10,
            borderWidth: 2,
            marginHorizontal: ms(16),
            padding: 20,
            borderColor: colors.lightBackground,
          }}>
          <Text style={{fontSize: s(16), color: colors.blue}}>About</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PrivacyPolicy')}>
            <Text
              style={{fontSize: s(16), color: colors.blue, marginTop: mvs(20)}}>
              Privacy policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TermsCondition')}>
            <Text
              style={{fontSize: s(16), color: colors.blue, marginTop: mvs(20)}}>
              Terms and conditions{' '}
            </Text>
          </TouchableOpacity>
          <Text
            style={{fontSize: s(16), color: colors.blue, marginTop: mvs(20)}}>
            FAQ
          </Text>
          <Text
            style={{fontSize: s(16), color: colors.blue, marginTop: mvs(20)}}>
            Help
          </Text>
        </View> */}
           <View
          style={{
            borderRadius: 10,
            borderWidth: 2,
            marginHorizontal: ms(16),
            padding: 20,
            borderColor: colors.lightBackground,
          }}>
            <TouchableOpacity
            // onPress={()=>Linking.openURL('https://reva.devarka.com/about-us')}
            onPress={()=>Linking.openURL(`${API_URL}about-us`)}
            >
          <Text
            style={{
              fontSize: s(16),
              color: colors.grey,
              fontFamily: fonts.quicksandMedium,
            }}>
            About
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
          //  onPress={() => props.navigation.navigate('PrivacyPolicy')}>
          // onPress={()=>Linking.openURL('https://reva.devarka.com/privacy-policy-careseeker')}>
 onPress={()=>Linking.openURL(`${API_URL}privacy-policy-careseeker`)}>
            <Text
              style={{ fontSize: s(16), color: colors.blue, marginTop: mvs(20) }}>
              Privacy policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           // onPress={() => props.navigation.navigate('TermsCondition')}>
                //  onPress={()=>Linking.openURL('https://reva.devarka.com/terms-and-condition-carerseeker')}>
                   onPress={()=>Linking.openURL(`${API_URL}terms-and-condition-carerseeker`)}>
            <Text
              style={{ fontSize: s(16), color: colors.blue, marginTop: mvs(20) }}>
              Terms and conditions{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={()=>Linking.openURL('https://reva.devarka.com/faqs')}
          onPress={()=>Linking.openURL(`${API_URL}faqs`)}>
          
          <Text
            style={{
              fontSize: s(16),
              color: colors.grey,
              marginTop: mvs(20),
              fontFamily: fonts.quicksandMedium,
            }}>
            FAQ
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={()=>Linking.openURL('https://reva.devarka.com/faqs')}
          onPress={()=>handleDelete()}
          >
          
          <Text
            style={{
              fontSize: s(16),
              color: colors.grey,
              marginTop: mvs(20),
              fontFamily: fonts.quicksandMedium,
            }}>
   Delete Account
          </Text>
          </TouchableOpacity>
          {/* <Text
            style={{
              fontSize: s(16),
              color: colors.grey,
              marginTop: mvs(20),
              fontFamily: fonts.quicksandMedium,
            }}>
            Help
          </Text> */}
        </View>
        <View
          activeOpacity={0.5}
          // onPress={() => props.navigation.navigate('MyWallet')}
        >
          <View
            style={{
              flexDirection: 'row',
       
              marginLeft: ms(30.5),
       
              paddingVertical: mvs(20),
            }}>
            <TouchableOpacity
            style={{flexDirection:'row',alignSelf:'center'}}
            onPress={() => handleLogout()}>
              <Image
                source={images.logoutIcon}
                style={{
                  width: ms(20.6),
                  height: mvs(20.6),
                  resizeMode: 'contain',
               
                }}
              />
               <Text
            style={{
              fontSize: s(16),
              marginLeft: ms(16),
        includeFontPadding:false,
              color: colors.blue,
              fontFamily: fonts.quicksandMedium,
            
            }}>
          Logout
          </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={{marginLeft: ms(20)}}>
              <Image
                source={images.setting}
                style={{
                  width: ms(20.6),
                  height: mvs(20.6),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  top: {
    flex: 1,
    marginTop: mvs(10),
    // marginLeft: moderateScale(20),
    backgroundColor: 'rgb(2,81,133)',
  },

  drawerIcon: {
    width: 18,
    height: 18,
  },
  drawerIconProfile: {
    width: ms(36),
    height: mvs(36),
    resizeMode: 'contain',
    // backgroundColor: colors.lightBackground,
  },
  sideArrow: {
    width: ms(9),
    height: mvs(16),
    position: 'absolute',
    right: Platform.OS === 'ios' ? ms(8) : ms(8),
    resizeMode: 'contain',
  },
  drawerTextStyle: {
    marginLeft: ms(16),
    fontSize: s(16),
    color: colors.blue,
    fontFamily: fonts.quicksandMedium,
  },
});
export default CustomDrawers;
