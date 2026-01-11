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
  JOBPOSTEDLIST,
  LOGOUT,
  DECLINESERVICEAGREMENT,
  OFFERDECLINEREASONS,
  PAYMENT_DETAILS_POPUP,
  DECLINE_REASON_CARER,
  SERVICE_REQUEST_JOBS,
  CANCEL_REQUEST_SERVICE
} from '../utils/reducerConstant';
import { useIsFocused } from '@react-navigation/native';

export default function ServiceRequest(props) {
  const { navigation } = props;
  var randomUniqeId = '12345678';
  var joblist = [];
  const dispatch = useDispatch();
  const getJobPostLstData = useSelector(state => state.getJobPostData);
  const serviceRequestData = useSelector(state => state.serviceRequestData);

  const isLoadingValue = useSelector(state => state.isLoading);
  const paymentDetails = useSelector(state => state.paymentDetails);
  const cancelRequestServiceData = useSelector(state => state.cancelRequestServiceData);
  const declineReasonCarerData = useSelector(
    state => state.declineReasonCarerData,
  );
  const paymentDetailData = useSelector(state => state.paymentDetailData);

  const offerDeclineReasonData = useSelector(
    state => state.offerDeclineReasonData,
  );
 
  const declineSericeAgrementList = useSelector(
    state => state.declineSericeAgrementList,
  );

  const [jobsearchList, setJobSearchList] = useState([]);
  console.log("  jobsearchList.length ",  jobsearchList.length);
  const [rejectModal, setReasonModal] = useState(false);
  const [cancelRequestModal, setCancelRequestModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [paymentDetailModal, setPaymentDetailModal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [otherReason, setOtherReason] = useState('');
  const [jobUniqueID, setJobUniqueID] = useState('');
  const [filterArray, setFilterArray] = useState([]);
  const [viewDeclineReasonModal, setViewDeclineReasonModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  const [updateAppliedJobsist, setUpdateAppliedJobList] = useState(false);
  // payment detail popup
  const [paidBy, setPaidBy] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [totalAmountPaid, setTtotalAmountPaid] = useState('');
  const [transactionTime, setTransactionTime] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [paymentID, setPaymentId] = useState('');

  //
  const [offerDeclineType, setofferDeclineType] = useState('')
  const [cancalType, setCancalType] = useState('')
  const [otherReasoninfo, setOtherReasonInfo] = useState(false);
  const [declineCarerId, setDeclineCarerId] = useState('');
 
  const [reasonId, setReasonId] = useState('');
  const [reasonTitle, setReasonTitle] = useState({
    id: 0,
    title: 'Select Reason',
  });
  const [reasonTitlesList, setReasonTitlesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [issDataLoad, setIsDataLoad] = useState(0);
  const [dates, setDates] = useState([]);

  const [updateFilter, setUpdateFilter] = useState();
  const [filterList, setFilterList] = useState([
    {
      id: 1,
      title: 'Sent Job Offer',
      type: 'radio',
      select: 'MultipleSelect',
      apiSendKey: 'sent_job_offer',
      isSelected: false,
    },
    {
      id: 2,
      title: 'Received Service Agreement',
      type: 'radio',
      select: 'MultipleSelect',
      apiSendKey: 'received_service_agreement',
      isSelected: false,
    },

    {
      id: 3,
      title: 'Confirmed Jobs',
      type: 'radio',
      select: 'MultipleSelect',
      apiSendKey: 'confirmed_jobs',
      isSelected: false,
    },
    {
      id: 4,
      title: 'Pending Jobs',
      type: 'radio',
      select: 'MultipleSelect',
      apiSendKey: 'pending_jobs',
      isSelected: false,
    },
    {
      id: 5,
      title: 'Declined Jobs',
      type: 'radio',
      select: 'MultipleSelect',
      apiSendKey: 'declined_jobs',
      isSelected: false,
    },
  ]);
  const [isDataBlank, setIsDataBlank] = useState(0);
  console.log("isdatablanlkkk??????????", isDataBlank);
  const focused = useIsFocused();
  const declineModalFun = item => {
    console.log('declineModalFun>>>item', item);
    console.log('  item?.last_carer_booking?.offer_decline_reason_id ',   item?.last_carer_booking?.offer_decline_reason_id );
    if (
      item?.last_carer_booking?.offer_decline_reason_id == 2 ||
      item?.last_carer_booking?.offer_decline_reason_id == 4 ||
      item?.last_carer_booking?.offer_decline_reason_id == 6
    ) {
      setDeclineReason(item?.last_carer_booking?.reason);

      setViewDeclineReasonModal(true);
    } else {
      setDeclineReason(item?.last_carer_booking?.decline_reason_info?.reason);
      setViewDeclineReasonModal(true);
    }
  };
  // response get api and set data
  useEffect(() => {
    if (declineReasonCarerData.type === DECLINE_REASON_CARER) {
      if (declineReasonCarerData?.value?.status) {
        if (
          Object.keys(declineReasonCarerData?.value).length != 0 &&
          declineReasonCarerData?.value != undefined
        ) {
          console.log(
            'declineReasonCarerData.value.data.data',
            declineReasonCarerData.value.data.data,
          );
          setDeclineReason(declineReasonCarerData.value.data.declined_reason);
          setViewDeclineReasonModal(true);
          dispatch(userActionServices.resetData());
          //setJobSearchList(jobPostedListTemp)
        }
      }
    } else {
    }
  }, [declineReasonCarerData]);
  
  const paymentDetail = item => {
    setTimeout(() => {
      setPaymentDetailModal(true);
    }, 800);

    console.log('item.payment_id', item.payment_id);
    dispatch(userActionServices.paymentDetail(item?.payment_id));
  };

  const paymentDetailMyBooking = item => {
    console.log('item.payment_id', item?.job_payment_info?.id);
    dispatch(userActionServices.paymentDetail(item?.job_payment_info[0].id));
    setTimeout(() => {
      setPaymentDetailModal(true);
    }, 800);

   
   
  };
  const cancelRequestFun = (item, type) => {
 
    setCancelRequestModal(true)
    setCancalType(type)
    setDeclineCarerId(item?.carer_bookings_request[0]?.id)
    // setDeclineCarerId(type =="withoutProposal"?item?.carer_bookings_request_rejected[0]?.carer_user_info?.id:item?.carer_bookings_request[0]?.carer_user_info?.id);
  
    let declineBody = {
      type: 5,
    };
    console.log("declineType>>>>>>:", declineBody)
    dispatch(userActionServices.offerDeclineReasons(declineBody));
  }
  const cancelRequestAgreementFun = (item, type) => {
    console.log("decline id", item?.carer_bookings_request[0]?.id);
    setCancelRequestModal(true)
    setCancalType(type)
    setDeclineCarerId(item?.carer_bookings_request[0]?.id)
    //setDeclineCarerId(type =="withoutProposal"?item?.carer_bookings_request_rejected[0]?.carer_user_info?.id:item?.carer_bookings_request[0]?.carer_user_info?.id);
   
    let declineBody = {
      type: 5,
    };
    console.log("declineType:>>>>>>>>>>>>", declineBody)
    dispatch(userActionServices.offerDeclineReasons(declineBody));
  }

  const jobPostedRenderItem = ({ item, index, separators }) => {
   console.log("service Request Item>>>",item);

    return (
      <>


        {item?.last_carer_booking ?
          <View
            // onPress={() => props.navigation.navigate('CarerDetail')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 10,

              backgroundColor: colors.white,
              marginVertical: ms(10),
              borderColor: colors.lightBackground,
            }}>
            <View style={{ marginTop: mvs(15), marginLeft: ms(15) }}>
{/* 
              <View
                style={{
                  flexDirection: 'row',
                  marginEnd: ms(16),
                  alignItems: 'center',

                  flex: 1,
                  justifyContent: 'space-between',


                }}>
  
                <TouchableOpacity
                  style={{ flex: 1, marginEnd: ms(10) }}
                  onPress={() =>
                    props.navigation.navigate('JobDetails', {
                      id: item.id,
                      from: "serviceRequest"
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.blue,
                      fontFamily: fonts.quicksandMedium,
                    }}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.job_title}
                  </Text>
                </TouchableOpacity

                >
                <TouchableOpacity

                  onPress={() =>
                    props.navigation.navigate('ChatScreen', {
                      carerData: {
                        id: item?.last_carer_booking?.apply_by_carer_user_id,
                        name: item?.last_carer_booking
                          ?.carer_user_info?.first_name,
                        image: item?.last_carer_booking
                          ?.carer_user_info?.profile_image,
                        title: item?.category_info?.category_name
                      },
                    })
                  }
                  style={{
                    borderWidth: 1,
                    borderRadius: ms(12.5),
                    flexDirection: 'row',


                    paddingHorizontal: ms(4),
                    paddingVertical: ms(4),
                    alignItems: 'center',
                    backgroundColor: colors.primaryColor,
                    borderColor: colors.primaryColor,
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: fonts.quicksandBold,
                      fontSize: s(9),
                    }}>
                    Chat with Carer
                  </Text>
                  <Image
                    source={images.chatSign}
                    style={{
                      height: mvs(18),
                      width: mvs(18),
                      marginStart: ms(2),
                      resizeMode: 'contain',
                    }}></Image>
                </TouchableOpacity>
              </View> */}

<View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
           
          }}>
          <TouchableOpacity   style={{ flex: 1, marginEnd: ms(10) }}
                  onPress={() =>
                    props.navigation.navigate('JobDetails', {
                      id: item.id,
                      from: "serviceRequest"
                    })
                  }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={() =>
              props.navigation.navigate('ChatScreen', {
                carerData: {
                  id: item?.last_carer_booking?.apply_by_carer_user_id,
                  name: item?.last_carer_booking
                    ?.carer_user_info?.first_name,
                  image: item?.last_carer_booking
                    ?.carer_user_info?.profile_image,
                  title: item?.category_info?.category_name
                },
              })
            }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.last_carer_booking
                    ?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>
              <View style={{ flexDirection: 'row', marginTop: mvs(5) }}>
                {item?.job_unq_id === null ? (
                  <></>
                ) : (
                  <Text
                    style={{
                      fontSize: s(14),
                      color: colors.primaryColor,
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    Job ID:- {item?.job_unq_id}
                  </Text>
                )}
              </View>


            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(16),
                marginLeft: mvs(16),
              }}>
              <Image
                source={{
                  uri:
                    Image_URL +
                    item?.last_carer_booking?.carer_user_info
                      ?.profile_image,
                }}
                style={{
                  height: mvs(80),
                  width: mvs(80),
                  resizeMode: 'stretch',
                  borderWidth: 1,
                  borderRadius: ms(80),
                  borderColor: colors.lightBackground,
                }}></Image>

              <View
                style={{
                  flexDirection: 'column',
                  marginHorizontal: ms(14),

                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: s(18),
                    color: colors.blue,

                    width: ms(160),
                    fontFamily: fonts.quicksandMedium,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">

                  {item?.last_carer_booking?.carer_user_info?.first_name +
                    ' ' +
                    item?.last_carer_booking?.carer_user_info?.last_name}
                </Text>
                {/* <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: s(14),
                      color: colors.blueLight,
                      marginTop: ms(5),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    {item?.category_info?.category_name}
                  </Text>

                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: ms(10),
                  }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image
                      source={images.calenders}
                      style={{
                        height: mvs(20),
                        width: mvs(19),
                        resizeMode: 'contain',
                      }}></Image>
                    <Text
                      style={{
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                        color: colors.blueLight,
                        marginLeft: ms(10),
                      }}>
                      {/* {parseInt(item.carer_user_info.user_meta_info.distance).toFixed(2)} Miles Away */}
                      {/* {parseInt(
                   item?.carer_booking_job_offer_processing?.carer_user_info
                     ?.user_meta_info.distance,
                 )}{' '}
                 Miles Away */}
                      {item.daterange}
                      <Text style={{
                      fontSize: s(14),
                      fontFamily: fonts.quicksandMedium,
                      color: colors.blueLight,

                    }}>, {item?.shift_info?.shift}</Text>
                    </Text>
                   
                  </View>

                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: mvs(16),
                borderBottomWidth: 2,
                marginHorizontal: ms(16),

                borderColor: colors.lightBackground,
              }}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: mvs(16) }}>
              <View style={{ flexDirection: 'row', marginLeft: ms(16), alignContent: 'center' }}>
                <Text style={{ fontSize: s(14), fontFamily: fonts.quicksandMedium, color: colors.grey, alignSelf: 'center' }}>Hourly rate</Text>
                <Text style={{ fontSize: s(24), fontFamily: fonts.quicksandMedium, color: colors.darkblue, marginLeft: ms(10) }}> £ {item?.carer_bookings_request_rejected[0]?.total_price}</Text>
              </View>

              <View
                style={{
                  borderColor: colors.red,
                  borderRadius: ms(20),
                  borderWidth: 1,
                  backgroundColor: colors.redBg,
                  marginHorizontal: ms(5),
                  paddingHorizontal: ms(6),
                  alignSelf: 'center',
                  paddingVertical: ms(2),
                }}>
                <Text
                  style={{
                    color: colors.red,
                    fontSize: s(12),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Canceled
                </Text>
              </View>
            </View>


            {
              item?.last_carer_booking?.status === 10 || item?.last_carer_booking?.status === 5 ?
                <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                  <Text style={{ alignSelf: 'flex-end', marginRight: ms(10), fontSize: s(12), fontFamily: fonts.quicksandMedium, color: colors.grey }}>by Carer</Text>
                </View>
                :
                <></>
            }




            <View
              style={{
                marginTop: mvs(16),
                borderBottomWidth: 2,
                marginHorizontal: ms(16),

                borderColor: colors.lightBackground,
              }}></View>

            <View
              style={{

                paddingVertical: mvs(15),
                paddingHorizontal: mvs(15),

              }}>

              <TouchableOpacity
                onPress={() => declineModalFun(item)}
                style={{
                  borderRadius: ms(6),
                  // padding: ms(13),
                  width: '100%',
                  borderWidth: 1,
                  height: mvs(45),
                  justifyContent: 'center',
                  borderColor: colors.red,
                  backgroundColor: colors.red,
                }}>
                <Text
                  style={{
                    fontSize: s(18),
                    textAlign: 'center',
                    color: colors.white,
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  View Declined Reason
                </Text>
              </TouchableOpacity>
            </View>


          </View>

          :
          item?.carer_bookings_request[0]?.status == 0 ? (

            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: colors.white,
                marginVertical: ms(10),
                borderColor: colors.lightBackground,
              }}>


              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  marginTop: mvs(16),
                }}>
                <TouchableOpacity
                  style={{ flex: 1, marginHorizontal: ms(16) }}
                  onPress={() =>
                    props.navigation.navigate('JobDetails', {
                      id: item.id,
                      from: "serviceRequest"
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.blue,
                      fontFamily: fonts.quicksandMedium,
                    }}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.job_title}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('ChatScreen', {
                      carerData: {
                        id: item?.carer_bookings_request[0]?.apply_by_carer_user_id,
                        name: item?.carer_bookings_request[0]?.carer_user_info?.first_name,
                        image:
                          item?.carer_bookings_request[0]
                            ?.carer_user_info?.profile_image,
                        title: item?.category_info?.category_name
                      },
                    })
                  }
                  style={{
                    borderWidth: 1,
                    borderRadius: ms(12.5),
                    flexDirection: 'row',
                    paddingHorizontal: mvs(5),
                    marginHorizontal: ms(8),
                    alignItems: 'center',
                    backgroundColor: colors.primaryColor,
                    borderColor: colors.primaryColor,
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: fonts.quicksandBold,
                      fontSize: s(9),
                    }}>
                    Chat with Carer
                  </Text>
                  <Image
                    source={images.chatSign}
                    style={{
                      height: mvs(18),
                      width: mvs(18),
                      marginStart: ms(2),
                      resizeMode: 'contain',
                    }}></Image>
                </TouchableOpacity>
              </View> */}




<View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
           
          }}>
          <TouchableOpacity   style={{ flex: 1, marginHorizontal: ms(16) }}
                  onPress={() =>
                    props.navigation.navigate('JobDetails', {
                      id: item.id,
                      from: "serviceRequest"
                    })
                  }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate('ChatScreen', {
              carerData: {
                id: item?.carer_bookings_request[0]?.apply_by_carer_user_id,
                name: item?.carer_bookings_request[0]?.carer_user_info?.first_name,
                image:
                  item?.carer_bookings_request[0]
                    ?.carer_user_info?.profile_image,
                title: item?.category_info?.category_name
              },
            })
          }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.carer_bookings_request[0]?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: mvs(5),
                  marginHorizontal: ms(16),
                }}>
                {item?.job_unq_id === null ? (
                  <></>
                ) : (
                  <Text
                    style={{
                      fontSize: s(12),
                      color: colors.primaryColor,
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    Job ID:- {item?.job_unq_id}
                  </Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: mvs(16),
                  marginLeft: mvs(16),
                }}>
                <Image
                  source={{
                    uri:
                      Image_URL +
                      item?.carer_bookings_request[0]?.carer_user_info
                        ?.profile_image,
                  }}
                  style={{
                    height: mvs(80),
                    width: mvs(80),
                    resizeMode: 'stretch',
                    borderWidth: 1,
                    borderRadius: ms(80),
                    borderColor: colors.lightBackground,
                  }}></Image>

                <View
                  style={{
                    flexDirection: 'column',
                    marginHorizontal: ms(14),

                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: s(18),
                      color: colors.blue,

                      width: ms(160),
                      fontFamily: fonts.quicksandMedium,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item?.carer_bookings_request[0]?.carer_user_info
                      .first_name +
                      ' ' +
                      item.carer_bookings_request[0]?.carer_user_info
                        .last_name}
                  </Text>
                  {/* <View style={{ flexDirection: 'row' }}>

                    <Text
                      style={{
                        fontSize: s(14),
                        color: colors.blueLight,
                        marginTop: ms(5),

                        fontFamily: fonts.quicksandMedium,
                      }}>
                      {item?.category_info?.category_name}
                    </Text>
                  </View> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: ms(10),
                    }}>
                    <View style={{ flexDirection: 'row', flex: 1,}}>
                      <Image
                        source={images.calenders}
                        style={{
                          height: mvs(20),
                          width: mvs(19),
                          resizeMode: 'contain',
                        }}></Image>
                      <Text
                        style={{
                          fontSize: s(14),
                          fontFamily: fonts.quicksandMedium,
                          color: colors.blueLight,
                          marginLeft: ms(10),
                          flex:1
                        }}>
                        {item?.daterange}{' , '}{item?.shift_info?.shift}
                      </Text>
                    </View>

                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingVertical: mvs(8),
                  borderBottomWidth: 2,
                  marginHorizontal: ms(16),

                  borderColor: colors.lightBackground,
                }}></View>


              <View
                style={{
                  flexDirection: 'row',

                  marginLeft: ms(16),
                  marginVertical: ms(10),
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(14),
                      color: colors.blueLight,
                    }}>
                    Houlry rate
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(18),
                      marginLeft: ms(18),
                      color: colors.blue,
                    }}>
                    £{item?.carer_bookings_request[0]?.total_price}
                  </Text>
                </View>
                <View
                  style={{

                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderColor: colors.blueCalender,
                      borderRadius: ms(20),
                      borderWidth: 1,
                      backgroundColor: colors.progressbackground,
                      marginHorizontal: ms(10),
                      paddingHorizontal: ms(6),
                      alignSelf: 'center',
                      paddingVertical: ms(2),
                    }}>
                    <Text
                      style={{
                        color: colors.blueCalender,
                        fontSize: s(12),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Proposal Received
                    </Text>
                  </View>

                </View>
              </View>
              {item?.carer_bookings_request[0]?.status == 12 ?
                <></> :
                <>

                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: mvs(15),
                      paddingHorizontal: mvs(15),
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('ViewProposal', {
                          itemId: 86,
                          jobOfferId: item?.carer_bookings_request[0]?.apply_by_carer_user_id,
                          viewProposalId: item?.carer_bookings_request[0]?.id,
                          price: item?.carer_bookings_request[0]?.total_price,
                          from: "serviceRequest"
                        });
                      }}
                      style={{
                        borderRadius: ms(6),

                        width: '48%',
                        borderWidth: 1,
                        height: mvs(45),
                        justifyContent: 'center',
                        borderColor: colors.green,
                        backgroundColor: colors.green,
                      }}>
                      <Text
                        style={{
                          fontSize: s(16),
                          textAlign: 'center',
                          color: colors.white,

                          fontFamily: fonts.quicksandMedium,
                        }}>
                        View Proposal
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => cancelRequestFun(item, "proposal")}
                      style={{
                        borderRadius: ms(6),
                        // padding: ms(13),
                        width: '48%',
                        borderWidth: 1,
                        height: mvs(45),
                        justifyContent: 'center',
                        borderColor: colors.grey,
                        backgroundColor: colors.grey,
                      }}>
                      <Text
                        style={{
                          fontSize: s(16),
                          textAlign: 'center',
                          color: colors.white,
                          fontFamily: fonts.quicksandMedium,
                        }}>
                        Cancel Request
                      </Text>
                    </TouchableOpacity>
                  </View>

                </>
              }
            </View>

          ) :
            item?.carer_bookings_request[0]?.status == 13 ? (

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: colors.white,
                  marginVertical: ms(10),
                  borderColor: colors.lightBackground,
                }}>


                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    marginTop: mvs(16),
                  }}>
                  <TouchableOpacity
                    style={{ flex: 1, marginHorizontal: ms(16) }}
                    onPress={() =>
                      props.navigation.navigate('JobDetails', {
                        id: item.id,
                        from: "serviceRequest"
                      })
                    }>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {item.job_title}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('ChatScreen', {
                        carerData: {
                          id: item?.carer_bookings_request[0]?.apply_by_carer_user_id,
                          name: item?.carer_bookings_request[0]?.carer_user_info?.first_name,
                          image:
                            item?.carer_bookings_request[0]
                              ?.carer_user_info?.profile_image,
                          title: item?.category_info?.category_name
                        },
                      })
                    }
                    style={{
                      borderWidth: 1,
                      borderRadius: ms(12.5),
                      flexDirection: 'row',
                      paddingHorizontal: mvs(5),
                      marginHorizontal: ms(8),
                      alignItems: 'center',
                      backgroundColor: colors.primaryColor,
                      borderColor: colors.primaryColor,
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: fonts.quicksandBold,
                        fontSize: s(9),
                      }}>
                      Chat with Carer
                    </Text>
                    <Image
                      source={images.chatSign}
                      style={{
                        height: mvs(18),
                        width: mvs(18),
                        marginStart: ms(2),
                        resizeMode: 'contain',
                      }}></Image>
                  </TouchableOpacity>
                </View> */}

<View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
         
          }}>
          <TouchableOpacity    style={{ flex: 1, marginHorizontal: ms(16) }}
                    onPress={() =>
                      props.navigation.navigate('JobDetails', {
                        id: item.id,
                        from: "serviceRequest"
                      })
                    }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ChatScreen', {
                carerData: {
                  id: item?.carer_bookings_request[0]?.apply_by_carer_user_id,
                  name: item?.carer_bookings_request[0]?.carer_user_info?.first_name,
                  image:
                    item?.carer_bookings_request[0]
                      ?.carer_user_info?.profile_image,
                  title: item?.category_info?.category_name
                },
              })
            }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.carer_bookings_request[0]?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>


                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(5),
                    marginHorizontal: ms(16),
                  }}>
                  {item?.job_unq_id === null ? (
                    <></>
                  ) : (
                    <Text
                      style={{
                        fontSize: s(12),
                        color: colors.primaryColor,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                     Job ID:- {item?.job_unq_id}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(16),
                    marginLeft: mvs(16),
                  }}>
                  <Image
                    source={{
                      uri:
                        Image_URL +
                        item?.carer_bookings_request[0]?.carer_user_info
                          ?.profile_image,
                    }}
                    style={{
                      height: mvs(80),
                      width: mvs(80),
                      resizeMode: 'stretch',
                      borderWidth: 1,
                      borderRadius: ms(80),
                      borderColor: colors.lightBackground,
                    }}></Image>

                  <View
                    style={{
                      flexDirection: 'column',
                      marginHorizontal: ms(14),

                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,

                        width: ms(160),
                        fontFamily: fonts.quicksandMedium,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item?.carer_bookings_request[0]?.carer_user_info
                        .first_name +
                        ' ' +
                        item.carer_bookings_request[0]?.carer_user_info
                          .last_name}
                    </Text>
                    {/* <View style={{ flexDirection: 'row' }}>

                      <Text
                        style={{
                          fontSize: s(14),
                          color: colors.blueLight,
                          marginTop: ms(5),

                          fontFamily: fonts.quicksandMedium,
                        }}>
                        {item?.category_info?.category_name}
                      </Text>
                    </View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: ms(10),
                      }}>
                      <View style={{ flexDirection: 'row', flex: 1,}}>
                        <Image
                          source={images.calenders}
                          style={{
                            height: mvs(20),
                            width: mvs(19),
                            resizeMode: 'contain',
                          }}></Image>
                        <Text
                          style={{
                            fontSize: s(14),
                            fontFamily: fonts.quicksandMedium,
                            color: colors.blueLight,
                            marginLeft: ms(10),
                            flex:1
                          }}>
                          {item?.daterange}{' , '}{item?.shift_info?.shift}
                        </Text>
                      </View>

                    </View>
                  </View>
                </View>
                <View
                  style={{
                    paddingVertical: mvs(8),
                    borderBottomWidth: 2,
                    marginHorizontal: ms(16),

                    borderColor: colors.lightBackground,
                  }}></View>


                <View
                  style={{
                    flexDirection: 'row',

                    marginLeft: ms(16),
                    marginVertical: ms(10),
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.quicksandMedium,
                        fontSize: s(14),
                        color: colors.blueLight,
                      }}>
                      Houlry rate
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.quicksandMedium,
                        fontSize: s(18),
                        marginLeft: ms(18),
                        color: colors.blue,
                      }}>
                      £{item?.carer_bookings_request[0]?.status==13?item?.carer_bookings_request[0]?.old_total_price:item?.carer_bookings_request[0]?.total_price}
                    </Text>
                  </View>
                  <View
                    style={{

                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderColor: colors.orange,
                        borderRadius: ms(20),
                        borderWidth: 1,
                        backgroundColor: colors.ornageBackground,
                        marginHorizontal: ms(10),
                        paddingHorizontal: ms(6),
                        alignSelf: 'center',
                        paddingVertical: ms(2),
                      }}>
                      <Text
                        style={{
                          color: colors.orange,
                          fontSize: s(12),
                          fontFamily: fonts.quicksandMedium,
                        }}>
                     Under negotiation
                      </Text>
                    </View>

                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: mvs(15),
                    paddingHorizontal: mvs(15),
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ViewJobOffer', {
                        viewJobOfferId: item?.carer_bookings_request[0].id,
                        from: 'serviceRequest'
                      });
                    }}
                    style={{
                      borderRadius: ms(6),

                      width: '48%',
                      borderWidth: 1,
                      height: mvs(45),
                      justifyContent: 'center',
                      borderColor: colors.green,
                      backgroundColor: colors.green,
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),
                        textAlign: 'center',
                        color: colors.white,

                        fontFamily: fonts.quicksandMedium,
                      }}>
                      View Sent Offer
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => cancelRequestFun(item, "offer")}
                    style={{
                      borderRadius: ms(6),
                      // padding: ms(13),
                      width: '48%',
                      borderWidth: 1,
                      height: mvs(45),
                      justifyContent: 'center',
                      borderColor: colors.grey,
                      backgroundColor: colors.grey,
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),
                        textAlign: 'center',
                        color: colors.white,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Cancel Request
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            ) : item?.carer_bookings_request[0]?.status == 14 ? (

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: colors.white,
                  marginVertical: ms(10),
                  borderColor: colors.lightBackground,
                }}>


                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    marginTop: mvs(16),
                  }}>
                  <TouchableOpacity
                    style={{ flex: 1, marginHorizontal: ms(16) }}
                    onPress={() =>
                      props.navigation.navigate('JobDetails', {
                        id: item.id,
                        from: "serviceRequest"
                      })
                    }>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {item.job_title}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('ChatScreen', {
                        carerData: {
                          id: item?.carer_bookings_request[0]?.apply_by_carer_user_id,
                          name: item?.carer_bookings_request[0]?.carer_user_info?.first_name,
                          image:
                            item?.carer_bookings_request[0]
                              ?.carer_user_info?.profile_image,
                          title: item?.category_info?.category_name
                        },
                      })
                    }
                    style={{
                      borderWidth: 1,
                      borderRadius: ms(12.5),
                      flexDirection: 'row',
                      paddingHorizontal: mvs(5),
                      marginHorizontal: ms(8),
                      alignItems: 'center',
                      backgroundColor: colors.primaryColor,
                      borderColor: colors.primaryColor,
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: fonts.quicksandBold,
                        fontSize: s(9),
                      }}>
                      Chat with Carer
                    </Text>
                    <Image
                      source={images.chatSign}
                      style={{
                        height: mvs(18),
                        width: mvs(18),
                        marginStart: ms(2),
                        resizeMode: 'contain',
                      }}></Image>
                  </TouchableOpacity>
                </View> */}

<View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
          
          }}>
          <TouchableOpacity 
            style={{ flex: 1, marginHorizontal: ms(16) }}
                    onPress={() =>
                      props.navigation.navigate('JobDetails', {
                        id: item.id,
                        from: "serviceRequest"
                      })
                    }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate('ChatScreen', {
              carerData: {
                id: item?.carer_bookings_request[0]?.apply_by_carer_user_id,
                name: item?.carer_bookings_request[0]?.carer_user_info?.first_name,
                image:
                  item?.carer_bookings_request[0]
                    ?.carer_user_info?.profile_image,
                title: item?.category_info?.category_name
              },
            })
          }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.carer_bookings_request[0]?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>


                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(5),
                    marginHorizontal: ms(16),
                  }}>
                  {item?.job_unq_id === null ? (
                    <></>
                  ) : (
                    <Text
                      style={{
                        fontSize: s(12),
                        color: colors.primaryColor,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Job ID:- {item?.job_unq_id}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(16),
                    marginLeft: mvs(16),
                  }}>
                  <Image
                    source={{
                      uri:
                        Image_URL +
                        item?.carer_bookings_request[0]?.carer_user_info
                          ?.profile_image,
                    }}
                    style={{
                      height: mvs(80),
                      width: mvs(80),
                      resizeMode: 'stretch',
                      borderWidth: 1,
                      borderRadius: ms(80),
                      borderColor: colors.lightBackground,
                    }}></Image>

                  <View
                    style={{
                      flexDirection: 'column',
                      marginHorizontal: ms(14),

                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,

                        width: ms(160),
                        fontFamily: fonts.quicksandMedium,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {item?.carer_bookings_request[0]?.carer_user_info
                        .first_name +
                        ' ' +
                        item.carer_bookings_request[0]?.carer_user_info
                          .last_name}
                    </Text>
                    {/* <View style={{ flexDirection: 'row' }}>

                      <Text
                        style={{
                          fontSize: s(14),
                          color: colors.blueLight,
                          marginTop: ms(5),

                          fontFamily: fonts.quicksandMedium,
                        }}>
                        {item?.category_info?.category_name}
                      </Text>
                    </View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: ms(10),
                       
                
                      }}>
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Image
                          source={images.calenders}
                          style={{
                            height: mvs(20),
                            width: mvs(19),
                            resizeMode: 'contain',
                          }}></Image>
                        <Text
                          style={{
                            fontSize: s(14),
                            fontFamily: fonts.quicksandMedium,
                            color: colors.blueLight,
                            flex:1,
                            marginLeft: ms(10),
                          }}>
                          {item?.daterange}{' , '}{item?.shift_info?.shift}
                        </Text>
                      </View>

                    </View>
                  </View>
                </View>
                <View
                  style={{
                    paddingVertical: mvs(8),
                    borderBottomWidth: 2,
                    marginHorizontal: ms(16),

                    borderColor: colors.lightBackground,
                  }}></View>


                <View
                  style={{
                    flexDirection: 'row',

                    marginLeft: ms(16),
                    marginVertical: ms(10),
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.quicksandMedium,
                        fontSize: s(14),
                        color: colors.blueLight,
                      }}>
                      Houlry rate
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.quicksandMedium,
                        fontSize: s(18),
                        marginLeft: ms(18),
                        color: colors.blue,
                      }}>
                      £{item?.carer_bookings_request[0]?.total_price}
                    </Text>
                  </View>
                  <View
                    style={{

                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderColor: colors.green,
                        borderRadius: ms(20),
                        borderWidth: 1,
                        backgroundColor: colors.greenBg,
                        marginHorizontal: ms(10),
                        paddingHorizontal: ms(6),
                        alignSelf: 'center',
                        paddingVertical: ms(2),
                      }}>
                      <Text
                        style={{
                          color: colors.green,
                          fontSize: s(12),
                          fontFamily: fonts.quicksandMedium,
                        }}>
                      confirmed
                      </Text>
                    </View>

                  </View>
                </View>
                <View
                      style={{
                        flexDirection: 'row',
                        paddingVertical: mvs(15),
                        paddingHorizontal: mvs(15),
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          console.log("item?.carer_booking_request[0]",item.carer_bookings_request[0].id);
                          props.navigation.navigate('ViewServiceAgreement', {
                            ViewServiceAgreement:
                            item.carer_bookings_request[0].id,
                            key: 'confirmed',
                            paymentSummary:item?.id,
                            name:item?.category_info?.category_name,
from:'request',
                          });
                        }}
                        style={{
                          borderRadius: ms(6),

                          width: '48%',
                          borderWidth: 1,
                          height: mvs(45),
                          justifyContent: 'center',
                          borderColor: colors.green,
                          backgroundColor: colors.green,
                        }}>
                        <Text
                          style={{
                            fontSize: s(16),
                            textAlign: 'center',
                            color: colors.white,

                            fontFamily: fonts.quicksandMedium,
                          }}>
                          View Agreement
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => paymentDetailMyBooking(item)}
                        style={{
                          borderRadius: ms(6),
                          // padding: ms(13),
                          width: '48%',
                          borderWidth: 1,
                          height: mvs(45),
                          justifyContent: 'center',
                          borderColor: colors.grey,
                          backgroundColor: colors.grey,
                        }}>
                        <Text
                          style={{
                            fontSize: s(16),
                            textAlign: 'center',
                            color: colors.white,
                            fontFamily: fonts.quicksandMedium,
                          }}>
                          Payment Details
                        </Text>
                      </TouchableOpacity>
                    </View> 
              </View>

            ) :

              item?.carer_booking_job_offer_processing2 === null ?
                <View
                  // onPress={() => props.navigation.navigate('CarerDetail')}
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 10,

                    backgroundColor: colors.white,
                    marginVertical: ms(10),
                    borderColor: colors.lightBackground,
                  }}>
                  <View style={{ marginTop: mvs(15), marginLeft: ms(15) }}>
{/* 
                    <View
                      style={{
                        flexDirection: 'row',
                        marginEnd: ms(16),
                        alignItems: 'center',

                        flex: 1,
                        justifyContent: 'space-between',


                      }}>
                      
                      <TouchableOpacity
                        style={{ flex: 1, marginEnd: ms(10) }}
                        onPress={() =>
                          props.navigation.navigate('JobDetails', {
                            id: item.id,
                            from: "serviceRequest"
                          })
                        }>
                        <Text
                          style={{
                            fontSize: 16,
                            color: colors.blue,
                            fontFamily: fonts.quicksandMedium,
                          }}
                          numberOfLines={2}
                          ellipsizeMode="tail">
                          {item.job_title}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('ChatScreen', {
                            carerData: {
                              id: item?.carer_bookings_request[0]?.apply_by_carer_user_id,
                              name: item?.carer_bookings_request[0]
                                ?.carer_user_info?.first_name,
                              image:
                                item?.carer_bookings_request[0]
                                  ?.carer_user_info?.profile_image,
                              title: item?.category_info?.category_name
                            },
                          })
                        }
                        style={{
                          borderWidth: 1,
                          borderRadius: ms(12.5),
                          flexDirection: 'row',


                          paddingHorizontal: ms(4),
                          paddingVertical: ms(4),
                          alignItems: 'center',
                          backgroundColor: colors.primaryColor,
                          borderColor: colors.primaryColor,
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontFamily: fonts.quicksandBold,
                            fontSize: s(9),
                          }}>
                          Chat with Carer
                        </Text>
                        <Image
                          source={images.chatSign}
                          style={{
                            height: mvs(18),
                            width: mvs(18),
                            marginStart: ms(2),
                            resizeMode: 'contain',
                          }}></Image>
                      </TouchableOpacity>
                    </View> */}

<View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
           
          }}>
          <TouchableOpacity 
           style={{ flex: 1, marginEnd: ms(10) }}
           onPress={() =>
             props.navigation.navigate('JobDetails', {
               id: item.id,
               from: "serviceRequest"
             })
           }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate('ChatScreen', {
              carerData: {
                id: item?.carer_bookings_request[0]?.apply_by_carer_user_id,
                name: item?.carer_bookings_request[0]
                  ?.carer_user_info?.first_name,
                image:
                  item?.carer_bookings_request[0]
                    ?.carer_user_info?.profile_image,
                title: item?.category_info?.category_name
              },
            })
          }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.carer_bookings_request[0]
                  ?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>

                    <View style={{ flexDirection: 'row', marginTop: mvs(5) }}>
                      {item?.job_unq_id === null ? (
                        <></>
                      ) : (
                        <Text
                          style={{
                            fontSize: s(14),
                            color: colors.primaryColor,
                            fontFamily: fonts.quicksandMedium,
                          }}>
                          Job ID:- {item?.job_unq_id}
                        </Text>
                      )}
                    </View>


                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: mvs(16),
                      marginLeft: mvs(16),
                    }}>
                    {
                      item?.carer_bookings_request_rejected[0]?.status === 4 ?
                        <Image
                          source={{
                            uri:
                              Image_URL +
                              item?.carer_bookings_request_rejected[0]?.carer_user_info
                                ?.profile_image
                          }}
                          style={{
                            height: mvs(80),
                            width: mvs(80),
                            resizeMode: 'stretch',
                            borderWidth: 1,
                            borderRadius: ms(80),
                            borderColor: colors.lightBackground,
                          }}></Image>
                        :
                        <Image
                          source={{
                            uri:
                              Image_URL +

                              item?.carer_bookings_request[0]?.carer_user_info
                                ?.profile_image,
                          }}
                          style={{
                            height: mvs(80),
                            width: mvs(80),
                            resizeMode: 'stretch',
                            borderWidth: 1,
                            borderRadius: ms(80),
                            borderColor: colors.lightBackground,
                          }}></Image>
                    }


                    <View
                      style={{
                        flexDirection: 'column',
                        marginHorizontal: ms(14),

                        flex: 1,
                      }}>
                      <Text
                        style={{
                          fontSize: s(18),
                          color: colors.blue,

                          width: ms(160),
                          fontFamily: fonts.quicksandMedium,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail">

                        {item?.carer_bookings_request_rejected[0]?.status === 4 ? item?.carer_bookings_request_rejected[0]?.carer_user_info
                          .first_name +
                          ' ' +
                          item.carer_bookings_request_rejected[0]?.carer_user_info
                            .last_name
                          :
                          item?.carer_bookings_request[0]?.carer_user_info
                            .first_name +
                          ' ' +
                          item.carer_bookings_request[0]?.carer_user_info
                            .last_name

                        }
                      </Text>
                      {/* <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontSize: s(14),
                            color: colors.blueLight,
                            marginTop: ms(5),
                            fontFamily: fonts.quicksandMedium,
                          }}>
                          {item?.category_info?.category_name}
                        </Text>

                      </View> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: ms(10),
                        }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                          <Image
                            source={images.calenders}
                            style={{
                              height: mvs(20),
                              width: mvs(19),
                              resizeMode: 'contain',
                            }}></Image>
                          <Text
                            style={{
                              fontSize: s(14),
                              fontFamily: fonts.quicksandMedium,
                              color: colors.blueLight,
                              marginLeft: ms(10),
                        
                            }}>
                            {/* {parseInt(item.carer_user_info.user_meta_info.distance).toFixed(2)} Miles Away */}
                            {/* {parseInt(
                          item?.carer_booking_job_offer_processing?.carer_user_info
                            ?.user_meta_info.distance,
                        )}{' '}
                        Miles Away */}
                            {item.daterange}
                            <Text style={{
                            fontSize: s(14),
                            fontFamily: fonts.quicksandMedium,
                         
                            color: colors.blueLight,

                          }}>, {item?.shift_info?.shift}</Text>
                          </Text>
                      
                        </View>

                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: mvs(16),
                      borderBottomWidth: 2,
                      marginHorizontal: ms(16),

                      borderColor: colors.lightBackground,
                    }}></View>
                  {/* fontFamily: fonts.quicksandMedium,
                          fontSize: s(18),
                          marginLeft: ms(18),
                          color: colors.blue, */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: mvs(16) }}>
                    <View style={{ flexDirection: 'row', marginLeft: ms(16), alignContent: 'center' }}>
                      <Text style={{ fontSize: s(14), fontFamily: fonts.quicksandMedium, color: colors.grey, alignSelf: 'center' }}>Hourly rate</Text>
                      <Text style={{ fontSize: s(18), fontFamily: fonts.quicksandMedium, color: colors.blue, marginLeft: ms(10) }}> £ {item?.carer_bookings_request_rejected[0]?.status === 4 ? item?.carer_bookings_request_rejected[0]?.total_price : item?.carer_bookings_request[0]?.total_price}</Text>
                    </View>
                    <View
                      style={{
                        borderColor: item?.carer_bookings_request[0]?.status == 11 || item?.carer_bookings_request[0]?.status == 12 || item?.carer_bookings_request[0]?.status == 8 || item?.carer_bookings_request[0]?.status == 4 ? colors.red : item?.carer_bookings_request[0]?.status == 15 ? colors.green : colors.orange,
                        borderRadius: ms(20),
                        borderWidth: 1,
                        backgroundColor: item?.carer_bookings_request[0]?.status == 11 || item?.carer_bookings_request[0]?.status == 12 || item?.carer_bookings_request[0]?.status == 8 || item?.carer_bookings_request[0]?.status == 4 ? colors.redBg : item?.carer_bookings_request[0]?.status == 15 ? colors.greenBg : colors.ornageBackground,
                        marginHorizontal: ms(5),
                        paddingHorizontal: ms(6),
                        alignSelf: 'center',
                        paddingVertical: ms(2),
                      }}>
                      <Text
                        style={{
                          color: item?.carer_bookings_request[0]?.status == 11 || item?.carer_bookings_request[0]?.status == 12 || item?.carer_bookings_request[0]?.status == 8 || item?.carer_bookings_request[0]?.status == 4 ? colors.red : item?.carer_bookings_request[0]?.status == 15 ? colors.green : colors.orange,
                          fontSize: 12,
                          fontFamily: fonts.quicksandMedium,
                        }}>
                        {item?.carer_bookings_request[0]?.status == 11 || item?.carer_bookings_request[0]?.status == 12 || item?.carer_bookings_request[0]?.status == 8 || item?.carer_bookings_request[0]?.status == 4 ? "Canceled by careSeeker" : item?.carer_bookings_request[0]?.status == 15 ? "Confirmed" : "Pending"}
                      </Text>
                    </View>
                  </View>

                  {
                    item?.carer_bookings_request[0]?.status == 11 || item?.carer_bookings_request[0]?.status == 12 || item?.carer_bookings_request[0]?.status == 8 || item?.carer_bookings_request[0]?.status == 4 || item?.carer_bookings_request[0]?.status == 15 ?
                      <></> :
                      <>
                        <View
                          style={{
                            marginTop: mvs(16),
                            borderBottomWidth: 2,
                            marginHorizontal: ms(16),

                            borderColor: colors.lightBackground,
                          }}></View>

                        <View
                          style={{

                            paddingVertical: mvs(15),
                            paddingHorizontal: mvs(15),

                          }}>


                          <TouchableOpacity
                            onPress={() => cancelRequestFun(item, "withoutProposal")}
                            style={{
                              borderRadius: ms(6),
                              // padding: ms(13),
                              width: '100%',
                              borderWidth: 1,
                              height: mvs(45),
                              justifyContent: 'center',
                              borderColor: colors.blueLight,
                              backgroundColor: colors.blueLight,
                            }}>
                            <Text
                              style={{
                                fontSize: s(18),
                                textAlign: 'center',
                                color: colors.white,
                                fontFamily: fonts.quicksandMedium,
                              }}>
                              Cancel Request
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                  }



                </View>
                : item?.carer_booking_job_offer_processing2?.status == 2 ? (
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      backgroundColor: colors.white,
                      marginVertical: ms(10),
                      borderColor: colors.lightBackground,
                    }}>


                    {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        marginTop: mvs(16),
                      }}>
                      <TouchableOpacity
                        style={{ flex: 1, marginHorizontal: ms(16) }}
                        onPress={() =>
                          props.navigation.navigate('JobDetails', {
                            id: item.id,
                            from: "serviceRequest"
                          })
                        }>
                        <Text
                          style={{
                            fontSize: 16,
                            color: colors.blue,
                            fontFamily: fonts.quicksandMedium,
                          }}
                          numberOfLines={2}
                          ellipsizeMode="tail">
                          {item.job_title}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('ChatScreen', {
                            carerData: {
                              id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                              name: item?.carer_booking_job_offer_processing2
                                ?.carer_user_info?.first_name,
                              image:
                                item?.carer_booking_job_offer_processing2
                                  ?.carer_user_info?.profile_image,
                              title: item?.category_info?.category_name
                            },
                          })
                        }
                        style={{
                          borderWidth: 1,
                          borderRadius: ms(12.5),
                          flexDirection: 'row',
                          paddingHorizontal: mvs(5),
                          marginHorizontal: ms(8),
                          alignItems: 'center',

                          backgroundColor: colors.primaryColor,
                          borderColor: colors.primaryColor,
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontFamily: fonts.quicksandBold,
                            fontSize: s(9),
                          }}>
                          Chat with Carer
                        </Text>
                        <Image
                          source={images.chatSign}
                          style={{
                            height: mvs(18),
                            width: mvs(18),
                            marginStart: ms(2),
                            resizeMode: 'contain',
                          }}></Image>
                      </TouchableOpacity>
                    </View> */}

