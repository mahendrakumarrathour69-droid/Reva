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
  Modal,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import images from '../utils/images';
import {fonts} from '../utils/font';
import {colors} from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyDropDown from '../component/MyDropDown';
import {snackbarError, snackbarSuccess} from '../utils/snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {userActionServices} from '../redux/userServices';
import {
  GETREGION,
  GET_UPDATE_PROFILE,
  NATIONALITIES,
  UPDATE_PROFILE,
} from '../utils/reducerConstant';
import {hideLoader, showLoader} from '../component/AppLoader';
import ImagePicker from 'react-native-image-crop-picker';
import {AuthContext} from '../navigation/context';
import {Image_URL} from '../utils/apiConstants';
import {apiConfig} from '../utils/apiConfig';

export default function EditProfile(props) {
  const dispatch = useDispatch();
  const getUpdateProfileValue = useSelector(
    state => state.getUpdateProfileData,
  );
  const updateProfileValue = useSelector(
    state => state.updateProfileData,
  );
  var lat;
  var nationalityId;

  var long;
  const [nationalityIdd, setNationalityIdd] = useState('');
 
  const {navigation} = props;
  const [postCodeFind, setPostCodeFind] = useState([]);
  const [nationalityList, setNationalityList] = useState([]);
  const [postCodeMoreFind, SetPostCodeMoreFind] = useState([]);
  const [regionList, setRegionList] = useState([]);
 
  const getNationalityData = useSelector(state => state.getNationalities);
  const getRegiondata = useSelector(state => state.getRegionList);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const [typeGender, setTypeGender] = useState('');
  const [genderType, setGenderType] = useState('');
  const [profile, setProfile] = useState('');
  const [titleModal, setTitelModal] = useState(false);
  const [mr, setmr] = useState(false);
  const [mrs, setmrs] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [house, setHouse] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [typeTitle, setTypeTitle] = useState('');
  const [titleType, setTitleType] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [multipleFile, setMultipleFile] = useState([]);
  const [image, setImage] = useState('');
  const [hidePassword, sethidePassword] = useState(true);
  const [confirmHidePassword, setConfirmHidePassword] = useState(true);
  const [postCode, setPostCode] = useState('');
  console.log("postCode>>>>>>>",postCode);
  const [landlineNumber, setLandlineNumber] = useState('');
  const [organisationName, setorganisationName] = useState('');
  const [individual, setindividual] = useState(true);
  const [organisation, setOrganisation] = useState(false);
  const [contactPersonName, setcontactPersonName] = useState('');
  const [address, setAddress] = useState('');
  const [town, setTown] = useState('');
  const [country, setCountry] = useState('');
  const [updatePostcodeData, setUpdatePostcodeData] = useState();
  const [updatePostcodeMoreData, setUpdatePostcodeMoreData] = useState();
  const [email, setEmail] = useState('');
  const [token, settoken] = useState('');
  const [regionId, setRegionId] = useState('');
  const [countryName, setCountryName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [count, setCount] = useState(0);
  const [nationality, setnationality] = useState({
    id: 0,
    title: 'Select Nationality',
  });
  const [region, setRegion] = useState({
    id: 0,
    title: 'Select Region',
  });
  useEffect(() => {
    // try {
    //   const value = AsyncStorage.getItem('orgnizationKey').then(data => {
    //     console.log('value', data);
    //     settoken(orgnization);
    //   });
    // } catch (e) {
    //   // console.log('error');
    // }
    //settoken('orgnization');
  }, []);
  // // gender type select
  // const gender = type => {
  //   console.log('type', type);
  //   setTypeGender(type);
  //   if (type == 1) {
  //     setmale(true);
  //     setfemale(false);
  //   } else {
  //     setfemale(true);
  //     setmale(false);
  //   }
  // };
  // // Gender type done
  // const handleDone = () => {
  //   console.log('typeGender', typeGender);
  //   if (typeGender == 1) {
  //     setGenderType('Male');
  //     setModalVisible(false);
  //   } else {
  //     setGenderType('Female');
  //     setModalVisible(false);
  //   }
  // };

  // // Title type select
  // const title = type => {
  //   console.log('type', type);
  //   setTypeTitle(type);
  //   if (type == 1) {
  //     setmr(true);
  //     setmrs(false);
  //   } else {
  //     setmrs(true);
  //     setmr(false);
  //   }
  // };
  // // Title type done
  // const handleTitleDone = () => {
  //   console.log('typeGendedddddd', typeTitle);
  //   if (typeTitle == 1) {
  //     setTitleType('Mr');
  //     setTitelModal(false);
  //   } else {
  //     setTitleType('Mrs');
  //     setTitelModal(false);
  //   }
  // };
  const handleUpdate = (data, type) => {
    if (type === 'Title') {
      setTitle(data);
    } else if (type === 'Gender') {
      setGender(data);
    } else if (type === 'sourceFunding') {
      setSourceFunding(data);
    } else if (type === 'Nationality') {
      setnationality(data);
      nationalityId = data.id;
      setNationalityIdd(nationalityId);
    } else if (type === 'Region') {
      setRegion(data);
    }
  };
  const [gender, setGender] = useState({id: 0, title: 'Select Gender'});
  const [title, setTitle] = useState({id: 0, title: 'Select Title'});
  const [sourceFunding, setSourceFunding] = useState({
    id: 0,
    title: 'Select Source Funding',
  });

  const titleList = [
    {
      id: '1',

      title: 'Mr',
    },
    {
      id: '2',

      title: 'Mrs',
    },
  ];

  const genderList = [
    {
      id: '1',

      title: 'Male',
    },
    {
      id: '2',

      title: 'Female',
    },
    {
      id: '3',

      title: 'Prefer not to say',
    },
  ];

  const sourceFundingList = [
    {
      id: '1',
      title: 'Local Authority Funded',
    },
    {
      id: '2',
      title: 'NHS Funded',
    },
    {
      id: '3',
      title: 'Self Funded',
    },
  ];

  // open camera
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      compressImageQuality: 0,
      mediaType: 'photo',

      cropping: false,
    }).then(image => {
      var type = image.mime;
      var uri = image.path;
      var patt = /\w+[-\w+\s]*\.(jpg|png|jpeg)/g;
      var name = image.path.match(patt);
      setImage(uri);

      setModalVisible(false);
      var imageUrl = {uri: uri, type: type, name: name[0]};
      setImageURL(imageUrl);
      setProfile(imageUrl);
      // props.UploadProfileImageAction(imageUrl);
    });
  };
  // open gallery
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0,
      mediaType: 'photo',
      cropping: false,
    }).then(image => {
      var type = image.mime;
      var uri = image.path;
      var patt = /\w+[-\w+\s]*\.(jpg|png|jpeg)/g;
      var name = image.path.match(patt);
      setImage(uri);

      setModalVisible(false);
      var imageUrl = {uri: uri, type: type, name: name[0]};
      setImageURL(imageUrl);
      setProfile(imageUrl);
      // props.UploadProfileImageAction(imageUrl);
    });
  };

  // call get api get basic data
  useEffect(() => {
    showLoader();
    dispatch(userActionServices.getUpdateProfileAction());
  }, []);

  useEffect(() => {
    if (getUpdateProfileValue.type === GET_UPDATE_PROFILE) {
      if (getUpdateProfileValue?.value?.status) {
        if (
          Object.keys(getUpdateProfileValue?.value).length != 0 &&
          getUpdateProfileValue?.value != undefined
        ) {
          
          console.log("getUpdateProfileValue>>>",getUpdateProfileValue);
          
          // setTimeout(() => {
          //   // snackbarError(error.response.data.Message);
          //   snackbarSuccess(getUpdateProfileValue?.value?.message);
          // }, 100);
          if (getUpdateProfileValue?.value?.data?.user_type == 2) {
            settoken('orgnization');
          }
          setOrganisation(getUpdateProfileValue?.value?.data?.user_type);
          setorganisationName(
            getUpdateProfileValue?.value?.data?.organisation_name,
          );
          setEmail(getUpdateProfileValue?.value?.data?.email);
          setLandlineNumber(
            getUpdateProfileValue?.value?.data?.landline_number,
          );
          setMobileNumber(getUpdateProfileValue?.value?.data?.phone_number);
          setProfile(getUpdateProfileValue?.value?.data?.profile_image);
          setcontactPersonName(
            getUpdateProfileValue?.value?.data?.contact_person,
          );
          setAddress(
            getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_1,
          );
          setHouse(
            getUpdateProfileValue?.value?.data?.user_meta_info?.flat_no,
          );
         
            if(getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_2==''||getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_2=="undefined" ||getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_2=="null"){
              setAddressLine2('')
            }else{
              setAddressLine2(getUpdateProfileValue?.value?.data?.user_meta_info?.address_line_2)
            }
          
          setPostCode(
            getUpdateProfileValue?.value?.data?.user_meta_info?.postcode,
          );
          setTown(getUpdateProfileValue?.value?.data?.user_meta_info?.town);
          setCountry(getUpdateProfileValue?.value?.data?.user_meta_info?.country);
          setRegionId(
            getUpdateProfileValue?.value?.data?.user_meta_info?.region_id,
          );
          setCountryName(
            getUpdateProfileValue?.value?.data?.user_meta_info?.country,
          );
          setFirstName(getUpdateProfileValue?.value?.data?.first_name);
          setLastName(getUpdateProfileValue?.value?.data?.last_name);
          setTitle(getUpdateProfileValue?.value?.data?.title);
          setGender(getUpdateProfileValue?.value?.data?.gender=='Female'?
          {id: 2,  title: 'Female'}:getUpdateProfileValue?.value?.data?.gender=='Male'?{id: 1,  title: 'Male'}:{
            id: 1,  title: 'Prefer not to say'
          }
          );
          setSourceFunding(
            getUpdateProfileValue?.value?.data?.source_of_funding==1
              ? { id: 1,  title: 'Local Authority Funded' }
              : getUpdateProfileValue?.value?.data?.source_of_funding==2
                ? { id: 2,title: 'NHS Funded'}:getUpdateProfileValue?.value?.data?.source_of_funding==3?{ id: 3, title: 'Self Funded' }
                : { id: 0, title: 'Select Source Funding' }
          );
          setTitle(
            getUpdateProfileValue?.value?.data?.title=="Mrs"?
            {id:3,title:"Mrs"}:getUpdateProfileValue?.value?.data?.title=="Mr"? {id:1,title:"Mr"}:{id:2,title:"Ms"}
          )
          dispatch(userActionServices.getNationality());
          dispatch(userActionServices.getRegions());
         
        }
      } else {
      }
    }
  }, [getUpdateProfileValue]);

  // set nationlites with api response
  useEffect(() => {
    hideLoader();

    if (getNationalityData.type === NATIONALITIES) {
      if (
        Object.keys(getNationalityData?.value).length != 0 &&
        getNationalityData?.value != undefined
      ) {
        getNationalityData.value.data.map((v, i) => {
          let temp = {
            id: v.id,
            title: v.nationality,
          };
          if (countryName == v.nationality) {
            setnationality({id: v.id, title: v.nationality});
          }
          nationalityList.push(temp);
        });
        // dispatch(userActionServices.resetData());
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [getNationalityData]);

  // set region with api response
  useEffect(() => {
    hideLoader();

    if (getRegiondata.type === GETREGION) {
      if (
        Object.keys(getRegiondata?.value).length != 0 &&
        getRegiondata?.value != undefined
      ) {
        console.log('regionId>>>', regionId);
        getRegiondata.value.data.map((v, i) => {
          let temp = {
            id: v.id,
            title: v.region,
          };

          if (regionId == v.id) {
            setRegion({id: v.id, title: v.region});
          }
          regionList.push(temp);
        });

        // dispatch(userActionServices.resetData());
      }
    }
    // dispatch(userActionServices.resetData());
    else {
      console.log('aman');
    }
  }, [getRegiondata]);


  
   useEffect(() => {
    hideLoader();

    if (updateProfileValue.type === UPDATE_PROFILE) {
      if (
        Object.keys(updateProfileValue?.value).length != 0 &&
        updateProfileValue?.value != undefined
      ) {

        navigation.reset({
          index: 0,
          routes: [{ name: 'DrawerComponent', params: { defaultIndex: 'Home' } }]
      })
       
      setTimeout(() => {
        snackbarSuccess(updateProfileValue?.value?.message);
      }, 200);
        // dispatch(userActionServices.resetData());
      }
    }
    // dispatch(userActionServices.resetData());
    else {
      console.log('aman');
    }
  }, [updateProfileValue]);
  // get api with postcode
  const handlePostcode = async () => {
    const dataPostCode = await apiConfig.postCode(
      'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Text=' +
        postCode +
        '&Container=&Origin=GBR&Countries=GBR&Datasets=&Limit=7&Filter=&Language=en&$block=true&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
    );

    console.log('dataPostCode>>', dataPostCode);
    // setPostCodeFind([])
    // setUpdatePostcodeData(!updatePostcodeData);
    dataPostCode.data.Items.map((v, i) => {
      postCodeFind.push(v);
      setCount(count + 1);
    });

    setUpdatePostcodeData(!updatePostcodeData);
  };
  // handle retrive postcode detail
  // const retrivePostcode = async (item, index) => {
  //   // setPostCodeId(item.Id);

  //   const getMoreAddress = await apiConfig.postCode(
  //     'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Text=' +
  //       postCode +
  //       '&Container=' +
  //       item.Id +
  //       '&Origin=GBR&Countries=GBR&Datasets=&Limit=7&Filter=&Language=en&$block=true&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
  //   );

  //   setPostCodeFind([]);
  //   console.log('getMoreAddress', getMoreAddress);
  //   getMoreAddress.data.Items.map((v, i) => {
  //     postCodeMoreFind.push(v);
  //   });
  //   setUpdatePostcodeMoreData(!updatePostcodeMoreData);
  // };
  const retrivePostcode = async (item, index) => {
    // setPostCodeId(item.Id);

    // const getMoreAddress = await apiConfig.postCode(
    //   'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Text=' +
    //   postCode +
    //   '&Container=' +
    //   item.Id +
    //   '&Origin=GBR&Countries=GBR&Datasets=&Limit=7&Filter=&Language=en&$block=true&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
    // );

    // setPostCodeFind([]);
    // console.log('getMoreAddress', getMoreAddress);
    // getMoreAddress.data.Items.map((v, i) => {
    //   postCodeMoreFind.push(v);
    // });
    // setUpdatePostcodeMoreData(!updatePostcodeMoreData);
    const getPostCodeData = await apiConfig.postCode(
      'https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Id=' +
      item.Id +
      '&Source=&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
    );
    // let flatNo1 = getPostCodeData.data.Items[0].SubBuilding?getPostCodeData.data?.Items[0].SubBuilding+', ':""
    // let flatNo2 =getPostCodeData.data?.Items[0].BuildingNumber?getPostCodeData.data?.Items[0].BuildingNumber+', ':""
    // let flatNo3 = getPostCodeData.data.Items[0].BuildingName?getPostCodeData.data.Items[0].BuildingName:""
    let flatNo1 = getPostCodeData.data.Items[0].SubBuilding?getPostCodeData.data.Items[0].SubBuilding:""
    if(getPostCodeData.data.Items[0].BuildingNumber && getPostCodeData.data.Items[0].SubBuilding){
        flatNo1 = flatNo1 + ", "
    }
    let flatNo2 = getPostCodeData.data.Items[0].BuildingNumber?getPostCodeData.data.Items[0].BuildingNumber:""
    if(getPostCodeData.data.Items[0].BuildingNumber && getPostCodeData.data.Items[0].BuildingName){
        flatNo2 = flatNo2 + ", "
    }
    let flatNo3 = getPostCodeData.data.Items[0].BuildingName?getPostCodeData.data.Items[0].BuildingName:""


    let town1 = getPostCodeData.data.Items[0].City?getPostCodeData.data?.Items[0].City+', ':""
    let town2 =getPostCodeData.data?.Items[0].AdminAreaName?getPostCodeData.data?.Items[0].AdminAreaName:""
    
    setHouse(flatNo1+flatNo2+flatNo3);
    setTown(town1+town2);
    setCountry(getPostCodeData.data.Items[0].CountryName);
   // setTown(getPostCodeData.data.Items[0].City +', ' +getPostCodeData?.data?.Items[0]?.AdminAreaName);
    setAddress(getPostCodeData.data.Items[0].Street);
    // setAddressLine2();
     setAddressLine2('')
   // setHouse(getPostCodeData.data.Items[0].BuildingNumber +'   '+ getPostCodeData?.data?.Items[0]?.BuildingName);
    setPostCode(getPostCodeData.data.Items[0].PostalCode);
    // setRegion(getPostCodeData.data.Items[0].District)
    setPostCodeFind([]);
    SetPostCodeMoreFind([]);
    //setUpdatePostcodeData(!updatePostcodeData);
    setUpdatePostcodeMoreData(!updatePostcodeMoreData);

    // setCountry(getPostCodeData.data.Items[0].CountryName);
    // setTown(getPostCodeData.data.Items[0].ProvinceName);
    // setAddressLine1(getPostCodeData.data.Items[0].Line1);
    // setAddressLine2(getPostCodeData.data.Items[0].Street);
    // setHouse(getPostCodeData.data.Items[0].BuildingNumber);
    // setPostCode(getPostCodeData.data.Items[0].PostalCode);
    // // setRegion(getPostCodeData.data.Items[0].District)
    // setPostCodeFind([]);
    // SetPostCodeMoreFind([]);
    // //setUpdatePostcodeData(!updatePostcodeData);
    // setUpdatePostcodeMoreData(!updatePostcodeMoreData);
  };
  const retrivePostcodeMore = async (item, index) => {
    const getPostCodeData = await apiConfig.postCode(
      'https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3ex.ws?Key=ND44-PB88-UZ69-WZ92&Id=' +
        item.Id +
        '&Source=&$cache=true&SOURCE=PCA-SCRIPT&SESSION=e5c56118-228e-bfad-2074-de0f8e3554b7',
    );

    setCountry(getPostCodeData.data.Items[0].CountryName);
    setTown(getPostCodeData.data.Items[0].ProvinceName);
     setAddress(getPostCodeData.data.Items[0].Line1);
     setAddressLine2(getPostCodeData.data.Items[0].Street);
     setHouse(getPostCodeData.data.Items[0].BuildingNumber);
    setPostCode(getPostCodeData.data.Items[0].PostalCode);
    // setRegion(getPostCodeData.data.Items[0].District)
    setPostCodeFind([]);
    SetPostCodeMoreFind([]);
    //setUpdatePostcodeData(!updatePostcodeData);
    setUpdatePostcodeMoreData(!updatePostcodeMoreData);
  };
  // render postcode
  const renderPostCode = ({item, index, separators}) => {
    return (
      <TouchableOpacity
        onPress={() => retrivePostcode(item, index)}
        style={{
          flex: 1,
          padding: ms(5),
          height: mvs(40),
        }}>
        <Text
          style={{
            fontSize: s(12),
            color: colors.blueLight,
            fontFamily: fonts.quicksandMedium,
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.Text},{item.Description}
        </Text>
      </TouchableOpacity>
    );
  };

  // render postcode
  const renderPostMoreCode = ({item, index, separators}) => {
    return (
      <TouchableOpacity
        onPress={() => retrivePostcodeMore(item, index)}
        style={{
          flex: 1,
          padding: ms(5),
          height: mvs(40),
        }}>
        <Text
          style={{
            fontSize: s(12),
            color: colors.blueLight,
            fontFamily: fonts.quicksandMedium,
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.Text},{item.Description}
        </Text>
      </TouchableOpacity>
    );
  };
  // handle postcode clear all state are clear
  const handlePostcodeClearData = text => {
    setPostCode(text);
    if (text.length > 0) {
      <></>;
    } else {
      setPostCodeFind([]);
      SetPostCodeMoreFind([]);
      setCountry('');
      setTown('');
      // setAddressLine1('');
       setAddressLine2('');
       setHouse('');
       setAddress('')
      setPostCode('');
    }
  };
  const updateProfile = () => {
    if (token == 'orgnization') {
      if (profile == '') {
        snackbarError('Upload Imgae ');
      } else if (organisationName == '') {
        snackbarError('Please enter organization name');
      } else if (email == '') {
        snackbarError('Please enter email');
      } else if (landlineNumber == '') {
        snackbarError('Please enter landline number');
      } else  if (mobileNumber?.trim() == '') {
        snackbarError('MobileNumber should not be blanked');
      } else if (/\s/.test(mobileNumber)) {
        snackbarError('Mobile number should not contains spaces');
      } else if (mobileNumber.length != 10) {
        snackbarError('Mobile number should be 10 digits');
      } else if (contactPersonName == '') {
        snackbarError('Please enter contact person name');
      } else if (sourceFunding?.id == 0) {
        snackbarError('Please select source of funding');
      }  else if (postCode == '' || postCode===undefined) {
        snackbarError('Please enter postcode');
      }  else if (house == ''|| house===undefined) {
        snackbarError('Select House/Flat No. ');
      } else if (address == ''|| address===undefined) {
        snackbarError('Please enter addresss ');
      } else if (town == ''|| town===undefined) {

        snackbarError('Please enter town');
      }else if (country==''|| country===undefined){
        snackbarError('Please enter country')
      }
      
     else{
        let formDatas = new FormData();
        if(updateImage == true){
          formDatas.append('profile_image',imageURL);
        }
      
        formDatas.append('organisation_name', organisationName);
        formDatas.append('landline_number', landlineNumber);
        formDatas.append('phone_number', mobileNumber);
        formDatas.append('contact_person', contactPersonName);
        formDatas.append('postcode', postCode);
     
      
        formDatas.append('town', town);
        formDatas.append('country', country);
        formDatas.append('address_line_1', address);
        formDatas.append('flat_no', house);
        formDatas.append('address_line_2', addressLine2);
        formDatas.append('source_of_funding',Number(sourceFunding?.id));
  console.log("formDatas>>>>>",formDatas);
        dispatch(userActionServices?.updateProfileAction(formDatas));
      }
    } else {
      if (profile == '') {
        snackbarError('Upload Imgae ');
      }else  if (mobileNumber?.trim() == '') {
        snackbarError('MobileNumber should not be blanked');
      } else if (/\s/.test(mobileNumber)) {
        snackbarError('Mobile number should not contains spaces');
      } else if (mobileNumber.length != 10) {
        snackbarError('Mobile number should be 10 digits');
      } if (sourceFunding?.id == 0) {
        snackbarError('Please select source of funding');
      } else if (postCode == ''|| postCode===undefined) {
        snackbarError('Please enter postcode');
      }  else if (house == ''|| house===undefined) {
        snackbarError('Select House/Flat No. ');
      } else if (address == ''|| address===undefined) {
        snackbarError('Please enter addresss ');
      }
      else if (town == ''|| town===undefined) {
        snackbarError('Please enter town');
      }
      else{
        let formDatas = new FormData();
        if(updateImage == true){
          formDatas.append('profile_image',imageURL);
        }
      
   
        formDatas.append('phone_number', mobileNumber);
        formDatas.append('postcode', postCode);
        formDatas.append('region_id', region?.id);
        formDatas.append('town', town);
        formDatas.append('country', country);
        formDatas.append('address_line_1', address);
        formDatas.append('flat_no', house);
        formDatas.append('address_line_2', addressLine2);
        formDatas.append('source_of_funding',Number(sourceFunding?.id));
  console.log("formDatas>>>>>",formDatas);
  
        dispatch(userActionServices?.updateProfileAction(formDatas));
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              paddingHorizontal: 20,
              paddingVertical: 30,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fonts.quicksandMedium,
                fontSize: s(18),
                marginBottom: mvs(20),
                color: colors.darkblue,
              }}>
              Select Type
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginHorizontal: 15}}>
                <TouchableOpacity
                  onPress={() => openCamera()}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.darkblue,
                    padding: ms(14),
                    backgroundColor: colors.darkblue,
                  }}>
                  <Text
                    style={{
                      fontSize: s(14),
                      color: colors.white,
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    Camera
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{marginHorizontal: 15}}>
                <TouchableOpacity
                  onPress={() => openGallery()}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.darkblue,
                    padding: ms(14),
                    backgroundColor: colors.darkblue,
                  }}>
                  <Text
                    style={{
                      fontSize: s(14),
                      color: colors.white,
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: ms(16),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => props.navigation.pop()}>
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
            Edit Profile
          </Text>
        </View>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('Notifications')}>
            <Image
              style={{
                height: mvs(19),
                width: ms(21),
                resizeMode: 'contain',
              }}
              source={images.notification}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{
          marginVertical: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignSelf: 'center',
            marginVertical: mvs(16),
            borderRadius: ms(40),
            borderColor: colors.darkblue,
          }}>
          {updateImage == true ? (
            <Image
              source={profile == null ? images?.profile : profile}
              style={{
                height: mvs(80),
                width: mvs(80),

                borderRadius: ms(40),
                resizeMode: 'cover',
              }}></Image>
          ) : (
            <Image
              source={
                profile == null
                  ? images?.profile
                  : {uri: Image_URL + profile}
              }
              style={{
                height: mvs(80),
                width: mvs(80),

                borderRadius: ms(40),
                resizeMode: 'cover',
              }}></Image>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setUpdateImage(true);
            setModalVisible(true);
          }}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: mvs(80),
            right: ms(145),
          }}>
          <Image
            source={images.editCamera}
            style={{
              height: mvs(30),
              width: mvs(30),

              resizeMode: 'contain',
            }}></Image>
        </TouchableOpacity>
        <View style={{marginTop: mvs(10), marginHorizontal: ms(16)}}>
          {token == 'orgnization' ? (
            <View style={{marginTop: mvs(20)}}>
              <Text style={styles.textTitle}>
                Organisation Name <Text style={{color: colors.red}}>*</Text>
              </Text>

              <View
                style={{
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.blueopacity,
                  borderRadius: ms(6),
                  padding: Platform.OS === 'android' ? ms(6) : ms(13),
                  marginTop: mvs(7),
                }}>
                <TextInput
                  style={{
                    color: colors.blue,
                    fontSize: s(14),

                    fontFamily: fonts.quicksandMedium,
                  }}
                  editable={false}
                  placeholderTextColor={colors.darkblue}
                  placeholder={organisationName}></TextInput>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.textTitle}>
                Title <Text style={{color: colors.red}}>*</Text>
              </Text>

              <MyDropDown
                // refs={refSubject}
                selected={title}
                itemList={titleList}
                edit={false}
                placeholder={'Select Title'}
                onUpdate={data => handleUpdate(data, 'Title')}
              />
            </View>
          )}
          {/* <Text style={styles.textTitle}>
            Title <Text style={{color: colors.red}}>*</Text>
          </Text>

          <TouchableOpacity
            onPress={() => setTitelModal(true)}
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
            <Text style={{color: colors.blueLight, fontSize: s(14)}}>
              {titleType == '' ? 'Select Title' : titleType}
            </Text>
            <Image
              source={images.downArrow}
              style={{
                height: mvs(8),
                width: mvs(14.6),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity> */}
          {token == 'orgnization' ? (
            <></>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: mvs(20),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: ms(6),
                    // padding: ms(13),
                    width: '48%',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: '#0d447a',
                      fontSize: s(16),
                      fontFamily: fonts.quicksandMedium,
                    }}>
                    First Name <Text style={{color: colors.red}}>*</Text>
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: ms(6),

                    // padding: ms(13),

                    width: '48%',

                    flexDirection: 'row',
                  }}>
                  <Text style={styles.textTitle}>
                    Last Name <Text style={{color: colors.red}}>*</Text>
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
                  onPress={() => userTypeSelct(1)}
                  style={{
                    borderRadius: ms(6),
                    paddingVertical: Platform.OS === 'ios' ? mvs(12) : mvs(4),
                    // padding: ms(13),
                    backgroundColor: colors.blueopacity,
                    width: '48%',
                    borderWidth: 1,
                    borderColor: '#eef7ff',
                 
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    style={{
                      fontSize: s(14),
                      marginLeft: ms(8),
                      color: colors.blue,
                      flex: 1,
                      fontFamily: fonts.quicksandMedium,
                    }}
                    editable={false}
                    placeholderTextColor={colors.darkblue}
                    placeholder={firstName}></TextInput>
                </View>
                <View
                  onPress={() => userTypeSelct(1)}
                  style={{
                    borderRadius: ms(6),
                    paddingVertical: Platform.OS === 'ios' ? mvs(12) : mvs(4),
                    // padding: ms(13),
                    backgroundColor: colors.blueopacity,
                    width: '48%',
                    borderWidth: 1,
                    borderColor: colors.lightBackground,
                   
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    style={{
                      fontSize: s(14),
                      marginLeft: ms(8),
                      color: colors.blue,
                      flex: 1,
                      fontFamily: fonts.quicksandMedium,
                    }}
                    editable={false}
                    placeholderTextColor={colors.darkblue}
                    placeholder={lastName}></TextInput>
                </View>
              </View>
            </View>
          )}
          <View style={{marginTop: mvs(20)}}>
            <Text style={styles.textTitle}>
              Email <Text style={{color: colors.red}}>*</Text>
            </Text>

            <View
              style={{
                borderColor: colors.lightBackground,
                backgroundColor: colors.blueopacity,
                borderRadius: ms(6),
                padding: Platform.OS === 'android' ? ms(6) : ms(13),
                marginTop: mvs(7),
              }}>
              <TextInput
                style={{
                  color: colors.white,
                  fontSize: s(14),

                  fontFamily: fonts.quicksandMedium,
                  flex: 1,
                }}
                // onKeyPress={snackbarError('Email not editable')}
                editable={false}
                placeholderTextColor={colors.darkblue}
                placeholder={email}></TextInput>
            </View>
          </View>

          {token == 'orgnization' ? (
            <View style={{marginTop: mvs(20)}}>
              <Text style={{color: '#0d447a', fontSize: s(16)}}>
                Landline Number <Text style={{color: colors.red}}>*</Text>
              </Text>

              <View
                style={{
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.lightBackground,
                  borderRadius: ms(6),
                  padding: ms(13),
                  marginTop: mvs(7),
                  flexDirection: 'row',
                  padding: Platform.OS === 'android' ? ms(4) : ms(13),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: colors.blue,
                    fontFamily: fonts.quicksandMedium,
                    marginLeft: Platform.OS === 'android' ? ms(5) : ms(0),
                  }}>
                  +44
                </Text>
                <View
                  style={{
                    height: Platform.OS === 'ios' ? '100%' : '50%',
                    width: ms(1),
                    marginHorizontal: ms(10),
                    backgroundColor: 'rgb(181,181,181)',
                  }}
                />

                <TextInput
                  style={{
                    color: colors.blue,
                    fontSize: s(14),
                    fontFamily: fonts.quicksandMedium,
                    flex: 1,
                  }}
                  maxLength={10}
                  keyboardType="number-pad"
                  value={landlineNumber}
                  onChangeText={text => setLandlineNumber(text)}
                  placeholderTextColor={colors.darkblue}
                  placeholder={landlineNumber}></TextInput>
              </View>
            </View>
          ) : (
            <></>
          )}
          <View style={{marginTop: mvs(20)}}>
            <Text style={{color: '#0d447a', fontSize: s(16)}}>
              Mobile Number{' '}
              {token == 'orgnization' ? (
                <></>
              ) : (
                <Text style={{color: colors.red}}>*</Text>
              )}
            </Text>

            <View
              style={{
                borderColor: colors.lightBackground,
                backgroundColor: colors.lightBackground,
                borderRadius: ms(6),
                padding: ms(13),
                marginTop: mvs(7),
                flexDirection: 'row',
                padding: Platform.OS === 'android' ? ms(4) : ms(13),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.blue,
                  marginLeft: Platform.OS === 'android' ? ms(5) : ms(0),
                  fontFamily: fonts.quicksandMedium,
                }}>
                +44
              </Text>
              <View
                style={{
                  height: Platform.OS === 'ios' ? '100%' : '50%',
                  width: ms(1),

                  marginHorizontal: ms(10),
                  backgroundColor: 'rgb(181,181,181)',
                }}
              />

              <TextInput
                style={{
                  color: colors.blue,
                  fontSize: s(14),

                  fontFamily: fonts.quicksandMedium,
                  flex: 1,
                }}
                maxLength={10}
                value={mobileNumber}
                onChangeText={text => setMobileNumber(text)}
                keyboardType="number-pad"
                placeholderTextColor={colors.darkblue}
                placeholder={mobileNumber}></TextInput>
            </View>
          </View>

          {token == 'orgnization' ? (
            <View style={{marginTop: mvs(20)}}>
              <Text style={styles.textTitle}>
                Contact Person Name <Text style={{color: colors.red}}>*</Text>
              </Text>

              <View
                style={{
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.lightBackground,
                  borderRadius: ms(6),
                  padding: Platform.OS === 'android' ? ms(6) : ms(13),
                  marginTop: mvs(7),
                }}>
                <TextInput
                  style={{
                    color: colors.blue,
                    fontSize: s(14),
                    flex: 1,
                    height: Platform.OS === 'ios' ? mvs(25) : mvs(40),
                    fontFamily: fonts.quicksandMedium,
                  }}
                  value={contactPersonName}
                  onChangeText={text => setcontactPersonName(text)}
                  placeholderTextColor={colors.darkblue}
                  placeholder={contactPersonName}></TextInput>
              </View>
            </View>
          ) : (
            <View style={{marginTop: mvs(20)}}>
              <Text style={{color: '#0d447a', fontSize: s(16)}}>
                Gender <Text style={{color: '#ff6363'}}>*</Text>
              </Text>
              <MyDropDown
                // refs={refSubject}
                selected={gender}
                itemList={genderList}
                edit={false}
                placeholder={'Select Gender'}
                onUpdate={data => handleUpdate(data, 'Gender')}
              />
            </View>
          )}

          <View style={{marginTop: mvs(20)}}>
            <Text style={{color: '#0d447a', fontSize: s(16)}}>
              Source of Funding  <Text style={{color: colors.red}}>*</Text>
            </Text>

            <MyDropDown
              // refs={refSubject}
              selected={sourceFunding}
              itemList={sourceFundingList}
            
              placeholder={'Select Source Funding'}
              onUpdate={data => handleUpdate(data, 'sourceFunding')}
            />
          </View>

          <View style={{marginTop: mvs(20)}}>
            <Text
              style={{
                color: colors.blue,
                fontSize: s(16),
                fontFamily: fonts.quicksandMedium,
              }}>
              Postcode <Text style={{color: colors.starcolor}}>*</Text>
            </Text>

            <View
              style={{
                borderColor: colors.lightBackground,
                backgroundColor: colors.lightBackground,
                borderRadius: ms(6),
                padding: Platform.OS === 'android' ? ms(6) : ms(13),
                marginTop: mvs(7),
                flexDirection:'row',
                flex:1,
                alignItems:'center',
              }}>
              <TextInput
                style={{
                  color: colors.blue,
                  fontSize: s(14),

                  fontFamily: fonts.quicksandMedium,
                  flex: 1,
                }}
                placeholderTextColor={colors.darkblue}
                onSubmitEditing={() => {
                  if (postCode?.length > 0) {
                    handlePostcode();
                  }
                }}
                // onBlur={() => {
                //   if (postCode.length > 0) {
                //     handlePostcode();
                //   }
                // }}
                returnKeyType="search"
                value={postCode}
                onChangeText={text => handlePostcodeClearData(text)}
                placeholder={postCode==undefined||postCode ==''||postCode ==null?"Postcode":postCode}></TextInput>

<TouchableOpacity onPress={()=>{
   if (postCode?.length > 0) {
    handlePostcode();
  }
}} >
<Image
            source={images.searchIcon}
            style={{
              height: mvs(19),
              width: mvs(19),
              resizeMode: 'contain',
              alignSelf: 'center',
              marginLeft: ms(17),
            }}
          />
          </TouchableOpacity>
            </View>
          </View>

          {postCodeFind.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              extraData={!updatePostcodeData}
              data={postCodeFind}
              style={{
                height: 'auto',
                maxHeight: mvs(180),
                minHeight: mvs(45),
              }}
              indicatorStyle="default"
              renderItem={renderPostCode}
            />
          ) : (
            <></>
          )}
          {postCodeMoreFind.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              extraData={!updatePostcodeMoreData}
              data={postCodeMoreFind}
              style={{
                height: 'auto',
                maxHeight: mvs(180),
                minHeight: mvs(45),
              }}
              indicatorStyle="default"
              renderItem={renderPostMoreCode}
            />
          ) : (
            <></>
          )}
        
            <View style={{marginTop: mvs(20)}}>
              <Text style={styles.textTitle}>House/Flat No.  <Text style={{color: colors.red}}>*</Text></Text>

              <View
                style={{
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.lightBackground,
                  borderRadius: ms(6),
                  padding: Platform.OS === 'android' ? ms(6) : ms(13),
                  marginTop: mvs(7),
                }}>
                <TextInput
                  style={{
                    color: colors.blue,
                    fontSize: s(14),
                    flex: 1,

                    fontFamily: fonts.quicksandMedium,
                  }}
                  value={house}
                  onChangeText={text => setHouse(text)}
                  placeholderTextColor={colors.darkblue}
                  placeholder={house==undefined||house ==''||house ==null?"House/Flat No.":house}></TextInput>
              </View>
            </View>
          
  
         
            <View style={{marginTop: mvs(20)}}>
              <Text style={styles.textTitle}>Address Line 1  <Text style={{color: colors.red}}>*</Text></Text>

              <View
                style={{
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.lightBackground,
                  borderRadius: ms(6),
                  padding: Platform.OS === 'android' ? ms(6) : ms(13),
                  marginTop: mvs(7),
                }}>
                <TextInput
                  style={{
                    color: colors.blue,
                    fontSize: s(14),
                    flex: 1,

                    fontFamily: fonts.quicksandMedium,
                  }}
                  value={address}
                  onChangeText={text => setAddress(text)}
                  placeholderTextColor={colors.darkblue}
                  placeholder={address==undefined||address ==''||address ==null?"Address Line 1":address}></TextInput>
              </View>
            </View>
          

        
            <View style={{marginTop: mvs(20)}}>
              <Text style={styles.textTitle}>
                Address Line 2 (
                <Text
                  style={{
                    color: colors.blueLight,
                    fontSize: s(15),
                    fontFamily: fonts.quicksandBook,
                  }}>
                  Optional
                </Text>
                )
              </Text>

              <View
                style={{
                  borderColor: colors.lightBackground,
                  backgroundColor: colors.lightBackground,
                  borderRadius: ms(6),
                  padding: Platform.OS === 'android' ? ms(6) : ms(13),
                  marginTop: mvs(7),
                }}>
                <TextInput
                  style={{
                    color: colors.blue,
                    fontSize: s(14),
                    flex: 1,

                    fontFamily: fonts.quicksandMedium,
                  }}
                  value={addressLine2}
                  onChangeText={text => setAddressLine2(text)}
                  placeholderTextColor={colors.grey}
                  placeholder="Address Line 2"></TextInput>
              </View>
            </View>
          
          <View style={{marginTop: mvs(20)}}>
            <Text style={styles.textTitle}>Town & County  <Text style={{color: colors.red}}>*</Text></Text>

            <View
              style={{
                borderColor: colors.lightBackground,
                backgroundColor: colors.lightBackground,
                borderRadius: ms(6),
                padding: Platform.OS === 'android' ? ms(6) : ms(13),
                marginTop: mvs(7),
              }}>
              <TextInput
                style={{
                  color: colors.blue,
                  fontSize: s(14),
                  flex: 1,

                  fontFamily: fonts.quicksandMedium,
                }}
                value={town}
                onChangeText={text => setTown(text)}
                placeholderTextColor={colors.darkblue}
                placeholder={town==undefined||town ==''||town ==null?"Town & County":town}></TextInput>
            </View>

        
              {/* <View style={{marginTop: mvs(20)}}>
                <Text style={styles.textTitle}>
                  Region/Country (
                  <Text
                    style={{
                      color: colors.blueLight,
                      fontSize: s(15),
                      fontFamily: fonts.quicksandBook,
                    }}>
                    Optional
                  </Text>
                  )
                </Text>

                <View
                  style={{
                    borderColor: colors.lightBackground,
                    backgroundColor: colors.lightBackground,
                    borderRadius: ms(6),
                    padding: Platform.OS === 'android' ? ms(6) : ms(13),
                    marginTop: mvs(7),
                  }}>
                  <TextInput
                    style={{
                      color: colors.blue,
                      fontSize: s(14),
                      flex: 1,

                      fontFamily: fonts.quicksandMedium,
                    }}
                    placeholderTextColor={colors.grey}
                    placeholder="Region/Country"></TextInput>
                </View>
              </View> */}
            
          </View>

          <View style={{ marginTop: mvs(20) }}>
            <Text style={styles.textTitle}>
              Country <Text style={{ color: colors.starcolor }}>*</Text>
             
            </Text>

            <View
              style={{
                borderColor: colors.lightBackground,
                backgroundColor: colors.lightBackground,
                borderRadius: ms(6),
                padding: Platform.OS === 'android' ? ms(6) : ms(13),
                marginTop: mvs(7),
              }}>
              <TextInput
                style={{
                  color: colors.blue,
                  fontSize: s(14),
                  fontFamily: fonts.quicksandMedium,
                }}
                value={country}
                onChangeText={text => setCountry(text)}
                placeholderTextColor={colors.grey}
                placeholder="Country"></TextInput>
            </View>
          </View>
          
            <View style={{marginTop: mvs(10), marginBottom: mvs(10)}}>
              <Text style={styles.textTitle}>Region  </Text>
              <MyDropDown
                // refs={refSubject}
                selected={region}
                itemList={regionList}
                placeholder={'Select Region'}
                //  onUpdate={data => handleUpdate(data, 'Nationality')}
                onUpdate={data => handleUpdate(data, 'Region')}
              />
            </View>
         
{/*          
            <View style={{marginTop: mvs(10), marginBottom: mvs(40)}}>
              <Text style={styles.textTitle}>
                Nationality <Text style={{color: colors.starcolor}}>*</Text>
              </Text>
              <MyDropDown
                // refs={refSubject}
                selected={nationality}
                itemList={nationalityList}
                placeholder={'Select Nationality'}
                //  onUpdate={data => handleUpdate(data, 'Nationality')}
                onUpdate={data => handleUpdate(data, 'Nationality')}
              />
            </View> */}
         
          <TouchableOpacity
            onPress={() => updateProfile()}
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
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textTitle: {
    color: colors.blue,
    fontSize: s(16),
    fontFamily: fonts.quicksandMedium,
  },
});
