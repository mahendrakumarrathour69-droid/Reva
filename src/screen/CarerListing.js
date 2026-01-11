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
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseToken } from '../constant/constant';
import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import { Image_URL, SUCCESS } from '../utils/apiConstants';
// import ReadMore from '@fawazahmed/react-native-read-more';
import { Popable } from 'react-native-popable';
import ReadMore from 'react-native-read-more-text';
import {
  JOBPOSTEDAPPLIEDLIST,
  LOGOUT,
  GETCARERSEARCHLISTING,
  FILTERDROPDOWNDATA,
  GETCATEGORYBASEDTRAINING,
  GETMEDICALEXPERTIESE,
  GETCATEGORYBASEDPROFESSIONALEXPERIENECES,
} from '../utils/reducerConstant';
export default function CarerListing(props) {
  const textInput = useRef(null);

  var filterData = props.route.params.data;
  var filterDataHome = props.route.params.filterDataHome;
var latitude=filterDataHome?.latitude
var longitude=filterDataHome?.longitude
console.log(">>>><<",longitude,latitude);
  const { navigation } = props;
  var joblist = [];
  var id = props.route.params.id;
  const dispatch = useDispatch();
  const getMedicalExpetiesData = useSelector(
    state => state.getMedicalExpertiesList,
  );

  const getCarerSearchList = useSelector(state => state.getCarerSearchList);
  const getCategoryBasedTraingList = useSelector(
    state => state.getCategorybasedTraining,
  );

  const getCategorybasedProfessioanlExperieneces = useSelector(
    state => state.getCategorybasedProfessioanlExperieneces,
  );
  const filterDropDownList = useSelector(state => state.filterDropDownList);

  const [jobApliedList, setJobApliedList] = useState([]);

  const [isDataBlank, setIsDataBlank] = useState(0);
  console.log("isdatablanlkkk??????????", isDataBlank);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [lastCategoryList, setLastCategoryList] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [updateFilter, setUpdateFilter] = useState();
  const [updateCate, setUpdateCate] = useState(true);
  const [updateLastCate, setUpdateLastCate] = useState(true);
  const [updateLastCateRadio, setUpdateLastCateRadio] = useState(true);
  const [appliedDataList, setAppliedDataList] = useState([]);

  const [rating, setRating] = useState([
    {
      id: 1,
      title: '1',
      type: 'checkbox',
      select: 'MultipleSelect',
      isSelected: false,
    },
    {
      id: 2,
      title: '2',
      type: 'checkbox',
      select: 'MultipleSelect',
      isSelected: false,
    },
    {
      id: 3,
      title: '3',
      type: 'checkbox',
      select: 'MultipleSelect',
      isSelected: false,
    },
    {
      id: 4,
      title: '4',
      type: 'checkbox',
      select: 'MultipleSelect',
      isSelected: false,
    },
    {
      id: 5,
      title: '5',
      type: 'checkbox',
      select: 'MultipleSelect',
      isSelected: false,
    },
  ]);
  const [distance, setDisatnce] = useState([
    {
      id: 1,
      title: '10',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 2,
      title: '15',
      type: 'radio',
      select: 'singleSelect',
      isSelected: true,
    },
  ]);
  const [postCode, setPostCode] = useState('');
  const [postCodeIndex, setPostCodeIndex] = useState(false);
  const [training, setTraining] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const experienceList = [
    {
      id: 1,
      title: '> 1',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 2,
      title: '> 2',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 3,
      title: '> 3',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 4,
      title: '> 4',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 5,
      title: '> 5',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 6,
      title: '> 6',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 7,
      title: '> 7',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 8,
      title: '> 8',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 9,
      title: '> 9',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 10,
      title: '> 10',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 11,
      title: '> 11',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 12,
      title: '> 12',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 13,
      title: '> 13',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 14,
      title: '> 14',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 15,
      title: '> 15',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 16,
      title: '> 16',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 17,
      title: '> 17',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 18,
      title: '> 18',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 19,
      title: '> 19',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 20,
      title: '> 20',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
  ];
  const [filterList, setFilterList] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  useEffect(() => {
    filterData = {
      ...filterDataHome,
    };
    console.log('filterData', filterData);

    setTimeout(() => {
      dispatch(userActionServices.getCarerSearchListings(filterData));
    }, 500);


  }, []);



  useEffect(() => {
    // hideLoader();

    if (getCarerSearchList.type === GETCARERSEARCHLISTING) {
      if (
        Object.keys(getCarerSearchList?.value).length != 0 &&
        getCarerSearchList?.value != undefined &&
        getCarerSearchList.value.status
      ) {
        if (Object.keys(getCarerSearchList?.value?.data).length > 0) {
          setIsDataBlank(1)
        } else {
          setIsDataBlank(2)
        }
        setmodalVisible(false);
        let jobPostedListTemp = [];
        let jobPostedListDateTemp = [];
        getCarerSearchList.value.data.map((postedData, postedIndex) => {
          jobPostedListTemp.push(postedData);
        }, []);
        setJobApliedList(jobPostedListTemp);
        dispatch(userActionServices.resetData());
        setTimeout(() => {
          dispatch(userActionServices.filterListData());
        }, 500);

      } else {
        console.log('declineSericeAgrementList');
        dispatch(userActionServices.resetData());
      }
    } else {
      console.log('error');
    }
  }, [getCarerSearchList]);

  const [carerListingLIst, setcarerListingLIst] = useState([
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
      starRating: 5.0,
    },
    {
      id: '2',
      title: 'Mr Stephen Anderson',
      distance: '5 Miles Away',
      experince: '5Year',
      rate: '$18',
      availablesingle: images.malesign,
      profile: images.profile,
      shift: 'Shift/Hourly',
      starRating: 3.0,
    },
    {
      id: '3',
      title: 'Mr Rob Plester',
      distance: '6 Miles Away',
      experince: '6Year',
      rate: '$15',
      availablesingle: images.malesign,
      availabledouble: images.femalesign,
      profile: images.profile,
      shift: 'Shift',
      starRating: 4.5,
    },
    {
      id: '4',
      title: 'Mr Stephen Anderson',
      distance: '8 Miles Away',
      experince: '8Year',
      rate: '$19',
      availabledouble: images.femalesign,
      profile: images.userProfile,
      shift: 'Shift/Hourly',
      starRating: 4.5,
    },
  ]);

  useEffect(() => {
    //    hideLoader();

    if (filterDropDownList.type === FILTERDROPDOWNDATA) {
      if (
        Object.keys(filterDropDownList?.value).length != 0 &&
        filterDropDownList?.value != undefined &&
        filterDropDownList.value.status
      ) {
        var listSubCategoryName = [];
        var listSubAvaialableFor = [];
        var listSubLanguage = [];
        filterDropDownList.value.data.category.map(
          (categoryName, categoryIndex) => {
            listSubCategoryName.push({
              title: categoryName.category_name,
              type: 'checkbox',
              select: 'singleSelect',
              isSelected: false,
              loader: 'loader',
            });
          },
        );
        filterDropDownList.value.data.languages.map(
          (languages, languagesIndex) => {
            listSubLanguage.push({
              ...languages,
              title: languages.language,
              type: 'checkbox',

              select: 'MultipleSelect',

              isSelected: false,
            });
          },
        );

        let gender = Object.keys(filterDropDownList.value.data.availableFor);

        // for (let i = 0; i < Object.keys(filterDropDownList.value.data.availableFor).length; i++) {

        //   listSubAvaialableFor.push({
        //     title: ,
        //     type: 'checkbox',
        //     isSelected: false,
        //   });

        // }
        for (let i in filterDropDownList.value.data.availableFor) {
          listSubAvaialableFor.push({
            title: i,
            type: 'checkbox',
            select: 'singleSelect',
            isSelected: false,
          });
        }
        // listSubAvaialableFor.push(filterDropDownList?.value?.data?.availableFor)

        // console.log('listSubAvaialableFor', first)

        let tempList = [
          {
            id: 1,
            categoryName: 'Category',
            isSelected: true,
            select: 'singleSelect',
            subCategoryName: listSubCategoryName,
          },
          {
            id: 2,
            categoryName: 'Available For',
            isSelected: false,
            select: 'singleSelect',
            subCategoryName: listSubAvaialableFor,
          },
          {
            id: 3,
            categoryName: 'Rating',
            isSelected: false,
            select: 'MultipleSelect',
            subCategoryName: rating,
          },
          {
            id: 4,
            categoryName: 'Postcode',
            isSelected: false,
            select: 'singleSelect',
            subCategoryName: [
              {
                title: '',
                type: 'textbox',
                select: 'singleSelect',
                isSelected: false,
              },
            ],
          },
          {
            id: 5,
            categoryName: 'Language',
            isSelected: false,
            select: 'MultipleSelect',
            subCategoryName: listSubLanguage,
          },
          {
            id: 6,
            categoryName: 'Experience',
            isSelected: false,
            select: 'MultipleSelect',
            subCategoryName: experienceList,
          },
          {
            id: 7,
            categoryName: 'Training',
            isSelected: false,
            select: 'MultipleSelect',
            subCategoryName: training,
          },
          {
            id: 8,
            categoryName: 'Expertise',
            isSelected: false,
            select: 'MultipleSelect',
            subCategoryName: expertise,
          },
          // {
          //   id: 9,
          //   categoryName: 'Distance',
          //   isSelected: false,
          //   select: 'MultipleSelect',
          //   subCategoryName: distance,
          // },
          // {
          //   id: 9,
          //   categoryName: 'Pet Friendly',
          //   isSelected: false,
          //   select: 'singleSelect',
          //   subCategoryName: petFriednly,
          // },
        ];
        setFilterList(tempList);
        setSubCategoryList(tempList[0].subCategoryName);
        setUpdateCate(!updateCate);

        // filterList[0].subcategoryName.push(filterDropDownList.value.data.category)
        dispatch(userActionServices.resetData());
      } else {
        dispatch(userActionServices.resetData());
      }
    } else {
      console.log('error');
    }
  }, [filterDropDownList]);

  // Click of FilterList(Main Category)
  const openSubCatModal = (item, index) => {
    console.log("ITEMID", item?.id);
    
    if (item.id == 4) {
      setPostCodeIndex(true);
    } else {
      setPostCodeIndex(false);
    }

    setSubCategoryList(item.subCategoryName);

    filterList.forEach((v, i) => {
      v.isSelected = false;
    });
    filterList[index].isSelected = true;

    setUpdateFilter(!updateFilter);
  };
  // response post api  category based training and set data
  useEffect(() => {
    //  hideLoader();
    if (getCategoryBasedTraingList.type === GETCATEGORYBASEDTRAINING) {
      if (getCategoryBasedTraingList?.value?.status) {
        if (
          Object.keys(getCategoryBasedTraingList.value).length != 0 &&
          getCategoryBasedTraingList.value != undefined
        ) {
          // setCategoryList([]);
          // snackbarSuccess(getCategoryName.value.message);

          var trainingList = [];
          //setExpertise([])
          getCategoryBasedTraingList.value.data.map((v, i) => {
            trainingList.push({
              ...v,
              type: 'checkbox',
              select: 'MultipleSelect',
              isSelected: false,
              title: v?.training_info?.training_title,
            });
            //experiencedInList.push(trainngValueLIst);
          }, []);
          setTraining(trainingList);
          console.log('trainingList>>>', trainingList);
          console.log('filterList[6]', filterList[6]);
          trainingList?.map(item => {
            filterList[6]?.subCategoryName.push(item);
          });
          //filterList[6]?.subCategoryName?.concat(trainingList);
          setUpdateCate(!updateCate);

          dispatch(userActionServices.resetData());
        } else {
          snackbarError('Something went wrong , Please try again');
        }
      } 
    } else {
    }
  }, [getCategoryBasedTraingList]);

  // response post api  category based medical expertise and set data
  useEffect(() => {
    setLoaderVisible(false);
    if (getMedicalExpetiesData.type === GETMEDICALEXPERTIESE) {
      if (getMedicalExpetiesData?.value?.status) {
        if (
          Object.keys(getMedicalExpetiesData.value).length != 0 &&
          getMedicalExpetiesData.value != undefined
        ) {
          // setCategoryList([]);
          // snackbarSuccess(getCategoryName.value.message);

          var expertiseList = [];

          //setExpertise([])
          getMedicalExpetiesData.value.data.map((v, i) => {
            expertiseList.push({
              ...v,
              type: 'checkbox',
              select: 'MultipleSelect',
              isSelected: false,
              title: v.expertise_info.expertise,
            });
            //experiencedInList.push(trainngValueLIst);
          }, []);
          setExpertise(expertiseList);
          expertiseList?.map(item => {
            filterList[7]?.subCategoryName.push(item);
          });
          setUpdateCate(!updateCate);

          dispatch(userActionServices.resetData());
        } else {
          snackbarError('Something went wrong , Please try again');
        }
      }
    } else {
    }
  }, [getMedicalExpetiesData]);
  // LastCategory FlatList Rander
  const renderSubCategoryItems = ({ item, index, separators }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            lastCateClickHandle(item, index);
          }}
          style={{
            paddingVertical: ms(2),
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: ms(16),
            paddingVertical: mvs(15),
          }}>
          {item.select === 'singleSelect' ? (
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
              fontFamily: fonts.quicksandBook,
              color: item.isSelected ? colors.primaryColor : colors.grey,
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
  const lastCateClickHandle = (item, index) => {
    console.log('itemsecond', item);

    if (item.select == 'MultipleSelect') {
    } else {
      subCategoryList.forEach((v, i) => {
        v.isSelected = false;
      });
    }
    if (item.loader === 'loader') {
      setLoaderVisible(true);
      console.log('amanmanm', item.loader);
      const category_id = {
        category_id: index + 1,
      };
      setTimeout(() => {
        dispatch(userActionServices.categoryBasedTraining(category_id));
      }, 500);

      setTimeout(() => {
        dispatch(userActionServices.getMedicalExpertie(category_id));
      }, 800);

    }

    item.isSelected = !item.isSelected;
    setUpdateCate(!updateCate);
  };
  const clearStates = () => {
    filterList?.map((filterItem, filterIndex) => {
      if (filterIndex == 6 || filterIndex == 7) {
        filterItem?.subCategoryName?.splice(
          0,
          filterItem?.subCategoryName?.length,
        );
      }
      filterItem?.subCategoryName?.map(subCatItem => {
        subCatItem.isSelected = false;
      });
    });

    console.log(training, 'training');
    console.log(expertise, 'expertise');
    setUpdateFilter(!updateFilter);
    setUpdateCate(!updateCate);
  };
  const closeFilterModel = () => {
    filterList?.map((filterItem, filterIndex) => {
      if (filterIndex == 6 || filterIndex == 7) {
        filterItem?.subCategoryName?.splice(
          0,
          filterItem?.subCategoryName?.length,
        );
      }
      filterItem?.subCategoryName?.map(subCatItem => {
        subCatItem.isSelected = false;
      });
    });

    setUpdateFilter(!updateFilter);
    setUpdateCate(!updateCate);
    setmodalVisible(false);
  };

  //apply click handler

  const applyClickHandler = () => {
    let data = {};
    let applyBody = {};
    if (postCode?.length > 0) data.filter_postcode = postCode;
    filterList.map((filterItem, filterIndex) => {
    
      var selectedIds = [];
      console.log('filterItem', filterItem);

      filterItem?.subCategoryName?.map((subCatItem, subCatIndex) => {
        console.log("subCatItem>>>",subCatItem);
        console.log("subCatItem.isSelected",subCatItem.isSelected)
        switch (filterIndex) {
          case 0: {
            if (subCatItem.isSelected) {
              data.filter_category = subCatItem.title;
            }
            break;
          }
          case 1: {
            if (subCatItem.isSelected) {
              data.filter_available_for = subCatItem.title;
            }
            break;
          }
          case 3: {
            // if (subCatItem.isSelected) {
            //   data.filter_available_for = subCatItem.title
            // }
            subCatItem.title = postCode;
            subCatItem.isSelected = true;

            break;
          }
          case 4: {
            if (subCatItem.isSelected) {
              selectedIds.push(subCatItem.id);
              data.filter_languages = selectedIds;
            }

            break;
          }
          case 5: {
            if (subCatItem.isSelected) {
              selectedIds.push(subCatItem.id);
              data.filter_experiences = selectedIds;
            }

            break;
          }
          case 6: {
            if (subCatItem.isSelected) {
              selectedIds.push(subCatItem.id);
              data.filter_trainings = selectedIds;
            }

            break;
          }
          case 7: {
            if (subCatItem.isSelected) {
              selectedIds.push(subCatItem.id);
              data.filter_expertises = selectedIds;
            }

            break;
          }
          case 8: {
            if (subCatItem.isSelected) {
              // selectedIds.push(subCatItem.id)
              data.filter_distance = subCatItem.title;
            }

            break;
          }
          case 2: {
            if (subCatItem.isSelected) {
              selectedIds.push(subCatItem.id);
              data.filter_ratings = selectedIds;
            }

            break;
          }
          // case 8: {
          //   if (subCatItem.isSelected) {
          //     // selectedIds.push(subCatItem.id)
          //     data.filter_petfriendly = subCatItem.title;
          //   }

          //   break;
          // }
        }
      });
    });
    console.log('data', data.filter_category);
    if (data.filter_category == undefined) {
      console.log('aaaaaaa');
      applyBody = {
        ...data,
        filtered_dates: filterDataHome.filtered_dates,
        latitude: filterDataHome.latitude,
        longitude: filterDataHome.longitude,
        filter_category: filterDataHome.filter_category,
      };
    } else {
      console.log('bbbbbbb');

      applyBody = {
        ...data,
        filtered_dates: filterDataHome.filtered_dates,
        latitude: filterDataHome.latitude,
        longitude: filterDataHome.longitude,
      };
    }
    console.log('data', data.filter_category);
  
    setTimeout(() => {
      dispatch(userActionServices.getCarerSearchListings(applyBody));
    }, 500);


    // props.navigation.navigate('CarerListing');
  };
  // Filter FlatList Rander
  const renderMainFilterItems = ({ item, index, separators }) => {
    return (
      <TouchableOpacity
        onPress={() => openSubCatModal(item, index)}
        style={{
          flex: 1,
          padding: ms(16),
          // backgroundColor: item.isSelected ? 'lightgray' : 'white',
        }}>
        <Text
          style={{
            fontSize: s(16),
            color: item.isSelected ? colors.primaryColor : colors.blue,
            fontFamily: fonts.quicksandMedium,
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.categoryName}
        </Text>
      </TouchableOpacity>
    );
  };

  // carer listing
  const CarerListingItem = ({ item, index, separators }) => {
    console.log("item>><><>",item);
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('CarerDetail', {
            itemId: 86,
            coupan: 'Send Job Offer',
            id: item.id,
            price: item.price,
            latitude:latitude,
            longitude:longitude
           
          })
        }
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: colors.white,
          marginVertical: ms(10),
          borderColor: colors.lightBackground,
        }}>
        <View
          style={{
            position: 'absolute',
            right: ms(15),
          }}>
          <ImageBackground
            style={{ height: mvs(50), width: mvs(40), resizeMode: 'contain' }}
            source={images.starBackground}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: mvs(5),
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
                  fontSize: s(12),
                  color: colors.blue,
                  marginTop: ms(2),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {item?.user_meta_info?.total_avg_rating}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: mvs(16),
            marginLeft: mvs(16),
          }}>
          <Image
            source={{ uri: Image_URL + item.profile_image }}
            style={{
              height: mvs(80),
              width: mvs(80),
              resizeMode: 'stretch',
              borderWidth: 1,
              borderRadius: ms(80),
              borderColor: colors.primaryColor,
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
              {item.first_name + ' ' + item.last_name}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.blueLight,
                  marginTop: ms(5),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {item.user_meta_info.category_info.category_name}
              </Text>
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.blueLight,
                  marginTop: ms(5),
                  marginLeft: ms(20),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {item.shift}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: ms(10),
                flex: 1,
              }}>
              <View style={{ flexDirection: 'row' ,flex:1}}>
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
                    marginLeft: ms(6),
                    flex:1,
                  }}
                 
                  ellipsizeMode="tail">
                  {/* {parseInt(item.carer_user_info.user_meta_info.distance).toFixed(2)} Miles Away */}
                  {parseFloat(item.user_meta_info.distance).toFixed(2)} Miles Away
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginLeft: ms(5),flex:1 }}>
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
                    marginLeft: ms(6),
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.user_meta_info.experience} {item.user_meta_info.experience==1?"year":"years"}
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                borderWidth: 1,
                borderRadius: ms(12.5),
                flexDirection: 'row',
                padding: ms(4),
                marginTop: mvs(10),
                width: ms(103),
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
            </View> */}
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
            flex: 1,
            marginHorizontal: ms(4),
            marginVertical: ms(10),
            alignContent: 'center',
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
                fontSize: s(13),
                flex:1,
                color: colors.blueLight,
              }}>
              Hourly Rate From
            </Text>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(18),
                marginLeft: ms(5),
                flex:1,
                color: colors.blue,
              }}>
              £ {item.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flex:1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(13),
                marginEnd: ms(5),
                color: colors.blueLight,
              }}>
              Available For:
            </Text>
            {item.user_meta_info.available_for === 'Female' ? (
              <Image
                source={images.femalesign}
                style={{
                  height: mvs(24),
                  width: mvs(24),
                  resizeMode: 'contain',
                }}></Image>
            ) : item.user_meta_info.available_for === 'No preference' ? (
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
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,

            backgroundColor: colors.lightblueopacity,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: ms(100),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: ms(16),
                paddingVertical: ms(16),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: s(28),

                  color: colors.blue,
                }}>
                Filters
              </Text>
              <TouchableOpacity
                onPress={() => {
                  clearStates();
                }}>
                <Text
                  style={{
                    fontSize: s(14),

                    color: colors.primaryColor,
                  }}>
                  Clear Filters
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomWidth: 4,

                borderColor: colors.lightBackground,
              }}></View>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View
                style={{
                  flex: 0.35,
                  // marginLeft: mvs(16),
                }}>
                <FlatList
                  extraData={!updateFilter}
                  data={filterList}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderMainFilterItems}
                />
              </View>
              <View
                style={{
                  flex: 0.01,
                  backgroundColor: colors.lightBackground,
                }}></View>

              {/* <FlatList
                data={catName}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return <Text>{item.title}</Text>;
                }}
              /> */}

              <View style={{ flex: 0.65 }}>
                {postCodeIndex == true ? (
                  <View
                    style={{
                      marginHorizontal: ms(10),
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
                      ref={textInput}
                      placeholderTextColor={colors.grey}
                      returnKeyType="search"
                      value={postCode}
                      onChangeText={text => setPostCode(text)}
                      placeholder="Postcode"></TextInput>
                  </View>
                ) : subCategoryList == '' ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: ms(20),
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.quicksandBook,
                        color: colors.red,
                      }}>
                      Please select category first
                    </Text>
                  </View>
                ) : (
                  <>
                    <ActivityIndicator
                      animating={loaderVisible}
                      size="large"
                      style={{
                        marginTop: mvs(85),
                        position: 'absolute',
                        color: '#0d447a',
                      }}
                      color={colors.darkblue}
                    />
                    <FlatList
                      extraData={updateCate}
                      data={subCategoryList}
                      showsVerticalScrollIndicator={false}
                      renderItem={renderSubCategoryItems}
                    />
                  </>
                )}
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 4,

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
                onPress={() => closeFilterModel()}
                style={styles.closeButton}>
                <Text
                  style={{
                    fontSize: s(18),
                    textAlign: 'center',
                    color: colors.white,
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => applyClickHandler()}
                // onPress={() => props.navigation.navigate('CarerListing')}
                style={styles.appleButton}>
                <Text
                  style={{
                    fontSize: s(18),
                    textAlign: 'center',
                    color: colors.white,
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Apply Filters
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
            Carer Listing
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => setmodalVisible(true)}>
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
      <View
        style={{
          flex: 1,
          marginHorizontal: ms(16),
          marginVertical: mvs(10),
        }}>
        {isDataBlank == 1 ? (
          <FlatList
            data={jobApliedList}
            showsVerticalScrollIndicator={false}
            renderItem={CarerListingItem}
          />
        ) : isDataBlank == 2 ? (
          <View
            style={{ justifyContent: 'center', flex: 1, alignSelf: 'center' }}>
            <Image
              style={{
                width: ms(80),
                height: mvs(68),
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={images.warning}></Image>
            <Text
              style={{
                color: colors.blue,
                fontSize: s(22),
                marginVertical: mvs(20),
                alignSelf: 'center',
                fontFamily: fonts.quicksandBold,
              }}
              ellipsizeMode="tail">
              Oops!
            </Text>
            <Text
              style={{
                color: colors.grey,
                fontSize: s(16),
                textAlign: 'center',
                fontFamily: fonts.quicksandBook,
              }}
              ellipsizeMode="tail">
              {/* No carer available in your area at the moment. Please contact to
              support. */}
              No carer is currently available in your area. Please check back later.
            </Text>
          </View>
        ) : <></>}
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
    borderColor: colors.grey,
    backgroundColor: colors.grey,
  },
  appleButton: {
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
