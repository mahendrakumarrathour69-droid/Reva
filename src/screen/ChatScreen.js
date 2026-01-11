// import React, {useEffect, useState, useRef, useContext} from 'react';
// import {
//   Text,
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   KeyboardAvoidingView,
//   ScrollView,
//   TextInput,
//   ActivityIndicator,
//   RefreshControl,
//   Platform,
//   SafeAreaView,
//   Keyboard,
// } from 'react-native';
// import {
//   declineServiceAgrements,
//   Image_URL,
//   SUCCESS,
// } from '../utils/apiConstants';
// import {s, vs, ms, mvs} from 'react-native-size-matters';
// import KeyboardManager from 'react-native-keyboard-manager';
// import images from '../utils/images';
// import {fonts} from '../utils/font';
// import {colors} from '../utils/colors';
// import moment from 'moment';
// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/firestore';
// import {ACCESS_TOKEN, TOKEN, USER_DATA} from '../utils/constant';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CryptoJS from 'react-native-crypto-js';
// import {db} from '../utils/firebaseConfig';
// import {hideLoader, showLoader} from '../component/AppLoader';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {snackbarError} from '../utils/snackbar';
// import ChatHeader from '../component/ChatHeader';
// import {snackbarSuccess} from '../utils/snackbar';
// import {userActionServices} from '../redux/userServices';
// import {useDispatch, useSelector} from 'react-redux';
// import { CHAT_BLOCK_REPORT_USER, REPORTUSER } from '../utils/reducerConstant';

// export function ChatScreen(props) {
//   const {navigation} = props;
//   const {carerData} = props?.route?.params;

//   //const { carerData, from: fromScreen } = props?.route?.params;
//   const [chatList, setChatList] = useState([]);

//   const [seekerData, setSeekerData] = useState('');

//   const [recieverCounter, setRecieveerCounter] = useState(0);
//   const [loader, setLoader] = useState(false);
//   const [stateData, setStateData] = useState(10);
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [isListRefreshing, setisListRefreshing] = useState(false);
//   const [message, setMessage] = useState('');
//   const [isBlockUser, setIsBlockUser] = useState(false);
//   const [blockUserID, setBlockUserID] = useState(0);
//   const [modalVisible, setModalVisible] = useState(false);
//   let preDate = '';
//   const scrollViewRef = useRef();

//   const dispatch = useDispatch();
//   const getUserBlock = useSelector(state => state.chat_block_report_user);
 

