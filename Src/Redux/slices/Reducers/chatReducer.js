import { createSlice } from "@reduxjs/toolkit";
import {
  sendMessage,
  getConversations,
  getMessages,
  createConversation,
} from "../Action/Chatslice";

const initialState = {
  conversations: [],
  messages: [],
  currentChat: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // 🔥 realtime socket message
    addMessageRealtime: (state, action) => {
      const msg = action.payload;
      // Only add if message belongs to current conversation
      if (state.currentChat && msg.conversationId === state.currentChat._id) {
        const exists = state.messages.find(m => m._id === msg._id);
        if (!exists) {
          state.messages.push(msg);
        }
      }
      // Update last message in conversations list
      const convIndex = state.conversations.findIndex(
        c => c._id === msg.conversationId
      );
      if (convIndex !== -1) {
        state.conversations[convIndex].lastMessage = msg.message;
        state.conversations[convIndex].lastMessageAt = msg.createdAt;
      }
    },

    // 🔥 optional: set current chat
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
      state.messages = []; // reset messages when switching chat
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // 🔹 CREATE CONVERSATION
      // =========================
      .addCase(createConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.loading = false;

        const exists = state.conversations.find(
          (c) => c._id === action.payload._id
        );

        if (!exists) {
          state.conversations.unshift(action.payload);
        }

        state.currentChat = action.payload;
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // 🔹 GET CONVERSATIONS
      // =========================
      .addCase(getConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // 🔹 GET MESSAGES
      // =========================
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.messages = []; // clear old messages
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // 🔹 SEND MESSAGE
      // =========================
      .addCase(sendMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // ⚠️ socket bhi push karega → duplicate avoid
        const exists = state.messages.find(
          (m) => m._id === action.payload._id
        );

        if (!exists) {
          state.messages.push(action.payload);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addMessageRealtime, setCurrentChat } = chatSlice.actions;
export default chatSlice.reducer;