import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../Axios";


export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async ({ participantId, roomType }, { rejectWithValue }) => {
    try {
      const res = await Api.post("/socket/conversation", { participantId, roomType });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getConversations = createAsyncThunk(
  "chat/getConversations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Api.get("/socket/conversations");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔹 Get messages
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const res = await Api.get(`/socket/messages/${conversationId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔹 Send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ message, conversationId, receiverId }, { rejectWithValue }) => {
    try {
      const res = await Api.post("/socket/message", {
        message,
        conversationId,
        receiverId,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);