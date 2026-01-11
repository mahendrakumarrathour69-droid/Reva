import {View, Text} from 'react-native';
import React from 'react';
import CustomDrawers from './CustomDrawers';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screen/Home';
import BottomTab from './BottomTab';

const Drawer = createDrawerNavigator();
export default function DrawerComponent(props) {
  console.log("drawer props",props);
  console.log("drawer props?.route.params?.defaultIndex",props?.route.params?.defaultIndex);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawers {...props} />}
      screenOptions={{
        headerShown: false,
        // drawerWidth: Dimensions.get('window').width,
        drawerType: 'front',

        // drawerLabelStyle: {marginLeft: -20},
        drawerStyle: {
          width: '100%',
          backgroundColor: 'white',
          elevation: 5,
          // borderBottomEndRadius: moderateScale(60),
          // borderTopEndRadius: moderateScale(60),
        },
      }}>
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
       initialParams={{tab: props?.route.params?.defaultIndex}}
        options={{
          headerShown: false,
          
          props: props,
        }}
      />
    </Drawer.Navigator>
  );
}
