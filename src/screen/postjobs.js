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
    Switch,
    Linking,
    Modal,
    Alert
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { apiConfig } from '../utils/apiConfig';
import { AuthContext } from '../navigation/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import { Calendar, CalendarList, LocaleConfig } from 'react-native-calendars';
import {

    LOGOUT,
    GETREGION,
    GETMEDICALEXPERTIESE,
    GETCATEGORY,
    GETLANGUAGES,
    GETALLFIELDSPOSTJOB,
    BOOKINGMODESHIFT,
    GETLATLONG,
    POSTJOBS,
    POSTJOBTITLE
} from '../utils/reducerConstant';
import MedialExpertiseDropDown from '../component/MedialExpertiseDropDown';
import LangauageMultiple from '../component/LangauageMultiple';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseToken } from '../constant/constant';
import { hideLoader, showLoader } from '../component/AppLoader';
import MyDropDown from '../component/MyDropDown';
import MultipleDropdownList from '../component/MultipleDropdownList';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { set } from 'react-native-reanimated';
export default function PostJob(props) {
    var dropDownAlllist;
    var category_based_medicalExperties_SelectedValue = []
    var isSelected = false;
    var updateMedicalExpList = [];
    var updateSelectedDate = [];
    var updateComapreSelectedDate = [];
    var updateLangauageList = [];
    var otherLanguageSelected;
    var dateSelectedArray = []
    var lat;
    var long;
    var dateView;
    var apiDate = [];
    //var dateConvert 
    const [dateConvert, setDateConvert] = useState(0)
    const [dateSelectedArrays, setdateSelectedArrays] = useState([])
    const _format = 'YYYY-MM-DD'
    const _today = moment().format(_format)
    const _maxDate = moment().add(100, 'days').format(_format)
    const [_markedDates, setMarkedDates] = useState([])

    const getRegiondata = useSelector(state => state.getRegionList);
    const getCategoryName = useSelector(state => state.getCategory);
    const getLanguage = useSelector(state => state.getLanguageList);
    const getAllFieldsData = useSelector(state => state.getAllFieldsList);
    const bookingModeShiftData = useSelector(state => state.bookingModeShiftList);
    const getLatLongApiData = useSelector(state => state.getLatLongDataApi);
    const postJobData = useSelector(state => state.postJobList);
    const postjobtitlelist = useSelector(state => state.postjobtitlelist);

    console.log('postjobtitlelist', postjobtitlelist)
    const getMedicalExpetiesData = useSelector(state => state.getMedicalExpertiesList);
    const dispatch = useDispatch();
    const { signOut } = useContext(AuthContext);
    const [type, setType] = useState(1);
    const [shift, setshift] = useState(false);
    const [hourly, setHourly] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [driverYes, setdriverYes] = useState(false);
    const [driverNo, setdriverNO] = useState(false);

    const [petYes, setPetYes] = useState(false);
    const [petNo, setPetNo] = useState(false);
    const [input, setInput] = useState(1);

    // clock start time state
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('Start Time');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(new Date());
    const [openCalender, setOpenCalender] = useState(false);

    // clock end time state
    const [dates, setDates] = useState(new Date());
    const [times, setTimes] = useState('End Time');
    const [opens, setOpens] = useState(false);

    const [calenderDate, setCalnederDate] = useState(new Date());
    const [calenderOpen, setCalenderOpen] = useState(false);
    const [selectDate, setSelectDate] = useState('');
    const [range, setRange] = useState('');
    const [weeklyCalender, setWeeklyCalender] = useState(false);


    const [minDateNow, setMinDateNow] = useState(new Date());
    const [maxDateNow, setMaxDateNow] = useState(new Date());

    const [endMinDateNow, setEndMinDateNow] = useState(new Date());
    const [endMaxDateNow, setEndMaxDateNow] = useState(new Date());


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
    const aboutScrollRef = useRef();
    //const [markedDates, setmarkedDates] = useState([todaydate]);
    const [selectedDates, setSelectdates] = useState([])
    const [postCodeFind, setPostCodeFind] = useState([]);
    const [postCodeMoreFind, SetPostCodeMoreFind] = useState([]);
    const [postCode, setPostCode] = useState('');
    const [house, setHouse] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [town, setTown] = useState('');
    const [country, setCountry] = useState('');
    const [updatePostcodeData, setUpdatePostcodeData] = useState();
    const [updatePostcodeMoreData, setUpdatePostcodeMoreData] = useState();
    const [nationalityList, setNationalityList] = useState([]);
    const [regionList, setRegionList] = useState([]);
    const [jobTitlesList, setJobTitlesList] = useState([]);
    const [shiftsList, setShiftsList] = useState([]);
    const [availableForList, setAvailableForList] = useState([]);
    const [startCareList, setStartCareList] = useState([]);
    const [isCareList, setisCareList] = useState([]);
    const [count, setCount] = useState(0);
    const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);
    const calendarRef = useRef();
    const [isStartDatePicked, setisStartDatePicked] = useState(false);
    const [isEndDatePicked, setisEndDatePicked] = useState(false);
    const [startDate, setstartDate] = useState([]);
    const [end, setEnd] = useState('');
    const [jobTitle, setJobTitle] = useState('')
    const [additonalreq, setAdditonalreq] = useState('')
    const [updateDate, setUpadteDate] = useState('')
    const [updateCompareDate, setUpdateCompareDate] = useState([])
    const [bookingType, setBookingType] = useState('')
    const [calenderModal, setCalenderModal] = useState(false);
    const [petfriendly, setPetFriendly] = useState('');
    const [drivingReq, setDrivingReq] = useState('');
    //for to date value
    const [todaydate, setTodayDate] = useState(moment().format('YYYY-MM-DD'));

    //for min date value
    const [maxdate, setMaxDate] = useState('');

    //for max date value
    const [mindate, setMinDate] = useState('');
    const [region, setRegion] = useState({
        id: '',
        title: 'Select Region',
    });
    const [jobTitles, setJobTitles] = useState({
        id: 0,
        title: 'Select Job Title',
    });
    const [shifts, setShifts] = useState(
        {
            id: 0,
            title: 'Select Shift',
        }
    );
    const [availableFor, setAvailableFor] = useState(
        {
            id: 0,
            title: 'Select Gender',
        }
    );
    const [startCare, setStartCare] = useState(
        {
            id: 0,
            title: 'Select One',
        }
    );
    const [isCare, setIsCare] = useState(
        {
            id: 0,
            title: 'Select One',
        }
    );



    // profession
    const [category, setCategory] = useState({ id: 0, title: 'Select Profession' });
    const [categoryList, setCategoryList] = useState([]);
    const [categoryListId, setCategoryListId] = useState('');
    const [medicalExpertise, setMedicalExpertise] = useState({
        id: 0,
        title: 'Select Medical Expertise',
    });
    const [medicalExpertiseList, setMedicalExpertiseList] = useState([]);
    const [selectedMedicalExpList, setSelectedMedicalExpList] = useState([]);
    const [medicalExpListSendArray, setMedicalExpListSendArray] = useState(
        [],
    );
    const [language, setLanguage] = useState({
        id: 0,
        title: 'Select Language',
    });
    const [selectedLangaugeList, setSelectedLangaugeList] = useState([]);
    const [langaugeList, setLangaugeList] = useState([]);
    const [languageSendArray, setLanguageSendArray] = useState([]);
    const [sendApiDate, setSendApiDate] = useState([]);
    const [otherLanguage, setOtherLangauage] = useState('')
    const [otherLanguageValue, setOtherLangauageValue] = useState('')
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [dataAllset, setDataAllset] = useState(false);
    useEffect(() => {


        // var dates = moment()
        //   .utcOffset('+05:30')
        //   .format('YYYY-MM-DD h:m:s a');

        var dates = moment()
            .utcOffset('+05:30')
            .format('YYYY-MM-DD');
        var timess = moment()
            .utcOffset('+05:30')
            .format('h:mm a');
        // setCurrentDate(
        //   date + '/' + month + '/' + year
        //   + ' ' + hours + ':' + min + ':' + sec + ';;;' + sss
        // );
        setCurrentDate(dates)

        setCurrentTime(timess)

    }, [time]);
    // validation and api call
    const chooseMap = number => {
        if (number == 3) {
            if (categoryListId == '') {
                snackbarError('Select Profession');
            } else if (medicalExpListSendArray.length <= 0) {
                snackbarError('Medical Experities list should be selected');
            } else if (drivingReq == '') {
                snackbarError('Select  Driver Required');
            } else if (additonalreq == '') {
                snackbarError('Enter Additional Requirement');
            } else {


                let formDatas = new FormData();
                formDatas.append('key', 'ND44-PB88-UZ69-WZ92');
                formDatas.append('Location', postCode);
                formDatas.append('Country', 'GB');

                dispatch(userActionServices.getLatLong(formDatas));
            }

        } else if (number == 2) {

            // updateCompareDate.forEach((v, i) => {
            //   let apiDates = moment(v).format('YYYY-MM-DD');
            //
            //   //apiDate.push(apiDates)
            //   sendApiDate.push(apiDates)
            // })

            // sendApiDate.forEach((v, i) => {

            //   if (v === currentDate) {

            //     if (currentTime > time) {
            //      
            //       setDataAllset(true)
            //     }
            //   }


            // })



            if (bookingType == '') {
                snackbarError('Select Booking Mode ');
            } else if (shifts.title === "Select Shift") {
                snackbarError('Select Shift');
            } else if (updateDate === 'Shift Duration' && selectDate === 'Shift Duration') {

                snackbarError('Select Shift Duration');
            } else if (time == 'Start Time') {
                snackbarError('Select Start time');
            } else if (times == 'End Time') {
                snackbarError('Select End time');
            }
            else if (availableFor.title === 'Select Gender') {
                snackbarError("Select Gender")
            } else if (isCare.title === 'Select One') {

                snackbarError("Select Is care")
            } else if (dataAllset == true) {


                Alert.alert('Alert!', 'You cannot create shift for current date because the shift starting time has already been passed. please remove the current date from selection for further process.', [
                    { text: 'Ok', onPress: () => console.log('Yes'), },
                    // {
                    //   text: 'Cancel',
                    //   onPress: () => console.log('Cancel Pressed'),

                    // },

                ]);
                // setTimeout(() => {
                //   // snackbarError(error.response.data.Message);
                //   snackbarError("You cannot create shift for current date because the shift starting time has already been passed. please remove the current date from selection for further process.")
                // }, 200);


            } else {
                setType(number + 1);
                if (shifts.title == 'Weekly live-in') {

                    let apiDates = moment(selectDate).format('YYYY-MM-DD');
                    console.log('apiDatesapiDates', apiDates)
                    //apiDate.push(apiDates)
                    sendApiDate.push(apiDates)

                } else {
                    let ggg = updateCompareDate
                    setSendApiDate(updateCompareDate)
                    // sendApiDate = updateCompareDate
                    // updateCompareDate.forEach((v, i) => {
                    //   // let apiDates = moment(v).format('YYYY-MM-DD');
                    //   // console.log('elselese', apiDates)
                    //   //apiDate.push(apiDates)
                    //   sendApiDate.push(v)
                    // })
                }
            }

        } else if (number == 1) {
            if (jobTitles.title === "Select Job Title") {
                snackbarError('Select Job Title');
            }
            else
                if (postCode == '') {
                    snackbarError('Select Postcode ');
                } else if (house == '') {
                    snackbarError('Select House/Flat No. ');
                } else if (addressLine1 == '') {
                    snackbarError('Select Address Line 1 ');
                }
                //  else if (addressLine2 == '') {
                //   snackbarError('Select Address Line 2 ');
                // } 
                else if (town == '') {
                    snackbarError('Select Town ');
                }

                else {
                    setType(number + 1);
                }

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


                lat = getLatLongApiData?.value?.Items[0]?.Latitude;
                long = getLatLongApiData?.value?.Items[0]?.Longitude;
                console.log('updateDateupdateDate', updateCompareDate)

                // if (shifts.title == 'Weekly live-in') {

                //   let apiDates = moment(selectDate).format('YYYY-MM-DD');
                //   console.log('apiDatesapiDates', apiDates)
                //   //apiDate.push(apiDates)
                //   sendApiDate.push(apiDates)

                // } else {
                //   let ggg = updateCompareDate
                //   setSendApiDate(ggg)
                //   // sendApiDate = updateCompareDate
                //   // updateCompareDate.forEach((v, i) => {
                //   //   // let apiDates = moment(v).format('YYYY-MM-DD');
                //   //   // console.log('elselese', apiDates)
                //   //   //apiDate.push(apiDates)
                //   //   sendApiDate.push(v)
                //   // })
                // }
                console.log('sendApiDatesendApiDate', sendApiDate)

                let data = {
                    "job_title": jobTitles.title,
                    'postcode': postCode,
                    "town": town,
                    'address_line_1': addressLine1,
                    'address_line_2': addressLine2,
                    "region_id": region.id,
                    'country': country,
                    "flat_no": house,
                    "latitude": lat,
                    "longitude": long,
                    // "latitude": "26.8501",
                    // "longitude": "75.7782",
                    "booking_mode": bookingType,
                    "shift_id": shifts.id,
                    'booking_date': sendApiDate,
                    'job_start_time': time,
                    'job_end_time': times,
                    'available_for': availableFor.title,
                    // 'when_would_care_start': startCare.id,
                    'is_care_ongoing': isCare.id,
                    'profession_id': categoryListId,
                    'medical_expertises': medicalExpListSendArray,
                    'language': languageSendArray.length <= 0 ? otherLanguageValue : languageSendArray,
                    'driving_required': drivingReq,
                    'pet_friendly': petfriendly,
                    "additional_requirement": additonalreq
                }



                console.log('formData', data);
                dispatch(userActionServices.postjobs(data));
            } else {
                setTimeout(() => {
                    snackbarError(getLatLongApiData.value.message);
                }, 100);
            }
        }
    }, [getLatLongApiData]);

    // jobprefrence   save api response
    useEffect(() => {
        hideLoader();
        if (postJobData.type === POSTJOBS) {
            if (postJobData?.value?.status) {
                if (
                    Object.keys(postJobData.value).length != 0 &&
                    postJobData.value != undefined
                ) {
                    setTimeout(() => {
                        // snackbarError(error.response.data.Message);
                        snackbarSuccess(postJobData.value.message);
                    }, 100);
                    //setType(1)
                    props.navigation.reset({
                        index: 1,
                        routes: [
                            { name: 'Home' }]
                    });
                    //       setPostCodeFind([]);
                    //       setCategory({ id: 0, title: 'Select Profession' })
                    //       setMedicalExpertise({ id: 0, title: 'Select Medical Expertise' })
                    //       setLanguage({ id: 0, title: 'Select Language' })


                    //       setMedicalExpListSendArray([])
                    //       setSelectedMedicalExpList([])

                    //       setdriverNO(false)
                    //       setdriverYes(false)
                    //       setPetYes(false)
                    //       setPetNo(false)
                    //       setAdditonalreq('')
                    //       SetPostCodeMoreFind([])
                    //       setJobTitle('')
                    //       setCountry('');
                    //       setTown('');
                    //       setAddressLine1('');
                    //       setAddressLine2('');
                    //       setHouse('');
                    //       setPostCode('');
                    //       setRegion({
                    //         id: '',
                    //         title: 'Select Region',
                    //       })
                    //       setShifts( {
                    //         id: 0,
                    //         title: 'Select Shift',
                    //       })
                    //       setIsCare( {
                    //         id: 0,
                    //         title: 'Select One',
                    //       })
                    //       setStartCare( {
                    //         id: 0,
                    //         title: 'Select One',
                    //       })
                    //       setAvailableFor( {
                    //         id: 0,
                    //         title: 'Select Gender',
                    //       })
                    //       setShiftsList([])
                    // setUpadteDate('Job Duration')
                    // setTime('Start Time')
                    // setTimes('End Time')
                    // setshift(false)
                    // setHourly(false)
                    // setWeeklyCalender(false)

                    dispatch(userActionServices.resetData());
                } else {
                    setTimeout(() => {
                        snackbarError(postJobData.value.message);
                    }, 100);
                }
            } 
        } else {
            console.log('error');
        }
    }, [postJobData]);





    //back click view change
    const backHandling = number => {

        if (number == 3) {
            setType(number - 1);
        } else if (number == 2) {
            setType(number - 1);
        } else {

            props.navigation.reset({
                index: 1,
                routes: [
                    { name: 'Home' }]
            });
        }
    };
    //service time select
    const userTypeSelct = async type => {
        console.log('updateDate', updateDate)
        setBookingType(type)
        setShiftsList([])
        setUpadteDate('Shift Duration')
        setTime('Start Time')
        setTimes('End Time')
        setShifts({ id: 0, title: 'Select Shift', })
        setWeeklyCalender(false)
        let bookingMode = {
            booking_mode: type
        }
        dispatch(userActionServices.bookingModeShift(bookingMode))
        if (type == "Shift") {
            setshift(true);
            setHourly(false);
            setInput(1);
        } else {
            setHourly(true);
            setshift(false);
            setInput(2);
        }
    };

    //pet required
    const petFriendly = async type => {

        if (type == 1) {
            setPetYes(true);
            setPetNo(false);
            setInput(1);
            setPetFriendly("1");
        } else {
            setPetNo(true);
            setPetYes(false);
            setInput(2);
            setPetFriendly("0");
        }
    };
    // driver requierd
    const driverTypeReq = async type => {
        console.log('type', type);
        if (type == 1) {
            setdriverYes(true);
            setdriverNO(false);
            setInput(1);
            setDrivingReq("1");

        } else {
            setdriverNO(true);
            setdriverYes(false);
            setInput(2);
            setDrivingReq("0");
        }
    };

    // get api with postcode
    const handlePostcode = async () => {

        const dataPostCode = await apiConfig.postCode(
            'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Text=' +
            postCode +
            '&Container=&Origin=GBR&Countries=GBR&Datasets=&Limit=7&Filter=&Language=en&$block=true&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
        );

        // setPostCodeFind([])
        // setUpdatePostcodeData(!updatePostcodeData);
        dataPostCode.data.Items.map((v, i) => {
            // var str = v.Id
            // fetchPostCodeId = str.split("|");
            // console.log(fetchPostCodeId[0], "split");
            // //postCodeFind(array[0])

            // let tempObj = {
            //   Id: fetchPostCodeId[0],
            //   Description: v.Description,
            //   Text: v.Text
            // }
            // postCodeFind.push(tempObj);
            postCodeFind.push(v);
            setCount(count + 1)

        });

        setUpdatePostcodeData(!updatePostcodeData);

    };
    // handle retrive postcode detail
    const retrivePostcode = async (item, index) => {
        // setPostCodeId(item.Id);


        const getMoreAddress = await apiConfig.postCode(
            'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Text=' +
            postCode +
            '&Container=' + item.Id + '&Origin=GBR&Countries=GBR&Datasets=&Limit=7&Filter=&Language=en&$block=true&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
        );

        setPostCodeFind([])
        console.log('getMoreAddress', getMoreAddress)
        getMoreAddress.data.Items.map((v, i) => {
            postCodeMoreFind.push(v);
        });
        setUpdatePostcodeMoreData(!updatePostcodeMoreData)
    };
    const retrivePostcodeMore = async (item, index) => {
        const getPostCodeData = await apiConfig.postCode(
            'https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Id=' +
            item.Id +
            '&Source=&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
        );

        setCountry(getPostCodeData.data.Items[0].CountryName);
        setTown(getPostCodeData.data.Items[0].ProvinceName);
        setAddressLine1(getPostCodeData.data.Items[0].Line1);
        setAddressLine2(getPostCodeData.data.Items[0].Street);
        setHouse(getPostCodeData.data.Items[0].BuildingNumber);
        setPostCode(getPostCodeData.data.Items[0].PostalCode);
        // setRegion(getPostCodeData.data.Items[0].District)
        setPostCodeFind([]);
        SetPostCodeMoreFind([])
        //setUpdatePostcodeData(!updatePostcodeData);
        setUpdatePostcodeMoreData(!updatePostcodeMoreData)
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
            SetPostCodeMoreFind([])
            setCountry('');
            setTown('');
            setAddressLine1('');
            setAddressLine2('');
            setHouse('');
            setPostCode('');
        }
    };

    const [selectNewdates, setNewDates] = useState({})
    const muiltipaleDate = day => {
        let selectedDate = day.dateString;
        if (selectNewdates[selectedDate]) {
            const newDates = selectNewdates;
            delete newDates[selectedDate]
            setNewDates({ dates: newDates });
        } else {
            const newDates = selectNewdates;
            newDates[selectedDate] = {
                startingDay: true,
                color: colors.green,
                textColor: '#FFFFFF',
            }


            setNewDates({ dates: newDates });

        }
    }
    const onNightSiftPress = day => {

        if (isStartDatePicked == false) {
            let markedDatess = {};
            markedDatess[day.dateString] = {
                startingDay: true,
                color: colors.blue,
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
                            color: colors.blue,
                            textColor: '#FFFFFF',
                        };
                    } else {
                        markedDatess[tempDate] = {
                            endingDay: true,
                            color: colors.blue,
                            textColor: '#FFFFFF',
                        };
                    }
                }
                setmarkedDates(markedDatess);
                setisStartDatePicked(false);
                setisEndDatePicked(true);
                // setstartDate('');
            } else {
                setisStartDatePicked(false);
            }
        }
    };
    const onDayPressHandler = day => {
        var dateSlected = [];

        // dateSlected.push(...dateSlected, day.dateString)

        dateSlected.push({ date: day.dateString })
        setstartDate((prevState) => [...prevState, { date: day.dateString }]);


        // [
        //   ...prevState,
        //   { uri: uri, type: type, name: name[0] },
        // ]

    };
    const mark = {

        [startDate]: {
            customStyles: {
                container: {
                    backgroundColor: colors.green,
                    elevation: 2,
                },
                text: {
                    color: '#FFFFFF',
                    fontFamily: fonts.quicksandMedium,
                },
            },
        },
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
    //dropdown select update function
    const handleUpdate = (rowData, type) => {
        if (type === 'startCare') {
            setStartCare(rowData);
        } else if (type === 'Gender') {
            setAvailableFor(rowData);
        } else if (type === 'isCare') {

            setIsCare(rowData);


        } else if (type === 'Region') {
            setRegion(rowData)
        } else if (type === "shifts") {
            setShifts(rowData)
        } else if (type === "jobTitle") {
            setJobTitles(rowData)
        }
    };

    // call get api get basic data
    useEffect(() => {
        showLoader();

        dispatch(userActionServices.getRegions())
        dispatch(userActionServices.postJobTitle())
        dispatch(userActionServices.getCategory());
        dispatch(userActionServices.getLanaguages());


    }, []);
    // set region with api response
    useEffect(() => {
        hideLoader();

        if (getRegiondata.type === GETREGION) {

            if (
                Object.keys(getRegiondata?.value).length != 0 &&
                getRegiondata?.value != undefined

            ) {
                console.log('getRegiondata', getRegiondata)
                getRegiondata.value.data.map((v, i) => {
                    let temp = {
                        id: v.id,
                        title: v.region,
                    };

                    regionList.push(temp);
                });
                // dispatch(userActionServices.resetData());
            }

        }
        // dispatch(userActionServices.resetData());
        else {

        }
    }, [getRegiondata]);

    // response get api jobTitlelist and set data
    useEffect(() => {
        hideLoader();

        if (postjobtitlelist.type === POSTJOBTITLE) {
            if (postjobtitlelist?.value?.status) {
                if (
                    Object.keys(postjobtitlelist?.value).length != 0 &&
                    postjobtitlelist?.value != undefined
                ) {
                    console.log('postjobtitlelist', postjobtitlelist)
                    postjobtitlelist.value.data.map((v, i) => {
                        let temp = {
                            id: v.id,
                            title: v.category_name,
                        };

                        jobTitlesList.push(temp);
                    });
                }
            }
        }
        // dispatch(userActionServices.resetData());
        else {

        }
    }, [postjobtitlelist]);

    // response category get api and set data
    useEffect(() => {
        hideLoader();

        if (getCategoryName.type === GETCATEGORY) {
            if (
                Object.keys(getCategoryName?.value).length != 0 &&
                getCategoryName?.value != undefined
            ) {
                console.log('getCategoryName', getCategoryName)
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


    // response get  langauage api and set data
    useEffect(() => {
        hideLoader();

        if (getLanguage.type === GETLANGUAGES) {
            if (
                Object.keys(getLanguage?.value).length != 0 &&
                getLanguage?.value != undefined
            ) {



                getLanguage.value.data.map((v, i) => {
                    let temp = {
                        id: v.id,
                        title: v.language,
                        isSelected: false,
                    };
                    langaugeList.push(temp);
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
    }, [getLanguage]);

    // response get all fields data
    useEffect(() => {
        hideLoader();

        if (getAllFieldsData.type === GETALLFIELDSPOSTJOB) {
            if (
                Object.keys(getAllFieldsData?.value).length != 0 &&
                getAllFieldsData?.value != undefined
            ) {
                console.log('getAllFieldsData', getAllFieldsData)

                dropDownAlllist = getAllFieldsData.value.data;

                console.log('dropDownAlllistdropDownAlllist', dropDownAlllist.available_for)
                // dropDownAlllist.available_for.map((v, i) => {

                // let temp = {
                //   id: Object.keys(dropDownAlllist.available_for),
                //   title: Object.values(dropDownAlllist.available_for),

                // };
                // availableForList.push(temp);


                // }, []);
                // dropDownAlllist.when_would_care_start.map((v, i) => {
                //   let temp = {
                //     id: v.id,
                //     title: v.language,

                //   };
                //   startCareList.push(temp);


                // }, []);
                // dropDownAlllist.is_care_ongoing.map((v, i) => {
                //   let temp = {
                //     id: v.id,
                //     title: v.language,

                //   };
                //   isCareList.push(temp);


                // }, []);

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
    }, [getAllFieldsData]);

    const genderList = [
        {
            id: '1',

            title: 'Male',
        },
        {
            id: '2',

            title: 'Female',
        },
        {
            id: '3',

            title: 'No preference',
        },
    ];
    const startList = [
        {
            id: '1',

            title: 'Immediately',
        },
        {
            id: '2',

            title: 'Within 1 week',
        },
        {
            id: '3',

            title: 'Later',
        },
    ];
    const isCareLists = [
        {
            id: '1',

            title: 'One time',
        },
        {
            id: '2',

            title: 'Ongoing',
        },

    ];


    // response get all fields data
    useEffect(() => {
        hideLoader();

        if (bookingModeShiftData.type === BOOKINGMODESHIFT) {
            if (
                Object.keys(bookingModeShiftData?.value).length != 0 &&
                bookingModeShiftData?.value != undefined
            ) {
                console.log('bookingModeShiftData', bookingModeShiftData)

                bookingModeShiftData.value.data.map((v, i) => {
                    let temp = {
                        id: v.id,
                        title: v.shift,

                    };

                    shiftsList.push(temp);
                });


                setRange('')
                setSelectDate('')

            }
        } else {

            //ssnackbarError(getbasicregInfoData.value.message);
            // dispatch(userActionServices.resetData());
        }
    }, [bookingModeShiftData]);




    //  Medical Experties  with api response
    useEffect(() => {
        hideLoader();

        if (getMedicalExpetiesData.type === GETMEDICALEXPERTIESE) {

            if (
                Object.keys(getMedicalExpetiesData?.value).length != 0 &&
                getMedicalExpetiesData?.value != undefined
            ) {

                getMedicalExpetiesData.value.data.map((v, i) => {
                    let temp = {
                        id: v.id,
                        title: v.expertise_info.expertise,
                        isSelected: isSelected,
                    };

                    medicalExpertiseList.push(temp);
                });




                // dispatch(userActionServices.resetData());
            }

        }
        // dispatch(userActionServices.resetData());
        else {

        }
    }, [getMedicalExpetiesData]);

    //dropdown select update function
    const MultiipleMedicalExpUpdates = (rowData, list, type) => {
        if (type == 'medical') {
            var temps = [];
            list.map((v, i) => {
                updateMedicalExpList.push(v);
                temps.push(v.id);
            });
            setSelectedMedicalExpList(updateMedicalExpList)
            setMedicalExpListSendArray(temps);
        }
    };

    //dropdown select update function
    const handleMultipleUpdates = (rowData, list, type) => {

        if (type === 'language') {
            var tempLangauge = [];

            list.map((v, i) => {
                console.log('v', v)
                if (v.title == 'Others') {
                    otherLanguageSelected = 1
                }
                updateLangauageList.push(v);
                tempLangauge.push(v.id);
            });
            setOtherLangauage(otherLanguageSelected)
            setLanguageSendArray(tempLangauge);

        }

        setSelectedLangaugeList(updateLangauageList);

        // setSelectedExperieneceInList(updateExperieneceInList);
    };
    //dropdown select update function
    const SingleMultipleUpdate = (rowData, type, list) => {

        if (type === 'category') {
            setCategory(rowData);
            const category_id = {
                category_id: rowData.id,
            };
            setMedicalExpertiseList([])
            setSelectedMedicalExpList([])


            setMedicalExpertise({

                id: 0,
                title: 'Select Medical Expertise',
            })

            dispatch(userActionServices.getMedicalExpertie(category_id))
            setCategoryListId(rowData.id);
        }
    };





    const onDaySelect = (day) => {
        console.log('day', day)
        let temp = [...selectedDates]
        const _selectedDay = moment(day.dateString).format(_format);

        let selected = true;
        let selectedColor = colors.blue;
        if (_markedDates[_selectedDay]) {
            delete temp[_selectedDay]
            selected = !_markedDates[_selectedDay].selected;
            console.log('selected', selected)
        } else {
            temp.push(_selectedDay)
            setSelectdates(temp)

        }
        const updatedMarkedDates = { ..._markedDates, ...{ [_selectedDay]: { selected } } }

        console.log('updatedMarkedDatesupdatedMarkedDates', updatedMarkedDates)

        for (const key in updatedMarkedDates) {

            console.log("aman", (updatedMarkedDates[key].selected));
            if (updatedMarkedDates[key].selected) {

                dateSelectedArray.push(key)

            }
        }
        setdateSelectedArrays(dateSelectedArray)
        console.log('dateSelectedArray', dateSelectedArray)
        setMarkedDates(updatedMarkedDates);
    }


    const jobDuration = () => {
        // setMarkedDates([])
        // setdateSelectedArrays([])
        setRange('')
        //setUpadteDate("Job Duration")
        //setSelectDate('Job Duration')

        setDataAllset(false)
        setCalenderModal(true)
    }
    const noChangeFuntion = () => {
        setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarError(" Please Select Shift first");
        }, 100);
    }
    useEffect(() => {
        setMarkedDates([])
        setRange('')
        setUpadteDate("Shift Duration")
        setSelectDate('Shift Duration')
        setTime('Start Time'),
            setDataAllset(false)
        setTimes('End Time')
        if (shifts.title == "Day Shift") {
            setTime("8:00 Am")
            setTimes("8:00 Pm")
            setWeeklyCalender(false)
        } else if (shifts.title == "Night Shift") {
            setTime("8:00 Pm")
            setTimes("8:00 Am")
            setWeeklyCalender(false)

        }

        else if (shifts.title == "Weekly live-in") {
            setWeeklyCalender(true)
            minDateNow.setMinutes(0);
            minDateNow.setHours(0);
            maxDateNow.setMinutes(0);
            maxDateNow.setHours(24);
        }
        else if (shifts.title == "Hourly Day") {
            // setMinMinute(dateNow.setMinutes(0)) ;  
            // setMinHours(dateNow.setHours(8))
            setWeeklyCalender(false)

            minDateNow.setMinutes(0);
            minDateNow.setHours(8);
            maxDateNow.setMinutes(0);
            maxDateNow.setHours(20);

            // console.log("debug123  minDateNow : " + minDateNow);
            // console.log("debug123  maxDateNow : " + maxDateNow);

        } else if (shifts.title == "Sleeping Night" || shifts.title == "Hourly Night") {

            setWeeklyCalender(false)
            minDateNow.setHours(20);
            minDateNow.setMinutes(0);
            maxDateNow.setDate(maxDateNow.getDate() + 1);
            maxDateNow.setHours(8);
            maxDateNow.setMinutes(0);

            console.log("debug123  minDateNow : " + minDateNow);
            console.log("debug123  maxDateNow : " + maxDateNow);
            console.log("debug123  endMaxDateNow : " + endMaxDateNow);
            console.log("debug123  endMinDateNow : " + endMinDateNow);


        } else if (shifts.title == "Daily Live In") {
            minDateNow.setMinutes(0);
            minDateNow.setHours(0);
            maxDateNow.setMinutes(0);
            maxDateNow.setHours(24);
            setWeeklyCalender(false)
        }



    }, [shifts])

    const startTimes = () => {
        if (shifts.title == "Day Shift" || shifts.title == "Night Shift") {
            setOpen(false)
            setTimeout(() => {
                // snackbarError(error.response.data.Message);
                snackbarError("You are not allowed to change start time");
            }, 100);
        } else if (updateDate === 'Shift Duration' && selectDate === 'Shift Duration') {
            setOpen(false)
            setTimeout(() => {
                // snackbarError(error.response.data.Message);
                snackbarError("Date Select ,First");
            }, 100);
        }
        else {
            setOpen(true)
        }
    }
    const endTimes = () => {
        if (shifts.title == "Day Shift" || shifts.title == "Night Shift" || shifts.title == "Weekly live-in" || shifts.title == "Daily Live In") {
            setOpens(false)

            setTimeout(() => {

                // snackbarError(error.response.data.Message);
                snackbarError("You are not allowed to change end time");
            }, 100);
        } else if (shifts.title == "Sleeping Night" || shifts.title == "Hourly Night" || shifts.title == "Hourly Day") {
            if (time == 'Start Time') {
                snackbarError("Select start time first")
            } else {
                setOpens(true)
                console.log('dataAllsetdataAllset', dataAllset)
                updateCompareDate.forEach((v, i) => {
                    let apiDates = moment(v).format('YYYY-MM-DD');
                    console.log('apiDatesapiDates', apiDates)
                    //apiDate.push(apiDates)
                    sendApiDate.push(apiDates)
                })

                sendApiDate.forEach((v, i) => {
                    // var beginningTime = moment(currentTime);
                    // var endTime = moment(time);
                    // console.log("amanaman", beginningTime.isBefore(endTime));
                    console.log('v', v)
                    console.log('time', time)
                    console.log('currentTime', currentTime)

                    console.log('currentDate', currentDate)
                    if (v === currentDate) {

                        // if (currentTime > time) {
                        //   console.log('errorerrorerrorerror')
                        //   setDataAllset(true)
                        // }
                        var beginningTime = moment(currentTime, 'h:mm a');
                        var endTime = moment(time, 'h:mm a');
                        console.log("beginningTime", beginningTime)
                        console.log("endTimendTimee", endTime)
                        console.log("check first", beginningTime.isBefore(endTime));
                        console.log("checkcheck",);
                        //   setDataAllset(endTime.isBefore(beginningTime))
                        setDataAllset(endTime.isBefore(beginningTime))
                        console.log("truefalse", dataAllset)
                    }

                    console.log("truefalse", dataAllset)
                })
            }
        } else {


            setOpens(true)

        }
    }

    const ViewDateSelection = () => {
        console.log('_markedDates_markedDates', _markedDates)
        const dates = dateSelectedArrays
        if (dates.length <= 7) {

            dates.forEach((v, i) => {
                console.log('choose caldender date fromat', v)
                //         var date = new Date(v+" 00:00:00"); // some mock date
                // var milliseconds = date.getTime(); 
                // if(dateConvert==0 || milliseconds<dateConvert){
                //   console.log(dateConvert,"dateConvertdateConvert")
                //   console.log(milliseconds,"millisecondsmillisecondsmilliseconds")

                //   setDateConvert(milliseconds)
                // }

                updateComapreSelectedDate.push(v)
                setUpdateCompareDate(updateComapreSelectedDate)
                dateView = moment(v).format('MMM D ')
                updateSelectedDate.push(dateView)
                setUpadteDate(updateSelectedDate)
            })



            setCalenderModal(false)
        } else {
            snackbarError(" you can select maximum 7 days")
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <Modal animationType="slide" transparent={true} visible={calenderModal}>
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

                            marginTop: Platform.OS === 'ios' ? ms(315) : ms(200),
                            flex: 1,
                            backgroundColor: 'white',
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                        }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text
                                style={{
                                    fontFamily: fonts.quicksandMedium,
                                    fontSize: s(22),
                                    textAlign: 'center',
                                    flex: 1,
                                    marginTop: mvs(25),
                                    marginHorizontal: ms(34),
                                    color: colors.blue,
                                }}>
                                Select Date
                            </Text>
                            <TouchableOpacity
                                style={{ marginEnd: ms(20), alignSelf: 'center' }}
                                onPress={() => setCalenderModal(false)}
                            >
                                <Image
                                    style={{ height: mvs(20), width: mvs(20) }}
                                    source={images.cross}
                                >

                                </Image>
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
                            onPress={() =>
                                ViewDateSelection()
                            }
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
                    <Text
                        style={{
                            color: colors.blue,
                            fontSize: s(28),
                            fontFamily: fonts.quicksandMedium,
                        }}>
                        Post A Job
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Notifications')}>
                    <Image
                        source={images.notification}
                        style={{ height: mvs(19), width: mvs(21), resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => Linking.openSettings()}
                style={{ position: 'absolute', right: ms(45), top: mvs(9) }}>
                <Image
                    source={images.location}
                    style={{ height: mvs(19), width: mvs(21), resizeMode: 'contain' }}
                />
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: mvs(20),
                }}>
                <View
                    style={{
                        borderBottomWidth: 2,
                        height: 1,
                        width: '33%',

                        borderColor:
                            type == 1
                                ? colors.primaryColor
                                : type === 2
                                    ? colors.primaryColor
                                    : type === 3
                                        ? colors.primaryColor
                                        : colors.lightBackground,
                    }}></View>
                <View
                    style={{
                        borderBottomWidth: 2,
                        height: 1,
                        width: '33%',

                        borderColor:
                            type == 2
                                ? colors.primaryColor
                                : type === 3
                                    ? colors.primaryColor
                                    : colors.lightBackground,
                    }}></View>
                <View
                    style={{
                        borderBottomWidth: 2,
                        height: 1,
                        width: '33%',

                        borderColor:
                            type == 3 ? colors.primaryColor : colors.lightBackground,
                    }}></View>
            </View>
            {type == 1 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,

                        marginTop: mvs(30),
                        marginHorizontal: ms(16),
                    }}>
                    <Text
                        style={{
                            fontSize: s(22),
                            fontFamily: fonts.quicksandMedium,
                            color: colors.blue,
                        }}>
                        Job Information
                    </Text>

                    <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                color: colors.blue,
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                            }}>
                            Job Title <Text style={{ color: colors.starcolor }}>*</Text>
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

                            selected={jobTitles}
                            itemList={jobTitlesList}
                            placeholder={'Select Job Title'}

                            onUpdate={data => handleUpdate(data, 'jobTitle')}
                        />


                    </View>

                    <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                color: colors.blue,
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                            }}>
                            Postcode <Text style={{ color: colors.starcolor }}>*</Text>
                        </Text>

                        <View
                            style={{
                                borderColor: colors.lightBackground,
                                backgroundColor: colors.lightBackground,
                                borderRadius: ms(6),
                                padding: Platform.OS === 'android' ? ms(6) : ms(13),
                                marginTop: mvs(7),
                                flexDirection:'row',
                                flex:1,
                                alignItems:'center',
                            }}>
                            <TextInput
                                style={styles.textInputStyle}
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

                    <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                color: colors.blue,
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                            }}>
                            House/Flat No. <Text style={{ color: colors.starcolor }}>*</Text>
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
                                    fontSize: s(14),
                                    fontFamily: fonts.quicksandMedium,
                                }}
                                value={house}
                                onChangeText={text => setHouse(text)}
                                placeholderTextColor={colors.grey}
                                placeholder="House/Flat No."></TextInput>
                        </View>
                    </View>
                    <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                color: colors.blue,
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                            }}>
                            Address Line 1 <Text style={{ color: colors.starcolor }}>*</Text>
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
                                    fontFamily: fonts.quicksandMedium,
                                    fontSize: s(14),
                                }}
                                value={addressLine1}
                                onChangeText={text => setAddressLine1(text)}
                                placeholderTextColor={colors.grey}
                                placeholder="Address Line 1"></TextInput>
                        </View>
                    </View>
                    <View style={{ marginTop: mvs(20) }}>
                        <Text style={styles.textTitle}>
                            Address Line 2 (
                            <Text
                                style={{
                                    color: colors.blueLight,
                                    fontSize: s(15),
                                    fontFamily: fonts.quicksandBook,
                                }}>
                                Optional
                            </Text>
                            )
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
                                    fontSize: s(14),
                                    fontFamily: fonts.quicksandMedium,
                                }}
                                value={addressLine2}
                                onChangeText={text => setAddressLine2(text)}
                                placeholderTextColor={colors.grey}
                                placeholder="Address Line 2"></TextInput>
                        </View>
                    </View>
                    <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                color: colors.blue,
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                            }}>
                            Town <Text style={{ color: colors.starcolor }}>*</Text>
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
                                    fontSize: s(14),
                                    fontFamily: fonts.quicksandMedium,
                                }}
                                value={town}
                                onChangeText={text => setTown(text)}
                                placeholderTextColor={colors.grey}
                                placeholder="Town"></TextInput>
                        </View>
                    </View>
                    <View style={{ marginTop: mvs(20) }}>
                        <Text style={styles.textTitle}>
                            County (
                            <Text
                                style={{
                                    color: colors.blueLight,
                                    fontSize: s(15),
                                    fontFamily: fonts.quicksandBook,
                                }}>
                                Optional
                            </Text>
                            )
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
                                    fontSize: s(14),
                                    fontFamily: fonts.quicksandMedium,
                                }}
                                value={country}
                                onChangeText={text => setCountry(text)}
                                placeholderTextColor={colors.grey}
                                placeholder="County"></TextInput>
                        </View>
                    </View>
                    <View style={{ marginTop: mvs(20), marginBottom: mvs(40) }}>
                        <Text style={styles.textTitle}>Region  (
                            <Text
                                style={{
                                    color: colors.blueLight,
                                    fontSize: s(15),
                                    fontFamily: fonts.quicksandBook,
                                }}>
                                Optional
                            </Text>
                            )</Text>
                        <MyDropDown
                            // refs={refSubject}
                            selected={region}
                            itemList={regionList}
                            placeholder={'Select Region'}
                            //  onUpdate={data => handleUpdate(data, 'Nationality')}
                            onUpdate={data => handleUpdate(data, 'Region')}
                        />
                    </View>
                </ScrollView>
            ) : type == 2 ? (
                <ScrollView
                    ref={aboutScrollRef}
                    // onContentSizeChange={() => {
                    //   aboutScrollRef.current.scrollToEnd({ animated: true })
                    // }}
                    showsVerticalScrollIndicator={false}
                    //  showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,

                        marginTop: mvs(30),
                        marginHorizontal: ms(16),
                    }}>
                    <Text
                        style={{
                            fontSize: s(22),
                            fontFamily: fonts.quicksandMedium,
                            color: colors.blue,
                        }}>
                        Care Requirements
                    </Text>
                    <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                                color: colors.blue,
                            }}>
                            Booking Mode <Text style={{ color: colors.starcolor }}>*</Text>
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: mvs(7),
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => userTypeSelct("Shift")}
                                style={styles.buttonStyle}>
                                <Image
                                    source={shift === true ? images.fillCheck : images.blankCheck}
                                    style={styles.checkImageStyle}
                                />
                                <Text
                                    style={{
                                        fontSize: s(14),
                                        marginLeft: ms(8),
                                        color: colors.blueLight,
                                        fontFamily: fonts.quicksandMedium,
                                    }}>
                                    Shift
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => userTypeSelct("Hourly")}
                                style={styles.buttonStyle}>
                                <Image
                                    source={
                                        hourly === true ? images.fillCheck : images.blankCheck
                                    }
                                    style={styles.checkImageStyle}
                                />
                                <Text
                                    style={{
                                        fontSize: s(14),
                                        marginLeft: ms(8),
                                        color: colors.blueLight,
                                        fontFamily: fonts.quicksandMedium,
                                    }}>
                                    Hourly
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ marginTop: mvs(20) }}>
                        <Text style={styles.textTitle}>Shift <Text style={{ color: colors.starcolor }}>*</Text></Text>
                        <MyDropDown
                            // refs={refSubject}
                            selected={shifts}
                            itemList={shiftsList}
                            placeholder={'Select Shift'}
                            //  onUpdate={data => handleUpdate(data, 'Nationality')}
                            onUpdate={data => handleUpdate(data, 'shifts')}
                        />
                    </View>

                    {weeklyCalender == true ? <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                color: colors.blue,
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                            }}>
                            Shift Duration <Text style={{ color: colors.starcolor }}>*</Text>
                        </Text>


                        <TouchableOpacity
                            onPress={() => {
                                shifts.title === 'Select Shift' ? noChangeFuntion() : setCalenderOpen(true)
                            }

                            }
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
                            <DatePicker
                                modal
                                open={calenderOpen}
                                date={calenderDate}
                                minimumDate={new Date()}

                                mode="date"
                                onConfirm={date => {
                                    setCalenderOpen(false);
                                    setCalnederDate(date);
                                    console.log('date', date);
                                    const times = moment(date).format(' D MMM YYYY');
                                    const addDays = moment(date).add(7, 'd').format(' D MMM YYYY');
                                    setRange(addDays)
                                    console.log('addDAYSaddDAYS', addDays)
                                    console.log('timestimestimes', times)
                                    setSelectDate(times);
                                }}
                                onCancel={() => {
                                    setCalenderOpen(false);
                                }}
                            />
                            <Text
                                style={{
                                    color: selectDate === "Shift Duration" ? colors.grey : colors.blue,
                                    fontSize: s(14),
                                    fontFamily: fonts.quicksandMedium,
                                }}
                            >

                                {selectDate == '' ? "Shift Duration" : selectDate}{range == '' ? <></> : " - " + range}
                            </Text>
                            <Image
                                source={images.calenders}
                                style={{
                                    height: mvs(18),
                                    width: mvs(18),
                                    resizeMode: 'contain',
                                    marginHorizontal: ms(2)

                                }}
                            />
                        </TouchableOpacity>

                    </View>
                        :
                        <View style={{ marginTop: mvs(20) }}>
                            <Text
                                style={{
                                    color: colors.blue,
                                    fontSize: s(16),
                                    fontFamily: fonts.quicksandMedium,
                                }}>
                                Shift Duration <Text style={{ color: colors.starcolor }}>*</Text>
                            </Text>


                            <TouchableOpacity
                                onPress={() => {
                                    shifts.title === 'Select Shift' ? noChangeFuntion() : jobDuration()

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
                                        color: updateDate === "Shift Duration" ? colors.grey : colors.blue,
                                        fontSize: s(14),
                                        flex: 1,
                                        fontFamily: fonts.quicksandMedium,
                                    }}
                                >
                                    {updateDate === '' ? "Shift Duration" : updateDate + " "}

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

                    }

                    <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                                color: colors.blue,
                            }}>
                            Shift Time <Text style={{ color: colors.starcolor }}>*</Text>
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: mvs(7),
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                style={styles.buttonStyles}
                                onPress={() => {
                                    // onTimePicker()
                                    shifts.title === 'Select Shift' ? noChangeFuntion() : startTimes()

                                }}>
                                <DatePicker
                                    modal
                                    open={open}
                                    date={date}
                                    minimumDate={minDateNow}
                                    maximumDate={maxDateNow}

                                    is24hourSource={'locale'}
                                    mode={shifts.title === 'Weekly live-in' ? "time" : "datetime"}
                                    onConfirm={date => {
                                        setOpen(false);

                                        setDate(date);

                                        console.log('date', date);
                                        const times = moment(date).format('LT');

                                        console.log('dddd', times);
                                        setTime(times);

                                        // endMinDateNow.setTime(date.getTime());
                                        endMinDateNow.setTime(date);
                                        endMaxDateNow.setMinutes(0);



                                        if (shifts.title === 'Sleeping Night' || shifts.title == "Hourly Night") {
                                            endMaxDateNow.setDate(date.getDate() + 1)
                                            endMaxDateNow.setHours(8)
                                            console.log('endMaxDateNowendMaxDateNow', endMaxDateNow)
                                            console.log('endMinDateNowendMinDateNow', endMinDateNow)
                                        } else if (shifts.title === 'Daily Live In') {
                                            setTimes(times)
                                        } else if (shifts.title === 'Weekly live-in') {
                                            setTimes(times)
                                        } else {

                                            endMaxDateNow.setHours(20)
                                        }
                                        //    shifts.title === 'Sleeping Night' ? endMaxDateNow.setHours(8) : endMaxDateNow.setHours(20);


                                    }}
                                    onCancel={() => {
                                        setOpen(false);
                                    }}
                                />
                                <Text
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    style={{
                                        fontSize: s(14),

                                        color: colors.blueLight,
                                        fontFamily: fonts.quicksandBook,
                                    }}>
                                    {time == "Start Time" ? "Start Time" : time}
                                </Text>
                                <Image source={images.watch} style={styles.checkImageStyle} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonStyles}
                                onPress={() => {

                                    shifts.title === 'Select Shift' ? noChangeFuntion() : endTimes()
                                    //setOpens(true);

                                }}>
                                <DatePicker
                                    modal
                                    open={opens}
                                    date={shifts.title == "Hourly Day" ? dates : endMaxDateNow}
                                    mode="datetime"
                                    is24hourSource={'locale'}
                                    minimumDate={endMinDateNow}
                                    maximumDate={endMaxDateNow}

                                    onConfirm={date => {
                                        setOpens(false);
                                        setDates(date);
                                        console.log('date', date);
                                        const times = moment(date).format('LT');
                                        console.log('dddd', times);
                                        setTimes(times);
                                    }}
                                    onCancel={() => {
                                        setOpens(false);
                                    }}
                                />
                                <Text
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    style={{
                                        fontSize: s(14),

                                        color: colors.blueLight,
                                        fontFamily: fonts.quicksandBook,
                                    }}>
                                    {times}
                                </Text>
                                <Image source={images.watch} style={styles.checkImageStyle} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{ marginTop: mvs(20), }}>
                        <Text style={styles.textTitle}>Available for <Text style={{ color: colors.starcolor }}>*</Text></Text>
                        <MyDropDown
                            // refs={refSubject}
                            selected={availableFor}
                            itemList={genderList}
                            placeholder={'Select Gender'}
                            //  onUpdate={data => handleUpdate(data, 'Nationality')}
                            onUpdate={data => handleUpdate(data, 'Gender')}
                        />
                    </View>
                    {/* <View style={{ marginTop: mvs(20), }}>
            <Text style={styles.textTitle}>When would you like the care to start? <Text style={{ color: colors.starcolor }}>*</Text></Text>
            <MyDropDown
              // refs={refSubject}
              selected={startCare}
              itemList={startList}
              placeholder={'Select One'}
              //  onUpdate={data => handleUpdate(data, 'Nationality')}
              onUpdate={data => handleUpdate(data, 'startCare')}
            />
          </View> */}
                    <View style={{ marginTop: mvs(20), }}>
                        <Text style={styles.textTitle}>  Is the care? <Text style={{ color: colors.starcolor }}>*</Text></Text>
                        <MyDropDown
                            // refs={refSubject}
                            selected={isCare}
                            itemList={isCareLists}
                            placeholder={'Select One'}
                            //  onUpdate={data => handleUpdate(data, 'Nationality')}
                            onUpdate={data => handleUpdate(data, 'isCare')}
                        />
                    </View>

                </ScrollView>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,

                        marginTop: mvs(30),
                        marginHorizontal: ms(16),
                    }}>
                    <Text
                        style={{
                            fontSize: s(22),
                            fontFamily: fonts.quicksandMedium,
                            color: colors.blue,
                        }}>
                        Expertise Required
                    </Text>

                    <View style={{ marginTop: mvs(20) }}>
                        <Text style={styles.textTitle}>Profession <Text style={{ color: colors.starcolor }}>*</Text></Text>
                        <MyDropDown
                            // refs={refSubject}
                            selected={category}
                            itemList={categoryList}

                            placeholder={'Select Profession'}
                            onUpdate={data => SingleMultipleUpdate(data, 'category')}
                        />
                    </View>
                    <View style={{ marginTop: mvs(10) }}>
                        <Text style={styles.textTitle}>Medical Expertise <Text style={{ color: colors.starcolor }}>*</Text></Text>

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
                        <Text style={styles.textTitle}>Required Language</Text>
                        <LangauageMultiple
                            // refs={refSubject}
                            selected={language}
                            itemList={langaugeList}
                            selectedLangaugeList={selectedLangaugeList}
                            placeholder={'Select Language'}
                            //onUpdate={data => handleUpdates(data, 'Title')}
                            onUpdate={(data, list) =>
                                handleMultipleUpdates(data, list, 'language')
                            }
                        />
                    </View>
                    {otherLanguage == 1 ?
                        <View style={{ marginTop: mvs(10) }}>
                            <Text style={styles.textTitle}>Other Langauage</Text>

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
                                        color: colors.darkblue,
                                        fontSize: s(14),
                                        fontFamily: fonts.quicksandMedium,
                                    }}
                                    placeholderTextColor={colors.grey}
                                    value={otherLanguageValue}
                                    onChangeText={text => setOtherLangauageValue(text)}
                                    placeholder="Other Langauage"></TextInput>
                            </View>
                        </View>

                        : <></>}
                    <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                                color: colors.blue,
                            }}>
                            Driver Required? <Text style={{ color: colors.starcolor }}>*</Text>
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: mvs(7),
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => driverTypeReq(1)}
                                style={styles.buttonStyle}>
                                <Image
                                    source={
                                        driverYes === true ? images.fillCheck : images.blankCheck
                                    }
                                    style={styles.checkImageStyle}
                                />
                                <Text
                                    style={{
                                        fontSize: s(14),
                                        marginLeft: ms(8),
                                        color: colors.blueLight,
                                        fontFamily: fonts.quicksandMedium,
                                    }}>
                                    Yes
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => driverTypeReq(2)}
                                style={styles.buttonStyle}>
                                <Image
                                    source={
                                        driverNo === true ? images.fillCheck : images.blankCheck
                                    }
                                    style={styles.checkImageStyle}
                                />
                                <Text
                                    style={{
                                        fontSize: s(14),
                                        marginLeft: ms(8),
                                        color: colors.blueLight,
                                        fontFamily: fonts.quicksandMedium,
                                    }}>
                                    No
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginTop: mvs(20) }}>
                        <Text
                            style={{
                                fontSize: s(16),
                                fontFamily: fonts.quicksandMedium,
                                color: colors.blue,
                            }}>
                            Pet Friendly?
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: mvs(7),
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => petFriendly(1)}
                                style={styles.buttonStyle}>
                                <Image
                                    source={
                                        petYes === true ? images.fillCheck : images.blankCheck
                                    }
                                    style={styles.checkImageStyle}
                                />
                                <Text
                                    style={{
                                        fontSize: s(14),
                                        marginLeft: ms(8),
                                        color: colors.blueLight,
                                        fontFamily: fonts.quicksandMedium,
                                    }}>
                                    Yes
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => petFriendly(2)}
                                style={styles.buttonStyle}>
                                <Image
                                    source={petNo === true ? images.fillCheck : images.blankCheck}
                                    style={styles.checkImageStyle}
                                />
                                <Text
                                    style={{
                                        fontSize: s(14),
                                        marginLeft: ms(8),
                                        color: colors.blueLight,
                                        fontFamily: fonts.quicksandMedium,
                                    }}>
                                    No
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginTop: mvs(20) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    color: colors.blue,
                                    fontSize: s(16),
                                    fontFamily: fonts.quicksandMedium,
                                }}>
                                Additional Requirement <Text style={{ color: colors.starcolor }}>*</Text>
                            </Text>

                            <Image
                                source={images.additonalrequirement}
                                style={{
                                    height: mvs(18),
                                    width: mvs(18),
                                    marginLeft: ms(5),
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>
                        <View
                            style={{
                                borderColor: colors.lightBackground,
                                backgroundColor: colors.lightBackground,
                                borderRadius: ms(6),
                                height: mvs(120),

                                padding: Platform.OS === 'android' ? ms(2) : ms(13),
                                marginTop: mvs(7),
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
                                value={additonalreq}
                                onChangeText={text => setAdditonalreq(text)}
                                placeholderTextColor={colors.grey}
                                placeholder="Type here..."></TextInput>
                        </View>
                    </View>
                </ScrollView>
            )}
            {/* <View
        style={{
          borderBottomWidth: 4,
          height: 1,
          width: '100%',
          marginTop: mvs(15),

          borderColor: colors.lightBackground,
        }}></View> */}
            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: mvs(15),
                    paddingHorizontal: mvs(15),
                    justifyContent: 'space-between',
                }}>
                {type == 1 ? <></> :
                    <TouchableOpacity
                        onPress={() => backHandling(type)}
                        style={styles.backButton}>
                        <Text
                            style={{
                                fontSize: s(18),
                                textAlign: 'center',
                                fontFamily: fonts.quicksandBold,
                                color: colors.white,
                            }}>
                            Back
                        </Text>
                    </TouchableOpacity>}
                <TouchableOpacity
                    // onPress={() => applyClickHandler()}
                    onPress={() => chooseMap(type)}
                    style={type == 1 ? styles.nextButtons : styles.nextButton}>
                    <Text
                        style={{
                            fontSize: s(18),
                            textAlign: 'center',
                            fontFamily: fonts.quicksandMedium,
                            color: colors.white,
                        }}>
                        {type == 3 ? "Post Job" : "Next"}
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
        flex:1,
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
    }
    , customDay: {
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
