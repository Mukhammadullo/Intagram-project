import React, { useEffect, useState } from "react";
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
//mui icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
//mui modal
import Dialog from '@mui/material/Dialog';
import { Avatar, Box, Button, ButtonBase, Divider, Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addStories, allUsers, comPost, getPost, getUser, likePost, postComment, profileById, storyById } from "../../api/Home/home";
//mui modal imodj
import { getToken } from "../../utils/token";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { setComment } from "../../reducers/Home/Home";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

function Home() {

  //mui modal for more
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //story 
  const [openStory, setOpenStory] = useState(false);
  const handleClickOpenStory = () => {
    setOpenStory(true);
  };

  const handleCloseStory = () => {
    setOpenStory(false);
  };


  //mui modal for comment
  const [openCom, setOpenCom] = useState(false);
  const handleClickOpenCom = (id) => {
    setOpenCom(true);
    dispatch(comPost(id))
  };

  const handleCloseCom = () => {
    setOpenCom(false);
  };

  //mui modal for add 
  const [addStory, setAddStory] = useState(false);

  const handleClickAddStory = () => {
    setAddStory(true);
  }

  const handleCloseAddStory = () => {
    setAddStory(false);
  }


  //events
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((store) => store.Home.home)
  const post = useSelector((store) => store.Home.post)
  const byId = useSelector((store) => store.Home.byId)
  const profile = useSelector((store) => store.Home.profile)
  const comments = useSelector((store) => store.Home.comment)
  const stories = useSelector((store) => store.Home.stories)
  const allUser = useSelector((store) => store.Home.allUser)


  //token => id
  let user = getToken().sid

  //getUser
  useEffect(() => {
    dispatch(getUser())
    dispatch(getPost(user))
    dispatch(profileById(user))
    dispatch(allUsers())
  }, [dispatch, user])


  //base 64
  const [img, setImg] = useState(null)

  const handleImage = (e) => {
    setImg(e.target.files[0])
  }

  const handleApi = () => {
    const formData = new FormData()
    formData.append('Image', img)
    dispatch(addStories(formData))
  }

  return (
    <>
      {/* main */}
      <div className="p-[20px] pr-[0] pb-[10vh]">

        <div className="flex items-start">
          {/* stories */}
          <section className="w-[100%]">
            {/* swiper */}

            <aside>
              <Swiper
                modules={[Navigation]}
                spaceBetween={"-12px"}
                slidesPerView={8}
                style={{ overflow: 'hidden' }}
                className="w-[80%]"
              >
                <SwiperSlide onClick={handleClickAddStory} style={{ cursor: "pointer" }}>
                  <div className="w-[60px] h-[60px] rounded-[50%] p-[3px] bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center">
                    <div className="bg-white  w-[55px] h-[55px] rounded-[50%] items-center flex justify-center">
                      <AddIcon />
                    </div>
                  </div>
                </SwiperSlide>
                {
                  data?.map((e) => {
                    return (
                      <SwiperSlide onClick={() => {
                        dispatch(storyById(e.userId)),
                          handleClickOpenStory()
                      }} style={{ cursor: "pointer" }}>
                        <div className="flex flex-col items-center gap-[3px] " key={e.userId}>
                          <div className="w-[60px] p-[3px] h-[60px] rounded-[50%] flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
                            <div className="w-[55px] h-[55px]">
                              <img src={`${import.meta.env.VITE_APP_FILES_URL}${e.userPhoto}`} className="w-[50px] h-[50px] rounded-[50%] bg-white" />
                            </div>
                          </div>
                          <h1>{e.userName}</h1>
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </aside>


            {/* public */}
            <section className="flex flex-col items-center pt-[30px]">

              {
                post?.map((e) => {
                  return (
                    <>
                      {/* div's */}
                      <div key={e.id} className="w-[480px] flex flex-col items-center gap-[12px] pt-[20px]">

                        {/* d1 */}
                        <div className="flex justify-between items-center w-[100%]">

                          {/* right */}
                          <aside>
                            <div className="flex items-center gap-[12px]">
                              <div className="w-[45px] h-[45px] rounded-[50%] bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center">

                                {
                                  allUser.map((elem) => {
                                    return elem.id == e.userId ? <Avatar src={
                                      elem.avatar == "" ||
                                        elem.avatar == null ? (
                                        " "
                                      ) : (
                                        `${import.meta.env.VITE_APP_FILES_URL}${elem?.avatar}`
                                      )
                                    } className="w-[40px] h-[40px] rounded-[50%] bg-white" alt="" /> : null
                                  })
                                }
                              </div>
                              <div>
                                {allUser?.map(element => {
                                  return e.userId == element.id ? <div className="cursor-pointer" onClick={() => navigate(`profile`)}>
                                    <h1>{element.userName}</h1>
                                    <p className="text-[12px]">{e.datePublished.slice(0, 10)}</p>
                                  </div> : null
                                })}

                              </div>
                            </div>
                          </aside>

                          {/* left */}
                          <aside>
                            <button onClick={handleClickOpen}><MoreHorizIcon /></button>
                          </aside>
                        </div>


                        {/* video or img */}
                        <div className="w-[468px] flex items-center justify-center rounded-[5px]">
                          <Swiper
                            spaceBetween={15}
                            slidesPerView={1}
                            modules={[Navigation]}
                          >

                            {e.images.map((el) => {
                              if (e.images != null && e.images != 0) {
                                return (
                                  !el.includes(".mp4") ? <SwiperSlide><img src={`${import.meta.env.VITE_APP_FILES_URL}${e.images.slice(0, 1)}`}
                                    className="w-[468px] rounded-[5px]" /></SwiperSlide>
                                    : (<video src={`${import.meta.env.VITE_APP_FILES_URL}${e.images[0]}`} loop controls className="w-[468px] bg-[black] h-[600px]"></video>)
                                )
                              }
                            })}

                          </Swiper>

                        </div>

                        {/* d2 */}
                        <aside className="w-[100%] pl-[8px]">

                          <div className="flex flex-col gap-[15px]">
                            {/* icons */}
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-[12px]">
                                <button onClick={() => {
                                  dispatch(likePost(e.postId))
                                  dispatch(getPost(user))
                                }}> {e.postLike ? <Favorite className="text-[red]" /> : <FavoriteBorder />}
                                </button>
                                <button onClick={() => { handleClickOpenCom(e.postId) }}> <img src="src/assets/icons/comment-svgrepo-com (4).svg" alt="" /></button>
                                <button> <img src="src/assets/icons/comment-email-mail-message-post-send-svgrepo-com (4).svg" alt="" /></button>
                              </div>
                              <div>
                                <button><img src="src/assets/icons/save-svgrepo-com.svg" alt="" /></button>
                              </div>
                            </div>

                            {/* text */}
                            <div>
                              <h1 className="text-[15px] font-[700]"><span>{e.postLikeCount}</span> отметок "Нравиться"</h1>
                              <div className="flex flex-wrap gap-[5px]">
                                <h1>{e.title}</h1>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => { handleClickOpenCom(e.postId) }}><h1 className="text-[#999898] pt-[10px]">Посмотреть все комментарии <span>{e.commentCount}</span></h1></button>
                          <div className="py-[10px] flex gap-[10px]">

                            <TextField
                              variant="standard"
                              InputProps={{
                                disableUnderline: true
                              }}
                              fullWidth
                              placeholder="Добавьте Коментарий..."
                            />
                            <button className="text-[blue]">Опубликовать</button>
                            <button><SentimentSatisfiedAltIcon sx={{ width: "80%" }} /></button>
                          </div>

                          <Divider />
                        </aside >
                      </div>
                    </>
                  )
                })
              }
            </section>


          </section>



          {/* left side */}
          <section className="pr-[50px] pt-[20px]">

            <main className="flex flex-col gap-[40px]">
              {/* only first */}
              <div className="flex items-center gap-[150px]">
                <aside className="flex items-center gap-[12px]">
                  <div className="w-[45px] h-[45px] flex justify-center items-center">
                    <img src={
                      profile.image == 0 || profile.image == null ? "" : `${import.meta.env.VITE_APP_FILES_URL}${profile.image}`
                    } className="w-[40px] h-[40px] rounded-[50%]" />
                  </div>
                  <div>
                    <h1 className="text-[16px]">{profile.userName}</h1>
                  </div>
                </aside>
                <aside>
                  <h1 className="text-[blue] text-[14px] font-[700]">Переключиться</h1>
                </aside>
              </div>

              <aside className="flex flex-col gap-[20px]">
                <table>
                  <tr>
                    <th className="text-[#3d3c3c] text-start">Рекомендации для вас</th>
                    <th className="text-center">Все</th>
                  </tr>
                  <tbody>
                    {data?.map((el) => {
                      return (
                        <tr key={el.id}>
                          <td className="pt-[20px]">
                            <aside className="flex items-center gap-[10px] justify-between"> {/*Обновленный стиль*/}
                              <div className="flex items-center gap-[10px]">
                                <div className="w-[45px] p-[3px] h-[45px] rounded-[50%] flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
                                  <div className="w-[45px] h-[45px] flex justify-center items-center">
                                    <img src={`${import.meta.env.VITE_APP_FILES_URL}${el.userPhoto}`} className="w-[40px] h-[40px] rounded-[50%] bg-white" />
                                  </div>
                                </div>
                                <h1 className="text-[16px]">{el.userName}</h1>
                              </div>
                            </aside>

                          </td>
                          <td>
                            <h1 className="flex text-[blue]">Подписаться</h1>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </aside>
            </main>
          </section>

        </div >
      </div >


      {/* modal with onclick three dots or more */}
      < Dialog
        onClose={handleClose}
        open={open}
      >
        <button onClick={() => alert("Извините, но это функция не работает 🤕")} className="py-[12px] w-[400px] text-[#ED4956]  text-[14px] font-[700] hover:bg-[#f6f6f6]">Пожаловаться</button>
        <Divider />
        <button onClick={() => alert("Как не стыдно 😒, зачем вы подписались тогда?")} className="py-[12px] w-[400px] text-[#ED4956]  text-[14px] font-[700] hover:bg-[#f6f6f6]">Отменить подписку</button>
        <Divider />
        <button onClick={() => alert("Oooo супер 😍, вы хотите добавить это в избронное? ")} className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]  ">Добавить в изобранное</button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]">Перейти к публикации</button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]">Поделиться...</button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]">Коировать ссылку</button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]">Вставить на сайт</button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]">Об аккаунте</button>
        <Divider />
        <button className="py-[12px] w-[400px] hover:bg-[#f6f6f6]  text-[14px]" onClick={handleClose}>Отмена</button>
      </Dialog >

      {/* modal with onlcick commet */}
      < Modal
        onClose={handleCloseCom}
        open={openCom}
        className="bg-[#00000056]"
      >
        <Box>

          <Box className="flex justify-center items-center my-[30px]">
            {/* lf */}
            <aside className="w-[480px] bg-[black] h-[675px] overflow-hidden flex items-center">
              <div>
                <Swiper
                  slidesPerView={1}
                  modules={[Navigation]}
                  className="w-[480px]"
                >
                  {byId.images?.map((el) => {
                    return (
                      !el.includes(".mp4") ? <SwiperSlide><img className=" w-[480px] h-full" src={`${import.meta.env.VITE_APP_FILES_URL}${byId.images.slice(0, 1)}`} /></SwiperSlide>
                        : (<video src={`${import.meta.env.VITE_APP_FILES_URL}${byId.images[0]}`} loop controls className="w-full  bg-[black] h-full"></video>)
                    )
                  })}
                </Swiper>

              </div>
            </aside>

            {/* rt */}
            <aside className="w-[500px] bg-[#ffffff] rounded-r-[3px] h-[675px]">

              {/* navbar */}
              <div
                style={{ position: "sticky", top: "0" }}
                className="flex justify-between items-center bg-[#f4f4f48c] rounded-b-[5px] border-b-[1px]">
                {/* rightStep */}
                <aside className="px-[20px] py-[10px]">

                  <div className="flex items-center gap-[12px]">
                    <div className="w-[45px] h-[45px] rounded-[50%] border-[3px] flex items-center justify-center">
                      {allUser?.map((elem) => {
                        {
                          return byId?.userId == elem.id ? <img src={`${import.meta.env.VITE_APP_FILES_URL
                            }${elem?.avatar}`} className="w-[35px] h-[35px] rounded-[50%]" /> : null
                        }
                      })}
                    </div>
                    <div>

                      {allUser?.map(el => {
                        return byId?.userId == el.id ? <h1 className="font-bold">{el.userName}</h1> : null
                      })}
                    </div>
                  </div>

                </aside>
                {/* leftStep */}
                <aside className="p-[20px]">
                  <button onClick={handleClickOpen}><MoreHorizIcon /></button>
                </aside>
              </div>

              {/* second */}
              <div className="px-[20px] py-[10px] h-[430px] overflow-auto scroll-h">
                <div className="flex items-center gap-[12px]">
                  <div>
                    <div className="w-[45px] h-[45px] rounded-[50%] border-[3px] flex items-center justify-center">
                      {allUser?.map((elem) => {
                        {
                          return byId?.userId == elem.id ? <img src={`${import.meta.env.VITE_APP_FILES_URL
                            }${elem?.avatar}`} className="w-[35px] h-[35px] rounded-[50%]" /> : null
                        }
                      })}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-[10px]">
                    <h1 className="text-[16px]">{allUser?.map((e) => {
                      return byId?.userId == e.id ? <h1>{e.userName}</h1> : null
                    })}</h1>
                  </div>
                </div>
                <h1>{byId.comments?.map((e) => {
                  return (
                    <h1>{e.comment}</h1>
                  )
                })}</h1>
              </div>

              <Divider />

              {/* third */}
              <div>
                <div className="px-[20px] flex flex-col gap-[15px] py-[10px]">
                  {/* icons */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-[12px]">

                      <button onClick={() => {
                        dispatch(likePost(byId.postId))
                        dispatch(getPost(user))
                        dispatch(comPost(byId.postId))
                      }}> {byId.postLike ? <Favorite className="text-[red]" /> : <FavoriteBorder />}
                      </button>
                      <button> <img src="src/assets/icons/comment-email-mail-message-post-send-svgrepo-com (4).svg" alt="" /></button>
                    </div>
                    <div>
                      <button><img src="src/assets/icons/save-svgrepo-com.svg" alt="" /></button>
                    </div>
                  </div>

                  {/* text */}
                  <div>
                    <h1 className="text-[15px] font-[700]"><span>{byId.postLikeCount}</span> отметок "Нравиться"</h1>
                  </div>
                </div>

                <Divider />

                <div className="px-[20px] py-[14px] flex gap-[10px]">
                  <button><SentimentSatisfiedAltIcon /></button>
                  <TextField
                    variant="standard"
                    InputProps={{
                      disableUnderline: true
                    }}
                    fullWidth
                    placeholder="Добавьте Коментарий..."
                    onChange={(e) => dispatch(setComment(e.target.value))}
                  />
                  <button className="text-[blue]" onClick={() => { dispatch(postComment({ comment: comments, postId: post?.postId })) }}>Опубликовать</button>
                </div>

              </div>

            </aside>
          </Box>

          <button onClick={handleCloseCom} className=" absolute top-2 right-0 mx-[20px]"><img src="src/assets/icons/close-svgrepo-com.svg" alt="" /></button>
        </Box>
      </Modal >

      {/* modal add */}
      <Modal
        open={addStory}
        onClose={handleCloseAddStory}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ width: "400px", height: "600px", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}

      >
        <Box className="bg-white w-[400px] flex flex-col rounded-[10px] gap-[20px] py-[20px]">
          <div>
            <h1 className="text-[32px] text-center">Добавить Историю</h1>
          </div>
          <Divider />
          <div className="flex justify-center">
            <input type="file" name="file" onChange={handleImage} />
            <img src={img} alt="" />
          </div>
          <Divider />
          <div className="flex items-center justify-center gap-[10px]">
            <button type="submit" onClick={() => {
              handleCloseAddStory()
              handleApi()
            }} className="border-[1px] border-[#4dadf1] text-[#4dadf1] px-[20px] py-[3px] rounded-[5px]">Story</button>
            <button onClick={handleCloseAddStory} className="border-[1px] border-[#4dadf1] text-[#4dadf1] px-[20px] py-[3px] rounded-[5px]">Close</button>
          </div>
        </Box>
      </Modal>


      {/*  */}




      <Dialog
        open={openStory}
        onClose={handleCloseStory}
        sx={{ width: "400px", height: "600px", backgroundColor: "black", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}

      >

        <Swiper
          slidesPerView={1}
          modules={[Navigation]}
          navigation={true}
          className="w-[400px] h-[300px]"
        >

          {stories[0]?.stories?.map((e) => {
            if (e.fileName != null) {
              // { console.log(e.fileName) }
              return (
                <div className="flex items-center justify-center">
                  <SwiperSlide><img src={`${import.meta.env.VITE_APP_FILES_URL}${e.fileName}`} /></SwiperSlide>
                </div>
              )
            }
            return null;
          })}
        </Swiper>

      </Dialog >


    </>
  );
}

export default Home;

