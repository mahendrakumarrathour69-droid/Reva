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

import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseToken } from '../constant/constant';
import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import { Image_URL, SUCCESS } from "../utils/apiConstants";
// import ReadMore from '@fawazahmed/react-native-read-more';
import { Popable } from 'react-native-popable';
import ReadMore from 'react-native-read-more-text';
import { JOBPOSTEDAPPLIEDLIST, LOGOUT, FILTERDROPDOWNDATA } from '../utils/reducerConstant';
export default function SearchScreen(props) {



    const { navigation } = props;

    const dispatch = useDispatch();
    const filterDropDownList = useSelector(state => state.filterDropDownList);
    console.log('filterDropDownList', filterDropDownList)
    const [jobApliedList, setJobApliedList] = useState([])
    const [searchItem, setSearchItem] = useState('');
    const [catName, setcatName] = useState('');

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

    const [filterList, setfilterList] = useState(
        [
            {
                id: 1,
                categoryName: 'Category',
                isSelected: true,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Doctor',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate1 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate1 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate1 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Nurse',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate1 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate1 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 3,
                        title: 'Physio',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate1 SubCate3 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate1 SubCate3 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate1 SubCate3 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 4,
                        title: 'Investigations',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate1 SubCate4 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate1 SubCate4 2',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 5,
                        title: 'Medical Equipment',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate1 SubCate5 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate1 SubCate5 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                categoryName: 'Gender',
                isSelected: false,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Cate2 SubCate1',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate2 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate2 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate2 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Cate2 SubCate2',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate2 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate2 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 3,
                        title: 'Cate2 SubCate3',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate2 SubCate3 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate2 SubCate3 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate2 SubCate3 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 4,
                        title: 'Cate2 SubCate4',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate2 SubCate4 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate2 SubCate4 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 3,
                categoryName: 'Date & Time',
                isSelected: false,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Cate3 SubCate1',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate3 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Cate3 SubCate2',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 4,
                categoryName: 'Rating',
                isSelected: false,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Cate4 SubCate1',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate4 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate4 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate4 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Cate4 SubCate2',
                        type: 'radio',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate4 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate4 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 5,
                categoryName: 'Postcode',
                isSelected: false,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Cate3 SubCate1',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate3 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Cate3 SubCate2',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 6,
                categoryName: 'Language',
                isSelected: false,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Cate3 SubCate1',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate3 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Cate3 SubCate2',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 7,
                categoryName: 'Experience',
                isSelected: false,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Cate3 SubCate1',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate3 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Cate3 SubCate2',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 8,
                categoryName: 'Trainings',
                isSelected: false,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Cate3 SubCate1',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate3 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Cate3 SubCate2',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 9,
                categoryName: 'Booking Mode',
                isSelected: false,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Cate3 SubCate1',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate3 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Cate3 SubCate2',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: 10,
                categoryName: 'Job Prefrences',
                isSelected: false,
                subcategoryName: [
                    {
                        id: 1,
                        title: 'Expertise',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate1 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate1 2',
                                isSelected: false,
                            },
                            {
                                id: 3,
                                title: 'Cate3 SubCate1 3',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Care type',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 3,
                        title: 'Trainings',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 4,
                        title: 'Available for',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                    {
                        id: 5,
                        title: 'Pet Friendly',
                        type: 'checkbox',
                        isSelected: false,
                        lastCategoryName: [
                            {
                                id: 1,
                                title: 'Cate3 SubCate2 1',
                                isSelected: false,
                            },
                            {
                                id: 2,
                                title: 'Cate3 SubCate2 2',
                                isSelected: false,
                            },
                        ],
                    },
                ],
            },
        ]);

    const [subCategoryList, setSubCategoryList] = useState(
        filterList[0].subcategoryName,
    );

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
                    style={{ fontSize: s(16), color: colors.blue, fontFamily: fonts.quicksandMedium }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };
    //popular search
    const renderItems = ({ item, index, separators }) => {
        return (
            <View
                style={{
                    paddingVertical: ms(2),
                    backgroundColor: colors.lightBackground,
                    borderWidth: 1,
                    margin: ms(5),
                    borderRadius: 20,
                    borderColor: colors.lightBackground,
                }}>
                <Text
                    style={{
                        fontSize: s(16),
                        color: colors.blue,
                        padding: ms(8),
                        fontFamily: fonts.quicksandMedium,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.title}
                </Text>
            </View>
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
    const renderFilterItems = ({ item, index, separators }) => {
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
                        color: item.isSelected ? colors.primaryColor : colors.grey,
                        fontFamily: fonts.quicksandMedium
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.categoryName}
                </Text>
            </TouchableOpacity>
        );
    };

    // SubCategory FlatList Rander
    const renderSubCategoryItems = ({ item, index, separators }) => {
        return (
            <View>
                {/* {isEmpty(item.lastCategoryName) ? null : */}
                {Object.keys(item.lastCategoryName).length == 0 ? null : (
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => openLastCategory(item, index)}
                            style={{
                                paddingVertical: ms(2),
                                flexDirection: 'row',
                                marginHorizontal: ms(16),
                                paddingVertical: mvs(25),
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    fontSize: s(16),
                                    color: item.isSelected ? colors.primaryColor : colors.grey,
                                    fontFamily: fonts.quicksandMedium
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {item.title}
                            </Text>
                            <Image
                                source={item.isSelected ? images.upArrowFill : images.downArrow}
                                style={{
                                    height: mvs(9),
                                    width: mvs(15),
                                    resizeMode: 'contain',
                                }}
                            />
                        </TouchableOpacity>
                        {item.isSelected && item.type == 'checkbox' ? (
                            <FlatList
                                extraData={updateLastCate}
                                data={lastCategoryList}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderLastCategoryItems}
                            />
                        ) : item.isSelected && item.type == 'radio' ? (
                            <FlatList
                                extraData={updateLastCateRadio}
                                data={lastCategoryList}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderLastCategoryItemRadio}
                            />
                        ) : null}
                    </View>
                )}
            </View>
        );
    };

    const lastCateClickHandle = (item, index) => {
        item.isSelected = !item.isSelected;
        setUpdateLastCate(!updateLastCate);
    };

    const lastCateClickHandleRadio = (item, index) => {
        lastCategoryList.forEach((v, i) => {
            v.isSelected = false;
        });
        item.isSelected = !item.isSelected;
        setUpdateLastCateRadio(!updateLastCateRadio);
    };

    // LastCategory FlatList Rander
    const renderLastCategoryItems = ({ item, index, separators }) => {
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
                    <Image
                        source={
                            item.isSelected ? images.fill_rectangle : images.rectangleCheck
                        }
                        style={{ height: mvs(15), width: mvs(15), resizeMode: 'contain' }}
                    />
                    <Text
                        style={{
                            fontSize: s(16),
                            fontFamily: fonts.quicksandBook,
                            color: item.isSelected ? colors.grey : colors.grey,
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
    // LastCategory FlatList Rander Radio
    const renderLastCategoryItemRadio = ({ item, index, separators }) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        lastCateClickHandleRadio(item, index);
                    }}
                    style={{
                        paddingVertical: ms(2),
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: ms(16),
                        paddingVertical: mvs(15),
                    }}>
                    <Image
                        source={item.isSelected ? images.fillCheck : images.blankCheck}
                        style={{ height: mvs(15), width: mvs(15), resizeMode: 'contain' }}
                    />
                    <Text
                        style={{
                            fontSize: s(16),
                            color: item.isSelected ? colors.grey : colors.grey,
                            marginLeft: ms(15),
                            fontFamily: fonts.quicksandBook

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
        setmodalVisible(false);
        // props.navigation.navigate('CarerListing');
    };
    // Click of FilterList(Main Category)
    const openSubCatModal = (item, index) => {
        console.log('item >>' + index);
        console.log(item);
        setSubCategoryList(item.subcategoryName);

        filterList.forEach((v, i) => {
            v.isSelected = false;
        });
        filterList[index].isSelected = true;
        filterList.forEach((v, i) => {
            v.subcategoryName.forEach((v, i) => {
                if (v.isSelected) {
                    v.lastCategoryName.forEach((v, i) => {
                        if (v.isSelected) appliedDataList.push(v);
                    });
                }
            });
        });
        console.log('dhfiashihfshifseihfhs', appliedDataList);
        console.log('main list', filterList);
        // subCategoryList.forEach((v, i) => {
        //   v.isSelected = false;
        // });

        // setUpdateLastCate(!updateLastCate);
        // setUpdateCate(!updateCate);
        setUpdateFilter(!updateFilter);
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
        console.log('searchItem', searchItem)
        props.navigation.navigate('CarerListing', {
            searchKey: searchItem
        })
    }

    useEffect(() => {
        dispatch(userActionServices.filterListData())
    }, [])
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
                            <TouchableOpacity>
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
                                    renderItem={renderFilterItems}
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
                                <FlatList
                                    extraData={updateCate}
                                    data={subCategoryList}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={renderSubCategoryItems}
                                />
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
                                onPress={() => setmodalVisible(false)}
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
                        numberOfLines={1}>
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
                            if (searchItem.length > 3) {
                                serachApi();
                            }
                        }}
                        onChangeText={text => setSearchItem(text)}
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
                    marginTop: mvs(24),
                    marginHorizontal: ms(16),
                }}>
                <FlatList
                    data={popularSearchList}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItems}
                    horizontal
                />
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
