import {apiConfig} from '../utils/apiConfig';
import {
  registerUser,
  verifyOtp,
  resendOtps,
  setPassword,
  login,
  profile,
  logoutApi,
  forgotEmails,
  getRoute,
  getRegion,
  getCategorys,
  getMedicalExperties,
  getLanguage,
  getAllFields,
  bookingModeShifts,
  postjob,
  homeApiDetails,
  getjobpostedlists,
  socialLogin,
  postjobAppliedList,
  getFillterDropDownData,
  getCategoryBasedTrainings,
  myBooking,
  getPopularSearchList,
  getCategoryBasedProfessionalExperiences,
  getJobPostDetails,
  postjobAppliedDeatil,
  postJobTitles,
  carerBookingReqDataDropdown,
  bookingModeRequestShifts,
  confirmBookingRequestss,
  createBookingReqPaymentIntents,
  postJobShiftValidations,
  getCarerSearchListing,
  getCarerDetails,
  carerAvailabilityOnDates,
  sendJobOfferCarer,
  createPaymentIntents,
  declineServiceAgrements,
  bookAnAppointments,
  getPostJobDropdownList,
  chatBlockReportUser,
  reportUser,
  getOfferDeclineData,
  viewProposalDetails,
  viewServiceAgrementDetails,
  updateConfrimBooking,
  paymentDetailsPopup,
  declinejobOfferApi,
  getPayementDetail,
  declineReasonCarer,
  acceptAgrremntValidations,
  getServiceRequestJobs,
  getServiceDeclineReq,
  applyPromoCodes,
  couponCodesList,
  getPayementSummary,
  careSeekerCancelBooking,
  careSeekerReviewList,
  careSeekerSubmitReview,
  bookingInvoiceApporval,
  declineInvoiceRequest,
  invoiceApproval,
  paymentApproveInvoice,
  getCancelBookingInfo,
  getCreateSupportTicket,
  createSupportTickets,
  getUpdateProfile,
  updateProfile,
  getNationalities,
  paymentHistory,
  notificationListApi,
  read_Notification,
  deleteAccount,
} from '../utils/apiConstants';
import {showLoader, hideLoader} from '../component/AppLoader';
import {
  REGISTER,
  RESET,
  VERIFYOTP,
  RESENDOTP,
  SETPASSWORD,
  LOGIN,
  PROFILE,
  FORGOTOTP,
  FORGOTEMAIL,
  LOGOUT,
  GETROUTE,
  GETREGION,
  GETCATEGORY,
  GETMEDICALEXPERTIESE,
  GETLANGUAGES,
  GETALLFIELDSPOSTJOB,
  BOOKINGMODESHIFT,
  POSTJOBS,
  GETLATLONG,
  HOMEAPIDETAILS,
  JOBPOSTEDLIST,
  SOCIALLOGIN,
  JOBPOSTEDAPPLIEDLIST,
  JOBPOSTEDAPPLIEDLISTDETAIL,
  POSTJOBTITLE,
  POSTJOBSHIFTVALIDATION,
  SENDJOBOFFER,
  CREATEPAYMENTINTENT,
  DECLINESERVICEAGREMENT,
  GETCARERSEARCHLISTING,
  GETCARERELISTDETAIL,
  CAREAVAILABILTYONDATE,
  FILTERDROPDOWNDATA,
  GETCATEGORYBASEDTRAINING,
  GETCATEGORYBASEDPROFESSIONALEXPERIENECES,
  BOOKINGMODEREQUESTSHIFT,
  BOOKANAPPOINTMENT,
  CONFIRMBOOKINGREQUEST,
  CARERBOOKINGREQUESTDROPDOWN,
  GETJPOBPOSTDETAILS,
  CREATEBOOKINGREQPAYMENTINTENT,
  MYBOOKINGLIST,
  GETPOPULARSEARCH,
  POST_JOB_DROPDOWN_DATA,
  CHAT_BLOCK_REPORT_USER,
  REPORTUSER,
  OFFERDECLINEREASONS,
  VIEW_PRPOSAL_DETAILS,
  VIEW_SERVICE_AGREEMENT_DETAILS,
  GETLATITUDELONGITUDE,
  UPDATE_CONFRIM_BOOKING,
  PAYMENT_DETAILS_POPUP,
  DECLINE_JOB_OFFER,
  DECLINE_REASON_CARER,
  ACCEPT_AGREEMENT_VALIDATIONS,
  SERVICE_REQUEST_JOBS,
  CANCEL_REQUEST_SERVICE,
  APPLY_PROMO_CODE,
  COUPON_LIST,
  CARESEEKER_CANCEL_BOOKING,
  PAYMENT_SUMMARY,
  SUBMIT_REVIEW,
  REVIEW_LIST,
  INVOICE_APPROVAL_LIST,
  DECLINE_INVOICE,
  ACCEPT_INVOICE,
  PAYMENT_APPROVE_INVOICE,
  CANCEL_BOOKING_INFO,
  CARER_REVIEW_LIST,
  GET_CREATE_TICKET,
  CREATE_TICKET,
  GET_UPDATE_PROFILE,
  UPDATE_PROFILE,
  NATIONALITIES,
  PAYMNET_HISTORY,
  NOTIFICATION_LIST,
  READ_NOTI,
  DELETEACCOUNT,
 
} from '../utils/reducerConstant';
import {ACCESS_TOKEN} from '../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userActionServices = {
  register,
  resetData,
  verifyData,
  forgotEmail,
  loginData,
  logout,
  resendOtp,
  setNewPassword,
  getRegions,
  getCategory,
  getMedicalExpertie,
  getLanaguages,
  getAllFeildsPostJob,
  bookingModeShift,
  postjobs,
  getLatLong,
  getLatituteLongitude,
  homeApi,
  getJobPosted,
  socialLoginData,
  jobPostedAppliedLists,
  jobPostedAppliedListsDetail,
  getCarerListsDetail,
  postJobTitle,
  postJobShiftValidation,
  sendPostJobOffer,
  createPaymentIntent,
  createBookingReqPaymentIntent,
  declineServiceAgreement,
  getCarerSearchListings,
  carerAvailabilityOnDate,
  filterListData,
  categoryBasedTraining,
  categoryBasedProfessionalExperience,
  bookingModeRequestShift,
  bookanAppointmentApi,
  confirmBookingRequests,
  carerBookingReqDropdown,
  getJobPostDetail,
  myBookings,
  getPopularSearch,
  getPostJobDropdownData,
  chatBlockReportUserAction,
  reportUserAction,
  offerDeclineReasons,
  getViewProposalDetail,
  getViewServiceAgrement,
  updateConfirmBooking,
  acceptAgreementValidation,
  declinejobOffer,
  paymentDetail,
  getDeclineReasonCarer,
  serviceRequestList,
  cancelRequestService,
  applyPromoCode,
  couponlistAction,
  cancelBookingAction,
  paymentSummary,
  submitReviewActiion,
  reviewListingAction,
  getInvoiceApprovalAction,
  rejectInvoiceAction,
  accpettInvoiceAction,
  paymentApproveInvoiceAction,
  getCancelBookingInfoActionb,
  carerReviewListingAction,
  getCreateSupportTicketAction,
  createSupportTicketAction,
  updateProfileAction,
  getUpdateProfileAction,
  getNationality,
  getPaymentHistory,
  notificationList,
  read__Notification,
  deletAccountS,
};
//block and report user
function chatBlockReportUserAction(chatBlockReportUserRequest) {
  console.log("chatBlockReportUserRequest>>>>",chatBlockReportUserRequest);
  
  // showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(
          chatBlockReportUser,
          token,
          chatBlockReportUserRequest,
        )
        .then(res => {
          hideLoader();
          dispatch({
            type: CHAT_BLOCK_REPORT_USER,
            payload: res,
          });
          console.log('responseeeeee', res);
        });
    });
  };
}

