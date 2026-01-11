import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import {View, StyleSheet} from 'react-native';
import images from '../utils/images';
import { colors } from '../utils/colors';
import { fonts } from '../utils/font';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { userActionServices } from '../redux/userServices';
import { PAYMNET_HISTORY } from '../utils/reducerConstant';
import moment from 'moment';
const PaymentHistory = (props) => {
    const dispatch = useDispatch();
    const {navigation} = props;
    const scrollViewRef = useRef(null);
    const paymentValue = useSelector(
        state => state.paymentData,
      );
    const [updateSubData, setUpdateSubData] = useState('');
    const [addressListData, setAddressListData] = useState([]);
  
 

      // sub category render item
      const addressItemRender = ({ item, index, separators }) => {
  
        return (
          <>
            {
              item?.refund_for_booking?.length != 0?
            
            <View style={{ marginEnd: 16, flex: 1, borderWidth: 1, borderRadius: 5, padding: 10, margin: 10, borderColor: colors.grey60, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1,alignItems:'center' }}>
                    <Text style={{
                        fontSize: 16,
                        marginTop: 10,
                        color: colors.darkblue,
                        fontFamily: fonts.quicksandMedium,
                    }}>Job ID : #{item?.carer_booking_info?.care_seeker_booking_info?.job_unq_id}</Text>
                    
                    <Text style={{
                        fontSize: 16,
                        marginTop: 10,
                        color: item?.refund_for_booking?.length != 0 ?colors.darkblue: colors.darkblue,
                        fontFamily: fonts.satoshiBold,
                    }}> 
                    {/* remove /100 for refunded amount */}
                     £ { item?.refund_for_booking?.length != 0 ?item?.refund_for_booking[0]?.total_amount_refunded:item?.total_amount_paid}</Text>
                    
                </View>

                <Text style={{
                        fontSize: 16,
                        marginTop: 10,
                        color: colors.darkblue,
                        fontFamily: fonts.quicksandMedium,
                    }}>Transaction ID :<Text style={{
                      fontSize: 14,
                      marginTop: 10,
                      color: colors.grey,
                      fontFamily: fonts.quicksandMedium,
                  }}> #{item?.refund_for_booking?.length != 0?item?.refund_for_booking[0]?.refund_transaction_id:item?.transaction_id}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1,alignItems:'center' }}>
                <Text style={{
                        fontSize: 14,
                        marginTop: 10,
                        color: '#545454',
                        fontFamily: fonts.satoshiRegular,
                    }}>{item?.refund_for_booking?.length != 0?moment(item?.refund_for_booking[0]?.transaction_date_time).format('DD-MM-YYYY'): moment(item?.transaction_date_time).format('DD-MM-YYYY')}</Text>
                    
                    <Text style={{
                        fontSize: 14,
                        marginTop: 10,
                        color:'green',
                        fontFamily: fonts.quicksandMedium,
                    }}>{'Refund Credited'}</Text>
                    
                </View>
            </View >
            :<></>}
            <View style={{ marginEnd: 16, flex: 1, borderWidth: 1, borderRadius: 5, padding: 10, margin: 10, borderColor: colors.grey60, marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1,alignItems:'center' }}>
                    <Text style={{
                        fontSize: 16,
                        marginTop: 10,
                        color: colors.darkblue,
                        fontFamily: fonts.quicksandMedium,
                    }}>Job ID : #{item?.carer_booking_info?.care_seeker_booking_info?.job_unq_id}</Text>
                    
                    <Text style={{
                        fontSize: 16,
                        marginTop: 10,
                        color:  colors.darkblue,
                        fontFamily: fonts.satoshiBold,
                    }}>  £ { item?.total_amount_paid}</Text>
                    
                </View>

                <Text style={{
                        fontSize: 16,
                        marginTop: 10,
                        color: colors.darkblue,
                        fontFamily: fonts.quicksandMedium,
                    }}>Transaction ID :<Text style={{
                      fontSize: 14,
                      marginTop: 10,
                      color: colors.grey,
                      fontFamily: fonts.quicksandMedium,
                  }}> #{item?.transaction_id}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1,alignItems:'center' }}>
                <Text style={{
                        fontSize: 14,
                        marginTop: 10,
                        color: '#545454',
                        fontFamily: fonts.satoshiRegular,
                    }}>{ moment(item?.transaction_date_time).format('DD-MM-YYYY')}</Text>
                    
                    <Text style={{
                        fontSize: 14,
                        marginTop: 10,
                        color:'red',
                        fontFamily: fonts.quicksandMedium,
                    }}>{'Debited'}</Text>
                    
                </View>
            </View >
          
            </>
        );
    };
  
    const AddresAPICall = () => {
      setTimeout(() => {
       dispatch(userActionServices?.getPaymentHistory())
      }, 500);
    };
    useEffect(() => {
      AddresAPICall();
    }, []);
 
  // response service request get api and set data
  useEffect(() => {
    if (paymentValue.type === PAYMNET_HISTORY) {
      if (paymentValue?.value?.status) {
        if (
          Object.keys(paymentValue?.value).length != 0 &&
          paymentValue?.value != undefined
        ) {
       //   getInvoicedata = paymentValue?.value?.data;

          setAddressListData(paymentValue?.value?.data)

          dispatch(userActionServices.resetData());
        }
      }
    } else {
    }
  }, [paymentValue]);
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
                  fontSize:s(16),
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

              fontFamily: fonts.quicksandMedium,
            }}>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,
                alignSelf:'flex-start',
                fontFamily: fonts.quicksandMedium,
              }}
            >
              Payment History
            </Text>
          </View>
         
     
        </View>
        <View
        style={{
          marginVertical: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
        <View style={{flex:1,}} >
        <KeyboardAwareScrollView
          style={{flex:1}}
          bounces={false}
          ref={scrollViewRef}
          enableAutomaticScroll={true}
          enableOnAndroid={true}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={{
            // marginHorizontal: 16,
            flex:1,
            paddingBottom: Platform.OS == 'android' ? 10 : 0,
          }}>
  {addressListData?.length==0?
               <View style={{ alignItems: 'center', justifyContent: 'center' ,flex:1}}>
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
          
          <View style={{flex: 1}}>
        
          <FlatList
                            data={addressListData}
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={addressItemRender}
                            extraData={!updateSubData}
                        />
                
          </View>
}
        </KeyboardAwareScrollView>
      
      </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default PaymentHistory;