//   const report_userData = useSelector(state => state.report_user);
// console.log(
//   "report_userData>",report_userData
// );
//   if (Platform.OS === 'ios') {
//     KeyboardManager.setEnable(false);
//   }

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       if (Platform.OS === 'ios') {
//         KeyboardManager.setEnable(false);
//       }
//       dataFromFirebase();
//     });

//     return unsubscribe;
//   }, [navigation]);

//   useEffect(() => {
//     if (!seekerData?.id) return;

//     const chatID = chatID2(seekerData.id);
//     const blockStatusUnsubscribe = db
//       .collection('Chat')
//       .doc(chatID.toString())
//       .onSnapshot(snapshot => {
//         if (snapshot.exists) {
//           const blockuser = snapshot.get('isBlock');
//           const blockuserid = snapshot.get('IsBlockUserId');
//           setBlockUserID(blockuserid);
//           setIsBlockUser(blockuser && blockuserid === carerData?.id);
//         }
//       });

//     return () => blockStatusUnsubscribe();
//   }, [seekerData?.id, carerData?.id]);

//   useEffect(() => {
//     const formData = new FormData();
  
//     formData.append('report_to', seekerData?.id);
//     let body ={
//       "report_to": carerData?.id
// }
  
//     dispatch(userActionServices.chatBlockReportUserAction(body));
//   }, []);

//   useEffect(() => {
//     dataFromFirebase();
//   }, [stateData]);

//   const onChangeMessage = text => {
//     setMessage(text);
//   };

//   const dataFromFirebase = () => {
//     showLoader();
//     AsyncStorage.getItem(USER_DATA).then(data => {
//       let loginData = JSON.parse(data);
//       setSeekerData(loginData);

//       var chatID = chatID2(loginData.id);

//       db.collection('Chat')
//         .doc(chatID.toString())
//         .get()
//         .then(snapshot => {
//           if (snapshot.exists) {
//             const blockuser = snapshot.get('isBlock');
//             const blockuserid = snapshot.get('IsBlockUserId');
//             setBlockUserID(blockuserid);
//             setIsBlockUser(blockuser && blockuserid === carerData?.id);
//           }

//           const unsubscribe = db
//             .collection('Chat')
//             .doc(chatID.toString())
//             .collection('messages')
//             .orderBy('date', 'desc')
//             .limit(stateData)
//             .onSnapshot(
//               snapshot => {
//                 hideLoader();
//                 let msgData = [];
//                 snapshot.forEach(function (doc) {
//                   msgData.push(doc.data());
//                 });

//                 let msgArr = [];
//                 msgData.map(msgItem => {
//                   const decryptedMessage = CryptoJS.AES.decrypt(
//                     msgItem.message,
//                     'chatMessage',
//                   ).toString(CryptoJS.enc.Utf8);
//                   if (
//                     msgItem?.label !== 'blocked' &&
//                     msgItem?.label !== 'Unblocked'
//                   ) {
//                     msgArr.push({
//                       ...msgItem,
//                       message: JSON.parse(decryptedMessage),
//                     });
//                   }
//                 });

//                 updateFunction(msgArr);
//               },
//               error => {
//                 hideLoader();
//                 console.error('Error fetching messages:', error);
//               },
//             );

//           return () => unsubscribe();
//         });
//     });
//   };

//   function updateFunction(msgData) {
//     for (let pos = 0; pos < msgData.length; pos++) {
//       let mDate = msgData[pos].date;
//       let mValue = 0;
//       for (let index = 0; index < msgData.length; index++) {
//         const element = msgData[index];
//         if (mDate == element.date) {
//           mDate = element.date;
//           mValue++;
//         }
//         if (mValue == 2) {
//           msgData.splice(index, 1);
//         }
//       }
//     }
//     msgData.sort((a, b) => a.date - b.date);

//     setChatList(msgData);
//     setisListRefreshing(false);
//     setLoader(false);
//   }

//   const handleListRefresh = () => {
//     setisListRefreshing(true);
//     setStateData(stateData + 10);
//   };

//   useEffect(() => {
//     // get List data from reciever id
//     if (seekerData != '') {
//       if (carerData != '' && carerData != null) {
//         const unsubscribe = db
//           .collection('List')
//           .doc(carerData.id.toString())
//           .collection('userDetails')
//           .onSnapshot(snapshot => {
//             snapshot.docChanges().forEach(function (change) {
//               if (change.doc.data().reciverId === seekerData.id.toString()) {
//                 setRecieveerCounter(change.doc.data().count);
//               }
//             });
//           });

//         // set current user count 0
//         db.collection('List')
//           .doc(seekerData.id.toString())
//           .collection('userDetails')
//           .get()
//           .then(documentSnapshot => {
//             documentSnapshot.docs.forEach(function (change) {
//               if (change.id.toString() === carerData.id.toString()) {
//                 db.collection('List')
//                   .doc(seekerData.id.toString())
//                   .collection('userDetails')
//                   .doc(carerData.id.toString())
//                   .update({
//                     count: 0,
//                   });
//               }
//             });
//           });

//         return () => unsubscribe();
//       }
//     }
//   });

//   function chatID2(id) {
//     var currentUser = id;
//     var userReciever = carerData.id;
//     var chatIDpre = [];
//     chatIDpre.push(currentUser);
//     chatIDpre.push(userReciever);
//     chatIDpre.sort(function (a, b) {
//       return a - b;
//     });
//     return chatIDpre.join('_');
//   }

//   const callBlockUser = () => {
//     setModalVisible(false);
//     db.collection('Chat').doc(chatID2(seekerData?.id).toString()).set({
//       isBlock: true,
//       IsBlockUserId: carerData?.id,
//     });
//     setIsBlockUser(true);
//     db.collection('Chat')
//       .doc(chatID2(seekerData?.id).toString())
//       .collection('messages')
//       .doc(Date.now().toString())
//       .set({
//         label: 'blocked',
//         message: CryptoJS.AES.encrypt(
//           JSON.stringify('User has been blocked'),
//           'chatMessage',
//         ).toString(),
//         date: Date.now(),
//         senderId: seekerData?.id,
//         reciverId: Number(carerData?.id),
//       });
//       // let formData = new FormData();
//       // formData.append('report_to', carerData.id);
//       // formData.append('type', isBlockUser ? 'unblock' : 'block');
//       let body ={
//         "report_to": carerData?.id,
//         'type': isBlockUser ? 'unblock' : 'block'
//     }
//       dispatch(userActionServices.reportUserAction(body));
//    // snackbarSuccess('You blocked the user!');
//   };
//     useEffect(() => {
    
      
//       if (report_userData.type === REPORTUSER) {
//         if (report_userData?.value?.status) {
//           console.log("report_userData?.value?.status>>",report_userData?.value?.status);
//   apiCall()
//         }
       
         
//       }
//     }, [report_userData]);

//     useEffect(() => {
    
      
//       if (getUserBlock.type === CHAT_BLOCK_REPORT_USER) {
//         if (getUserBlock?.value?.status) {
//           console.log("report_userData?.value?.status>>",getUserBlock?.value?.status);
//   // apiCall()

//   setIsBlockUser(getUserBlock?.value?.data?.isBlock);
//         }
       
         
//       }
//     }, [getUserBlock]);
// const apiCall=()=>{
 
  
//   let body ={
//     "report_to": carerData?.id
// }
//   console.log('formdata for getIsUserBlockAction', body);
//   dispatch(userActionServices.chatBlockReportUserAction(body));

// }
//   const handleUserUnblocked = () => {
//     setModalVisible(false);
//     db.collection('Chat')
//       .doc(chatID2(seekerData?.id).toString())
//       .set({
//         isBlock: false,
//         IsBlockUserId: 0,
//       })
//       .then(() => {
//         setIsBlockUser(false);
//         dataFromFirebase();
//         snackbarSuccess('User has been unblocked!');
//       });
//       // let formData = new FormData();
//       // formData.append('report_to', carerData.id);
//       // formData.append('type', isBlockUser ? 'unblock' : 'block');
//       let body ={
//         "report_to": carerData?.id,
//         'type': isBlockUser ? 'unblock' : 'block'
//     }
//       dispatch(userActionServices.reportUserAction(body));
//       // dispatch(userActionServices.reportUserAction(formData));
//   };

//   const sendChat = () => {
//     if (isBlockUser) {
//       snackbarError('Cannot send message to blocked user');
//       return;
//     }

//     console.log('message', message);
//     Keyboard.dismiss();

//     if (/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.test(message)) {
//       snackbarError('email is not allowed');
//     } else if (
//       message.match(
//         /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/gim,
//       )
//     ) {
//       snackbarError('phone number is not allowed');
//     } else {
//       const encryptedMessage = CryptoJS.AES.encrypt(
//         JSON.stringify(message),
//         'chatMessage',
//       ).toString();
//       if (message.trim() != '') {
//         db.collection('Chat')
//           .doc(chatID2(seekerData.id).toString())
//           .collection('messages')
//           .doc(Date.now().toString())
//           .set({
//             message: encryptedMessage,
//             date: Date.now(),
//             senderId: seekerData.id,
//             reciverId: carerData.id,
//             senderName: seekerData.first_name,
//             recieverName: carerData?.name,
//             recieverTitle: carerData?.title == '' ? 'title' : carerData?.title,
//             // fromScreen === 'sponsor'
//             //   ? carerData.first_name + ' ' + carerData.last_name
//             //   : carerData.clinic_name,
//           });

//         // chat list of reciever id
//         db.collection('List')
//           .doc(carerData.id.toString())
//           .collection('userDetails')
//           .doc(seekerData.id.toString())
//           .set({
//             reciverId: seekerData.id.toString(),
//             recieverName: seekerData.first_name,
//             recieverTitle: carerData?.title == '' ? 'title' : carerData?.title,
//             message: encryptedMessage,
//             date: Date.now(),
//             profileImage: seekerData?.profile_image,
//             count: parseInt(recieverCounter) + 1,
//           });

//         // chat list db for sender id
//         db.collection('List')
//           .doc(seekerData.id.toString())
//           .collection('userDetails')
//           .doc(carerData.id.toString())
//           .set({
//             reciverId: carerData.id?.toString(),
//             recieverName: carerData?.name,
//             // fromScreen === 'sponsor'
//             //   ? carerData.first_name + ' ' + carerData.last_name
//             //   : carerData.clinic_name,
//             message: encryptedMessage,
//             recieverTitle: carerData?.title == '' ? 'title' : carerData?.title,
//             date: Date.now(),
//             profileImage: carerData.image,

//             count: 0,
//           });
//         setRecieveerCounter(recieverCounter + 1);
//         setMessage('');
//         dataFromFirebase();
//       }
//     }
//   };

//   function setData(item, index) {
//     var timestemp = new Date(item.date);
//     if (index === 0) {
//       preDate = item.date;
//       let currentDate = moment(new Date()).format('DD/MM/YYYY');
//       let msgDate = moment(preDate).format('DD/MM/YYYY');
//       if (currentDate === msgDate) {
//         return (
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <View
//               style={{
//                 height: mvs(1),
//                 flex: 1,
//                 backgroundColor: colors.lightBackground,
//               }}
//             />
//             <Text
//               style={{
//                 color: colors.blueopacity,
//                 fontFamily: fonts.quicksandMedium,
//                 marginHorizontal: ms(10),
//                 fontSize: 12,
//               }}>
//               Today
//             </Text>
//             <View
//               style={{
//                 height: mvs(1),
//                 flex: 1,
//                 backgroundColor: colors.lightBackground,
//               }}
//             />
//           </View>
//         );
//       } else {
//         return (
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <View
//               style={{
//                 height: mvs(1),
//                 flex: 1,
//                 backgroundColor: colors.lightBackground,
//               }}
//             />
//             <Text
//               style={{
//                 flex: 1,
//                 color: colors.blueopacity,
//                 fontFamily: fonts.quicksandMedium,
//                 textAlign: 'center',
//                 fontSize: 12,
//                 marginTop: 10,
//               }}>
//               {moment(timestemp).format('DD MMM YYYY')}
//             </Text>
//             <View
//               style={{
//                 height: mvs(1),
//                 flex: 1,
//                 backgroundColor: colors.lightBackground,
//               }}
//             />
//           </View>
//         );
//       }
//     } else {
//       if (
//         moment(preDate).format('DD MMM YYYY') !==
//         moment(item.date).format('DD MMM YYYY')
//       ) {
//         preDate = item.date;
//         let currentDate = moment(new Date()).format('DD/MM/YYYY');
//         let msgDate = moment(preDate).format('DD/MM/YYYY');
//         if (currentDate === msgDate) {
//           return (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <View
//                 style={{
//                   height: mvs(1),
//                   flex: 1,
//                   backgroundColor: colors.lightBackground,
//                 }}
//               />
//               <Text
//                 style={{
//                   color: colors.blueopacity,
//                   fontFamily: fonts.quicksandMedium,
//                   marginHorizontal: ms(10),
//                   fontSize: 12,
//                 }}>
//                 Today
//               </Text>
//               <View
//                 style={{
//                   height: mvs(1),
//                   flex: 1,
//                   backgroundColor: colors.lightBackground,
//                 }}
//               />
//             </View>
//           );
//         } else {
//           return (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <View
//                 style={{
//                   height: mvs(1),
//                   flex: 1,
//                   backgroundColor: colors.lightBackground,
//                 }}
//               />
//               <Text
//                 style={{
//                   flex: 1,
//                   color: colors.blueopacity,
//                   fontFamily: fonts.quicksandMedium,
//                   textAlign: 'center',
//                   fontSize: 12,
//                   marginTop: 10,
//                 }}>
//                 {moment(new Date(item.date)).format('DD MMM YYYY')}
//               </Text>
//               <View
//                 style={{
//                   height: mvs(1),
//                   flex: 1,
//                   backgroundColor: colors.lightBackground,
//                 }}
//               />
//             </View>
//           );
//         }
//       }
//     }
//   }

//   const renderChatList = ({item, index}) => {
//     var timestemp = new Date(item.date);
//     return (
//       <View
//         style={{
//           flex: 1,
//           marginHorizontal: 20,
//           marginTop: 10,
//         }}>
//         {setData(item, index)}
//         {item.reciverId === seekerData.id ? (
//           <View
//             style={{
//               flexDirection: 'row',
//               marginEnd: '20%',
//               marginTop: 20,
//               flex: 1,
//               marginEnd: 20,
//             }}>
//             <View style={{marginEnd: 60}}>
//               <View
//                 style={{
//                   backgroundColor: colors.green,
//                   padding: 10,
//                   justifyContent: 'center',
//                   borderRadius: 15,
//                   borderBottomLeftRadius: 0,
//                   shadowColor: '#000',
//                   shadowOffset: {width: 0, height: 1},
//                   shadowOpacity: 0.2,
//                   shadowRadius: 2,
//                   elevation: 5,
//                 }}>
//                 <Text
//                   style={{
//                     color: colors.white,
//                     fontSize: s(20),
//                     fontFamily: fonts.quicksandMedium,
//                     marginTop: mvs(5),
//                     textAlign: 'left',
//                   }}>
//                   {item.message}
//                 </Text>
//                 <Text
//                   style={{
//                     color: colors.white,
//                     fontFamily: fonts.quicksandMedium,
//                     fontSize: s(14),
//                     marginTop: mvs(10),
//                   }}>
//                   {moment(timestemp).format('hh:mm a')}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         ) : (
//           <View
//             style={{
//               flex: 1,
//               alignItems: 'flex-end',
//               marginTop: 20,
//               marginStart: 10,
//             }}>
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: 'row',
//                 justifyContent: 'flex-end',
//                 marginStart: 60,
//               }}>
//               <View style={{alignItems: 'flex-end'}}>
//                 <View
//                   style={{
//                     backgroundColor: colors.lightBackground,
//                     borderBottomEndRadius: 0,
//                     borderRadius: 15,
//                     padding: mvs(10),
//                     justifyContent: 'center',
//                     shadowColor: '#000',
//                     shadowOffset: {width: 0, height: 1},
//                     shadowOpacity: 0.2,
//                     shadowRadius: 2,
//                     elevation: 5,
//                   }}>
//                   <Text
//                     style={{
//                       color: colors.darkblue,
//                       fontSize: s(20),
//                       fontFamily: fonts.quicksandMedium,
//                       textAlign: 'left',
//                       marginTop: mvs(5),
//                     }}>
//                     {item.message}
//                   </Text>
//                   <Text
//                     style={{
//                       color: colors.grey,
//                       fontFamily: fonts.quicksandMedium,
//                       fontSize: s(14),
//                       alignSelf: 'flex-end',
//                       marginTop: 10,
//                     }}>
//                     {moment(timestemp).format('hh:mm a')}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         console.log('open');
//         scrollViewRef?.current?.scrollToEnd({animated: true});
//         setKeyboardVisible(true); // or some other action
//       },
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         console.log('close');
//         setKeyboardVisible(false); // or some other action
//       },
//     );
//     return () => {
//       keyboardDidHideListener.remove();
//       keyboardDidShowListener.remove();
//     };
//   }, []);

//   return (
//     <SafeAreaView style={styles.mainContainer}>
//       {getUserBlock?.value?.data?.isBan ? (
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: colors.white,
//           }}>
//           <Text
//             style={{
//               fontSize: 15,
//               color: colors.darkblue,
//               fontFamily: fonts.quicksandMedium,
//               marginBottom: 10,
//               padding: 10,
//             }}>
//             This Conversation has been blocked by admin.
//           </Text>
//           <Text
//             style={{
//               fontSize: 14,
//               color: colors.grey,
//               fontFamily: fonts.quicksandMedium,
//               textAlign: 'center',
//               marginHorizontal: 20,
//             }}>
//             Contact customer care for more support.
//           </Text>
//         </View>
//       ) : (
//         <>
//           <ChatHeader
//             navigation={{navigation}}
//             carerData={{carerData}}
//             seekerData={{seekerData}}
//             isBlockUser={isBlockUser}
//             onBlockUser={callBlockUser}
//             onUnblockUser={handleUserUnblocked}
//             apiCall={apiCall}
//           />
//           <View
//             style={{
//               marginVertical: mvs(2),
//               borderBottomWidth: 3,
//               borderColor: colors.lightBackground,
//             }}></View>

//           <KeyboardAvoidingView
//             style={{flex: 1}}
//             behavior={Platform.OS == 'ios' ? 'height' : 'padding'}
//             keyboardVerticalOffset={Platform.OS == 'ios' ? 80 : 0}
//             enabled={Platform.OS === 'ios' ? true : false}>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: colors.white,
//                 marginTop: 20,
//                 borderTopStartRadius: 20,
//                 borderTopEndRadius: 20,
//               }}>
//               <View
//                 style={{
//                   flex: 1,
//                   marginBottom: 10,
//                   paddingVertical: 10,
//                 }}>
//                 {!loader ? (
//                   chatList.length > 0 ? (
//                     <ScrollView
//                       showsVerticalScrollIndicator={false}
//                       bounces={false}
//                       keyboardShouldPersistTaps={'always'}
//                       ref={scrollViewRef}
//                       refreshControl={
//                         <RefreshControl
//                           refreshing={isListRefreshing}
//                           onRefresh={handleListRefresh}
//                         />
//                       }
//                       onContentSizeChange={() =>
//                         scrollViewRef?.current?.scrollToEnd({animated: true})
//                       }>
//                       <FlatList
//                         data={chatList}
//                         renderItem={renderChatList}
//                         keyExtractor={(item, index) => index}
//                       />
//                     </ScrollView>
//                   ) : (
//                     <></>
//                   )
//                 ) : (
//                   <View
//                     style={{
//                       flex: 1,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <ActivityIndicator size="large" color="black" />
//                   </View>
//                 )}
//               </View>
//             </View>
//             <View
//               style={{
//                 marginVertical: mvs(2),
//                 borderBottomWidth: 3,
//                 borderColor: colors.lightBackground,
//               }}></View>
//             {/* <View
//           style={{
//             backgroundColor: colors.white,
//             flexDirection: 'row',
//             alignItems: 'center',

//             padding: ms(15),
//           }}>
//           <View
//             style={{
//               backgroundColor: colors.lightBackground,
//               borderRadius: ms(40),
//               borderWidth: 1,
//               borderColor: colors.lightBackground,
//               flex: 1,
//               height: 50,
//               padding: 2,
//               marginHorizontal: ms(10),
//             }}>
//             <TextInput
//               placeholder="Type here....."
//               placeholderTextColor={colors.blueLight}
//               selectionColor={colors.texta0}
//               value={message}
//               onChangeText={onChangeMessage}
//               style={{
//                 fontSize: 14,
//                 paddingEnd: 10,
//                 paddingStart: 10,

//                 fontFamily: fonts.quicksandMedium,
//                 color: colors.black,
//               }}
//             />
//           </View>
//           <TouchableOpacity onPress={() => sendChat()}>
//             <Image
//               style={{ height: 46, width: 46 }}
//               resizeMode="cover"
//               source={images.sendMessage}
//             />
//           </TouchableOpacity>
//         </View> */}
//             {isBlockUser ||
//             getUserBlock?.value?.data?.isBlock ||
//             getUserBlock?.value?.data?.blockFromOther ? (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   backgroundColor: colors.white,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   zIndex: 1000,
//                 }}>
//                 {/* <Text
//               style={{
//                 fontSize: 24,
//                 color: colors.darkblue,
//                 fontFamily: fonts.quicksandMedium,
//                 marginBottom: 10,
//               }}>
//               No mutual conversation
//             </Text> */}
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: colors.grey,
//                     fontFamily: fonts.quicksandMedium,
//                     textAlign: 'center',
//                     marginHorizontal: 20,
//                   }}>
//                   You are no longer able to chat with this user
//                 </Text>
//               </View>
//             ) : (
//               <View>
//                 <View
//                   style={{
//                     backgroundColor: colors.white,
//                     flexDirection: 'row',
//                     padding: ms(15),
//                   }}>
//                   <View
//                     style={{
//                       backgroundColor: colors.lightBackground,
//                       borderRadius: ms(40),
//                       borderWidth: 1,
//                       borderColor: colors.lightBackground,
//                       flex: 1,
//                       height: 50,
//                       marginHorizontal: ms(10),
//                     }}>
//                     <TextInput
//                       placeholder="Type here....."
//                       placeholderTextColor={colors.grey}
//                       selectionColor={colors.grey}
//                       value={message}
//                       onChangeText={onChangeMessage}
//                       style={{
//                         fontSize: 14,
//                         paddingEnd: 10,
//                         paddingStart: 10,
//                         fontFamily: fonts.quicksandMedium,
//                         color: colors.black,
//                         marginLeft: 10,
//                         flex: 1,
//                       }}
//                     />
//                   </View>
//                   <TouchableOpacity onPress={() => sendChat()}>
//                     <Image
//                       style={{height: 46, width: 46}}
//                       resizeMode="cover"
//                       source={images.sendMessage}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           </KeyboardAvoidingView>
//         </>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   blockedContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   blockedInnerContainer: {
//     backgroundColor: '#F8F8F8',
//     borderRadius: 12,
//     padding: 20,
//     width: '100%',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   blockedIcon: {
//     fontSize: 40,
//     marginBottom: 10,
//   },
//   blockedText: {
//     fontFamily: fonts.quicksandMedium,
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   mainContainer: {flex: 1, backgroundColor: colors.white},
//   headerContainer: {
//     marginTop: Platform.OS === 'android' ? 33 : 60,
//     marginHorizontal: 22,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerTxt: {
//     fontFamily: fonts.quicksandMedium,
//     fontSize: 26,
//     textAlign: 'center',
//     lineHeight: 32,
//     color: '#356aa0',
//   },
//   backButtonImg: {
//     width: 60,
//     height: 27,
//     resizeMode: 'contain',
//   },
//   userIcon: {height: 60, width: 60, borderRadius: 40},
// });
// // import {View, Text} from 'react-native';
// // import React from 'react';

// // export default function ChatScreen() {
// //   return (
// //     <View>
// //       <Text>ChatScreen</Text>
// //     </View>
// //   );
// // }
import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Platform,
  SafeAreaView,
  Keyboard,
  Modal,
  ToastAndroid,
} from 'react-native';
import {
  declineServiceAgrements,
  Image_URL,
  SUCCESS,
} from '../utils/apiConstants';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import KeyboardManager from 'react-native-keyboard-manager';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import moment from 'moment';

