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
  FlatList,
  Button,
  Modal,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import images from '../utils/images';
import {fonts} from '../utils/font';
import {colors} from '../utils/colors';
import {
  CardField,
  CardFieldInput,
  useStripe,
  StripeProvider,
  confirmPayment,
  createToken,
  PaymentMethod,
  CardForm,
  createPaymentMethod,
} from '@stripe/stripe-react-native';
import {ACCESS_TOKEN, TOKEN, USER_DATA} from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoader, showLoader} from '../component/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseToken} from '../constant/constant';
import {userActionServices} from '../redux/userServices';
import {snackbarSuccess, snackbarError} from '../utils/snackbar';
import {Image_URL, SUCCESS} from '../utils/apiConstants';
// import ReadMore from '@fawazahmed/react-native-read-more';
import {Popable} from 'react-native-popable';
import {getjobpostedlists} from '../utils/apiConstants';
import ReadMore from 'react-native-read-more-text';
import axios from 'axios';
import {
  JOBPOSTEDLIST,
  LOGOUT,
  CREATEPAYMENTINTENT,
  CREATEBOOKINGREQPAYMENTINTENT,
  PAYMENT_APPROVE_INVOICE,
} from '../utils/reducerConstant';
export default function PaymentScreen(props) {
  const {navigation} = props;

  var id = props.route.params.id;
  var pay = props.route.params.pay;
  var from = props.route.params.from;
  const dispatch = useDispatch();

  const createpaymentIntents = useSelector(state => state.createpaymentIntents);
  const paymentApproveInvoiceValue = useSelector(
    state => state.paymentApproveInvoiceData,
  );
  console.log('paymentApproveInvoiceValue>>', paymentApproveInvoiceValue);
  const createBookingRequestpayment = useSelector(
    state => state.createBookingRequestpayment,
  );
  console.log('createpaymentIntents', createpaymentIntents);
  const [type, setType] = useState(1);
  const [paymentModal, setPayemnetModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [month, setmonth] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expmonth, setExpMonth] = useState('');
  const [expYear, setexpYear] = useState('');
  const [cardName, setCardName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [payedBy, setPayedBy] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [transactionNumber, setTransactionNumber] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [cardInfo, setCardInfo] = useState(null);
  const cardType = number => {
    setType(number);
  };

  useEffect(() => {
    console.log('id', id);
    console.log('pay', pay);
    if (props.route.params.from === 'confrimBooking') {
      id = props.route.params.id;
      pay = props.route.params.pay;
    } else {
      id = props.route.params.id;
      pay = props.route.params.pay;
    }
  }, [cardName]);
  const paymentDone = () => {
    setPayemnetModal(false);
    if (from === 'confrimBooking') {
      props.navigation.navigate('Home');
    } else {
      props.navigation.navigate('Home');
    }
  };
  // const mothSelect = text => {
  //   if (month(text).length() == 2) {
  //     text += "/"
  //   }
  //   setmonth(text)
  // };
  const [payemntIntents, setPayemntIntent] = useState('');

  const [card, setCard] = useState(CardFieldInput.Details || null);

  const API_URL = 'http://localhost:8000';
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const clientSecret =
    'YOUR_STRIPE_SECRET_KEY';

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {paymentIntent, ephemeralKey, customer} = await response.json();
    return {
      paymentIntent,
    };
  };
  const initializePaymentSheet = async () => {
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: payemntIntents,
    });
    if (!error) {
      setLoading(true);
    }
  };
  const openPaymentSheet = async () => {
    console.log('payemntIntents', payemntIntents);
    console.log('payment');

    let confrimpayIntent = await confirmPayment(payemntIntents, {
      paymentMethodType: 'Card',
    });
    console.log('confrimpayIntent', confrimpayIntent);
    const {error} = await presentPaymentSheet({payemntIntents});
    if (error) {
      console.log('error', error);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  const payNow = async () => {
    console.log('month', month);
    if (cardName.trim() == '') {
      snackbarError('Card name should not be blanked');
    } else if (cardNumber.trim() == '') {
      snackbarError('Please enter card number');
    } else if (cardNumber.length < 16) {
      snackbarError('Card number should be 16 digits');
    } else if (month.length < 7) {
      snackbarError('Please enter month and year');
    } else if (cardCvc.trim() == '') {
      snackbarError('Please enter cvc code');
    } else {
      let cardMonth = month.split('/');
      // let cardYear = month.split("/")
      let cardmonth = cardMonth[0];
      let cardYear = cardMonth[1];

      console.log('cardmonth', cardmonth);
      console.log('cardYear', cardYear);
      setExpMonth(cardmonth);
      setexpYear(cardYear);

      var cardDetails = {
        'card[number]': cardNumber,
        'card[exp_month]': cardMonth,
        'card[exp_year]': cardYear,
        'card[cvc]': cardCvc,
      };

      if (from == 'Invoice') {
        let bookingPayment = {
          cardname: cardName,
          cardnumber: cardNumber,
          Expiredate: cardmonth + '/' + cardYear,

          cvc: cardCvc,
        };

        console.log('bookingPayment', bookingPayment);
        dispatch(
          userActionServices.paymentApproveInvoiceAction(id, bookingPayment),
        );
      } else {
        let bookingPayment = {
          carer_booking_id: id,

          total_service_price: pay,
          card_number: cardNumber,
          card_exp_month: cardmonth,
          card_exp_year: cardYear,
          card_cvc: cardCvc,
        };
        console.log('bookingPayment', bookingPayment);

        dispatch(userActionServices.createPaymentIntent(bookingPayment));
      }
    }
  };

  useEffect(() => {
    // initializePaymentSheet();
  }, []);

  // response booking req payment
  useEffect(() => {
    hideLoader();
    console.log(
      'createBookingRequestpayment?.value?.status',
      createBookingRequestpayment?.value?.status,
    );
    if (createBookingRequestpayment.type === CREATEBOOKINGREQPAYMENTINTENT) {
      if (createBookingRequestpayment?.value?.status) {
        if (
          Object.keys(createBookingRequestpayment?.value).length != 0 &&
          createBookingRequestpayment?.value != undefined
        ) {
          if (
            createBookingRequestpayment.value.data.payment_info
              .payment_status === 'succeeded'
          ) {
            setPayemnetModal(true);
            setTransactionNumber(
              createBookingRequestpayment.value.data.payment_info
                .transaction_id,
            );
            setPayedBy(
              createBookingRequestpayment.value.data.payment_info.paid_by,
            );
            setTotalAmount(
              createBookingRequestpayment.value.data.payment_info
                .total_amount_paid,
            );
            setTransactionNumber(
              createBookingRequestpayment.value.data.payment_info
                .transaction_id,
            );

            setTransactionDate(
              createBookingRequestpayment.value.data.payment_info
                .transaction_date_time,
            );
          } else if (
            createBookingRequestpayment.value.data.payment_info
              .payment_status === 'payment_failed'
          ) {
            setCancelModal(true);
          } else {
            setTimeout(() => {
              // snackbarError(error.response.data.Message);
              snackbarSuccess(' Under Processing');
            }, 100);
            props.navigation.navigate('Home');
          }
          // snackbarSuccess(createpaymentIntents.value.message)
          // setPayemnetModal(true)
        }
      } else {
        console.log('1');

        setTimeout(() => {
        snackbarError(createBookingRequestpayment?.value?.message)
        }, 1000);
      }
    } 
  }, [createBookingRequestpayment]);
  // response job posted payment
  useEffect(() => {
    hideLoader();

    if (createpaymentIntents.type === CREATEPAYMENTINTENT) {
      if (createpaymentIntents?.value?.status) {
        if (
          Object.keys(createpaymentIntents?.value).length != 0 &&
          createpaymentIntents?.value != undefined
        ) {
          console.log(
            'createpaymentIntents',
            createpaymentIntents.value.data.payment_info.payment_status,
          );
          if (
            createpaymentIntents.value.data.payment_info.payment_status ===
            'succeeded'
          ) {
            setPayemnetModal(true);
            setTransactionNumber(
              createpaymentIntents.value.data.payment_info.transaction_id,
            );
            setPayedBy(createpaymentIntents.value.data.payment_info.paid_by);
            setTotalAmount(
              createpaymentIntents.value.data.payment_info.total_amount_paid,
            );
            setTransactionNumber(
              createpaymentIntents.value.data.payment_info.transaction_id,
            );

            setTransactionDate(
              createpaymentIntents.value.data.payment_info
                .transaction_date_time,
            );
          } else if (
            createpaymentIntents.value.data.payment_info.payment_status ===
            'payment_failed'
          ) {
            setCancelModal(true);
          } else {
            setTimeout(() => {
              // snackbarError(error.response.data.Message);
              snackbarSuccess(' Under Processing');
            }, 100);
            props.navigation.navigate('Home');
          }
          // snackbarSuccess(createpaymentIntents.value.message)
          // setPayemnetModal(true)
        }
      } else {
        setTimeout(() => {
          snackbarError(createpaymentIntents?.value?.message);
        
        }, 500);
      }
    }
    // dispatch(userActionServices.resetData());
    else {
    }
  }, [createpaymentIntents]);
  useEffect(() => {
    if (paymentApproveInvoiceValue.type === PAYMENT_APPROVE_INVOICE) {
      if (paymentApproveInvoiceValue?.value?.status) {
        if (
          Object.keys(paymentApproveInvoiceValue?.value).length != 0 &&
          paymentApproveInvoiceValue?.value != undefined
        ) {
          console.log(
            'paymentApproveInvoiceValue',
            paymentApproveInvoiceValue.value.data.payment_info.payment_status,
          );
          navigation.reset({
            index: 0,
            routes: [
              {name: 'DrawerComponent', params: {defaultIndex: 'MyBooking'}},
            ],
          });
          if (
            createBookingRequestpayment.value.data.payment_info
              .payment_status === 'succeeded'
          ) {
            navigation.reset({
              index: 0,
              routes: [
                {name: 'DrawerComponent', params: {defaultIndex: 'MyBooking'}},
              ],
            });
          } else if (
            paymentApproveInvoiceValue.value.data.payment_info
              .payment_status === 'payment_failed'
          ) {
            setCancelModal(true);
          } else {
            setTimeout(() => {
              // snackbarError(error.response.data.Message);
              snackbarSuccess(' Under Processing');
            }, 100);
            props.navigation.navigate('Home');
          }
          // snackbarSuccess(createpaymentIntents.value.message)
          // setPayemnetModal(true)
        }
      }else{
        setTimeout(() => {
          snackbarError(  paymentApproveInvoiceValue?.value?.message);
        
        }, 500);
      }
    }

    // dispatch(userActionServices.resetData());
    else {
    }
  }, [paymentApproveInvoiceValue]);

  const handleChange = text => {
    let textTemp = text;

    if (textTemp[0] !== '1' && textTemp[0] !== '0') {
      textTemp = '';
    }
    if (textTemp.length === 2) {
      if (
        parseInt(textTemp.substring(0, 2)) > 12 ||
        parseInt(textTemp.substring(0, 2)) == 0
      ) {
        textTemp = textTemp[0];
      } else if (month.length === 1) {
        textTemp += '/';
      } else {
        textTemp = textTemp[0];
      }
    }
    setmonth(textTemp);
  };

  // useEffect(() => {

  //   const response = axios.post(
  //     'https://api.stripe.com/v1/payment_methods',
  //     'type=card&card[number]=4242424242424242&card[exp_month]=8&card[exp_year]=2023&card[cvc]=314',
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       auth: {
  //         username: 'YOUR_STRIPE_SECRET_KEY'
  //       }
  //     }
  //   );
  //   console.log('resporesponseresponseresponsense', response)
  // })
  const fetchCardDetails = cardDetails => {
    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StripeProvider
        publishableKey="pk_test_51LAImgJUpntQXOszluxYXQJjIZ2d73sM8hiByIFYKPgfmAnLo6e3jjSnPws3haAnO4CQFiX26mXXKVTqdW7vy7iO00BXXDmFpY"
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
        {/* <Button
          style={styles.button}
          disabled={!loading}
          title="Checkout"
          color="#841584"
          onPress={openPaymentSheet}
        /> */}
        {/* <TouchableOpacity
          onPress={() => openPaymentSheet()}
          style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: s(20) }}>Pay</Text>
        </TouchableOpacity> */}
      </StripeProvider>

      <Modal animationType="slide" transparent={true} visible={paymentModal}>
        <View
          style={{
            flex: 1,

            backgroundColor: colors.blue60,
          }}>
          <ScrollView
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: ms(184),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
            showsVerticalScrollIndicator={false}>
            <Image
              source={images.paymentSycessfullSign}
              style={{
                height: mvs(99),
                alignSelf: 'center',
                marginTop: mvs(15),
                width: mvs(183),
                resizeMode: 'contain',
              }}></Image>
            <View style={{marginHorizontal: ms(16), flex: 1}}>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(16),
                  textAlign: 'center',
                  marginTop: mvs(27),
                  lineHeight: 24,
                  marginHorizontal: ms(34),
                  color: colors.blueLight,
                }}>
                Your payment has been processed! Details of transaction are
                included below
              </Text>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(25),

                  borderColor: colors.lightBackground,
                }}></View>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(14),
                  textAlign: 'center',
                  marginTop: mvs(25),
                  marginHorizontal: ms(34),
                  color: colors.green,
                }}>
                Transaction Number: {transactionNumber}
              </Text>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(25),

                  borderColor: colors.lightBackground,
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: mvs(26),
                }}>
                <View
                  style={{
                    flexDirection: 'row',

                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(14),
                      flex: 1,
                      color: colors.blueLight,
                    }}>
                    Total Amount Paid
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(14),
                      marginHorizontal: ms(11),
                      color: colors.blackopacity,
                    }}>
                    ---
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(16),
                    textAlign: 'right',
                    flex: 1,
                    color: colors.blue,
                  }}>
                  £ {totalAmount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: mvs(26),
                }}>
                <View
                  style={{
                    flexDirection: 'row',

                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(14),
                      flex: 1,
                      color: colors.blueLight,
                    }}>
                    Paid By
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(14),
                      marginHorizontal: ms(11),
                      color: colors.blackopacity,
                    }}>
                    ---
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(16),
                    textAlign: 'right',
                    flex: 1,
                    color: colors.blue,
                  }}>
                  {payedBy}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: mvs(26),
                }}>
                <View
                  style={{
                    flexDirection: 'row',

                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(14),
                      flex: 1,
                      color: colors.blueLight,
                    }}>
                    Transaction Date
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.quicksandMedium,
                      fontSize: s(14),
                      marginHorizontal: ms(11),
                      color: colors.blackopacity,
                    }}>
                    ---
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'right',
                    flex: 1,

                    color: colors.blue,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {transactionDate}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 4,
                height: 1,
                width: '100%',
                marginTop: mvs(15),

                borderColor: colors.lightBackground,
              }}></View>

            <TouchableOpacity
              onPress={() => paymentDone()}
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
                Done
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={cancelModal}>
        <View
          style={{
            flex: 1,

            backgroundColor: colors.blue60,
          }}>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              backgroundColor: 'white',

              marginTop: ms(400),
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            <Image
              source={images.paymentunsucessfull}
              style={{
                height: mvs(99),
                alignSelf: 'center',
                marginTop: mvs(15),
                width: mvs(183),
                resizeMode: 'contain',
              }}></Image>
            <Text
              style={{
                fontFamily: fonts.quicksandMedium,
                fontSize: s(22),
                textAlign: 'center',
                marginTop: mvs(25),
                marginHorizontal: ms(34),
                color: colors.red,
              }}>
              Payment UnSuccessful
            </Text>
            <View style={{marginHorizontal: ms(16), flex: 1}}>
              <View
                style={{
                  borderBottomWidth: 4,
                  marginTop: mvs(30),

                  borderColor: colors.lightBackground,
                }}></View>
              <Text
                style={{
                  fontFamily: fonts.quicksandMedium,
                  fontSize: s(16),
                  textAlign: 'center',
                  marginTop: mvs(27),
                  lineHeight: 24,
                  marginHorizontal: ms(34),
                  color: colors.blueLight,
                }}>
                Your payment method was declined. Please select a different
                payment method.
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 4,
                height: 1,
                width: '100%',
                marginTop: mvs(15),

                borderColor: colors.lightBackground,
              }}></View>
            <View style={{backgroundColor: colors.white, height: mvs(80)}}>
              <TouchableOpacity
                onPress={() => setCancelModal(false)}
                style={{
                  borderColor: colors.primaryColor,
                  backgroundColor: colors.primaryColor,
                  marginHorizontal: ms(16),
                  borderWidth: ms(1),
                  paddingVertical: ms(11),
                  justifyContent: 'center',
                  borderRadius: ms(6),
                  marginVertical: ms(18),
                }}>
                <Text
                  style={{
                    fontSize: s(18),
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: fonts.quicksandMedium,
                  }}>
                  Change Payment Method
                </Text>
              </TouchableOpacity>
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
            // onPress={() =>
            //   props.navigation.navigate(
            //     'ConfirmBooking',

            //     {
            //       itemId: 86,
            //       coupan: 'Apply Coupan',
            //     },
            //   )
            // }
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
            }}>
            Payment
          </Text>
        </View>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}></View>
      </View>
      <View
        style={{
          borderBottomWidth: 4,
          height: 1,
          width: '100%',
          marginTop: mvs(24),

          borderColor: colors.lightBackground,
        }}></View>

      <ScrollView>
        {/* <Text
          style={{
            fontSize: s(22),
            color: colors.blue,
            alignSelf: 'center',
            marginTop: s(24),
            fontFamily: fonts.quicksandMedium,
          }}>
          Select Payment Method
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: mvs(18),
            marginHorizontal: ms(16),
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => cardType(1)}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.primaryColor,
              borderRadius: 10,
              paddingVertical: ms(12),
              backgroundColor:
                type == 1 ? colors.lightBackground : colors.white,
              justifyContent: 'center',
            }}>
            <Image
              source={images.creditcard}
              style={{
                height: mvs(27),
                width: mvs(35),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />

            <Text
              style={{
                alignSelf: 'center',
                fontSize: s(16),
                color: type == 1 ? colors.primaryColor : colors.grey,
                marginTop: ms(5),
                fontFamily: fonts.quicksandMedium,
              }}>
              Credit/debit card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => cardType(2)}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.primaryColor,
              borderRadius: 10,
              marginLeft: ms(15),
              paddingVertical: ms(12),
              backgroundColor:
                type == 2 ? colors.lightBackground : colors.white,
              justifyContent: 'center',
            }}>
            <Image
              source={images.netBanking}
              style={{
                height: mvs(27),
                width: mvs(35),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />

            <Text
              style={{
                alignSelf: 'center',
                fontSize: s(16),
                color: type == 2 ? colors.primaryColor : colors.grey,
                marginTop: ms(5),
                fontFamily: fonts.quicksandMedium,
              }}>
              Net banking
            </Text>
          </TouchableOpacity>
        </View> */}

        <View style={{marginHorizontal: ms(16)}}>
          {/* 
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: colors.white,
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: "20%",

              marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
              fetchCardDetails(cardDetails)
              console.log('cardDetails', cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log('focusField', focusedField);
            }}

          /> */}
          <View style={{marginTop: mvs(20)}}>
            <Text
              style={{
                color: colors.blue,
                fontSize: s(16),
                fontFamily: fonts.quicksandMedium,
              }}>
              Name on card
            </Text>

            <TouchableOpacity
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
              <TextInput
                style={{
                  color: colors.blue,
                  fontSize: s(14),
                  flex: 1,

                  fontFamily: fonts.quicksandMedium,
                }}
                onChangeText={text => setCardName(text)}
                placeholderTextColor={colors.grey}
                placeholder="Name on card"></TextInput>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: mvs(20)}}>
            <Text
              style={{
                color: colors.blue,
                fontSize: s(16),
                fontFamily: fonts.quicksandMedium,
              }}>
              Card Number
            </Text>

            <TouchableOpacity
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
              <TextInput
                style={{
                  color: colors.blue,
                  fontSize: s(14),
                  flex: 1,
                  fontFamily: fonts.quicksandMedium,
                }}
                maxLength={16}
                onChangeText={text => setCardNumber(text)}
                keyboardType="number-pad"
                placeholderTextColor={colors.grey}
                placeholder="Card Number"></TextInput>
            </TouchableOpacity>
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
                Expires
              </Text>
            </View>
            <View
              style={{
                borderRadius: ms(6),

                // padding: ms(13),

                width: '48%',

                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: s(16),
                  fontFamily: fonts.quicksandMedium,
                }}>
                Security Code
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
                borderRadius: ms(6),
                paddingVertical: Platform.OS === 'ios' ? mvs(12) : mvs(4),
                // padding: ms(13),

                width: '48%',
                borderWidth: 1,
                borderColor: '#eef7ff',
                backgroundColor: '#eef7ff',
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
                keyboardType={'number-pad'}
                maxLength={7}
                value={month}
                placeholderTextColor={colors.grey}
                // onChangeText={(text) => {
                //   setmonth(
                //     text.length === 3 && !text.includes("/")
                //       ? `${text.substring(0, 2)}/${text.substring(2)}`
                //       : text
                //   );
                // }}
                onChangeText={text => handleChange(text)}
                placeholder="MM/YYYY"></TextInput>
            </View>
            <View
              style={{
                borderRadius: ms(6),
                paddingVertical: Platform.OS === 'ios' ? mvs(12) : mvs(4),
                // padding: ms(13),
                width: '48%',
                borderWidth: 1,
                borderColor: colors.lightBackground,
                backgroundColor: colors.lightBackground,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput
                style={{
                  fontSize: s(14),
                  marginLeft: ms(8),
                  color: colors.blue,
                  flex: 1,

                  fontFamily: fonts.quicksandMedium,
                }}
                maxLength={3}
                onChangeText={text => setCardCvc(text)}
                placeholderTextColor={colors.grey}
                keyboardType="number-pad"
                placeholder="CVC"></TextInput>
              <Image
                source={images.questionmark}
                style={{
                  height: mvs(19),
                  width: mvs(19),
                  resizeMode: 'contain',
                  marginRight: ms(10),
                }}
              />
            </View>
          </View>

          <View
            style={{
              height: mvs(120),
              marginTop: mvs(20),
              width: '100%',
              borderWidth: 2,
              backgroundColor: colors.lightBackground,
              borderStyle: 'dashed',
              borderColor: colors.blueopacity,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: ms(10),
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <Image
                  source={images.securePayemnt}
                  style={{
                    height: mvs(40),
                    width: mvs(40),
                    marginTop: ms(10),
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}></Image>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: ms(10),
                    color: colors.blueLight,
                  }}>
                  Secure Payment Processing
                </Text>
              </View>
              <View style={{flexDirection: 'column', flex: 1}}>
                <Image
                  source={images.satisficationguaranted}
                  style={{
                    height: mvs(40),
                    width: mvs(40),
                    marginTop: ms(10),
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}></Image>
                <Text
                  style={{
                    fontFamily: fonts.quicksandMedium,
                    fontSize: s(14),
                    textAlign: 'center',
                    marginTop: ms(10),
                    color: colors.blueLight,
                  }}>
                  100% Satisfaction Guaranteed
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          borderBottomWidth: 4,
          height: 1,
          width: '100%',
          marginTop: mvs(15),

          borderColor: colors.lightBackground,
        }}></View>
      <View style={{backgroundColor: colors.white, height: mvs(88)}}>
        <TouchableOpacity
          // onPress={() => setPayemnetModal(true)}
          onPress={() => payNow()}
          style={{
            borderColor: colors.primaryColor,
            backgroundColor: colors.primaryColor,
            marginHorizontal: ms(16),
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
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
  },
});