//report User
function reportUserAction(reportUserRequest) {
  console.log('reportUserRequest', reportUserRequest);
  // showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token=======>', token);
      apiConfig
        .postApiWithHeader(reportUser, token, reportUserRequest)
        .then(res => {
          hideLoader();
          dispatch({
            type: REPORTUSER,
            payload: res,
          });
          console.log('reportUserAction', res);
        });
    });
  };
}

//Register and login
function register(loginRequest) {
  showLoader();
  return dispatch => {
    apiConfig.postApi(registerUser, loginRequest).then(res => {
      hideLoader();
      dispatch({
        type: REGISTER,
        payload: res,
      });
    });
  };
}

// //read notification
// function read__Notification(loginRequest) {
//   showLoader();
//   return dispatch => {
//     apiConfig.postApi(read_Notification, loginRequest).then(res => {

//       hideLoader();
//       dispatch({
//         type: READ_NOTI,
//         payload: res,
//       });
//     });
//   };
// }

function read__Notification(body) {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.postApiWithHeader(read_Notification, token, body).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: READ_NOTI,
          payload: res,
        });
      });
    });
  };
}
// verify otp
function verifyData(otps) {
  console.log('otps', otps);
  showLoader();
  return dispatch => {
    apiConfig.postApi(verifyOtp, otps).then(res => {
      hideLoader();
      dispatch({
        type: VERIFYOTP,
        payload: res,
      });
    });
  };
}