import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'react-native-crypto-js';
import { db } from '../utils/firebaseConfig';
import { hideLoader, showLoader } from '../component/AppLoader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { snackbarError, snackbarSuccess } from '../utils/snackbar';

import {useDispatch, useSelector} from 'react-redux';
import {sendFbNotification, userActionServices} from '../redux/userServices';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import ImageCropPicker from 'react-native-image-crop-picker';
import {CHAT_BLOCK_REPORT_USER, OFFERDECLINEREASONS, REPORTUSER} from '../utils/reducerConstant';
import MyDropDown from '../component/MyDropDown';
export function ChatScreen(props) {
  const { navigation } = props;
  const { carerData } = props?.route?.params;
  console.log("carer user data ===>>>", carerData)
  //const { carerData, from: fromScreen } = props?.route?.params;
  const [chatList, setChatList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [seekerData, setSeekerData] = useState('');
  console.log("seekerData", seekerData.first_name)
  const [recieverCounter, setRecieveerCounter] = useState(0);
  const [loader, setLoader] = useState(false);
  const [stateData, setStateData] = useState(10);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isListRefreshing, setisListRefreshing] = useState(false);
  const [message, setMessage] = useState('');
     const [isBlockUser, setIsBlockUser] = useState(false);
     console.log("isBlockUser>>",isBlockUser);
     
   const [blockUserID, setBlockUserID] = useState(0);
  let preDate = '';
  const scrollViewRef = useRef();
    const dispatch = useDispatch();
  
    const [carerReasonTitle, setCarerReasonTitle] = useState({
      id: -1,
      title: 'Select Reason',
    });
    const [ticketDetail, setTicketDetail] = useState('');
    const [attachementFiles, setAttachementFiles] = useState([]);
    const [imageName, setImageName] = useState('');
    const [carerReasonTitlesList, setcarerReasonTitlesList] = useState([]);
    const [updateSubData, setUpdateSubData] = useState('');
   const getUserBlock = useSelector(state => state.chat_block_report_user);
 

  const report_userData = useSelector(state => state.report_user);
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(false);
  }
