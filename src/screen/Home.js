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
  Linking,
  Alert,
  BackHandler,
  Modal,
  FlatList,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import { Calendar, CalendarList, LocaleConfig } from 'react-native-calendars';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseToken } from '../constant/constant';
import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import {
  BOTTOMTABPROFILE,
  LOGOUT,
  GETCATEGORY,
  GETBASICREGISTERINFO,
  HOMEAPIDETAILS,
  GETLATLONG,
  POST_JOB_DROPDOWN_DATA,
} from '../utils/reducerConstant';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';
import MyDropDown from '../component/MyDropDown';
import { AuthContext } from '../navigation/context';
import { useIsFocused } from '@react-navigation/native';
import { Image_URL, SUCCESS } from '../utils/apiConstants';
import PushNotification from '../component/PushNotification';
import { apiConfig } from '../utils/apiConfig';
import ProfessionalReqMultiple from '../component/ProfessionalReqMultiple';
import MedialExpertiseDropDown from '../component/MedialExpertiseDropDown';
export default function Home(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  var dateSelectedArray = [];
  var dateView;
  var apiSendDate;
  var lat;
  var long;
  var category_based_medicalExperties_SelectedValue = [];
  var isSelected = false;
  var updateMedicalExpList = [];
  var updateProfessionalExpList = [];
  var updateComapreSelectedDate = [];
  var updateSelectedDate = [];
  var updateApiSelectedDate = [];
  var updateComapreSelectedDate = [];
  const isFocused = useIsFocused();
  const { signOut } = useContext(AuthContext);
  const getLatLongApiData = useSelector(state => state.getLatLongDataApi);
  const getHomeApiAllData = useSelector(state => state.getHomeApiData);
  const getCategoryName = useSelector(state => state.getCategory);
  const getPostJobDropDownLists = useSelector(
    state => state.getPostJobDropDownLists,
  );
  const isCarousel = useRef(null);
  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
  const [focused, setFocused] = useState(false);
  const [job_posted_count, setJob_posted_count] = useState(0);
  const [postCode, setPostCode] = useState('');
  const [category, setCategory] = useState({ id: 0, title: 'Select category' });
  const [categoryList, setCategoryList] = useState([]);
  const [request_service_count, setRequest_service_count] = useState(0);
  const [bannercurrentIndex, setbannercurrentIndex] = useState('');
  const [bannerData, setBannerData] = useState([]);
  const [updateDate, setUpadteDate] = useState('Date');
  const [bannerFullData, setBannerFullData] = useState([]);
  const [calenderModal, setCalenderModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [apiDateSend, setApiDateSend] = useState('');
  const [dataAllset, setDataAllset] = useState(false);
  const [selectedDates, setSelectdates] = useState([]);
  const _format = 'YYYY-MM-DD';
  const _today = moment().format(_format);
  const _maxDate = moment().add(100, 'days').format(_format);
  const [_markedDates, setMarkedDates] = useState([]);
  const [minDateNow, setMinDateNow] = useState(new Date());
  const [maxDateNow, setMaxDateNow] = useState(new Date());
  const [todaydate, setTodayDate] = useState(moment().format('YYYY-MM-DD'));
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);
  const [dateSelectedArrays, setdateSelectedArrays] = useState([]);
  const [updateCompareDate, setUpdateCompareDate] = useState([]);
  const [sendApiDate, setSendApiDate] = useState();
  const [selectDate, setSelectDate] = useState('');
  const [postCodeFind, setPostCodeFind] = useState([]);
  const [postCodeMoreFind, SetPostCodeMoreFind] = useState([]);
  const [count, setCount] = useState(0);
  //for min date value
  const [maxdate, setMaxDate] = useState('');
  const [updatePostcodeData, setUpdatePostcodeData] = useState();
  const [updatePostcodeMoreData, setUpdatePostcodeMoreData] = useState();
  const [medicalExpertise, setMedicalExpertise] = useState({
    id: 0,
    title: 'Select Medical Expertise',
  });
  const [medicalExpertiseList, setMedicalExpertiseList] = useState([]);
  const [selectedMedicalExpList, setSelectedMedicalExpList] = useState([]);
  const [medicalExpListSendArray, setMedicalExpListSendArray] = useState([]);

  const [professionalExp, setProfessionalExp] = useState({
    id: 0,
    title: 'Select Experience',
  });
 
  const [professionalExpList, setProfessionalExpList] = useState([]);
  const [selectedProfeesionalExpList, setSelectedProfeesionalExpList] =
    useState([]);
  const [professionalExpListSendArray, setProfessionalExpListSendArray] =
    useState([]);
  //for max date value
  const [mindate, setMinDate] = useState('');
  const [readBell, setReadBell]=useState(0)
  // banner card item
  const bannercardItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // alert(index)
          clickOnCardDesign();
        }}
        style={{
          flex: 1,
          width: '95%',
        }}>
        <Image
          source={{ uri: item }}
          style={{
            height: mvs(160),
            width: '95%',
            borderRadius: ms(10),
            resizeMode: 'cover',
          }}
        />
      </TouchableOpacity>
    );
  };
  // banner click
  const clickOnCardDesign = () => {
    bannerFullData.map((bannerItem, bannerIndex) => {
      if (bannercurrentIndex === bannerIndex) {
        Linking.openURL(bannerItem.link_url).catch(err => {
          console.error('Failed opening page because: ', err);
          alert('Failed to open page');
        });
      }
    });
  };
