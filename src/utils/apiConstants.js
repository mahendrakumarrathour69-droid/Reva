// export const API_URL = 'https://reva.devarka.com/';
 //export const API_URL = 'https://dev5425.revacare.co.uk/';
// export const API_URL = 'https://uat2249.revacare.co.uk/';
//  export const API_URL = 'https://www.revacare.co.uk/';
 export const API_URL = 'https://dev5425.revacare.co.uk/';
// export const Image_URL = 'https://reva.devarka.com/';
// export const Image_URL = 'https://revacare-dev.s3.ap-south-1.amazonaws.com';
//export const API_URL = 'https://reva.sandboxdevelopment.in/';
//export const Image_URL = 'https://reva.sandboxdevelopment.in/';
// export const Image_URL = 'https://reva-production.s3.eu-west-2.amazonaws.com';

// export const API_URL = 'http://192.168.2.122:8000/';
// export const Local_URL = 'http://192.168.2.122:8000/';
export const Image_URL = 'https://reva-dev.s3.eu-west-2.amazonaws.com';
//api end points
export const registerUser = 'api/register';
export const read_Notification = 'api/careseeker/set-notification-read';
export const verifyOtp = 'api/verify';
export const resendOtps = 'api/resend-otp';
export const login = 'api/login';
export const socialLogin = 'api/careseeker-social-login';
export const forgotEmails = 'api/forgot-password';
export const setPassword = 'api/reset-password';
export const getRegion = 'api/get_regions';
export const getMedicalExperties = 'api/get_expertises';
export const getCategorys = 'api/get_categories';
export const getPopularSearchList = 'api/careseeker/get-popular-searches';
export const getLanguage = 'api/get_languages';
export const getAllFields = 'api/get-post-job-dpdn-fields';
export const postjob = 'api/careseeker/post-job';
export const postjobAppliedList = 'api/careseeker/get_job_applied_list/';
export const postjobAppliedDeatil = 'api/careseeker/get_job_applied_detail/';
export const getCarerDetails = 'api/careseeker/get_carer_detail';
export const bookingModeShifts = 'api/get-booking-mode-shifts';
export const bookingModeRequestShifts =
  'api/careseeker/get-not-available-dates';
export const homeApiDetails = 'api/careseeker/get_home_page';
export const deleteAccount = 'api/careseeker/delete-account';
export const postJobTitles = 'api/careseeker/get-post-job-titles';
export const getjobpostedlists = 'api/careseeker/get_job_posted_list';
export const sendJobOfferCarer = 'api/careseeker/send-job-offer-to-carer';
export const declineServiceAgrements =
  'api/careseeker/decline-service-agreement';
export const postJobShiftValidations =
  'api/careseeker/post-job-shift-validation';
export const createPaymentIntents = 'api/careseeker/create-payment-intent';
export const createBookingReqPaymentIntents =
  'api/careseeker/create-booking-request-payment';
export const getCarerSearchListing = 'api/careseeker/get-carer-listing';
export const myBooking = 'api/careseeker/get-my-bookings';
export const confirmBookingRequestss =
  'api/careseeker/get_confirm_booking_request/';
export const carerBookingReqDataDropdown =
  'api/careseeker/get-carer-booking-req-drpdwn/';
export const getFillterDropDownData = 'api/careseeker/get_filter_drpdown_data';
export const paymentDetailsPopup = 'api/careseeker/get_job_payment_detail/';
export const getOfferDeclineData = 'api/get_offer_decline_reasons';
export const bookAnAppointments = 'api/careseeker/book-an-appointment';
export const carerAvailabilityOnDates =
  'api/careseeker/get_carer_availability_on_date';
export const getCategoryBasedTrainings = 'api/get_category_trainings';
export const declinejobOfferApi = 'api/careseeker/decline_job_offer';
export const getPayementDetail = 'api/careseeker/get_job_payment_detail/';
export const getPayementSummary = 'api/careseeker/get_job_payment_summary/';
export const viewProposalDetails = 'api/careseeker/view_proposal_applied_user/';
export const viewServiceAgrementDetails =
  'api/careseeker/view_service_agreement/';
export const updateConfrimBooking = 'api/careseeker/update_confirm_booking';
export const declineReasonCarer = 'api/get_declined_reason_of_job/';
export const getPostJobDropdownList = 'api/careseeker/get_post_job_dpdwn_data';
export const acceptAgrremntValidations =
  'api/careseeker/accept_service_agreement_validation';
  export const getJobPostDetails = 'api/careseeker/get_posted_job_detail/';
export const getServiceDeclineReq = 'api/careseeker/decline_job_offer';
export const applyPromoCodes = 'api/careseeker/apply-coupon';
export const couponCodesList = 'api/careseeker/get-coupons-list';
export const careSeekerCancelBooking = 'api/careseeker/cancel-booking';
export const careSeekerReviewList = 'api/careseeker/get_reviews_list';
export const carerReviewList = 'api/careseeker/get_reviews_list_on_search';
export const careSeekerSubmitReview = 'api/careseeker/submit_review';
export const bookingInvoiceApporval   = 'api/careseeker/booking-invoice-approval/';
export const declineInvoiceRequest = 'api/careseeker/decline-invoice-request';
export const invoiceApproval  = 'api/careseeker/invoice-for-approval';
export const paymentApproveInvoice  = 'api/careseeker/payment-approve-invoices/';
export const getCancelBookingInfo  = 'api/careseeker/get-cancel-booking-info';
export const createSupportTickets  = 'api/careseeker/create-support-ticket';
export const getCreateSupportTicket  = 'api/careseeker/support-ticket-detail/';
export const updateProfile  = 'api/careseeker/update-profile-data';
export const getUpdateProfile  = 'api/careseeker/get-profile';
export const getNationalities = 'api/get_nationalities';
export const paymentHistory = 'api/careseeker/payment-history';
export const notificationListApi = 'api/careseeker/notification-list';
export const chatBlockReportUser = 'api/careseeker/get-is-user-block';
export const reportUser = 'api/careseeker/chat-report-user';
export const getServiceRequestJobs = 'api/careseeker/get_request_job_list';
export const getCategoryBasedProfessionalExperiences =
  'api/get_category_prof_experiences';



// export const resendOtp = 'user/resend_otp';
//https://reva.sandboxdevelopment.in/api/careseeker/get_job_posted_list
//https://reva.sandboxdevelopment.in/api/careseeker/get_job_applied_list/17


