import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Platform,
    ImageBackground,
    Modal,
    ActivityIndicator,
  } from 'react-native';
  import React, { useContext, useEffect, useState, useRef } from 'react';
  import { s, vs, ms, mvs } from 'react-native-size-matters';
  import images from '../utils/images';
  import { fonts } from '../utils/font';
  import { colors } from '../utils/colors';
  import { ACCESS_TOKEN, TOKEN, USER_DATA } from '../utils/constant';
  import { useDispatch, useSelector } from 'react-redux';
  import { hideLoader, showLoader } from '../component/AppLoader';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { firebaseToken } from '../constant/constant';
  import { userActionServices } from '../redux/userServices';
  import { snackbarSuccess, snackbarError } from '../utils/snackbar';
  import { Image_URL, SUCCESS, careSeekerReviewList } from '../utils/apiConstants';
  // import ReadMore from '@fawazahmed/react-native-read-more';
  import { Popable } from 'react-native-popable';
  import ReadMore from 'react-native-read-more-text';
  import {
    JOBPOSTEDAPPLIEDLIST,
    LOGOUT,
    GETCARERSEARCHLISTING,
    FILTERDROPDOWNDATA,
    GETCATEGORYBASEDTRAINING,
    GETMEDICALEXPERTIESE,
    GETCATEGORYBASEDPROFESSIONALEXPERIENECES,
    REVIEW_LIST
  } from '../utils/reducerConstant';
import moment from 'moment';
import StarRating from 'react-native-star-rating-widget';

const ReviewRating = (props) => {
    const { navigation } = props;
 
    const dispatch = useDispatch();
    const [type, setType] = useState(1);
    const [reviews, setreviews] = useState(false);
  const [about, setAbout] = useState(false);
  const reviewListingValue = useSelector(state => state.reviewListingData);
  const [reviewReceievedList, setreviewReceievedList] = useState([])
  const [reviewSubmittedList, setreviewSubmittedList] = useState([])
  const [updateAppliedJobsist, setUpdateAppliedJobList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRating, setTotalRating] = useState('');
  const [avgRating, setAvgRating] = useState('');
      //screen chnage in about review avaialality
      const chooseMap = number => {
        setreviewReceievedList([]);
        setreviewSubmittedList([]);
       
        setType(number);
        setCurrentPage(1)
        apiCall(number);
        // if (number == 1) {
        //   setAbout(true);
        // } else if (number == 2) {
        //   setreviews(true);
        // }
      };
  useEffect(() => {
   apiCall(1)
   
  }, []);

  const apiCall=(types)=>{
    dispatch(userActionServices.reviewListingAction(careSeekerReviewList+'?type='+types+'&page_number='+1))
  }


  const loadMoreItem = () => {
    let loadPage = currentPage + 1;
    setCurrentPage(loadPage);
    if(type==1){
       if(reviewReceievedList.length>3){
        apiCall(1)
       } 
    }else{
        if(reviewSubmittedList.length>3){
            apiCall(2)
           }   
    }

  };
// response service request get api and set data
useEffect(() => {
    hideLoader();
    if (reviewListingValue.type === REVIEW_LIST) {
      if (reviewListingValue?.value?.status) {
        if (
          Object.keys(reviewListingValue?.value).length != 0 &&
          reviewListingValue?.value != undefined
        ) {
console.log("reviewListingValue",reviewListingValue?.value.data?.list);
        //   console.log("getJobPostLstData.value.data.data>>>>>", getJobPostLstData.value.data.data);
        //   if (Object.keys(getJobPostLstData?.value?.data?.data).length > 0) {
        //     setIsDataBlank(1)
        //   } else {
        //     setIsDataBlank(2)
        //   }
      
        setTotalRating(reviewListingValue.value?.data?.total_ratings)
        setAvgRating(reviewListingValue?.value?.data?.total_avg_rating)
       if(type==1){
        setreviewReceievedList(reviewReceievedList => [
            ...reviewReceievedList,
            ...reviewListingValue?.value?.data?.list,
          ]);
       }else{
        setreviewSubmittedList(reviewSubmittedList => [
            ...reviewSubmittedList,
            ...reviewListingValue?.value?.data?.list,
          ]);
       }
      
          dispatch(userActionServices.resetData());
        }
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [reviewListingValue]);

  const reviewItemRenderlist = ({item, index, separators}) => {

    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.lightBackground,
            marginHorizontal: s(16),
            backgroundColor: colors.white,
            marginVertical: ms(16),
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: ms(16),
              marginLeft: ms(16),
            }}>
            <Image
              // source={{
              //   uri: Image_URL + item?.from_user_info?.profile_image,
              // }}
              source={
                type==1?
                item?.from_user_info?.profile_image== null
                    ? images.defaultUser
                    : { uri: Image_URL + item?.from_user_info?.profile_image}

                    :
                    item?.user_info?.profile_image== null
                    ? images.defaultUser
                    : { uri: Image_URL + item?.user_info?.profile_image}
            }


              style={{
                height: mvs(80),
                width: mvs(80),
                resizeMode: 'stretch',
                borderWidth: 1,
                borderRadius: ms(80),
                borderColor: colors.lightBackground,
              }}></Image>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                marginHorizontal: ms(20),
                marginTop: ms(10),
              }}>
              <Text
                style={{
                  fontSize: s(18),
                  color: colors.blue,
                  fontFamily: fonts.quicksandMedium,
                }}>
                {
                
                type==1?
                item?.from_user_info?.organisation_name == null
                  ? item.from_user_info?.first_name +
                    ' ' +
                    item?.from_user_info?.last_name
                  : item?.from_user_info?.organisation_name:

                  item?.user_info?.organisation_name == null
                  ? item.user_info?.first_name +
                    ' ' +
                    item?.user_info?.last_name
                  : item?.user_info?.organisation_name
                }
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                
                }}>
                <Image
                  source={images.yellowstar}
                  style={{
                    height: mvs(16),
                    width: mvs(16),
                    resizeMode: 'contain',
                  }}></Image>
                <Text
                  style={{
                    marginLeft: s(5),
                    fontSize: s(12),
                    color: colors.darkblue,
                  }}>
                  {item.rating}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.grey,
                  fontSize: 14,
                  marginTop: ms(5),
                  fontFamily: fonts.quicksandMedium,
                }}>
                {moment(item.created_at).format('DD MMMM , YYYY')}
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: 16, padding: 10}}>
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
              {item?.description}
            </ReadMore>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const ratingReviews=(totalRatings,avgRatings)=>{
    console.log("avgRatings>>>",avgRatings);
    
     let avgRating = avgRatings.toString().split(".")
    let str1 = avgRating[0]
    return(
        <View style={{marginTop:16, borderWidth:1,borderColor:colors.lightGrey,height:67,marginHorizontal:16,borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:colors.lightGrey}}>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:30,fontFamily:fonts.quicksandMedium,color:colors.darkblue}}>{avgRatings}</Text>
            <View style={{flexDirection:'column'}}>
             {/* <StarRating
                                disabled={Number(avgRatings)}
                              
                                emptyStar={images.yellowstar}
                                fullStar={images.yellowstar}
                                // iconSet={'Ionicons'}
                                maxStars={5}
                                rating={Number(avgRatings)}
                                starSize={20}
                                containerStyle={{ marginHorizontal: 30, marginTop: 5 }}
                                onChange={(ratings) => setAvgRating(ratings)}
                                fullStarColor={'yellow'}
                            />  */}
{ <View style={{flexDirection:'row',marginHorizontal:10,marginTop:5}}>
{str1==1?
                            <>
 <Image style={{height:18,width:18}} source={images.yellowstar}></Image>
 <Image style={{height:18,width:18}} source={images.blackstar}></Image>
 <Image style={{height:18,width:18}} source={images.blackstar}></Image>
 <Image style={{height:18,width:18}} source={images.blackstar}></Image>
 <Image style={{height:18,width:18}} source={images.blackstar}></Image>
 
 </>
 
 :
 str1==2? <><Image style={{height:18,width:18}} source={images.yellowstar}></Image>
 <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    </>
    :str1==3?
    <>
    
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    </>:
  str1==4?
    <>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}></Image>
    </>
    :
    str1==5?
   <>
   <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.yellowstar}>
    
    </Image>
   </> 
