import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import CustomInput, { pickImage } from '../../../../../Component/Custominput';
import Buttonicon from '../../../../../assets/SVG/Buttonicon.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style'; 

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

  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, styles.main, { paddingTop: insert.top }]}>
      <CustomHeader name={'Settings'} descrip={'Your Profile'} />

      {/* Profile Image */}
      <View style={styles.avatarContainer}>
        <Image
          source={
            selectedImage == null
              ? require('../../../../../assets/Images/avatar.png')
              : { uri: selectedImage.path }
          }
          style={styles.avatar}
        />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={handlePickImage}
        >
          <Buttonicon height={RF(25)} width={RF(25)} />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputWrapper}>
        <CustomInput
          value={name}
          containerStyle={styles.inputContainer}
          onChangeText={setName}
        />
        <CustomInput
          value={email}
          containerStyle={styles.inputContainer}
          onChangeText={setEmail}
        />
        <CustomInput
          value={password}
          secureTextEntry={true}
          containerStyle={styles.inputContainer}
          onChangeText={setPassword}
        />
      </View>
    </View>
  );
};

export default SettingProfile;