// setPassworda
function setNewPassword(setPasswords) {
  console.log('setPassword', setPasswords);
  showLoader();
  return dispatch => {
    apiConfig.postApi(setPassword, setPasswords).then(res => {
      hideLoader();
      dispatch({
        type: SETPASSWORD,
        payload: res,
      });
    });
  };
}

// resend otp
function resendOtp(otps) {
  console.log('otps', otps);
  showLoader();
  return dispatch => {
    apiConfig.postApi(resendOtps, otps).then(res => {
      console.log('res', res);
      hideLoader();
      dispatch({
        type: RESENDOTP,
        payload: res,
      });
    });
  };
}

// login
function loginData(loginData) {
  console.log('logindata', loginData);
  showLoader();
  return dispatch => {
    apiConfig.postApi(login, loginData).then(res => {
      console.log('res', res);
      hideLoader();
      dispatch({
        type: LOGIN,
        payload: res,
      });
    });
  };
}

// fortgotemail
function forgotEmail(passwordReset) {
  console.log('PasswordReset', passwordReset);
  showLoader();
  return dispatch => {
    apiConfig.postApi(forgotEmails, passwordReset).then(res => {
      console.log('res', res);
      hideLoader();
      dispatch({
        type: FORGOTEMAIL,
        payload: res,
      });
    });
  };
}
//get regions

function getRegions() {
  showLoader();
  return dispatch => {
    apiConfig.getApi(getRegion).then(res => {
      console.log('res', res);
      hideLoader();
      dispatch({
        type: GETREGION,
        payload: res,
      });
    });
  };
}

//get  category
function getCategory() {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(getCategorys, token).then(res => {
        console.log('resCAtegory', res);
        hideLoader();
        dispatch({
          type: GETCATEGORY,
          payload: res,
        });
      });
    });
  };
}

//get  category
function getPopularSearch() {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(getPopularSearchList, token).then(res => {
        console.log('resCAtegory', res);
        hideLoader();
        dispatch({
          type: GETPOPULARSEARCH,
          payload: res,
        });
      });
    });
  };
}
// category based medical experties
function getMedicalExpertie(categoryId) {
  console.log('categoryId', categoryId);
  showLoader();
  return dispatch => {
    apiConfig.postApi(getMedicalExperties, categoryId).then(res => {
      console.log('res', res);
      hideLoader();
      dispatch({
        type: GETMEDICALEXPERTIESE,
        payload: res,
      });
    });
  };
}

//get  languages
function getLanaguages() {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(getLanguage, token).then(res => {
        console.log('resLanagage', res);
        hideLoader();
     
        dispatch({
          type: GETLANGUAGES,
          payload: res,
        });
      });
    });
  };
}
//get  all fields in post job
function getAllFeildsPostJob() {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(getAllFields, token).then(res => {
        console.log('resallfields', res);
        hideLoader();
        dispatch({
          type: GETALLFIELDSPOSTJOB,
          payload: res,
        });
      });
    });
  };
}
//Booking Mode shifts
function bookingModeShift(bookingMode) {
  showLoader();
  return dispatch => {
    apiConfig.postApi(bookingModeShifts, bookingMode).then(res => {
      console.log('bookingMode', res);
      hideLoader();
      dispatch({
        type: BOOKINGMODESHIFT,
        payload: res,
      });
    });
  };
}
//Booking Mode  Request Shifts
function bookingModeRequestShift(bookingMode) {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(bookingModeRequestShifts, token, bookingMode)
        .then(res => {
          hideLoader();
          dispatch({
            type: BOOKINGMODEREQUESTSHIFT,
            payload: res,
          });
        });
    });
  };
}

