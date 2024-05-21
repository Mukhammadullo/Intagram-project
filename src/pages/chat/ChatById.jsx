import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/images/userimage.jpg";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Switch from "@mui/material/Switch";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  handleKeyboardInpMessage,
  setInpMessage,
  setModalInfo,
} from "../../reducers/Message/Message";
import {
  deleteChat,
  deleteMessage,
  getChatById,
  getSendMessages,
  sendMessages,
} from "../../api/Message/messageApi";
import { Close } from "@mui/icons-material";

let smiliks = [
  "😂",
  "🤣",
  "❤️",
  "😊",
  "😍",
  "😒",
  "👌",
  "😘",
  "💕",
  "😁",
  "👍",
  "🙌",
  "🤦‍♀️",
  "🤦‍♂️",
  "🤷‍♀️",
  "🤷‍♂️",
  "✌️",
  "🤞",
  "😉",
  "😎",
  "🎶",
  "😢",
  "💖",
  "😜",
  "😀",
  "😁",
  "😂",
  "😎",
  "😋",
  "😊",
  "😉",
  "😆",
  "😍",
  "😘",
  "🥰",
  "😗",
  "😙",
  "🥲",
  "😚",
  "☺️",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🫡",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🫥",
  "😶‍🌫️",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "🥱",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "😓",
  "😔",
  "😕",
  "🫤",
  "🙃",
  "🫠",
  "🤑",
  "😲",
  "☹️",
  "🙁",
  "😖",
  "😞",
  "😟",
  "😤",
  "😢",
  "😭",
  "😦",
  "😧",
  "😨",
  "😩",
  "🤯",
  "😬",
  "😮‍💨",
  "😰",
  "😱",
  "🥵",
  "🥶",
  "😳",
  "🤪",
  "😵",
  "😵‍💫",
  "🥴",
  "😠",
  "😡",
  "🤬",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "😇",
  "🥳",
  "🥸",
  "🥺",
  "🥹",
  "🤠",
  "🤡",
  "🤥",
  "🫨",
  "🤫",
  "🤭",
  "🫢",
  "🫣",
  "🧐",
  "🤓",
  "😈",
  "👿",
  "👹",
  "👺",
  "💀",
  "☠️",
  "👻",
  "👽",
  "👾",
  "🤖",
  "💩",
  "😺",
  "😹",
  "😻",
  "😼",
  "😽",
  "🙀",
  "😿",
  "😾",
  "🙈",
  "🙉",
  "🙊",
  "🐵",
  "🐶",
  "🐺",
  "🐱",
  "🦁",
  "🐯",
  "🦒",
  "🦊",
  "🦝",
  "🐮",
  "🐷",
  "🐗",
  "🐭",
  "🐹",
  "🐰",
  "🐻",
  "🐻‍❄️",
  "🐨",
  "🐼",
  "🐸",
  "🦓",
  "🐴",
  "🫎",
  "🫏",
  "🦄",
  "🐔",
  "🐲",
  "🐽",
  "🐾",
  "🐒",
  "🦍",
  "🦧",
  "🦮",
  "🐕‍🦺",
  "🐩",
  "🐲",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
};

