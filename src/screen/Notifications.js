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
  FlatList,
  Modal,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { userActionServices } from '../redux/userServices';
import { NOTIFICATION_LIST, READ_NOTI } from '../utils/reducerConstant';
import { USER_DATA } from '../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image_URL } from '../utils/apiConstants';
import { snackbarSuccess } from '../utils/snackbar';

export default function Notifications(props) {
  const dispatch = useDispatch();
  const {navigation} = props;
  const notificationValue = useSelector(
    state => state.notificationData,
  );
  const read_notificationValue = useSelector(
    state => state.read_notification,
  );
  const [popularSearchList, setPopularSearchList] = useState([]);
  console.log("popularSearchList>>>",popularSearchList);
  const renderItems = ({ item, index, separators }) => {
    return (
      <TouchableOpacity
      onPress={()=>{
        let body ={
          id:item?.id
        }
        dispatch(userActionServices.read__Notification(body))
      }}
        style={{
          paddingVertical: ms(2),
          backgroundColor: item.color,
          borderWidth: 1,
          margin: ms(5),
         

          borderColor: colors.lightBackground,
        }}>
        <View
          style={{
            flexDirection: 'row',

            flex: 1,
            alignItems: 'center',
          }}>
          <Image
          //  source={
          //   item.icon == null
          //     ? images.notification
          //     : { uri: Image_URL + item?.icon }
          // }
          tintColor={colors?.lightGrey}
          source={images?.notification}
            style={{
              height: mvs(30),
              width: mvs(30),
              marginLeft: ms(16),
              resizeMode: 'contain',
            }}></Image>
          <View style={{ flexDirection: 'column', marginLeft: ms(20),flex:1 }}>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                color:item?.is_active==0?colors?.grey: colors.green,
                fontSize: s(16),
              }}>
 {item?.title}
            </Text>
            <Text
              style={{
                marginTop: mvs(4),
                fontFamily: fonts.quicksandMedium,
                color: colors.grey,
                fontSize: s(14),
              }}>
            {item?.created_at}
            </Text>
          </View>
        </View>
        {
     popularSearchList.length - 1 != index &&
        
        <View
        style={{
          borderBottomWidth: 1,
          height: 1,
          width: '100%',
          marginVertical: mvs(5),
          borderColor: colors.lightBackground,
        }}></View>
      }
      </TouchableOpacity>
    );
  };



  const NotifcationApi = async() => {
      let user_Data = await AsyncStorage.getItem(USER_DATA);
      console.log("user_Data>>>",user_Data);
      let userIdData = JSON.parse(user_Data);
      let body = {
          id: userIdData?.id,
        is_read:0,
        is_read_all:0
      }
    
     dispatch(userActionServices?.notificationList(body))

  };
  useEffect(() => {
    NotifcationApi();
  }, []);
   // response service request get api and set data
   useEffect(() => {
    if (notificationValue.type === NOTIFICATION_LIST) {
      if (notificationValue?.value?.status) {
        if (
          Object.keys(notificationValue?.value).length != 0 &&
          notificationValue?.value != undefined
        ) {
          getNotificationData = notificationValue?.value?.data?.data;
console.log("getNotificationData>>>>",JSON?.stringify(getNotificationData));
          setPopularSearchList(getNotificationData)

          dispatch(userActionServices.resetData());
        }
      }
    } else {
    }
  }, [notificationValue]);


   // response service request get api and set data
   useEffect(() => {
    console.log("read_notificationValue?.value?.status",read_notificationValue?.value?.status);
    console.log("read read_notificationValue?.value?.message",read_notificationValue?.value?.message);
    
    if (read_notificationValue.type === READ_NOTI) {
      if (read_notificationValue?.value?.status) {
       console.log("aman",read_notificationValue?.value?.status);
       
      setTimeout(() => {
        snackbarSuccess(read_notificationValue?.value?.message)
      }, 200);
      NotifcationApi();
          dispatch(userActionServices.resetData());
        
      }
    } else {
    }
  }, [read_notificationValue]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
            Notification
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          {/* <TouchableOpacity style={{}}>
            <Text
              style={{
                fontSize: s(16),
                fontFamily: fonts.quicksandBook,
                color: colors.primaryColor,
              }}>
              Read All
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 4,
          height: 1,
          width: '100%',
          marginVertical: mvs(20),
          borderColor: colors.lightBackground,
        }}></View>
     
     {popularSearchList?.length==0?
               <View style={{ alignItems: 'center', justifyContent: 'center' ,flex:1,}}>
               <Text
                 style={{
                   fontSize: s(16),
                   color: colors.grey,
                   textAlign: 'center',
                   alignItems:'center',
                   fontFamily: fonts.quicksandMedium,
                 }}>
                 No data found !
               </Text>
             </View>
            :
          
        <View style={{flex:1}}>

      <FlatList
        data={popularSearchList}
        showsVerticalScrollIndicator={false}
        renderItem={renderItems}
      />
      </View>
        }
    </SafeAreaView>
  );
}
