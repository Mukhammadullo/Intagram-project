import { Close } from "@mui/icons-material";
import { Box, Button, Modal, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatId,
  setClickChatModal,
  setInpMessageCreateChat,
} from "../../reducers/Message/Message";
import logo from "../../assets/images/userimage.jpg";
import { createChat, getData, searchChat } from "../../api/Message/messageApi";
import { Link } from "react-router-dom";

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "10px",
  border: "3px solid white",
  boxShadow: 24,
  p: 3,
};

const ModalCreateChat = () => {
  const dispatch = useDispatch();
  let inpMessageCreateChat = useSelector(
    (store) => store.message.inpMessageCreateChat
  );

  let dataCreateChat = useSelector((store) => store.message.dataCreateChat);
  let isLoadingCrateChat = useSelector(
    (store) => store.message.isLoadingCrateChat
  );
  let skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  useEffect(() => {
    dispatch(getData());
  }, []);

  let openChat = useSelector((store) => store.message.openChatModal);
  let selectedChat = false;

  return (
    <div>
      <div>
        <Modal
          open={openChat}
          onClose={() => dispatch(setClickChatModal())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <div className="flex items-center justify-between mb-[20px]">
              <p className="font-[600]">Новое сообщение</p>
              <div onClick={() => dispatch(setClickChatModal())}>
                {" "}
                <Close sx={{ cursor: "pointer" }} />{" "}
              </div>
            </div>
            <div className="border-y-gray-700 border-y-[1px] p-[10px] px-[15px] flex items-center gap-[10px]">
              <p>Кому:</p>
              <input
                type="text"
                placeholder="Поиск"
                value={inpMessageCreateChat}
                onChange={(event) =>
                  dispatch(setInpMessageCreateChat(event.target.value))
                }
                onInput={() => dispatch(searchChat(inpMessageCreateChat))}
                className="outline-none"
              />
            </div>
            <div>
              <div className="h-[300px] overflow-auto">
                <p className="p-[20px]">Рекомендуемые</p>
                {isLoadingCrateChat ? (
                  <div>
                    {skeleton.map((elem, ind) => {
                      return (
                        <Stack
                          spacing={1}
                          key={ind}
                          className="p-[20px] py-[10px]"
                        >
                          <div className="flex items-center gap-[10px]">
                            <Skeleton
                              variant="circular"
                              width={60}
                              height={60}
                            />
                            <div className="flex flex-col gap-[8px]">
                              <Skeleton variant="rectangular" width={120} />
                              <Skeleton variant="rounded" width={220} />
                            </div>
                          </div>
                        </Stack>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    {dataCreateChat?.map((elem, i) => {
                      return (
                        <Link
                          key={i}
                          to={`chatById/${elem.id}`}
                          onClick={() => {
                            dispatch(createChat(elem.id));
                            dispatch(setClickChatModal());
                          }}
                        >
                          <div className="px-[20px] py-[10px] hover:bg-gray-100 flex items-center gap-[15px] cursor-pointer">
                            <img
                              src={
                                elem.avatar.length == 0 || elem.avatar == null
                                  ? logo
                                  : `${import.meta.env.VITE_APP_FILES_URL}${
                                      elem?.avatar
                                    }`
                              }
                              className="w-[60px] h-[60px] rounded-[50%]"
                              alt=""
                            />
                            <div className="flex flex-col gap-[3px]">
                              <p className="text-[17px] font-[600]">
                                {elem.userName}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="p-[20px]">
              <Button variant="contained" disabled sx={{ width: "100%" }}>
                Чат
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ModalCreateChat;