const offerDeclineReasonData = useSelector(
  state => state.offerDeclineReasonData,
);
  useEffect(() => {
    let declineBody = {
      type: 13,
    };
    dispatch(userActionServices.offerDeclineReasons(declineBody));
  }, []);

  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    // Check Firebase connection when the screen is mounted
    const checkFirebaseConnection = async () => {
      try {
        // Firebase Firestore simple read to check connection
        const testRef = firestore().collection('Test').doc('ConnectionTest');
        await testRef.get();

         setIsConnected(true); // Connection successful
        console.log("Firebase connected");
      } catch (error) {
        setIsConnected(false); // Connection failed
        console.error("Error checking Firebase connection: ", error);
      }
    };

    checkFirebaseConnection();
  }, []); 

  useEffect(() => {
    if (offerDeclineReasonData.type === OFFERDECLINEREASONS) {
      if (offerDeclineReasonData?.value?.status) {
        if (
          Object.keys(offerDeclineReasonData?.value).length != 0 &&
          offerDeclineReasonData?.value != undefined
        ) {
          let otherId=0
          
          offerDeclineReasonData.value.data.map((v, i) => {
            
            let temp = {
              id: v.id,
              title: v.reason,
            };
            console.log("vvvvv",v);
            
if(v.reason!='Other'){
  carerReasonTitlesList.push(temp);
}else{
  otherId=v?.id
}

         
          });
          let tempData = {
            id: otherId,
            title: 'Other',
          };
          console.log("tempData>>>",tempData);
          
          carerReasonTitlesList.push(tempData);
          

          dispatch(userActionServices.resetData());
        }
      }
    }

    else {
    }
  }, [offerDeclineReasonData]);

  console.log("carerReasonTitlesList>>>",carerReasonTitlesList);
  
  useEffect(() => {
    let body ={
      "report_to": carerData?.id
}
    dispatch(userActionServices.chatBlockReportUserAction(body));
  }, []);
  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
    }).then(images => {
      console.log('images', images);
      setAttachementFiles([images]);
      setImageName([images.filename || images.path.split('/').pop()]);
    });
  };

  const picsItemRender = ({item, index}) => {
    return (
      <View style={{marginEnd: 16, flex: 1}}>
        <View style={{marginTop: 10}}>
          <Image
            style={{
              height: 82,
              width: 82,
              resizeMode: 'cover',
              borderRadius: 10,
            }}
            source={{uri: item.path}}
          />
        </View>
      </View>
    );
  };

  const handleReport = async () => {
    try {
      if (carerReasonTitle.id === -1) {
        throw new Error('Please select a reason');
      }
      if (!ticketDetail) {
        throw new Error('Please enter report detail');
      }

      let formData = new FormData();
      formData.append('report_to', carerData.id);
      formData.append('type', 'report');
      formData.append('reason_id', carerReasonTitle.id);
      formData.append('reason', ticketDetail);
      console.log('formData---->', formData);

      if (attachementFiles.length > 0) {
        attachementFiles.forEach((file, index) => {
          formData.append(`attachments[${index}]`, {
            uri: file.path,
            type: file.mime,
            name: `image${index}.jpg`,
          });
        });
      }
      console.log("formData>>",formData);
      
dispatch(
        userActionServices.reportUserAction(formData),
      );
    showLoader()

      setModal3Visible(false);
      setModalVisible(false);
      setTicketDetail('');
      setAttachementFiles([]);
      setImageName('')
      setCarerReasonTitle({id: -1, title: 'Select Reason'});
      // snackbarSuccess('Support ticket created successfully');
    } catch (error) {
      console.error('Error creating support ticket:', error);
      snackbarError(
        error.message || 'Failed to create support ticket. Please try again.',
      );
    }
  };
    // useEffect(() => {
    //   console.log("report_userData>>",report_userData);
      
    //   if (report_userData.type === REPORTUSER) {
    //     if (report_userData?.value?.status) {
    //       console.log("amanamn");
    //       setTimeout(() => {
    //         snackbarSuccess("User Chat Report Saved Successfully'")
    //       }, 300);
     
    //     // ToastAndroid('User Chat Report Saved Successfully')
  
    //     }
       
         
    //   }
    // }, [report_userData]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dataFromFirebase();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    dataFromFirebase();
  }, [stateData]);

  const onChangeMessage = text => {
    setMessage(text);
  };

  const dataFromFirebase = () => {
  
    console.log('carerData.id', carerData.id);
    AsyncStorage.getItem(USER_DATA).then(data => {
      console.log("amanamana", data)
      console.log('datadatadata', data);
      let loginData = JSON.parse(data);
      console.log('loginData.id', loginData);
      setSeekerData(loginData);

      var chatID = chatID2(loginData.id);
      var msgData = [];
      db.collection('Chat')
        .doc(chatID.toString())
        .collection('messages')
        .orderBy('date', 'desc')
        .limit(stateData)
        .onSnapshot(snapshot => {
          hideLoader();
          snapshot.docChanges().forEach(function (change) {
            msgData.push(change.doc.data());
          });

          console.log('msgData', msgData);
          let msgArr = [];
          msgData.map(msgItem => {
            const decryptedMessage = CryptoJS.AES.decrypt(
              msgItem.message,
              'chatMessage',
            ).toString(CryptoJS.enc.Utf8);

            console.log('decryptedMessage', decryptedMessage);

            msgArr.push({
              ...msgItem,
              message: JSON.parse(decryptedMessage),
              // message: msgItem.message,
            });
          });

          updateFunction(msgArr);
        });

      // set current user count 0
      db.collection('List')
        .doc(loginData.id.toString())
        .collection('userDetails')
        .get()
        .then(documentSnapshot => {
          documentSnapshot.docs.forEach(function (change) {
            if (change.id === carerData.id.toString()) {
              db.collection('List')
                .doc(loginData.id.toString())
                .collection('userDetails')
                .doc(carerData.id.toString())
                .update({
                  count: 0,
                });
            }
          });
        });
    });
  };

  function updateFunction(msgData) {
    for (let pos = 0; pos < msgData.length; pos++) {
      let mDate = msgData[pos].date;
      let mValue = 0;
      for (let index = 0; index < msgData.length; index++) {
        const element = msgData[index];
        if (mDate == element.date) {
          mDate = element.date;
          mValue++;
        }
        if (mValue == 2) {
          msgData.splice(index, 1);
        }
      }
    }
    msgData.sort((a, b) => a.date - b.date);

    setChatList(msgData);
    setisListRefreshing(false);
    setLoader(false);
  }

  const handleListRefresh = () => {
    setisListRefreshing(true);
    setStateData(stateData + 10);
  };

  useEffect(() => {
    // get List data from reciever id
    if (seekerData != '') {
      if (carerData != '' && carerData != null) {
        db.collection('List')
          .doc(carerData.id.toString())
          .collection('userDetails')
          .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(function (change) {
              if (change.doc.data().reciverId === seekerData.id.toString()) {
                setRecieveerCounter(change.doc.data().count);
              }
            });
          });

        // set current user count 0
        db.collection('List')
          .doc(seekerData.id.toString())
          .collection('userDetails')
          .get()
          .then(documentSnapshot => {
            documentSnapshot.docs.forEach(function (change) {
              if (change.id.toString() === carerData.id.toString()) {
                db.collection('List')
                  .doc(seekerData.id.toString())
                  .collection('userDetails')
                  .doc(carerData.id.toString())
                  .update({
                    count: 0,
                  });
              }
            });
          });
      }
    }
  });

  function chatID2(id) {
    var currentUser = id;
    var userReciever = carerData.id;
    var chatIDpre = [];
    chatIDpre.push(currentUser);
    chatIDpre.push(userReciever);
    chatIDpre.sort(function (a, b) {
      return a - b;
    });
    return chatIDpre.join('_');
  }

  // const sendNotification = () => {
  //   AsyncStorage.getItem(USER_DATA).then(data => {
  //     let loginData = JSON.parse(data);
  //     const ref = db.collection('List').doc(receiverData?.id.toString());
  //     ref.get().then(snapshot => {
  //       const token = snapshot.get('fcm_token');
  //       console.log('token >>>', token);
  //       sendFbNotification(token, {
  //         sender_name: senderData.name,
  //         message: message,
  //       });
  //     });
  //   });
  // };

  const sendNotification = () => {
    AsyncStorage.getItem(USER_DATA).then(data => {
      let loginData = JSON.parse(data);
      const ref = db.collection('List').doc(carerData?.id.toString());
      console.log("ref>>",ref);
      
      ref.get().then(snapshot => {
        const token = snapshot.get('fcm_token');
        console.log('token >>>', token);
        sendFbNotification(token, {
          sender_name: seekerData.name,
          message: message,
        });
      });
    });
  };
  const sendChat =async () => {
    console.log('message', message);
    Keyboard.dismiss();

    if(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.test(message)){
     
      snackbarError("email is not allowed");
        
    }else if(message.match(/(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/img)){
      snackbarError("phone number is not allowed");
    }else
 
    
    {
    const encryptedMessage = CryptoJS.AES.encrypt(
      JSON.stringify(message),
      'chatMessage',
    ).toString();
    if (message.trim() != '') {


      db.collection('Chat')
        .doc(chatID2(seekerData.id).toString())
        .collection('messages')
        .doc(Date.now().toString())
        .set({
          message: encryptedMessage,
          date: Date.now(),
          senderId: seekerData.id,
          reciverId: carerData.id,
          senderName: seekerData.first_name,
          recieverName: carerData?.name,
          recieverTitle: carerData?.title == '' ? "title" : carerData?.title,
          // fromScreen === 'sponsor'
          //   ? carerData.first_name + ' ' + carerData.last_name
          //   : carerData.clinic_name,
        });

      // chat list of reciever id
    db.collection('List')
        .doc(carerData.id.toString())
        .collection('userDetails')
        .doc(seekerData.id.toString())
        .set({
          reciverId: seekerData.id.toString(),
          recieverName: seekerData.first_name,
          recieverTitle: carerData?.title == '' ? "title" : carerData?.title,
          message: encryptedMessage,
          date: Date.now(),
          profileImage: seekerData?.profile_image,
          count: parseInt(recieverCounter) + 1,
        });

      // chat list db for sender id
    db.collection('List')
        .doc(seekerData.id.toString())
        .collection('userDetails')
        .doc(carerData.id.toString())
        .set({
          reciverId: carerData.id?.toString(),
          recieverName: carerData?.name,
          // fromScreen === 'sponsor'
          //   ? carerData.first_name + ' ' + carerData.last_name
          //   : carerData.clinic_name,
          message: encryptedMessage,
          recieverTitle: carerData?.title == '' ? "title" : carerData?.title,
          date: Date.now(),
          profileImage: carerData.image,

          count: 0,
        });
      setRecieveerCounter(recieverCounter + 1);
      setMessage('');
      dataFromFirebase()
    }
  
  }
  };
  function setData(item, index) {
    var timestemp = new Date(item.date);
    if (index === 0) {
      preDate = item.date;
      let currentDate = moment(new Date()).format('DD/MM/YYYY');
      let msgDate = moment(preDate).format('DD/MM/YYYY');
      if (currentDate === msgDate) {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: mvs(1),
                flex: 1,
                backgroundColor: colors.lightBackground,
              }}
            />
            <Text
              style={{
                color: colors.blueopacity,
                fontFamily: fonts.quicksandMedium,
                marginHorizontal: ms(10),
                fontSize: 12,
              }}>
              Today
            </Text>
            <View
              style={{
                height: mvs(1),
                flex: 1,
                backgroundColor: colors.lightBackground,
              }}
            />
          </View>
        );
      } else {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: mvs(1),
                flex: 1,
                backgroundColor: colors.lightBackground,
              }}
            />
            <Text
              style={{
                flex: 1,
                color: colors.blueopacity,
                fontFamily: fonts.quicksandMedium,
                textAlign: 'center',
                fontSize: 12,
                marginTop: 10,
              }}>
              {moment(timestemp).format('DD MMM YYYY')}
            </Text>
            <View
              style={{
                height: mvs(1),
                flex: 1,
                backgroundColor: colors.lightBackground,
              }}
            />
          </View>
        );
      }
    } else {
      if (
        moment(preDate).format('DD MMM YYYY') !==
        moment(item.date).format('DD MMM YYYY')
      ) {
        preDate = item.date;
        let currentDate = moment(new Date()).format('DD/MM/YYYY');
        let msgDate = moment(preDate).format('DD/MM/YYYY');
        if (currentDate === msgDate) {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: mvs(1),
                  flex: 1,
                  backgroundColor: colors.lightBackground,
                }}
              />
              <Text
                style={{
                  color: colors.blueopacity,
                  fontFamily: fonts.quicksandMedium,
                  marginHorizontal: ms(10),
                  fontSize: 12,
                }}>
                Today
              </Text>
              <View
                style={{
                  height: mvs(1),
                  flex: 1,
                  backgroundColor: colors.lightBackground,
                }}
              />
            </View>
          );
        } else {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: mvs(1),
                  flex: 1,
                  backgroundColor: colors.lightBackground,
                }}
              />
              <Text
                style={{
                  flex: 1,
                  color: colors.blueopacity,
                  fontFamily: fonts.quicksandMedium,
                  textAlign: 'center',
                  fontSize: 12,
                  marginTop: 10,
                }}>
                {moment(new Date(item.date)).format('DD MMM YYYY')}
              </Text>
              <View
                style={{
                  height: mvs(1),
                  flex: 1,
                  backgroundColor: colors.lightBackground,
                }}
              />
            </View>
          );
        }
      }
    }
  }

  const renderChatList = ({ item, index }) => {
    var timestemp = new Date(item.date);
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        {setData(item, index)}
        {item.reciverId == seekerData.id ? (
          <View
            style={{
              flexDirection: 'row',
              marginEnd: '20%',
              marginTop: 20,
              flex: 1,
              marginEnd: 20,
            }}>
            <View style={{ marginEnd: 60 }}>
              <View
                style={{
                  backgroundColor: colors.green,
                  padding: 10,
                  justifyContent: 'center',
                  borderRadius: 15,
                  borderBottomLeftRadius: 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 5,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: s(20),
                    fontFamily: fonts.quicksandMedium,
                    marginTop: mvs(5),
                    textAlign: 'left',
                  }}>
                  {item.message}
                </Text>
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    marginTop: mvs(10),
                  }}>
                  {moment(timestemp).format('hh:mm a')}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              marginTop: 20,
              marginStart: 10,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginStart: 60,
              }}>
              <View style={{ alignItems: 'flex-end' }}>
                <View
                  style={{
                    backgroundColor: colors.lightBackground,
                    borderBottomEndRadius: 0,
                    borderRadius: 15,
                    padding: mvs(10),
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 5,
                  }}>
                  <Text
                    style={{
                      color: colors.darkblue,
                      fontSize: s(20),
                      fontFamily: fonts.quicksandMedium,
                      textAlign: 'left',
                      marginTop: mvs(5)
                    }}>
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: colors.grey,
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(14),
                      alignSelf: 'flex-end',
                      marginTop: 10,
                    }}>
                    {moment(timestemp).format('hh:mm a')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };


  const callBlockUser = () => {
    setModalVisible(false);
    db.collection('Chat').doc(chatID2(seekerData?.id).toString()).set({
      isBlock: true,
      IsBlockUserId: carerData?.id,
    });
    setIsBlockUser(true);
    // db.collection('Chat')
    //   .doc(chatID2(seekerData?.id).toString())
    //   .collection('messages')
    //   .doc(Date.now().toString())
    //   .set({
    //     label: 'blocked',
    //     message: CryptoJS.AES.encrypt(
    //       JSON.stringify('User has been blocked'),
    //       'chatMessage',
    //     ).toString(),
    //     date: Date.now(),
    //     senderId: seekerData?.id,
    //     reciverId: Number(carerData?.id),
    //   });
      // let formData = new FormData();
      // formData.append('report_to', carerData.id);
      // formData.append('type', isBlockUser ? 'unblock' : 'block');
      let body ={
        "report_to": carerData?.id,
        'type': isBlockUser ? 'unblock' : 'block'
    }
      dispatch(userActionServices.reportUserAction(body));
   // snackbarSuccess('You blocked the user!');
  };
    useEffect(() => {
    
      hideLoader()
      if (report_userData.type === REPORTUSER) {
        if (report_userData?.value?.status) {
          console.log("amanman");
          console.log("report_userData?.value?.message");
          console.log("report_userData?.value?.message",report_userData?.value?.message);
          
          console.log("report_userData?.value?.status>>",report_userData?.value?.status);
          if(Platform.OS=='ios'){
            snackbarSuccess(report_userData?.value?.message)
          }else{
            ToastAndroid.showWithGravity(
              report_userData?.value?.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          // ToastAndroid.showWithGravity(
          //   report_userData?.value?.message,
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER,
          // );
          

apiCall()
        }
       
         
      }
    }, [report_userData]);

    useEffect(() => {
    
      hideLoader()
      if (getUserBlock.type === CHAT_BLOCK_REPORT_USER) {
        if (getUserBlock?.value?.status) {
          console.log("report_userData?.value?.status>>",getUserBlock?.value?.status);
  // apiCall()

  setIsBlockUser(getUserBlock?.value?.data?.isBlock);
        }
       
         
      }
    }, [getUserBlock]);
const apiCall=()=>{
 
  hideLoader()
  let body ={
    "report_to": carerData?.id
}
  console.log('formdata for getIsUserBlockAction', body);
  dispatch(userActionServices.chatBlockReportUserAction(body));

}
  const handleUserUnblocked = () => {
    setModalVisible(false);
    db.collection('Chat')
      .doc(chatID2(seekerData?.id).toString())
      .set({
        isBlock: false,
        IsBlockUserId: 0,
      })
      .then(() => {
        setIsBlockUser(false);
        dataFromFirebase();
        // snackbarSuccess('User has been unblocked!');
      });
      // let formData = new FormData();
      // formData.append('report_to', carerData.id);
      // formData.append('type', isBlockUser ? 'unblock' : 'block');
      let body ={
        "report_to": carerData?.id,
        'type': isBlockUser ? 'unblock' : 'block'
    }
      dispatch(userActionServices.reportUserAction(body));
      // dispatch(userActionServices.reportUserAction(formData));
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {

        console.log("open");
        scrollViewRef?.current?.scrollToEnd({ animated: true });
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log("close");
        setKeyboardVisible(false); // or some other action
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const handleUpdate = (rowData, type) => {
    if (type === 'reason') {
      setCarerReasonTitle(rowData);
    }
  };
  const handleUserAction = () => {
    setModal2Visible(false);
  
    if (isBlockUser) {
      handleUserUnblocked()
//onUnblockUser && onUnblockUser();
    } else {
    //  onBlockUser && onBlockUser();
      callBlockUser()
    }
  };

  
  return (
    <SafeAreaView style={styles.mainContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Are you sure?</Text>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.modalOption}
                // onPress={handleUserAction}
                onPress={() => {
                  setModalVisible(false);
                  setModal2Visible(true);
                }}>
                <Text style={[styles.modalOptionText, {color: colors.red}]}>
                  {isBlockUser ? 'Unblock' : 'Block'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setModalVisible(false);
                  setModal3Visible(true);
                }}>
                <Text
                  style={[
                    styles.modalOptionText,
                    {color: colors.primaryColor},
                  ]}>
                  Report
                </Text>
              </TouchableOpacity>
              <View style={styles.separatorReport} />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal2Visible}
          onRequestClose={() => setModal2Visible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModal2Visible(false)}>
            <View style={styles.modalContent}>
            {isBlockUser ==true?
              <Text style={styles.modalTitle}>Unblock {carerData?.name}</Text>
:
<Text style={styles.modalTitle}>Block {carerData?.name}</Text>
}
              <View style={styles.separator} />
              {
                isBlockUser?
                <Text style={styles.modalDescription}>
                
                Are you sure you want to unblock {carerData?.name}?.
              </Text>
              :
                <Text style={styles.modalDescription}>
                
                Are you sure you want to block {carerData?.name}?
                {carerData?.name} won't be able to message you, and you won't
                see their messages anymore.
              </Text>
              }
             
              {/* <Text style={styles.modalDescription}>

                
                Are you sure you want to block {carerData?.name}?
                {carerData?.name} won't be able to message you, and you won't
                see their messages anymore."
              </Text> */}
              <View style={styles.separator} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelBtn]}
                  onPress={() => setModal2Visible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.blockBtn]}
                  onPress={handleUserAction}>
                  <Text style={[styles.blockButtonText]}>
                    {isBlockUser ? 'Unblock' : 'Block'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
    

    {
      Platform.OS=='ios'?
      <Modal animationType="slide" transparent={true} visible={modal3Visible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, backgroundColor: colors.blue60 }}>
          <View style={{ flex: 1 }} />
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'flex-end',
              paddingBottom: mvs(10),
              marginTop: mvs(10),
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
          >
            <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
              <View
                style={{
                  backgroundColor: colors.white,
                  flex: 1,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                }}
              >
                {/* Modal Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(22),
                      textAlign: 'center',
                      flex: 1,
                      marginHorizontal: ms(34),
                      color: colors.darkblue,
                    }}
                  >
                    Report User
                  </Text>
                  <TouchableOpacity
                    style={{ marginEnd: ms(20), alignSelf: 'center' }}
                    onPress={() => {
                      setImageName('');
                      setTicketDetail('');
                      setCarerReasonTitle({ id: -1, title: 'Select Reason' });
                      setModal3Visible(false);
                    }}
                  >
                    <Image style={{ height: mvs(20), width: mvs(20) }} source={images.cross} />
                  </TouchableOpacity>
                </View>
   
                {/* Divider */}
                <View style={{ marginHorizontal: ms(16) }}>
                  <View
                    style={{
                      borderBottomWidth: 4,
                      marginTop: mvs(30),
                      borderColor: colors.lightBackground,
                    }}
                  />
                </View>
   
                {/* Report Reason and Text Inputs */}
                <View style={{ marginTop: mvs(20), marginHorizontal: ms(16) }}>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      color: colors.darkblue,
                      fontSize: s(16),
                    }}
                  >
                    Report Reason <Text style={{ color: colors.black }}>*</Text>
                  </Text>
                  <MyDropDown
                    selected={carerReasonTitle}
                    itemList={carerReasonTitlesList}
                    placeholder={'Select Reason'}
                    onUpdate={data => handleUpdate(data, 'reason')}
                  />
                </View>
   
                <View>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      color: colors.darkblue,
                      fontSize: s(16),
                      marginTop: 16,
                      marginHorizontal: 16,
                    }}
                  >
                    Report Detail <Text style={{ color: colors.starcolor }}>*</Text>
                  </Text>
                  <View
                    style={{
                      borderColor: colors.lightBackground,
                      backgroundColor: colors.lightBackground,
                      borderRadius: ms(6),
                      height: mvs(120),
                      marginHorizontal: ms(16),
                      padding: Platform.OS === 'android' ? ms(13) : ms(13),
                      marginTop: 10,
                    }}
                  >
                    <TextInput
                      style={{
                        color: colors.blue,
                        fontSize: s(14),
                        flex: 1,
                        textAlignVertical: 'top',
                        fontFamily: fonts.quicksandMedium,
                      }}
                      multiline={true}
                      value={ticketDetail}
                      onChangeText={text => setTicketDetail(text)}
                      placeholderTextColor={colors.grey}
                      placeholder="Comment here..."
                    />
                  </View>
                </View>
   
                {/* Attachments */}
                {imageName.length > 0 ? (
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.quicksandMedium,
                        color: colors.darkblue,
                        fontSize: s(16),
                        marginTop: 16,
                        marginHorizontal: 16,
                      }}
                    >
                      Attachment
                    </Text>
                    <View style={{ height: 100, marginHorizontal: 20 }}>
                      <FlatList
                        data={attachementFiles}
                        style={{ flex: 1, marginTop: 8 }}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={picsItemRender}
                        extraData={!updateSubData}
                      />
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.quicksandMedium,
                        color: colors.darkblue,
                        fontSize: s(16),
                        marginTop: 16,
                        marginHorizontal: 16,
                      }}
                    >
                      Attachment
                    </Text>
                    <TouchableOpacity
                      onPress={() => openImagePicker('gallery')}
                      style={{
                        borderColor: colors.lightBackground,
                        backgroundColor: colors.lightBackground,
                        borderRadius: ms(6),
                        flexDirection: 'row',
                        marginHorizontal: 16,
                        justifyContent: 'space-between',
                        padding: Platform.OS === 'android' ? ms(4) : ms(13),
                        alignItems: 'center',
                        marginTop: mvs(7),
                      }}
                    >
                      <TextInput
                        style={{
                          color: colors.blue,
                          flex: 1,
                          marginEnd: ms(5),
                          fontSize: s(14),
                          height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                          fontFamily: fonts.quicksandMedium,
                        }}
                        editable={false}
                        value={imageName.length > 0 ? imageName[0] : ''}
                        placeholder="Upload Attachment"
                        placeholderTextColor={colors.grey}
                      />
                      <TouchableOpacity
                        onPress={() => openImagePicker('gallery')}
                        style={{ padding: Platform.OS === 'ios' ? ms(0) : ms(8) }}
                      >
                        <Image
                          source={images?.upload}
                          style={{
                            height: mvs(18),
                            width: mvs(18),
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                )}
   
                {/* Bottom Button */}
                <View
                  style={{
                    borderBottomWidth: 4,
                    marginTop: mvs(30),
                    borderColor: colors.lightBackground,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleReport();
                  }}
                  style={{
                    borderColor: colors.primaryColor,
                    backgroundColor: colors.primaryColor,
                    marginHorizontal: ms(16),
                    borderWidth: ms(1),
                    paddingVertical: ms(11),
                    justifyContent: 'center',
                    borderRadius: ms(6),
                    marginVertical: mvs(15),
                  }}
                >
                  <Text
                    style={{
                      fontSize: s(18),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: fonts.quicksandMedium,
                    }}
                  >
                    Report User
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
   
    :
     <Modal animationType="slide" transparent={true} visible={modal3Visible}>
     {/* <KeyboardAvoidingView
       behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 40}
       enabled={Platform.OS === 'ios' ? true : true}
       style={{
         flex: 1,
         bottom: isKeyboardVisible == true ? 130 : 0,
         backgroundColor: colors.blue60,
       }}> */}
       <KeyboardAvoidingView behavior={"height"} enabled style={{ flexGrow: 1, height: '100%' }}>
       <View style={{flex: 1}} />
       <View
         style={{
           // justifyContent: 'center',
           // alignItems: 'center',
           backgroundColor: colors.white,
           justifyContent: 'flex-end',
           marginTop: mvs(10),
           borderTopRightRadius: 15,
           borderTopLeftRadius: 15,
         }}>
         <View
           style={{
             flexDirection: 'row',

             alignItems: 'center',
             marginTop: mvs(20),
           }}>
           <Text
             style={{
               fontFamily: fonts.quicksandMedium,
               fontSize: s(22),
               textAlign: 'center',
               flex: 1,

               marginHorizontal: ms(34),
               color: colors.darkblue,
             }}>
             Report User
           </Text>
           <TouchableOpacity
             style={{marginEnd: ms(20), alignSelf: 'center'}}
             // onPress={() => setCreateSupportTicket(false)}
             onPress={() => {
               setImageName('')
               setTicketDetail('')
               setCarerReasonTitle({id: -1, title: 'Select Reason'});
               setModal3Visible(false)}}>
             <Image
               style={{height: mvs(20), width: mvs(20)}}
               source={images.cross}></Image>
           </TouchableOpacity>
         </View>

         <View style={{marginHorizontal: ms(16)}}>
           <View
             style={{
               borderBottomWidth: 4,
               marginTop: mvs(30),

               borderColor: colors.lightBackground,
             }}></View>
         </View>
         <View style={{marginTop: mvs(20), marginHorizontal: ms(16)}}>
           <Text
             style={{
               fontFamily: fonts.quicksandMedium,
               color: colors.darkblue,
               fontSize: s(16),
             }}>
             Report Reason  <Text style={{ color: colors.starcolor }}>*</Text>
           </Text>
           <MyDropDown
             // selected={reasonTitle}
             // itemList={reasonTitlesList}
             // placeholder={'Select Reason'}
             // onUpdate={data => handleUpdate(data, 'reason')}
             selected={carerReasonTitle}
             itemList={carerReasonTitlesList}
             placeholder={'Select Reason'}
             onUpdate={data => handleUpdate(data, 'reason')}
           />
         </View>
         <View>
           <Text
             style={{
               fontFamily: fonts.quicksandMedium,
               color: colors.darkblue,
               fontSize: s(16),
               marginTop: 16,
               marginHorizontal: 16,
             }}>
             Report Detail <Text style={{ color: colors.starcolor }}>*</Text>
           </Text>
           <View
             style={{
               borderColor: colors.lightBackground,
               backgroundColor: colors.lightBackground,
               borderRadius: ms(6),
               height: mvs(120),
               marginHorizontal: ms(16),
               padding: Platform.OS === 'android' ? ms(13) : ms(13),
               marginTop: 10,
             }}>
             <TextInput
               style={{
                 color: colors.blue,
                 fontSize: s(14),
                 flex: 1,
                 textAlignVertical: 'top',
                 fontFamily: fonts.quicksandMedium,
               }}
               multiline={true}
               value={ticketDetail}
               onChangeText={text => setTicketDetail(text)}
               placeholderTextColor={colors.grey}
               placeholder="Comment here..."></TextInput>
           </View>
         </View>

         {imageName.length > 0 ? (
           <View>
             <Text
               style={{
                 fontFamily: fonts.quicksandMedium,
                 color: colors.darkblue,
                 fontSize: s(16),
                 marginTop: 16,
                 marginHorizontal: 16,
               }}>
               Attachment
             </Text>
             <View style={{height: 100, marginHorizontal: 20}}>
               <FlatList
                 data={attachementFiles}
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
           </View>
         ) : (
           <View>
             <Text
               style={{
                 fontFamily: fonts.quicksandMedium,
                 color: colors.darkblue,
                 fontSize: s(16),
                 marginTop: 16,
                 marginHorizontal: 16,
               }}>
               Attachment
             </Text>
             <TouchableOpacity
               onPress={() => {
                 openImagePicker('gallery');
               }}
               style={{
                 borderColor: colors.lightBackground,
                 backgroundColor: colors.lightBackground,
                 borderRadius: ms(6),
                 flexDirection: 'row',
                 marginHorizontal: 16,
                 justifyContent: 'space-between',
                 padding: Platform.OS === 'android' ? ms(4) : ms(13),
                 alignItems: 'center',
                 marginTop: mvs(7),
               }}>
               <TextInput
                 style={{
                   color: colors.blue,
                   flex: 1,
                   marginEnd: ms(5),
                   fontSize: s(14),
                   height: Platform.OS === 'ios' ? mvs(25) : mvs(35),
                   fontFamily: fonts.quicksandMedium,
                 }}
                 editable={false}
                 value={imageName.length > 0 ? imageName[0] : ''}
                 placeholder="Upload Attachment"
                 placeholderTextColor={colors.grey}></TextInput>
               <TouchableOpacity
                 onPress={() => {
                   openImagePicker('gallery');
                 }}
                 style={{padding: Platform.OS === 'ios' ? ms(0) : ms(8)}}>
                 <Image
                   source={images?.upload}
                   style={{
                     height: mvs(18),
                     width: mvs(18),
                     resizeMode: 'contain',
                   }}
                 />
               </TouchableOpacity>
             </TouchableOpacity>
           </View>
         )}
         <View
           style={{
             borderBottomWidth: 4,
             marginTop: mvs(30),

             borderColor: colors.lightBackground,
           }}></View>
         <TouchableOpacity
           onPress={() => {
             //   setCreateSupportTicket(false);
             //   setTicketSucessfully(true);

             // createSupportTicketFunction();
             handleReport();
           }}
           style={{
             borderColor: colors.primaryColor,
             backgroundColor: colors.primaryColor,
             marginHorizontal: ms(16),
             borderWidth: ms(1),
             paddingVertical: ms(11),
             justifyContent: 'center',
             borderRadius: ms(6),
             marginVertical: mvs(15),
           }}>
           <Text
             style={{
               fontSize: s(18),
               color: 'white',
               textAlign: 'center',
               fontFamily: fonts.quicksandMedium,
             }}>
             Report User
           </Text>
         </TouchableOpacity>
       </View>
     </KeyboardAvoidingView>
   </Modal>
    }
       
        {getUserBlock?.value?.data?.isBan ? (
        <View
          style={{
            flex: 1,
          
            backgroundColor: colors.white,
          }}>
               <View
            style={{
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft:20
              }}
              onPress={() => 
              {
                if(carerData?.from=='MyBooking'){

                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'DrawerComponent', params: { defaultIndex: 'MyBooking' } }]
                })
                }else{
                  props.navigation.pop()
                }
               
              }
          
              
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
            <View style={{ justifyContent: 'center',
            flex:1,
            alignItems: 'center',}}>
          <Text
            style={{
              fontSize: 15,
              color: colors.darkblue,
              fontFamily: fonts.quicksandMedium,
              marginBottom: 10,
              padding: 10,
            }}>
            This Conversation has been blocked by admin.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.grey,
              fontFamily: fonts.quicksandMedium,
              textAlign: 'center',
              marginHorizontal: 20,
            }}>
            Contact customer care for more support.
          </Text>
          </View>
        </View>
      ) : (
        <>
      <View
        style={{
          height: mvs(80),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: ms(16),

            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => 
              {
                if(carerData?.from=='MyBooking'){

                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'DrawerComponent', params: { defaultIndex: 'MyBooking' } }]
                })
                }else{
                  props.navigation.pop()
                }
               
              }
          
              
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
        </View>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: mvs(20),

            fontFamily: fonts.quicksandMedium,
          }}>
          <Image
            style={{
              height: mvs(70),
              width: mvs(70),
              borderRadius: ms(70),
              resizeMode: 'cover',
            }}
            source={ carerData.image== null
              ? images.profile
              : { uri: Image_URL + carerData.image}}
           
            
            ></Image>
          <View style={{ flexDirection: 'column', }}>
            <Text
              style={{
                fontSize: s(18),
                color: colors.blue,
                marginLeft: ms(10),

                fontFamily: fonts.quicksandMedium,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {carerData?.name}
            </Text>
            <Text
              style={{
                fontSize: s(14),
                color: colors.grey,
                marginLeft: ms(10),
                marginTop: mvs(5),
                fontFamily: fonts.quicksandBook,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {carerData?.title}
            </Text>
          </View>
        
        </View>
        <TouchableOpacity
       onPress={()=>{
        setModalVisible(true)
       }}
        style={{}}>
            <Image  style={{
               width: mvs(20),
               height: mvs(25),
               resizeMode: 'contain',
               marginRight:20,  
          alignSelf: 'flex-end',
            }}source={images?.menuChat}></Image>
          </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: mvs(2),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'height' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 80 : 0}
        enabled={Platform.OS === 'ios' ? true : false}>

          
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            marginTop: 20,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}>
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              paddingVertical: 10,
            }}>
            {!loader ? (
              chatList.length > 0 ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  keyboardShouldPersistTaps={'always'}
                  ref={scrollViewRef}
                  refreshControl={
                    <RefreshControl
                      refreshing={isListRefreshing}
                      onRefresh={handleListRefresh}
                    />
                  }
                  onContentSizeChange={() =>
                    scrollViewRef?.current?.scrollToEnd({ animated: true })
                  }>
                  <FlatList
                    data={chatList}
                    renderItem={renderChatList}
                    keyExtractor={(item, index) => index}
                  />
                </ScrollView>
              ) : (
                <></>
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="black" />
              </View>
            )}
          </View>
        </View>
        {isConnected ?
        <>
        <View
          style={{
            marginVertical: mvs(2),
            borderBottomWidth: 3,
            borderColor: colors.lightBackground,
          }}></View>

           {isBlockUser ||
            getUserBlock?.value?.data?.isBlock ||
            getUserBlock?.value?.data?.blockFromOther ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1000,
                }}>
                {/* <Text
              style={{
                fontSize: 24,
                color: colors.darkblue,
                fontFamily: fonts.quicksandMedium,
                marginBottom: 10,
              }}>
              No mutual conversation
            </Text> */}
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.grey,
                    fontFamily: fonts.quicksandMedium,
                    textAlign: 'center',
                    marginHorizontal: 20,
                  }}>
                  You are no longer able to chat with this user
                </Text>
              </View>
            ) :
        <View
          style={{
            backgroundColor: colors.white,
            flexDirection: 'row',
            padding: ms(15),
          }}>
          <View
            style={{
              backgroundColor: colors.lightBackground,
              borderRadius: ms(40),
              borderWidth: 1,
              borderColor: colors.lightBackground,
              flex: 1,
              height: 50,
              marginHorizontal: ms(10),
            }}>
            <TextInput
              placeholder="Type here....."
              placeholderTextColor={colors.grey}
              selectionColor={colors.grey}
              value={message}
              onChangeText={onChangeMessage}
              style={{
                fontSize: 14,
                paddingEnd: 10,
                paddingStart: 10,
                fontFamily: fonts.quicksandMedium,
                color: colors.black, marginLeft: 10, flex: 1
              }}
            />
          </View>
          <TouchableOpacity onPress={() => sendChat()}>
            <Image
              style={{ height: 46, width: 46 }}
              resizeMode="cover"
              source={images.sendMessage}
            />
          </TouchableOpacity>
        </View>


        }
