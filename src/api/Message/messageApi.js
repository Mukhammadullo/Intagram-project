import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { setChatId } from "../../reducers/Message/Message";

// get messages
export const getData = createAsyncThunk("message/getData", async () => {
  try {
    let { data } = await axiosRequest.get("Chat/get-chats");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

let idx = null;

/// get chat by id
export const getChatById = createAsyncThunk(
  "message/getChatById",
  async (id, { dispatch }) => {
    try {
      let { data } = await axiosRequest.get(
        `UserProfile/get-user-profile-by-id?id=${id}`
      );
      idx = id;
      // dispatch(getData());
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

let chatIdx = null
// get send message
export const getSendMessages = createAsyncThunk(
  "message/getSendMessages",
  async (chatId) => {
    try {
      let { data } = await axiosRequest.get(
        `Chat/get-chat-by-id?chatId=${chatId}`
      );
      chatIdx = chatId
      return data.data.reverse();
    } catch (error) {
      console.log(error);
    }
  }
);

// post message
export const sendMessages = createAsyncThunk(
  "message/sendMessages",
  async (obj, { dispatch }) => {
    let newMessage = {
      chatId: obj.chatId,
      messageText: obj.messageText,
    };
    try {
      let { data } = await axiosRequest.post("Chat/send-message", newMessage);
      dispatch(getSendMessages(obj.chatId));
      dispatch(getChatById(idx));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// get serchchat
export const searchChat = createAsyncThunk(
  "message/searchChat",
  async (userName) => {
    try {
      let { data } = await axiosRequest.get(
        `User/get-users?UserName=${userName}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// click create chat
export const createChat = createAsyncThunk(
  "message/createChat",
  async (id, { dispatch }) => {
    try {
      let { data } = await axiosRequest.post(
        `Chat/create-chat?receiverUserId=${id}`
      );
      dispatch(getData());
      // dispatch(getChatById(data.data))
      dispatch(getSendMessages(data.data));
      dispatch(setChatId(data.data));
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// delete chat
export const deleteChat = createAsyncThunk(
  "message/deleteChat",
  async (chatId, { dispatch }) => {
    try {
      let { data } = await axiosRequest.delete(
        `Chat/delete-chat?chatId=${chatId}`
      );
      dispatch(getData());
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/// delete message
export const deleteMessage = createAsyncThunk(
  "message/deleteMessage",
  async (messageId, { dispatch }) => {
    try {
      let { data } = await axiosRequest.delete(
        `Chat/delete-message?massageId=${messageId}`
      );
      dispatch(getSendMessages(chatIdx));
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
