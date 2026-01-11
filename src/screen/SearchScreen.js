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
  FILTERDROPDOWNDATA,
  GETCATEGORYBASEDTRAINING,
  GETCATEGORYBASEDPROFESSIONALEXPERIENECES,
  GETPOPULARSEARCH,
  GETMEDICALEXPERTIESE,
} from '../utils/reducerConstant';
import { ColorSpace } from 'react-native-reanimated';
export default function SearchScreen(props) {
  const textInput = useRef(null);

  const { navigation } = props;

  const dispatch = useDispatch();
  const getCategoryBasedTraingList = useSelector(
    state => state.getCategorybasedTraining,
  );
  const getPopularSearchData = useSelector(state => state.getPopularSearchData);
  const getMedicalExpetiesData = useSelector(
    state => state.getMedicalExpertiesList,
  );
  const getCategorybasedProfessioanlExperieneces = useSelector(
    state => state.getCategorybasedProfessioanlExperieneces,
  );
  const filterDropDownList = useSelector(state => state.filterDropDownList);

  const [jobApliedList, setJobApliedList] = useState([]);

  const [searchItem, setSearchItem] = useState('');
  const [postCode, setPostCode] = useState('');
  const [catName, setcatName] = useState('');
  const [postCodeIndex, setPostCodeIndex] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [searchList, setSearchList] = useState([
    // {
    //   id: '1',
    //   title: 'Adult and Private Duty Nursing',
    // },
    // {
    //   id: '2',
    //   title: 'Adult Care and Medicare-certified Visits aman jain ',
    // },
  ]);
  const [popularSearchList, setPopularSearchList] = useState([
    // {
    //   id: '1',
    //   title: 'Adult ',
    // },
    // {
    //   id: '2',
    //   title: 'Aman jain',
    // },
  ]);
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
  const [petFriednly, setPetFriednly] = useState([
    {
      id: 1,
      title: 'Yes',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
    {
      id: 2,
      title: 'No',
      type: 'radio',
      select: 'singleSelect',
      isSelected: false,
    },
  ]);
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

  // const [subCategoryList, setSubCategoryList] = useState(

  // );
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [lastCategoryList, setLastCategoryList] = useState([]);

  const [updateFilter, setUpdateFilter] = useState();
  const [updateCate, setUpdateCate] = useState(true);
  const [updateLastCate, setUpdateLastCate] = useState(true);
  const [updateLastCateRadio, setUpdateLastCateRadio] = useState(true);
  const [appliedDataList, setAppliedDataList] = useState([]);

  const clearInput = () => {
    setSearchItem('');
    // setSearchList([]);
  };
  const searchItemRender = ({ item, index, separators }) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('CarerListing')}
        style={{ flex: 1, paddingVertical: ms(2) }}>
        <Text
          style={{
            fontSize: s(16),
            color: colors.blue,
            fontFamily: fonts.quicksandMedium,
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  //popular search

  const renderItems = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => searchPopular(item)}
        style={{
          flexDirection: 'row',

          marginTop: ms(10),
        }}>
        <View
          style={{
            paddingVertical: ms(2),
            backgroundColor: colors.lightBackground,

            borderWidth: 0.5,
            //    margin: ms(5),
            marginEnd: ms(5),
            marginTop: ms(5),
            marginBottom: ms(5),
            borderRadius: 13,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              fontSize: s(14),
              color: colors.grey,
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

  // // insurane array delete item
  // const listDelete = (index, item) => {
  //   console.log('index', index);
  //   imageArray.map((item, indexs) => {
  //     console.log('indexs', indexs);
  //     if (index == indexs) {
  //       console.log('inside', index, indexs);
  //       imageArray.splice(indexs, 1);
  //     }
  //   });
  //   setImageArray(imageArray => [...imageArray]);
  // };

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

  const lastCateClickHandle = (item, index) => {
    console.log('item', item);
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

      dispatch(userActionServices.categoryBasedTraining(category_id));
      dispatch(userActionServices.getMedicalExpertie(category_id));
    }

    item.isSelected = !item.isSelected;
    setUpdateCate(!updateCate);
  };

  const lastCateClickHandleRadio = (item, index) => {
    lastCategoryList.forEach((v, i) => {
      v.isSelected = false;
    });
    item.isSelected = !item.isSelected;
    setUpdateLastCateRadio(!updateLastCateRadio);
  };

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

  //apply click handler

  const applyClickHandler = () => {
    let data = {};
    if (postCode?.length > 0) data.filter_postcode = postCode;
    filterList.map((filterItem, filterIndex) => {
      var selectedIds = [];

      filterItem?.subCategoryName?.map((subCatItem, subCatIndex) => {
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
          case 9: {
            if (subCatItem.isSelected) {
              // selectedIds.push(subCatItem.id)
              data.filter_petfriendly = subCatItem.title;
            }

            break;
          }
        }
      });
    });
    console.log('data', data);
    console.log('filterList', filterList);
    setmodalVisible(false);
    props.navigation.navigate('CarerListing', {
      data,
    });
    // props.navigation.navigate('CarerListing');
  };
  // Click of FilterList(Main Category)
  const openSubCatModal = (item, index) => {
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
    setUpdateLastCate(!updateLastCate);
  };

  // Click of Sub Category DropDown (Sub Category)
  const openLastCategory = (item, index) => {
    // console.log('isEmpty', isEmpty(item.lastCategoryName));
    lastCategoryList.forEach((v, i) => {
      v.isSelected = false;
    });
    setLastCategoryList(item.lastCategoryName);

    if (item.isSelected && subCategoryList[index].isSelected) {
      item.isSelected = !item.isSelected;
    } else {
      subCategoryList.forEach((v, i) => {
        v.isSelected = false;
      });
      subCategoryList[index].isSelected = true;
    }

    setUpdateCate(!updateCate);
    // setUpdateLastCate(!updateLastCate);
  };

  const serachApi = () => {
    console.log('searchItem', searchItem);
    props.navigation.navigate('CarerListing', {
      searchKey: searchItem,
    });
  };
  const searchPopular = item => {
    console.log('itemPopular', item);
    props.navigation.navigate('CarerListing', {
      searchKey: item,
    });
  };

  // api call first time
  useEffect(() => {
    dispatch(userActionServices.filterListData());
    dispatch(userActionServices.getPopularSearch());
  }, []);

  // response  filterDropDown data
  useEffect(() => {
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
            loader: true,
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

  // response post api  category based training and set data
  useEffect(() => {
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

  useEffect(() => {
    if (getPopularSearchData.type === GETPOPULARSEARCH) {
      if (getPopularSearchData?.value?.status) {
        if (
          Object.keys(getPopularSearchData?.value).length != 0 &&
          getPopularSearchData?.value != undefined
        ) {
          console.log(
            '  getPopularSearchData.value.data',
            getPopularSearchData.value.data,
          );
          let searchList = [];

          // let confirmBookingListTemp = getPopularSearchData.value.data

          getPopularSearchData.value.data.map((postedData, postedIndex) => {
            searchList.push(postedData.search_word);
          }, []);

          setPopularSearchList(searchList);
          console.log('searchList', searchList);
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [getPopularSearchData]);

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
                  Clear All
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
                      height: mvs(40),
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
                  Apply
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
            Search
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Notifications')}>
            <Image
              style={{
                height: mvs(19),
                width: ms(21),
                resizeMode: 'contain',
              }}
              source={images.notification}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: ms(16),

          alignItems: 'center',
          marginTop: mvs(24),
        }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 22,

            height: mvs(45),
            flexDirection: 'row',
            flex: 1,
            marginLeft: ms(16),
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
          <TextInput
            placeholder="Search here..."
            placeholderTextColor={colors.grey}
            value={searchItem}
            onSubmitEditing={() => {
              serachApi();
            }}
            onChangeText={text => setSearchItem(text)}
            returnKeyType="search"
            style={{
              fontSize: s(14),

              color: colors.blue,
              marginLeft: ms(14),
              marginRight: ms(10),
              alignSelf: 'center',
              fontFamily: fonts.quicksandMedium,
              flex: 1,
            }}></TextInput>
          {searchItem.length >= 1 ? (
            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              onPress={() => clearInput()}>
              <Image
                source={images.cross}
                style={{
                  height: mvs(12),
                  width: mvs(12),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginRight: ms(10),
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => setmodalVisible(true)}
          style={{ marginLeft: ms(10) }}>
          <Image
            source={images.filter}
            style={{
              height: mvs(45),
              width: mvs(45),

              resizeMode: 'contain',
            }}></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomWidth: 2,
          marginTop: mvs(20),
          borderColor: colors.lightBackground,
        }}></View>
      <View
        style={{
          marginTop: mvs(24),
          marginHorizontal: ms(16),
          height: mvs(200),
        }}>
        <FlatList
          data={searchList}
          showsVerticalScrollIndicator={false}
          renderItem={searchItemRender}
        />
      </View>
      <View
        style={{
          marginTop: mvs(19),
          marginHorizontal: ms(16),
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: s(18),
            color: colors.blue,
            fontFamily: fonts.quicksandMedium,
          }}>
          Popular Searches
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: mvs(24),
          marginHorizontal: ms(16),
        }}>
        {popularSearchList.map((listItem, index) =>
          renderItems(listItem, index),
        )}
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
