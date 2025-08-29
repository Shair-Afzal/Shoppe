import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import GST, { colors, fontFamily, RF } from '../../Constant';
import Check from '../../assets/SVG/Check.svg';
import CustomButton from '../Custombutton';
import Like from "../../assets/SVG/Like.svg"
import UnLike from "../../assets/SVG/UnLike.svg"

const VariationModal = ({ visible, onclose ,cartpress,buypress}) => {
  const [select, setselect] = useState('');
  const [size, setsize] = useState('');
  const [quantity, setquantity] = useState(1);
  const [fav,setfav]=useState(false)
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onclose}
      statusBarTranslucent={true}
    >
      <View style={GST.MODALMAIN}>
        <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
          <View
            style={{
              backgroundColor: colors.darkgrey,
              padding: RF(15),
              width: '100%',
              paddingVertical: RF(25),
              borderTopLeftRadius: RF(10),
              borderTopRightRadius: RF(10),
            }}
          >
            <View style={{ ...GST.ROW, gap: RF(10) }}>
              <Image
                source={require('../../assets/Images/imgvariation.png')}
                style={{ height: RF(65), width: RF(65) }}
              />
              <View style={{ marginTop: RF(15), gap: RF(5) }}>
                <Text
                  style={{ ...GST.description, fontFamily: fontFamily.bold }}
                >
                  $17,00
                </Text>
                <View style={{ ...GST.ROW, gap: RF(5) }}>
                  <View
                    style={{
                      ...GST.CENTER,
                      width: RF(50),
                      padding: RF(3),
                      backgroundColor: colors.lightblue,
                      borderRadius: RF(5),
                    }}
                  >
                    <Text style={GST.smallesttxt}>Pink</Text>
                  </View>
                  <View
                    style={{
                      ...GST.CENTER,
                      width: RF(50),
                      padding: RF(3),
                      backgroundColor: colors.lightblue,
                      borderRadius: RF(5),
                    }}
                  >
                    <Text style={GST.smallesttxt}>M</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.DarkWhite,
              padding: RF(15),
              paddingVertical: RF(10),
            }}
          >
            <Text
              style={{ ...GST.subdescription, fontFamily: fontFamily.bold }}
            >
              Color Options
            </Text>
            <FlatList
              data={[1, 2, 3, 4]}
              horizontal
              contentContainerStyle={{ gap: RF(5) }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{ height: RF(77), width: RF(77), marginTop: RF(15) }}
                  onPress={() => setselect(index)}
                >
                  <Image
                    source={require('../../assets/Images/imgvariation.png')}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                  {select == index && (
                    <Check
                      height={RF(20)}
                      width={RF(20)}
                      style={{
                        position: 'absolute',
                        bottom: RF(5),
                        left: RF(5),
                      }}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
            <Text
              style={{
                ...GST.subdescription,
                marginTop: RF(10),
                fontFamily: fontFamily.bold,
              }}
            >
              Size
            </Text>
            <FlatList
              data={['s', 'm', 'l', 'xl', 'xxl', 'xxxl']}
              horizontal
              contentContainerStyle={{ gap: RF(10), marginTop: RF(15) }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    ...GST.CENTER,
                    width: RF(45),
                    backgroundColor: size==index?colors.lightblue:index>3?"#BEC8E5":colors.grey,
                    padding: RF(2),
                    borderRadius: RF(5),
                    borderWidth:size==index?1:0,
                    borderColor:colors.blue
                  }}
                  onPress={()=>setsize(index)}
                  disabled={index>3&&true}
                >
                  <Text style={{ ...GST.smallesttxt, fontSize: RF(14), color:index>3&& colors.lightblue}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={{ ...GST.CENTERCONTAINER, marginTop: RF(15) }}>
              <Text
                style={{ ...GST.subdescription, fontFamily: fontFamily.bold }}
              >
                Quantity
              </Text>
              <View style={{ ...GST.mid_row, gap: RF(10) }}>
                <TouchableOpacity
                  style={{
                    ...GST.CENTER,
                    height: RF(35),
                    width: RF(35),
                    backgroundColor: colors.DarkWhite,
                    borderColor: colors.blue,
                    borderWidth: 1,
                    borderRadius: RF(100),
                  }}
                  onPress={()=> {if(quantity>1)setquantity(quantity-1)}}
                >
                  <Text style={{ ...GST.description, color: colors.blue,marginBottom:RF(5) }}>
                    -
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    ...GST.CENTER,
                    backgroundColor: colors.lightblue,
                    padding: RF(5),
                    width: RF(55),
                    borderRadius: RF(10),
                  }}
                >
                  <Text style={{...GST.subHeading,fontFamily:fontFamily.DMreg}}>{quantity}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    ...GST.CENTER,
                    height: RF(35),
                    width: RF(35),
                    backgroundColor: colors.DarkWhite,
                    borderColor: colors.blue,
                    borderWidth: 1,
                    borderRadius: RF(100),
                  }}
                 onPress={()=>setquantity(quantity+1)}
                >
                  <Text style={{ ...GST.description, color: colors.blue,marginBottom:RF(5) }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
        style={{
          ...GST.CENTERCONTAINER,
          width: '100%',
          backgroundColor: colors.DarkWhite,
          paddingVertical: RF(10),
        }}
      >
        <TouchableOpacity onPress={() => setfav(!fav)}>
          {!fav ? (
            <UnLike height={RF(40)} width={RF(40)} />
          ) : (
            <Like height={RF(40)} width={RF(40)} />
          )}
        </TouchableOpacity>
        <View style={{ width: '35%' }}>
          <CustomButton
            btnTitle={'Add to cart'}
            style={{
              padding: RF(10),
              borderRadius: RF(10),
              backgroundColor: colors.darkblack,
            }}
            txtstyle={{ ...GST.subdescription, color: colors.DarkWhite }}
            onPress={cartpress}
          />
        </View>
        <View style={{ width: '35%', paddingHorizontal: RF(5) }}>
          <CustomButton
            btnTitle={'Buy now'}
            style={{ padding: RF(10), borderRadius: RF(10) }}
            txtstyle={{ ...GST.subdescription, color: colors.DarkWhite }}
            onPress={buypress}
          />
        </View>
      </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VariationModal;

const styles = StyleSheet.create({});
