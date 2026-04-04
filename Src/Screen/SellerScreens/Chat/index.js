import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import CustomHeader from '../../../Component/CustomHeader';
import GST, {wp, hp, colors, fontSize, RF} from '../../../Constant';
import LeftArrow from '../../../assets/SVG/Leftarrow.svg';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {
  getConversations,
  getMessages,
  sendMessage,
  createConversation,
} from '../../../Redux/slices/Action/Chatslice';
import {setCurrentChat} from '../../../Redux/slices/Reducers/chatReducer';
import {showErrorToast, showSuccessToast} from '../../../utils/Toast';
import {AllUsers} from '../../../Redux/slices/Action/Authaction';

const Chat = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  const {user} = useSelector(state => state.user);
  const {messages, currentChat, loading} = useSelector(state => state.chat);
  const [messageText, setMessageText] = useState('');
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    initChat();
  }, []);

  const initChat = async () => {
    try {
      setInitializing(true);
      const convResult = await dispatch(getConversations()).unwrap();

      if (convResult && convResult.length > 0) {
        // Find conversation with admin for seller
        const adminConv = convResult.find(conv =>
          conv.participants?.some(p => p.role === 'admin') && conv.roomType === 'seller',
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
      console.log('Seller chat init error:', err);
    } finally {
      setInitializing(false);
    }
  };

  // Auto scroll
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
         // Create conversation if none exists
         const usersResult = await dispatch(AllUsers({page: 1, limit: 100})).unwrap();
         const adminUser = usersResult?.docs?.find(u => u.role === 'admin');
         if (!adminUser) {
            showErrorToast('Could not find support team');
            return;
         }
         targetAdminId = adminUser._id;
         targetConv = await dispatch(createConversation({ participantId: targetAdminId, roomType: 'seller' })).unwrap();
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

  const adminParticipant = currentChat?.participants?.find(p => p.role === 'admin');
  const adminName = adminParticipant?.username || 'Admin Support';

  const renderItem = ({item}) => {
    const isMe =
      item.senderId?._id === user?._id || item.senderId === user?._id;
    return (
      <View
        style={[
          styles.messageBubble,
          isMe ? styles.myBubble : styles.theirBubble,
        ]}>
        <Text style={isMe ? styles.myMessageText : styles.theirMessageText}>
          {item.message}
        </Text>
        <Text
          style={[
            styles.timeText,
            {
              color: isMe ? 'rgba(255,255,255,0.6)' : colors.sellerSubText,
            },
          ]}>
          {formatTime(item.createdAt)}
        </Text>
      </View>
    );
  };

  if (initializing) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {paddingTop: insets.top, paddingBottom: insets.bottom},
        ]}>
        <CustomHeader name="Chat with Admin" />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.sellerPrimary} />
          <Text style={styles.connectingText}>Connecting to admin...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={{flex: 1}}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <LeftArrow width={wp('6%')} height={wp('6%')} style={{color: colors.sellerPrimary}} />
          </TouchableOpacity>
          <View style={styles.headerAvatar}>
            <Text style={styles.avatarText}>
              {adminParticipant?.username?.charAt(0)?.toUpperCase() || 'A'}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.headerName}>{adminName}</Text>
            <Text style={styles.headerRole}>Admin Support</Text>
          </View>
        </View>

        {/* Messages */}
        <View style={styles.chatArea}>
          {loading && messages.length === 0 ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="small" color={colors.sellerPrimary} />
            </View>
          ) : messages.length === 0 ? (
            <View style={styles.centerContent}>
              <View style={styles.emptyIcon}>
                <Text style={{fontSize: RF(30)}}>💬</Text>
              </View>
              <Text style={styles.emptyTitle}>No Messages Yet</Text>
              <Text style={styles.emptySubtitle}>
                Send a message to start the conversation
              </Text>
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item, index) => item._id || index.toString()}
              contentContainerStyle={styles.chatList}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({animated: true})
              }
            />
          )}
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={colors.sellerSubText}
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={handleSend}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {opacity: messageText.trim() ? 1 : 0.4},
            ]}
            onPress={handleSend}
            disabled={!messageText.trim()}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