<View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
       
          }}>
          <TouchableOpacity 
           style={{ flex: 1, marginHorizontal: ms(16) }}
           onPress={() =>
             props.navigation.navigate('JobDetails', {
               id: item.id,
               from: "serviceRequest"
             })
           }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate('ChatScreen', {
              carerData: {
                id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                name: item?.carer_booking_job_offer_processing2
                  ?.carer_user_info?.first_name,
                image:
                  item?.carer_booking_job_offer_processing2
                    ?.carer_user_info?.profile_image,
                title: item?.category_info?.category_name
              },
            })
          }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.carer_booking_job_offer_processing2
                  ?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>


                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: mvs(5),
                        marginHorizontal: ms(16),
                      }}>
                      {item?.job_unq_id === null ? (
                        <></>
                      ) : (
                        <Text
                          style={{
                            fontSize: s(12),
                            color: colors.primaryColor,
                            fontFamily: fonts.quicksandMedium,
                          }}>
                          Job ID:- {item?.job_unq_id}
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: mvs(16),
                        marginLeft: mvs(16),
                      }}>
                      <Image
                        source={{
                          uri:
                            Image_URL +
                            item?.carer_bookings_request[0]?.carer_user_info
                              ?.profile_image,
                        }}
                        style={{
                          height: mvs(80),
                          width: mvs(80),
                          resizeMode: 'stretch',
                          borderWidth: 1,
                          borderRadius: ms(80),
                          borderColor: colors.lightBackground,
                        }}></Image>

                      <View
                        style={{
                          flexDirection: 'column',
                          marginHorizontal: ms(14),

                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: s(18),
                            color: colors.blue,

                            width: ms(160),
                            fontFamily: fonts.quicksandMedium,
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item?.carer_bookings_request[0]?.carer_user_info
                            .first_name +
                            ' ' +
                            item.carer_bookings_request[0]?.carer_user_info
                              .last_name}
                        </Text>
                        {/* <View style={{ flexDirection: 'row' }}>

                          <Text
                            style={{
                              fontSize: s(14),
                              color: colors.blueLight,
                              marginTop: ms(5),

                              fontFamily: fonts.quicksandMedium,
                            }}>
                            {item?.category_info?.category_name}
                          </Text>
                        </View> */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: ms(10),
                          }}>
                          <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Image
                              source={images.calenders}
                              style={{
                                height: mvs(20),
                                width: mvs(19),
                                resizeMode: 'contain',
                              }}></Image>
                            <Text
                              style={{
                                fontSize: s(14),
                                fontFamily: fonts.quicksandMedium,
                                color: colors.blueLight,
                                marginLeft: ms(10),
                                flex:1
                              }}>
                              {item?.daterange}{' , '}{item?.shift_info?.shift}
                            </Text>
                          </View>

                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingVertical: mvs(8),
                        borderBottomWidth: 2,
                        marginHorizontal: ms(16),

                        borderColor: colors.lightBackground,
                      }}></View>


                    <View
                      style={{
                        flexDirection: 'row',

                        marginLeft: ms(16),
                        marginVertical: ms(10),
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontFamily: fonts.quicksandMedium,
                            fontSize: s(14),
                            color: colors.blueLight,
                          }}>
                          Houlry rate
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.quicksandMedium,
                            fontSize: s(18),
                            marginLeft: ms(18),
                            color: colors.blue,
                          }}>
                          £{item?.carer_bookings_request[0]?.total_price}
                        </Text>
                      </View>
                      <View
                        style={{

                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            borderColor: colors.green,
                            borderRadius: ms(20),
                            borderWidth: 1,
                            backgroundColor: colors.greenBg,
                            marginHorizontal: ms(10),
                            paddingHorizontal: ms(6),
                            alignSelf: 'center',
                            paddingVertical: ms(2),
                          }}>
                          <Text
                            style={{
                              color: colors.green,
                              fontSize: s(12),
                              fontFamily: fonts.quicksandMedium,
                            }}>
                            Agreement Received
                          </Text>
                        </View>

                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        paddingVertical: mvs(15),
                        paddingHorizontal: mvs(15),
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ViewServiceAgreement', {
                            ViewServiceAgreement:
                              item?.carer_booking_job_offer_processing2.id,
                            key: 'agreementRecieved',
                            paymentSummary:item?.id,
                            name:item?.category_info?.category_name,
                            from:'request'
                          });
                        }}

                        style={{
                          borderRadius: ms(6),

                          width: '48%',
                          borderWidth: 1,
                          height: mvs(45),
                          justifyContent: 'center',
                          borderColor: colors.green,
                          backgroundColor: colors.green,
                        }}>
                        <Text
                          style={{
                            fontSize: s(16),
                            textAlign: 'center',
                            color: colors.white,

                            fontFamily: fonts.quicksandMedium,
                          }}>
                          View Agreement
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => cancelRequestAgreementFun(item, "Agreement")}
                        style={{
                          borderRadius: ms(6),
                          // padding: ms(13),
                          width: '48%',
                          borderWidth: 1,
                          height: mvs(45),
                          justifyContent: 'center',
                          borderColor: colors.grey,
                          backgroundColor: colors.grey,
                        }}>
                        <Text
                          style={{
                            fontSize: s(16),
                            textAlign: 'center',
                            color: colors.white,
                            fontFamily: fonts.quicksandMedium,
                          }}>
                          Cancel Request
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : item?.carer_booking_job_offer_processing2?.status == 3 ? (
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      backgroundColor: colors.white,
                      marginVertical: ms(10),
                      borderColor: colors.lightBackground,
                    }}>


                    {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        marginTop: mvs(16),
                      }}>
                      <TouchableOpacity
                        style={{ flex: 1, marginHorizontal: ms(16) }}
                        onPress={() =>
                          props.navigation.navigate('JobDetails', {
                            id: item.id,
                            from: "serviceRequest"
                          })
                        }>
                        <Text
                          style={{
                            fontSize: 16,
                            color: colors.blue,
                            fontFamily: fonts.quicksandMedium,
                          }}
                          numberOfLines={2}
                          ellipsizeMode="tail">
                          {item.job_title}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('ChatScreen', {
                            carerData: {
                              id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                              name: item?.carer_booking_job_offer_processing2
                                ?.carer_user_info?.first_name,
                              image:
                                item?.carer_booking_job_offer_processing2
                                  ?.carer_user_info?.profile_image,
                              title: item?.category_info?.category_name
                            },
                          })
                        }
                        style={{
                          borderWidth: 1,
                          borderRadius: ms(12.5),
                          flexDirection: 'row',
                          paddingHorizontal: mvs(5),
                          marginHorizontal: ms(8),
                          alignItems: 'center',
                          backgroundColor: colors.primaryColor,
                          borderColor: colors.primaryColor,
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontFamily: fonts.quicksandBold,
                            fontSize: s(9),
                          }}>
                          Chat with Carer
                        </Text>
                        <Image
                          source={images.chatSign}
                          style={{
                            height: mvs(18),
                            width: mvs(18),
                            marginStart: ms(2),
                            resizeMode: 'contain',
                          }}></Image>
                      </TouchableOpacity>
                    </View> */}

                    <View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
           
          }}>
          <TouchableOpacity 
         style={{ flex: 1, marginHorizontal: ms(16) }}
          onPress={() =>
                          props.navigation.navigate('JobDetails', {
                            id: item.id,
                            from: "serviceRequest"
                          })
                        }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
             onPress={() =>
              props.navigation.navigate('ChatScreen', {
                carerData: {
                  id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                  name: item?.carer_booking_job_offer_processing2
                    ?.carer_user_info?.first_name,
                  image:
                    item?.carer_booking_job_offer_processing2
                      ?.carer_user_info?.profile_image,
                  title: item?.category_info?.category_name
                },
              })
            }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.carer_booking_job_offer_processing2
                    ?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>


                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: mvs(5),
                        marginHorizontal: ms(16),
                      }}>
                      {item?.job_unq_id === null ? (
                        <></>
                      ) : (
                        <Text
                          style={{
                            fontSize: s(12),
                            color: colors.primaryColor,
                            fontFamily: fonts.quicksandMedium,
                          }}>
                          Job ID:- {item?.job_unq_id}
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: mvs(16),
                        marginLeft: mvs(16),
                      }}>
                      <Image
                        source={{
                          uri:
                            Image_URL +
                            item?.carer_bookings_request[0]?.carer_user_info
                              ?.profile_image,
                        }}
                        style={{
                          height: mvs(80),
                          width: mvs(80),
                          resizeMode: 'stretch',
                          borderWidth: 1,
                          borderRadius: ms(80),
                          borderColor: colors.lightBackground,
                        }}></Image>

                      <View
                        style={{
                          flexDirection: 'column',
                          marginHorizontal: ms(14),

                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: s(18),
                            color: colors.blue,

                            width: ms(160),
                            fontFamily: fonts.quicksandMedium,
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item?.carer_bookings_request[0]?.carer_user_info
                            .first_name +
                            ' ' +
                            item.carer_bookings_request[0]?.carer_user_info
                              .last_name}
                        </Text>
                        {/* <View style={{ flexDirection: 'row' }}>

                          <Text
                            style={{
                              fontSize: s(14),
                              color: colors.blueLight,
                              marginTop: ms(5),

                              fontFamily: fonts.quicksandMedium,
                            }}>
                            {item?.category_info?.category_name}
                          </Text>
                        </View> */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: ms(10),
                          }}>
                          <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Image
                              source={images.calenders}
                              style={{
                                height: mvs(20),
                                width: mvs(19),
                                resizeMode: 'contain',
                              }}></Image>
                            <Text
                              style={{
                                fontSize: s(14),
                                fontFamily: fonts.quicksandMedium,
                                color: colors.blueLight,
                                marginLeft: ms(10),
                                flex:1
                              }}>
                              {item?.daterange}{' , '}{item?.shift_info?.shift}
                            </Text>
                          </View>

                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingVertical: mvs(8),
                        borderBottomWidth: 2,
                        marginHorizontal: ms(16),

                        borderColor: colors.lightBackground,
                      }}></View>


                    <View
                      style={{
                        flexDirection: 'row',

                        marginLeft: ms(16),
                        marginVertical: ms(10),
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontFamily: fonts.quicksandMedium,
                            fontSize: s(14),
                            color: colors.blueLight,
                          }}>
                          Houlry rate
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.quicksandMedium,
                            fontSize: s(18),
                            marginLeft: ms(18),
                            color: colors.blue,
                          }}>
                          £{item?.carer_bookings_request[0]?.total_price}
                        </Text>
                      </View>
                      <View
                        style={{

                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            borderColor: colors.green,
                            borderRadius: ms(20),
                            borderWidth: 1,
                            backgroundColor: colors.greenBg,
                            marginHorizontal: ms(10),
                            paddingHorizontal: ms(6),
                            alignSelf: 'center',
                            paddingVertical: ms(2),
                          }}>
                          <Text
                            style={{
                              color: colors.green,
                              fontSize: s(12),
                              fontFamily: fonts.quicksandMedium,
                            }}>
                            Confirmed
                          </Text>
                        </View>

                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        paddingVertical: mvs(15),
                        paddingHorizontal: mvs(15),
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ViewServiceAgreement', {
                            ViewServiceAgreement:
                              item?.carer_booking_job_offer_processing2?.id,
                            key: 'confirmed',
                            paymentSummary:item?.id,
                            name:item?.category_info?.category_name,
                            from:'request'
                          });
                        }}
                        style={{
                          borderRadius: ms(6),

                          width: '48%',
                          borderWidth: 1,
                          height: mvs(45),
                          justifyContent: 'center',
                          borderColor: colors.green,
                          backgroundColor: colors.green,
                        }}>
                        <Text
                          style={{
                            fontSize: s(16),
                            textAlign: 'center',
                            color: colors.white,

                            fontFamily: fonts.quicksandMedium,
                          }}>
                          View Agreement
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => paymentDetail(item)}
                        style={{
                          borderRadius: ms(6),
                          // padding: ms(13),
                          width: '48%',
                          borderWidth: 1,
                          height: mvs(45),
                          justifyContent: 'center',
                          borderColor: colors.grey,
                          backgroundColor: colors.grey,
                        }}>
                        <Text
                          style={{
                            fontSize: s(16),
                            textAlign: 'center',
                            color: colors.white,
                            fontFamily: fonts.quicksandMedium,
                          }}>
                          Payment Details
                        </Text>
                      </TouchableOpacity>
                    </View>


                  </View>
                ) : item?.carer_booking_job_offer_processing2?.status == 8 || item?.carer_booking_job_offer_processing2?.status == 4 ? (
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      backgroundColor: colors.white,
                      marginVertical: ms(10),
                      borderColor: colors.lightBackground,
                    }}>


                    {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        marginTop: mvs(16),
                      }}>
                      <TouchableOpacity
                        style={{ flex: 1, marginHorizontal: ms(16) }}
                        onPress={() =>
                          props.navigation.navigate('JobDetails', {
                            id: item.id,
                            from: "serviceRequest"
                          })
                        }>
                        <Text
                          style={{
                            fontSize: 16,
                            color: colors.blue,
                            fontFamily: fonts.quicksandMedium,
                          }}
                          numberOfLines={2}
                          ellipsizeMode="tail">
                          {item.job_title}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('ChatScreen', {
                            carerData: {
                              id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                              name: item?.carer_booking_job_offer_processing2
                                ?.carer_user_info?.first_name,
                              image:
                                item?.carer_booking_job_offer_processing2
                                  ?.carer_user_info?.profile_image,
                              title: item?.category_info?.category_name
                            },
                          })
                        }
                        style={{
                          borderWidth: 1,
                          borderRadius: ms(12.5),
                          flexDirection: 'row',
                          paddingHorizontal: mvs(5),
                          marginHorizontal: ms(8),
                          alignItems: 'center',
                          backgroundColor: colors.primaryColor,
                          borderColor: colors.primaryColor,
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontFamily: fonts.quicksandBold,
                            fontSize: s(9),
                          }}>
                          Chat with Carer
                        </Text>
                        <Image
                          source={images.chatSign}
                          style={{
                            height: mvs(18),
                            width: mvs(18),
                            marginStart: ms(2),
                            resizeMode: 'contain',
                          }}></Image>
                      </TouchableOpacity>
                    </View> */}