</>
        :

<Text style={{color:colors.black,fontSize:18,justifyContent:'center',alignSelf:'center',marginVertical:50}}>Oops! It seems like the chat was interrupted. Please try again later</Text>
}
      </KeyboardAvoidingView>
</>
            )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors.white },
  headerContainer: {
    marginTop: Platform.OS === 'android' ? 33 : 60,
    marginHorizontal: 22,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    fontFamily: fonts.quicksandMedium,
    fontSize: 26,
    textAlign: 'center',
    lineHeight: 32,
    color: '#356aa0',
  },
  backButtonImg: {
    width: 60,
    height: 27,
    resizeMode: 'contain',
  },
  separator: {
    height: 3,
    backgroundColor: colors.lightBackground,
    width: '100%',
    // marginBottom: mvs(15),
  },
  separatorReport: {
    height: 3,
    backgroundColor: colors.lightBackground,
    width: '100%',
    marginBottom: mvs(15),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: ms(20),
    borderTopRightRadius: ms(20),
    padding: ms(20),
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: s(18),
    color: colors.blue,
    fontFamily: fonts.quicksandMedium,
    marginBottom: mvs(20),
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: mvs(12),
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBackground,
  },
  modalOptionText: {
    fontSize: s(16),
    fontFamily: fonts.quicksandMedium,
  },
  cancelButton: {
    marginTop: mvs(5),
    paddingVertical: mvs(12),
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: ms(8),
  },
  cancelButtonText: {
    fontSize: s(16),
    color: colors.white,
    fontFamily: fonts.quicksandMedium,
  },
  container: {
    height: mvs(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    marginLeft: ms(16),
    alignItems: 'center',
  },
  backButtonContainer: {
    alignItems: 'flex-start',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrowImage: {
    width: mvs(7),
    height: mvs(15),
    resizeMode: 'contain',
    tintColor: colors.blueLight,
  },
  ellipsisImage: {
    width: mvs(20),
    height: mvs(25),
    resizeMode: 'contain',
    tintColor: colors.blueLight,
    alignSelf: 'flex-end',
  },
  backText: {
    fontSize: s(16),
    color: colors.blue,
    marginLeft: ms(10),
    fontFamily: fonts.quicksandBold,
  },
  profileContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: mvs(20),
    fontFamily: fonts.quicksandMedium,
  },
  profileImage: {
    height: mvs(70),
    width: mvs(70),
    borderRadius: ms(70),
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'column',
  },
  nameText: {
    fontSize: s(18),
    color: colors.blue,
    marginLeft: ms(10),
    fontFamily: fonts.quicksandMedium,
  },
  titleText: {
    fontSize: s(14),
    color: colors.grey,
    fontFamily: fonts.quicksandMedium,
    marginBottom: mvs(20),
    textAlign: 'center',
    paddingHorizontal: ms(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: ms(20),
    marginTop: mvs(15),
  },
  actionButton: {
    flex: 1,
    paddingVertical: mvs(12),
    alignItems: 'center',
    borderRadius: ms(8),
    marginHorizontal: ms(5),
  },
  cancelBtn: {
    backgroundColor: colors.grey,
  },
  blockBtn: {
    backgroundColor: colors.primaryColor,
  },
  blockButtonText: {
    fontSize: s(16),
    color: colors.white,
    fontFamily: fonts.quicksandMedium,
  },
  cancelButtonText: {
    fontSize: s(16),
    color: colors.white,
    fontFamily: fonts.quicksandMedium,
  },
  modalDescription: {
    fontFamily: fonts.quicksandMedium,
    color: colors.grey,
    marginTop: ms(12),
    marginBottom: ms(12),
  },
  userIcon: { height: 60, width: 60, borderRadius: 40 },
});
// import {View, Text} from 'react-native';
// import React from 'react';

// export default function ChatScreen() {
//   return (
//     <View>
//       <Text>ChatScreen</Text>
//     </View>
//   );
// }
