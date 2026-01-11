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
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseToken } from '../constant/constant';
import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import { Image_URL, SUCCESS } from '../utils/apiConstants';
import ReadMore from '@fawazahmed/react-native-read-more';
import { Popable } from 'react-native-popable';

import {
  JOBPOSTEDAPPLIEDLISTDETAIL,
  VIEW_PRPOSAL_DETAILS,
  SENDJOBOFFER,
  DECLINE_JOB_OFFER,
} from '../utils/reducerConstant';

export default function ViewJobOffer(props) {
  const dispatch = useDispatch();
  console.log('props', props);
  var jobPostedData = '';
  var viewJobOfferId = props.route.params.viewJobOfferId;
  var fromScreen = props.route.params.from;
  console.log('viewJobOfferId', viewJobOfferId);
  var viewProposalId = props.route.params.viewProposalId;
  const sendJobOffers = useSelector(state => state.sendJobOffer);
  const declineJobOffer = useSelector(state => state.declineJobOffer);
  console.log('sendJobOffers', sendJobOffers);
  var prices = props.route.params.price;
  const [negotiateModal, setNegotiateModal] = useState(false);
  const [yourPrice, setYourPrice] = useState('');
  const [yourPriceApi, setYourPriceApi] = useState('');
  const [proposalPrice, setProposalPrice] = useState('');
  const [shiftType, setShiftType] = useState(false);
  const [expertise, setExpertise] = useState([]);
  const getViewProposalLists = useSelector(state => state.getViewProposalLists);
  console.log('getViewProposalLists', getViewProposalLists);
  useEffect(() => {
    dispatch(userActionServices.getViewProposalDetail(viewJobOfferId));
  }, []);
  // book now api call
  const jobOffer = () => {
    let jobOffer = {
      carer_booking_id: viewJobOfferId,
    };
    // userActionServices(sendPostJobOffer(jobOffer))
    dispatch(userActionServices.sendPostJobOffer(jobOffer));
  };

  const negotiateOffer = () => {
    if (yourPrice == '') {
      snackbarError('Enter Your Price');
    } else {
      let negotiateData = {
        negotiated_price: yourPrice,
        carer_booking_id: viewJobOfferId,
      };
      dispatch(userActionServices.sendPostJobOffer(negotiateData));
      setNegotiateModal(false);
    }
  };

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
            backgroundColor: colors.lightBackground,
            borderWidth: 1,
            margin: ms(5),
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

  // response get view proposal list and set data
  useEffect(() => {
    if (getViewProposalLists.type === VIEW_PRPOSAL_DETAILS) {
      if (getViewProposalLists?.value?.status) {
        if (
          Object.keys(getViewProposalLists?.value).length != 0 &&
          getViewProposalLists?.value != undefined
        ) {
          
          jobPostedData = getViewProposalLists.value.data;
          //setJobPost(getJobPostDetail.value.data)
          console.log('jobPostedData.', JSON.stringify(jobPostedData));
          setProposalPrice(jobPostedData.Price);
          setShiftType(jobPostedData.Shift);
          // let oldPrice = jobPostedData.OldPrice;
          setYourPriceApi(jobPostedData.OldPrice);
          let jobPostedExpertiseTemp = [];

          // jobPostedData.Expertises.map((expertiseInfo, expertiseIndex) => {
          //   jobPostedExpertiseTemp.push(
          //     expertiseInfo?.user_expertise_info?.category_based_expertise_info
          //       ?.expertise_info.expertise,
          //   );
          // }, []);
          if (fromScreen == 'serviceRequest') {
            jobPostedData.request_expertises_data.map((v, i) => {
              v?.care_seeker_booking_expertise_info?.map((ww, ee) => {
                console.log(
                  'www>>',
                  ww?.category_based_expertise_info?.expertise_info?.expertise,
                );
                jobPostedExpertiseTemp?.push(
                  `${
                    ww?.category_based_expertise_info?.expertise_info?.expertise
                  } ${
                    v?.care_seeker_booking_expertise_info.length - 1 == ee
                      ? ' '
                      : ', '
                  } `,
                );
              });

              // serviceShift.push( v?.user_expertise_info?.category_based_expertise_info?.expertise_info?.expertise)
              // serviceShift.push(`${v?.user_expertise_info?.category_based_expertise_infos?.expertise_info?.expertise} ${  getServiceAgrementDetails?.value?.data?.new_expertises.length-1==i?' ':', '} `)
            });
          } else {
            jobPostedData?.post_expertises_data.map((v, i) => {
              jobPostedExpertiseTemp.push(
                `${
                  v?.category_based_expertise_info
                    ?.expertise_info?.expertise
                } ${
                  jobPostedData?.post_expertises_data
                    .length -
                    1 ==
                  i
                    ? ' '
                    : ' '
                } `,
              );
            });
          }
       
        //   jobPostedData?.Expertises?.map((expertiseInfo, expertiseIndex) => {
        //     expertiseInfo?.care_seeker_booking_expertise_info?.map((v,i)=>{
        //       jobPostedExpertiseTemp?.push(
        //       v?.category_based_expertise_info
        //       ?.expertise_info.expertise
        //       );
        //     })
         


        //  }, []);

         setExpertise(jobPostedExpertiseTemp);

          // dispatch(userActionServices.resetData());
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [getViewProposalLists]);

  // response send job ofeer  api and navigate jobposted screen
  useEffect(() => {
    if (sendJobOffers.type === SENDJOBOFFER) {
      if (
        Object.keys(sendJobOffers?.value).length != 0 &&
        sendJobOffers?.value != undefined &&
        sendJobOffers.value.status
      ) {
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarSuccess(sendJobOffers?.value?.message);
        }, 100);
        //  setUpadteDate('')
        //  setSendApiDate([])
        // setType(3);
        // props.navigation.navigate('PostJobList');
        props.navigation.navigate('JobPostedList');
        // props.navigation.navigate('HomeTab');
        dispatch(userActionServices.resetData());
      } else {
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarError(sendJobOffers?.value?.message);
        }, 100);
        console.log('dhskfdshshhhi');
        dispatch(userActionServices.resetData());
      }
    } else {
      console.log('error');
    }
  }, [sendJobOffers]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Modal animationType="slide" transparent={true} visible={negotiateModal}>
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
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={{ flexDirection: 'row', flex: 1, marginTop: mvs(16) }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(22),
                    textAlign: 'center',
                    flex: 1,

                    marginHorizontal: ms(34),
                    color: colors.blue,
                  }}>
                  Negotiate
                </Text>
                <TouchableOpacity
                  style={{ marginEnd: ms(20), alignSelf: 'center' }}
                  onPress={() => setNegotiateModal(false)}>
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
                    color: colors.blue,
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Proposal Service Price/hr
                </Text>
                <Text
                  style={{
                    color: colors.grey,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  £ {proposalPrice}
                </Text>
              </View>
              <View style={{ marginTop: mvs(20), marginHorizontal: ms(16) }}>
                <Text
                  style={{
                    color: colors.blue,
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Requested price
                </Text>

                <View
                  style={{
                    borderColor: colors.lightBackground,
                    backgroundColor: colors.lightBackground,
                    borderRadius: ms(6),
                    padding: Platform.OS === 'android' ? ms(6) : ms(13),
                    marginTop: mvs(7),
                  }}>
                  <TextInput
                    style={{
                      color: colors.blue,
                      flex: 1,
                      height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                      fontSize: s(14),

                      fontFamily: fonts.quicksandMedium,
                    }}
                    keyboardType="number-pad"
                    value={yourPrice}
                    onChangeText={text => setYourPrice(text)}
                    placeholderTextColor={colors.grey}
                    placeholder="Enter Your Price"></TextInput>
                </View>
              </View>

              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <TouchableOpacity
                onPress={() => negotiateOffer()}
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
                  Send Offer
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
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
          marginTop: mvs(12),
        }}>
        <Image
          source={images.smallLogo}
          style={{ width: 50.3, height: 41.6, resizeMode: 'contain' }}></Image>
      </View>
      <View
        style={{
          borderBottomWidth: 3,
          marginVertical: mvs(20),
          borderColor: colors.lightBackground,
        }}></View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            marginHorizontal: ms(16),
            marginTop: mvs(10),
          }}>
            {
              expertise.length>0?

            
          <Text style={styles.textTitle}>Expertise to be provided</Text>
          :<></>}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {expertise.map((listItem, index) => renderItems(listItem, index))}
          </View>
        </View>
        <View
          style={{
            marginHorizontal: ms(16),
          }}>
          <Text style={styles.textTitle}>Shift Type</Text>
          <Text style={styles.text}>{shiftType}</Text>
        </View>
        {yourPriceApi == '' ? (
          <>
            <View style={{ marginHorizontal: ms(16), marginTop: mvs(10) }}>
              <Text style={styles.textTitle}>{fromScreen == 'serviceRequest'?"Carer Service Price/hr":"Proposal Service Price/hr"}</Text>
              <Text style={styles.text}> £ {proposalPrice}</Text>
            </View>
          </>
        ) : (
          <>
            {yourPriceApi && (
              <View style={{ marginHorizontal: ms(16), marginTop: mvs(10) }}>
                <Text style={styles.textTitle}>{fromScreen == 'serviceRequest'?"Carer Service Price/hr":"Proposal Service Price/hr"}</Text>
                <Text style={styles.text}> £ {yourPriceApi}</Text>
              </View>
            )}
            <View style={{ marginHorizontal: ms(16), marginTop: mvs(10) }}>
              <Text style={styles.textTitle}>Offered Service Price/hr</Text>
              <Text style={styles.text}> £ {proposalPrice}</Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textTitle: {
    fontFamily: fonts.quicksandMedium,
    color: colors.blue,
    fontSize: s(16),
    marginTop: mvs(16),
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
