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
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import images from '../utils/images';
import {fonts} from '../utils/font';
import {colors} from '../utils/colors';

import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, showLoader} from '../component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseToken} from '../constant/constant';
import {userActionServices} from '../redux/userServices';
import {snackbarSuccess, snackbarError} from '../utils/snackbar';
import {Image_URL, SUCCESS} from '../utils/apiConstants';
import ReadMore from '@fawazahmed/react-native-read-more';
import {Popable} from 'react-native-popable';
import MyDropDown from '../component/MyDropDown';
import {
  JOBPOSTEDAPPLIEDLISTDETAIL,
  LOGOUT,
  SENDJOBOFFER,
  GETCARERELISTDETAIL,
  VIEW_SERVICE_AGREEMENT_DETAILS,
  CAREAVAILABILTYONDATE,
  DECLINESERVICEAGREMENT,
  OFFERDECLINEREASONS,
  ACCEPT_AGREEMENT_VALIDATIONS,
} from '../utils/reducerConstant';

export default function ViewServiceAgreement(props) {
  console.log('props', props);
  const dispatch = useDispatch();
  var jobPostedData = '';
  var categoryName = props?.route?.params?.name;
  var fromScreen = props?.route?.params?.from;
  var ViewServiceAgreementId = props.route.params.ViewServiceAgreement;
  console.log("ViewServiceAgreementId>>",ViewServiceAgreementId);
  var paymentSummary = props.route.params.paymentSummary;

  var viewKey = props.route.params.key;
  console.log("viewKey",viewKey);
  //   var prices = props.route.params.price;
  const [negotiateModal, setNegotiateModal] = useState(false);
  const [reasonModal, setReasonModal] = useState(false);
  const [jobTitle, setJobTitle] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [yourPrice, setYourPrice] = useState(false);
  const [agreementPrice, setAgreementPrice] = useState(false);
  const [totalPrice, settotalPrice] = useState(false);
  const [shiftType, setShiftType] = useState(false);
  const [expertise, setExpertise] = useState([]);
  const [serviceShift, setServiceShift] = useState([]);
  const [careService, setCareService] = useState([]);
  const [dateDuration, setDateDuration] = useState([]);
  const [otherReasoninfo, setOtherReasonInfo] = useState(false);
  const [name, setName] = useState(false);
  const [timeDuration, setTimeDuration] = useState(false);
  const [declineCarerId, setDeclineCarerId] = useState('');
  const [reasonId, setReasonId] = useState('');
  const [reasonTitle, setReasonTitle] = useState({
    id: 0,
    title: 'Select Reason',
  });
  const [reasonTitlesList, setReasonTitlesList] = useState([]);
  const [agreementData, setAgreementData] = useState('');

  const [addressother, setAddressother] = useState('');
  const [addressClinet, setAddressClinet] = useState('');
  const [agreementNumber, setAgreementNumber] = useState('');
  const [serivceDate, setserViceDate] = useState([]);
  const [bookingDate, setBookingDate] = useState('');
  const [isSerivceForFutureDate, setIsSerivceForFutureDate] = useState('');

  const [addressClinetHouse, setAddressClinetHouse] = useState('');
  const [addressotherHome, setAddressotherHome] = useState('');
  const [serivceTime, setserViceDateTime] = useState('');


  const jobPostedAppliedDetail = useSelector(
    state => state.getCarerListDetails,
  );
  const offerDeclineReasonData = useSelector(
    state => state.offerDeclineReasonData,
  );
  const getViewServiceAgreementLists = useSelector(
    state => state.getViewServiceAgreementLists,
  );
  const declineSericeAgrementList = useSelector(
    state => state.declineSericeAgrementList,
  );
  const acceptAgreementValidationData = useSelector(
    state => state.acceptAgreementValidationData,
  );
  const [termsPolicy, settermsPolicy] = useState([
    {
      id: 1,

  title:`The Client agrees to directly engage ${categoryName} and  ${categoryName} agrees to provide the services mentioned above to the person receiving care with effect from the services commencement date ( CD) until the services end date (ED)  (or until this agreement is terminated in accordance with its terms).`
      },
    {
      id: 2,
  
      title:`The ${categoryName} Provider shall provide the services with all due reasonable care, skill and ability`,

    },
    {
      id: 3,
      title:`The Client agrees to pay the fees to ${categoryName}, through Revacare Platform,  for the provision of the services as per Schedule 1. Fees shall be payble in advance for the service term to Revacare who will hold it in their account and pay it to ${categoryName} only after the Client has approved the invoice raised by ${categoryName} on the Client. In case the Client does not approve the invoice, Client and ${categoryName} agree that Revacare shall mediate and settle the dispute through Revacare’s Mediation Process ( [ hyperlink])  and Client and ${categoryName} agree to submit to and be bound by Revacare’s Mediation',`
    },
    {
      id: 4,
      title: `If ${categoryName} is unable to provide the services due to illness or injury, they will notify the Client as soon as reasonably possible. If ${categoryName} is unable to provide the services for any other reason, they shall (where possible) notify the Client in advance of both the first day of absence and the expected length of absence. ${categoryName} will not be entitled for any payment for hours not worked, including where this is due to injury, illness or holiday/leave.`
    },{
      id:5,
      title:`The Client shall give ${categoryName} at least 48 hours’ notice of cancellation of any of the services. Where such notice is not given, the Client shall be responsible for paying the full fees in relation to the services booked.`
    },{
      id:6,
      title:`The Client must treat ${categoryName} with respect and dignity. Any failure to do so will be a significant breach by the Client of the Care Provision Agreement and entitle ${categoryName} to terminate this Agreement`

    },{
      id:7,
      title:'Client will be responsible for providing adequate cleaning products and protective clothing to allow the Carer to provide the Services.'
    },
    {id:8,
      title:`The ${categoryName} is a self-employed contractor and nothing in this agreement will make them an employee, worker, agent or partner of the Client, the person receiving care or of Revacare.`

    },{
      id:9,
      title:`The ${categoryName} confirms that they shall be solely responsible for all income tax liability and national insurance or similar contributions in respect of the fees.${categoryName} hereby agrees to indemnify the Client in full and on demand against any liability, assessment or claim for :  a) taxation in connection with the provision of the services, including but not limited to PAYE and National Insurance contributions  b) any employment-related claim or any claim based on worker status brought by ${categoryName} (or by any person to whom ${categoryName} delegates the performance of the services) against the Client arising out of or in connection with the provision of the services. `
    },{
      id :10,
      title:`Each of Client and ${categoryName} indemnify, and will keep indemnified, Revacare and all of Revare’s employees and agents, from all disputes, claims, liabilities etc that either of them may have against the other. Client and ${categoryName} shall deal with any such disputes, claims, liabilities etc amongst themselves and without involving Revacare. Revacare’s only responsibility will be to deal with the advance fee that is being held by it, which shall be dealt with under Revacare’s Mediation Process as set out in clause 3 above.`
    },{
      id:11,
      title:`The ${categoryName} agrees not to use or disclose to any person either during or at any time after the termination of this agreement any confidential information about the Client or the person receiving care which may come to the${categoryName} knowledge while providing the services, except where and to the extent that the Client or the person receiving care authorises the use or disclosure of confidential information in writing or if ${categoryName} is obliged to disclose any such confidential information by law.`
    },{
      id:12,
      title:`The ${categoryName} and the Client agree to comply with all applicable data protection legislation, including (but not limited to) the General Data Protection Regulation (GDPR) and the Data Protection Act 2018, as amended or updated from time to time.`
      
    },{
      id:13,
      title:`This Agreement will automatically end on the earlier of: a) the Services End Date  (unless that date is extended by agreement between ${categoryName} and the Client)  b) the date on which the Client and ${categoryName} agree that the services should end. Either ${categoryName} or the Client may terminate this agreement by giving the other at least a 48 hours’ notice that they wish to terminate the agreement .Either ${categoryName} or the Client may immediately terminate this agreement if the other party is in breach of their obligations under this agreement.${categoryName} may immediately terminate this agreement, after notice, if they are unable to provide the Services due to circumstances beyond their reasonable control. `
    },{
      id:14,
      title:`If the Client desires ${categoryName} to drive around the Client or the person receiving care in either Client’s or person receiving care’s  vehicle then Client must  ensure that  the vehicle is road worthy, ${categoryName}  holds the appropriate licence and any insurance covers such use. In the event of an accident the costs of any claim will be for Client and his insurer to settle. If the Client wishes to use ${categoryName} vehicle for being driven around, Client and ${categoryName} shall separately agree the terms of such use in advance`
    },{
      id:15,
      title:`The ${categoryName} will inform the Client if they have taken out any personal liability insurance and to what extent. In any event, ${categoryName} shall be responsible for any loss or damage caused by ${categoryName} at the Client’s or care receiver’s property`
    },{
      id:16,
      title:' This Agreement and any dispute or claim arising out of this agreement is governed by the laws of England and Wales and the parties submit to the jurisdiction of the courts of England and Wales.'
    }
    
  ]);
  useEffect(() => {
    dispatch(userActionServices.getViewServiceAgrement(ViewServiceAgreementId));
  }, []);

  
  // response get view proposal list and set data
  useEffect(() => {
    if (getViewServiceAgreementLists.type === VIEW_SERVICE_AGREEMENT_DETAILS) {
      if (getViewServiceAgreementLists?.value?.status) {
        if (
          Object.keys(getViewServiceAgreementLists?.value).length != 0 &&
          getViewServiceAgreementLists?.value != undefined
        ) {
         
          jobPostedData = getViewServiceAgreementLists.value.data;
          console.log("jobPostedData>>>",jobPostedData);

          jobPostedData = getViewServiceAgreementLists.value.data;
          setAgreementNumber(jobPostedData?.job_unq_id)
          setBookingDate(jobPostedData?.booking_date)
          setserViceDateTime( getViewServiceAgreementLists?.value?.data?.service_duration[0]?.job_start_time +' to '+getViewServiceAgreementLists?.value?.data?.service_duration[0]?.job_end_time)
          getViewServiceAgreementLists?.value?.data?.service_duration.map((v,i)=>{
          
            serivceDate?.push(v?.booking_date)
  
           })

          let currentDate = moment().unix()
          let serviceFirstDate =getViewServiceAgreementLists?.value?.data?.service_duration[0]?.booking_date+" "+getViewServiceAgreementLists?.value?.data?.service_duration[0]?.job_start_time;
          serviceFirstDate =  moment(serviceFirstDate,"YYYY-MM-DD HH:mm:ss").unix()
          //let serviceFirstDate = moment(getViewServiceAgreementLists?.value?.data?.service_duration[0]?.booking_date,"YYYY-MM-DD HH:mm:ss").unix()
          if(currentDate>=serviceFirstDate){
              setIsSerivceForFutureDate(false)
              Alert.alert('Unable to accept, service time is passed. Please decline.')
          }else{
            setIsSerivceForFutureDate(true)
          }


          setAgreementData(getViewServiceAgreementLists?.value?.data)

          getViewServiceAgreementLists?.value?.data?.request_expertises_data.map((ve,ie)=>{
            console.log("ve>>.",ve);
            setAddressClinetHouse(ve?.care_seeker_user_meta_info?.flat_no)
            setAddressClinet(ve?.care_seeker_user_meta_info?.address_line_1==undefined?'-': ve?.care_seeker_user_meta_info?.address_line_1+' , '+ve?.care_seeker_user_meta_info?.town+' , '+ve?.care_seeker_user_meta_info?.postcode)
                                 
            })
                      getViewServiceAgreementLists?.value?.data?.request_expertises_data.map((v,i)=>{
                        console.log("v,",v);
                        setName(v.name);
                        setAddressotherHome(v?.flat_no)
                        v?.care_seeker_booking_ext_support_info?.map((vv,ii)=>{
                          console.log("ii.length>>", v?.care_seeker_booking_ext_support_info?.length-2);
                         
                          careService?.push(`${vv?.extra_support_info?.extra_support} ${v?.care_seeker_booking_ext_support_info?.length-1 ==ii?'':', '} `)
                         
                        })
                     
                       
                        setAddressother(v?.address_line_1 +' , '+ v?.town + ' , '+v?.postcode)
                      })
            
                        if(fromScreen=='request'){
                          getViewServiceAgreementLists?.value?.data?.request_expertises_data.map((v,i)=>{
                      
                            v?.care_seeker_booking_expertise_info?.map((ww,ee)=>{
                console.log("www>>",ww?.category_based_expertise_info?.expertise_info?.expertise);
                              serviceShift?.push(`${ww?.category_based_expertise_info?.expertise_info?.expertise} ${ v?.care_seeker_booking_expertise_info.length-1==ee?' ':', '} `) 
                            })
                           
                          // serviceShift.push( v?.user_expertise_info?.category_based_expertise_info?.expertise_info?.expertise)
                           // serviceShift.push(`${v?.user_expertise_info?.category_based_expertise_infos?.expertise_info?.expertise} ${  getServiceAgrementDetails?.value?.data?.new_expertises.length-1==i?' ':', '} `)
                          
                          })
                
                        }else{
                          getViewServiceAgreementLists?.value?.data?.post_expertises_data.map((v,i)=>{
                      
                        
                 
                          serviceShift.push(`${v?.category_based_expertise_info?.expertise_info?.expertise} ${  getViewServiceAgreementLists?.value?.data?.post_expertises_data.length-1==i?' ':', '} `)
                          
                          })
                        }
                     
                      setAgreementPrice(jobPostedData.service_price);
                      setShiftType(jobPostedData.service_shift);
                  
                      setTimeDuration(jobPostedData.time_duration);
                      let jobPostedExpertiseTemp = [];
                      let dateDurationTemp = [];
            
                      // jobPostedData.expertises.map((expertiseInfo, expertiseIndex) => {
                      //   jobPostedExpertiseTemp.push(
                      //     expertiseInfo.user_expertise_info.category_based_expertise_info
                      //       .expertise_info.expertise,
                      //   );
                      // }, []);
                      jobPostedData?.expertises?.map((expertiseInfo, expertiseIndex) => {
                        expertiseInfo?.care_seeker_booking_expertise_info?.map((v, i) => {
                          jobPostedExpertiseTemp?.push(
                            v?.category_based_expertise_info?.expertise_info.expertise,
                          );
                        });
                      }, []);
                      jobPostedData.service_duration.map((dateInfo, dateIndex) => {
                        dateDurationTemp.push(dateInfo.booking_date);
                      }, []);
                   
                      setTimeout(() => {
                    
                        setExpertise(jobPostedExpertiseTemp);
                      }, 200);
                      setDateDuration(dateDurationTemp);
          setDateDuration(dateDurationTemp);
          //setJobPost(getJobPostDetail.value.data)

          // setProposalPrice(jobPostedData.Price);
          // setShiftType(jobPostedData.Shift);

          // let jobPostedExpertiseTemp = [];

          // jobPostedData.Expertises.map((expertiseInfo, expertiseIndex) => {
          //   jobPostedExpertiseTemp.push(
          //     expertiseInfo.user_expertise_info.category_based_expertise_info
          //       .expertise_info.expertise,
          //   );
          // }, []);

          // setExpertise(jobPostedExpertiseTemp);

          // dispatch(userActionServices.resetData());
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [getViewServiceAgreementLists]);

  // render date  and expertise
  const renderItems = (item, index) => {
    return (
      <TouchableOpacity
        //  onPress={() => chooseRates(item, index)}
        style={{
          flexDirection: 'row',
          marginTop: mvs(8),
          marginHorizontal: ms(5),
        }}>
        <View
          style={{
            paddingVertical: ms(2),
            backgroundColor: colors.lightBackground,
            borderWidth: 1,
            borderRadius: 13,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.grey,

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
  // book now api call
  const jobOffer = () => {
    let jobOffer = {
      carer_booking_id: id,
    };
    // userActionServices(sendPostJobOffer(jobOffer))
    dispatch(userActionServices.sendPostJobOffer(jobOffer));
  };
  const declineServiceAgrements = declineId => {
    console.log('reasonId', reasonId);
    console.log('otherReasoninfo', otherReasoninfo);
    console.log('otherReason', otherReason);
    if (reasonId == '') {
      snackbarError('select Reason');
    } else if (otherReasoninfo == true && otherReason == '') {
      snackbarError('select other Reason');
    } else {
      setReasonModal(false);
      let decline = {
        decline_reason_id: reasonId,
        decline_reason: otherReason,
        carer_booking_id: ViewServiceAgreementId,
      };
      console.log('decline', decline);
      dispatch(userActionServices.declineServiceAgreement(decline));
    }
  };

  // decline reason api call
  useEffect(() => {
    let declineBody = {
      type: 1,
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
  // decline agreement
  useEffect(() => {
    if (declineSericeAgrementList.type === DECLINESERVICEAGREMENT) {
      if (declineSericeAgrementList?.value?.status) {
        if (
          Object.keys(declineSericeAgrementList?.value).length != 0 &&
          declineSericeAgrementList?.value != undefined
        ) {
          console.log('declineSericeAgrementList', declineSericeAgrementList);
          jobPostedData = declineSericeAgrementList.value.data;
          //setJobPost(getJobPostDetail.value.data)

          props.navigation.navigate('Home');

          // dispatch(userActionServices.resetData());
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [declineSericeAgrementList]);

  // service Agreement validation
  useEffect(() => {
    if (acceptAgreementValidationData.type === ACCEPT_AGREEMENT_VALIDATIONS) {
      if (acceptAgreementValidationData?.value?.status) {
        if (
          Object.keys(acceptAgreementValidationData?.value).length != 0 &&
          acceptAgreementValidationData?.value != undefined
        ) {
          console.log(
            'acceptAgreementValidationData',
            acceptAgreementValidationData,
          );
          jobPostedData = acceptAgreementValidationData.value.data;
          //setJobPost(getJobPostDetail.value.data)
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarSuccess(acceptAgreementValidationData?.value?.message);
          }, 100);
          props.navigation.navigate('PaymentDetail', {
            id: ViewServiceAgreementId,
            pay: totalPrice,
            from: 'jobPosted',
            paymentSummary:paymentSummary
          
          });

          // dispatch(userActionServices.resetData());
        }
      } else {
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarError(acceptAgreementValidationData?.value?.message);
        }, 100);
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [acceptAgreementValidationData]);

  //dropdown select update function
  const handleUpdate = (rowData, type) => {
    console.log('rowData', rowData);
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

  const acceptPayemnt = () => {
    let body = {
      carer_booking_id: ViewServiceAgreementId,
    };
    dispatch(userActionServices.acceptAgreementValidation(body));
  };

  const service_render = (type, value, type1, value1) => {
    return (
      <View
        style={{
       
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
        }}>
        <>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={styles.textTitle}>{type}</Text>
            <Text style={styles.text}>{value}</Text>
          </View>
        </>

        <>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={styles.textTitle}>{type1}</Text>
            <Text style={styles.text}>{value1}</Text>
          </View>
        </>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Modal animationType="slide" transparent={true} visible={reasonModal}>
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
                Want to decline this{'\n'} service agreement?
              </Text>
              <TouchableOpacity
                style={{marginEnd: ms(20), alignSelf: 'center'}}
                onPress={() => closeReasonModal()}>
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
                  fontFamily: fonts.quicksandBook,
                  color: colors.grey,
                  fontSize: s(14),
                }}>
                You have 3 more proposals available from other carer, you can
                send offer to them after cancelling this carer service
                agreement.
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
                Yes, Decline
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <TouchableOpacity
        onPress={() => props.navigation.pop()}
        style={{
          marginTop: mvs(20),
          marginLeft: ms(16),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
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
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          marginTop:Platform.OS=='ios'?mvs(60): mvs(15),
        }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: fonts.quicksandMedium,
            color: colors.darkblue,
          }}>
          Service Agreement
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 3,
          marginVertical: mvs(20),
          borderColor: colors.lightBackground,
        }}></View>
     
     <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            marginHorizontal: ms(16),
            marginTop: mvs(10),
           
            flex: 1,
          }}>
          {/* <View style={{marginTop: mvs(10)}}>
            <Text style={styles.textTitle}>Shift Type</Text>
            <Text style={styles.text}>{shiftType}</Text>
          </View> */}
          {/* <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.quicksandMedium,
              color: colors.grey,
            }}>
{`          This is ${categoryName} Agreement is entered into between`}
          </Text> */}
           <Text
            style={{
              fontSize: 14,
              fontFamily: fonts.quicksandMedium,
              color: colors.grey,
            
           
            }}>
             This is {categoryName} Agreement entered into between
          </Text>
          <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
          <Text
            style={{
              fontFamily: fonts.quicksandBold,
              color: colors.darkblue,
              fontSize: 16,
              textAlign:'left',
              marginTop: mvs(10),
            }}>
           Service Agreement No. 
          </Text>
          <Text
            style={{
              fontFamily: fonts.quicksandBold,
              color: colors.darkblue,
              fontSize: 16,
              textAlign:'left',
              marginTop: mvs(10),
            }}>
       #{agreementNumber}
          </Text>
          </View>
          <Text
            style={{
              fontFamily: fonts.quicksandBold,
              color: colors.darkblue,
              fontSize: s(18),
              marginTop: mvs(10),
            }}>
            {categoryName}
          </Text>
       
          {service_render('Provider Name: ', agreementData?.carer_name, 'House No:', agreementData?.carer_address?.flat_no)}
          {service_render('Address:', agreementData?.carer_address?.address_line_1+ ' , '+ agreementData?.carer_address?.town+ ' , '+agreementData?.carer_address?.postcode+' , '+agreementData?.carer_address?.country)}
          {service_render('Mobile Number :', agreementData?.carer_phone_number, 'Email Address :', agreementData?.carer_email)}


          <Text
            style={{
              fontFamily: fonts.quicksandBold,
              color: colors.darkblue,
              fontSize: s(18),
              marginTop: mvs(10),
            }}>
            Client Information
          </Text>
          {service_render('Name :', agreementData?.careseeker_name, 'House No :',addressClinetHouse)}
          {service_render('Address:',addressClinet==null  ?'-':addressClinet==undefined?'-':addressClinet,'Booking Date :', bookingDate==null?'-':moment(bookingDate,"YYYY-MM-DD HH:mm:ss").format('DD MMM YYYY'))}
          {service_render('Service Date :',serivceDate.length==0?'-': moment(serivceDate,"YYYY-MM-DD").format('DD MMM YYYY'),'Service Time:',serivceTime  )}

          <Text
            style={{
              fontFamily: fonts.quicksandBold,
              color: colors.darkblue,
              fontSize: s(18),
              marginTop: mvs(10),
            }}>
           Care Recipient Information
          </Text>
          {service_render('Person receiving care :',name==null?agreementData?.careseeker_name:name, 'Care recipient house no :',addressotherHome)}
          {service_render( 'Care recipient address :',addressother)}
          {service_render('Services also include :',careService, 'Health care procedures :',serviceShift.length==0?'-': serviceShift)}
         
          <Text
            style={{
              fontFamily: fonts.quicksandMedium,
              color: colors.darkblue,
              fontSize: s(14),
              marginTop: mvs(10),
            }}>
          Charges :
          </Text>
          <Text style={{
               fontFamily: fonts.quicksandMedium,
               color: colors.grey,
               fontSize: s(12),
               marginTop:5,
               marginBottom: mvs(5),
            }}>
           As per Rates set out in Schedule 1 to this Agreement
            </Text>
         

          <Text
            style={{
              fontFamily: fonts.quicksandMedium,
              color: colors.darkblue,
              fontSize: s(16),
              marginTop: mvs(10),
            }}>
            Now, this Agreement between Client and the {categoryName}, selected by the Client, through the
            Revacare Platform
          </Text>

          {termsPolicy.map((v, i) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    color: colors.grey,
                    fontSize: s(12),
                    marginTop: mvs(5),
                  }}>
                  {`${v.id} )`}{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    color: colors.grey,
                    fontSize: s(12),
                    marginTop: mvs(5),
                  }}>
                  {v.title}
                </Text>
              </View>
            );
          })}
          {service_render(`${categoryName} :`, agreementData?.carer_name, 'Client :', agreementData?.careseeker_name)}
          {service_render('Rates :', `£  ${agreementData?.service_price}  `)}
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={styles.textTitle}>Note :</Text>
            <Text style={{
               fontFamily: fonts.quicksandMedium,
               color: colors.grey,
               fontSize: s(12),
               marginTop:5,
               marginBottom: mvs(10),
            }}>
             1 ) Transport charges on Actuals if applicable.{'\n'}2) Care Plan To be
              developed after the first visit{' '}
            </Text>
          </View>

          {/* <View style={{marginTop: mvs(10)}}>
            <Text style={styles.textTitle}>Service Agreement Price/hr</Text>
            <Text style={styles.text}> £ {agreementPrice}</Text>
          </View> */}
          {/* <View style={{marginTop: mvs(10)}}>
            <Text style={styles.textTitle}>Date duration</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {dateDuration.map((listItem, index) =>
                renderItems(listItem, index),
              )}
            </View>
          </View>
          {service_render("Time Duration",timeDuration)}
        
          <View style={{marginTop: mvs(10)}}>
            <Text style={styles.textTitle}>Expertise to be provided</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {expertise.map((listItem, index) => renderItems(listItem, index))}
            </View>
          </View> */}
        </View>

        {/* <View style={{marginHorizontal: ms(16), marginTop: mvs(10)}}>
          <Text style={styles.textTitle}>Your Price</Text>
          <Text style={styles.text}>$34</Text>
        </View> */}
      </ScrollView>
      {viewKey == 'agreementRecieved'  ?  (
        <>

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
            
              justifyContent:isSerivceForFutureDate?'space-between': 'center',
            }}>
            <TouchableOpacity
              onPress={() => setReasonModal(true)}
              style={styles.Negotiate}>
              <Text
                style={{
                  fontSize: s(18),
                  textAlign: 'center',
                  fontFamily: fonts.quicksandMedium,
                  color: colors.white,
                }}>
                Decline
              </Text>
            </TouchableOpacity>
            {
               isSerivceForFutureDate == true &&
               <TouchableOpacity
               // onPress={() => applyClickHandler()}
               onPress={() => acceptPayemnt()}
               style={styles.SendJobOffer}>
               <Text
                 style={{
                   fontSize: s(18),
                   textAlign: 'center',
                   fontFamily: fonts.quicksandMedium,
                   color: colors.white,
                 }}>
                 Accept
               </Text>
             </TouchableOpacity>
            }
           
          </View>
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textTitle: {
    fontFamily: fonts.quicksandMedium,
    color: colors.blue,
    fontSize: s(16),
    marginTop: mvs(15),
  },
  text: {
    fontFamily: fonts.quicksandMedium,
    color: colors.grey,
    fontSize: s(14),
    marginTop: mvs(5),
  },

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
});