<View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
            
          }}>
          <TouchableOpacity 
           style={{ flex: 1, marginHorizontal: ms(16) }}
           onPress={() =>
             props.navigation.navigate('JobDetails', {
               id: item.id,
               from: "serviceRequest"
             })
           }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ChatScreen', {
                  carerData: {
                    id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                    name: item?.carer_booking_job_offer_processing2
                      ?.carer_user_info?.first_name,
                    image:
                      item?.carer_booking_job_offer_processing2
                        ?.carer_user_info?.profile_image,
                    title: item?.category_info?.category_name
                  },
                })
              }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.carer_booking_job_offer_processing2
                      ?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>


                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: mvs(5),
                        marginHorizontal: ms(16),
                      }}>
                      {item?.job_unq_id === null ? (
                        <></>
                      ) : (
                        <Text
                          style={{
                            fontSize: s(12),
                            color: colors.primaryColor,
                            fontFamily: fonts.quicksandMedium,
                          }}>
                          Job ID:- {item?.job_unq_id}
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: mvs(16),
                        marginLeft: mvs(16),
                      }}>
                      <Image
                        source={{
                          uri:
                            Image_URL +
                            item?.carer_booking_job_offer_processing2?.carer_user_info
                              ?.profile_image,
                        }}
                        style={{
                          height: mvs(80),
                          width: mvs(80),
                          resizeMode: 'stretch',
                          borderWidth: 1,
                          borderRadius: ms(80),
                          borderColor: colors.lightBackground,
                        }}></Image>

                      <View
                        style={{
                          flexDirection: 'column',
                          marginHorizontal: ms(14),

                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: s(18),
                            color: colors.blue,

                            width: ms(160),
                            fontFamily: fonts.quicksandMedium,
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item?.carer_booking_job_offer_processing2?.carer_user_info
                            ?.first_name
                            +
                            ' ' +
                            item?.carer_booking_job_offer_processing2?.carer_user_info
                              ?.last_name}
                        </Text>
                        {/* <View style={{ flexDirection: 'row' }}>

                          <Text
                            style={{
                              fontSize: s(14),
                              color: colors.blueLight,
                              marginTop: ms(5),

                              fontFamily: fonts.quicksandMedium,
                            }}>
                            {item?.category_info?.category_name}
                          </Text>
                        </View> */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: ms(10),
                          }}>
                          <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Image
                              source={images.calenders}
                              style={{
                                height: mvs(20),
                                width: mvs(19),
                                resizeMode: 'contain',
                              }}></Image>
                            <Text
                              style={{
                                fontSize: s(14),
                                fontFamily: fonts.quicksandMedium,
                                color: colors.blueLight,
                                marginLeft: ms(10),
                                flex:1
                              }}>
                              {item?.daterange}{' , '}{item?.shift_info?.shift}
                            </Text>
                          </View>

                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        paddingVertical: mvs(8),
                        borderBottomWidth: 2,
                        marginHorizontal: ms(16),

                        borderColor: colors.lightBackground,
                      }}></View>


                    <View
                      style={{
                        flexDirection: 'row',

                        marginLeft: ms(16),
                        marginVertical: ms(10),
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontFamily: fonts.quicksandMedium,
                            fontSize: s(14),
                            color: colors.blueLight,
                          }}>
                          Houlry rate
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.quicksandMedium,
                            fontSize: s(18),
                            marginLeft: ms(18),
                            color: colors.blue,
                          }}>
                          £ {item?.carer_booking_job_offer_processing2?.price}
                        </Text>
                      </View>
                      <View
                        style={{

                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            borderColor: colors.red,
                            borderRadius: ms(20),
                            borderWidth: 1,
                            backgroundColor: colors.redBg,
                            marginHorizontal: ms(10),
                            paddingHorizontal: ms(6),
                            alignSelf: 'center',
                            paddingVertical: ms(2),
                          }}>
                          <Text
                            style={{
                              color: colors.red,
                              fontSize: s(12),
                              fontFamily: fonts.quicksandMedium,
                            }}>
                            Cancelled by you
                          </Text>
                        </View>

                      </View>
                    </View>



                  </View>
                )
                  : item?.carer_booking_job_offer_processing2?.status == 15 || item?.carer_booking_job_offer_processing2?.status == 14  ?
                    (
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          backgroundColor: colors.white,
                          marginVertical: ms(10),
                          borderColor: colors.lightBackground,
                        }}>


                        {/* <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1,
                            marginTop: mvs(16),
                          }}>
                          <TouchableOpacity
                            style={{ flex: 1, marginHorizontal: ms(16) }}
                            onPress={() =>
                              props.navigation.navigate('JobDetails', {
                                id: item.id,
                                from: "serviceRequest"
                              })
                            }>
                            <Text
                              style={{
                                fontSize: 16,
                                color: colors.blue,
                                fontFamily: fonts.quicksandMedium,
                              }}
                              numberOfLines={2}
                              ellipsizeMode="tail">
                              {item.job_title}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('ChatScreen', {
                                carerData: {
                                  id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                                  name: item?.carer_booking_job_offer_processing2
                                    ?.carer_user_info?.first_name,
                                  image:
                                    item?.carer_booking_job_offer_processing2
                                      ?.carer_user_info?.profile_image,
                                  title: item?.category_info?.category_name
                                },
                              })
                            }
                            style={{
                              borderWidth: 1,
                              borderRadius: ms(12.5),
                              flexDirection: 'row',
                              paddingHorizontal: mvs(5),
                              marginHorizontal: ms(8),
                              alignItems: 'center',
                              backgroundColor: colors.primaryColor,
                              borderColor: colors.primaryColor,
                            }}>
                            <Text
                              style={{
                                color: colors.white,
                                fontFamily: fonts.quicksandBold,
                                fontSize: s(9),
                              }}>
                              Chat with Carer
                            </Text>
                            <Image
                              source={images.chatSign}
                              style={{
                                height: mvs(18),
                                width: mvs(18),
                                marginStart: ms(2),
                                resizeMode: 'contain',
                              }}></Image>
                          </TouchableOpacity>
                        </View> */}

