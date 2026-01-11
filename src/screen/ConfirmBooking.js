import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  ImageBackground,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import moment from 'moment';
import { color } from 'react-native-reanimated';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseToken } from '../constant/constant';
import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import {
  declineServiceAgrements,
  Image_URL,
  SUCCESS,
} from '../utils/apiConstants';
// import ReadMore from '@fawazahmed/react-native-read-more';
import { Popable } from 'react-native-popable';
import { getjobpostedlists } from '../utils/apiConstants';
import ReadMore from 'react-native-read-more-text';
import {
  JOBPOSTEDLIST,
  LOGOUT,
  UPDATE_CONFRIM_BOOKING,
  CONFIRMBOOKINGREQUEST,
  APPLY_PROMO_CODE,
} from '../utils/reducerConstant';
import { useIsFocused } from '@react-navigation/native';
export default function ConfirmBooking(props) {
  const { navigation } = props;

  var joblist = [];
  const dispatch = useDispatch();
  const confirmBookingData = useSelector(state => state.confirmBookingData);
  const updateConfirmBooking = useSelector(state => state.updateConfirmBooking);
  const applyPromoCodeValue = useSelector(state => state.applyPromoCodeData);
  console.log("applyPromoCodeValue>>>>>>>>>>>>>>>>>>>>>>", applyPromoCodeValue);
  console.log('confirmBookingDataconfirmBookingDataconfirmBookingDataconfirmBookingData', confirmBookingData);
  var bookingId = props.route.params.bookingId;
  console.log("bookingId>>>",bookingId);
  var promomcode = props.route.params.promoCode;

const [data,setData]=useState('')
console.log(data?.total_ratings,"dd>>DS>S>>D>S>DSD>");
console.log(data,"dd>>DS>S>>D>S>DSD>");
  const [applyCoupan, setApplyCoupan] = useState('');
  const [firstName, setFirstName] = useState('');
  const [availabilityOnDate, setAvailabilityOnDate] = useState('');
  //const [bookingId, setBookingId] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [shift, setShift] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [carer_Id, setCarer_Id] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalTimeDuration, setTotalTimeDuration] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [carerIdS, setCarer_IdS] = useState('');
  const [careSeekerId, setCareseekerId] = useState('');
  const [negotiateAmount, setNegotiateAmount] = useState('');
  const [negotiateAmountCheck, setNegotiateAmountCheck] = useState(false);
  const [couponId, setCouponId] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [errorMessage, setCouponErrorMessage] = useState('');
  console.log("couponId>>>", couponId);
  const [dateDurantion, setDateDurantion] = useState([]);
  useEffect(() => {
    dispatch(userActionServices.confirmBookingRequests(bookingId));
    // dispatch(userActionServices.confirmBookingRequests(43));
    // setApplyCoupan(props.route.params.coupan);
  }, []);
  // response  job Posted applied detail and set data
  useEffect(() => {
    hideLoader();

    if (confirmBookingData.type === CONFIRMBOOKINGREQUEST) {
      if (confirmBookingData?.value?.status) {
        if (
          Object.keys(confirmBookingData?.value).length != 0 &&
          confirmBookingData?.value != undefined
        ) {
          let carer_booking_id;
          let jobExpertise = [];
          let Dates = [];
          let jobExperinenceIn = [];
          let jobPrice = [];
          let jobTraining = [];
          let jobLanguage = [];
          let jobSupport = [];

          let confirmBookingListTemp = confirmBookingData.value.data;
          carer_booking_id = confirmBookingListTemp.carer_booking_id;
          console.log('confirmBookingData', JSON.stringify(carer_booking_id));
          console.log(
            'confirmBookingData.value.availabilityOnDate',
            confirmBookingData.value.availabilityOnDate,
          );
          setData(confirmBookingListTemp)
          // setBookingId(carer_booking_id)
          setCarer_Id(confirmBookingListTemp.carer_booking_on_hold.id);
          setCareseekerId(confirmBookingListTemp.id);
          //setAvailabilityOnDate(confirmBookingData.value.availabilityOnDate)
          setFirstName(confirmBookingListTemp.carer_user_info.first_name);
          setLastName(confirmBookingListTemp.carer_user_info.last_name);
          setImageUrl(confirmBookingListTemp.carer_user_info.profile_image);
          setCategory(confirmBookingListTemp.category_info.category_name);
          setShift(confirmBookingListTemp.shift_info.shift);
          let fullAddress =


          confirmBookingListTemp?.address_line_1+ ' , '+confirmBookingListTemp?.flat_no+' , '+  confirmBookingListTemp?.town+ ' , '+confirmBookingListTemp?.postcode+' , '+confirmBookingListTemp?.country
           
          setAddress(fullAddress);
          setAmount(
            confirmBookingListTemp.carer_booking_on_hold.total_service_price,
          );
          setTotalTimeDuration(
            confirmBookingListTemp.carer_booking_on_hold.total_time_duration,
          );
          setTotal(
            confirmBookingListTemp.carer_booking_on_hold.total_price,
          );
          setStartTime(
            confirmBookingListTemp.care_seeker_booking_duration_info[0]
              .job_start_time,
          );
          setEndTime(
            confirmBookingListTemp.care_seeker_booking_duration_info[0]
              .job_end_time,
          );
          confirmBookingListTemp.care_seeker_booking_duration_info.map(
            (postedData, postedIndex) => {
              let modifiactiondate = moment(postedData.booking_date).format(
                'D MMM YYYY',
              );

              Dates.push(modifiactiondate);
            },
            [],
          );
          setDateDurantion(Dates);
          // setExperience(confirmBookingListTemp.user_meta_info.experience)
          // setDistance(confirmBookingListTemp.user_meta_info.distance)
          // setAvailablefor(confirmBookingListTemp.user_meta_info.available_for)
          // setAdditionalReq(confirmBookingListTemp.user_meta_info.about_you)
          // setSupport(jobSupport)
          // setLanguage(jobLanguage)
          // setTraining(jobTraining)
          // setServices(jobExpertise)
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [confirmBookingData]);

  useEffect(() => {
    hideLoader();

    if (updateConfirmBooking.type === UPDATE_CONFRIM_BOOKING) {
      if (updateConfirmBooking?.value?.status) {
        if (
          Object.keys(updateConfirmBooking?.value).length != 0 &&
          updateConfirmBooking?.value != undefined
        ) {
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarSuccess(updateConfirmBooking.value.message);
          }, 100);
          props.navigation.navigate('Home');
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
    if (applyPromoCodeValue.type === APPLY_PROMO_CODE) {
      if (applyPromoCodeValue?.value?.status) {
        if (
          Object.keys(applyPromoCodeValue?.value).length != 0 &&
          applyPromoCodeValue?.value != undefined
        ) {
          setCouponErrorMessage('')
          console.log("applyPromoCodeValueapplyPromoCodeValue????", applyPromoCodeValue?.value?.data);
          console.log("aapplyPromoCodeValue?.value?.data?.coupon_info?.id", applyPromoCodeValue?.value?.data?.coupon_info?.id);
          setCouponId(applyPromoCodeValue?.value?.data?.id)
          setCouponMessage(applyPromoCodeValue?.value?.message)

        }
      } else {
        setCouponMessage('')
        setCouponId('')
        setCouponErrorMessage(applyPromoCodeValue?.value?.message)
      }

    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [updateConfirmBooking, applyPromoCodeValue]);

  const sendBookingRequqest = () => {
    if (negotiateAmountCheck && negotiateAmount == '') {
      snackbarError("Please enter negotiate amount")
    } else {
      if (couponId != '') {

        let body = {
          carer_booking_id: carer_Id,
          care_seeker_booking_id: careSeekerId,
          coupon_id: couponId,
          negotiated_price: negotiateAmount
        };
        console.log('coupanConfrimBody', body);
        setTimeout(() => {
          dispatch(userActionServices.updateConfirmBooking(body));
        }, 500);

      } else {
        let body = {
          carer_booking_id: carer_Id,
          care_seeker_booking_id: careSeekerId,
          negotiated_price: negotiateAmount

        };
        console.log('withoutCoupanConfrimBody', body);
        dispatch(userActionServices.updateConfirmBooking(body));
      }

    }

  };

  const ApplyCoupons = (item) => {
    if (applyCoupan == '') {
      snackbarError("Please Enter Apply Promo Code")
      setCouponErrorMessage('')
      setCouponMessage('')
      setCouponId('')
    } else {
      let body = {
        "coupon_name": applyCoupan
      }
      console.log("body", body);
      dispatch(userActionServices.applyPromoCode(body))
    }

  }
  const renderItems = (item, index) => {
    return (
      <TouchableOpacity
        //  onPress={() => chooseRates(item, index)}
        style={{
          flexDirection: 'row',

          marginTop: ms(10),
        }}>
        <View
          style={{
            paddingVertical: ms(2),
            backgroundColor:
              selectedIndex === index
                ? colors.darkblue
                : colors.lightBackground,
            borderWidth: 0.5,
            //    margin: ms(5),
            marginEnd: ms(5),
            marginTop: ms(5),
            marginBottom: ms(5),
            borderRadius: 13,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: selectedIndex === index ? colors.white : colors.grey,
              paddingVertical: ms(4),
              paddingHorizontal: ms(10),
              fontFamily: fonts.quicksandMedium,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
            flex: 0.22,

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
           Booking Details
          </Text>
        </View>
        {/* <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <TouchableOpacity style={{}}>
              <Text
                style={{
                  fontSize: s(16),
                  fontFamily: fonts.quicksandBook,
                  color: colors.primaryColor,
                }}>
                Read All
              </Text>
            </TouchableOpacity>
          </View> */}
      </View>
      <View
        style={{
          borderBottomWidth: 4,
          height: 1,
          width: '100%',
          marginTop: mvs(24),

          borderColor: colors.lightBackground,
        }}></View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: mvs(16),
            marginLeft: ms(16),
          }}>
          <Image
            source={{ uri: Image_URL + imageUrl }}
            style={{
              height: mvs(120),
              width: mvs(120),
              resizeMode: 'stretch',
              borderWidth: 1,
              borderRadius: ms(10),
              borderColor: colors.primaryColor,
            }}></Image>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: ms(15),
              flex: 1,
            }}>
            <Text
              style={{
                color: colors.blue,
                fontFamily: fonts.quicksandMedium,
                fontSize: s(25),
                marginTop: ms(15),
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {firstName} {lastName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(9),
                alignItems: 'center',
              }}>
              <Image
                source={images.yellowstar}
                style={{
                  height: mvs(12),
                  width: mvs(13),
                  resizeMode: 'contain',
                }}></Image>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  color: colors.blue,
                  fontSize: s(12),
                  marginLeft: ms(5),
                }}>
        {data?.total_avg_rating}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  color: colors.blueLight,
                  fontSize: s(12),
                  marginLeft: ms(5),
                }}>
                ({data?.total_ratings})
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: ms(10),
                flex:1,
            
              }}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: colors.lightBackground,
                  borderColor: colors.lightBackground,
                  flex:1,
                }}>
                <Text
                  style={{
                    fontSize: s(14),
                    padding: 2,
                    flex:1,
                    fontFamily: fonts.quicksandMedium,
                    color: colors.grey,

                  }}>
                  {category}
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  marginLeft: ms(10),
                  backgroundColor: colors.lightBackground,
            flex:1,
                  alignItems:'center',
                  borderColor: colors.lightBackground,
                }}>
                  
                <Text
                  style={{
                    fontSize: s(14),
                 
textAlign:'center',
                    fontFamily: fonts.quicksandMedium,
                    color: colors.grey,
                  }}>
                  {shift}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: ms(16), marginTop: mvs(20) }}>

          <Text
            style={{
              fontSize: s(22),
              fontFamily: fonts.quicksandMedium,
              color: colors.blue,
            }}>
            Booking Information
          </Text>
          <View>
            <Text
              style={{
                fontSize: s(15),
                fontFamily: fonts.quicksandMedium,
                color: colors.blue,
                marginTop: mvs(15),
              }}>
              Service Charges/hr
            </Text>

            <Text
              style={{
                fontSize: s(14),
                fontFamily: fonts.quicksandMedium,
                color: colors.blueLight,
                marginTop: mvs(10),
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              £  {total}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 15,alignItems:'center' }}>
            <TouchableOpacity
             
              onPress={() => setNegotiateAmountCheck(!negotiateAmountCheck)}>
              <Image style={{ height: 18, width: 18, resizeMode: 'contain' }} source={negotiateAmountCheck ? images.fill_rectangle : images.rectangleCheck}></Image>
            </TouchableOpacity>

            <Text style={{ marginLeft: 10, fontSize: s(14), color: colors.grey, fontFamily: fonts.quicksandMedium }}>Do you want to negotiate service charge?</Text>
          </View>
          {
            negotiateAmountCheck &&

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: colors.lightBackground,
                borderWidth: 1,
                height: 50,
                alignItems: 'center',
                marginTop: mvs(15),
                borderColor: colors.lightBackground,
                borderRadius: ms(10),
                paddingHorizontal: ms(14),
              }}>
              <TextInput
                value={negotiateAmount}
                onChangeText={text => setNegotiateAmount(text)}

                placeholderTextColor={colors.grey}
                keyboardType='number-pad'
                placeholder="Enter your price/hr"
                style={{
                  fontFamily: fonts.quicksandMedium,
                  color: colors.blueLight,
                  marginEnd: 10,
                  flex: 1,
                  fontSize: s(14)
                }}>
              </TextInput>
            </View>
          }
          <Text
            style={{
              fontSize: s(15),
              fontFamily: fonts.quicksandMedium,
              color: colors.blue,
              marginTop: mvs(15),
            }}>
            Address
          </Text>

          <Text
            style={{
              fontSize: s(14),
              fontFamily: fonts.quicksandMedium,
              color: colors.blueLight,
              marginTop: mvs(10),
            }}
          
            ellipsizeMode="tail">
            {address}
          </Text>
          <Text
            style={{
              fontSize: s(16),
              fontFamily: fonts.quicksandMedium,
              color: colors.blue,
              marginTop: mvs(15),
            }}>
            Date & Time
          </Text>

          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {dateDurantion.map((listItem, index) =>
              renderItems(listItem, index),
            )}
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: s(14),
                color: colors.blueLight,
                fontFamily: fonts.quicksandMedium,
              }}>
              {shift}
            </Text>
            <Text
              style={{
                fontSize: s(14),
                color: colors.blueLight,
                fontFamily: fonts.quicksandMedium,
                marginLeft: ms(10),
              }}>
              {'('}
              {startTime}
            </Text>
            <Text
              style={{
                fontSize: s(14),
                color: colors.blueLight,
                fontFamily: fonts.quicksandMedium,
                marginHorizontal: ms(4),
              }}>
              to
            </Text>
            <Text
              style={{
                fontSize: s(14),
                color: colors.blueLight,
                fontFamily: fonts.quicksandMedium,
              }}>
              {endTime}
              {')'}
            </Text>
          </View>
          <Text
            style={{
              fontSize: s(15),
              fontFamily: fonts.quicksandMedium,
              color: colors.blue,
              marginTop: mvs(15),
            }}>
            Total Time Duration
          </Text>
          <Text
            style={{
              fontSize: s(14),
              fontFamily: fonts.quicksandMedium,
              color: colors.blueLight,
              marginTop: mvs(10),
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {totalTimeDuration}
          </Text>

          {
            promomcode == 'show' ?
              <>
                <Text
                  style={{
                    fontSize: s(22),
                    fontFamily: fonts.quicksandMedium,
                    color: colors.blue,
                    marginTop: mvs(20),
                  }}>
                  Promo Code
                </Text>

                <Text
                  style={{
                    fontSize: s(15),
                    fontFamily: fonts.quicksandMedium,
                    color: colors.blue,
                    marginTop: mvs(15),
                  }}>
                  Apply Promo Code
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: colors.lightBackground,
                    borderWidth: 1,
                    height: 50,
                    alignItems: 'center',
                    marginTop: mvs(15),
                    borderColor: colors.lightBackground,
                    borderRadius: ms(10),
                    paddingHorizontal: ms(14),
                  }}>
                  <TextInput
                    value={applyCoupan}
                    onChangeText={text => setApplyCoupan(text)}
                    placeholderTextColor={colors.grey}
                    placeholder="Apply code"
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      color: colors.blueLight,

                      marginEnd: 10,
                      flex: 1,
                      fontSize: s(14)
                    }}>
                  </TextInput>
                  <TouchableOpacity
                    onPress={() => ApplyCoupons()}
                  >
                    <Text
                      style={{
                        fontFamily: fonts.quicksandMedium,
                        color: colors.primaryColor,
                        fontSize: s(14),
                      }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
              : <></>
          }
          {couponMessage == '' ? <></> :
            <View style={{ backgroundColor: colors.greenBg, marginTop: 10, padding: 10 }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  color: colors.green,
                  fontSize: s(11),

                }}>
                {couponMessage}</Text>
            </View>
          }
          {errorMessage == '' ? <></> :
            <View style={{ backgroundColor: colors.redBg, marginTop: 10, padding: 10 }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  color: colors.red,
                  fontSize: s(11),

                }}>
                {errorMessage}</Text>
            </View>
          }

          {/* <Image
            source={images.additonalrequirement}
            style={{
              resizeMode: 'contain',
              height: mvs(16),
              width: mvs(16),
              marginTop: mvs(10),
            }}></Image>
          <Text
            style={{
              fontFamily: fonts.quicksandBook,
              color: colors.blueLight,
              fontSize: s(12),
              marginTop: mvs(10),
            }}>
            If you want to make changes in booking deatils, you can go back
          </Text> */}
        </View>
      </ScrollView>
      <View
        style={{
          borderBottomWidth: 4,
          height: 1,
          width: '100%',
          marginTop: mvs(15),

          borderColor: colors.lightBackground,
        }}></View>
      <View style={{ backgroundColor: colors.white, height: mvs(88) }}>
        <TouchableOpacity
          onPress={() => {
            sendBookingRequqest();
          }}
          style={{
            borderColor: colors.primaryColor,
            backgroundColor: colors.primaryColor,
            marginHorizontal: ms(16),
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
            Send Booking Request
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
