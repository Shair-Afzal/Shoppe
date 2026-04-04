import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import GST, {wp, hp, colors, fontSize, RF} from '../../../../Constant';
import Icon from '../../../../assets/SVG/Icon.svg';
import LeftArrow from '../../../../assets/SVG/Leftarrow.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {
  createConversation,
  getConversations,
  getMessages,
  sendMessage,
} from '../../../../Redux/slices/Action/Chatslice';
import {setCurrentChat} from '../../../../Redux/slices/Reducers/chatReducer';
import {showErrorToast, showSuccessToast} from '../../../../utils/Toast';
import {AllUsers} from '../../../../Redux/slices/Action/Authaction';

const ChatScreen = ({navigation}) => {
  const insert = useSafeAreaInsets();
  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  const {user} = useSelector(state => state.user);
  const {messages, currentChat, loading} = useSelector(state => state.chat);
  const [messageText, setMessageText] = useState('');
  const [initializing, setInitializing] = useState(true);

  // Admin ID - find admin to chat with
  // On mount: create/get conversation with admin
  useEffect(() => {
    initChat();
  }, []);

  const initChat = async () => {
    try {
      setInitializing(true);
      // The backend will find/create conversation between user and admin
      // We need admin's ID. Typically there's one admin.
      // We'll use a hardcoded admin approach or the backend handles it
      // For now, we pass the admin participantId
      // The user's profile screen navigates here, and conversation is auto-created
      
      // First try to get existing conversations
      const convResult = await dispatch(getConversations()).unwrap();
      
      if (convResult && convResult.length > 0) {
        // Find conversation with admin for customer
        const adminConv = convResult.find(conv => 
          conv.participants?.some(p => p.role === 'admin') && conv.roomType === 'customer'
        );
        
        if (adminConv) {
          dispatch(setCurrentChat(adminConv));
          await dispatch(getMessages(adminConv._id)).unwrap();
        } else {
          dispatch(setCurrentChat(null));
        }
      } else {
        dispatch(setCurrentChat(null));
      }
    } catch (err) {
      console.log('Chat init error:', err);
    } finally {
      setInitializing(false);
    }
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 200);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!messageText.trim()) return;

    let targetConv = currentChat;
    let targetAdminId = targetConv?.participants?.find(
      p => p._id !== user._id,
    )?._id;

    try {
      if (!targetConv) {
        // Need to create conversation first
        const usersResult = await dispatch(AllUsers({page: 1, limit: 100})).unwrap();
        const adminUser = usersResult?.docs?.find(u => u.role === 'admin');
        if (!adminUser) {
          showErrorToast('Could not find support team');
          return;
        }
        targetAdminId = adminUser._id;
        targetConv = await dispatch(createConversation({ participantId: targetAdminId, roomType: 'customer' })).unwrap();
        dispatch(setCurrentChat(targetConv));
      }

      await dispatch(
        sendMessage({
          message: messageText.trim(),
          conversationId: targetConv._id,
          receiverId: targetAdminId,
        }),
      ).unwrap();
      setMessageText('');
    } catch (err) {
      console.log('Send message error:', err);
      showErrorToast(err || 'Failed to send message');
    }
  };

  const formatTime = dateStr => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const renderMessage = ({item}) => {
    const isMe = item.senderId?._id === user?._id || item.senderId === user?._id;
    return (
      <View
        style={[
          styles.messageBubble,
          isMe ? styles.userBubble : styles.botBubble,
          {alignSelf: isMe ? 'flex-end' : 'flex-start'},
        ]}>
        <Text style={isMe ? styles.userText : styles.botText}>
          {item.message}
        </Text>
        <Text
          style={[
            styles.timeText,
            {color: isMe ? 'rgba(255,255,255,0.6)' : colors.dimBlack},
          ]}>
          {formatTime(item.createdAt)}
        </Text>
      </View>
    );
  };

  // Get admin name from conversation
  const adminParticipant = currentChat?.participants?.find(p => p.role === 'admin');
  const adminName = adminParticipant?.username || 'Customer Care Service';

  if (initializing) {
    return (
      <View style={[GST.MAIN, styles.main, styles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.blue} />
        <Text style={[GST.subdescription, {marginTop: RF(10), color: colors.dimBlack}]}>
          Connecting to support...
        </Text>
      </View>
    );
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      style={{flex: 1}}>
      <View
        style={[
          GST.MAIN,
          styles.main,
          {paddingTop: insert.top, paddingBottom: insert.bottom},
        ]}>
        {/* Header */}
        <View style={[GST.ROW, styles.headerContainer]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <LeftArrow width={wp('6%')} height={wp('6%')} />
          </TouchableOpacity>
          <View style={styles.iconWrapper}>
            <View style={[GST.CENTER, styles.iconInner]}>
              <Text style={styles.avatarText}>
                {adminParticipant?.username?.charAt(0)?.toUpperCase() || 'C'}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={[GST.description, styles.headerTitle]}>
              {adminName}
            </Text>
            <Text style={GST.subdescription}>Customer Care Service</Text>
          </View>
        </View>

        {/* Chat Body */}
        <View style={[GST.FLEX, styles.bodyContainer]}>
          {loading && messages.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.blue} />
            </View>
          ) : messages.length === 0 ? (
            <View style={styles.noMessagesContainer}>
              <Text style={styles.noMessagesText}>
                Say hello to start the conversation! 👋
              </Text>
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item, index) => item._id || index.toString()}
              contentContainerStyle={styles.messageList}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({animated: true})
              }
            />
          )}
        </View>

        {/* Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type a message..."
            placeholderTextColor={colors.dimBlack}
            style={styles.inputContainer}
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={handleSend}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendBtn,
              {opacity: messageText.trim() ? 1 : 0.4},
            ]}
            onPress={handleSend}
            disabled={!messageText.trim()}>
            <Text style={styles.sendBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
