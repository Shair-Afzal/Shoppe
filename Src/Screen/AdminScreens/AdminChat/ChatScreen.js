import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import GST, { wp, hp, colors, fontSize, radius } from '../../../Constant';
import LeftArrow from '../../../assets/SVG/Leftarrow.svg';
import Add from '../../../assets/SVG/Add.svg';
import Check from '../../../assets/SVG/Check.svg';

const AdminChatScreen = ({ route, navigation }) => {
  const { chatData } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    // Sample messages data
    const dummyMessages = [
      {
        id: '1',
        sender: 'user',
        text: 'Hello, I have a question about my order',
        timestamp: '10:15 AM',
        isSendByAdmin: false,
      },
      {
        id: '2',
        sender: 'admin',
        text: 'Hi! Thank you for contacting us. How can I help you?',
        timestamp: '10:20 AM',
        isSendByAdmin: true,
      },
      {
        id: '3',
        sender: 'user',
        text: "I ordered a product yesterday but I haven't received a confirmation yet",
        timestamp: '10:22 AM',
        isSendByAdmin: false,
      },
      {
        id: '4',
        sender: 'admin',
        text: 'Let me check that for you. Could you please provide your order ID?',
        timestamp: '10:25 AM',
        isSendByAdmin: true,
      },
      {
        id: '5',
        sender: 'user',
        text: "Sure, it's #12345",
        timestamp: '10:27 AM',
        isSendByAdmin: false,
      },
      {
        id: '6',
        sender: 'admin',
        text: 'Perfect! I found your order. Your confirmation email will be sent within 5 minutes.',
        timestamp: '10:30 AM',
        isSendByAdmin: true,
      },
    ];
    setMessages(dummyMessages);
  };

  const handleSendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: Math.random().toString(),
      sender: 'admin',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isSendByAdmin: true,
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isSendByAdmin
          ? styles.adminMessageContainer
          : styles.userMessageContainer,
      ]}
    >
      {!item.isSendByAdmin && (
        <Image
          source={
            typeof chatData.userImage === 'number'
              ? chatData.userImage
              : { uri: chatData.userImage }
          }
          style={styles.messageAvatar}
          resizeMode="cover"
        />
      )}
      <View
        style={[
          styles.messageBubble,
          item.isSendByAdmin ? styles.adminBubble : styles.userBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.isSendByAdmin
              ? styles.adminMessageText
              : styles.userMessageText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            item.isSendByAdmin ? styles.adminTimestamp : styles.userTimestamp,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.sellerBg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <LeftArrow width={wp('6%')} height={wp('6%')} />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Image
              source={
                typeof chatData.userImage === 'number'
                  ? chatData.userImage
                  : { uri: chatData.userImage }
              }
              style={styles.headerAvatar}
              resizeMode="cover"
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerUserName}>{chatData.userName}</Text>
              <Text style={styles.headerStatus}>
                {chatData.online ? 'Active now' : 'Inactive'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.callButton}>
            <Check width={wp('5%')} height={wp('5%')} />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={true}
          scrollIndicatorInsets={{ right: 1 }}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={colors.sellerSubText}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxHeight={hp('8%')}
            />
            <TouchableOpacity style={styles.attachButton} activeOpacity={0.7}>
              <Add width={wp('6%')} height={wp('6%')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>✓</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sellerBg,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: colors.sellerCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.sellerBorder,
  },
  backButton: {
    padding: wp('2%'),
    marginRight: wp('2%'),
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: wp('2%'),
  },
  headerTextContainer: {
    flex: 1,
  },
  headerUserName: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
  },
  headerStatus: {
    fontSize: fontSize.extraSmall,
    color: colors.sellerSuccess,
  },
  callButton: {
    padding: wp('2%'),
    marginLeft: wp('2%'),
  },
  callButtonText: {
    fontSize: fontSize.large,
  },
  messagesList: {
    flexGrow: 1,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: hp('0.8%'),
    alignItems: 'flex-end',
  },
  adminMessageContainer: {
    justifyContent: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    marginRight: wp('2%'),
  },
  messageBubble: {
    maxWidth: wp('70%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    borderRadius: radius.radius3,
  },
  adminBubble: {
    backgroundColor: colors.sellerPrimary,
    borderBottomRightRadius: radius.radius1,
  },
  userBubble: {
    backgroundColor: colors.sellerCard,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
    borderBottomLeftRadius: radius.radius1,
  },
  messageText: {
    fontSize: fontSize.small,
  },
  adminMessageText: {
    color: colors.white,
  },
  userMessageText: {
    color: colors.sellerText,
  },
  timestamp: {
    fontSize: fontSize.extraSmall,
    marginTop: hp('0.3%'),
  },
  adminTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  userTimestamp: {
    color: colors.sellerSubText,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: colors.sellerCard,
    borderTopWidth: 1,
    borderTopColor: colors.sellerBorder,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.sellerBg,
    borderRadius: radius.radius3,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
    marginRight: wp('2%'),
    paddingHorizontal: wp('2%'),
  },
  input: {
    flex: 1,
    paddingVertical: hp('1%'),
    fontSize: fontSize.small,
    color: colors.sellerText,
    maxHeight: hp('8%'),
  },
  attachButton: {
    padding: wp('2%'),
  },
  sendButton: {
    backgroundColor: colors.sellerPrimary,
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.sellerBorder,
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: fontSize.large,
    color: colors.white,
  },
});

export default AdminChatScreen;