<View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
           
          }}>
          <TouchableOpacity 
           style={{ flex: 1, marginHorizontal: ms(16) }}
           onPress={() =>
             props.navigation.navigate('JobDetails', {
               id: item.id,
               from: "serviceRequest"
             })
           }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ChatScreen', {
                carerData: {
                  id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                  name: item?.carer_booking_job_offer_processing2
                    ?.carer_user_info?.first_name,
                  image:
                    item?.carer_booking_job_offer_processing2
                      ?.carer_user_info?.profile_image,
                  title: item?.category_info?.category_name
                },
              })
            }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.carer_booking_job_offer_processing2
                    ?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>


                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: mvs(5),
                            marginHorizontal: ms(16),
                          }}>
                          {item?.job_unq_id === null ? (
                            <></>
                          ) : (
                            <Text
                              style={{
                                fontSize: s(12),
                                color: colors.primaryColor,
                                fontFamily: fonts.quicksandMedium,
                              }}>
                              Job ID:- {item?.job_unq_id}
                            </Text>
                          )}
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: mvs(16),
                            marginLeft: mvs(16),
                          }}>
                          <Image
                            source={{
                              uri:
                                Image_URL +
                                item?.carer_bookings_request[0]?.carer_user_info
                                  ?.profile_image,
                            }}
                            style={{
                              height: mvs(80),
                              width: mvs(80),
                              resizeMode: 'stretch',
                              borderWidth: 1,
                              borderRadius: ms(80),
                              borderColor: colors.lightBackground,
                            }}></Image>

                          <View
                            style={{
                              flexDirection: 'column',
                              marginHorizontal: ms(14),

                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: s(18),
                                color: colors.blue,

                                width: ms(160),
                                fontFamily: fonts.quicksandMedium,
                              }}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {item?.carer_bookings_request[0]?.carer_user_info
                                .first_name +
                                ' ' +
                                item.carer_bookings_request[0]?.carer_user_info
                                  .last_name}
                            </Text>
                            {/* <View style={{ flexDirection: 'row' }}>

                              <Text
                                style={{
                                  fontSize: s(14),
                                  color: colors.blueLight,
                                  marginTop: ms(5),

                                  fontFamily: fonts.quicksandMedium,
                                }}>
                                {item?.category_info?.category_name}
                              </Text>
                            </View> */}
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: ms(10),
                              }}>
                              <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Image
                                  source={images.calenders}
                                  style={{
                                    height: mvs(20),
                                    width: mvs(19),
                                    resizeMode: 'contain',
                                  }}></Image>
                                <Text
                                  style={{
                                    fontSize: s(14),
                                    fontFamily: fonts.quicksandMedium,
                                    color: colors.blueLight,
                                    marginLeft: ms(10),
                                    flex:1
                                  }}>
                                  {item?.daterange}{' , '}{item?.shift_info?.shift}
                                </Text>
                              </View>

                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            paddingVertical: mvs(8),
                            borderBottomWidth: 2,
                            marginHorizontal: ms(16),

                            borderColor: colors.lightBackground,
                          }}></View>


                        <View
                          style={{
                            flexDirection: 'row',

                            marginLeft: ms(16),
                            marginVertical: ms(10),
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontFamily: fonts.quicksandMedium,
                                fontSize: s(14),
                                color: colors.blueLight,
                              }}>
                              Houlry rate
                            </Text>
                            <Text
                              style={{
                                fontFamily: fonts.quicksandMedium,
                                fontSize: s(18),
                                marginLeft: ms(18),
                                color: colors.blue,
                              }}>
                              £{item?.carer_bookings_request[0]?.total_price}
                            </Text>
                          </View>
                          <View
                            style={{

                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                borderColor: colors.green,
                                borderRadius: ms(20),
                                borderWidth: 1,
                                backgroundColor: colors.greenBg,
                                marginHorizontal: ms(10),
                                paddingHorizontal: ms(6),
                                alignSelf: 'center',
                                paddingVertical: ms(2),
                              }}>
                              <Text
                                style={{
                                  color: colors.green,
                                  fontSize: s(12),
                                  fontFamily: fonts.quicksandMedium,
                                }}>
                                Confirmed

                              </Text>
                            </View>

                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            paddingVertical: mvs(15),
                            paddingHorizontal: mvs(15),
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate('ViewServiceAgreement', {
                                ViewServiceAgreement:
                                  item?.carer_booking_job_offer_processing2?.id,
                                key: 'confirmed',
                                paymentSummary:item?.id,
                                name:item?.category_info?.category_name,
                                from:'request'
                              });
                            }}
                            style={{
                              borderRadius: ms(6),

                              width: '48%',
                              borderWidth: 1,
                              height: mvs(45),
                              justifyContent: 'center',
                              borderColor: colors.green,
                              backgroundColor: colors.green,
                            }}>
                            <Text
                              style={{
                                fontSize: s(16),
                                textAlign: 'center',
                                color: colors.white,

                                fontFamily: fonts.quicksandMedium,
                              }}>
                              View Agreement
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => paymentDetail(item)}
                            style={{
                              borderRadius: ms(6),
                              // padding: ms(13),
                              width: '48%',
                              borderWidth: 1,
                              height: mvs(45),
                              justifyContent: 'center',
                              borderColor: colors.grey,
                              backgroundColor: colors.grey,
                            }}>
                            <Text
                              style={{
                                fontSize: s(16),
                                textAlign: 'center',
                                color: colors.white,
                                fontFamily: fonts.quicksandMedium,
                              }}>
                              Payment Details
                            </Text>
                          </TouchableOpacity>
                        </View>


                      </View>
                    )

                    :
                    (
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          backgroundColor: colors.white,
                          marginVertical: ms(10),
                          borderColor: colors.lightBackground,
                        }}>


                        {/* <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1,
                            marginTop: mvs(16),
                          }}>
                          <TouchableOpacity
                            style={{ flex: 1, marginHorizontal: ms(16) }}
                            onPress={() =>
                              props.navigation.navigate('JobDetails', {
                                id: item.id,
                                from: "serviceRequest"
                              })
                            }>
                            <Text
                              style={{
                                fontSize: 16,
                                color: colors.blue,
                                fontFamily: fonts.quicksandMedium,
                              }}
                              numberOfLines={2}
                              ellipsizeMode="tail">
                              {item.job_title}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('ChatScreen', {
                                carerData: {
                                  id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                                  name: item?.carer_booking_job_offer_processing2
                                    ?.carer_user_info?.first_name,
                                  image:
                                    item?.carer_booking_job_offer_processing2
                                      ?.carer_user_info?.profile_image,
                                  title: item?.category_info?.category_name
                                },
                              })
                            }
                            style={{
                              borderWidth: 1,
                              borderRadius: ms(12.5),
                              flexDirection: 'row',
                              paddingHorizontal: mvs(5),
                              marginHorizontal: ms(8),
                              alignItems: 'center',
                              backgroundColor: colors.primaryColor,
                              borderColor: colors.primaryColor,
                            }}>
                            <Text
                              style={{
                                color: colors.white,
                                fontFamily: fonts.quicksandBold,
                                fontSize: s(9),
                              }}>
                              Chat with Carer
                            </Text>
                            <Image
                              source={images.chatSign}
                              style={{
                                height: mvs(18),
                                width: mvs(18),
                                marginStart: ms(2),
                                resizeMode: 'contain',
                              }}></Image>
                          </TouchableOpacity>
                        </View> */}

