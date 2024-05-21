import { useState, useEffect } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../api/Message/messageApi";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Close } from "@mui/icons-material";
import { TextField } from "@mui/material";
import {
  setChatId,
  setClickChatModal,
  setInpPasswordChatModal,
  setInpUserNameChatModal,
  setUserId,
} from "../../reducers/Message/Message";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/images/userimage.jpg";
import { Link, Outlet } from "react-router-dom";
import ModalCreateChat from "../../components/Abdurahmon/ModalCreateChat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  border: "3px solid white",
  boxShadow: 24,
  p: 4,
};

const Message = () => {
  /// dispatch
  const dispatch = useDispatch();

  /// get
  let data = useSelector((store) => store.message.data);
  let skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let isLoading = useSelector((store) => store.message.isLoading);
  useEffect(() => {
    dispatch(getData());
  }, []);

  /// modal profil login
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let inpUserNameChatModal = useSelector(
    (store) => store.message.inpUserNameChatModal
  );
  let inpPasswordChatModal = useSelector(
    (store) => store.message.inpPasswordChatModal
  );
  let dialogInfo = useSelector((store) => store.message.dialogInfo);

  return (
    <main className="h-[100vh]">
      <div className="wrapper-message flex justify-between items-start">
        <aside className="left w-[28%] border-r-[1px] over h-[100vh] ml-[10px] pt-[20px]">
          <div className="flex items-center justify-between p-[20px] pr-[30px]">
            <h1
              onClick={handleOpen}
              className="text-[18px] font-[600] lg:text-[24px] lg:font-[700] cursor-pointer"
            >
              My_Chat
              <KeyboardArrowDownIcon />
            </h1>
            <div
              className="cursor-pointer"
              onClick={() => dispatch(setClickChatModal())}
            >
              {" "}
              <LaunchIcon />{" "}
            </div>
          </div>
          <div className="flex items-center justify-between p-[20px] pr-[30px]">
            <h5 className="lg:text-[18px] font-[700]">Сообщения</h5>
            <p className="lg:text-[17px] cursor-pointer font-[600] text-blue-500">
              Requests(0)
            </p>
          </div>
          <div className="overflow-auto h-[77.6vh]">
            {isLoading ? (
              <div>
                {skeleton.map((elem, ind) => {
                  return (
                    <Stack spacing={1} key={ind} className="p-[20px] py-[10px]">
                      <div className="flex items-center gap-[10px]">
                        <Skeleton variant="circular" width={60} height={60} />
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
                {data.map((elem, i) => {
                  return (
                    <Link
                      key={i}
                      onClick={() => {
                        dispatch(setChatId(elem.chatId)),
                          dispatch(setUserId(elem.receiveUser.userId));
                      }}
                      to={`chatById/${elem.receiveUser.userId}`}
                    >
                      <div
                        key={elem.chatId}
                        className="px-[20px] py-[5px] hover:bg-gray-100 flex items-center gap-[15px] cursor-pointer"
                      >
                        <img
                          src={
                            elem.receiveUser.userPhoto.length == 0 ||
                            elem.receiveUser.userPhoto == null
                              ? logo
                              : `${import.meta.env.VITE_APP_FILES_URL}${
                                  elem?.receiveUser.userPhoto
                                }`
                          }
                          className="w-[55px] h-[55px] rounded-[50%]"
                          alt=""
                        />
                        <div className="flex flex-col gap-[3px]">
                          <p className="text-[17px] font-[600]">
                            {elem.receiveUser.userName}
                          </p>
                          <p className="text-gray-500">
                            {elem.receiveUser.fullname}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
        <aside
          className={
            dialogInfo
              ? "right w-[50%] relative mr-[350px]"
              : "right w-[72%] relative"
          }
        >
          <Outlet />
          {/* modal profile login */}
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="flex items-center justify-end">
                  <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
                </div>
                <div className="flex flex-col gap-[20px] px-[30px]">
                  <h1 className="text-[35px] text-center font-mono mb-[30px]">
                    Instagramm
                  </h1>
                  <TextField
                    label="Email addres or User nam"
                    value={inpUserNameChatModal}
                    onChange={(event) =>
                      setInpUserNameChatModal(event.target.value)
                    }
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    value={inpPasswordChatModal}
                    onChange={(event) =>
                      setInpPasswordChatModal(event.target.value)
                    }
                    fullWidth
                  />
                  <div className="flex items-center gap-[10px]">
                    <input type="checkbox" />
                    <p>Сохранит данные входа</p>
                  </div>
                  <Button
                    variant="contained"
                    sx={{ fontSize: "12px", borderRadius: "10px" }}
                  >
                    Войти
                  </Button>
                  <p className="text-center">Забыли парол</p>
                </div>
              </Box>
            </Modal>
          </div>
          {/* modal new chat */}
          <ModalCreateChat />
        </aside>
      </div>
    </main>
  );
};

export default Message;
