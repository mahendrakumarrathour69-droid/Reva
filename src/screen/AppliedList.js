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
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../component/AppLoader';

import { userActionServices } from '../redux/userServices';
import { snackbarSuccess, snackbarError } from '../utils/snackbar';
import { Image_URL, SUCCESS } from '../utils/apiConstants';
// import ReadMore from '@fawazahmed/react-native-read-more';
import { Popable } from 'react-native-popable';
import ReadMore from 'react-native-read-more-text';
import { JOBPOSTEDAPPLIEDLIST, LOGOUT } from '../utils/reducerConstant';
export default function AppliedList(props) {
  const { navigation } = props;
  var joblist = [];
  var id = props.route.params.id;
  console.log('id', id);
  const dispatch = useDispatch();
  const [isDataBlank, setIsDataBlank] = useState(0);
  console.log("isdatablanlkkk??????????", isDataBlank);
  const jobAppliedListData = useSelector(state => state.jobAppliedList);
  const [jobApliedList, setJobApliedList] = useState([]);
  console.log('jobAppliedListData', jobAppliedListData);

  // api  call jobPosted Applied list
  useEffect(() => {
    setTimeout(() => {
      dispatch(userActionServices.jobPostedAppliedLists(id));
    }, 500);

  }, []);

  // response get api and set data
  useEffect(() => {
    hideLoader();

    if (jobAppliedListData.type === JOBPOSTEDAPPLIEDLIST) {
      if (jobAppliedListData?.value?.status) {
        if (
          Object.keys(jobAppliedListData?.value).length != 0 &&
          jobAppliedListData?.value != undefined
        ) {
          console.log(
            'jobAppliedListDatajobAppliedListDatajobAppliedListData',
            jobAppliedListData,
          );
          let jobPostedListTemp = [];
          let jobPostedListDateTemp = [];
          jobAppliedListData.value.data.map((postedData, postedIndex) => {
            jobPostedListTemp.push(postedData);
          }, []);
          setJobApliedList(jobPostedListTemp);
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [jobAppliedListData]);

  // carer Listing Item (render )
  const CarerListingItem = ({ item, index, separators }) => {
    console.log('Applieditem???????????????', JSON?.stringify(item));
    console.log('Image',Image_URL + item.carer_user_info.profile_image );
    return (
      <View
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
                  {item.carer_user_info?.total_avg_rating}
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
          <TouchableOpacity
            activeOpacity={item.is_booking_confirmed == 1 ? 1 : 0.5}
            onPress={() =>
              item.is_booking_confirmed == 1
                ? {}
                : props.navigation.navigate('AppliedDetails', {
                  itemId: 86,
                  id: item.id,
                  price: item.price,
                })
            }>
            <Image
              source={{ uri: Image_URL + item.carer_user_info.profile_image }}
              style={{
                height: mvs(80),
                width: mvs(80),
                resizeMode: 'stretch',
                borderWidth: 1,
                borderRadius: ms(80),
                borderColor: colors.primaryColor,
              }}></Image>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: ms(14),

              flex: 1,
            }}>
            <TouchableOpacity
              activeOpacity={item.is_booking_confirmed == 1 ? 1 : 0.5}
              onPress={() =>
                item.is_booking_confirmed == 1
                  ? {}
                  : props.navigation.navigate('AppliedDetails', {
                    itemId: 86,
                    id: item.id,
                    price: item.price,
                  })
              }>
              <Text
                style={{
                  fontSize: s(18),
                  color: colors.blue,

                  width: ms(160),
                  fontFamily: fonts.quicksandMedium,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.carer_user_info.first_name +
                  ' ' +
                  item.carer_user_info.last_name}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              {/* <Text
                style={{
                  fontSize: s(14),
                  color: colors.blueLight,
                  marginTop: ms(5),
                  fontFamily: fonts.quicksandMedium,
                }}>
                Nurse
              </Text> */}
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
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>
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
                    flex: 1,
                    fontFamily: fonts.quicksandMedium,
                    color: colors.blueLight,
                    marginLeft: ms(8),
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {/* {parseInt(item.carer_user_info.user_meta_info.distance).toFixed(2)} Miles Away */}
                  {parseFloat(item.carer_user_info.user_meta_info.distance).toFixed(2)} Miles
                  Away
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
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
                    marginLeft: ms(10),
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.carer_user_info.user_meta_info.experience} {item.carer_user_info.user_meta_info.experience==1?"year":"years"}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: mvs(10) }}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('ChatScreen', {
                    carerData: {
                      id: item?.apply_by_carer_user_id,
                      name: item?.carer_user_info?.first_name,
                      image: item?.carer_user_info?.profile_image,
                      title: item?.carer_user_info?.user_meta_info?.category_info?.category_name,
                    },
                  })
                }
                style={{
                  borderWidth: 1,
                  borderRadius: ms(12.5),
                  flexDirection: 'row',
                  padding: ms(4),

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
                  Chat with {item?.carer_user_info?.first_name}
                </Text>
                <Image
                  source={images.chatSign}
                  style={{
                    height: mvs(18),
                    width: mvs(18),
                    marginStart: ms(2),
                    resizeMode: 'contain',
                  }}></Image>
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={item.is_booking_confirmed == 1 ? 1 : 0.5}
                onPress={() => {
                  item.is_booking_confirmed == 1
                    ? {}
                    : props.navigation.navigate('ViewProposal', {
                        itemId: 86,
                        jobOfferId: item.apply_by_carer_user_id,
                        viewProposalId: item.id,
                        price: item.price,
                      });
                }}
                style={{
                  borderColor: colors.orange,
                  borderRadius: ms(20),
                  borderWidth: 1,
                  backgroundColor: colors.orange,
                  marginHorizontal: ms(5),
                  padding: ms(7),
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: s(9),
                    fontFamily: fonts.quicksandBold,
                  }}>
                  View Proposal
                </Text>
              </TouchableOpacity> */}
            </View>
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

            marginLeft: ms(16),
            marginVertical: ms(10),
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
                fontSize: s(14),
                color: colors.blueLight,
              }}>
              Hourly rate
            </Text>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(18),
                marginLeft: ms(18),
                color: colors.blue,
              }}>
              £{item.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',

              flex: 1,
              alignItems: 'center',
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
            {item.carer_user_info.user_meta_info.available_for === 'Female' ? (
              <Image
                source={images.femalesign}
                style={{
                  height: mvs(24),
                  width: mvs(24),
                  resizeMode: 'contain',
                }}></Image>
            ) : item.carer_user_info.user_meta_info.available_for ===
              'No preference' ? (
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
        <View
          style={{

            paddingVertical: mvs(10),
            paddingHorizontal: mvs(15),

          }}>

          <TouchableOpacity
            activeOpacity={item.is_booking_confirmed == 1 ? 1 : 0.5}
            onPress={() => {
              item.is_booking_confirmed == 1
                ? {}
                : props.navigation.navigate('ViewProposal', {
                  itemId: 86,
                  jobOfferId: item.apply_by_carer_user_id,
                  viewProposalId: item.id,
                  price: item.price,
                });
            }}
            style={{
              borderRadius: ms(6),
              // padding: ms(13),
              width: '100%',
              borderWidth: 1,
              height: mvs(45),
              justifyContent: 'center',
              borderColor: colors.green,
              backgroundColor: colors.green,
            }}>
            <Text
              style={{
                fontSize: s(18),
                textAlign: 'center',
                color: colors.white,
                fontFamily: fonts.quicksandMedium,
              }}>
              View Proposal
            </Text>
          </TouchableOpacity>
        </View>
        {item.is_booking_confirmed == 1 ? (
          <>
            <View
              style={{
                borderBottomWidth: 2,
                marginHorizontal: ms(16),

                borderColor: colors.lightBackground,
              }}></View>
            <View style={{ marginHorizontal: ms(16), paddingVertical: mvs(10) }}>
              <Text
                style={{
                  fontSize: s(14),
                  color: colors.red,
                  fontFamily: fonts.quicksandMedium,
                }}>
                Oops! Looks like this carer not available at this moment.
              </Text>
            </View>
          </>
        ) : (
          <></>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
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
            Applied List
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('SearchScreen')}>
            <Image
              style={{
                height: mvs(45),
                width: ms(45),
                resizeMode: 'contain',
              }}
              source={images.filter}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{
          marginTop: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
      <View
        style={{ flex: 1, marginHorizontal: ms(16), marginVertical: mvs(10) }}>
        <FlatList
          data={jobApliedList}
          showsVerticalScrollIndicator={false}
          renderItem={CarerListingItem}
        />
      </View>
    </SafeAreaView>
  );
}
