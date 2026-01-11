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

//import ReadMore from '@fawazahmed/react-native-read-more';
import ReadMore from 'react-native-read-more-text';
export default function PostJobList(props) {
  const [jobsearchList, setJobSearchList] = useState([
    {
      id: '1',
      title: 'Patient Care Aide - PCA',
      distance: '5 Miles Away',
      duration: 'June 14 - June 16',
      shift: 'Night Shift',
      care: 'Hoist Care',
      address: '4900 County Rd #14Flat Rock, Alabama(AL), 35966',
      image: [
        {
          id: 1,
          images: images.profile,
        },
        {
          id: 2,
          images: images.profile,
        },
        {
          id: 3,
          images: images.profile,
        },
        {
          id: 3,
          images: images.profile,
        },
        {
          id: 3,
          images: images.profile,
        },
      ],
    },
  ]);
  const [carerListingLIst, setcarerListingLIst] = useState([
    {
      id: '1',
      title: 'Lauren Taylor',
      name: 'Athena Brasfield',
      distance: '5 Miles Away',
      experince: '5Year',
      rate: '$20',
      availablesingle: images.malesign,
      availabledouble: images.femalesign,
      profile: images.profile,
      shift: 'Shift',
      starRating: 5.0,
    },
  ]);
  const CarerListingItem = ({ item, index, separators }) => {
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
            flexDirection: 'row',
            marginEnd: ms(16),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: mvs(16),
            marginLeft: mvs(16),
          }}>
          <Text
            style={{
              fontSize: s(25),
              color: colors.blue,

              width: ms(160),
              fontFamily: fonts.quicksandMedium,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ChatList')}
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
              Chat with {item.name}
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
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: mvs(16),
            marginLeft: mvs(16),
          }}>
          <Image
            source={item.profile}
            style={{
              height: mvs(80),
              width: mvs(80),
              resizeMode: 'contain',
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
              {item.name}
            </Text>
            <View style={{ flexDirection: 'row' }}>
             
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
              <View style={{ flexDirection: 'row' }}>
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
                    marginLeft: ms(10),
                  }}>
                  {item.distance}
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
                  }}>
                  {item.experince}
                </Text>
              </View>
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
                fontSize: s(24),
                marginLeft: ms(18),
                color: colors.blue,
              }}>
              £ {item.rate}
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
            {item.availablesingle == null ? (
              <></>
            ) : (
              <Image
                source={item.availablesingle}
                style={{
                  height: mvs(24),
                  width: mvs(24),
                  marginEnd: ms(5),
                  resizeMode: 'contain',
                }}></Image>
            )}
            <Image
              source={item.availabledouble}
              style={{
                height: mvs(24),
                width: mvs(24),
                resizeMode: 'contain',
              }}></Image>
          </View>
        </View>
      </View>
    );
  };
  const jobPostedRenderItem = ({ item, index, separators }) => {
    return (
      <View
        // onPress={() => props.navigation.navigate('CarerDetail')}
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 10,

          backgroundColor: colors.white,
          marginVertical: ms(10),
          borderColor: colors.lightBackground,
        }}>
        <View style={{ marginTop: mvs(15), marginLeft: ms(15) }}>
          <Text
            style={{
              fontSize: s(18),
              color: colors.blue,
              fontFamily: fonts.quicksandMedium,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: s(14),
              color: colors.blue,
              marginTop: mvs(6),
              marginRight: ms(130),
              fontFamily: fonts.quicksandBook,
            }}>
            {item.address}
          </Text>
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
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
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
                marginTop: mvs(9),
              }}>
              {item.duration}
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
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image
              source={images.watch}
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
                marginTop: mvs(9),
              }}>
              {item.shift}
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
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Image
              source={images.carePic}
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
                marginTop: mvs(9),
              }}>
              {item.care}
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: ms(16), marginTop: mvs(8) }}>
          <ReadMore
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </ReadMore>
        </View>
        <View
          style={{
            marginVertical: mvs(16),
            marginLeft: ms(16),
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: mvs(36),
              width: mvs(36),

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: mvs(36),
                width: mvs(36),
                borderRadius: ms(18),
                borderColor: colors.white,
                borderWidth: 1,
                resizeMode: 'contain',
              }}
              source={images.profile}></Image>
          </View>
          <View
            style={{
              height: mvs(36),
              width: mvs(36),
              marginStart: ms(-15),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: mvs(36),
                width: mvs(36),
                borderRadius: ms(18),
                borderColor: colors.white,
                borderWidth: 1,
                resizeMode: 'contain',
              }}
              source={images.profile}></Image>
          </View>
          <View
            style={{
              height: mvs(36),
              width: mvs(36),
              marginStart: ms(-15),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: mvs(36),
                width: mvs(36),
                borderRadius: ms(18),
                borderColor: colors.white,
                borderWidth: 1,
                resizeMode: 'contain',
              }}
              source={images.profile}></Image>
          </View>

          {Object.keys(item.image).length > 3 ? (
            <View
              style={{
                height: mvs(36),
                width: mvs(36),
                marginStart: ms(-15),
                justifyContent: 'center',
                borderRadius: ms(18),
                backgroundColor: colors.blue,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: s(16),
                  fontFamily: fonts.quicksandMedium,
                }}>
                +{Object.keys(item.image).length - 3}
              </Text>
            </View>
          ) : (
            <></>
          )}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AppliedList')}
            style={{
              height: mvs(36),
              justifyContent: 'center',
              marginStart: ms(10),
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.primaryColor,
                fontSize: s(14),
                fontFamily: fonts.quicksandMedium,
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView style={{}}>
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
              Job Posted
            </Text>
          </View>
          <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
            {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('Notifications')}>
            <Image
              style={{
                height: mvs(19),
                width: ms(21),
                resizeMode: 'contain',
              }}
              source={images.notification}
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
        <View style={{ marginHorizontal: ms(16), marginVertical: mvs(10) }}>
          <FlatList
            data={carerListingLIst}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={CarerListingItem}
          />
        </View>
        <View style={{ marginHorizontal: ms(16), marginVertical: mvs(10) }}>
          <FlatList
            data={jobsearchList}
            bounces={false}
            showsVerticalScrollIndicator={false}
            renderItem={jobPostedRenderItem}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
