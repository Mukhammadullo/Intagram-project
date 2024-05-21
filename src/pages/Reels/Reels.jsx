import React, { useState, useEffect } from "react";
// Icons From MUI
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
// API
import newUser from "../../assets/images/polzovatel.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getData, postComment, postLike } from "../../api/Reels/Reels";

// MOdal For SMS
import { styled, alpha } from "@mui/material/styles";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { setComment } from "../../reducers/reels/Reelse";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// ForRadio
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// IconFor
const label = { inputProps: { "aria-label": "Checkbox demo" } };

// ModalForComment
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

// Main Function
const Reels = () => {
  const dispatch = useDispatch();

  // For Search Inp
  const [search, setSearch] = useState("");

  // DataReels
  const data = useSelector((store) => store.reels.data);

  // forFollowtxt
  const [isFollowing, setFollowing] = useState(false);

  const handleButtonClick = () => {
    // Toggle the value of isFollowing
    setFollowing((prevFollowing) => !prevFollowing);
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  
  // modalThreeDot
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // modalForComment
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  // modalForSend
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  let comments = useSelector((store) => store.reels.Comments);

  // ForInputAddCommnet
  const [txt, setTxt] = useState("");

  // ForIdComment
  const [idx, setIdx] = useState(null);

  // MainReturnReels
  return (
    <div className="mt-0 flex gap-[20px] flex-col px-[32%]">
      {/* DataReels */}
      {data.map((e) => {
        return (
          <div key={e.postId}>
            <div className="flex items-end   h-[95vh]  ">
              {/* video */}
              <div className="bg-black rounded-[8px] flex items-center h-[88vh]">
                <video
                  src={`${import.meta.env.VITE_APP_FILES_URL}${e.images}`}
                  autoPlay
                  loop
                  width="380"
                  height="140"
                  muted
                  preload=""
                  controls
                  className="rounded-[8px]  bg-black"
                ></video>
              </div>
              {/* left */}
              <div className="flex flex-col  mx-2 ">
                {/* ButtonForLike */}
                <button>
                  {e.postLike ? (
                    <Favorite
                      className="text-[red]"
                      color="error"
                      onClick={() => dispatch(postLike(e.postId))}
                    ></Favorite>
                  ) : (
                    <FavoriteBorder
                      onClick={() => dispatch(postLike(e.postId))}
                    ></FavoriteBorder>
                  )}
                </button>
                <h1 className="ml-7">{e.postLikeCount}</h1>

                {/* ButttonForComment_____________________________________________ */}
                <ChatBubbleOutlineIcon
                  id="demo-customized-button"
                  aria-controls={open1 ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick1}
                  endIcon={<KeyboardArrowDownIcon />}
                  className="ml-5"
                ></ChatBubbleOutlineIcon>

                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                >
                  <MenuItem onClick={handleClose1} disableRipple></MenuItem>
                  <div>
                    <div className="flex  w-[100%] justify-evenly m-3">
                      <button className="font-bold text-[20px]">x</button>
                      <h1 className="font-bold text-center">Комментарии</h1>
                    </div>

                    {/* _________________________________________________________________________________________ */}
                    {data.map((e) => {
                      return (
                        <div className="w-[350px] ml-4 ">
                          {/* ForComments */}

                          {e.comments.map((e) => {
                            return (
                              <div className="flex my-2">
                                <img
                                  className="w-[30px] h-[30px] m-[4] rounded-[4px]"
                                  src={newUser}
                                  alt=""
                                />
                                <h1 className="ml-2">{e.comment}</h1>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                    <div className="ml-5 flex m-3">
                      <img
                        className="w-[30px] h-[30px] m-[4] rounded-[4px]"
                        src={newUser}
                        alt=""
                      />
                      {/* ForComment */}
                      <input
                        placeholder="Добавьте коментарий..."
                        type="text"
                        className="  border-[none] pl-3 outline-0 w-[500%] rounded-[30px]  p-1 "
                        onChange={(e) => dispatch(setComment(e.target.value))}
                        value={comments}
                      />

                      {/* inpval */}

                      <button
                        className="text-[blue] mr-4"
                        onClick={() => {
                          dispatch(
                            postComment({
                              comment: comments,
                              postId: e.postId,
                            })
                          );
                          dispatch(setComment(""));
                        }}
                      >
                        Опубликовать
                      </button>
                    </div>
                  </div>
                </StyledMenu>

                {/* TileforcommentCount */}
                <h1 className="ml-7">{e.commentCount}</h1>

                {/* ButtonForSend___________________________________________________________*/}
                <button className="m-2">
                  <TelegramIcon
                    id="demo-customized-button"
                    aria-controls={open2 ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open2 ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick2}
                    endIcon={<KeyboardArrowDownIcon />}
                    className=""
                  ></TelegramIcon>
                </button>

                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl2}
                  open={open2}
                  onClose={handleClose2}
                >
                  <MenuItem onClick={handleClose2} disableRipple></MenuItem>
                  <div>
                    <div className="flex  w-[100%] justify-evenly m-3">
                      <button className="font-bold text-[20px]">x</button>
                      <h1 className="font-bold text-center">Поделиться</h1>
                    </div>

                    <h1 className="ml-6">Рекомендуемые</h1>

                    <hr />
                    <div className="m-[8%]">
                      <div className="flex my-2">
                        <p className="mr-2">Кому:</p>
                        <input
                          type="text"
                          className="outline-none"
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="search......"
                        />
                      </div>
                      <div>
                        {data
                          ?.filter((e) => {
                            return search?.toLowerCase() === ""
                              ? e
                              : e?.title.toLowerCase().includes(search);
                          })
                          ?.map((e) => {
                            return (
                              <div className="flex  my-2">
                                <div className="flex justify-between w-[100%] ">
                                  <div className="flex ">
                                    <img
                                      className="w-[30px] h-[30px] rounded-[4px]"
                                      src={newUser}
                                      alt=""
                                    />
                                    <p className="ml-2">{e.title}</p>
                                  </div>
                                  <div className="mx-3">
                                    <FormControl>
                                      {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                                      <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                      >
                                        <FormControlLabel
                                          value="female"
                                          control={<Radio />}
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <hr className="my-2" />
                      <div>
                        <Button
                          onClick={handleClose2}
                          variant="contained"
                          className="w-[100%] my-3"
                        >
                          Отправить
                        </Button>
                      </div>
                    </div>
                    {/* _________________________________________________________________________________________ */}
                    {data.map((e) => {
                      return <div className="w-[350px] ml-4 "></div>;
                    })}
                  </div>
                </StyledMenu>

                <button className="m-2">
                  <Checkbox
                    {...label}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                  />
                </button>

                {/* ButtonForThreeDot */}
                <button>
                  <React.Fragment>
                    <Box>
                      <Tooltip title="video settings">
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              backgroundColor: "transparent",
                              color: "black",
                            }}
                          >
                            <MoreHorizIcon />
                          </Avatar>
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

                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
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
                      transformOrigin={{ horizontal: "left", vertical: "" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <div className="flex flex-col gap-5 m-3  shadow-md ">
                        <p
                          className="text-[red] p-2  hover:bg-[#00000010]"
                          onClick={() => setModal(false)}
                        >
                          Пожаловаться
                        </p>
                        <p
                          className="text-[blue] p-2 hover:bg-[#00000010]"
                          onClick={() => setModal(false)}
                        >
                          Подписаться
                        </p>
                        <p
                          className="hover:bg-[#00000010]  p-2 "
                          onClick={() => setModal(false)}
                        >
                          Перейти к публикации
                        </p>
                        <p
                          className="hover:bg-[#00000010]  p-2 "
                          onClick={() => setModal(false)}
                        >
                          Поделиться...
                        </p>
                        <p
                          className="hover:bg-[#00000010]  p-2 "
                          onClick={() => setModal(false)}
                        >
                          Копировать сылку
                        </p>
                        <p
                          className="hover:bg-[#00000010]  p-2 "
                          onClick={() => setModal(false)}
                        >
                          Всавить на сайт
                        </p>
                        <p
                          className="hover:bg-[#00000010]  p-2 "
                          onClick={() => setModal(false)}
                        >
                          Об аккаунте
                        </p>
                      </div>
                    </Menu>
                  </React.Fragment>
                </button>

                <div className="m-4">
                  <img
                    className="w-[30px] h-[30px] rounded-[4px]"
                    src={newUser}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="mt-[-70px] mx-2 flex">
              <img
                className="w-[30px] h-[30px] rounded-[4px]"
                src={newUser}
                alt=""
              />
              <h1 className="text-[white] ml-1">{e.title}</h1>

              {/*btnSubscribe  */}
              <Button
                style={{ border: "white 1px solid", marginLeft: "12px" }}
                onClick={handleButtonClick}
              >
                <p className="text-[white]">
                  {isFollowing ? "Unfollow" : "Follow"}
                </p>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reels;
