import React, { useState } from "react";
import MessageIcon from "../../icons/Layout/MessageIcon";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setClickChatModal } from "../../reducers/Message/Message";

const DefaultMessage = () => {
  /// dispatch
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-[20px] justify-center items-center text-center lg:mt-[15%]">
      <div className="p-[30px] rounded-[50%] border-black border-[2px]">
        <MessageIcon sx={{ fontSize: "120px" }} />
      </div>
      <h1 className="lg:text-[30px]">Ваши сообщения</h1>
      <p className="text-gray-500">
        Отправляйте личные фото и сообщения другу или группе
      </p>
      <Button variant="contained" onClick={() => dispatch(setClickChatModal())}>
        отправить сообщение
      </Button>
    </div>
  );
};

export default DefaultMessage;
