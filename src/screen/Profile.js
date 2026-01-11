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
  Linking,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import images from '../utils/images';
import { fonts } from '../utils/font';
import { colors } from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { userActionServices } from '../redux/userServices';
import { GET_CREATE_TICKET, GET_UPDATE_PROFILE } from '../utils/reducerConstant';
import { snackbarSuccess } from '../utils/snackbar';
import { Image_URL } from '../utils/apiConstants';
import { useIsFocused } from '@react-navigation/native';
export default function Profile(props) {
  const dispatch = useDispatch();
  const getUpdateProfileValue = useSelector(
    state => state.getUpdateProfileData,
  );
  console.log("getUpdateProfileValuegetUpdateProfileValue>>.",JSON.stringify(getUpdateProfileValue));
  const {navigation} = props;
  const [token, settoken] = useState('');
  const [individual, setindividual] = useState(true);
  const [organisation, setOrganisation] = useState(false);
  const [firebaseTokenData, setFirebaseToken] = useState('');

  const [hidePassword, sethidePassword] = useState(true);
  const [confirmHidePassword, setConfirmHidePassword] = useState(true);
  const [input, setInput] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+44');
  const [landlineNumber, setLandlineNumber] = useState('');
  const [organisationName, setorganisationName] = useState('');
  const [house, setHouse] = useState('');
  const [postCode, setPostCode] = useState('');
  console.log("profile>>>",profile);
  const [contactPersonName, setcontactPersonName] = useState('');
  const [address, setAddress] = useState('');
  const [town, setTown] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [gender, setGender] = useState('');
  const [readBell, setReadBell]=useState(0)
  const [title, setTitle] = useState('');
  const [sourceFund, setSourceFund] = useState('');
  useEffect(() => {
    try {
      const value = AsyncStorage.getItem('orgnizationKey').then(data => {
        console.log('value', data);
        settoken(data);
      });
    } catch (e) {
      // console.log('error');
    }
  }, []);
  useEffect(()=>{
    setTimeout(() => {
      dispatch(userActionServices.getUpdateProfileAction());
    }, 200);

  },[])

  let focus = useIsFocused();
  
  useEffect(() => {
    // dispatch(setPublicLeagueListinggData());
    setTimeout(() => {
      if (focus) {


        setTimeout(() => {
          dispatch(userActionServices.getUpdateProfileAction());
        }, 200);
      }
    }, 200);
  }, [focus]);
  useEffect(() => {
    if (getUpdateProfileValue.type === GET_UPDATE_PROFILE) {
      if (getUpdateProfileValue?.value?.status) {
        if (
          Object.keys(getUpdateProfileValue?.value).length != 0 &&
          getUpdateProfileValue?.value != undefined
        ) {
          console.log("getUpdateProfileValue>????????",getUpdateProfileValue);
          if(getUpdateProfileValue?.value?.data?.user_type==2){
            settoken("orgnization")
          }
          setReadBell(getUpdateProfileValue?.value?.is_new_notify)
       setOrganisation(getUpdateProfileValue?.value?.data?.user_type)
       setorganisationName(getUpdateProfileValue?.value?.data?.organisation_name)
       setEmail(getUpdateProfileValue?.value?.data?.email)
       setLandlineNumber(getUpdateProfileValue?.value?.data?.landline_number)
       setMobileNumber(getUpdateProfileValue?.value?.data?.phone_number)
       setProfile(getUpdateProfileValue?.value?.data?.profile_image)
       setcontactPersonName(getUpdateProfileValue?.value?.data?.contact_person)
       setAddress(getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_2=='' || getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_2==undefined ||getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_2==null? getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_1:getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_1+', '+getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_2)
       setPostCode(getUpdateProfileValue?.value?.data?.user_meta_info?.postcode)
       setTown(getUpdateProfileValue?.value?.data?.user_meta_info?.town)
       setHouse(getUpdateProfileValue?.value?.data?.user_meta_info?.flat_no);
       setRegion(getUpdateProfileValue?.value?.data?.user_meta_info?.region)
       setCountry(getUpdateProfileValue?.value?.data?.user_meta_info?.country)
      setFirstName(getUpdateProfileValue?.value?.data?.first_name)

      setTitle(getUpdateProfileValue?.value?.data?.title==''||getUpdateProfileValue?.value?.data?.title==undefined || getUpdateProfileValue?.value?.data?.title==null ?"":getUpdateProfileValue?.value?.data?.title)
      setLastName(getUpdateProfileValue?.value?.data?.last_name==''||getUpdateProfileValue?.value?.data?.last_name==undefined || getUpdateProfileValue?.value?.data?.last_name==null ?"":getUpdateProfileValue?.value?.data?.last_name)
      setGender(getUpdateProfileValue?.value?.data?.gender)
      if(getUpdateProfileValue?.value?.data?.source_of_funding==1){
        setSourceFund("Local Authority Funded")
      }else if(getUpdateProfileValue?.value?.data?.source_of_funding==2)
      {
        setSourceFund("NHS Funded")
      }else if(getUpdateProfileValue?.value?.data?.source_of_funding==3){
        setSourceFund("Self Funded") 
      }

      
      
    getUpdateProfileValue?.value?.region_list?.map((v,i)=>{
      console.log("getUpdateProfileValue?.value?.data?.user_meta_info?.region_id>>>",getUpdateProfileValue?.value?.data?.user_meta_info?.region_id);
      if(v.id==getUpdateProfileValue?.value?.data?.user_meta_info?.region_id){
        console.log("amamamammamamamamma>>>>");
        setRegion(v?.region)
      }
    })
// setTimeout(() => {
//   snackbarSuccess(getUpdateProfileValue?.value?.message);
// }, 200);
         
        }
      } else {
      }
    }
  }, [getUpdateProfileValue]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: ms(16),
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Image
            source={images.menu}
            style={{ height: mvs(19), width: mvs(21), resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: colors.blue,
              fontSize: 24,
              fontFamily: fonts.quicksandMedium,
            }}>
            My Profile
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Notifications')}>
          <Image
            source={readBell >0 ? images.readBell :images?.notification}
            style={{ height: mvs(19), width: mvs(21), resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={() => Linking.openSettings()}
        style={{ position: 'absolute', right: ms(45), top: mvs(4) }}>
        <Image
          source={images.location}
          style={{ height: mvs(19), width: mvs(21), resizeMode: 'contain' }}
        />
      </TouchableOpacity> */}
      <View
        style={{
          marginVertical: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity style={{ alignSelf: 'center' }}>
          <Image
            source={profile==null?images?.profile:{uri:Image_URL+profile}}
            style={{
              height: mvs(90),
              width: mvs(90),
              borderRadius:60,
           
              resizeMode: 'cover',
            }}></Image>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: ms(18),
            color: colors.blue,
            alignSelf: 'center',
            marginTop: mvs(12),
            fontFamily: fonts.quicksandMedium,
          }}>
          {token == 'orgnization'
            ? organisationName
            :`${title==''|| title==undefined || title==null?'':title }${' '}${firstName==''|| firstName==undefined || firstName==null?'':firstName}${' '}${lastName==''|| lastName==undefined || lastName==null?'':lastName}`
            }
        </Text>

        <View style={{ marginTop: mvs(30), marginHorizontal: mvs(16) }}>
          <Text
            style={{
              color: colors.blueLight,
              fontSize: s(14),
              fontFamily: fonts.quicksandMedium,
            }}>
          Email
          </Text>

          <View style={{ marginTop: mvs(9) }}>
            <Text
              style={{
                color: colors.blue,
                fontSize: s(16),
                fontFamily: fonts.quicksandMedium,
              }}>
           {email}
            </Text>
          </View>
          <View
            style={{
              marginTop: mvs(5),
              borderBottomWidth: 3,
              borderColor: colors.lightBackground,
            }}></View>

          <View style={{ flex: 1 }}>
            {token == 'orgnization' ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(30),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: ms(6),
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.blueLight,
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Landline Number
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRadius: ms(6),
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.blueLight,
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Mobile
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(7),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      +44
                    </Text>
                    <Text
                      style={{
                        fontSize: s(16),
                        marginLeft: ms(10),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      {landlineNumber}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      +44
                    </Text>
                    <Text
                      style={{
                        fontSize: s(16),
                        marginLeft: ms(10),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      {mobileNumber}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(5),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '48%',

                      borderBottomWidth: 3,
                      borderColor: colors.lightBackground,
                    }}></View>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',

                      borderBottomWidth: 3,
                      borderColor: colors.lightBackground,
                    }}></View>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(30),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: ms(6),
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.blueLight,
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Mobile
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRadius: ms(6),
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.blueLight,
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Gender
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(7),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      +44
                    </Text>
                    <Text
                      style={{
                        fontSize: s(16),
                        marginLeft: ms(10),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      {mobileNumber}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),

                        color: colors.blue,
                      }}>
                    {gender}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(5),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '48%',

                      borderBottomWidth: 3,
                      borderColor: colors.lightBackground,
                    }}></View>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',

                      borderBottomWidth: 3,
                      borderColor: colors.lightBackground,
                    }}></View>
                </View>
              </View>
            )}

            {token == 'orgnization' ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(30),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: ms(6),
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.blueLight,
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Source Of Funding
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRadius: ms(6),
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.blueLight,
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Contact Person Name
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(7),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),
                        fontFamily: fonts.quicksandMedium,
                        color: colors.blue,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                     {sourceFund}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),
                        marginLeft: ms(10),
                        color: colors.blue,
                        fontFamily: fonts.quicksandMedium,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                    {contactPersonName}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(5),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '48%',

                      borderBottomWidth: 3,
                      borderColor: colors.lightBackground,
                    }}></View>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',

                      borderBottomWidth: 3,
                      borderColor: colors.lightBackground,
                    }}></View>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(30),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: ms(6),
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.blueLight,
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Source Of Funding
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRadius: ms(6),
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.blueLight,
                        fontSize: s(14),
                        fontFamily: fonts.quicksandMedium,
                      }}>
                      Address
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(7),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                 <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),
                        fontFamily: fonts.quicksandMedium,
                        color: colors.blue,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                    {sourceFund==undefined||sourceFund ==''||sourceFund ==null?"-":sourceFund} 
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: s(16),
                        fontFamily: fonts.quicksandMedium,
                        color: colors.blue,
                      }}>
                  {address==undefined||address ==''||address ==null?"-":address}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: mvs(5),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '48%',

                      borderBottomWidth: 3,
                      borderColor: colors.lightBackground,
                    }}></View>
                  <View
                    style={{
                      width: '48%',
                      flexDirection: 'row',

                      borderBottomWidth: 3,
                      borderColor: colors.lightBackground,
                    }}></View>
                </View>
              </View>
            )}

            {token == 'orgnization' ? (
              <View style={{ marginTop: mvs(20) }}>
                <Text
                  style={{
                    color: colors.blueLight,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Address
                </Text>

                <View style={{ marginTop: mvs(9) }}>
                  <Text
                    style={{
                      color: colors.blue,
                      fontSize: s(16),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                   {address==undefined||address ==''||address ==null?"-":address}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: mvs(5),
                    borderBottomWidth: 3,
                    borderColor: colors.lightBackground,
                  }}></View>
              </View>
            ) : (
              <></>
            )}

            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(30),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: ms(6),
                  width: '48%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: colors.blueLight,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Postcode
                </Text>
              </View>
              <View
                style={{
                  borderRadius: ms(6),
                  width: '48%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: colors.blueLight,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Town & County
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(7),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '48%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: s(16),
                    color: colors.blue,
                    fontFamily: fonts.quicksandMedium,
                  }}>
              {postCode==undefined||postCode ==''||postCode ==null?"-":postCode}
                </Text>
              </View>
              <View
                style={{
                  width: '48%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                    color: colors.blue,
                  }}>
                {town==undefined||town ==''||town ==null?"-":town}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(5),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '48%',

                  borderBottomWidth: 3,
                  borderColor: colors.lightBackground,
                }}></View>
              <View
                style={{
                  width: '48%',
                  flexDirection: 'row',

                  borderBottomWidth: 3,
                  borderColor: colors.lightBackground,
                }}></View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(30),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: ms(6),
                  width: '48%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: colors.blueLight,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Region
                </Text>
              </View>
              <View
                style={{
                  borderRadius: ms(6),
                  width: '48%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: colors.blueLight,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Country
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(7),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '48%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: s(16),
                    color: colors.blue,
                    fontFamily: fonts.quicksandMedium,
                  }}>
               {region==undefined||region ==''||region ==null?"-":region}
                </Text>
              </View>
              <View
                style={{
                  width: '48%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: s(16),
                    fontFamily: fonts.quicksandMedium,
                    color: colors.blue,
                  }}>
               {country==undefined||country ==''||country ==null?"-":country}
                </Text>
              </View>
            </View>


            <View
              style={{
                flexDirection: 'row',
                marginTop: mvs(5),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '48%',

                  borderBottomWidth: 3,
                  borderColor: colors.lightBackground,
                }}></View>
              <View
                style={{
                  width: '48%',
                  flexDirection: 'row',

                  borderBottomWidth: 3,
                  borderColor: colors.lightBackground,
                }}></View>
            </View>

            <Text
            style={{
              color: colors.blueLight,
              fontSize: s(14),
              marginTop:20,
              fontFamily: fonts.quicksandMedium,
            }}>
          House / Flat No. 
          </Text>

          <View style={{ marginTop: mvs(9) }}>
            <Text
              style={{
                color: colors.blue,
                fontSize: s(16),
                fontFamily: fonts.quicksandMedium,
              }}>
   {house == undefined || house == '' || house == null
                          ? '-'
                          : house}
            </Text>
          </View>
          <View
            style={{
              marginTop: mvs(5),
              borderBottomWidth: 3,
              borderColor: colors.lightBackground,
            }}></View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('EditProfile')}
            style={{
              borderColor: colors.primaryColor,
              backgroundColor: colors.primaryColor,
              borderWidth: ms(1),
              paddingVertical: ms(11),
              justifyContent: 'center',
              borderRadius: ms(6),
              marginTop: mvs(25),
            }}>
            <Text
              style={{
                fontSize: s(18),
                color: 'white',
                textAlign: 'center',
                fontFamily: fonts.quicksandMedium,
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
