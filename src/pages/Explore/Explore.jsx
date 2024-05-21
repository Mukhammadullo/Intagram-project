import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TelegramIcon from "@mui/icons-material/Telegram";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "axios";
import { axiosRequest } from "../../utils/axiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { getPost, postComment } from "../../api/ExploreApi/ExploreApi";
import { getPostById } from "../../api/ExploreApi/ExploreApi";
import { postLike } from "../../api/ExploreApi/ExploreApi";
import { setComment } from "../../reducers/explore/Explore";
//swiper

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";



// import required modules
import { Zoom, Navigation, Pagination } from "swiper/modules";




const style = {
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
};

const Explore = () => {
  let dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  let [idx, setIdx] = React.useState();
  const handleOpen = () => {
    setOpen(true);

    dispatch(getPostById(idx));
  };
  const handleClose = () => setOpen(false);
  let reels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
  ];


  const [isSaved, setSaved] = React.useState(false);

  const handleBookmarkClick = () => {
    // Toggle the value of isSaved
    setSaved((prevSaved) => !prevSaved);
    // You can also perform additional logic like saving the video data to a database here
  };
  // getUser
  React.useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  //getById

  let dataById = useSelector((store) => store.explore.dataById);
  // console.log(dataById?.title);

  let data = useSelector((store) => store.explore.data);
  let comments = useSelector((store) => store.explore.Comments)

  return (
    <div className="font-sans">
      <div className="w-[82%] ml-[12%] m-auto">
        <div className="grid grid-cols-3 gap-[5px]">
          {data.map((elem, i) => {
            // console.log(elem.postId);
            return (
              <div
                onClick={() => {
                  handleOpen(), setIdx(elem.postId);
                  dispatch(getPostById(elem.postId));
                }}
                key={i}
                className={
                  i + 1 == 3 ||
                  i + 1 == 6 ||
                  i + 1 == 13 ||
                  i + 1 == 16 ||
                  i + 1 == 21 ||
                  i + 1 == 28
                    ? "bg-black   rounded-[1px]   w-[100%] row-span-2"
                    : "bg-black   rounded-[1px]   w-[100%] h-[300px] "
                }
              >
                <img
                  className="w-[100%] h-[100%] hover:cursor-pointer hover:opacity-40 ease-in delay-100"
                  src={`${import.meta.env.VITE_APP_FILES_URL}${elem?.images}`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* modal */}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex">
              {/* 
            
              
      
     
        
       
       
      
            
            
            */}

              <div className="w-[350px] h-[518px] border-solid border-[1px] border-gray-200 bg-black ">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  zoom={true}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Zoom, Navigation, Pagination]}
                  className="mySwiper"
                >
                  {dataById?.images?.map((elem) => {
                    // console.log(elem);
                    return (
                      <SwiperSlide>
                        <div className="swiper-zoom-container">
                          <img
                            className="h-[100%] w-[100%] "
                            src={`${import.meta.env.VITE_APP_FILES_URL}${elem}`}
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className=" ">
                <nav className=" flex justify-between  h-[60px] w-[450px] border-solid border-[1px] border-gray-200 items-center px-[2%]">
                  <div className="flex gap-3 items-center">
                    {/* {dataById?.images?.map((elem) => {
                      // console.log(elem);
                      return (
                        <img
                          className="h-[50px] w-[50px] rounded-[50%] "
                          src={`${import.meta.env.VITE_APP_FILES_URL}${elem}`}
                          alt=""
                        />
                      );
                    })} */}
                    <h1 className="">{dataById?.title}</h1>
                    <h1 className="text-blue-600">follow</h1>
                  </div>
                  <MoreHorizIcon />
                </nav>
                <div className="h-[300px]  px-[3%] overflow-auto">
                  {dataById?.comments?.map((elem) => {
                    console.log(elem);
                    return <h1 className="w-[300px]">{elem?.comment}</h1>;
                  })}
                </div>

                <footer className="py-[10px] px-[2%]">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <button>
                        {/* {
                        postLike?.map((elem) => {
                            if ( <FavoriteBorderIcon
                            color="error"
                            onClick={() => dispatch(postLike(elem.postId))}
                          ></FavoriteBorderIcon>) {
                              
                            }
                            else (<FavoriteBorderIcon
                              onClick={() => dispatch(postLike(elem.postId))}
                            ></FavoriteBorderIcon>)
                              
                            
                          })
                        } */}
                        {dataById?.postLike ? (
                          <FavoriteBorderIcon
                            color="error"
                            onClick={() => dispatch(postLike(dataById?.postId))}
                          ></FavoriteBorderIcon>
                        ) : (
                          <FavoriteBorderIcon
                            onClick={() => dispatch(postLike(dataById?.postId))}
                          ></FavoriteBorderIcon>
                        )}
                      </button>

                      <TelegramIcon />
                    </div>
                    <BookmarkBorderIcon
                      onClick={handleBookmarkClick}
                      style={{
                        cursor: "pointer",
                        color: isSaved ? "blue" : "black",
                      }}
                    />
                  </div>
                  <div className="py-[10px] ">
                    <h1>{dataById?.postLikeCount}</h1>
                    <h1>{dataById?.datePublished}</h1>
                    <p></p>
                  </div>
                  <div className="flex gap-2 items-center py-[3px] ">
                    <SentimentSatisfiedAltIcon />
                    <input
                      onChange={(e) => dispatch(setComment(e.target.value))}
                      className="w-[330px] outline-none h-[40px]"
                      type="text"
                      value={comments}
                      placeholder="Add a comment"
                    />
                    <button
                      onClick={() => {
                        dispatch(
                          postComment({
                            comment: comments,
                            postId: dataById?.postId,
                          })
                        );
                        dispatch(setComment(""));
                      }}
                      className="text-blue-600 "
                    >
                      post
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      {/* modal */}
    </div>
  );
};
export default Explore;