//get  jobPost detail
function getJobPostDetail(id) {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(getJobPostDetails + id, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: GETJPOBPOSTDETAILS,
          payload: res,
        });
      });
    });
  };
}
//get  view job proposal
function getViewProposalDetail(id) {
  console.log('aman', id);
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(viewProposalDetails + id, token).then(res => {
        console.log('redddddds', res);
        hideLoader();
        dispatch({
          type: VIEW_PRPOSAL_DETAILS,
          payload: res,
        });
      });
    });
  };
}
//get  view service agrement
function getViewServiceAgrement(id) {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .getApiWithHeader(viewServiceAgrementDetails + id, token)
        .then(res => {
          console.log('res', res);
          hideLoader();
          dispatch({
            type: VIEW_SERVICE_AGREEMENT_DETAILS,
            payload: res,
          });
        });
    });
  };
}
// save Post job
function postjobs(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig.postApiWithHeader(postjob, token, formData).then(res => {
        hideLoader();
        dispatch({
          type: POSTJOBS,
          payload: res,
        });
      });
    });
  };
}

// save Book An Appoointment
function bookanAppointmentApi(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(bookAnAppointments, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: BOOKANAPPOINTMENT,
            payload: res,
          });
        });
    });
  };
}

// post job shift validations job
function postJobShiftValidation(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(postJobShiftValidations, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: POSTJOBSHIFTVALIDATION,
            payload: res,
          });
        });
    });
  };
}
// send PostJob Offer
function sendPostJobOffer(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(sendJobOfferCarer, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: SENDJOBOFFER,
            payload: res,
          });
        });
    });
  };
}
// Craete payment intent
function createPaymentIntent(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(createPaymentIntents, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: CREATEPAYMENTINTENT,
            payload: res,
          });
        });
    });
  };
}
// Craete booking req payment intent
function createBookingReqPaymentIntent(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(createBookingReqPaymentIntents, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: CREATEBOOKINGREQPAYMENTINTENT,
            payload: res,
          });
        });
    });
  };
}
// Get carer search Listing
function getCarerSearchListings(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(getCarerSearchListing, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: GETCARERSEARCHLISTING,
            payload: res,
          });
        });
    });
  };
}
// Get carer search Listing
function carerAvailabilityOnDate(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(carerAvailabilityOnDates, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: CAREAVAILABILTYONDATE,
            payload: res,
          });
        });
    });
  };
}
// Decline Service Agrement
function declineServiceAgreement(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(declineServiceAgrements, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: DECLINESERVICEAGREMENT,
            payload: res,
          });
        });
    });
  };
}
// Decline JOB offer
function declinejobOffer(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(declinejobOfferApi, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: DECLINE_JOB_OFFER,
            payload: res,
          });
        });
    });
  };
}

//  getlatLong
function getLatLong(getLatLongData) {
  console.log('getLatLongData', getLatLongData);
  showLoader();
  return dispatch => {
    apiConfig.postLatLong(getLatLongData).then(res => {
      console.log('resLatLong', res);

      dispatch({
        type: GETLATLONG,
        payload: res,
      });
    });
  };
}
//  getlatLong
function getLatituteLongitude(getLatLongData) {
  console.log('getLatLongData', getLatLongData);
  showLoader();
  return dispatch => {
    apiConfig.postLatLong(getLatLongData).then(res => {
      console.log('res', res);

      dispatch({
        type: GETLATITUDELONGITUDE,
        payload: res,
      });
    });
  };
}

// Home Api
function homeApi() {
  // showLoader();
  return dispatch => {
    // console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('ACCESS_TOKEN', token);
      apiConfig.getApiWithHeader(homeApiDetails, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: HOMEAPIDETAILS,
          payload: res,
        });
      });
    });
  };
}
// Home Api
function deletAccountS() {
  // showLoader();
  return dispatch => {
    // console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('ACCESS_TOKEN', token);
      apiConfig.getApiWithHeader(deleteAccount, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: DELETEACCOUNT,
          payload: res,
        });
      });
    });
  };
}

