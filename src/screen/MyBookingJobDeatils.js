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
  Dimensions,
  FlatList,
  Linking,
  Modal,
  KeyboardAvoidingView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import images from '../utils/images';
import {fonts} from '../utils/font';
import {colors} from '../utils/colors';
import MyDropDown from '../component/MyDropDown';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {snackbarSuccess, snackbarError} from '../utils/snackbar';
import DatePicker from 'react-native-date-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseToken} from '../constant/constant';
import {userActionServices} from '../redux/userServices';
import {Popable} from 'react-native-popable';
import {
  GETJPOBPOSTDETAILS,
  CARESEEKER_CANCEL_BOOKING,
  OFFERDECLINEREASONS,
  LOGOUT,
} from '../utils/reducerConstant';
import {ACCESS_TOKEN, SIGN_OUT, TOKEN, USER_DATA} from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, showLoader} from '../component/AppLoader';
import ReadMore from '@fawazahmed/react-native-read-more';
import {setShouldToolbarUsesTextFieldTintColor} from 'react-native-keyboard-manager';
import {AuthContext} from '../navigation/context';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {API_URL, Image_URL} from '../utils/apiConstants';
export default function MyBookingJobDeatils(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  var id = props.route.params.id;
  console.log('id>>..', id);
  var cancelBtn = props.route.params.cancelBtn;
  var tab = props.route.params.tab;
  var jobPostedData = '';
  const {signOut} = useContext(AuthContext);
  const [dates, setDates] = useState([]);
  const [logData, setLogData] = useState([]);
  const getJobPostDetail = useSelector(state => state.getJobPostDetailsData);
  const offerDeclineReasonData = useSelector(
    state => state.offerDeclineReasonData,
  );
  const cancelCareSeekerBookingDataValue = useSelector(
    state => state.cancelCareSeekerBookingData,
  );
  const [selectedIndex, setSelectedIndex] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [shift, setShift] = useState('');
  const [name, setName] = useState('');
  const [reasonTitlesList, setReasonTitlesList] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [region, setRegion] = useState('');
  console.log('regionregion', region);
  const [logModal, setLogsModal] = useState(false);
  const [AllDate, setAllDates] = useState('');
  const [address_line_1, setAddress_line_1] = useState('');
  const [address_line_2, setAddress_line_2] = useState('');
  const [flat, setflat] = useState('');
  const [town, setTown] = useState('');
  const [postcode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [fund, setFund] = useState('');
  const [petFriendly, setPetFriendly] = useState('');
  const [driverReq, setDriverReq] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [cancelButton, setCancelButton] = useState('');
  const [invoiceDownloadId, setInvoiceDownloadId] = useState('30');
  const [invoiceDownloadstatus, setInvoiceDownloadStatus] = useState('');
  const [invoiceDownloadUrl, setInvoiceDownloadUrl] = useState(`${API_URL}download-invoices`);

  const [age, setAge] = useState(40);
  const [jobUniqID, setJobUniqID] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [support, setSupport] = useState([]);
  const [professionalExp, setProfessionalExp] = useState([]);
  const [category, setCategory] = useState('');
  const [additional_requirement, setAdditional_requirement] = useState('');
  const [jobPost, setJobPost] = useState('');
  const [cancelRequestModal, setCancelRequestModal] = useState(false);
  const [cancelled, setcancelled] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [cancalType, setCancalType] = useState('');
  const [otherReasoninfo, setOtherReasonInfo] = useState(false);
  const [declineCarerId, setDeclineCarerId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  console.log('declineCarerId>>>>', declineCarerId);
  const [reasonId, setReasonId] = useState('');
  const [reasonTitle, setReasonTitle] = useState({
    id: 0,
    title: 'Select Reason',
  });
  // const [serivces, setServices] = useState([
  //   {
  //     id: '1',
  //     title: 'Hoisting care',
  //   },
  //   {
  //     id: '2',
  //     title: 'Stoma care ',
  //   },
  //   {
  //     id: '3',
  //     title: 'Peg care',
  //   },
  //   {
  //     id: '4',
  //     title: 'Babycare ',
  //   },
  //   {
  //     id: '5',
  //     title: 'Catheter care',
  //   },
  // ]);
  const [serivces, setServices] = useState([]);
  const [dateDurantion, setDateDurantion] = useState([]);
  const renderReadMore = handlePress => {
    return (
      <View>
        <Text
          style={{
            color: colors.green,
            marginTop: mvs(5),
            fontFamily: fonts.quicksandMedium,
            fontSize: s(14),
          }}
          onPress={handlePress}>
          Read more
        </Text>
      </View>
    );
  };
  const renderReadLess = handlePress => {
    return (
      <View>
        <Text
          style={{
            color: colors.green,
            marginTop: mvs(5),
            fontFamily: fonts.quicksandMedium,
            fontSize: s(14),
          }}
          onPress={handlePress}>
          Read Less
        </Text>
      </View>
    );
  };
  const chooseRates = (item, index) => {
    setSelectedIndex(index);
  };
  const renderItems = (item, index) => {
    return (
      <TouchableOpacity
        //  onPress={() => chooseRates(item, index)}
        style={{
          flexDirection: 'row',
          marginHorizontal: ms(5),
          marginTop: ms(10),
        }}>
        <View
          style={{
            paddingVertical: ms(2),
            backgroundColor:
              selectedIndex === index
                ? colors.darkblue
                : colors.lightBackground,
            borderWidth: 1,
            margin: ms(5),
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

  useEffect(() => {
    setTimeout(() => {
      dispatch(userActionServices.getJobPostDetail(id));
    }, 200);
  }, []);
  const fileName = name => {
    var data = name?.match(patt);
    return data[0];
  };

  const downloadNotif = path => {
    Alert.alert('Successfully Downloaded', 'The file is saved at ' + path, [
      {text: 'OK', style: 'default'},
    ]);
  };

  const downloadFile = async url => {
    console.log('url>>>', url);
    var file_url = Image_URL + url;
    let currentDate = moment(new Date()).format('DD-MM-YYYY hh:mm:ss');
    // var pattern = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    // var extension = url.match(pattern);
    // console.log('extension is  ', extension);
    const fileName = 'Reva' + currentDate;
    ReactNativeBlobUtil.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      title: 'Reva',
      // appendExt: Platform.OS == 'ios' ? extension[1] : '',
      path:
        Platform.OS == 'ios'
          ? ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + fileName
          : ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + fileName,
    })
      .fetch('GET', url, {
        //some headers ..
      })
      .then(res => {
        let base64Str = res.data;
        Platform.OS == 'ios' && ReactNativeBlobUtil.ios.previewDocument(res.data);
        ReactNativeBlobUtil.fs
          .writeFile(
            ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + fileName,
            base64Str,
            'base64',
          )
          .then(() => {
            downloadNotif(res.path());
          });
      });
  };

  // const permissionFunc = async (url) => {
  //     if (Platform.OS == 'ios') {
  //         actualDownload(url);
  //     } else {

  //             try {
  //                 const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //                     actualDownload(url);
  //                 } else {
  //                     snackbarError('You need to give storage permission to download the file');
  //                 }
  //             } catch (err) {
  //                 console.warn(err);
  //             }

  //     }
  // }

  // const actualDownload = (url) => {
  //     const { dirs } = RNFetchBlob.fs;
  //     const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
  //     const configfb = {
  //         useDownloadManager: true,
  //         notification: true,
  //         mediaScannable: true,
  //         title: `test.pdf`,
  //         path: `${dirToSave}/${"test.pdf"}"`,
  //     }
  //     const configOptions = Platform.select({
  //         ios: {
  //             title: configfb.title,
  //             path: configfb.path,
  //             appendExt: 'pdf',
  //         },
  //         android: configfb,
  //     });

  //     console.log('The file saved to 23233', configfb, dirs);

  //     RNFetchBlob.config(configOptions)
  //         .fetch('GET', `${"https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png"}/${"test.pdf"}`, {})
  //         .then((res) => {
  //             if (Platform.OS === "ios") {
  //                 RNFetchBlob.ios.previewDocument(configfb.path);
  //             }

  //             if (Platform.OS == 'android') {
  //                 snackbarSuccess('File downloaded');
  //             }
  //             console.log('The file saved to ', res);
  //         })
  //         .catch((e) => {
  //          //   setisdownloaded(true)
  //             snackbarError(e.message);
  //             console.log('The file saved to ERROR', e.message)
  //         });
  // }
  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  // response get api and set data
  useEffect(() => {
    hideLoader();

    if (getJobPostDetail.type === GETJPOBPOSTDETAILS) {
      if (getJobPostDetail?.value?.status) {
        if (
          Object.keys(getJobPostDetail?.value).length != 0 &&
          getJobPostDetail?.value != undefined
        ) {
          jobPostedData = getJobPostDetail.value.data;
          let text =jobPostedData?.daterange;
          console.log(">>?>>?",text);
const myArray = text.split(" - ");
console.log("myArray>",myArray);
let word = myArray[0];
          console.log('my bOOking Detail', JSON?.stringify(jobPostedData?.carer_bookings));
          console.log('my bOOking Detail', JSON?.stringify(jobPostedData));
          //setJobPost(getJobPostDetail.value.data)
          setCategoryTitle(jobPostedData.job_title);
          setCancelButton(jobPostedData.cancelled_btn);
          setAdditional_requirement(jobPostedData.additional_requirement);
          setAddress_line_1(jobPostedData.address_line_1);
          setAddress_line_2(jobPostedData.address_line_2);
          setTown(jobPostedData.town);
          setflat(jobPostedData.flat_no);
          setPostCode(jobPostedData.postcode);
          setCountry(jobPostedData.country);
          setAge(jobPostedData?.age);
          setLogData([...[{}], ...jobPostedData?.log_detail]);
          setDateRange(word);
          setFund(getJobPostDetail.value.data?.source_of_funding)
          setDeclineCarerId(jobPostedData?.carer_bookings[0]?.id);
          setBookingDate(jobPostedData?.carer_bookings[0]?.status_update_date);
          // setPetFriendly(jobPostedData?.carer_bookings[0]?.carer_user_meta_info?.pet_friendly)
          // setDriverReq(jobPostedData?.carer_bookings[0]?.carer_user_meta_info?.do_you_drive)
          setPetFriendly(jobPostedData?.pet_friendly);
          setDriverReq(jobPostedData?.driving_required);
          setJobUniqID(jobPostedData.job_unq_id);
          setInvoiceDownloadId(jobPostedData.pdf_download_id);
          setInvoiceDownloadUrl(jobPostedData.pdf_download_url);
          setInvoiceDownloadStatus(jobPostedData.pdf_status);
          
          setStartTime(
            jobPostedData.care_seeker_booking_duration_info[0].job_start_time,
          );
          setEndTime(
            jobPostedData.care_seeker_booking_duration_info[0].job_end_time,
          );
          if (jobPostedData.careseeker_user_info.organisation_name != null) {
            setName(jobPostedData.careseeker_user_info.organisation_name);
          } else {
            let data =
              jobPostedData.careseeker_user_info.title +
              ' ' +
              jobPostedData.careseeker_user_info.first_name +
              ' ' +
              jobPostedData.careseeker_user_info.last_name;
            setName(data);
          }
          setCategoryName(jobPostedData.category_info.category_name);
          if (jobPostedData.region_info?.region != null) {
            setRegion(jobPostedData.region_info?.region);
          }
       
          setShift(jobPostedData.shift_info.shift);
          //  setAge(jobPostedData?.careseeker_user_info?.age)
          let jobPostedListTemp = [];
          let jobPostedExpertiseTemp = [];
          let jobPostedSupportTemp = [];
          let jobPostedProExpTemp = [];
          let dates = [];
          jobPostedData.care_seeker_booking_duration_info.map(
            (postedData, postedIndex) => {
              jobPostedListTemp.push(postedData);
            },
            [],
          );
          jobPostedData.care_seeker_booking_duration_info.map(
            (postedData, postedIndex) => {
              // let modifiactiondate = moment(postedData.booking_date).format(
              //   'MMMM DD, YYYY',
              // );

              dates.push(postedData);
            },
            [],
          );
          jobPostedData.care_seeker_booking_expertise_info.map(
            (expertiseInfo, expertiseIndex) => {
              jobPostedExpertiseTemp.push(
                expertiseInfo.category_based_expertise_info.expertise_info
                  .expertise,
              );
            },
            [],
          );
          jobPostedData.care_seeker_booking_prof_exp_info.map(
            (expertiseInfo, expertiseIndex) => {
              jobPostedProExpTemp.push(
                expertiseInfo.category_based_prof_experience_info
                  .professional_experience,
              );
            },
            [],
          );
          jobPostedData.care_seeker_booking_ext_support_info.map(
            (expertiseInfo, expertiseIndex) => {
              jobPostedSupportTemp.push(
                expertiseInfo.extra_support_info.extra_support,
              );
            },
            [],
          );
          setAllDates(jobPostedListTemp);
          setServices(jobPostedExpertiseTemp);
          setProfessionalExp(jobPostedProExpTemp);
          setSupport(jobPostedSupportTemp);
          setDateDurantion(dates);
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
          navigation.goBack();
          setTimeout(() => {
            snackbarSuccess(cancelCareSeekerBookingDataValue?.value?.message);
          }, 100);

          dispatch(userActionServices.resetData());
        }
      }
    }
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
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<');

          dispatch(userActionServices.resetData());
        }
      } 
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [getJobPostDetail]);

  const renderDatesItems = (item, index) => {
    console.log('itrmm>>>>>>>>', item);
    return (
      <TouchableOpacity
        //  onPress={() => chooseRates(item, index)}
        style={{
          flexDirection: 'row',
          marginHorizontal: ms(5),
          marginTop: ms(10),
        }}>
        <View
          style={{
            paddingVertical: ms(2),

            backgroundColor: item?.color_code,
            borderWidth: 1,
            margin: ms(5),
            borderRadius: 13,
            borderColor: item?.color_code,
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: item?.colour_status == 'grey' ? colors.red : item?.white,
              paddingVertical: ms(4),
              paddingHorizontal: ms(10),
              fontFamily: fonts.quicksandMedium,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {moment(item.booking_date).format('D MMM YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const cancelRequestFun = (item, type) => {
    setCancelRequestModal(true);
    // setCancalType(type)

    // setDeclineCarerId(type =="withoutProposal"?item?.carer_bookings_request_rejected[0]?.carer_user_info?.id:item?.carer_bookings_request[0]?.carer_user_info?.id);

    let declineBody = {
      type: 9,
    };
    console.log('declineType:', declineBody);
    dispatch(userActionServices.offerDeclineReasons(declineBody));
  };

  const declineCancelRequest = declineId => {
    console.log('cancalType>>>>>', cancalType);
    if (reasonId == '') {
      snackbarError('select Reason');
    } else if (otherReasoninfo == true && otherReason == '') {
      snackbarError('select other Reason');
    } else {
      setCancelRequestModal(false);

      let decline = {
        decline_reason_id: reasonId,
        decline_reason: otherReason,
        carer_booking_id: declineCarerId,
      };

      console.log('cancelReqBody>>>', decline);
      dispatch(userActionServices.cancelBookingAction(decline));
      //dispatch(userActionServices.cancelRequestService(decline));
    }
  };
  // Log item render
  const logItemRenderItem = ({item, index, separators}) => {
    console.log('item>>>>>>', item);
    const renderText = (text, borderWidth, style) => {
      return (
        <View
          style={{
            flex: 1,
            borderRightWidth: borderWidth,
            borderRightColor: colors.grey,
          }}>
          <Text
            style={[
              {
                fontSize: 12,
                color: '#2f47a0',
                padding: 10,
                textAlign: 'center',
              },
              style,
            ]}>
            {text}
          </Text>
        </View>
      );
    };
    return (
      <View
        style={{
          flex: 1,
          borderTopWidth: index == 0 ? 0 : 1,
          borderTopColor: colors.grey,
        }}>
        {index == 0 ? (
          <View style={{flexDirection: 'row', flex: 1}}>
            {renderText('Date', 1)}
            {renderText('Start Time', 1)}
            {renderText('End Time', 1)}
            {renderText('Total Hours', 0)}
          </View>
        ) : (
          <View style={{flexDirection: 'row', flex: 1}}>
            {renderText(item?.booking_date, 1, {color: colors.grey})}
            {renderText(item?.job_start_time, 1, {color: colors.grey})}
            {renderText(item?.job_end_time, 1, {color: colors.grey})}
            {renderText(item?.total_hour, 0, {color: colors.grey})}
          </View>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Modal animationType="slide" transparent={true} visible={logModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 40}
          enabled={Platform.OS === 'ios' ? true : true}
          style={{
            flex: 1,

            // bottom:
            //   isKeyboardVisible == true && Platform.OS === 'ios' ? 220 : 0,

            backgroundColor: colors.lightBackground80,
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
                  color: colors.primaryColor,
                }}>
                View Logs
              </Text>

              <TouchableOpacity
                style={{marginEnd: ms(20), alignSelf: 'center'}}
                onPress={() => setLogsModal(false)}>
                <Image
                  style={{height: mvs(20), width: mvs(20)}}
                  source={images.cross}></Image>
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                marginTop: 20,

                borderColor: colors.grey,
              }}></View>

            <FlatList
              style={{
                marginVertical: mvs(20),
                marginHorizontal: 16,
                borderWidth: 1,
                borderColor: colors.grey,
                borderRadius: 10,
              }}
              data={logData}
              showsVerticalScrollIndicator={false}
              bounces={false}
              renderItem={logItemRenderItem}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'DrawerComponent',
                    params: {defaultIndex: 'MyBooking'},
                  },
                ],
              })
            }>
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
            Booking Detail
          </Text>
        </View>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          {/* <TouchableOpacity
              onPress={() => props.navigation.navigate('SearchScreen')}>
              <Image
                style={{
                  height: mvs(45),
                  width: ms(45),
                  resizeMode: 'contain',
                }}
                source={images.filter}
              />
            </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 3,
          marginVertical: mvs(20),
          borderColor: colors.lightBackground,
        }}></View>
      <View style={{marginTop: mvs(15), marginLeft: ms(15)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: s(16),
              flex: 1,
              color: colors.darkblue,
              fontFamily: fonts.quicksandMedium,
            }}>
            {categoryTitle}
          </Text>
          <Text
            style={{
              color: colors.primaryColor,
              fontFamily: fonts.quicksandMedium,
              fontSize: s(14),
              flex: 1,
              marginStart: s(16),
              marginEnd: s(16),
              marginTop: mvs(5),
            }}>
            Job ID:- {jobUniqID}
          </Text>
        </View>
        {/* <Text
            style={{
              fontSize: s(14),
              color: colors.blueLight,
              fontFamily: fonts.quicksandMedium,
            }}>
            {name}



          </Text> */}

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.grey,
              marginTop: mvs(20),
flex:1,
              fontFamily: fonts.quicksandBook,
            }}>
             {postcode}{'\n'}
            {address_line_1} {'\n'}
            
            { flat+", " +town}
            {'\n'}
            {address_line_2}
          </Text>
          {tab == 2 && invoiceDownloadstatus==1  && (
            
            <TouchableOpacity
            style={{flex:1}}
              onPress={() =>
                Linking.openURL(`${invoiceDownloadUrl}/${invoiceDownloadId}`)
              }>
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.primaryColor,
                  marginTop: mvs(20),
               
                  flex:1,
                  marginHorizontal: 10,
                  fontFamily: fonts.quicksandMedium,
                }}>
                Download Invoice
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {region == '' ? (
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
              {region}
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
              source={images.calenderHome}
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
                AllDate.map((bookingDate, BookingDateINdex) => {
                
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
        <View style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
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
            {dateRange}
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
        <View style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
          <Image
            source={images.watch}
            style={{
              height: mvs(21),
              width: mvs(18),
              resizeMode: 'contain',
            }}></Image>
          <Text
            style={{
              color: colors.grey,
              fontFamily: fonts.quicksandMedium,
              fontSize: s(12),
              marginTop: mvs(9),
            }}
            numberOfLines={1}>
            {shift}
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
        <View style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
          <Image
            source={images.carePic}
            style={{
              height: mvs(21),
              width: mvs(18),
              resizeMode: 'contain',
            }}></Image>
          <Text
            style={{
              color: colors.grey,
              fontFamily: fonts.quicksandMedium,
              fontSize: s(12),
              marginTop: mvs(9),
            }}>
            {categoryName}
          </Text>
        </View>
      </View>

      <ScrollView style={{flex: 1}}>
        <Text
          style={{
            fontSize: s(16),
            color: colors.darkblue,
            fontFamily: fonts.quicksandMedium,
            marginHorizontal: ms(16),
            marginTop: mvs(30),
          }}>
          Service For
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.grey,
              fontFamily: fonts.quicksandMedium,
              marginHorizontal: ms(16),
              marginTop: mvs(10),
            }}>
            {name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: s(14),
                color: colors.grey,
                fontFamily: fonts.quicksandMedium,

                marginTop: mvs(10),
                marginEnd: 8,
              }}>
              Age
            </Text>
            <Text
              style={{
                fontSize: s(14),
                color: colors.grey,
                fontFamily: fonts.quicksandMedium,
                marginEnd: 16,

                marginTop: mvs(10),
              }}>
              {age}
            </Text>
          </View>
        </View>


        <Text
          style={{
            fontSize: s(16),
            color: colors.headingColor,
            fontFamily: fonts.quicksandMedium,
            marginHorizontal: ms(16),
            marginTop: mvs(30),
          }}>
         Booking Date
        </Text>
        <View
          style={{
            paddingVertical: ms(2),
            backgroundColor: colors.lightBackground,
            borderWidth: 1,
            margin: ms(5),
            borderRadius: 13,
            width: ms(190),
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.grey,
              paddingVertical: ms(4),
              alignSelf: 'center',
              paddingHorizontal: ms(10),
              fontFamily: fonts.quicksandMedium,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
 {bookingDate==null?'-': moment(bookingDate,"YYYY-MM-DD").format('DD MMM YYYY')}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: s(16),
              color: colors.headingColor,
              fontFamily: fonts.quicksandMedium,
              marginHorizontal: ms(16),
              marginTop: mvs(30),
            }}>
           Date(s)
          </Text>
          {logData?.length == 1 ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setLogsModal(true);
              }}>
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.primaryColor,
                  fontFamily: fonts.quicksandMedium,
                  marginHorizontal: ms(16),
                  marginTop: mvs(30),
                }}>
                View Logs
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {dateDurantion.map((listItem, index) =>
            renderDatesItems(listItem, index),
          )}
        </View>

        <Text
          style={{
            fontSize: s(16),
            color: colors.headingColor,
            fontFamily: fonts.quicksandMedium,
            marginHorizontal: ms(16),
            marginTop: mvs(30),
          }}>
          Time Duration
        </Text>
        <View
          style={{
            paddingVertical: ms(2),
            backgroundColor: colors.lightBackground,
            borderWidth: 1,
            margin: ms(5),
            borderRadius: 13,
            width: ms(190),
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.grey,
              paddingVertical: ms(4),
              alignSelf: 'center',
              paddingHorizontal: ms(10),
              fontFamily: fonts.quicksandMedium,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {startTime + ' to'}
            {' ' + endTime}
          </Text>
        </View>

        <Text
          style={{
            fontSize: s(16),
            color: colors.headingColor,
            fontFamily: fonts.quicksandMedium,
            marginTop: ms(10),
            marginHorizontal: ms(16),
          }}>
          Job Description
        </Text>
        <View
          style={{
            marginHorizontal: ms(16),
            marginBottom: ms(8),
            marginTop: mvs(10),
          }}>
          {/* <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={renderReadMore}
              renderRevealedFooter={renderReadLess}>
              <Text
                style={{
                  fontSize: s(14),
                  fontFamily: fonts.quicksandBook,
  
                  lineHeight: 20,
                  marginTop: mvs(15),
                  color: colors.grey,
                }}>
                {additional_requirement}
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
              marginTop: mvs(10),
              fontFamily: fonts.quicksandBook,
            }}>
            {additional_requirement}
          </ReadMore>
        </View>

{serivces?.length>0?
        <Text
          style={{
            fontSize: s(16),
            color: colors.headingColor,
            fontFamily: fonts.quicksandMedium,
            marginHorizontal: ms(16),
            marginTop: mvs(30),
          }}>
          Medical Expertise
        </Text>
:<></>}
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {serivces.map((listItem, index) => renderItems(listItem, index))}
        </View>

        {professionalExp.length == 0 ? (
          <></>
        ) : (
          <>
            <Text
              style={{
                fontSize: s(16),
                color: colors.headingColor,
                fontFamily: fonts.quicksandMedium,
                marginHorizontal: ms(16),
                marginTop: mvs(30),
              }}>
              Professional Experience
            </Text>

            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
              {professionalExp.map((listItem, index) =>
                renderItems(listItem, index),
              )}
            </View>
          </>
        )}

        {support.length == 0 ? (
          <></>
        ) : (
          <>
            <Text
              style={{
                fontSize: s(16),
                color: colors.headingColor,
                fontFamily: fonts.quicksandMedium,
                marginHorizontal: ms(16),
                marginTop: mvs(30),
              }}>
              Support Required
            </Text>

            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
              {support.map((listItem, index) => renderItems(listItem, index))}
            </View>
          </>
        )}

        <Text
          style={{
            fontSize: s(16),
            color: colors.headingColor,
            fontFamily: fonts.quicksandMedium,
            marginTop: ms(10),
            marginHorizontal: ms(16),
          }}>
          Pet Friendly
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.grey,
            fontFamily: fonts.quicksandMedium,
            marginTop: ms(10),
            marginHorizontal: ms(16),
          }}>
          {petFriendly == 1 ? 'Yes' : 'No'}
        </Text>
        <Text
          style={{
            fontSize: s(16),
            color: colors.headingColor,
            fontFamily: fonts.quicksandMedium,
            marginTop: ms(10),
            marginHorizontal: ms(16),
          }}>
          Driver Required
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.grey,
            fontFamily: fonts.quicksandMedium,
            marginTop: ms(10),
            marginHorizontal: ms(16),
          }}>
          {driverReq == 1 ? 'Yes' : 'No'}
        </Text>

        <Text
          style={{
            fontSize: s(16),
            color: colors.headingColor,
            fontFamily: fonts.quicksandMedium,
            marginTop: ms(10),
            marginHorizontal: ms(16),
          }}>
          Source of Funding 
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.grey,
            fontFamily: fonts.quicksandMedium,
            marginTop: ms(10),
            marginHorizontal: ms(16),
          }}>
          {fund == 1 ? "Local Authority Funded" :fund==2 ?'NHS Funded':fund== 3?'Self Funded':'-'}
        </Text>
        {cancelBtn == 1 ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginVertical: 10,
              marginHorizontal: 16,
              alignItems: 'center',
            }}>
            <Image
              style={{height: 18, width: 18, resizeMode: 'contain'}}
              source={images.infoo}></Image>
            <Text
              style={{
                fontSize: s(12),
                color: colors.primaryColor,
                flex: 1,
                fontFamily: fonts.quicksandMedium,
                marginStart: ms(16),
              }}>
              You can cancel your Job before 1 hour to start Job!
            </Text>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>

      {cancelBtn == 1 ? (
        <>
          <View
            style={{
              borderBottomWidth: 3,
              borderColor: colors.lightBackground,
            }}></View>
          <View style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                cancelRequestFun();
                // let body = {
                //   carer_booking_id: item?.carerBookingsInfo?.id
                // }
                // dispatch(userActionServices.cancelBookingAction(body))
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
                Cancel Booking
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
