import { View, Text, StyleSheet, Image, ImageStore, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import { colors } from '../utils/colors';
import images from '../utils/images';
import { ms, mvs, s } from 'react-native-size-matters';
import MyBooking from '../screen/MyBooking';
import PostJob from '../screen/PostJob';
import { fonts } from '../utils/font';
const Tab = createBottomTabNavigator();

export default function BottomTab(props) {
  

  const navigation = { props };
  const [from, setFrom] = useState('Home');


  // useEffect(() => {
  //   console.log('props.route.params.from ', props.route.params.from);
  //   navigation.jumpTo('BottomTab', {name: props.route.params.from});
  //   //navigation.jumpTo(props.route.params.from);
  //   //setFrom(props.route.params.from);
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: colors.white,
          tabBarInactiveBackgroundColor: colors.white,
          tabBarStyle: styles.tabBarStyle,
          unmountOnBlur: true
        }}
        initialRouteName={props?.route.params?.tab}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerShown: false,

            tabBarIcon: ({ tintColor, focused }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <View style={styles.tabIconContainer}>
                  <Image
                    style={styles.bottomImage}
                    resizeMode={'contain'}
                    source={focused ? images.fillHome : images.home}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: s(12),
                        marginTop: mvs(5),
                        fontFamily: fonts.quicksandMedium,
                        color: focused ? colors.primaryColor : colors.blueLight,
                      }}>
                      Home
                    </Text>
                  </View>
                  {/* <View
                    style={[
                      styles.selectedBottomBar,
                      {backgroundColor: focused ? colors.blue : colors.white},
                    ]}
                  /> */}
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="PostJob"
          component={PostJob}
          options={{
            title: 'Screen',
            headerShown: false,
            tabBarIcon: ({ tintColor, focused }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <View style={styles.tabIconContainer}>
                  <Image
                    style={{
                      width: mvs(30),
                      height: ms(20),
                    }}
                    resizeMode={'contain'}
                    source={focused ? images.FillPostJob : images.PostJob}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: s(12),
                        marginTop: mvs(5),
                        fontFamily: fonts.quicksandMedium,
                        color: focused ? colors.primaryColor : colors.blueLight,
                      }}>
                      Post a Job
                    </Text>
                  </View>
                  {/* <View
                    style={[
                      styles.selectedBottomBar,
                      {backgroundColor: focused ? colors.blue : colors.white},
                    ]}
                  /> */}
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="MyBooking"
          component={MyBooking}
          options={{
            title: 'Screen',
            headerShown: false,
            tabBarIcon: ({ tintColor, focused }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <View style={styles.tabIconContainer}>
                  <Image
                    style={{
                      width: mvs(30),
                      height: ms(20),
                    }}
                    resizeMode={'contain'}
                    source={focused ? images.FillMyBooking : images.myBooking}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: s(12),
                        marginTop: mvs(5),
                        fontFamily: fonts.quicksandMedium,
                        color: focused ? colors.primaryColor : colors.blueLight,
                      }}>
                      My Bookings
                    </Text>
                  </View>
                  {/* <View
                    style={[
                      styles.selectedBottomBar,
                      {backgroundColor: focused ? colors.blue : colors.white},
                    ]}
                  /> */}
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Screen',
            headerShown: false,
            tabBarIcon: ({ tintColor, focused }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <View style={styles.tabIconContainer}>
                  <Image
                    style={{
                      width: mvs(30),
                      height: ms(20),
                    }}
                    resizeMode={'contain'}
                    source={focused ? images.fillprofile : images.profile}
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: s(12),
                        marginTop: mvs(5),
                        fontFamily: fonts.quicksandMedium,
                        color: focused ? colors.primaryColor : colors.blueLight,
                      }}>
                      Profile
                    </Text>
                  </View>
                  {/* <View
                    style={[
                      styles.selectedBottomBar,
                      {backgroundColor: focused ? colors.blue : colors.white},
                    ]}
                  /> */}
                </View>
              </View>
            ),
          }}
        />
        {/* <Tab.Screen
          name="Screen2"
          component={Home}
          options={{
            title: 'Screen',
            headerShown: false,
            tabBarIcon: ({tintColor, focused}) => (
              <View
                style={{
                  flex: 1,

                  justifyContent: 'center',
                }}>
                <View style={styles.tabIconContainer}>
                  <Image
                    style={{width: ms(33), height: mvs(33)}}
                    resizeMode={'contain'}
                    source={
                      focused
                        ? imagePaths.ic_search_active
                        : imagePaths.ic_search_inactive
                    }
                  />
                  <View
                    style={[
                      styles.selectedBottomBar,
                      {backgroundColor: focused ? colors.blue : colors.white},
                    ]}
                  />
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Screen3"
          component={Home}
          options={{
            title: 'Screen',
            headerShown: false,
            tabBarIcon: ({tintColor, focused}) => (
              <View
                style={{
                  flex: 1,

                  justifyContent: 'center',
                }}>
                <View style={styles.tabIconContainer}>
                  <Image
                    style={{width: ms(22), height: mvs(20)}}
                    resizeMode={'contain'}
                    source={
                      focused
                        ? imagePaths.ic_options_active
                        : imagePaths.ic_options_inactive
                    }
                  />
                  <View
                    style={[
                      styles.selectedBottomBar,
                      {backgroundColor: focused ? colors.blue : colors.white},
                    ]}
                  />
                </View>
              </View>
            ),
          }}
        /> */}
      </Tab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  tabBarStyle: {
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    height: mvs(88),
    paddingTop: Platform.OS == 'ios' ? mvs(15) : mvs(10),
    paddingHorizontal: 10,
    borderTopWidth: 3,

    borderTopColor: colors.lightBackground,

    elevation: 22,
    shadowColor: 'rgba(0,0,0,.32)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    zIndex: 999,
  },
  bottomImage: {
    width: ms(20.6),
    height: mvs(20.6),
    resizeMode: 'contain',
  },
  tabIconContainer: {
    // marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBottomBar: { height: mvs(2), width: ms(12), marginTop: mvs(9.7) },
});
