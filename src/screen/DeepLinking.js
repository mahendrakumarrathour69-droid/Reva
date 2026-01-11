// import React from 'react';
// import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
// import { useState } from 'react';
// import Clipboard from '@react-native-community/clipboard';
// import { useEffect } from 'react';
// const DeepLinking = (props) => {
//     const [ copyLink, setCopylink]=useState('')
//    const buildLink= async()=> {
//         const link = await dynamicLinks().buildLink({
//           link: 'https://invertase.io/offer',
//           // domainUriPrefix is created in your Firebase console
//           domainUriPrefix: 'https://revaCare.page.link',
//           // optional setup which updates Firebase analytics campaign
//           // "banner". This also needs setting up before hand
//           analytics: {
//             campaign: 'banner',
//           },
//         });
      
//       setCopylink(link)
//       }
//       const handleDynamicLink = link => {
//         // Handle dynamic link inside your own application
//         if (link.url === 'https://invertase.io/offer') {
//           // ...navigate to your offers screen
//           alert("matched")
//           props?.navigation.navigate('RegisterScreen')
//         }
//       };
    
//       useEffect(() => {
//         const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
//         // When the component is unmounted, remove the listener
//         return () => unsubscribe();
//       }, []);
    
     
    
//     return (
//         <View>

//             <Text style={{marginTop:80}}>{copyLink}</Text>
//             <TouchableOpacity onPress={()=>{
//                 buildLink()
//             }}>            
//                 <Text style={{marginTop:50}}>genrate DeepLinking</Text>
//             </TouchableOpacity>
// <TouchableOpacity onPress={()=>{
//     Clipboard.setString(copyLink)
// }}>
//             <Text style={{
//                 marginTop:20
//             }}>copy DeepLinking</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({})

// export default DeepLinking;
