import { createSlice } from "@reduxjs/toolkit";
import {
  getChatById,
  getData,
  getSendMessages,
  searchChat,
} from "../../api/Message/messageApi";

const message = createSlice({
  name: "message",
  initialState: {
    data: [],
    isLoading: false,
    userName: "",
    password: "",
    inpUserNameChatModal: "",
    inpPasswordChatModal: "",
    openChatModal: false,
    inpMessage: "",
    inpMessageCreateChat: "",
    chatProfile: {},
    messages: [],
    chatId: localStorage.getItem("chatId") || null,
    isLoadingCrateChat: false,
    dataCreateChat: [],
    selectedChat: false,
    dialogInfo: false,
    userId: localStorage.getItem("userId") || null,
  },
  reducers: {
    setInpUserNameChatModal: (state, action) => {
      state.inpUserNameChatModal = action.payload;
    },
    setInpPasswordChatModal: (state, action) => {
      state.inpPasswordChatModal = action.payload;
    },
    setClickChatModal: (state, action) => {
      state.openChatModal = !state.openChatModal;
    },
    setInpMessage: (state, action) => {
      state.inpMessage = action.payload;
    },
    handleKeyboardInpMessage: (state, action) => {
      state.inpMessage += action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setInpMessageCreateChat: (state, action) => {
      state.inpMessageCreateChat = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = !state.selectedChat;
    },
    setModalInfo: (state, action) => {
      state.dialogInfo = !state.dialogInfo;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get chats
    builder
      .addCase(getData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false;
      });
    // get chat by id
    builder.addCase(getChatById.fulfilled, (state, action) => {
      state.chatProfile = action.payload;
    });
    /// messages
    builder.addCase(getSendMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    /// get chat create chat
    builder
      .addCase(searchChat.pending, (state, action) => {
        state.isLoadingCrateChat = true;
      })
      .addCase(searchChat.fulfilled, (state, action) => {
        state.isLoadingCrateChat = false;
        state.dataCreateChat = action.payload;
      })
      .addCase(searchChat.rejected, (state, action) => {
        state.isLoadingCrateChat = false;
      });
  },
});

export default message.reducer;
export const {
  setInpUserNameChatModal,
  setInpPasswordChatModal,
  setClickChatModal,
  setInpMessage,
  handleKeyboardInpMessage,
  setChatId,
  setInpMessageCreateChat,
  setSelectedChat,
  setModalInfo,
  setUserId,
} = message.actions;
