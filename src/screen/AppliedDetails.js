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
import React, {useContext, useEffect, useState, useRef} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import images from '../utils/images';
import {fonts} from '../utils/font';
import {colors} from '../utils/colors';

import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, showLoader} from '../component/AppLoader';
import {userActionServices} from '../redux/userServices';
import {snackbarSuccess, snackbarError} from '../utils/snackbar';
import {Image_URL, SUCCESS} from '../utils/apiConstants';
import ReadMore from '@fawazahmed/react-native-read-more';
import {
  JOBPOSTEDAPPLIEDLISTDETAIL,
  LOGOUT,
  SENDJOBOFFER,
  CAREAVAILABILTYONDATE,
} from '../utils/reducerConstant';
export default function AppliedDetails(props) {
  const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD');
  var jobPostedData = '';
  var id = props.route.params.id;
  console.log('id', id);
  console.log('carerLisitingid', id);
  var prices = props.route.params.price;
  var updatedMarkedDates;
  const dispatch = useDispatch();
  const jobPostedAppliedDetail = useSelector(
    state => state.jobPostedAppliedDetail,
  );
  const sendJobOffers = useSelector(state => state.sendJobOffer);
  const getAvailabiltiesDate = useSelector(state => state.getAvailabiltiesDate);
  console.log('jobPostedAppliedDetail', jobPostedAppliedDetail);

  const aboutScrollRef = useRef();
  const [type, setType] = useState(1);
  const [offer, setOffer] = useState('Book Now');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [reviews, setreviews] = useState(false);
  const [about, setAbout] = useState(false);
  const [position, setPosition] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [data, setData] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [distance, setDistance] = useState('');
  const [additionalReq, setAdditionalReq] = useState('');
  const [availablefor, setAvailablefor] = useState('');
  const [availabilityOnDate, setAvailabilityOnDate] = useState('');
  const [experience, setExperience] = useState('');
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);
  const [serivces, setServices] = useState([]);
  const [experienceIn, setExperienceIn] = useState([]);
  const [price, setPrice] = useState([]);
  const [training, setTraining] = useState([]);
  const [support, setSupport] = useState([]);
  const [language, setLanguage] = useState([]);

  const [notAvailableTime, setnotAvailableTime] = useState([
    {
      id: '1',
      title: ' 08:00 AM to 08:00 PM',
    },
    {
      id: '2',
      title: ' 09:00 AM to 01:00 PM',
    },
  ]);

  const theme = {
    stylesheet: {
      calendar: {
        header: {
          dayHeader: {
            fontWeight: '600',
            color: '#48BFE3',
          },
          daySelect: {
            color: colors.red,
          },
        },
      },
    },
    'stylesheet.day.basic': {
      today: {
        borderColor: '#48BFE3',
        borderWidth: 0.8,
      },
      todayText: {
        color: '#5390D9',
        fontWeight: '800',
      },
    },
  };
  const calendarRef = useRef();
  LocaleConfig.locales['fr'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul.',
      'Aug',
      'Sept.',
      'Oct',
      'Nov',
      'Dec.',
    ],
    dayNames: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = 'fr';

  const [nightSelect, setNightSelect] = useState(true);
  const [daySelect, setDaySelect] = useState(false);
  const [earlySelect, setEarlySelect] = useState(false);
  const [lateSelect, setLateSelect] = useState(false);

  const [markedDates, setmarkedDates] = useState({});
  const [isStartDatePicked, setisStartDatePicked] = useState(false);
  const [isEndDatePicked, setisEndDatePicked] = useState(false);
  const [startDate, setstartDate] = useState();
  const [end, setEnd] = useState('');
  console.log(startDate, 'slctd date start');
  console.log(end, 'end');
  // console.log(markedDates,"MarkedDate")
  //for to date value
  const [todaydate, setTodayDate] = useState(moment().format('YYYY-MM-DD'));
  // console.log("00000",todaydate)
  //for min date value
  const [maxdate, setMaxDate] = useState('');
  // console.log(maxdate,"1111111")
  //for max date value
  const [mindate, setMinDate] = useState('');
  // console.log(mindate,"222222")

  // response get api and set data
  useEffect(() => {
    hideLoader();

    if (jobPostedAppliedDetail.type === JOBPOSTEDAPPLIEDLISTDETAIL) {
      if (jobPostedAppliedDetail?.value?.status) {
        if (
          Object.keys(jobPostedAppliedDetail?.value).length != 0 &&
          jobPostedAppliedDetail?.value != undefined
        ) {
          let carer_booking_id;
          let jobExpertise = [];
          let jobExperinenceIn = [];
          let jobPrice = [];
          let jobTraining = [];
          let jobLanguage = [];
          let jobSupport = [];
          let Dates = [];
          let jobPostedListTemp = jobPostedAppliedDetail.value.data;
          console.log("jobPostedListTemp>>>>",jobPostedListTemp);
          carer_booking_id = jobPostedListTemp.carer_booking_id;
          console.log('carer_booking_idcarer_booking_id', carer_booking_id);
          setAvailabilityOnDate(
            jobPostedAppliedDetail.value.availabilityOnDate,
          );
          setBookingId(carer_booking_id);
          setData(jobPostedListTemp)
          setFirstName(jobPostedListTemp.first_name);
          setLastName(jobPostedListTemp.last_name);
          setImageUrl(jobPostedListTemp.profile_image);
          setExperience(jobPostedListTemp.user_meta_info.experience);
          setDistance(jobPostedListTemp.user_meta_info.distance);
          setAvailablefor(jobPostedListTemp.user_meta_info.available_for);
          setAdditionalReq(jobPostedListTemp.user_meta_info.about_you);
          jobPostedAppliedDetail.value.bookedTimeslots.map(
            (dates, datesIndex) => {
              Dates.push(dates);
            },
            [],
          );

          setnotAvailableTime(Dates);

          jobPostedListTemp.user_expertises.map(
            (expertiseInfo, expertiseIndex) => {
              jobExpertise.push(
                expertiseInfo.category_based_expertise_info.expertise_info
                  .expertise,
              );
            },
            [],
          );
          jobPostedListTemp.user_category_based_prof_experience.map(
            (experienceIn, experienceIndex) => {
              jobExperinenceIn.push(
                experienceIn.category_based_prof_experience_info
                  .professional_experience,
              );
            },
            [],
          );
          jobPostedListTemp.user_category_based_trainings.map(
            (training, trainingIndex) => {
              jobTraining.push(
                training.category_based_training_info.training_info
                  .training_title,
              );
            },
            [],
          );
          jobPostedListTemp.user_languages.map((langauage, langaugeIndex) => {
            jobLanguage.push(langauage.language_info.language);
          }, []);
          jobPostedListTemp.user_extra_support.map((support, supportIndex) => {
            jobSupport.push(support.extra_support_info.extra_support);
          }, []);
          let priceShift = '';
          jobPostedListTemp.user_shift_price.map((price, priceInex) => {
            priceShift = price.price;

            jobPrice.push(price.shift_info.shift + ' : ' + '  £ ' + priceShift);
            priceShift = '';
          }, []);
          setSupport(jobSupport);
          setLanguage(jobLanguage);
          setTraining(jobTraining);
          setServices(jobExpertise);
          setExperienceIn(jobExperinenceIn);
          setPrice(jobPrice);
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [jobPostedAppliedDetail]);

  // get availabilty on date
  useEffect(() => {
    hideLoader();

    if (getAvailabiltiesDate.type === CAREAVAILABILTYONDATE) {
      if (getAvailabiltiesDate?.value?.status) {
        if (
          Object.keys(getAvailabiltiesDate?.value).length != 0 &&
          getAvailabiltiesDate?.value != undefined
        ) {
          let Dates = [];

          console.log(
            'jobPostedAppliedDetail.value.availabilityOnDate',
            getAvailabiltiesDate.value.availabilityOnDate,
          );

          setAvailabilityOnDate(getAvailabiltiesDate.value.availabilityOnDate);

          getAvailabiltiesDate.value.bookedTimeslots.map(
            (dates, datesIndex) => {
              Dates.push(dates);
            },
            [],
          );

          setnotAvailableTime(Dates);
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [getAvailabiltiesDate]);
  useEffect(() => {
    setOffer(props.route.params.coupan);
  });

  // api call  jobPostedApplied Detail
  useEffect(() => {
    dispatch(userActionServices.jobPostedAppliedListsDetail(id));
  }, []);

  const customHeaderProps = useRef();
  const shortDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const setCustomHeaderNewMonth = (next = false) => {
    const add = next ? 1 : -1;
    const month = new Date(customHeaderProps?.current?.month);
    const newMonth = new Date(month.setMonth(month.getMonth() + add));
    customHeaderProps?.current?.addMonth(add);

    setCurrentMonth(newMonth.toISOString().split('T')[0]);
  };
  const moveNext = () => {
    setCustomHeaderNewMonth(true);
  };
  const movePrevious = () => {
    setCustomHeaderNewMonth(false);
  };

  const CustomHeader = React.forwardRef((props, ref) => {
    customHeaderProps.current = props;

    return (
      <>
        <View ref={ref} {...props} style={styles.customHeader}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={movePrevious}
              // style={styles.arrowIcon}
            >
              <Image
                source={images.backArrow}
                style={{width: ms(7), height: mvs(14.6), tintColor: '#6484a4'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,

                color: colors.blue,
                fontFamily: fonts.quicksandMedium,
              }}>{`${moment(currentMonth).format('MMMM')} ${moment(
              currentMonth,
            ).format('YYYY')}`}</Text>
            <TouchableOpacity
              onPress={moveNext}
              // style={[{marginLeft: 20.5}, styles.arrowIcon]}
            >
              <Image
                source={images.sideArrow}
                style={{width: ms(7), height: mvs(14.6), tintColor: '#6484a4'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 40,
            //borderBottomWidth: 1,
            marginHorizontal: ms(4),
            // borderBottomColor: '#80c3d9ff',
            paddingHorizontal: ms(18),

            flexDirection: 'row',
            justifyContent: 'space-between',

            alignItems: 'center',
          }}>
          {shortDays.map((days, index) => (
            <Text
              style={{
                textTransform: 'capitalize',
                color: colors.blue,
                fontFamily: fonts.quicksandBold,
                fontSize: s(14),
              }}>
              {days}
            </Text>
          ))}
        </View>
      </>
    );
  });

  useEffect(() => {
    let todayDate = todaydate;
    // console.log(todayDate,"todate")
    let maxDate = moment(todayDate).add(30, 'days').format('YYYY-MM-DD');
    setMaxDate(maxDate);
    // console.log(maxDate,"maxDate")
    let minDate = moment(todayDate).subtract(0, 'days').format('YYYY-MM-DD');
    setMinDate(minDate);
    // console.log(minDate,"minDate")
  }, []);

  const [availability, setAvailability] = useState(false);
  const [searchList, setSearchList] = useState([
    {
      id: '1',
      title: 'Lauren Taylor',
      distance: '5 Miles Away',
      experince: '5Year',
      rate: '$20',
      availablesingle: images.malesign,
      availabledouble: images.femalesign,
      profile: images.profile,
      shift: 'Shift',
      starRating: 0.5,
    },
  ]);

  const [reviewList, setreviewList] = useState([
    {
      id: '1',
      title: 'Lauren Taylor',
      time: '5 June 2022',
      profile: images.profile,
      starRating: 4.5,
      titleText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
    {
      id: '2',
      title: 'Olivia Smith',
      time: '5 july 2022',
      profile: images.profile,
      starRating: 4.5,
      titleText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
    {
      id: '3',
      title: 'Chris Vagen',
      time: '5 july 2022',
      profile: images.profile,
      starRating: 4.5,
      titleText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
    {
      id: '4',
      title: 'John Doe',
      time: '5 March 2022',
      profile: images.profile,
      starRating: 4.5,
      titleText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    },
  ]);
  const chooseRates = (item, index) => {
    setSelectedIndex(index);
    console.log('item', item);
    console.log('index', index);
  };
  const renderItems = (item, index) => {
    return (
      <TouchableOpacity
        // onPress={() => chooseRates(item, index)}
        style={{
          flexDirection: 'row',
          marginHorizontal: ms(5),
          marginTop: ms(10),
        }}>
        <View
          style={{
            paddingVertical: ms(2),
            backgroundColor:
              selectedIndex === index ? colors.primaryColor : colors.white,
            borderWidth: 1,
            margin: ms(5),
            borderRadius: 13,
            borderColor: colors.blueopacity,
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: selectedIndex === index ? colors.white : colors.blue,
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

  const notAvailableTimeitems = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => chooseRates(item, index)}
        style={{flexDirection: 'row', marginLeft: ms(10), marginTop: ms(5)}}>
        <View
          style={{
            paddingVertical: ms(2),
            backgroundColor: colors.redopacity,
            borderWidth: 1,
            margin: ms(5),
            borderRadius: 13,
            borderColor: colors.red,
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.red,
              paddingVertical: ms(4),
              paddingHorizontal: ms(10),
              fontFamily: fonts.quicksandMedium,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const expandServiceView = pos => {
    if (position === pos) {
      setPosition(0);
    } else {
      setPosition(pos);
    }
    // setisSelected(!isSelected);
    // setisExperienece(!isExperienece);
  };

  const reviewItemRenderlist = ({item, index, separators}) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.lightBackground,
            marginHorizontal: s(16),
            backgroundColor: colors.white,
            marginVertical: ms(16),
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: ms(16),
              marginLeft: ms(16),
            }}>
            <Image
              source={item.profile}
              style={{
                height: mvs(70),
                width: mvs(70),

                resizeMode: 'contain',
              }}></Image>

            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                marginHorizontal: ms(20),
                marginTop: ms(10),
              }}>
              <Text
                style={{
                  fontSize: s(18),
                  color: colors.blue,
                  fontFamily: fonts.quicksandMedium,
                }}>
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  right: 0,
                  top: 20,
                }}>
                <Image
                  source={images.yellowstar}
                  style={{
                    height: mvs(16),
                    width: mvs(16),
                    resizeMode: 'contain',
                  }}></Image>
                <Text
                  style={{
                    marginLeft: s(5),
                    fontSize: s(12),
                    color: colors.blueLight,
                  }}>
                  {item.starRating}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.blueLight,
                  fontSize: s(14),
                  marginTop: ms(5),
                  fontFamily: fonts.quicksandBook,
                }}>
                {item.time}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: s(14),
              fontFamily: fonts.quicksandBook,
              color: colors.blueLight,
              marginHorizontal: ms(16),
              marginVertical: ms(10),
              lineHeight: 18,
            }}>
            {item.titleText}
          </Text>
        </View>
      </SafeAreaView>
    );
  };
  const reviewsItemRender = ({item, index, separators}) => {
    return (
      <FlatList
        data={reviewList}
        showsVerticalScrollIndicator={false}
        renderItem={reviewItemRenderlist}
      />
    );
  };

  //screen chnage in about review avaialality
  const chooseMap = number => {
    setType(number);
    console.log('number', number);
    if (number == 1) {
      setAbout(true);
    } else if (number == 2) {
      setreviews(true);
    } else if (number == 3) {
      setAvailability(true);
    }
  };
  // book now api call
  const jobOffer = () => {
    // let jobOffer = {
    //   carer_booking_id: id,
    // };
    // // userActionServices(sendPostJobOffer(jobOffer))
    // dispatch(userActionServices.sendPostJobOffer(jobOffer));

    props.navigation.navigate('ViewProposal', {
      viewProposalId: id,
      price: prices,
    });
  };
  // calender date selection
  const onDayPressHandler = day => {
    console.log('day.dateString)', day.dateString);
    setSelectedIndex('');
    setstartDate(day.dateString);

    if (startDate == '') {
      weeklyDate = day.dateString;
      console.log('weeklyDateweeklyDate', weeklyDate);
      setstartDate(weeklyDate);
      updatedMarkedDates = {
        ...markedDates,
        ...{
          [day.dateString]: {
            selected: true,
            customStyles: {
              container: {
                backgroundColor: colors.primaryColor,
                elevation: 2,
              },
              text: {
                color: '#FFFFFF',
                fontFamily: fonts.quicksandMedium,
              },
            },
          },
        },
      };
      console.log('day', day);
    } else {
      delete markedDates[startDate];
      setstartDate(day.dateString);
      updatedMarkedDates = {
        ...markedDates,
        ...{
          [day.dateString]: {
            selected: true,
            customStyles: {
              container: {
                backgroundColor: colors.primaryColor,
                elevation: 2,
              },
              text: {
                color: '#FFFFFF',
                fontFamily: fonts.quicksandMedium,
              },
            },
          },
        },
      };
    }
    setmarkedDates(updatedMarkedDates);
    let dateObj = {
      carer_user_id: id,
      selected_date: day.dateString,
    };
    console.log('dateObj', dateObj);
    dispatch(userActionServices.carerAvailabilityOnDate(dateObj));
  };
  useEffect(() => {
    setCurrentMonth(INITIAL_DATE);
  }, [type]);
  // response get api and set data
  useEffect(() => {
    hideLoader();

    if (sendJobOffers.type === SENDJOBOFFER) {
      if (
        Object.keys(sendJobOffers?.value).length != 0 &&
        sendJobOffers?.value != undefined &&
        sendJobOffers.value.status
      ) {
        setTimeout(() => {
          // snackbarError(error.response.data.Message);
          snackbarSuccess(sendJobOffers.value.message);
        }, 100);
        //  setUpadteDate('')
        //  setSendApiDate([])
        // setType(3);
        // props.navigation.navigate('PostJobList');
        props.navigation.navigate('JobPostedList');
        // props.navigation.navigate('HomeTab');
        dispatch(userActionServices.resetData());
      } else {
        console.log('dhskfdshshhhi');
        dispatch(userActionServices.resetData());
      }
    } else {
      console.log('error');
    }
  }, [sendJobOffers]);
  const backNavigation = () => {
    if (offer === 'Book Now') {
      props.navigation.navigate('CarerListing');
    } else {
      props.navigation.navigate('AppliedList');
    }
  };

  const renderReadMore = handlePress => {
    return (
      <View>
        <Text
          style={{
            color: colors.primaryColor,
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
            color: colors.primaryColor,
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
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
          style={{width: 50.3, height: 41.6, resizeMode: 'contain'}}></Image>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: mvs(20),
        }}>
        <TouchableOpacity
          onPress={() => chooseMap(1)}
          style={{
            paddingVertical: ms(15),
            justifyContent: 'center',
            borderRadius: 5,
            flex: 1,
            backgroundColor:
              type == 1 ? colors.primaryColor : colors.lightBackground,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: type == 1 ? colors.white : colors.blue,
              fontSize: s(18),
              fontFamily: fonts.quicksandMedium,
            }}>
            About
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => chooseMap(2)}
          style={{
            paddingVertical: ms(15),
            justifyContent: 'center',
            borderRadius: 5,
            flex: 1,
            backgroundColor:
              type == 2 ? colors.primaryColor : colors.lightBackground,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: type == 2 ? colors.white : colors.blue,
              fontSize: s(18),
              fontFamily: fonts.quicksandMedium,
            }}>
            Reviews
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => chooseMap(3)}
          style={{
            paddingVertical: ms(15),
            justifyContent: 'center',
            borderRadius: 5,
            flex: 1,
            backgroundColor:
              type == 3 ? colors.primaryColor : colors.lightBackground,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              textAlign: 'center',

              color: type == 3 ? colors.white : colors.blue,
              fontSize: s(18),
              fontFamily: fonts.quicksandMedium,
            }}>
            Availability
          </Text>
        </TouchableOpacity> */}
      </View>

      <View style={{flex: 1, backgroundColor: colors.lightBackground}}>
        {type == 1 ? (
          <ScrollView
            ref={aboutScrollRef}
            // onContentSizeChange={() =>
            //   aboutScrollRef.current.scrollToEnd({animated: true})
            // }
          >
            <View style={{flex: 1}}>
              <View style={{backgroundColor: colors.white, flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(16),
                    marginLeft: ms(16),
                  }}>
                  <Image
                    source={{uri: Image_URL + imageUrl}}
                    style={{
                      height: mvs(120),
                      width: mvs(120),
                      borderRadius: ms(10),
                      resizeMode: 'stretch',
                      borderWidth: 1,
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
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {firstName} {lastName}
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
                      {data?.total_avg_rating}
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.quicksandMedium,
                          color: colors.blueLight,
                          fontSize: s(12),
                          marginLeft: ms(5),
                        }}>
                      ({data?.total_ratings})
                      </Text>
                    </View>
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        marginTop: ms(10),
                      }}>
                      <View
                        style={{
                          borderRadius: 10,
                          borderWidth: 1,

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
                          Nurse
                        </Text>
                      </View>
                      <View
                        style={{
                          borderRadius: 10,
                          borderWidth: 1,
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
                          shift
                        </Text>
                      </View>
                    </View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: mvs(10),
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.quicksandMedium,
                          fontSize: s(14),
                          marginEnd: ms(5),
                          color: colors.blueLight,
                        }}>
                        Available For:
                      </Text>
                      {availablefor === 'Female' ? (
                        <Image
                          source={images.femalesign}
                          style={{
                            height: mvs(24),
                            width: mvs(24),

                            resizeMode: 'contain',
                          }}></Image>
                      ) : availablefor === 'No preference' ? (
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
                      )}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.lightBackground,
                    marginTop: mvs(10),
                    borderTopLeftRadius: ms(15),
                    borderTopRightRadius: ms(15),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: ms(15),
                      marginHorizontal: ms(16),
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Biography
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={images.time}
                        style={{
                          height: mvs(17),
                          width: mvs(17),
                          resizeMode: 'contain',
                        }}></Image>
                      <Text
                        style={{
                          marginLeft: ms(10),
                          fontSize: s(14),
                          color: colors.blueLight,
                          fontFamily: fonts.quicksandMedium,
                        }}>
                     {experience} {experience==1?"year":"years"}
                      </Text>
                    </View>
                  </View>
                  <View style={{marginHorizontal: ms(16), marginTop: mvs(8)}}>
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
                        {additionalReq}
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
                      {additionalReq}
                    </ReadMore>
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 1,
                      height: 2,
                      marginVertical: mvs(15),
                      marginHorizontal: ms(16),
                      borderColor: colors.borderline,
                    }}></View>
                  <TouchableOpacity
                    onPress={() => expandServiceView(1)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,
                        marginLeft: ms(16),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Expertise
                    </Text>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                      <Image
                        source={
                          position === 1 ? images.upArrowFill : images.downArrow
                        }
                        style={{
                          resizeMode: 'contain',
                          width: mvs(17),
                          height: mvs(9),
                          alignSelf: 'center',
                          marginRight: ms(16),
                        }}></Image>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {position === 1 ? (
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {serivces.map((listItem, index) =>
                        renderItems(listItem, index),
                      )}
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      height: 2,
                      marginVertical: mvs(15),
                      marginHorizontal: ms(16),
                      borderColor: colors.borderline,
                    }}></View>

                  <TouchableOpacity
                    onPress={() => expandServiceView(2)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,
                        marginLeft: ms(16),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Experience In
                    </Text>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                      <Image
                        source={
                          position == 2 ? images.upArrowFill : images.downArrow
                        }
                        style={{
                          resizeMode: 'contain',
                          width: mvs(17),
                          height: mvs(9),
                          alignSelf: 'center',
                          marginRight: ms(16),
                        }}></Image>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {position === 2 ? (
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {experienceIn.map((listItem, index) =>
                        renderItems(listItem, index),
                      )}
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      height: 2,
                      marginVertical: mvs(15),
                      marginHorizontal: ms(16),
                      borderColor: colors.borderline,
                    }}></View>
                  <TouchableOpacity
                    onPress={() => expandServiceView(3)}
                    style={{
                      flexDirection: 'row',

                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,
                        marginLeft: ms(16),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Rates
                    </Text>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                      <Image
                        source={
                          position == 3 ? images.upArrowFill : images.downArrow
                        }
                        style={{
                          resizeMode: 'contain',
                          width: mvs(17),
                          height: mvs(9),
                          alignSelf: 'center',
                          marginRight: ms(16),
                        }}></Image>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {position === 3 ? (
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {price.map((listItem, index) =>
                        renderItems(listItem, index),
                      )}
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      height: 2,
                      marginVertical: mvs(15),
                      marginHorizontal: ms(16),
                      borderColor: colors.borderline,
                    }}></View>
                  <TouchableOpacity
                    onPress={() => expandServiceView(4)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,
                        marginLeft: ms(16),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Trainings
                    </Text>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                      <Image
                        source={
                          position == 4 ? images.upArrowFill : images.downArrow
                        }
                        style={{
                          resizeMode: 'contain',
                          width: mvs(17),
                          height: mvs(9),
                          alignSelf: 'center',
                          marginRight: ms(16),
                        }}></Image>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {position === 4 ? (
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {training.map((listItem, index) =>
                        renderItems(listItem, index),
                      )}
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      height: 2,
                      marginVertical: mvs(15),
                      marginHorizontal: ms(16),
                      borderColor: colors.borderline,
                    }}></View>
                  <TouchableOpacity
                    onPress={() => expandServiceView(5)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,
                        marginLeft: ms(16),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Languages
                    </Text>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                      <Image
                        source={
                          position == 5 ? images.upArrowFill : images.downArrow
                        }
                        style={{
                          resizeMode: 'contain',
                          width: mvs(17),
                          height: mvs(9),
                          alignSelf: 'center',
                          marginRight: ms(16),
                        }}></Image>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {position === 5 ? (
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {language.map((listItem, index) =>
                        renderItems(listItem, index),
                      )}
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      height: 2,
                      marginVertical: mvs(15),
                      marginHorizontal: ms(16),
                      borderColor: colors.borderline,
                    }}></View>
                  <TouchableOpacity
                    onPress={() => expandServiceView(6)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,
                        marginLeft: ms(16),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Support Provided
                    </Text>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                      <Image
                        source={
                          position == 6 ? images.upArrowFill : images.downArrow
                        }
                        style={{
                          resizeMode: 'contain',
                          width: mvs(17),
                          height: mvs(9),
                          alignSelf: 'center',
                          marginRight: ms(16),
                        }}></Image>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {position === 6 ? (
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {support.map((listItem, index) =>
                        renderItems(listItem, index),
                      )}
                    </View>
                  ) : null}
                  <View
                    style={{
                      borderBottomWidth: 1,
                      height: 2,
                      marginVertical: mvs(15),
                      marginHorizontal: ms(16),
                      borderColor: colors.borderline,
                    }}></View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: ms(16),
                      marginBottom: mvs(10),
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Location
                    </Text>
                    <Text
                      style={{
                        marginLeft: ms(10),
                        fontSize: s(14),
                        color: colors.blueLight,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      {parseFloat(distance).toFixed(2)} Miles Away
                      {/* {distance} Miles Away */}
                    </Text>
                  </View>
                </View>
                {/* <View style={{ marginHorizontal: ms(16) }}>
                  <Image
                    source={images.locationMap}
                    style={{
                      width: '100%',
                      resizeMode: 'contain',
                      height: mvs(150),
                      marginTop: mvs(-115),
                      marginVertical: ms(10),
                    }}></Image>
                </View> */}
              </View>
            </View>
          </ScrollView>
        ) : type == 2 ? (
          <View style={{flex: 1, backgroundColor: colors.white}}>
            <FlatList
              data={reviewList}
              showsVerticalScrollIndicator={false}
              renderItem={reviewItemRenderlist}
            />
          </View>
        ) : (
          // <FlatList
          //   data={searchList}
          //   showsVerticalScrollIndicator={false}
          //   renderItem={availabiltyItemRender}
          // />

          <ScrollView
            style={{backgroundColor: colors.white}}
            showsVerticalScrollIndicator={false}
            ref={aboutScrollRef}>
            <View style={{flex: 1, backgroundColor: '#ffffff'}}>
              <View style={{marginHorizontal: 12}}>
                <Calendar
                  minDate={todaydate}
                  //  maxDate={maxdate}
                  monthFormat={'MMMM yyyy'}
                  onDayPress={onDayPressHandler}
                  markedDates={markedDates}
                  disabledDaysIndexes={[6, 7]}
                  markingType="custom"
                  hideExtraDays={true}
                  // onDayPress={onNightSiftPress}
                  firstDay={1}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgray',
                    //  marginHorizontal:0,

                    height: 370,
                  }}
                  theme={{
                    arrowColor: colors.blue,
                    todayTextColor: colors.primaryColor,
                    'stylesheet.calendar.header': {
                      dayTextAtIndex0: {
                        color: 'red',
                      },
                      week: {
                        marginTop: mvs(10),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 8,
                      },
                    },

                    backgroundColor: '#ffffff',

                    //  todayBackgroundColor: colors.blue,
                    dayTextColor: colors.darkblue,

                    textDisabledColor: 'gray',
                    textMonthFontSize: s(22),
                    textDayFontSize: s(18),
                  }}
                  customHeader={CustomHeader}
                />
              </View>

              <View style={{marginTop: mvs(40), marginHorizontal: ms(16)}}>
                <Text
                  style={{
                    fontSize: s(18),
                    color: colors.blue,
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Available Hours
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  marginHorizontal: ms(16),
                  backgroundColor: colors.green,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: mvs(60),
                  marginTop: mvs(15),
                  borderRadius: ms(10),
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandBook,
                  }}>
                  {availabilityOnDate}
                </Text>
              </TouchableOpacity>

              {notAvailableTime.length > 0 ? (
                <>
                  <View style={{marginTop: mvs(20), marginHorizontal: ms(16)}}>
                    <Text
                      style={{
                        fontSize: s(18),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Not available
                    </Text>
                  </View>

                  <View
                    style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {notAvailableTime.map((listItem, index) =>
                      notAvailableTimeitems(listItem, index),
                    )}
                  </View>
                </>
              ) : (
                <></>
              )}
              {/* <View
          style={{
            flexDirection: 'row',
            marginTop: mvs(18),
            marginHorizontal: ms(16),
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => onDayPresses()}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.red,
              borderRadius: 10,

              height: mvs(68),
              backgroundColor: colors.red,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: s(16),
                color: colors.white,
                fontFamily: fonts.quicksandMedium,
              }}>
              Day Shift
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: s(16),
                color: colors.white,
                fontFamily: fonts.quicksandMedium,
              }}>
              8:00 AM to 8:00 PM
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNightPress()}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.green,
              borderRadius: 10,
              height: mvs(68),
              marginLeft: ms(15),
              backgroundColor: colors.green,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: s(16),
                color: colors.white,
                fontFamily: fonts.quicksandMedium,
              }}>
              Night Shift
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: s(16),
                color: colors.white,
                fontFamily: fonts.quicksandMedium,
              }}>
              8:00 AM to 8:00 PM
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => onEarlyPress()}
          style={{
            borderWidth: 1,
            borderColor: colors.blueCalender,
            borderRadius: 10,
            height: mvs(68),
            width: mvs(171),
            marginTop: mvs(20),
            backgroundColor: colors.blueCalender,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: s(16),
              color: colors.white,
              fontFamily: fonts.quicksandMedium,
            }}>
            Live-In Shift
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: s(16),
              color: colors.white,
              fontFamily: fonts.quicksandMedium,
            }}>
            24 Hours
          </Text>
        </TouchableOpacity> */}
            </View>
          </ScrollView>
        )}
      </View>
      <View
        style={{
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
      <View
        style={{
          backgroundColor: colors.white,
          height: mvs(88),
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',

            justifyContent: 'space-around',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: s(14),
                fontFamily: fonts.quicksandMedium,
                color: colors.blue,
              }}>
              Hourly rate
            </Text>
            <Text
              style={{
                fontSize: s(20),
                fontFamily: fonts.quicksandMedium,
                color: colors.primaryColor,
              }}>
              £{' ' + prices}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => jobOffer()}
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
              View Proposal
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  top: {
    marginTop: Platform.OS === 'android' ? 33 : 66,
  },
  itemViewContainer: {
    marginTop: 15,
    backgroundColor: colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderff,
    padding: 15,
  },
  customDay: {
    textAlign: 'center',
  },
  customHeader: {
    // backgroundColor: '#4096ee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    //  marginHorizontal: ms(8),
    marginTop: mvs(15),
    height: 57,
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  customTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: fonts.quicksandMedium,
  },
  calendar: {
    marginBottom: 10,
    height: 350,
    borderRadius: 15,
    overflow: 'hidden',
  },
  customCalendar: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    // borderRadius: 15,
  },
  shadow: {
    shadowColor: '#4096ee',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 20,
    overflow: 'hidden',
  },
  arrowIcon: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
