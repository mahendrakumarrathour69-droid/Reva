import React, { useEffect, useState, useRef, useContext ,ToastAndroid} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import firebase from 'firebase';
import KeyboardManager from 'react-native-keyboard-manager';
import moment from 'moment';
import { colors } from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'react-native-crypto-js';
import { fonts } from '../utils/font';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import images from '../utils/images';
import {
  declineServiceAgrements,
  Image_URL,
  SUCCESS,
} from '../utils/apiConstants';
import { db } from '../utils/firebaseConfig';
export function ChatList(props) {
  const { navigation } = props;
  const [chatList, setChatList] = useState([]);
  console.log("chat===>", chatList)

  // const firebaseConfig = {
  //   apiKey: 'AIzaSyB0WsBwz6XCKe6g0nkmZcYBsOq9QHyvbW8',
  //   authDomain: 'careseeker-9533b.firebaseapp.com',
  //   projectId: 'careseeker-9533b',
  //   storageBucket: 'careseeker-9533b.appspot.com',
  //   messagingSenderId: '530793332806',
  //   appId: '1:530793332806:web:a5239c0cf8cd22be2b8a47',
  //   measurementId: 'G-ZRXGQ6E3VP',
  // };

  // if (firebase.apps.length === 0) {
  //   firebase.initializeApp(firebaseConfig);
  // }

  // const db = firebase.firestore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (Platform.OS === 'ios') {
        KeyboardManager.setEnable(false);
      }
      dataFromFirebase();
    });
    return unsubscribe;
  }, [navigation]);

  const dataFromFirebase = () => {
    AsyncStorage.getItem(USER_DATA).then(data => {
      console.log("userser", data)
      let loginData = JSON.parse(data);
      var msgData = [];
      db.collection('List')
        .doc(loginData.id.toString())
        .collection('userDetails')
        .onSnapshot(function (snapshot) {
          snapshot.docChanges().map(function (change) {
            if (change.type === 'modified') {
              const newData = change.doc.data();
              const newMap = msgData.map((data, id) =>
                data.reciverId == newData.reciverId ? newData : data,
              );
              msgData = newMap;
            } else {
              msgData.push(change.doc.data());
            }
            var newList = msgData.sort(function (x, y) {
              return y.date - x.date;
            });
            setChatList(newList);
          });
        });
    });
  };

  const renderItems = ({ item, index }) => {
    var timestemp = new Date(item.date);
    var date = '';
    const decryptedMessage = CryptoJS.AES.decrypt(
      item?.message,
      'chatMessage',
    ).toString(CryptoJS.enc.Utf8);
    if (
      moment(timestemp).format('DD/MM/YYYY') ===
      moment(new Date()).format('DD/MM/YYYY')
    ) {
      date = 'Today';
    } else {
      date = moment(timestemp).format('DD/MM/YYYY');
    }

    return (
      <View style={{ flex: 1, marginBottom: 10 }} key={index}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ChatScreen', {
              // clinicData: {
              //   clinic_name: item.recieverName,
              //   id: item.reciverId,
              //   listing_image: item.profileImage,
              // },

              carerData: {
                id: item?.reciverId,
                name: item?.recieverName,
                image: item?.profileImage,
                title: item?.recieverTitle
              },
            })
          }>
          <View style={styles.chatlistMain}>
            <Image
              style={[styles.userImage]}
              resizeMode="cover"
              source={
                item.profileImage == null
                  ? images.profile
                  : { uri: Image_URL + item?.profileImage }
              }
            />
            <View style={{ marginStart: 15, flex: 1 }}>
              <Text numberOfLines={2} style={[styles.chatName]}>
                {item.recieverName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    marginEnd: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.blueLight,
                      fontFamily: fonts.quicksandMedium,
                    }}
                    numberOfLines={2}>
                    {decryptedMessage.slice(1, -1)}
                  </Text>
                </View>
                {item.count == 0 ? (
                  <></>
                ) : (
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: ms(40),
                      width: mvs(24),
                      height: mvs(24),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: colors.primaryColor,
                      backgroundColor: colors.primaryColor,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.quicksandBook,
                        fontSize: 12,
                        color: colors.white,
                      }}>
                      {item.count}
                    </Text>
                    {/* <Text
                    style={{
                      fontFamily: fonts.quicksandBook,
                      fontSize: 12,
                      color: colors.texta0,
                    }}>
                    {date}
                  </Text> */}
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#c3d9ff80',
            padding: 0.5,
            marginTop: 15,
          }}></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {/* <View style={{backgroundColor: colors.accent, flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            paddingHorizontal: 10,
            zIndex: 1,
            marginStart: 10,
            borderRadius: 20,
            marginTop: Platform.OS === 'android' ? 25 : 58,
          }}>
          <Image
            style={{
              width: 60,
              height: 27,
              resizeMode: 'contain',
              marginVertical: 10,
            }}
            source={images.backArrow}
          />
        </TouchableOpacity>
        <View style={[styles.top, {alignItems: 'center'}]}>
          <Text
            style={{
              fontSize: 26,
              color: colors.texta0,
              fontFamily: fonts.quicksandMedium,
            }}>
            My Chats
          </Text>
        </View>
      </View> */}
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
              fontSize: 24,
              color: colors.blue,
              fontFamily: fonts.quicksandMedium,
            }}
           >
            Chat
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
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
          marginVertical: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 20,
          flex: 4.5,
          padding: 20,
          paddingBottom: 20,
          marginTop: -20,
        }}>
        {chatList.length > 0 ? (
          <FlatList
            bounces={false}
            data={chatList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderItems}
          />
        ) : (
          <View
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Text
              style={{
                fontSize: s(16),
                color: colors.grey,
                fontFamily: fonts.quicksandMedium,
              }}>
              No Chat found !
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  top: {
    marginTop: Platform.OS === 'android' ? 33 : 66,
  },
  userIcon: { height: 60, width: 60, resizeMode: 'contain' },
  chatlistMain: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
  userImage: { height: 70, width: 70, borderRadius: 40, resizeMode: 'contain' },
  chatName: {
    fontFamily: fonts.quicksandMedium,
    fontSize: 18,
    color: colors.blue,
  },
});
