import { View, Text, TouchableOpacity, FlatList, TextInput,Image} from 'react-native';
import React, { useState } from 'react';
import GST, { colors, fontSize, radius, RF } from '../../../../Constant';
import Icon from '../../../../assets/SVG/Icon.svg';
import { categoriesData, orderIssuesData } from '../../../../utils/Dummydata';
import CustomButton from '../../../../Component/Custombutton';
import Cancle from '../../../../assets/SVG/Cancle.svg';
import Check from "../../../../assets/SVG/Check.svg"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';
import CustomInput, { pickImage } from '../../../../Component/Custominput';
import Galleryicon from "../../../../assets/SVG/Galleryicon.svg"
import Copy from "../../../../assets/SVG/Copy.svg"
import CategoriesList from '../../../../Component/CategoriesList';
import ProfilePic from "../../../../assets/SVG/ProfilePic.svg"




// Step 2 options
const orderIssueOptions = [
  { id: 'oio-1', title: 'I didnt recieve my parcel' },
  { id: 'oio-2', title: 'I want to cancel my order' },
  { id: 'oio-3', title: 'I want to return my order' },
  { id: 'oio-4', title: 'Package was damaged' },
  {id:'oio-5',title:"Other"}
];
const actionOptions = [
  { id: 'act-1', title: 'Track My Order' },
  { id: 'act-2', title: 'Cancel My Order' },
  { id: 'act-3', title: 'Replace Item' },
  { id: 'act-4', title: 'Refund Request' },
];

const ChatScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [select, setSelect] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 'bot-1', text: "Hello, Amanda! What's your issue?", sender: 'bot' },
  ]);
  const [selectorder, setselectorder] = useState(null);
  const insert = useSafeAreaInsets();

  const [pendingSelections, setPendingSelections] = useState([]); // 🔹 temporary store
  

  const handleNext = () => {
    if (step === 1 && !select) return;
    if (step === 2 && !select) return;
    if (step === 3 && selectorder === null) return;

    if (step === 1) {
      // save Step 1 in pending
      setPendingSelections(prev => [...prev, select]);
      setStep(2);
      setSelect(null);

    } else if (step === 2) {
      // save Step 2 in pending
      setPendingSelections(prev => [...prev, select]);
      setStep(3);
      setSelect(null);

    } else if (step === 3) {
      // Get the selected order text
      const selectedOrderText = `Selected Order: #${categoriesData[selectorder]?.id || 'Unknown'}`;
      
      // save Step 3 + flush all selections at once
      const allSelections = [...pendingSelections, selectedOrderText];
      setMessages(prev => [
        ...prev,
        ...allSelections.map(text => ({
          id: Date.now().toString() + text,
          text,
          sender: 'user'
        }))
      ]);
      setPendingSelections([]); // clear
      setStep(4); // unlock input
      setSelect(null);
      setselectorder(null);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMsg = { id: Date.now().toString(), text: message, sender: 'user' };
      setMessages(prev => [...prev, newMsg]);
      setMessage('');
    }
  };

  const currentOptions = 
    step === 1 ? orderIssuesData 
    : step === 2 ? orderIssueOptions 
    : step === 3 ? [] // Empty array for step 3 since we'll show FlatList instead
    : [];

  const renderMessage = ({ item }) => (
    <View
      style={{
        alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
        backgroundColor: item.sender === 'user' ? colors.blue : colors.DarkWhite,
        padding: RF(10),
        borderRadius: RF(12),
        marginVertical: RF(4),
        maxWidth: '70%',
      }}
    >
      <Text style={{ color: item.sender === 'user' ? colors.DarkWhite : colors.black }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={[GST.MAIN, styles.main, { paddingTop: insert.top }]}>
      {/* Header */}
      <View style={[GST.ROW, styles.headerContainer]}>
        <View style={styles.iconWrapper}>
          <View style={[GST.CENTER, styles.iconInner]}>
          
            {
              step==4?
              <Image source={require("../../../../assets/Images/Reviewimg.png")}
              style={{height:"100%",width:"100%",borderRadius:radius.radius5}}
              />:
              
               <Icon height={RF(25)} width={RF(25)} />
            }
           

          </View>
        </View>
        <View>
          <Text style={[GST.description, styles.headerTitle]}>{step==4?"Maggy Lee":"Chat Bot"}</Text>
          <Text style={GST.subdescription}>Customer Care Service</Text>
        </View>
      </View>

      {/* Chat Body */}
      <View style={[GST.FLEX, styles.bodyContainer]}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: RF(80) }}
          showsScrollIndicator={false}
        />

        {/* Options OR Input */}
        {step !== 4 && (
          <View style={styles.bottomSheetWrapper}>
            <View style={styles.bottomSheetHeader}>
              <Text style={[GST.description, styles.bottomSheetTitle]}>
                {step === 1 ? "What's your issue?" : step === 2 ? "Order issue" : "Select one of your orders"}
              </Text>
            </View>

            <View style={styles.bottomSheetBody}>
              {/* Show options for steps 1 and 2 */}
              {step !== 3 && currentOptions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.issueButton,
                    {
                      backgroundColor:
                        select === item.title ? colors.blue : colors.DarkWhite,
                    },
                  ]}
                  onPress={() => setSelect(item.title)}
                >
                  <View style={[GST.ROW, styles.issueRow]}>
                    {select === item.title && (
                      <Check height={RF(15)} width={RF(15)} />
                    )}
                    <Text
                      style={[
                        GST.subdescription,
                        styles.issueText,
                        {
                          color:
                            select === item.title
                              ? colors.DarkWhite
                              : colors.blue,
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
              
              {/* Show FlatList for step 3 */}
              {step === 3 && (
               <FlatList
        data={categoriesData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={({ item, index }) => (
          <View style={[GST.CENTERCONTAINER, styles.card]}>
            <CategoriesList
              item={item}
              catimg={styles.catImg}
              style={styles.catStyle}
              txt
              num
              disabled={true}
            />

            <View style={styles.detailsContainer}>
              <View style={styles.orderInfo}>
                <View style={styles.orderRow}>
                  <View style={styles.orderLeft}>
                    <Text style={styles.orderNumber}>Order {item.id}</Text>
                    <Text style={GST.smallesttxt}>Standard Delivery</Text>
                  </View>
                  <View style={styles.itemBox}>
                    <Text style={styles.itemText}>3 items</Text>
                  </View>
                </View>

                <View style={GST.CENTERCONTAINER}>
                  <Text style={styles.shippedText}>Shipped</Text>

                  <TouchableOpacity
                          style={[
                            styles.trackBtn,
                            {
                              backgroundColor:
                                selectorder === index ? colors.blue : colors.DarkWhite,
                              borderWidth: 1 
                            },
                          ]}
                          onPress={() => setselectorder(index)}
                        >
                          <Text
                            style={[
                              GST.smallesttxt,
                              {
                                color: selectorder === index ? colors.white : colors.blue,
                              },
                            ]}
                          >
                            {selectorder === index ? "Selected" : "Select"}
                          </Text>
                        </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
              )}
              
              {/* Bottom Actions */}
              <View style={styles.bottomActions}>
                <CustomButton
                  style={styles.nextButton}
                  btnTitle={"Next"}
                  onPress={handleNext}
                  disabled={(step === 1 || step === 2) && !select || step === 3 && selectorder === null}
                />
                <TouchableOpacity>
                  <Cancle height={RF(20)} width={RF(20)} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
      
      {step === 4 && (
        <View style={{
          ...GST.CENTERCONTAINER,
          position: "absolute",
          bottom: RF(0),
          left: 0,
          right: 0,
          paddingHorizontal: RF(12),
          backgroundColor: colors.lightblue,
          height: RF(60),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <TextInput
            placeholder='Message'
            placeholderTextColor={colors.blue}
            style={{width: "65%", fontSize: fontSize.medium}}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSend}
          />
          <View style={{...GST.ROW, gap: RF(5)}}>
            <TouchableOpacity
              onPress={async () => {
    try {
      const image = await pickImage();   // 👈 use your helper
      if (image) {
        console.log("Picked Image Path:", image.path);
        // Optional: add as a message in chat
        setMessages(prev => [
          ...prev,
          { id: Date.now().toString(), text: `[Image: ${image.path}]`, sender: 'user' }
        ]);
      }
    } catch (err) {
      console.log("Image pick error:", err);
    }
  }}
            >
            <Galleryicon height={RF(20)} width={RF(20)}/>
            </TouchableOpacity>
            <TouchableOpacity
           
            >
            <Copy height={RF(20)} width={RF(20)} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChatScreen;