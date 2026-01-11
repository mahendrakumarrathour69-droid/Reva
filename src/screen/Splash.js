import React, {useEffect} from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

function Splash() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return <View style={{flex: 1}}></View>;
}
export default Splash;
