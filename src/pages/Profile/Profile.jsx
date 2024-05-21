import UserAvatar from "/src/assets/images/polzovatel.jpg";
import { getToken } from "../../utils/token";
import { GetPostByUser, deletePost, getProfileById } from "../../api/Profile/profile";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Tabs from "@mui/material/Tabs";

let userId = getToken().sid;

// MUI
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { Dialog, Divider, Tab, TextField } from "@mui/material";
import Swiper from "swiper";
import { FavoriteBorder } from "@mui/icons-material";
import { comPost } from "../../api/Home/home";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  //mui modal for more
  const [openM, setOpenM] = useState(false);

  const handleClickOpenM = () => {
    setOpenM(true);
  };
  const handleCloseM = () => {
    setOpenM(false);
  };

  // mui tabs
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // wicnd
  const dispatch = useDispatch();

  let user = useSelector((store) => store.profile.userProfile);

  let getPost = useSelector((store) => store.profile.postUser);
let postById = useSelector((store) => store.Home.byId)
  console.log(getPost);
console.log(postById);
  const [openCom, setOpenCom] = useState(false);

  const handleClickOpenCom = (id) => {
    setOpenCom(true);
  };

  const handleCloseCom = () => {
    setOpenCom(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getProfileById(userId));
    dispatch(GetPostByUser(userId));
  }, [dispatch, userId]);
  return (
    <div className="overflow-hidden">
      <div className="flex ml-[24%] gap-[10%] pt-[4.4%]">
        <div>
          <img
            className="w-[200px] rounded-[500px] h-[200px]"
            src={
              user.image == 0 || user.image == null
                ? UserAvatar
                : `${import.meta.env.VITE_APP_FILES_URL}${user.image}`
            }
            alt="avatar"
          />
        </div>
        <div className="mt-[-2%]">
          <div className="flex gap-[5%] items-center mb-[5%]">
            <h1 className="font-medium text-[120%]">{user.userName}</h1>
            <div className="flex items-center gap-[5%]">
              <Link to={"account/settings"}>
                <button
                  onClick={user.userName}
                  className="bg-[#EFEFEF] rounded-[10px] text-[90%] font-medium"
                >
                  {" "}
                  Редактировать профиль
                </button>
              </Link>
              <button className="bg-[#EFEFEF] rounded-[10px] text-[90%] font-medium">
                {" "}
                Посмотреть архив
              </button>
              <button className="bg-[#EFEFEF] rounded-[10px] text-[90%] font-medium">
                {" "}
                Рекламные инструменты
              </button>
            </div>
            <h1 className="w-[4%] cursor-pointer">•••</h1>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
          </div>
          <div className="mb-[3%]">
            <ul className="flex gap-[6%]">
              <li className="flex">
                <h1 className="font-medium">{user.postCount}</h1>
                <h1 className="ml-[5px]">публикаций</h1>
              </li>
              <li className="flex">
                <h1 className="font-medium">{user.subscribersCount}</h1>
                <h1 className="ml-[5px]">подписчиков</h1>
              </li>
              <li className="flex">
                <h1 className="font-medium">{user.subscriptionsCount}</h1>
                <h1 className="ml-[5px]">подписок</h1>
              </li>
            </ul>
          </div>
          <h1 className="font-medium mb-[1.5%]">{user.fullName}</h1>
          <p className="w-[450px] text-[95%] mb-[3%]">{user.about}</p>
          <span className="text-[83%]">{user.dateUpdated}</span>
        </div>
      </div>
      <br />
      <br />
      <div className="font-light  border-[2px] text-gray-300  border-gray-300 inline pb-[8px] cursor-pointer rounded-[500px] px-[25px] ml-[20%] text-[350%]">
        +
      </div>

      <hr className="border-gray-300 mt-[4%] w-[70%] m-auto" />

      <Box sx={{ width: "100%", marginLeft: "400px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Publick" wrapped />
          <Tab value="two" label="Reels" />
          <Tab value="three" label="Saved" />
          <Tab value="four" label="Marks" />
        </Tabs>
      </Box>
      <div className="w-[60%] grid grid-cols-3 ml-[20%] gap-[10px] pt-[4.4%]">
        {getPost.map((elem) => {
          return (
            <>
              <div key={elem.id} >
                <img
                  className="w-[250px] h-[40vh] cursor-pointer hover:opacity-50 ease-in duration-100"
                  onClick={()=>{handleClickOpenCom(),dispatch(comPost(elem.postId))}}
                  src={
                    elem.images == 0 || elem.images == null
                      ? UserAvatar
                      : `${import.meta.env.VITE_APP_FILES_URL}${elem.images}`
                  }
                  alt="avatar"
                />
              </div>
              <Modal
                onClose={handleCloseCom}
                open={openCom}
                className="bg-[#00000056]"
              >
                <Box>
                  <Box className="flex justify-center items-center my-[30px]">
                    {/* lf */}
                    <aside className="w-[480px] bg-[black] pr-[50px] h-[675px] overflow-hidden flex items-center">
                      <img
                        src={
                          postById.images == 0 || postById.images == null
                            ? UserAvatar
                            : `${import.meta.env.VITE_APP_FILES_URL}${
                              postById.images
                              }`
                        }
                        alt="Photos"
                      />
                    </aside>

                    {/* rt */}
                    <aside className="w-[500px] bg-[#ffffff] rounded-r-[3px] h-[675px]">
                      {/* navbar */}
                      <div
                        style={{ position: "sticky", top: "0" }}
                        className="flex justify-between items-center bg-[#f4f4f48c] rounded-b-[5px] border-b-[1px]"
                      >
                        {/* rightStep */}
                        <aside className="px-[20px] py-[10px]">
                          <div className="flex items-center gap-[12px]">
                            <div className="w-[45px] h-[45px] rounded-[50%] border-[3px] flex items-center justify-center">
                              <img
                                src={
                                  postById.images == 0 || postById.images == null
                                    ? UserAvatar
                                    : `${import.meta.env.VITE_APP_FILES_URL}${
                                      postById.images
                                      }`
                                }
                                className="w-[35px] h-[35px] rounded-[50%]"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h1 className="text-[16px]">
                                  {" "}
                                  {postById.title}{" "}
                                </h1>
                                <p className="text-[12px] text-[#3d3c3c]">
                                  {postById.content}
                                </p>
                              </div>
                              <div>
                                <h1 className="text-[150%] cursor-pointer" onClick={handleClickOpenM}>
                                  •••
                                </h1>
                              </div>
                            </div>
                          </div>
                        </aside>
                        {/* leftStep */}
                        <aside className="p-[20px]"></aside>
                      </div>

                      {/* second */}
                      <div className="px-[20px] py-[10px] h-[430px] overflow-auto scroll-h">
                        <div className="flex items-start gap-[12px]">
                          <div>
                            <div className="w-[45px] h-[45px] rounded-[50%] border-[3px] flex items-center justify-center">
                              <img
                                src={
                                  postById.images == 0 || postById.images == null
                                    ? UserAvatar
                                    : `${import.meta.env.VITE_APP_FILES_URL}${
                                      postById.images
                                      }`
                                }
                                className="w-[35px] h-[35px] rounded-[50%]"
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-[10px]">
                            <h1 className="text-[16px]"> {postById.comment} </h1>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* third */}
                      <div>
                        <div className="px-[20px] flex flex-col gap-[15px] py-[10px]">
                          {/* icons */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-[12px]">
                              <button>
                                <FavoriteBorder />
                              </button>
                              <button>
                                {" "}
                                <img
                                  src="src/assets/icons/comment-svgrepo-com (4).svg"
                                  alt=""
                                />
                              </button>
                              <button>
                                {" "}
                                <img
                                  src="src/assets/icons/comment-email-mail-message-post-send-svgrepo-com (4).svg"
                                  alt=""
                                />
                              </button>
                            </div>
                            <div>
                              <button>
                                <img
                                  src="src/assets/icons/save-svgrepo-com.svg"
                                  alt=""
                                />
                              </button>
                            </div>
                          </div>

                          {/* text */}
                          <div>
                            <h1 className="text-[15px] font-[700]">
                              <span></span> отметок "Нравиться"
                            </h1>
                            <p className="text-[12px]">
                              {" "}
                              {postById.postLikeCount}{" "}
                            </p>
                          </div>
                        </div>

                        <Divider />

                        <div className="px-[20px] py-[14px] flex gap-[10px]">
                          <TextField
                            variant="standard"
                            InputProps={{
                              disableUnderline: true,
                            }}
                            fullWidth
                            placeholder="Добавьте Коментарий..."
                          />
                          <button>Опубликовать</button>
                        </div>
                      </div>
                    </aside>
                  </Box>

                  <button
                    onClick={handleCloseCom}
                    className=" absolute top-2 right-0 mx-[20px]"
                  >
                    <img src="src/assets/icons/close-svgrepo-com.svg" alt="" />
                  </button>
                </Box>
              </Modal>
            </>
          );
        })}
      </div>

      {/* modal comment */}
      {/* modal with onlcick commet */}

      {/* more */}

      {/* modal with onclick three dots or more */}
      <Dialog onClose={handleCloseM} open={openM}>
     
        <button
          onClick={() => dispatch(deletePost(postById.postId) , handleCloseM())}
          className="py-[12px] w-[400px] text-[#ED4956]  text-[14px] font-[700] hover:bg-[#f6f6f6]"
        >
          Удалить публикацию
        </button>
        <Divider />
        <button
          onClick={() =>
            alert("Oooo супер 😍, вы хотите добавить это в избронное? ")
          }
          className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]  "
        >
          Добавить в изобранное
        </button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]">
          Перейти к публикации
        </button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]">
          Поделиться...
        </button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]" onClick={()=> alert ("link copied") }>
          Коировать ссылку
        </button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]">
          Вставить на сайт
        </button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]">
          Об аккаунте
        </button>
        <Divider />
        <button
          className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]"
          onClick={handleCloseM}
        >
          Отмена
        </button>
      </Dialog>
    </div>
  );
};

export default Profile;
