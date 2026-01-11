import {
  LOGIN,
  REGISTER,
  RESENDOTP,
  RESET,
  SETPASSWORD,
  VERIFYOTP,
  PROFILE,
  LOGOUT,
  FORGOTOTP,
  GETREGION,
  FORGOTEMAIL,
  GETMEDICALEXPERTIESE,
  HOMEAPIDETAILS,
  GETCATEGORY,
  GETLANGUAGES,
  GETALLFIELDSPOSTJOB,
  BOOKINGMODESHIFT,
  POSTJOBS,
  GETLATLONG,
  JOBPOSTEDLIST,
  SOCIALLOGIN,
  CREATEPAYMENTINTENT,
  DECLINESERVICEAGREMENT,
  GETCARERSEARCHLISTING,
  CAREAVAILABILTYONDATE,
  FILTERDROPDOWNDATA,
  JOBPOSTEDAPPLIEDLIST,
  JOBPOSTEDAPPLIEDLISTDETAIL,
  POSTJOBTITLE,
  POSTJOBSHIFTVALIDATION,
  SENDJOBOFFER,
  GETCARERELISTDETAIL,
  GETCATEGORYBASEDTRAINING,
  BOOKINGMODEREQUESTSHIFT,
  CARERBOOKINGREQUESTDROPDOWN,
  GETCATEGORYBASEDPROFESSIONALEXPERIENECES,
  BOOKANAPPOINTMENT,
  CONFIRMBOOKINGREQUEST,
  POST_JOB_DROPDOWN_DATA,
  GETJPOBPOSTDETAILS,
  CREATEBOOKINGREQPAYMENTINTENT,
  MYBOOKINGLIST,
  GETPOPULARSEARCH,
  OFFERDECLINEREASONS,
  VIEW_PRPOSAL_DETAILS,
  VIEW_SERVICE_AGREEMENT_DETAILS,
  GETLATITUDELONGITUDE,
  PAYMENT_DETAILS_POPUP,
  UPDATE_CONFRIM_BOOKING,
  DECLINE_JOB_OFFER,
  DECLINE_REASON_CARER,
  ACCEPT_AGREEMENT_VALIDATIONS,
  SERVICE_REQUEST_JOBS,
  CANCEL_REQUEST_SERVICE,
  APPLY_PROMO_CODE,
  COUPON_LIST,
  PAYMENT_SUMMARY,
  CARESEEKER_CANCEL_BOOKING,
  SUBMIT_REVIEW,
  REVIEW_LIST,
  INVOICE_APPROVAL_LIST,
  ACCEPT_INVOICE,
  DECLINE_INVOICE,
  PAYMENT_APPROVE_INVOICE,
  CANCEL_BOOKING_INFO,
  CARER_REVIEW_LIST,
  GET_CREATE_TICKET,
  CREATE_TICKET,
  NATIONALITIES,
GET_UPDATE_PROFILE,
UPDATE_PROFILE,
PAYMNET_HISTORY,
NOTIFICATION_LIST,
ISLOADING,
READ_NOTI,
DELETEACCOUNT,
CHAT_BLOCK_REPORT_USER,
REPORTUSER
} from '../utils/reducerConstant';

const initialState = {};
const inititialStates = {
  isLoading:false
};

const DefaultReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        type: LOGIN,
        value: action.payload.data,
      });
    case REGISTER:
      return Object.assign({}, state, {
        type: REGISTER,
        value: action.payload.data,
      });
    case READ_NOTI:
      return Object.assign({}, state, {
        type: READ_NOTI,
        value: action.payload.data,
      });
    case RESET:
      return Object.assign({}, state, {
        type: RESET,
      });
    case VERIFYOTP:
      return Object.assign({}, state, {
        type: VERIFYOTP,
        value: action.payload.data,
      });
    case RESENDOTP:
      return Object.assign({}, state, {
        type: RESENDOTP,
        value: action.payload.data,
      });
    case SETPASSWORD:
      return Object.assign({}, state, {
        type: SETPASSWORD,
        value: action.payload.data,
      });
    case LOGIN:
      return Object.assign({}, state, {
        type: LOGIN,
        value: action.payload.data,
      });
    case PROFILE:
      return Object.assign({}, state, {
        type: PROFILE,
        value: action.payload.data,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        type: LOGOUT,
        value: action.payload.data,
      });
    case FORGOTOTP:
      return Object.assign({}, state, {
        type: FORGOTOTP,
        value: action.payload.data,
      });
    case FORGOTEMAIL:
      return Object.assign({}, state, {
        type: FORGOTEMAIL,
        value: action.payload.data,
      });
    case GETREGION:
      return Object.assign({}, state, {
        type: GETREGION,
        value: action.payload.data,
      });
    case GETCATEGORY:
      return Object.assign({}, state, {
        type: GETCATEGORY,
        value: action.payload.data,
      });
    case GETMEDICALEXPERTIESE:
      return Object.assign({}, state, {
        type: GETMEDICALEXPERTIESE,
        value: action.payload.data,
      });
    case GETLANGUAGES:
      return Object.assign({}, state, {
        type: GETLANGUAGES,
        value: action.payload.data,
      });
    case GETALLFIELDSPOSTJOB:
      return Object.assign({}, state, {
        type: GETALLFIELDSPOSTJOB,
        value: action.payload.data,
      });
    case BOOKINGMODESHIFT:
      return Object.assign({}, state, {
        type: BOOKINGMODESHIFT,
        value: action.payload.data,
      });
    case POSTJOBS:
      return Object.assign({}, state, {
        type: POSTJOBS,
        value: action.payload.data,
      });
    case GETLATLONG:
      return Object.assign({}, state, {
        type: GETLATLONG,
        value: action.payload.data,
      });
    case HOMEAPIDETAILS:
      return Object.assign({}, state, {
        type: HOMEAPIDETAILS,
        value: action.payload.data,
      });
    case JOBPOSTEDLIST:
      return Object.assign({}, state, {
        type: JOBPOSTEDLIST,
        value: action.payload.data,
      });
    case VIEW_PRPOSAL_DETAILS:
      return Object.assign({}, state, {
        type: VIEW_PRPOSAL_DETAILS,
        value: action.payload.data,
      });

    case SOCIALLOGIN:
      return Object.assign({}, state, {
        type: SOCIALLOGIN,
        value: action.payload.data,
      });
    case JOBPOSTEDAPPLIEDLIST:
      return Object.assign({}, state, {
        type: JOBPOSTEDAPPLIEDLIST,
        value: action.payload.data,
      });

    case JOBPOSTEDAPPLIEDLISTDETAIL:
      return Object.assign({}, state, {
        type: JOBPOSTEDAPPLIEDLISTDETAIL,
        value: action.payload.data,
      });
    case POSTJOBTITLE:
      return Object.assign({}, state, {
        type: POSTJOBTITLE,
        value: action.payload.data,
      });
    case POSTJOBSHIFTVALIDATION:
      return Object.assign({}, state, {
        type: POSTJOBSHIFTVALIDATION,
        value: action.payload.data,
      });
    case SENDJOBOFFER:
      return Object.assign({}, state, {
        type: SENDJOBOFFER,
        value: action.payload.data,
      });
    case CREATEPAYMENTINTENT:
      return Object.assign({}, state, {
        type: CREATEPAYMENTINTENT,
        value: action.payload.data,
      });
    case DECLINESERVICEAGREMENT:
      return Object.assign({}, state, {
        type: DECLINESERVICEAGREMENT,
        value: action.payload.data,
      });
    case GETCARERSEARCHLISTING:
      return Object.assign({}, state, {
        type: GETCARERSEARCHLISTING,
        value: action.payload.data,
      });
    case GETCARERELISTDETAIL:
      return Object.assign({}, state, {
        type: GETCARERELISTDETAIL,
        value: action.payload.data,
      });
    case CAREAVAILABILTYONDATE:
      return Object.assign({}, state, {
        type: CAREAVAILABILTYONDATE,
        value: action.payload.data,
      });
    case FILTERDROPDOWNDATA:
      return Object.assign({}, state, {
        type: FILTERDROPDOWNDATA,
        value: action.payload.data,
      });
    case GETCATEGORYBASEDTRAINING:
      return Object.assign({}, state, {
        type: GETCATEGORYBASEDTRAINING,
        value: action.payload.data,
      });
    case GETCATEGORYBASEDPROFESSIONALEXPERIENECES:
      return Object.assign({}, state, {
        type: GETCATEGORYBASEDPROFESSIONALEXPERIENECES,
        value: action.payload.data,
      });
    case BOOKINGMODEREQUESTSHIFT:
      return Object.assign({}, state, {
        type: BOOKINGMODEREQUESTSHIFT,
        value: action.payload.data,
      });
    case BOOKANAPPOINTMENT:
      return Object.assign({}, state, {
        type: BOOKANAPPOINTMENT,
        value: action.payload.data,
      });
    case CONFIRMBOOKINGREQUEST:
      return Object.assign({}, state, {
        type: CONFIRMBOOKINGREQUEST,
        value: action.payload.data,
      });
    case CARERBOOKINGREQUESTDROPDOWN:
      return Object.assign({}, state, {
        type: CARERBOOKINGREQUESTDROPDOWN,
        value: action.payload.data,
      });
    case GETJPOBPOSTDETAILS:
      return Object.assign({}, state, {
        type: GETJPOBPOSTDETAILS,
        value: action.payload.data,
      });
    case CREATEBOOKINGREQPAYMENTINTENT:
      return Object.assign({}, state, {
        type: CREATEBOOKINGREQPAYMENTINTENT,
        value: action.payload.data,
      });
    case MYBOOKINGLIST:
      return Object.assign({}, state, {
        type: MYBOOKINGLIST,
        value: action.payload.data,
      });

    case GETPOPULARSEARCH:
      return Object.assign({}, state, {
        type: GETPOPULARSEARCH,
        value: action.payload.data,
      });
    case POST_JOB_DROPDOWN_DATA:
      return Object.assign({}, state, {
        type: POST_JOB_DROPDOWN_DATA,
        value: action.payload.data,
      });
    case VIEW_SERVICE_AGREEMENT_DETAILS:
      return Object.assign({}, state, {
        type: VIEW_SERVICE_AGREEMENT_DETAILS,
        value: action.payload.data,
      });
    case OFFERDECLINEREASONS:
      return Object.assign({}, state, {
        type: OFFERDECLINEREASONS,
        value: action.payload.data,
      });
    case GETLATITUDELONGITUDE:
      return Object.assign({}, state, {
        type: GETLATITUDELONGITUDE,
        value: action.payload.data,
      });
    case UPDATE_CONFRIM_BOOKING:
      return Object.assign({}, state, {
        type: UPDATE_CONFRIM_BOOKING,
        value: action.payload.data,
      });
    case PAYMENT_DETAILS_POPUP:
      return Object.assign({}, state, {
        type: PAYMENT_DETAILS_POPUP,
        value: action.payload.data,
      });
    case DECLINE_JOB_OFFER:
      return Object.assign({}, state, {
        type: DECLINE_JOB_OFFER,
        value: action.payload.data,
      });
    case DECLINE_REASON_CARER:
      return Object.assign({}, state, {
        type: DECLINE_REASON_CARER,
        value: action.payload.data,
      });
    case ACCEPT_AGREEMENT_VALIDATIONS:
      return Object.assign({}, state, {
        type: ACCEPT_AGREEMENT_VALIDATIONS,
        value: action.payload.data,
      });
    case SERVICE_REQUEST_JOBS:
      return Object.assign({}, state, {
        type: SERVICE_REQUEST_JOBS,
        value: action.payload.data,
      });
    case CANCEL_REQUEST_SERVICE:
      return Object.assign({}, state, {
        type: CANCEL_REQUEST_SERVICE,
        value: action.payload.data,
      });
    case APPLY_PROMO_CODE:
      return Object.assign({}, state, {
        type: APPLY_PROMO_CODE,
        value: action.payload.data,
      });
    case COUPON_LIST:
      return Object.assign({}, state, {
        type: COUPON_LIST,
        value: action.payload.data,
      });
    case CARESEEKER_CANCEL_BOOKING:
      return Object.assign({}, state, {
        type: CARESEEKER_CANCEL_BOOKING,
        value: action.payload.data,
      });
    case PAYMENT_SUMMARY:
      return Object.assign({}, state, {
        type: PAYMENT_SUMMARY,
        value: action.payload.data,
      });
    case REVIEW_LIST:
      return Object.assign({}, state, {
        type: REVIEW_LIST,
        value: action.payload.data,
      });
    case SUBMIT_REVIEW:
      return Object.assign({}, state, {
        type: SUBMIT_REVIEW,
        value: action.payload.data,
      });
    case INVOICE_APPROVAL_LIST:
      return Object.assign({}, state, {
        type: INVOICE_APPROVAL_LIST,
        value: action.payload.data,
      });
    case DECLINE_INVOICE:
      return Object.assign({}, state, {
        type: DECLINE_INVOICE,
        value: action.payload.data,
      });
    case ACCEPT_INVOICE:
      return Object.assign({}, state, {
        type: ACCEPT_INVOICE,
        value: action.payload.data,
      });
    case PAYMENT_APPROVE_INVOICE:
      return Object.assign({}, state, {
        type: PAYMENT_APPROVE_INVOICE,
        value: action.payload.data,
      });
    case CANCEL_BOOKING_INFO:
      return Object.assign({}, state, {
        type: CANCEL_BOOKING_INFO,
        value: action.payload.data,
      });
    case CARER_REVIEW_LIST:
      return Object.assign({}, state, {
        type: CARER_REVIEW_LIST,
        value: action.payload.data,
      });
    case GET_CREATE_TICKET:
      return Object.assign({}, state, {
        type: GET_CREATE_TICKET,
        value: action.payload.data,
      });
    case CREATE_TICKET:
      return Object.assign({}, state, {
        type: CREATE_TICKET,
        value: action.payload.data,
      });
    case NATIONALITIES:
      return Object.assign({}, state, {
        type: NATIONALITIES,
        value: action.payload.data,
      });
      case GET_UPDATE_PROFILE:
        return Object.assign({}, state, {
          type: GET_UPDATE_PROFILE,
          value: action.payload.data,
        }); 
        
        case UPDATE_PROFILE:
        return Object.assign({}, state, {
          type: UPDATE_PROFILE,
          value: action.payload.data,
        });
        case PAYMNET_HISTORY:
        return Object.assign({}, state, {
          type: PAYMNET_HISTORY,
          value: action.payload.data,
        });
        case NOTIFICATION_LIST:
        return Object.assign({}, state, {
          type: NOTIFICATION_LIST,
          value: action.payload.data,
        });
        case  DELETEACCOUNT:
        return Object.assign({}, state, {
          type:DELETEACCOUNT ,
          value: action.payload.data,
        });
        case  CHAT_BLOCK_REPORT_USER:
        return Object.assign({}, state, {
          type:CHAT_BLOCK_REPORT_USER ,
          value: action.payload.data,
        });
        case  REPORTUSER:
        return Object.assign({}, state, {
          type:REPORTUSER ,
          value: action.payload.data,
        });
    default:
      return state;
  }
};

export default DefaultReducers;

