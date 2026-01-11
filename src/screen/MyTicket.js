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
  Keyboard,
  Modal,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import images from '../utils/images';
import {fonts} from '../utils/font';
import {colors} from '../utils/colors';
import MyDropDown from '../component/MyDropDown';
import ReadMore from '@fawazahmed/react-native-read-more';
import {useDispatch, useSelector} from 'react-redux';
import {GET_CREATE_TICKET} from '../utils/reducerConstant';
import {snackbarSuccess} from '../utils/snackbar';
import {userActionServices} from '../redux/userServices';
import moment from 'moment';
import { Image_URL } from '../utils/apiConstants';

const MyTicket = props => {
  const {navigation} = props;
  let id = props?.route?.params?.id;
  console.log('id>>>', id);
  const dispatch = useDispatch();
  const getCreateSupportTicketData = useSelector(
    state => state.getCreateSupportData,
  );
  const [title, setTitle] = useState('');
  const [ticketid, setTicketId] = useState('');
  const [date, setDate] = useState('');
 
  const [adminDate, setAdminDate] = useState(new Date());
  const [adminDes, setAdminDes] = useState('');
  const [status, setStatus] = useState('');
  const [des, setDes] = useState('');
  const [updateSubData, setUpdateSubData] = useState('');
  const [attachementData, setAttachementData] = useState([]);
  useEffect(() => {
    dispatch(userActionServices.getCreateSupportTicketAction(id));
  }, []);
  useEffect(() => {
    if (getCreateSupportTicketData.type === GET_CREATE_TICKET) {
      if (getCreateSupportTicketData?.value?.status) {
        if (
          Object.keys(getCreateSupportTicketData?.value).length != 0 &&
          getCreateSupportTicketData?.value != undefined
        ) {
          let ticket_data = getCreateSupportTicketData?.value?.data;
          console.log("ticket_data>>>>",ticket_data);
          console.log("ticket_data?.admin_response?.created_at>>>>",ticket_data?.admin_response?.created_at);
          setTitle(ticket_data?.user_response?.decline_reason_info?.reason);
          setTicketId(ticket_data?.user_response?.ticket_unq_id);
          setDate(ticket_data?.user_response?.created_at);
          setAdminDate(ticket_data?.admin_response?.created_at);
          setAdminDes(ticket_data?.admin_response?.details);
          setAttachementData(ticket_data?.user_response?.attach_info);
          setStatus(
            ticket_data?.user_response?.status == 0
              ? 'Pending'
              : ticket_data?.user_response?.status == 1
              ? 'In Progress'
              : ticket_data?.user_response?.status == 2
              ? 'Resolved'
              : 'Rejected',
          );
          setDes(ticket_data?.user_response?.details);

          snackbarSuccess(getCreateSupportTicketData?.value?.message);
        }
      } else {
      }
    }
  }, [getCreateSupportTicketData]);
  const picsItemRender = ({item, index, separators}) => {
    //if (index < 4)
    return (
      <View style={{marginEnd: 16, flex: 1}}>
        <View
          // onPress={() => selectedSubService(item, index)}
          style={{marginTop: 10}}>
          <Image
            style={{
              height: 82,
              width: 82,
              resizeMode: 'cover',
              borderRadius: 10,
            }}
            source={{uri:  Image_URL + item?.attachments}}
            // source={image === '' ? images.user_profile : { uri: item.uri }}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: ms(16),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 0.22,

            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'DrawerComponent',
                    params: {defaultIndex: 'MyBooking'},
                  },
                ],
              })
            }>
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
            My Tickets
          </Text>
        </View>
      </View>
      <View
        style={{
          marginVertical: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
      <View style={{marginHorizontal: 16, marginTop: 16}}>
        <View
          style={{
            borderWidth: 2,
            borderColor: colors.lightBackground,
            padding: 10,
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: fonts.quicksandMedium,
                color: colors.darkblue,
                flex: 1,
              }}>
              {title}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fonts.quicksandMedium,
                color: colors.primaryColor,
                textAlign: 'right',
                flex: 1,
              }}>
              Ticket ID:- {ticketid}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.quicksandBook,
                color: colors.grey,
                flex: 1,
              }}>
              {moment(date).format('MMM Do YYYY , h:mm A')}
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.green,
                borderRadius: 10,
                padding: 4,
                backgroundColor: colors.green,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.quicksandBook,
                  color: colors.white,
                  textAlign: 'right',
                }}>
                {status}
              </Text>
            </View>
          </View>
          <ReadMore
            numberOfLines={2}
            seeMoreText="Read more"
            seeLessText="Read less"
            seeLessStyle={{
              fontSize: s(14),
              color: colors.primaryColor,
              fontFamily: fonts.quicksandMedium,
            }}
            seeMoreStyle={{
              fontSize: s(14),
              color: colors.primaryColor,
              fontFamily: fonts.quicksandMedium,
            }}
            style={{
              fontSize: s(14),
              color: colors.blueLight,
              marginTop: mvs(10),
              fontFamily: fonts.quicksandBook,
            }}>
            {des}
          </ReadMore>
          {/* 


            <Image source={images.CahirPic}style={{height:60,width:60,marginVertical:10}} ></Image> */}

          {attachementData.length > 0 ? (
            <View
              style={{
                height: 100,
                marginHorizontal: 20,
              
              }}>
              <FlatList
                data={attachementData}
                style={{flex: 1, marginTop: 8}}
                scrollEnabled={true}
                //  numColumns={imageData.length >= 4 ? 4 : 0}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={picsItemRender}
                extraData={!updateSubData}
              />
            </View>
          ) : (
            <></>
          )}
        </View>


{ adminDate  ==undefined?
<></> :
<>
        <Text style={{fontSize:18,fontFamily:fonts.quicksandMedium,color:colors.darkblue,marginTop:20}}>Admin Response</Text>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
          <Image source={images.calenders} style={{height:21,width:18,resizeMode:'contain'}}></Image>

          <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.quicksandBook,
                color: colors.grey,
                marginLeft:10,
               
              }}>
              {moment(adminDate).format('MMM Do YYYY , h:mm A')}
            </Text>
        </View>
        <ReadMore
            numberOfLines={2}
            seeMoreText="Read more"
            seeLessText="Read less"
            seeLessStyle={{
              fontSize: s(14),
              color: colors.primaryColor,
              fontFamily: fonts.quicksandMedium,
            }}
            seeMoreStyle={{
              fontSize: s(14),
              color: colors.primaryColor,
              fontFamily: fonts.quicksandMedium,
            }}
            style={{
              fontSize: s(14),
              color: colors.blueLight,
              marginTop: mvs(10),
              fontFamily: fonts.quicksandBook,
            }}>
            {adminDes}
          </ReadMore>
          </>
}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default MyTicket;
