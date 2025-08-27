import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import Icon from '../../../../assets/SVG/Icon.svg';
import { orderIssuesData } from '../../../../utils/Dummydata';
import CustomButton from '../../../../Component/Custombutton';
import Cancle from '../../../../assets/SVG/Cancle.svg';
import Check from "../../../../assets/SVG/Check.svg"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChatScreen = () => {
    const [select,setselect]=useState("Order")
    const insert=useSafeAreaInsets()
  return (
    <View style={{ ...GST.MAIN, paddingTop: RF(30), paddingHorizontal: 0,paddingTop:insert.top}}>
      <View
        style={{
          ...GST.ROW,
          gap: RF(10),
          alignItems: 'center',
          paddingHorizontal: RF(15),
        }}
      >
        <View
          style={{
            height: RF(60),
            width: RF(60),
            backgroundColor: colors.DarkWhite,
            borderRadius: RF(100),
            padding: RF(5),
            elevation: 5,
          }}
        >
          <View
            style={{
              ...GST.CENTER,
              backgroundColor: colors.lightblue,
              height: '100%',
              width: '100%',
              borderRadius: RF(100),
            }}
          >
            <Icon height={RF(25)} width={RF(25)} />
          </View>
        </View>
        <View>
          <Text style={{ ...GST.description, color: colors.blue }}>
            Chat Bot
          </Text>
          <Text style={GST.subdescription}>Customer Care Service</Text>
        </View>
      </View>
      <View
        style={{
          ...GST.FLEX,
          backgroundColor: colors.white,
          marginTop: RF(10),
          padding: RF(15),
        }}
      >
        <View
          style={{
            backgroundColor: colors.lightblue,
            padding: RF(10),
            width: '60%',
            borderRadius: RF(10),
          }}
        >
          <Text style={{ ...GST.subdescription, fontSize: RF(12) }}>
            Hello, Amanda! Welcome to Customer Care Service. We will be happy to
            help you. Please, provide us more details about your issue before we
            can start.
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: RF(15),
          }}
        >
          <View
            style={{
              backgroundColor: colors.lightblue,
              padding: RF(15),
              width: '100%',
              paddingVertical: RF(25),
              borderTopLeftRadius: RF(10),
              borderTopRightRadius: RF(10),
            }}
          >
            <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
              What's your issue?
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.DarkWhite,
              padding: RF(15),
              paddingVertical: RF(10),
              height: RF(300),
            }}
          >
            {orderIssuesData.map(item => (
              <>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-start',
                    padding: RF(10),
                    borderRadius: RF(10),
                    backgroundColor: select==item.title?colors.blue:colors.DarkWhite,
                    borderWidth: 1,
                    borderColor: colors.blue,
                    marginTop: RF(5),
                    
                  }}
                  onPress={()=>setselect(item.title)}
                >
                    <View style={{...GST.ROW,gap:RF(5)}}>
                    {
                        select==item.title&&
                        <Check height={RF(15)} width={RF(15)}/>
                    }
                  <Text style={{ ...GST.subdescription, fontSize: RF(12),color:select==item.title?colors.DarkWhite:colors.blue}}>
                    {item.title}
                  </Text>
                  </View>
                </TouchableOpacity>
              </>
            ))}
            <View
              style={{ ...GST.CENTERCONTAINER, position: 'absolute', bottom: RF(5),left:RF(15) }}
            >
              <CustomButton style={{ paddingVertical: RF(14), width: '85%' }} btnTitle={"Next"}/>
              <TouchableOpacity>
                <Cancle height={RF(20)} width={RF(20)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatScreen;
