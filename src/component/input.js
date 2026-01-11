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
} from 'react-native';
import React, {useContext, useEffect, useState, useRef, Component} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import images from '../utils/images';
import {fonts} from '../utils/font';
import {colors} from '../utils/colors';
class Input extends Component {
  state = {
    hidePassword: true,
  };
  handleValidation(value) {
    
    const {pattern} = this.props;
    if (!pattern) return true;
    // string pattern, one validation rule
    if (typeof pattern === 'string') {
      const condition = new RegExp(pattern, 'g');
      return condition.test(value);
    }
    // array patterns, multiple validation rules
    if (typeof pattern === 'object') {
      const conditions = pattern.map(rule => new RegExp(rule, 'g'));
      return conditions.map(condition => condition.test(value));
    }
  }
  onChange(value) {
    const {onChangeText, onValidation} = this.props;
    const isValid = this.handleValidation(value);
    onValidation && onValidation(isValid);
    onChangeText && onChangeText(value);
  }
  render() {
    const {pattern, onChangeText, children,value, style, ...props} = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          padding: Platform.OS === 'android' ? ms(4) : ms(3),
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={style}
          onChangeText={value => this.onChange(value)}
          {...props}
          secureTextEntry={this.state.hidePassword}>
          {children}
        </TextInput>
        <TouchableOpacity
          onPress={() =>
            this.setState({hidePassword: !this.state.hidePassword})
          }
          style={{padding: Platform.OS === 'ios' ? ms(0) : ms(5)}}>
          <Image
            source={
              this.state.hidePassword == true ? images.eyeClose : images.eyeOpen
            }
            style={{
              height: mvs(12),
              width: mvs(18),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default Input;
