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
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';

export default function Services(props) {
  const [imageList, setImageList] = useState(
    [
      [
        {
          id: 1,
          name: 'Image 1',
          image: images.service1,
        },
        {
          id: 2,
          name: 'Image 2',
          image: images.service2,
        },
        {
          id: 3,
          name: 'Image 3',
          image: images.service3,
        },
      ],
      [
        {
          id: 1,
          name: 'Image 1',
          image: images.service5,
        },
        {
          id: 1,
          name: 'Image 1',
          image: images.service7,
        },
        {
          id: 1,
          name: 'Image 1',
          image: images.service6,
        },
      ],
      [
        {
          id: 1,
          name: 'Image 1',
          image: images.service8,
        },
        {
          id: 1,
          name: 'Image 1',
          image: images.service9,
        },
        {
          id: 1,
          name: 'Image 1',
          image: images.service10,
        },
      ],
    ]);
  const renderServicesData = ({ item, index, separators }) => {
    console.log('item', item);
    return (
      <View
        // onPress={() => routedestination(item)}
        style={{
          marginHorizontal: 20,
          flex: 1,
        }}>
        {(index + 1) % 2 != 0 ? (
          Object.keys(item).length == 0 ? null : (
            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(19),
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  borderRadius: 10,
                  width: '100%',
                  height: mvs(256),
                  flex: 1,
                }}>
                <Image
                  source={item[0].image}
                  style={{
                    height: 'auto',
                    width: 'auto',
                    maxHeight: mvs(256),
                    minHeight: mvs(256),
                    maxWidth: '100%',

                    resizeMode: 'stretch',
                  }}></Image>
                <View
                  style={{
                    backgroundColor: colors.blackopacity,
                    marginTop: mvs(-28),
                    alignItems: 'center',
                    height: mvs(28),
                    justifyContent: 'center',
                    borderBottomStartRadius: ms(10),
                    borderBottomEndRadius: ms(10),
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: s(14),
                      textAlign: 'center',
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    COPD
                  </Text>
                </View>
              </View>

              {Object.keys(item).length == 1 ? (
                console.log('ddedww')
              ) : (
                <>
                  <View style={{ width: mvs(16) }}></View>
                  <View
                    style={{
                      flex: 1,

                      flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                        height: 'auto',
                        width: 'auto',
                        maxHeight: mvs(256),
                        minHeight: mvs(105),

                        maxWidth: '100%',
                        flex: 1,
                      }}>
                      <Image
                        source={item[1].image}
                        style={{
                          height: 'auto',
                          width: 'auto',
                          maxHeight: mvs(256),
                          minHeight:
                            Object.keys(item).length == 2 ? mvs(256) : mvs(105),
                          maxWidth: '100%',

                          resizeMode: 'stretch',
                        }}></Image>
                      <View
                        style={{
                          backgroundColor: colors.blackopacity,
                          marginTop: mvs(-28),
                          alignItems: 'center',
                          height: mvs(28),
                          justifyContent: 'center',
                          borderBottomStartRadius: ms(10),
                          borderBottomEndRadius: ms(10),
                        }}>
                        <Text
                          style={{
                            color: colors.white,
                            fontSize: s(14),
                            textAlign: 'center',
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          Early Stage Dementia
                        </Text>
                      </View>
                    </View>
                    {Object.keys(item).length == 2 ? (
                      <></>
                    ) : (
                      <View
                        style={{
                          marginTop: mvs(16),
                          borderRadius: 10,
                          height: 'auto',
                          width: 'auto',
                          maxHeight: mvs(256),
                          minHeight: mvs(135),
                          maxWidth: '100%',
                          flex: 1,
                        }}>
                        <Image
                          source={item[2].image}
                          style={{
                            height: 'auto',
                            width: 'auto',
                            maxHeight: mvs(256),
                            minHeight: mvs(135),
                            maxWidth: '100%',

                            resizeMode: 'stretch',
                          }}></Image>
                        <View
                          style={{
                            backgroundColor: colors.blackopacity,
                            marginTop: mvs(-28),
                            alignItems: 'center',
                            height: mvs(28),
                            justifyContent: 'center',
                            borderBottomStartRadius: ms(10),
                            borderBottomEndRadius: ms(10),
                          }}>
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: s(14),
                              textAlign: 'center',
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            Late Stage Dementia
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>
          )
        ) : Object.keys(item).length == 0 ? null : (
          <View
            style={{
              flexDirection: 'row',
              marginTop: mvs(19),
              justifyContent: 'space-between',
            }}>
            {Object.keys(item).length <= 3 ? (
              <>
                {Object.keys(item).length == 1 ? null : (
                  <>
                    <View
                      style={{
                        flex: 1,

                        flexDirection: 'column',
                      }}>
                      <View
                        style={{
                          borderRadius: 10,
                          height: 'auto',
                          width: 'auto',
                          maxHeight: mvs(256),
                          minHeight: mvs(105),

                          maxWidth: '100%',
                          flex: 1,
                        }}>
                        <Image
                          source={item[0].image}
                          style={{
                            height: 'auto',
                            width: 'auto',
                            maxHeight: mvs(256),
                            minHeight:
                              Object.keys(item).length == 2
                                ? mvs(256)
                                : mvs(105),
                            maxWidth: '100%',

                            resizeMode: 'stretch',
                          }}></Image>
                        <View
                          style={{
                            backgroundColor: colors.blackopacity,
                            marginTop: mvs(-28),
                            alignItems: 'center',
                            height: mvs(28),
                            justifyContent: 'center',
                            borderBottomStartRadius: ms(10),
                            borderBottomEndRadius: ms(10),
                          }}>
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: s(14),
                              textAlign: 'center',
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            Stroke
                          </Text>
                        </View>
                      </View>

                      {Object.keys(item).length == 2 ? (
                        <></>
                      ) : (
                        <View
                          style={{
                            marginTop: mvs(16),
                            borderRadius: 10,
                            height: 'auto',
                            width: 'auto',
                            maxHeight: mvs(256),
                            minHeight: mvs(135),
                            maxWidth: '100%',
                            flex: 1,
                          }}>
                          <Image
                            source={item[1].image}
                            style={{
                              height: 'auto',
                              width: 'auto',
                              maxHeight: mvs(256),
                              minHeight: mvs(135),
                              maxWidth: '100%',

                              resizeMode: 'stretch',
                            }}></Image>
                          <View
                            style={{
                              backgroundColor: colors.blackopacity,
                              marginTop: mvs(-28),
                              alignItems: 'center',
                              height: mvs(28),
                              justifyContent: 'center',
                              borderBottomStartRadius: ms(10),
                              borderBottomEndRadius: ms(10),
                            }}>
                            <Text
                              style={{
                                color: colors.white,
                                fontSize: s(14),
                                textAlign: 'center',
                              }}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              Incontinence
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                    <View style={{ width: mvs(16) }}></View>
                  </>
                )}

                <View
                  style={{
                    borderRadius: 10,
                    width: '100%',
                    height: mvs(256),
                    flex: 1,
                  }}>
                  <Image
                    source={item[2].image}
                    style={{
                      height: 'auto',
                      width: 'auto',
                      maxHeight: mvs(256),
                      minHeight: mvs(256),
                      maxWidth: '100%',

                      resizeMode: 'stretch',
                    }}></Image>
                  <View
                    style={{
                      backgroundColor: colors.blackopacity,
                      marginTop: mvs(-28),
                      alignItems: 'center',
                      height: mvs(28),
                      justifyContent: 'center',
                      borderBottomStartRadius: ms(10),
                      borderBottomEndRadius: ms(10),
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: s(14),
                        textAlign: 'center',
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      Accident rehabilitation
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
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
            Services
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
          marginVertical: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
      <View style={{ flex: 1, paddingBottom: mvs(20) }}>
        <FlatList
          data={imageList}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderServicesData}
        />
      </View>
    </View>
  );
}