// job posted applied list Api
function jobPostedAppliedLists(id) {
  // showLoader();
  return dispatch => {
    //  console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(postjobAppliedList + id, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: JOBPOSTEDAPPLIEDLIST,
          payload: res,
        });
      });
    });
  };
}
// Filter dropdown list
function filterListData() {
  // showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(getFillterDropDownData, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: FILTERDROPDOWNDATA,
          payload: res,
        });
      });
    });
  };
}
// Payment detail popup api
function paymentDetail(id) {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(getPayementDetail + id, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: PAYMENT_DETAILS_POPUP,
          payload: res,
        });
      });
    });
  };
}
// Payment detail popup api
function paymentSummary(id) {
  console.log('id>>>>', id);
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(getPayementSummary + id, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: PAYMENT_SUMMARY,
          payload: res,
        });
      });
    });
  };
}
// // Payment detail popup api
// function paymentDetailPopoup() {
//   showLoader();
//   return dispatch => {
//     AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
//       console.log('token', token);
//       apiConfig.getApiWithHeader(paymentDetailsPopup, token).then(res => {
//         console.log('res', res);
//         hideLoader();
//         dispatch({
//           type: PAYMENT_DETAILS_POPUP,
//           payload: res,
//         });
//       });
//     });
//   };
// }

// decline reason  api list

function offerDeclineReasons(body) {
  // showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .postApiWithHeader(getOfferDeclineData, token, body)
        .then(res => {
          console.log('res', res);
          hideLoader();
          dispatch({
            type: OFFERDECLINEREASONS,
            payload: res,
          });
        });
    });
  };
}

function updateConfirmBooking(body) {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .postApiWithHeader(updateConfrimBooking, token, body)
        .then(res => {
          console.log('res', res);
          hideLoader();
          dispatch({
            type: UPDATE_CONFRIM_BOOKING,
            payload: res,
          });
        });
    });
  };
}

// service request list
function serviceRequestList(body) {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .postApiWithHeader(getServiceRequestJobs, token, body)
        .then(res => {
          hideLoader();
          dispatch({
            type: SERVICE_REQUEST_JOBS,
            payload: res,
          });
        });
    });
  };
}

// Confirm Booking Request
function confirmBookingRequests(id) {
  // showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .getApiWithHeader(confirmBookingRequestss + id, token)
        .then(res => {
          console.log('res', res);
          hideLoader();
          dispatch({
            type: CONFIRMBOOKINGREQUEST,
            payload: res,
          });
        });
    });
  };
}
// carer booking request dropdown data
function carerBookingReqDropdown(id) {
  // showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .getApiWithHeader(carerBookingReqDataDropdown + id, token)
        .then(res => {
          console.log('res', res);
          hideLoader();
          dispatch({
            type: CARERBOOKINGREQUESTDROPDOWN,
            payload: res,
          });
        });
    });
  };
}

// category based training
function categoryBasedTraining(categoryId) {
  console.log('categoryId', categoryId);
  showLoader();
  return dispatch => {
    apiConfig.postApi(getCategoryBasedTrainings, categoryId).then(res => {
      console.log('res', res);
      hideLoader();
      dispatch({
        type: GETCATEGORYBASEDTRAINING,
        payload: res,
      });
    });
  };
}

// category based professioanl experieneces
function categoryBasedProfessionalExperience(categoryId) {
  console.log('categoryId', categoryId);
  showLoader();
  return dispatch => {
    apiConfig
      .postApi(getCategoryBasedProfessionalExperiences, categoryId)
      .then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: GETCATEGORYBASEDPROFESSIONALEXPERIENECES,
          payload: res,
        });
      });
  };
}
// postjobTitle
function postJobTitle() {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(postJobTitles, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: POSTJOBTITLE,
          payload: res,
        });
      });
    });
  };
}
// getDeclineReasonCarer
function getDeclineReasonCarer(body) {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(declineReasonCarer + body, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: DECLINE_REASON_CARER,
          payload: res,
        });
      });
    });
  };
}