console.log("readBell>>",readBell);


  //dropdown select update function
  const handleUpdate = (rowData, type) => {
    console.log('rowData', rowData);
    if (type === 'category') {
      setCategory(rowData);
      setCategoryId(rowData.id);
      const category_id = {
        category_id: rowData.id,
      };
      setMedicalExpertiseList([]);
      setSelectedMedicalExpList([]);
      setProfessionalExpList([]);
      setSelectedProfeesionalExpList([]);
     
      setMedicalExpertise({
        id: 0,
        title: 'Select Medical Expertise',
      });

      setProfessionalExp({
        id: 0,
        title: 'Select Experience',
      });
    

      dispatch(userActionServices.getPostJobDropdownData(category_id));
      // dispatch(userActionServices.getPostJobDropdownData(category_id));
      //dispatch(userActionServices.getMedicalExpertie(category_id));
    }
  };
    //   post job dropdown data  with api response
    useEffect(() => {
      // hideLoader();
  
      if (getPostJobDropDownLists.type === POST_JOB_DROPDOWN_DATA) {
        if (
          Object.keys(getPostJobDropDownLists?.value).length != 0 &&
          getPostJobDropDownLists?.value != undefined
        ) {
          console.log(
            'getPostJobDropDownListsgetPostJobDropDownLists',
            getPostJobDropDownLists,
          );
          getPostJobDropDownLists.value.categoryExpertises.map((v, i) => {
            let temp = {
              id: v.id,
              title: v.expertise_info.expertise,
              isSelected: isSelected,
            };
  
            medicalExpertiseList.push(temp);
          });
          getPostJobDropDownLists.value.categoryProfExp.map((v, i) => {
            let temp = {
              id: v.id,
              title: v.professional_experience,
              isSelected: isSelected,
            };
  
            professionalExpList.push(temp);
          });
       
          // dispatch(userActionServices.resetData());
        }
      }
      // dispatch(userActionServices.resetData());
      else {
      }
    }, [getPostJobDropDownLists]);
  
  const carouselCardItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <Image
          resizeMode="stretch"
          source={{ uri: item }}
          style={{
            height: 170,
            paddingVertical: 20,
            borderRadius: 15,
          }}></Image>
      </TouchableOpacity>
    );
  };
  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };
  // Alert show in  exit App (Back)
  useEffect(() => {
    const backAction = () => {
      if (props.navigation.isFocused()) {
        setFocused(true);

        Alert.alert('Hold on!', 'Are you sure you want to exit from app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      } else {
        setFocused(true);
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  // api call with navigation and  bottom change
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(userActionServices.homeApi());
      //dispatch(userActionServices.getCategory());
    });
    return unsubscribe;
  }, [navigation]);

  // api call profile tab
  useEffect(() => {
    console.log('updateDate', updateDate);
    dispatch(userActionServices.homeApi());
    dispatch(userActionServices.getCategory());
  }, []);


  let focus = useIsFocused();
  
  useEffect(() => {
    // dispatch(setPublicLeagueListinggData());
    setTimeout(() => {
      if (focus) {


        dispatch(userActionServices.homeApi());
      }
    }, 200);
  }, [focus]);
  // response get api and set data
  useEffect(() => {
    hideLoader();

    if (getHomeApiAllData.type === HOMEAPIDETAILS) {
      if (getHomeApiAllData?.value?.status) {
        if (
          Object.keys(getHomeApiAllData?.value).length != 0 &&
          getHomeApiAllData?.value != undefined
        ) {

          setRequest_service_count(
            getHomeApiAllData.value.request_service_count,
          );
          setJob_posted_count(getHomeApiAllData.value.job_posted_count);
          var banner = [];
          getHomeApiAllData.value.banners.map((item, index) => {
            banner.push(Image_URL + item.image);
          });
          setBannerData(banner);
          setReadBell(getHomeApiAllData?.value?.is_new_notify)
          setBannerFullData(getHomeApiAllData.value.banners);
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [getHomeApiAllData]);

  const ViewDateSelection = () => {
    console.log('dateSelectedArrays==>', dateSelectedArrays);
    console.log('_markedDates_markedDates', _markedDates);
    setCurrentMonth(INITIAL_DATE);
    const dates = dateSelectedArrays;
    let tempDates = [];
    if (dates.length <= 7) {
      dates.forEach((v, i) => {
        console.log('choose caldender date fromat', v);
        updateComapreSelectedDate.push(v);
        setUpdateCompareDate(updateComapreSelectedDate);
        tempDates.push(v);
        dateView = moment(v).format('MMM D ');
        apiSendDate = moment(v).format('YYYY-MM-DD');
        updateApiSelectedDate.push(apiSendDate);
        updateSelectedDate.push(dateView);
        setUpadteDate(updateSelectedDate);
        setSendApiDate(updateApiSelectedDate);
      });
      console.log('tempDates', tempDates);
      setSendApiDate(tempDates);
      setCalenderModal(false);
      setSearchModal(true);
    } else {
      snackbarError(' you can select maximum 7 days');
    }
  };

  // response category get api and set data
  useEffect(() => {
    // hideLoader();

    if (getCategoryName.type === GETCATEGORY) {
      if (
        Object.keys(getCategoryName?.value).length != 0 &&
        getCategoryName?.value != undefined
      ) {
        console.log('getCategoryName', getCategoryName);
        // setCategoryList([]);
        // snackbarSuccess(getCategoryName.value.message);

        getCategoryName.value.data.map((v, i) => {
          let temp = {
            id: v.id,
            title: v.category_name,
          };
          categoryList.push(temp);
        }, []);

        // const category_id = {
        //   category_id: getCategoryName.value.data[0].id,
        // };
        // dispatch(userActionServices.categoryBasedTraining(category_id));
        // dispatch(
        //   userActionServices.categoryBasedProfessionalExperience(category_id),
        // );
      }
    } else {
      //ssnackbarError(getbasicregInfoData.value.message);
      // dispatch(userActionServices.resetData());
    }
  }, [getCategoryName]);
  const noChangeFuntion = () => {
    setTimeout(() => {
      // snackbarError(error.response.data.Message);
      snackbarError(' Please select category first');
    }, 100);
  };
  const jobDuration = () => {
    // setMarkedDates([]);
    // setdateSelectedArrays([]);
    // //  setRange('');
    // setUpadteDate('Date');
    // setSelectDate('Job Duration')
    setSearchModal(false);
    setDataAllset(false);
    setCalenderModal(true);
  };
  const onDaySelect = day => {
    console.log('day', day);
    let temp = [...selectedDates];
    const _selectedDay = moment(day.dateString).format(_format);

    let selected = true;
    let selectedColor = colors.blue;
    if (_markedDates[_selectedDay]) {
      delete temp[_selectedDay];
      selected = !_markedDates[_selectedDay].selected;
      console.log('selected', selected);
    } else {
      temp.push(_selectedDay);
      setSelectdates(temp);
    }
    const updatedMarkedDates = {
      ..._markedDates,
      ...{ [_selectedDay]: { selected } },
    };

    console.log('updatedMarkedDatesupdatedMarkedDates', updatedMarkedDates);

    for (const key in updatedMarkedDates) {
      console.log('aman', updatedMarkedDates[key].selected);
      if (updatedMarkedDates[key].selected) {
        dateSelectedArray.push(key);
      }
    }
    setdateSelectedArrays(dateSelectedArray);
    console.log('dateSelectedArray', dateSelectedArray);
    setMarkedDates(updatedMarkedDates);
  };
  useEffect(() => {
    console.log('refMultiSelect', refMultiSelect);
  }, []);
  const refMultiSelect = useRef(null);
  const customHeaderProps = useRef();
  const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD');
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
                style={{ width: ms(7), height: mvs(14.6), tintColor: '#6484a4' }}
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
                style={{ width: ms(7), height: mvs(14.6), tintColor: '#6484a4' }}
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

  const closeSearchModal = () => {
    setCategory({
      id: 0,
      title: 'Select category',
    });
    setPostCode('');
    setMarkedDates([]);
    setSendApiDate([]);
    setMarkedDates([]);
    setdateSelectedArrays([]);
    setUpadteDate('Date');
    setSearchModal(false);
    setMedicalExpertiseList([]);
    setSelectedMedicalExpList([]);
    setProfessionalExpList([]);
    setSelectedProfeesionalExpList([]);
    setMedicalExpListSendArray([])
    setProfessionalExpListSendArray([])
    setMedicalExpertise({
      id: 0,
      title: 'Select Medical Expertise',
    });

    setProfessionalExp({
      id: 0,
      title: 'Select Experience',
    });
  };
  const closeCalenderModal = () => {
    setCalenderModal(false);
    setMarkedDates([]);
    setSendApiDate([]);
    setMarkedDates([]);
    setdateSelectedArrays([]);
    setUpadteDate('Date');
    setMedicalExpertiseList([]);
    setSelectedMedicalExpList([]);
    setProfessionalExpList([]);
    setSelectedProfeesionalExpList([]);
    setMedicalExpListSendArray([])
    setProfessionalExpListSendArray([])
    setMedicalExpertise({
      id: 0,
      title: 'Select Medical Expertise',
    });

    setProfessionalExp({
      id: 0,
      title: 'Select Experience',
    });
  
    setSearchModal(true);
  };
  const searchCarer = () => {
    if (category.title === 'Select category') {
      snackbarError('Select category');
    } else if (updateDate === 'Date') {
      snackbarError('Select date');
    }else if (postCode == '') {
      snackbarError('Enter Postcode ');
    }else {
      let formDatas = new FormData();
      formDatas.append('key', 'ND44-PB88-UZ69-WZ92');
      formDatas.append('Location', postCode);
      formDatas.append('Country', 'GB');
      console.log('formDatas', formDatas);
      dispatch(userActionServices.getLatLong(formDatas));
    }
  };


 // get api with postcode
 const handlePostcode = async () => {
  console.log("amamammamamamamamam");
  
  const dataPostCode = await apiConfig.postCode(
    'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Text=' +
    postCode +
    '&Container=&Origin=GBR&Countries=GBR&Datasets=&Limit=7&Filter=&Language=en&$block=true&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
  );


  
  dataPostCode.data.Items.map((v, i) => {

    postCodeFind.push(v);
    // setCount(count + 1);
  });

  setUpdatePostcodeData(!updatePostcodeData);
};
// handle retrive postcode detail
// const retrivePostcode = async (item, index) => {
//   // setPostCodeId(item.Id);

//   const getMoreAddress = await apiConfig.postCode(
//     'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Text=' +
//     postCode +
//     '&Container=' +
//     item.Id +
//     '&Origin=GBR&Countries=GBR&Datasets=&Limit=7&Filter=&Language=en&$block=true&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
//   );

//   setPostCodeFind([]);
//   console.log('getMoreAddress', getMoreAddress);
//   getMoreAddress.data.Items.map((v, i) => {
//     postCodeMoreFind.push(v);
//   });
//   setUpdatePostcodeMoreData(!updatePostcodeMoreData);
// };
 // handle retrive postcode detail
 const retrivePostcode = async (item, index) => {
  // setPostCodeId(item.Id);

  // const getMoreAddress = await apiConfig.postCode(
  //   'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Text=' +
  //   postCode +
  //   '&Container=' +
  //   item.Id +
  //   '&Origin=GBR&Countries=GBR&Datasets=&Limit=7&Filter=&Language=en&$block=true&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
  // );

  // setPostCodeFind([]);
  // console.log('getMoreAddress', getMoreAddress);
  // getMoreAddress.data.Items.map((v, i) => {
  //   postCodeMoreFind.push(v);
  // });
  // setUpdatePostcodeMoreData(!updatePostcodeMoreData);
  const getPostCodeData = await apiConfig.postCode(
    'https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Id=' +
    item.Id +
    '&Source=&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
  );

  // setCountry(getPostCodeData.data.Items[0].CountryName);
  // setTown(getPostCodeData.data.Items[0].ProvinceName);
  // setAddressLine1(getPostCodeData.data.Items[0].Line1);
  // setAddressLine2(getPostCodeData.data.Items[0].Street);
  // setHouse(getPostCodeData.data.Items[0].BuildingNumber);
  // setPostCode(getPostCodeData.data.Items[0].PostalCode);
  // setRegion(getPostCodeData.data.Items[0].District)
  setPostCodeFind([]);
  SetPostCodeMoreFind([]);
  //setUpdatePostcodeData(!updatePostcodeData);
  setUpdatePostcodeMoreData(!updatePostcodeMoreData);
};
  //dropdown select update function
  const MultiipleMedicalExpUpdates = (rowData, list, type) => {
    if (type == 'medical') {
      var temps = [];
      list.map((v, i) => {
        updateMedicalExpList.push(v);
        temps.push(v.id);
      });
      setSelectedMedicalExpList(updateMedicalExpList);
      setMedicalExpListSendArray(temps);
    }
    setSelectedMedicalExpList(updateMedicalExpList);
  };
  //dropdown select update function
  const MultiipleProfessionalExpUpdates = (rowData, list, type) => {
    if (type === 'professional') {
      var tempLangauge = [];

      list.map((v, i) => {
        updateProfessionalExpList.push(v);
        tempLangauge.push(v.id);
      });
      setSelectedProfeesionalExpList(updateProfessionalExpList);
      setProfessionalExpListSendArray(tempLangauge);
    }

    setSelectedProfeesionalExpList(updateProfessionalExpList);

    // setSelectedExperieneceInList(updateExperieneceInList);
  };
// render postcode
const renderPostCode = ({ item, index, separators }) => {
  return (
    <TouchableOpacity
      onPress={() => retrivePostcode(item, index)}
      style={{
        flex: 1,
        padding: ms(5),
        height: mvs(40),
      }}>
      <Text
        style={{
          fontSize: s(12),
          color: colors.blueLight,
          fontFamily: fonts.quicksandMedium,
        }}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.Text},{item.Description}
      </Text>
    </TouchableOpacity>
  );
};

// render postcode
const renderPostMoreCode = ({ item, index, separators }) => {
  return (
    <TouchableOpacity
      onPress={() => retrivePostcodeMore(item, index)}
      style={{
        flex: 1,
        padding: ms(5),
        height: mvs(40),
      }}>
      <Text
        style={{
          fontSize: s(12),
          color: colors.blueLight,
          fontFamily: fonts.quicksandMedium,
        }}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.Text},{item.Description}
      </Text>
    </TouchableOpacity>
  );
};

  // handle postcode clear all state are clear
  const handlePostcodeClearData = text => {
    setPostCode(text);
    if (text.length > 0) {
      <></>;
    } else {
      setPostCodeFind([]);
      SetPostCodeMoreFind([]);
      setPostCode('');
    }
  };
  // // response   getlatlong  api   and api call personl detail

  useEffect(() => {
    hideLoader();

    if (getLatLongApiData.type === GETLATLONG) {
      if (
        Object.keys(getLatLongApiData.value).length != 0 &&
        getLatLongApiData.value != undefined
      ) {
        setSearchModal(false);
        lat = getLatLongApiData?.value?.Items[0]?.Latitude;
        long = getLatLongApiData?.value?.Items[0]?.Longitude;
        console.log('lat', lat);
        console.log('long', long);
        let filterDataHome = {
          filter_category: category.title,
          filtered_dates: sendApiDate,
          latitude: lat,
          longitude: long,
          filter_expertises: medicalExpListSendArray,
          filter_prof_experience: professionalExpListSendArray,
          // latitude: "26.8501",
          // longitude: "75.7782",
        };
        console.log('filterDataHome', filterDataHome);

        props.navigation.navigate('CarerListing', {
          filterDataHome,
        });
        setCategory({
          id: 0,
          title: 'Select category',
        });
        setPostCode('');
        setMarkedDates([]);
        setSendApiDate([]);
        setMarkedDates([]);
        setdateSelectedArrays([]);
        setUpadteDate('Date');
        setSearchModal(false);
        setMedicalExpertiseList([]);
        setSelectedMedicalExpList([]);
        setProfessionalExpList([]);
        setSelectedProfeesionalExpList([]);
       
        setMedicalExpertise({
          id: 0,
          title: 'Select Medical Expertise',
        });
  
        setProfessionalExp({
          id: 0,
          title: 'Select Experience',
        });
      
        //dispatch(userActionServices.getCarerSearchListings(filterData));

        // let data = {
        //   job_title: jobTitles.title,

        //   latitude: lat,
        //   longitude: long,
        // };

        // console.log('formData', data);
        // dispatch(userActionServices.postjobs(data));
      } else {
        setTimeout(() => {
          snackbarError(getLatLongApiData.value.message);
        }, 100);
      }
    }
  }, [getLatLongApiData]);

  const retrivePostcodeMore = async (item, index) => {
    const getPostCodeData = await apiConfig.postCode(
      'https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Id=' +
      item.Id +
      '&Source=&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
    );

    // setCountry(getPostCodeData.data.Items[0].CountryName);
    // setTown(getPostCodeData.data.Items[0].ProvinceName);
    // setAddressLine1(getPostCodeData.data.Items[0].Line1);
    // setAddressLine2(getPostCodeData.data.Items[0].Street);
    // setHouse(getPostCodeData.data.Items[0].BuildingNumber);
    setPostCode(getPostCodeData.data.Items[0].PostalCode);
    // setRegion(getPostCodeData.data.Items[0].District)
    setPostCodeFind([]);
    SetPostCodeMoreFind([]);
    //setUpdatePostcodeData(!updatePostcodeData);
    setUpdatePostcodeMoreData(!updatePostcodeMoreData);
  };
  // const handlePostcodeClearData = text => {
  //   setPostCode(text);
  //   if (text.length > 0) {
  //     <></>;
  //   } else {
  //     setPostCode('');
  //   }
  // };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {/* <PushNotification></PushNotification> */}
      <PushNotification></PushNotification>
      <Modal animationType="slide" transparent={true} visible={calenderModal}>
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
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <View style={{ flexDirection: 'row', marginTop: mvs(16) }}>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(22),
                  textAlign: 'center',
                  flex: 1,

                  marginHorizontal: ms(34),
                  color: colors.blue,
                }}>
                Select Date
              </Text>
              <TouchableOpacity
                style={{ marginEnd: ms(20), alignSelf: 'center' }}
                onPress={() => closeCalenderModal()}>
                <Image
                  style={{ height: mvs(20), width: mvs(20) }}
                  source={images.cross}></Image>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 4,
                height: 1,
                width: '100%',
                marginTop: mvs(15),

                borderColor: colors.lightBackground,
              }}></View>

            <Calendar
              minDate={_today}
              maxDate={_maxDate}
              monthFormat={'MMMM yyyy'}
              markedDates={_markedDates}
              markingType="custom"
              pastScrollRange={24}
              futureScrollRange={24}
              hideExtraDays={true}
              onDayPress={onDaySelect}
              firstDay={1}
              // dayTextAtIndex0={'red'}
              // renderArrow={direction => <Arrow />}
              // Specify style for calendar container element. Default = {}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
                //  marginHorizontal:0,

                height: 370,
              }}
              //   Specify theme properties to override specific styles for calendar parts. Default = {}
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
                dayTextColor: colors.blue,

                textDisabledColor: 'gray',
                textMonthFontSize: s(20),
                textDayFontSize: s(16),
              }}
              customHeader={CustomHeader}
            // theme={theme}
            />

            <TouchableOpacity
              onPress={() => ViewDateSelection()}
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
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={searchModal}>
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
                  Search for Carer
                </Text>
                <TouchableOpacity
                  style={{ marginEnd: ms(20), alignSelf: 'center' }}
                  onPress={() => closeSearchModal()}>
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
                  Carer Category{' '}
                  <Text style={{ color: colors.starcolor }}>*</Text>
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
                  selected={category}
                  itemList={categoryList}
                  placeholder={'Select category'}
                  onUpdate={data => handleUpdate(data, 'category')}
                />
              </View>

              <View style={{ marginTop: mvs(20), marginHorizontal: ms(16) }}>
                <Text
                  style={{
                    color: colors.blue,
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Date <Text style={{ color: colors.starcolor }}>*</Text>
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    category.title === 'Select category'
                      ? noChangeFuntion()
                      : jobDuration();
                  }}
                  activeOpacity={0.5}
                  style={{
                    borderColor: colors.lightBackground,
                    backgroundColor: colors.lightBackground,
                    borderRadius: ms(6),
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    padding: Platform.OS === 'android' ? ms(13) : ms(13),
                    alignItems: 'center',
                    marginTop: mvs(7),
                  }}>
                  <Text
                    style={{
                      color: updateDate === 'Date' ? colors.grey : colors.blue,
                      fontSize: s(14),
                      flex: 1,
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    {updateDate === '' ? 'Date' : updateDate + ' '}
                  </Text>
                  <Image
                    source={images.calenders}
                    style={{
                      height: mvs(18),
                      width: mvs(18),

                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: mvs(20), marginHorizontal: ms(16) }}>
                <Text
                  style={{
                    color: colors.blue,
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Postcode <Text style={{ color: colors.starcolor }}>*</Text>
                </Text>
{/* 
                <View
                  style={{
                    borderColor: colors.lightBackground,
                    backgroundColor: colors.lightBackground,
                    borderRadius: ms(6),
                    padding: Platform.OS === 'android' ? ms(6) : ms(13),
                    marginTop: mvs(7),
                    flexDirection:'row',
                flex:1
                  }}>
                  <TextInput
                    style={{
                      color: colors.darkblue,
                      fontSize: s(14),
                      flex:1,
                      fontFamily: fonts.quicksandMedium,
                    }}
                    placeholderTextColor={colors.grey}
                    onSubmitEditing={() => {
                      if (postCode.length > 0) {
                        handlePostcode();
                      }
                    }}
                    // onBlur={() => {
                    //   if (postCode.length > 0) {
                    //     handlePostcode();
                    //   }
                    // }}
                    returnKeyType="search"
                    value={postCode}
                    onChangeText={text => handlePostcodeClearData(text)}
                    placeholder="Postcode"></TextInput>
                   

                </View> */}
                    <View
              style={{
                borderColor: colors.lightBackground,
                backgroundColor: colors.lightBackground,
           //  backgroundColor:'red',
             alignItems:'center',
                borderRadius: ms(6),
                padding: Platform.OS === 'android' ? ms(6) : ms(13),
                marginTop: mvs(7),
                flexDirection:'row',
                flex:1

              }}>
              <TextInput
                style={{
                  color: colors.darkblue,
                  fontSize: s(14),
                  flex:1,
                  fontFamily: fonts.quicksandMedium,
                }}
                placeholderTextColor={colors.grey}
                onSubmitEditing={() => {
                  if (postCode?.length > 0) {
                    handlePostcode();
                  }
                }}
                // onBlur={() => {
                //   if (postCode.length > 0) {
                //     handlePostcode();
                //   }
                // }}
                returnKeyType="search"
                value={postCode}
                onChangeText={text => handlePostcodeClearData(text)}
                placeholder="Postcode"></TextInput>
<TouchableOpacity onPress={()=>{
   if (postCode?.length > 0) {
    handlePostcode();
  }
}} >
<Image
            source={images.searchIcon}
            style={{
              height: mvs(19),
              width: mvs(19),
              resizeMode: 'contain',
              alignSelf: 'center',
              marginLeft: ms(17),
            }}
          />
          </TouchableOpacity>
            </View>
        

          {postCodeFind.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              extraData={!updatePostcodeData}
              data={postCodeFind}
              style={{
                height: 'auto',
                maxHeight: mvs(180),
                minHeight: mvs(45),
              }}
              indicatorStyle="default"
              renderItem={renderPostCode}
            />
          ) : (
            <></>
          )}
          {postCodeMoreFind.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              extraData={!updatePostcodeMoreData}
              data={postCodeMoreFind}
              style={{
                height: 'auto',
                maxHeight: mvs(180),
                minHeight: mvs(45),
              }}
              indicatorStyle="default"
              renderItem={renderPostMoreCode}
            />
          ) : (
            <></>
          )}

<View style={{ marginTop: mvs(20),}}>
            <Text style={styles.textTitle}>
              Medical Expertise
            </Text>

            <MedialExpertiseDropDown
              // refs={refSubject}
              selected={medicalExpertise}
              itemList={medicalExpertiseList}
              selectedMedicalExpList={selectedMedicalExpList}
              placeholder={'Select Medical Expertise'}
              //onUpdate={data => handleUpdates(data, 'Title')}
              onUpdate={(data, list) =>
                MultiipleMedicalExpUpdates(data, list, 'medical')
              }
            />
          </View>
          <View style={{ marginTop: mvs(10) }}>
            <Text style={styles.textTitle}>
              Professional Experience{' '}
              {/* <Text style={{ color: colors.starcolor }}>*</Text> */}
            </Text>

            <ProfessionalReqMultiple
              // refs={refSubject}
              selected={professionalExp}
              itemList={professionalExpList}
              selectedProfeesionalExpList={selectedProfeesionalExpList}
              placeholder={'Select Experience'}
              //onUpdate={data => handleUpdates(data, 'Title')}
              onUpdate={(data, list) =>
                MultiipleProfessionalExpUpdates(data, list, 'professional')
              }
            />
          </View>
              </View>


              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <TouchableOpacity
                onPress={() => searchCarer()}
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
                  Search
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
            style={{ height: mvs(19), width: mvs(21), resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <View>
          <Image
            source={images.smallLogo}
            style={{ height: mvs(41), width: mvs(50), resizeMode: 'contain' }}
          />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Notifications')}>
          <Image
            source={readBell >0 ? images.readBell :images?.notification}
            style={{ height: mvs(19), width: mvs(21), resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        onPress={() => handleOpenSettings()}
        style={{ position: 'absolute', right: ms(45), top: mvs(12) }}>
        <Image
          source={images.location}
          style={{ height: mvs(19), width: mvs(21), resizeMode: 'contain' }}
        />
      </TouchableOpacity> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: mvs(16),
          marginTop: mvs(10),
          flex: 1,
        }}>
        <TouchableOpacity
          // onPress={() => props.navigation.navigate('SearchScreen')}
          onPress={() => setSearchModal(true)}
          style={{
            borderWidth: 1,
            borderRadius: 22,
            marginTop: mvs(20),
            height: mvs(45),
            flexDirection: 'row',

            borderColor: colors.blueopacity,
          }}>
          <Image
            source={images.searchIcon}
            style={{
              height: mvs(19),
              width: mvs(19),
              resizeMode: 'contain',
              alignSelf: 'center',
              marginLeft: ms(17),
            }}
          />
          <Text
            style={{
              fontSize: s(14),
              color: colors.blueLight,
              marginLeft: ms(14),
              alignSelf: 'center',
              fontFamily: fonts.quicksandMedium,
              flex: 1,
            }}>
           Search for carer
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: mvs(20) }}>
          {bannerData.length >= 1 ? (
            <View
              style={{
                height: mvs(170),

                // marginHorizontal: 30
              }}>
              {/* <Swiper
                style={{}}
                loop={true}
                onIndexChanged={index => {
                  setbannercurrentIndex(index);
                }}
                index={bannercurrentIndex}
                autoplay={true}
                ref={isCarousel}
                showsPagination={false}
                showsButtons={false}
                bounces={false}
                loadMinimal={false}
                pagingEnabled={false}>
                {bannerData.map((listItem, index) =>
                  bannercardItem(listItem, index),
                )}
              </Swiper> */}

              <Carousel
                layout="default"
                ref={isCarousel}
                data={bannerData}
                autoplay={true}
                loop={true}
                onSnapToItem={index => setbannercurrentIndex(index)}
                renderItem={bannercardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                useScrollView={true}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',

            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() =>
              job_posted_count == 0
                ? snackbarError('Please create a post job')
                : props.navigation.navigate('JobPostedList')
            }
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.green,
              borderRadius: 10,
              height: mvs(68),
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
              {job_posted_count}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: s(16),
                color: colors.white,
                fontFamily: fonts.quicksandMedium,
              }}>
              Jobs Posted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ServiceRequest')}
            //  onPress={() => props.navigation.navigate('ConfirmBooking')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.red,
              borderRadius: 10,
              height: mvs(68),
              marginLeft: ms(15),
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
              {request_service_count}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: s(16),
                color: colors.white,
                fontFamily: fonts.quicksandMedium,
              }}>
              Booking Requests
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: mvs(19),
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: s(32),
              color: colors.blue,
              fontFamily: fonts.quicksandMedium,
            }}>
            Our Services
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Services')}
          //  onPress={() => props.navigation.navigate('ReduxScreen')}


          >

            <Text
              style={{
                fontSize: s(16),
                color: colors.primaryColor,
                fontFamily: fonts.quicksandMedium,
              }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: mvs(19),
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              width: mvs(171),
              height: mvs(256),
              borderColor: colors.yellow,
              alignItems: 'center',
              paddingHorizontal: ms(10),
              paddingTop: mvs(27),
              backgroundColor: colors.yellow,
            }}>
            <Image
              source={images.CahirPic}
              style={{
                height: mvs(150),
                width: mvs(150),
                resizeMode: 'contain',
              }}></Image>
            <Text
              style={{
                color: colors.blue,
                fontSize: s(14),
                marginTop: mvs(17),
                fontFamily: fonts.quicksandMedium,
              }}>
              Personal Care And Companionship
            </Text>
          </View>
          <View
            style={{
              flex: 1,

              flexDirection: 'column',
              marginLeft: ms(15),
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                height: mvs(105),
                alignItems: 'center',
                backgroundColor: colors.lightGreen,
                flex: 1,
                borderColor: colors.lightGreen,
              }}>
              <Image
                source={images.HousePic}
                style={{
                  height: mvs(67),
                  width: mvs(77),
                  marginTop: mvs(4),
                  resizeMode: 'contain',
                }}></Image>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: s(14),
                  flex: 1,
                  fontFamily: fonts.quicksandMedium,
                  marginTop: mvs(7),
                }}
                ellipsizeMode="tail"
                numberOfLines={1}>
                Home Health Care
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                height: mvs(135),
                marginTop: ms(15),
                flex: 1,
                alignItems: 'center',
                backgroundColor: colors.lightPink,
                borderColor: colors.lightPink,
              }}>
              <Image
                source={images.Help}
                style={{
                  height: mvs(63),
                  width: mvs(63.4),
                  marginTop: mvs(6),
                  resizeMode: 'contain',
                }}></Image>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: s(14),
                  marginTop: mvs(17),
                  flex: 1,

                  fontFamily: fonts.quicksandMedium,
                }}>
                Private Duty Nursing Care
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textTitle: {
    color: colors.blue,
    fontSize: s(16),
    fontFamily: fonts.quicksandMedium,
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



