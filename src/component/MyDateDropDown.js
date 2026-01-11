import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import {ms, mvs, s} from 'react-native-size-matters';
import {colors} from '../utils/colors';
import {fonts} from '../utils/font';
import images from '../utils/images';
import {snackbarError} from '../utils/snackbar';
export default function MyDateDropDown(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (itemList.length > 0) {
      setIsOpen(value => !value);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    } else {
      snackbarError('No data found, please try after some time.');
    }
    // LayoutAnimation.configChecker(LayoutAnimation.Presets.spring);
  };
  useEffect(() => {}, []);
  const [subject, setSubject] = useState({});
  const [placeholder, setPlaceholder] = useState('');
  const [editable, setEditable] = useState('');

  const refFlatList = useRef(null);
  const [updateList, setUpdateList] = useState(false);
  const [flag, setFlag] = useState(false);

  const itemList = props.itemList;
  var selectedValue;
  useEffect(() => {
    setFlag(true);
    selectedValue = props.selected;
    setEditable(props.edit);
    setSubject(props.selected);
    setPlaceholder(props.placeholder);
  }, [props.selected]);

  const handleItemClick = (rowData, index) => {
    setSubject(rowData);
    setFlag(true);
    editable == false ? snackbarError('Can’t change') : toggleOpen();
    // rowData.isSelected=true;
    props.onUpdate(rowData);
  };

  return (
    <>
      {/* Main Clickable View */}
      {/* <TouchableOpacity
              style={styles.heading}
              onPress={() => {
                toggleOpen();
              }}>
              <TextInputComponent
                editable={false}
                refs={props.refs}
                style={{marginTop: mvs(20)}}
                keyboardType={'default'}
                title={'Subject'}
                returnKeyType={'next'}
                multiline={false}
                value={subject}
                onChangeText={text => setSubject(text)}
                iconStyle={
                  isOpen
                    ? {transform: [{rotate: '180deg'}]}
                    : {transform: [{rotate: '0deg'}]}
                }
                icon={require('../res/icons/down_arrow.png')}
              />
            </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          editable === false ? snackbarError('Can’t change') : toggleOpen();
        }}
        activeOpacity={0.5}
        style={{
          borderColor: colors.lightBackground,
          backgroundColor: colors.lightBackground,
          borderRadius: ms(6),
          height: Platform.OS == 'ios' ? mvs(45) : mvs(50),
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: Platform.OS === 'android' ? ms(13) : ms(13),
          alignItems: 'center',
          marginTop: mvs(7),
        }}>
        <Text
          style={{
            color: placeholder == subject.title ? colors.grey : colors.darkblue,
            fontSize: s(14),
            fontFamily: fonts.quicksandMedium,
          }}>
          {subject.title}
        </Text>
        <Image
          source={images.downArrow}
          style={{
            height: mvs(8),
            width: mvs(14.6),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      {/*Sub Clickable List View*/}
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        <FlatList
          showsVerticalScrollIndicator
          nestedScrollEnabled
          automaticallyAdjustContentInsets
          alwaysBounceVertical={true}
          style={{
            //  flex: 1,
            maxHeight: mvs(140),
            height: 'auto',
            minHeight: mvs(-8),
            borderWidth: 1,
            paddingTop: mvs(5),
            marginHorizontal: ms(2),
            marginTop: mvs(-5),
            borderColor: colors.lightBackground,
            borderRadius: ms(5),
          }}
          ref={refFlatList}
          extraData={updateList}
          data={itemList}
          renderItem={({item: rowData, index}) => (
            <TouchableOpacity
              onPress={() => {
                handleItemClick(rowData, index);
              }}
              style={[
                {
                  height: mvs(45),
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: ms(5),
                  borderRadius: ms(5),
                  backgroundColor:
                    index % 2 == 0 ? colors.white : colors.lightBackground80,
                },
              ]}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    color:
                      subject.title == rowData.title
                        ? colors.darkblue
                        : colors.grey,
                    fontSize: s(14),
                    flex: 1,
                    marginStart: ms(15),
                  }}
                  numberOfLines={1}>
                  {rowData.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
  },
});