// job posted applied Detail api
function jobPostedAppliedListsDetail(id) {
  // showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(postjobAppliedDeatil + id, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: JOBPOSTEDAPPLIEDLISTDETAIL,
          payload: res,
        });
      });
    });
  };
}
// job posted applied Detail api
function getCarerListsDetail(body) {
  console.log(' carer detail body>>>', body);
  // showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.postApiWithHeader(getCarerDetails, token, body).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: GETCARERELISTDETAIL,
          payload: res,
        });
      });
    });
  };
}

//logout
function logout() {
  const body = {};
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.postApiWithHeader(logoutApi, token, body).then(res => {
        hideLoader();
        dispatch({
          type: LOGOUT,
          payload: res,
        });
      });
    });
  };
}

//get  jobPosted list
function getJobPosted(querParmsApi) {
  console.log('querParmsApi', querParmsApi);
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .postApiWithHeader(getjobpostedlists, token, querParmsApi)
        .then(res => {
          console.log('res..', res);
          hideLoader();
          dispatch({
            type: JOBPOSTEDLIST,
            payload: res,
          });
        });
    });
  };
}

// cancel Request Service
function cancelRequestService(querParmsApi) {
  console.log('querParmsApi', querParmsApi);
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .postApiWithHeader(getServiceDeclineReq, token, querParmsApi)
        .then(res => {
          console.log('res', res);
          hideLoader();
          dispatch({
            type: CANCEL_REQUEST_SERVICE,
            payload: res,
          });
        });
    });
  };
}
//get  jobPosted list
function getJobPostedFilter(querParmsApi) {
  console.log('querParmsApi', querParmsApi);
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.postApiWithHeader(getjobpostedlists, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: JOBPOSTEDLIST,
          payload: res,
        });
      });
    });
  };
}

// login
function socialLoginData(socialData) {
  showLoader();
  return dispatch => {
    apiConfig.postApi(socialLogin, socialData).then(res => {
      console.log('res', res);
      hideLoader();
      dispatch({
        type: SOCIALLOGIN,
        payload: res,
      });
    });
  };
}

// My Booking
function myBookings(formData) {
  showLoader();

  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.postApiWithHeader(myBooking, token, formData).then(res => {
        hideLoader();
        dispatch({
          type: MYBOOKINGLIST,
          payload: res,
        });
      });
    });
  };
}
// My Booking
function getPostJobDropdownData(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(getPostJobDropdownList, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: POST_JOB_DROPDOWN_DATA,
            payload: res,
          });
        });
    });
  };
}
// My Booking
function acceptAgreementValidation(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(acceptAgrremntValidations, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: ACCEPT_AGREEMENT_VALIDATIONS,
            payload: res,
          });
        });
    });
  };
}
// Apply promo code
function applyPromoCode(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(applyPromoCodes, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: APPLY_PROMO_CODE,
            payload: res,
          });
        });
    });
  };
}
// Cancel booking
function cancelBookingAction(formData) {
  console.log('formData', formData);
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(careSeekerCancelBooking, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: CARESEEKER_CANCEL_BOOKING,
            payload: res,
          });
        });
    });
  };
}

//get coupon list
function couponlistAction() {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(couponCodesList, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: COUPON_LIST,
          payload: res,
        });
      });
    });
  };
}
//get invoice approval list
function getInvoiceApprovalAction(id) {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .getApiWithHeader(bookingInvoiceApporval + id, token)
        .then(res => {
          console.log('res', res);
          hideLoader();
          dispatch({
            type: INVOICE_APPROVAL_LIST,
            payload: res,
          });
        });
    });
  };
}

// reviewListingAction
function reviewListingAction(url) {
  console.log('url>>>', url);
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(url, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: REVIEW_LIST,
          payload: res,
        });
      });
    });
  };
}

// reviewListingAction
function carerReviewListingAction(url) {
  console.log('url>>>', url);
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(url, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: CARER_REVIEW_LIST,
          payload: res,
        });
      });
    });
  };
}

// get  create Support Ticket
function getCreateSupportTicketAction(url) {
  console.log('url>>>', url);
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig
        .getApiWithHeader(getCreateSupportTicket + url, token)
        .then(res => {
          console.log('res', res);
          hideLoader();
          dispatch({
            type: GET_CREATE_TICKET,
            payload: res,
          });
        });
    });
  };
}

