import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import GST, { colors, RF } from '../../../../Constant';
import Swiper from 'react-native-swiper';
import { storydata } from '../../../../utils/Dummydata';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StoryScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;
  const insert = useSafeAreaInsets();

  const handlesumbit = () => {
    navigation.navigate('HomeTab', {
      screen: 'Shop',
    });
  };

  return (
    <View style={[GST.MAIN, { paddingTop: insert.top }]}>
      <Swiper
        loop={false}
        showsButtons={false}
        showsPagination={true}
        paginationStyle={{ bottom: 10 }}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {storydata.map((item, i) => (
          <View style={{ flex: 1 }} key={i}>
            <Image
              source={item.image}
              style={[
                styles.storyImage,
                {
                  height:
                    item.txt && !item.bigsale
                      ? '85%'
                      : item.bigsale
                      ? '67%'
                      : '96%',
                  resizeMode:
                    item.txt || item.bigsale || isTablet ? 'stretch' : 'cover',
                },
              ]}
            />

            {item.bigsale && (
              <Image source={item.bigsale} style={styles.bigSaleImg} />
            )}

            {item.txt && (
              <View style={styles.txtRow}>
                <Text style={[styles.txt, { fontFamily: 'Raleway' }]}>
                  {item.txt}
                </Text>

                <TouchableOpacity
                  style={styles.shopButton}
                  onPress={handlesumbit}
                >
                  <Text style={[GST.subdescription, { color: colors.white }]}>
                    Shop
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {i === 4 && (
              <View style={styles.overlayBox}>
                <View style={GST.CENTERCONTAINER}>
                  <Image
                    source={require('../../../..//assets/Images/saleingimg.png')}
                    style={styles.saleImage}
                  />
                  <View style={styles.saleContent}>
                    <Text style={styles.txt}>
                      Lorem ipsum dolor sit amet{'\n'} consectetur.
                    </Text>
                    <TouchableOpacity
                      style={styles.saleShopButton}
                      onPress={handlesumbit}
                    >
                      <Text
                        style={[GST.subdescription, { color: colors.white }]}
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
