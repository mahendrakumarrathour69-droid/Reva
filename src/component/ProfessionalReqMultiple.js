import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  FlatList,
  Image,
} from 'react-native';
import {ms, mvs, s} from 'react-native-size-matters';
import RegisterScreen from '../screen/RegisterScreen';
import {colors} from '../utils/colors';
import {fonts} from '../utils/font';
import images from '../utils/images';
import {snackbarError} from '../utils/snackbar';
export default function ProfessionalReqMultiple(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);
  const [editable, setEditable] = useState('');
  const [subject, setSubject] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const refFlatList = useRef(null);
  const refSelectedList = useRef(null);
  const [updateList, setUpdateList] = useState(false);
  const [updateSelectedList, setUpdateSelectedList] = useState(false);
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [itemList, setItemList] = useState(props.itemList);
  console.log('list', list);
  useEffect(() => {}, [subject]);

  useEffect(() => {
    setList([]);
    setList(props.selectedProfeesionalExpList);
    setUpdateSelectedList(!updateSelectedList);
  }, [props.selectedProfeesionalExpList]);

  //   useEffect(() => {
  //     setList([]);
  //     setList(props.selectedExperieneceInList);
  //     setUpdateSelectedList(!updateSelectedList);
  //   }, [props.selectedExperieneceInList]);
  // useEffect(() => {
  //   setList([]);
  //   setList(props.selectedExpertiseInlist);
  //   setUpdateSelectedList(!updateSelectedList);
  // }, [props.selectedExpertiseInlist]);

  useEffect(() => {
    setSubject(props.selected);
    //setList([]);
    setEditable(props.edit);
    setPlaceholder(props.placeholder);
  }, []);

  // useEffect(() => {
  //   setList([])
  // }, [flag1])
  useEffect(() => {
    if (props.itemList.length <= 1) {
      setList([]);
    }
    setItemList(props.itemList);

    setUpdateList(!updateList);
  }, [props.itemList]);
  //Array blank
  // useEffect(() => {
  //   setList([]);
  // }, []);

  // delete item
  const listDelete = (index, item) => {
    list.map((item, indexs) => {
      if (index == indexs) {
        list.splice(indexs, 1);
        itemList.forEach((v, i) => {
          if (v.id == item.id) {
            v.isSelected = false;
          }
        });
      }
    });

    setList(list => [...list]);

    setUpdateSelectedList(!updateSelectedList);
    props.onUpdate(item, list);
  };

  const handleItemClick = (rowData, index) => {
    // setSubject(rowData.title);
    console.log('rowData', rowData);
    if (rowData.isSelected == false) {
      list.push(rowData);
    } else {
      list.forEach((v, i) => {
        if (v.id == rowData.id) {
          list.splice(i, 1);
        }
      });
    }
    setFlag(true);
    // itemList[index].isSelected = !itemList[index].isSelected;
    // itemList.forEach((v, i) => {
    //   v.isSelected = false;
    // });
    //itemList[index].isSelected = !itemList[index].isSelected;

    rowData.isSelected = !rowData.isSelected;
    setUpdateSelectedList(!updateSelectedList);
    //toggleOpen();

    props.onUpdate(rowData, list);
  };
  const toggleOpen = () => {
    if (itemList.length > 0) {
      setIsOpen(value => !value);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } else {
   //   snackbarError('No data found, please try after some time.');
        snackbarError('Carer do not have any professional experience');
    }
  };
  return (
    <>
      <View
        // onPress={() => {
        //   toggleOpen();
        // }}
        activeOpacity={0.5}
        style={{
          borderColor: colors.lightBackground,
          backgroundColor: colors.lightBackground,
          borderRadius: ms(6),
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: Platform.OS === 'android' ? ms(13) : ms(13),
          alignItems: 'center',
          marginTop: mvs(7),
        }}>
        {list != undefined && list.length > 0 ? (
          <FlatList
            style={{
              marginEnd: ms(10),
              height: mvs(25),
            }}
            ref={refSelectedList}
            showsHorizontalScrollIndicator={false}
            extraData={updateSelectedList}
            data={list}
            horizontal
            renderItem={({item: rowData, index}) => (
              // {
              //   console.log('index, title >>', index, rowData.title);
              // }
              <View
                // onPress={() => {
                //   handleItemClick(rowData, index);
                // }}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: ms(10),
                    paddingVertical: mvs(2),
                    backgroundColor: colors.green,
                    borderRadius: ms(20),
                    width: 100,
                    marginEnd: ms(10),
                  },
                ]}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      color: colors.white,
                      fontSize: s(12),
                      flex: 1,
                      marginHorizontal: ms(10),
                    }}
                    numberOfLines={1}>
                    {rowData.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      editable == false
                        ? snackbarError('Can’t change')
                        : listDelete(index, rowData)
                    }>
                    <Image
                      source={images.cross}
                      resizeMode="cover"
                      style={{
                        height: mvs(12),
                        width: mvs(12),

                        tintColor: colors.white,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              color:
                placeholder == subject.title ? colors.grey : colors.darkblue,
              fontSize: s(14),
              fontFamily: fonts.quicksandMedium,
            }}>
            {subject.title}
          </Text>
        )}
        <TouchableOpacity
       
          onPress={() =>
            editable == false ? snackbarError('Can’t change') : toggleOpen()
          }>
          <Image
            source={images.downArrow}
            style={{
              height: mvs(8),
              width: mvs(14.6),
              padding: ms(8),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      {/*Sub Clickable List View*/}
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        <FlatList
          showsVerticalScrollIndicator
          nestedScrollEnabled
          automaticallyAdjustContentInsets
          alwaysBounceVertical={true}
          style={{
            //flex: 1,
            maxHeight: mvs(140),
            height: 'auto',
            minHeight: mvs(-8),
            borderWidth: 1,
            //  padding: mvs(5),
            marginHorizontal: ms(2),
            marginTop: mvs(8),
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
                  height: mvs(35),
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: ms(5),
                  // borderRadius: ms(5),
                  backgroundColor: colors.lightBackground,
                  // backgroundColor:
                  //   index % 2 == 0 ? colors.white : colors.lightBackground,
                },
              ]}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'center', justifyContent: 'center'}}>
                  <Image
                    source={
                      rowData.isSelected == false
                        ? images.rectangleCheck
                        : images.fillrectanglecheck
                    }
                    style={{
                      height: mvs(16),
                      width: mvs(16),

                      resizeMode: 'contain',
                    }}></Image>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    color:
                      rowData.isSelected == false
                        ? colors.grey
                        : colors.darkblue,
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