:
<>
<Image style={{height:18,width:18}} source={images?.blackstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}>
    
    </Image>
    <Image style={{height:18,width:18}} source={images.blackstar}>
    
    </Image>

</>


                            }
</View> }


                <Text style={{fontSize:12,fontFamily:fonts.quicksandMedium,color:colors.headingColor,marginLeft:10}}>from {totalRatings} people</Text>
                </View>
            </View>
        </View>
    )

  }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
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
              fontSize: 20,
              color: colors.blue,
              fontFamily: fonts.quicksandMedium,
            }}
        >
            Review And Rating
          </Text>
        </View>
        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('SearchScreen')}>
            <Image
              style={{
                height: mvs(45),
                width: ms(45),
                resizeMode: 'contain',
              }}
              source={images.filter}
            />
          </TouchableOpacity> */}
        </View>
        </View>

      <View
        style={{
          marginTop: mvs(20),
          borderBottomWidth: 3,
          borderColor: colors.lightBackground,
        }}></View>

      <View
        style={{
          flexDirection: 'row',
       
        }}>
        <TouchableOpacity
          onPress={() => chooseMap(1)}
          style={{
            paddingVertical: ms(15),
            justifyContent: 'center',
            borderRadius: 5,
            flex: 1,
            backgroundColor:
              type == 1 ? colors.primaryColor : colors.lightBackground,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: type == 1 ? colors.white : colors.blue,
              fontSize: s(18),
              fontFamily: fonts.quicksandMedium,
            }}>
          Received
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => chooseMap(2)}
          style={{
            paddingVertical: ms(15),
            justifyContent: 'center',
            borderRadius: 5,
            flex: 1,
            backgroundColor:
              type == 2 ? colors.primaryColor : colors.lightBackground,
            borderColor: colors.lightBackground,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: type == 2 ? colors.white : colors.blue,
              fontSize: s(18),
              fontFamily: fonts.quicksandMedium,
            }}>
          Submitted
          </Text>
        </TouchableOpacity>
       
      </View>
     
        { 
        type==1?

        <View style={{flex: 1, backgroundColor: colors.white}}>
        {ratingReviews(totalRating,avgRating)}
        <FlatList
          data={reviewReceievedList}
          showsVerticalScrollIndicator={false}
          renderItem={reviewItemRenderlist}
          onEndReached={() => loadMoreItem()}
        />
        </View>
   
        
        :

        <View style={{flex: 1, backgroundColor: colors.white}}>
            {/* {ratingReviews(totalRating,avgRating)} */}
        <FlatList
          data={reviewSubmittedList}
          showsVerticalScrollIndicator={false}
          renderItem={reviewItemRenderlist}
          onEndReached={() => loadMoreItem()}
          
        />
      </View>


        }
        
      </SafeAreaView>
    );
}



export default ReviewRating;