<View
          style={{
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
        
          }}>
          <TouchableOpacity 
            style={{ flex: 1, marginHorizontal: ms(16) }}
            onPress={() =>
              props.navigation.navigate('JobDetails', {
                id: item.id,
                from: "serviceRequest"
              })
            }>
            <Text
              style={{
                fontSize: 22,
                color: colors.blue,

                width: ms(160),
                fontFamily: fonts.quicksandMedium,
              }}
              ellipsizeMode="tail">
              {item.job_title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={() =>
            props.navigation.navigate('ChatScreen', {
              carerData: {
                id: item?.carer_booking_job_offer_processing2?.apply_by_carer_user_id,
                name: item?.carer_booking_job_offer_processing2
                  ?.carer_user_info?.first_name,
                image:
                  item?.carer_booking_job_offer_processing2
                    ?.carer_user_info?.profile_image,
                title: item?.category_info?.category_name
              },
            })
          }
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              flexDirection: 'row',

              marginTop: mvs(10),
              paddingHorizontal: ms(4),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
              }}>
              Chat with {item?.carer_booking_job_offer_processing2
                  ?.carer_user_info?.first_name}
            </Text>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),
                marginStart: ms(2),
                resizeMode: 'contain',
              }}></Image>
          </TouchableOpacity>
        </View>


                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: mvs(5),
                            marginHorizontal: ms(16),
                          }}>
                          {item?.job_unq_id === null ? (
                            <></>
                          ) : (
                            <Text
                              style={{
                                fontSize: s(12),
                                color: colors.primaryColor,
                                fontFamily: fonts.quicksandMedium,
                              }}>
                              Job ID:- {item?.job_unq_id}
                            </Text>
                          )}
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: mvs(16),
                            marginLeft: mvs(16),
                          }}>
                          <Image
                            source={{
                              uri:
                                Image_URL +
                                item?.carer_bookings_request[0]?.carer_user_info
                                  ?.profile_image,
                            }}
                            style={{
                              height: mvs(80),
                              width: mvs(80),
                              resizeMode: 'stretch',
                              borderWidth: 1,
                              borderRadius: ms(80),
                              borderColor: colors.lightBackground,
                            }}></Image>

                          <View
                            style={{
                              flexDirection: 'column',
                              marginHorizontal: ms(14),

                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: s(18),
                                color: colors.blue,

                                width: ms(160),
                                fontFamily: fonts.quicksandMedium,
                              }}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {item?.carer_bookings_request[0]?.carer_user_info
                                .first_name +
                                ' ' +
                                item.carer_bookings_request[0]?.carer_user_info
                                  .last_name}
                            </Text>
                            {/* <View style={{ flexDirection: 'row' }}>

                              <Text
                                style={{
                                  fontSize: s(14),
                                  color: colors.blueLight,
                                  marginTop: ms(5),

                                  fontFamily: fonts.quicksandMedium,
                                }}>
                                {item?.category_info?.category_name}
                              </Text>
                            </View> */}
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: ms(10),
                              }}>
                              <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Image
                                  source={images.calenders}
                                  style={{
                                    height: mvs(20),
                                    width: mvs(19),
                                    
                                    resizeMode: 'contain',
                                  }}></Image>
                                <Text
                                  style={{
                                    fontSize: s(14),
                                    fontFamily: fonts.quicksandMedium,
                                    color: colors.blueLight,
                                    marginLeft: ms(10),
                                    flex:1
                                  }}>
                                  {item?.daterange}{' , '}{item?.shift_info?.shift}
                                </Text>
                              </View>

                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            paddingVertical: mvs(8),
                            borderBottomWidth: 2,
                            marginHorizontal: ms(16),

                            borderColor: colors.lightBackground,
                          }}></View>


                        <View
                          style={{
                            flexDirection: 'row',

                            marginLeft: ms(16),
                            marginVertical: ms(10),
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontFamily: fonts.quicksandMedium,
                                fontSize: s(14),
                                color: colors.blueLight,
                              }}>
                              Houlry rate
                            </Text>
                            <Text
                              style={{
                                fontFamily: fonts.quicksandMedium,
                                fontSize: s(18),
                                marginLeft: ms(18),
                                color: colors.blue,
                              }}>
                              £{item?.carer_bookings_request[0]?.total_price}
                            </Text>
                          </View>
                          <View
                            style={{

                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                borderColor: colors.pink,
                                borderRadius: ms(20),
                                borderWidth: 1,
                                backgroundColor: colors.pinkBg,
                                marginHorizontal: ms(10),
                                paddingHorizontal: ms(6),
                                alignSelf: 'center',
                                paddingVertical: ms(2),
                              }}>
                              <Text
                                style={{
                                  color: colors.pink,
                                  fontSize: s(12),
                                  fontFamily: fonts.quicksandMedium,
                                }}>
                                Offer sent

                              </Text>
                            </View>

                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            paddingVertical: mvs(15),
                            paddingHorizontal: mvs(15),
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate('ViewJobOffer', {
                                viewJobOfferId: item?.carer_booking_job_offer_processing2.id,
                                from: 'serviceRequest'
                              });
                            }}
                            style={{
                              borderRadius: ms(6),

                              width: '48%',
                              borderWidth: 1,
                              height: mvs(45),
                              justifyContent: 'center',
                              borderColor: colors.green,
                              backgroundColor: colors.green,
                            }}>
                            <Text
                              style={{
                                fontSize: s(16),
                                textAlign: 'center',
                                color: colors.white,

                                fontFamily: fonts.quicksandMedium,
                              }}>
                              View Sent Offer
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => cancelRequestFun(item, "offer")}
                            style={{
                              borderRadius: ms(6),
                              // padding: ms(13),
                              width: '48%',
                              borderWidth: 1,
                              height: mvs(45),
                              justifyContent: 'center',
                              borderColor: colors.grey,
                              backgroundColor: colors.grey,
                            }}>
                            <Text
                              style={{
                                fontSize: s(16),
                                textAlign: 'center',
                                color: colors.white,
                                fontFamily: fonts.quicksandMedium,
                              }}>
                              Cancel Request
                            </Text>
                          </TouchableOpacity>
                        </View>


                      </View>
                    )

        }
      </>
    );
  };

  const declineServiceAgrements = declineId => {
    if (reasonId == '') {
      snackbarError('select Reason');
    } else if (otherReasoninfo == true && otherReason == '') {
      snackbarError('select other Reason');
    } else {
      setCancelRequestModal(false);
      // let decline = {
      //   decline_reason_id: reasonId,
      //   decline_reason: otherReason,
      //   carer_booking_id: declineCarerId,
      // };

      // dispatch(userActionServices.declineServiceAgreement(decline));
    }
  };
  const declineCancelRequest = declineId => {
    console.log("cancalType>>>>>", cancalType);
    if (reasonId == '') {
      snackbarError('select Reason');
    } else if (otherReasoninfo == true && otherReason == '') {
      snackbarError('select other Reason');
    } else {
      setCancelRequestModal(false);

      if (cancalType == 'Agreement') {
        let decline = {
          decline_reason_id: reasonId,
          decline_reason: otherReason,
          carer_booking_id: declineCarerId,
        };
        console.log("cancelAgreementReqBody>>>", decline);
        dispatch(userActionServices.declineServiceAgreement(decline));
      } else {
        let decline = {
          decline_reason_id: reasonId,
          decline_reason: otherReason,
          carer_booking_id: declineCarerId,
          type: cancalType == 'withoutProposal' ? 2 : cancalType == "offer" ? 1 : 3
        };

        console.log("cancelReqBody>>>", decline);
        dispatch(userActionServices.cancelRequestService(decline));
      }
    }

  };

  // response decline serivce api and set data
  useEffect(() => {
    if (declineSericeAgrementList.type === DECLINESERVICEAGREMENT) {
      if (
        Object.keys(declineSericeAgrementList?.value).length != 0 &&
        declineSericeAgrementList?.value != undefined &&
        declineSericeAgrementList.value.status
      ) {

        props.navigation.navigate('Home')
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarSuccess(declineSericeAgrementList.value.message);
        }, 100);
        setCurrentPage(1);

        dispatch(userActionServices.resetData());
      } else {
        dispatch(userActionServices.resetData());
      }
    } else {
    }
  }, [declineSericeAgrementList]);


  // response decline serivce api and set data
  useEffect(() => {
    if (cancelRequestServiceData.type === CANCEL_REQUEST_SERVICE) {
      if (
        Object.keys(cancelRequestServiceData?.value).length != 0 &&
        cancelRequestServiceData?.value != undefined &&
        cancelRequestServiceData.value.status
      ) {
        console.log("cancelRequestServiceData>>>>", cancelRequestServiceData);
        props.navigation.navigate('Home')
        dispatch(userActionServices.resetData());
      } else {
        dispatch(userActionServices.resetData());
      }
    } else {
    }
  }, [cancelRequestServiceData]);

  // response  payment details  popup api and set data
  useEffect(() => {
    if (paymentDetailData.type === PAYMENT_DETAILS_POPUP) {
      if (
        Object.keys(paymentDetailData?.value).length != 0 &&
        paymentDetailData?.value != undefined &&
        paymentDetailData.value.status
      ) {


        setPaidBy(paymentDetailData.value.data.paid_by);
        setTransactionDate(paymentDetailData.value.data.transaction_date);
        setTransactionTime(paymentDetailData.value.data.transaction_time);
        setTransactionId(paymentDetailData.value.data.transaction_id);

        setTtotalAmountPaid(paymentDetailData.value.data.total_amount_paid);


        dispatch(userActionServices.resetData());
      } else {
        dispatch(userActionServices.resetData());
      }
    } else {
    }
  }, [paymentDetailData]);


  // response service request get api and set data
  useEffect(() => {
  
    hideLoader();
    if (serviceRequestData.type === SERVICE_REQUEST_JOBS) {
    
      if (serviceRequestData?.value?.status) {
        if (
          Object.keys(serviceRequestData?.value).length != 0 &&
          serviceRequestData?.value != undefined
        ) {
// console.log("Object.keys(getJobPostLstData?.value?.data?.data",Object.keys(getJobPostLstData?.value?.data?.data));
// console.log("serviceRequestData.value.data.data>>",serviceRequestData.value.data.data);
//           if (Object.keys(getJobPostLstData?.value?.data?.data).length > 0) {
//             setIsDataBlank(1)
//           } else{
//             setIsDataBlank(2)
//           }
// setJobSearchList(jobsearchList => [
//   ...jobsearchList,
//   ...serviceRequestData.value.data.data])
          setTimeout(() => {
                setJobSearchList(jobsearchList => [
            ...jobsearchList,
            ...serviceRequestData.value.data.data,
          ]);

          dispatch({
            type:'ISLOADING',
            payload:false
          })
          }, 500);
      
          dispatch(userActionServices.resetData());
        }
      } 
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [serviceRequestData]);

  // response offerDecline api and set data
  useEffect(() => {
    if (offerDeclineReasonData.type === OFFERDECLINEREASONS) {
      if (offerDeclineReasonData?.value?.status) {
        if (
          Object.keys(offerDeclineReasonData?.value).length != 0 &&
          offerDeclineReasonData?.value != undefined
        ) {
          offerDeclineReasonData.value.data.map((v, i) => {
            let temp = {
              id: v.id,
              title: v.reason,
            };

            reasonTitlesList.push(temp);
          });
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<");

          dispatch(userActionServices.resetData());
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [offerDeclineReasonData]);

 
  const openReasonModal = id => {
    setDeclineCarerId(id);
    setReasonModal(true);
  };
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
      if (rowData.title == 'Other') {
        setOtherReasonInfo(true);
      } else {
        setOtherReasonInfo(false);
      }

      //  dispatch(userActionServices.getPostJobDropdownData(category_id));
      //dispatch(userActionServices.getMedicalExpertie(category_id));
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // const querParmsApi = getjobpostedlists + '?page=' + currentPage;

      // dispatch(userActionServices.getJobPosted(querParmsApi));
      dispatch({
        type:'ISLOADING',
        payload:true
      })
      let page = {
        page: currentPage,
        status: filterArray,
      };
      dispatch(userActionServices.serviceRequestList(page));
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!focused) {
      setCurrentPage(1);
      setJobSearchList([]);
    }
  }, [focused, navigation]);

  const loadMoreItem = () => {
    if (jobsearchList.length > 2) {
      let loadPage = currentPage + 1;
      setCurrentPage(loadPage);
      setIsDataLoad(1)
      let loadingPage = {
        page: loadPage,
        status: filterArray,
      };
      dispatch({
        type:'ISLOADING',
        payload:true
      })

     console.log("loadingPage..>",loadingPage);
      setTimeout(() => {
        dispatch(userActionServices.serviceRequestList(loadingPage));
      }, 500);

    }
    //   dispatch(userActionServices.getJobPosted())
  };

  

  const closeReasonModal = () => {
    setOtherReason('');
    setReasonId('');
    setOtherReasonInfo(false);
    setReasonModal(false);
    setReasonTitle({
      id: 0,
      title: 'Select Reason',
    });
  };

  const selectedFilterRender = (item, index) => {
    let arr = [];
    if (item.select == 'MultipleSelect') {
    } else {
      filterList.forEach((v, i) => {
        v.isSelected = false;
      });
    }
    item.isSelected = !item.isSelected;

    filterList.forEach((v, i) => {
      if (v.isSelected) {
        arr.push(v.apiSendKey);
      }
    });

    setFilterArray(arr);

    setUpdateFilter(!updateFilter);
  };
  const clearFilters = () => {
    filterList.forEach((v, i) => {
      v.isSelected = false;
    });
    setUpdateFilter(!updateFilter);
  };

  const closeFilterModal = () => {
    setFilterModal(false);
    filterList.forEach((v, i) => {
      v.isSelected = false;
    });
    setUpdateFilter(!updateFilter);
  };
  // Filter FlatList Rander
  const renderMainFilterItems = ({ item, index, separators }) => {

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            selectedFilterRender(item, index);
          }}
          style={{
            paddingVertical: ms(2),
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: ms(16),
            paddingVertical: mvs(10),
          }}>
          {item.select === 'radio' ? (
            <Image
              source={item.isSelected ? images.fillCheck : images.blankCheck}
              style={{ height: mvs(15), width: mvs(15), resizeMode: 'contain' }}
            />
          ) : (
            <Image
              source={
                item.isSelected ? images.fill_rectangle : images.rectangleCheck
              }
              style={{ height: mvs(15), width: mvs(15), resizeMode: 'contain' }}
            />
          )}
          <Text
            style={{
              fontSize: s(16),
              fontFamily: fonts.quicksandMedium,
              color: colors.grey,
              marginLeft: ms(15),
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const applyFilter = () => {
    console.log("filterArray>>>>>", filterArray);
    setFilterModal(false);
    setJobSearchList([]);

    setUpdateFilter(!updateFilter);
    let filterBody = {
      page: 1,
      status: filterArray,
    };
    dispatch({
      type:'ISLOADING',
      payload:true
    })
    console.log("filterBody>>", filterBody);
    setTimeout(() => {
      dispatch(userActionServices.serviceRequestList(filterBody));
    }, 500);
   // setFilterArray([]);
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>


      <Modal
        animationType="slide"
        transparent={true}
        visible={viewDeclineReasonModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',

            backgroundColor: '#2f47a090',
          }}>
          <View
            style={{
              justifyContent: 'center',

              backgroundColor: 'white',
              marginHorizontal: ms(16),
              paddingBottom: mvs(10),
              marginTop: mvs(10),
              borderRadius: ms(20),
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                marginTop: mvs(20),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(22),
                  textAlign: 'center',
                  flex: 1,

                  marginHorizontal: ms(34),
                  color: colors.darkblue,
                }}>
                Declined Reason
              </Text>
              <TouchableOpacity
                style={{ marginEnd: ms(20), alignSelf: 'center' }}
                onPress={() => setViewDeclineReasonModal(false)}>
                <Image
                  style={{ height: mvs(20), width: mvs(20) }}
                  source={images.cross}></Image>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingVertical: mvs(20),
              }}>
              <Text
                style={{
                  fontSize: s(14),
                  fontFamily: fonts.quicksandMedium,
                  color: colors.grey,
                  paddingLeft: ms(16),
                }}>
                {declineReason}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={rejectModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 40}
          enabled={Platform.OS === 'ios' ? true : true}
          style={{
            flex: 1,

            // bottom:
            //   isKeyboardVisible == true && Platform.OS === 'ios' ? 220 : 0,

            backgroundColor: colors.blue60,
          }}>
          <View style={{ flex: 1 }} />
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: colors.white,
              justifyContent: 'flex-end',
              marginTop: mvs(10),
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                marginTop: mvs(20),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(22),
                  textAlign: 'center',
                  flex: 1,

                  marginHorizontal: ms(34),
                  color: colors.blue,
                }}>
                Reason
              </Text>
              <TouchableOpacity
                style={{ marginEnd: ms(20), alignSelf: 'center' }}
                onPress={() => closeReasonModal()}>
                <Image
                  style={{ height: mvs(20), width: mvs(20) }}
                  source={images.cross}></Image>
              </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: ms(16) }}>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
            </View>
            <View style={{ marginTop: mvs(20), marginHorizontal: ms(16) }}>
              {/* <TextInput
                  style={{
                    color: colors.blue,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                  }}
                  value={jobTitle}
                  onChangeText={text => setJobTitle(text)}
                  placeholderTextColor={colors.grey}
                  placeholder="Job Title"></TextInput> */}

              <MyDropDown
                selected={reasonTitle}
                itemList={reasonTitlesList}
                placeholder={'Select Reason'}
                onUpdate={data => handleUpdate(data, 'reason')}
              />
            </View>
            {otherReasoninfo == true ? (
              <View
                style={{
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.lightBackground,
                  borderRadius: ms(6),
                  height: mvs(120),
                  marginHorizontal: ms(16),
                  padding: Platform.OS === 'android' ? ms(13) : ms(13),
                  marginTop: mvs(27),
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
                  placeholder="Reason here..."></TextInput>
              </View>
            ) : (
              <></>
            )}
            <View
              style={{
                borderBottomWidth: 4,
                marginTop: mvs(30),

                borderColor: colors.lightBackground,
              }}></View>
            <TouchableOpacity
              onPress={() => declineServiceAgrements()}
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
                Send Reason
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={filterModal}>
        <View
          style={{
            flex: 1,

            backgroundColor: colors.blue60,
          }}>
          <View style={{ flex: 1 }} />
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',
              justifyContent: 'flex-end',
              paddingBottom: mvs(10),
              marginTop: mvs(10),
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: ms(16),
                marginTop: mvs(10),
              }}>
              <Text
                style={{
                  fontSize: s(18),
                  fontFamily: fonts.quicksandMedium,
                  color: colors.blue,
                }}>
                Filters
              </Text>
              <TouchableOpacity onPress={() => clearFilters()}>
                <Text
                  style={{
                    fontSize: s(12),
                    fontFamily: fonts.quicksandMedium,
                    color: colors.primaryColor,
                  }}>
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                extraData={!updateFilter}
                data={filterList}
                showsVerticalScrollIndicator={false}
                renderItem={renderMainFilterItems}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: mvs(15),
                paddingHorizontal: mvs(15),
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => closeFilterModal()}
                style={styles.Negotiate}>
                <Text
                  style={{
                    fontSize: s(18),
                    textAlign: 'center',
                    fontFamily: fonts.quicksandMedium,
                    color: colors.white,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => applyClickHandler()}
                onPress={() => applyFilter()}
                style={styles.SendJobOffer}>
                <Text
                  style={{
                    fontSize: s(18),
                    textAlign: 'center',
                    fontFamily: fonts.quicksandMedium,
                    color: colors.white,
                  }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentDetailModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 40}
          enabled={Platform.OS === 'ios' ? true : true}
          style={{
            flex: 1,

            // bottom:
            //   isKeyboardVisible == true && Platform.OS === 'ios' ? 220 : 0,

            backgroundColor: colors.blue60,
          }}>
          <View style={{ flex: 1 }} />
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: colors.white,
              justifyContent: 'flex-end',
              marginTop: mvs(10),
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                marginTop: mvs(20),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(22),
                  textAlign: 'center',
                  flex: 1,

                  marginHorizontal: ms(34),
                  color: colors.blue,
                }}>
                Payment Detail
              </Text>
              <TouchableOpacity
                style={{ marginEnd: ms(20), alignSelf: 'center' }}
                onPress={() => setPaymentDetailModal(false)}>
                <Image
                  style={{ height: mvs(20), width: mvs(20) }}
                  source={images.cross}></Image>
              </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: ms(16) }}>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
            </View>
            <View style={{ marginHorizontal: ms(16), marginTop: mvs(10) }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.paymentModalTitleStyle}>Paid by</Text>
                <Text
                  style={styles.paymentModalTextStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {paidBy}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: mvs(10),
                }}>
                <Text style={styles.paymentModalTitleStyle}>Date</Text>
                <Text
                  style={styles.paymentModalTextStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {transactionDate}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: mvs(10),
                }}>
                <Text style={styles.paymentModalTitleStyle}>Time</Text>
                <Text
                  style={styles.paymentModalTextStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {transactionTime}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: mvs(10),
                }}>
                <Text
                  style={styles.paymentModalTitleStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  Transaction Number
                </Text>
                <Text
                  style={styles.paymentModalTextStyle}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {transactionId}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: mvs(10),
                padding: mvs(16),
                backgroundColor: colors.lightBackground,
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(18),
                  color: colors.blue,
                }}>
                Paid Amount
              </Text>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(18),
                  color: colors.primaryColor,
                }}>
                £ {totalAmountPaid}
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={cancelRequestModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 40}
          enabled={Platform.OS === 'ios' ? true : true}
          style={{
            flex: 1,
            bottom: isKeyboardVisible == true ? 130 : 0,
            backgroundColor: colors.blue60,
          }}>
          <View style={{ flex: 1 }} />
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: colors.white,
              justifyContent: 'flex-end',
              marginTop: mvs(10),
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                marginTop: mvs(20),
              }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(22),
                  textAlign: 'center',
                  flex: 1,

                  marginHorizontal: ms(34),
                  color: colors.blue,
                }}>
                Cancel Request
              </Text>
              <TouchableOpacity
                style={{ marginEnd: ms(20), alignSelf: 'center' }}
                onPress={() => setCancelRequestModal(false)}>
                <Image
                  style={{ height: mvs(20), width: mvs(20) }}
                  source={images.cross}></Image>
              </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: ms(16) }}>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
            </View>
            <View style={{ marginTop: mvs(20), marginHorizontal: ms(16) }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  color: colors.darkblue,
                  fontSize: s(16),
                }}>
                Cancellation Reason
              </Text>
              {/* <TextInput

                style={{
                  color: colors.blue,
                  fontSize: s(14),
                  fontFamily: fonts.quicksandMedium,
                }}
                value={jobTitle}
                onChangeText={text => setJobTitle(text)}
                placeholderTextColor={colors.grey}
                placeholder="Job Title"></TextInput> */}

              <MyDropDown
                selected={reasonTitle}
                itemList={reasonTitlesList}
                placeholder={'Select Reason'}
                onUpdate={data => handleUpdate(data, 'reason')}
              />
            </View>
            {otherReasoninfo == true ? (
              <>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    color: colors.darkblue,
                    fontSize: s(16),
                    marginVertical: mvs(10),
                    marginHorizontal: ms(16),
                  }}>
                  Cancellation Detail
                </Text>
                <View
                  style={{
                    borderColor: colors.lightBackground,
                    backgroundColor: colors.lightBackground,
                    borderRadius: ms(6),
                    height: mvs(120),
                    marginHorizontal: ms(16),
                    padding: Platform.OS === 'android' ? ms(13) : ms(13),

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
                    placeholder="Comment here......"></TextInput>
                </View>
              </>
            ) : (
              <></>
            )}
            <View
              style={{
                borderBottomWidth: 4,
                marginTop: mvs(30),

                borderColor: colors.lightBackground,
              }}></View>
            <TouchableOpacity
              onPress={() => declineCancelRequest()}
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
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
            Booking Requests
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => setFilterModal(true)}>
            <Image
              style={{
                height: mvs(45),
                width: ms(45),
                resizeMode: 'contain',
              }}
              source={images.filter}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
      <View
        style={{ flex: 1, marginHorizontal: ms(16), marginVertical: mvs(10) }}>
        {jobsearchList.length >0 ? (
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            extraData={updateAppliedJobsist}
            data={jobsearchList}
            
            showsVerticalScrollIndicator={false}
            renderItem={jobPostedRenderItem}
            onEndReached={() => loadMoreItem()}
          />
        ) :
        jobsearchList.length == 0 &&
            (
              !isLoadingValue?.loading &&
          <View style={{ alignContent: 'center', justifyContent: 'center',flex:1 }}>
            <Text
              style={{
                fontSize: s(16),
                color: colors.grey,
                textAlign: 'center',
                fontFamily: fonts.quicksandMedium,
              }}>
              No data found !
            </Text>
          </View>
        ) 

        }
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Negotiate: {
    borderRadius: ms(6),
    // padding: ms(13),
    width: '48%',
    borderWidth: 1,
    height: mvs(45),
    justifyContent: 'center',
    borderColor: colors.grey,
    backgroundColor: colors.grey,
  },
  SendJobOffer: {
    borderRadius: ms(6),
    // padding: ms(13),
    width: '48%',
    borderWidth: 1,
    height: mvs(45),
    justifyContent: 'center',
    borderColor: colors.primaryColor,
    backgroundColor: colors.primaryColor,
  },
  paymentModalTitleStyle: {
    fontFamily: fonts.quicksandMedium,
    fontSize: s(14),
    color: colors.grey,
  },
  paymentModalTextStyle: {
    fontFamily: fonts.quicksandMedium,
    fontSize: s(16),
    color: colors.blue,

    flex: 1,
    textAlign: 'right',
    marginStart: ms(5),
  },
});
