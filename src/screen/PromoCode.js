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
import { hideLoader } from '../component/AppLoader';
import { COUPON_LIST } from '../utils/reducerConstant';
import moment from 'moment';

export default function PromoCode(props) {
  const { navigation } = props;

  var joblist = [];
  const dispatch = useDispatch();
  const applyPromoCodeValue = useSelector(state => state.applyPromoCodeData);
  const couponListValue = useSelector(state => state.couponListData);
  const [slectCoupan, setslectCoupan] = useState('');
  const [offerList, setOfferList] = useState([
    // {
    //   id: '1',
    //   title: '  20 % In Tiger',
    //   expire: '   Expire 30 - 06 - 2022',
    //   coupan: ' 35Seaups',
    // },
    // {
    //   id: '2',
    //   title: '  20 % In Tiger',
    //   expire: '   Expire 30 - 08 - 2022',
    //   coupan: ' 45Seaups',
    // },
  ]);

  const selctCoupans = index => {
    if (slectCoupan === index) {
      setslectCoupan();
    } else {
      setslectCoupan(index);
    }
  };
  const ApplyCoupons = (item) => {
    let body = {


      "coupon_id": item?.coupon_info?.id,
      "carer_user_id": item?.id


    }
    dispatch(userActionServices.applyPromoCode(body))
  }
  const offerItemRenderlist = ({ item, index, separators }) => {
    return (
      <TouchableOpacity
        // onPress={() =>
        //   props.navigation.navigate('ConfirmBooking', {
        //     itemId: 86,
        //     coupan: item.coupan,
        //   })
        // }
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: colors.lightBackground,
          borderRadius: ms(10),
          marginHorizontal: ms(16),
          marginTop: ms(15),
        }}>
        <View style={{ marginTop: mvs(10), marginHorizontal: ms(16) }}>
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
             
            }}>
            <Image
              source={images.offerSign}
              style={{
                height: mvs(40),
                width: mvs(40),
                resizeMode: 'contain',
              }}></Image>
                <Text
            style={{
              fontSize: s(18),
              color: colors.blue,
             
        marginLeft:20,
              fontFamily: fonts.quicksandMedium,
            }}>
              {item?.coupon_info?.coupon_code}
          </Text>
            {/* <TouchableOpacity
            //  onPress={() => ApplyCoupons(item)}
            >
              <Text
                // source={
                //   slectCoupan === index ? images.fillCheck : images.blankCheck
                // }
                style={{
                  fontSize: s(18),
                  color: colors.blue,
                  marginTop: mvs(15),
                  fontFamily: fonts.quicksandMedium,
                }}>Apply</Text>
            </TouchableOpacity> */}
          </View>
          <Text
            style={{
              fontSize: s(18),
              color: colors.blue,
              marginTop: mvs(15),
              fontFamily: fonts.quicksandMedium,
            }}>
            {item?.coupon_info?.discount_by_per} % Off
          </Text>
        
          <Text
            style={{
              fontSize: s(14),
              color: colors.blueLight,
              fontFamily: fonts.quicksandMedium,
              marginTop: mvs(4),
              marginBottom: mvs(9),
            }}>
             
        Valid upto {moment(item?.coupon_info?.end_date).format('DD-MM-YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


  useEffect(() => {
    dispatch(userActionServices.couponlistAction());
  }, [])

  // response  job Posted applied detail and set data
  useEffect(() => {
    hideLoader();

    if (couponListValue.type === COUPON_LIST) {
      if (couponListValue?.value?.status) {
        if (
          Object.keys(couponListValue?.value).length != 0 &&
          couponListValue?.value != undefined
        ) {
          console.log("couponListValue>>",couponListValue);
          setOfferList(couponListValue?.value?.data)
          // setServices(jobExpertise)
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [couponListValue]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          marginTop: mvs(20),
          marginLeft: ms(16),
          flexDirection: 'row',

          alignItems: 'center',
        }}>
        <TouchableOpacity
          // onPress={() =>
          //   props.navigation.navigate('ConfirmBooking', {
          //     itemId: 86,
          //     coupan: 'Apply Coupan',
          //   })
          // }
          onPress={() => props.navigation.pop()}
          style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
              marginTop: mvs(-2),
              fontFamily: fonts.quicksandBold,
              textAlign: 'center',
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginLeft: ms(15),
          }}>
          <Text
            style={{
              fontFamily: fonts.quicksandMedium,
              color: colors.blue,
              fontSize: s(24),
            }}>
            Offers and coupons
          </Text>
        </View>
      </View>

      <View
        style={{
          borderBottomWidth: 4,
          height: 1,
          width: '100%',
          marginTop: mvs(24),

          borderColor: colors.lightBackground,
        }}></View>
{ offerList?.length==0?
    <View style={{ alignItems: 'center', justifyContent: 'center',flex:1 }}>
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
      <FlatList
        data={offerList}
        showsVerticalScrollIndicator={false}
        renderItem={offerItemRenderlist}
      />
      }
    </SafeAreaView>
  );
}
