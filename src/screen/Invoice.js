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
  Keyboard,
  Modal,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import images from '../utils/images';
import {fonts} from '../utils/font';
import {colors} from '../utils/colors';
import MyDropDown from '../component/MyDropDown';
import {useDispatch, useSelector} from 'react-redux';
import {userActionServices} from '../redux/userServices';
import {INVOICE_APPROVAL_LIST, OFFERDECLINEREASONS,DECLINE_INVOICE,ACCEPT_INVOICE, LOGOUT} from '../utils/reducerConstant';
import { snackbarError, snackbarSuccess } from '../utils/snackbar';

export default function Invoice(props) {
  const {navigation} = props;
  var id = props?.route?.params?.id;
  let getInvoicedata;
  const dispatch = useDispatch();
  const [rejectModal, setRejectModal] = useState(false);
  const [confirmRejectModal, setConfirmRejectModal] = useState(false);
  const [invoiceSucessfully, setInvoiceSucessfully] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [reasonId, setReasonId] = useState('');
  const [otherReasoninfo, setOtherReasonInfo] = useState(false);
  const [reasonTitlesList, setReasonTitlesList] = useState([]);
  const [reasonTitle, setReasonTitle] = useState({
    id: 0,
    title: 'Select Reason',
  });
  const [careSeekerName, setCareSeekerName] = useState('');
  const [carerrName, setCarerName] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [extraTotalHours, setExtraTotalHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [travelExpense, setTravelExpense] = useState('');
  const [anyOtherExpen, setAnyOtherExpen] = useState('');
  const [discount, setDiscount] = useState('');
  const [totalServiceCost, setTotalServiceCost] = useState('');
  const [platformCharges, setPlatFormCharges] = useState('');
  const [vat, setVat] = useState('');
  const [discountPer, setDiscountPer] = useState('');
  const [platformChargesPer, setPlatFormChargesPer] = useState('');
  const [vatPer, setVatPer] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [rating, setRating] = useState('');
  const [ratingCount, setRatingCount] = useState('');
  const [title, setTitle] = useState('');
  const [jobId, setJobId] = useState('');
  const [subTotal, setSubTotal] = useState('');
  const [ammountToPay, setAmmountToPay] = useState('');
  const [paidAmount, setPaidAmmount] = useState('');
  const [paidAmountText, setPaidAmmountText] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [invoiceTime, setInvoiceTime] = useState('');

  const invoiceApprovalListValue = useSelector(
    state => state.invoiceApprovalList,
  );
  const offerDeclineReasonData = useSelector(
    state => state.offerDeclineReasonData,
  );
  const declineInvoiceData = useSelector(
    state => state.declineInvoiceData,
  );
  const AcceptInvoiceValue = useSelector(
    state => state.AcceptInvoiceData,
  );
  useEffect(() => {
    setTimeout(() => {
      dispatch(userActionServices.getInvoiceApprovalAction(id));
    }, 100);
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  //dropdown select update function
  const handleUpdate = (rowData, type) => {
    if (type === 'reason') {
      setReasonTitle(rowData);
      setReasonId(rowData.id);
    }
  };


  // response service request get api and set data
  useEffect(() => {
    if (invoiceApprovalListValue.type === INVOICE_APPROVAL_LIST) {
      if (invoiceApprovalListValue?.value?.status) {
        if (
          Object.keys(invoiceApprovalListValue?.value).length != 0 &&
          invoiceApprovalListValue?.value != undefined
        ) {
          getInvoicedata = invoiceApprovalListValue?.value?.data;

          console.log("getInvoicedata??",getInvoicedata);
          setCareSeekerName(
            getInvoicedata?.care_seeker_user_info?.organisation_name == null
              ? getInvoicedata?.care_seeker_user_info?.first_name +
                  ' ' +
                  getInvoicedata?.care_seeker_user_info?.last_name
              : getInvoicedata?.care_seeker_user_info?.organisation_name,
          );
          setCarerName(getInvoicedata?.carer_user_info?.first_name);
          setTotalHours(getInvoicedata?.hours_of_service);
          setExtraTotalHours(getInvoicedata?.extra_hours_of_service);
          setHourlyRate(getInvoicedata?.hourly_rate);
          setTravelExpense(getInvoicedata?.travel_expenses);
          setAnyOtherExpen(getInvoicedata?.other_service_expenses);
          setPlatFormCharges(getInvoicedata?.platform_charge);
          setPlatFormChargesPer(getInvoicedata?.platform_perc);
          setVat(getInvoicedata?.vat_charge);
          setVatPer(getInvoicedata?.vat_perc);
          setDiscount(getInvoicedata?.discount_charge);
          setTotalServiceCost(getInvoicedata?.total_service_cost);
          setDiscountPer(getInvoicedata?.discount_perc);
          setTitle(getInvoicedata?.category_name);
          setJobId(getInvoicedata?.invoice_unq_id);
          setSubTotal(getInvoicedata?.sub_total_amount);
          setAmmountToPay(getInvoicedata?.amount_to_pay);
          setPaidAmmount(getInvoicedata?.paid_amount);
          setPaidAmmountText(getInvoicedata?.amount_paid_msg);
          setButtonText(getInvoicedata?.button_msg)
          setInvoiceId(getInvoicedata?.id)
          setInvoiceTime(getInvoicedata?.invoiceTime)

          dispatch(userActionServices.resetData());
        }
      }
    } else {
    }
  }, [invoiceApprovalListValue]);

  // decline reason api call
  useEffect(() => {
    let declineBody = {
      type: 7,
    };
    dispatch(userActionServices.offerDeclineReasons(declineBody));
  }, []);
  // response offerDecline api and set data
  useEffect(() => {
    if (offerDeclineReasonData.type === OFFERDECLINEREASONS) {
      if (offerDeclineReasonData?.value?.status) {
        if (
          Object.keys(offerDeclineReasonData?.value).length != 0 &&
          offerDeclineReasonData?.value != undefined
        ) {

          console.log("offerDeclineReasonData>>",offerDeclineReasonData?.value?.data);
          offerDeclineReasonData.value.data.map((v, i) => {
            let temp = {
              id: v.id,
              title: v.reason,
            };

            reasonTitlesList.push(temp);
          });
          dispatch(userActionServices.resetData());
        }
      } 
    }

    if (declineInvoiceData.type === DECLINE_INVOICE) {
      if (declineInvoiceData?.value?.status) {
        if (
          Object.keys(declineInvoiceData?.value).length != 0 &&
          declineInvoiceData?.value != undefined
        ) {
        //  props.navigation.navigate('DrawerComponent')
        navigation.reset({
          index: 0,
          routes: [{ name: 'DrawerComponent', params: { defaultIndex: 'MyBooking' } }]
      })

      setTimeout(() => {
        // snackbarError(error.response.data.Message);
        snackbarSuccess(declineInvoiceData?.value?.message);
      }, 100);
          dispatch(userActionServices.resetData());
        }
      } else {
        if (declineInvoiceData?.value?.code === LOGOUT) {
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarError(declineInvoiceData?.value?.message);
          }, 100);

      
        }
      }
    }


    if (AcceptInvoiceValue.type === ACCEPT_INVOICE) {
      if (AcceptInvoiceValue?.value?.status) {
        if (
          Object.keys(AcceptInvoiceValue?.value).length != 0 &&
          AcceptInvoiceValue?.value != undefined
        ) {
          console.log("AcceptInvoiceValue>>>",AcceptInvoiceValue?.value?.data);
          console.log(" object AcceptInvoiceValue>>>",Object(AcceptInvoiceValue?.value?.data));
          if(AcceptInvoiceValue?.value?.data=="payment_page"){
            props.navigation.navigate('PaymentScreen',{
              id:invoiceId,
              pay:ammountToPay,
              from:"Invoice"
            })
          }else if(AcceptInvoiceValue?.value?.data=="booking_page"){
            navigation.reset({
              index: 0,
              routes: [{ name: 'DrawerComponent', params: { defaultIndex: 'MyBooking' } }]
          })

          }
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarSuccess(AcceptInvoiceValue?.value?.message);
          }, 100);

          dispatch(userActionServices.resetData());
        }
      } else {
        if (AcceptInvoiceValue?.value?.code === LOGOUT) {
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarError(AcceptInvoiceValue?.value?.message);
          }, 100);

        
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [offerDeclineReasonData,declineInvoiceData,AcceptInvoiceValue]);

  const approveInvoice =()=>{
    let body={
      "id":invoiceId
  }
dispatch(userActionServices.accpettInvoiceAction(body))
  }

  const rejectInvoice = () => {

    if (reasonId == '') {
      snackbarError('select Reason');
    } else if ( otherReason == '') {
      snackbarError('select other Reason');
    } else {
    setRejectModal(false);

    setTimeout(() => {
      setConfirmRejectModal(true);
    }, 500);
  }
  };
  const rejectInvoiceAction=()=>{
      setConfirmRejectModal(false)
      let decline = {
        decline_reason_id: reasonId,
        decline_reason: otherReason,
        invoice_id: invoiceId,
      };
      console.log('decline reject', decline);
      dispatch(userActionServices.rejectInvoiceAction(decline));
  
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Modal animationType="slide" transparent={true} visible={rejectModal}>
        <View
          style={{
            flex: 1,

            bottom:
              isKeyboardVisible == true && Platform.OS === 'ios' ? 120 : 0,

            backgroundColor: colors.blue60,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: ms(360),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <ScrollView>
              <View style={{flexDirection:'row',alignSelf:'center',marginTop: mvs(25),alignItems:'center'}}>    
                          <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(22),
                  textAlign: 'center',
                  flex:1,
                  marginHorizontal: ms(34),
                  color: colors.blue,
                }}>
                Reject Invoice
              </Text>
              <TouchableOpacity onPress={()=>{
                setRejectModal(false)
              }}>
              <Image  style={{ height:24,width:24,marginRight:20}}source={images.cross}></Image>
              </TouchableOpacity>
              </View>

              <View style={{marginHorizontal: ms(16)}}>
                <View
                  style={{
                    borderBottomWidth: 4,
                    marginTop: mvs(30),

                    borderColor: colors.lightBackground,
                  }}></View>
              </View>
              <View style={{marginHorizontal: 16, marginTop: 16}}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(16),

                    flex: 1,

                    color: colors.blue,
                  }}>
                  Rejection Reason
                </Text>
                <MyDropDown
                  selected={reasonTitle}
                  itemList={reasonTitlesList}
                  placeholder={'Select Reason'}
                  onUpdate={data => handleUpdate(data, 'reason')}
                />
              </View>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(16),
                  marginHorizontal: 16,
                  flex: 1,
                  marginTop: 10,
                  color: colors.blue,
                }}>
                Rejection Detail
              </Text>
              <View
                style={{
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.lightBackground,
                  borderRadius: ms(6),
                  height: mvs(120),
                  marginHorizontal: ms(16),
                  padding: Platform.OS === 'android' ? ms(13) : ms(13),
                  marginTop: 10,
                }}>
                <TextInput
                  style={{
                    color: colors.blue,
                    fontSize: s(14),
                    flex: 1,
                    textAlignVertical: 'top',
                    fontFamily: fonts.quicksandMedium,
                  }}
                  multiline={true}
                  value={otherReason}
                  onChangeText={text => setOtherReason(text)}
                  placeholderTextColor={colors.grey}
                  placeholder="Type here..."></TextInput>
              </View>

              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <TouchableOpacity
                onPress={() => rejectInvoice()}
                style={{
                  borderColor: colors.primaryColor,
                  backgroundColor: colors.primaryColor,
                  marginHorizontal: ms(16),
                  borderWidth: ms(1),
                  paddingVertical: ms(11),
                  justifyContent: 'center',
                  borderRadius: ms(6),
                  marginVertical: mvs(15),
                }}>
                <Text
                  style={{
                    fontSize: s(18),
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Reject Invoice
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmRejectModal}>
        <View
          style={{
            flex: 1,

            bottom:
              isKeyboardVisible == true && Platform.OS === 'ios' ? 220 : 0,

            backgroundColor: colors.blue60,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: ms(440),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <ScrollView>
              <Image
                source={images.paymentunsucessfull}
                style={{
                  height: 68,
                  width: 68,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 12,
                }}></Image>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(22),
                  textAlign: 'center',
                  marginTop: mvs(25),
                  marginHorizontal: ms(34),
                  color: colors.blue,
                }}>
                Are you sure?
              </Text>

              <View style={{marginHorizontal: ms(16)}}>
                <View
                  style={{
                    borderBottomWidth: 4,
                    marginTop: mvs(30),

                    borderColor: colors.lightBackground,
                  }}></View>
              </View>
              <View style={{marginHorizontal: 16, marginTop: 16}}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(16),
                    textAlign: 'center',
                    marginTop: mvs(25),
                    marginHorizontal: ms(34),
                    color: colors.blue,
                  }}>
                  Are you sure you want to reject this Invoice?
                </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: mvs(15),
                  paddingHorizontal: mvs(15),
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                   onPress={() => 
                    
                    {setConfirmRejectModal(false)
                    setRejectModal(false)
                  
                  setReasonId('')
                  setReasonTitle(
                    {
                      id: 0,
                      title: 'Select Reason',
                    }
                  )
                  setOtherReason('')
                  }


                  }
                  style={styles.closeButton}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: fonts.quicksandMedium,
                      color: colors.white,
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => applyClickHandler()}
                  onPress={() => {
                    //setConfirmRejectModal(false);
                   rejectInvoiceAction()
                  }}
                  style={styles.appleButton}>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      fontFamily: fonts.quicksandMedium,
                      color: colors.white,
                    }}>
                    Yes,Reject
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={invoiceSucessfully}>
        <View
          style={{
            flex: 1,

            bottom:
              isKeyboardVisible == true && Platform.OS === 'ios' ? 220 : 0,

            backgroundColor: colors.blue60,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: ms(440),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <ScrollView>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(22),
                  textAlign: 'center',
                  marginTop: mvs(25),
                  marginHorizontal: ms(34),
                  color: colors.blue,
                }}>
                Invoice Rejected Successfully
              </Text>

              <View style={{marginHorizontal: ms(16)}}>
                <View
                  style={{
                    borderBottomWidth: 4,
                    marginTop: mvs(30),

                    borderColor: colors.lightBackground,
                  }}></View>
              </View>
              <View style={{marginHorizontal: 16, marginTop: 16}}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(16),
                    textAlign: 'center',
                    marginTop: mvs(25),
                    marginHorizontal: ms(34),
                    color: colors.blue,
                  }}>
                  Invoice has been rejected successfully. Your carer will send
                  the updated invoice or you can raise a ticket to our support
                  for any inconvenience.
                </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <TouchableOpacity
                onPress={() => {
                  setInvoiceSucessfully(false);
                  //props.navigation.navigate('MyBooking')
                }}
                style={{
                  borderColor: colors.primaryColor,
                  backgroundColor: colors.primaryColor,
                  marginHorizontal: ms(16),
                  borderWidth: ms(1),
                  paddingVertical: ms(11),
                  justifyContent: 'center',
                  borderRadius: ms(6),
                  marginVertical: mvs(15),
                }}>
                <Text
                  style={{
                    fontSize: s(18),
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Go to My Bookings
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
            onPress={() =>
              navigation.reset({
                            index: 0,
                            routes: [{ name: 'DrawerComponent', params: { defaultIndex: 'MyBooking' } }]
                        })
            
            }
          //  onPress={() => props.navigation.pop()}
            
            >
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
            Invoice Approval
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
          marginVertical: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            borderColor: colors.lightBackground,
            borderWidth: 2,
            marginHorizontal: ms(16),
            borderRadius: ms(10),
          }}>
          <View style={{marginHorizontal: ms(16), marginTop: mvs(16)}}>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(25),
                color: colors.blue,
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(16),
                color: colors.primaryColor,
                marginTop: mvs(10),
              }}>
              Invoice ID:- {jobId}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                Care seeker
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
                  {careSeekerName}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                Carer
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {carerrName}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                Contracted hours of service
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
                  {totalHours} Hours
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
              
                Adjustment in hours of service
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
                  {extraTotalHours} Hours
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                Hourly Rate
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
                 £ {hourlyRate} 
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                Total Service cost
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
                 £ {parseFloat(totalServiceCost).toFixed(2)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                Travel Expenses
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
                  £ {travelExpense}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                Any other service expenses
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
                £ {anyOtherExpen}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                Platform Cost ({platformChargesPer}%)
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
               £ {platformCharges}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                VAT({vatPer}%)
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
                £ {vat}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                Discount Applied ({discountPer} %)
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.green,
                  }}>
                -£ {discount}
                </Text>
              </View>
            </View>
          
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
                Subtotal
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.blue,
                  }}>
                 £ {subTotal}
                </Text>
              </View>
            </View>
          
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blueLight,
                }}>
            Pre-paid Amount
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.green,
                  }}>
                 -£ {paidAmount}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: mvs(26),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),

                  flex: 1,
                  color: colors.blue,
                }}>
              {paidAmountText}
              </Text>
              <View
                style={{
                  flexDirection: 'row',

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginHorizontal: ms(11),
                    color: colors.blackopacity,
                  }}>
                  ---
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(22),
                    flex: 1,
                    textAlign: 'right',
                    color: colors.primaryColor,
                  }}>
                £ {ammountToPay}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.lightBackground,
            marginHorizontal: ms(26),
            borderBottomEndRadius: ms(10),
            borderBottomStartRadius: ms(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: mvs(15),
              paddingHorizontal: mvs(15),
              justifyContent: 'space-between',
            }}>

              {
                invoiceTime<2 &&
                <>
                   <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setRejectModal(true)}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  color: colors.white,
                  fontFamily: fonts.quicksandMedium,
                }}>
                Reject
              </Text>
            </TouchableOpacity>
                </>
              }
              
            

            <TouchableOpacity
             // onPress={() => props.navigation.navigate('DrawerComponent')}
              onPress={() => approveInvoice()}
              style={{
                borderRadius: ms(6),
                // padding: ms(13),
                width:  invoiceTime<2 ?'48%':'98%',
                borderWidth: 1,
                height: mvs(45),
                justifyContent: 'center',
                borderColor: colors.primaryColor,
                backgroundColor: colors.primaryColor,

              }}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  color: colors.white,
                  fontFamily: fonts.quicksandMedium,
                }}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  closeButton: {
    borderRadius: ms(6),
    // padding: ms(13),
    width: '48%',
    borderWidth: 1,
    height: mvs(45),
    justifyContent: 'center',
    borderColor: colors.grey,
    backgroundColor: colors.grey,
  },
  appleButton: {
    borderRadius: ms(6),
    // padding: ms(13),
    width: '48%',
    borderWidth: 1,
    height: mvs(45),
    justifyContent: 'center',
    borderColor: colors.primaryColor,
    backgroundColor: colors.primaryColor,
  },
});
