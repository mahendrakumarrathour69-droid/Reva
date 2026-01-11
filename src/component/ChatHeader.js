import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {colors} from '../utils/colors';
import {fonts} from '../utils/font';
import images from '../utils/images';
import {Image_URL} from '../utils/apiConstants';
import {snackbarSuccess, snackbarError} from '../utils/snackbar';
import {db} from '../utils/firebaseConfig';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userActionServices} from '../redux/userServices';
import MyDropDown from './MyDropDown';
import ImageCropPicker from 'react-native-image-crop-picker';
import {OFFERDECLINEREASONS, REPORTUSER} from '../utils/reducerConstant';

const ChatHeader = ({
  navigation,
  carerData,
  seekerData,
  isBlockUser,
  onBlockUser,
  onUnblockUser,
  apiCall,
}) => {
 

  carerData = carerData.carerData;
  navigation = navigation.navigation;
  seekerData = seekerData.seekerData;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const dispatch = useDispatch();

  const [carerReasonTitle, setCarerReasonTitle] = useState({
    id: 0,
    title: 'Select Reason',
  });
  const [ticketDetail, setTicketDetail] = useState('');
  const [attachementFiles, setAttachementFiles] = useState([]);
  const [imageName, setImageName] = useState('');
  const [carerReasonTitlesList, setcarerReasonTitlesList] = useState([]);
  const [updateSubData, setUpdateSubData] = useState('');

  // const offerDeclineReasonData = useSelector(
  //   state => state.offerDeclineReasonData,
  // );

  const report_userData = useSelector(state => state.report_user);
console.log(
  "report_userData>",report_userData
);
const offerDeclineReasonData = useSelector(
  state => state.offerDeclineReasonData,
);
  useEffect(() => {
    let declineBody = {
      type: 13,
    };
    dispatch(userActionServices.offerDeclineReasons(declineBody));
  }, []);

 

  useEffect(() => {
    if (offerDeclineReasonData.type === OFFERDECLINEREASONS) {
      if (offerDeclineReasonData?.value?.status) {
        if (
          Object.keys(offerDeclineReasonData?.value).length != 0 &&
          offerDeclineReasonData?.value != undefined
        ) {
          offerDeclineReasonData.value.data.map((v, i) => {
            let temp = {
              id: v.id,
              title: v.reason,
            };

            carerReasonTitlesList.push(temp);
          });

          dispatch(userActionServices.resetData());
        }
      } else {
        if (offerDeclineReasonData?.value?.code === LOGOUT) {
          setTimeout(() => {
            // snackbarError(error.response.data.Message);
            snackbarError(offerDeclineReasonData?.value?.message);
          }, 100);

          logoutCalled();
        }
      }
    }

    else {
    }
  }, [offerDeclineReasonData]);
  useEffect(() => {
    console.log("report_userData>>",report_userData);
    
    if (report_userData.type === REPORTUSER) {
      if (report_userData?.value?.status) {
        console.log("amanamn");
        setTimeout(() => {
          snackbarSuccess("User Chat Report Saved Successfully'")
        }, 300);
   
      // ToastAndroid('User Chat Report Saved Successfully')

      }
     
       
    }
  }, [report_userData]);

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
      if (carerReasonTitle.id === 0) {
        throw new Error('Please select a reason');
      }
      if (!ticketDetail) {
        throw new Error('Please enter ticket details');
      }

      let formData = new FormData();
      formData.append('report_to', carerData.id);
      formData.append('type', 'report');
      formData.append('reason_id', carerReasonTitle.id);
      formData.append('reason', ticketDetail);
      console.log('formData---->', formData);

      if (attachementFiles.length > 0) {
        attachementFiles.forEach((file, index) => {
          formData.append('attachments', {
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
    

      setModal3Visible(false);
      setModalVisible(false);
      setTicketDetail('');
      setAttachementFiles([]);
      setImageName('')
      setCarerReasonTitle({id: 0, title: 'Select Reason'});
      snackbarSuccess('Support ticket created successfully');
    } catch (error) {
      console.error('Error creating support ticket:', error);
      snackbarError(
        error.message || 'Failed to create support ticket. Please try again.',
      );
    }
  };

  const handleUpdate = (rowData, type) => {
    if (type === 'reason') {
      setCarerReasonTitle(rowData);
    }
  };

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

  const handleUserAction = () => {
    setModal2Visible(false);
  
    if (isBlockUser) {
      onUnblockUser && onUnblockUser();
    } else {
      onBlockUser && onBlockUser();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (carerData?.from == 'MyBooking') {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'DrawerComponent',
                      params: {defaultIndex: 'MyBooking'},
                    },
                  ],
                });
              } else {
                navigation.pop();
              }
            }}>
            <Image source={images.backArrow} style={styles.backArrowImage} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileContainer}>
        {!isBlockUser ? (
          <>
            <Image
              style={styles.profileImage}
              source={{
                uri: Image_URL + carerData.image,
              }}
            />
            <View style={styles.textContainer}>
              <Text
                style={styles.nameText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {carerData?.name}
              </Text>
              <Text
                style={styles.titleText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {carerData?.title}
              </Text>
            </View>
          </>
        ) : (
          <View
            style={[
              styles.textContainer,
              {flex: 1, alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Text
              style={[styles.nameText, {marginLeft: 0}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              User Blocked
            </Text>
          </View>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View
            style={{
              marginRight: ms(15),
              width: mvs(40),
            }}>
            <Image source={images.menuChat} style={styles.ellipsisImage} />
          </View>
        </TouchableOpacity>
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
              <Text style={styles.modalTitle}>Block {carerData?.name}</Text>
              <View style={styles.separator} />
              <Text style={styles.modalDescription}>
                Are you sure you want to block {carerData?.name}?
                {carerData?.name} won't be able to message you, and you won't
                see their messages anymore."
              </Text>
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
    
        <Modal animationType="slide" transparent={true} visible={modal3Visible}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 40}
            enabled={Platform.OS === 'ios' ? true : true}
            style={{
              flex: 1,
              bottom: isKeyboardVisible == true ? 130 : 0,
              backgroundColor: colors.blue60,
            }}>
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
                  Report Reason
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
                  Report Detail
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ChatHeader;