// create suuport ticket

function createSupportTicketAction(formData) {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeaderMultiPart(createSupportTickets, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: CREATE_TICKET,
            payload: res,
          });
        });
    });
  };
}

// submitReviewActiion

function submitReviewActiion(formData) {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(careSeekerSubmitReview, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: SUBMIT_REVIEW,
            payload: res,
          });
        });
    });
  };
}

// reject invoice

function rejectInvoiceAction(formData) {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(declineInvoiceRequest, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: DECLINE_INVOICE,
            payload: res,
          });
        });
    });
  };
}
// Accept invoice

function accpettInvoiceAction(formData) {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(invoiceApproval, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: ACCEPT_INVOICE,
            payload: res,
          });
        });
    });
  };
}
function paymentApproveInvoiceAction(id, formData) {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(paymentApproveInvoice + id, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: PAYMENT_APPROVE_INVOICE,
            payload: res,
          });
        });
    });
  };
}
function getCancelBookingInfoActionb(formData) {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(getCancelBookingInfo, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: CANCEL_BOOKING_INFO,
            payload: res,
          });
        });
    });
  };
}

function updateProfileAction(formData) {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeaderMultiPart(updateProfile, token, formData)
        .then(res => {
          hideLoader();
          dispatch({
            type: UPDATE_PROFILE,
            payload: res,
          });
        });
    });
  };
}

// get  create Support Ticket
function getUpdateProfileAction() {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(getUpdateProfile, token).then(res => {
        console.log('res', res);
        hideLoader();
        dispatch({
          type: GET_UPDATE_PROFILE,
          payload: res,
        });
      });
    });
  };
}

function getNationality() {
  showLoader();
  return dispatch => {
    apiConfig.getApi(getNationalities).then(res => {
      console.log('res', res);
      hideLoader();
      dispatch({
        type: NATIONALITIES,
        payload: res,
      });
    });
  };
}
//get  view job proposal
function getPaymentHistory() {
  showLoader();
  return dispatch => {
    console.log('ACCESS_TOKEN', ACCESS_TOKEN);
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      apiConfig.getApiWithHeader(paymentHistory, token).then(res => {
        console.log('redddddds', res);
        hideLoader();
        dispatch({
          type: PAYMNET_HISTORY,
          payload: res,
        });
      });
    });
  };
}

// submitReviewActiion

function notificationList(formData) {
  showLoader();
  return dispatch => {
    AsyncStorage.getItem(ACCESS_TOKEN).then(token => {
      console.log('token', token);
      apiConfig
        .postApiWithHeader(notificationListApi, token, formData)
        .then(res => {
          console.log('res>>>>', res);
          hideLoader();
          dispatch({
            type: NOTIFICATION_LIST,
            payload: res,
          });
        });
    });
  };
}
// reset redux
function resetData() {
  return dispatch => {
    dispatch({
      type: RESET,
    });
  };
}
export const sendFbNotification = (token, data) => {
  console.log('data', data)
  const message = {
    registration_ids: [token.toString()],
    notification: {
      title: `New message from ${data?.sender_name}`,
      body: data?.message,
      "vibrate": 1,
      "sound": 1,
      "show_in_foreground": true,
      "priority": "high",
      "content_available": true,
    },
    data: {
      title: `New message from ${data?.sender_name}`,
      body: data?.message,
    }
  }

 const FIREBASE_AUTH_KEY = 'AAAAe5W_gEY:APA91bEX4p0XbxN5WXbSUDidli774Q8sNi-i4bRzVAia04pB2lWEotAmm9OP39YHjdHdVOyqTzA-S7Aj_cYvANkEjMWhviyz4uK2l_0pjCMCFPxxaXY3B46OsnWBNcrTys7T0v3JakZh'
  console.log('sendFbNotification message >', message)
  let FB_API_URL = 'https://fcm.googleapis.com/fcm/send'
  axios
    .post(FB_API_URL, message, {
      headers: {
        'Authorization': `key=${FIREBASE_AUTH_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      MyResponseLog('response sendNotification > ' + FB_API_URL, response);
      return response;
    })
    .catch(error => {
      MyResponseLog('error sendNotification > ' + FB_API_URL, error);
      return error.response;
    });
};