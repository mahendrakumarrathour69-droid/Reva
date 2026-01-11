
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
    Keyboard,
    Modal,
    KeyboardAvoidingView,
  } from 'react-native';
  import React, { useContext, useEffect, useState, useRef } from 'react';
  import { s, vs, ms, mvs } from 'react-native-size-matters';
  import images from '../utils/images';
  import { fonts } from '../utils/font';
  import { colors } from '../utils/colors';
  import { color } from 'react-native-reanimated';
  import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
  import { useDispatch, useSelector } from 'react-redux';
  import { hideLoader, showLoader } from '../component/AppLoader';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { firebaseToken } from '../constant/constant';
  import MyDropDown from '../component/MyDropDown';
  import { userActionServices } from '../redux/userServices';
  import { snackbarSuccess, snackbarError } from '../utils/snackbar';
  import {
    declineServiceAgrements,
    Image_URL,
    SUCCESS,
  } from '../utils/apiConstants';
  
  import { Popable } from 'react-native-popable';
  import { getjobpostedlists } from '../utils/apiConstants';
  import ReadMore from '@fawazahmed/react-native-read-more';
  import {
   
    PAYMENT_SUMMARY
  } from '../utils/reducerConstant';
  import { useIsFocused } from '@react-navigation/native';
const PaymentDetail = (props) => {
    const { navigation } = props;
  var id = props.route.params.id;
  var paymentSummary = props.route.params.paymentSummary;
console.log("id",id);



    var randomUniqeId = '12345678';
    var joblist = [];
    const dispatch = useDispatch();
  const paymentSummaryValue = useSelector(state => state.paymentSummaryData);
  console.log("paymentSummaryValue>>>",paymentSummaryValue);
  const [applyCoupan, setApplyCoupan] = useState('');
  const [firstName, setFirstName] = useState('');

  //const [bookingId, setBookingId] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [shift, setShift] = useState('');
  const [servicePerHour, setServicePerHour] = useState('');
  const [totalBookingHours, setTotalBookingHours] = useState('');
  const [carer_Id, setCarer_Id] = useState('');
  const [totalServiceFees, setTotalServiceFees] = useState('');
  const [discount, setDiscount] = useState('');
  const [platformCharges, setPlatFormCharges] = useState('');
  const [vat, setVat] = useState('');
  const [discountPer, setDiscountPer] = useState('');
  const [platformChargesPer, setPlatFormChargesPer] = useState('');
  const [vatPer, setVatPer] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [rating, setRating] = useState('');
  const [ratingCount, setRatingCount] = useState('');

  useEffect(()=>{
    
    dispatch(userActionServices.paymentSummary(paymentSummary));
  },[])

  useEffect(() => {
    hideLoader();

    if (paymentSummaryValue.type === PAYMENT_SUMMARY) {
      if (paymentSummaryValue?.value?.status) {
        if (
          Object.keys(paymentSummaryValue?.value).length != 0 &&
          paymentSummaryValue?.value != undefined
        ) {
          let carer_booking_id;
          

          let paymentDetailTemp = paymentSummaryValue.value.data;
console.log("paymentDetailTemp",paymentDetailTemp);
console.log("paymentDetailTempcarer",paymentDetailTemp.carer_details);
         // setCarer_Id(paymentSummaryValue.carer_booking_on_hold.id);
         //setAvailabilityOnDate(confirmBookingData.value.availabilityOnDate)
          setFirstName(paymentDetailTemp?.carer_details?.carer_name);
       
          setImageUrl(paymentDetailTemp?.carer_details?.carer_image);
          setCategory(paymentDetailTemp?.carer_details?.category_name);
          setShift(paymentDetailTemp?.carer_details?.shift_name);
          setRating(paymentDetailTemp?.carer_details?.carer_rating);
          setRatingCount(paymentDetailTemp?.carer_details?.carer_total_no_rating);
          
         setServicePerHour(paymentDetailTemp?.payment_details?.service_price_per_hour)
         setTotalBookingHours(paymentDetailTemp?.payment_details?.total_booking_hours)
         setTotalServiceFees(paymentDetailTemp?.payment_details?.total_service_fees)
         setDiscount(paymentDetailTemp?.payment_details?.discount_price)
         setPlatFormCharges(paymentDetailTemp?.payment_details?.platform_charge_price)
         setVat(paymentDetailTemp?.payment_details?.vat_price)
         
         setDiscountPer(paymentDetailTemp?.payment_details?.discount_perc)
         setPlatFormChargesPer(paymentDetailTemp?.payment_details?.platform_charge_perc)
         setVatPer(paymentDetailTemp?.payment_details?.vat_perc)
         setTotalAmount(paymentDetailTemp?.total_amount_paid)
         
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [paymentSummaryValue]);

  const SummaryDetials =(text,value)=>{
    return(

        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
      marginTop:12
        }}>
        <View
          style={{
            flexDirection: 'row',

            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: fonts.quicksandMedium,
              fontSize: s(14),
              flex: 1,
              color: colors.blueLight,
            }}>
     {text}
          </Text>
          <Text
            style={{
              fontFamily: fonts.quicksandMedium,
              fontSize: s(14),
              marginHorizontal: ms(11),
              color: colors.blackopacity,
            }}>
            ---
          </Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.quicksandMedium,
            fontSize: s(16),
            textAlign: 'right',
            flex: 1,
            color: colors.blue,
          }}>
          £ {value}
        </Text>
      </View>
    )
  }
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
            Summary
            </Text>
          </View>
          <View style={{ flex: 0.5, alignItems: 'flex-end' }}></View>
        </View>
        <View
          style={{
            borderBottomWidth: 4,
            height: 1,
            width: '100%',
            marginTop: mvs(24),
  
            borderColor: colors.lightBackground,
          }}></View>
  
        <ScrollView>
    
        
          <View
          style={{
            flexDirection: 'row',
            marginTop: mvs(16),
            marginLeft: ms(16),
          }}>
          <Image
        
            source={{uri:Image_URL+imageUrl}}
            style={{
              height: mvs(120),
              width: mvs(120),
              resizeMode: 'cover',
              borderWidth: 1,
            borderRadius:10,
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
              {firstName} 
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
               {rating}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  color: colors.blueLight,
                  fontSize: s(12),
                  marginLeft: ms(5),
                }}>
                ({ratingCount})
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: ms(10),
                flex:1
              }}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  flex:1,
                  backgroundColor: colors.lightBackground,
                  borderColor: colors.lightBackground,
                }}>
                <Text
                  style={{
                    fontSize: s(14),
                    padding: 2,

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
                  flex:1,
                  marginLeft: ms(20),
                  backgroundColor: colors.lightBackground,
                  borderColor: colors.lightBackground,
                }}>
                <Text
                  style={{
                    fontSize: s(14),
                    padding: 2,

                    fontFamily: fonts.quicksandMedium,
                    color: colors.grey,
                  }}>
                  {shift}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal:16 ,marginTop:16}}>
       {SummaryDetials("Service Price Per Hour",servicePerHour)}
       {/* {SummaryDetials("Total Booking Hours",totalBookingHours)} */}
       <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
      marginTop:12
        }}>
        <View
          style={{
            flexDirection: 'row',

            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: fonts.quicksandMedium,
              fontSize: s(14),
              flex: 1,
              color: colors.blueLight,
            }}>
     Total Booking Hours
          </Text>
          <Text
            style={{
              fontFamily: fonts.quicksandMedium,
              fontSize: s(14),
              marginHorizontal: ms(11),
              color: colors.blackopacity,
            }}>
            ---
          </Text>
        </View>
        <Text
          style={{
            fontFamily: fonts.quicksandMedium,
            fontSize: s(16),
            textAlign: 'right',
            flex: 1,
            color: colors.blue,
          }}>
           {totalBookingHours} Hours
        </Text>
      </View>


       <View
          style={{
            borderBottomWidth: 2,
            height: 1,
            width: '100%',
            marginTop: 15,
            borderColor: colors.lightBackground,
          }}></View>
              <Text
            style={{
              fontSize: s(22),
              fontFamily: fonts.quicksandMedium,
              color: colors.blue,
              marginVertical:20
            }}>
        Payment Details
          </Text>
          {SummaryDetials("Total Service Fees",totalServiceFees)}
       {SummaryDetials(`Discount (${discountPer}%)`,discount)}
       {SummaryDetials(`Platform Charges (${platformChargesPer}%)`,platformCharges)}
       {SummaryDetials(`VAT(${vatPer}%) on Platform Charge`,vat)}
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
        {/* <View style={{ backgroundColor: colors.white, height: mvs(88) }}>
          <TouchableOpacity
            // onPress={() => setPayemnetModal(true)}
            onPress={() => payNow()}
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
              Pay Now
            </Text>
          </TouchableOpacity>
        </View> */}


