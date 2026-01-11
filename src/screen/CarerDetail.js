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
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, showLoader} from '../component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseToken} from '../constant/constant';
import {userActionServices} from '../redux/userServices';
import {snackbarSuccess, snackbarError} from '../utils/snackbar';
import {Image_URL, SUCCESS, careSeekerReviewList, carerReviewList} from '../utils/apiConstants';
import ReadMore from '@fawazahmed/react-native-read-more';
import {Popable} from 'react-native-popable';

import {
  JOBPOSTEDAPPLIEDLISTDETAIL,
  LOGOUT,
  SENDJOBOFFER,
  GETCARERELISTDETAIL,
  CAREAVAILABILTYONDATE,
  REVIEW_LIST,
  CARER_REVIEW_LIST
} from '../utils/reducerConstant';
import StarRating from 'react-native-star-rating-widget';
export default function CarerDetail(props) {
  var id = props.route.params.id;
  var latitudes = props?.route?.params?.latitude;
  var longitudes = props?.route?.params?.longitude;
  console.log('AppliedDetails', id);
  var prices = props.route.params.price;
  var updatedMarkedDates;
  const dispatch = useDispatch();
  const jobPostedAppliedDetail = useSelector(
    state => state.getCarerListDetails,
  );
  const getAvailabiltiesDate = useSelector(state => state.getAvailabiltiesDate);
  const reviewListingValue = useSelector(state => state.carerReviewListingdata);

  const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD');
  const [offer, setOffer] = useState('  Book Now');

  useEffect(() => {
    let body ={
      carer_user_id:id,
      latitude:latitudes,
      longitude:longitudes
    }
    dispatch(userActionServices.getCarerListsDetail(body));
    // dispatch(userActionServices.reviewListingAction(careSeekerReviewList+'?type='+1+'&page_number='+1))
  }, []);


  const aboutScrollRef = useRef();
  const [type, setType] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [data, setData] = useState('');
  const [reviews, setreviews] = useState(false);
  const [about, setAbout] = useState(false);
  const [position, setPosition] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [availabilityOnDate, setAvailabilityOnDate] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [distance, setDistance] = useState('');
  const [avgCount, setAvgCount] = useState('');
  const [ratingCount, setRatingCount] = useState('');
  const [category, setCategory] = useState('');
  const [jobTitleId, setJobTitleId] = useState('');
  const [additionalReq, setAdditionalReq] = useState('');
  const [availablefor, setAvailablefor] = useState('');

  const [experience, setExperience] = useState('');
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const [serivces, setServices] = useState([]);
  const [experienceIn, setExperienceIn] = useState([]);
  const [price, setPrice] = useState([]);
  const [training, setTraining] = useState([]);
  const [support, setSupport] = useState([]);
  const [language, setLanguage] = useState([]);

  const [notAvailableTime, setnotAvailableTime] = useState([]);

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
  const [currentPage, setCurrentPage] = useState(1);
  const [nightSelect, setNightSelect] = useState(true);
  const [daySelect, setDaySelect] = useState(false);
  const [earlySelect, setEarlySelect] = useState(false);
  const [lateSelect, setLateSelect] = useState(false);
  const [totalRating, setTotalRating] = useState('');
      const [avgRating, setAvgRating] = useState('');
  const [markedDates, setmarkedDates] = useState({});
  const [isStartDatePicked, setisStartDatePicked] = useState(false);
  const [isEndDatePicked, setisEndDatePicked] = useState(false);
  const [startDate, setstartDate] = useState();
  const [end, setEnd] = useState('');
  const [reviewReceievedList, setreviewReceievedList] = useState([])
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


// response service request get api and set data
useEffect(() => {
  hideLoader();
  if (reviewListingValue.type === CARER_REVIEW_LIST) {
    if (reviewListingValue?.value?.status) {
      if (
        Object.keys(reviewListingValue?.value).length != 0 &&
        reviewListingValue?.value != undefined
      ) {
console.log("reviewListingValue",reviewListingValue?.value.data?.list);
      //   console.log("getJobPostLstData.value.data.data>>>>>", getJobPostLstData.value.data.data);
      //   if (Object.keys(getJobPostLstData?.value?.data?.data).length > 0) {
      //     setIsDataBlank(1)
      //   } else {
      //     setIsDataBlank(2)
      //   }
     
      setTotalRating(reviewListingValue.value?.data?.total_ratings)
      setAvgRating(reviewListingValue?.value?.data?.total_avg_rating)
    
      setreviewReceievedList(reviewReceievedList => [
          ...reviewReceievedList,
          ...reviewListingValue?.value?.data?.list,
        ]);
    
    
        dispatch(userActionServices.resetData());
      }
    } 
  }
  // dispatch(userActionServices.resetData());
  else {
  }
}, [reviewListingValue]);


  const onNightSiftPress = day => {
    if (isStartDatePicked == false) {
      let markedDatess = {};
      markedDatess[day.dateString] = {
        startingDay: true,
        color: colors.green,
        textColor: '#FFFFFF',
      };
      setmarkedDates(markedDatess);
      setisStartDatePicked(true);
      setisEndDatePicked(false);
      setstartDate(day.dateString);
    } else {
      let markedDatess = markedDates;
      let startDates = moment(startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDates, 'days');
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDates.add(1, 'day');
          tempDate = moment(tempDate).format('YYYY-MM-DD');
          setEnd(tempDate);
          if (i < range) {
            markedDatess[tempDate] = {
              color: colors.green,
              textColor: '#FFFFFF',
            };
          } else {
            markedDatess[tempDate] = {
              endingDay: true,
              color: colors.green,
              textColor: '#FFFFFF',
            };
          }
        }
        setmarkedDates(markedDatess);
        setisStartDatePicked(false);
        setisEndDatePicked(true);
        setstartDate('');
      } else {
        setisStartDatePicked(false);
      }
    }
  };

  const onDayShiftPress = day => {
    if (isStartDatePicked == false) {
      let markedDatess = {};
      markedDatess[day.dateString] = {
        startingDay: true,
        color: '#58cc79',
        textColor: '#FFFFFF',
      };
      setmarkedDates(markedDatess);
      setisStartDatePicked(true);
      setisEndDatePicked(false);
      setstartDate(day.dateString);
    } else {
      let markedDatess = markedDates;
      let startDates = moment(startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDates, 'days');
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDates.add(1, 'day');
          tempDate = moment(tempDate).format('YYYY-MM-DD');
          if (i < range) {
            markedDatess[tempDate] = {color: '#58cc79', textColor: '#FFFFFF'};
          } else {
            markedDatess[tempDate] = {
              endingDay: true,
              color: '#58cc79',
              textColor: '#FFFFFF',
            };
          }
        }
        setmarkedDates(markedDatess);
        setisStartDatePicked(false);
        setisEndDatePicked(true);
        setstartDate('');
      } else {
        alert('Select an upcomming date!');
      }
    }
  };

  const onEarlyShiftPress = day => {
    if (isStartDatePicked == false) {
      let markedDatess = {};
      markedDatess[day.dateString] = {
        startingDay: true,
        color: '#6b7be3',
        textColor: '#FFFFFF',
      };
      setmarkedDates(markedDatess);
      setisStartDatePicked(true);
      setisEndDatePicked(false);
      setstartDate(day.dateString);
    } else {
      let markedDatess = markedDates;
      let startDates = moment(startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDates, 'days');
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDates.add(1, 'day');
          tempDate = moment(tempDate).format('YYYY-MM-DD');
          if (i < range) {
            markedDatess[tempDate] = {color: '#6b7be3', textColor: '#FFFFFF'};
          } else {
            markedDatess[tempDate] = {
              endingDay: true,
              color: '#6b7be3',
              textColor: '#FFFFFF',
            };
          }
        }
        setmarkedDates(markedDatess);
        setisStartDatePicked(false);
        setisEndDatePicked(true);
        setstartDate('');
      } else {
        alert('Select an upcomming date!');
      }
    }
  };

  const onLateShiftPress = day => {
    if (isStartDatePicked == false) {
      let markedDatess = {};
      markedDatess[day.dateString] = {
        startingDay: true,
        color: '#e3b212',
        textColor: '#FFFFFF',
      };
      setmarkedDates(markedDatess);
      setisStartDatePicked(true);
      setisEndDatePicked(false);
      setstartDate(day.dateString);
    } else {
      let markedDatess = markedDates;
      let startDates = moment(startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDates, 'days');
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDates.add(1, 'day');
          tempDate = moment(tempDate).format('YYYY-MM-DD');
          if (i < range) {
            markedDatess[tempDate] = {color: '#e3b212', textColor: '#FFFFFF'};
          } else {
            markedDatess[tempDate] = {
              endingDay: true,
              color: '#e3b212',
              textColor: '#FFFFFF',
            };
          }
        }
        setmarkedDates(markedDatess);
        setisStartDatePicked(false);
        setisEndDatePicked(true);
        setstartDate('');
      } else {
        alert('Select an upcomming date!');
      }
    }
  };
  const onNightPress = () => {
    if (nightSelect == false) {
      setDaySelect(false);
      setEarlySelect(false);
      setLateSelect(false);
      setNightSelect(true);
    }
  };

  const onDayPresses = () => {
    if (daySelect == false) {
      setNightSelect(false);
      setLateSelect(false);
      setEarlySelect(false);
      setDaySelect(true);
    }
  };

  const onEarlyPress = () => {
    if (earlySelect == false) {
      setNightSelect(false);
      setLateSelect(false);
      setDaySelect(false);
      setEarlySelect(true);
    }
  };

  const onLatePress = () => {
    if (lateSelect == false) {
      setNightSelect(false);
      setDaySelect(false);
      setEarlySelect(false);
      setLateSelect(true);
    }
  };

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

  useEffect(() => {
    setCurrentMonth(INITIAL_DATE);
  }, [type]);
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
  };
  const renderItems = (item, index) => {
   
    return (
      
      <View
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
      </View>
    );
  };
  const priceRenderItems = (item, index) => {
    return (
      <View
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
      </View>
    );
  };
  const trainingRenderItems = (item, index) => {
    return (
      <View
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
      </View>
    );
  };
  const supportRenderItems = (item, index) => {
    return (
      <View
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
      </View>
    );
  };
  const languageRenderItems = (item, index) => {
    return (
      <View
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
      </View>
    );
  };

  const experienceInrenderItems = (item, index) => {
    return (
      <View
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
      </View>
    );
  };

  const notAvailableTimeitems = (item, index) => {
    console.log('not Avaialable', item);
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
            {item}
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
    console.log(' review >>>item>>>>>', item);
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
              // source={{
              //   uri: Image_URL + item?.from_user_info?.profile_image,
              // }}
            //   source={
            //     type==1?
            //     item?.from_user_info?.profile_image== null
            //         ? images.defaultUser
            //         : { uri: Image_URL + item?.from_user_info?.profile_image}

            //         :
            //         item?.user_info?.profile_image== null
            //         ? images.defaultUser
            //         : { uri: Image_URL + item?.user_info?.profile_image}


            // }
            source={
          
   
                  item?.from_user_info?.profile_image== null
                  ? images.defaultUser
                  : { uri: Image_URL + item?.from_user_info?.profile_image}

                  
          }


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
                {
            
                item?.from_user_info?.organisation_name == null
                  ? item.from_user_info?.first_name +
                    ' ' +
                    item?.from_user_info?.last_name
                  : item?.from_user_info?.organisation_name
                }
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
                    color: colors.darkblue,
                  }}>
                  {item.rating}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.grey,
                  fontSize: 14,
                  marginTop: ms(5),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {moment(item.created_at).format('DD MMMM , YYYY')}
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: 16, padding: 10}}>
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
              {item?.description}
            </ReadMore>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const loadMoreItem = () => {
    let loadPage = currentPage + 1;
    setCurrentPage(loadPage);
  
       if(reviewReceievedList.length>3){
        dispatch(userActionServices.carerReviewListingAction(carerReviewList+'?type='+1+'&page_number='+loadPage+'&carer_id='+id))
       } 
    

  };
  const ratingReviews=(totalRatings,avgRatings)=>{
    console.log("avgRatings>>>",avgRatings);
    
    let avgRating = avgRatings.toString().split(".")
   let str1 = avgRating[0]
    return(
        <View style={{marginTop:16, borderWidth:1,borderColor:colors.lightGrey,height:67,marginHorizontal:16,borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:colors.lightGrey}}>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:30,fontFamily:fonts.quicksandMedium,color:colors.darkblue}}>{avgRatings}</Text>
            <View style={{flexDirection:'column'}}>
            {/* <StarRating
            enableSwiping={false}
            disable={Number(avgRatings)} 
            onPress={false}
                                emptyStar={images.yellowstar}
                                fullStar={images.yellowstar}
                                // iconSet={'Ionicons'}
                                maxStars={5}
                                rating={Number(avgRatings)}
                                starSize={20}
                                containerStyle={{ marginHorizontal: 30, marginTop: 5 }}
                                onChange={(ratings) => setAvgRating(ratings)}
                                fullStarColor={'yellow'}
                            />
                            */}
                            { <View style={{flexDirection:'row',marginHorizontal:10,marginTop:5}}>
{str1==1?
                            <>
 <Image style={{height:18,width:18}} source={images.yellowstar}></Image>
 <Image style={{height:18,width:18}} source={images.blackstar}></Image>
 <Image style={{height:18,width:18}} source={images.blackstar}></Image>
 <Image style={{height:18,width:18}} source={images.blackstar}></Image>
 <Image style={{height:18,width:18}} source={images.blackstar}></Image>
 
 </>
 
 :
 str1==2? <><Image style={{height:18,width:18}} source={images.yellowstar}></Image>
 <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    </>
    :str1==3?
    <>
    
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    </>:
  str1==4?
    <>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    </>
    :
    str1==5?
   <>
   <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
   </> 
:
<>
<Image style={{height:18,width:18}} source={images?.blackstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}>
    
    </Image>

</>


                            }
</View> }
                <Text style={{fontSize:12,fontFamily:fonts.quicksandMedium,color:colors.headingColor,marginLeft:10}}>from {totalRatings} people</Text>
                </View>
            </View>
        </View>
    )

  }
  const reviewsItemRender = ({item, index, separators}) => {
    return (
      <FlatList
        data={reviewReceievedList}
        showsVerticalScrollIndicator={false}
        renderItem={reviewItemRenderlist}
      />
    );
  };
  const availabiltyItemRender = ({item, index, separators}) => {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        {nightSelect && (
          <View style={{marginHorizontal: 15}}>
            <Calendar
              // customHeader={CostomHeader}
              minDate={mindate}
              maxDate={maxdate}
              monthFormat={'MMMM yyyy'}
              markedDates={markedDates}
              markingType="period"
              hideExtraDays={true}
              // hideArrows={true}
              // hideDayNames={true}
              // onMonthChange={onMonthChange}
              onDayPress={onNightSiftPress}
              firstDay={1}
              dayTextAtIndex0={'red'}
              // renderArrow={direction => <Arrow />}
              // Specify style for calendar container element. Default = {}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
                //  marginHorizontal:0,
                height: 370,
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                arrowColor: 'black',
                // arrowHeight:50,
                // arrowWidth:50,
                // backgroundColor:"red",
                // arrowButton:Calendar,
                'stylesheet.calendar.header': {
                  week: {
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                    dayTextAtIndex0: {
                      color: 'blue',
                    },
                  },
                },
                backgroundColor: '#ffffff',
                //  calendarBackground: 'blue',
                //  textSectionTitleColor: '#b6c1cd',
                // textSectionTitleDisabledColor: '#d9e1e8',
                // selectedDayBackgroundColor: '#00adf5',
                //  selectedDayTextColor: '#ffffff',
                //  todayTextColor: '#00adf5',
                dayTextColor: 'red',
                textDisabledColor: 'gray',
                // dotColor: '#00adf5',
                // selectedDotColor: '#ffffff',
                // arrowColor: 'orange',
                // disabledArrowColor: '#d9e1e8',
                // monthTextColor: 'blue',
                // indicatorColor: 'blue',
                // textDayFontFamily: 'monospace',
                // textMonthFontFamily: 'monospace',
                // textDayHeaderFontFamily: 'monospace',
                textDayFontWeight: '300',
                // textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                // textMonthFontSize: 16,
                // textDayHeaderFontSize: 16,
              }}
            />
          </View>
        )}

        {daySelect && (
          <View>
            <Calendar
              minDate={mindate}
              maxDate={maxdate}
              monthFormat={'MMMM yyyy'}
              markedDates={markedDates}
              markingType="period"
              hideExtraDays={true}
              // hideDayNames={true}
              onDayPress={onDayShiftPress}
              firstDay={1}
              // Specify style for calendar container element. Default = {}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
                marginHorizontal: 20,
                height: 350,
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                // backgroundColor: '#ffffff',
                // calendarBackground: '#ffffff',
                // textSectionTitleColor: '#b6c1cd',
                // textSectionTitleDisabledColor: '#d9e1e8',
                // selectedDayBackgroundColor: '#00adf5',
                // selectedDayTextColor: '#ffffff',
                //  todayTextColor: '#00adf5',
                dayTextColor: '#58cc79',
                textDisabledColor: 'gray',
                // dotColor: '#00adf5',
                // selectedDotColor: '#ffffff',
                // arrowColor: 'orange',
                // disabledArrowColor: '#d9e1e8',
                // monthTextColor: 'blue',
                // indicatorColor: 'blue',
                // textDayFontFamily: 'monospace',
                // textMonthFontFamily: 'monospace',
                // textDayHeaderFontFamily: 'monospace',
                // textDayFontWeight: '300',
                // textMonthFontWeight: 'bold',
                // textDayHeaderFontWeight: '300',
                // textDayFontSize: 16,
                // textMonthFontSize: 16,
                // textDayHeaderFontSize: 16,
              }}
            />
          </View>
        )}
        {earlySelect && (
          <View>
            <Calendar
              minDate={Date()}
              monthFormat={'MMMM yyyy'}
              markedDates={markedDates}
              markingType="period"
              hideExtraDays={true}
              hideDayNames={true}
              onDayPress={onEarlyShiftPress}
              // Specify style for calendar container element. Default = {}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
                marginHorizontal: 20,
                height: 350,
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                // backgroundColor: '#ffffff',
                // calendarBackground: '#ffffff',
                // textSectionTitleColor: '#b6c1cd',
                // textSectionTitleDisabledColor: '#d9e1e8',
                // selectedDayBackgroundColor: '#00adf5',
                // selectedDayTextColor: '#ffffff',
                //  todayTextColor: '#00adf5',
                dayTextColor: '#6b7be3',
                textDisabledColor: '#6b7be3',
                // dotColor: '#00adf5',
                // selectedDotColor: '#ffffff',
                // arrowColor: 'orange',
                // disabledArrowColor: '#d9e1e8',
                // monthTextColor: 'blue',
                // indicatorColor: 'blue',
                // textDayFontFamily: 'monospace',
                // textMonthFontFamily: 'monospace',
                // textDayHeaderFontFamily: 'monospace',
                // textDayFontWeight: '300',
                // textMonthFontWeight: 'bold',
                // textDayHeaderFontWeight: '300',
                // textDayFontSize: 16,
                // textMonthFontSize: 16,
                // textDayHeaderFontSize: 16,
              }}
            />
          </View>
        )}
        {lateSelect && (
          <View>
            <Calendar
              minDate={Date()}
              monthFormat={'MMMM yyyy'}
              markedDates={markedDates}
              markingType="period"
              hideExtraDays={true}
              hideDayNames={true}
              onDayPress={onLateShiftPress}
              // Specify style for calendar container element. Default = {}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
                marginHorizontal: 20,
                height: 350,
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                // backgroundColor: '#ffffff',
                // calendarBackground: '#ffffff',
                // textSectionTitleColor: '#b6c1cd',
                // textSectionTitleDisabledColor: '#d9e1e8',
                // selectedDayBackgroundColor: '#00adf5',
                // selectedDayTextColor: '#ffffff',
                //  todayTextColor: '#00adf5',
                dayTextColor: '#e3b212',
                textDisabledColor: '#e3b212',
                // dotColor: '#00adf5',
                // selectedDotColor: '#ffffff',
                // arrowColor: 'orange',
                // disabledArrowColor: '#d9e1e8',
                // monthTextColor: 'blue',
                // indicatorColor: 'blue',
                // textDayFontFamily: 'monospace',
                // textMonthFontFamily: 'monospace',
                // textDayHeaderFontFamily: 'monospace',
                // textDayFontWeight: '300',
                // textMonthFontWeight: 'bold',
                // textDayHeaderFontWeight: '300',
                // textDayFontSize: 16,
                // textMonthFontSize: 16,
                // textDayHeaderFontSize: 16,
              }}
            />
          </View>
        )}

        <View style={{marginTop: mvs(20), marginHorizontal: ms(16)}}>
          <Text
            style={{
              fontSize: s(18),
              color: colors.blue,
              fontFamily: fonts.quicksandMedium,
            }}>
            Available Hours
          </Text>
        </View>

        <View
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
        </View>
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
        {/* <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          {notAvailableTime.map((listItem, index) =>
            notAvailableTimeitems(listItem, index),
          )}
        </View> */}
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
    );
  };

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

  // response  job Posted applied detail and set data
  useEffect(() => {
    hideLoader();

    if (jobPostedAppliedDetail.type === GETCARERELISTDETAIL) {
      if (jobPostedAppliedDetail?.value?.status) {
        if (
          Object.keys(jobPostedAppliedDetail?.value).length != 0 &&
          jobPostedAppliedDetail?.value != undefined
        ) {


          
          let carer_booking_id;
          let jobExpertise = [];
          let Dates = [];
          let jobExperinenceIn = [];
          let jobPrice = [];
          let jobTraining = [];
          let jobLanguage = [];
          let jobSupport = [];

          let jobPostedListTemp = jobPostedAppliedDetail.value.data;
          carer_booking_id = jobPostedListTemp.carer_booking_id;
          console.log('carer_booking_idcarer_booking_id', carer_booking_id);
          console.log(
            'jobPostedListTemp?????jobPostedListTemp',
            jobPostedListTemp,
          );
          setBookingId(carer_booking_id);
          setCategory(
            jobPostedListTemp.user_meta_info.category_info.category_name,
          );
          setJobTitleId(jobPostedListTemp.user_meta_info.category_info.id);
          setAvailabilityOnDate(
            jobPostedAppliedDetail.value.availabilityOnDate,
          );
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

  //screen chnage in about review avaialality
  const chooseMap = number => {
    setType(number);
    console.log('number', number);
    if (number == 1) {
      setreviewReceievedList([])
      setAbout(true);
    } else if (number == 2) {
      setreviews(true);
      setreviewReceievedList([])
      dispatch(userActionServices.carerReviewListingAction(carerReviewList+'?type='+1+'&page_number='+1+'&carer_id='+id))
    } else if (number == 3) {
      setAvailability(true);
    }
  };
  const jobOffer = () => {
    let jobOffer = {
      carer_booking_id: bookingId,
    };
    // userActionServices(sendPostJobOffer(jobOffer))
    dispatch(userActionServices.sendPostJobOffer(jobOffer));
  };

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
          marginTop:Platform.OS=='ios'?mvs(50): mvs(12),
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
                    <View
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
                            padding: ms(2),

                            fontFamily: fonts.quicksandMedium,
                            color: colors.grey,
                          }}>
                          {category}
                        </Text>
                      </View>
                      {/* <View
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
                      </View> */}
                    </View>
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
                    serivces.length>=1?
                    <View
                      style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                      {serivces.map((listItem, index) =>
                        renderItems(listItem, index),
                      )}
                    </View>
                    :
                    <View>
                      <Text style={{
fontSize: s(14),
color: colors.blueLight,
marginLeft:10,
padding:5,
fontFamily: fonts.quicksandBook,

                      }}>N/A</Text>
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
                        experienceInrenderItems(listItem, index),
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
                        priceRenderItems(listItem, index),
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
                        trainingRenderItems(listItem, index),
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
                        languageRenderItems(listItem, index),
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
                        supportRenderItems(listItem, index),
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
            {ratingReviews(totalRating,avgRating)}
        <FlatList
          data={reviewReceievedList}
          showsVerticalScrollIndicator={false}
          renderItem={reviewItemRenderlist}
          onEndReached={() => loadMoreItem()}
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
                  //maxDate={maxdate}
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
              {availabilityOnDate === 'Not Available' ? (
                <View
                  style={{
                    marginHorizontal: ms(16),
                    backgroundColor: colors.red,
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
                </View>
              ) : (
                <View
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
                </View>
              )}

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
          marginHorizontal: ms(20),
          justifyContent: 'center',
        }}>
        {/* <View
          style={{
            flexDirection: 'row',

            justifyContent: 'space-around',
          }}>
          <View style={{ flexDirection: 'column' }}>
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
              £{" " + 34}

            </Text>
          </View> */}
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('BookingRequest', {
              name: firstName,
              lastName: lastName,
              category: category,
              id: id,
              jobTitle: jobTitleId,
            })
          }
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
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    color: colors.blue,
    fontSize: s(16),
    fontFamily: fonts.quicksandMedium,
  },
  buttonStyle: {
    borderRadius: ms(6),
    paddingVertical: mvs(12),
    // padding: ms(13),

    width: '48%',
    borderWidth: 1,
    borderColor: colors.lightBackground,
    backgroundColor: colors.lightBackground,
    flexDirection: 'row',
  },
  buttonStyles: {
    borderRadius: ms(6),
    paddingVertical: mvs(12),
    // padding: ms(13),
    justifyContent: 'space-between',
    width: '48%',
    borderWidth: 1,
    paddingHorizontal: ms(10),
    borderColor: colors.blueopacity,
    backgroundColor: colors.blueopacity,
    flexDirection: 'row',
  },
  checkImageStyle: {
    height: mvs(18),
    width: mvs(18),
    marginLeft: ms(6),
    resizeMode: 'contain',
  },
  watchImgeStyle: {
    height: mvs(18),
    width: mvs(18),
    marginLeft: ms(6),
    resizeMode: 'contain',
  },
  toggleView: {
    marginTop: ms(20),
    alignItems: 'center',
    flexDirection: 'row',
  },
  toggletext: {
    fontSize: s(16),
    color: colors.blue,
    marginLeft: ms(10),
    fontFamily: fonts.quicksandMedium,
  },
  textInputStyle: {
    color: colors.darkblue,
    fontSize: s(14),
    fontFamily: fonts.quicksandMedium,
  },
  backButton: {
    borderRadius: ms(6),
    // padding: ms(13),
    width: '48%',
    borderWidth: 1,
    height: mvs(45),
    justifyContent: 'center',
    borderColor: colors.grey,
    backgroundColor: colors.grey,
  },
  nextButton: {
    borderRadius: ms(6),
    // padding: ms(13),
    width: '48%',
    borderWidth: 1,
    height: mvs(45),
    justifyContent: 'center',
    borderColor: colors.primaryColor,
    backgroundColor: colors.primaryColor,
  },
  nextButtons: {
    borderRadius: ms(6),
    // padding: ms(13),
    width: '98%',
    borderWidth: 1,
    height: mvs(45),
    justifyContent: 'center',
    borderColor: colors.primaryColor,
    backgroundColor: colors.primaryColor,
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
    marginHorizontal: ms(6),
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
});