const ChatById = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let inpMessage = useSelector((store) => store.message.inpMessage);

  /// modal smiliks
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /// chat by id
  let chatProfile = useSelector((store) => store.message.chatProfile);
  useEffect(() => {
    dispatch(getChatById(id));
  }, [id]);

  /// modal main
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  /// modal main
  const [messageIdx, setMessageIdx] = useState(null);
  const [openMessage, setOpenMessage] = React.useState(false);
  const handleOpenMessage = (messageId) => {
    setOpenMessage(true);
    setMessageIdx(messageId);
  };
  const handleCloseMessage = () => setOpenMessage(false);

  /// messages
  let chatId = useSelector((store) => store.message.chatId);
  localStorage.setItem("chatId", chatId);
  let userId = useSelector((store) => store.message.userId);
  localStorage.setItem("userId", userId);
  let messages = useSelector((store) => store.message.messages);
  let res = localStorage.getItem("chatId");
  useEffect(() => {
    dispatch(getSendMessages(res));
  }, [chatId]);
  console.log(messages);

  let mas = ["hello", "hi", "How are you", "Did you said to me something"];

  function handleSubmitSendMessage(event) {
    event.preventDefault();
    dispatch(sendMessages({ chatId: res, messageText: inpMessage }));
    dispatch(setInpMessage(""));
  }

  let dialogInfo = useSelector((store) => store.message.dialogInfo);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <div
        className={
          dialogInfo
            ? "w-[100%] h-[100vh] relative"
            : "w-[100%] h-[100vh] overflow-y-scroll relative"
        }
      >
        <nav
          className={
            dialogInfo
              ? "flex items-center justify-between p-[20px] pr-[40px] border-b-gray-300 border-b-[1px] fixed bg-white w-[46.3%]"
              : "flex items-center justify-between p-[20px] pr-[40px] border-b-gray-300 border-b-[1px] fixed bg-white w-[66.3%]"
          }
        >
          <aside className="left flex items-center gap-[20px]">
            <img
              src={
                chatProfile.image == null || chatProfile.image == ""
                  ? logo
                  : `${import.meta.env.VITE_APP_FILES_URL}${chatProfile.image}`
              }
              className="w-[50px] h-[50px] rounded-[50%]"
              alt=""
            />
            <h3 className="text-[20px] font-[600]">{chatProfile.userName}</h3>
          </aside>
          <aside className="right flex items-center gap-[20px]">
            <div>
              {" "}
              <LocalPhoneRoundedIcon
                sx={{ fontSize: "33px", cursor: "pointer" }}
              />{" "}
            </div>
            <div>
              {" "}
              <VideocamRoundedIcon
                sx={{ fontSize: "40px", cursor: "pointer" }}
              />{" "}
            </div>
            <div onClick={() => dispatch(setModalInfo())}>
              {" "}
              <InfoRoundedIcon
                sx={{ fontSize: "30px", cursor: "pointer" }}
              />{" "}
            </div>
          </aside>
        </nav>
        <main className="mr-[2px] pt-[80px]">
          <main
            className={
              dialogInfo
                ? "massages overflow-auto h-[76vh] flex justify-between items-start p-[0px]"
                : "massages overflow-auto h-[76vh] flex justify-between items-start p-[20px]"
            }
          >
            <div className="flex flex-col gap-[5px] items-start p-[20px] justify-end ">
              {messages
                ?.filter((elem) => elem.userId == userId)
                ?.map((elem, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => handleOpenMessage(elem.messageId)}
                      className="bg-gray-400 py-[3px] cursor-pointer px-[20px] rounded-t-[20px] rounded-r-[20px] text-white"
                    >
                      {elem?.messageText}
                    </div>
                  );
                })}
            </div>
            <div className="flex items-end flex-col gap-[5px] p-[20px] justify-end">
              {messages
                ?.filter((elem) => elem.userId != userId)
                ?.map((elem, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => handleOpenMessage(elem.messageId)}
                      className="bg-blue-500 py-[3px] cursor-pointer px-[20px] rounded-t-[20px] rounded-l-[20px] text-white"
                    >
                      {elem?.messageText}
                    </div>
                  );
                })}
            </div>
          </main>
          <div className="inpMessage">
            <form
              onSubmit={(event) => handleSubmitSendMessage(event)}
              className="inpMessages bg-white px-[20px] py-[10px] border-gray-300 border-[1px] rounded-[30px] m-[20px] absolute w-[93%] bottom-2 flex items-center justify-between pl-[0]"
            >
              <aside className="left flex items-center gap-[15px] w-[100%]">
                <React.Fragment>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Tooltip title="Smiliks">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <SentimentSatisfiedAltIcon
                          sx={{
                            fontSize: "30px",
                            cursor: "pointer",
                            color: "black",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <div className="p-[10px] h-[300px] overflow-auto grid grid-cols-5 gap-[5px]">
                      {smiliks.map((elem, i) => {
                        return (
                          <h1
                            key={i}
                            className="text-[30px] cursor-pointer"
                            onClick={() =>
                              dispatch(handleKeyboardInpMessage(elem))
                            }
                          >
                            {elem}
                          </h1>
                        );
                      })}
                    </div>
                  </Menu>
                </React.Fragment>
                <input
                  type="text"
                  className="w-[100%] outline-none"
                  placeholder="Напишите сообщение..."
                  value={inpMessage}
                  onChange={(event) =>
                    dispatch(setInpMessage(event.target.value))
                  }
                />
              </aside>
              <aside className="right">
                {inpMessage.trim().length > 0 ? (
                  <button
                    type="submit"
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                  >
                    Отправит
                  </button>
                ) : (
                  <div className="flex items-center gap-[15px]">
                    <div className="cursor-pointer">
                      {" "}
                      <KeyboardVoiceOutlinedIcon
                        sx={{ fontSize: "32px" }}
                      />{" "}
                    </div>
                    <div className="cursor-pointer">
                      {" "}
                      <PhotoOutlinedIcon sx={{ fontSize: "32px" }} />{" "}
                    </div>
                    <div className="cursor-pointer">
                      {" "}
                      <FavoriteBorderOutlinedIcon
                        sx={{ fontSize: "32px" }}
                        onClick={() =>
                          dispatch(handleKeyboardInpMessage(smiliks[2]))
                        }
                      />{" "}
                    </div>
                  </div>
                )}
              </aside>
            </form>
          </div>
        </main>
        {dialogInfo ? (
          <div className="fixed top-0 h-[100%] right-0 z-10 bg-white border-l-[1px] border-l-gray-300 w-[350px] flex flex-col items-start justify-between hj-[100%]">
            <div className="w-[100%]">
              <div className="p-[20px] flex items-center justify-between">
                <h1 className="texct-[20px] lg:text-[25px] font-[600]">
                  Информация
                </h1>
                <div
                  className="text-[30px] cursor-pointer"
                  onClick={() => dispatch(setModalInfo())}
                >
                  {" "}
                  <Close />{" "}
                </div>
              </div>
              <div className="flex items-center justify-between p-[20px] border-b-[1px] border-b-gray-300">
                <p className="text-gray-600">
                  Выключить уведомления <br /> о сообщениях
                </p>
                <Switch {...label} />
              </div>
              <p className="lg:text-[18px] p-[20px] cursor-default">
                Участники
              </p>
              <div className="flex items-center gap-[15px] px-[20px] py-[10px] hover:bg-gray-200">
                <img
                  src={
                    chatProfile.image == null || chatProfile.image == ""
                      ? logo
                      : `${import.meta.env.VITE_APP_FILES_URL}${
                          chatProfile.image
                        }`
                  }
                  className="w-[50px] h-[50px] rounded-[50%]"
                  alt=""
                />
                <h3 className="text-[20px] font-[600]">
                  {chatProfile.userName}
                </h3>
              </div>
            </div>
            <div className="p-[20px] border-t-[1px] border-t-gray-300 flex flex-col gap-[15px] w-[100%]">
              <p
                onClick={() =>
                  alert(
                    "Why do you say to him bad say. He is very good person😋"
                  )
                }
                className="lg:text-[17px] text-red-400 cursor-pointer active:text-red-500"
              >
                Пожаловатся
              </p>
              <p
                onClick={() => alert("Do no not block him😐")}
                className="lg:text-[17px] text-red-400 cursor-pointer active:text-red-500"
              >
                Заблокироват
              </p>
              <p
                onClick={handleOpenDelete}
                className="lg:text-[17px] text-red-400 cursor-pointer active:text-red-500"
              >
                Удалит чат
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col justify-between h-[210px] text-center outline-none">
              <p className="lg:text-[20px] p-[20px] mb-[10px]">
                Удалить чат навсегда?
              </p>
              <Link to={"/basic/message/get"}>
                {" "}
                <p
                  onClick={() => {
                    dispatch(deleteChat(chatId));
                    dispatch(setModalInfo());
                  }}
                  className="p-[20px] text-red-500 font-[600] border-y-[1px] border-y-gray-300 cursor-pointer hover:bg-gray-200"
                >
                  Удалит
                </p>{" "}
              </Link>
              <p
                className="p-[20px] text-gray-900 cursor-pointer hover:bg-gray-200"
                onClick={handleCloseDelete}
              >
                Отмена
              </p>
            </div>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openMessage}
          onClose={handleCloseMessage}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col justify-between h-[210px] text-center outline-none">
              <p className="lg:text-[20px] p-[20px] mb-[10px]">
                Удалить Сообщения навсегда?
              </p>
              <p
                onClick={() => {
                  dispatch(deleteMessage(messageIdx));
                  handleCloseMessage();
                }}
                className="p-[20px] text-red-500 font-[600] border-y-[1px] border-y-gray-300 cursor-pointer hover:bg-gray-200"
              >
                Удалит
              </p>
              <p
                className="p-[20px] text-gray-900 cursor-pointer hover:bg-gray-200"
                onClick={handleCloseMessage}
              >
                Отмена
              </p>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ChatById;
