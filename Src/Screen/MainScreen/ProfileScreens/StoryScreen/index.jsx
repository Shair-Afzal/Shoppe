import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import GST, { colors, RF } from '../../../../Constant';
import Swiper from 'react-native-swiper';
import { storydata } from '../../../../utils/Dummydata';
import styles from './style';
import CustomButton from '../../../../Component/Custombutton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const StoryScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;
  const handlesumbit = () => {
    navigation.navigate('Home',{
      screen:"Shop"
    });
  };
  const insert=useSafeAreaInsets();
  return (
    <View style={{ ...GST.MAIN, paddingTop: RF(5),paddingTop:insert.top}}>
      <Swiper
        loop={false}
        showsButtons={false}
        showsPagination={true}
        paginationStyle={{ bottom: 10 }}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {storydata.map((item, i) => (
          <View style={{ flex: 1 }}>
            <Image
              source={item.image}
              style={{
                height:
                  item.txt && !item.bigsale
                    ? '85%'
                    : item.bigsale
                    ? '67%'
                    : '96%',
                width: '100%',
                resizeMode:
                  item.txt || item.bigsale || isTablet ? 'stretch' : 'cover',
              }}
            />
            {item.bigsale && (
              <Image
                source={item.bigsale}
                style={{ height: '20%', width: '100%' }}
              />
            )}
            {item.txt && (
              <View style={{ ...GST.mid_row, marginTop: RF(5), gap: RF(15) }}>
                <Text style={{ ...GST.smallesttxt, fontFamily: 'Raleway' }}>
                  {item.txt}
                </Text>

                <TouchableOpacity
                  style={{
                    ...GST.CENTER,
                    width: '40%',
                    height: RF(45),
                    backgroundColor: colors.blue,
                    borderRadius: RF(10),
                  }}
                  onPress={handlesumbit}
                >
                  <Text style={{ ...GST.subdescription, color: colors.white }}>
                    Shop
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {i == 4 && (
              <View
                style={{
                  padding: RF(10),
                  backgroundColor: colors.DarkWhite,
                  position: 'absolute',
                  bottom: RF(50),
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: RF(10),
                }}
              >
                <View style={GST.CENTERCONTAINER}>
                  <Image
                    source={require('../../../..//assets/Images/saleingimg.png')}
                    style={{
                      height: RF(130),
                      width: RF(130),
                      resizeMode: 'cover',
                      borderRadius: RF(10),
                    }}
                  />
                  <View
                    style={{ justifyContent: 'space-between', height: RF(130) }}
                  >
                    <Text style={GST.smallesttxt}>
                      Lorem ipsum dolor sit amet{'\n'} consectetur.
                    </Text>
                    <TouchableOpacity
                      style={{
                        ...GST.CENTER,
                        width: RF(120),
                        height: RF(45),
                        backgroundColor: colors.blue,
                        borderRadius: RF(10),
                      }}
                      onPress={handlesumbit}
                    >
                      <Text
                        style={{ ...GST.subdescription, color: colors.white }}
                      >
                        Shop
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default StoryScreen;