<View
        style={{
          backgroundColor: colors.white,
          height: mvs(88),
          marginHorizontal: ms(20),
          justifyContent: 'center',
        }}>
         <View
          style={{
            flexDirection: 'row',

            justifyContent: 'space-around',
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                fontSize: s(14),
                fontFamily: fonts.quicksandMedium,
                color: colors.blue,
              }}>
        Total Payble Amount
            </Text>
            <Text
              style={{
                fontSize: s(20),
                fontFamily: fonts.quicksandMedium,
                color: colors.primaryColor,
              }}>
              £{" " + totalAmount}

            </Text>
          </View>
        <TouchableOpacity
        onPress={()=>{
            props.navigation.navigate('PaymentScreen', {
                id: id,
                pay: totalAmount,
                from: 'jobPosted',
              
              });
    
        }}
        //   onPress={() =>
        //     props.navigation.navigate('BookingRequest', {
        //       name: firstName,
        //       lastName: lastName,
        //       category: category,
        //       id: id,
        //       jobTitle: jobTitleId,
        //     })
        //   }
          style={{
            borderColor: colors.primaryColor,
            backgroundColor: colors.primaryColor,

            borderWidth: ms(1),
            paddingVertical: ms(11),
            paddingHorizontal: ms(42),
            justifyContent: 'center',
            borderRadius: ms(6),
          }}>
          <Text
            style={{
              fontSize: s(18),
              color: 'white',
              textAlign: 'center',
              fontFamily: fonts.quicksandMedium,
            }}>
        Next
          </Text>
        </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginHorizontal: 10,
      marginVertical: 10,
    },
    button: {
      backgroundColor: '#00aeef',
      borderColor: 'red',
      borderWidth: 5,
      borderRadius: 15,
    },
  });
  

export default PaymentDetail;
