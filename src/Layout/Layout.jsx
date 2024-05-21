import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";

import Search from "/src/assets/icons/placeholder Search2.png";
import userAvatar from "/src/assets/images/polzovatel.jpg";
import { Getsearch, deleteSearch, searchHistory } from "../pages/search/search";

import {
  setModalMore,
  setModalSearch,
  setModalCreate,
} from "../reducers/Layout/Layout";
import { getToken } from "../utils/token";
import InstagramIcon from "@mui/icons-material/Instagram";
import MoreModal from "../components/Layout/MoreModal";

import {
  Link,
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../assets/icons/instagram-wordmark.svg";
import moreSettings from "../assets/icons/more-settings.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faBars,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { faThreads } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Avatar, TextField, colors } from "@mui/material";

import AOS from "aos";
import "aos/dist/aos.css";
import HomeIcon from "../icons/Layout/HomeIcon";
import ReelsIcon from "../icons/Layout/ReelsIcon";
import MessageIcon from "../icons/Layout/MessageIcon";
import { getData } from "../pages/search/search";
import { handleChange } from "../reducers/search/searchred";

import CreateModal from "../components/Layout/CreateModal";

export const Layout = () => {
  // Функция для модального окна "Еще"

  const location = useLocation();
  const dispatch = useDispatch();
  const modalMore = useSelector((store) => store.layout.modalMore);
  const modalSearch = useSelector((store) => store.layout.modalSearch);
  const modalCreate = useSelector((store) => store.layout.modalCreate);
  const hide = useRef(null);

  const toggleModalSearch = () => {
    dispatch(setModalSearch(!modalSearch));
  };
  const toggleModal = () => {
    dispatch(setModalMore(!modalMore));
    dispatch ( setModalSearch ( false ))
  };
  const data = useSelector((store) => store.searchred.infoData);
  const inpSearch = useSelector((store) => store.searchred.inpSearch);
  const searchData = useSelector((store) => store.searchred.searchData);
const navigate = useNavigate()
  const myId = getToken().sid;

  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    dispatch(getData());
    dispatch(Getsearch());
  }, [dispatch, inpSearch]);
  return (
    // Главный контейнер
    <main className="flex dark:bg-black dark:text-white">
      {/* Флекс контейнер */}
      {/* Navbar */}
      <aside
        className={`left ${
          location.pathname === "/basic/message" ||
          location.pathname === "/basic/message/newMessage" ||
          location.pathname.slice(0, 14) == "/basic/message"
            ? "w-[6%]"
            : "w-[19%]"
        }`}
      >
        {/* Панель навигации */}
        <div
          className={`${
            location.pathname === "/basic/message" ||
            location.pathname === "/basic/message/newMessage" ||
            location.pathname.slice(0, 14) == "/basic/message"
              ? "w-[6%]"
              : "w-[19%]"
          } panel-navigation fixed py-[33px] px-[15px] h-[100%] border-r-[1px] border-[#d8d8d8]`}
        >
          <ul
            className={`${
              modalSearch ? "items-start gap-[16.5px]" : "items-stretch"
            } flex flex-col gap-[12px]`}
          >
            {/* Logo */}
            <Link to="/basic">
              <li
                className={`${
                  location.pathname === "/basic/message" ||
                  location.pathname === "/basic/message/newMessage" ||
                  location.pathname.slice(0, 14) == "/basic/message"
                    ? "hidden"
                    : "block"
                }mb-[15px]`}
              >
                <img
                  src={logo}
                  alt=""
                  // style={{ display: modalSearch ? "none" : "block" }}
                  className={`w-[55%] ${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    location.pathname.slice(0, 14) == "/basic/message"
                      ? "hidden"
                      : "block" && modalSearch == false
                      ? "block"
                      : "hidden"
                  }`}
                />
              </li>
              {/* instagram icon */}
              <li
                className="px-[9px]"
                style={{ display: modalSearch ? "block" : "none" }}
              >
                <InstagramIcon sx={{ fontSize: "30px" }} />
              </li>
            </Link>
            <NavLink
              to="/basic"
              onClick={() => dispatch(setModalSearch(false))}
            >
              <li className="flex items-center gap-[16px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300">
                {/* <img src={navHome} alt="" /> */}
                <HomeIcon />
                {/* <FontAwesomeIcon icon={faHouse} className="text-[25px]" /> */}
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    location.pathname.slice(0, 14) == "/basic/message"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Главная
                </p>
              </li>
            </NavLink>

            {/* <search/> */}
            <div>
              <li
                onClick={() => {
                  toggleModalSearch();
                }}
                className="flex items-center gap-[15px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-[22px]"
                />

                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    location.pathname.slice(0, 14) == "/basic/message"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Поисковой запрос
                </p>
              </li>
            </div>

            <NavLink
              to="explore"
              onClick={() => dispatch(setModalSearch(false))}
            >
              <li className="flex items-center gap-[15px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300">
                <ExploreOutlinedIcon sx={{ fontSize: "25px" }} />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    location.pathname.slice(0, 14) == "/basic/message"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Интересное
                </p>
              </li>
            </NavLink>
            <NavLink to="reels" onClick={() => dispatch(setModalSearch(false))}>
              <li className="flex items-center gap-[15px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300">
                {/* <img src={navReels} alt="" className="w-[25px]" /> */}
                <ReelsIcon />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    location.pathname.slice(0, 14) == "/basic/message"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Reels
                </p>
              </li>
            </NavLink>
            <NavLink
              to="message/get"
              onClick={() => dispatch(setModalSearch(false))}
            >
              <li className=" flex items-center gap-[15px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300">
                {/* <img src={navMessages} alt="" className="w-[25px]" /> */}
                <MessageIcon />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    location.pathname.slice(0, 14) == "/basic/message"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Сообщения
                </p>
              </li>
            </NavLink>

            <Link onClick={() => dispatch(setModalSearch(false))}>
              <li className="flex items-center gap-[15px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300">
                <FontAwesomeIcon icon={faHeart} className="text-[25px]" />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    location.pathname.slice(0, 14) == "/basic/message"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Уведомления
                </p>
              </li>
            </Link>
            <li
              onClick={() => dispatch(setModalCreate(!modalCreate))}
              className="flex items-center cursor-pointer gap-[15px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300"
            >
              <AddBoxOutlinedIcon />
              <p
                className={`${
                  location.pathname === "/basic/message" ||
                  location.pathname === "/basic/message/newMessage" ||
                  location.pathname.slice(0, 14) == "/basic/message"
                    ? "hidden"
                    : "block"
                }`}
              >
                Создать
              </p>
            </li>
            <NavLink to="profile">
              <li className="flex items-center gap-[15px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300">
                <Avatar
                  // src={navProfile}
                  sx={{ width: "25px", height: "25px" }}
                />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    location.pathname.slice(0, 14) == "/basic/message"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Профиль
                </p>
              </li>
            </NavLink>
            <li
              onClick={() => {
                toggleModal()
              } }
              className="flex items-center gap-[15px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300 cursor-pointer"
            >
              <FontAwesomeIcon icon={faBars} className="text-[20px]" />
              <p
                className={`${
                  location.pathname === "/basic/message" ||
                  location.pathname === "/basic/message/newMessage" ||
                  location.pathname.slice(0, 14) == "/basic/message"
                    ? "hidden"
                    : "block"
                }`}
              >
                Ещё
              </p>
            </li>
          </ul>
        </div>
        {/* Modal More */}
        <Link to={"profile/account/settings"}>
          <MoreModal 
            modal={modalMore}
            img={moreSettings}
            faChartLine={
              <FontAwesomeIcon
                icon={faChartLine}
                className="text-[18px] w-[25px]"
              />
            }
            faThreads={
              <FontAwesomeIcon
                icon={faThreads}
                className="text-[18px] w-[25px]"
              />
            }
          />
        </Link>
      </aside>

      {/* searchmodal  */}

      <div
        data-aos="fade-right"
        style={{ display: modalSearch ? "block" : "none" }}
        className="searchModal border-[1px] z-10 overflow-scroll  fixed left-[4%] px-[1%] py-[2%]  bg-white dark:bg-black w-[29%] h-[100%] rounded-r-3xl"
      >
        <div className="flex mt-[-1%] flex-col mb-[7%]">
          <h1 className="text-[150%] pl-[4.5%] mb-[10%] mt-[-3%] font-semibold">
            Поисковый запрос
          </h1>
          <input
            type="search"
            value={inpSearch}
            onChange={(event) =>
              dispatch(
                handleChange({ type: "inpSearch", settype: event.target.value })
              )
            }
            className="dark:text-black dark:bg-gray-700 bg-[#EFEFEF] py-[2%] rounded-[8px] px-[4%] font-normal placeholder:text-black placeholder:font-light"
            placeholder="Поиск"
          />

          <img
            src={Search}
            style={{ display: inpSearch.length == 0 ? "block" : "none" }}
            className="w-[5%]  ml-[90%] mt-[-7.5%]"
            alt="error"
          />
        </div>

        <hr
          style={{ display: inpSearch.length == 0 ? "block" : "none" }}
          className="border-gray-300 w-[108%] ml-[-3.9%]"
        />

        <h1 className="mt-[6%] text-[101%] pl-[4.4%]">Недавнее</h1>

        <table className="w-[100%]" style={{display:inpSearch.length==0 ? "block" : "none"}}>
          <thead>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody className="flex flex-col gap-[10px] pt-[2px]">
            {searchData?.map((elem) => {
              return (
                <tr key={elem.id} onClick={()=>navigate(`userId/${elem.users.id}`) } className="flex hover:bg-[#EFEFEF] dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer p-[5px] justify-between">
                 
                 <td className="flex gap-3 items-center"> 
                  <td className="flex">
                    <img
                      className="rounded-[50px] object-cover w-[50px] h-[50px]"
                      src={
                        elem.users.avatar.length == 0 ||
                        elem.users.avatar == null
                          ? userAvatar
                          : `${import.meta.env.VITE_APP_FILES_URL}${
                              elem.users.avatar
                            }`
                      }
                      alt="avatar"
                    />
                  </td>
                  <td>
                    <h1 className="font-medium dark:text-white">{elem.users.userName}</h1>
                    <h1 className="text-gray-400 font-normal dark:text-gray-400">{elem.users.fullName}</h1>
                  </td>
                  </td>
                  <td className="mt-[4%]">
                    <button onClick={()=> dispatch(deleteSearch ( elem . id ) ) } className="font-bold"> X </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h1
          style={
            { display: inpSearch.length == 0 ? "block" : "none" } || {
              display: searchData.length == 0 ? "block" : "none",
            }
          }
          className="text-gray-500 font-medium text-[90%] text-center pt-[63%]"
        >
          Нет недавних запросов.
        </h1>

        <div>
          {data?.map((elem) => {
            return (
              <>
                <div
                  key={elem.id}
                  onClick={()=>navigate(`userId/${elem.id}`)}
                  className="hover:bg-[#EFEFEF] hover:dark:bg-gray-800 rounded-[10px]"
                  style={{ display: inpSearch.length == 0 ? "none" : "block" }}
                >
                  <div
                    onClick={() => dispatch(searchHistory(elem.id))}
                    className="pl-[3%] py-[1%] cursor-pointer flex items-center gap-[5%]"
                  >
                    <div>
                      <img
                        src={
                          elem.avatar.length == 0 || elem.avatar == null
                            ? userAvatar
                            : `${import.meta.env.VITE_APP_FILES_URL}${
                                elem.avatar
                              }`
                        }
                        className="rounded-[500%] w-[55px] h-[7vh]"
                      />
                    </div>
                    <div>
                      <h1 className="font-medium">{elem.userName}</h1>
                      <h1 className="text-gray-400 font-normal">
                        {elem.fullName}
                      </h1>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {modalCreate ? <CreateModal /> : null}
      {/* Контентная часть */}
      <aside ref={hide} className="right w-[100%]">
        <Outlet />
      </aside>
    </main>
  );
};
