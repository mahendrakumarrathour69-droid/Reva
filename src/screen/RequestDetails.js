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
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import MyDropDown from '../component/MyDropDown';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import DatePicker from 'react-native-date-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseToken } from '../constant/constant';
import { userActionServices } from '../redux/userServices';
import { Popable } from 'react-native-popable';
import { GETJPOBPOSTDETAILS } from '../utils/reducerConstant';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';
import ReadMore from '@fawazahmed/react-native-read-more';
import { setShouldToolbarUsesTextFieldTintColor } from 'react-native-keyboard-manager';
export default function RequestDetails(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  var id = props.route.params.id;
  var jobPostedData = '';
  const [dates, setDates] = useState([]);

  const getJobPostDetail = useSelector(state => state.getJobPostDetailsData);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [shift, setShift] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  console.log('regionregion', region);
  const [AllDate, setAllDates] = useState('');
  const [address_line_1, setAddress_line_1] = useState('');
  const [address_line_2, setAddress_line_2] = useState('');
  const [country, setCountry] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [support, setSupport] = useState([]);
  const [professionalExp, setProfessionalExp] = useState([]);
  const [category, setCategory] = useState('');
  const [additional_requirement, setAdditional_requirement] = useState('');
  const [jobPost, setJobPost] = useState('');
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

  useEffect(() => {
    dispatch(userActionServices.getJobPostDetail(id));
  }, []);
  // response get api and set data
  useEffect(() => {
    hideLoader();

    if (getJobPostDetail.type === GETJPOBPOSTDETAILS) {
      if (getJobPostDetail?.value?.status) {
        if (
          Object.keys(getJobPostDetail?.value).length != 0 &&
          getJobPostDetail?.value != undefined
        ) {
          console.log('getJobPostDetail', getJobPostDetail);
          jobPostedData = getJobPostDetail.value.data;
          let text =jobPostedData?.daterange;
          console.log(">>?>>?",text);
const myArray = text.split(" - ");
console.log("myArray>",myArray);
let word = myArray[0];
          //setJobPost(getJobPostDetail.value.data)
          setCategoryTitle(jobPostedData.job_title);
          setAdditional_requirement(jobPostedData.additional_requirement);
          setAddress_line_1(jobPostedData.address_line_1);
          setAddress_line_2(jobPostedData.address_line_2);
          setCountry(jobPostedData.country);
          setDateRange(word);
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
              let modifiactiondate = moment(postedData.booking_date).format(
                'D MMM YYYY'
              );

              dates.push(modifiactiondate);
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
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [getJobPostDetail]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          flexDirection: 'row',


        }}>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: ms(16)
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
        <View
          style={{

            alignItems: 'center',
            flex: 1,
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
            Request Details
          </Text>
        </View>
      </View>



      <View
        style={{
          borderBottomWidth: 3,
          marginVertical: mvs(20),
          borderColor: colors.lightBackground,
        }}></View>
      <View style={{ marginTop: mvs(15), marginLeft: ms(15) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: ms(15) }}>
          <Text
            style={{
              fontSize: s(18),
              color: colors.darkblue,
              flex: 1,
              marginEnd: ms(10),
              fontFamily: fonts.quicksandMedium,
            }}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {categoryTitle}
          </Text>
          <Text
            style={{
              fontSize: s(14),
              color: colors.primaryColor,
              fontFamily: fonts.quicksandMedium,
            }}>
            ID:123456789
          </Text>
        </View>

        <Text
          style={{
            fontSize: s(14),
            color: colors.blueLight,
            fontFamily: fonts.quicksandMedium,
          }}>
          {name}
          {/* {jobPost.careseeker_user_info.organisation_name} */}
        </Text>
        <Text
          style={{
            fontSize: s(14),
            color: colors.grey,
            marginTop: mvs(20),
            marginRight: ms(130),
            fontFamily: fonts.quicksandBook,
          }}>
          {address_line_1} {'\n'}
          {address_line_2}
          {'\n'}
          {country}
        </Text>
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
        <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
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
        <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
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
        <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
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

      <ScrollView style={{ flex: 1 }}>

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: ms(16), marginTop: ms(10) }}
        >
          <Text
            style={{
              fontSize: s(16),
              color: colors.grey,
              fontFamily: fonts.quicksandMedium,


            }}>
            Mr aman jain
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{
              fontSize: s(16),
              color: colors.grey,
              fontFamily: fonts.quicksandMedium,


            }}>Age :</Text>
            <Text style={{
              fontSize: s(16),
              color: colors.grey,
              fontFamily: fonts.quicksandMedium,


            }}> 40</Text>
          </View>

        </View>
        <Text
          style={{
            fontSize: s(16),
            color: colors.darkblue,
            fontFamily: fonts.quicksandMedium,
            marginHorizontal: ms(16),
            marginTop: mvs(30),
          }}>
     Date(s)
        </Text>

        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          {dateDurantion.map((listItem, index) => renderItems(listItem, index))}
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

{
  serivces?.length>0?

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

        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
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

            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
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

            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {support.map((listItem, index) => renderItems(listItem, index))}
            </View>
          </>
        )}
      </ScrollView>

      {/* <View
          style={{
            borderBottomWidth: 3,
            borderColor: colors.lightBackground,
          }}></View>
        <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity
     onPress={() => props.navigation.navigate('SendProposal')}
            style={{
              borderColor: colors.green,
              backgroundColor: colors.green,
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
                Apply
            </Text>
          </TouchableOpacity>
        </View> */}
    </SafeAreaView>
  );
}
