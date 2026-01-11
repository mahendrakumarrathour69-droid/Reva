import axios from 'axios';
import { API_URL, Local_URL } from './apiConstants';
import { snackbarError } from '../utils/snackbar';
async function getApiWithHeader(url, header) {
  return axios
    .get(API_URL + url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header,
      },
    })
    .then(response => {
      console.log('response', response);
      return response;
    })
    .catch(error => {
      console.log('errors', error);
      console.log('error?.response?.data', error?.response?.data);
      console.log('error?.response', error?.response);
      return error?.response;
    });
}

async function getApi(url) {
  return axios
    .get(API_URL + url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error?.response;
      console.log('error?.response?.data', error?.response?.data);
    });
}

async function postApiWithHeader(url, header, body) {
  return axios
    .post(API_URL + url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + header,
      },
    })
    .then(response => {
     
      return response;
    })
    .catch(error => {
      console.log('error', error);
      console.log('error?.response?.data', error?.response?.data);
      return error?.response;

    });
}

// async function postApiWithHeaderMultiPart(url, header, body, encodeUserId) {
//   return axios
//     .post(API_URL + url, body, {
//       headers:
//         url == 'user/create-booking' || 'user/add-wallet'
//           ? {
//               'Content-Type': 'application/json',
//               Authorization: 'Bearer' + header,
//               BOOKING: encodeUserId,
//             }
//           : {
//               Accept: 'application/json',
//               'Content-Type': 'multipart/form-data',
//               Authorization: 'Bearer' + header,
//             },
//     })
//     .then(response => {
//       console.log('response', response);
//       return response;
//     })
//     .catch(error => {
//       console.log('error', error);
//       return error;
//     });
// }
async function postApiWithHeaderMultiPart(url, header, body) {
  return axios
    .post(API_URL + url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + header,
      },
    })
    .then(response => {
      console.log( ' postApiWithHeaderMultiPart response', response);
      console.log( ' p?????', JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log('error======>>>>', error);
      console.log('erro?.responser======>>>>', error?.response);
      console.log('error?.response?.data', error?.response?.data);
      return error?.response;
      // setTimeout(() => {
      //   snackbarError(error.response.data.message);
      // }, 100);
    });
}
async function postApi(url, body) {
  console.log("Apiurl", API_URL + url);
  return axios
    .post(API_URL + url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('response', response);
      return response;
    })
    .catch(error => {
      console.log('error======>>>>', error);
      console.log('error?.response', error?.response);
      console.log('error?.response?.data', error?.response?.data);
      return error?.response;
      // setTimeout(() => {
      //   snackbarError(error.response.data.message);
      // }, 100);
      //return error;
    });
}
// async function postApi(url, body) {
//   return axios
//     .post(API_URL + url, body, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then(response => {
//       console.log('response', response);
//       return response;
//     })
//     .catch(error => {
//       console.log('error======>>>>', error);
//       setTimeout(() => {
//         snackbarError(error.response.data.message);
//       }, 100);
//       //return error;
//     });
// }

// async function paymentApi(body) {
//   return axios
//     .post('https://testapi.yenepay.com/api/urlgenerate/getcheckouturl/', body, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then(response => {
//       console.log('response', response);
//       return response;
//     })
//     .catch(error => {
//       console.log('error', error);
//       return error;
//     });
// }
async function postCode(url) {
  return axios
    .get(url)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log('error======>>>>', error);
      // setTimeout(() => {
      //   // snackbarError(error.response.data.Message);
      //   snackbarError('Please enter a valid PostCode');
      // }, 100);
      //return error;
    });
}

async function postLatLong(body) {
  return axios
    .post(
      'https://services.postcodeanywhere.co.uk/Geocoding/International/Geocode/v1.10/json3.ws',
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then(response => {
      console.log('response', response);
      return response;
    })
    .catch(error => {
      console.log('error======>>>>', error);
      return error?.response;
      // setTimeout(() => {
      //   snackbarError(error.response.data.message);
      // }, 100);
      //return error;
    });
}
async function getCountry(url) {
  return axios
    .get(url)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log('error======>>>>', error);
      // setTimeout(() => {
      //   // snackbarError(error.response.data.Message);
      //   snackbarError('Please enter a valid Country');
      // }, 100);
      //return error;
    });
}
export const apiConfig = {
  getApi,
  getApiWithHeader,
  postApi,
  postApiWithHeader,
  postApiWithHeaderMultiPart,
  postCode,
  getCountry,
  postLatLong,
  // paymentApi,
};
