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
} from '../utils/reducerConstant';
import { useIsFocused } from '@react-navigation/native';

export default function JobPostedList(props) {
  const { navigation } = props;
  var randomUniqeId = '12345678';
  var joblist = [];
  const dispatch = useDispatch();
  const getJobPostLstData = useSelector(state => state.getJobPostData);
  const isLoadingValue = useSelector(state => state.isLoading);
console.log("getJobPostLstData",getJobPostLstData);
  const paymentDetails = useSelector(state => state.paymentDetails);
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
  const [rejectModal, setReasonModal] = useState(false);
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
  const [otherReasoninfo, setOtherReasonInfo] = useState(false);
  const [declineCarerId, setDeclineCarerId] = useState('');
  const [reasonId, setReasonId] = useState('');
  const [reasonTitle, setReasonTitle] = useState({
    id: 0,
    title: 'Select Reason',
  });
  const [reasonTitlesList, setReasonTitlesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dates, setDates] = useState([]);
  const [isDataBlank, setIsDataBlank] = useState(0);
  console.log("isdatablanlkkk??????????", isDataBlank);
  const [updateFilter, setUpdateFilter] = useState();
  const [issDataLoad, setIsDataLoad] = useState(0);
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
  ]);
  const focused = useIsFocused();
  const declineModalFun = item => {
    console.log('item', item);
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
    console.log('item.payment_id', item.payment_id);
    dispatch(userActionServices.paymentDetail(item.payment_id));
  };

  const jobPostedRenderItem = ({ item, index, separators }) => {
    console.log("jobPostedRenderItem.>>>>",item);
    console.log("jobPostedRenderItem.>>>>",item?.region_info?.region);
    let text =item?.daterange;
const myArray = text?.split(" - ");
let word = myArray[0];
    return (
      <>
        {item?.carer_booking_job_offer_processing === null ? (
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() =>
                    props.navigation.navigate('JobDetails', {
                      id: item.id,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: s(18),
                      color: colors.blue,
                      fontFamily: fonts.quicksandMedium,
                    }}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.job_title}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderColor: colors.orange,
                    borderRadius: ms(20),
                    borderWidth: 1,
                    backgroundColor: colors.ornageBackground,
                    marginHorizontal: ms(5),
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
                    Pending
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', marginTop: mvs(5) }}>
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
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.blue,
                  marginTop: mvs(6),
                  marginRight: ms(130),
                  fontFamily: fonts.quicksandBook,
                }}>
            {item?.postcode} {'\n'}{item.address_line_1}
              </Text>
              {item.address_line_2 === null || item.address_line_2 === '' ? (
                <></>
              ) : (
                <Text
                  style={{
                    fontSize: s(14),
                    color: colors.blue,
                    marginTop: mvs(6),
                    marginRight: ms(130),
                    fontFamily: fonts.quicksandBook,
                  }}>
                  {item.address_line_2}
                </Text>
              )}

{item?.region_info?.region == ''|| item?.region_info?.region ===null || item?.region_info?.region===  undefined ? (
          <></>
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderRadius: ms(12.5),
              width: ms(180),
              marginTop: mvs(15),
              paddingHorizontal: ms(11),
              paddingVertical: mvs(4),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.lightBackground,
              borderColor: colors.lightBackground,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.grey,
                fontFamily: fonts.quicksandMedium,
                fontSize: s(14),
              }}
              numberOfLines={1}>
              {item?.region_info?.region}
            </Text>
          </View>
        )}
            </View>

            <View
              style={{
                backgroundColor: colors.lightBackground,
                flexDirection: 'row',
                height: mvs(72),
                marginVertical: mvs(16),
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              {/* <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <Image
                    source={images.calenders}
                    style={{
                      height: mvs(21),
                      width: mvs(18),
                      resizeMode: 'contain',
                    }}></Image>
                  <Popable
                    action='press'
                    onAction={() => {
                      let tempDates = []
                      tempDates = []
                      item.care_seeker_booking_duration_info.map((bookingDate, BookingDateINdex) => {
                
                        tempDates.push(bookingDate.booking_date)

                      })
                      setDates(tempDates)
                    }}
                    content={<View
                      style={{ padding: ms(5), justifyContent: 'center', alignItems: 'center' }}
                    >
                      {dates.map((datesView, datesIndex) => {
                        return (<Text
                          style={{
                            color: colors.white,
                            fontFamily: fonts.quicksandMedium,
                            fontSize: s(12),
                            marginHorizontal: ms(5)

                          }}>
                          {datesView}
                 
                        </Text>)
                      })}

                    </View>}>
                    <Text
                      style={{
                        color: colors.blueLight,
                        fontFamily: fonts.quicksandMedium,
                        fontSize: s(12),
                        marginTop: mvs(9),
                      }}>
                      Dates
                    </Text>
                  </Popable>

                </View> */}
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Image
                  source={images.calenders}
                  style={{
                    height: mvs(21),
                    width: mvs(18),
                    resizeMode: 'contain',
                  }}></Image>
                <Text
                  style={{
                    color: colors.blueLight,
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(12),
                    textAlign: 'center',
                    marginLeft: ms(4),
                    marginTop: mvs(9),
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {/* {item?.daterange} */}
                  {word}
                </Text>
              </View>

              <View
                style={{
                  height: Platform.OS === 'ios' ? '70%' : '70%',
                  width: ms(1),
                  marginHorizontal: ms(10),
                  backgroundColor: 'rgb(181,181,181)',
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Image
                  source={images.watch}
                  style={{
                    height: mvs(21),
                    width: mvs(18),
                    resizeMode: 'contain',
                  }}></Image>
                <Text
                  style={{
                    color: colors.blueLight,
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(12),
                    marginTop: mvs(9),
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.shift_info.shift}
                </Text>
              </View>
              <View
                style={{
                  height: Platform.OS === 'ios' ? '70%' : '70%',
                  width: ms(1),
                  marginHorizontal: ms(10),
                  backgroundColor: 'rgb(181,181,181)',
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Image
                  source={images.carePic}
                  style={{
                    height: mvs(21),
                    width: mvs(18),
                    resizeMode: 'contain',
                  }}></Image>
                <Text
                  style={{
                    color: colors.blueLight,
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(12),

                    marginTop: mvs(9),
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.category_info.category_name}
                </Text>
              </View>
            </View>
            {/* <View
          style={{
            backgroundColor: colors.lightBackground,
            flexDirection: 'row',


          }}>

          <Text>Dates</Text>
        </View> */}
            <View style={{ marginHorizontal: ms(16), marginBottom: ms(10) }}>
              {/* <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={renderReadMore}
                renderRevealedFooter={renderReadLess}>
                <Text
                  style={{
                    fontSize: s(14),
                    fontFamily: fonts.quicksandBook,
                    marginHorizontal: ms(16),
                    lineHeight: 20,
                    marginTop: mvs(15),
                    color: colors.blueLight,
                  }}>
                  {item.additional_requirement}
                </Text>
              </ReadMore> */}
              <ReadMore
                numberOfLines={2}
                seeMoreText="Read more"
                seeLessText="Read less"
                seeLessStyle={{
                  fontSize: s(14),
                  color: colors.primaryColor,
                  fontFamily: fonts.quicksandMedium,
                }}
                seeMoreStyle={{
                  fontSize: s(14),
                  color: colors.primaryColor,
                  fontFamily: fonts.quicksandMedium,
                }}
                style={{
                  fontSize: s(14),
                  color: colors.blueLight,
                  marginTop: mvs(5),
                  fontFamily: fonts.quicksandBook,
                }}>
                {item.additional_requirement}
              </ReadMore>
            </View>
            {item.carer_bookings.length >= 1 ? (
              <View
                style={{
                  marginVertical: mvs(16),
                  marginLeft: ms(16),

                  flexDirection: 'row',
                }}>
                {item.carer_bookings.map((listItems, listIndex) => {
                  {
                  }
                  return listIndex < 3 ? (
                    <Image
                      style={{
                        height: mvs(36),
                        width: mvs(36),
                        borderRadius: ms(18),
                        borderColor: colors.white,
                        borderWidth: 1,
                        marginStart: listIndex == 0 ? ms(0) : ms(-20),
                        resizeMode: 'cover',
                      }}
                      source={{
                        uri:
                          Image_URL + listItems.carer_user_info.profile_image,
                      }}
                    //   source={Image_URL + item.carer_bookings[0]?.carer_user_info.profile_image}
                    />
                  ) : (
                    <></>
                  );
                })}
                {item.carer_bookings.length > 3 ? (
                  <View
                    style={{
                      height: mvs(36),
                      width: mvs(36),
                      marginStart: ms(-20),
                      justifyContent: 'center',
                      borderRadius: ms(18),
                      backgroundColor: colors.blue,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: s(16),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      +{item.carer_bookings.length - 3}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}

                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('AppliedList', { id: item.id })
                  }
                  style={{
                    height: mvs(36),
                    justifyContent: 'center',
                    marginStart: ms(10),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.primaryColor,
                      fontSize: s(14),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    View All Applicants
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: mvs(10), marginHorizontal: ms(16) }}>
                <Text
                  style={{
                    color: colors.red,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                  }}>
          Nobody has yet applied for this job
                </Text>
              </View>
            )}

            {item?.last_carer_booking?.status === 9 ? (
              <>
                <View
                  style={{
                    // paddingBottom: mvs(16),
                    borderBottomWidth: 2,
                    marginHorizontal: ms(16),

                    borderColor: colors.lightBackground,
                  }}></View>
                <View
                  onPress={() => declineModalFun(item)}
                  style={{
                    marginTop: mvs(10),
                    marginHorizontal: ms(16),
                    marginBottom: mvs(10),
                  }}>
                  <Text
                    style={{
                      color: colors.red,
                      fontSize: s(12),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    {item?.last_carer_booking?.carer_user_info?.first_name +
                      ' ' +
                      item?.last_carer_booking?.carer_user_info?.last_name}
                    {" 's "}
                    job offer has been auto-declined as carer booking is
                    confirmed by other careseeker.
                  </Text>
                </View>
              </>
            ) : item?.last_carer_booking?.offer_decline_reason_id == '' ||
              item?.last_carer_booking?.offer_decline_reason_id == null ? (
              <></>
            ) : (
              <>
                <View
                  style={{
                    paddingBottom: mvs(16),
                    borderBottomWidth: 2,
                    marginHorizontal: ms(16),

                    borderColor: colors.lightBackground,
                  }}></View>
                <View
                  onPress={() => declineModalFun(item)}
                  style={{ marginTop: mvs(10), marginHorizontal: ms(16) }}>
                  <Text
                    style={{
                      color: colors.red,
                      fontSize: s(12),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    {item?.last_carer_booking?.carer_user_info?.first_name +
                      ' ' +
                      item?.last_carer_booking?.carer_user_info?.last_name}{' '}
                    has declined your job offer. Please send offer again to
                    another applicant.
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => declineModalFun(item)}
                  style={{ marginVertical: mvs(10), marginHorizontal: ms(16) }}>
                  <Text
                    style={{
                      color: colors.primaryColor,
                      fontSize: s(14),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    View Declined Reason
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : item?.carer_booking_job_offer_processing?.status == 2 ? (





          // <View

          //   style={{
          //     borderWidth: 1,
          //     borderRadius: 10,
          //     backgroundColor: colors.white,
          //     marginVertical: ms(10),
          //     borderColor: colors.lightBackground,
          //   }}>
          //   <View
          //     style={{
          //       marginTop: mvs(8),
          //       marginHorizontal: ms(10),
          //       flexDirection: 'row',

          //       justifyContent: 'space-between',
          //     }}>
          //     <View style={{flex: 1}}>
          //       <View
          //         style={{
          //           flexDirection: 'row',
          //           justifyContent: 'space-between',
          //           flex: 1,
          //         }}>
          //         <TouchableOpacity
          //           style={{flex: 1}}
          //           onPress={() =>
          //             props.navigation.navigate('JobDetails', {
          //               id: item.id,
          //             })
          //           }>
          //           <Text
          //             style={{
          //               fontSize: s(18),
          //               color: colors.blue,
          //               fontFamily: fonts.quicksandMedium,
          //             }}
          //             numberOfLines={1}
          //             ellipsizeMode="tail">
          //             {item.job_title}
          //           </Text>
          //         </TouchableOpacity>



          //         <View
          //           style={{
          //             borderColor: colors.agrementGreencolor,
          //             borderRadius: ms(20),
          //             borderWidth: 1,
          //             backgroundColor: colors.agrementGreenBgcolor,
          //             marginHorizontal: ms(5),
          //             paddingHorizontal: ms(6),
          //             alignSelf: 'center',
          //             paddingVertical: ms(2),
          //           }}>
          //           <Text
          //             style={{
          //               color: colors.agrementGreencolor,
          //               fontSize: s(12),
          //               fontFamily: fonts.quicksandMedium,
          //             }}>
          //             Agreement Received
          //           </Text>
          //         </View>
          //       </View>
          //     </View>
          //   </View>
          //   <View
          //     style={{
          //       flexDirection: 'row',
          //       marginTop: mvs(5),
          //       marginHorizontal: ms(16),
          //     }}>
          //     {item?.job_unq_id === null ? (
          //       <></>
          //     ) : (
          //       <Text
          //         style={{
          //           fontSize: s(12),
          //           color: colors.primaryColor,
          //           fontFamily: fonts.quicksandMedium,
          //         }}>
          //         ID:- {item?.job_unq_id}
          //       </Text>
          //     )}
          //   </View>
          //   <View
          //     style={{
          //       flexDirection: 'row',
          //       marginTop: mvs(16),
          //       marginLeft: mvs(16),
          //     }}>
          //     <Image
          //       source={{
          //         uri:
          //           Image_URL +
          //           item.carer_booking_job_offer_processing.carer_user_info
          //             .profile_image,
          //       }}
          //       style={{
          //         height: mvs(80),
          //         width: mvs(80),
          //         resizeMode: 'stretch',
          //         borderWidth: 1,
          //         borderRadius: ms(80),
          //         borderColor: colors.lightBackground,
          //       }}></Image>

          //     <View
          //       style={{
          //         flexDirection: 'column',
          //         marginHorizontal: ms(14),

          //         flex: 1,
          //       }}>
          //       <Text
          //         style={{
          //           fontSize: s(18),
          //           color: colors.blue,

          //           width: ms(160),
          //           fontFamily: fonts.quicksandMedium,
          //         }}
          //         numberOfLines={1}
          //         ellipsizeMode="tail">
          //         {item.carer_booking_job_offer_processing.carer_user_info
          //           .first_name +
          //           ' ' +
          //           item.carer_booking_job_offer_processing.carer_user_info
          //             .last_name}
          //       </Text>
          //       <View style={{flexDirection: 'row'}}>
          //         <Text
          //           style={{
          //             fontSize: s(14),
          //             color: colors.blueLight,
          //             marginTop: ms(5),
          //             fontFamily: fonts.quicksandMedium,
          //           }}>
          //           Nurse
          //         </Text>
          //         <Text
          //           style={{
          //             fontSize: s(14),
          //             color: colors.blueLight,
          //             marginTop: ms(5),
          //             marginLeft: ms(20),
          //             fontFamily: fonts.quicksandMedium,
          //           }}>
          //           {item.carer_booking_job_offer_processing.shift}
          //         </Text>
          //       </View>
          //       <View
          //         style={{
          //           flexDirection: 'row',
          //           justifyContent: 'space-between',
          //           alignItems: 'center',
          //           marginTop: ms(10),
          //         }}>
          //         <View style={{flexDirection: 'row', flex: 1}}>
          //           <Image
          //             source={images.maps}
          //             style={{
          //               height: mvs(20),
          //               width: mvs(19),
          //               resizeMode: 'contain',
          //             }}></Image>
          //           <Text
          //             style={{
          //               fontSize: s(14),
          //               fontFamily: fonts.quicksandMedium,
          //               color: colors.blueLight,
          //               marginLeft: ms(10),
          //             }}>
          //             {/* {parseInt(item.carer_user_info.user_meta_info.distance).toFixed(2)} Miles Away */}
          //             {parseInt(
          //               item.carer_booking_job_offer_processing.carer_user_info
          //                 .user_meta_info.distance,
          //             )}{' '}
          //             Miles Away
          //           </Text>
          //         </View>
          //         <View style={{flexDirection: 'row'}}>
          //           <Image
          //             source={images.time}
          //             style={{
          //               height: mvs(20),
          //               width: mvs(19),
          //               resizeMode: 'contain',
          //             }}></Image>
          //           <Text
          //             style={{
          //               fontSize: s(14),
          //               fontFamily: fonts.quicksandMedium,
          //               color: colors.blueLight,
          //               marginLeft: ms(10),
          //             }}>
          //             {
          //               item.carer_booking_job_offer_processing.carer_user_info
          //                 .user_meta_info.experience
          //             }
          //             Year
          //           </Text>
          //         </View>
          //       </View>
          //     </View>
          //   </View>
          //   <View
          //     style={{
          //       marginTop: mvs(16),
          //       borderBottomWidth: 2,
          //       marginHorizontal: ms(16),

          //       borderColor: colors.lightBackground,
          //     }}></View>

          //   <View
          //     style={{
          //       flexDirection: 'row',
          //       paddingVertical: mvs(15),
          //       paddingHorizontal: mvs(15),

          //       justifyContent: 'space-between',
          //     }}>
          //     <TouchableOpacity
          //       onPress={() => {
          //         props.navigation.navigate('ViewServiceAgreement', {
          //           ViewServiceAgreement:
          //             item.carer_booking_job_offer_processing.id,
          //           key: 'agreementRecieved',
          //         });
          //       }}
          //       style={{
          //         borderColor: colors.orange,
          //         borderRadius: ms(20),
          //         borderWidth: 1,
          //         backgroundColor: colors.orange,
          //         marginHorizontal: ms(5),
          //         paddingVertical: mvs(4),
          //         paddingHorizontal: mvs(15),
          //         alignSelf: 'center',
          //       }}>
          //       <Text
          //         style={{
          //           color: colors.white,
          //           fontSize: s(9),
          //           fontFamily: fonts.quicksandBold,
          //         }}>
          //         View Service Agreement
          //       </Text>
          //     </TouchableOpacity>

          //     <TouchableOpacity
          //       // onPress={() =>
          //       //   props.navigation.navigate('ChatScreen', {
          //       //     carerData: {
          //       //       id: item?.id,
          //       //       name: item?.carer_booking_job_offer_processing
          //       //         ?.carer_user_info?.first_name,
          //       //       image:
          //       //         item?.carer_booking_job_offer_processing
          //       //           ?.carer_user_info?.profile_image,
          //       //     },
          //       //   })
          //       // }
          //       style={{
          //         borderWidth: 1,
          //         borderRadius: ms(12.5),
          //         flexDirection: 'row',

          //         paddingHorizontal: mvs(15),

          //         marginHorizontal: ms(10),
          //         alignItems: 'center',
          //         backgroundColor: colors.primaryColor,
          //         borderColor: colors.primaryColor,
          //       }}>
          //       <Text
          //         style={{
          //           color: colors.white,
          //           fontFamily: fonts.quicksandBold,
          //           fontSize: s(9),
          //         }}>
          //         Chat with Carer
          //       </Text>
          //       <Image
          //         source={images.chatSign}
          //         style={{
          //           height: mvs(18),
          //           width: mvs(18),
          //           marginStart: ms(2),
          //           resizeMode: 'contain',
          //         }}></Image>
          //     </TouchableOpacity>
          //     {/* <TouchableOpacity
          //       onPress={() =>
          //         // declineServiceAgrements(
          //         //   item.carer_booking_job_offer_processing.id,
          //         // )
          //         openReasonModal(item.carer_booking_job_offer_processing.id)
          //       }
          //       style={{
          //         borderRadius: ms(6),

          //         width: '48%',
          //         borderWidth: 1,
          //         height: mvs(45),
          //         justifyContent: 'center',
          //         borderColor: colors.grey,
          //         backgroundColor: colors.grey,
          //       }}>
          //       <Text
          //         style={{
          //           fontSize: s(16),
          //           textAlign: 'center',
          //           color: colors.white,

          //           fontFamily: fonts.quicksandMedium,
          //         }}>
          //         Decline
          //       </Text>
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //       onPress={() =>
          //         props.navigation.navigate('PaymentScreen', {
          //           id: item.carer_booking_job_offer_processing.id,
          //           pay: item.carer_booking_job_offer_processing
          //             .total_service_price,
          //           from: 'jobPosted',
          //         })
          //       }
          //       style={{
          //         borderRadius: ms(6),
          //         // padding: ms(13),
          //         width: '48%',
          //         borderWidth: 1,
          //         height: mvs(45),
          //         justifyContent: 'center',
          //         borderColor: colors.primaryColor,
          //         backgroundColor: colors.primaryColor,
          //       }}>
          //       <Text
          //         style={{
          //           fontSize: s(16),
          //           textAlign: 'center',
          //           color: colors.white,
          //           fontFamily: fonts.quicksandMedium,
          //         }}>
          //         Accept
          //       </Text>
          //     </TouchableOpacity> */}
          //   </View>
          // </View>










          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: colors.white,
              marginVertical: ms(10),
              borderColor: colors.lightBackground,
            }}>

{/* 
            <View
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
                  })
                }>
                <Text
                  style={{
                    fontSize: s(18),
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
                      id: item?.carer_booking_job_offer_processing?.apply_by_carer_user_id,
                      name: item?.carer_booking_job_offer_processing
                        ?.carer_user_info?.first_name,
                      image:
                        item?.carer_booking_job_offer_processing
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
                  id: item?.carer_booking_job_offer_processing?.apply_by_carer_user_id,
                  name: item?.carer_booking_job_offer_processing
                    ?.carer_user_info?.first_name,
                  image:
                    item?.carer_booking_job_offer_processing
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
              Chat with {item?.carer_booking_job_offer_processing
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
                    item.carer_booking_job_offer_processing.carer_user_info
                      .profile_image,
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
                  {item.carer_booking_job_offer_processing.carer_user_info
                    .first_name +
                    ' ' +
                    item.carer_booking_job_offer_processing.carer_user_info
                      .last_name}
                </Text>
                {/* <View style={{ flexDirection: 'row' }}>
                 
                  <Text
                    style={{
                      fontSize: s(14),
                      color: colors.blueLight,
                      marginTop: ms(5),
                      marginLeft: ms(20),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    {item.carer_booking_job_offer_processing.shift}
                  </Text>
                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                    flex: 1,
                    marginTop: ms(10),
                  }}>
                  <View style={{ flexDirection: 'row', flex: 1, marginRight: ms(8) }}>
                    <Image
                      source={images.maps}
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

                        marginLeft: ms(8),
                      }}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {/* {parseInt(item.carer_user_info.user_meta_info.distance).toFixed(2)} Miles Away */}
                      {parseFloat(
                        item.carer_booking_job_offer_processing.carer_user_info
                          .user_meta_info.distance,
                      ).toFixed(2)}{' '}
                      Miles Away
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', }}>
                    <Image
                      source={images.time}
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
                        marginLeft: ms(8),
                      }}>
                      {
                        item.carer_booking_job_offer_processing.carer_user_info
                          .user_meta_info.experience
                      }
                      Year
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
                  Hourly rate
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    marginLeft: ms(18),
                    color: colors.blue,
                  }}>
                  £{item.carer_booking_job_offer_processing.price}
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
                    backgroundColor: colors.blueBg,
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
                    Agreement Received
                  </Text>
                </View>
                {/* <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginEnd: ms(5),
                    color: colors.blueLight,
                  }}>
                  Available For:
                </Text>
                {item.carer_booking_job_offer_processing.carer_user_info
                  .user_meta_info.available_for === 'Female' ? (
                  <Image
                    source={images.femalesign}
                    style={{
                      height: mvs(24),
                      width: mvs(24),
                      resizeMode: 'contain',
                    }}></Image>
                ) : item.carer_booking_job_offer_processing.carer_user_info
                    .user_meta_info.available_for === 'No preference' ? (
                  <>
                    <Image
                      source={images.malesign}
                      style={{
                        height: mvs(24),
                        width: mvs(24),
                        resizeMode: 'contain',
                      }}></Image>

                    <Image
                      source={images.femalesign}
                      style={{
                        height: mvs(24),
                        width: mvs(24),
                        marginStart: ms(5),
                        resizeMode: 'contain',
                      }}></Image>
                  </>
                ) : (
                  <Image
                    source={images.malesign}
                    style={{
                      height: mvs(24),
                      width: mvs(24),
                      resizeMode: 'contain',
                    }}></Image>
                )} */}
                {/* {item.availablesingle == null ? (
              <></>
            ) : ( */}
                {/* <Image
              source={images.malesign}
              style={{
                height: mvs(24),
                width: mvs(24),
                marginEnd: ms(5),
                resizeMode: 'contain',
              }}></Image> */}
                {/* )} */}

                {/* <Image
              source={images.femalesign}
              style={{
                height: mvs(24),
                width: mvs(24),
                resizeMode: 'contain',
              }}></Image> */}
              </View>
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
                paddingVertical: mvs(15),
                paddingHorizontal: mvs(15),

                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ViewJobOffer', {
                    viewJobOfferId: item.carer_booking_job_offer_processing.id,
                  });
                }}
                style={{
                  borderColor: colors.orange,
                  borderRadius: ms(20),
                  borderWidth: 1,
                  backgroundColor: colors.orange,
                  marginHorizontal: ms(5),
                  paddingVertical: mvs(4),
                  paddingHorizontal: mvs(15),
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: s(9),
                    fontFamily: fonts.quicksandBold,
                  }}>
                  View Job Offer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() =>
                //   props.navigation.navigate('ChatScreen', {
                //     carerData: {
                //       id: item?.id,
                //       name: item?.carer_booking_job_offer_processing
                //         ?.carer_user_info?.first_name,
                //       image:
                //         item?.carer_booking_job_offer_processing
                //           ?.carer_user_info?.profile_image,
                //     },
                //   })
                // }
                style={{
                  borderWidth: 1,
                  borderRadius: ms(12.5),
                  flexDirection: 'row',

                  paddingHorizontal: mvs(15),

                  marginHorizontal: ms(10),
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

                paddingVertical: mvs(10),
                paddingHorizontal: mvs(15),

              }}>

              <TouchableOpacity
                //  onPress={() => {
                //   props.navigation.navigate('ViewJobOffer', {
                //     viewJobOfferId: item.carer_booking_job_offer_processing.id,
                //   });
                // }}

                onPress={() => {
                  props.navigation.navigate('ViewServiceAgreement', {
                    ViewServiceAgreement:
                      item.carer_booking_job_offer_processing.id,
                    key: 'agreementRecieved',
                    paymentSummary:item?.id,
                    name:item?.category_info?.category_name
                  });
                }}
                style={{
                  borderRadius: ms(6),
                  // padding: ms(13),
                  width: '100%',
                  borderWidth: 1,
                  height: mvs(45),
                  justifyContent: 'center',
                  borderColor: colors.green,
                  backgroundColor: colors.green,
                }}>
                <Text
                  style={{
                    fontSize: s(18),
                    textAlign: 'center',
                    color: colors.white,
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  View Service Agreement
                </Text>
              </TouchableOpacity>
            </View>
          </View>


        ) : item?.carer_booking_job_offer_processing?.status == 3 || item?.carer_booking_job_offer_processing?.status == 14 || item?.carer_booking_job_offer_processing?.status == 15 ? (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: colors.white,
              marginVertical: ms(10),
              borderColor: colors.lightBackground,
            }}>
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
                    id: item?.carer_booking_job_offer_processing?.apply_by_carer_user_id,
                    name: item?.carer_booking_job_offer_processing
                      ?.carer_user_info?.first_name,
                    image:
                      item?.carer_booking_job_offer_processing
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
              Chat with {item?.carer_booking_job_offer_processing
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
                    item.carer_booking_job_offer_processing.carer_user_info
                      .profile_image,
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
                  {item.carer_booking_job_offer_processing.carer_user_info
                    .first_name +
                    ' ' +
                    item.carer_booking_job_offer_processing.carer_user_info
                      .last_name}
                </Text>
                {/* <View style={{ flexDirection: 'row' }}>
                 
                  <Text
                    style={{
                      fontSize: s(14),
                      color: colors.blueLight,
                      marginTop: ms(5),
                      marginLeft: ms(20),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    {item.carer_booking_job_offer_processing.shift}
                  </Text>
                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
           
                    marginTop: ms(10),
                    flex:1
                  }}>
                  <View style={{ flexDirection: 'row',flex:1}}>
                    <Image
                      source={images.maps}
                      style={{
                        height: mvs(20),
                        width: mvs(19),
                        resizeMode: 'contain',
                      }}></Image>
                    <Text
                    numberOfLines={2}
                      style={{
                        flex:1,
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                        color: colors.blueLight,
                        marginLeft: ms(10),
                      }}>
                      {/* {parseInt(item.carer_user_info.user_meta_info.distance).toFixed(2)} Miles Away */}
                      {parseFloat(
                        item.carer_booking_job_offer_processing.carer_user_info
                          .user_meta_info.distance,
                      ).toFixed(2)}{' '}
                      Miles Away
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row',flex:1 }}>
                    <Image
                      source={images.time}
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
                      {
                        item.carer_booking_job_offer_processing.carer_user_info
                          .user_meta_info.experience
                      }
                      Year
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
                 Price Per Hour
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    marginLeft: ms(18),
                    color: colors.blue,
                  }}>
                  £ {item?.carer_booking_job_offer_processing?.total_service_price}
                </Text>
              </View>
              <View
                style={{

                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderColor: colors.confirmedGreen,
                    borderRadius: ms(20),
                    borderWidth: 1,
                    backgroundColor: colors.confirmedGreenBg,
                    marginHorizontal: ms(10),
                    paddingHorizontal: ms(6),
                    alignSelf: 'center',
                    paddingVertical: ms(2),
                  }}>
                  <Text
                    style={{
                      color: colors.confirmedGreen,
                      fontSize: s(12),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    Confirmed
                  </Text>
                </View>
                {/* <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginEnd: ms(5),
                    color: colors.blueLight,
                  }}>
                  Available For:
                </Text>
                {item.carer_booking_job_offer_processing.carer_user_info
                  .user_meta_info.available_for === 'Female' ? (
                  <Image
                    source={images.femalesign}
                    style={{
                      height: mvs(24),
                      width: mvs(24),
                      resizeMode: 'contain',
                    }}></Image>
                ) : item.carer_booking_job_offer_processing.carer_user_info
                    .user_meta_info.available_for === 'No preference' ? (
                  <>
                    <Image
                      source={images.malesign}
                      style={{
                        height: mvs(24),
                        width: mvs(24),
                        resizeMode: 'contain',
                      }}></Image>

                    <Image
                      source={images.femalesign}
                      style={{
                        height: mvs(24),
                        width: mvs(24),
                        marginStart: ms(5),
                        resizeMode: 'contain',
                      }}></Image>
                  </>
                ) : (
                  <Image
                    source={images.malesign}
                    style={{
                      height: mvs(24),
                      width: mvs(24),
                      resizeMode: 'contain',
                    }}></Image>
                )} */}
                {/* {item.availablesingle == null ? (
              <></>
            ) : ( */}
                {/* <Image
              source={images.malesign}
              style={{
                height: mvs(24),
                width: mvs(24),
                marginEnd: ms(5),
                resizeMode: 'contain',
              }}></Image> */}
                {/* )} */}

                {/* <Image
              source={images.femalesign}
              style={{
                height: mvs(24),
                width: mvs(24),
                resizeMode: 'contain',
              }}></Image> */}
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
                      item.carer_booking_job_offer_processing.id,
                    key: 'confirmed',
                    paymentSummary:item?.id,
                      name:item?.category_info?.category_name
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
            

            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: mvs(10),
                marginHorizontal: ms(16),
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => paymentDetail(item)}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    color: colors.primaryColor,
                  }}>
                  View Payment Detail
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(24),
                  color: colors.primaryColor,
                }}>
                £ {item.carer_booking_job_offer_processing.total_service_price}
             
              </Text>
            </View> */}



          </View>
        ) : (
          <View
            style={{
              flex: 1,
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
                  })
                }>
                <Text
                  style={{
                    fontSize: s(18),
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
                      id: item?.carer_booking_job_offer_processing?.apply_by_carer_user_id,
                      name: item?.carer_booking_job_offer_processing
                        ?.carer_user_info?.first_name,
                      image:
                        item?.carer_booking_job_offer_processing
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
                    id: item?.carer_booking_job_offer_processing?.apply_by_carer_user_id,
                    name: item?.carer_booking_job_offer_processing
                      ?.carer_user_info?.first_name,
                    image:
                      item?.carer_booking_job_offer_processing
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
              Chat with {item?.carer_booking_job_offer_processing
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
                    item.carer_booking_job_offer_processing.carer_user_info
                      .profile_image,
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
                  {item.carer_booking_job_offer_processing.carer_user_info
                    .first_name +
                    ' ' +
                    item.carer_booking_job_offer_processing.carer_user_info
                      .last_name}
                </Text>
                {/* <View style={{ flexDirection: 'row' }}>
                
                  <Text
                    style={{
                      fontSize: s(14),
                      color: colors.blueLight,
                      marginTop: ms(5),
                      marginLeft: ms(20),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    {item.carer_booking_job_offer_processing.shift}
                  </Text>
                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                    flex: 1,
                    marginTop: ms(10),
                  }}>
                  <View style={{ flexDirection: 'row', flex: 1, marginRight: ms(8) }}>
                    <Image
                      source={images.maps}
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

                        marginLeft: ms(8),
                      }}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {/* {parseInt(item.carer_user_info.user_meta_info.distance).toFixed(2)} Miles Away */}
                      {parseFloat(
                        item.carer_booking_job_offer_processing.carer_user_info
                          .user_meta_info.distance,
                      ).toFixed(2)}{' '}
                      Miles Away
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', }}>
                    <Image
                      source={images.time}
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
                        marginLeft: ms(8),
                      }}>
                      {
                        item.carer_booking_job_offer_processing.carer_user_info
                          .user_meta_info.experience
                      }
                      { item.carer_booking_job_offer_processing.carer_user_info
                          .user_meta_info.experience==1?"year":"years"}
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
                  Hourly rate
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(18),
                    marginLeft: ms(18),
                    color: colors.blue,
                  }}>
                  £{item.carer_booking_job_offer_processing.status==13?item.carer_booking_job_offer_processing.old_total_price:item.carer_booking_job_offer_processing.price}
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
                    backgroundColor: colors.blueBg,
                    marginHorizontal: ms(5),
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
                    Job Offer Sent
                  </Text>
                </View>
                {/* <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginEnd: ms(5),
                    color: colors.blueLight,
                  }}>
                  Available For:
                </Text>
                {item.carer_booking_job_offer_processing.carer_user_info
                  .user_meta_info.available_for === 'Female' ? (
                  <Image
                    source={images.femalesign}
                    style={{
                      height: mvs(24),
                      width: mvs(24),
                      resizeMode: 'contain',
                    }}></Image>
                ) : item.carer_booking_job_offer_processing.carer_user_info
                    .user_meta_info.available_for === 'No preference' ? (
                  <>
                    <Image
                      source={images.malesign}
                      style={{
                        height: mvs(24),
                        width: mvs(24),
                        resizeMode: 'contain',
                      }}></Image>

                    <Image
                      source={images.femalesign}
                      style={{
                        height: mvs(24),
                        width: mvs(24),
                        marginStart: ms(5),
                        resizeMode: 'contain',
                      }}></Image>
                  </>
                ) : (
                  <Image
                    source={images.malesign}
                    style={{
                      height: mvs(24),
                      width: mvs(24),
                      resizeMode: 'contain',
                    }}></Image>
                )} */}
                {/* {item.availablesingle == null ? (
              <></>
            ) : ( */}
                {/* <Image
              source={images.malesign}
              style={{
                height: mvs(24),
                width: mvs(24),
                marginEnd: ms(5),
                resizeMode: 'contain',
              }}></Image> */}
                {/* )} */}

                {/* <Image
              source={images.femalesign}
              style={{
                height: mvs(24),
                width: mvs(24),
                resizeMode: 'contain',
              }}></Image> */}
              </View>
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
                paddingVertical: mvs(15),
                paddingHorizontal: mvs(15),

                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ViewJobOffer', {
                    viewJobOfferId: item.carer_booking_job_offer_processing.id,
                  });
                }}
                style={{
                  borderColor: colors.orange,
                  borderRadius: ms(20),
                  borderWidth: 1,
                  backgroundColor: colors.orange,
                  marginHorizontal: ms(5),
                  paddingVertical: mvs(4),
                  paddingHorizontal: mvs(15),
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: s(9),
                    fontFamily: fonts.quicksandBold,
                  }}>
                  View Job Offer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() =>
                //   props.navigation.navigate('ChatScreen', {
                //     carerData: {
                //       id: item?.id,
                //       name: item?.carer_booking_job_offer_processing
                //         ?.carer_user_info?.first_name,
                //       image:
                //         item?.carer_booking_job_offer_processing
                //           ?.carer_user_info?.profile_image,
                //     },
                //   })
                // }
                style={{
                  borderWidth: 1,
                  borderRadius: ms(12.5),
                  flexDirection: 'row',

                  paddingHorizontal: mvs(15),

                  marginHorizontal: ms(10),
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

                paddingVertical: mvs(10),
                paddingHorizontal: mvs(15),

              }}>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ViewJobOffer', {
                    viewJobOfferId: item.carer_booking_job_offer_processing.id,
                  });
                }}
                style={{
                  borderRadius: ms(6),
                  // padding: ms(13),
                  width: '100%',
                  borderWidth: 1,
                  height: mvs(45),
                  justifyContent: 'center',
                  borderColor: colors.green,
                  backgroundColor: colors.green,
                }}>
                <Text
                  style={{
                    fontSize: s(18),
                    textAlign: 'center',
                    color: colors.white,
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  View Job Offer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  };

  const declineServiceAgrements = declineId => {
    if (reasonId == '') {
      snackbarError('select Reason');
    } else if (otherReasoninfo == true && otherReason == '') {
      snackbarError('select other Reason');
    } else {
      setReasonModal(false);
      let decline = {
        decline_reason_id: reasonId,
        decline_reason: otherReason,
        carer_booking_id: declineCarerId,
      };

      dispatch(userActionServices.declineServiceAgreement(decline));
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
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarSuccess(declineSericeAgrementList.value.message);
        }, 100);
        setCurrentPage(1);
        setJobSearchList([]);
        setIsDataBlank(0)
        // const querParmsApi = getjobpostedlists + '?page=' + 1;
        dispatch({
          type:'ISLOADING',
          payload:true
        })
        let page = {
          page: currentPage,
          status: filterArray,
        };
        dispatch(userActionServices.getJobPosted(page));
        //  setUpadteDate('')
        //  setSendApiDate([])
        // setType(3);
        // props.navigation.navigate('PostJobList');

        // props.navigation.navigate('HomeTab');
        setOtherReason('');
        setOtherReasonInfo(false);
        setReasonId('');
        setReasonModal(false);
        setReasonTitle({
          id: 0,
          title: 'Select Reason',
        });
        dispatch(userActionServices.resetData());
      } else {
        dispatch(userActionServices.resetData());
      }
    } else {
    }
  }, [declineSericeAgrementList]);

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
setTimeout(() => {
  setPaymentDetailModal(true);  
}, 1000);

        dispatch(userActionServices.resetData());
      } else {
        dispatch(userActionServices.resetData());
      }
    } else {
    }
  }, [paymentDetailData]);

  // response jobPosted get api and set data
  useEffect(() => {
    console.log("a,mamamma");
    hideLoader();
    if (getJobPostLstData.type === JOBPOSTEDLIST) {
      if (getJobPostLstData?.value?.status) {
        if (
          Object.keys(getJobPostLstData?.value).length != 0 &&
          getJobPostLstData?.value != undefined
        ) {
          dispatch({
            type:'ISLOADING',
            payload:false
          })
          // if (Object.keys(getJobPostLstData?.value?.data?.data).length > 0) {
          //   setIsDataBlank(1)
          // } else {
          //   setIsDataBlank(2)
          // }
          setJobSearchList(jobsearchList => [
            ...jobsearchList,
            ...getJobPostLstData.value.data.data,
          ]);
          dispatch(userActionServices.resetData());
        }
      } 
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [getJobPostLstData]);

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
      dispatch(userActionServices.getJobPosted(page));
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
      dispatch(userActionServices.getJobPosted(loadingPage));
    }
    //   dispatch(userActionServices.getJobPosted())
  };

  useEffect(() => {
    let declineBody = {
      type: 1,
    };
    dispatch(userActionServices.offerDeclineReasons(declineBody));
  }, []);

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
    setFilterModal(false);
    setJobSearchList([]);
    setIsDataBlank(0)
    setUpdateFilter(!updateFilter);
    let filterBody = {
      page: 1,
      status: filterArray,
    };
    dispatch({
      type:'ISLOADING',
      payload:true
    })
    dispatch(userActionServices.getJobPosted(filterBody));
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
            Job Posted
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
      {/* <View
        style={{ flex: 1, marginHorizontal: ms(16), marginVertical: mvs(10) }}>
        {  issDataLoad==1? (
          <View style={{ alignContent: 'center', justifyContent: 'center' }}>
            <Text
              style={{
                fontSize: s(14),
                color: colors.red,
                textAlign: 'center',
                fontFamily: fonts.quicksandMedium,
              }}>
              No data found
            </Text>
          </View>
        ) : jobsearchList.length> 0 ? (
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
        ) : <></>

        }
      </View> */}
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
