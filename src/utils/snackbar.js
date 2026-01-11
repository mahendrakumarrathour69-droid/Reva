import Snackbar from 'react-native-snackbar';

export function snackbarSuccess(message) {
  return Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    textColor: '#ffffff',
    backgroundColor: 'green',
    numberOfLines:4
    
  });
}
export function snackbarError(message) {
  return Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    textColor: '#ffffff',
    backgroundColor: 'red',
    numberOfLines:4
  });
}
