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
  Modal,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import images from '../utils/images';
import {fonts} from '../utils/font';
import {colors} from '../utils/colors';
import {color} from 'react-native-reanimated';
import {ACCESS_TOKEN, SIGN_OUT, TOKEN, USER_DATA} from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, showLoader} from '../component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseToken} from '../constant/constant';
import {userActionServices} from '../redux/userServices';
import {snackbarSuccess, snackbarError} from '../utils/snackbar';
import {
  declineServiceAgrements,
  Image_URL,
  SUCCESS,
} from '../utils/apiConstants';
// import ReadMore from '@fawazahmed/react-native-read-more';
import {Popable} from 'react-native-popable';
import {getjobpostedlists} from '../utils/apiConstants';
import ReadMore from 'react-native-read-more-text';
import moment from 'moment';
import {
  CARESEEKER_CANCEL_BOOKING,
  JOBPOSTEDLIST,
  LOGOUT,
  MYBOOKINGLIST,
  OFFERDECLINEREASONS,
  SUBMIT_REVIEW,
  CANCEL_BOOKING_INFO,
  CREATE_TICKET,
  GET_CREATE_TICKET,
} from '../utils/reducerConstant';
import {useIsFocused} from '@react-navigation/native';
import MyDropDown from '../component/MyDropDown';
import {AuthContext} from '../navigation/context';
import StarRating from 'react-native-star-rating-widget';
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
export default function MyBooking(props) {
  const {navigation} = props;
  const {signOut} = useContext(AuthContext);

  const isLoadingValue = useSelector(state => state.isLoading);
  console.log("isLoading?>??",isLoadingValue?.loading);
  var joblist = [];
  const dispatch = useDispatch();
  const service_state = props?.route.params?.serviceState;
  const myBookingsDeaital = useSelector(state => state.myBookingsDeaital);
  const createSupportTicketData = useSelector(state => state.CreateSupportData);

  const getCancelBookingInfodata = useSelector(
    state => state.getCancelBookingInfodata,
  );
  const submitReviewValue = useSelector(state => state.submitReviewData);

  const cancelCareSeekerBookingDataValue = useSelector(
    state => state.cancelCareSeekerBookingData,
  );
  const [rating, setRating] = useState(0);
  const aboutScrollRef = useRef();
  const [type, setType] = useState(1);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusTab, setStatusTab] = useState(
    props?.route.params?.serviceState == '' ||
      props?.route.params?.serviceState == undefined
      ? 1
      : props?.route.params?.serviceState + 1,
  );
  const [activeTab, setActiveTab] = useState(1);
console.log("currentBookingList>>>",currentBookingList);

  const [currentBookingList, setCurrentBookingList] = useState([]);
  const [BookingListData, setBookingListData] = useState([]);
  const [current, setCureent] = useState(false);
  const [completed, setcompleted] = useState(false);
  const [activeTabStatus, setActiveTabStatus] = useState('Current');
  const [cancelRequestModal, setCancelRequestModal] = useState(false);
  const [cancelled, setcancelled] = useState(false);
  const [otherReason, setOtherReason] = useState('');

  const [refundAmount, setRefundAmount] = useState('');
  const [refundAmounts, setRefundAmounts] = useState('');
  const [refundDate, setRefundDate] = useState(
    'Refund credited on Mon, 26 Oct',
  );
  const [refundmessage, setRefundmessage] = useState('');
  const [refund_status, setRefund_status] = useState('');
  const [last4_digit, setLast4_digit] = useState('');

  const [ratingFeedback, setRatingFeedback] = useState('');
  const [cancalType, setCancalType] = useState('');
  const [otherReasoninfo, setOtherReasonInfo] = useState(false);
  const [declineCarerId, setDeclineCarerId] = useState('');
  const [reasonId, setReasonId] = useState('');
  const [jobID, setJobid] = useState('');
  const [ticket_id, setTicketId] = useState('');
  const [reasonTitle, setReasonTitle] = useState({
    id: 0,
    title: 'Select Reason',
  });
  const offerDeclineReasonData = useSelector(
    state => state.offerDeclineReasonData,
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [reasonTitlesList, setReasonTitlesList] = useState([]);
  const [warningModal, setWarningModal] = useState(false);
  const [cancelModal, setcancelModal] = useState(false);
  const [cancelReasonModal, setcancelReasonModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [createSupportTicket, setCreateSupportTicket] = useState(false);
  const [ticketDetail, setTicketDetail] = useState('');
  const [ticketSucessfully, setTicketSucessfully] = useState(false);
  const [ticketSucessfullyModal, setTicketSucessfullyModal] = useState(false);
  const [refundstatusModal, setRefundstatusModal] = useState(false);
  const [refundAmountModal, setRefundAmountModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachementFile, setAttachementFile] = useState([]);
  const [attachementFiles, setAttachementFiles] = useState([]);
  const [refundSucesfullyModal, setRefundSucesfullyModal] = useState(false);
  const [totalAmountPaid, setTotalAmountPaid] = useState('');
  const [pos, setPos] = useState(false);
  const [updateSubData, setUpdateSubData] = useState('');
  const [isDataBlank, setIsDataBlank] = useState(0);
  const [issDataLoad, setIsDataLoad] = useState(0);
console.log("isDataBlank",isDataBlank);
  const [currentItemLists, setCurrentItemLists] = useState([]);
  const [completedItemLists, setcompletedItemLists] = useState([]);

  const [cancelItemLists, setcancelItemLists] = useState([]);
  const jobDetail = item => {
    props.navigation.navigate('MyBookingJobDeatils', {
      id: item.id,
      cancelBtn: item?.cancelled_btn,
      tab: activeTab,
    });
    setCurrentPage(1);
    setCurrentBookingList([]);
    setcancelItemLists([]);
    setcompletedItemLists([]);
    setActiveTab(1)
  };

  const cancelRequestFun = (item, type) => {
    setReasonTitlesList([]);
    console.log("item?.carerBookingsInfo?.id",item?.carerBookingsInfo?.id);
    setReasonId('');
    setReasonTitle({
      id: 0,
      title: 'Select Reason',
    });
    setCancelRequestModal(true);
    setDeclineCarerId(item?.carerBookingsInfo?.id);
    let declineBody = {
      type: 9,
    };

    dispatch(userActionServices.offerDeclineReasons(declineBody));
  };

  const createTicket = item => {
    setReasonTitlesList([]);
    setAttachementFiles([]);
    setReasonId('');
    setTicketDetail('');
    setReasonTitle({
      id: 0,
      title: 'Select Reason',
    });
    setCreateSupportTicket(true);
    setDeclineCarerId(item?.carerBookingsInfo?.id);
    let declineBody = {
      type: 11,
    };

    dispatch(userActionServices.offerDeclineReasons(declineBody));
  };
  const [readBell, setReadBell]=useState(0)
  const declineCancelRequest = declineId => {
    if (reasonId == '') {
      snackbarError('select Reason');
    } else if (otherReasoninfo == true && otherReason == '') {
      snackbarError('select other Reason');
    } else {
      let decline = {
        decline_reason_id: reasonId,
        decline_reason: otherReason,
        carer_booking_id: declineCarerId,
      };
console.log("decline body>>>>",decline);
      dispatch(userActionServices.cancelBookingAction(decline));
    }
  };

  const submitReviewUser = item => {
    if (item?.isReviewSubmitted == 0) {

      console.log("item?.id>>",item?.id);
      setJobid(item?.id);

      setReviewModal(true);
    } else {
      snackbarError('Already submitted');
    }
  };

  // cureent item render
  const CurrentItemList = ({item, index, separators}) => {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 10,

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
            marginLeft: mvs(16),
          }}>
          <TouchableOpacity onPress={() => jobDetail(item)}>
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
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ChatScreen', {
                carerData: {
                  id: item?.carerBookingsInfo?.carer_user_info?.id,
                  name: item?.carerBookingsInfo?.carer_user_info?.first_name,
                  title: item?.category_info?.category_name,
                  image:
                    item?.carerBookingsInfo?.carer_user_info?.profile_image,
                  from: 'MyBooking',
                },
              });
              setCurrentBookingList([]);
              setcancelItemLists([]);
              setcompletedItemLists([]);
              setActiveTab(1);
              setActiveTabStatus('Current');
            }}
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
          </TouchableOpacity> */}

          <TouchableOpacity
     onPress={() => {
      props.navigation.navigate('ChatScreen', {
        carerData: {
          id: item?.carerBookingsInfo?.carer_user_info?.id,
          name: item?.carerBookingsInfo?.carer_user_info?.first_name,
          title: item?.category_info?.category_name,
          image:
            item?.carerBookingsInfo?.carer_user_info?.profile_image,
          from: 'MyBooking',
        },
      });
      setCurrentBookingList([]);
      setcancelItemLists([]);
      setcompletedItemLists([]);
      setActiveTab(1);
      setActiveTabStatus('Current');
    }}
          style={{
            borderWidth: 1,
            borderRadius: ms(12.5),
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: mvs(18),
            width: ms(85),
            backgroundColor: colors.primaryColor,
            borderColor: colors.primaryColor,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: ms(8),
            }}>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),

                resizeMode: 'contain',
              }}></Image>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
                marginTop:5,
               // marginVertical: mvs(6),
              }}>
              CHAT WITH 
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.darkblue,
              borderRadius: ms(6),
              flex: 1,
              width: '100%',
              marginTop: mvs(1),
              borderBottomRightRadius: ms(9),
              borderBottomLeftRadius: ms(9),
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
                textAlign: 'center',
                padding: ms(8),
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
            {item?.carerBookingsInfo?.carer_user_info?.first_name}
            </Text>
          </View>
        </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colors.primaryColor,
            fontFamily: fonts.quicksandMedium,
            fontSize: s(16),
            marginStart: s(16),
            marginTop: mvs(5),
          }}>
          Job ID:- {item?.job_unq_id}
        </Text>
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
                item?.carerBookingsInfo?.carer_user_info?.profile_image,
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
              {item.carerBookingsInfo.carer_user_info.first_name +
                ' ' +
                item.carerBookingsInfo.carer_user_info.last_name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.blueLight,
                  marginTop: ms(5),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {item.category_info.category_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                marginTop: ms(10),
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Image
                  source={images.myBooking}
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
                    flex: 1,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {moment(
                    item?.care_seeker_booking_duration_info[0]?.booking_date,
                  ).format('D MMM YYYY')}
                  , {item?.shift_info.shift}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,

            marginLeft: ms(16),
            marginVertical: ms(10),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(13),
                color: colors.blueLight,
              }}>
              Service Cost Per Hour
            </Text>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(14),
                marginLeft: ms(5),
                color: colors.blue,
              }}>
              £{' '}
              {parseFloat(item.carerBookingsInfo.total_service_price).toFixed(
                2,
              )}
              {/* {parseInt(item.carerBookingsInfo.total_service_price).toFixed(2)} */}
              {/* {item.carerBookingsInfo.total_service_price} */}
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: ms(20),
              marginEnd: ms(16),
              justifyContent: 'center',
              paddingHorizontal: ms(10),
              paddingVertical: ms(4),
              alignItems: 'center',
              backgroundColor:
                item?.main_job_status == 1 ? colors.ornageBg : colors.blueBg,

              borderColor:
                item?.main_job_status == 1
                  ? colors.orange
                  : colors.inProgresscolor,
            }}>
            <Text
              style={{
                color:
                  item?.main_job_status == 1
                    ? colors.orange
                    : colors.inProgresscolor,

                fontFamily: fonts.quicksandMedium,
                fontSize: s(12),
              }}>
              {item?.main_job_status == 1 ? 'Upcoming' : 'In Progress'}
            </Text>
          </View>
        </View>
        {item?.cancelled_btn == 1 ? (
          <TouchableOpacity
            onPress={() => {
              cancelRequestFun(item, 'current');
              // let body = {
              //   carer_booking_id: item?.carerBookingsInfo?.id
              // }
              // dispatch(userActionServices.cancelBookingAction(body))
            }}
            style={{
              borderColor: colors.grey,
              backgroundColor: colors.grey,
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
              Cancel Booking
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  };

  // completed item render
  const CompletedItemList = ({item, index, separators}) => {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 10,

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
            marginLeft: mvs(16),
          }}>
          <TouchableOpacity onPress={() => jobDetail(item)}>
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
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ChatScreen', {
                carerData: {
                  id: item?.carerBookingsInfo?.carer_user_info?.id,
                  name: item?.carerBookingsInfo?.carer_user_info?.first_name,
                  title: item?.category_info?.category_name,
                  image:
                    item?.carerBookingsInfo?.carer_user_info?.profile_image,
                  from: 'MyBooking',
                },
              });

              setCurrentBookingList([]);
              setcancelItemLists([]);
              setcompletedItemLists([]);
              setActiveTab(2);
              setActiveTabStatus('Completed');
            }}
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
          </TouchableOpacity> */}

