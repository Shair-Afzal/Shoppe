import React, {useState, useEffect, useRef} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import GST, {wp, hp, colors, fontSize, radius, RF} from '../../../Constant';
import LeftArrow from '../../../assets/SVG/Leftarrow.svg';
import {useSelector, useDispatch} from 'react-redux';
import {
  getMessages,
  sendMessage,
} from '../../../Redux/slices/Action/Chatslice';
import {setCurrentChat} from '../../../Redux/slices/Reducers/chatReducer';
import {showErrorToast} from '../../../utils/Toast';

const AdminChatScreen = ({route, navigation}) => {
  const {conversationId, participantName, participantImage, participantRole, participantId} =
    route.params;
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {messages, loading} = useSelector(state => state.chat);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setInitialLoad(true);
      await dispatch(getMessages(conversationId)).unwrap();
    } catch (err) {
      console.log('Error loading messages:', err);
    } finally {
      setInitialLoad(false);
    }
  };

  // Auto scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 200);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim().length === 0) return;

    try {
      await dispatch(
        sendMessage({
          message: inputText.trim(),
          conversationId: conversationId,
          receiverId: participantId,
        }),
      ).unwrap();
      setInputText('');
    } catch (err) {
      console.log('Error sending message:', err);
      showErrorToast(err || 'Failed to send message');
    }
  };

  const formatTime = dateStr => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const getInitials = name => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderMessage = ({item}) => {
    const isAdmin =
      item.senderId?._id === user?._id || item.senderId === user?._id;

    return (
      <View
        style={[
          styles.messageContainer,
          isAdmin ? styles.adminMessageContainer : styles.userMessageContainer,
        ]}>
        {!isAdmin && (
          <View style={styles.msgAvatarContainer}>
            {participantImage ? (
              <Image
                source={{uri: participantImage}}
                style={styles.messageAvatar}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.messageAvatar, styles.msgAvatarPlaceholder]}>
                <Text style={styles.msgAvatarText}>
                  {getInitials(participantName)}
                </Text>
              </View>
            )}
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isAdmin ? styles.adminBubble : styles.userBubble,
          ]}>
          <Text
            style={[
              styles.messageText,
              isAdmin ? styles.adminMessageText : styles.userMessageText,
            ]}>
            {item.message}
          </Text>
          <Text
            style={[
              styles.timestamp,
              isAdmin ? styles.adminTimestamp : styles.userTimestamp,
            ]}>
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.sellerBg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.flex}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <LeftArrow width={wp('6%')} height={wp('6%')} />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            {participantImage ? (
              <Image
                source={{uri: participantImage}}
                style={styles.headerAvatar}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.headerAvatar, styles.headerAvatarPlaceholder]}>
                <Text style={styles.headerAvatarText}>
                  {getInitials(participantName)}
                </Text>
              </View>
            )}
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerUserName}>{participantName}</Text>
              <View style={styles.headerRoleRow}>
                <View
                  style={[
                    styles.headerRoleBadge,
                    {
                      backgroundColor:
                        participantRole === 'seller'
                          ? 'rgba(245, 158, 11, 0.15)'
                          : 'rgba(6, 182, 212, 0.15)',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.headerRoleText,
                      {
                        color:
                          participantRole === 'seller'
                            ? colors.sellerWarning
                            : colors.sellerAccent,
                      },
                    ]}>
                    {participantRole === 'seller' ? '🏪 Seller' : '👤 Customer'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Messages List */}
        {initialLoad ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.sellerPrimary} />
            <Text style={styles.loadingText}>Loading messages...</Text>
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Text style={{fontSize: RF(35)}}>💬</Text>
            </View>
            <Text style={styles.emptyTitle}>Start the Conversation</Text>
            <Text style={styles.emptySubtitle}>
              Send a message to {participantName}
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => item._id || index.toString()}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({animated: true})
            }
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
          />
        )}

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
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}>
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
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: colors.sellerCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.sellerBorder,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  backButton: {
    padding: wp('2%'),
    marginRight: wp('1%'),
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
    marginRight: wp('3%'),
    backgroundColor: colors.sellerBorder,
  },
  headerAvatarPlaceholder: {
    backgroundColor: colors.sellerPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    color: colors.white,
    fontSize: fontSize.avgSmall,
    fontWeight: '700',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerUserName: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
  },
  headerRoleRow: {
    flexDirection: 'row',
    marginTop: hp('0.3%'),
  },
  headerRoleBadge: {
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.2%'),
    borderRadius: radius.radius2,
  },
  headerRoleText: {
    fontSize: RF(10),
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp('1%'),
    fontSize: fontSize.avgSmall,
    color: colors.sellerSubText,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
  },
  emptyIcon: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%'),
    backgroundColor: colors.sellerLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  emptyTitle: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
    marginBottom: hp('0.5%'),
  },
  emptySubtitle: {
    fontSize: fontSize.avgSmall,
    color: colors.sellerSubText,
    textAlign: 'center',
  },
  messagesList: {
    flexGrow: 1,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: hp('0.5%'),
    alignItems: 'flex-end',
  },
  adminMessageContainer: {
    justifyContent: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-start',
  },
  msgAvatarContainer: {
    marginRight: wp('2%'),
  },
  messageAvatar: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    backgroundColor: colors.sellerBorder,
  },
  msgAvatarPlaceholder: {
    backgroundColor: colors.sellerAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgAvatarText: {
    color: colors.white,
    fontSize: RF(10),
    fontWeight: '700',
  },
  messageBubble: {
    maxWidth: wp('70%'),
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1%'),
    borderRadius: radius.radius3,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  adminBubble: {
    backgroundColor: colors.sellerPrimary,
    borderBottomRightRadius: radius.radius1,
    alignSelf: 'flex-end',
  },
  userBubble: {
    backgroundColor: colors.sellerCard,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
    borderBottomLeftRadius: radius.radius1,
  },
  messageText: {
    fontSize: fontSize.avgSmall,
    lineHeight: RF(20),
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
    alignSelf: 'flex-end',
  },
  adminTimestamp: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  userTimestamp: {
    color: colors.sellerSubText,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
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
    paddingHorizontal: wp('3%'),
  },
  input: {
    flex: 1,
    paddingVertical: hp('1%'),
    fontSize: fontSize.avgSmall,
    color: colors.sellerText,
    maxHeight: hp('8%'),
  },
  sendButton: {
    backgroundColor: colors.sellerPrimary,
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.sellerPrimary,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  sendButtonDisabled: {
    backgroundColor: colors.sellerBorder,
    opacity: 0.5,
    elevation: 0,
  },
  sendButtonText: {
    fontSize: fontSize.large,
    color: colors.white,
    fontWeight: '700',
  },
});

export default AdminChatScreen;
