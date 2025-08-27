import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import CustomInput, { pickImage } from '../../../../../Component/Custominput';
import Buttonicon from '../../../../../assets/SVG/Buttonicon.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SettingProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('Romina');
  const [email, setEmail] = useState('gmail@example.com');
  const [password, setPassword] = useState('12345678');

  const handlePickImage = async () => {
    try {
      const image = await pickImage();
      if (image) {
        setSelectedImage(image);
      }
    } catch (error) {
      console.log('Error picking image: ', error);
    }
  };
  const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
      <CustomHeader name={'Settings'} descrip={'Your Profile'} />
      <View
        style={{
          height: RF(100),
          width: RF(100),
          borderRadius: RF(100),
          backgroundColor: colors.DarkWhite,
          elevation: 5,
          padding: RF(7),
          marginTop: RF(10),
        }}
      >
        <Image
          source={
            selectedImage == null
              ? require('../../../../../assets/Images/avatar.png')
              : { uri: selectedImage.path }
          }
          style={{
            height: '100%',
            width: '100%',
            borderRadius: RF(100),
            resizeMode: 'cover',
          }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', top: RF(15), right: 0 }}
          onPress={handlePickImage}
        >
          <Buttonicon height={RF(25)} width={RF(25)} />
        </TouchableOpacity>
      </View>
      <View style={{ gap: RF(10), marginTop: RF(15) }}>
        <CustomInput
          value={name}
          containerStyle={{
            backgroundColor: colors.lightblue,
            borderRadius: RF(5),
          }}
          onChangeText={setName}
        />
        <CustomInput
          value={email}
          containerStyle={{
            backgroundColor: colors.lightblue,
            borderRadius: RF(5),
          }}
          onChangeText={setEmail}
        />
        <CustomInput
          value={password}
          secureTextEntry={true}
          containerStyle={{
            backgroundColor: colors.lightblue,
            borderRadius: RF(5),
          }}
          onChangeText={setPassword}
        />
      </View>
    </View>
  );
};

export default SettingProfile;