<TouchableOpacity
    onPress={() => {
      props.navigation.navigate('ChatScreen', {
        carerData: {
          id: item?.carerBookingsInfo?.carer_user_info?.id,
          name: item?.carerBookingsInfo?.carer_user_info?.first_name,
          title: item?.category_info?.category_name,
          image:
            item?.carerBookingsInfo?.carer_user_info?.profile_image,
          from: 'MyBooking',
        },
      });

      setCurrentBookingList([]);
      setcancelItemLists([]);
      setcompletedItemLists([]);
      setActiveTab(2);
      setActiveTabStatus('Completed');
    }}
          style={{
            borderWidth: 1,
            borderRadius: ms(12.5),
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: mvs(18),
            width: ms(85),
            backgroundColor: colors.primaryColor,
            borderColor: colors.primaryColor,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: ms(8),
            }}>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),

                resizeMode: 'contain',
              }}></Image>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
                marginTop:5,
               // marginVertical: mvs(6),
              }}>
              CHAT WITH 
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.darkblue,
              borderRadius: ms(6),
              flex: 1,
              width: '100%',
              marginTop: mvs(1),
              borderBottomRightRadius: ms(9),
              borderBottomLeftRadius: ms(9),
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
                textAlign: 'center',
                padding: ms(8),
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
            {item?.carerBookingsInfo?.carer_user_info?.first_name}
            </Text>
          </View>
        </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colors.primaryColor,
            fontFamily: fonts.quicksandMedium,
            fontSize: s(16),
            marginStart: s(16),
            marginTop: mvs(5),
          }}>
          Job ID:- {item?.job_unq_id}
        </Text>
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
                item.carerBookingsInfo.carer_user_info.profile_image,
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
              {item.carerBookingsInfo.carer_user_info.first_name +
                ' ' +
                item.carerBookingsInfo.carer_user_info.last_name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.blueLight,
                  marginTop: ms(5),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {item.category_info.category_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                marginTop: ms(10),
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Image
                  source={images.myBooking}
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
                    flex: 1,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {moment(
                    item?.care_seeker_booking_duration_info[0]?.booking_date,
                  ).format('D MMM YYYY')}
                  , {item?.shift_info.shift}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            height: 1,
            width: '100%',
            marginTop: mvs(15),
            marginHorizontal: 16,
            borderColor: colors.lightBackground,
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,

            marginLeft: ms(16),
            marginVertical: ms(10),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(13),
                color: colors.blueLight,
              }}>
              Service Cost Per Hour
            </Text>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(14),
                marginLeft: ms(5),
                color: colors.blue,
              }}>
              £{' '}
              {parseFloat(item.carerBookingsInfo.total_service_price).toFixed(
                2,
              )}
              {/* {item.carerBookingsInfo.total_service_price} */}
            </Text>
          </View>

          {item?.isTicketSubmitted == 0 ? (
            <TouchableOpacity
              onPress={() => {
                // setCreateSupportTicket(true)
                // props.navigation.navigate('MyTicket');
                createTicket(item);
                setActiveTab(1)
              }}
              style={{
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: ms(20),
                marginEnd: ms(16),
                justifyContent: 'center',
                paddingHorizontal: ms(10),
                paddingVertical: ms(4),
                alignItems: 'center',
                backgroundColor: colors.primaryColor,
                borderColor: colors.primaryColor,
              }}>
              <Text
                style={{
                  color: colors.white,

                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(12),
                }}>
                Create Ticket
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                // setCreateSupportTicket(true)
                props.navigation.navigate('MyTicket', {
                  id: item?.carerBookingsInfo?.id,
                });
                setActiveTab(1)
                //  createTicket(item);
              }}
              style={{
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: ms(20),
                marginEnd: ms(16),
                justifyContent: 'center',
                paddingHorizontal: ms(10),
                paddingVertical: ms(4),
                alignItems: 'center',
                backgroundColor: colors.red,
                borderColor: colors.red,
              }}>
              <Text
                style={{
                  color: colors.white,

                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(12),
                }}>
                My Ticket
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingVertical: mvs(15),
            paddingHorizontal: mvs(15),
            justifyContent: 'space-between',
          }}>
          {item?.isInvoiceApproved > 0 && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Invoice', {
                  id: item?.id,
                });
                setActiveTab(1)
              }}
              style={{
                borderRadius: ms(6),
                // padding: ms(13),
                width: '48%',
                borderWidth: 1,
                height: mvs(45),
                justifyContent: 'center',
                borderColor: item?.invoiceTime == 2 ? colors.red : colors.green,
                backgroundColor:
                  item?.invoiceTime == 2 ? colors.red : colors.green,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: fonts.quicksandMedium,
                  color: colors.white,
                }}>
                Invoice Approval
              </Text>
            </TouchableOpacity>
          )}

          {item?.isRebook > 0 && (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('BookingRequest', {
                  name: item.carerBookingsInfo.carer_user_info.first_name,
                  lastName: item.carerBookingsInfo.carer_user_info.last_name,
                  category: item.category_info.category_name,
                  id: item.carerBookingsInfo.carer_user_info.id,
                  jobTitle: item.category_info?.id,
                  from: 'MyBooking',
                });
              }}
              style={{
                borderRadius: ms(6),
                // padding: ms(13),
                width: '48%',
                borderWidth: 1,
                height: mvs(45),
                justifyContent: 'center',
                borderColor: colors.green,
                backgroundColor: colors.green,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: fonts.quicksandMedium,
                  color: colors.white,
                }}>
                ReBook
              </Text>
            </TouchableOpacity>
          )}

          {item?.invoiceTime == 2 && (
            <View
              style={{
                borderRadius: ms(6),
                // padding: ms(13),
                width: '48%',
                borderWidth: 1,
                height: mvs(45),
                justifyContent: 'center',
                borderColor: colors.red,
                backgroundColor: colors.red,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: fonts.quicksandMedium,
                  color: colors.white,
                }}>
                Invoice Rejected
              </Text>
            </View>
          )}

          {item?.isInvoiceApproved == 0 &&
            item?.invoiceTime == 0 &&
            item?.isRebook == 0 && (
              <View
                style={{
                  borderRadius: ms(6),
                  // padding: ms(13),
                  width: '48%',
                  borderWidth: 1,
                  height: mvs(45),
                  justifyContent: 'center',
                  borderColor: colors.primaryColor,
                  backgroundColor: colors.primaryColor,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: fonts.quicksandMedium,
                    color: colors.white,
                  }}>
                  Waiting for Invoice
                </Text>
              </View>
            )}

          {item?.isInvoiceApproved == 0 &&
            item?.invoiceTime == 1 &&
            item?.isRebook == 0 && (
              <View
                style={{
                  borderRadius: ms(6),
                  // padding: ms(13),
                  width: '48%',
                  borderWidth: 1,
                  height: mvs(45),
                  justifyContent: 'center',
                  borderColor: colors.primaryColor,
                  backgroundColor: colors.primaryColor,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: fonts.quicksandMedium,
                    color: colors.white,
                  }}>
                  Waiting for Invoice
                </Text>
              </View>
            )}

          <TouchableOpacity
            // onPress={() => applyClickHandler()}
            onPress={() => {
              // setJobid(item?.id);

              // setReviewModal(true);
              submitReviewUser(item);
            }}
            disabled={item?.isReviewSubmitted == 0 ? false : true}
            style={{
              borderRadius: ms(6),
              // padding: ms(13),
              width: '48%',
              borderWidth: 1,
              height: mvs(45),
              justifyContent: 'center',

              borderColor:
                item?.isReviewSubmitted == 0
                  ? colors.orange
                  : colors.lightBackground,
              backgroundColor:
                item?.isReviewSubmitted == 0
                  ? colors.orange
                  : colors.lightBackground,
            }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontFamily: fonts.quicksandMedium,
                color:
                  item?.isReviewSubmitted == 0 ? colors.white : colors.blue,
              }}>
              {item?.isReviewSubmitted == 0 ? 'Submit Review' : 'Review Submitted'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // cancel item render
  const CancelItemList = ({item, index, separators}) => {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 10,

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
            marginLeft: mvs(16),
          }}>
          <TouchableOpacity onPress={() => jobDetail(item)}>
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
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ChatScreen', {
                carerData: {
                  id: item?.carerBookingsInfo?.carer_user_info?.id,
                  name: item?.carerBookingsInfo?.carer_user_info?.first_name,
                  title: item?.category_info?.category_name,
                  image:
                    item?.carerBookingsInfo?.carer_user_info?.profile_image,
                  from: 'MyBooking',
                },
              });
              setCurrentBookingList([]);
              setcancelItemLists([]);
              setcompletedItemLists([]);
              setActiveTab(3);
              setActiveTabStatus('Cancelled');
            }}
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
          </TouchableOpacity> */}
          <TouchableOpacity
   onPress={() => {
    props.navigation.navigate('ChatScreen', {
      carerData: {
        id: item?.carerBookingsInfo?.carer_user_info?.id,
        name: item?.carerBookingsInfo?.carer_user_info?.first_name,
        title: item?.category_info?.category_name,
        image:
          item?.carerBookingsInfo?.carer_user_info?.profile_image,
        from: 'MyBooking',
      },
    });
    setCurrentBookingList([]);
    setcancelItemLists([]);
    setcompletedItemLists([]);
    setActiveTab(3);
    setActiveTabStatus('Cancelled');
  }}
          style={{
            borderWidth: 1,
            borderRadius: ms(12.5),
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: mvs(18),
            width: ms(85),
            backgroundColor: colors.primaryColor,
            borderColor: colors.primaryColor,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: ms(8),
            }}>
            <Image
              source={images.chatSign}
              style={{
                height: mvs(18),
                width: mvs(18),

                resizeMode: 'contain',
              }}></Image>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
                marginTop:5,
               // marginVertical: mvs(6),
              }}>
              CHAT WITH 
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.darkblue,
              borderRadius: ms(6),
              flex: 1,
              width: '100%',
              marginTop: mvs(1),
              borderBottomRightRadius: ms(9),
              borderBottomLeftRadius: ms(9),
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.quicksandBold,
                fontSize: s(9),
                textAlign: 'center',
                padding: ms(8),
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
            {item?.carerBookingsInfo?.carer_user_info?.first_name}
            </Text>
          </View>
        </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colors.primaryColor,
            fontFamily: fonts.quicksandMedium,
            fontSize: s(16),
            marginStart: s(16),
            marginTop: mvs(5),
          }}>
          Job ID:- {item?.job_unq_id}
        </Text>
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
                item.carerBookingsInfo.carer_user_info.profile_image,
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
              {item.carerBookingsInfo.carer_user_info.first_name +
                ' ' +
                item.carerBookingsInfo.carer_user_info.last_name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.blueLight,
                  marginTop: ms(5),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {item.category_info.category_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
                marginTop: ms(10),
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Image
                  source={images.myBooking}
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
                    flex: 1,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {moment(
                    item?.care_seeker_booking_duration_info[0]?.booking_date,
                  ).format('D MMM YYYY')}
                  , {item?.shift_info.shift}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,

            marginLeft: ms(16),
            marginVertical: ms(10),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(13),
                color: colors.blueLight,
              }}>
              Service Cost Per Hour
            </Text>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(14),
                marginLeft: ms(5),
                color: colors.blue,
              }}>
              £{' '}
              {parseFloat(item.carerBookingsInfo.total_service_price).toFixed(
                2,
              )}
              {/* {parseInt(item.carerBookingsInfo.total_service_price).toFixed(2)} */}
              {/* {item.carerBookingsInfo.total_service_price} */}
            </Text>
          </View>

          {item?.isTicketSubmitted == 0 ? (
            <TouchableOpacity
              onPress={() => {
                // setCreateSupportTicket(true)
                // props.navigation.navigate('MyTicket');
                createTicket(item);
              }}
              style={{
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: ms(20),
                marginEnd: ms(16),
                justifyContent: 'center',
                paddingHorizontal: ms(10),
                paddingVertical: ms(4),
                alignItems: 'center',
                backgroundColor: colors.primaryColor,
                borderColor: colors.primaryColor,
              }}>
              <Text
                style={{
                  color: colors.white,

                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(12),
                }}>
                Create Ticket
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                // setCreateSupportTicket(true)
                props.navigation.navigate('MyTicket', {
                  id: item?.carerBookingsInfo?.id,
                });
                setActiveTab(1)
                //  createTicket(item);
              }}
              style={{
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: ms(20),
                marginEnd: ms(16),
                justifyContent: 'center',
                paddingHorizontal: ms(10),
                paddingVertical: ms(4),
                alignItems: 'center',
                backgroundColor: colors.red,
                borderColor: colors.red,
              }}>
              <Text
                style={{
                  color: colors.white,

                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(12),
                }}>
                My Ticket
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            refundStatusAPI(item);
          }}
          style={{
            borderColor: '#ffa439',
            backgroundColor: '#ffa439',
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
            Refund Status
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  // screen change in current completed
  const chooseMap = number => {
    setType(number);
    if (number == 1) {
      setCureent(true);
    } else if (number == 2) {
      setcompleted(true);
    } else if (number == 3) {
      setcancelled(true);
    }
  };
  // modal open and close warning modal
  const cancelmodalfunction = () => {
    setWarningModal(false);
    setcancelReasonModal(true);
  };
  // modal open and close warning modal
  const modalclose = () => {
    setcancelReasonModal(false);
    setcancelModal(true);
  };
  // creason type
  const selecttype = type => {
    if (pos === type) {
      setPos(0);
    } else {
      setPos(type);
    }
  };

  useEffect(() => {
    setCurrentBookingList([]);
    setcancelItemLists([]);
    setcompletedItemLists([]);
    const unsubscribe = navigation.addListener('focus', () => {
      myServiceApiCall('Current');
    });
    setActiveTab(1)
    return unsubscribe;
  }, [navigation]);


  let focus = useIsFocused();
  
  // useEffect(() => {
  //   // dispatch(setPublicLeagueListinggData());
  //   setTimeout(() => {
  //     if (focus) {


  //       setCurrentBookingList([]);
  //       setcancelItemLists([]);
  //       setcompletedItemLists([]);
  //       const unsubscribe = navigation.addListener('focus', () => {
  //         myServiceApiCall('Current');
  //       });
  //     }
  //   }, 200);
  // }, [focus]);

  const myServiceApiCall = (status = 'Current') => {
    dispatch({
      type:'ISLOADING',
      payload:true
    })
  
    setIsDataBlank(0);
    setCurrentBookingList([]);
    setcancelItemLists([]);
    setcompletedItemLists([]);
    setIsDataLoad(0)
    let myBooking = {
      application_tab:
        service_state == '' || service_state == undefined
          ? status
          : activeTabStatus,
      page: currentPage,
    };

    setTimeout(() => {
      
      dispatch(userActionServices.myBookings(myBooking));
    }, 100);
  };

  const loadMoreItem = () => {
    if (
      currentBookingList.length > 2 ||
      completedItemLists.length > 2 ||
      cancelItemLists.length > 2
    ) {
      let loadPage = currentPage + 1;
      setIsDataBlank(0);
      setIsDataLoad(1)
      setCurrentPage(loadPage);
      let loadingData = {
        page: loadPage,
        application_tab: activeTabStatus,
      };
      console.log("loadingData.>>",loadingData);
      dispatch({
        type:'ISLOADING',
        payload:true
      })
    
      setTimeout(() => {
        dispatch(userActionServices.myBookings(loadingData));
      }, 100);

      // let myBooking = {
      //   application_tab: activeTabStatus,
      //   page: currentPage,
      // };

      // setTimeout(() => {
      //   dispatch(userActionServices.myBookings(myBooking));
      // }, 500);
    }
  };

  // response get api and set data
  useEffect(() => {
    // hideLoader();
    dispatch({
      type:'ISLOADING',
      payload:false
    })
    if (myBookingsDeaital.type === MYBOOKINGLIST) {
      if (myBookingsDeaital?.value?.status) {
        if (
          Object.keys(myBookingsDeaital?.value).length != 0 &&
          myBookingsDeaital?.value != undefined
        ) {
          console.log("myBookingsDeaital?.value?.data?.data>>",JSON.stringify(myBookingsDeaital?.value?.data));
          console.log("myBookingsDeaital?.value?.data?.data>>  refunfd amount",JSON.stringify(myBookingsDeaital?.value?.data[0]?.carerBookingsInfo
            ?.refund_amount));
          // if (Object.keys(myBookingsDeaital?.value?.data?.data).length > 0) {
          //   setIsDataBlank(1);
          // } else {
          //   setIsDataBlank(2);
          // }
          // if (currentBookingList.length>0||currentBookingList.length>0||cancelItemLists.length>0) {
          //   setIsDataBlank(1);
          // } else {
          //   setIsDataBlank(2);
          // }


          if (activeTab == 1) {
            setCurrentBookingList(currentBookingList => [
              ...currentBookingList,
              ...myBookingsDeaital.value.data,
            ]);
          
          } else if (activeTab == 2) {
            setcompletedItemLists(completedItemLists => [
              ...completedItemLists,
              ...myBookingsDeaital.value.data,
            ]);
          } else {
            setcancelItemLists(cancelItemLists => [
              ...cancelItemLists,
              ...myBookingsDeaital.value.data,
            ]);
          }
          setRefundAmount(
            myBookingsDeaital?.value?.data[0]?.carerBookingsInfo
              ?.refund_amount,
          );
          setReadBell(myBookingsDeaital?.value?.is_new_notify)
          // dispatch(userActionServices.resetData());
        }
      } 
     
    }

    if (cancelCareSeekerBookingDataValue.type === CARESEEKER_CANCEL_BOOKING) {
      if (cancelCareSeekerBookingDataValue?.value?.status) {
        if (
          Object.keys(cancelCareSeekerBookingDataValue?.value).length != 0 &&
          cancelCareSeekerBookingDataValue?.value != undefined
        ) {
          setTimeout(() => {
            setRefundSucesfullyModal(true);
          }, 100);

          // setTimeout(() => {
          //   snackbarSuccess(cancelCareSeekerBookingDataValue?.value?.message);
          // }, 100);

       //   dispatch(userActionServices.resetData());
        }
      }
    }
    if (submitReviewValue.type === SUBMIT_REVIEW) {
      if (submitReviewValue?.value?.status) {
        if (
          Object.keys(submitReviewValue?.value).length != 0 &&
          submitReviewValue?.value != undefined
        ) {
          myServiceApiCall('Completed');
          setTimeout(() => {
            snackbarSuccess(submitReviewValue?.value?.message);
          }, 100);

         // dispatch(userActionServices.resetData());
        }
      } 
    }

    if (getCancelBookingInfodata.type === CANCEL_BOOKING_INFO) {
      if (getCancelBookingInfodata?.value?.status) {
        if (
          Object.keys(getCancelBookingInfodata?.value).length != 0 &&
          getCancelBookingInfodata?.value != undefined
        ) {

          console.log("getCancelBookingInfodata?.value?.data?.>>>",getCancelBookingInfodata?.value?.data);
          setTimeout(() => {
            activeTab == 3
              ? setRefundstatusModal(true)
              : setRefundAmountModal(true);
          }, 200);

          setRefundAmounts(getCancelBookingInfodata?.value?.data?.refund_amount);
          setRefundAmount(
            getCancelBookingInfodata?.value?.data?.refund_amount
          );
          setRefund_status(
            getCancelBookingInfodata?.value?.data?.refund_status,
          );
          setRefundDate(getCancelBookingInfodata?.value?.data?.refund_date);
          setRefundmessage(
            getCancelBookingInfodata?.value?.data?.refund_message,
          );
          setLast4_digit(
            getCancelBookingInfodata?.value?.data?.card_details?.last4_digit,
          );

          setTotalAmountPaid(
            getCancelBookingInfodata?.value?.data?.total_amount_paid,
          );
          setTimeout(() => {
            snackbarSuccess(submitReviewValue?.value?.message);
          }, 100);

         // dispatch(userActionServices.resetData());
        }
      }
    }

    if (createSupportTicketData.type === CREATE_TICKET) {
      if (createSupportTicketData?.value?.status) {
        if (
          Object.keys(createSupportTicketData?.value).length != 0 &&
          createSupportTicketData?.value != undefined
        ) {
          setTicketId(createSupportTicketData?.value?.data?.ticket_id);
          setTimeout(() => {
            setTicketSucessfullyModal(true);
          }, 200);

         //dispatch(userActionServices.resetData());
        }
      }
    }

    // dispatch(userActionServices.resetData());
    else {
    }
  }, [
    myBookingsDeaital,
    cancelCareSeekerBookingDataValue,
    submitReviewValue,
    getCancelBookingInfodata,
    createSupportTicketData,
  ]);

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
    }
  };

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

         // dispatch(userActionServices.resetData());
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [offerDeclineReasonData]);

  const submitReview = () => {
    if (rating == 0) {
      snackbarError('Please select star rating');
    } else if (ratingFeedback == '') {
      snackbarError('Please enter review');
    } else {
      setReviewModal(false);
      let body = {
        job_id: jobID,
        rating: rating,
        description: ratingFeedback,
      };

      dispatch(userActionServices.submitReviewActiion(body));
    }

    //dispatch()
  };

  const refundAmountApi = () => {
    if (reasonId == '') {
      snackbarError('select Reason');
    } else if (otherReasoninfo == true && otherReason == '') {
      snackbarError('select other Reason');
    } else {
      setCancelRequestModal(false);

      let body = {
        carer_booking_id: declineCarerId,
        type: 1,
      };
      dispatch(userActionServices?.getCancelBookingInfoActionb(body));
    }
  };

  const refundStatusAPI = item => {
    let body = {
      carer_booking_id: item?.carerBookingsInfo?.id,
      type: 2,
    };

    dispatch(userActionServices?.getCancelBookingInfoActionb(body));
  };

  const openImagePicker = async from => {
    if (from === 'gallery') {
      ImageCropPicker.openPicker({
        cropping: false,
        mediaType: 'photo',
        multiple: true,
        maxFiles: 5,
      })
        .then(image => {
          if (image.size >= 5000000) {
            snackbarError(
              'Image size is more 5 MB ! Please upload the image less than 5 MB.',
            );
          } else {
            console.log('picker image profile', image);
            let formData = new FormData();
            setTimeout(() => {
              setCreateSupportTicket(true);
            }, 200);
            let filearray = [];
            var array = image.map((v, i) => {
              var type = v.mime;
              var uri = v.path;
              var patt = /\w+[-\w+\s]*\.(jpg|png|jpeg)/g;
              var name = Platform.OS == 'ios' ? v.filename : v.path.match(patt);

              var file = {
                uri: uri,
                type: type,
                name: Platform.OS == 'ios' ? name : name[0],
              };
              filearray.push(file);
              // console.log(file, "file>>>>>>");
              // formData.append(`certificate_doc[${i}]`, file);

              return file;
            });

            console.log('gallery>>>>', filearray);
            setAttachementFiles(filearray);
            setAttachementFile(file);
          }
        })
        .catch(e => {
          setCreateSupportTicket(false);

          Alert(e.message);
        });
    } else {
      try {
        let filearray = [];
        let formData = new FormData();

        const res = await DocumentPicker.pick({
          allowMultiSelection: true,

          type: [
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
            DocumentPicker.types.pdf,
          ],
        });

        res.map((result, i) => {
          console.log(result, 'result>><><');
          console.log(i, 'result>><><');
          var uri = result.uri;
          var type = result.type;
          var name = result.name;
          var size = result.size;
          if (size >= 5000000) {
            snackbarError(
              'Document size is more 5 MB ! Please upload the document less than 5 MB.',
            );
            // Alert(
            //     'Document size is more 5 MB ! Please upload the document less than 5 MB.',
            // );
          } else {
            console.log('res : ', result);
            var file = {uri: uri, type: type, name: name};
            console.log(file, 'file>>>>>>>>');
            filearray.push(file);
            console.log('filearray', filearray);
            setAttachmentModal(false);

            setTimeout(() => {
              setCreateSupportTicket(true);
            }, 200);
          }
          console.log('document>>>>', filearray);
          setAttachementFiles(filearray);
        });
      } catch (err) {
        //Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
          //If user canceled the document selection
          setCreateSupportTicket(false);
          setAttachmentModal(false);
          console.log('Canceled from single doc picker');
        } else {
          //For Unknown Error
          setCreateSupportTicket(false);
          setAttachmentModal(false);
          console.log('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    }
  };

  const picsItemRender = ({item, index, separators}) => {
    //if (index < 4)
    return (
      <View style={{marginEnd: 16, flex: 1}}>
        <View
          // onPress={() => selectedSubService(item, index)}
          style={{marginTop: 10}}>
          <Image
            style={{
              height: 82,
              width: 82,
              resizeMode: 'cover',
              borderRadius: 10,
            }}
            source={{uri: item.uri}}
            // source={image === '' ? images.user_profile : { uri: item.uri }}
          />
        </View>
      </View>
    );
  };

  const createSupportTicketFunction = () => {
    if (reasonId == '') {
      snackbarError('select Reason');
    } else if (ticketDetail == '') {
      snackbarError('Ticket Detail should not be blanked');
    } else {
      setCreateSupportTicket(false);

      let formData = new FormData();

      // attachementFiles.map((v, i) => {

      //     var file = {
      //           // uri: "https://picsum.photos/200/300",
      //         uri: v.uri,
      //         type: Platform.OS == 'ios' ? "image" : 'image/jpeg',
      //         name: v.name
      //     };
      //     console.log("file>>>", file);
      //     formData.append(`attachments[${i}]`, file);

      // })
      // attachementFiles.forEach((v, i) => {
      //   console.log("v>>>",v);
      //   formData.append(`attachments[${i}]`, v);
      // });

      for (let i = 0; i < attachementFiles?.length; i++) {
        formData.append(`attachments[${i}]`, attachementFiles[i]);
      }
      formData.append('carer_booking_id', declineCarerId);
      formData.append('ticket_reason', reasonId);
      formData.append('ticket_details', ticketDetail);

      console.log('support ticket >>>>>>', formData);
      dispatch(userActionServices?.createSupportTicketAction(formData));
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* //warning modal */}
      <Modal animationType="slide" transparent={true} visible={warningModal}>
        <ScrollView
          style={{
            flex: 1,

            backgroundColor: colors.blue60,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',

              marginTop: Platform.OS === 'ios' ? ms(380) : ms(360),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <Image
              source={images.warning}
              style={{
                height: mvs(99),
                alignSelf: 'center',
                marginTop: mvs(30),
                width: mvs(183),
                resizeMode: 'contain',
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
            <View style={{marginHorizontal: ms(16), flex: 1}}>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(16),
                  textAlign: 'center',
                  marginTop: mvs(27),
                  lineHeight: 24,
                  marginHorizontal: ms(34),
                  color: colors.blueLight,
                }}>
                Cancelling the booked job may increase your job cancellation
                rate.{' '}
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(16),
                    lineHeight: 24,
                    color: colors.primaryColor,
                  }}>
                  {' '}
                  Read more info
                </Text>
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 4,
                height: 1,
                width: '100%',
                marginTop: mvs(15),

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
                onPress={() => cancelmodalfunction()}
                style={styles.closeButton}>
                <Text
                  style={{
                    fontSize: s(18),
                    textAlign: 'center',
                    fontFamily: fonts.quicksandMedium,
                    color: colors.white,
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => applyClickHandler()}
                onPress={() => setWarningModal(false)}
                style={styles.appleButton}>
                <Text
                  style={{
                    fontSize: s(18),
                    textAlign: 'center',
                    fontFamily: fonts.quicksandMedium,
                    color: colors.white,
                  }}>
                  Keep the job
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
      {/* //cancel sucessfully modal */}
      <Modal animationType="slide" transparent={true} visible={cancelModal}>
        <ScrollView
          style={{
            flex: 1,

            backgroundColor: colors.blue60,
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: Platform.OS === 'ios' ? ms(350) : ms(270),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <Image
              source={images.cancelSucessfully}
              style={{
                height: mvs(99),
                alignSelf: 'center',
                marginTop: mvs(30),
                width: mvs(183),
                resizeMode: 'contain',
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
              Cancelled Successfully
            </Text>
            <View style={{marginHorizontal: ms(16), flex: 1}}>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(16),
                  textAlign: 'center',
                  marginVertical: mvs(30),
                  lineHeight: 24,

                  marginHorizontal: ms(34),
                  color: colors.blueLight,
                }}>
                Your Booking has been successfully cancelled. Please go to My
                Bookings to review other bookings.
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 4,
                height: 1,
                width: '100%',
                marginTop: mvs(15),

                borderColor: colors.lightBackground,
              }}></View>
            <TouchableOpacity
              onPress={() => setcancelModal(false)}
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
          </View>
        </ScrollView>
      </Modal>
      {/* //warning reason modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelReasonModal}>
        <View
          style={{
            flex: 1,

            backgroundColor: colors.blue60,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: ms(180),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(22),
                  textAlign: 'center',
                  marginTop: mvs(25),
                  marginHorizontal: ms(34),
                  color: colors.blue,
                }}>
                Please choose a reason to cancel this booked job
              </Text>

              <View style={{marginHorizontal: ms(16)}}>
                <View
                  style={{
                    borderBottomWidth: 4,
                    marginTop: mvs(30),

                    borderColor: colors.lightBackground,
                  }}></View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginStart: ms(16),

                  marginTop: mvs(28),
                }}>
                <TouchableOpacity onPress={() => selecttype(1)}>
                  <Image
                    source={pos == 1 ? images.fillCheck : images.blankCheck}
                    style={{
                      height: mvs(20),
                      width: mvs(20),
                      resizeMode: 'contain',
                    }}></Image>
                </TouchableOpacity>
                <Text
                  style={{
                    marginStart: ms(16),
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                    color: colors.blue,
                  }}>
                  I’m not well
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginStart: ms(16),
                  marginTop: mvs(20),
                }}>
                <TouchableOpacity onPress={() => selecttype(2)}>
                  <Image
                    source={pos == 2 ? images.fillCheck : images.blankCheck}
                    style={{
                      height: mvs(20),
                      width: mvs(20),
                      resizeMode: 'contain',
                    }}></Image>
                </TouchableOpacity>
                <Text
                  style={{
                    marginStart: ms(16),
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                    color: colors.blue,
                  }}>
                  Change my mind
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginStart: ms(16),
                  marginTop: mvs(20),
                }}>
                <TouchableOpacity onPress={() => selecttype(3)}>
                  <Image
                    source={pos == 3 ? images.fillCheck : images.blankCheck}
                    style={{
                      height: mvs(20),
                      width: mvs(20),
                      resizeMode: 'contain',
                    }}></Image>
                </TouchableOpacity>
                <Text
                  style={{
                    marginStart: ms(16),
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                    color: colors.blue,
                  }}>
                  Other
                </Text>
              </View>
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
                  placeholderTextColor={colors.grey}
                  placeholder="Your message here..."></TextInput>
              </View>

              <Image
                source={images.information}
                style={{
                  height: mvs(17),
                  width: mvs(17),
                  resizeMode: 'contain',
                  marginTop: mvs(16),
                  marginStart: ms(16),
                }}></Image>

              <Text
                style={{
                  fontSize: s(12),
                  fontFamily: fonts.quicksandMedium,
                  color: colors.blue,
                  marginTop: mvs(16),
                  marginHorizontal: ms(16),
                }}>
                if cancellation requested before 48 hours of service no fee will
                be charged {'\n'}
                {'\n'}If cancellation requested less than 48 hours then Admin
                fees will be charged.{'\n'} {'\n'}If cancellation requested less
                than 24 hours then Full shift will be charged
              </Text>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <TouchableOpacity
                onPress={() => modalclose()}
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
            </ScrollView>
          </View>
        </View>
      </Modal>
      {/* //review modal */}
      <Modal animationType="slide" transparent={true} visible={reviewModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 40}
          enabled={Platform.OS === 'ios' ? true : true}
          style={{
            flex: 1,
            bottom: isKeyboardVisible == true ? 130 : 0,
            backgroundColor: colors.blue60,
          }}>
          <View style={{flex: 1}} />
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: ms(-140),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: mvs(25),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(22),
                    textAlign: 'center',

                    marginHorizontal: ms(34),
                    color: colors.blue,
                  }}>
                  How was{'\n'} your experience
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setReviewModal(false);
                  }}>
                  <Image
                    style={{height: 24, width: 24, marginRight: 20}}
                    source={images.cross}></Image>
                </TouchableOpacity>
              </View>

              <View style={{marginHorizontal: ms(16)}}>
                <View
                  style={{
                    borderBottomWidth: 4,
                    marginTop: mvs(30),

                    borderColor: colors.lightBackground,
                  }}></View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(20),
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 1,

                      justifyContent: 'center',
                      padding: ms(5),
                    }}>
                    <StarRating
                      disabled={false}
                      enableHalfStar={false}
                      // emptyStar={'ios-star-outline'}
                      emptyStar={images.blackstar}
                      fullStar={images.yellowstar}
                      style={{
                        marginTop: 5,
                        marginHorizontal: 30,
                        flex: 1,
                      }}
                      starSize={55}
                      //iconSet={'Ionicons'}
                      maxStars={5}
                      rating={rating}
                      //rating={this.state.starCount}
                      // selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'green'}
                      // rating={this.state.starCount}
                      onChange={rating => setRating(rating)}
                    />
                  </View>
                </View>
              </View>

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
                  value={ratingFeedback}
                  onChangeText={text => setRatingFeedback(text)}
                  multiline={true}
                  placeholderTextColor={colors.grey}
                  placeholder="Type your feedback"></TextInput>
              </View>

              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <TouchableOpacity
                onPress={() => submitReview()}
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
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* // cancel Booking modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelRequestModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 40}
          enabled={Platform.OS === 'ios' ? true : true}
          style={{
            flex: 1,
            bottom: isKeyboardVisible == true ? 130 : 0,
            backgroundColor: colors.blue60,
          }}>
          <View style={{flex: 1}} />
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
                Cancel Booking
              </Text>
              <TouchableOpacity
                style={{marginEnd: ms(20), alignSelf: 'center'}}
                onPress={() => setCancelRequestModal(false)}>
                <Image
                  style={{height: mvs(20), width: mvs(20)}}
                  source={images.cross}></Image>
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
            <View style={{marginTop: mvs(20), marginHorizontal: ms(16)}}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  color: colors.darkblue,
                  fontSize: s(16),
                }}>
                Cancellation Reason
              </Text>
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
              //onPress={() => declineCancelRequest()}
              onPress={() => refundAmountApi()}
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
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* // support ticlet modal */}

   <Modal
        animationType="slide"
        transparent={true}
        visible={createSupportTicket}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 40}
          enabled={Platform.OS === 'ios' ? true : true}
          style={{
            flex: 1,
            bottom: isKeyboardVisible == true ? 130 : 0,
            backgroundColor: colors.blue60,
          }}>
          <View style={{flex: 1}} />
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
                Create Support Ticket
              </Text>
              <TouchableOpacity
                style={{marginEnd: ms(20), alignSelf: 'center'}}
                onPress={() => setCreateSupportTicket(false)}>
                <Image
                  style={{height: mvs(20), width: mvs(20)}}
                  source={images.cross}></Image>
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
            <View style={{marginTop: mvs(20), marginHorizontal: ms(16)}}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  color: colors.darkblue,
                  fontSize: s(16),
                }}>
                Ticket Reason
              </Text>
              <MyDropDown
                selected={reasonTitle}
                itemList={reasonTitlesList}
                placeholder={'Select Reason'}
                onUpdate={data => handleUpdate(data, 'reason')}
              />
            </View>
            <View>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                color: colors.darkblue,
                fontSize: s(16),
                marginTop: 16,
                marginHorizontal: 16,
              }}>
              Ticket Detail
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
                value={ticketDetail}
                onChangeText={text => setTicketDetail(text)}
                placeholderTextColor={colors.grey}
                placeholder="Comment here..."></TextInput>
            </View>
            </View>

            {attachementFiles.length > 0 ? (
              <View>
                <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                color: colors.darkblue,
                fontSize: s(16),
                marginTop: 16,
                marginHorizontal: 16,
              }}>
              Attachment
            </Text>
              <View style={{height: 100, marginHorizontal: 20}}>
                <FlatList
                  data={attachementFiles}
                  style={{flex: 1, marginTop: 8}}
                  scrollEnabled={true}
                  //  numColumns={imageData.length >= 4 ? 4 : 0}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  renderItem={picsItemRender}
                  extraData={!updateSubData}
                />
              </View>
              </View>
            ) : (
              <View>
              <Text
            style={{
              fontFamily: fonts.quicksandMedium,
              color: colors.darkblue,
              fontSize: s(16),
              marginTop: 16,
              marginHorizontal: 16,
            }}>
            Attachment
          </Text>
              <TouchableOpacity
                onPress={() => {
                
                  openImagePicker("gallery")
                }}
                style={{
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.lightBackground,
                  borderRadius: ms(6),
                  flexDirection: 'row',
                  marginHorizontal: 16,
                  justifyContent: 'space-between',
                  padding: Platform.OS === 'android' ? ms(4) : ms(13),
                  alignItems: 'center',
                  marginTop: mvs(7),
                }}>
                <TextInput
                  style={{
                    color: colors.blue,
                    flex: 1,
                    marginEnd: ms(5),
                    fontSize: s(14),
                    height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                    fontFamily: fonts.quicksandMedium,
                  }}
                  placeholder="Upload Attachment "
                  placeholderTextColor={colors.grey}></TextInput>
                <TouchableOpacity
                  onPress={() => {
                 
                    openImagePicker("gallery")
                  }}
                  style={{padding: Platform.OS === 'ios' ? ms(0) : ms(8)}}>
                  <Image
                    source={images?.upload}
                    style={{
                      height: mvs(18),
                      width: mvs(18),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                borderBottomWidth: 4,
                marginTop: mvs(30),

                borderColor: colors.lightBackground,
              }}></View>
            <TouchableOpacity
              onPress={() => {
             //   setCreateSupportTicket(false);
             //   setTicketSucessfully(true);

             createSupportTicketFunction()
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
                Create Ticket
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal> 
{/* 
      <Modal
        animationType="slide"
        transparent={true}
        visible={createSupportTicket}>
        <View
          style={{
            flex: 1,

            backgroundColor: colors.blue60,
          }}>
          <View style={{flex: 1}} />
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
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={{flexDirection: 'row', flex: 1, marginTop: mvs(16)}}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(22),
                    textAlign: 'center',
                    flex: 1,

                    marginHorizontal: ms(34),
                    color: colors.blue,
                  }}>
                  Search for Carer
                </Text>
                <TouchableOpacity
                  style={{marginEnd: ms(20), alignSelf: 'center'}}
                  onPress={() => setCreateSupportTicket(false)}>
                  <Image
                    style={{height: mvs(20), width: mvs(20)}}
                    source={images.cross}></Image>
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
              <View style={{marginTop: mvs(20), marginHorizontal: ms(16)}}>
                <Text
                  style={{
                    color: colors.blue,
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Carer Category{' '}
                  <Text style={{color: colors.starcolor}}>*</Text>
                </Text>

                <MyDropDown
                  selected={reasonTitle}
                  itemList={reasonTitlesList}
                  placeholder={'Select Reason'}
                  onUpdate={data => handleUpdate(data, 'reason')}
                />
              </View>
              <View style={{marginTop: mvs(20), marginHorizontal: ms(16)}}>
                <Text
                  style={{
                    color: colors.blue,
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Postcode <Text style={{color: colors.starcolor}}>*</Text>
                </Text>

                <View
                  style={{
                    borderColor: colors.lightBackground,
                    backgroundColor: colors.lightBackground,
                    borderRadius: ms(6),
                    padding: Platform.OS === 'android' ? ms(6) : ms(13),
                    marginTop: mvs(7),
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <TextInput
                    style={{
                      color: colors.darkblue,
                      fontSize: s(14),
                      flex: 1,
                      fontFamily: fonts.quicksandMedium,
                    }}
                    placeholderTextColor={colors.grey}
                    returnKeyType="search"
                    value={ticketDetail}
                    onChangeText={text => setTicketDetail(text)}
                    placeholder="Postcode"></TextInput>
                </View>
              </View>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: s(16),
                  marginHorizontal: 16,
                  marginTop: 16,
                  fontFamily: fonts.quicksandMedium,
                }}>
                Attachment <Text style={{color: colors.starcolor}}>*</Text>
              </Text>
              {attachementFiles.length > 0 ? (
                <View style={{height: 100, marginHorizontal: 20}}>
                  <FlatList
                    data={attachementFiles}
                    style={{flex: 1, marginTop: 8}}
                    scrollEnabled={true}
                    //  numColumns={imageData.length >= 4 ? 4 : 0}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={picsItemRender}
                    extraData={!updateSubData}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    openImagePicker('gallery');
                  }}
                  style={{
                    borderColor: colors.lightBackground,
                    backgroundColor: colors.lightBackground,
                    borderRadius: ms(6),
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    justifyContent: 'space-between',
                    padding: Platform.OS === 'android' ? ms(4) : ms(13),
                    alignItems: 'center',
                    marginTop: mvs(7),
                  }}>
                  <TextInput
                    style={{
                      color: colors.blue,
                      flex: 1,
                      marginEnd: ms(5),
                      fontSize: s(14),
                      height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                      fontFamily: fonts.quicksandMedium,
                    }}
                    placeholder="Upload Attachment "
                    placeholderTextColor={colors.grey}></TextInput>
                  <TouchableOpacity
                    onPress={() => {
                      openImagePicker('gallery');
                    }}
                    style={{padding: Platform.OS === 'ios' ? ms(0) : ms(8)}}>
                    <Image
                      source={images?.upload}
                      style={{
                        height: mvs(18),
                        width: mvs(18),
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <TouchableOpacity
                onPress={() => {
                  //   setCreateSupportTicket(false);
                  //   setTicketSucessfully(true);

                  createSupportTicketFunction();
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
                  Create Ticket
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal> */}

      {/* // invoice sucessfully */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ticketSucessfully}>
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
                  setTicketSucessfully(false);
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

      {/* // Refund status */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={refundstatusModal}>
        <View
          style={{
            flex: 1,

            bottom:
              isKeyboardVisible == true && Platform.OS === 'ios' ? 320 : 0,

            backgroundColor: colors.blue60,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: ms(500),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <ScrollView>
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
                Refiund Status
              </Text>
              <TouchableOpacity
                style={{marginEnd: ms(20), alignSelf: 'center'}}
                onPress={() => setRefundstatusModal(false)}>
                <Image
                  style={{height: mvs(20), width: mvs(20)}}
                  source={images.cross}></Image>
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
              <View
                style={{
                  marginHorizontal: 16,
                  marginTop: 16,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: mvs(10),

                    color: colors.blue,
                  }}>
                  Refund Amount
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: mvs(10),

                    color: colors.green,
                  }}>
                  £ {refundAmount}
                </Text>
              </View>
              {refundAmount != 0 && (
                <Text style={{marginTop: 10, marginHorizontal: 16}}>
                  Refund credited on{' '}
                  {moment(refundDate).format('MMM DD , YYYY')}
                </Text>
              )}
              {refundAmount != 0 && (
                <View
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    borderColor: colors.primaryColor,
                    marginHorizontal: 16,
                    backgroundColor: colors.lightBackground,
                    marginTop: 20,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={images.masterCard}
                      style={{height: 40, width: 60}}></Image>
                    <View
                      style={{
                        flexDirection: 'column',
                        flex: 1,
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.quicksandMedium,
                          fontSize: 14,

                          color: colors.blue,
                        }}>
                        Will Added in Mastercard
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.quicksandMedium,
                          fontSize: 14,

                          color: colors.blue,
                        }}>
                        Ending in xxxx xxxx xxxx {last4_digit}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <TouchableOpacity
                onPress={() => {
                  setRefundstatusModal(false);
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
                  Close
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* // Refund Amount */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={refundAmountModal}>
        <View
          style={{
            flex: 1,

            bottom:
              isKeyboardVisible == true && Platform.OS === 'ios' ? 400 : 0,

            backgroundColor: colors.blue60,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: refundAmounts != 0 ? ms(370) : ms(420),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <ScrollView>
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
                  Refund Amount
                </Text>
                <TouchableOpacity
                  style={{marginEnd: ms(20), alignSelf: 'center'}}
                  onPress={() => setRefundAmountModal(false)}>
                  <Image
                    style={{height: mvs(20), width: mvs(20)}}
                    source={images.cross}></Image>
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
              <View
                style={{
                  marginHorizontal: 16,
                  marginTop: 16,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: mvs(15),

                    color: colors.blue,
                  }}>
                  Total Amount
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: mvs(15),

                    color: colors.blue,
                  }}>
                  £ {parseFloat(totalAmountPaid).toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 16,
                  marginTop: 16,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: mvs(5),
                    color: colors.blue,
                  }}>
                  Cancellation charges
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: mvs(4),
                    color: colors.red,
                  }}>
                  -£{' '}
                  {/* {parseFloat(totalAmountPaid).toFixed(2) -
                    parseFloat(refundAmount).toFixed(2)} */}
                  {(totalAmountPaid - refundAmounts).toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 16,
                  marginTop: 16,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: mvs(10),
                    color: colors.blue,
                  }}>
                  Total Refund Amount
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: mvs(10),

                    color: colors.blue,
                  }}>
                  £ {refundAmounts}
                </Text>
              </View>

              {refundAmounts != 0 && (
                <View
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 10,
                    borderColor: colors.primaryColor,
                    marginHorizontal: 16,
                    backgroundColor: colors.lightBackground,
                    marginTop: 20,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={images.masterCard}
                      style={{height: 40, width: 60}}></Image>
                    <View
                      style={{
                        flexDirection: 'column',
                        flex: 1,
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.quicksandMedium,
                          fontSize: 14,

                          color: colors.blue,
                        }}>
                        Will Added in Mastercard
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.quicksandMedium,
                          fontSize: 14,

                          color: colors.blue,
                        }}>
                        Ending in xxxx xxxx xxxx {last4_digit}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 16,
                  marginTop: 15,
                }}>
                <Image
                  style={{height: 18, width: 18}}
                  source={images?.infoo}></Image>
                <Text
                  onPress={() => {
                    // Linking.openURL(web_url_sandbox);
                    // navigation.goBack();
                  }}
                  style={{
                    fontSize: 16,
                    color: colors.primaryColor,
                    textDecorationLine: 'underline',
                    fontFamily: fonts.quicksandMedium,

                    marginLeft: 12,
                  }}>
                  View Cancellation policy
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
                  setRefundAmountModal(false);
                  declineCancelRequest();
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
                  {refundAmount != 0 ? 'Confirm, proceed to Refund' : 'Confirm'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* // REfund sucessfully */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={refundSucesfullyModal}>
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
                source={images.cancelSucessfully}
                style={{
                  alignSelf: 'center',
                  marginTop: 12,
                  marginHorizontal: 34,
                  height: 69,
                  width: 69,
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
                Refund Applied Successfully
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
                  Your Refund has been processed! Refund amount will be added in
                  your account within 3 to 4 working days.
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
                  {
                    setRefundSucesfullyModal(false);
                    setActiveTab(3);
                    myServiceApiCall('Cancelled');
                  }
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
                  Close
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={attachmentModal}>
        <View
          style={{
            flex: 1,

            bottom:
              isKeyboardVisible == true && Platform.OS === 'ios' ? 400 : 0,

            backgroundColor: colors.blue60,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: 620,
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <ScrollView>
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
                  Select Type
                </Text>
                <TouchableOpacity
                  style={{marginEnd: ms(20), alignSelf: 'center'}}
                  onPress={() => {
                    setAttachmentModal(false);
                    setTimeout(() => {
                      setCreateSupportTicket(true);
                    }, 200);
                  }}>
                  <Image
                    style={{height: mvs(20), width: mvs(20)}}
                    source={images.cross}></Image>
                </TouchableOpacity>
              </View>

              <View style={{marginHorizontal: ms(16)}}>
                <View
                  style={{
                    borderBottomWidth: 4,
                    marginTop: mvs(30),

                    borderColor: colors.lightBackground,
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => openImagePicker('document')}
                      style={{
                        borderWidth: 1,
                        borderColor: colors.primaryColor,
                        padding: ms(14),
                        borderRadius: 10,
                        backgroundColor: colors.primaryColor,
                      }}>
                      <Text
                        style={{
                          fontSize: s(14),
                          color: colors.white,
                          fontFamily: fonts.quicksandMedium,
                        }}>
                        Document
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => openImagePicker('gallery')}
                      style={{
                        borderWidth: 1,
                        borderColor: colors.primaryColor,
                        padding: ms(14),
                        borderRadius: 10,
                        backgroundColor: colors.primaryColor,
                      }}>
                      <Text
                        style={{
                          fontSize: s(14),
                          color: colors.white,
                          fontFamily: fonts.quicksandMedium,
                        }}>
                        Gallery
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* // ticket successfully */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ticketSucessfullyModal}>
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
                Ticket Generated Successfully
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
                  Ticket has been generated successfully, Your{' '}
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(16),
                      textAlign: 'center',
                      marginTop: mvs(25),
                      marginHorizontal: ms(34),
                      color: colors.primaryColor,
                    }}>
                    Ticket ID is #{ticket_id}.
                  </Text>{' '}
                  Our support team will connect with you soon.
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
                  setTicketSucessfullyModal(false);

                  setTimeout(() => {
                    navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: 'DrawerComponent',
                          params: {defaultIndex: 'MyBooking'},
                        },
                      ],
                    });
                  }, 200);

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
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Image
            source={images.menu}
            style={{height: mvs(19), width: mvs(21), resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: colors.blue,
              fontSize: 24,
              fontFamily: fonts.quicksandMedium,
            }}>
            My Bookings
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
             props.navigation.navigate('Notifications')
             setActiveTab(1)}
            
          }>
          <Image
             source={readBell >0 ? images.readBell :images?.notification}
            style={{height: mvs(19), width: mvs(21), resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={() => Linking.openSettings()}
        style={{position: 'absolute', right: ms(45), top: mvs(4)}}>
        <Image
          source={images.location}
          style={{height: mvs(19), width: mvs(21), resizeMode: 'contain'}}
        />
      </TouchableOpacity> */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: mvs(20),
        }}>
        <TouchableOpacity
          onPress={() =>
            //setActiveTab(1)
            // chooseMap(1)
            // myBoookingData('Current')
            {
              {
                setActiveTab(1);
                myServiceApiCall('Current');
              }
            }
          }
          style={{
            paddingVertical: ms(15),
            justifyContent: 'center',
            borderRadius: 5,
            flex: 1,
            backgroundColor:
              activeTab == 1 ? colors.primaryColor : colors.lightBackground,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: activeTab == 1 ? colors.white : colors.blue,
              fontSize: s(18),
              fontFamily: fonts.quicksandMedium,
            }}>
            Current
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            () => {
              setActiveTab(2);
              myServiceApiCall('Completed');
            }
            //myBoookingData('Completed')
            //  setActiveTab(2)
          }
          style={{
            paddingVertical: ms(15),
            justifyContent: 'center',
            borderRadius: 5,
            flex: 1,
            backgroundColor:
              activeTab == 2 ? colors.primaryColor : colors.lightBackground,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: activeTab == 2 ? colors.white : colors.blue,
              fontSize: s(18),
              fontFamily: fonts.quicksandMedium,
            }}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            () => {
              {
                setActiveTab(3);
                myServiceApiCall('Cancelled');
              }
            }
            //myBoookingData('Cancelled')
            //setActiveTab(3)
          }
          style={{
            paddingVertical: ms(15),
            justifyContent: 'center',
            borderRadius: 5,
            flex: 1,
            backgroundColor:
              activeTab == 3 ? colors.primaryColor : colors.lightBackground,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              textAlign: 'center',

              color: activeTab == 3 ? colors.white : colors.blue,
              fontSize: s(18),
              fontFamily: fonts.quicksandMedium,
            }}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        {activeTab == 1 ? (
          <View
            style={{
              marginHorizontal: ms(16),
              marginVertical: mvs(10),
              flex: 1,
            }}>

{/* if (!loader) {
      return (
        <View style={styles.post}>
          {tierbonuss.length === 0 ||
            (!loader && (
              <AppText
                type={FORTEEN}
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  marginVertical: 10,
                }}>
                No More Posts
              </AppText>
            ))}
        </View>
      );
    } else {
      return <ActivityIndicator size="large" />;
    } */}
            {currentBookingList.length >0 ? (
              <FlatList
                data={currentBookingList}
                showsVerticalScrollIndicator={false}
                bounces={false}
                renderItem={CurrentItemList}
                // onEndReached={() => loadMoreItem()}
              />
            ) :
        currentBookingList.length == 0 &&
            (
              !isLoadingValue?.loading &&
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.grey,
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  No Booking available !
                </Text>
              </View>
            ) }
          </View>
        ) : activeTab == 2 ? (
          <View
            style={{
              marginHorizontal: ms(16),
              marginVertical: mvs(10),
              flex: 1,
            }}>
            {completedItemLists.length > 0 ? (
              <FlatList
                data={completedItemLists}
                showsVerticalScrollIndicator={false}
                bounces={false}
                renderItem={CompletedItemList}
              />
            ) :
            completedItemLists.length == 0 &&
         
            (
              !isLoadingValue?.loading &&
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.grey,
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  No Booking available !
                </Text>
              </View>
            ) }
          </View>
        ) :activeTab == 3 ? (
          <View
            style={{
              marginHorizontal: ms(16),
              marginVertical: mvs(10),
              flex: 1,
            }}>
            {cancelItemLists.length > 0 ? (
              <FlatList
                data={cancelItemLists}
                showsVerticalScrollIndicator={false}
                bounces={false}
                renderItem={CancelItemList}
              />
            ) :
            cancelItemLists.length == 0 &&
         
            (
              !isLoadingValue?.loading &&
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.grey,
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  No Booking available !
                </Text>
              </View>
            )
            }
          </View>
        ):<></>}
      </View>
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
    borderColor: colors.green,
    backgroundColor: colors.green,
  },
  appleButton: {
    borderRadius: ms(6),
    // padding: ms(13),
    width: '48%',
    borderWidth: 1,
    height: mvs(45),
    justifyContent: 'center',
    borderColor: colors.orange,
    backgroundColor: colors.orange,
  },
});
